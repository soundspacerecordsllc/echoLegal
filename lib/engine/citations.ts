// lib/engine/citations.ts
// Legal citation registry for compliance rule references.
// Neutral, factual descriptions only.

export interface Citation {
  code: string
  short: string
  description: string
}

export const CITATIONS = {
  FORM_5472: {
    code: 'IRC_6038A',
    short: 'IRC \u00A76038A(d)',
    description:
      'Information reporting requirements for certain foreign-owned U.S. corporations and disregarded entities.',
  },
  FORM_1120: {
    code: 'IRC_6012',
    short: 'IRC \u00A76012',
    description:
      'Requirement to file income tax returns, including pro forma returns for foreign-owned disregarded entities.',
  },
  EIN_REQUIREMENT: {
    code: 'IRC_6109',
    short: 'IRC \u00A76109',
    description:
      'Requirement to furnish a taxpayer identification number (EIN) on returns and statements.',
  },
} as const satisfies Record<string, Citation>
