// lib/control-panel/feature-access.ts
// Feature access gating based on Stripe subscription status.
// Single-purpose module: checks whether a user can access gated features.

import { getServiceClient } from './db'

type GatedFeature = 'reminders'

/**
 * Check if a user has access to a gated feature.
 *
 * Logic:
 *   - Fetch cp_subscriptions for the user.
 *   - Return true if status is 'active' AND current_period_end > now.
 *   - Return false otherwise (missing row, expired, canceled, etc.).
 */
export async function canAccessFeature(
  userId: string,
  feature: GatedFeature
): Promise<boolean> {
  const supabase = getServiceClient()

  const { data: sub, error } = await supabase
    .from('cp_subscriptions')
    .select('status, current_period_end')
    .eq('user_id', userId)
    .single()

  if (error || !sub) return false

  if (sub.status !== 'active') return false

  const periodEnd = new Date(sub.current_period_end)
  if (periodEnd <= new Date()) return false

  return true
}
