// lib/editorial-workflow.ts
// Editorial Workflow State Machine for EchoLegal
//
// Implements GOVERNANCE_EXECUTION_PLAN.md Section 2.3: Authority Flow.
//
// Content transitions through statuses with permission-gated actions.
// All transitions are logged with timestamp, actor ID, and rationale.
// The editorial authority may intervene, override, or veto at any point.

import { ContentStatus } from './content-schema'
import {
  ContributorTier,
  Contributor,
  getContributor,
  canReviewContent,
  TIER_ORDER,
} from './contributors'
import { JurisdictionCode } from './jurisdictions'

// ============================================
// WORKFLOW TYPES
// ============================================

/**
 * Actions that can be performed on content within the editorial workflow.
 */
export type WorkflowAction =
  | 'submit'              // Author submits draft for review
  | 'assign-reviewer'     // Editor assigns a reviewer
  | 'approve'             // Reviewer approves for publication
  | 'request-changes'     // Reviewer requests changes
  | 'reject'              // Reviewer rejects submission
  | 'revise'              // Author resubmits after revision
  | 'publish'             // Editor/authority publishes approved content
  | 'unpublish'           // Editor/authority unpublishes content
  | 'archive'             // Editor/authority archives content
  | 'retract'             // Editor/authority retracts content
  | 'restore'             // Editor/authority restores archived content
  | 'override'            // Editorial authority overrides any decision
  | 'veto'                // Editorial authority vetoes publication

/**
 * A logged entry in the workflow audit trail.
 * Every state transition produces one of these.
 */
export type WorkflowLogEntry = {
  id: string                          // Unique entry ID (generated)
  timestamp: string                   // ISO date
  action: WorkflowAction
  actorId: string                     // Contributor ID who performed the action
  fromStatus: ContentStatus
  toStatus: ContentStatus
  rationale?: string                  // Required for reject, retract, override, veto
  contentId: string                   // The content being acted upon
  metadata?: Record<string, string>   // Additional context (e.g., assignedReviewerId)
}

/**
 * The current state of a content item within the editorial workflow.
 */
export type WorkflowState = {
  contentId: string
  currentStatus: ContentStatus
  assignedReviewerIds: string[]
  assignedEditorId?: string
  lastActionAt: string
  lastActionBy: string
  log: WorkflowLogEntry[]
}

/**
 * Result of attempting a workflow transition.
 */
export type TransitionResult = {
  success: boolean
  newStatus?: ContentStatus
  logEntry?: WorkflowLogEntry
  error?: string
}

// ============================================
// TRANSITION RULES
// ============================================

/**
 * Defines which statuses can transition to which other statuses.
 * Each entry maps a source status to valid target statuses and the
 * actions that trigger the transition.
 */
const TRANSITION_MAP: Record<
  ContentStatus,
  { action: WorkflowAction; toStatus: ContentStatus }[]
> = {
  draft: [
    { action: 'submit', toStatus: 'review' },
    { action: 'archive', toStatus: 'archived' },
  ],
  review: [
    { action: 'approve', toStatus: 'approved' },
    { action: 'request-changes', toStatus: 'draft' },
    { action: 'reject', toStatus: 'draft' },
    { action: 'archive', toStatus: 'archived' },
  ],
  approved: [
    { action: 'publish', toStatus: 'published' },
    { action: 'request-changes', toStatus: 'draft' },
    { action: 'archive', toStatus: 'archived' },
  ],
  published: [
    { action: 'unpublish', toStatus: 'draft' },
    { action: 'archive', toStatus: 'archived' },
    { action: 'retract', toStatus: 'retracted' },
  ],
  archived: [
    { action: 'restore', toStatus: 'draft' },
  ],
  retracted: [
    // Retracted content can only be restored by editorial authority (checked at permission level)
    { action: 'restore', toStatus: 'draft' },
  ],
}

/**
 * Actions that the editorial authority can perform regardless of
 * the normal transition rules (override capability).
 */
const AUTHORITY_OVERRIDE_TARGETS: ContentStatus[] = [
  'draft',
  'review',
  'approved',
  'published',
  'archived',
  'retracted',
]

// ============================================
// PERMISSION CHECKS
// ============================================

/**
 * Minimum tier required to perform each workflow action.
 */
const ACTION_MIN_TIER: Record<WorkflowAction, ContributorTier> = {
  'submit': 'author',
  'assign-reviewer': 'jurisdiction-editor',
  'approve': 'reviewer',
  'request-changes': 'reviewer',
  'reject': 'reviewer',
  'revise': 'author',
  'publish': 'senior-editor',
  'unpublish': 'senior-editor',
  'archive': 'jurisdiction-editor',
  'retract': 'senior-editor',
  'restore': 'jurisdiction-editor',
  'override': 'editorial-authority',
  'veto': 'editorial-authority',
}

/**
 * Actions that require a rationale string.
 */
const ACTIONS_REQUIRING_RATIONALE: WorkflowAction[] = [
  'reject',
  'retract',
  'override',
  'veto',
  'request-changes',
]

/**
 * Check if a contributor has sufficient tier to perform an action.
 */
function hasSufficientTier(
  contributorTier: ContributorTier,
  requiredTier: ContributorTier
): boolean {
  return TIER_ORDER[contributorTier] >= TIER_ORDER[requiredTier]
}

/**
 * Validate that an actor can perform a given action on content.
 */
export function validatePermission(
  actorId: string,
  action: WorkflowAction,
  contentJurisdictions: JurisdictionCode[],
  currentStatus: ContentStatus
): { allowed: boolean; reason?: string } {
  const actor = getContributor(actorId)

  if (!actor) {
    return { allowed: false, reason: 'Actor not found in contributor registry' }
  }

  if (!actor.isActive) {
    return { allowed: false, reason: 'Actor is not active' }
  }

  // Editorial authority can always act
  if (actor.tier === 'editorial-authority') {
    return { allowed: true }
  }

  // Check minimum tier
  const minTier = ACTION_MIN_TIER[action]
  if (!hasSufficientTier(actor.tier, minTier)) {
    return {
      allowed: false,
      reason: `Action '${action}' requires tier '${minTier}' or higher. Actor tier: '${actor.tier}'`,
    }
  }

  // Jurisdiction-scoped actions: reviewers and jurisdiction-editors
  // must have jurisdiction coverage for review/approve actions
  if (
    ['approve', 'request-changes', 'reject'].includes(action) &&
    actor.tier === 'reviewer'
  ) {
    const reviewCheck = canReviewContent(actorId, contentJurisdictions)
    if (!reviewCheck.allowed) {
      return reviewCheck
    }
  }

  // Jurisdiction editors can only act within their jurisdictions
  if (
    actor.tier === 'jurisdiction-editor' &&
    ['approve', 'publish', 'archive'].includes(action)
  ) {
    const coveredJurisdictions = contentJurisdictions.filter(j =>
      actor.jurisdictions.includes(j)
    )
    if (coveredJurisdictions.length === 0) {
      return {
        allowed: false,
        reason: `Jurisdiction editor does not cover content jurisdictions: ${contentJurisdictions.join(', ')}`,
      }
    }
  }

  // Verify the transition is valid for the current status
  if (action !== 'override' && action !== 'veto' && action !== 'assign-reviewer') {
    const validTransitions = TRANSITION_MAP[currentStatus] || []
    const isValid = validTransitions.some(t => t.action === action)
    if (!isValid) {
      return {
        allowed: false,
        reason: `Action '${action}' is not valid from status '${currentStatus}'`,
      }
    }
  }

  return { allowed: true }
}

// ============================================
// STATE MACHINE
// ============================================

/**
 * Generate a unique log entry ID.
 */
function generateLogId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `wf-${timestamp}-${random}`
}

/**
 * Create the initial workflow state for a new content item.
 */
export function createWorkflowState(
  contentId: string,
  authorId: string
): WorkflowState {
  const now = new Date().toISOString()

  return {
    contentId,
    currentStatus: 'draft',
    assignedReviewerIds: [],
    lastActionAt: now,
    lastActionBy: authorId,
    log: [
      {
        id: generateLogId(),
        timestamp: now,
        action: 'submit',
        actorId: authorId,
        fromStatus: 'draft',
        toStatus: 'draft',
        contentId,
        rationale: 'Content created',
      },
    ],
  }
}

/**
 * Execute a workflow transition.
 *
 * This is the primary entry point for the editorial workflow.
 * All content status changes must go through this function to ensure
 * permission checks and audit logging.
 *
 * @param state - Current workflow state
 * @param action - The action to perform
 * @param actorId - ID of the contributor performing the action
 * @param contentJurisdictions - Jurisdictions of the content
 * @param rationale - Required for certain actions (reject, retract, override, veto)
 * @param metadata - Optional additional context
 */
export function executeTransition(
  state: WorkflowState,
  action: WorkflowAction,
  actorId: string,
  contentJurisdictions: JurisdictionCode[],
  rationale?: string,
  metadata?: Record<string, string>
): TransitionResult {
  // Validate rationale requirement
  if (ACTIONS_REQUIRING_RATIONALE.includes(action) && !rationale) {
    return {
      success: false,
      error: `Action '${action}' requires a rationale`,
    }
  }

  // Check permissions
  const permission = validatePermission(
    actorId,
    action,
    contentJurisdictions,
    state.currentStatus
  )
  if (!permission.allowed) {
    return {
      success: false,
      error: permission.reason,
    }
  }

  // Determine the target status
  let toStatus: ContentStatus

  if (action === 'override') {
    // Editorial authority override: can set any status
    toStatus = (metadata?.targetStatus as ContentStatus) || state.currentStatus
    if (!AUTHORITY_OVERRIDE_TARGETS.includes(toStatus)) {
      return {
        success: false,
        error: `Invalid override target status: ${toStatus}`,
      }
    }
  } else if (action === 'veto') {
    // Veto always returns content to draft
    toStatus = 'draft'
  } else if (action === 'assign-reviewer') {
    // Assigning a reviewer doesn't change status
    toStatus = state.currentStatus
  } else {
    // Standard transition
    const validTransitions = TRANSITION_MAP[state.currentStatus] || []
    const transition = validTransitions.find(t => t.action === action)
    if (!transition) {
      return {
        success: false,
        error: `No valid transition for action '${action}' from status '${state.currentStatus}'`,
      }
    }
    toStatus = transition.toStatus
  }

  // Create log entry
  const logEntry: WorkflowLogEntry = {
    id: generateLogId(),
    timestamp: new Date().toISOString(),
    action,
    actorId,
    fromStatus: state.currentStatus,
    toStatus,
    contentId: state.contentId,
    rationale,
    metadata,
  }

  // Update state
  state.currentStatus = toStatus
  state.lastActionAt = logEntry.timestamp
  state.lastActionBy = actorId
  state.log.push(logEntry)

  // Handle reviewer assignment
  if (action === 'assign-reviewer' && metadata?.reviewerId) {
    if (!state.assignedReviewerIds.includes(metadata.reviewerId)) {
      state.assignedReviewerIds.push(metadata.reviewerId)
    }
  }

  // Handle editor assignment
  if (action === 'assign-reviewer' && metadata?.editorId) {
    state.assignedEditorId = metadata.editorId
  }

  return {
    success: true,
    newStatus: toStatus,
    logEntry,
  }
}

// ============================================
// WORKFLOW QUERIES
// ============================================

/**
 * Get the available actions for a content item given its current status
 * and the acting contributor.
 */
export function getAvailableActions(
  state: WorkflowState,
  actorId: string,
  contentJurisdictions: JurisdictionCode[]
): WorkflowAction[] {
  const actor = getContributor(actorId)
  if (!actor || !actor.isActive) return []

  const allActions: WorkflowAction[] = [
    'submit',
    'assign-reviewer',
    'approve',
    'request-changes',
    'reject',
    'revise',
    'publish',
    'unpublish',
    'archive',
    'retract',
    'restore',
    'override',
    'veto',
  ]

  return allActions.filter(action => {
    const permission = validatePermission(
      actorId,
      action,
      contentJurisdictions,
      state.currentStatus
    )
    return permission.allowed
  })
}

/**
 * Get the full audit log for a content item, sorted newest-first.
 */
export function getAuditLog(state: WorkflowState): WorkflowLogEntry[] {
  return [...state.log].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
}

/**
 * Get the most recent log entry for a specific action type.
 */
export function getLastAction(
  state: WorkflowState,
  action: WorkflowAction
): WorkflowLogEntry | undefined {
  const sorted = getAuditLog(state)
  return sorted.find(entry => entry.action === action)
}

/**
 * Check if content is ready for publication.
 * Requires: approved status, at least one reviewer assigned, review completed.
 */
export function isReadyForPublication(state: WorkflowState): {
  ready: boolean
  blockers: string[]
} {
  const blockers: string[] = []

  if (state.currentStatus !== 'approved') {
    blockers.push(`Content is in '${state.currentStatus}' status (must be 'approved')`)
  }

  if (state.assignedReviewerIds.length === 0) {
    blockers.push('No reviewer has been assigned')
  }

  const approvalEntry = getLastAction(state, 'approve')
  if (!approvalEntry) {
    blockers.push('Content has not been approved by a reviewer')
  }

  return {
    ready: blockers.length === 0,
    blockers,
  }
}

// ============================================
// WORKFLOW ACTION LABELS (Bilingual)
// ============================================

export const WORKFLOW_ACTION_LABELS: Record<WorkflowAction, { en: string; tr: string }> = {
  'submit': { en: 'Submit for Review', tr: 'İncelemeye Gönder' },
  'assign-reviewer': { en: 'Assign Reviewer', tr: 'İncelemeci Ata' },
  'approve': { en: 'Approve', tr: 'Onayla' },
  'request-changes': { en: 'Request Changes', tr: 'Değişiklik İste' },
  'reject': { en: 'Reject', tr: 'Reddet' },
  'revise': { en: 'Resubmit', tr: 'Yeniden Gönder' },
  'publish': { en: 'Publish', tr: 'Yayınla' },
  'unpublish': { en: 'Unpublish', tr: 'Yayından Kaldır' },
  'archive': { en: 'Archive', tr: 'Arşivle' },
  'retract': { en: 'Retract', tr: 'Geri Çek' },
  'restore': { en: 'Restore', tr: 'Geri Yükle' },
  'override': { en: 'Override', tr: 'Üstüne Yaz' },
  'veto': { en: 'Veto', tr: 'Veto' },
}

export const WORKFLOW_STATUS_LABELS: Record<ContentStatus, { en: string; tr: string }> = {
  draft: { en: 'Draft', tr: 'Taslak' },
  review: { en: 'Under Review', tr: 'İncelemede' },
  approved: { en: 'Approved', tr: 'Onaylandı' },
  published: { en: 'Published', tr: 'Yayınlandı' },
  archived: { en: 'Archived', tr: 'Arşivlendi' },
  retracted: { en: 'Retracted', tr: 'Geri Çekildi' },
}

// ============================================
// WORKFLOW SUMMARY
// ============================================

/**
 * Generate a human-readable summary of the workflow state.
 */
export function getWorkflowSummary(
  state: WorkflowState,
  lang: 'en' | 'tr' = 'en'
): {
  status: string
  statusLabel: string
  reviewerCount: number
  lastActionLabel: string
  lastActionDate: string
  totalActions: number
} {
  const isEnglish = lang === 'en'
  const lastLog = state.log[state.log.length - 1]

  return {
    status: state.currentStatus,
    statusLabel: WORKFLOW_STATUS_LABELS[state.currentStatus][lang],
    reviewerCount: state.assignedReviewerIds.length,
    lastActionLabel: lastLog
      ? WORKFLOW_ACTION_LABELS[lastLog.action][lang]
      : isEnglish ? 'None' : 'Yok',
    lastActionDate: state.lastActionAt,
    totalActions: state.log.length,
  }
}
