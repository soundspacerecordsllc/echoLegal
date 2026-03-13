// app/api/filingcontrol/billing/user-plan/route.ts
// Authenticated endpoint: returns plan status for the current user.
// GET /api/filingcontrol/billing/user-plan

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'
import { getApiUser, getApiSessionUser } from '@/lib/filingcontrol/auth'

export async function GET(request: NextRequest) {
  // Authenticate
  const authUser =
    (await getApiUser(request.headers.get('authorization'))) ??
    (await getApiSessionUser())

  if (!authUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getServiceClient()

  const { data: user, error } = await supabase
    .from('fc_users')
    .select('plan, email, subscription_status, calendar_token')
    .eq('email', authUser.email)
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
