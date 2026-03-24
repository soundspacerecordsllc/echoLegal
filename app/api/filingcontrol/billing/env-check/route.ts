// Temporary diagnostic endpoint — remove after verifying env vars.
// GET /api/filingcontrol/billing/env-check
import { NextResponse } from 'next/server'

export async function GET() {
  const vars = [
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'FC_STRIPE_PRICE_PRO',
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_URL',
    'SUPABASE_SERVICE_KEY',
    'SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_SITE_URL',
  ]

  const status: Record<string, string> = {}
  for (const v of vars) {
    const val = process.env[v]
    if (!val) {
      status[v] = 'MISSING'
    } else if (v.includes('SECRET') || v.includes('KEY')) {
      // Only show first 8 chars for secrets
      status[v] = val.slice(0, 8) + '...'
    } else {
      status[v] = val
    }
  }

  return NextResponse.json({ env: status })
}
