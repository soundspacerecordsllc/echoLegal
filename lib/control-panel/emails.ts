// lib/control-panel/emails.ts
// Email reminder service stub for the Control Panel.
// MVP: uses Resend. Swap provider by changing this module only.

import { UserComplianceItem, ComplianceItem } from './types'
import { SITE_ORIGIN } from '../site'

// ─── Configuration ──────────────────────────────────────────────────

const FROM_EMAIL = process.env.REMINDER_FROM_EMAIL || 'compliance@echo-legal.com'
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const BASE_URL = SITE_ORIGIN

// ─── Types ──────────────────────────────────────────────────────────

export type ReminderPayload = {
  to: string
  userName: string | null
  items: Array<{
    title: string
    due_date: string
    description: string
    url: string | null
  }>
}

// ─── Send ───────────────────────────────────────────────────────────

/**
 * Send a compliance reminder email.
 * Returns true if sent successfully.
 */
export async function sendComplianceReminder(
  payload: ReminderPayload
): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('[emails] RESEND_API_KEY not set; skipping send.')
    return false
  }

  const itemsList = payload.items
    .map(
      (item) =>
        `- ${item.title} (due: ${item.due_date})${item.url ? `\n  More info: ${item.url}` : ''}`
    )
    .join('\n')

  const greeting = payload.userName ? `Hello ${payload.userName}` : 'Hello'

  const body = {
    from: FROM_EMAIL,
    to: payload.to,
    subject: `Compliance Reminder: ${payload.items.length} item(s) due soon`,
    text: `${greeting},

You have upcoming compliance deadlines for your LLC:

${itemsList}

View your full checklist: ${BASE_URL}/control-panel/app/checklist

---
This is an automated reminder from EchoLegal Compliance Control Panel.
This is informational only and does not constitute legal advice.
`,
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
      console.error('[emails] Resend error:', response.status, errText)
      return false
    }

    return true
  } catch (err) {
    console.error('[emails] Failed to send reminder:', err)
    return false
  }
}
