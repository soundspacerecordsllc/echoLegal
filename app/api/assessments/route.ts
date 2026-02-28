// app/api/assessments/route.ts
// POST /api/assessments — Save an assessment snapshot.
// GET  /api/assessments?entityId= — List assessments for an entity.

import { NextRequest, NextResponse } from 'next/server'
import {
  createAssessment,
  listAssessments,
} from '@/lib/filingcontrol/assessment-db'
import type { RiskLevel } from '@/lib/engine/types'

const VALID_RISK_LEVELS: RiskLevel[] = ['LOW', 'MODERATE', 'HIGH']

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

  const { entityId, engineVersion, riskScore, riskLevel, resultJSON } =
    body as Record<string, unknown>

  if (typeof entityId !== 'string' || entityId.length === 0) {
    return NextResponse.json({ error: 'entityId is required' }, { status: 400 })
  }
  if (typeof engineVersion !== 'string' || engineVersion.length === 0) {
    return NextResponse.json(
      { error: 'engineVersion is required' },
      { status: 400 },
    )
  }
  if (typeof riskScore !== 'number') {
    return NextResponse.json(
      { error: 'riskScore must be a number' },
      { status: 400 },
    )
  }
  if (
    typeof riskLevel !== 'string' ||
    !VALID_RISK_LEVELS.includes(riskLevel as RiskLevel)
  ) {
    return NextResponse.json(
      { error: `riskLevel must be one of: ${VALID_RISK_LEVELS.join(', ')}` },
      { status: 400 },
    )
  }
  if (typeof resultJSON !== 'object' || resultJSON === null) {
    return NextResponse.json(
      { error: 'resultJSON must be a JSON object' },
      { status: 400 },
    )
  }

  try {
    const assessment = await createAssessment({
      entityId,
      engineVersion,
      riskScore,
      riskLevel: riskLevel as RiskLevel,
      resultJSON: resultJSON as Record<string, unknown>,
    })
    return NextResponse.json(assessment, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const entityId = request.nextUrl.searchParams.get('entityId')

  if (!entityId) {
    return NextResponse.json(
      { error: 'entityId query parameter is required' },
      { status: 400 },
    )
  }

  try {
    const assessments = await listAssessments(entityId)
    return NextResponse.json(assessments)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
