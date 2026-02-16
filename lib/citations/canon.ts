/**
 * EchoLegal Citation Canon v2
 *
 * Canonical normalization rules for legal citation metadata fields.
 * These functions are intended for citation and label fields only —
 * NOT for narrative body text.
 *
 * v2 additions: authorityLevel enum, canonicalId derivation.
 *
 * Standard: Bluebook-adjacent, adapted for web rendering.
 */

export const CITATION_CANON_VERSION = '2.0'

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

// ============================================
// AUTHORITY LEVEL PRECEDENCE WEIGHTS
// ============================================

/**
 * Numeric weights for deterministic display ordering of primary sources.
 * Lower value = higher precedence in the US legal hierarchy.
 * Used by PrimarySources component to enforce normative ordering.
 */
import type { AuthorityLevel } from '@/lib/content-schema'

/**
 * Exhaustive weight map. TypeScript enforces that every AuthorityLevel
 * variant has a corresponding weight. Adding a new AuthorityLevel
 * without updating this map is a compilation error.
 */
export const AUTHORITY_LEVEL_WEIGHT: Record<AuthorityLevel, number> = {
  constitutional: 0,
  federal_statute: 1,
  federal_regulation: 2,
  state_statute: 3,
  treaty: 4,
  agency_guidance: 5,
  form_instruction: 6,
  publication: 7,
}

// ============================================
// CANONICAL ID DERIVATION
// ============================================

/**
 * Attempt to derive a stable canonicalId from a citation string.
 *
 * Returns undefined if the citation format is ambiguous or
 * does not match any recognized pattern. Conservative: prefers
 * returning undefined over guessing.
 *
 * Format rules:
 *   USC:    usc-<title>-<section>[-<subsections>]
 *   CFR:    cfr-<title>-<part>.<section>[-<subsection>]
 *   Treaty: treaty-<country1>-<country2>-<year>-tias-<number>
 *   State:  <state>-stat-<code>-<section>
 *   Guidance: guidance-irs-<type>-<id>
 *   Publication: publication-irs-<number>
 *   Form instructions: form-instructions-irs-<form>
 */
export function deriveCanonicalId(
  citation: string,
  type?: string
): string | undefined {
  const s = citation.trim()

  // USC: "26 U.S.C. § 7701(a)(3)–(4)" or "42 U.S.C. § 405(c)(2)"
  const uscMatch = s.match(/^(\d+)\s+U\.S\.C\.\s+§§?\s+(\d+)(?:\(([^)]+)\))?/)
  if (uscMatch) {
    const title = uscMatch[1]
    const section = uscMatch[2]
    const subsection = uscMatch[3]
    let id = `usc-${title}-${section}`
    if (subsection) {
      id += `-${subsection.toLowerCase()}`
    }
    return id
  }

  // CFR: "26 C.F.R. § 301.7701-1" or "26 C.F.R. §§ 301.7701-1 through ..."
  const cfrMatch = s.match(/^(\d+)\s+C\.F\.R\.\s+§§?\s+(\d+\.\d+(?:-\d+)?)/)
  if (cfrMatch) {
    const title = cfrMatch[1]
    const section = cfrMatch[2]
    return `cfr-${title}-${section}`
  }

  // Treaty with TIAS: "U.S.–Turkey Income Tax Treaty, TIAS 10205 (1996)"
  const treatyMatch = s.match(/U\.S\.[\u2013-](\w+).*TIAS\s+(\d+)\s+\((\d{4})\)/)
  if (treatyMatch) {
    const country = treatyMatch[1].toLowerCase()
    const tias = treatyMatch[2]
    const year = treatyMatch[3]
    return `treaty-us-${country}-${year}-tias-${tias}`
  }

  // Delaware: "6 Del. C. § 18-101 et seq."
  const delMatch = s.match(/^(\d+)\s+Del\.\s+C\.\s+§\s+([\d-]+)/)
  if (delMatch) {
    const title = delMatch[1]
    const section = delMatch[2]
    return `del-stat-c-${title}-${section}`
  }

  // Wyoming: "Wyo. Stat. § 17-29-101"
  const wyoMatch = s.match(/^Wyo\.\s+Stat\.\s+§\s+([\d-]+)/)
  if (wyoMatch) {
    return `wyo-stat-${wyoMatch[1]}`
  }

  // New York: "N.Y. Gen. Oblig. Law § 5-1401"
  const nyMatch = s.match(/^N\.Y\.\s+Gen\.\s+Oblig\.\s+Law\s+§\s+([\d-]+)/)
  if (nyMatch) {
    return `ny-stat-gen-oblig-law-${nyMatch[1]}`
  }

  // IRS Revenue Procedure: "IRS Rev. Proc. 2023-32"
  const revProcMatch = s.match(/^IRS\s+Rev\.\s+Proc\.\s+([\d-]+)/)
  if (revProcMatch) {
    return `guidance-irs-rev-proc-${revProcMatch[1]}`
  }

  // IRS Publication: "IRS Publication 515" or "IRS Pub. 515"
  const pubMatch = s.match(/^IRS\s+(?:Publication|Pub\.)\s+(\d+)/)
  if (pubMatch) {
    return `publication-irs-${pubMatch[1]}`
  }

  // IRS Form Instructions: "IRS, Instructions for Form W-7"
  const formInstrMatch = s.match(/^IRS,?\s+(?:Instructions\s+for\s+)?Form\s+([\w-]+)\s+Instructions?/i)
    || s.match(/^IRS,?\s+Instructions\s+for\s+Form\s+([\w-]+)/i)
  if (formInstrMatch) {
    const form = formInstrMatch[1].toLowerCase()
    return `form-instructions-irs-${form}`
  }

  // Could not derive — return undefined rather than guess
  return undefined
}
