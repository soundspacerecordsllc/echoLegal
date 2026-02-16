#!/usr/bin/env node

/**
 * Citation Canon v2 — lint checker
 *
 * Scans citation fields in registry and primarySources data for
 * common Canon violations. Does NOT scan body text.
 *
 * Run: node scripts/lint-citations.js
 *      node scripts/lint-citations.js --strict
 *
 * Default mode: checks formatting rules only. Exit 0 = clean.
 * Strict mode:  also warns on missing authorityLevel / canonicalId
 *               for typed primarySources entries. Exit 1 if warnings.
 */

const fs = require('fs')
const path = require('path')

const strict = process.argv.includes('--strict')
const violations = []
const warnings = []

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
 *
 * In strict mode, also checks primarySources blocks for missing
 * authorityLevel and canonicalId fields.
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

  // Strict mode: check primarySources entries for missing v2 fields
  if (strict) {
    scanPrimarySourcesBlocks(filePath, content)
  }
}

// Types that should have authorityLevel and canonicalId
const TYPED_SOURCES = ['statute', 'regulation', 'treaty', 'guidance', 'form', 'publication']

/**
 * Parse primarySources arrays and check each entry for missing
 * authorityLevel and canonicalId. Uses simple brace-depth tracking.
 */
function scanPrimarySourcesBlocks(filePath, content) {
  const lines = content.split('\n')

  // Find primarySources array regions
  let inPrimarySources = false
  let depth = 0
  let entryStart = -1
  let currentEntry = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (!inPrimarySources) {
      if (/primarySources\s*[:=]\s*\[/.test(line)) {
        inPrimarySources = true
        depth = 0
        // Count opening brackets on this line
        for (const ch of line) {
          if (ch === '[') depth++
          if (ch === ']') depth--
        }
        if (depth <= 0) inPrimarySources = false
      }
      continue
    }

    // Track opening/closing of the array
    for (const ch of line) {
      if (ch === '[') depth++
      if (ch === ']') depth--
    }

    // Track individual entries by { }
    if (/{/.test(line) && entryStart === -1) {
      entryStart = i + 1
      currentEntry = ''
    }

    if (entryStart !== -1) {
      currentEntry += line + '\n'
    }

    if (/}/.test(line) && entryStart !== -1) {
      // We have a complete entry block
      checkEntryBlock(filePath, entryStart, currentEntry)
      entryStart = -1
      currentEntry = ''
    }

    if (depth <= 0) {
      inPrimarySources = false
    }
  }
}

function checkEntryBlock(filePath, lineNum, block) {
  const typeMatch = block.match(/type:\s*['"`](\w+)['"`]/)
  const citationMatch = block.match(/citation:\s*['"`]([^'"`]+)['"`]/)
  const hasAuthority = /authorityLevel:/.test(block)
  const hasCanonicalId = /canonicalId:/.test(block)

  if (!typeMatch || !citationMatch) return

  const type = typeMatch[1]
  const citation = citationMatch[1]

  // Only warn for source types that should have these fields
  if (!TYPED_SOURCES.includes(type)) return

  if (!hasAuthority) {
    warnings.push({
      file: filePath,
      lineNum,
      field: 'authorityLevel',
      value: citation,
      rule: `Missing authorityLevel for ${type} entry`,
    })
  }

  if (!hasCanonicalId) {
    warnings.push({
      file: filePath,
      lineNum,
      field: 'canonicalId',
      value: citation,
      rule: `Missing canonicalId for ${type} entry`,
    })
  }
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

function printIssues(label, issues) {
  console.error(`${label}: ${issues.length} issue(s) found:\n`)
  for (const v of issues) {
    const relPath = path.relative(root, v.file)
    console.error(`  ${relPath}:${v.lineNum}`)
    console.error(`    field: ${v.field}`)
    console.error(`    value: "${v.value}"`)
    console.error(`    rule:  ${v.rule}`)
    console.error()
  }
}

if (violations.length > 0) {
  printIssues('Citation lint violations', violations)
}

if (strict && warnings.length > 0) {
  printIssues('Citation lint warnings (strict)', warnings)
}

const total = violations.length + (strict ? warnings.length : 0)

if (total === 0) {
  console.log(`Citation lint: clean.${strict ? ' (strict mode)' : ''}`)
  process.exit(0)
} else {
  process.exit(1)
}
