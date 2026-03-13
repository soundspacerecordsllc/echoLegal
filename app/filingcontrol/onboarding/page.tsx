// app/filingcontrol/onboarding/page.tsx
// FilingControl onboarding: collects LLC profile to generate compliance checklist.
// Protected by auth. Creates an fc_entity for the user.

import Link from 'next/link'
import { FC_APP } from '@/lib/filingcontrol/config'
import { requireFCAuth } from '@/lib/filingcontrol/auth'
import { OnboardingForm } from './onboarding-form'

export const metadata = {
  title: 'Set Up Your Entity — FilingControl',
}

export default async function OnboardingPage() {
  const user = await requireFCAuth()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-[var(--fc-slate-200)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link
            href={FC_APP.basePath}
            className="text-lg font-bold tracking-tight text-[var(--fc-navy)]"
          >
            {FC_APP.name}
          </Link>
          <span className="text-xs text-[var(--fc-slate-400)]">{user.email}</span>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 sm:px-6 py-12">
        <div className="space-y-6">
          <div>
            <h1 className="text-xl font-bold text-[var(--fc-navy)]">
              Set Up Your Foreign-Owned LLC
            </h1>
            <p className="mt-1 text-sm text-[var(--fc-slate-500)]">
              Provide your LLC details to generate a personalized compliance
              checklist with calculated deadlines.
            </p>
          </div>

          <OnboardingForm />

          <div className="border border-[var(--fc-slate-200)] bg-[var(--fc-slate-50)] rounded-md px-4 py-3 text-xs text-[var(--fc-slate-400)] leading-relaxed">
            <p>
              <strong className="text-[var(--fc-slate-500)]">Disclaimer:</strong>{' '}
              This tool provides general compliance tracking for informational
              purposes only. It does not constitute legal, tax, or professional
              advice. Consult a qualified professional for your situation.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
