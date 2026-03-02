// lib/filingcontrol/entity-limit.ts
// Pure helpers for PRO entity-limit gating.
// FREE plan: 1 entity max. PRO plan: unlimited.

import type { Plan } from '@/lib/filingcontrol/billing/plan'

/** Maximum entities a FREE user can create. */
export const FREE_ENTITY_LIMIT = 1

/**
 * Check if a user row represents a PRO user.
 * Accepts any object with a plan field.
 */
export function isProUser(userRow: { plan: string } | null | undefined): boolean {
  return userRow?.plan === 'PRO'
}

/**
 * Determine if a user can create a new entity given their plan and current count.
 * Returns { allowed: true } or { allowed: false, reason, limit }.
 */
export function canCreateEntity(
  plan: Plan,
  currentEntityCount: number
): { allowed: true } | { allowed: false; reason: string; limit: number } {
  if (plan === 'PRO') {
    return { allowed: true }
  }
  if (currentEntityCount >= FREE_ENTITY_LIMIT) {
    return {
      allowed: false,
      reason: 'PLAN_LIMIT',
      limit: FREE_ENTITY_LIMIT,
    }
  }
  return { allowed: true }
}
