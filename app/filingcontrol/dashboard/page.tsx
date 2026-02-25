// app/filingcontrol/dashboard/page.tsx
// FilingControl dashboard — compliance checklist with status tracking.
// Reuses compliance engine from lib/control-panel/compliance-rules.ts.

import Link from 'next/link'
import { COMPLIANCE_ITEMS } from '@/lib/control-panel/compliance-rules'
import { FC_APP } from '@/lib/filingcontrol/config'

export const metadata = {
  title: 'Dashboard — FilingControl',
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-[var(--fc-navy)]">
          Compliance Checklist
        </h1>
        <p className="mt-1 text-sm text-[var(--fc-slate-500)]">
          Federal and state filing obligations for your entity.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <SummaryCard
          title="Pending Items"
          value="--"
          href={FC_APP.dashboardPath}
        />
        <SummaryCard
          title="Due This Month"
          value="--"
          href={FC_APP.dashboardPath}
        />
        <SummaryCard
          title="Subscription"
          value="--"
          href={`${FC_APP.dashboardPath}/billing`}
        />
      </div>

      {/* Checklist */}
      <div className="border border-[var(--fc-slate-200)] rounded-lg bg-white divide-y divide-[var(--fc-slate-100)]">
        {COMPLIANCE_ITEMS.filter((item) => item.active).map((item) => (
          <ChecklistRow
            key={item.id}
            title={item.title}
            authority={
              item.authority_level === 'federal'
                ? `Federal — ${item.jurisdiction.toUpperCase()}`
                : `State — ${item.jurisdiction.toUpperCase()}`
            }
            description={item.description}
            sourceUrl={item.url}
            frequency={item.frequency}
            status="pending"
            dueDate="--"
          />
        ))}
      </div>

      <p className="text-xs text-[var(--fc-slate-400)] text-center">
        Complete onboarding to see calculated deadlines for your entity.
      </p>
    </div>
  )
}

function SummaryCard({
  title,
  value,
  href,
}: {
  title: string
  value: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="border border-[var(--fc-slate-200)] rounded-lg p-4 bg-white hover:border-[var(--fc-slate-400)] transition-colors block"
    >
      <p className="text-xs text-[var(--fc-slate-500)] uppercase tracking-wider">
        {title}
      </p>
      <p className="mt-1 text-2xl font-bold text-[var(--fc-navy)]">{value}</p>
    </Link>
  )
}

function ChecklistRow({
  title,
  authority,
  description,
  sourceUrl,
  frequency,
  status,
  dueDate,
}: {
  title: string
  authority: string
  description: string
  sourceUrl: string | null
  frequency: string
  status: string
  dueDate: string
}) {
  return (
    <div className="p-4 flex items-start gap-3">
      <input
        type="checkbox"
        disabled
        className="mt-0.5 rounded border-[var(--fc-slate-200)]"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--fc-navy)]">{title}</p>
        <p className="text-xs text-[var(--fc-slate-500)] mt-0.5">{authority}</p>
        <p className="text-xs text-[var(--fc-slate-400)] mt-1 leading-relaxed">
          {description}
        </p>
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--fc-slate-500)] underline underline-offset-2 mt-1 inline-block hover:text-[var(--fc-navy)]"
          >
            Authority source
          </a>
        )}
      </div>
      <div className="text-right shrink-0">
        <span className="text-xs px-2 py-0.5 rounded bg-[var(--fc-slate-100)] text-[var(--fc-slate-500)]">
          {status}
        </span>
        <p className="text-xs text-[var(--fc-slate-400)] mt-1">{dueDate}</p>
        <p className="text-xs text-[var(--fc-slate-400)] mt-0.5 capitalize">
          {frequency.replace('_', ' ')}
        </p>
      </div>
    </div>
  )
}
