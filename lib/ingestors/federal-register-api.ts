// lib/ingestors/federal-register-api.ts
// Federal Register API Ingestor
// API Documentation: https://www.federalregister.gov/developers/api/v1

import { LegalUpdateInput, generateSlug, Jurisdiction } from '../legal-updates'

const FEDERAL_REGISTER_API = 'https://www.federalregister.gov/api/v1'

interface FederalRegisterDocument {
  document_number: string
  title: string
  type: string
  abstract: string
  publication_date: string
  html_url: string
  pdf_url?: string
  agencies: Array<{
    name: string
    slug: string
  }>
  topics?: string[]
  significant?: boolean
  presidential_document_type?: string
}

interface FederalRegisterResponse {
  count: number
  results: FederalRegisterDocument[]
}

// Agencies we're particularly interested in
const PRIORITY_AGENCIES = [
  'internal-revenue-service',
  'treasury-department',
  'citizenship-and-immigration-services',
  'homeland-security-department',
  'labor-department',
  'small-business-administration',
  'commerce-department',
]

/**
 * Map document type to readable name
 */
function getDocumentTypeName(type: string): string {
  const typeMap: Record<string, string> = {
    'RULE': 'Final Rule',
    'PRORULE': 'Proposed Rule',
    'NOTICE': 'Notice',
    'PRESDOCU': 'Presidential Document',
  }
  return typeMap[type] || type
}

/**
 * Extract tags from Federal Register document
 */
function extractDocumentTags(doc: FederalRegisterDocument): string[] {
  const tags: string[] = ['federal-register']

  // Add document type as tag
  if (doc.type === 'RULE') tags.push('regulations')
  if (doc.type === 'PRORULE') tags.push('proposed-rules')
  if (doc.type === 'PRESDOCU') tags.push('executive-order')

  // Add agency-based tags
  const agencySlugs = doc.agencies.map(a => a.slug)
  if (agencySlugs.includes('internal-revenue-service') || agencySlugs.includes('treasury-department')) {
    tags.push('tax', 'irs-notice')
  }
  if (agencySlugs.includes('citizenship-and-immigration-services') || agencySlugs.includes('homeland-security-department')) {
    tags.push('immigration', 'dhs')
  }
  if (agencySlugs.includes('labor-department')) {
    tags.push('employment')
  }
  if (agencySlugs.includes('small-business-administration')) {
    tags.push('business')
  }

  // Add topics as tags if available
  if (doc.topics) {
    for (const topic of doc.topics.slice(0, 3)) {
      tags.push(topic.toLowerCase().replace(/\s+/g, '-'))
    }
  }

  return Array.from(new Set(tags))
}

/**
 * Build search parameters for Federal Register API
 */
function buildSearchParams(): URLSearchParams {
  const today = new Date()
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

  const params = new URLSearchParams({
    'per_page': '25',
    'order': 'newest',
    'conditions[publication_date][gte]': thirtyDaysAgo.toISOString().split('T')[0],
    'fields[]': [
      'document_number',
      'title',
      'type',
      'abstract',
      'publication_date',
      'html_url',
      'pdf_url',
      'agencies',
      'topics',
      'significant',
      'presidential_document_type',
    ].join(','),
  })

  // Add agency conditions for priority agencies
  for (const agency of PRIORITY_AGENCIES) {
    params.append('conditions[agencies][]', agency)
  }

  return params
}

/**
 * Fetch documents from Federal Register API with retry logic
 */
async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'EchoLegal/1.0 (Legal Information Platform)',
        },
        next: { revalidate: 0 },
      })

      if (response.status === 429) {
        // Rate limited - wait and retry
        const waitTime = Math.pow(2, i) * 1000
        console.log(`Rate limited by Federal Register, waiting ${waitTime}ms...`)
        await new Promise(resolve => setTimeout(resolve, waitTime))
        continue
      }

      return response
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
  throw new Error('Max retries exceeded')
}

/**
 * Fetch recent documents from Federal Register API
 */
export async function fetchFederalRegisterUpdates(): Promise<LegalUpdateInput[]> {
  const updates: LegalUpdateInput[] = []

  try {
    const params = buildSearchParams()
    const url = `${FEDERAL_REGISTER_API}/documents.json?${params.toString()}`

    console.log('Fetching Federal Register documents...')

    const response = await fetchWithRetry(url)

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: FederalRegisterResponse = await response.json()

    console.log(`Fetched ${data.results?.length || 0} documents from Federal Register`)

    for (const doc of data.results || []) {
      const docTypeName = getDocumentTypeName(doc.type)
      const tags = extractDocumentTags(doc)
      const agencyNames = doc.agencies.map(a => a.name).join(', ')

      // Build source URLs
      const sourceUrls = [doc.html_url]
      if (doc.pdf_url) {
        sourceUrls.push(doc.pdf_url)
      }

      // Create informative summary
      const abstractText = doc.abstract
        ? `${doc.abstract.substring(0, 500)}${doc.abstract.length > 500 ? '...' : ''}`
        : ''

      const summary = `${docTypeName} from ${agencyNames}.\n\n${abstractText}\n\nDocument Number: ${doc.document_number}\n\nThis information is sourced from the Federal Register. Always refer to the official publication for complete regulatory text.`

      updates.push({
        title: doc.title.substring(0, 200) + (doc.title.length > 200 ? '...' : ''),
        slug: generateSlug(`fr-${doc.document_number}`),
        publishedAt: new Date(doc.publication_date).toISOString(),
        jurisdiction: 'US-Federal' as Jurisdiction,
        tags,
        summary,
        sourceName: 'Federal Register',
        sourceUrl: doc.html_url,
        sourceUrls,
      })
    }
  } catch (error) {
    console.error('Error fetching Federal Register updates:', error instanceof Error ? error.message : 'Unknown error')
  }

  console.log(`Federal Register ingestor completed: ${updates.length} updates`)

  return updates
}
