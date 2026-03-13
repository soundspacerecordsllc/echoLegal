// app/api/filingcontrol/auth/sign-out/route.ts
// Clears the Supabase session cookie.

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete('sb-access-token')
  return NextResponse.json({ ok: true })
}
