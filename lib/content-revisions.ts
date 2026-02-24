// lib/content-revisions.ts
// Centralized revision history registry for all content entries.
//
// Implements GOVERNANCE_EXECUTION_PLAN.md Section 4.3:
// Every content entry tracks revisionHistory. Version history is publicly
// accessible via dedicated /history routes.

import { RevisionEntry } from './content-schema'

// ============================================
// CONTENT REVISION REGISTRY
// ============================================

export type ContentRevisionRecord = {
  slug: string
  title: { en: string; tr: string }
  section: string                    // e.g. 'encyclopedia', 'library', 'contracts'
  currentVersion: string
  citationKey?: string
  revisionHistory: RevisionEntry[]
}

/**
 * Registry of revision histories for all content entries.
 * Keyed by section/slug (e.g. 'encyclopedia/what-is-nda').
 */
export const contentRevisions: Record<string, ContentRevisionRecord> = {
  // ── Encyclopedia ──────────────────────────────────────────

  'encyclopedia/what-is-nda': {
    slug: 'what-is-nda',
    title: {
      en: 'What is an NDA? Non-Disclosure Agreement Explained',
      tr: 'NDA Nedir? Gizlilik Sözleşmesi Rehberi',
    },
    section: 'encyclopedia',
    currentVersion: '2.1',
    citationKey: 'ecl-enc-00001',
    revisionHistory: [
      {
        version: '2.1',
        date: '2026-01-25',
        authorId: 'zeynep-yilmaz',
        summary: 'Institutional tone migration; canonical page structure applied.',
        type: 'editorial',
      },
      {
        version: '2.0',
        date: '2025-12-10',
        authorId: 'zeynep-yilmaz',
        summary: 'Major revision: added mutual NDA section, updated enforceability analysis per 2025 case law.',
        type: 'substantive',
      },
      {
        version: '1.1',
        date: '2025-09-15',
        authorId: 'zeynep-yilmaz',
        summary: 'Added practical checklist and download section.',
        type: 'editorial',
      },
      {
        version: '1.0',
        date: '2025-06-15',
        authorId: 'zeynep-yilmaz',
        summary: 'Initial publication.',
        type: 'substantive',
      },
    ],
  },

  'encyclopedia/freelancer-legal-guide': {
    slug: 'freelancer-legal-guide',
    title: {
      en: 'Freelancer Legal Guide',
      tr: 'Serbest Çalışan Hukuk Rehberi',
    },
    section: 'encyclopedia',
    currentVersion: '1.2',
    citationKey: 'ecl-enc-00002',
    revisionHistory: [
      {
        version: '1.2',
        date: '2026-01-20',
        authorId: 'zeynep-yilmaz',
        summary: 'Institutional tone migration; canonical page structure applied.',
        type: 'editorial',
      },
      {
        version: '1.1',
        date: '2025-11-05',
        authorId: 'zeynep-yilmaz',
        summary: 'Added cross-border freelancing section for Turkish nationals.',
        type: 'substantive',
      },
      {
        version: '1.0',
        date: '2025-08-01',
        authorId: 'zeynep-yilmaz',
        summary: 'Initial publication.',
        type: 'substantive',
      },
    ],
  },

  'encyclopedia/contractor-vs-employee': {
    slug: 'contractor-vs-employee',
    title: {
      en: 'Contractor vs. Employee Classification',
      tr: 'Bağımsız Yüklenici ve Çalışan Sınıflandırması',
    },
    section: 'encyclopedia',
    currentVersion: '1.3',
    citationKey: 'ecl-enc-00003',
    revisionHistory: [
      {
        version: '1.3',
        date: '2026-01-22',
        authorId: 'zeynep-yilmaz',
        summary: 'Institutional tone migration; canonical page structure applied.',
        type: 'editorial',
      },
      {
        version: '1.2',
        date: '2025-12-01',
        authorId: 'zeynep-yilmaz',
        summary: 'Updated IRS 20-factor test analysis; added DOL 2024 final rule reference.',
        type: 'substantive',
      },
      {
        version: '1.1',
        date: '2025-09-20',
        authorId: 'zeynep-yilmaz',
        summary: 'Added state-level variation notes (California AB5, New York).',
        type: 'substantive',
      },
      {
        version: '1.0',
        date: '2025-07-10',
        authorId: 'zeynep-yilmaz',
        summary: 'Initial publication.',
        type: 'substantive',
      },
    ],
  },

  'encyclopedia/privacy-policy-guide': {
    slug: 'privacy-policy-guide',
    title: {
      en: 'Privacy Policy Guide',
      tr: 'Gizlilik Politikası Rehberi',
    },
    section: 'encyclopedia',
    currentVersion: '1.1',
    citationKey: 'ecl-enc-00004',
    revisionHistory: [
      {
        version: '1.1',
        date: '2026-01-18',
        authorId: 'zeynep-yilmaz',
        summary: 'Institutional tone migration; canonical page structure applied.',
        type: 'editorial',
      },
      {
        version: '1.0',
        date: '2025-09-15',
        authorId: 'zeynep-yilmaz',
        summary: 'Initial publication.',
        type: 'substantive',
      },
    ],
  },

  'encyclopedia/common-misconceptions': {
    slug: 'common-misconceptions',
    title: {
      en: 'Common Legal Misconceptions',
      tr: 'Yaygın Hukuki Yanılgılar',
    },
    section: 'encyclopedia',
    currentVersion: '1.0',
    citationKey: 'ecl-enc-00005',
    revisionHistory: [
      {
        version: '1.0',
        date: '2025-10-01',
        authorId: 'zeynep-yilmaz',
        summary: 'Initial publication.',
        type: 'substantive',
      },
    ],
  },
}

// ============================================
// LOOKUP HELPERS
// ============================================

/**
 * Get revision record for a content entry.
 * @param section - Content section (e.g. 'encyclopedia', 'library')
 * @param slug - Content slug
 */
export function getContentRevisions(
  section: string,
  slug: string
): ContentRevisionRecord | undefined {
  return contentRevisions[`${section}/${slug}`]
}

/**
 * Get all content entries in a given section that have revision history.
 */
export function getSectionEntries(section: string): ContentRevisionRecord[] {
  return Object.values(contentRevisions).filter(r => r.section === section)
}

/**
 * Get all slugs for a section (useful for generateStaticParams).
 */
export function getSectionSlugs(section: string): string[] {
  return getSectionEntries(section).map(r => r.slug)
}
