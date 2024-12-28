-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can manage all audit logs" ON audit_logs;
DROP POLICY IF EXISTS "Users can view their own audit logs" ON audit_logs;

-- Enable RLS for audit_logs table
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = user_id
    AND auth.users.raw_user_meta_data->>'isAdmin' = 'true'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create new policies for audit_logs
CREATE POLICY "Admins can manage all audit logs"
  ON audit_logs
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()));

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_created 
  ON audit_logs(user_id, created_at DESC);

-- Add timestamp trigger function
CREATE OR REPLACE FUNCTION update_audit_logs_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.created_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create timestamp trigger
DROP TRIGGER IF EXISTS set_timestamp ON audit_logs;
CREATE TRIGGER set_timestamp
  BEFORE INSERT ON audit_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_audit_logs_timestamp();