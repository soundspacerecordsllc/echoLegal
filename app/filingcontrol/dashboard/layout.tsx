// app/filingcontrol/dashboard/layout.tsx
// Authenticated layout for the FilingControl dashboard.
// All routes under /filingcontrol/dashboard require authentication.

import Link from 'next/link'
import { FC_APP } from '@/lib/filingcontrol/config'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Check auth with requireAuth() and redirect if not authenticated.
  // For scaffolding, render layout without auth check.

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-[var(--fc-slate-200)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link
            href={FC_APP.dashboardPath}
            className="text-lg font-bold tracking-tight text-[var(--fc-navy)]"
          >
            {FC_APP.name}
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href={FC_APP.dashboardPath}
              className="text-[var(--fc-slate-500)] hover:text-[var(--fc-navy)] transition-colors"
            >
              Checklist
            </Link>
            <Link
              href={`${FC_APP.dashboardPath}/settings`}
              className="text-[var(--fc-slate-500)] hover:text-[var(--fc-navy)] transition-colors"
            >
              Settings
            </Link>
            <Link
              href={`${FC_APP.dashboardPath}/billing`}
              className="text-[var(--fc-slate-500)] hover:text-[var(--fc-navy)] transition-colors"
            >
              Billing
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        {children}
      </main>

      {/* Footer disclaimer */}
      <footer className="max-w-5xl mx-auto w-full px-4 sm:px-6 pb-8">
        <div className="border border-[var(--fc-slate-200)] bg-[var(--fc-slate-50)] rounded-md px-4 py-3 text-xs text-[var(--fc-slate-400)] leading-relaxed">
          <p>
            <strong className="text-[var(--fc-slate-500)]">Disclaimer:</strong>{' '}
            This tool provides general compliance tracking for informational
            purposes only. It does not constitute legal, tax, or professional
            advice. Consult a qualified professional for your situation.
          </p>
        </div>
      </footer>
    </div>
  )
}
