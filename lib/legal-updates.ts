// lib/legal-updates.ts
// Data model and types for Legal Updates feature

export type UpdateStatus = 'draft' | 'published'

export type Jurisdiction = 'US-Federal' | 'US-IRS' | 'US-Congress' | 'TR' | 'General'

export interface LegalUpdate {
  id: string
  title: string
  slug: string
  publishedAt: string // ISO date string
  jurisdiction: Jurisdiction
  tags: string[]
  summary: string
  summaryTr?: string // Optional Turkish translation
  sourceName: string
  sourceUrl: string
  sourceUrls: string[] // Additional source URLs
  status: UpdateStatus
  createdAt: string
  updatedAt: string
}

export interface LegalUpdateInput {
  title: string
  slug: string
  publishedAt: string
  jurisdiction: Jurisdiction
  tags: string[]
  summary: string
  summaryTr?: string
  sourceName: string
  sourceUrl: string
  sourceUrls?: string[]
}

// Jurisdiction labels for UI
export const jurisdictionLabels: Record<Jurisdiction, { en: string; tr: string; color: string }> = {
  'US-Federal': { en: 'US Federal', tr: 'ABD Federal', color: 'blue' },
  'US-IRS': { en: 'IRS', tr: 'IRS', color: 'green' },
  'US-Congress': { en: 'US Congress', tr: 'ABD Kongresi', color: 'purple' },
  'TR': { en: 'Turkey', tr: 'Türkiye', color: 'red' },
  'General': { en: 'General', tr: 'Genel', color: 'gray' },
}

// Common tags for legal updates
export const commonTags = [
  'tax',
  'immigration',
  'business',
  'employment',
  'regulations',
  'legislation',
  'irs-notice',
  'executive-order',
  'federal-register',
  'treasury',
  'dhs',
  'uscis',
]

// Helper to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80)
}

// Helper to generate a unique hash for deduplication
export function generateUpdateHash(title: string, publishedAt: string): string {
  const str = `${title.toLowerCase().trim()}|${publishedAt}`
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

// Filter options for the feed
export interface UpdateFilters {
  jurisdiction?: Jurisdiction
  tag?: string
  search?: string
  dateFrom?: string
  dateTo?: string
  status?: UpdateStatus
}
