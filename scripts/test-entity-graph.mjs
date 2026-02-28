/**
 * Unit test: Entity graph determinism and structured data invariants.
 *
 * Validates:
 *   1. Entity graph @id values are deterministic (identical across calls)
 *   2. Each node has @context, @type, and @id
 *   3. WebSite node includes SearchAction
 *   4. Reference helpers produce valid @id objects
 *   5. No next/script imports exist in the app directory (prevents RSC payload issues)
 *   6. Organization includes authority metadata (publishingPrinciples, inLanguage, etc.)
 *   7. No representation-implying language in graph output
 *
 * Run: node --test scripts/test-entity-graph.mjs
 */

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

// ---- Mirror entity-graph.ts constants ----
// This mirrors the default value from lib/site.ts. Keep in sync.

const SITE_URL = 'https://echo-legal.com'

const ORGANIZATION_ID = `${SITE_URL}/#organization`
const AUTHOR_ID = `${SITE_URL}/#author`
const WEBSITE_ID = `${SITE_URL}/#website`
const LEGAL_SERVICE_ID = `${SITE_URL}/#legalservice`

const publisherRef = { '@id': ORGANIZATION_ID }
const authorRef = { '@id': AUTHOR_ID }
const isPartOfRef = { '@id': WEBSITE_ID }

// Shared, sorted topic list (mirrors KNOWS_ABOUT in entity-graph.ts)
const KNOWS_ABOUT = [
  'Bilingual legal reference (English/Turkish)',
  'Contract templates',
  'U.S. business law',
  'U.S. tax reporting',
  'U.S.\u2013Turkey cross-border compliance',
]

// ---- Mirror entity graph nodes ----

function buildOrganizationNode() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'EchoLegal',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      width: 200,
      height: 60,
    },
    description:
      'Multilingual legal encyclopedia and contract template library. Attorney-reviewed reference content in English and Turkish.',
    foundingDate: '2024',
    publishingPrinciples: `${SITE_URL}/en/about/citation-guide`,
    inLanguage: ['en', 'tr'],
    areaServed: [
      { '@type': 'Country', name: 'Turkey' },
      { '@type': 'Country', name: 'United States' },
    ],
    knowsAbout: [...KNOWS_ABOUT],
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${SITE_URL}/en/support`,
      availableLanguage: ['English', 'Turkish'],
    },
  }
}

function buildAuthorNode() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': AUTHOR_ID,
    name: 'EchoLegal',
    url: SITE_URL,
    knowsAbout: [...KNOWS_ABOUT],
  }
}

function buildWebsiteNode() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: 'EchoLegal',
    description:
      'Attorney-reviewed legal encyclopedia and contract template library covering U.S. and Turkish law.',
    publisher: publisherRef,
    inLanguage: ['en', 'tr'],
    about: [
      'Contract law',
      'Legal encyclopedia',
      'U.S. business formation',
      'U.S. tax identification',
    ],
    hasPart: [
      { '@type': 'WebPage', name: 'Amerika Hub', url: `${SITE_URL}/en/amerika` },
      { '@type': 'WebPage', name: 'Encyclopedia', url: `${SITE_URL}/en/encyclopedia` },
      { '@type': 'WebPage', name: 'Templates', url: `${SITE_URL}/en/templates` },
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/en/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

function buildEntityGraph() {
  return [
    buildOrganizationNode(),
    buildAuthorNode(),
    buildWebsiteNode(),
  ]
}

// ---- Tests: Determinism ----

describe('Entity graph determinism', () => {
  it('produces identical JSON on repeated builds', () => {
    const first = JSON.stringify(buildEntityGraph())
    for (let i = 0; i < 10; i++) {
      const current = JSON.stringify(buildEntityGraph())
      assert.equal(current, first, `Run ${i + 1}: entity graph JSON was not deterministic`)
    }
  })

  it('@id values are stable strings', () => {
    assert.equal(ORGANIZATION_ID, 'https://echo-legal.com/#organization')
    assert.equal(AUTHOR_ID, 'https://echo-legal.com/#author')
    assert.equal(WEBSITE_ID, 'https://echo-legal.com/#website')
    assert.equal(LEGAL_SERVICE_ID, 'https://echo-legal.com/#legalservice')
  })

  it('reference helpers contain correct @id values', () => {
    assert.deepEqual(publisherRef, { '@id': ORGANIZATION_ID })
    assert.deepEqual(authorRef, { '@id': AUTHOR_ID })
    assert.deepEqual(isPartOfRef, { '@id': WEBSITE_ID })
  })
})

// ---- Tests: Node structure ----

describe('Entity graph node structure', () => {
  const graph = buildEntityGraph()

  it('graph contains exactly 3 nodes', () => {
    assert.equal(graph.length, 3)
  })

  it('every node has @context, @type, and @id', () => {
    for (const node of graph) {
      assert.ok(node['@context'], `Missing @context on ${node['@type'] || 'unknown'}`)
      assert.ok(node['@type'], `Missing @type on node with @id ${node['@id'] || 'unknown'}`)
      assert.ok(node['@id'], `Missing @id on ${node['@type']}`)
    }
  })

  it('every @context is https://schema.org', () => {
    for (const node of graph) {
      assert.equal(node['@context'], 'https://schema.org', `Wrong @context on ${node['@type']}`)
    }
  })

  it('every @id starts with SITE_URL', () => {
    for (const node of graph) {
      assert.ok(
        node['@id'].startsWith(SITE_URL),
        `@id ${node['@id']} does not start with ${SITE_URL}`
      )
    }
  })

  it('every @id uses fragment identifier pattern', () => {
    for (const node of graph) {
      assert.ok(
        node['@id'].includes('#'),
        `@id ${node['@id']} does not contain a # fragment`
      )
    }
  })

  it('node order is Organization, Author (Organization), WebSite', () => {
    const types = graph.map(n => n['@type'])
    assert.deepEqual(types, ['Organization', 'Organization', 'WebSite'])
    assert.equal(graph[0]['@id'], ORGANIZATION_ID)
    assert.equal(graph[1]['@id'], AUTHOR_ID)
    assert.equal(graph[2]['@id'], WEBSITE_ID)
  })
})

// ---- Tests: Organization authority metadata ----

describe('Organization authority metadata', () => {
  const org = buildOrganizationNode()

  it('includes publishingPrinciples', () => {
    assert.ok(org.publishingPrinciples, 'Missing publishingPrinciples')
    assert.ok(
      org.publishingPrinciples.startsWith(SITE_URL),
      'publishingPrinciples must be an absolute URL'
    )
  })

  it('includes inLanguage with en and tr', () => {
    assert.ok(Array.isArray(org.inLanguage), 'inLanguage must be an array')
    assert.ok(org.inLanguage.includes('en'), 'inLanguage missing en')
    assert.ok(org.inLanguage.includes('tr'), 'inLanguage missing tr')
  })

  it('includes non-empty knowsAbout', () => {
    assert.ok(Array.isArray(org.knowsAbout), 'knowsAbout must be an array')
    assert.ok(org.knowsAbout.length > 0, 'knowsAbout must not be empty')
  })

  it('knowsAbout is sorted alphabetically', () => {
    const sorted = [...org.knowsAbout].sort()
    assert.deepEqual(org.knowsAbout, sorted, 'knowsAbout must be sorted')
  })

  it('includes areaServed', () => {
    assert.ok(Array.isArray(org.areaServed), 'areaServed must be an array')
    assert.ok(org.areaServed.length > 0, 'areaServed must not be empty')
    for (const area of org.areaServed) {
      assert.equal(area['@type'], 'Country', 'areaServed items must be Country')
      assert.ok(area.name, 'areaServed Country must have a name')
    }
  })

  it('areaServed is sorted by country name', () => {
    const names = org.areaServed.map(a => a.name)
    const sorted = [...names].sort()
    assert.deepEqual(names, sorted, 'areaServed must be sorted by name')
  })
})

// ---- Tests: WebSite SearchAction ----

describe('WebSite SearchAction', () => {
  const websiteNode = buildWebsiteNode()

  it('has potentialAction of type SearchAction', () => {
    assert.ok(websiteNode.potentialAction, 'Missing potentialAction')
    assert.equal(websiteNode.potentialAction['@type'], 'SearchAction')
  })

  it('SearchAction target has urlTemplate with search_term_string', () => {
    const target = websiteNode.potentialAction.target
    assert.ok(target, 'Missing target')
    assert.equal(target['@type'], 'EntryPoint')
    assert.ok(
      target.urlTemplate.includes('{search_term_string}'),
      'urlTemplate missing {search_term_string} placeholder'
    )
  })

  it('SearchAction has query-input parameter', () => {
    assert.ok(
      websiteNode.potentialAction['query-input'],
      'Missing query-input'
    )
    assert.ok(
      websiteNode.potentialAction['query-input'].includes('search_term_string'),
      'query-input missing search_term_string reference'
    )
  })

  it('WebSite publisher references Organization via @id', () => {
    assert.deepEqual(websiteNode.publisher, { '@id': ORGANIZATION_ID })
  })
})

// ---- Tests: WebSite content hubs ----

describe('WebSite content hubs', () => {
  const websiteNode = buildWebsiteNode()

  it('includes inLanguage with en and tr', () => {
    assert.ok(Array.isArray(websiteNode.inLanguage), 'inLanguage must be an array')
    assert.ok(websiteNode.inLanguage.includes('en'), 'inLanguage missing en')
    assert.ok(websiteNode.inLanguage.includes('tr'), 'inLanguage missing tr')
  })

  it('includes hasPart with at least one WebPage', () => {
    assert.ok(Array.isArray(websiteNode.hasPart), 'hasPart must be an array')
    assert.ok(websiteNode.hasPart.length > 0, 'hasPart must not be empty')
    for (const part of websiteNode.hasPart) {
      assert.equal(part['@type'], 'WebPage', 'hasPart items must be WebPage')
      assert.ok(part.name, 'hasPart WebPage must have a name')
      assert.ok(part.url, 'hasPart WebPage must have a url')
      assert.ok(part.url.startsWith(SITE_URL), 'hasPart url must be absolute')
    }
  })

  it('hasPart is sorted by name', () => {
    const names = websiteNode.hasPart.map(p => p.name)
    const sorted = [...names].sort()
    assert.deepEqual(names, sorted, 'hasPart must be sorted by name')
  })
})

// ---- Tests: No representation-implying language ----

describe('No representation-implying language', () => {
  const graphJson = JSON.stringify(buildEntityGraph()).toLowerCase()

  const FORBIDDEN = [
    'legal representation',
    'law firm',
    'hire',
    'retain',
    'client',
    'attorney-client',
    'counsel',
  ]

  for (const term of FORBIDDEN) {
    it(`graph output does not contain "${term}"`, () => {
      assert.equal(
        graphJson.includes(term),
        false,
        `Entity graph contains forbidden term: "${term}"`
      )
    })
  }
})

// ---- Tests: No next/script in app directory ----

describe('No next/script serialization issues', () => {
  /**
   * Recursively collect all .tsx/.ts files under a directory,
   * excluding node_modules and .next.
   */
  function collectFiles(dir, files = []) {
    let entries
    try {
      entries = readdirSync(dir)
    } catch {
      return files
    }
    for (const entry of entries) {
      if (entry === 'node_modules' || entry === '.next') continue
      const fullPath = join(dir, entry)
      let stat
      try {
        stat = statSync(fullPath)
      } catch {
        continue
      }
      if (stat.isDirectory()) {
        collectFiles(fullPath, files)
      } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) {
        files.push(fullPath)
      }
    }
    return files
  }

  it('no app/ file imports next/script', () => {
    const appDir = join(process.cwd(), 'app')
    const files = collectFiles(appDir)
    const violations = []

    for (const file of files) {
      const content = readFileSync(file, 'utf8')
      if (content.includes("from 'next/script'") || content.includes('from "next/script"')) {
        violations.push(file.replace(process.cwd() + '/', ''))
      }
    }

    assert.equal(
      violations.length,
      0,
      `Files importing next/script (use plain <script> or JsonLdScript instead):\n${violations.join('\n')}`
    )
  })
})
