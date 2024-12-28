/*
  # Social Features Schema Update

  1. New Tables
    - Forums table for discussions
    - Forum posts and replies
    - Groups table for user communities
    - Group memberships and roles
  
  2. Security
    - RLS policies for all tables
    - Role-based access control
    
  3. Indexes
    - Optimized queries for forums and groups
*/

-- Forums
CREATE TABLE IF NOT EXISTS forums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  post_count integer DEFAULT 0,
  participant_count integer DEFAULT 0,
  last_activity_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Forum Posts
CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  forum_id uuid REFERENCES forums(id) ON DELETE CASCADE,
  author_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  likes integer DEFAULT 0,
  replies integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Groups
CREATE TABLE IF NOT EXISTS groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  cover_image text,
  created_by uuid REFERENCES auth.users(id),
  member_count integer DEFAULT 0,
  is_private boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Group Members
CREATE TABLE IF NOT EXISTS group_members (
  group_id uuid REFERENCES groups(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (group_id, user_id)
);

-- Enable RLS
ALTER TABLE forums ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public forums are viewable by everyone"
  ON forums FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create forums"
  ON forums FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Forum posts are viewable by everyone"
  ON forum_posts FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON forum_posts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Public groups are viewable by everyone"
  ON groups FOR SELECT
  USING (NOT is_private OR EXISTS (
    SELECT 1 FROM group_members
    WHERE group_id = id AND user_id = auth.uid()
  ));

CREATE POLICY "Group members can be viewed by members"
  ON group_members FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM group_members
    WHERE group_id = group_members.group_id
    AND user_id = auth.uid()
  ));

-- Indexes
CREATE INDEX idx_forums_category ON forums(category);
CREATE INDEX idx_forums_activity ON forums(last_activity_at DESC);
CREATE INDEX idx_forum_posts_forum ON forum_posts(forum_id);
CREATE INDEX idx_groups_private ON groups(is_private);
CREATE INDEX idx_group_members_user ON group_members(user_id);