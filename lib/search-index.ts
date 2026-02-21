// lib/search-index.ts
// Unified search index for site-wide search functionality

import { templatesRegistry, Template, categoryLabels } from './templates-registry'
import { LanguageCode } from './jurisdictions'

// Helper to get supported language for category labels (fallback to English)
type SupportedLang = 'en' | 'tr'
const getSupportedLang = (lang: LanguageCode): SupportedLang =>
  lang === 'tr' ? 'tr' : 'en'

// ============================================
// SEARCH AUTHORITY LEVEL HIERARCHY
// ============================================

/**
 * Authority classification for search results.
 * Determines deterministic ordering: higher authority = listed first.
 */
export const SearchAuthorityLevel = {
  PRIMARY_LAW: 'primary_law',
  REGULATION: 'regulation',
  CASE_LAW: 'case_law',
  OFFICIAL_GUIDANCE: 'official_guidance',
  SECONDARY_ANALYSIS: 'secondary_analysis',
  TEMPLATE: 'template',
} as const

export type SearchAuthorityLevel =
  typeof SearchAuthorityLevel[keyof typeof SearchAuthorityLevel]

/** Higher weight = higher authority = listed first (sort descending). */
export const SEARCH_AUTHORITY_WEIGHT: Record<SearchAuthorityLevel, number> = {
  [SearchAuthorityLevel.PRIMARY_LAW]: 100,
  [SearchAuthorityLevel.REGULATION]: 80,
  [SearchAuthorityLevel.CASE_LAW]: 70,
  [SearchAuthorityLevel.OFFICIAL_GUIDANCE]: 60,
  [SearchAuthorityLevel.SECONDARY_ANALYSIS]: 40,
  [SearchAuthorityLevel.TEMPLATE]: 20,
}

/** Bilingual display label for authority level in search results. */
export function getAuthorityLabel(
  level: SearchAuthorityLevel,
  lang: 'en' | 'tr'
): string {
  const labels: Record<SearchAuthorityLevel, { en: string; tr: string }> = {
    [SearchAuthorityLevel.PRIMARY_LAW]: { en: 'Statute', tr: 'Kanun' },
    [SearchAuthorityLevel.REGULATION]: { en: 'Regulation', tr: 'Düzenleme' },
    [SearchAuthorityLevel.CASE_LAW]: { en: 'Case Law', tr: 'İçtihat' },
    [SearchAuthorityLevel.OFFICIAL_GUIDANCE]: { en: 'Official Guidance', tr: 'Resmi Rehber' },
    [SearchAuthorityLevel.SECONDARY_ANALYSIS]: { en: 'Analysis', tr: 'Analiz' },
    [SearchAuthorityLevel.TEMPLATE]: { en: 'Template', tr: 'Şablon' },
  }
  return labels[level][lang]
}

// ============================================
// SEARCH ITEM TYPES
// ============================================

export type SearchItemType = 'template' | 'guide' | 'checklist' | 'kit' | 'page'

export type SearchItem = {
  id: string
  lang: LanguageCode
  title: string
  description: string
  url: string
  type: SearchItemType
  category: string
  tags: string[]
  updatedAt: string
  authorityLevel: SearchAuthorityLevel
}

// Static guides index
const guidesIndex: SearchItem[] = [
  // English guides
  {
    id: 'guide-llc-en',
    lang: 'en',
    title: 'LLC Formation Guide',
    description: 'Step-by-step guide to forming a US LLC for Turkish entrepreneurs',
    url: '/en/abd-de-llc-kurmak-turkler-icin-adim-adim',
    type: 'guide',
    category: 'Business',
    tags: ['llc', 'formation', 'business', 'delaware', 'wyoming'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.REGULATION,
  },
  {
    id: 'guide-ds160-en',
    lang: 'en',
    title: 'DS-160 Form Guide',
    description: 'Complete guide to filling out the DS-160 visa application form',
    url: '/en/ds-160-rehberi',
    type: 'guide',
    category: 'Immigration',
    tags: ['visa', 'ds-160', 'immigration', 'application'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.OFFICIAL_GUIDANCE,
  },
  {
    id: 'guide-w8w9-en',
    lang: 'en',
    title: 'W-8 and W-9 Forms Guide',
    description: 'Understanding IRS tax forms for non-US persons',
    url: '/en/irs-vergiler-ve-w8-w9-gercekleri',
    type: 'guide',
    category: 'Tax',
    tags: ['w8', 'w9', 'irs', 'tax', 'withholding'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.REGULATION,
  },
  {
    id: 'guide-ein-en',
    lang: 'en',
    title: 'EIN vs ITIN vs SSN',
    description: 'Understanding US tax identification numbers',
    url: '/en/ein-itin-ssn-farki',
    type: 'guide',
    category: 'Tax',
    tags: ['ein', 'itin', 'ssn', 'tax', 'id'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.REGULATION,
  },
  {
    id: 'guide-1099-en',
    lang: 'en',
    title: '1099 Tax Documents',
    description: 'Understanding 1099 forms and reporting requirements',
    url: '/en/1099-vergi-belgeleri',
    type: 'guide',
    category: 'Tax',
    tags: ['1099', 'tax', 'reporting', 'irs'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.REGULATION,
  },
  {
    id: 'guide-bank-en',
    lang: 'en',
    title: 'US Bank Account Guide',
    description: 'Opening a US bank account as a non-resident',
    url: '/en/abdde-banka-hesabi-acmak',
    type: 'guide',
    category: 'Banking',
    tags: ['bank', 'account', 'mercury', 'relay', 'non-resident'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.OFFICIAL_GUIDANCE,
  },
  {
    id: 'guide-payments-en',
    lang: 'en',
    title: 'Receiving US Payments',
    description: 'How to receive payments from US clients: Stripe, PayPal, Wise',
    url: '/en/abd-odemeleri-alma-rehberi',
    type: 'guide',
    category: 'Payments',
    tags: ['payments', 'stripe', 'paypal', 'wise', 'transfer'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.OFFICIAL_GUIDANCE,
  },
  {
    id: 'guide-salestax-en',
    lang: 'en',
    title: 'US Sales Tax & Nexus',
    description: 'Understanding sales tax obligations for e-commerce',
    url: '/en/abd-satis-vergisi-rehberi',
    type: 'guide',
    category: 'Tax',
    tags: ['sales-tax', 'nexus', 'ecommerce', 'state-tax'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.REGULATION,
  },
  {
    id: 'guide-llc-corp-en',
    lang: 'en',
    title: 'LLC vs Corporation',
    description: 'Comparing business structures for your US company',
    url: '/en/llc-mi-corporation-mi',
    type: 'guide',
    category: 'Business',
    tags: ['llc', 'corporation', 'c-corp', 's-corp', 'structure'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.SECONDARY_ANALYSIS,
  },
  {
    id: 'guide-contracts-en',
    lang: 'en',
    title: 'Essential Contracts Guide',
    description: 'Must-have legal documents for US business operations',
    url: '/en/abdde-is-yapan-turkler-icin-sozlesmeler',
    type: 'guide',
    category: 'Contracts',
    tags: ['contracts', 'legal', 'nda', 'agreement'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.SECONDARY_ANALYSIS,
  },
  {
    id: 'guide-visa-paths-en',
    lang: 'en',
    title: 'US Visa Categories',
    description: 'Understanding E2, L1, H1B, O1 and other visa options',
    url: '/en/amerika/abdye-gelme-yollari',
    type: 'guide',
    category: 'Immigration',
    tags: ['visa', 'e2', 'l1', 'h1b', 'o1', 'immigration'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.OFFICIAL_GUIDANCE,
  },
  // Turkish guides
  {
    id: 'guide-llc-tr',
    lang: 'tr',
    title: 'LLC Kurma Rehberi',
    description: 'Türk girişimciler için adım adım ABD LLC kurma rehberi',
    url: '/tr/abd-de-llc-kurmak-turkler-icin-adim-adim',
    type: 'guide',
    category: 'İş',
    tags: ['llc', 'kuruluş', 'şirket', 'delaware', 'wyoming'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.REGULATION,
  },
  {
    id: 'guide-ds160-tr',
    lang: 'tr',
    title: 'DS-160 Formu Rehberi',
    description: 'DS-160 vize başvuru formunu doldurma rehberi',
    url: '/tr/ds-160-rehberi',
    type: 'guide',
    category: 'Göçmenlik',
    tags: ['vize', 'ds-160', 'göçmenlik', 'başvuru'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.OFFICIAL_GUIDANCE,
  },
  {
    id: 'guide-w8w9-tr',
    lang: 'tr',
    title: 'W-8 ve W-9 Formları Rehberi',
    description: 'ABD dışı kişiler için IRS vergi formları açıklaması',
    url: '/tr/irs-vergiler-ve-w8-w9-gercekleri',
    type: 'guide',
    category: 'Vergi',
    tags: ['w8', 'w9', 'irs', 'vergi', 'stopaj'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.REGULATION,
  },
  {
    id: 'guide-ein-tr',
    lang: 'tr',
    title: 'EIN, ITIN, SSN Farkları',
    description: 'ABD vergi kimlik numaralarını anlama',
    url: '/tr/ein-itin-ssn-farki',
    type: 'guide',
    category: 'Vergi',
    tags: ['ein', 'itin', 'ssn', 'vergi', 'kimlik'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.REGULATION,
  },
  {
    id: 'guide-1099-tr',
    lang: 'tr',
    title: '1099 Vergi Belgeleri',
    description: '1099 formlarını ve raporlama gereksinimlerini anlama',
    url: '/tr/1099-vergi-belgeleri',
    type: 'guide',
    category: 'Vergi',
    tags: ['1099', 'vergi', 'raporlama', 'irs'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.REGULATION,
  },
  {
    id: 'guide-bank-tr',
    lang: 'tr',
    title: 'ABD Banka Hesabı Rehberi',
    description: 'Yabancı olarak ABD banka hesabı açma',
    url: '/tr/abdde-banka-hesabi-acmak',
    type: 'guide',
    category: 'Bankacılık',
    tags: ['banka', 'hesap', 'mercury', 'relay', 'yabancı'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.OFFICIAL_GUIDANCE,
  },
  {
    id: 'guide-payments-tr',
    lang: 'tr',
    title: 'ABD\'den Ödeme Alma',
    description: 'ABD müşterilerinden ödeme alma yolları: Stripe, PayPal, Wise',
    url: '/tr/abd-odemeleri-alma-rehberi',
    type: 'guide',
    category: 'Ödemeler',
    tags: ['ödeme', 'stripe', 'paypal', 'wise', 'transfer'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.OFFICIAL_GUIDANCE,
  },
  {
    id: 'guide-salestax-tr',
    lang: 'tr',
    title: 'ABD Satış Vergisi',
    description: 'E-ticaret için satış vergisi yükümlülükleri',
    url: '/tr/abd-satis-vergisi-rehberi',
    type: 'guide',
    category: 'Vergi',
    tags: ['satış-vergisi', 'nexus', 'e-ticaret', 'eyalet-vergisi'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.REGULATION,
  },
  {
    id: 'guide-llc-corp-tr',
    lang: 'tr',
    title: 'LLC mi Corporation mı',
    description: 'ABD şirketiniz için iş yapılarını karşılaştırma',
    url: '/tr/llc-mi-corporation-mi',
    type: 'guide',
    category: 'İş',
    tags: ['llc', 'corporation', 'c-corp', 's-corp', 'yapı'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.SECONDARY_ANALYSIS,
  },
  {
    id: 'guide-contracts-tr',
    lang: 'tr',
    title: 'Temel Sözleşmeler Rehberi',
    description: 'ABD iş operasyonları için olmazsa olmaz hukuki belgeler',
    url: '/tr/abdde-is-yapan-turkler-icin-sozlesmeler',
    type: 'guide',
    category: 'Sözleşmeler',
    tags: ['sözleşme', 'hukuki', 'nda', 'anlaşma'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.SECONDARY_ANALYSIS,
  },
  {
    id: 'guide-visa-paths-tr',
    lang: 'tr',
    title: 'ABD Vize Kategorileri',
    description: 'E2, L1, H1B, O1 ve diğer vize seçeneklerini anlama',
    url: '/tr/amerika/abdye-gelme-yollari',
    type: 'guide',
    category: 'Göçmenlik',
    tags: ['vize', 'e2', 'l1', 'h1b', 'o1', 'göçmenlik'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.OFFICIAL_GUIDANCE,
  },
]

// Checklists index
const checklistsIndex: SearchItem[] = [
  {
    id: 'checklist-llc-en',
    lang: 'en',
    title: 'LLC Formation Checklist',
    description: 'Step-by-step checklist for forming your US LLC',
    url: '/en/checklists/llc-checklist',
    type: 'checklist',
    category: 'Business',
    tags: ['llc', 'formation', 'checklist', 'steps'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.TEMPLATE,
  },
  {
    id: 'checklist-bank-en',
    lang: 'en',
    title: 'Bank Account Checklist',
    description: 'Documents and steps needed to open a US bank account',
    url: '/en/checklists/bank-account-checklist',
    type: 'checklist',
    category: 'Banking',
    tags: ['bank', 'account', 'checklist', 'documents'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.TEMPLATE,
  },
  {
    id: 'checklist-tax-en',
    lang: 'en',
    title: 'Tax Documents Checklist',
    description: 'Essential tax documents for US business compliance',
    url: '/en/checklists/tax-documents-checklist',
    type: 'checklist',
    category: 'Tax',
    tags: ['tax', 'documents', 'checklist', 'irs'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.TEMPLATE,
  },
  {
    id: 'checklist-llc-tr',
    lang: 'tr',
    title: 'LLC Kurulum Kontrol Listesi',
    description: 'ABD LLC kurulumu için adım adım kontrol listesi',
    url: '/tr/checklists/llc-checklist',
    type: 'checklist',
    category: 'İş',
    tags: ['llc', 'kuruluş', 'kontrol-listesi', 'adımlar'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.TEMPLATE,
  },
  {
    id: 'checklist-bank-tr',
    lang: 'tr',
    title: 'Banka Hesabı Kontrol Listesi',
    description: 'ABD banka hesabı açmak için gerekli belgeler ve adımlar',
    url: '/tr/checklists/bank-account-checklist',
    type: 'checklist',
    category: 'Bankacılık',
    tags: ['banka', 'hesap', 'kontrol-listesi', 'belgeler'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.TEMPLATE,
  },
  {
    id: 'checklist-tax-tr',
    lang: 'tr',
    title: 'Vergi Belgeleri Kontrol Listesi',
    description: 'ABD iş uyumluluğu için gerekli vergi belgeleri',
    url: '/tr/checklists/tax-documents-checklist',
    type: 'checklist',
    category: 'Vergi',
    tags: ['vergi', 'belgeler', 'kontrol-listesi', 'irs'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.TEMPLATE,
  },
]

// Legal kits index
const kitsIndex: SearchItem[] = [
  {
    id: 'kit-starter-en',
    lang: 'en',
    title: 'ABD Business Starter Kit',
    description: '5 essential legal documents for launching your US business',
    url: '/en/legal-kits/business-starter',
    type: 'kit',
    category: 'Legal Kits',
    tags: ['starter', 'bundle', 'essential', 'business'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.TEMPLATE,
  },
  {
    id: 'kit-starter-tr',
    lang: 'tr',
    title: 'ABD Business Starter Kit',
    description: 'ABD işinizi başlatmak için 5 temel hukuki belge',
    url: '/tr/legal-kits/business-starter',
    type: 'kit',
    category: 'Hukuki Kitler',
    tags: ['başlangıç', 'paket', 'temel', 'iş'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.TEMPLATE,
  },
]

// Pages index
const pagesIndex: SearchItem[] = [
  {
    id: 'page-templates-en',
    lang: 'en',
    title: 'Templates Library',
    description: 'Browse all legal templates and documents',
    url: '/en/templates',
    type: 'page',
    category: 'Library',
    tags: ['templates', 'library', 'documents'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.SECONDARY_ANALYSIS,
  },
  {
    id: 'page-templates-tr',
    lang: 'tr',
    title: 'Şablon Kütüphanesi',
    description: 'Tüm hukuki şablon ve belgelere göz atın',
    url: '/tr/sablonlar',
    type: 'page',
    category: 'Kütüphane',
    tags: ['şablonlar', 'kütüphane', 'belgeler'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.SECONDARY_ANALYSIS,
  },
  {
    id: 'page-amerika-en',
    lang: 'en',
    title: 'US Immigration & Business Hub',
    description: 'Comprehensive guides for Turks in the US',
    url: '/en/amerika',
    type: 'page',
    category: 'Hub',
    tags: ['hub', 'immigration', 'business', 'usa'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.SECONDARY_ANALYSIS,
  },
  {
    id: 'page-amerika-tr',
    lang: 'tr',
    title: 'ABD Göç ve İş Merkezi',
    description: 'ABD\'deki Türkler için kapsamlı rehberler',
    url: '/tr/amerika',
    type: 'page',
    category: 'Merkez',
    tags: ['merkez', 'göçmenlik', 'iş', 'abd'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.SECONDARY_ANALYSIS,
  },
  {
    id: 'page-taxhub-en',
    lang: 'en',
    title: 'Tax & ID Hub',
    description: 'All tax and identification guides',
    url: '/en/vergi-kimlik-rehberi',
    type: 'page',
    category: 'Hub',
    tags: ['tax', 'ein', 'itin', 'ssn', 'hub'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.SECONDARY_ANALYSIS,
  },
  {
    id: 'page-taxhub-tr',
    lang: 'tr',
    title: 'Vergi ve Kimlik Rehberi',
    description: 'Tüm vergi ve kimlik rehberleri',
    url: '/tr/vergi-kimlik-rehberi',
    type: 'page',
    category: 'Merkez',
    tags: ['vergi', 'ein', 'itin', 'ssn', 'merkez'],
    updatedAt: '2025-01-01',
    authorityLevel: SearchAuthorityLevel.SECONDARY_ANALYSIS,
  },
]

// Convert templates from registry to search items
function getTemplateSearchItems(): SearchItem[] {
  return templatesRegistry.map((template) => ({
    id: template.id,
    lang: template.lang,
    title: template.title,
    description: template.shortDescription,
    url:
      template.lang === 'tr'
        ? `/tr/sablonlar/${template.slug}`
        : `/en/templates/${template.slug}`,
    type: 'template' as SearchItemType,
    category: categoryLabels[template.category][getSupportedLang(template.lang)],
    tags: template.tags,
    updatedAt: template.updatedAt,
    authorityLevel: SearchAuthorityLevel.TEMPLATE,
  }))
}

// Build complete search index
export function getSearchIndex(): SearchItem[] {
  return [
    ...getTemplateSearchItems(),
    ...guidesIndex,
    ...checklistsIndex,
    ...kitsIndex,
    ...pagesIndex,
  ]
}

// Get search index by language
export function getSearchIndexByLang(lang: 'en' | 'tr'): SearchItem[] {
  return getSearchIndex().filter((item) => item.lang === lang)
}

// Search function with language awareness and authority-weighted ordering
export function searchIndex(
  query: string,
  options: {
    lang: 'en' | 'tr'
    includeOtherLang?: boolean
    types?: SearchItemType[]
    limit?: number
  }
): SearchItem[] {
  const { lang, includeOtherLang = false, types, limit = 20 } = options
  const normalizedQuery = query.toLowerCase().trim()

  if (!normalizedQuery) return []

  const searchTerms = normalizedQuery.split(/\s+/)
  const allItems = getSearchIndex()

  // Filter by language
  let items = includeOtherLang
    ? allItems
    : allItems.filter((item) => item.lang === lang)

  // Filter by types if specified
  if (types && types.length > 0) {
    items = items.filter((item) => types.includes(item.type))
  }

  // Score and filter items
  const scoredItems = items
    .map((item) => {
      let score = 0
      const searchText =
        `${item.title} ${item.description} ${item.tags.join(' ')} ${item.category}`.toLowerCase()

      for (const term of searchTerms) {
        // Title match (highest priority)
        if (item.title.toLowerCase().includes(term)) {
          score += 10
          if (item.title.toLowerCase().startsWith(term)) {
            score += 5
          }
        }
        // Tag match
        if (item.tags.some((tag) => tag.toLowerCase().includes(term))) {
          score += 5
        }
        // Category match
        if (item.category.toLowerCase().includes(term)) {
          score += 3
        }
        // Description match
        if (item.description.toLowerCase().includes(term)) {
          score += 2
        }
        // General match
        if (searchText.includes(term)) {
          score += 1
        }
      }

      // Boost same-language results
      if (item.lang === lang) {
        score *= 1.5
      }

      return { item, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      // Primary: authority weight descending (higher weight = higher authority)
      const weightA = SEARCH_AUTHORITY_WEIGHT[a.item.authorityLevel]
      const weightB = SEARCH_AUTHORITY_WEIGHT[b.item.authorityLevel]
      if (weightA !== weightB) return weightB - weightA
      // Secondary: relevance score descending
      if (a.score !== b.score) return b.score - a.score
      // Tertiary: lastUpdated descending (newer first)
      return b.item.updatedAt.localeCompare(a.item.updatedAt)
    })

  return scoredItems.slice(0, limit).map(({ item }) => item)
}

// ============================================
// BUILD-TIME VALIDATION
// ============================================

const VALID_AUTHORITY_LEVELS = new Set(Object.values(SearchAuthorityLevel))

/**
 * Validate that every item in the search index has a valid authorityLevel.
 * Throws in development; returns errors in production.
 */
export function validateSearchIndex(
  items: SearchItem[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  for (const item of items) {
    if (!item.authorityLevel) {
      errors.push(`Search item "${item.id}" is missing required authorityLevel`)
    } else if (!VALID_AUTHORITY_LEVELS.has(item.authorityLevel)) {
      errors.push(
        `Search item "${item.id}" has invalid authorityLevel: "${item.authorityLevel}"`
      )
    }
  }
  if (errors.length > 0 && process.env.NODE_ENV === 'development') {
    throw new Error(
      `Search index validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`
    )
  }
  return { valid: errors.length === 0, errors }
}

// Get type label
export function getTypeLabel(
  type: SearchItemType,
  lang: 'en' | 'tr'
): string {
  const labels: Record<SearchItemType, { en: string; tr: string }> = {
    template: { en: 'Template', tr: 'Şablon' },
    guide: { en: 'Guide', tr: 'Rehber' },
    checklist: { en: 'Checklist', tr: 'Kontrol Listesi' },
    kit: { en: 'Legal Kit', tr: 'Hukuki Kit' },
    page: { en: 'Page', tr: 'Sayfa' },
  }
  return labels[type][lang]
}

// Get type badge color
export function getTypeBadgeColor(type: SearchItemType): {
  bg: string
  text: string
} {
  const colors: Record<SearchItemType, { bg: string; text: string }> = {
    template: { bg: 'bg-blue-100', text: 'text-blue-700' },
    guide: { bg: 'bg-green-100', text: 'text-green-700' },
    checklist: { bg: 'bg-purple-100', text: 'text-purple-700' },
    kit: { bg: 'bg-amber-100', text: 'text-amber-700' },
    page: { bg: 'bg-gray-100', text: 'text-gray-700' },
  }
  return colors[type]
}
