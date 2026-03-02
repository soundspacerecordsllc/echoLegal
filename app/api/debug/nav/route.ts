import { NextResponse } from 'next/server'
import { NAV_ITEMS } from '@/lib/nav'

export async function GET() {
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
