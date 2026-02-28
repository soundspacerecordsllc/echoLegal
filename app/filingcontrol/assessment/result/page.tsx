'use client'

// app/filingcontrol/assessment/result/page.tsx
// Displays ComplianceResult from sessionStorage.
// Sections: risk badge, required filings, statutory exposure, collapsible legal basis.
// Includes conversion gate for "Download Full Report."

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ConversionGate from '@/components/filingcontrol/ConversionGate'
import type { ComplianceResult } from '@/lib/engine/types'

const RISK_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  LOW: {
    bg: 'bg-emerald-50 border-emerald-200',
    text: 'text-emerald-700',
    label: 'Low Risk',
  },
  MODERATE: {
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-700',
    label: 'Moderate Risk',
  },
  HIGH: {
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-700',
    label: 'High Risk',
  },
}

export default function AssessmentResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<ComplianceResult | null>(null)
  const [legalBasisOpen, setLegalBasisOpen] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('fc_compliance_result')
    if (!stored) {
      router.replace('/filingcontrol/assessment')
      return
    }
    try {
      setResult(JSON.parse(stored) as ComplianceResult)
    } catch {
      router.replace('/filingcontrol/assessment')
    }
  }, [router])

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-[var(--fc-slate-400)]">Loading…</p>
      </div>
    )
  }

  const riskStyle = RISK_STYLES[result.riskLevel] ?? RISK_STYLES.LOW
  const totalExposure = result.penalties.reduce((sum, p) => sum + p.amount, 0)

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
            Assessment Result
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--fc-navy)]">
          Compliance Assessment Result
        </h1>
        <p className="mt-2 text-sm text-[var(--fc-slate-500)]">
          Based on the information provided, the following obligations and risk
          factors have been identified.
        </p>

        {/* Risk badge */}
        <div
          className={`mt-8 border rounded-lg p-5 ${riskStyle.bg}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-semibold ${riskStyle.text}`}>
                {riskStyle.label}
              </p>
              <p className="mt-0.5 text-xs text-[var(--fc-slate-500)]">
                Risk score: {result.riskScore} / 130
              </p>
            </div>
            <span
              className={`text-2xl font-bold ${riskStyle.text}`}
            >
              {result.riskScore}
            </span>
          </div>
          <p className="mt-3 text-sm text-[var(--fc-slate-500)]">
            Entity classification: {result.entityClassification}
          </p>
        </div>

        {/* Required filings */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-[var(--fc-navy)] uppercase tracking-wider">
            Required Filings
          </h2>
          {result.requiredForms.length === 0 ? (
            <p className="mt-3 text-sm text-[var(--fc-slate-500)]">
              No specific federal filing obligations identified for this profile.
            </p>
          ) : (
            <ul className="mt-3 border border-[var(--fc-slate-200)] rounded-lg bg-white divide-y divide-[var(--fc-slate-100)]">
              {result.requiredForms.map((form) => (
                <li
                  key={form}
                  className="px-4 py-3 text-sm text-[var(--fc-navy)]"
                >
                  {form}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Statutory exposure */}
        {result.penalties.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-semibold text-[var(--fc-navy)] uppercase tracking-wider">
              Statutory Exposure
            </h2>
            <div className="mt-3 border border-[var(--fc-slate-200)] rounded-lg bg-white divide-y divide-[var(--fc-slate-100)]">
              {result.penalties.map((p) => (
                <div key={p.code} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[var(--fc-navy)]">
                      {p.description}
                    </p>
                    <span className="text-sm font-semibold text-red-600">
                      ${p.amount.toLocaleString('en-US')} {p.currency}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--fc-slate-400)]">
                    {p.citation}
                  </p>
                </div>
              ))}
              {result.penalties.length > 1 && (
                <div className="px-4 py-3 flex items-center justify-between">
                  <p className="text-sm font-medium text-[var(--fc-navy)]">
                    Total potential exposure
                  </p>
                  <span className="text-sm font-bold text-red-600">
                    ${totalExposure.toLocaleString('en-US')} USD
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Legal basis — collapsible */}
        {result.legalBasis.length > 0 && (
          <section className="mt-8">
            <button
              onClick={() => setLegalBasisOpen(!legalBasisOpen)}
              className="flex items-center gap-2 text-sm font-semibold text-[var(--fc-navy)] uppercase tracking-wider hover:text-[var(--fc-navy-light)] transition-colors"
            >
              <svg
                className={`w-3.5 h-3.5 transition-transform ${
                  legalBasisOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Legal Basis
            </button>
            {legalBasisOpen && (
              <ul className="mt-3 border border-[var(--fc-slate-200)] rounded-lg bg-white divide-y divide-[var(--fc-slate-100)]">
                {result.legalBasis.map((cite) => (
                  <li
                    key={cite}
                    className="px-4 py-3 text-sm text-[var(--fc-slate-500)]"
                  >
                    {cite}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setGateOpen(true)}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[var(--fc-navy)] rounded-lg hover:bg-[var(--fc-navy-light)] transition-colors"
          >
            Save Assessment
          </button>
          <Link
            href="/filingcontrol/assessment"
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-[var(--fc-navy)] text-center border border-[var(--fc-slate-200)] rounded-lg hover:border-[var(--fc-slate-400)] transition-colors"
          >
            Start New Assessment
          </Link>
        </div>

        {/* Version */}
        <p className="mt-6 text-xs text-[var(--fc-slate-400)] text-center">
          Engine {result.version}
        </p>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-[var(--fc-slate-400)] text-center leading-relaxed">
          Not legal or tax advice. This assessment provides general information
          about common U.S. filing obligations based on the information
          provided. Consult a qualified professional for your situation.
        </p>
      </main>

      {/* Conversion gate modal */}
      <ConversionGate
        open={gateOpen}
        onClose={() => setGateOpen(false)}
        resultJSON={result as unknown as Record<string, unknown>}
      />
    </div>
  )
}
