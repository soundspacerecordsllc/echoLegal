// lib/filingcontrol/config.ts
// FilingControl app configuration. Isolated branding and plan definitions.
// Shared infrastructure (auth, db, stripe, compliance engine) lives in lib/control-panel/.

export const FC_APP = {
  name: 'FilingControl',
  tagline: 'Structured compliance tracking for U.S. entities.',
  domain: 'filingcontrolapp.com',
  basePath: '/filingcontrol',
  dashboardPath: '/filingcontrol/dashboard',
  loginPath: '/filingcontrol/login',
  pricingPath: '/filingcontrol/pricing',
} as const

// Single plan: Pro – $49/month
export const FC_PLAN = {
  name: 'Pro',
  price: 49,
  interval: 'month' as const,
  features: ['reminders'] as const,
  description: 'Full compliance tracking with email reminders.',
}

// Feature that Pro plan unlocks (maps to canAccessFeature)
export const FC_GATED_FEATURE = 'email_reminders' as const
