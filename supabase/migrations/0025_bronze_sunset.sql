-- Add rate limiting and 2FA fields to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS login_attempts integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS lockout_until timestamptz,
ADD COLUMN IF NOT EXISTS two_factor_enabled boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS two_factor_secret text;

-- Create login attempts tracking table
CREATE TABLE IF NOT EXISTS login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  ip_address text NOT NULL,
  attempted_at timestamptz DEFAULT now(),
  success boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

-- Create policy for login attempts
CREATE POLICY "Users can view their own login attempts"
  ON login_attempts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes
CREATE INDEX idx_login_attempts_user_ip ON login_attempts(user_id, ip_address);
CREATE INDEX idx_login_attempts_time ON login_attempts(attempted_at DESC);