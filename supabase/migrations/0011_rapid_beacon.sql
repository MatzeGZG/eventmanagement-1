-- Enable RLS for audit_logs table
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for audit_logs
CREATE POLICY "Admins can view all audit logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email IN (
        SELECT email FROM auth.users
        WHERE auth.users.raw_user_meta_data->>'isAdmin' = 'true'
      )
    )
  );

CREATE POLICY "Users can view their own audit logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id_created_at 
  ON audit_logs(user_id, created_at DESC);

-- Add function to check if user is admin
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