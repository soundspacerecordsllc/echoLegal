// lib/filingcontrol/entity-view-model.ts
// Unified entity-scoped view model for the FilingControl dashboard.
// Composes generateComplianceItems() and computeDeadlines() into a single output.
// Pure function — no DB, no side effects.

import {
  generateComplianceItems,
  type GeneratedComplianceItem,
} from '@/lib/control-panel/compliance-rules'
import type { LLCProfile } from '@/lib/control-panel/types'
import type { Deadline, DeadlineResult } from '@/lib/engine/deadlines'
import { DEADLINE_ENGINE_VERSION } from '@/lib/engine/deadlines'

export type EntityViewModel = {
  complianceItems: GeneratedComplianceItem[]
  deadlineResult: DeadlineResult
  summary: {
    totalObligations: number
    dueThisMonth: number
    overdueCount: number
    nextDeadline: { form: string; date: string; daysRemaining: number } | null
  }
}

/**
 * Build a complete entity-scoped view model from an LLC profile.
 * Uses generateComplianceItems() as the primary source for all deadlines,
 * since it correctly handles formation_date-based items (BOI, EIN, ITIN).
 */
export function buildEntityViewModel(
  profile: LLCProfile,
  now?: Date
): EntityViewModel {
  const referenceDate = now ?? new Date()

  // Generate all compliance items with calculated due dates
  const complianceItems = generateComplianceItems(profile)

  // Convert to DeadlineResult format for deadline cards
  const deadlines: Deadline[] = complianceItems.map((ci) => ({
    form: ci.compliance_item.title,
    dueDate: ci.due_date,
    basis: ci.compliance_item.description,
  }))

  // Sort by due date ascending
  deadlines.sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )

  const taxYear = referenceDate.getFullYear() - 1
  const deadlineResult: DeadlineResult = {
    engineVersion: DEADLINE_ENGINE_VERSION,
    computedAt: referenceDate.toISOString(),
    taxYear,
    deadlines,
  }

  // Compute summary
  const currentMonth = referenceDate.getMonth()
  const currentYear = referenceDate.getFullYear()

  const dueThisMonth = complianceItems.filter((ci) => {
    const d = new Date(ci.due_date)
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear
  }).length

  const overdueCount = complianceItems.filter((ci) => {
    return new Date(ci.due_date) < referenceDate
  }).length

  let nextDeadline = null
  const upcoming = complianceItems.filter(
    (ci) => new Date(ci.due_date) >= referenceDate
  )
  if (upcoming.length > 0) {
    const next = upcoming[0] // already sorted by due_date
    const daysRemaining = Math.ceil(
      (new Date(next.due_date).getTime() - referenceDate.getTime()) /
        (1000 * 60 * 60 * 24)
    )
    nextDeadline = {
      form: next.compliance_item.title,
      date: next.due_date,
      daysRemaining,
    }
  }

  return {
    complianceItems,
    deadlineResult,
    summary: {
      totalObligations: complianceItems.length,
      dueThisMonth,
      overdueCount,
      nextDeadline,
    },
  }
}
