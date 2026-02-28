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

/** @id for the LegalService node. */
export const LEGAL_SERVICE_ID = siteId('legalservice')

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
    'Global legal encyclopedia providing professionally drafted contracts and legal guides. Attorney-reviewed, multilingual.',
  foundingDate: '2024',
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
} as const

/** WebSite node with SearchAction. */
export const websiteNode = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE_ORIGIN,
  name: SITE_NAME,
  description:
    'Global legal encyclopedia — attorney-reviewed legal reference and contract templates.',
  publisher: publisherRef,
  inLanguage: ['en', 'tr'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: absoluteUrl('/en/search?q={search_term_string}'),
    },
    'query-input': 'required name=search_term_string',
  },
} as const

/** LegalService node — organizational classification. */
export const legalServiceNode = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': LEGAL_SERVICE_ID,
  name: SITE_NAME,
  description:
    'Open-access legal encyclopedia and contract template library. Attorney-reviewed content for international professionals.',
  url: SITE_ORIGIN,
  provider: publisherRef,
  serviceType: 'Legal Information Service',
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Turkey' },
  ],
  availableLanguage: ['English', 'Turkish'],
} as const

// ============================================
// ENTITY GRAPH (injected once in layout)
// ============================================

/**
 * The complete entity graph array.
 * Rendered as a single <script type="application/ld+json"> in the layout.
 */
export const entityGraph = [
  organizationNode,
  authorNode,
  websiteNode,
  legalServiceNode,
] as const
