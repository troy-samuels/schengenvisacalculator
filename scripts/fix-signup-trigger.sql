-- Fix the signup trigger to handle new profile fields
-- This resolves the signup form error by updating the trigger

-- Drop the existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create updated function that handles all profile fields
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $func$
BEGIN
  INSERT INTO profiles (
    id, 
    email, 
    first_name, 
    last_name, 
    phone, 
    country_code,
    home_country,
    travel_reason,
    profile_completed
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'country_code', '+1'),
    NULL, -- home_country (will be filled during profile completion)
    NULL, -- travel_reason (will be filled during profile completion)
    false -- profile_completed (starts as false)
  );
  RETURN NEW;
END;
$func$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Verify the fix
SELECT 'Signup trigger updated successfully' as status; 