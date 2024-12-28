-- Add RLS policies for remaining tables

-- Tag Analytics policies
DROP POLICY IF EXISTS "Public read access for tag analytics" ON tag_analytics;
DROP POLICY IF EXISTS "Only system can modify tag analytics" ON tag_analytics;

CREATE POLICY "Public read access for tag analytics"
  ON tag_analytics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can modify tag analytics"
  ON tag_analytics
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()));

-- Chat Message Reads policies
DROP POLICY IF EXISTS "Users can manage their own message reads" ON chat_message_reads;
DROP POLICY IF EXISTS "Users can view message reads in their rooms" ON chat_message_reads;

CREATE POLICY "Users can manage their own message reads"
  ON chat_message_reads
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view message reads in their rooms"
  ON chat_message_reads
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_messages m
      JOIN chat_memberships mb ON m.room_id = mb.room_id
      WHERE m.id = message_id
      AND mb.user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tag_analytics_tag_date 
  ON tag_analytics(tag_id, date);

CREATE INDEX IF NOT EXISTS idx_chat_message_reads_message 
  ON chat_message_reads(message_id);

CREATE INDEX IF NOT EXISTS idx_chat_message_reads_user 
  ON chat_message_reads(user_id);