-- lib/db/assessment-schema.sql
-- Schema for FilingControl assessment persistence.
-- Tables: fc_users, fc_entities, fc_assessments.
-- Run against Supabase project to provision tables.

-- ─── Users (email-only placeholder) ──────────────────────────────────

CREATE TABLE IF NOT EXISTS fc_users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fc_users_email ON fc_users (email);

-- ─── Entities ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS fc_entities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES fc_users (id) ON DELETE CASCADE,
  name        TEXT NOT NULL DEFAULT 'Unnamed Entity',
  entity_type TEXT NOT NULL DEFAULT 'llc',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fc_entities_user ON fc_entities (user_id);

-- ─── Assessments ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS fc_assessments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id       UUID NOT NULL REFERENCES fc_entities (id) ON DELETE CASCADE,
  engine_version  TEXT NOT NULL,
  risk_score      INTEGER NOT NULL,
  risk_level      TEXT NOT NULL CHECK (risk_level IN ('LOW', 'MODERATE', 'HIGH')),
  result_json     JSONB NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fc_assessments_entity ON fc_assessments (entity_id);
CREATE INDEX IF NOT EXISTS idx_fc_assessments_created ON fc_assessments (entity_id, created_at DESC);

-- ─── RLS (disabled for now — no production auth) ─────────────────────
-- Enable RLS and add policies when auth is integrated.
