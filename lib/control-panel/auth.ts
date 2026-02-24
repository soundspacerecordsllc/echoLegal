// lib/control-panel/auth.ts
// Authentication helpers for the Control Panel.
// Uses Supabase Auth. Server-side session extraction from cookies/headers.

import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

export type SessionUser = {
  id: string
  email: string
}

/**
 * Get the current authenticated user from the Supabase session.
 * Returns null if not authenticated.
 *
 * Usage in Server Components or Route Handlers:
 *   const user = await getSessionUser()
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('sb-access-token')?.value

  if (!accessToken) return null

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  })

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user || !user.email) return null

  return { id: user.id, email: user.email }
}

/**
 * Require authentication. Redirects to sign-in page if not authenticated.
 * Use in server components that require a logged-in user.
 */
export async function requireAuth(): Promise<SessionUser> {
  const user = await getSessionUser()
  if (!user) {
    redirect('/control-panel')
  }
  return user
}
