// lib/filingcontrol/config.ts
// FilingControl app configuration. Isolated branding and plan definitions.
// Shared infrastructure (auth, db, stripe, compliance engine) lives in lib/control-panel/.

export const FC_APP = {
  name: 'FilingControl',
  tagline: 'Foreign-Owned LLC Compliance Radar',
  domain: 'filingcontrolapp.com',
  basePath: '/filingcontrol',
  dashboardPath: '/filingcontrol/dashboard',
  loginPath: '/filingcontrol/login',
  pricingPath: '/filingcontrol/pricing',
} as const

export const FC_PLAN_FREE = {
  name: 'Free',
  price: 0,
  interval: 'month' as const,
  description: 'View deadlines. No reminders.',
} as const

export const FC_PLAN = {
  name: 'Pro',
  price: 49,
  interval: 'month' as const,
  features: ['reminders'] as const,
  description: 'IRS penalty alerts, 30/7/1-day reminders, overdue escalation.',
}

// Feature that Pro plan unlocks (maps to canAccessFeature)
export const FC_GATED_FEATURE = 'email_reminders' as const
