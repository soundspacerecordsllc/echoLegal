// app/control-panel/app/page.tsx
// Dashboard home. Shows summary of compliance status.

import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-serif font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Overview of your LLC compliance status.
        </p>
      </div>

      {/* Placeholder cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <DashboardCard
          title="Pending Items"
          value="--"
          href="/control-panel/app/checklist"
        />
        <DashboardCard
          title="Due This Month"
          value="--"
          href="/control-panel/app/calendar"
        />
        <DashboardCard
          title="Subscription"
          value="--"
          href="/control-panel/billing"
        />
      </div>

      <div className="border border-gray-200 rounded-lg p-6 bg-white text-center">
        <p className="text-sm text-muted">
          Complete onboarding to generate your personalized compliance checklist.
        </p>
        <Link
          href="/control-panel/app/onboarding"
          className="mt-3 inline-block px-4 py-2 text-sm font-medium text-white bg-ink rounded-md hover:bg-gray-800 transition-colors"
        >
          Start Onboarding
        </Link>
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  value,
  href,
}: {
  title: string
  value: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="border border-gray-200 rounded-lg p-4 bg-white hover:border-gray-300 transition-colors block"
    >
      <p className="text-xs text-muted uppercase tracking-wider">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </Link>
  )
}
