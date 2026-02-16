#!/usr/bin/env node

/**
 * Build-time validation for primary sources structural guarantees.
 *
 * Reads lib/primary-sources-registry.ts and validates every entry:
 *   - authorityLevel must exist and be a known AuthorityLevel value
 *   - canonicalId must exist and be non-empty
 *   - jurisdiction must exist and be non-empty
 *   - authorityLevel must exist in AUTHORITY_LEVEL_WEIGHT
 *
 * Run: node scripts/validate-primary-sources.js
 *
 * Exit 0 = all entries valid. Exit 1 = structural violation detected.
 * Build MUST fail if this script exits non-zero.
 */

const fs = require('fs')
const path = require('path')

const AUTHORITY_LEVELS = [
  'constitutional',
  'federal_statute',
  'federal_regulation',
  'state_statute',
  'treaty',
  'agency_guidance',
  'form_instruction',
  'publication',
]

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

const root = path.resolve(__dirname, '..')
const registryPath = path.join(root, 'lib/primary-sources-registry.ts')

if (!fs.existsSync(registryPath)) {
  console.error('FATAL: lib/primary-sources-registry.ts not found')
  process.exit(1)
}

const content = fs.readFileSync(registryPath, 'utf8')
const errors = []

// ============================================
// Parse registry entries using brace-depth tracking
// ============================================

// Find each slug key: 'slug-name': [
const slugRegex = /['"]([a-z0-9-]+)['"]\s*:\s*\[/g
let slugMatch

while ((slugMatch = slugRegex.exec(content)) !== null) {
  const slug = slugMatch[1]
  const startPos = slugMatch.index + slugMatch[0].length

  // Track brackets to find the end of this array
  let depth = 1
  let pos = startPos
  let arrayContent = ''

  while (pos < content.length && depth > 0) {
    const ch = content[pos]
    if (ch === '[') depth++
    if (ch === ']') depth--
    if (depth > 0) arrayContent += ch
    pos++
  }

  // Now parse individual entries within this array
  const entryBlocks = []
  let entryDepth = 0
  let entryStart = -1
  let currentBlock = ''

  for (let i = 0; i < arrayContent.length; i++) {
    const ch = arrayContent[i]
    if (ch === '{') {
      if (entryDepth === 0) {
        entryStart = i
        currentBlock = ''
      }
      entryDepth++
    }
    if (entryDepth > 0) {
      currentBlock += ch
    }
    if (ch === '}') {
      entryDepth--
      if (entryDepth === 0 && entryStart !== -1) {
        entryBlocks.push(currentBlock)
        entryStart = -1
        currentBlock = ''
      }
    }
  }

  if (entryBlocks.length === 0) {
    errors.push(`Structural Authority Violation: [${slug}] has no primary sources`)
    continue
  }

  for (let idx = 0; idx < entryBlocks.length; idx++) {
    const block = entryBlocks[idx]

    // Check authorityLevel
    const authorityMatch = block.match(/authorityLevel:\s*['"]([^'"]+)['"]/)
    if (!authorityMatch) {
      errors.push(`Structural Authority Violation: [${slug}] source ${idx} missing authorityLevel`)
    } else {
      const level = authorityMatch[1]
      if (!AUTHORITY_LEVELS.includes(level)) {
        errors.push(`Structural Authority Violation: [${slug}] source ${idx} has unknown authorityLevel "${level}"`)
      }
      if (!(level in AUTHORITY_LEVEL_WEIGHT)) {
        errors.push(`Structural Authority Violation: [${slug}] source ${idx} authorityLevel "${level}" not in AUTHORITY_LEVEL_WEIGHT`)
      }
    }

    // Check canonicalId
    const canonicalMatch = block.match(/canonicalId:\s*['"]([^'"]+)['"]/)
    if (!canonicalMatch || !canonicalMatch[1].trim()) {
      errors.push(`Structural Authority Violation: [${slug}] source ${idx} missing canonicalId`)
    }

    // Check jurisdiction
    const jurisdictionMatch = block.match(/jurisdiction:\s*['"]([^'"]+)['"]/)
    if (!jurisdictionMatch || !jurisdictionMatch[1].trim()) {
      errors.push(`Structural Authority Violation: [${slug}] source ${idx} missing jurisdiction`)
    }
  }
}

// ============================================
// Report
// ============================================

if (errors.length > 0) {
  console.error(`Primary sources validation FAILED: ${errors.length} violation(s)\n`)
  for (const err of errors) {
    console.error(`  ${err}`)
  }
  console.error()
  process.exit(1)
} else {
  console.log('Primary sources validation: all entries valid.')
  process.exit(0)
}
