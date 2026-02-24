// lib/control-panel/compliance-rules.ts
// Deterministic compliance rules engine for foreign-owned single-member LLCs.
// Takes an LLC profile and returns applicable compliance items with calculated due dates.
// No external calls. Testable in isolation.

import {
  ComplianceItem,
  ComplianceFrequency,
  LLCProfile,
  UserComplianceItem,
} from './types'

// ─── Master Compliance Item Registry ────────────────────────────────
// These are the canonical compliance requirements for a foreign-owned
// single-member LLC operating in the US. Each item is keyed for
// deterministic lookup.

export const COMPLIANCE_ITEMS: ComplianceItem[] = [
  // ── Federal: IRS ──────────────────────────────────────────────────
  {
    id: 'federal-ein-application',
    key: 'irs_ein_application',
    title: 'Apply for EIN (Form SS-4)',
    description:
      'Obtain an Employer Identification Number from the IRS. Required for tax filing, bank accounts, and hiring.',
    authority_level: 'federal',
    jurisdiction: 'federal',
    frequency: 'one_time',
    reference_event: 'formation_date',
    offset_days: 30,
    url: 'https://www.irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online',
    active: true,
  },
  {
    id: 'federal-form-5472',
    key: 'irs_form_5472',
    title: 'File Form 5472 with Pro Forma 1120',
    description:
      'Foreign-owned single-member LLCs must file Form 5472 (Information Return of a 25% Foreign-Owned U.S. Corporation) attached to a pro forma Form 1120. Due by the 15th day of the 4th month after fiscal year end.',
    authority_level: 'federal',
    jurisdiction: 'federal',
    frequency: 'annual',
    reference_event: 'fiscal_year_end',
    offset_days: 105, // ~3.5 months (15th day of 4th month)
    url: 'https://www.irs.gov/forms-pubs/about-form-5472',
    active: true,
  },
  {
    id: 'federal-fbar',
    key: 'fincen_fbar',
    title: 'FinCEN FBAR (Form 114)',
    description:
      'Report of Foreign Bank and Financial Accounts. Required if aggregate value of foreign financial accounts exceeds $10,000 at any time during the calendar year. Due April 15, automatic extension to October 15.',
    authority_level: 'federal',
    jurisdiction: 'federal',
    frequency: 'annual',
    reference_event: 'fiscal_year_end',
    offset_days: 105,
    url: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts',
    active: true,
  },
  {
    id: 'federal-boi-report',
    key: 'fincen_boi',
    title: 'Beneficial Ownership Information Report (BOI)',
    description:
      'File Beneficial Ownership Information report with FinCEN. New companies formed after Jan 1, 2024 must file within 90 days of formation. Existing companies by Jan 1, 2025.',
    authority_level: 'federal',
    jurisdiction: 'federal',
    frequency: 'one_time',
    reference_event: 'formation_date',
    offset_days: 90,
    url: 'https://www.fincen.gov/boi',
    active: true,
  },
  {
    id: 'federal-itin-application',
    key: 'irs_itin',
    title: 'Apply for ITIN (Form W-7) if no SSN',
    description:
      'Non-resident members without an SSN need an Individual Taxpayer Identification Number for tax filing purposes.',
    authority_level: 'federal',
    jurisdiction: 'federal',
    frequency: 'one_time',
    reference_event: 'formation_date',
    offset_days: 60,
    url: 'https://www.irs.gov/individuals/individual-taxpayer-identification-number',
    active: true,
  },
  {
    id: 'federal-registered-agent',
    key: 'registered_agent_renewal',
    title: 'Maintain Registered Agent',
    description:
      'Ensure your registered agent designation is current. Most registered agent services renew annually.',
    authority_level: 'federal',
    jurisdiction: 'federal',
    frequency: 'annual',
    reference_event: 'formation_date',
    offset_days: 365,
    url: null,
    active: true,
  },

  // ── State-level (generic, applies to all states) ──────────────────
  {
    id: 'state-annual-report',
    key: 'state_annual_report',
    title: 'File State Annual Report',
    description:
      'Most states require an annual (or biennial) report filing with the Secretary of State. Deadlines and fees vary by state.',
    authority_level: 'state',
    jurisdiction: 'any',
    frequency: 'annual',
    reference_event: 'formation_date',
    offset_days: 365,
    url: null,
    active: true,
  },
  {
    id: 'state-franchise-tax',
    key: 'state_franchise_tax',
    title: 'Pay State Franchise Tax / Business Tax',
    description:
      'Some states impose a franchise tax or annual business tax on LLCs. Check your state requirements.',
    authority_level: 'state',
    jurisdiction: 'any',
    frequency: 'annual',
    reference_event: 'fiscal_year_end',
    offset_days: 105,
    url: null,
    active: true,
  },
]

// ─── State-specific overrides ───────────────────────────────────────
// MVP: minimal. Expand per state as needed.

type StateOverride = {
  annual_report_month?: number // 1-12, month when annual report is due
  annual_report_day?: number
  has_franchise_tax: boolean
  franchise_tax_month?: number
  franchise_tax_day?: number
}

const STATE_OVERRIDES: Record<string, StateOverride> = {
  FL: {
    annual_report_month: 5,
    annual_report_day: 1,
    has_franchise_tax: false,
  },
  WY: {
    annual_report_month: undefined, // anniversary month
    annual_report_day: 1,
    has_franchise_tax: false,
  },
  DE: {
    annual_report_month: 6,
    annual_report_day: 1,
    has_franchise_tax: true,
    franchise_tax_month: 6,
    franchise_tax_day: 1,
  },
  NM: {
    annual_report_month: undefined, // no annual report
    annual_report_day: undefined,
    has_franchise_tax: false,
  },
  TX: {
    annual_report_month: 5,
    annual_report_day: 15,
    has_franchise_tax: true,
    franchise_tax_month: 5,
    franchise_tax_day: 15,
  },
}

// ─── Engine ─────────────────────────────────────────────────────────

export type GeneratedComplianceItem = {
  compliance_item: ComplianceItem
  due_date: string // ISO date
}

/**
 * Given an LLC profile, return the list of applicable compliance items
 * with calculated due dates.
 */
export function generateComplianceItems(
  profile: LLCProfile
): GeneratedComplianceItem[] {
  const results: GeneratedComplianceItem[] = []
  const formationDate = new Date(profile.formation_date)
  const now = new Date()
  const stateCode = profile.state_of_formation.toUpperCase()
  const stateOverride = STATE_OVERRIDES[stateCode]

  for (const item of COMPLIANCE_ITEMS) {
    // Skip state items that don't apply
    if (item.key === 'state_franchise_tax') {
      if (!stateOverride?.has_franchise_tax) continue
    }

    // Skip EIN application if already received
    if (item.key === 'irs_ein_application' && profile.ein_status === 'received') {
      continue
    }

    // Calculate due date
    const dueDate = calculateDueDate(item, profile, stateOverride, now)
    if (!dueDate) continue

    results.push({
      compliance_item: {
        ...item,
        // Override jurisdiction for state items
        jurisdiction:
          item.jurisdiction === 'any' ? stateCode : item.jurisdiction,
      },
      due_date: dueDate,
    })
  }

  return results.sort(
    (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  )
}

function calculateDueDate(
  item: ComplianceItem,
  profile: LLCProfile,
  stateOverride: StateOverride | undefined,
  now: Date
): string | null {
  const formationDate = new Date(profile.formation_date)

  if (item.frequency === 'one_time') {
    // One-time items: offset from formation date
    const due = new Date(formationDate)
    due.setDate(due.getDate() + item.offset_days)
    return due.toISOString().split('T')[0]
  }

  // State-specific overrides take precedence over generic reference_event logic
  if (item.key === 'state_annual_report' && stateOverride) {
    if (!stateOverride.annual_report_month && !stateOverride.annual_report_day) {
      return null // State doesn't require annual report (e.g., NM)
    }
    const month = stateOverride.annual_report_month || (formationDate.getMonth() + 1)
    const day = stateOverride.annual_report_day || 1
    return getNextAnnualDate(month, day, now)
  }

  if (item.key === 'state_franchise_tax' && stateOverride) {
    const month = stateOverride.franchise_tax_month || 6
    const day = stateOverride.franchise_tax_day || 1
    return getNextAnnualDate(month, day, now)
  }

  // Recurring items: find the next occurrence
  if (item.reference_event === 'fiscal_year_end') {
    return getNextFiscalDeadline(profile.fiscal_year_end_month, item.offset_days, now)
  }

  if (item.reference_event === 'formation_date') {
    // Default: anniversary of formation + offset
    return getNextAnniversary(formationDate, item.offset_days, now)
  }

  return null
}

/**
 * Next deadline relative to fiscal year end.
 * E.g., fiscal year ends Dec 31, offset 105 days = April 15.
 */
function getNextFiscalDeadline(
  fiscalYearEndMonth: number,
  offsetDays: number,
  now: Date
): string {
  // Try current year's fiscal year end first
  let year = now.getFullYear()
  let fyEnd = new Date(year, fiscalYearEndMonth - 1 + 1, 0) // last day of month
  let deadline = new Date(fyEnd)
  deadline.setDate(deadline.getDate() + offsetDays)

  // If deadline already passed, use next year
  if (deadline < now) {
    year++
    fyEnd = new Date(year, fiscalYearEndMonth - 1 + 1, 0)
    deadline = new Date(fyEnd)
    deadline.setDate(deadline.getDate() + offsetDays)
  }

  return deadline.toISOString().split('T')[0]
}

/**
 * Next occurrence of a fixed annual date (month/day).
 */
function getNextAnnualDate(
  month: number,
  day: number,
  now: Date
): string {
  let year = now.getFullYear()
  let target = new Date(year, month - 1, day)
  if (target < now) {
    target = new Date(year + 1, month - 1, day)
  }
  return target.toISOString().split('T')[0]
}

/**
 * Next anniversary of a date plus offset days.
 */
function getNextAnniversary(
  baseDate: Date,
  offsetDays: number,
  now: Date
): string {
  let year = now.getFullYear()
  let anniversary = new Date(year, baseDate.getMonth(), baseDate.getDate())
  anniversary.setDate(anniversary.getDate() + offsetDays)

  if (anniversary < now) {
    anniversary = new Date(year + 1, baseDate.getMonth(), baseDate.getDate())
    anniversary.setDate(anniversary.getDate() + offsetDays)
  }

  return anniversary.toISOString().split('T')[0]
}
