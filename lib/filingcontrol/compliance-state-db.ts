// lib/filingcontrol/compliance-state-db.ts
// Database helpers for fc_compliance_state.
// Uses service-role client for upserts (monitoring job),
// and entity-ownership join for user reads.

import { getServiceClient } from '@/lib/control-panel/db'
import type { ComplianceState } from './monitoring'

export type ComplianceStateRow = ComplianceState & {
  id: string
  entity_id: string
  engine_version: string
  last_evaluated_at: string
}

/**
 * Upsert a single compliance-state row for an entity.
 * Idempotent: ON CONFLICT (entity_id) DO UPDATE.
 */
export async function upsertComplianceState(
  entityId: string,
  state: ComplianceState & { engine_version: string }
): Promise<{ error: string | null }> {
  const supabase = getServiceClient()

  const { error } = await supabase.from('fc_compliance_state').upsert(
    {
      entity_id: entityId,
      next_deadline_form: state.next_deadline_form,
      next_deadline_date: state.next_deadline_date,
      days_remaining: state.days_remaining,
      status: state.status,
      urgency: state.urgency,
      engine_version: state.engine_version,
      last_evaluated_at: new Date().toISOString(),
    },
    { onConflict: 'entity_id' }
  )

  return { error: error ? error.message : null }
}

/**
 * Get all compliance states for a user, joined via fc_entities.
 * Ordered: OVERDUE first, then DUE_SOON by earliest date, then CURRENT.
 */
export async function getComplianceStateForUser(
  userId: string
): Promise<ComplianceStateRow[]> {
  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('fc_compliance_state')
    .select(
      `
      id,
      entity_id,
      next_deadline_form,
      next_deadline_date,
      days_remaining,
      status,
      urgency,
      engine_version,
      last_evaluated_at,
      fc_entities!inner (
        user_id
      )
    `
    )
    .eq('fc_entities.user_id', userId)

  if (error || !data) {
    console.error('[compliance-state-db] getForUser error:', error)
    return []
  }

  // Sort: OVERDUE first, then DUE_SOON by earliest date, then CURRENT
  const statusOrder: Record<string, number> = {
    OVERDUE: 0,
    DUE_SOON: 1,
    CURRENT: 2,
  }

  return (data as unknown as ComplianceStateRow[]).sort((a, b) => {
    const orderA = statusOrder[a.status] ?? 3
    const orderB = statusOrder[b.status] ?? 3
    if (orderA !== orderB) return orderA - orderB
    return (
      new Date(a.next_deadline_date).getTime() -
      new Date(b.next_deadline_date).getTime()
    )
  })
}

/**
 * Get compliance state for a specific entity.
 */
export async function getComplianceStateForEntity(
  entityId: string
): Promise<ComplianceStateRow | null> {
  const supabase = getServiceClient()

  const { data, error } = await supabase
    .from('fc_compliance_state')
    .select('*')
    .eq('entity_id', entityId)
    .single()

  if (error || !data) return null

  return data as ComplianceStateRow
}
