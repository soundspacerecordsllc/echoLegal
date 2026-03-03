// app/filingcontrol/page.tsx
// FilingControl landing page — foreign-owned LLC survival tool.

import Link from 'next/link'
import { FC_APP, FC_PLAN, FC_PLAN_FREE } from '@/lib/filingcontrol/config'

export default function FilingControlLanding() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="border-b border-[var(--fc-slate-200)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <span className="text-lg font-bold tracking-tight text-[var(--fc-navy)]">
            {FC_APP.name}
          </span>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href={FC_APP.pricingPath}
              className="text-[var(--fc-slate-500)] hover:text-[var(--fc-navy)] transition-colors"
            >
              Pricing
            </Link>
            <Link
              href={FC_APP.loginPath}
              className="px-4 py-1.5 text-sm font-medium text-white bg-[var(--fc-navy)] rounded-md hover:bg-[var(--fc-navy-light)] transition-colors"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fc-navy)]">
            Own a U.S. LLC as a Non-Resident?
            <br />
            Missing One Form Can Cost $25,000.
          </h1>
          <p className="mt-4 text-lg text-[var(--fc-slate-500)]">
            FilingControl tracks Form 5472, BOI, FBAR, and federal reporting deadlines for foreign-owned single-member LLCs.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href={FC_APP.loginPath}
              className="px-6 py-3 text-sm font-semibold text-white bg-[var(--fc-navy)] rounded-lg hover:bg-[var(--fc-navy-light)] transition-colors shadow-sm"
            >
              Get Started Free
            </Link>
            <Link
              href={FC_APP.pricingPath}
              className="px-6 py-3 text-sm font-semibold text-[var(--fc-navy)] bg-white rounded-lg border border-[var(--fc-slate-200)] hover:border-[var(--fc-slate-400)] transition-colors shadow-sm"
            >
              View Pricing
            </Link>
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <Link
              href="/filingcontrol/tool"
              className="text-sm text-[var(--fc-slate-500)] hover:text-[var(--fc-navy)] transition-colors underline underline-offset-4"
            >
              Try the filing checker
            </Link>
            <a
              href="#features"
              className="text-sm text-[var(--fc-slate-400)] hover:text-[var(--fc-slate-500)] transition-colors"
            >
              See what&apos;s tracked
            </a>
          </div>
        </section>

        {/* Value props */}
        <section id="features" className="border-t border-[var(--fc-slate-200)] bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
            <div className="grid sm:grid-cols-3 gap-8">
              <ValueProp
                title="IRS 5472 Deadline Engine"
                description="Automatic deadline calculation for Form 5472 + Pro Forma 1120 based on your fiscal year end."
              />
              <ValueProp
                title="BOI Compliance Tracking"
                description="FinCEN Beneficial Ownership deadlines based on your formation date. Never miss a filing window."
              />
              <ValueProp
                title="Penalty-Aware Reminders"
                description="30-day, 7-day, and 1-day alerts before deadlines. Overdue escalation so you act before penalties compound."
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-8 mt-8">
              <ValueProp
                title="Federal + State Alerts"
                description="Annual reports, franchise taxes, registered agent renewals — tracked per state of formation."
              />
              <ValueProp
                title="Built for Non-US Founders"
                description="Designed specifically for non-resident owners of U.S. single-member LLCs (disregarded entities)."
              />
            </div>
          </div>
        </section>

        {/* Pricing preview */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-xl font-bold text-[var(--fc-navy)]">
            Simple Pricing
          </h2>
          <p className="mt-2 text-sm text-[var(--fc-slate-500)]">
            Free to view deadlines. PRO for penalty alerts.
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white text-left w-56">
              <p className="text-sm font-semibold text-[var(--fc-slate-500)] uppercase tracking-wider">
                {FC_PLAN_FREE.name}
              </p>
              <p className="mt-1 text-3xl font-bold text-[var(--fc-navy)]">
                $0
              </p>
              <p className="mt-2 text-sm text-[var(--fc-slate-500)]">
                {FC_PLAN_FREE.description}
              </p>
            </div>
            <div className="border-2 border-[var(--fc-navy)] rounded-lg p-6 bg-white text-left w-56">
              <p className="text-sm font-semibold text-[var(--fc-navy)] uppercase tracking-wider">
                {FC_PLAN.name}
              </p>
              <p className="mt-1 text-3xl font-bold text-[var(--fc-navy)]">
                ${FC_PLAN.price}
                <span className="text-sm font-normal text-[var(--fc-slate-500)]">
                  /{FC_PLAN.interval}
                </span>
              </p>
              <p className="mt-2 text-sm text-[var(--fc-slate-500)]">
                {FC_PLAN.description}
              </p>
            </div>
          </div>
        </section>
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

function ValueProp({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-[var(--fc-navy)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--fc-slate-500)] leading-relaxed">
        {description}
      </p>
    </div>
  )
}
