'use client'

import { useFormStatus } from 'react-dom'
import { submitOnboarding } from './actions'

const STATES = [
  { value: 'FL', label: 'Florida (FL)' },
  { value: 'WY', label: 'Wyoming (WY)' },
  { value: 'DE', label: 'Delaware (DE)' },
  { value: 'NM', label: 'New Mexico (NM)' },
  { value: 'TX', label: 'Texas (TX)' },
]

const MONTHS = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: new Date(2000, i).toLocaleString('en-US', { month: 'long' }),
}))

export default function OnboardingPage() {
  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-xl font-serif font-bold">LLC Profile Setup</h1>
        <p className="mt-1 text-sm text-muted">
          Provide your LLC details to generate a personalized compliance checklist.
        </p>
      </div>

      <form
        action={submitOnboarding}
        className="border border-gray-200 rounded-lg p-6 bg-white space-y-4"
      >
        <div>
          <label htmlFor="company_name" className="block text-sm font-medium text-ink mb-1">
            Company Name
          </label>
          <input
            id="company_name"
            name="company_name"
            type="text"
            required
            placeholder="My LLC"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="state_of_formation" className="block text-sm font-medium text-ink mb-1">
            State of Formation
          </label>
          <select
            id="state_of_formation"
            name="state_of_formation"
            required
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          >
            <option value="">Select state...</option>
            {STATES.map(s => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="formation_date" className="block text-sm font-medium text-ink mb-1">
            Formation Date
          </label>
          <input
            id="formation_date"
            name="formation_date"
            type="date"
            required
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="ein_status" className="block text-sm font-medium text-ink mb-1">
            EIN Status
          </label>
          <select
            id="ein_status"
            name="ein_status"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          >
            <option value="not_applied">Not yet applied</option>
            <option value="applied_pending">Applied, pending</option>
            <option value="received">Received</option>
          </select>
        </div>

        <div>
          <label htmlFor="tax_classification" className="block text-sm font-medium text-ink mb-1">
            Tax Classification
          </label>
          <select
            id="tax_classification"
            name="tax_classification"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          >
            <option value="disregarded_entity">Disregarded Entity (default for SMLLC)</option>
            <option value="c_corp">C Corporation</option>
            <option value="s_corp">S Corporation</option>
            <option value="partnership">Partnership</option>
          </select>
        </div>

        <div>
          <label htmlFor="fiscal_year_end_month" className="block text-sm font-medium text-ink mb-1">
            Fiscal Year End Month
          </label>
          <select
            id="fiscal_year_end_month"
            name="fiscal_year_end_month"
            defaultValue="12"
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
          >
            {MONTHS.map(m => (
              <option key={m.value} value={m.value}>
                {m.label} ({m.value})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="has_us_bank_account"
            name="has_us_bank_account"
            type="checkbox"
            className="rounded border-gray-300"
          />
          <label htmlFor="has_us_bank_account" className="text-sm text-ink">
            I have a US bank account
          </label>
        </div>

        <SubmitButton />
      </form>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 text-sm font-medium text-white bg-ink rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Generating...' : 'Generate Compliance Checklist'}
    </button>
  )
}
