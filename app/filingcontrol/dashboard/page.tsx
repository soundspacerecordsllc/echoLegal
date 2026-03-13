// app/filingcontrol/dashboard/page.tsx
// FilingControl dashboard — real entity-scoped compliance tracking.
// Requires auth (enforced by layout). Redirects to onboarding if no entity exists.

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { FC_APP } from '@/lib/filingcontrol/config'
import { type Deadline } from '@/lib/engine/deadlines'
import { requireFCAuth } from '@/lib/filingcontrol/auth'
import { getServiceClient } from '@/lib/control-panel/db'
import { buildEntityViewModel } from '@/lib/filingcontrol/entity-view-model'
import { ComplianceStatusSection } from './compliance-status'
import { NotificationsPanel } from './notifications-panel'
import { ReminderStatus } from './reminder-status'
import { UpgradePrompt } from './upgrade-prompt'
import { PlanStatus } from './plan-status'

export const metadata = {
  title: 'Compliance Radar — FilingControl',
}

type EntityRow = {
  id: string
  company_name: string
  state_of_formation: string
  formation_date: string
  fiscal_year_end_month: number
  ein_status: string
  foreign_owner: boolean
}

export default async function DashboardPage() {
  const user = await requireFCAuth()
  const supabase = getServiceClient()

  // Fetch user's entities
  const { data: entities } = await supabase
    .from('fc_entities')
    .select('id, company_name, state_of_formation, formation_date, fiscal_year_end_month, ein_status, foreign_owner')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // No entities → redirect to onboarding
  if (!entities || entities.length === 0) {
    redirect('/filingcontrol/onboarding')
  }

  // Use the first (most recent) entity as the active one
  const entity = entities[0] as EntityRow

  // Build unified view model using the compliance rules engine
  const viewModel = buildEntityViewModel({
    id: entity.id,
    user_id: user.id,
    company_name: entity.company_name,
    state_of_formation: entity.state_of_formation,
    formation_date: entity.formation_date,
    ein_status: entity.ein_status as 'not_applied' | 'applied_pending' | 'received',
    tax_classification: 'disregarded_entity',
    foreign_owner: true,
    fiscal_year_end_month: entity.fiscal_year_end_month || 12,
    has_us_bank_account: false,
    created_at: '',
    updated_at: '',
  })

  const { complianceItems, deadlineResult, summary } = viewModel

  // Fetch user plan
  const { data: fcUser } = await supabase
    .from('fc_users')
    .select('plan')
    .eq('email', user.email)
    .single()

  const plan = fcUser?.plan || 'FREE'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-[var(--fc-navy)]">
          Foreign-Owned LLC Compliance Radar
        </h1>
        <p className="mt-1 text-sm text-[var(--fc-slate-500)]">
          {entity.company_name} — {entity.state_of_formation} — Federal and state filing obligations
        </p>
      </div>

      {/* Plan status */}
      <PlanStatus />

      {/* Summary cards — real data */}
      <div className="grid sm:grid-cols-3 gap-4">
        <SummaryCard
          title="Active Obligations"
          value={String(summary.totalObligations)}
          href={FC_APP.dashboardPath}
        />
        <SummaryCard
          title="Due This Month"
          value={String(summary.dueThisMonth)}
          href={FC_APP.dashboardPath}
          highlight={summary.dueThisMonth > 0}
        />
        <SummaryCard
          title={summary.overdueCount > 0 ? 'Overdue' : 'Plan'}
          value={summary.overdueCount > 0 ? String(summary.overdueCount) : plan}
          href={summary.overdueCount > 0 ? FC_APP.dashboardPath : `${FC_APP.dashboardPath}/billing`}
          highlight={summary.overdueCount > 0}
        />
      </div>

      {/* Next Filing Deadlines — computed from real entity */}
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

      {/* Compliance Status — from monitoring system */}
      <ComplianceStatusSection />

      {/* Deadline Alerts — shows reminder schedule by plan */}
      <ReminderStatus />

      {/* Notifications */}
      <NotificationsPanel />

      {/* Compliance Checklist — real entity-scoped items */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--fc-navy)] mb-3">
          Full Compliance Checklist
        </h2>
        <div className="border border-[var(--fc-slate-200)] rounded-lg bg-white divide-y divide-[var(--fc-slate-100)]">
          {complianceItems.map((ci, i) => (
            <ChecklistRow
              key={i}
              title={ci.compliance_item.title}
              authority={
                ci.compliance_item.authority_level === 'federal'
                  ? `Federal — ${ci.compliance_item.jurisdiction.toUpperCase()}`
                  : `State — ${ci.compliance_item.jurisdiction.toUpperCase()}`
              }
              description={ci.compliance_item.description}
              sourceUrl={ci.compliance_item.url}
              frequency={ci.compliance_item.frequency}
              dueDate={ci.due_date}
              itemKey={ci.compliance_item.key}
            />
          ))}
        </div>
      </div>

      {/* Upgrade prompt */}
      <UpgradePrompt />
    </div>
  )
}

function SummaryCard({
  title,
  value,
  href,
  highlight = false,
}: {
  title: string
  value: string
  href: string
  highlight?: boolean
}) {
  return (
    <Link
      href={href}
      className={`border rounded-lg p-4 bg-white hover:border-[var(--fc-slate-400)] transition-colors block ${
        highlight ? 'border-red-300' : 'border-[var(--fc-slate-200)]'
      }`}
    >
      <p className="text-xs text-[var(--fc-slate-500)] uppercase tracking-wider">
        {title}
      </p>
      <p className={`mt-1 text-2xl font-bold ${
        highlight ? 'text-red-600' : 'text-[var(--fc-navy)]'
      }`}>{value}</p>
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

  if (diffDays < 0) {
    return {
      label: `${Math.abs(diffDays)} days overdue`,
      badgeClass: 'bg-red-100 text-red-700',
      borderClass: 'border-l-red-600',
    }
  }
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

// Severity annotation for high-risk items
const HIGH_RISK_ITEMS: Record<string, string> = {
  irs_form_5472: 'High risk: non-filing may trigger a $25,000 initial penalty per form',
  fincen_boi: 'Non-filing may result in $500/day civil penalties',
}

function getItemStatus(dueDate: string): { label: string; className: string } {
  const now = new Date()
  const due = new Date(dueDate)
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return { label: 'overdue', className: 'bg-red-100 text-red-700' }
  }
  if (diffDays <= 30) {
    return { label: 'due soon', className: 'bg-amber-100 text-amber-700' }
  }
  if (diffDays <= 90) {
    return { label: 'upcoming', className: 'bg-amber-50 text-amber-600' }
  }
  return { label: 'on track', className: 'bg-[var(--fc-slate-100)] text-[var(--fc-slate-500)]' }
}

function ChecklistRow({
  title,
  authority,
  description,
  sourceUrl,
  frequency,
  dueDate,
  itemKey,
}: {
  title: string
  authority: string
  description: string
  sourceUrl: string | null
  frequency: string
  dueDate: string
  itemKey: string
}) {
  const status = getItemStatus(dueDate)
  const riskNote = HIGH_RISK_ITEMS[itemKey]

  return (
    <div className="p-4 flex items-start gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--fc-navy)]">{title}</p>
        <p className="text-xs text-[var(--fc-slate-500)] mt-0.5">{authority}</p>
        <p className="text-xs text-[var(--fc-slate-400)] mt-1 leading-relaxed">
          {description}
        </p>
        {riskNote && (
          <p className="text-xs text-red-600 font-medium mt-1">
            {riskNote}
          </p>
        )}
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
        <span className={`text-xs px-2 py-0.5 rounded ${status.className}`}>
          {status.label}
        </span>
        <p className="text-xs text-[var(--fc-slate-400)] mt-1">
          {formatDeadlineDate(dueDate)}
        </p>
        <p className="text-xs text-[var(--fc-slate-400)] mt-0.5 capitalize">
          {frequency.replace('_', ' ')}
        </p>
      </div>
    </div>
  )
}
