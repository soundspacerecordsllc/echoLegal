// app/control-panel/billing/page.tsx
// Subscription management page.

export default function BillingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimal header for billing (outside app layout for flexibility) */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center h-14">
          <a
            href="/control-panel/app"
            className="text-lg font-bold tracking-tight text-ink"
          >
            EchoLegal <span className="text-muted font-normal text-sm">/ Billing</span>
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <div>
          <h1 className="text-xl font-serif font-bold">Subscription</h1>
          <p className="mt-1 text-sm text-muted">
            Manage your compliance control panel subscription.
          </p>
        </div>

        {/* Current plan */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
            Current Plan
          </h2>
          <p className="text-sm text-muted">
            No active subscription. Subscribe to access full compliance tracking,
            calendar view, and email reminders.
          </p>
          <button
            disabled
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-ink rounded-md opacity-50 cursor-not-allowed"
          >
            Subscribe
          </button>
        </div>

        {/* What's included */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
            Included in Subscription
          </h2>
          <ul className="text-sm text-muted space-y-2">
            <li>Full compliance checklist with status tracking</li>
            <li>Deadlines calendar</li>
            <li>Email reminders before due dates</li>
            <li>LLC profile management</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
