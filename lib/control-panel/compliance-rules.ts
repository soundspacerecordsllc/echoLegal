// lib/control-panel/compliance-rules.ts
// Deterministic compliance rules engine for foreign-owned single-member LLCs.
// Takes an LLC profile and returns applicable compliance items with calculated due dates.
// No external calls. Testable in isolation.

import {
  ComplianceItem,
  LLCProfile,
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
    authority_label: 'IRS',
    authority_url: 'https://www.irs.gov',
    summary_text:
      'An Employer Identification Number (EIN) is a federal tax identification number assigned by the IRS. Foreign-owned LLCs require an EIN to open U.S. bank accounts, file federal tax returns, and comply with withholding obligations.',
    risk_note:
      'Operating without an EIN may delay bank account opening and trigger penalties for late tax filings.',
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
    authority_label: 'IRS',
    authority_url: 'https://www.irs.gov',
    summary_text:
      'Form 5472 reports transactions between a foreign-owned U.S. LLC and its foreign owner. The IRS requires this form to be filed annually with a pro forma Form 1120, even if the LLC has no income or activity during the tax year.',
    risk_note:
      'Failure to file or late filing may result in a $25,000 penalty per return, per year (IRC §6038A(d)).',
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
    authority_label: 'FinCEN',
    authority_url: 'https://www.fincen.gov',
    summary_text:
      'The Foreign Bank Account Report (FBAR) is filed with FinCEN by U.S. persons, including entities, who hold financial interest in or signature authority over foreign accounts exceeding $10,000 in aggregate value at any point during the calendar year.',
    risk_note:
      'Non-willful violations may result in penalties up to $10,000 per account. Willful violations carry substantially higher penalties.',
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
    authority_label: 'FinCEN',
    authority_url: 'https://www.fincen.gov',
    summary_text:
      'The Corporate Transparency Act requires most LLCs to report their beneficial owners to FinCEN. This includes the identity of individuals who own or control the company, intended to prevent illicit use of anonymous shell entities.',
    risk_note:
      'Failure to file a BOI report may result in civil penalties of up to $500 per day the report is late, and potential criminal penalties.',
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
    authority_label: 'IRS',
    authority_url: 'https://www.irs.gov',
    summary_text:
      'An Individual Taxpayer Identification Number (ITIN) is issued by the IRS to individuals who are required to have a U.S. taxpayer identification number but are not eligible for a Social Security Number. Foreign LLC owners typically need an ITIN to file required U.S. tax returns.',
    risk_note:
      'Without an ITIN, the foreign owner may be unable to file required tax returns, potentially leading to penalties and withholding complications.',
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
    authority_label: 'State Secretary of State',
    summary_text:
      'Every LLC must maintain a registered agent with a physical address in its state of formation. The registered agent receives legal and government correspondence on behalf of the LLC, including service of process.',
    risk_note:
      'Failure to maintain a registered agent may result in administrative dissolution of the LLC and loss of good standing.',
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
    authority_label: 'State Secretary of State',
    summary_text:
      'Annual reports confirm that an LLC\'s information on file with the state is current, including its registered agent, principal address, and member/manager details. Filing requirements and fees vary by jurisdiction.',
    risk_note:
      'Late or missed annual report filings may result in late fees, loss of good standing, or involuntary dissolution of the LLC.',
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
    authority_label: 'State Tax Authority',
    summary_text:
      'Franchise taxes are levied by certain states for the privilege of doing business in that jurisdiction. The amount and calculation method vary by state. This obligation is separate from income tax and applies regardless of whether the LLC generates revenue.',
    risk_note:
      'Unpaid franchise taxes may result in penalties, interest, and eventual forfeiture or revocation of the LLC\'s authority to conduct business.',
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
 *
 * Checks three candidate fiscal years (year-1, year, year+1) and returns
 * the earliest deadline that is still >= now. This ensures that a filing
 * window from the prior fiscal year (e.g., FY2025 ending Dec 31, 2025
 * with deadline Apr 15, 2026) is returned when "now" falls between the
 * fiscal year end and its offset deadline.
 */
function getNextFiscalDeadline(
  fiscalYearEndMonth: number,
  offsetDays: number,
  now: Date
): string {
  const baseYear = now.getFullYear()

  for (const y of [baseYear - 1, baseYear, baseYear + 1]) {
    const fyEnd = new Date(y, fiscalYearEndMonth - 1 + 1, 0) // last day of FY-end month
    const deadline = new Date(fyEnd)
    deadline.setDate(deadline.getDate() + offsetDays)

    if (deadline >= now) {
      return deadline.toISOString().split('T')[0]
    }
  }

  // Fallback: should never reach here since year+1 always produces a future date
  const fyEnd = new Date(baseYear + 2, fiscalYearEndMonth - 1 + 1, 0)
  const deadline = new Date(fyEnd)
  deadline.setDate(deadline.getDate() + offsetDays)
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
