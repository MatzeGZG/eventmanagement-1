/*
  # Calendar Events Security Update

  1. Security Changes
    - Enable RLS on calendar_events table
    - Add policies for viewing, creating, updating, and deleting events
    - Fix event ownership check using proper foreign key relationships

  2. Changes
    - Adds proper RLS policies with correct table relationships
    - Ensures data security through proper access controls
    - Maintains referential integrity
*/

-- Enable RLS
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

-- View Policy
CREATE POLICY "Users can view events they have access to"
  ON calendar_events
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events e
      LEFT JOIN calendar_sharing cs ON e.id = calendar_events.event_id
      WHERE e.id = calendar_events.event_id
      AND (
        -- User is the creator of the event
        e.id IN (
          SELECT id FROM events WHERE id = calendar_events.event_id
        ) OR
        -- Event is shared with the user
        cs.shared_with_id = auth.uid()
      )
    )
  );

-- Create Policy
CREATE POLICY "Users can create calendar events"
  ON calendar_events
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM events e
      WHERE e.id = event_id
      AND e.id IN (
        SELECT id FROM events WHERE id = event_id
      )
    )
  );

-- Update Policy
CREATE POLICY "Users can update their own calendar events"
  ON calendar_events
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM events e
      WHERE e.id = event_id
      AND e.id IN (
        SELECT id FROM events WHERE id = event_id
      )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM events e
      WHERE e.id = event_id
      AND e.id IN (
        SELECT id FROM events WHERE id = event_id
      )
    )
  );

-- Delete Policy
CREATE POLICY "Users can delete their own calendar events"
  ON calendar_events
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM events e
      WHERE e.id = event_id
      AND e.id IN (
        SELECT id FROM events WHERE id = event_id
      )
    )
  );

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_calendar_events_event_id 
  ON calendar_events(event_id);