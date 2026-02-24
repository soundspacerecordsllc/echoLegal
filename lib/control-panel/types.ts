// lib/control-panel/types.ts
// Core types for Foreign-Owned Single-Member LLC Compliance Control Panel

// ─── User & Profile ────────────────────────────────────────────────

export type UserProfile = {
  user_id: string
  full_name: string | null
  locale: string
  timezone: string
  created_at: string
  updated_at: string
}

// ─── LLC Profile ────────────────────────────────────────────────────

export type TaxClassification =
  | 'disregarded_entity'
  | 'c_corp'
  | 's_corp'
  | 'partnership'

export type EINStatus =
  | 'not_applied'
  | 'applied_pending'
  | 'received'

export type LLCProfile = {
  id: string
  user_id: string
  company_name: string
  state_of_formation: string
  formation_date: string // ISO date
  ein_status: EINStatus
  tax_classification: TaxClassification
  foreign_owner: true // always true for this product
  fiscal_year_end_month: number // 1-12
  has_us_bank_account: boolean
  created_at: string
  updated_at: string
}

// ─── Compliance Items ───────────────────────────────────────────────

export type AuthorityLevel = 'federal' | 'state'
export type ComplianceFrequency = 'one_time' | 'annual' | 'quarterly' | 'monthly'

export type ComplianceItem = {
  id: string
  key: string // machine-readable identifier, e.g. "irs_form_5472"
  title: string
  description: string
  authority_level: AuthorityLevel
  jurisdiction: string // "federal" or state code e.g. "FL", "WY"
  frequency: ComplianceFrequency
  // Offset in days from reference date (formation_date or fiscal_year_end)
  reference_event: 'formation_date' | 'fiscal_year_end'
  offset_days: number
  url: string | null // link to official source
  active: boolean
}

// ─── User Compliance Tracking ───────────────────────────────────────

export type ComplianceStatus =
  | 'pending'
  | 'upcoming'
  | 'due_soon'   // within 30 days
  | 'overdue'
  | 'completed'
  | 'not_applicable'

export type UserComplianceItem = {
  id: string
  user_id: string
  compliance_item_id: string
  status: ComplianceStatus
  due_date: string // ISO date
  completed_at: string | null
  last_reminder_sent_at: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

// ─── Subscription ───────────────────────────────────────────────────

export type SubscriptionStatus =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'unpaid'

export type Subscription = {
  id: string
  user_id: string
  stripe_customer_id: string
  stripe_subscription_id: string
  status: SubscriptionStatus
  plan_id: string
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

// ─── Onboarding ─────────────────────────────────────────────────────

export type OnboardingData = {
  company_name: string
  state_of_formation: string
  formation_date: string
  ein_status: EINStatus
  tax_classification: TaxClassification
  fiscal_year_end_month: number
  has_us_bank_account: boolean
}

// ─── API Responses ──────────────────────────────────────────────────

export type ChecklistEntry = {
  compliance_item: ComplianceItem
  user_status: UserComplianceItem
}

export type CalendarEntry = {
  date: string
  items: ChecklistEntry[]
}
