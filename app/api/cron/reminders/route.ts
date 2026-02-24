// app/api/cron/reminders/route.ts
// Cron endpoint: sends compliance reminder emails for items due within 30 days.
// Runs daily via Vercel Cron. Uses service-role Supabase client.

import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/control-panel/db'
import { sendComplianceReminder, ReminderPayload } from '@/lib/control-panel/emails'

function verifyCronAuth(request: NextRequest): boolean {
  if (process.env.NODE_ENV === 'development') return true

  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true

  return false
}

export async function GET(request: NextRequest) {
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getServiceClient()
  const now = new Date()
  const thirtyDaysOut = new Date(now)
  thirtyDaysOut.setDate(thirtyDaysOut.getDate() + 30)

  // Find user_compliance items that:
  // 1. Are due within the next 30 days
  // 2. Have not been completed
  // 3. Have not had a reminder sent in the last 7 days
  const sevenDaysAgo = new Date(now)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const { data: dueItems, error } = await supabase
    .from('cp_user_compliance')
    .select(`
      id,
      user_id,
      due_date,
      last_reminder_sent_at,
      compliance_item_id,
      cp_compliance_items (
        title,
        description,
        url
      )
    `)
    .in('status', ['pending', 'upcoming', 'due_soon'])
    .lte('due_date', thirtyDaysOut.toISOString().split('T')[0])
    .or(`last_reminder_sent_at.is.null,last_reminder_sent_at.lt.${sevenDaysAgo.toISOString()}`)

  if (error) {
    console.error('[cron/reminders] Query error:', error)
    return NextResponse.json({ error: 'Query failed' }, { status: 500 })
  }

  if (!dueItems || dueItems.length === 0) {
    return NextResponse.json({ sent: 0, message: 'No reminders to send' })
  }

  // Group by user_id
  const byUser = new Map<string, typeof dueItems>()
  for (const item of dueItems) {
    const list = byUser.get(item.user_id) || []
    list.push(item)
    byUser.set(item.user_id, list)
  }

  let totalSent = 0
  let totalFailed = 0

  for (const [userId, items] of byUser) {
    // Check if user has active subscription
    const { data: sub } = await supabase
      .from('cp_subscriptions')
      .select('status')
      .eq('user_id', userId)
      .in('status', ['active', 'trialing'])
      .single()

    if (!sub) continue // No active subscription, skip reminders

    // Get user email and profile
    const { data: profile } = await supabase
      .from('cp_profiles')
      .select('full_name')
      .eq('user_id', userId)
      .single()

    const { data: authUser } = await supabase.auth.admin.getUserById(userId)
    if (!authUser?.user?.email) continue

    const payload: ReminderPayload = {
      to: authUser.user.email,
      userName: profile?.full_name || null,
      items: items.map((item) => {
        const ci = item.cp_compliance_items as any
        return {
          title: ci?.title || 'Compliance Item',
          due_date: item.due_date,
          description: ci?.description || '',
          url: ci?.url || null,
        }
      }),
    }

    const success = await sendComplianceReminder(payload)

    if (success) {
      totalSent++
      // Update last_reminder_sent_at for each item
      const itemIds = items.map((i) => i.id)
      await supabase
        .from('cp_user_compliance')
        .update({ last_reminder_sent_at: now.toISOString() })
        .in('id', itemIds)
    } else {
      totalFailed++
    }
  }

  return NextResponse.json({
    sent: totalSent,
    failed: totalFailed,
    users_processed: byUser.size,
    timestamp: now.toISOString(),
  })
}
