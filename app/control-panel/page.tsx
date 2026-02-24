// app/control-panel/page.tsx
// Institutional landing page for the Foreign-Owned LLC Compliance Control Panel.

import Link from 'next/link'

export default function ControlPanelLanding() {
  return (
    <div className="bg-surface min-h-screen">
      {/* ── Nav ──────────────────────────────────────────────────── */}
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link href="/" className="text-sm text-muted hover:text-ink">
          EchoLegal
        </Link>
        <Link
          href="/control-panel/app"
          className="text-sm font-medium text-ink hover:text-accent"
        >
          Sign In
        </Link>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
        <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-ink">
          Foreign-Owned U.S. LLC{' '}
          <br className="hidden sm:block" />
          Compliance Control Panel
        </h1>
        <p className="mt-6 text-base text-muted max-w-prose mx-auto">
          A structured deadline and filing engine for non-resident founders
          operating U.S. single-member LLCs.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/control-panel/app/onboarding" className="btn-primary">
            Start Free
          </Link>
          <a href="#how-it-works" className="btn-secondary">
            View How It Works
          </a>
        </div>
      </section>

      {/* ── Why this tool exists ─────────────────────────────────── */}
      <section className="border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-spacing">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink">
            Why this tool exists
          </h2>
          <div className="mt-8 space-y-4 text-base text-ink leading-relaxed">
            <p>
              Foreign-owned U.S. LLCs have federal and state filing obligations
              even with no income. The IRS requires annual informational returns,
              and most states impose their own reporting deadlines.
            </p>
            <p>
              Missing Form 5472 / 1120 filings may trigger penalties of $25,000
              or more per return. State annual reports and franchise taxes carry
              separate deadlines and consequences that vary by jurisdiction.
            </p>
            <p>
              Many non-resident founders rely on fragmented advice, informal
              checklists, or spreadsheets that lack authority references and
              deadline calculations. This system addresses that gap.
            </p>
          </div>
        </div>
      </section>

      {/* ── What the system does ──────────────────────────────────── */}
      <section className="border-t border-stone-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-spacing">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink">
            What the system does
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              'Maps applicable federal and state filings based on your LLC profile',
              'Calculates due dates from formation date and fiscal year end',
              'Tracks compliance status across all obligations',
              'Provides authority references — IRS, FinCEN, state statutes',
              'Displays risk and penalty context for each filing',
              'Sends automated reminder emails (Pro subscription)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-ink">
                <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────── */}
      <section id="how-it-works" className="border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 section-spacing">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink text-center">
            How it works
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-10">
            {[
              {
                step: '1',
                title: 'Enter formation data',
                description:
                  'State of formation, formation date, fiscal year end, and EIN status.',
              },
              {
                step: '2',
                title: 'Engine evaluates obligations',
                description:
                  'The compliance engine determines applicable federal and state filings with calculated deadlines.',
              },
              {
                step: '3',
                title: 'Dashboard displays checklist',
                description:
                  'View your personalized compliance checklist with due dates, authority sources, and status tracking.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-stone-300 text-sm font-semibold text-ink">
                  {item.step}
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it is for ─────────────────────────────────────────── */}
      <section className="border-t border-stone-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-spacing">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink">
            Who it is for
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              'Non-resident founders who own a U.S. single-member LLC',
              'Online or remote businesses operating through a U.S. entity',
              'Founders who want structured compliance tracking with authority references',
              'Business owners managing their own filing obligations without a full-service CPA',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-ink">
                <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────── */}
      <section className="border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 section-spacing">
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-ink text-center">
            Subscription
          </h2>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* Free tier */}
            <div className="card">
              <h3 className="font-serif text-xl font-semibold text-ink">Free</h3>
              <p className="mt-1 text-sm text-muted">No credit card required</p>
              <ul className="mt-6 space-y-3">
                {[
                  'Full compliance checklist',
                  'Authority and risk summaries',
                  'Due date calculations',
                  'Status tracking',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink">
                    <span className="mt-1.5 block w-1 h-1 rounded-full bg-stone-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/control-panel/app/onboarding"
                  className="btn-secondary w-full text-center block"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Pro tier */}
            <div className="card border-accent">
              <h3 className="font-serif text-xl font-semibold text-ink">Pro</h3>
              <p className="mt-1 text-sm text-muted">$49 / month</p>
              <ul className="mt-6 space-y-3">
                {[
                  'Everything in Free',
                  'Automated reminder emails',
                  '30-day advance notifications',
                  'Ongoing deadline monitoring',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink">
                    <span className="mt-1.5 block w-1 h-1 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/control-panel/app/onboarding"
                  className="btn-primary w-full text-center block"
                >
                  Start Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ────────────────────────────────────────────── */}
      <section className="border-t border-stone-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-xs text-muted leading-relaxed text-center">
            This tool provides structured compliance tracking based on publicly
            available authority sources. It does not replace individualized legal
            or tax advice. Compliance requirements vary by jurisdiction and
            individual circumstances. Consult a qualified professional for advice
            specific to your situation.
          </p>
        </div>
      </section>
    </div>
  )
}
