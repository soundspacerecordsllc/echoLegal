-- FilingControl Assessments Schema
-- Stores assessment snapshots with computed deadlines.
-- Run in Supabase SQL Editor.

-- ─── Assessments ──────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS fc_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_profile JSONB NOT NULL,
  assessment_result JSONB NOT NULL,
  deadlines_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  engine_version TEXT NOT NULL DEFAULT '1.0.0',
  tax_year INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE fc_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own assessments"
  ON fc_assessments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments"
  ON fc_assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_fc_assessments_user
  ON fc_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_fc_assessments_created
  ON fc_assessments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fc_assessments_tax_year
  ON fc_assessments(tax_year);
