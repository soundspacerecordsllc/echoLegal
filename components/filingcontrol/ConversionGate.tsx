'use client'

// components/filingcontrol/ConversionGate.tsx
// Soft conversion gate modal. Displayed when user clicks "Download Full Report."
// Placeholder auth — captures intent only. No actual authentication.

import { useState } from 'react'

interface ConversionGateProps {
  open: boolean
  onClose: () => void
}

export default function ConversionGate({ open, onClose }: ConversionGateProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!open) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Placeholder — no backend integration yet.
    // In production this would create an account or send a magic link.
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-xl border border-[var(--fc-slate-200)] shadow-xl p-6">
        {submitted ? (
          <div className="text-center py-4">
            <p className="text-sm font-semibold text-[var(--fc-navy)]">
              Thank you.
            </p>
            <p className="mt-2 text-sm text-[var(--fc-slate-500)]">
              Full compliance reports will be available when FilingControl
              launches. We&apos;ll notify you at the address provided.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 text-sm font-medium text-[var(--fc-navy)] border border-[var(--fc-slate-200)] rounded-lg hover:border-[var(--fc-slate-400)] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold text-[var(--fc-navy)]">
              Download Full Compliance Report
            </h2>
            <p className="mt-2 text-sm text-[var(--fc-slate-500)] leading-relaxed">
              Create a free account to download a detailed compliance report
              with citations, deadlines, and recommended next steps.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="gate-email"
                  className="block text-sm font-medium text-[var(--fc-navy)] mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="gate-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-[var(--fc-slate-200)] rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:border-[var(--fc-slate-400)]"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-[var(--fc-navy)] rounded-lg hover:bg-[var(--fc-navy-light)] transition-colors"
              >
                Continue
              </button>
            </form>

            <button
              onClick={onClose}
              className="mt-3 w-full text-center text-xs text-[var(--fc-slate-400)] hover:text-[var(--fc-slate-500)] transition-colors"
            >
              Not now
            </button>
          </>
        )}
      </div>
    </div>
  )
}
