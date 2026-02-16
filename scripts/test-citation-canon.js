#!/usr/bin/env node

/**
 * Citation Canon v2 — unit tests
 *
 * Run: node scripts/test-citation-canon.js
 *
 * Inlines the logic from lib/citations/canon.ts to stay dependency-free.
 */

// ---- Inline normalization logic (mirrors lib/citations/canon.ts) ----

function normalizeCitationText(input) {
  let s = input
  s = s.replace(/ {2,}/g, ' ')
  s = s.replace(/(\d)\s+USC(\s)/g, '$1 U.S.C.$2')
  s = s.replace(/(\d)\s+USC(§)/g, '$1 U.S.C. $2')
  s = s.replace(/(\d)\s+CFR(\s)/g, '$1 C.F.R.$2')
  s = s.replace(/(\d)\s+CFR(§)/g, '$1 C.F.R. $2')
  s = s.replace(/§§([^\s])/g, '§§ $1')
  s = s.replace(/§([^§\s])/g, '§ $1')
  s = s.replace(/\((\w+)\)-\((\w+)\)/g, '($1)–($2)')
  s = s.trim()
  return s
}

function normalizeLabelText(input) {
  return input.replace(/ {2,}/g, ' ').trim()
}

// ---- Inline derivation logic (mirrors lib/citations/canon.ts) ----

function deriveCanonicalId(citation, type) {
  const s = citation.trim()

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

  const cfrMatch = s.match(/^(\d+)\s+C\.F\.R\.\s+§§?\s+(\d+\.\d+(?:-\d+)?)/)
  if (cfrMatch) {
    const title = cfrMatch[1]
    const section = cfrMatch[2]
    return `cfr-${title}-${section}`
  }

  const treatyMatch = s.match(/U\.S\.[\u2013-](\w+).*TIAS\s+(\d+)\s+\((\d{4})\)/)
  if (treatyMatch) {
    const country = treatyMatch[1].toLowerCase()
    const tias = treatyMatch[2]
    const year = treatyMatch[3]
    return `treaty-us-${country}-${year}-tias-${tias}`
  }

  const delMatch = s.match(/^(\d+)\s+Del\.\s+C\.\s+§\s+([\d-]+)/)
  if (delMatch) {
    const title = delMatch[1]
    const section = delMatch[2]
    return `del-stat-c-${title}-${section}`
  }

  const wyoMatch = s.match(/^Wyo\.\s+Stat\.\s+§\s+([\d-]+)/)
  if (wyoMatch) {
    return `wyo-stat-${wyoMatch[1]}`
  }

  const nyMatch = s.match(/^N\.Y\.\s+Gen\.\s+Oblig\.\s+Law\s+§\s+([\d-]+)/)
  if (nyMatch) {
    return `ny-stat-gen-oblig-law-${nyMatch[1]}`
  }

  const revProcMatch = s.match(/^IRS\s+Rev\.\s+Proc\.\s+([\d-]+)/)
  if (revProcMatch) {
    return `guidance-irs-rev-proc-${revProcMatch[1]}`
  }

  const pubMatch = s.match(/^IRS\s+(?:Publication|Pub\.)\s+(\d+)/)
  if (pubMatch) {
    return `publication-irs-${pubMatch[1]}`
  }

  const formInstrMatch = s.match(/^IRS,?\s+(?:Instructions\s+for\s+)?Form\s+([\w-]+)\s+Instructions?/i)
    || s.match(/^IRS,?\s+Instructions\s+for\s+Form\s+([\w-]+)/i)
  if (formInstrMatch) {
    const form = formInstrMatch[1].toLowerCase()
    return `form-instructions-irs-${form}`
  }

  return undefined
}

// ---- Test runner ----

let passed = 0
let failed = 0

function assert(testName, actual, expected) {
  if (actual === expected) {
    passed++
  } else {
    failed++
    console.error(`FAIL: ${testName}`)
    console.error(`  expected: ${JSON.stringify(expected)}`)
    console.error(`  actual:   ${JSON.stringify(actual)}`)
  }
}

// ============================================
// Citation normalization tests (v1, unchanged)
// ============================================

assert(
  'USC without periods -> U.S.C.',
  normalizeCitationText('26 USC § 7701'),
  '26 U.S.C. § 7701'
)

assert(
  'USC without periods, no space after §',
  normalizeCitationText('26 USC §7701(a)(30)'),
  '26 U.S.C. § 7701(a)(30)'
)

assert(
  'CFR without periods -> C.F.R.',
  normalizeCitationText('8 CFR § 248'),
  '8 C.F.R. § 248'
)

assert(
  'Already correct U.S.C. is unchanged',
  normalizeCitationText('26 U.S.C. § 7701(a)(3)–(4)'),
  '26 U.S.C. § 7701(a)(3)–(4)'
)

assert(
  'Already correct C.F.R. is unchanged',
  normalizeCitationText('26 C.F.R. §§ 301.7701-1 through 301.7701-3'),
  '26 C.F.R. §§ 301.7701-1 through 301.7701-3'
)

assert(
  'Space after § enforced',
  normalizeCitationText('N.Y. Gen. Oblig. Law §5-1401'),
  'N.Y. Gen. Oblig. Law § 5-1401'
)

assert(
  'Space after §§ enforced',
  normalizeCitationText('26 C.F.R. §§301.7701-1 through 301.7701-3'),
  '26 C.F.R. §§ 301.7701-1 through 301.7701-3'
)

assert(
  'Subsection range hyphen -> en dash',
  normalizeCitationText('26 U.S.C. § 7701(a)(3)-(4)'),
  '26 U.S.C. § 7701(a)(3)–(4)'
)

assert(
  'Double spaces collapsed',
  normalizeCitationText('26  U.S.C.  § 7701'),
  '26 U.S.C. § 7701'
)

assert(
  'CFR section hyphens NOT converted (not a range)',
  normalizeCitationText('26 C.F.R. § 301.7701-1'),
  '26 C.F.R. § 301.7701-1'
)

assert(
  'Treaty text passes through unchanged',
  normalizeCitationText('U.S.–Turkey Income Tax Treaty, TIAS 10205 (1996)'),
  'U.S.–Turkey Income Tax Treaty, TIAS 10205 (1996)'
)

assert(
  'State statute passes through unchanged',
  normalizeCitationText('6 Del. C. § 18-101 et seq.'),
  '6 Del. C. § 18-101 et seq.'
)

assert(
  'USCIS not mangled (not a citation abbreviation)',
  normalizeCitationText('USCIS Policy Manual'),
  'USCIS Policy Manual'
)

assert(
  'IRS guidance passes through',
  normalizeCitationText('IRS Rev. Proc. 2023-32'),
  'IRS Rev. Proc. 2023-32'
)

assert(
  'Internal Revenue Code (26 U.S.C.) unchanged',
  normalizeCitationText('Internal Revenue Code (26 U.S.C.)'),
  'Internal Revenue Code (26 U.S.C.)'
)

// ---- Label normalization tests ----

assert(
  'Label: double spaces collapsed',
  normalizeLabelText('Entity classification  regulations'),
  'Entity classification regulations'
)

assert(
  'Label: whitespace trimmed',
  normalizeLabelText('  Some label  '),
  'Some label'
)

// ============================================
// canonicalId derivation tests (v2)
// ============================================

// USC derivations
assert(
  'Derive: USC simple section',
  deriveCanonicalId('26 U.S.C. § 7701'),
  'usc-26-7701'
)

assert(
  'Derive: USC with subsection',
  deriveCanonicalId('26 U.S.C. § 7701(a)(3)–(4)'),
  'usc-26-7701-a'
)

assert(
  'Derive: USC with subsection (b)',
  deriveCanonicalId('26 U.S.C. § 7701(b)'),
  'usc-26-7701-b'
)

assert(
  'Derive: USC title 42',
  deriveCanonicalId('42 U.S.C. § 405(c)(2)'),
  'usc-42-405-c'
)

assert(
  'Derive: USC title 31',
  deriveCanonicalId('31 U.S.C. § 5336'),
  'usc-31-5336'
)

assert(
  'Derive: USC title 8 with et seq.',
  deriveCanonicalId('8 U.S.C. § 1101 et seq.'),
  'usc-8-1101'
)

// CFR derivations
assert(
  'Derive: CFR standard section',
  deriveCanonicalId('26 C.F.R. § 301.7701-1'),
  'cfr-26-301.7701-1'
)

assert(
  'Derive: CFR range (returns first section)',
  deriveCanonicalId('26 C.F.R. §§ 301.7701-1 through 301.7701-3'),
  'cfr-26-301.7701-1'
)

assert(
  'Derive: CFR part 1 section',
  deriveCanonicalId('26 C.F.R. § 1.1441-1'),
  'cfr-26-1.1441-1'
)

// Treaty derivations
assert(
  'Derive: Treaty with TIAS',
  deriveCanonicalId('U.S.–Turkey Income Tax Treaty, TIAS 10205 (1996)'),
  'treaty-us-turkey-1996-tias-10205'
)

// State statute derivations
assert(
  'Derive: Delaware statute',
  deriveCanonicalId('6 Del. C. § 18-101 et seq.'),
  'del-stat-c-6-18-101'
)

assert(
  'Derive: Wyoming statute',
  deriveCanonicalId('Wyo. Stat. § 17-29-101 et seq.'),
  'wyo-stat-17-29-101'
)

assert(
  'Derive: New York statute',
  deriveCanonicalId('N.Y. Gen. Oblig. Law § 5-1401'),
  'ny-stat-gen-oblig-law-5-1401'
)

// IRS guidance derivations
assert(
  'Derive: Revenue Procedure',
  deriveCanonicalId('IRS Rev. Proc. 2023-32'),
  'guidance-irs-rev-proc-2023-32'
)

assert(
  'Derive: IRS Publication (full word)',
  deriveCanonicalId('IRS Publication 515'),
  'publication-irs-515'
)

assert(
  'Derive: IRS Publication (abbreviated)',
  deriveCanonicalId('IRS Pub. 1635'),
  'publication-irs-1635'
)

assert(
  'Derive: Form instructions',
  deriveCanonicalId('IRS, Instructions for Form W-7'),
  'form-instructions-irs-w-7'
)

assert(
  'Derive: Form instructions (W-8BEN)',
  deriveCanonicalId('IRS, Instructions for Form W-8BEN'),
  'form-instructions-irs-w-8ben'
)

// Ambiguous / unrecognized -> undefined
assert(
  'Derive: Ambiguous text returns undefined',
  deriveCanonicalId('USCIS Policy Manual'),
  undefined
)

assert(
  'Derive: Internal Revenue Code (broad) returns undefined',
  deriveCanonicalId('Internal Revenue Code (26 U.S.C.)'),
  undefined
)

assert(
  'Derive: UCC returns undefined',
  deriveCanonicalId('UCC'),
  undefined
)

assert(
  'Derive: Plain text returns undefined',
  deriveCanonicalId('Restatement (Second) of Contracts'),
  undefined
)

// ============================================
// AUTHORITY_LEVEL_WEIGHT ordering tests
// ============================================

// Inline weight map (mirrors lib/citations/canon.ts AUTHORITY_LEVEL_WEIGHT)
const AUTHORITY_LEVEL_WEIGHT = {
  constitutional: 0,
  federal_statute: 1,
  federal_regulation: 2,
  state_statute: 3,
  treaty: 4,
  agency_guidance: 5,
  form_instruction: 6,
  publication: 7,
}

assert(
  'Weight: AUTHORITY_LEVEL_WEIGHT is defined',
  typeof AUTHORITY_LEVEL_WEIGHT,
  'object'
)

assert(
  'Weight: constitutional < federal_statute',
  AUTHORITY_LEVEL_WEIGHT.constitutional < AUTHORITY_LEVEL_WEIGHT.federal_statute,
  true
)

assert(
  'Weight: federal_statute < federal_regulation',
  AUTHORITY_LEVEL_WEIGHT.federal_statute < AUTHORITY_LEVEL_WEIGHT.federal_regulation,
  true
)

assert(
  'Weight: federal_regulation < form_instruction',
  AUTHORITY_LEVEL_WEIGHT.federal_regulation < AUTHORITY_LEVEL_WEIGHT.form_instruction,
  true
)

assert(
  'Weight: form_instruction < publication',
  AUTHORITY_LEVEL_WEIGHT.form_instruction < AUTHORITY_LEVEL_WEIGHT.publication,
  true
)

assert(
  'Weight: agency_guidance < form_instruction',
  AUTHORITY_LEVEL_WEIGHT.agency_guidance < AUTHORITY_LEVEL_WEIGHT.form_instruction,
  true
)

// Sort ordering test: simulate PrimarySources sort behavior
const testSources = [
  { authorityLevel: 'form_instruction' },
  { authorityLevel: 'federal_statute' },
  { authorityLevel: 'federal_regulation' },
  { authorityLevel: 'publication' },
]
const sorted = [...testSources].sort((a, b) => {
  const wa = AUTHORITY_LEVEL_WEIGHT[a.authorityLevel] ?? 99
  const wb = AUTHORITY_LEVEL_WEIGHT[b.authorityLevel] ?? 99
  return wa - wb
})
assert(
  'Weight: sort produces statute > regulation > form_instruction > publication',
  sorted.map(s => s.authorityLevel).join(','),
  'federal_statute,federal_regulation,form_instruction,publication'
)

// ---- Results ----

console.log(`\nCitation Canon v2 tests: ${passed} passed, ${failed} failed`)

if (failed > 0) {
  process.exit(1)
}
