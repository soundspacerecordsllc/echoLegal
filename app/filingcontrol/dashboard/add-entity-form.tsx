// app/filingcontrol/dashboard/add-entity-form.tsx
// Client component: inline form to add a new entity.
// Handles 402 PLAN_LIMIT with upgrade callout.
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FC_APP } from '@/lib/filingcontrol/config'

type FormState = 'idle' | 'submitting' | 'success' | 'plan_limit' | 'error'

export function AddEntityForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [companyName, setCompanyName] = useState('')
  const [stateOfFormation, setStateOfFormation] = useState('')
  const [formationDate, setFormationDate] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [planLimitMessage, setPlanLimitMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!companyName.trim() || !stateOfFormation.trim() || !formationDate) {
      setErrorMessage('All fields are required.')
      setFormState('error')
      return
    }

    setFormState('submitting')
    setErrorMessage('')
    setPlanLimitMessage('')

    try {
      // Get token from sessionStorage (set by Supabase auth)
      const token = sessionStorage.getItem('fc_token')
      if (!token) {
        setErrorMessage('Not authenticated. Please log in.')
        setFormState('error')
        return
      }

      const res = await fetch('/api/filingcontrol/entities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company_name: companyName.trim(),
          state_of_formation: stateOfFormation.trim().toUpperCase(),
          formation_date: formationDate,
        }),
      })

      if (res.status === 402) {
        const data = await res.json()
        setPlanLimitMessage(
          data.message || 'FREE plan allows 1 entity. Upgrade to PRO for unlimited entities.'
        )
        setFormState('plan_limit')
        return
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrorMessage(data.error || 'Failed to create entity.')
        setFormState('error')
        return
      }

      setFormState('success')
      setCompanyName('')
      setStateOfFormation('')
      setFormationDate('')
    } catch {
      setErrorMessage('Network error. Please try again.')
      setFormState('error')
    }
  }

  return (
    <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--fc-slate-500)] mb-4">
        Add Entity
      </h2>

      {/* Plan limit callout */}
      {formState === 'plan_limit' && (
        <div className="mb-4 border border-amber-200 bg-amber-50 rounded-md p-3">
          <p className="text-sm font-medium text-amber-800">Entity Limit Reached</p>
          <p className="text-xs text-amber-700 mt-1">{planLimitMessage}</p>
          <Link
            href={`${FC_APP.pricingPath}`}
            className="inline-block mt-2 text-xs font-medium text-[var(--fc-navy)] underline underline-offset-2 hover:text-[var(--fc-navy-light)]"
          >
            Upgrade to PRO
          </Link>
        </div>
      )}

      {/* Success message */}
      {formState === 'success' && (
        <div className="mb-4 border border-green-200 bg-green-50 rounded-md p-3">
          <p className="text-sm font-medium text-green-800">Entity created successfully.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--fc-navy)] mb-1">
            Company Name
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Acme Holdings LLC"
            className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white"
            disabled={formState === 'submitting'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--fc-navy)] mb-1">
            State of Formation
          </label>
          <input
            type="text"
            value={stateOfFormation}
            onChange={(e) => setStateOfFormation(e.target.value)}
            placeholder="e.g. DE, WY, FL"
            maxLength={2}
            className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white uppercase"
            disabled={formState === 'submitting'}
          />
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
            disabled={formState === 'submitting'}
          />
        </div>

        {/* Error message */}
        {formState === 'error' && errorMessage && (
          <p className="text-xs text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={formState === 'submitting' || formState === 'plan_limit'}
          className="w-full px-4 py-2 text-sm font-semibold text-white bg-[var(--fc-navy)] rounded-md hover:bg-[var(--fc-navy-light)] transition-colors disabled:opacity-50"
        >
          {formState === 'submitting' ? 'Creating...' : 'Add Entity'}
        </button>
      </form>
    </div>
  )
}
