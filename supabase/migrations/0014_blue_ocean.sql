-- Drop existing audit functions and triggers
DROP TRIGGER IF EXISTS events_audit ON events;
DROP TRIGGER IF EXISTS calendar_events_audit ON calendar_events;
DROP FUNCTION IF EXISTS audit_event_changes();
DROP FUNCTION IF EXISTS audit_calendar_event_changes();

-- Create base audit function with proper search path
CREATE OR REPLACE FUNCTION public.base_audit_changes()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    table_name,
    action,
    user_id,
    old_data,
    new_data
  ) VALUES (
    TG_TABLE_NAME,
    TG_OP,
    auth.uid(),
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END
  );
  RETURN NULL;
END;
$$;

-- Create event-specific audit function
CREATE OR REPLACE FUNCTION public.audit_event_changes()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN public.base_audit_changes();
END;
$$;

-- Create calendar event-specific audit function
CREATE OR REPLACE FUNCTION public.audit_calendar_event_changes()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN public.base_audit_changes();
END;
$$;

-- Recreate triggers
CREATE TRIGGER events_audit
  AFTER INSERT OR UPDATE OR DELETE ON events
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_event_changes();

CREATE TRIGGER calendar_events_audit
  AFTER INSERT OR UPDATE OR DELETE ON calendar_events
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_calendar_event_changes();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.base_audit_changes() TO authenticated;
GRANT EXECUTE ON FUNCTION public.audit_event_changes() TO authenticated;
GRANT EXECUTE ON FUNCTION public.audit_calendar_event_changes() TO authenticated;