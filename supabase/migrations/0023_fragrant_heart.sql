-- Add social engagement metrics
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS social_engagement jsonb DEFAULT '{
  "event_attendance_rate": 0,
  "response_time": 0,
  "connection_activity": 0,
  "community_rating": 0
}'::jsonb,

-- Add communication preferences
ADD COLUMN IF NOT EXISTS communication_preferences jsonb DEFAULT '{
  "preferred_contact_times": ["evening"],
  "response_frequency": "normal",
  "communication_style": "casual",
  "language_proficiency": {}
}'::jsonb,

-- Add event history analytics
ADD COLUMN IF NOT EXISTS event_analytics jsonb DEFAULT '{
  "attended_categories": {},
  "favorite_venues": [],
  "price_sensitivity": "medium",
  "booking_patterns": {},
  "cancellation_rate": 0
}'::jsonb,

-- Add behavioral insights
ADD COLUMN IF NOT EXISTS behavioral_insights jsonb DEFAULT '{
  "planning_style": "spontaneous",
  "social_energy": "balanced",
  "decision_speed": "moderate",
  "risk_tolerance": "moderate",
  "time_flexibility": "moderate"
}'::jsonb,

-- Add interests metadata
ADD COLUMN IF NOT EXISTS interests_metadata jsonb DEFAULT '{
  "categories_ranking": {},
  "discovery_preferences": "balanced",
  "interest_evolution": [],
  "expertise_levels": {}
}'::jsonb,

-- Add social compatibility factors
ADD COLUMN IF NOT EXISTS compatibility_factors jsonb DEFAULT '{
  "age_group_preference": null,
  "group_size_preference": "medium",
  "social_pace": "moderate",
  "activity_level": "moderate",
  "social_values": []
}'::jsonb;

-- Add indexes for improved query performance
CREATE INDEX IF NOT EXISTS idx_profiles_social_engagement 
ON profiles USING gin(social_engagement);

CREATE INDEX IF NOT EXISTS idx_profiles_event_analytics 
ON profiles USING gin(event_analytics);

CREATE INDEX IF NOT EXISTS idx_profiles_interests_metadata 
ON profiles USING gin(interests_metadata);

-- Add comments for documentation
COMMENT ON COLUMN profiles.social_engagement IS 'Metrics tracking user''s social activity and engagement patterns';
COMMENT ON COLUMN profiles.communication_preferences IS 'User''s preferred communication methods and patterns';
COMMENT ON COLUMN profiles.event_analytics IS 'Historical analysis of user''s event participation patterns';
COMMENT ON COLUMN profiles.behavioral_insights IS 'Analyzed behavioral patterns for better matching';
COMMENT ON COLUMN profiles.interests_metadata IS 'Detailed tracking of interest patterns and evolution';
COMMENT ON COLUMN profiles.compatibility_factors IS 'Factors used for social compatibility matching';