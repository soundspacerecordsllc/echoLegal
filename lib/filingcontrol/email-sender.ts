// lib/filingcontrol/email-sender.ts
// FilingControl reminder email sender.
// Wraps the Resend API for compliance reminder delivery.
// Uses FilingControl-specific URLs and branding.

import { absoluteUrl } from '@/lib/site'
import { FC_APP } from './config'

// ─── Configuration ──────────────────────────────────────────────────

const FROM_EMAIL =
  process.env.REMINDER_FROM_EMAIL || 'compliance@echo-legal.com'
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''

// ─── Penalty Descriptions ───────────────────────────────────────────

const PENALTY_MAP: Record<string, string> = {
  'Form 5472':
    'Failure to file Form 5472 may trigger a $25,000 IRS penalty.',
  'Pro Forma 1120':
    'Failure to file Pro Forma 1120 with Form 5472 may trigger a $25,000 IRS penalty.',
  'Form 1120-F':
    'Late filing of Form 1120-F may result in penalties of 5% of unpaid tax per month, up to 25%.',
  'BOI Report':
    'Failure to file a BOI Report may result in civil penalties of up to $500 per day.',
  'State Annual Report':
    'Late or missing state annual reports may result in administrative dissolution of your LLC.',
}

function getPenaltyWarning(obligationName: string): string {
  for (const [key, warning] of Object.entries(PENALTY_MAP)) {
    if (obligationName.toLowerCase().includes(key.toLowerCase())) {
      return warning
    }
  }
  return 'Missing this deadline may result in penalties or loss of good standing.'
}

// ─── Types ──────────────────────────────────────────────────────────

export type FilingControlReminderPayload = {
  user_email: string
  entity_name: string
  obligation_name: string
  due_date: string
  dashboard_url?: string
  penalty_warning?: string
}

// ─── Send ───────────────────────────────────────────────────────────

/**
 * Send a FilingControl compliance reminder email.
 * Returns true if sent successfully.
 */
export async function sendFilingControlReminder(
  payload: FilingControlReminderPayload
): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('[fc-email] RESEND_API_KEY not set; skipping send.')
    return false
  }

  const dashboardUrl =
    payload.dashboard_url ||
    absoluteUrl(`${FC_APP.dashboardPath}/compliance`)
  const penaltyWarning =
    payload.penalty_warning || getPenaltyWarning(payload.obligation_name)

  const subject = `Compliance Reminder: ${payload.obligation_name} Deadline Approaching`

  const textBody = `Hello,

This is a compliance reminder from ${FC_APP.name}.

Entity: ${payload.entity_name}
Filing: ${payload.obligation_name}
Due Date: ${payload.due_date}

${penaltyWarning}

View your compliance dashboard:
${dashboardUrl}

---
This is an automated reminder from ${FC_APP.name}.
This is informational only and does not constitute legal advice.
`

  const htmlBody = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 24px;">
  <h2 style="color: #111; margin-bottom: 4px;">${FC_APP.name}</h2>
  <p style="color: #666; margin-top: 0; font-size: 14px;">Compliance Reminder</p>
  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;">

  <p>You have an upcoming compliance deadline:</p>

  <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
    <tr>
      <td style="padding: 8px 12px; background: #f9f9f9; font-weight: 600; width: 120px;">Entity</td>
      <td style="padding: 8px 12px; background: #f9f9f9;">${escapeHtml(payload.entity_name)}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; font-weight: 600;">Filing</td>
      <td style="padding: 8px 12px;">${escapeHtml(payload.obligation_name)}</td>
    </tr>
    <tr>
      <td style="padding: 8px 12px; background: #f9f9f9; font-weight: 600;">Due Date</td>
      <td style="padding: 8px 12px; background: #f9f9f9;">${escapeHtml(payload.due_date)}</td>
    </tr>
  </table>

  <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 6px; padding: 12px 16px; margin: 16px 0;">
    <strong style="color: #856404;">⚠ Penalty Risk</strong>
    <p style="margin: 4px 0 0; color: #856404; font-size: 14px;">${escapeHtml(penaltyWarning)}</p>
  </div>

  <div style="text-align: center; margin: 24px 0;">
    <a href="${escapeHtml(dashboardUrl)}" style="display: inline-block; background: #111; color: #fff; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600;">View your compliance dashboard</a>
  </div>

  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;">
  <p style="font-size: 12px; color: #999;">
    This is an automated reminder from ${FC_APP.name}.
    This is informational only and does not constitute legal advice.
  </p>
</body>
</html>`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: payload.user_email,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('[fc-email] Resend error:', response.status, errText)
      return false
    }

    return true
  } catch (err) {
    console.error('[fc-email] Failed to send reminder:', err)
    return false
  }
}

// ─── Helpers ────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
