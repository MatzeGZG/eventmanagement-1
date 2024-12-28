/*
  # Custom Calendars Implementation

  1. New Tables
    - `custom_calendars` - Stores user-created calendar configurations
    - `calendar_preferences` - Stores user calendar preferences and defaults
    - `calendar_sources` - Stores external calendar source configurations

  2. Security
    - Enable RLS on all tables
    - Add policies for user access control

  3. Changes
    - Add support for multiple calendar views and sources
    - Add calendar preferences and defaults
*/

-- Custom Calendars Table
CREATE TABLE IF NOT EXISTS custom_calendars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  filters jsonb DEFAULT '{}'::jsonb,
  color text,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Calendar Preferences Table
CREATE TABLE IF NOT EXISTS calendar_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  default_calendar_id uuid REFERENCES custom_calendars(id),
  default_view text DEFAULT 'month',
  time_zone text,
  week_starts_on integer DEFAULT 0,
  show_weekends boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Calendar Sources Table
CREATE TABLE IF NOT EXISTS calendar_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  calendar_id uuid REFERENCES custom_calendars(id) ON DELETE CASCADE,
  provider text NOT NULL,
  credentials jsonb,
  sync_frequency interval,
  last_synced timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE custom_calendars ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_sources ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their own calendars"
  ON custom_calendars
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can manage their own preferences"
  ON calendar_preferences
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can manage their calendar sources"
  ON calendar_sources
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Indexes
CREATE INDEX idx_custom_calendars_user ON custom_calendars(user_id);
CREATE INDEX idx_calendar_sources_user ON calendar_sources(user_id);
CREATE INDEX idx_calendar_sources_calendar ON calendar_sources(calendar_id);