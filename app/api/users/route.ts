// app/api/users/route.ts
// POST /api/users — Find or create a user by email.

import { NextRequest, NextResponse } from 'next/server'
import { findOrCreateUser } from '@/lib/filingcontrol/assessment-db'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json(
      { error: 'Request body must be a JSON object' },
      { status: 400 },
    )
  }

  const { email } = body as Record<string, unknown>

  if (typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json(
      { error: 'A valid email address is required' },
      { status: 400 },
    )
  }

  try {
    const user = await findOrCreateUser({ email: email.trim().toLowerCase() })
    return NextResponse.json(user, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
