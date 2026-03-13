import { NextRequest, NextResponse } from 'next/server'
import { NAV_ITEMS } from '@/lib/nav'

export async function GET(request: NextRequest) {
  // In production, require secret header. Fail closed if env missing.
  const isProduction = process.env.NODE_ENV === 'production'
  if (isProduction) {
    const expected = process.env.DEBUG_NAV_SECRET
    if (!expected) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const provided = request.headers.get('x-debug-secret')
    if (provided !== expected) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  const keys = NAV_ITEMS.map((item) => item.key)

  return NextResponse.json(
    {
      keys,
      hasCompliance: keys.includes('compliance'),
      count: keys.length,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
