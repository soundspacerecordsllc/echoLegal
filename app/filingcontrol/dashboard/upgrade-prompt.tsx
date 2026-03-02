// app/filingcontrol/dashboard/upgrade-prompt.tsx
// Minimal inline upgrade entrypoint. No marketing, no pricing page.
'use client'

import { useState } from 'react'

export function UpgradePrompt() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showInput, setShowInput] = useState(false)

  async function handleUpgrade() {
    if (!showInput) {
      setShowInput(true)
      return
    }

    const trimmed = email.trim()
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Enter a valid email address.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/filingcontrol/billing/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Something went wrong.')
        setLoading(false)
        return
      }

      const { url } = await res.json()
      if (url) {
        window.location.href = url
      } else {
        setError('No checkout URL returned.')
        setLoading(false)
      }
    } catch {
      setError('Network error. Try again.')
      setLoading(false)
    }
  }

  return (
    <div className="border border-[var(--fc-slate-200)] rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-[var(--fc-slate-500)]">
          Email monitoring is available on PRO.
        </p>
        {!showInput && (
          <button
            onClick={handleUpgrade}
            className="shrink-0 px-4 py-2 text-sm font-medium text-white bg-[var(--fc-navy)] rounded-md hover:opacity-90 transition-opacity"
          >
            Enable Email Monitoring (PRO)
          </button>
        )}
      </div>

      {showInput && (
        <div className="mt-3 flex items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-3 py-2 text-sm border border-[var(--fc-slate-200)] rounded-md focus:outline-none focus:border-[var(--fc-navy)]"
            onKeyDown={(e) => e.key === 'Enter' && handleUpgrade()}
            autoFocus
          />
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="shrink-0 px-4 py-2 text-sm font-medium text-white bg-[var(--fc-navy)] rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Redirecting...' : 'Continue'}
          </button>
        </div>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      )}
    </div>
  )
}
