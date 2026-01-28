// lib/ingestors/irs-rss.ts
// IRS RSS Feed Ingestor

import { LegalUpdateInput, generateSlug, Jurisdiction } from '../legal-updates'

// IRS RSS feed URLs
// Source: https://www.irs.gov/downloads/rss
const IRS_FEEDS = [
  {
    url: 'https://www.irs.gov/newsroom/news-releases-rss',
    name: 'IRS News Releases',
    tags: ['irs-notice', 'tax'],
  },
  {
    url: 'https://www.irs.gov/newsroom/legal-guidance-rss',
    name: 'IRS Legal Guidance',
    tags: ['irs-guidance', 'tax', 'regulations'],
  },
]

interface RSSItem {
  title: string
  link: string
  description: string
  pubDate: string
}

/**
 * Parse RSS XML into items
 */
function parseRSSXml(xml: string): RSSItem[] {
  const items: RSSItem[] = []

  // Simple regex-based XML parsing for RSS items
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1]

    const title = extractTag(itemXml, 'title')
    const link = extractTag(itemXml, 'link')
    const description = extractTag(itemXml, 'description')
    const pubDate = extractTag(itemXml, 'pubDate')

    if (title && link) {
      items.push({
        title: cleanHtml(title),
        link: link.trim(),
        description: cleanHtml(description || ''),
        pubDate: pubDate || new Date().toISOString(),
      })
    }
  }

  return items
}

/**
 * Extract content from XML tag
 */
function extractTag(xml: string, tag: string): string {
  const cdataRegex = new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, 'i')
  const cdataMatch = cdataRegex.exec(xml)
  if (cdataMatch) return cdataMatch[1]

  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i')
  const match = regex.exec(xml)
  return match ? match[1] : ''
}

/**
 * Clean HTML entities and tags
 */
function cleanHtml(str: string): string {
  return str
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Parse date string to ISO format
 */
function parseDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) {
      return new Date().toISOString()
    }
    return date.toISOString()
  } catch {
    return new Date().toISOString()
  }
}

/**
 * Extract additional tags from title/description
 */
function extractTags(title: string, description: string): string[] {
  const tags: string[] = []
  const text = `${title} ${description}`.toLowerCase()

  const tagKeywords: Record<string, string[]> = {
    'tax': ['tax', 'taxes', 'taxation'],
    'filing': ['filing', 'file', 'return'],
    'refund': ['refund'],
    'business': ['business', 'employer', 'employment'],
    'individual': ['individual', 'taxpayer'],
    'credits': ['credit', 'credits'],
    'deductions': ['deduction', 'deductions'],
    'irs-notice': ['notice', 'announcement'],
    'treasury': ['treasury'],
    'regulations': ['regulation', 'rules', 'rule'],
  }

  for (const [tag, keywords] of Object.entries(tagKeywords)) {
    if (keywords.some(kw => text.includes(kw))) {
      tags.push(tag)
    }
  }

  return Array.from(new Set(tags))
}

/**
 * Fetch and parse IRS RSS feeds
 */
export async function fetchIRSUpdates(): Promise<LegalUpdateInput[]> {
  const updates: LegalUpdateInput[] = []
  const errors: string[] = []

  for (const feed of IRS_FEEDS) {
    try {
      console.log(`Fetching IRS feed: ${feed.name}`)

      const response = await fetch(feed.url, {
        headers: {
          'User-Agent': 'EchoLegal/1.0 (Legal Information Platform)',
        },
        next: { revalidate: 0 },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const xml = await response.text()
      const items = parseRSSXml(xml)

      console.log(`Parsed ${items.length} items from ${feed.name}`)

      for (const item of items) {
        const publishedAt = parseDate(item.pubDate)
        const additionalTags = extractTags(item.title, item.description)

        // Create summary with safety language
        const summary = item.description
          ? `${item.description}\n\nThis information is sourced from the IRS. Always verify details in the primary source before relying on this information.`
          : `IRS announcement: ${item.title}. Visit the official IRS website for complete details.`

        updates.push({
          title: item.title,
          slug: generateSlug(item.title),
          publishedAt,
          jurisdiction: 'US-IRS' as Jurisdiction,
          tags: Array.from(new Set([...feed.tags, ...additionalTags])),
          summary,
          sourceName: feed.name,
          sourceUrl: item.link,
          sourceUrls: [item.link],
        })
      }
    } catch (error) {
      const errorMsg = `Error fetching ${feed.name}: ${error instanceof Error ? error.message : 'Unknown error'}`
      console.error(errorMsg)
      errors.push(errorMsg)
    }
  }

  console.log(`IRS ingestor completed: ${updates.length} updates, ${errors.length} errors`)

  return updates
}
