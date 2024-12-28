-- Add new name fields
ALTER TABLE profiles 
ADD COLUMN first_name text,
ADD COLUMN surname text;

-- Update existing profiles to split name field
UPDATE profiles 
SET 
  first_name = split_part(name, ' ', 1),
  surname = CASE 
    WHEN position(' ' in name) > 0 
    THEN substring(name from position(' ' in name) + 1)
    ELSE NULL 
  END;

-- Update profile creation trigger
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    first_name,
    surname,
    level, 
    xp, 
    points
  )
  VALUES (
    NEW.id,
    NEW.email,
    split_part(NEW.raw_user_meta_data->>'name', ' ', 1),
    CASE 
      WHEN position(' ' in (NEW.raw_user_meta_data->>'name')) > 0 
      THEN substring(NEW.raw_user_meta_data->>'name' from position(' ' in (NEW.raw_user_meta_data->>'name')) + 1)
      ELSE NULL 
    END,
    'New Explorer',
    0,
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_names ON profiles(first_name, surname);

-- Add comment explaining the migration
COMMENT ON TABLE profiles IS 'User profiles with separated first name and surname fields';