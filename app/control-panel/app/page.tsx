// app/control-panel/app/page.tsx
// Dashboard home. Shows summary of compliance status.
// Redirects to onboarding if no LLC profile exists.

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { requireAuth } from '@/lib/control-panel/auth'
import { getServiceClient } from '@/lib/control-panel/db'

export default async function DashboardPage() {
  const user = await requireAuth()
  const supabase = getServiceClient()

  // Redirect to onboarding if no LLC profile
  const { data: profile } = await supabase
    .from('cp_llc_profiles')
    .select('id, company_name')
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    redirect('/control-panel/app/onboarding')
  }

  // Fetch compliance summary counts
  const { count: pendingCount } = await supabase
    .from('cp_user_compliance')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .in('status', ['pending', 'upcoming', 'due_soon', 'overdue'])

  const now = new Date()
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .split('T')[0]
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split('T')[0]

  const { count: dueThisMonth } = await supabase
    .from('cp_user_compliance')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .gte('due_date', startOfMonth)
    .lte('due_date', endOfMonth)
    .neq('status', 'completed')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-serif font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          Overview of your LLC compliance status.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <DashboardCard
          title="Pending Items"
          value={String(pendingCount ?? 0)}
          href="/control-panel/app/checklist"
        />
        <DashboardCard
          title="Due This Month"
          value={String(dueThisMonth ?? 0)}
          href="/control-panel/app/calendar"
        />
        <DashboardCard
          title="Company"
          value={profile.company_name}
          href="/control-panel/app/settings"
        />
      </div>

      <div className="border border-gray-200 rounded-lg p-6 bg-white text-center">
        <p className="text-sm text-muted">
          View your full compliance checklist to track deadlines and obligations.
        </p>
        <Link
          href="/control-panel/app/checklist"
          className="mt-3 inline-block px-4 py-2 text-sm font-medium text-white bg-ink rounded-md hover:bg-gray-800 transition-colors"
        >
          View Checklist
        </Link>
      </div>
    </div>
  )
}

function DashboardCard({
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
      className="border border-gray-200 rounded-lg p-4 bg-white hover:border-gray-300 transition-colors block"
    >
      <p className="text-xs text-muted uppercase tracking-wider">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </Link>
  )
}
