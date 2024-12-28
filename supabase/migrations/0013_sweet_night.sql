-- Add required columns if they don't exist
DO $$ 
BEGIN
  -- Add status column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'events' 
    AND column_name = 'status'
  ) THEN
    ALTER TABLE events ADD COLUMN status text DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published', 'Cancelled', 'Completed'));
  END IF;

  -- Add organizer_id column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'events' 
    AND column_name = 'organizer_id'
  ) THEN
    ALTER TABLE events ADD COLUMN organizer_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public users can view published events"
  ON events
  FOR SELECT
  USING (status = 'Published');

CREATE POLICY "Organizers can manage their own events"
  ON events
  FOR ALL
  TO authenticated
  USING (organizer_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_organizer_id 
  ON events(organizer_id);
CREATE INDEX IF NOT EXISTS idx_events_status 
  ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date 
  ON events(date);

-- Add audit trigger
CREATE OR REPLACE FUNCTION audit_event_changes()
RETURNS trigger AS $$
BEGIN
  INSERT INTO audit_logs (
    table_name,
    action,
    user_id,
    old_data,
    new_data
  ) VALUES (
    'events',
    TG_OP,
    auth.uid(),
    CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create audit trigger
DROP TRIGGER IF EXISTS events_audit ON events;
CREATE TRIGGER events_audit
  AFTER INSERT OR UPDATE OR DELETE ON events
  FOR EACH ROW
  EXECUTE FUNCTION audit_event_changes();