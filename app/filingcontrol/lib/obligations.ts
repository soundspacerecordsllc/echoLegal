// app/filingcontrol/lib/obligations.ts
// Deterministic filing-obligation checker. Pure function, no DB, no auth.
// Educational output only — not legal or tax advice.

export type EntityType = 'llc' | 'corporation' | 'partnership' | 'sole_prop'

export type FilingInput = {
  entityType: EntityType
  foreignOwned: boolean
  usBusinessActivity: boolean
  hasUSIncome: boolean
  taxYear: number
  state: string
}

export type Obligation = {
  title: string
  form: string | null
  authority: string
  explanation: string
}

export function computeObligations(input: FilingInput): Obligation[] {
  const results: Obligation[] = []

  // --- Foreign-owned LLC ---
  if (input.entityType === 'llc' && input.foreignOwned) {
    results.push({
      title: 'Information return for 25% foreign-owned U.S. LLC',
      form: 'Form 5472 + pro forma Form 1120',
      authority: 'IRS (26 USC §6038A)',
      explanation:
        'A foreign-owned single-member LLC treated as a disregarded entity is generally required to file Form 5472 attached to a pro forma Form 1120 to report transactions between the LLC and its foreign owner.',
    })
  }

  // --- Corporation ---
  if (input.entityType === 'corporation') {
    if (input.foreignOwned && input.usBusinessActivity) {
      results.push({
        title: 'Income tax return of a foreign corporation',
        form: 'Form 1120-F',
        authority: 'IRS (26 USC §882)',
        explanation:
          'A foreign corporation engaged in a trade or business within the United States generally must file Form 1120-F to report income effectively connected with that activity.',
      })
    } else if (!input.foreignOwned) {
      results.push({
        title: 'U.S. corporation income tax return',
        form: 'Form 1120',
        authority: 'IRS (26 USC §6012)',
        explanation:
          'A domestic C corporation files Form 1120 annually to report income, gains, losses, deductions, and credits.',
      })
    }
  }

  // --- Partnership ---
  if (input.entityType === 'partnership') {
    results.push({
      title: 'Return of partnership income',
      form: 'Form 1065',
      authority: 'IRS (26 USC §6031)',
      explanation:
        'Partnerships file an information return on Form 1065. Each partner receives a Schedule K-1 reflecting their share of income and deductions.',
    })
  }

  // --- Sole proprietorship ---
  if (input.entityType === 'sole_prop') {
    results.push({
      title: 'Profit or loss from business',
      form: 'Schedule C (Form 1040)',
      authority: 'IRS (26 USC §6012)',
      explanation:
        'Sole proprietors report business income and expenses on Schedule C, attached to their individual Form 1040.',
    })
  }

  // --- US income triggers ---
  if (input.hasUSIncome) {
    results.push({
      title: 'Federal estimated tax payments (if applicable)',
      form: 'Form 1040-ES / 1120-W',
      authority: 'IRS (26 USC §6654 / §6655)',
      explanation:
        'Entities and individuals with U.S.-source income may need to make quarterly estimated tax payments to avoid underpayment penalties.',
    })
  }

  // --- Foreign-owned + EIN ---
  if (input.foreignOwned) {
    results.push({
      title: 'Employer Identification Number',
      form: 'Form SS-4',
      authority: 'IRS',
      explanation:
        'Foreign-owned entities operating in the U.S. generally need an EIN for tax filing, banking, and hiring purposes.',
    })

    results.push({
      title: 'Beneficial Ownership Information report',
      form: 'BOI Report (FinCEN)',
      authority: 'FinCEN (31 USC §5336)',
      explanation:
        'Most entities formed or registered in the U.S. must report beneficial ownership information to FinCEN. New entities formed after January 1, 2024 must file within 90 days of formation.',
    })
  }

  // --- State obligations (always) ---
  if (input.state.trim()) {
    results.push({
      title: `State annual report / franchise tax (${input.state.toUpperCase()})`,
      form: null,
      authority: `${input.state.toUpperCase()} Secretary of State`,
      explanation:
        'Most states require an annual or biennial report filing and may impose a franchise tax or business privilege tax. Deadlines and fees vary by state.',
    })
  }

  results.push({
    title: 'Maintain registered agent',
    form: null,
    authority: 'State of formation',
    explanation:
      'Entities formed in a U.S. state must maintain a registered agent in that state to receive legal and government correspondence.',
  })

  // --- Minimal obligations note ---
  if (!input.usBusinessActivity && !input.hasUSIncome && !input.foreignOwned) {
    results.push({
      title: 'Potentially reduced federal filing obligations',
      form: null,
      authority: 'General guidance',
      explanation:
        'With no U.S. business activity, no U.S. income, and domestic ownership, federal filing obligations may be limited. State-level annual reports and registered agent requirements typically still apply.',
    })
  }

  return results
}
