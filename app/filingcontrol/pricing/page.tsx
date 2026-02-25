// app/filingcontrol/pricing/page.tsx
// FilingControl pricing page. Single plan: Pro $49/month.

import Link from 'next/link'
import { FC_APP, FC_PLAN } from '@/lib/filingcontrol/config'

export const metadata = {
  title: 'Pricing — FilingControl',
}

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="border-b border-[var(--fc-slate-200)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link
            href={FC_APP.basePath}
            className="text-lg font-bold tracking-tight text-[var(--fc-navy)]"
          >
            {FC_APP.name}
          </Link>
          <Link
            href={FC_APP.loginPath}
            className="px-4 py-1.5 text-sm font-medium text-white bg-[var(--fc-navy)] rounded-md hover:bg-[var(--fc-navy-light)] transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--fc-navy)]">
            Pricing
          </h1>
          <p className="mt-3 text-[var(--fc-slate-500)]">
            One plan. Full compliance tracking.
          </p>
        </div>

        {/* Plan card */}
        <div className="mt-12 max-w-md mx-auto border border-[var(--fc-slate-200)] rounded-lg bg-white overflow-hidden">
          <div className="p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--fc-slate-500)]">
              {FC_PLAN.name}
            </p>
            <p className="mt-2 text-4xl font-bold text-[var(--fc-navy)]">
              ${FC_PLAN.price}
              <span className="text-base font-normal text-[var(--fc-slate-500)]">
                /{FC_PLAN.interval}
              </span>
            </p>
            <p className="mt-3 text-sm text-[var(--fc-slate-500)]">
              {FC_PLAN.description}
            </p>

            <ul className="mt-6 space-y-3 text-sm text-[var(--fc-slate-700)]">
              <PlanFeature text="Personalized compliance checklist" />
              <PlanFeature text="Federal and state filing obligations" />
              <PlanFeature text="Calculated due dates" />
              <PlanFeature text="Status tracking per item" />
              <PlanFeature text="Email reminders before deadlines" />
              <PlanFeature text="Authority source references" />
            </ul>

            <Link
              href={FC_APP.loginPath}
              className="mt-8 block w-full px-4 py-3 text-sm font-semibold text-center text-white bg-[var(--fc-navy)] rounded-lg hover:bg-[var(--fc-navy-light)] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 border border-[var(--fc-slate-200)] bg-[var(--fc-slate-50)] rounded-md px-4 py-3 text-xs text-[var(--fc-slate-400)] leading-relaxed text-center">
          <p>
            <strong className="text-[var(--fc-slate-500)]">Disclaimer:</strong>{' '}
            FilingControl provides compliance tracking for informational
            purposes only. It does not constitute legal, tax, or professional
            advice. Consult a qualified professional for your situation.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--fc-slate-200)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between text-xs text-[var(--fc-slate-400)]">
          <span>{FC_APP.name}</span>
          <span>{FC_APP.domain}</span>
        </div>
      </footer>
    </div>
  )
}

function PlanFeature({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-[var(--fc-slate-400)] mt-0.5 shrink-0">&#10003;</span>
      <span>{text}</span>
    </li>
  )
}
