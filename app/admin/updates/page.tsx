'use client'

import { useState, useEffect } from 'react'
import { LegalUpdate, jurisdictionLabels } from '@/lib/legal-updates'

type FilterStatus = 'all' | 'draft' | 'published'

export default function AdminUpdatesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')

  const [updates, setUpdates] = useState<LegalUpdate[]>([])
  const [loading, setLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('draft')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`

  // Fetch updates
  const fetchUpdates = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const url = statusFilter === 'all'
        ? '/api/admin/updates'
        : `/api/admin/updates?status=${statusFilter}`

      const response = await fetch(url, {
        headers: { 'Authorization': authHeader },
      })

      if (response.status === 401) {
        setIsAuthenticated(false)
        setAuthError('Invalid credentials')
        return
      }

      const data = await response.json()

      if (data.success) {
        setUpdates(data.updates)
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to fetch updates' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error' })
    } finally {
      setLoading(false)
    }
  }

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')

    try {
      const response = await fetch('/api/admin/updates?status=draft', {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
        },
      })

      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        setAuthError('Invalid credentials')
      }
    } catch {
      setAuthError('Network error')
    }
  }

  // Update status
  const updateStatus = async (id: string, newStatus: 'draft' | 'published') => {
    setActionLoading(id)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/updates', {
        method: 'PATCH',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage({ type: 'success', text: `Update ${newStatus === 'published' ? 'published' : 'unpublished'}` })
        fetchUpdates()
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to update status' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' })
    } finally {
      setActionLoading(null)
    }
  }

  // Trigger ingestion
  const triggerIngestion = async () => {
    setMessage(null)

    try {
      const response = await fetch('/api/ingest-legal-updates', {
        method: 'POST',
        headers: { 'Authorization': authHeader },
      })

      const data = await response.json()

      if (data.success) {
        setMessage({
          type: 'success',
          text: `Ingestion complete: ${data.summary.totalInserted} inserted, ${data.summary.totalSkipped} skipped`,
        })
        fetchUpdates()
      } else {
        setMessage({ type: 'error', text: data.error || 'Ingestion failed' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' })
    }
  }

  // Fetch on auth and filter change
  useEffect(() => {
    if (isAuthenticated) {
      fetchUpdates()
    }
  }, [isAuthenticated, statusFilter])

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                required
              />
            </div>

            {authError && (
              <p className="text-red-600 text-sm">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Legal Updates Admin</h1>
            <p className="text-gray-600">Review and publish legal updates</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={triggerIngestion}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Run Ingestion
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>
            <div className="flex gap-2">
              {(['draft', 'published', 'all'] as FilterStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            <button
              onClick={fetchUpdates}
              className="ml-auto px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Updates List */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : updates.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No updates found
          </div>
        ) : (
          <div className="space-y-4">
            {updates.map((update) => (
              <UpdateCard
                key={update.id}
                update={update}
                onStatusChange={(status) => updateStatus(update.id, status)}
                isLoading={actionLoading === update.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Update card component
function UpdateCard({
  update,
  onStatusChange,
  isLoading,
}: {
  update: LegalUpdate
  onStatusChange: (status: 'draft' | 'published') => void
  isLoading: boolean
}) {
  const jurisdictionInfo = jurisdictionLabels[update.jurisdiction]

  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              update.status === 'published'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {update.status}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${colorClasses[jurisdictionInfo.color]}`}>
            {jurisdictionInfo.en}
          </span>
          <span className="text-xs text-gray-500">
            {update.sourceName}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(update.publishedAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {update.status === 'draft' ? (
            <button
              onClick={() => onStatusChange('published')}
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? 'Publishing...' : 'Publish'}
            </button>
          ) : (
            <button
              onClick={() => onStatusChange('draft')}
              disabled={isLoading}
              className="px-4 py-2 bg-yellow-600 text-white text-sm rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50"
            >
              {isLoading ? 'Unpublishing...' : 'Unpublish'}
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        {update.title}
      </h2>

      {/* Summary (truncated) */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {update.summary}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {update.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Source */}
      <div className="text-sm">
        <a
          href={update.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          View Source
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  )
}
