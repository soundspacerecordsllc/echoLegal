// lib/ingestors/congress-api.ts
// Congress.gov API Ingestor
// API Documentation: https://api.congress.gov/

import { LegalUpdateInput, generateSlug, Jurisdiction } from '../legal-updates'

const CONGRESS_API_BASE = 'https://api.congress.gov/v3'

interface CongressBill {
  number: number
  title: string
  type: string
  updateDate: string
  latestAction?: {
    text: string
    actionDate: string
  }
  url?: string
  congress: number
}

interface CongressBillsResponse {
  bills: CongressBill[]
  pagination?: {
    count: number
    next?: string
  }
}

/**
 * Get the current Congress number (118th Congress: 2023-2024)
 */
function getCurrentCongress(): number {
  const year = new Date().getFullYear()
  return Math.floor((year - 1789) / 2) + 1
}

/**
 * Build Congress.gov URL for a bill
 */
function buildCongressUrl(bill: CongressBill): string {
  const billType = bill.type.toLowerCase()
  return `https://www.congress.gov/bill/${bill.congress}th-congress/${billType}/${bill.number}`
}

/**
 * Map bill type to readable name
 */
function getBillTypeName(type: string): string {
  const typeMap: Record<string, string> = {
    'hr': 'House Bill',
    's': 'Senate Bill',
    'hjres': 'House Joint Resolution',
    'sjres': 'Senate Joint Resolution',
    'hconres': 'House Concurrent Resolution',
    'sconres': 'Senate Concurrent Resolution',
    'hres': 'House Simple Resolution',
    'sres': 'Senate Simple Resolution',
  }
  return typeMap[type.toLowerCase()] || type
}

/**
 * Extract tags from bill title and action
 */
function extractBillTags(title: string, action?: string): string[] {
  const tags: string[] = ['legislation']
  const text = `${title} ${action || ''}`.toLowerCase()

  const tagKeywords: Record<string, string[]> = {
    'tax': ['tax', 'taxes', 'taxation', 'revenue', 'irs'],
    'immigration': ['immigration', 'visa', 'border', 'asylum', 'citizenship'],
    'business': ['business', 'commerce', 'trade', 'small business', 'corporation'],
    'employment': ['employment', 'labor', 'worker', 'wage', 'workforce'],
    'healthcare': ['health', 'healthcare', 'medicare', 'medicaid'],
    'appropriations': ['appropriation', 'budget', 'spending', 'fiscal'],
    'national-security': ['defense', 'military', 'security', 'intelligence'],
    'environment': ['environment', 'climate', 'energy', 'epa'],
  }

  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    if (keywords.some(kw => text.includes(kw))) {
      tags.push(tag)
    }
  }

  return Array.from(new Set(tags))
}

/**
 * Fetch recent bills from Congress.gov API
 */
export async function fetchCongressUpdates(): Promise<LegalUpdateInput[]> {
  const apiKey = process.env.CONGRESS_API_KEY

  if (!apiKey) {
    console.warn('CONGRESS_API_KEY not set, skipping Congress.gov ingestion')
    return []
  }

  const updates: LegalUpdateInput[] = []

  try {
    const congress = getCurrentCongress()
    console.log(`Fetching bills from ${congress}th Congress`)

    // Fetch recent bills with actions
    const url = `${CONGRESS_API_BASE}/bill/${congress}?limit=20&sort=updateDate+desc&api_key=${apiKey}`

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: CongressBillsResponse = await response.json()

    console.log(`Fetched ${data.bills?.length || 0} bills from Congress.gov`)

    for (const bill of data.bills || []) {
      const billUrl = buildCongressUrl(bill)
      const billTypeName = getBillTypeName(bill.type)
      const tags = extractBillTags(bill.title, bill.latestAction?.text)

      // Create informative summary
      const actionText = bill.latestAction
        ? `\n\nLatest Action (${bill.latestAction.actionDate}): ${bill.latestAction.text}`
        : ''

      const summary = `${billTypeName} ${bill.number}: ${bill.title}${actionText}\n\nThis is a summary of congressional activity. Visit Congress.gov for the full bill text and legislative history.`

      updates.push({
        title: `${billTypeName} ${bill.number}: ${bill.title.substring(0, 100)}${bill.title.length > 100 ? '...' : ''}`,
        slug: generateSlug(`congress-${bill.type}-${bill.number}-${bill.congress}`),
        publishedAt: new Date(bill.updateDate).toISOString(),
        jurisdiction: 'US-Congress' as Jurisdiction,
        tags,
        summary,
        sourceName: 'Congress.gov',
        sourceUrl: billUrl,
        sourceUrls: [billUrl],
      })
    }
  } catch (error) {
    console.error('Error fetching Congress.gov updates:', error instanceof Error ? error.message : 'Unknown error')
  }

  console.log(`Congress.gov ingestor completed: ${updates.length} updates`)

  return updates
}
