// app/api/filingcontrol/onboarding/route.ts
// Authenticated endpoint: creates a user's first entity during onboarding.
// Also creates the initial assessment snapshot for computed deadlines.

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'
import { getApiSessionUser } from '@/lib/filingcontrol/auth'
import { computeObligations } from '@/app/filingcontrol/lib/obligations'
import { computeDeadlines, DEADLINE_ENGINE_VERSION } from '@/lib/engine/deadlines'

export async function POST(request: NextRequest) {
  const user = await getApiSessionUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const companyName = typeof body.company_name === 'string' ? body.company_name.trim() : ''
  const stateOfFormation = typeof body.state_of_formation === 'string' ? body.state_of_formation.trim().toUpperCase() : ''
  const formationDate = typeof body.formation_date === 'string' ? body.formation_date : ''
  const fiscalYearEndMonth = typeof body.fiscal_year_end_month === 'number' ? body.fiscal_year_end_month : 12
  const einStatus = typeof body.ein_status === 'string' ? body.ein_status : 'not_applied'

  if (!companyName) {
    return NextResponse.json({ error: 'company_name is required' }, { status: 400 })
  }
  if (!stateOfFormation) {
    return NextResponse.json({ error: 'state_of_formation is required' }, { status: 400 })
  }
  if (!formationDate) {
    return NextResponse.json({ error: 'formation_date is required' }, { status: 400 })
  }

  const supabase = getServiceClient()

  // Ensure fc_users row exists for this user
  const { data: existingFcUser } = await supabase
    .from('fc_users')
    .select('id')
    .eq('email', user.email)
    .single()

  if (!existingFcUser) {
    await supabase.from('fc_users').insert({ email: user.email })
  }

  // Create the entity
  const entityData = {
    user_id: user.id,
    company_name: companyName,
    state_of_formation: stateOfFormation,
    formation_date: formationDate,
    fiscal_year_end_month: fiscalYearEndMonth,
    ein_status: einStatus,
    foreign_owner: true,
    tax_classification: 'disregarded_entity',
  }

  const { data: entity, error: entityError } = await supabase
    .from('fc_entities')
    .insert(entityData)
    .select()
    .single()

  if (entityError) {
    console.error('[onboarding] Entity creation error:', entityError)
    return NextResponse.json({ error: 'Failed to create entity' }, { status: 500 })
  }

  // Compute obligations and deadlines for initial assessment snapshot
  const taxYear = new Date().getFullYear() - 1
  const obligations = computeObligations({
    entityType: 'llc',
    foreignOwned: true,
    usBusinessActivity: true,
    hasUSIncome: true,
    taxYear,
    state: stateOfFormation,
  })

  const entityProfile = {
    entityType: 'llc' as const,
    foreignOwned: true,
    taxYear,
    state: stateOfFormation,
    fiscalYearEndMonth,
  }

  const deadlineResult = computeDeadlines(entityProfile, obligations)

  // Store assessment snapshot
  await supabase.from('fc_assessments').insert({
    user_id: user.id,
    entity_profile: {
      ...entityProfile,
      company_name: companyName,
      formation_date: formationDate,
      ein_status: einStatus,
      entity_id: entity.id,
    },
    assessment_result: obligations,
    deadlines_json: deadlineResult,
    engine_version: DEADLINE_ENGINE_VERSION,
    tax_year: taxYear,
  })

  return NextResponse.json({ entity, deadlines: deadlineResult }, { status: 201 })
}
