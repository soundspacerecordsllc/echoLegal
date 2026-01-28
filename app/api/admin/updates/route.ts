// app/api/admin/updates/route.ts
// Admin API for managing legal updates

import { NextRequest, NextResponse } from 'next/server'
import { getLegalUpdates, updateLegalUpdateStatus } from '@/lib/db/legal-updates-db'
import { UpdateStatus } from '@/lib/legal-updates'

/**
 * Verify admin authentication using Basic Auth
 */
function verifyAdminAuth(request: NextRequest): boolean {
  const adminUser = process.env.ADMIN_USER
  const adminPass = process.env.ADMIN_PASS

  if (!adminUser || !adminPass) {
    console.warn('ADMIN_USER or ADMIN_PASS not configured')
    return false
  }

  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false
  }

  const base64Credentials = authHeader.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
  const [user, pass] = credentials.split(':')

  return user === adminUser && pass === adminPass
}

/**
 * GET - Fetch all updates (including drafts) for admin review
 */
export async function GET(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
      }
    )
  }

  try {
    const url = new URL(request.url)
    const status = url.searchParams.get('status') as UpdateStatus | null

    const updates = await getLegalUpdates(status ? { status } : undefined)

    return NextResponse.json({
      success: true,
      count: updates.length,
      updates,
    })
  } catch (error) {
    console.error('Error fetching updates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch updates' },
      { status: 500 }
    )
  }
}

/**
 * PATCH - Update the status of a legal update
 */
export async function PATCH(request: NextRequest) {
  if (!verifyAdminAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
      }
    )
  }

  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing id or status' },
        { status: 400 }
      )
    }

    if (status !== 'draft' && status !== 'published') {
      return NextResponse.json(
        { error: 'Invalid status. Must be "draft" or "published"' },
        { status: 400 }
      )
    }

    const update = await updateLegalUpdateStatus(id, status)

    if (!update) {
      return NextResponse.json(
        { error: 'Update not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      update,
    })
  } catch (error) {
    console.error('Error updating status:', error)
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    )
  }
}
