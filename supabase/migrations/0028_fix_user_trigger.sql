/*
  # Fix User Registration Trigger

  1. Changes
    - Update handle_new_user function to properly set the name field
    - Recreate the auth trigger to ensure it's active
*/

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Update the function to include name field
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email,
    name,  -- Added required name field
    first_name,
    surname,
    level, 
    xp, 
    points
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),  -- Use name from metadata or email prefix as fallback
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

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
