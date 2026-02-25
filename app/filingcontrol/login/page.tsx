// app/filingcontrol/login/page.tsx
// FilingControl sign-in page. Reuses shared Supabase auth.

import Link from 'next/link'
import { FC_APP } from '@/lib/filingcontrol/config'

export const metadata = {
  title: 'Sign In — FilingControl',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link
            href={FC_APP.basePath}
            className="text-sm text-[var(--fc-slate-500)] hover:text-[var(--fc-navy)] transition-colors"
          >
            {FC_APP.name}
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-[var(--fc-navy)]">
            Sign in to {FC_APP.name}
          </h1>
          <p className="mt-2 text-sm text-[var(--fc-slate-500)]">
            {FC_APP.tagline}
          </p>
        </div>

        {/* Auth form */}
        <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--fc-navy)] mb-1">
                Email
              </label>
              <input
                type="email"
                disabled
                placeholder="you@example.com"
                className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-[var(--fc-slate-50)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--fc-navy)] mb-1">
                Password
              </label>
              <input
                type="password"
                disabled
                placeholder="Enter your password"
                className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-[var(--fc-slate-50)]"
              />
            </div>
            <button
              disabled
              className="w-full px-4 py-2 text-sm font-medium text-white bg-[var(--fc-navy)] rounded-md opacity-50 cursor-not-allowed"
            >
              Sign In
            </button>
            <p className="text-xs text-center text-[var(--fc-slate-400)]">
              No account?{' '}
              <span className="underline">Create one</span>
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border border-[var(--fc-slate-200)] bg-[var(--fc-slate-50)] rounded-md px-4 py-3 text-xs text-[var(--fc-slate-400)] leading-relaxed">
          <p>
            <strong className="text-[var(--fc-slate-500)]">Disclaimer:</strong>{' '}
            This tool provides general compliance tracking for informational
            purposes only. It does not constitute legal, tax, or professional
            advice.
          </p>
        </div>
      </div>
    </div>
  )
}
