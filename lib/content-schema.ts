// lib/content-schema.ts
// Canonical content schema for EchoLegal legal encyclopedia
// Enforces consistent structure across all content types

import { JurisdictionCode, LanguageCode, isValidJurisdiction, isValidLanguage } from './jurisdictions'

// Helper to get supported language for text lookups (fallback to English)
type SupportedTextLang = 'en' | 'tr'
const getSupportedTextLang = (lang: LanguageCode): SupportedTextLang =>
  lang === 'tr' ? 'tr' : 'en'

// ============================================
// CONTENT TYPES
// ============================================

export type ContentType =
  | 'Article'      // Encyclopedic legal articles (library)
  | 'Contract'     // Legal document templates
  | 'Kit'          // Bundled document collections
  | 'Checklist'    // Step-by-step checklists
  | 'Guide'        // How-to guides
  | 'Form'         // Fillable forms
  | 'Letter'       // Letter templates
  | 'Sample'       // Example documents (reference only)
  | 'Policy'       // Policy templates (privacy, terms, etc.)

export type ContentStatus = 'draft' | 'review' | 'published' | 'archived'

// ============================================
// DISCLAIMER TYPES
// ============================================

export type DisclaimerType =
  | 'general'           // Standard "not legal advice" disclaimer
  | 'jurisdiction'      // Jurisdiction-specific limitations
  | 'no-attorney-client' // No attorney-client relationship
  | 'educational'       // Educational purposes only
  | 'sample-only'       // Sample document, not for direct use
  | 'custom'            // Custom disclaimer text

export type Disclaimer = {
  type: DisclaimerType
  text: {
    en: string
    tr: string
  }
}

// Standard disclaimers for reuse across content
export const STANDARD_DISCLAIMERS: Record<string, Disclaimer> = {
  general: {
    type: 'general',
    text: {
      en: 'This content is provided for general informational purposes only and does not constitute legal advice. Consult a licensed attorney for advice specific to your situation.',
      tr: 'Bu içerik yalnızca genel bilgilendirme amaçlıdır ve hukuki tavsiye niteliği taşımaz. Durumunuza özgü tavsiye için lisanslı bir avukata danışın.',
    },
  },
  noAttorneyClient: {
    type: 'no-attorney-client',
    text: {
      en: 'Use of this website does not create an attorney-client relationship between you and EchoLegal or any contributing attorney.',
      tr: 'Bu web sitesinin kullanımı, sizinle EchoLegal veya katkıda bulunan herhangi bir avukat arasında avukat-müvekkil ilişkisi oluşturmaz.',
    },
  },
  educational: {
    type: 'educational',
    text: {
      en: 'This material is provided for educational purposes. Laws and regulations may have changed since publication.',
      tr: 'Bu materyal eğitim amaçlı sunulmaktadır. Yayınlandığından bu yana yasalar ve düzenlemeler değişmiş olabilir.',
    },
  },
  sampleOnly: {
    type: 'sample-only',
    text: {
      en: 'This is a sample document for reference purposes only. Do not use without modification and review by a licensed attorney.',
      tr: 'Bu yalnızca referans amaçlı bir örnek belgedir. Lisanslı bir avukat tarafından değiştirilmeden ve incelenmeden kullanmayın.',
    },
  },
}

// ============================================
// BASE CONTENT METADATA
// ============================================

/**
 * BaseContentMeta - Required fields for all content types.
 * This is the canonical schema that all content must adhere to.
 */
export type BaseContentMeta = {
  // Identity
  id: string                          // Unique identifier (kebab-case)
  canonicalSlug: string               // URL-safe slug for routing
  contentType: ContentType

  // Localization
  lang: LanguageCode                  // Primary language of this version
  availableLanguages: LanguageCode[]  // All languages this content exists in

  // Scope
  jurisdictions: JurisdictionCode[]   // Applicable jurisdictions
  primaryJurisdiction: JurisdictionCode // Main jurisdiction focus

  // Content
  title: string                       // Display title
  summary: string                     // 1-2 sentence summary (for SEO, cards)
  description?: string                // Longer description if needed

  // Authorship & Review
  authorId: string                    // Contributor ID of primary author
  reviewerId?: string                 // Contributor ID of legal reviewer
  lastReviewedAt?: string             // ISO date of last legal review
  reviewNotes?: string                // Internal notes about review

  // Timestamps
  createdAt: string                   // ISO date created
  updatedAt: string                   // ISO date last updated
  publishedAt?: string                // ISO date first published

  // Status
  status: ContentStatus

  // Metadata
  readingTimeMinutes?: number         // Estimated reading time
  wordCount?: number                  // Approximate word count
  tags: string[]                      // Searchable tags

  // Disclaimers
  disclaimers: DisclaimerType[]       // Which standard disclaimers apply
  customDisclaimer?: string           // Additional custom disclaimer

  // Related content
  relatedIds?: string[]               // IDs of related content
  parentId?: string                   // Parent content (for sections/chapters)
  seriesId?: string                   // Series this belongs to

  // SEO
  metaTitle?: string                  // Override for <title>
  metaDescription?: string            // Override for meta description
  noIndex?: boolean                   // Exclude from search engines
}

// ============================================
// ARTICLE-SPECIFIC FIELDS
// ============================================

export type ArticleMeta = BaseContentMeta & {
  contentType: 'Article'

  // Article structure
  sections?: {
    id: string
    title: string
    anchor: string
  }[]

  // Citations & sources
  citations?: {
    id: string
    text: string
    url?: string
    accessedAt?: string
  }[]

  // Article category
  category: 'business' | 'tax' | 'immigration' | 'contracts' | 'compliance' | 'other'

  // Revision history
  revisionHistory?: {
    date: string
    authorId: string
    summary: string
  }[]
}

// ============================================
// CONTRACT-SPECIFIC FIELDS
// ============================================

export type ContractCategory =
  | 'nda'
  | 'service-agreement'
  | 'employment'
  | 'contractor'
  | 'privacy-terms'
  | 'real-estate'
  | 'intellectual-property'
  | 'formation'
  | 'compliance'
  | 'other'

export type ContractMeta = BaseContentMeta & {
  contentType: 'Contract' | 'Policy' | 'Form' | 'Letter' | 'Checklist' | 'Sample'

  // Contract classification
  category: ContractCategory
  useCases: string[]                  // e.g., ['freelancer', 'startup', 'hiring']

  // Files
  fileLinks?: {
    format: 'docx' | 'pdf' | 'gdoc' | 'md'
    lang: LanguageCode
    url: string
    size?: number
  }[]

  // Template details
  isSample?: boolean                  // Is this a sample/example only?
  requiresCustomization: boolean      // Must be modified before use
  complexityLevel: 'simple' | 'moderate' | 'complex'

  // Parties
  typicalParties?: string[]           // e.g., ['Service Provider', 'Client']

  // Related forms
  relatedForms?: string[]             // e.g., ['W-9', 'W-8BEN']
}

// ============================================
// KIT-SPECIFIC FIELDS
// ============================================

export type KitMeta = BaseContentMeta & {
  contentType: 'Kit'

  // Kit contents
  includedDocuments: {
    id: string
    title: string
    contentType: ContentType
  }[]

  // Target audience
  targetAudience: string[]            // e.g., ['startup-founder', 'freelancer']

  // Pricing (pay-what-you-can model)
  suggestedPrice?: number             // Suggested contribution in USD
  isFreeAvailable: boolean            // Can be accessed for free
}

// ============================================
// GUIDE-SPECIFIC FIELDS
// ============================================

export type GuideMeta = BaseContentMeta & {
  contentType: 'Guide'

  // Guide structure
  steps?: {
    stepNumber: number
    title: string
    estimatedMinutes?: number
  }[]

  totalSteps?: number
  estimatedTotalMinutes?: number

  // Prerequisites
  prerequisites?: string[]

  // What you'll need
  requiredDocuments?: string[]
  requiredForms?: string[]
}

// ============================================
// UNION TYPE
// ============================================

export type ContentMeta = ArticleMeta | ContractMeta | KitMeta | GuideMeta

// ============================================
// VALIDATION HELPERS
// ============================================

/**
 * Validate that content has required review fields for publication.
 * Published content MUST have a reviewer and review date.
 */
export function validateReviewGate(content: BaseContentMeta): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (content.status === 'published') {
    if (!content.reviewerId) {
      errors.push('Published content must have a reviewerId')
    }
    if (!content.lastReviewedAt) {
      errors.push('Published content must have a lastReviewedAt date')
    }
    if (!content.authorId) {
      errors.push('Published content must have an authorId')
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validate jurisdiction codes in content.
 */
export function validateContentJurisdictions(content: BaseContentMeta): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!isValidJurisdiction(content.primaryJurisdiction)) {
    errors.push(`Invalid primaryJurisdiction: ${content.primaryJurisdiction}`)
  }

  for (const j of content.jurisdictions) {
    if (!isValidJurisdiction(j)) {
      errors.push(`Invalid jurisdiction: ${j}`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validate language codes in content.
 */
export function validateContentLanguages(content: BaseContentMeta): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!isValidLanguage(content.lang)) {
    errors.push(`Invalid lang: ${content.lang}`)
  }

  for (const l of content.availableLanguages) {
    if (!isValidLanguage(l)) {
      errors.push(`Invalid language: ${l}`)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Full content validation.
 */
export function validateContent(content: BaseContentMeta): {
  valid: boolean
  errors: string[]
  warnings: string[]
} {
  const errors: string[] = []
  const warnings: string[] = []

  // Required fields
  if (!content.id) errors.push('Missing id')
  if (!content.canonicalSlug) errors.push('Missing canonicalSlug')
  if (!content.title) errors.push('Missing title')
  if (!content.summary) errors.push('Missing summary')
  if (!content.authorId) errors.push('Missing authorId')

  // Jurisdiction validation
  const jValidation = validateContentJurisdictions(content)
  errors.push(...jValidation.errors)

  // Language validation
  const lValidation = validateContentLanguages(content)
  errors.push(...lValidation.errors)

  // Review gate validation
  const rValidation = validateReviewGate(content)
  errors.push(...rValidation.errors)

  // Warnings (non-blocking)
  if (!content.readingTimeMinutes && content.status === 'published') {
    warnings.push('Published content should have readingTimeMinutes')
  }
  if (content.tags.length === 0) {
    warnings.push('Content has no tags for search')
  }
  if (content.disclaimers.length === 0 && content.status === 'published') {
    warnings.push('Published content should have at least one disclaimer')
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

// ============================================
// HELPERS
// ============================================

/**
 * Generate a canonical slug from a title.
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Estimate reading time from word count.
 * Average reading speed: 200 words per minute for legal content.
 */
export function estimateReadingTime(wordCount: number): number {
  return Math.ceil(wordCount / 200)
}

/**
 * Get applicable disclaimers for a content type.
 */
export function getDefaultDisclaimers(contentType: ContentType): DisclaimerType[] {
  switch (contentType) {
    case 'Article':
      return ['general', 'no-attorney-client', 'educational']
    case 'Contract':
    case 'Form':
    case 'Letter':
    case 'Policy':
      return ['general', 'no-attorney-client']
    case 'Sample':
      return ['general', 'sample-only']
    case 'Kit':
      return ['general', 'no-attorney-client']
    case 'Checklist':
    case 'Guide':
      return ['general', 'educational']
    default:
      return ['general']
  }
}

/**
 * Get disclaimer text by type.
 */
export function getDisclaimerText(type: DisclaimerType, lang: LanguageCode): string {
  const disclaimer = STANDARD_DISCLAIMERS[type === 'no-attorney-client' ? 'noAttorneyClient' : type]
  if (!disclaimer) return ''
  const supportedLang = getSupportedTextLang(lang)
  return disclaimer.text[supportedLang] || disclaimer.text.en
}
