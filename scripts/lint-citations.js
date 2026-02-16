#!/usr/bin/env node

/**
 * Citation Canon v1 — lint checker
 *
 * Scans citation fields in registry and primarySources data for
 * common Canon v1 violations. Does NOT scan body text.
 *
 * Run: node scripts/lint-citations.js
 * Exit code 0 = clean, 1 = violations found.
 */

const fs = require('fs')
const path = require('path')

const violations = []

function check(file, lineNum, field, value) {
  // Rule 1: "USC" without periods (but not "USCIS")
  if (/\d\s+USC[\s§]/.test(value)) {
    violations.push({ file, lineNum, field, value, rule: 'Use "U.S.C." with periods' })
  }

  // Rule 2: "CFR" without periods
  if (/\d\s+CFR[\s§]/.test(value)) {
    violations.push({ file, lineNum, field, value, rule: 'Use "C.F.R." with periods' })
  }

  // Rule 3: Missing space after §
  if (/§[^\s§]/.test(value)) {
    violations.push({ file, lineNum, field, value, rule: 'Add space after §' })
  }

  // Rule 4: Double spaces
  if (/ {2,}/.test(value)) {
    violations.push({ file, lineNum, field, value, rule: 'Remove double spaces' })
  }

  // Rule 5: Subsection range with hyphen instead of en dash
  if (/\(\w+\)-\(\w+\)/.test(value)) {
    violations.push({ file, lineNum, field, value, rule: 'Use en dash for subsection ranges: (x)–(y)' })
  }
}

/**
 * Scan a TypeScript/JavaScript file for citation string patterns.
 * Looks for: citation: '...' or citation: "..."
 */
function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n')

  lines.forEach((line, i) => {
    // Match citation field values
    const citationMatch = line.match(/citation:\s*['"`]([^'"`]+)['"`]/)
    if (citationMatch) {
      check(filePath, i + 1, 'citation', citationMatch[1])
    }
  })
}

// Files to scan
const filesToScan = [
  'lib/amerika-content-registry.ts',
  'app/[lang]/abd-de-llc-kurmak-turkler-icin-adim-adim/page.tsx',
  'app/[lang]/irs-vergiler-ve-w8-w9-gercekleri/page.tsx',
  'app/[lang]/ein-itin-ssn-farki/page.tsx',
]

const root = path.resolve(__dirname, '..')

for (const file of filesToScan) {
  const fullPath = path.join(root, file)
  if (fs.existsSync(fullPath)) {
    scanFile(fullPath)
  }
}

if (violations.length === 0) {
  console.log('Citation lint: no violations found.')
  process.exit(0)
} else {
  console.error(`Citation lint: ${violations.length} violation(s) found:\n`)
  for (const v of violations) {
    const relPath = path.relative(root, v.file)
    console.error(`  ${relPath}:${v.lineNum}`)
    console.error(`    field: ${v.field}`)
    console.error(`    value: "${v.value}"`)
    console.error(`    rule:  ${v.rule}`)
    console.error()
  }
  process.exit(1)
}
