/*
  # Chat System Schema

  1. New Tables
    - `events` 
      - Base table for event data
    - `chat_rooms`
      - Room information and settings
      - Supports group chats and direct messages
    - `chat_memberships` 
      - Links users to chat rooms
      - Tracks member roles and status
    - `chat_messages`
      - Stores all messages
      - Includes read receipts
    - `chat_requests`
      - Handles private message requests
      - Similar to LinkedIn's messaging system

  2. Security
    - Enable RLS on all tables
    - Policies for room access and messaging permissions
    - Role-based access control for group management

  3. Indexes
    - Optimized for message retrieval and search
    - Fast membership lookups
*/

-- Events Table (if not exists)
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Chat Rooms Table
CREATE TABLE IF NOT EXISTS chat_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('direct', 'group', 'event')),
  name text,
  description text,
  created_by uuid REFERENCES auth.users(id),
  event_id uuid REFERENCES events(id),
  is_private boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  settings jsonb DEFAULT '{
    "max_members": 100,
    "allow_media": true,
    "message_retention_days": 365
  }'::jsonb
);

-- Chat Memberships Table
CREATE TABLE IF NOT EXISTS chat_memberships (
  room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at timestamptz DEFAULT now(),
  last_read_at timestamptz DEFAULT now(),
  is_muted boolean DEFAULT false,
  notification_preferences jsonb DEFAULT '{
    "mentions": true,
    "all_messages": true
  }'::jsonb,
  PRIMARY KEY (room_id, user_id)
);

-- Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  type text DEFAULT 'text' CHECK (type IN ('text', 'image', 'file', 'system')),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_deleted boolean DEFAULT false,
  reply_to uuid REFERENCES chat_messages(id)
);

-- Chat Message Read Receipts
CREATE TABLE IF NOT EXISTS chat_message_reads (
  message_id uuid REFERENCES chat_messages(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  read_at timestamptz DEFAULT now(),
  PRIMARY KEY (message_id, user_id)
);

-- Chat Requests Table
CREATE TABLE IF NOT EXISTS chat_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES auth.users(id),
  recipient_id uuid REFERENCES auth.users(id),
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (sender_id, recipient_id)
);

-- Enable Row Level Security
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_message_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_requests ENABLE ROW LEVEL SECURITY;

-- Chat Room Policies
CREATE POLICY "Users can view rooms they are members of"
  ON chat_rooms
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_memberships 
      WHERE room_id = id AND user_id = auth.uid()
    )
    OR (type = 'group' AND NOT is_private)
  );

CREATE POLICY "Users can create chat rooms"
  ON chat_rooms
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Chat Membership Policies
CREATE POLICY "Users can view room memberships"
  ON chat_memberships
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_memberships 
      WHERE room_id = chat_memberships.room_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can join public rooms"
  ON chat_memberships
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_rooms
      WHERE id = room_id
      AND NOT is_private
    )
  );

-- Chat Message Policies
CREATE POLICY "Users can view messages in their rooms"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_memberships
      WHERE room_id = chat_messages.room_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages to their rooms"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_memberships
      WHERE room_id = chat_messages.room_id
      AND user_id = auth.uid()
    )
  );

-- Chat Request Policies
CREATE POLICY "Users can view their chat requests"
  ON chat_requests
  FOR SELECT
  TO authenticated
  USING (
    sender_id = auth.uid() 
    OR recipient_id = auth.uid()
  );

CREATE POLICY "Users can send chat requests"
  ON chat_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = auth.uid());

-- Indexes
CREATE INDEX chat_messages_room_id_created_at_idx ON chat_messages (room_id, created_at DESC);
CREATE INDEX chat_memberships_user_id_idx ON chat_memberships (user_id);
CREATE INDEX chat_requests_recipient_status_idx ON chat_requests (recipient_id, status);