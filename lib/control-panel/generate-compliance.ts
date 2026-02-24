// lib/control-panel/generate-compliance.ts
// Service layer: runs the deterministic rules engine and persists
// compliance items for a user. Uses the service client (bypasses RLS).

import { getServiceClient } from './db'
import { generateComplianceItems } from './compliance-rules'
import type { LLCProfile, ComplianceItem } from './types'

/**
 * Derive a unique DB key for a compliance item.
 * Federal items use their key as-is; state items append the jurisdiction.
 */
function dbKey(item: ComplianceItem): string {
  if (item.jurisdiction === 'federal') return item.key
  return `${item.key}_${item.jurisdiction.toLowerCase()}`
}

/**
 * Generate compliance checklist rows for a user based on their LLC profile.
 * Idempotent: uses upsert with unique constraints to avoid duplicates.
 * Returns the number of compliance tracking rows generated.
 */
export async function generateComplianceForUser(userId: string): Promise<number> {
  const supabase = getServiceClient()

  // 1. Fetch LLC profile
  const { data: profile, error: profileError } = await supabase
    .from('cp_llc_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (profileError || !profile) {
    console.log('[compliance] No LLC profile found for user:', userId)
    return 0
  }

  console.log('[compliance] Generating for user:', userId, 'state:', profile.state_of_formation)

  // 2. Run deterministic rules engine
  const generated = generateComplianceItems(profile as LLCProfile)
  console.log('[compliance] Rules engine produced', generated.length, 'items')

  if (generated.length === 0) return 0

  // 3. Upsert reference rows into cp_compliance_items
  const refRows = generated.map(g => ({
    key: dbKey(g.compliance_item),
    title: g.compliance_item.title,
    description: g.compliance_item.description,
    authority_level: g.compliance_item.authority_level,
    jurisdiction: g.compliance_item.jurisdiction,
    frequency: g.compliance_item.frequency,
    reference_event: g.compliance_item.reference_event,
    offset_days: g.compliance_item.offset_days,
    url: g.compliance_item.url,
    active: true,
    authority_label: g.compliance_item.authority_label ?? null,
    authority_url: g.compliance_item.authority_url ?? null,
    summary_text: g.compliance_item.summary_text ?? null,
    risk_note: g.compliance_item.risk_note ?? null,
  }))

  const { error: refError } = await supabase
    .from('cp_compliance_items')
    .upsert(refRows, { onConflict: 'key' })

  if (refError) {
    console.log('[compliance] Error upserting reference items:', refError.message)
    return 0
  }

  // 4. Fetch DB UUIDs for our keys
  const keys = refRows.map(r => r.key)
  const { data: dbItems, error: fetchError } = await supabase
    .from('cp_compliance_items')
    .select('id, key')
    .in('key', keys)

  if (fetchError || !dbItems) {
    console.log('[compliance] Error fetching item IDs:', fetchError?.message)
    return 0
  }

  const keyToId = new Map<string, string>(
    dbItems.map((r: { id: string; key: string }) => [r.key, r.id])
  )

  // 5. Upsert user compliance tracking rows
  const trackingRows = generated
    .map(g => {
      const itemId = keyToId.get(dbKey(g.compliance_item))
      if (!itemId) return null
      return {
        user_id: userId,
        compliance_item_id: itemId,
        due_date: g.due_date,
        status: 'pending',
      }
    })
    .filter((r): r is NonNullable<typeof r> => r !== null)

  const { error: trackError } = await supabase
    .from('cp_user_compliance')
    .upsert(trackingRows, {
      onConflict: 'user_id,compliance_item_id,due_date',
      ignoreDuplicates: true,
    })

  if (trackError) {
    console.log('[compliance] Error inserting tracking rows:', trackError.message)
    return 0
  }

  console.log('[compliance] Generated', trackingRows.length, 'compliance rows for user:', userId)
  return trackingRows.length
}
