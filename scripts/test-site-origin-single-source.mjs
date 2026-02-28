/**
 * Validates that the literal default origin 'https://echo-legal.com' appears
 * in exactly ONE runtime source file: lib/site.ts.
 *
 * Excluded from the count:
 *   - Documentation / markdown files (*.md)
 *   - The scripts/ directory (test mirrors + audit tooling)
 *   - public/robots.txt (static file, not code)
 *   - node_modules, .next, .git
 *
 * Run: node --test scripts/test-site-origin-single-source.mjs
 */

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const LITERAL = 'https://echo-legal.com'

// Directories and files to skip entirely
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'scripts'])
const SKIP_EXTENSIONS = new Set(['.md', '.mdx', '.txt', '.py'])
const SKIP_FILES = new Set(['robots.txt'])

/**
 * Recursively collect all files under `dir`, respecting exclusions.
 */
function collectFiles(dir, files = []) {
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return files
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry)) continue
    const fullPath = join(dir, entry)
    let stat
    try {
      stat = statSync(fullPath)
    } catch {
      continue
    }
    if (stat.isDirectory()) {
      collectFiles(fullPath, files)
    } else {
      if (SKIP_FILES.has(entry)) continue
      const ext = entry.slice(entry.lastIndexOf('.'))
      if (SKIP_EXTENSIONS.has(ext)) continue
      files.push(fullPath)
    }
  }
  return files
}

describe('Single source of truth: site origin', () => {
  it(`only lib/site.ts contains the default literal '${LITERAL}'`, () => {
    const files = collectFiles(ROOT)
    const violations = []

    for (const file of files) {
      const rel = relative(ROOT, file)
      // The one allowed file
      if (rel === 'lib/site.ts') continue

      let content
      try {
        content = readFileSync(file, 'utf8')
      } catch {
        continue
      }

      if (content.includes(LITERAL)) {
        violations.push(rel)
      }
    }

    assert.equal(
      violations.length,
      0,
      `Expected only lib/site.ts to contain '${LITERAL}', but also found in:\n${violations.join('\n')}`
    )
  })
})
