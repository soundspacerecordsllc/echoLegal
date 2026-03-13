// app/filingcontrol/onboarding/onboarding-form.tsx
// Client component: collects LLC profile and creates entity via API.
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
]

type FormState = 'idle' | 'submitting' | 'error'

export function OnboardingForm() {
  const router = useRouter()
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Required fields
  const [companyName, setCompanyName] = useState('')
  const [stateOfFormation, setStateOfFormation] = useState('')
  const [formationDate, setFormationDate] = useState('')
  const [fiscalYearEndMonth, setFiscalYearEndMonth] = useState('12')

  // Optional fields
  const [einStatus, setEinStatus] = useState('not_applied')
  const [hasItin, setHasItin] = useState(false)
  const [hasForeignAccounts, setHasForeignAccounts] = useState(false)
  const [hasRegisteredAgent, setHasRegisteredAgent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!companyName.trim()) {
      setErrorMessage('Company name is required.')
      setFormState('error')
      return
    }
    if (!stateOfFormation) {
      setErrorMessage('State of formation is required.')
      setFormState('error')
      return
    }
    if (!formationDate) {
      setErrorMessage('Formation date is required.')
      setFormState('error')
      return
    }

    setFormState('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/filingcontrol/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: companyName.trim(),
          state_of_formation: stateOfFormation,
          formation_date: formationDate,
          fiscal_year_end_month: parseInt(fiscalYearEndMonth, 10),
          ein_status: einStatus,
          foreign_owner: true,
          has_itin: hasItin,
          has_foreign_accounts: hasForeignAccounts,
          has_registered_agent: hasRegisteredAgent,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrorMessage(data.error || 'Failed to set up entity.')
        setFormState('error')
        return
      }

      // Redirect to dashboard - entity is now created
      router.push('/filingcontrol/dashboard')
    } catch {
      setErrorMessage('Network error. Please try again.')
      setFormState('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white space-y-5">
      {/* Foreign-owner confirmation */}
      <div className="border border-amber-200 bg-amber-50 rounded-md p-3">
        <p className="text-sm font-medium text-amber-800">
          Foreign-Owned LLC Confirmation
        </p>
        <p className="mt-1 text-xs text-amber-700">
          FilingControl is designed for non-US residents who own a US single-member LLC.
          By completing setup, you confirm this entity has foreign ownership.
        </p>
      </div>

      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium text-[var(--fc-navy)] mb-1">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="e.g. Acme Holdings LLC"
          className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--fc-navy)]"
          disabled={formState === 'submitting'}
        />
      </div>

      {/* State of Formation */}
      <div>
        <label className="block text-sm font-medium text-[var(--fc-navy)] mb-1">
          State of Formation <span className="text-red-500">*</span>
        </label>
        <select
          value={stateOfFormation}
          onChange={(e) => setStateOfFormation(e.target.value)}
          className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--fc-navy)]"
          disabled={formState === 'submitting'}
        >
          <option value="">Select state...</option>
          {US_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Formation Date */}
      <div>
        <label className="block text-sm font-medium text-[var(--fc-navy)] mb-1">
          Formation Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={formationDate}
          onChange={(e) => setFormationDate(e.target.value)}
          className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--fc-navy)]"
          disabled={formState === 'submitting'}
        />
      </div>

      {/* Fiscal Year End */}
      <div>
        <label className="block text-sm font-medium text-[var(--fc-navy)] mb-1">
          Fiscal Year End Month
        </label>
        <select
          value={fiscalYearEndMonth}
          onChange={(e) => setFiscalYearEndMonth(e.target.value)}
          className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--fc-navy)]"
          disabled={formState === 'submitting'}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>
              {new Date(2024, m - 1).toLocaleString('en-US', { month: 'long' })}
              {m === 12 ? ' (Calendar year — most common)' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* EIN Status */}
      <div>
        <label className="block text-sm font-medium text-[var(--fc-navy)] mb-1">
          EIN Status
        </label>
        <select
          value={einStatus}
          onChange={(e) => setEinStatus(e.target.value)}
          className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--fc-navy)]"
          disabled={formState === 'submitting'}
        >
          <option value="not_applied">Not yet applied</option>
          <option value="applied_pending">Applied, pending</option>
          <option value="received">Already received</option>
        </select>
      </div>

      {/* Optional boolean fields */}
      <div className="space-y-3">
        <p className="text-xs text-[var(--fc-slate-500)] uppercase tracking-wider font-medium">
          Optional — helps tailor your checklist
        </p>
        <label className="flex items-center gap-2 text-sm text-[var(--fc-navy)]">
          <input
            type="checkbox"
            checked={hasItin}
            onChange={(e) => setHasItin(e.target.checked)}
            className="rounded border-[var(--fc-slate-200)]"
            disabled={formState === 'submitting'}
          />
          I already have an ITIN
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--fc-navy)]">
          <input
            type="checkbox"
            checked={hasForeignAccounts}
            onChange={(e) => setHasForeignAccounts(e.target.checked)}
            className="rounded border-[var(--fc-slate-200)]"
            disabled={formState === 'submitting'}
          />
          I have foreign financial accounts exceeding $10,000
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--fc-navy)]">
          <input
            type="checkbox"
            checked={hasRegisteredAgent}
            onChange={(e) => setHasRegisteredAgent(e.target.checked)}
            className="rounded border-[var(--fc-slate-200)]"
            disabled={formState === 'submitting'}
          />
          I already have a registered agent in place
        </label>
      </div>

      {/* Error */}
      {formState === 'error' && errorMessage && (
        <p className="text-xs text-red-600">{errorMessage}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-[var(--fc-navy)] rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {formState === 'submitting' ? 'Setting up...' : 'Generate My Compliance Checklist'}
      </button>
    </form>
  )
}
