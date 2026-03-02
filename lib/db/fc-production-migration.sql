-- FilingControl Production Migration
-- Run once in Supabase SQL Editor to create all FC billing/calendar tables.
-- Idempotent: uses IF NOT EXISTS / CREATE OR REPLACE throughout.
-- Prerequisite: Supabase Auth must be enabled (auth.users table exists).

BEGIN;

-- ═══════════════════════════════════════════════════════════════════════
-- 1. fc_users — plan + Stripe subscription fields + calendar token
-- ═══════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS fc_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL DEFAULT 'FREE'
    CHECK (plan IN ('FREE', 'PRO')),
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  subscription_status TEXT NOT NULL DEFAULT 'none'
    CHECK (subscription_status IN ('none', 'active', 'canceled', 'past_due', 'incomplete')),
  current_period_end TIMESTAMPTZ,
  calendar_token TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE fc_users ENABLE ROW LEVEL SECURITY;

-- Users can read their own row (matched by JWT email claim)
DO $$ BEGIN
  CREATE POLICY "Users can view own row"
    ON fc_users FOR SELECT
    USING (email = current_setting('request.jwt.claims', true)::json->>'email');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE INDEX IF NOT EXISTS idx_fc_users_email
  ON fc_users(email);

CREATE INDEX IF NOT EXISTS idx_fc_users_stripe_customer
  ON fc_users(stripe_customer_id);

CREATE INDEX IF NOT EXISTS idx_fc_users_calendar_token
  ON fc_users(calendar_token);

-- updated_at trigger
CREATE OR REPLACE FUNCTION fc_users_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS fc_users_updated_at ON fc_users;
CREATE TRIGGER fc_users_updated_at
  BEFORE UPDATE ON fc_users
  FOR EACH ROW EXECUTE FUNCTION fc_users_update_updated_at();

-- ═══════════════════════════════════════════════════════════════════════
-- 2. fc_stripe_events — webhook idempotency (dedupe by Stripe event ID)
-- ═══════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS fc_stripe_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed BOOLEAN NOT NULL DEFAULT FALSE
);

-- No RLS — only service role accesses this table.

-- ═══════════════════════════════════════════════════════════════════════
-- 3. Helper: email → auth.users.id
--    Used by calendar feed to bridge fc_users ↔ fc_entities.
-- ═══════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION fc_auth_user_id_by_email(p_email TEXT)
RETURNS UUID AS $$
  SELECT id FROM auth.users WHERE email = p_email LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

COMMIT;
