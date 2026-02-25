// app/filingcontrol/dashboard/settings/page.tsx
// Entity profile and user settings for FilingControl.

export const metadata = {
  title: 'Settings — FilingControl',
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[var(--fc-navy)]">Settings</h1>
        <p className="mt-1 text-sm text-[var(--fc-slate-500)]">
          Manage your profile and entity details.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile */}
        <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--fc-slate-500)] mb-4">
            Profile
          </h2>
          <div className="space-y-3 text-sm text-[var(--fc-slate-500)]">
            <p>Full Name: --</p>
            <p>Email: --</p>
            <p>Timezone: --</p>
          </div>
        </div>

        {/* Entity details */}
        <div className="border border-[var(--fc-slate-200)] rounded-lg p-6 bg-white">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--fc-slate-500)] mb-4">
            Entity Profile
          </h2>
          <div className="space-y-3 text-sm text-[var(--fc-slate-500)]">
            <p>Company: --</p>
            <p>State of Formation: --</p>
            <p>Formation Date: --</p>
            <p>EIN Status: --</p>
            <p>Tax Classification: --</p>
            <p>Fiscal Year End: --</p>
          </div>
        </div>
      </div>
    </div>
  )
}
