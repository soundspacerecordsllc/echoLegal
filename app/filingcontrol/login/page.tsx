// app/filingcontrol/login/page.tsx
// FilingControl sign-in page. Uses Supabase magic-link auth.

import Link from 'next/link'
import { FC_APP } from '@/lib/filingcontrol/config'
import { getSessionUser } from '@/lib/filingcontrol/auth'
import { redirect } from 'next/navigation'
import { MagicLinkForm } from './magic-link-form'

export const metadata = {
  title: 'Sign In — FilingControl',
}

export default async function LoginPage() {
  // If already authenticated, redirect to dashboard
  const user = await getSessionUser()
  if (user) {
    redirect(FC_APP.dashboardPath)
  }

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
            Foreign-owned LLC compliance tracking.
          </p>
        </div>

        {/* Auth form */}
        <MagicLinkForm />

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
