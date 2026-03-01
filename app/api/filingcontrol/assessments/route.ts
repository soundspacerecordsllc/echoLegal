// app/api/filingcontrol/assessments/route.ts
// POST: Create an assessment snapshot with computed deadlines.
// GET:  Retrieve assessments for the authenticated user.

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'
import { createAssessmentSnapshot } from '@/lib/engine/assessments'
import type { FilingInput, EntityType } from '@/app/filingcontrol/lib/obligations'

const VALID_ENTITY_TYPES: EntityType[] = ['llc', 'corporation', 'partnership', 'sole_prop']

export async function POST(request: NextRequest) {
  const supabase = getServiceClient()

  // Extract user from auth header (Supabase JWT)
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Parse and validate input
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const entityType = body.entityType as string
  if (!entityType || !VALID_ENTITY_TYPES.includes(entityType as EntityType)) {
    return NextResponse.json({ error: 'Invalid entityType' }, { status: 400 })
  }

  const taxYear = typeof body.taxYear === 'number' ? body.taxYear : new Date().getFullYear()
  const state = typeof body.state === 'string' ? body.state.trim().toUpperCase() : ''

  const input: FilingInput = {
    entityType: entityType as EntityType,
    foreignOwned: body.foreignOwned === true,
    usBusinessActivity: body.usBusinessActivity === true,
    hasUSIncome: body.hasUSIncome === true,
    taxYear,
    state,
  }

  // Run assessment pipeline
  const snapshot = createAssessmentSnapshot(input)

  // Persist to database
  const { data, error } = await supabase
    .from('fc_assessments')
    .insert({
      user_id: user.id,
      entity_profile: snapshot.entityProfile,
      assessment_result: snapshot.obligations,
      deadlines_json: snapshot.deadlines,
      engine_version: snapshot.deadlines.engineVersion,
      tax_year: snapshot.deadlines.taxYear,
    })
    .select()
    .single()

  if (error) {
    console.error('[assessments] Insert error:', error)
    return NextResponse.json({ error: 'Failed to save assessment' }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

export async function GET(request: NextRequest) {
  const supabase = getServiceClient()

  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('fc_assessments')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[assessments] Query error:', error)
    return NextResponse.json({ error: 'Query failed' }, { status: 500 })
  }

  return NextResponse.json(data)
}
