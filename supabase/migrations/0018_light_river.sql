-- Create function to update auth settings
CREATE OR REPLACE FUNCTION update_auth_config()
RETURNS void
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Update auth config to set OTP expiry to 30 minutes
  PERFORM set_config('auth.otp_expiry_seconds', '1800', false);
END;
$$;

-- Execute the function
SELECT update_auth_config();

-- Drop the function after use
DROP FUNCTION update_auth_config();

-- Add migration note
COMMENT ON SCHEMA public IS 'Updated auth OTP expiry to 30 minutes for security compliance';