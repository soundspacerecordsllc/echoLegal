-- FilingControl Users Schema
-- User table with Stripe subscription gating.
-- Run in Supabase SQL Editor after enabling Supabase Auth.

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
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE fc_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own row"
  ON fc_users FOR SELECT
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Only service role can insert/update (checkout + webhook handlers)

CREATE INDEX IF NOT EXISTS idx_fc_users_email
  ON fc_users(email);

CREATE INDEX IF NOT EXISTS idx_fc_users_stripe_customer
  ON fc_users(stripe_customer_id);

-- ─── Stripe Event Idempotency ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS fc_stripe_events (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed BOOLEAN NOT NULL DEFAULT FALSE
);

-- No RLS needed — only service role accesses this table.

-- ─── Trigger ──────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION fc_users_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER fc_users_updated_at
  BEFORE UPDATE ON fc_users
  FOR EACH ROW EXECUTE FUNCTION fc_users_update_updated_at();
