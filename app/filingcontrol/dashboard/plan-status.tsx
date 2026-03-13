// app/filingcontrol/dashboard/plan-status.tsx
// Client component: shows current plan and Manage Billing button for PRO users.
'use client'

import { useEffect, useState, useCallback } from 'react'

type UserPlan = {
  plan: 'FREE' | 'PRO'
  email: string
  subscription_status: string
  calendar_token: string | null
}

export function PlanStatus() {
  const [user, setUser] = useState<UserPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const fetchPlan = useCallback(async () => {
    try {
      // Uses cookie-based auth — no email param needed
      const res = await fetch('/api/filingcontrol/billing/user-plan')
      if (!res.ok) {
        setLoading(false)
        return
      }

      const data = await res.json()
      setUser(data)
    } catch {
      // Silently fail — plan section just won't show
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPlan()
  }, [fetchPlan])

  async function handleManageBilling() {
    if (!user?.email) return

    setPortalLoading(true)
    setError('')

    try {
      const res = await fetch('/api/filingcontrol/billing/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Could not open billing portal.')
        setPortalLoading(false)
        return
      }

      const { url } = await res.json()
      if (url) {
        window.location.href = url
      } else {
        setError('No portal URL returned.')
        setPortalLoading(false)
      }
    } catch {
      setError('Network error. Try again.')
      setPortalLoading(false)
    }
  }

  if (loading || !user) return null

  const isPro = user.plan === 'PRO'

  return (
    <div className="border border-[var(--fc-slate-200)] rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--fc-navy)]">
            Plan: {user.plan}
          </p>
          <p className="text-xs text-[var(--fc-slate-500)] mt-0.5">
            {isPro
              ? 'Email monitoring active'
              : 'Email monitoring available on PRO'}
          </p>
        </div>
        {isPro && (
          <button
            onClick={handleManageBilling}
            disabled={portalLoading}
            className="shrink-0 px-4 py-2 text-sm font-medium border border-[var(--fc-slate-200)] rounded-md text-[var(--fc-navy)] hover:border-[var(--fc-slate-400)] transition-colors disabled:opacity-50"
          >
            {portalLoading ? 'Redirecting...' : 'Manage Billing'}
          </button>
        )}
      </div>
      {isPro && user.calendar_token && (
        <div className="mt-3 pt-3 border-t border-[var(--fc-slate-100)]">
          <p className="text-xs font-medium text-[var(--fc-navy)] mb-1">
            Calendar Integration
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs text-[var(--fc-slate-500)] bg-[var(--fc-slate-100)] px-2 py-1 rounded truncate">
              {`${window.location.origin}/api/filingcontrol/calendar/${user.calendar_token}`}
            </code>
            <button
              onClick={() => {
                const url = `${window.location.origin}/api/filingcontrol/calendar/${user.calendar_token}`
                navigator.clipboard.writeText(url).then(() => {
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                })
              }}
              className="shrink-0 px-3 py-1 text-xs font-medium border border-[var(--fc-slate-200)] rounded text-[var(--fc-navy)] hover:border-[var(--fc-slate-400)] transition-colors"
            >
              {copied ? 'Copied' : 'Copy Calendar Link'}
            </button>
          </div>
          <p className="text-xs text-[var(--fc-slate-400)] mt-1">
            Subscribe in Google, Apple, or Outlook. Updates automatically.
          </p>
        </div>
      )}
      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}
    </div>
  )
}
