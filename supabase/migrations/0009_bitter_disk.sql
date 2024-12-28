/*
  # Calendar Events Security and Request Logging

  1. Security Changes
    - Add request logging table
    - Add rate limiting
    - Add validation triggers
    - Add security indexes

  2. Changes
    - Create request_logs table
    - Add validation trigger function
    - Add performance indexes
*/

-- Create request_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS request_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add validation trigger function
CREATE OR REPLACE FUNCTION validate_calendar_event()
RETURNS trigger AS $$
BEGIN
  -- Validate event exists
  IF NOT EXISTS (SELECT 1 FROM events WHERE id = NEW.event_id) THEN
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
    SELECT 1 FROM request_logs
    WHERE user_id = auth.uid()
    AND action = 'create_calendar_event'
    AND created_at > NOW() - INTERVAL '1 hour'
    HAVING COUNT(*) < 100
  ) THEN
    RAISE EXCEPTION 'Rate limit exceeded';
  END IF;

  -- Log request
  INSERT INTO request_logs (user_id, action)
  VALUES (auth.uid(), 'create_calendar_event');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create validation trigger
CREATE TRIGGER calendar_event_validation
  BEFORE INSERT OR UPDATE ON calendar_events
  FOR EACH ROW
  EXECUTE FUNCTION validate_calendar_event();

-- Add security-focused indexes
CREATE INDEX IF NOT EXISTS idx_calendar_events_created 
  ON calendar_events(created_at);
CREATE INDEX IF NOT EXISTS idx_request_logs_user_action 
  ON request_logs(user_id, action, created_at);

-- Add RLS to request_logs
ALTER TABLE request_logs ENABLE ROW LEVEL SECURITY;

-- Only allow users to see their own logs
CREATE POLICY "Users can view their own request logs"
  ON request_logs
  FOR SELECT
  USING (user_id = auth.uid());