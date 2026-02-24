-- Control Panel Schema: Foreign-Owned Single-Member LLC Compliance
-- Run in Supabase SQL Editor after enabling Supabase Auth.

-- ─── Profiles ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS cp_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  locale TEXT NOT NULL DEFAULT 'en',
  timezone TEXT NOT NULL DEFAULT 'America/New_York',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE cp_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON cp_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON cp_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON cp_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ─── LLC Profiles ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS cp_llc_profiles (
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
  has_us_bank_account BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id) -- one LLC profile per user for MVP
);

ALTER TABLE cp_llc_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own LLC profile"
  ON cp_llc_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own LLC profile"
  ON cp_llc_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own LLC profile"
  ON cp_llc_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ─── Compliance Items (reference data, managed by admins) ───────────

CREATE TABLE IF NOT EXISTS cp_compliance_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  authority_level TEXT NOT NULL CHECK (authority_level IN ('federal', 'state')),
  jurisdiction TEXT NOT NULL, -- 'federal' or state code
  frequency TEXT NOT NULL
    CHECK (frequency IN ('one_time', 'annual', 'quarterly', 'monthly')),
  reference_event TEXT NOT NULL DEFAULT 'fiscal_year_end'
    CHECK (reference_event IN ('formation_date', 'fiscal_year_end')),
  offset_days INTEGER NOT NULL DEFAULT 0,
  url TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  authority_label TEXT,
  authority_url TEXT,
  summary_text TEXT,
  risk_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Public read access for compliance items (reference data)
ALTER TABLE cp_compliance_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active compliance items"
  ON cp_compliance_items FOR SELECT
  USING (active = TRUE);

-- ─── User Compliance Tracking ───────────────────────────────────────

CREATE TABLE IF NOT EXISTS cp_user_compliance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  compliance_item_id UUID NOT NULL REFERENCES cp_compliance_items(id),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'upcoming', 'due_soon', 'overdue', 'completed', 'not_applicable')),
  due_date DATE NOT NULL,
  completed_at TIMESTAMPTZ,
  last_reminder_sent_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, compliance_item_id, due_date)
);

ALTER TABLE cp_user_compliance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own compliance items"
  ON cp_user_compliance FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own compliance items"
  ON cp_user_compliance FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own compliance items"
  ON cp_user_compliance FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_cp_user_compliance_user
  ON cp_user_compliance(user_id);
CREATE INDEX IF NOT EXISTS idx_cp_user_compliance_due
  ON cp_user_compliance(due_date);
CREATE INDEX IF NOT EXISTS idx_cp_user_compliance_status
  ON cp_user_compliance(status);
CREATE INDEX IF NOT EXISTS idx_cp_user_compliance_reminder
  ON cp_user_compliance(last_reminder_sent_at)
  WHERE status NOT IN ('completed', 'not_applicable');

-- ─── Subscriptions ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS cp_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'trialing'
    CHECK (status IN ('trialing', 'active', 'past_due', 'canceled', 'unpaid')),
  plan_id TEXT NOT NULL,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id) -- one subscription per user for MVP
);

ALTER TABLE cp_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON cp_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Only service role can insert/update subscriptions (via webhook)
-- No INSERT/UPDATE policies for anon/authenticated roles.

-- ─── Triggers for updated_at ────────────────────────────────────────

-- Reuse the function from the existing schema if it exists,
-- otherwise create it.
CREATE OR REPLACE FUNCTION cp_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cp_profiles_updated_at
  BEFORE UPDATE ON cp_profiles
  FOR EACH ROW EXECUTE FUNCTION cp_update_updated_at();

CREATE TRIGGER cp_llc_profiles_updated_at
  BEFORE UPDATE ON cp_llc_profiles
  FOR EACH ROW EXECUTE FUNCTION cp_update_updated_at();

CREATE TRIGGER cp_user_compliance_updated_at
  BEFORE UPDATE ON cp_user_compliance
  FOR EACH ROW EXECUTE FUNCTION cp_update_updated_at();

CREATE TRIGGER cp_subscriptions_updated_at
  BEFORE UPDATE ON cp_subscriptions
  FOR EACH ROW EXECUTE FUNCTION cp_update_updated_at();
