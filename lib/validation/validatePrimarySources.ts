/**
 * Build-time validation for primary sources structural guarantees.
 *
 * Validates that every entry in the primary sources registry
 * satisfies the structural authority requirements:
 *   - authorityLevel must exist and be a valid AuthorityLevel
 *   - canonicalId must exist and be non-empty
 *   - jurisdiction must exist and be non-empty
 *   - authorityLevel must be present in AUTHORITY_LEVEL_WEIGHT
 *
 * This module is consumed by scripts/validate-primary-sources.js
 * at prebuild time. Build MUST fail if validation fails.
 */

import type { AuthorityLevel } from '@/lib/content-schema'
import { AUTHORITY_LEVEL_WEIGHT } from '@/lib/citations/canon'
import { getRegistrySlugs, getRawRegistryEntries } from '@/lib/primary-sources-registry'

export type ValidationError = {
  slug: string
  index: number
  field: string
  message: string
}

const VALID_AUTHORITY_LEVELS: AuthorityLevel[] = [
  'constitutional',
  'federal_statute',
  'federal_regulation',
  'state_statute',
  'treaty',
  'agency_guidance',
  'form_instruction',
  'publication',
]

export function validateAllPrimarySources(): ValidationError[] {
  const errors: ValidationError[] = []
  const slugs = getRegistrySlugs()

  for (const slug of slugs) {
    const entries = getRawRegistryEntries(slug)
    if (!entries || entries.length === 0) {
      errors.push({ slug, index: -1, field: 'primarySources', message: `Registry entry "${slug}" has no primary sources` })
      continue
    }

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]

      if (!entry.authorityLevel) {
        errors.push({ slug, index: i, field: 'authorityLevel', message: `Structural Authority Violation: [${slug}] source ${i} missing authorityLevel` })
      } else if (!VALID_AUTHORITY_LEVELS.includes(entry.authorityLevel)) {
        errors.push({ slug, index: i, field: 'authorityLevel', message: `Structural Authority Violation: [${slug}] source ${i} has unknown authorityLevel "${entry.authorityLevel}"` })
      } else if (!(entry.authorityLevel in AUTHORITY_LEVEL_WEIGHT)) {
        errors.push({ slug, index: i, field: 'authorityLevel', message: `Structural Authority Violation: [${slug}] source ${i} authorityLevel "${entry.authorityLevel}" not in AUTHORITY_LEVEL_WEIGHT` })
      }

      if (!entry.canonicalId) {
        errors.push({ slug, index: i, field: 'canonicalId', message: `Structural Authority Violation: [${slug}] source ${i} missing canonicalId` })
      }

      if (!entry.jurisdiction) {
        errors.push({ slug, index: i, field: 'jurisdiction', message: `Structural Authority Violation: [${slug}] source ${i} missing jurisdiction` })
      }
    }
  }

  return errors
}
