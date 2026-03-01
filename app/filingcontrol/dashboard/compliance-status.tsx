// app/filingcontrol/dashboard/compliance-status.tsx
// Client component: fetches and displays computed compliance state.
'use client'

import { useEffect, useState } from 'react'

type ComplianceStateItem = {
  id: string
  entity_id: string
  next_deadline_form: string
  next_deadline_date: string
  days_remaining: number
  status: 'CURRENT' | 'DUE_SOON' | 'OVERDUE'
  urgency: 'NONE' | 'AMBER' | 'RED'
  engine_version: string
  last_evaluated_at: string
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  CURRENT: {
    bg: 'bg-[var(--fc-slate-100)]',
    text: 'text-[var(--fc-slate-700)]',
    label: 'Current',
  },
  DUE_SOON: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    label: 'Due Soon',
  },
  OVERDUE: {
    bg: 'bg-red-50',
    text: 'text-red-800',
    label: 'Overdue',
  },
}

const URGENCY_COLORS: Record<string, string> = {
  NONE: 'border-[var(--fc-slate-200)]',
  AMBER: 'border-amber-300',
  RED: 'border-red-400',
}

export function ComplianceStatusSection() {
  const [states, setStates] = useState<ComplianceStateItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchStates() {
      try {
        // TODO: Replace with actual authenticated user ID from session
        // For now, attempt fetch; will return empty if no userId provided
        const params = new URLSearchParams(window.location.search)
        const userId = params.get('userId')
        if (!userId) {
          setLoading(false)
          return
        }

        const res = await fetch(
          `/api/filingcontrol/compliance-state?userId=${encodeURIComponent(userId)}`
        )
        if (!res.ok) {
          setError(true)
          setLoading(false)
          return
        }

        const data = await res.json()
        setStates(data.states || [])
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchStates()
  }, [])

  if (loading) {
    return (
      <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white">
        <h2 className="text-sm font-semibold text-[var(--fc-navy)] uppercase tracking-wider mb-3">
          Compliance Status
        </h2>
        <p className="text-sm text-[var(--fc-slate-400)]">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white">
        <h2 className="text-sm font-semibold text-[var(--fc-navy)] uppercase tracking-wider mb-3">
          Compliance Status
        </h2>
        <p className="text-sm text-[var(--fc-slate-400)]">
          Unable to load compliance status.
        </p>
      </div>
    )
  }

  if (states.length === 0) {
    return (
      <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white">
        <h2 className="text-sm font-semibold text-[var(--fc-navy)] uppercase tracking-wider mb-3">
          Compliance Status
        </h2>
        <p className="text-sm text-[var(--fc-slate-400)]">
          No computed deadlines yet.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-[var(--fc-slate-200)] rounded-lg bg-white">
      <div className="p-4 border-b border-[var(--fc-slate-100)]">
        <h2 className="text-sm font-semibold text-[var(--fc-navy)] uppercase tracking-wider">
          Compliance Status
        </h2>
      </div>
      <div className="divide-y divide-[var(--fc-slate-100)]">
        {states.map((state) => {
          const style = STATUS_STYLES[state.status] || STATUS_STYLES.CURRENT
          const borderColor = URGENCY_COLORS[state.urgency] || URGENCY_COLORS.NONE

          return (
            <div
              key={state.id}
              className={`p-4 flex items-center gap-4 border-l-4 ${borderColor}`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--fc-navy)]">
                  {state.next_deadline_form}
                </p>
                <p className="text-xs text-[var(--fc-slate-500)] mt-0.5">
                  Due: {state.next_deadline_date}
                </p>
              </div>
              <div className="text-right shrink-0 flex items-center gap-3">
                <span className="text-sm font-medium text-[var(--fc-navy)]">
                  {state.days_remaining >= 0
                    ? `${state.days_remaining} days`
                    : `${Math.abs(state.days_remaining)} days overdue`}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${style.bg} ${style.text}`}
                >
                  {style.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
