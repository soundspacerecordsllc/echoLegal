// app/filingcontrol/dashboard/reminder-status.tsx
// Shows the reminder alert schedule for compliance deadlines.
// PRO users see alerts as enabled; FREE users see upgrade messaging.
'use client'

import { useEffect, useState, useCallback } from 'react'

type UserPlan = {
  plan: 'FREE' | 'PRO'
}

const ALERT_TIERS = [
  { label: '30-day alert', description: 'Email reminder 30 days before deadline' },
  { label: '7-day alert', description: 'Email reminder 7 days before deadline' },
  { label: '1-day alert', description: 'Email reminder on the day of deadline' },
  { label: 'Overdue alert', description: 'Email notification when a deadline is missed' },
]

export function ReminderStatus() {
  const [plan, setPlan] = useState<'FREE' | 'PRO' | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchPlan = useCallback(async () => {
    try {
      const res = await fetch('/api/filingcontrol/billing/user-plan')
      if (!res.ok) {
        setLoading(false)
        return
      }
      const data: UserPlan = await res.json()
      setPlan(data.plan)
    } catch {
      // fail silently
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPlan()
  }, [fetchPlan])

  if (loading) return null

  const isPro = plan === 'PRO'

  return (
    <div className="border border-[var(--fc-slate-200)] rounded-lg bg-white">
      <div className="p-4 border-b border-[var(--fc-slate-100)] flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[var(--fc-navy)] uppercase tracking-wider">
          Deadline Alerts
        </h2>
        <span
          className={`text-xs px-2 py-0.5 rounded font-medium ${
            isPro
              ? 'bg-green-50 text-green-700'
              : 'bg-[var(--fc-slate-100)] text-[var(--fc-slate-500)]'
          }`}
        >
          {isPro ? 'Active' : 'PRO only'}
        </span>
      </div>
      <div className="divide-y divide-[var(--fc-slate-100)]">
        {ALERT_TIERS.map((tier) => (
          <div key={tier.label} className="p-3 px-4 flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full shrink-0 ${
                isPro ? 'bg-green-500' : 'bg-[var(--fc-slate-300)]'
              }`}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[var(--fc-navy)]">{tier.label}</p>
              <p className="text-xs text-[var(--fc-slate-400)]">{tier.description}</p>
            </div>
            {!isPro && (
              <span className="text-xs text-[var(--fc-slate-400)] shrink-0">
                Locked
              </span>
            )}
          </div>
        ))}
      </div>
      {!isPro && (
        <div className="p-4 border-t border-[var(--fc-slate-100)]">
          <p className="text-xs text-[var(--fc-slate-500)]">
            Upgrade to PRO to receive email alerts before high-risk filing deadlines.
          </p>
        </div>
      )}
      {isPro && (
        <div className="p-4 border-t border-[var(--fc-slate-100)]">
          <p className="text-xs text-[var(--fc-slate-500)]">
            Alerts are sent automatically for high-risk filings (Form 5472, Form 1120-F, BOI Report).
          </p>
        </div>
      )}
    </div>
  )
}
