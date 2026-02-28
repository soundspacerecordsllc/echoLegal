'use client'

// components/filingcontrol/ConversionGate.tsx
// Soft conversion gate modal. Captures email, persists user + entity + assessment
// via API routes. Placeholder auth — no production authentication.

import { useState } from 'react'

interface ConversionGateProps {
  open: boolean
  onClose: () => void
  /** Called after successful persistence. Receives userId and entityId. */
  onSaved?: (ids: { userId: string; entityId: string }) => void
  /** The compliance result JSON to persist as an assessment snapshot. */
  resultJSON?: Record<string, unknown> | null
}

export default function ConversionGate({
  open,
  onClose,
  onSaved,
  resultJSON,
}: ConversionGateProps) {
  const [email, setEmail] = useState('')
  const [entityName, setEntityName] = useState('')
  const [saving, setSaving] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (saving) return

    setSaving(true)
    setError(null)

    try {
      // 1. Create or find user
      const userRes = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })
      if (!userRes.ok) {
        const body = await userRes.json().catch(() => null)
        throw new Error(body?.error ?? 'Failed to create user')
      }
      const user = await userRes.json()

      // 2. Create entity
      const entityRes = await fetch('/api/entities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          name: entityName.trim() || 'Unnamed Entity',
          entityType: 'llc',
        }),
      })
      if (!entityRes.ok) {
        const body = await entityRes.json().catch(() => null)
        throw new Error(body?.error ?? 'Failed to create entity')
      }
      const entity = await entityRes.json()

      // 3. Save assessment snapshot (if result available)
      if (resultJSON) {
        const result = resultJSON as {
          version?: string
          riskScore?: number
          riskLevel?: string
        }
        const assessmentRes = await fetch('/api/assessments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            entityId: entity.id,
            engineVersion: result.version ?? 'unknown',
            riskScore: result.riskScore ?? 0,
            riskLevel: result.riskLevel ?? 'LOW',
            resultJSON,
          }),
        })
        if (!assessmentRes.ok) {
          const body = await assessmentRes.json().catch(() => null)
          throw new Error(body?.error ?? 'Failed to save assessment')
        }
      }

      // Persist session references for dashboard
      sessionStorage.setItem('fc_user_id', user.id)
      sessionStorage.setItem('fc_entity_id', entity.id)

      setSubmitted(true)
      onSaved?.({ userId: user.id, entityId: entity.id })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-xl border border-[var(--fc-slate-200)] shadow-xl p-6">
        {submitted ? (
          <div className="text-center py-4">
            <p className="text-sm font-semibold text-[var(--fc-navy)]">
              Assessment saved.
            </p>
            <p className="mt-2 text-sm text-[var(--fc-slate-500)]">
              Your compliance assessment has been saved. View past assessments
              from the dashboard.
            </p>
            <div className="mt-6 flex gap-3 justify-center">
              <a
                href="/filingcontrol/dashboard"
                className="px-6 py-2 text-sm font-medium text-white bg-[var(--fc-navy)] rounded-lg hover:bg-[var(--fc-navy-light)] transition-colors"
              >
                Go to Dashboard
              </a>
              <button
                onClick={onClose}
                className="px-6 py-2 text-sm font-medium text-[var(--fc-navy)] border border-[var(--fc-slate-200)] rounded-lg hover:border-[var(--fc-slate-400)] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-[var(--fc-navy)]">
              Save Compliance Assessment
            </h2>
            <p className="mt-2 text-sm text-[var(--fc-slate-500)] leading-relaxed">
              Provide your email and entity name to save this assessment.
              You can view past assessments from the dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="gate-email"
                  className="block text-sm font-medium text-[var(--fc-navy)] mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="gate-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--fc-slate-400)]"
                />
              </div>
              <div>
                <label
                  htmlFor="gate-entity-name"
                  className="block text-sm font-medium text-[var(--fc-navy)] mb-1.5"
                >
                  Entity name
                  <span className="text-[var(--fc-slate-400)] font-normal ml-1">
                    (optional)
                  </span>
                </label>
                <input
                  id="gate-entity-name"
                  type="text"
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                  placeholder="My LLC"
                  className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--fc-slate-400)]"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={saving}
                className={`w-full px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                  saving
                    ? 'bg-[var(--fc-slate-200)] text-[var(--fc-slate-400)] cursor-not-allowed'
                    : 'text-white bg-[var(--fc-navy)] hover:bg-[var(--fc-navy-light)]'
                }`}
              >
                {saving ? 'Saving…' : 'Save Assessment'}
              </button>
            </form>

            <button
              onClick={onClose}
              className="mt-3 w-full text-center text-xs text-[var(--fc-slate-400)] hover:text-[var(--fc-slate-500)] transition-colors"
            >
              Not now
            </button>
          </>
        )}
      </div>
    </div>
  )
}
