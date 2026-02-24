// app/control-panel/app/onboarding/page.tsx
// Onboarding questionnaire to collect LLC profile details.

export default function OnboardingPage() {
  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-xl font-serif font-bold">LLC Profile Setup</h1>
        <p className="mt-1 text-sm text-muted">
          Provide your LLC details to generate a personalized compliance checklist.
        </p>
      </div>

      {/* Placeholder form - will be converted to client component with state */}
      <div className="border border-gray-200 rounded-lg p-6 bg-white space-y-4">
        <FormField label="Company Name" placeholder="My LLC" />
        <FormField label="State of Formation" placeholder="e.g., FL, WY, DE" />
        <FormField label="Formation Date" placeholder="YYYY-MM-DD" type="date" />

        <div>
          <label className="block text-sm font-medium text-ink mb-1">
            EIN Status
          </label>
          <select
            disabled
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-50"
          >
            <option>Not yet applied</option>
            <option>Applied, pending</option>
            <option>Received</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1">
            Tax Classification
          </label>
          <select
            disabled
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-50"
          >
            <option>Disregarded Entity (default for SMLLC)</option>
            <option>C Corporation</option>
            <option>S Corporation</option>
          </select>
        </div>

        <FormField
          label="Fiscal Year End Month"
          placeholder="12"
          type="number"
        />

        <div className="flex items-center gap-2">
          <input type="checkbox" disabled className="rounded border-gray-300" />
          <label className="text-sm text-ink">
            I have a US bank account
          </label>
        </div>

        <button
          disabled
          className="w-full px-4 py-2 text-sm font-medium text-white bg-ink rounded-md opacity-50 cursor-not-allowed"
        >
          Generate Compliance Checklist
        </button>
      </div>
    </div>
  )
}

function FormField({
  label,
  placeholder,
  type = 'text',
}: {
  label: string
  placeholder: string
  type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1">{label}</label>
      <input
        type={type}
        disabled
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-50"
      />
    </div>
  )
}
