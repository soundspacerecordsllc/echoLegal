// app/filingcontrol/dashboard/sign-out-button.tsx
'use client'

import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    // Clear the session cookie via API
    await fetch('/api/filingcontrol/auth/sign-out', { method: 'POST' })
    // Clear client-side token storage
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('fc_token')
      sessionStorage.removeItem('fc_email')
    }
    router.push('/filingcontrol/login')
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-xs text-[var(--fc-slate-400)] hover:text-[var(--fc-navy)] transition-colors"
    >
      Sign Out
    </button>
  )
}
