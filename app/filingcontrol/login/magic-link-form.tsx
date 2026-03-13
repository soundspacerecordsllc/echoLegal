// app/filingcontrol/login/magic-link-form.tsx
// Client component: magic-link sign-in form using Supabase.
'use client'

import { useState } from 'react'

type FormState = 'idle' | 'submitting' | 'sent' | 'error'

export function MagicLinkForm() {
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = email.trim().toLowerCase()

    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMessage('Please enter a valid email address.')
      setFormState('error')
      return
    }

    setFormState('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/filingcontrol/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrorMessage(data.error || 'Failed to send sign-in link.')
        setFormState('error')
        return
      }

      setFormState('sent')
    } catch {
      setErrorMessage('Network error. Please try again.')
      setFormState('error')
    }
  }

  if (formState === 'sent') {
    return (
      <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white text-center">
        <p className="text-sm font-medium text-[var(--fc-navy)]">
          Check your email
        </p>
        <p className="mt-2 text-sm text-[var(--fc-slate-500)]">
          We sent a sign-in link to <strong>{email}</strong>.
          Click the link in the email to access your dashboard.
        </p>
        <button
          onClick={() => {
            setFormState('idle')
            setEmail('')
          }}
          className="mt-4 text-xs text-[var(--fc-slate-400)] hover:text-[var(--fc-navy)] transition-colors underline underline-offset-2"
        >
          Use a different email
        </button>
      </div>
    )
  }

  return (
    <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--fc-navy)] mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--fc-navy)]"
            disabled={formState === 'submitting'}
            autoFocus
          />
        </div>
        <button
          type="submit"
          disabled={formState === 'submitting'}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-[var(--fc-navy)] rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {formState === 'submitting' ? 'Sending...' : 'Send Sign-In Link'}
        </button>
        <p className="text-xs text-center text-[var(--fc-slate-400)]">
          No password required. We&apos;ll email you a secure sign-in link.
        </p>

        {formState === 'error' && errorMessage && (
          <p className="text-xs text-red-600 text-center">{errorMessage}</p>
        )}
      </form>
    </div>
  )
}
