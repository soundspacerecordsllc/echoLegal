// app/api/filingcontrol/compliance-state/route.ts
// Authenticated endpoint: returns compliance states for the current user's entities.
// GET /api/filingcontrol/compliance-state

import { NextRequest, NextResponse } from 'next/server'
import { getComplianceStateForUser } from '@/lib/filingcontrol/compliance-state-db'
import { getApiUser, getApiSessionUser } from '@/lib/filingcontrol/auth'

export async function GET(request: NextRequest) {
  // Try Bearer token first, then fall back to cookie session
  const user =
    (await getApiUser(request.headers.get('authorization'))) ??
    (await getApiSessionUser())

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const states = await getComplianceStateForUser(user.id)

  return NextResponse.json({ states })
}
