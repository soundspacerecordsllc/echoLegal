'use client'

// app/filingcontrol/tool/page.tsx
// Interactive filing obligation checker. Client-side only, no DB, no auth.

import { useState } from 'react'
import Link from 'next/link'
import {
  computeObligations,
  type EntityType,
  type FilingInput,
  type Obligation,
} from '../lib/obligations'

const ENTITY_OPTIONS: { value: EntityType; label: string }[] = [
  { value: 'llc', label: 'LLC' },
  { value: 'corporation', label: 'Corporation' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'sole_prop', label: 'Sole Proprietorship' },
]

const CURRENT_YEAR = new Date().getFullYear()

export default function FilingToolPage() {
  const [entityType, setEntityType] = useState<EntityType>('llc')
  const [foreignOwned, setForeignOwned] = useState(true)
  const [usBusinessActivity, setUsBusinessActivity] = useState(true)
  const [hasUSIncome, setHasUSIncome] = useState(true)
  const [taxYear, setTaxYear] = useState(CURRENT_YEAR)
  const [state, setState] = useState('')
  const [results, setResults] = useState<Obligation[] | null>(null)

  function handleCheck() {
    const input: FilingInput = {
      entityType,
      foreignOwned,
      usBusinessActivity,
      hasUSIncome,
      taxYear,
      state,
    }
    setResults(computeObligations(input))
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
            Filing Obligation Checker
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--fc-navy)]">
          Filing Obligation Checker
        </h1>
        <p className="mt-2 text-sm text-[var(--fc-slate-500)]">
          Answer a few questions about your entity to see likely U.S. filing obligations.
        </p>

        {/* Form */}
        <div className="mt-8 border border-[var(--fc-slate-200)] rounded-lg bg-white p-6 space-y-5">
          {/* Entity type */}
          <FieldWrapper label="Entity type">
            <select
              value={entityType}
              onChange={(e) => setEntityType(e.target.value as EntityType)}
              className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white"
            >
              {ENTITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </FieldWrapper>

          {/* Foreign owned */}
          <FieldWrapper label="Foreign-owned?">
            <ToggleRow
              value={foreignOwned}
              onChange={setForeignOwned}
              yesLabel="Yes"
              noLabel="No"
            />
          </FieldWrapper>

          {/* US business activity */}
          <FieldWrapper label="U.S. business activity?">
            <ToggleRow
              value={usBusinessActivity}
              onChange={setUsBusinessActivity}
              yesLabel="Yes"
              noLabel="No"
            />
          </FieldWrapper>

          {/* US income */}
          <FieldWrapper label="U.S.-source income?">
            <ToggleRow
              value={hasUSIncome}
              onChange={setHasUSIncome}
              yesLabel="Yes"
              noLabel="No"
            />
          </FieldWrapper>

          {/* Tax year */}
          <FieldWrapper label="Tax year">
            <input
              type="number"
              value={taxYear}
              onChange={(e) => setTaxYear(Number(e.target.value) || CURRENT_YEAR)}
              min={2020}
              max={CURRENT_YEAR + 1}
              className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white"
            />
          </FieldWrapper>

          {/* State */}
          <FieldWrapper label="State of formation (optional)">
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="e.g. FL, WY, DE"
              maxLength={2}
              className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white uppercase"
            />
          </FieldWrapper>

          <button
            onClick={handleCheck}
            className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-[var(--fc-navy)] rounded-lg hover:bg-[var(--fc-navy-light)] transition-colors"
          >
            Check Obligations
          </button>
        </div>

        {/* Results */}
        {results !== null && (
          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-[var(--fc-navy)]">
              Likely Filing Obligations ({results.length})
            </h2>
            {results.length === 0 ? (
              <p className="text-sm text-[var(--fc-slate-500)]">
                No specific obligations identified for this combination. State-level
                requirements may still apply.
              </p>
            ) : (
              <div className="border border-[var(--fc-slate-200)] rounded-lg bg-white divide-y divide-[var(--fc-slate-100)]">
                {results.map((ob, i) => (
                  <div key={i} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium text-[var(--fc-navy)]">
                        {ob.title}
                      </p>
                      {ob.form && (
                        <span className="shrink-0 text-xs px-2 py-0.5 rounded bg-[var(--fc-slate-100)] text-[var(--fc-slate-500)]">
                          {ob.form}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-[var(--fc-slate-400)]">
                      {ob.authority}
                    </p>
                    <p className="mt-1.5 text-sm text-[var(--fc-slate-500)] leading-relaxed">
                      {ob.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--fc-slate-200)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-[var(--fc-slate-400)] leading-relaxed">
          <p>
            Not legal or tax advice. This is an educational tool that provides
            general information about common U.S. filing obligations. Consult a
            qualified professional for your situation.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FieldWrapper({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--fc-navy)] mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}

function ToggleRow({
  value,
  onChange,
  yesLabel,
  noLabel,
}: {
  value: boolean
  onChange: (v: boolean) => void
  yesLabel: string
  noLabel: string
}) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${
          value
            ? 'bg-[var(--fc-navy)] text-white border-[var(--fc-navy)]'
            : 'bg-white text-[var(--fc-slate-500)] border-[var(--fc-slate-200)] hover:border-[var(--fc-slate-400)]'
        }`}
      >
        {yesLabel}
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${
          !value
            ? 'bg-[var(--fc-navy)] text-white border-[var(--fc-navy)]'
            : 'bg-white text-[var(--fc-slate-500)] border-[var(--fc-slate-200)] hover:border-[var(--fc-slate-400)]'
        }`}
      >
        {noLabel}
      </button>
    </div>
  )
}
