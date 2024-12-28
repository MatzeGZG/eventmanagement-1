/*
  # Calendar System Schema Update

  1. New Tables
    - calendar_events: Links events to recurrence rules
    - calendar_reminders: User-configured event reminders
    - calendar_sync_logs: External calendar sync tracking
    - calendar_sharing: Calendar sharing between users

  2. Security
    - Enable RLS on all tables
    - Add policies for user access control
    - Add indexes for performance
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS calendar_sharing CASCADE;
DROP TABLE IF EXISTS calendar_sync_logs CASCADE;
DROP TABLE IF EXISTS calendar_reminders CASCADE;
DROP TABLE IF EXISTS calendar_events CASCADE;

-- Create new tables
CREATE TABLE calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  recurrence_rule jsonb,
  exceptions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE calendar_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  type text CHECK (type IN ('email', 'push', 'both')),
  timing integer NOT NULL,
  enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE calendar_sync_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  provider text NOT NULL,
  direction text CHECK (direction IN ('import', 'export', 'both')),
  events_added integer DEFAULT 0,
  events_updated integer DEFAULT 0,
  status text CHECK (status IN ('success', 'failed')),
  error_message text,
  synced_at timestamptz DEFAULT now()
);

CREATE TABLE calendar_sharing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  shared_with_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  permissions jsonb DEFAULT '{"view": true, "edit": false, "share": false}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(owner_id, shared_with_id)
);

-- Enable RLS
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_sharing ENABLE ROW LEVEL SECURITY;

-- Create new policies with unique names
CREATE POLICY "calendar_events_view_policy" ON calendar_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM events 
      WHERE events.id = calendar_events.event_id 
      AND events.id IN (
        SELECT event_id FROM calendar_sharing WHERE shared_with_id = auth.uid()
      )
    )
  );

CREATE POLICY "calendar_reminders_manage_policy" ON calendar_reminders
  FOR ALL USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "calendar_sync_logs_view_policy" ON calendar_sync_logs
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "calendar_sharing_manage_policy" ON calendar_sharing
  FOR ALL USING (owner_id = auth.uid() OR shared_with_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

-- Create indexes
CREATE INDEX idx_calendar_events_event ON calendar_events(event_id);
CREATE INDEX idx_calendar_reminders_user_event ON calendar_reminders(user_id, event_id);
CREATE INDEX idx_calendar_sync_logs_user_date ON calendar_sync_logs(user_id, synced_at);
CREATE INDEX idx_calendar_sharing_users ON calendar_sharing(owner_id, shared_with_id);