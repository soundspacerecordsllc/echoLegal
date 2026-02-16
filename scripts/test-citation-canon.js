#!/usr/bin/env node

/**
 * Citation Canon v1 — unit tests
 *
 * Run: node scripts/test-citation-canon.js
 *
 * Uses dynamic import of the compiled TS via tsx or ts-node,
 * but since this repo has no ts runner, we inline the logic
 * to keep it dependency-free.
 */

// ---- Inline the normalization logic (mirrors lib/citations/canon.ts) ----

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

// ---- Test runner ----

let passed = 0
let failed = 0

function assert(testName, actual, expected) {
  if (actual === expected) {
    passed++
  } else {
    failed++
    console.error(`FAIL: ${testName}`)
    console.error(`  expected: "${expected}"`)
    console.error(`  actual:   "${actual}"`)
  }
}

// ---- Citation normalization tests ----

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

// ---- Results ----

console.log(`\nCitation Canon v1 tests: ${passed} passed, ${failed} failed`)

if (failed > 0) {
  process.exit(1)
}
