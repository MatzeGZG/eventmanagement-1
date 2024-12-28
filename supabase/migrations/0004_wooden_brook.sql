/*
  # Add tag categories and initial tags

  1. New Tables
    - Already created in previous migration (0003)
    
  2. Initial Data
    - Add tag categories for different event types
    - Add initial tags for each category
    - Create relationships between related tags
    
  3. Changes
    - Insert initial tag categories and tags
    - Ensure unique slugs by using category prefix
*/

-- Insert tag categories if they don't exist
INSERT INTO tag_categories (name, description, icon, color)
SELECT * FROM (VALUES
  ('Entertainment', 'Live performances, shows, and entertainment events', '🎭', '#FF4081'),
  ('Food & Drink', 'Culinary experiences and beverage tastings', '🍷', '#4CAF50'),
  ('Fitness & Wellness', 'Health, fitness, and wellness activities', '🧘', '#2196F3'),
  ('Arts & Culture', 'Cultural events and artistic experiences', '🎨', '#9C27B0'),
  ('Technology & Innovation', 'Tech events and innovative showcases', '💻', '#00BCD4'),
  ('Networking & Business', 'Professional networking and business events', '💼', '#607D8B'),
  ('Fashion & Lifestyle', 'Fashion events and lifestyle experiences', '👗', '#E91E63'),
  ('High Society', 'Exclusive and luxury social events', '👑', '#FFD700'),
  ('Outdoor & Adventure', 'Outdoor activities and adventures', '🏔️', '#8BC34A')
) AS v(name, description, icon, color)
WHERE NOT EXISTS (
  SELECT 1 FROM tag_categories WHERE name = v.name
);

-- Insert initial tags with category-prefixed slugs
WITH categories AS (
  SELECT id, name FROM tag_categories
)
INSERT INTO tags (category_id, name, slug, description, icon)
SELECT 
  c.id,
  t.name,
  LOWER(CONCAT(
    REGEXP_REPLACE(c.name, '\s+', '-', 'g'),
    '--',
    REGEXP_REPLACE(t.name, '\s+', '-', 'g')
  )),
  t.description,
  t.icon
FROM categories c
CROSS JOIN (VALUES
  -- Entertainment
  ('Live Concerts', 'Live music performances', '🎵'),
  ('Jazz Nights', 'Evening jazz performances', '🎷'),
  ('Classical Symphony', 'Classical music concerts', '🎻'),
  ('Film Screenings', 'Movie premieres and screenings', '🎬'),
  ('Stand-Up Comedy', 'Comedy shows and performances', '🎤'),
  -- Food & Drink
  ('Wine Tasting', 'Wine tasting events', '🍷'),
  ('Gourmet Dining', 'Fine dining experiences', '🍽️'),
  ('Cooking Classes', 'Culinary workshops', '👨‍🍳'),
  ('Food Festivals', 'Food and culinary festivals', '🍴'),
  ('Craft Beer', 'Craft beer tastings', '🍺'),
  -- Technology
  ('Tech Conferences', 'Technology conferences and summits', '💻'),
  ('Startup Meetups', 'Networking events for startups', '🚀'),
  -- Fashion & Arts
  ('Fashion Shows', 'Fashion runway events', '👗'),
  ('Art Exhibitions', 'Art gallery exhibitions', '🎨'),
  ('Charity Galas', 'Fundraising and charity events', '✨')
) t(name, description, icon)
WHERE NOT EXISTS (
  SELECT 1 FROM tags 
  WHERE slug = LOWER(CONCAT(
    REGEXP_REPLACE(c.name, '\s+', '-', 'g'),
    '--',
    REGEXP_REPLACE(t.name, '\s+', '-', 'g')
  ))
);

-- Create initial tag relationships
INSERT INTO tag_relationships (parent_tag_id, child_tag_id, relationship_type, weight)
SELECT DISTINCT
  p.id as parent_tag_id,
  c.id as child_tag_id,
  'related',
  0.8
FROM tags p
JOIN tags c ON p.category_id = c.category_id
WHERE p.id != c.id
  AND NOT EXISTS (
    SELECT 1 FROM tag_relationships 
    WHERE parent_tag_id = p.id AND child_tag_id = c.id
  )
LIMIT 50;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tags_category_name ON tags(category_id, name);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);