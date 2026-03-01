-- FilingControl Compliance State Schema
-- Monitoring layer: tracks computed compliance status per entity.
-- Run in Supabase SQL Editor after the base control-panel schema.

-- ─── Entities ─────────────────────────────────────────────────────────
-- Each row represents a user-owned entity tracked by FilingControl.

CREATE TABLE IF NOT EXISTS fc_entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  state_of_formation TEXT NOT NULL,
  formation_date DATE NOT NULL,
  ein_status TEXT NOT NULL DEFAULT 'not_applied'
    CHECK (ein_status IN ('not_applied', 'applied_pending', 'received')),
  tax_classification TEXT NOT NULL DEFAULT 'disregarded_entity'
    CHECK (tax_classification IN ('disregarded_entity', 'c_corp', 's_corp', 'partnership')),
  foreign_owner BOOLEAN NOT NULL DEFAULT TRUE,
  fiscal_year_end_month INTEGER NOT NULL DEFAULT 12
    CHECK (fiscal_year_end_month BETWEEN 1 AND 12),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE fc_entities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own entities"
  ON fc_entities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own entities"
  ON fc_entities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own entities"
  ON fc_entities FOR UPDATE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_fc_entities_user
  ON fc_entities(user_id);

-- NOTE: fc_assessments is defined in fc-assessments-schema.sql (user_id based).
-- The monitoring job joins fc_entities.user_id → fc_assessments.user_id.

-- ─── Compliance State ─────────────────────────────────────────────────
-- Single current-row per entity. Upserted by the monitoring job.

CREATE TABLE IF NOT EXISTS fc_compliance_state (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id UUID NOT NULL REFERENCES fc_entities(id) ON DELETE CASCADE UNIQUE,
  next_deadline_form TEXT NOT NULL,
  next_deadline_date DATE NOT NULL,
  days_remaining INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('CURRENT', 'DUE_SOON', 'OVERDUE')),
  urgency TEXT NOT NULL CHECK (urgency IN ('NONE', 'AMBER', 'RED')),
  engine_version TEXT NOT NULL,
  last_evaluated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE fc_compliance_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own compliance state"
  ON fc_compliance_state FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM fc_entities
      WHERE fc_entities.id = fc_compliance_state.entity_id
        AND fc_entities.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own compliance state"
  ON fc_compliance_state FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM fc_entities
      WHERE fc_entities.id = fc_compliance_state.entity_id
        AND fc_entities.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_fc_compliance_state_status
  ON fc_compliance_state(status);

CREATE INDEX IF NOT EXISTS idx_fc_compliance_state_deadline
  ON fc_compliance_state(next_deadline_date);

-- ─── Triggers ─────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION fc_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER fc_entities_updated_at
  BEFORE UPDATE ON fc_entities
  FOR EACH ROW EXECUTE FUNCTION fc_update_updated_at();
