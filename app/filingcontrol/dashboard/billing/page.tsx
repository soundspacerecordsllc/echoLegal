// app/filingcontrol/dashboard/billing/page.tsx
// Subscription management for FilingControl. Single plan: Pro $49/month.

import { FC_APP, FC_PLAN } from '@/lib/filingcontrol/config'

export const metadata = {
  title: 'Billing — FilingControl',
}

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[var(--fc-navy)]">
          Subscription
        </h1>
        <p className="mt-1 text-sm text-[var(--fc-slate-500)]">
          Manage your {FC_APP.name} subscription.
        </p>
      </div>

      {/* Current plan */}
      <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--fc-slate-500)] mb-3">
          Current Plan
        </h2>
        <p className="text-sm text-[var(--fc-slate-500)]">
          No active subscription. Subscribe to unlock email reminders and full
          compliance tracking.
        </p>
        <button
          disabled
          className="mt-4 px-4 py-2 text-sm font-medium text-white bg-[var(--fc-navy)] rounded-md opacity-50 cursor-not-allowed"
        >
          Subscribe — ${FC_PLAN.price}/{FC_PLAN.interval}
        </button>
      </div>

      {/* Plan details */}
      <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--fc-slate-500)] mb-3">
          {FC_PLAN.name} Plan — ${FC_PLAN.price}/{FC_PLAN.interval}
        </h2>
        <ul className="text-sm text-[var(--fc-slate-500)] space-y-2">
          <li>Full compliance checklist with status tracking</li>
          <li>Calculated deadlines per entity</li>
          <li>Email reminders before due dates</li>
          <li>Authority source references</li>
        </ul>
      </div>
    </div>
  )
}
