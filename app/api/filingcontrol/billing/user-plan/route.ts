// app/api/filingcontrol/billing/user-plan/route.ts
// GET: Returns plan status for a user by email.
// GET /api/filingcontrol/billing/user-plan?email=...

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email')?.trim().toLowerCase()

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: 'Valid email is required' },
      { status: 400 }
    )
  }

  const supabase = getServiceClient()

  const { data: user, error } = await supabase
    .from('fc_users')
    .select('plan, email, subscription_status, calendar_token')
    .eq('email', email)
    .single()

  if (error || !user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    plan: user.plan,
    email: user.email,
    subscription_status: user.subscription_status,
    // Only expose calendar_token to PRO users
    calendar_token: user.plan === 'PRO' ? (user.calendar_token ?? null) : null,
  })
}
