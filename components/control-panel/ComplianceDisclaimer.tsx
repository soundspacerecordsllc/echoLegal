// components/control-panel/ComplianceDisclaimer.tsx
// Institutional disclaimer for the Control Panel area.

export default function ComplianceDisclaimer() {
  return (
    <div className="border border-gray-200 bg-gray-50 rounded-md px-4 py-3 text-xs text-gray-500 leading-relaxed">
      <p>
        <strong className="text-gray-600">Disclaimer:</strong> This tool provides
        general compliance tracking for informational purposes only. It does not
        constitute legal, tax, or professional advice. No attorney-client
        relationship is created by use of this service. Compliance requirements
        vary by jurisdiction and individual circumstances. Consult a qualified
        attorney or tax professional for advice specific to your situation.
      </p>
    </div>
  )
}
