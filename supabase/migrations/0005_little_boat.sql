/*
  # Calendar System Tables

  1. New Tables
    - `calendar_events` - Stores recurring event patterns and exceptions
    - `calendar_reminders` - Stores user reminders for events
    - `calendar_sync_logs` - Tracks calendar sync history
    - `calendar_sharing` - Manages calendar sharing permissions

  2. Security
    - Enable RLS on all tables
    - Add policies for user access control
*/

-- Calendar Events Table
CREATE TABLE IF NOT EXISTS calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  recurrence_rule jsonb,
  exceptions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Calendar Reminders Table
CREATE TABLE IF NOT EXISTS calendar_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  type text CHECK (type IN ('email', 'push', 'both')),
  timing integer NOT NULL, -- minutes before event
  enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Calendar Sync Logs Table
CREATE TABLE IF NOT EXISTS calendar_sync_logs (
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

-- Calendar Sharing Table
CREATE TABLE IF NOT EXISTS calendar_sharing (
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

-- RLS Policies
CREATE POLICY "Users can view their own calendar events"
  ON calendar_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events 
      WHERE events.id = calendar_events.event_id 
      AND events.id IN (
        SELECT event_id FROM calendar_sharing WHERE shared_with_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can manage their own reminders"
  ON calendar_reminders FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view their own sync logs"
  ON calendar_sync_logs FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage calendar sharing"
  ON calendar_sharing FOR ALL
  USING (owner_id = auth.uid() OR shared_with_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

-- Indexes
CREATE INDEX idx_calendar_events_event_id ON calendar_events(event_id);
CREATE INDEX idx_calendar_reminders_user_event ON calendar_reminders(user_id, event_id);
CREATE INDEX idx_calendar_sync_logs_user_date ON calendar_sync_logs(user_id, synced_at);
CREATE INDEX idx_calendar_sharing_users ON calendar_sharing(owner_id, shared_with_id);