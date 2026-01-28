// lib/db/legal-updates-db.ts
// Database access module for Legal Updates
// Supports Supabase Postgres with fallback to local JSON for development

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { LegalUpdate, LegalUpdateInput, UpdateFilters, UpdateStatus, generateUpdateHash } from '../legal-updates'
import fs from 'fs'
import path from 'path'

// Supabase client singleton
let supabase: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient | null {
  if (supabase) return supabase

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('Supabase credentials not found, using local JSON storage')
    return null
  }

  supabase = createClient(url, key)
  return supabase
}

// Local JSON storage path for development
const LOCAL_DB_PATH = path.join(process.cwd(), 'data', 'legal-updates.json')

// Ensure data directory exists
function ensureDataDir() {
  const dir = path.dirname(LOCAL_DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Read from local JSON
function readLocalDb(): LegalUpdate[] {
  ensureDataDir()
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    fs.writeFileSync(LOCAL_DB_PATH, '[]')
    return []
  }
  const data = fs.readFileSync(LOCAL_DB_PATH, 'utf-8')
  return JSON.parse(data)
}

// Write to local JSON
function writeLocalDb(updates: LegalUpdate[]) {
  ensureDataDir()
  fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(updates, null, 2))
}

// ==================== DATABASE OPERATIONS ====================

/**
 * Get all legal updates with optional filters
 */
export async function getLegalUpdates(filters?: UpdateFilters): Promise<LegalUpdate[]> {
  const client = getSupabaseClient()

  if (client) {
    let query = client
      .from('legal_updates')
      .select('*')
      .order('published_at', { ascending: false })

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.jurisdiction) {
      query = query.eq('jurisdiction', filters.jurisdiction)
    }
    if (filters?.tag) {
      query = query.contains('tags', [filters.tag])
    }
    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,summary.ilike.%${filters.search}%`)
    }
    if (filters?.dateFrom) {
      query = query.gte('published_at', filters.dateFrom)
    }
    if (filters?.dateTo) {
      query = query.lte('published_at', filters.dateTo)
    }

    const { data, error } = await query.limit(100)

    if (error) {
      console.error('Error fetching legal updates:', error)
      throw error
    }

    return (data || []).map(mapDbToModel)
  }

  // Local fallback
  let updates = readLocalDb()

  if (filters?.status) {
    updates = updates.filter(u => u.status === filters.status)
  }
  if (filters?.jurisdiction) {
    updates = updates.filter(u => u.jurisdiction === filters.jurisdiction)
  }
  if (filters?.tag) {
    const tag = filters.tag
    updates = updates.filter(u => u.tags.includes(tag))
  }
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase()
    updates = updates.filter(u =>
      u.title.toLowerCase().includes(searchLower) ||
      u.summary.toLowerCase().includes(searchLower)
    )
  }
  if (filters?.dateFrom) {
    updates = updates.filter(u => u.publishedAt >= filters.dateFrom!)
  }
  if (filters?.dateTo) {
    updates = updates.filter(u => u.publishedAt <= filters.dateTo!)
  }

  return updates.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  ).slice(0, 100)
}

/**
 * Get a single legal update by slug
 */
export async function getLegalUpdateBySlug(slug: string): Promise<LegalUpdate | null> {
  const client = getSupabaseClient()

  if (client) {
    const { data, error } = await client
      .from('legal_updates')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      console.error('Error fetching legal update:', error)
      throw error
    }

    return data ? mapDbToModel(data) : null
  }

  // Local fallback
  const updates = readLocalDb()
  return updates.find(u => u.slug === slug) || null
}

/**
 * Check if an update already exists (for deduplication)
 */
export async function updateExists(sourceUrl: string): Promise<boolean> {
  const client = getSupabaseClient()

  if (client) {
    const { data, error } = await client
      .from('legal_updates')
      .select('id')
      .eq('source_url', sourceUrl)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking update existence:', error)
    }

    return !!data
  }

  // Local fallback
  const updates = readLocalDb()
  return updates.some(u => u.sourceUrl === sourceUrl)
}

/**
 * Insert a new legal update
 */
export async function insertLegalUpdate(input: LegalUpdateInput): Promise<LegalUpdate> {
  const client = getSupabaseClient()
  const now = new Date().toISOString()
  const id = generateUpdateHash(input.title, input.publishedAt)

  const update: LegalUpdate = {
    id,
    ...input,
    sourceUrls: input.sourceUrls || [input.sourceUrl],
    status: 'draft',
    createdAt: now,
    updatedAt: now,
  }

  if (client) {
    const { data, error } = await client
      .from('legal_updates')
      .insert(mapModelToDb(update))
      .select()
      .single()

    if (error) {
      // Handle unique constraint violation (duplicate)
      if (error.code === '23505') {
        console.log('Duplicate update skipped:', input.sourceUrl)
        const existing = await getLegalUpdateBySlug(input.slug)
        if (existing) return existing
      }
      console.error('Error inserting legal update:', error)
      throw error
    }

    return mapDbToModel(data)
  }

  // Local fallback
  const updates = readLocalDb()

  // Check for duplicate
  if (updates.some(u => u.sourceUrl === input.sourceUrl)) {
    console.log('Duplicate update skipped:', input.sourceUrl)
    const existing = updates.find(u => u.sourceUrl === input.sourceUrl)
    if (existing) return existing
  }

  updates.push(update)
  writeLocalDb(updates)
  return update
}

/**
 * Update the status of a legal update
 */
export async function updateLegalUpdateStatus(id: string, status: UpdateStatus): Promise<LegalUpdate | null> {
  const client = getSupabaseClient()
  const now = new Date().toISOString()

  if (client) {
    const { data, error } = await client
      .from('legal_updates')
      .update({ status, updated_at: now })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating legal update status:', error)
      throw error
    }

    return data ? mapDbToModel(data) : null
  }

  // Local fallback
  const updates = readLocalDb()
  const index = updates.findIndex(u => u.id === id)

  if (index === -1) return null

  updates[index].status = status
  updates[index].updatedAt = now
  writeLocalDb(updates)
  return updates[index]
}

/**
 * Bulk insert legal updates (for ingestion)
 */
export async function bulkInsertLegalUpdates(inputs: LegalUpdateInput[]): Promise<{ inserted: number; skipped: number }> {
  let inserted = 0
  let skipped = 0

  for (const input of inputs) {
    try {
      const exists = await updateExists(input.sourceUrl)
      if (exists) {
        skipped++
        continue
      }

      await insertLegalUpdate(input)
      inserted++
    } catch (error) {
      console.error('Error inserting update:', input.title, error)
      skipped++
    }
  }

  return { inserted, skipped }
}

// ==================== MAPPING FUNCTIONS ====================

// Map database row to model (snake_case to camelCase)
function mapDbToModel(row: Record<string, unknown>): LegalUpdate {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    publishedAt: row.published_at as string,
    jurisdiction: row.jurisdiction as LegalUpdate['jurisdiction'],
    tags: row.tags as string[],
    summary: row.summary as string,
    summaryTr: row.summary_tr as string | undefined,
    sourceName: row.source_name as string,
    sourceUrl: row.source_url as string,
    sourceUrls: row.source_urls as string[],
    status: row.status as UpdateStatus,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

// Map model to database row (camelCase to snake_case)
function mapModelToDb(update: LegalUpdate): Record<string, unknown> {
  return {
    id: update.id,
    title: update.title,
    slug: update.slug,
    published_at: update.publishedAt,
    jurisdiction: update.jurisdiction,
    tags: update.tags,
    summary: update.summary,
    summary_tr: update.summaryTr,
    source_name: update.sourceName,
    source_url: update.sourceUrl,
    source_urls: update.sourceUrls,
    status: update.status,
    created_at: update.createdAt,
    updated_at: update.updatedAt,
  }
}
