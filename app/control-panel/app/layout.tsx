// app/control-panel/app/layout.tsx
// Authenticated layout for the Control Panel dashboard area.
// All routes under /control-panel/app require authentication.

import Link from 'next/link'
import ComplianceDisclaimer from '@/components/control-panel/ComplianceDisclaimer'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Check auth with requireAuth() and redirect if needed.
  // For scaffolding, render layout without auth check.

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link
            href="/control-panel/app"
            className="text-lg font-bold tracking-tight text-ink"
          >
            EchoLegal <span className="text-muted font-normal text-sm">/ Compliance</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/control-panel/app/checklist"
              className="text-muted hover:text-ink transition-colors"
            >
              Checklist
            </Link>
            <Link
              href="/control-panel/app/calendar"
              className="text-muted hover:text-ink transition-colors"
            >
              Calendar
            </Link>
            <Link
              href="/control-panel/app/settings"
              className="text-muted hover:text-ink transition-colors"
            >
              Settings
            </Link>
            <Link
              href="/control-panel/billing"
              className="text-muted hover:text-ink transition-colors"
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
        <ComplianceDisclaimer />
      </footer>
    </div>
  )
}
