// app/filingcontrol/page.tsx
// FilingControl landing page. Clean, institutional. Navy/slate palette.

import Link from 'next/link'
import { FC_APP, FC_PLAN } from '@/lib/filingcontrol/config'

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
            Foreign-Owned LLC Compliance Survival Tool
          </h1>
          <p className="mt-4 text-lg text-[var(--fc-slate-500)]">
            Track IRS Form 5472, BOI reports, state filings, and penalty deadlines — built for non-US founders who own a US single-member LLC.
          </p>
          <p className="mt-2 text-sm text-[var(--fc-slate-400)]">
            Avoid $25,000 penalties. Know exactly what you owe, when it&apos;s due, and what happens if you miss it.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href={FC_APP.loginPath}
              className="px-6 py-3 text-sm font-semibold text-white bg-[var(--fc-navy)] rounded-lg hover:bg-[var(--fc-navy-light)] transition-colors shadow-sm"
            >
              Get Started
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
                title="Foreign-Owned LLC Checklist"
                description="Form 5472, pro forma 1120, BOI report, EIN, ITIN, state annual reports — every obligation a non-US LLC owner faces, with authority sources."
              />
              <ValueProp
                title="Penalty-Aware Deadlines"
                description="Calculated due dates based on your formation date and fiscal year. Risk labels for high-penalty items like Form 5472 ($25,000 per form)."
              />
              <ValueProp
                title="Deadline Alerts (PRO)"
                description="Calendar feed integration and penalty alerts before high-risk deadlines. Email reminders coming soon."
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
            One plan. Everything you need.
          </p>
          <div className="mt-6 inline-block border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white text-left">
            <p className="text-sm font-semibold text-[var(--fc-slate-500)] uppercase tracking-wider">
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
