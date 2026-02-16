/**
 * EchoLegal Citation Canon v1
 *
 * Canonical normalization rules for legal citation metadata fields.
 * These functions are intended for citation and label fields only —
 * NOT for narrative body text.
 *
 * Standard: Bluebook-adjacent, adapted for web rendering.
 */

export const CITATION_CANON_VERSION = '1.0'

// ============================================
// NORMALIZATION: CITATION FIELDS
// ============================================

/**
 * Normalize a citation string to Canon v1 format.
 *
 * Applies to: primarySources.citation, registry citation fields,
 * and any structured citation metadata.
 *
 * Does NOT apply to: body text, page titles, user-facing prose.
 */
export function normalizeCitationText(input: string): string {
  let s = input

  // 1. Collapse double spaces
  s = s.replace(/ {2,}/g, ' ')

  // 2. Normalize "USC" -> "U.S.C." (only bare "USC", not inside words like "USCIS")
  //    Match: digit + space + USC + (space or §)
  s = s.replace(/(\d)\s+USC(\s)/g, '$1 U.S.C.$2')
  s = s.replace(/(\d)\s+USC(§)/g, '$1 U.S.C. $2')

  // 3. Normalize "CFR" -> "C.F.R." (bare, not part of longer words)
  s = s.replace(/(\d)\s+CFR(\s)/g, '$1 C.F.R.$2')
  s = s.replace(/(\d)\s+CFR(§)/g, '$1 C.F.R. $2')

  // 4. Ensure space after § or §§
  s = s.replace(/§§([^\s])/g, '§§ $1')
  s = s.replace(/§([^§\s])/g, '§ $1')

  // 5. Normalize subsection ranges: (x)-(y) -> (x)–(y)
  //    Only where it looks like a parenthetical range, not a CFR section hyphen
  s = s.replace(/\((\w+)\)-\((\w+)\)/g, '($1)–($2)')

  // 6. Trim
  s = s.trim()

  return s
}

/**
 * Normalize a label string.
 *
 * Lighter touch than citation normalization: only collapse whitespace
 * and trim. Labels are human-written descriptive text.
 */
export function normalizeLabelText(input: string): string {
  return input.replace(/ {2,}/g, ' ').trim()
}
