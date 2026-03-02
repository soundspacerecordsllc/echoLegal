-- FilingControl Notification Event Queue Schema
-- Deterministic, deduplicated events emitted by the monitoring job.
-- No email sending — events are queued for future delivery layers.
-- Run in Supabase SQL Editor after fc-compliance-state-schema.sql.

CREATE TABLE IF NOT EXISTS fc_notification_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID NOT NULL REFERENCES fc_entities(id) ON DELETE CASCADE,
  compliance_state_id UUID NULL REFERENCES fc_compliance_state(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL
    CHECK (event_type IN (
      'DUE_SOON_90', 'DUE_SOON_30', 'DUE_SOON_7',
      'DUE_TODAY', 'OVERDUE_1', 'STATUS_CHANGED'
    )),
  event_key TEXT NOT NULL UNIQUE,
  payload JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING'
    CHECK (status IN ('PENDING', 'SENT', 'CANCELLED')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sent_at TIMESTAMPTZ NULL
);

ALTER TABLE fc_notification_events ENABLE ROW LEVEL SECURITY;

-- Users can read their own events via entity ownership
CREATE POLICY "Users can view own notification events"
  ON fc_notification_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM fc_entities
      WHERE fc_entities.id = fc_notification_events.entity_id
        AND fc_entities.user_id = auth.uid()
    )
  );

-- Only service role (monitoring job) can insert — no user INSERT policy
-- Only service role can update status (SENT/CANCELLED) — no user UPDATE policy

CREATE INDEX IF NOT EXISTS idx_fc_notification_events_status
  ON fc_notification_events(status);

CREATE INDEX IF NOT EXISTS idx_fc_notification_events_entity
  ON fc_notification_events(entity_id);

CREATE INDEX IF NOT EXISTS idx_fc_notification_events_created
  ON fc_notification_events(created_at DESC);
