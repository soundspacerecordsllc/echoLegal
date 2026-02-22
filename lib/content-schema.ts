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

export type ContentStatus =
  | 'draft'
  | 'review'
  | 'approved'
  | 'published'
  | 'archived'
  | 'retracted'

// ============================================
// VERSIONING & REVISION HISTORY
// ============================================

export type RevisionType =
  | 'substantive'          // Legal change (new statute, case, procedure)
  | 'correction'           // Factual error corrected
  | 'editorial'            // Clarity, formatting, non-substantive
  | 'translation-update'   // Translation brought current with source

export type RevisionEntry = {
  version: string          // Semantic: '1.0', '1.1', '2.0'
  date: string             // ISO date
  authorId: string         // Contributor who made the change
  summary: string          // Human-readable summary of change
  type: RevisionType
}

// ============================================
// CITATION KEY SYSTEM
// ============================================

/**
 * Canonical content type prefixes for citation keys.
 * Format: ecl-{prefix}-{5-digit-sequence}
 * Example: ecl-enc-00142
 */
export const CITATION_TYPE_PREFIX: Record<ContentType, string> = {
  Article: 'enc',
  Guide: 'gde',
  Contract: 'tpl',
  Form: 'frm',
  Sample: 'smp',
  Letter: 'ltr',
  Kit: 'kit',
  Checklist: 'chk',
  Policy: 'pol',
}

export function generateCitationKey(contentType: ContentType, sequenceNumber: number): string {
  const prefix = CITATION_TYPE_PREFIX[contentType]
  const padded = String(sequenceNumber).padStart(5, '0')
  return `ecl-${prefix}-${padded}`
}

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
  citationKey?: string                // Machine-readable: ecl-{type}-{seq} (see generateCitationKey)

  // Localization
  lang: LanguageCode                  // Primary language of this version
  canonicalLang?: LanguageCode        // Language of the ORIGINAL version
  availableLanguages: LanguageCode[]  // All languages this content exists in
  translatedFrom?: string             // ID of the source-language version (if translation)

  // Scope
  jurisdictions: JurisdictionCode[]   // Applicable jurisdictions
  primaryJurisdiction: JurisdictionCode // Main jurisdiction focus

  // Content
  title: string                       // Display title
  summary: string                     // 1-2 sentence summary (for SEO, cards)
  description?: string                // Longer description if needed

  // Authorship & Review
  authorId: string                    // Contributor ID of primary author
  authorIds?: string[]                // Additional co-authors
  reviewerId?: string                 // Contributor ID of legal reviewer
  reviewerIds?: string[]              // Additional reviewers
  lastReviewedAt?: string             // ISO date of last legal review
  lastReviewedBy?: string             // Contributor ID of last reviewer
  reviewNotes?: string                // Internal notes about review
  nextReviewDue?: string              // ISO date — computed from review policy

  // Timestamps
  createdAt: string                   // ISO date created
  updatedAt: string                   // ISO date last updated
  publishedAt?: string                // ISO date first published

  // Status
  status: ContentStatus

  // Versioning
  version?: string                    // Semantic: '1.0', '1.1', '2.0'
  revisionHistory?: RevisionEntry[]   // Ordered list of revisions
  changelogSummary?: string           // Human-readable summary of latest change

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

  // Primary legal sources (collapsible disclosure)
  primarySources?: PrimarySourceEntry[]

  // SEO
  metaTitle?: string                  // Override for <title>
  metaDescription?: string            // Override for meta description
  canonicalUrl?: string               // Fully qualified canonical URL
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
    sourceType?: 'statute' | 'regulation' | 'case' | 'government-source'
      | 'academic' | 'bar-association' | 'news' | 'other'
  }[]

  // Defined legal terms (for cross-referencing)
  definedTerms?: string[]

  // Related statutes
  relatedStatutes?: string[]             // e.g., ['26 USC § 7701', 'INA § 101']

  // Key takeaways (3-5 bullet points for summaries)
  keyTakeaways?: string[]

  // Article category
  category: 'business' | 'tax' | 'immigration' | 'contracts' | 'compliance' | 'other'
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

// ============================================
// CANONICAL CONTENT ARCHITECTURE
// ============================================
// Implements GOVERNANCE_EXECUTION_PLAN.md Section 3.
//
// These types define the target schema for all EchoLegal content.
// Current registries (templates-registry.ts, article-metadata.ts)
// will be migrated to conform to these schemas in a future phase.
//
// The legacy types above (ContentType, BaseContentMeta, ArticleMeta,
// ContractMeta, KitMeta, GuideMeta) remain exported for backward
// compatibility with existing components.

// ============================================
// CANONICAL CONTENT TYPE TAXONOMY (Section 3.1)
// ============================================

/**
 * Editorial content types — informational, encyclopedic, citable.
 * These produce web-native content (not downloadable documents).
 */
export type EditorialContentType =
  | 'encyclopedia-entry'      // Definitive reference article on a legal concept
  | 'jurisdictional-guide'    // Step-by-step procedural guide for a jurisdiction
  | 'comparative-analysis'    // Side-by-side comparison of legal structures
  | 'legal-update'            // Time-bound notification of a change in law
  | 'checklist'               // Ordered procedural checklist

/**
 * Document content types — downloadable, actionable templates.
 * These produce files (DOCX, PDF) with accompanying web guidance.
 */
export type DocumentContentType =
  | 'contract-template'       // Customizable legal agreement
  | 'legal-form'              // Government or procedural form with guidance
  | 'sample-document'         // Reference-only example (NOT for direct use)
  | 'letter-template'         // Formal correspondence template
  | 'document-kit'            // Bundled collection of templates and guides

/**
 * Union of all canonical content types.
 * This replaces the legacy ContentType for new content going forward.
 */
export type ContentTypeKey = EditorialContentType | DocumentContentType

/**
 * Canonical citation key prefixes per content type key.
 * Format: ecl-{prefix}-{5-digit-sequence}
 */
export const CANONICAL_TYPE_PREFIX: Record<ContentTypeKey, string> = {
  'encyclopedia-entry': 'enc',
  'jurisdictional-guide': 'gde',
  'comparative-analysis': 'cmp',
  'legal-update': 'upd',
  'checklist': 'chk',
  'contract-template': 'tpl',
  'legal-form': 'frm',
  'sample-document': 'smp',
  'letter-template': 'ltr',
  'document-kit': 'kit',
}

/**
 * Maps legacy ContentType values to canonical ContentTypeKey values.
 * Used during migration from old registries to canonical schema.
 */
export const LEGACY_TO_CANONICAL_TYPE: Record<ContentType, ContentTypeKey> = {
  Article: 'encyclopedia-entry',
  Guide: 'jurisdictional-guide',
  Checklist: 'checklist',
  Contract: 'contract-template',
  Form: 'legal-form',
  Sample: 'sample-document',
  Letter: 'letter-template',
  Kit: 'document-kit',
  Policy: 'contract-template',  // Policies are treated as contract-class templates
}

export function generateCanonicalCitationKey(
  contentType: ContentTypeKey,
  sequenceNumber: number
): string {
  const prefix = CANONICAL_TYPE_PREFIX[contentType]
  const padded = String(sequenceNumber).padStart(5, '0')
  return `ecl-${prefix}-${padded}`
}

// ============================================
// PRIMARY SOURCES
// ============================================

/**
 * Primary legal source reference for editorial entries.
 * Used in the collapsible "Primary legal sources" disclosure
 * below the References section on editorial pages.
 */
export type PrimarySourceType =
  | 'CFR'           // Code of Federal Regulations
  | 'USC'           // United States Code
  | 'StateStatute'  // State-level statutes
  | 'Reg'           // Agency regulations / rules
  | 'Guidance'      // Agency guidance documents (IRS notices, revenue rulings, etc.)
  | 'Case'          // Case law
  | 'Treaty'        // International treaties
  | 'Other'

/**
 * Authority level for semantic weighting of legal sources.
 * Ordered roughly by precedence in the US legal hierarchy.
 */
export type AuthorityLevel =
  | 'constitutional'
  | 'federal_statute'
  | 'federal_regulation'
  | 'state_statute'
  | 'treaty'
  | 'agency_guidance'
  | 'form_instruction'
  | 'publication'

export type PrimarySourceEntry = {
  type: PrimarySourceType
  citation: string
  label?: string
  url?: string
  authorityLevel: AuthorityLevel
  canonicalId: string
  jurisdiction: string
  jurisdictionScope: JurisdictionCode
}

// ============================================
// SHARED CANONICAL TYPES
// ============================================

/**
 * Citation reference for legal sources.
 * Used in encyclopedia entries and other editorial content.
 */
export type Citation = {
  id: string                       // e.g., 'cite-001'
  text: string                     // Full citation text
  url?: string                     // Link to source
  accessedAt?: string              // ISO date — when the source was last accessed
  sourceType: 'statute' | 'regulation' | 'case' | 'government-source'
    | 'academic' | 'bar-association' | 'news' | 'other'
}

/**
 * Downloadable file link for document-type content.
 */
export type FileLink = {
  format: 'docx' | 'pdf' | 'md'
  lang: LanguageCode
  url: string
  sizeBytes?: number
  checksum?: string                 // SHA-256 for integrity verification
}

// ============================================
// UNIVERSAL METADATA — BASE TYPE (Section 3.2.1)
// ============================================

/**
 * UniversalMeta — Required metadata for ALL canonical content types.
 *
 * This is the authoritative base schema. Every content entry
 * (editorial or document) must conform to this structure.
 *
 * Fields marked as required are enforced at validation time.
 * Optional fields become required at specific content statuses
 * (e.g., published content must have reviewerIds and lastReviewedAt).
 */
export type UniversalMeta = {
  // Identity
  id: string                        // Globally unique, stable (e.g., 'ecl-enc-00142')
  canonicalSlug: string             // Language-independent slug (e.g., 'nda-overview')
  contentType: ContentTypeKey       // From canonical taxonomy
  status: ContentStatus

  // Localization
  lang: LanguageCode                // Language of THIS version
  canonicalLang: LanguageCode       // Language of the ORIGINAL version
  availableTranslations: LanguageCode[]
  translatedFrom?: string           // ID of the source-language version

  // Jurisdiction
  jurisdictions: JurisdictionCode[] // All applicable jurisdictions
  primaryJurisdiction: JurisdictionCode

  // Authorship
  authorIds: string[]               // One or more contributor IDs
  reviewerIds: string[]             // One or more reviewer IDs
  lastReviewedAt?: string           // ISO date — mandatory for published content
  lastReviewedBy?: string           // Contributor ID

  // Dates
  createdAt: string
  firstPublishedAt?: string
  lastModifiedAt: string
  nextReviewDue?: string            // Computed from review policy

  // Classification
  tags: string[]
  category: string                  // Primary category within content type
  parentId?: string                 // For content that belongs to a series or kit
  relatedIds: string[]

  // Versioning
  version: string                   // Semantic: '1.0', '1.1', '2.0'
  revisionHistory: RevisionEntry[]
  changelogSummary?: string         // Human-readable summary of latest changes

  // Disclaimers
  disclaimers: DisclaimerType[]
  customDisclaimer?: Partial<Record<LanguageCode, string>>

  // SEO & AI
  metaTitle?: Partial<Record<LanguageCode, string>>
  metaDescription?: Partial<Record<LanguageCode, string>>
  canonicalUrl?: string             // Fully qualified, language-prefixed
  noIndex: boolean
  citationKey: string               // Machine-readable citation identifier

  // Primary legal sources (collapsible disclosure)
  primarySources?: PrimarySourceEntry[]

  // Content metrics (optional, computed)
  readingTimeMinutes?: number
  wordCount?: number
}

// ============================================
// EDITORIAL CONTENT SCHEMAS (Section 3.2.2+)
// ============================================

/**
 * Encyclopedia Entry — definitive reference article on a legal concept.
 * Closest analog: Wikipedia legal article.
 */
export type EncyclopediaEntryMeta = UniversalMeta & {
  contentType: 'encyclopedia-entry'
  category: 'business' | 'tax' | 'immigration' | 'contracts' | 'compliance'
    | 'property' | 'employment' | 'corporate' | 'other'

  // Structure
  sections: { id: string; title: string; anchor: string }[]

  // Sources
  citations: Citation[]
  definedTerms: string[]            // Legal terms defined in this entry
  relatedStatutes?: string[]        // e.g., ['26 USC § 7701', 'INA § 101']

  // Summary
  keyTakeaways: string[]            // 3-5 bullet points
  abstractSummary?: Partial<Record<LanguageCode, string>>  // 2-3 sentence abstract

  // Required for published encyclopedia entries
  readingTimeMinutes: number
  wordCount: number
}

/**
 * Jurisdictional Guide — step-by-step procedural guide specific to a jurisdiction.
 */
export type JurisdictionalGuideMeta = UniversalMeta & {
  contentType: 'jurisdictional-guide'
  category: 'business' | 'tax' | 'immigration' | 'compliance' | 'employment' | 'other'

  // Guide structure
  steps: {
    stepNumber: number
    title: string
    estimatedMinutes?: number
  }[]
  totalSteps: number
  estimatedTotalMinutes?: number

  // Prerequisites
  prerequisites?: string[]
  requiredDocuments?: string[]
  requiredForms?: string[]
}

/**
 * Comparative Analysis — side-by-side comparison of legal concepts or jurisdictions.
 */
export type ComparativeAnalysisMeta = UniversalMeta & {
  contentType: 'comparative-analysis'
  category: 'entity-structure' | 'jurisdiction' | 'tax' | 'compliance' | 'other'

  // What is being compared
  comparedItems: string[]           // e.g., ['LLC', 'Corporation'] or ['Delaware', 'Wyoming']
  comparisonDimensions: string[]    // e.g., ['liability', 'taxation', 'formation cost']

  // Structure
  sections: { id: string; title: string; anchor: string }[]
  citations?: Citation[]

  // Summary
  keyTakeaways: string[]
}

/**
 * Legal Update — time-bound notification of a change in law or regulation.
 */
export type LegalUpdateMeta = UniversalMeta & {
  contentType: 'legal-update'
  category: 'tax' | 'immigration' | 'corporate' | 'compliance' | 'employment' | 'other'

  // Temporal scope
  effectiveDate?: string            // When the legal change takes effect
  expiresAt?: string                // When this update is no longer current

  // Impact
  affectedContentIds: string[]      // IDs of encyclopedia/guide entries affected
  sourceAuthority: string           // e.g., 'Internal Revenue Service'
  sourceUrls: string[]
  urgency: 'routine' | 'important' | 'urgent'
}

/**
 * Checklist — ordered procedural checklist, typically derived from a guide.
 */
export type ChecklistMeta = UniversalMeta & {
  contentType: 'checklist'
  category: 'business' | 'tax' | 'immigration' | 'compliance' | 'other'

  // Checklist items
  items: {
    order: number
    text: string
    isRequired: boolean
    helpText?: string
  }[]
  totalItems: number

  // Derived from
  derivedFromId?: string            // ID of the guide this checklist is based on
}

// ============================================
// DOCUMENT CONTENT SCHEMAS (Section 3.2.3+)
// ============================================

/**
 * Contract Template — downloadable, customizable legal agreement.
 */
export type ContractTemplateMeta = UniversalMeta & {
  contentType: 'contract-template'
  category: 'nda' | 'service-agreement' | 'employment' | 'contractor'
    | 'privacy-terms' | 'real-estate' | 'intellectual-property'
    | 'formation' | 'compliance' | 'other'

  // Parties
  parties: string[]                 // e.g., ['Disclosing Party', 'Receiving Party']
  useCases: string[]                // e.g., ['freelancer', 'startup', 'enterprise']

  // Template details
  complexityLevel: 'simple' | 'moderate' | 'complex'
  requiresCustomization: boolean
  governingLaw: string              // e.g., 'State of New York'
  isSample: boolean                 // true = reference only, not for use

  // Files
  fileLinks: FileLink[]

  // Searchability
  relatedForms: string[]            // IDs of related forms
  clauseIndex?: string[]            // List of key clauses
}

/**
 * Legal Form — government or procedural form with guidance.
 */
export type LegalFormMeta = UniversalMeta & {
  contentType: 'legal-form'
  category: 'tax' | 'immigration' | 'business' | 'compliance' | 'other'

  // Form details
  formNumber?: string               // Official form number (e.g., 'W-9', 'DS-160')
  issuingAuthority?: string         // e.g., 'Internal Revenue Service'
  officialUrl?: string              // Link to official form
  isFillable: boolean

  // Files (annotated or pre-filled versions)
  fileLinks?: FileLink[]

  // Guidance
  relatedGuideId?: string           // ID of the guide for filling out this form
}

/**
 * Sample Document — reference-only example. NOT for direct use.
 */
export type SampleDocumentMeta = UniversalMeta & {
  contentType: 'sample-document'
  category: 'contract' | 'letter' | 'form' | 'filing' | 'other'

  // What this is a sample of
  sampleOf: string                  // e.g., 'Independent Contractor Agreement'
  annotations?: string[]            // Key annotations explaining the sample

  // Files
  fileLinks?: FileLink[]

  // Educational context
  relatedTemplateId?: string        // ID of the actual template to use instead
}

/**
 * Letter Template — formal correspondence template.
 */
export type LetterTemplateMeta = UniversalMeta & {
  contentType: 'letter-template'
  category: 'demand' | 'notice' | 'request' | 'cover' | 'complaint' | 'other'

  // Letter details
  recipientType?: string            // e.g., 'Government agency', 'Opposing party'
  useCases: string[]
  requiresCustomization: boolean

  // Files
  fileLinks: FileLink[]
}

/**
 * Document Kit — bundled collection of related templates and guides.
 */
export type DocumentKitMeta = UniversalMeta & {
  contentType: 'document-kit'
  category: 'business-starter' | 'compliance' | 'immigration' | 'other'

  // Kit contents
  includedDocuments: {
    id: string
    title: string
    contentType: ContentTypeKey
  }[]

  // Target audience
  targetAudience: string[]

  // Pricing
  suggestedPrice?: number           // Suggested contribution in USD
  isFreeAvailable: boolean
}

// ============================================
// CANONICAL UNION TYPE
// ============================================

/**
 * Union of all canonical content metadata types.
 * Use this when handling content of any type.
 */
export type CanonicalContentMeta =
  | EncyclopediaEntryMeta
  | JurisdictionalGuideMeta
  | ComparativeAnalysisMeta
  | LegalUpdateMeta
  | ChecklistMeta
  | ContractTemplateMeta
  | LegalFormMeta
  | SampleDocumentMeta
  | LetterTemplateMeta
  | DocumentKitMeta

// ============================================
// MDX FRONTMATTER COMPATIBILITY (Section 3.4.3)
// ============================================

/**
 * FrontmatterBase — subset of UniversalMeta that can be expressed
 * in YAML/JSON frontmatter for MDX files.
 *
 * When content migrates to file-based MDX (Phase 2), each .mdx file
 * will have frontmatter conforming to this type. Fields like
 * `revisionHistory` and `sections` that are complex nested objects
 * are expressed as JSON within frontmatter or in a companion meta.json.
 *
 * Usage:
 *   content/encyclopedia/what-is-nda/en.mdx frontmatter → FrontmatterBase
 *   content/encyclopedia/what-is-nda/meta.json → FrontmatterShared
 */
export type FrontmatterBase = {
  // Required in every MDX frontmatter
  id: string
  contentType: ContentTypeKey
  lang: LanguageCode
  title: string
  summary: string
  status: ContentStatus

  // Required for published content
  canonicalSlug?: string
  canonicalLang?: LanguageCode
  authorIds?: string[]
  reviewerIds?: string[]
  lastReviewedAt?: string
  lastReviewedBy?: string

  // Dates
  createdAt?: string
  firstPublishedAt?: string
  lastModifiedAt?: string

  // Classification
  tags?: string[]
  category?: string
  jurisdictions?: JurisdictionCode[]
  primaryJurisdiction?: JurisdictionCode

  // Versioning
  version?: string
  citationKey?: string

  // SEO
  metaTitle?: string                // Single-language (per-file, not Record)
  metaDescription?: string          // Single-language (per-file, not Record)
  noIndex?: boolean

  // Disclaimers
  disclaimers?: DisclaimerType[]
  customDisclaimer?: string         // Single-language (per-file)
}

/**
 * FrontmatterShared — metadata shared across all language versions.
 * Stored in a companion meta.json file alongside the MDX files.
 *
 * These fields are language-independent and should not be duplicated
 * in each language version's frontmatter.
 */
export type FrontmatterShared = {
  id: string
  canonicalSlug: string
  contentType: ContentTypeKey
  canonicalLang: LanguageCode
  availableTranslations: LanguageCode[]
  jurisdictions: JurisdictionCode[]
  primaryJurisdiction: JurisdictionCode
  relatedIds: string[]
  parentId?: string
  citationKey: string
  version: string
  revisionHistory: RevisionEntry[]
  noIndex: boolean
}

/**
 * Convert frontmatter + shared meta into a full UniversalMeta object.
 * Used during build to assemble complete metadata from file-based content.
 */
export function assembleUniversalMeta(
  frontmatter: FrontmatterBase,
  shared: FrontmatterShared
): UniversalMeta {
  return {
    id: shared.id,
    canonicalSlug: shared.canonicalSlug,
    contentType: shared.contentType,
    status: frontmatter.status,
    lang: frontmatter.lang,
    canonicalLang: shared.canonicalLang,
    availableTranslations: shared.availableTranslations,
    translatedFrom: frontmatter.lang !== shared.canonicalLang
      ? shared.id
      : undefined,
    jurisdictions: shared.jurisdictions,
    primaryJurisdiction: shared.primaryJurisdiction,
    authorIds: frontmatter.authorIds || [],
    reviewerIds: frontmatter.reviewerIds || [],
    lastReviewedAt: frontmatter.lastReviewedAt,
    lastReviewedBy: frontmatter.lastReviewedBy,
    createdAt: frontmatter.createdAt || new Date().toISOString(),
    firstPublishedAt: frontmatter.firstPublishedAt,
    lastModifiedAt: frontmatter.lastModifiedAt || new Date().toISOString(),
    tags: frontmatter.tags || [],
    category: frontmatter.category || 'other',
    parentId: shared.parentId,
    relatedIds: shared.relatedIds,
    version: shared.version,
    revisionHistory: shared.revisionHistory,
    changelogSummary: undefined,
    disclaimers: frontmatter.disclaimers || getDefaultDisclaimersForCanonical(shared.contentType),
    customDisclaimer: frontmatter.customDisclaimer
      ? { [frontmatter.lang]: frontmatter.customDisclaimer }
      : undefined,
    metaTitle: frontmatter.metaTitle
      ? { [frontmatter.lang]: frontmatter.metaTitle }
      : undefined,
    metaDescription: frontmatter.metaDescription
      ? { [frontmatter.lang]: frontmatter.metaDescription }
      : undefined,
    canonicalUrl: undefined,
    noIndex: shared.noIndex,
    citationKey: shared.citationKey,
  }
}

// ============================================
// CANONICAL VALIDATION (Section 3 Enforcement)
// ============================================

/**
 * Validation result with errors (blocking) and warnings (non-blocking).
 */
export type ValidationResult = {
  valid: boolean
  errors: string[]
  warnings: string[]
}

/**
 * Validate UniversalMeta fields.
 * Enforces required fields and status-dependent requirements.
 */
export function validateUniversalMeta(content: UniversalMeta): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  // Required identity fields
  if (!content.id) errors.push('Missing id')
  if (!content.canonicalSlug) errors.push('Missing canonicalSlug')
  if (!content.contentType) errors.push('Missing contentType')
  if (!content.citationKey) errors.push('Missing citationKey')

  // Validate citation key format
  if (content.citationKey && !/^ecl-[a-z]{3}-\d{5}$/.test(content.citationKey)) {
    errors.push(`Invalid citationKey format: ${content.citationKey} (expected ecl-xxx-00000)`)
  }

  // Validate citation key prefix matches content type
  if (content.citationKey && content.contentType) {
    const expectedPrefix = CANONICAL_TYPE_PREFIX[content.contentType]
    const actualPrefix = content.citationKey.split('-')[1]
    if (expectedPrefix && actualPrefix !== expectedPrefix) {
      errors.push(
        `Citation key prefix '${actualPrefix}' does not match content type '${content.contentType}' (expected '${expectedPrefix}')`
      )
    }
  }

  // Required localization fields
  if (!content.lang) errors.push('Missing lang')
  if (!content.canonicalLang) errors.push('Missing canonicalLang')
  if (!isValidLanguage(content.lang)) {
    errors.push(`Invalid lang: ${content.lang}`)
  }
  if (!isValidLanguage(content.canonicalLang)) {
    errors.push(`Invalid canonicalLang: ${content.canonicalLang}`)
  }
  for (const l of content.availableTranslations) {
    if (!isValidLanguage(l)) {
      errors.push(`Invalid translation language: ${l}`)
    }
  }

  // Required jurisdiction fields
  if (!content.primaryJurisdiction) {
    errors.push('Missing primaryJurisdiction')
  } else if (!isValidJurisdiction(content.primaryJurisdiction)) {
    errors.push(`Invalid primaryJurisdiction: ${content.primaryJurisdiction}`)
  }
  if (content.jurisdictions.length === 0) {
    errors.push('Must have at least one jurisdiction')
  }
  for (const j of content.jurisdictions) {
    if (!isValidJurisdiction(j)) {
      errors.push(`Invalid jurisdiction: ${j}`)
    }
  }

  // Authorship
  if (content.authorIds.length === 0) {
    errors.push('Must have at least one authorId')
  }

  // Required dates
  if (!content.createdAt) errors.push('Missing createdAt')
  if (!content.lastModifiedAt) errors.push('Missing lastModifiedAt')

  // Version
  if (!content.version) errors.push('Missing version')
  if (content.version && !/^\d+\.\d+$/.test(content.version)) {
    warnings.push(`Version '${content.version}' does not follow X.Y format`)
  }

  // Status-dependent requirements (published content)
  if (content.status === 'published') {
    if (content.reviewerIds.length === 0) {
      errors.push('Published content must have at least one reviewerId')
    }
    if (!content.lastReviewedAt) {
      errors.push('Published content must have lastReviewedAt')
    }
    if (!content.lastReviewedBy) {
      errors.push('Published content must have lastReviewedBy')
    }
    if (!content.firstPublishedAt) {
      errors.push('Published content must have firstPublishedAt')
    }
    if (content.disclaimers.length === 0) {
      errors.push('Published content must have at least one disclaimer')
    }
    if (content.tags.length === 0) {
      warnings.push('Published content should have tags for search')
    }
  }

  // Retracted content requirements
  if (content.status === 'retracted') {
    if (content.revisionHistory.length === 0) {
      errors.push('Retracted content must have a revision history entry explaining retraction')
    }
  }

  // Translation consistency
  if (content.translatedFrom && content.lang === content.canonicalLang) {
    warnings.push('Content marked as translation but lang matches canonicalLang')
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Validate EncyclopediaEntryMeta — additional fields beyond UniversalMeta.
 */
export function validateEncyclopediaEntry(content: EncyclopediaEntryMeta): ValidationResult {
  const base = validateUniversalMeta(content)

  if (content.sections.length === 0) {
    base.warnings.push('Encyclopedia entry should have defined sections')
  }
  if (content.keyTakeaways.length === 0) {
    base.warnings.push('Encyclopedia entry should have key takeaways')
  }
  if (content.status === 'published') {
    if (!content.readingTimeMinutes) {
      base.errors.push('Published encyclopedia entry must have readingTimeMinutes')
    }
    if (!content.wordCount) {
      base.errors.push('Published encyclopedia entry must have wordCount')
    }
    if (content.citations.length === 0) {
      base.warnings.push('Published encyclopedia entry should have citations')
    }
  }

  return base
}

/**
 * Validate ContractTemplateMeta — additional fields beyond UniversalMeta.
 */
export function validateContractTemplate(content: ContractTemplateMeta): ValidationResult {
  const base = validateUniversalMeta(content)

  if (content.parties.length === 0) {
    base.errors.push('Contract template must define parties')
  }
  if (content.fileLinks.length === 0 && content.status === 'published') {
    base.errors.push('Published contract template must have at least one file link')
  }
  if (content.requiresCustomization && !content.isSample) {
    // Ensure disclaimer includes no-attorney-client
    if (!content.disclaimers.includes('no-attorney-client')) {
      base.warnings.push('Customizable contract should include no-attorney-client disclaimer')
    }
  }
  if (content.isSample && !content.disclaimers.includes('sample-only')) {
    base.warnings.push('Sample contract should include sample-only disclaimer')
  }

  return base
}

/**
 * Validate LegalUpdateMeta — additional fields beyond UniversalMeta.
 */
export function validateLegalUpdate(content: LegalUpdateMeta): ValidationResult {
  const base = validateUniversalMeta(content)

  if (!content.sourceAuthority) {
    base.errors.push('Legal update must specify sourceAuthority')
  }
  if (content.sourceUrls.length === 0) {
    base.warnings.push('Legal update should include source URLs')
  }
  if (content.expiresAt && content.effectiveDate) {
    if (new Date(content.expiresAt) < new Date(content.effectiveDate)) {
      base.errors.push('expiresAt cannot be before effectiveDate')
    }
  }

  return base
}

/**
 * Validate any CanonicalContentMeta by dispatching to the appropriate validator.
 */
export function validateCanonicalContent(content: CanonicalContentMeta): ValidationResult {
  switch (content.contentType) {
    case 'encyclopedia-entry':
      return validateEncyclopediaEntry(content)
    case 'contract-template':
      return validateContractTemplate(content)
    case 'legal-update':
      return validateLegalUpdate(content)
    default:
      return validateUniversalMeta(content)
  }
}

// ============================================
// CANONICAL HELPERS
// ============================================

/**
 * Get default disclaimers for a canonical content type.
 */
export function getDefaultDisclaimersForCanonical(contentType: ContentTypeKey): DisclaimerType[] {
  switch (contentType) {
    case 'encyclopedia-entry':
    case 'comparative-analysis':
      return ['general', 'no-attorney-client', 'educational']
    case 'jurisdictional-guide':
    case 'checklist':
      return ['general', 'educational']
    case 'legal-update':
      return ['general', 'educational']
    case 'contract-template':
    case 'legal-form':
    case 'letter-template':
      return ['general', 'no-attorney-client']
    case 'sample-document':
      return ['general', 'sample-only']
    case 'document-kit':
      return ['general', 'no-attorney-client']
    default:
      return ['general']
  }
}

/**
 * Determine if a content type key is editorial (web-native) or document (downloadable).
 */
export function isEditorialContent(contentType: ContentTypeKey): boolean {
  return [
    'encyclopedia-entry',
    'jurisdictional-guide',
    'comparative-analysis',
    'legal-update',
    'checklist',
  ].includes(contentType)
}

export function isDocumentContent(contentType: ContentTypeKey): boolean {
  return !isEditorialContent(contentType)
}

/**
 * Content type display labels for canonical types.
 */
export const CANONICAL_TYPE_LABELS: Record<ContentTypeKey, { en: string; tr: string }> = {
  'encyclopedia-entry': { en: 'Encyclopedia Entry', tr: 'Ansiklopedi Maddesi' },
  'jurisdictional-guide': { en: 'Jurisdictional Guide', tr: 'Yargı Alanı Rehberi' },
  'comparative-analysis': { en: 'Comparative Analysis', tr: 'Karşılaştırmalı Analiz' },
  'legal-update': { en: 'Legal Update', tr: 'Hukuki Güncelleme' },
  'checklist': { en: 'Checklist', tr: 'Kontrol Listesi' },
  'contract-template': { en: 'Contract Template', tr: 'Sözleşme Şablonu' },
  'legal-form': { en: 'Legal Form', tr: 'Hukuki Form' },
  'sample-document': { en: 'Sample Document', tr: 'Örnek Belge' },
  'letter-template': { en: 'Letter Template', tr: 'Mektup Şablonu' },
  'document-kit': { en: 'Document Kit', tr: 'Belge Kiti' },
}

/**
 * Get the review cycle interval for a content type.
 * Returns the number of days between required reviews.
 */
export const REVIEW_CYCLE_DAYS: Record<ContentTypeKey, number> = {
  'encyclopedia-entry': 90,         // Quarterly
  'jurisdictional-guide': 90,       // Quarterly
  'comparative-analysis': 180,      // Semi-annually
  'legal-update': 30,               // Monthly (time-sensitive)
  'checklist': 90,                  // Quarterly
  'contract-template': 365,         // Annually
  'legal-form': 365,                // Annually
  'sample-document': 365,           // Annually (static reference)
  'letter-template': 365,           // Annually
  'document-kit': 180,              // Semi-annually
}

/**
 * Compute the next review due date from last review date and content type.
 */
export function computeNextReviewDue(
  contentType: ContentTypeKey,
  lastReviewedAt: string
): string {
  const days = REVIEW_CYCLE_DAYS[contentType]
  const reviewDate = new Date(lastReviewedAt)
  reviewDate.setDate(reviewDate.getDate() + days)
  return reviewDate.toISOString().split('T')[0]
}
