// app/api/evaluate/route.ts
// POST /api/evaluate
// Accepts an EntityProfile JSON body, returns a ComplianceResult.

import { NextRequest, NextResponse } from 'next/server'
import { evaluateCompliance } from '@/lib/engine/evaluate'
import type { EntityProfile } from '@/lib/engine/types'

const REQUIRED_FIELDS: (keyof EntityProfile)[] = [
  'foreignOwner',
  'singleMember',
  'hasEIN',
  'hasRelatedPartyTransactions',
  'hasRevenue',
  'prior5472Filed',
]

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json(
      { error: 'Request body must be a JSON object' },
      { status: 400 },
    )
  }

  const record = body as Record<string, unknown>

  // Validate all required fields are present and boolean
  for (const field of REQUIRED_FIELDS) {
    if (typeof record[field] !== 'boolean') {
      return NextResponse.json(
        { error: `Missing or invalid field: "${field}" (must be boolean)` },
        { status: 400 },
      )
    }
  }

  const profile: EntityProfile = {
    foreignOwner: record.foreignOwner as boolean,
    singleMember: record.singleMember as boolean,
    hasEIN: record.hasEIN as boolean,
    hasRelatedPartyTransactions: record.hasRelatedPartyTransactions as boolean,
    hasRevenue: record.hasRevenue as boolean,
    prior5472Filed: record.prior5472Filed as boolean,
  }

  const result = evaluateCompliance(profile)

  return NextResponse.json(result)
}
