-- Add enhanced profile fields for AI matchmaking
ALTER TABLE profiles
-- Professional fields
ADD COLUMN IF NOT EXISTS profession text,
ADD COLUMN IF NOT EXISTS industry text,
ADD COLUMN IF NOT EXISTS skills jsonb DEFAULT '[]'::jsonb,

-- Event preferences
ADD COLUMN IF NOT EXISTS preferred_event_types jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS preferred_times jsonb DEFAULT '{
  "weekday": ["evening"],
  "weekend": ["afternoon", "evening"]
}'::jsonb,
ADD COLUMN IF NOT EXISTS price_range jsonb DEFAULT '{
  "min": 0,
  "max": 1000,
  "preferred": "medium"
}'::jsonb,

-- Social preferences
ADD COLUMN IF NOT EXISTS languages jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS networking_goals jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS preferred_group_size text DEFAULT 'medium',

-- Travel & Location
ADD COLUMN IF NOT EXISTS home_location jsonb DEFAULT '{
  "city": null,
  "country": null,
  "coordinates": null
}'::jsonb,
ADD COLUMN IF NOT EXISTS travel_radius integer DEFAULT 50,
ADD COLUMN IF NOT EXISTS travel_preferences jsonb DEFAULT '{
  "preferred_destinations": [],
  "accommodation_types": [],
  "transportation_modes": [],
  "trip_styles": [],
  "trip_durations": []
}'::jsonb,

-- Personal preferences
ADD COLUMN IF NOT EXISTS dietary_restrictions jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS accessibility_needs jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS cultural_interests jsonb DEFAULT '[]'::jsonb,

-- Personality & Matching
ADD COLUMN IF NOT EXISTS personality_traits jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS interaction_style text,
ADD COLUMN IF NOT EXISTS preferred_age_range jsonb DEFAULT '{
  "min": null,
  "max": null
}'::jsonb;

-- Add indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS idx_profiles_profession ON profiles(profession);
CREATE INDEX IF NOT EXISTS idx_profiles_industry ON profiles(industry);
CREATE INDEX IF NOT EXISTS idx_profiles_preferred_event_types ON profiles USING gin(preferred_event_types);
CREATE INDEX IF NOT EXISTS idx_profiles_languages ON profiles USING gin(languages);
CREATE INDEX IF NOT EXISTS idx_profiles_cultural_interests ON profiles USING gin(cultural_interests);

-- Add comment explaining the fields
COMMENT ON TABLE profiles IS 'User profiles with enhanced fields for AI matchmaking and recommendations';

-- Add comments for important columns
COMMENT ON COLUMN profiles.profession IS 'User''s current profession or occupation';
COMMENT ON COLUMN profiles.industry IS 'Industry or sector the user works in';
COMMENT ON COLUMN profiles.skills IS 'Professional and personal skills for networking matches';
COMMENT ON COLUMN profiles.preferred_event_types IS 'Types of events the user prefers to attend';
COMMENT ON COLUMN profiles.networking_goals IS 'User''s goals for networking and connections';
COMMENT ON COLUMN profiles.personality_traits IS 'Key personality traits for better matching';
COMMENT ON COLUMN profiles.interaction_style IS 'Preferred style of social interaction (e.g., "outgoing", "reserved")';