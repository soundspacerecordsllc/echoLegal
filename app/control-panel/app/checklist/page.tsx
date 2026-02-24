// app/control-panel/app/checklist/page.tsx
// Personalized compliance checklist view.

export default function ChecklistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-serif font-bold">Compliance Checklist</h1>
        <p className="mt-1 text-sm text-muted">
          Your personalized list of compliance obligations with status tracking.
        </p>
      </div>

      {/* Placeholder - will be populated from user_compliance data */}
      <div className="border border-gray-200 rounded-lg bg-white divide-y divide-gray-100">
        <ChecklistItemPlaceholder
          title="File Form 5472 with Pro Forma 1120"
          authority="Federal / IRS"
          status="pending"
          dueDate="--"
        />
        <ChecklistItemPlaceholder
          title="Beneficial Ownership Information Report"
          authority="Federal / FinCEN"
          status="pending"
          dueDate="--"
        />
        <ChecklistItemPlaceholder
          title="State Annual Report"
          authority="State"
          status="pending"
          dueDate="--"
        />
      </div>

      <p className="text-xs text-muted text-center">
        Complete onboarding to see your actual compliance items and deadlines.
      </p>
    </div>
  )
}

function ChecklistItemPlaceholder({
  title,
  authority,
  status,
  dueDate,
}: {
  title: string
  authority: string
  status: string
  dueDate: string
}) {
  return (
    <div className="p-4 flex items-start gap-3">
      <input
        type="checkbox"
        disabled
        className="mt-0.5 rounded border-gray-300"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink">{title}</p>
        <p className="text-xs text-muted mt-0.5">{authority}</p>
      </div>
      <div className="text-right shrink-0">
        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-muted">
          {status}
        </span>
        <p className="text-xs text-muted mt-1">{dueDate}</p>
      </div>
    </div>
  )
}
