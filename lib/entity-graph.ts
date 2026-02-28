// lib/entity-graph.ts
// Centralized JSON-LD entity graph for EchoLegal.
//
// Defines the core Organization + WebSite graph nodes with deterministic @id
// values. Every page-level JSON-LD block should reference these nodes via @id
// instead of inlining duplicate Organization/WebSite objects.
//
// The graph is injected once, server-rendered, in app/[lang]/layout.tsx.

import { SITE_ORIGIN, absoluteUrl, siteId } from './site'

const SITE_NAME = 'EchoLegal'

// ============================================
// DETERMINISTIC @id CONSTANTS
// ============================================

/** @id for the Organization node (publisher / copyright holder). */
export const ORGANIZATION_ID = siteId('organization')

/** @id for the author node (governance rule: always Organization). */
export const AUTHOR_ID = siteId('author')

/** @id for the WebSite node (isPartOf target). */
export const WEBSITE_ID = siteId('website')

/** @id for the LegalService node (retained for backward compat; not in graph). */
export const LEGAL_SERVICE_ID = siteId('legalservice')

// ============================================
// DETERMINISTIC TOPIC LIST (sorted, shared)
// ============================================

/**
 * Factual topic list for knowsAbout. Sorted alphabetically for determinism.
 * Used by both Organization and Author nodes to stay aligned.
 */
const KNOWS_ABOUT: readonly string[] = [
  'Bilingual legal reference (English/Turkish)',
  'Contract templates',
  'U.S. business law',
  'U.S. tax reporting',
  'U.S.\u2013Turkey cross-border compliance',
] as const

// ============================================
// @id REFERENCE HELPERS
// ============================================

/** Reference to the Organization graph node — use as publisher / copyrightHolder. */
export const publisherRef = { '@id': ORGANIZATION_ID } as const

/** Reference to the author graph node. */
export const authorRef = { '@id': AUTHOR_ID } as const

/** Reference to the WebSite graph node — use as isPartOf. */
export const isPartOfRef = { '@id': WEBSITE_ID } as const

// ============================================
// ENTITY GRAPH NODES
// ============================================

/** Organization node — EchoLegal as publisher. */
export const organizationNode = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_ORIGIN,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl('/logo.png'),
    width: 200,
    height: 60,
  },
  description:
    'Multilingual legal encyclopedia and contract template library. Attorney-reviewed reference content in English and Turkish.',
  foundingDate: '2024',
  publishingPrinciples: absoluteUrl('/en/about/citation-guide'),
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
    url: absoluteUrl('/en/support'),
    availableLanguage: ['English', 'Turkish'],
  },
} as const

/** Author node — always Organization, never Person (governance rule). */
export const authorNode = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': AUTHOR_ID,
  name: SITE_NAME,
  url: SITE_ORIGIN,
  knowsAbout: [...KNOWS_ABOUT],
} as const

/** WebSite node with SearchAction and content hub references. */
export const websiteNode = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_ORIGIN,
  name: SITE_NAME,
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
    { '@type': 'WebPage', name: 'Amerika Hub', url: absoluteUrl('/en/amerika') },
    { '@type': 'WebPage', name: 'Encyclopedia', url: absoluteUrl('/en/encyclopedia') },
    { '@type': 'WebPage', name: 'Templates', url: absoluteUrl('/en/templates') },
  ],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: absoluteUrl('/en/search?q={search_term_string}'),
    },
    'query-input': 'required name=search_term_string',
  },
} as const

/**
 * LegalService node — retained for backward compatibility.
 * Removed from the entity graph to avoid implying legal representation.
 * Kept as an export in case downstream code references it.
 */
export const legalServiceNode = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': LEGAL_SERVICE_ID,
  name: SITE_NAME,
  description:
    'Open-access legal encyclopedia and contract template library.',
  url: SITE_ORIGIN,
  provider: publisherRef,
  areaServed: [
    { '@type': 'Country', name: 'Turkey' },
    { '@type': 'Country', name: 'United States' },
  ],
  availableLanguage: ['English', 'Turkish'],
} as const

// ============================================
// ENTITY GRAPH (injected once in layout)
// ============================================

/**
 * The complete entity graph array.
 * Rendered as a single <script type="application/ld+json"> in the layout.
 *
 * Node order: Organization, Author, WebSite (deterministic).
 * LegalService is intentionally excluded to avoid implying legal representation.
 */
export const entityGraph = [
  organizationNode,
  authorNode,
  websiteNode,
] as const
