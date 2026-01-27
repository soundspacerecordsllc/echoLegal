// app/api/ingest-legal-updates/route.ts
// Legal Updates Ingestion API - runs via Vercel Cron

import { NextRequest, NextResponse } from 'next/server'
import { fetchIRSUpdates } from '@/lib/ingestors/irs-rss'
import { fetchCongressUpdates } from '@/lib/ingestors/congress-api'
import { fetchFederalRegisterUpdates } from '@/lib/ingestors/federal-register-api'
import { bulkInsertLegalUpdates } from '@/lib/db/legal-updates-db'
import { LegalUpdateInput } from '@/lib/legal-updates'

// Verify cron secret for security (Vercel sets this header for cron jobs)
function verifyCronAuth(request: NextRequest): boolean {
  // In development, allow without auth
  if (process.env.NODE_ENV === 'development') {
    return true
  }

  // Check for Vercel cron secret
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return true
  }

  // Also allow manual trigger with admin credentials
  const adminUser = process.env.ADMIN_USER
  const adminPass = process.env.ADMIN_PASS

  if (authHeader && adminUser && adminPass) {
    const base64Credentials = authHeader.split(' ')[1]
    if (base64Credentials) {
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
      const [user, pass] = credentials.split(':')
      if (user === adminUser && pass === adminPass) {
        return true
      }
    }
  }

  return false
}

interface IngestionResult {
  source: string
  fetched: number
  inserted: number
  skipped: number
  error?: string
}

export async function GET(request: NextRequest) {
  // Verify authorization
  if (!verifyCronAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  console.log('=== Legal Updates Ingestion Started ===')
  const startTime = Date.now()

  const results: IngestionResult[] = []
  let totalInserted = 0
  let totalSkipped = 0

  // 1. Fetch from IRS RSS feeds
  try {
    console.log('\n--- IRS RSS Feeds ---')
    const irsUpdates = await fetchIRSUpdates()
    const irsResult = await bulkInsertLegalUpdates(irsUpdates)

    results.push({
      source: 'IRS RSS',
      fetched: irsUpdates.length,
      inserted: irsResult.inserted,
      skipped: irsResult.skipped,
    })

    totalInserted += irsResult.inserted
    totalSkipped += irsResult.skipped
  } catch (error) {
    console.error('IRS ingestion failed:', error)
    results.push({
      source: 'IRS RSS',
      fetched: 0,
      inserted: 0,
      skipped: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  // 2. Fetch from Congress.gov API
  try {
    console.log('\n--- Congress.gov API ---')
    const congressUpdates = await fetchCongressUpdates()
    const congressResult = await bulkInsertLegalUpdates(congressUpdates)

    results.push({
      source: 'Congress.gov',
      fetched: congressUpdates.length,
      inserted: congressResult.inserted,
      skipped: congressResult.skipped,
    })

    totalInserted += congressResult.inserted
    totalSkipped += congressResult.skipped
  } catch (error) {
    console.error('Congress.gov ingestion failed:', error)
    results.push({
      source: 'Congress.gov',
      fetched: 0,
      inserted: 0,
      skipped: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  // 3. Fetch from Federal Register API
  try {
    console.log('\n--- Federal Register API ---')
    const frUpdates = await fetchFederalRegisterUpdates()
    const frResult = await bulkInsertLegalUpdates(frUpdates)

    results.push({
      source: 'Federal Register',
      fetched: frUpdates.length,
      inserted: frResult.inserted,
      skipped: frResult.skipped,
    })

    totalInserted += frResult.inserted
    totalSkipped += frResult.skipped
  } catch (error) {
    console.error('Federal Register ingestion failed:', error)
    results.push({
      source: 'Federal Register',
      fetched: 0,
      inserted: 0,
      skipped: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }

  const duration = Date.now() - startTime

  console.log('\n=== Legal Updates Ingestion Complete ===')
  console.log(`Duration: ${duration}ms`)
  console.log(`Total inserted: ${totalInserted}`)
  console.log(`Total skipped: ${totalSkipped}`)

  // Always return 200 even if some sources failed
  // This prevents Vercel from retrying the cron job unnecessarily
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    duration: `${duration}ms`,
    summary: {
      totalInserted,
      totalSkipped,
    },
    results,
  })
}

// Also support POST for manual triggers
export async function POST(request: NextRequest) {
  return GET(request)
}
