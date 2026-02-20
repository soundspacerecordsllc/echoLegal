// lib/encyclopedia-authority.ts
// Deterministic authority-based ordering for the encyclopedia index.
//
// Entries are sorted by institutional authority hierarchy:
//   1. Federal / statutory-heavy topics
//   2. Core doctrinal framework (contract doctrine, enforceability)
//   3. Structural business formation (LLC, entity classification)
//   4. Compliance / regulatory obligation (privacy, tax reporting)
//   5. Procedural guides (practitioner-oriented)
//   6. Comparative / explanatory articles

// ============================================
// AUTHORITY LEVEL ENUM
// ============================================

/**
 * Authority classification for encyclopedia entries.
 *
 * Distinct from PrimarySourceEntry.AuthorityLevel (which classifies
 * individual legal sources). This classifies the *entry itself* by
 * the highest-weight authority domain it primarily addresses.
 */
export const EncyclopediaAuthorityLevel = {
  FEDERAL_STATUTORY: 'federal_statutory',
  DOCTRINAL_FRAMEWORK: 'doctrinal_framework',
  STRUCTURAL_FORMATION: 'structural_formation',
  COMPLIANCE_REGULATORY: 'compliance_regulatory',
  PROCEDURAL_GUIDE: 'procedural_guide',
  COMPARATIVE_EXPLANATORY: 'comparative_explanatory',
} as const

export type EncyclopediaAuthorityLevel =
  typeof EncyclopediaAuthorityLevel[keyof typeof EncyclopediaAuthorityLevel]

// ============================================
// AUTHORITY LEVEL WEIGHTS
// ============================================

/**
 * Non-discretionary weight map. Lower weight = higher authority = listed first.
 * Gaps allow future levels to be inserted without renumbering.
 */
const AUTHORITY_LEVEL_WEIGHT: Record<EncyclopediaAuthorityLevel, number> = {
  [EncyclopediaAuthorityLevel.FEDERAL_STATUTORY]: 100,
  [EncyclopediaAuthorityLevel.DOCTRINAL_FRAMEWORK]: 200,
  [EncyclopediaAuthorityLevel.STRUCTURAL_FORMATION]: 300,
  [EncyclopediaAuthorityLevel.COMPLIANCE_REGULATORY]: 400,
  [EncyclopediaAuthorityLevel.PROCEDURAL_GUIDE]: 500,
  [EncyclopediaAuthorityLevel.COMPARATIVE_EXPLANATORY]: 600,
}

// ============================================
// ENCYCLOPEDIA INDEX ENTRY TYPE
// ============================================

/**
 * Required shape for every entry in the encyclopedia index listing.
 * authorityLevel and canonicalId are non-optional — TypeScript will
 * reject any entry missing either field at compile time.
 */
export type EncyclopediaIndexEntry = {
  slug: string
  title: string
  description: string
  readTime: string
  available: boolean
  authorityLevel: EncyclopediaAuthorityLevel
  canonicalId: string
}

// ============================================
// DETERMINISTIC SORT
// ============================================

/**
 * Sort encyclopedia entries by institutional authority hierarchy.
 *
 * Primary:   authorityLevel weight (lower = higher authority)
 * Secondary: canonicalId lexicographic (stable tiebreaker)
 *
 * Returns a new array; does not mutate input.
 */
export function sortByAuthority<T extends EncyclopediaIndexEntry>(
  entries: T[]
): T[] {
  return [...entries].sort((a, b) => {
    const weightA = AUTHORITY_LEVEL_WEIGHT[a.authorityLevel]
    const weightB = AUTHORITY_LEVEL_WEIGHT[b.authorityLevel]
    if (weightA !== weightB) return weightA - weightB
    return a.canonicalId.localeCompare(b.canonicalId)
  })
}

// ============================================
// RUNTIME INVARIANTS
// ============================================

/**
 * Validate that every entry has a non-empty authorityLevel and canonicalId.
 *
 * In development: throws immediately so the error is visible during
 * local `next dev`. In production builds: returns validation errors
 * that the build pipeline can surface.
 *
 * Call this at module scope in the encyclopedia index page so missing
 * fields fail the build rather than silently rendering in wrong order.
 */
export function validateEncyclopediaEntries(
  entries: EncyclopediaIndexEntry[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  for (const entry of entries) {
    if (!entry.authorityLevel) {
      errors.push(
        `Encyclopedia entry "${entry.slug}" is missing required authorityLevel`
      )
    } else if (
      !Object.values(EncyclopediaAuthorityLevel).includes(entry.authorityLevel)
    ) {
      errors.push(
        `Encyclopedia entry "${entry.slug}" has invalid authorityLevel: "${entry.authorityLevel}"`
      )
    }

    if (!entry.canonicalId) {
      errors.push(
        `Encyclopedia entry "${entry.slug}" is missing required canonicalId`
      )
    } else if (!/^ecl-enc-\d{5}$/.test(entry.canonicalId)) {
      errors.push(
        `Encyclopedia entry "${entry.slug}" has invalid canonicalId format: "${entry.canonicalId}" (expected ecl-enc-XXXXX)`
      )
    }
  }

  // In dev mode, throw so the error is immediately visible
  if (errors.length > 0 && process.env.NODE_ENV === 'development') {
    throw new Error(
      `Encyclopedia entry validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`
    )
  }

  return { valid: errors.length === 0, errors }
}
