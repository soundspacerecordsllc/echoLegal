'use client'

// app/filingcontrol/assessment/page.tsx
// Compliance assessment questionnaire. Client-side form state.
// Renders questions from questionnaire.ts, POSTs to /api/evaluate,
// stores result in sessionStorage, redirects to /filingcontrol/assessment/result.

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { QUESTIONS } from '@/lib/engine/questionnaire'

type Answers = Record<string, boolean | null>

const INITIAL_ANSWERS: Answers = Object.fromEntries(
  QUESTIONS.map((q) => [q.id, null]),
)

export default function AssessmentPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const allAnswered = QUESTIONS.every((q) => answers[q.id] !== null)

  function setAnswer(id: string, value: boolean) {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  async function handleSubmit() {
    if (!allAnswered || submitting) return

    setSubmitting(true)
    setError(null)

    // Build profile from answers — all values are boolean at this point
    const profile = Object.fromEntries(
      QUESTIONS.map((q) => [q.id, answers[q.id] as boolean]),
    )

    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? `Server error (${res.status})`)
      }

      const result = await res.json()
      sessionStorage.setItem('fc_compliance_result', JSON.stringify(result))
      router.push('/filingcontrol/assessment/result')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="border-b border-[var(--fc-slate-200)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link
            href="/filingcontrol"
            className="text-lg font-bold tracking-tight text-[var(--fc-navy)]"
          >
            FilingControl
          </Link>
          <span className="text-xs text-[var(--fc-slate-400)]">
            Compliance Assessment
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--fc-navy)]">
          Compliance Assessment
        </h1>
        <p className="mt-2 text-sm text-[var(--fc-slate-500)]">
          Answer the following questions about your entity. All fields are
          required.
        </p>

        {/* Questions */}
        <div className="mt-8 border border-[var(--fc-slate-200)] rounded-lg bg-white p-6 space-y-6">
          {QUESTIONS.map((q, idx) => (
            <div key={q.id}>
              <p className="text-sm font-medium text-[var(--fc-navy)] mb-2">
                <span className="text-[var(--fc-slate-400)] mr-1.5">
                  {idx + 1}.
                </span>
                {q.text}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAnswer(q.id, true)}
                  className={`flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${
                    answers[q.id] === true
                      ? 'bg-[var(--fc-navy)] text-white border-[var(--fc-navy)]'
                      : 'bg-white text-[var(--fc-slate-500)] border-[var(--fc-slate-200)] hover:border-[var(--fc-slate-400)]'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setAnswer(q.id, false)}
                  className={`flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${
                    answers[q.id] === false
                      ? 'bg-[var(--fc-navy)] text-white border-[var(--fc-navy)]'
                      : 'bg-white text-[var(--fc-slate-500)] border-[var(--fc-slate-200)] hover:border-[var(--fc-slate-400)]'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          ))}

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!allAnswered || submitting}
            className={`w-full px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
              allAnswered && !submitting
                ? 'bg-[var(--fc-navy)] text-white hover:bg-[var(--fc-navy-light)]'
                : 'bg-[var(--fc-slate-200)] text-[var(--fc-slate-400)] cursor-not-allowed'
            }`}
          >
            {submitting ? 'Evaluating…' : 'Evaluate Compliance'}
          </button>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-[var(--fc-slate-400)] text-center leading-relaxed">
          Not legal or tax advice. This tool provides general information about
          common U.S. filing obligations. Consult a qualified professional for
          your situation.
        </p>
      </main>
    </div>
  )
}
