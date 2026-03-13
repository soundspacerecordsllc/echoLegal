-- FilingControl Email Delivery Log
-- Tracks every reminder send attempt for debugging and audit.
-- Run in Supabase SQL Editor after fc-notification-queue-schema.sql.

CREATE TABLE IF NOT EXISTS fc_email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  entity_id UUID NOT NULL REFERENCES fc_entities(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES fc_notification_events(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL DEFAULT 'reminder',
  recipient TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'skipped')),
  error_message TEXT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE fc_email_logs ENABLE ROW LEVEL SECURITY;

-- Users can view their own email logs via entity ownership
CREATE POLICY "Users can view own email logs"
  ON fc_email_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM fc_entities
      WHERE fc_entities.id = fc_email_logs.entity_id
        AND fc_entities.user_id = auth.uid()
    )
  );

-- Only service role can insert (cron job)
-- No user INSERT/UPDATE/DELETE policies

CREATE INDEX IF NOT EXISTS idx_fc_email_logs_event
  ON fc_email_logs(event_id);

CREATE INDEX IF NOT EXISTS idx_fc_email_logs_entity
  ON fc_email_logs(entity_id);

CREATE INDEX IF NOT EXISTS idx_fc_email_logs_sent_at
  ON fc_email_logs(sent_at DESC);
