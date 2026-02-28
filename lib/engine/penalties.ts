// lib/engine/penalties.ts
// Deterministic penalty registry for U.S. tax compliance.
// All amounts reflect published IRS penalty schedules.

export interface Penalty {
  amount: number
  currency: string
  description: string
  citation: string
  lastVerified: string
}

export const PENALTIES = {
  FORM_5472_FAILURE: {
    amount: 25_000,
    currency: 'USD',
    description: 'Failure to file Form 5472',
    citation: 'IRC \u00A76038A(d)',
    lastVerified: '2026-01-01',
  },
} as const satisfies Record<string, Penalty>
