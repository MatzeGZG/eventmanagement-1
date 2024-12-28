/*
  # Create enhanced profiles table

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `bio` (text)
      - `location` (text)
      - `social_links` (jsonb)
      - `privacy_settings` (jsonb)
      - `travel_preferences` (jsonb)
      - `setup_complete` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `profiles` table
    - Add policies for authenticated users to:
      - Read their own profile
      - Update their own profile
      - Read other profiles based on privacy settings
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  bio text,
  location text,
  social_links jsonb DEFAULT '[]'::jsonb,
  privacy_settings jsonb DEFAULT '{
    "profileVisibility": "public",
    "allowMessagesFrom": "everyone",
    "showOnlineStatus": true,
    "allowTagging": true,
    "showLocation": true
  }'::jsonb,
  travel_preferences jsonb DEFAULT '{
    "preferredDestinations": [],
    "travelStyle": [],
    "accommodation": [],
    "interests": []
  }'::jsonb,
  setup_complete boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy for users to update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Policy for reading other profiles based on privacy settings
CREATE POLICY "Users can read public profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    (privacy_settings->>'profileVisibility')::text = 'public'
    OR auth.uid() = id
  );

-- Create index for faster profile lookups
CREATE INDEX profiles_name_idx ON profiles USING GIN (to_tsvector('english', name));