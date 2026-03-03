// app/filingcontrol/dashboard/onboarding-gate.tsx
// Client component: requires onboarding fields before dashboard renders.
// Stores profile in sessionStorage. Redirects to inline form if missing.
'use client'

import { useState, useEffect } from 'react'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
]

export type OnboardingProfile = {
  stateOfFormation: string
  formationDate: string
  fiscalYearEndMonth: number
  foreignOwnerConfirmed: boolean
}

const STORAGE_KEY = 'fc_onboarding'

export function getOnboardingProfile(): OnboardingProfile | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (
      parsed.stateOfFormation &&
      parsed.formationDate &&
      parsed.fiscalYearEndMonth &&
      parsed.foreignOwnerConfirmed
    ) {
      return parsed as OnboardingProfile
    }
  } catch {
    // ignore
  }
  return null
}

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<OnboardingProfile | null | 'loading'>('loading')

  useEffect(() => {
    setProfile(getOnboardingProfile())
  }, [])

  if (profile === 'loading') return null

  if (profile) return <>{children}</>

  return <OnboardingForm onComplete={(p) => setProfile(p)} />
}

function OnboardingForm({
  onComplete,
}: {
  onComplete: (profile: OnboardingProfile) => void
}) {
  const [state, setState] = useState('')
  const [formationDate, setFormationDate] = useState('')
  const [fyMonth, setFyMonth] = useState('12')
  const [foreignOwner, setForeignOwner] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!state || !formationDate || !foreignOwner) {
      setError('All fields are required. You must confirm foreign ownership.')
      return
    }

    const profile: OnboardingProfile = {
      stateOfFormation: state,
      formationDate,
      fiscalYearEndMonth: parseInt(fyMonth, 10),
      foreignOwnerConfirmed: true,
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    onComplete(profile)
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white">
        <h2 className="text-lg font-bold text-[var(--fc-navy)]">
          Set Up Your LLC Profile
        </h2>
        <p className="mt-1 text-sm text-[var(--fc-slate-500)]">
          We need these details to calculate your filing deadlines.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--fc-navy)] mb-1">
              State of Formation
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white"
            >
              <option value="">Select state</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--fc-navy)] mb-1">
              Formation Date
            </label>
            <input
              type="date"
              value={formationDate}
              onChange={(e) => setFormationDate(e.target.value)}
              className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--fc-navy)] mb-1">
              Fiscal Year End Month
            </label>
            <select
              value={fyMonth}
              onChange={(e) => setFyMonth(e.target.value)}
              className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const m = i + 1
                const label = new Date(2000, i, 1).toLocaleString('en-US', { month: 'long' })
                return (
                  <option key={m} value={m}>
                    {label} ({m === 12 ? 'Calendar Year' : `Month ${m}`})
                  </option>
                )
              })}
            </select>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="foreign-owner"
              checked={foreignOwner}
              onChange={(e) => setForeignOwner(e.target.checked)}
              className="mt-0.5 rounded border-[var(--fc-slate-200)]"
            />
            <label htmlFor="foreign-owner" className="text-sm text-[var(--fc-slate-600)]">
              I confirm that this LLC is foreign-owned (non-US resident owner).
            </label>
          </div>

          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-semibold text-white bg-[var(--fc-navy)] rounded-md hover:bg-[var(--fc-navy-light)] transition-colors"
          >
            Continue to Dashboard
          </button>
        </form>
      </div>
    </div>
  )
}
