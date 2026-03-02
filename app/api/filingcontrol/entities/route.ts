// app/api/filingcontrol/entities/route.ts
// POST: Create a new entity for the authenticated user.
//       FREE plan: max 1 entity (returns 402 PLAN_LIMIT).
//       PRO plan: unlimited.
// GET:  List entities for the authenticated user.

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'
import { canCreateEntity } from '@/lib/filingcontrol/entity-limit'
import type { Plan } from '@/lib/filingcontrol/billing/plan'

export async function POST(request: NextRequest) {
  const supabase = getServiceClient()

  // ── Auth ────────────────────────────────────────────────────────────
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token)

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── Parse body ──────────────────────────────────────────────────────
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const companyName = typeof body.company_name === 'string' ? body.company_name.trim() : ''
  const stateOfFormation =
    typeof body.state_of_formation === 'string'
      ? body.state_of_formation.trim().toUpperCase()
      : ''
  const formationDate = typeof body.formation_date === 'string' ? body.formation_date : ''

  if (!companyName) {
    return NextResponse.json({ error: 'company_name is required' }, { status: 400 })
  }
  if (!stateOfFormation) {
    return NextResponse.json({ error: 'state_of_formation is required' }, { status: 400 })
  }
  if (!formationDate) {
    return NextResponse.json({ error: 'formation_date is required' }, { status: 400 })
  }

  // ── Plan check ──────────────────────────────────────────────────────
  // Look up fc_users by email to determine plan.
  // If no fc_users row exists, treat as FREE.
  const userEmail = user.email?.toLowerCase() ?? ''
  let plan: Plan = 'FREE'

  if (userEmail) {
    const { data: fcUser } = await supabase
      .from('fc_users')
      .select('plan')
      .eq('email', userEmail)
      .single()

    if (fcUser?.plan === 'PRO') {
      plan = 'PRO'
    }
  }

  // Count existing entities for this user
  const { count, error: countError } = await supabase
    .from('fc_entities')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)

  if (countError) {
    console.error('[entities] Count error:', countError)
    return NextResponse.json({ error: 'Failed to check entity count' }, { status: 500 })
  }

  const currentCount = count ?? 0
  const check = canCreateEntity(plan, currentCount)

  if (!check.allowed) {
    return NextResponse.json(
      {
        error: 'PLAN_LIMIT',
        message: `FREE plan allows a maximum of ${check.limit} entity. Upgrade to PRO for unlimited entities.`,
        limit: check.limit,
        current: currentCount,
      },
      { status: 402 }
    )
  }

  // ── Insert entity ───────────────────────────────────────────────────
  const entityData: Record<string, unknown> = {
    user_id: user.id,
    company_name: companyName,
    state_of_formation: stateOfFormation,
    formation_date: formationDate,
  }

  // Optional fields
  if (typeof body.ein_status === 'string') {
    entityData.ein_status = body.ein_status
  }
  if (typeof body.tax_classification === 'string') {
    entityData.tax_classification = body.tax_classification
  }
  if (typeof body.foreign_owner === 'boolean') {
    entityData.foreign_owner = body.foreign_owner
  }
  if (typeof body.fiscal_year_end_month === 'number') {
    entityData.fiscal_year_end_month = body.fiscal_year_end_month
  }

  const { data, error } = await supabase
    .from('fc_entities')
    .insert(entityData)
    .select()
    .single()

  if (error) {
    console.error('[entities] Insert error:', error)
    return NextResponse.json({ error: 'Failed to create entity' }, { status: 500 })
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
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token)

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('fc_entities')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[entities] Query error:', error)
    return NextResponse.json({ error: 'Query failed' }, { status: 500 })
  }

  return NextResponse.json(data)
}
