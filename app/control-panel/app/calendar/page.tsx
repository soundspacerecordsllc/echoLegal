// app/control-panel/app/calendar/page.tsx
// Deadlines calendar view.

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-serif font-bold">Deadlines Calendar</h1>
        <p className="mt-1 text-sm text-muted">
          Upcoming compliance deadlines organized by date.
        </p>
      </div>

      {/* Placeholder - will render actual deadline data */}
      <div className="border border-gray-200 rounded-lg bg-white p-6 text-center">
        <p className="text-sm text-muted">
          Calendar view will display compliance deadlines after onboarding is complete.
        </p>
      </div>
    </div>
  )
}
