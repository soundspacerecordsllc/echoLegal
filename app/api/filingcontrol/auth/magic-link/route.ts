// app/api/filingcontrol/auth/magic-link/route.ts
// Sends a Supabase magic-link email for FilingControl sign-in.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const email = (body.email as string)?.trim().toLowerCase()
  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: 'Valid email is required' },
      { status: 400 }
    )
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  // Determine the callback URL for the magic link
  const origin = request.nextUrl.origin
  const redirectTo = `${origin}/api/filingcontrol/auth/callback`

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  })

  if (error) {
    console.error('[magic-link] Supabase OTP error:', error.message)
    return NextResponse.json(
      { error: 'Failed to send sign-in link. Please try again.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ sent: true })
}
