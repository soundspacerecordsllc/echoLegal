// app/api/entities/route.ts
// POST /api/entities — Create an entity for a user.

import { NextRequest, NextResponse } from 'next/server'
import { createEntity } from '@/lib/filingcontrol/assessment-db'

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

  const { userId, name, entityType } = body as Record<string, unknown>

  if (typeof userId !== 'string' || userId.length === 0) {
    return NextResponse.json(
      { error: 'userId is required' },
      { status: 400 },
    )
  }

  try {
    const entity = await createEntity({
      userId,
      name: typeof name === 'string' ? name : undefined,
      entityType: typeof entityType === 'string' ? entityType : undefined,
    })
    return NextResponse.json(entity, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
