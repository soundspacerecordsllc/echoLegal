// app/filingcontrol/dashboard/notifications-panel.tsx
// Client component: fetches and displays recent notification events.
'use client'

import { useEffect, useState, useCallback } from 'react'

type NotificationEvent = {
  id: string
  entity_id: string
  event_type: string
  event_key: string
  payload: {
    form: string
    dueDate: string
    daysRemaining: number
    status: string
    urgency: string
    engineVersion: string
    previousStatus?: string
  }
  status: 'PENDING' | 'SENT' | 'CANCELLED'
  created_at: string
  sent_at: string | null
}

const EVENT_LABELS: Record<string, string> = {
  DUE_SOON_90: '90 days notice',
  DUE_SOON_30: '30 days notice',
  DUE_SOON_7: '7 days notice',
  DUE_TODAY: 'Due today',
  OVERDUE_1: 'Overdue',
  STATUS_CHANGED: 'Status changed',
}

const EVENT_STYLES: Record<string, { bg: string; text: string }> = {
  DUE_SOON_90: { bg: 'bg-[var(--fc-slate-100)]', text: 'text-[var(--fc-slate-700)]' },
  DUE_SOON_30: { bg: 'bg-amber-50', text: 'text-amber-800' },
  DUE_SOON_7: { bg: 'bg-amber-100', text: 'text-amber-900' },
  DUE_TODAY: { bg: 'bg-red-50', text: 'text-red-700' },
  OVERDUE_1: { bg: 'bg-red-100', text: 'text-red-800' },
  STATUS_CHANGED: { bg: 'bg-blue-50', text: 'text-blue-800' },
}

function formatEventDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function NotificationsPanel() {
  const [events, setEvents] = useState<NotificationEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchEvents = useCallback(async () => {
    try {
      const params = new URLSearchParams(window.location.search)
      const userId = params.get('userId')
      if (!userId) {
        setLoading(false)
        return
      }

      const res = await fetch(
        `/api/filingcontrol/notifications?userId=${encodeURIComponent(userId)}`
      )
      if (!res.ok) {
        setError(true)
        setLoading(false)
        return
      }

      const data = await res.json()
      // Show only PENDING events, limit to 5
      const pending = (data.events || [])
        .filter((e: NotificationEvent) => e.status === 'PENDING')
        .slice(0, 5)
      setEvents(pending)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  async function handleDismiss(eventId: string) {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('userId')
    if (!userId) return

    const res = await fetch('/api/filingcontrol/notifications/dismiss', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, userId }),
    })

    if (res.ok) {
      setEvents((prev) => prev.filter((e) => e.id !== eventId))
    }
  }

  if (loading) {
    return (
      <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white">
        <h2 className="text-sm font-semibold text-[var(--fc-navy)] uppercase tracking-wider mb-3">
          Notifications
        </h2>
        <p className="text-sm text-[var(--fc-slate-400)]">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white">
        <h2 className="text-sm font-semibold text-[var(--fc-navy)] uppercase tracking-wider mb-3">
          Notifications
        </h2>
        <p className="text-sm text-[var(--fc-slate-400)]">
          Unable to load notifications.
        </p>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white">
        <h2 className="text-sm font-semibold text-[var(--fc-navy)] uppercase tracking-wider mb-3">
          Notifications
        </h2>
        <p className="text-sm text-[var(--fc-slate-400)]">
          No pending notifications.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-[var(--fc-slate-200)] rounded-lg bg-white">
      <div className="p-4 border-b border-[var(--fc-slate-100)]">
        <h2 className="text-sm font-semibold text-[var(--fc-navy)] uppercase tracking-wider">
          Notifications
        </h2>
      </div>
      <div className="divide-y divide-[var(--fc-slate-100)]">
        {events.map((event) => {
          const style = EVENT_STYLES[event.event_type] || EVENT_STYLES.DUE_SOON_90
          const label = EVENT_LABELS[event.event_type] || event.event_type

          return (
            <div key={event.id} className="p-4 flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${style.bg} ${style.text}`}
                  >
                    {label}
                  </span>
                  <span className="text-xs text-[var(--fc-slate-400)]">
                    {formatEventDate(event.created_at)}
                  </span>
                </div>
                <p className="text-sm text-[var(--fc-navy)]">
                  {event.payload.form} — due {event.payload.dueDate}
                </p>
                {event.event_type === 'STATUS_CHANGED' && event.payload.previousStatus && (
                  <p className="text-xs text-[var(--fc-slate-500)] mt-0.5">
                    Changed from {event.payload.previousStatus} to {event.payload.status}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDismiss(event.id)}
                className="shrink-0 text-xs text-[var(--fc-slate-400)] hover:text-[var(--fc-navy)] transition-colors"
                title="Dismiss"
              >
                Dismiss
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
