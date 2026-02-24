// app/control-panel/page.tsx
// Landing / sign-in page for the Control Panel.

import Link from 'next/link'
import ComplianceDisclaimer from '@/components/control-panel/ComplianceDisclaimer'

export default function ControlPanelLanding() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="text-sm text-muted hover:text-ink">
            EchoLegal
          </Link>
          <h1 className="mt-4 text-2xl font-serif font-bold tracking-tight">
            LLC Compliance Control Panel
          </h1>
          <p className="mt-2 text-sm text-muted">
            Compliance tracking for foreign-owned single-member LLCs.
          </p>
        </div>

        {/* Auth placeholder */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <p className="text-sm text-muted text-center">
            Sign-in functionality will be connected to Supabase Auth.
          </p>
          {/* TODO: Replace with Supabase Auth UI or custom form */}
          <div className="mt-4 space-y-3">
            <button
              disabled
              className="w-full px-4 py-2 text-sm font-medium text-white bg-ink rounded-md opacity-50 cursor-not-allowed"
            >
              Sign In with Email
            </button>
            <p className="text-xs text-center text-muted">
              New here?{' '}
              <span className="underline">Create an account</span>
            </p>
          </div>
        </div>

        <ComplianceDisclaimer />
      </div>
    </div>
  )
}
