// lib/filingcontrol/auth.ts
// Authentication helpers for FilingControl.
// Wraps Supabase auth with FC-specific redirect paths.

import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { FC_APP } from './config'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

export type SessionUser = {
  id: string
  email: string
}

/**
 * Get the current authenticated user from the Supabase session cookie.
 * Returns null if not authenticated.
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
 * Require authentication for FilingControl. Redirects to FC login if not authenticated.
 */
export async function requireFCAuth(): Promise<SessionUser> {
  const user = await getSessionUser()
  if (!user) {
    redirect(FC_APP.loginPath)
  }
  return user
}

/**
 * Extract and validate a Bearer token from an API request.
 * Returns the authenticated user or null.
 */
export async function getApiUser(authHeader: string | null): Promise<SessionUser | null> {
  if (!authHeader?.startsWith('Bearer ')) return null

  const token = authHeader.replace('Bearer ', '')

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      headers: { Authorization: `Bearer ${token}` },
    },
  })

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user || !user.email) return null

  return { id: user.id, email: user.email }
}

/**
 * Extract user from cookie-based session for API routes.
 * Uses the same cookie approach as server components.
 */
export async function getApiSessionUser(): Promise<SessionUser | null> {
  return getSessionUser()
}
