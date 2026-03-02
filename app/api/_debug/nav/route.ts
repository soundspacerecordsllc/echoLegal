// app/api/_debug/nav/route.ts
// Diagnostic: returns NAV_ITEMS keys so we can verify the deployed build
// includes the expected nav items. No sensitive data exposed.

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
    {
      headers: { 'Cache-Control': 'no-store' },
    }
  )
}
