// lib/engine/questionnaire.ts
// JSON-driven questionnaire schema for the FilingControl intake flow.
// No UI logic — purely data.

export interface Question {
  id: string
  text: string
  type: 'boolean'
  required: true
}

export const QUESTIONS: readonly Question[] = [
  {
    id: 'foreignOwner',
    text: 'Is the LLC owned (in whole or part) by a foreign person or entity?',
    type: 'boolean',
    required: true,
  },
  {
    id: 'singleMember',
    text: 'Is this a single-member LLC (disregarded entity for tax purposes)?',
    type: 'boolean',
    required: true,
  },
  {
    id: 'hasEIN',
    text: 'Does the LLC have an Employer Identification Number (EIN)?',
    type: 'boolean',
    required: true,
  },
  {
    id: 'hasRelatedPartyTransactions',
    text: 'Has the LLC engaged in reportable transactions with related foreign parties during the tax year?',
    type: 'boolean',
    required: true,
  },
  {
    id: 'hasRevenue',
    text: 'Did the LLC receive revenue or income during the tax year?',
    type: 'boolean',
    required: true,
  },
  {
    id: 'prior5472Filed',
    text: 'Was Form 5472 filed for the most recent prior tax year (if applicable)?',
    type: 'boolean',
    required: true,
  },
] as const
