'use client'

// app/filingcontrol/dashboard/page.tsx
// FilingControl dashboard — shows saved entities and assessment history.
// Reads fc_entity_id from sessionStorage. No production auth.

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { FCAssessment } from '@/lib/filingcontrol/assessment-types'

const RISK_BADGE: Record<string, { bg: string; text: string }> = {
  LOW: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  MODERATE: { bg: 'bg-amber-50', text: 'text-amber-700' },
  HIGH: { bg: 'bg-red-50', text: 'text-red-700' },
}

export default function DashboardPage() {
  const [entityId, setEntityId] = useState<string | null>(null)
  const [assessments, setAssessments] = useState<FCAssessment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const id = sessionStorage.getItem('fc_entity_id')
    if (!id) {
      setLoading(false)
      return
    }
    setEntityId(id)

    fetch(`/api/assessments?entityId=${encodeURIComponent(id)}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => null)
          throw new Error(body?.error ?? `Error ${res.status}`)
        }
        return res.json()
      })
      .then((data: FCAssessment[]) => {
        setAssessments(data)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load assessments')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-[var(--fc-slate-400)]">Loading…</p>
      </div>
    )
  }

  // No entity in session — prompt user to take an assessment
  if (!entityId) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-[var(--fc-navy)]">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-[var(--fc-slate-500)]">
            No saved entity found. Complete an assessment and save it to view
            your compliance history here.
          </p>
        </div>
        <Link
          href="/filingcontrol/assessment"
          className="inline-block px-6 py-2.5 text-sm font-semibold text-white bg-[var(--fc-navy)] rounded-lg hover:bg-[var(--fc-navy-light)] transition-colors"
        >
          Start Assessment
        </Link>
      </div>
    )
  }

  const latest = assessments[0] ?? null
  const latestResult = latest?.result_json as Record<string, unknown> | null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-[var(--fc-navy)]">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-[var(--fc-slate-500)]">
          Assessment history for your entity.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <SummaryCard
          title="Entity"
          value={
            (latestResult?.entityClassification as string) ?? '—'
          }
        />
        <SummaryCard
          title="Latest Risk Level"
          value={latest?.risk_level ?? '—'}
          badge={latest?.risk_level}
        />
        <SummaryCard
          title="Last Assessed"
          value={
            latest
              ? new Date(latest.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : '—'
          }
        />
      </div>

      {/* Action */}
      <Link
        href="/filingcontrol/assessment"
        className="inline-block px-6 py-2.5 text-sm font-semibold text-white bg-[var(--fc-navy)] rounded-lg hover:bg-[var(--fc-navy-light)] transition-colors"
      >
        Re-run Assessment
      </Link>

      {/* Assessment history */}
      {assessments.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-[var(--fc-navy)] uppercase tracking-wider">
            Assessment History
          </h2>
          <div className="mt-3 border border-[var(--fc-slate-200)] rounded-lg bg-white divide-y divide-[var(--fc-slate-100)]">
            {assessments.map((a) => {
              const badge = RISK_BADGE[a.risk_level] ?? RISK_BADGE.LOW
              return (
                <div key={a.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--fc-navy)]">
                      Score: {a.risk_score} / 130
                    </p>
                    <p className="text-xs text-[var(--fc-slate-400)] mt-0.5">
                      Engine {a.engine_version} &middot;{' '}
                      {new Date(a.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded ${badge.bg} ${badge.text}`}
                  >
                    {a.risk_level}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

function SummaryCard({
  title,
  value,
  badge,
}: {
  title: string
  value: string
  badge?: string | null
}) {
  const badgeStyle = badge ? RISK_BADGE[badge] : null
  return (
    <div className="border border-[var(--fc-slate-200)] rounded-lg p-4 bg-white">
      <p className="text-xs text-[var(--fc-slate-500)] uppercase tracking-wider">
        {title}
      </p>
      {badgeStyle ? (
        <span
          className={`inline-block mt-1 text-sm font-bold px-2 py-0.5 rounded ${badgeStyle.bg} ${badgeStyle.text}`}
        >
          {value}
        </span>
      ) : (
        <p className="mt-1 text-2xl font-bold text-[var(--fc-navy)]">{value}</p>
      )}
    </div>
  )
}
