// app/api/filingcontrol/auth/callback/route.ts
// Handles the Supabase magic-link callback.
// Exchanges the auth code for a session and sets the access token cookie.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

export async function GET(request: NextRequest) {
  const url = request.nextUrl
  const code = url.searchParams.get('code')
  const tokenHash = url.searchParams.get('token_hash')
  const type = url.searchParams.get('type')

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  let session = null

  // Handle PKCE code exchange (newer Supabase flow)
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('[auth/callback] Code exchange error:', error.message)
      return NextResponse.redirect(new URL('/filingcontrol/login?error=auth_failed', url.origin))
    }
    session = data.session
  }
  // Handle OTP token_hash verification (magic link with hash)
  else if (tokenHash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as 'magiclink' | 'email',
    })
    if (error) {
      console.error('[auth/callback] OTP verify error:', error.message)
      return NextResponse.redirect(new URL('/filingcontrol/login?error=auth_failed', url.origin))
    }
    session = data.session
  }

  if (!session) {
    return NextResponse.redirect(new URL('/filingcontrol/login?error=no_session', url.origin))
  }

  // Set the access token as a cookie
  const cookieStore = await cookies()
  cookieStore.set('sb-access-token', session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  // Redirect to dashboard
  return NextResponse.redirect(new URL('/filingcontrol/dashboard', url.origin))
}
