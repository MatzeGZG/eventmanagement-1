/*
  # Calendar Events Security Update

  1. Changes
    - Create audit logs table
    - Enable RLS on calendar_events
    - Add comprehensive security policies
    - Add performance indexes
    - Add audit trigger

  2. Security
    - Restrict access to authenticated users
    - Ensure users can only access their authorized events
    - Track all changes through audit logs
*/

-- Create audit_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name text NOT NULL,
  action text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "calendar_events_view_policy" ON calendar_events;
DROP POLICY IF EXISTS "Users can create calendar events" ON calendar_events;
DROP POLICY IF EXISTS "Users can delete their own calendar events" ON calendar_events;
DROP POLICY IF EXISTS "Users can update their own calendar events" ON calendar_events;
DROP POLICY IF EXISTS "Users can view events they have access to" ON calendar_events;

-- Create new comprehensive policies
CREATE POLICY "calendar_events_select_policy"
  ON calendar_events
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM events e
      LEFT JOIN calendar_sharing cs ON e.id = calendar_events.event_id
      WHERE e.id = calendar_events.event_id
      AND (
        -- User has access through calendar sharing
        cs.shared_with_id = auth.uid()
        -- Or user has direct access to the event
        OR EXISTS (
          SELECT 1 FROM events
          WHERE id = calendar_events.event_id
          AND id IN (
            SELECT event_id 
            FROM calendar_sharing 
            WHERE shared_with_id = auth.uid()
          )
        )
      )
    )
  );

CREATE POLICY "calendar_events_insert_policy"
  ON calendar_events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM events
      WHERE id = event_id
      AND id IN (
        SELECT event_id 
        FROM calendar_sharing 
        WHERE shared_with_id = auth.uid()
      )
    )
  );

CREATE POLICY "calendar_events_update_policy"
  ON calendar_events
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE id = event_id
      AND id IN (
        SELECT event_id 
        FROM calendar_sharing 
        WHERE shared_with_id = auth.uid()
      )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM events
      WHERE id = event_id
      AND id IN (
        SELECT event_id 
        FROM calendar_sharing 
        WHERE shared_with_id = auth.uid()
      )
    )
  );

CREATE POLICY "calendar_events_delete_policy"
  ON calendar_events
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE id = event_id
      AND id IN (
        SELECT event_id 
        FROM calendar_sharing 
        WHERE shared_with_id = auth.uid()
      )
    )
  );

-- Add security-focused indexes
CREATE INDEX IF NOT EXISTS idx_calendar_events_event_id 
  ON calendar_events(event_id);

CREATE INDEX IF NOT EXISTS idx_calendar_events_created 
  ON calendar_events(created_at);

-- Add audit trigger
CREATE OR REPLACE FUNCTION audit_calendar_event_changes()
RETURNS trigger AS $$
BEGIN
  INSERT INTO audit_logs (
    table_name,
    action,
    user_id,
    old_data,
    new_data
  ) VALUES (
    'calendar_events',
    TG_OP,
    auth.uid(),
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calendar_events_audit
  AFTER INSERT OR UPDATE OR DELETE ON calendar_events
  FOR EACH ROW
  EXECUTE FUNCTION audit_calendar_event_changes();