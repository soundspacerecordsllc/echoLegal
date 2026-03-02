import { NextRequest, NextResponse } from 'next/server'
import { NAV_ITEMS } from '@/lib/nav'

export async function GET(request: NextRequest) {
  const isProd = process.env.NODE_ENV === 'production'
  const required = process.env.ECHO_DEBUG_KEY

  if (isProd) {
    const provided = request.headers.get('x-echo-debug-key')
    if (!required || provided !== required) {
      return new NextResponse('Not found', { status: 404 })
    }
  }

  const keys = NAV_ITEMS.map((item) => item.key)

  return NextResponse.json(
    {
      ok: true,
      ts: new Date().toISOString(),
      env: isProd ? 'prod' : 'dev',
      keys,
      hasCompliance: keys.includes('compliance'),
      count: keys.length,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
