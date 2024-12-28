-- First drop triggers that depend on the functions
DROP TRIGGER IF EXISTS set_timestamp ON audit_logs CASCADE;
DROP TRIGGER IF EXISTS calendar_event_validation ON calendar_events CASCADE;
DROP TRIGGER IF EXISTS event_tag_analytics ON event_tags CASCADE;

-- Then drop functions with CASCADE to handle dependencies
DROP FUNCTION IF EXISTS public.update_audit_logs_timestamp() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.validate_calendar_event() CASCADE;
DROP FUNCTION IF EXISTS public.update_tag_analytics() CASCADE;

-- Recreate functions with proper search path settings
CREATE OR REPLACE FUNCTION public.update_audit_logs_timestamp()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.created_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = user_id
    AND auth.users.raw_user_meta_data->>'isAdmin' = 'true'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.validate_calendar_event()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Validate event exists
  IF NOT EXISTS (SELECT 1 FROM public.events WHERE id = NEW.event_id) THEN
    RAISE EXCEPTION 'Invalid event ID';
  END IF;

  -- Validate recurrence rule if present
  IF NEW.recurrence_rule IS NOT NULL AND NOT (
    NEW.recurrence_rule ? 'frequency' AND 
    NEW.recurrence_rule->>'frequency' IN ('daily', 'weekly', 'monthly', 'yearly')
  ) THEN
    RAISE EXCEPTION 'Invalid recurrence rule';
  END IF;

  -- Rate limiting check
  IF NOT EXISTS (
    SELECT 1 FROM public.request_logs
    WHERE user_id = auth.uid()
    AND action = 'create_calendar_event'
    AND created_at > NOW() - INTERVAL '1 hour'
    HAVING COUNT(*) < 100
  ) THEN
    RAISE EXCEPTION 'Rate limit exceeded';
  END IF;

  -- Log request
  INSERT INTO public.request_logs (user_id, action)
  VALUES (auth.uid(), 'create_calendar_event');

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_tag_analytics()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.tag_analytics (tag_id, date)
  VALUES (NEW.tag_id, CURRENT_DATE)
  ON CONFLICT (tag_id, date) DO UPDATE
  SET 
    usage_count = tag_analytics.usage_count + 1,
    event_count = (
      SELECT COUNT(DISTINCT event_id) 
      FROM public.event_tags 
      WHERE tag_id = NEW.tag_id
    ),
    user_count = (
      SELECT COUNT(DISTINCT user_id) 
      FROM public.user_tag_preferences 
      WHERE tag_id = NEW.tag_id
    );
  RETURN NEW;
END;
$$;

-- Recreate triggers
CREATE TRIGGER set_timestamp
  BEFORE INSERT ON audit_logs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_audit_logs_timestamp();

CREATE TRIGGER calendar_event_validation
  BEFORE INSERT OR UPDATE ON calendar_events
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_calendar_event();

CREATE TRIGGER event_tag_analytics
  AFTER INSERT ON event_tags
  FOR EACH ROW
  EXECUTE FUNCTION public.update_tag_analytics();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.update_audit_logs_timestamp() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.validate_calendar_event() TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_tag_analytics() TO authenticated;