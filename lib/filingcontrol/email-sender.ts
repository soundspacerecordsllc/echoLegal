// lib/filingcontrol/email-sender.ts
// FilingControl email sender. Wraps Resend API for compliance reminder emails.
// Uses FilingControl-specific URLs and penalty-aware copy.

import { absoluteUrl } from '@/lib/site'

// ─── Configuration ──────────────────────────────────────────────────

const FROM_EMAIL =
  process.env.FC_REMINDER_FROM_EMAIL ||
  process.env.REMINDER_FROM_EMAIL ||
  'compliance@echo-legal.com'

const RESEND_API_KEY = process.env.RESEND_API_KEY || ''

// ─── Types ──────────────────────────────────────────────────────────

export type FCReminderPayload = {
  to: string
  entity_name: string
  obligation_name: string
  due_date: string
  days_remaining: number
  penalty_warning: string | null
  event_type: string
  dashboard_url?: string
}

export type FCReminderResult = {
  sent: boolean
  error?: string
}

// ─── Penalty text lookup ────────────────────────────────────────────

const PENALTY_WARNINGS: Record<string, string> = {
  'Form 5472':
    'Failure to file Form 5472 may trigger a $25,000 IRS penalty per form, per year.',
  'Pro Forma 1120':
    'The pro forma Form 1120 is required to be filed with Form 5472. Failure to file may trigger a $25,000 penalty.',
  'BOI Report':
    'Failure to file the BOI Report may result in civil penalties of $500 per day.',
  'FBAR (Form 114)':
    'Willful failure to file FBAR may result in penalties up to $100,000 or 50% of account balances.',
}

/**
 * Look up a default penalty warning for a known obligation.
 */
export function getDefaultPenaltyWarning(
  obligationName: string
): string | null {
  for (const [key, warning] of Object.entries(PENALTY_WARNINGS)) {
    if (obligationName.includes(key)) return warning
  }
  return null
}

// ─── Subject line ───────────────────────────────────────────────────

function buildSubject(payload: FCReminderPayload): string {
  if (payload.days_remaining <= 0) {
    return `OVERDUE: ${payload.obligation_name} — ${payload.entity_name}`
  }
  if (payload.days_remaining <= 7) {
    return `Urgent: ${payload.obligation_name} due in ${payload.days_remaining} days — ${payload.entity_name}`
  }
  return `Compliance Reminder: ${payload.obligation_name} Deadline Approaching`
}

// ─── Email body ─────────────────────────────────────────────────────

function buildEmailBody(payload: FCReminderPayload): string {
  const dashboardUrl =
    payload.dashboard_url || absoluteUrl('/filingcontrol/dashboard')

  const urgencyLabel =
    payload.days_remaining <= 0
      ? `OVERDUE by ${Math.abs(payload.days_remaining)} day(s)`
      : payload.days_remaining <= 7
        ? `Due in ${payload.days_remaining} day(s) — URGENT`
        : `Due in ${payload.days_remaining} day(s)`

  const penaltyBlock = payload.penalty_warning
    ? `\nPENALTY RISK:\n${payload.penalty_warning}\n`
    : ''

  return `FilingControl — Compliance Reminder

Entity: ${payload.entity_name}
Filing: ${payload.obligation_name}
Due Date: ${payload.due_date}
Status: ${urgencyLabel}
${penaltyBlock}
──────────────────────────────────

View your compliance dashboard:
${dashboardUrl}

──────────────────────────────────

This is an automated reminder from FilingControl by EchoLegal.
This is informational only and does not constitute legal, tax, or
professional advice. Consult a qualified professional for your situation.
`
}

// ─── Send ───────────────────────────────────────────────────────────

/**
 * Send a single compliance reminder email via Resend.
 * Returns { sent: true } on success, { sent: false, error } on failure.
 */
export async function sendFCReminder(
  payload: FCReminderPayload
): Promise<FCReminderResult> {
  if (!RESEND_API_KEY) {
    console.warn('[fc-email] RESEND_API_KEY not set; skipping send.')
    return { sent: false, error: 'RESEND_API_KEY not configured' }
  }

  const body = {
    from: FROM_EMAIL,
    to: payload.to,
    subject: buildSubject(payload),
    text: buildEmailBody(payload),
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('[fc-email] Resend error:', response.status, errText)
      return { sent: false, error: `Resend ${response.status}: ${errText}` }
    }

    return { sent: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[fc-email] Failed to send:', message)
    return { sent: false, error: message }
  }
}
