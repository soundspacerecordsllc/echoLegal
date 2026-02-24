// app/control-panel/app/settings/page.tsx
// User profile and LLC profile settings.

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-serif font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted">
          Manage your profile and LLC details.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile settings */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
            Profile
          </h2>
          <div className="space-y-3 text-sm text-muted">
            <p>Full Name: --</p>
            <p>Email: --</p>
            <p>Timezone: --</p>
          </div>
        </div>

        {/* LLC settings */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
            LLC Profile
          </h2>
          <div className="space-y-3 text-sm text-muted">
            <p>Company: --</p>
            <p>State: --</p>
            <p>Formation Date: --</p>
            <p>EIN Status: --</p>
          </div>
        </div>
      </div>
    </div>
  )
}
