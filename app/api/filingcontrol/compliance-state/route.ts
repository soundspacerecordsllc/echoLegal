// app/api/filingcontrol/compliance-state/route.ts
// Public read-only endpoint: returns compliance states for a user's entities.
// GET /api/filingcontrol/compliance-state?userId=<uuid>

import { NextRequest, NextResponse } from 'next/server'
import { getComplianceStateForUser } from '@/lib/filingcontrol/compliance-state-db'

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')

  if (!userId) {
    return NextResponse.json(
      { error: 'Missing required parameter: userId' },
      { status: 400 }
    )
  }

  // Basic UUID format check
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidPattern.test(userId)) {
    return NextResponse.json(
      { error: 'Invalid userId format' },
      { status: 400 }
    )
  }

  const states = await getComplianceStateForUser(userId)

  return NextResponse.json({ states })
}
