// app/control-panel/app/checklist/page.tsx
// Personalized compliance checklist view with real Supabase data.

import { requireAuth } from '@/lib/control-panel/auth'
import { getServiceClient } from '@/lib/control-panel/db'
import Link from 'next/link'

export default async function ChecklistPage() {
  const user = await requireAuth()
  const supabase = getServiceClient()

  // Check if user has an LLC profile
  const { data: profile } = await supabase
    .from('cp_llc_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-serif font-bold">Compliance Checklist</h1>
        </div>
        <div className="border border-gray-200 rounded-lg p-8 bg-white text-center">
          <p className="text-sm text-muted">
            Complete onboarding to generate your compliance checklist.
          </p>
          <Link
            href="/control-panel/app/onboarding"
            className="mt-3 inline-block px-4 py-2 text-sm font-medium text-white bg-ink rounded-md hover:bg-gray-800 transition-colors"
          >
            Start Onboarding
          </Link>
        </div>
      </div>
    )
  }

  // Fetch user compliance items joined with reference data
  console.log('[checklist] Fetching compliance items for user:', user.id)

  const { data: items, error } = await supabase
    .from('cp_user_compliance')
    .select(
      `
      id,
      status,
      due_date,
      completed_at,
      notes,
      cp_compliance_items (
        key,
        title,
        description,
        authority_level,
        jurisdiction,
        frequency,
        url
      )
    `
    )
    .eq('user_id', user.id)
    .order('due_date', { ascending: true })

  if (error) {
    console.log('[checklist] Query error:', error.message)
  }

  const checklistItems = items || []
  console.log('[checklist] Found', checklistItems.length, 'items')

  if (checklistItems.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-serif font-bold">Compliance Checklist</h1>
        </div>
        <div className="border border-gray-200 rounded-lg p-8 bg-white text-center">
          <p className="text-sm text-muted">
            No compliance items found. Your checklist may still be generating.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-serif font-bold">Compliance Checklist</h1>
        <p className="mt-1 text-sm text-muted">
          Your personalized compliance obligations, sorted by due date.
        </p>
      </div>

      <div className="border border-gray-200 rounded-lg bg-white divide-y divide-gray-100">
        {checklistItems.map((item: any) => {
          const ref = item.cp_compliance_items
          return (
            <div key={item.id} className="p-4 flex items-start gap-3">
              <input
                type="checkbox"
                disabled
                checked={item.status === 'completed'}
                className="mt-0.5 rounded border-gray-300"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink">{ref?.title ?? '—'}</p>
                <p className="text-xs text-muted mt-0.5">
                  {ref?.authority_level === 'federal'
                    ? 'Federal'
                    : ref?.jurisdiction ?? '—'}
                  {ref?.url && (
                    <>
                      {' · '}
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-ink"
                      >
                        Official source
                      </a>
                    </>
                  )}
                </p>
              </div>
              <div className="text-right shrink-0">
                <StatusBadge status={item.status} />
                <p className="text-xs text-muted mt-1">{item.due_date}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-gray-100 text-gray-600',
    upcoming: 'bg-blue-50 text-blue-700',
    due_soon: 'bg-yellow-50 text-yellow-700',
    overdue: 'bg-red-50 text-red-700',
    completed: 'bg-green-50 text-green-700',
    not_applicable: 'bg-gray-50 text-gray-400',
  }
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded ${styles[status] || styles.pending}`}
    >
      {status.replace('_', ' ')}
    </span>
  )
}
