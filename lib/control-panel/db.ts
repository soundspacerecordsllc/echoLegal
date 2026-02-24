// lib/control-panel/db.ts
// Supabase client for the Control Panel product area.
// Uses the same Supabase project as the rest of EchoLegal.
// For authenticated user operations, use createBrowserClient (client-side)
// or createServerClient with the user's session (server-side).

import { createClient, SupabaseClient } from '@supabase/supabase-js'

// ─── Server-side service client (admin operations, cron jobs) ───────

let serviceClient: SupabaseClient | null = null

export function getServiceClient(): SupabaseClient {
  if (serviceClient) return serviceClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY

  if (!url || !key) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables'
    )
  }

  serviceClient = createClient(url, key)
  return serviceClient
}

// ─── Server-side client with anon key (for RLS-respecting queries) ──

let anonClient: SupabaseClient | null = null

export function getAnonClient(): SupabaseClient {
  if (anonClient) return anonClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables'
    )
  }

  anonClient = createClient(url, key)
  return anonClient
}
