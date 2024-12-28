/*
  # Enhanced Tagging System

  1. New Tables
    - `tags` - Core tags table
    - `tag_categories` - Tag categories/groups
    - `tag_relationships` - Tag connections and hierarchies
    - `tag_analytics` - Tag usage and trends
    - `event_tags` - Junction table for events and tags
    - `user_tag_preferences` - User tag preferences and interests

  2. Security
    - Enable RLS on all tables
    - Add policies for read/write access
    - Add indexes for performance

  3. Changes
    - Add tag-related functions and triggers
*/

-- Tag Categories Table
CREATE TABLE IF NOT EXISTS tag_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  color text,
  parent_id uuid REFERENCES tag_categories(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tags Table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES tag_categories(id),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tag Relationships Table
CREATE TABLE IF NOT EXISTS tag_relationships (
  parent_tag_id uuid REFERENCES tags(id),
  child_tag_id uuid REFERENCES tags(id),
  relationship_type text NOT NULL,
  weight float DEFAULT 1.0,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (parent_tag_id, child_tag_id)
);

-- Event Tags Junction Table
CREATE TABLE IF NOT EXISTS event_tags (
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  relevance_score float DEFAULT 1.0,
  added_at timestamptz DEFAULT now(),
  PRIMARY KEY (event_id, tag_id)
);

-- User Tag Preferences Table
CREATE TABLE IF NOT EXISTS user_tag_preferences (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  preference_level float DEFAULT 1.0,
  interaction_count integer DEFAULT 1,
  last_interaction timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, tag_id)
);

-- Tag Analytics Table
CREATE TABLE IF NOT EXISTS tag_analytics (
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  date date NOT NULL,
  usage_count integer DEFAULT 0,
  event_count integer DEFAULT 0,
  user_count integer DEFAULT 0,
  trending_score float DEFAULT 0.0,
  metadata jsonb DEFAULT '{}'::jsonb,
  PRIMARY KEY (tag_id, date)
);

-- Enable Row Level Security
ALTER TABLE tag_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tag_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tag_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE tag_analytics ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public read access for tag categories"
  ON tag_categories FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for tags"
  ON tags FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for tag relationships"
  ON tag_relationships FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for event tags"
  ON event_tags FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their tag preferences"
  ON user_tag_preferences
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_tags_category ON tags(category_id);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_event_tags_event ON event_tags(event_id);
CREATE INDEX idx_event_tags_tag ON event_tags(tag_id);
CREATE INDEX idx_user_preferences_user ON user_tag_preferences(user_id);
CREATE INDEX idx_user_preferences_tag ON user_tag_preferences(tag_id);
CREATE INDEX idx_tag_analytics_date ON tag_analytics(date);
CREATE INDEX idx_tag_relationships_parent ON tag_relationships(parent_tag_id);
CREATE INDEX idx_tag_relationships_child ON tag_relationships(child_tag_id);

-- Functions
CREATE OR REPLACE FUNCTION update_tag_analytics()
RETURNS trigger AS $$
BEGIN
  INSERT INTO tag_analytics (tag_id, date)
  VALUES (NEW.tag_id, CURRENT_DATE)
  ON CONFLICT (tag_id, date) DO UPDATE
  SET 
    usage_count = tag_analytics.usage_count + 1,
    event_count = (
      SELECT COUNT(DISTINCT event_id) 
      FROM event_tags 
      WHERE tag_id = NEW.tag_id
    ),
    user_count = (
      SELECT COUNT(DISTINCT user_id) 
      FROM user_tag_preferences 
      WHERE tag_id = NEW.tag_id
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER event_tag_analytics
  AFTER INSERT ON event_tags
  FOR EACH ROW
  EXECUTE FUNCTION update_tag_analytics();