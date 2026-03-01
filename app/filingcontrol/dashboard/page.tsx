// app/filingcontrol/dashboard/page.tsx
// FilingControl dashboard — compliance checklist with deadline tracking.
// Reuses compliance engine from lib/control-panel/compliance-rules.ts.
// Computes deadlines from lib/engine/deadlines.ts.

import Link from 'next/link'
import { COMPLIANCE_ITEMS } from '@/lib/control-panel/compliance-rules'
import { FC_APP } from '@/lib/filingcontrol/config'
import {
  computeDeadlines,
  DEADLINE_ENGINE_VERSION,
  type Deadline,
} from '@/lib/engine/deadlines'
import { computeObligations } from '@/app/filingcontrol/lib/obligations'

export const metadata = {
  title: 'Dashboard — FilingControl',
}

// Default entity profile for dashboard preview (foreign-owned LLC, calendar year)
const DEFAULT_INPUT = {
  entityType: 'llc' as const,
  foreignOwned: true,
  usBusinessActivity: true,
  hasUSIncome: true,
  taxYear: new Date().getFullYear() - 1,
  state: '',
}

export default function DashboardPage() {
  // Compute deadlines for the default entity profile
  const obligations = computeObligations(DEFAULT_INPUT)
  const entityProfile = {
    entityType: DEFAULT_INPUT.entityType,
    foreignOwned: DEFAULT_INPUT.foreignOwned,
    taxYear: DEFAULT_INPUT.taxYear,
    state: DEFAULT_INPUT.state,
    fiscalYearEndMonth: 12,
  }
  const deadlineResult = computeDeadlines(entityProfile, obligations)

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

      {/* Next Filing Deadlines */}
      {deadlineResult.deadlines.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-[var(--fc-navy)] mb-3">
            Next Filing Deadlines
          </h2>
          <div className="border border-[var(--fc-slate-200)] rounded-lg bg-white divide-y divide-[var(--fc-slate-100)]">
            {deadlineResult.deadlines.map((dl, i) => (
              <DeadlineCard key={i} deadline={dl} />
            ))}
          </div>
          <p className="text-xs text-[var(--fc-slate-400)] mt-2">
            Engine v{deadlineResult.engineVersion} — Tax year {deadlineResult.taxYear}
          </p>
        </div>
      )}

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

function getDeadlineUrgency(dueDate: string): {
  label: string
  badgeClass: string
  borderClass: string
} {
  const now = new Date()
  const due = new Date(dueDate)
  const diffMs = due.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 30) {
    return {
      label: `${diffDays} days`,
      badgeClass: 'bg-red-100 text-red-700',
      borderClass: 'border-l-red-500',
    }
  }
  if (diffDays < 90) {
    return {
      label: `${diffDays} days`,
      badgeClass: 'bg-amber-100 text-amber-700',
      borderClass: 'border-l-amber-400',
    }
  }
  return {
    label: `${diffDays} days`,
    badgeClass: 'bg-[var(--fc-slate-100)] text-[var(--fc-slate-500)]',
    borderClass: 'border-l-[var(--fc-slate-200)]',
  }
}

function formatDeadlineDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function DeadlineCard({ deadline }: { deadline: Deadline }) {
  const urgency = getDeadlineUrgency(deadline.dueDate)

  return (
    <div className={`p-4 flex items-center justify-between gap-4 border-l-4 ${urgency.borderClass}`}>
      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--fc-navy)]">
          {deadline.form} — {formatDeadlineDate(deadline.dueDate)}
        </p>
        <p className="text-xs text-[var(--fc-slate-400)] mt-0.5">
          {deadline.basis}
        </p>
      </div>
      <span
        className={`shrink-0 text-xs px-2 py-0.5 rounded font-medium ${urgency.badgeClass}`}
      >
        {urgency.label}
      </span>
    </div>
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
