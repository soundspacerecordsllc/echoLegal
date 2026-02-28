// lib/filingcontrol/assessment-db.ts
// Database abstraction for assessment persistence.
// Uses the existing Supabase service client from lib/control-panel/db.ts.

import { getServiceClient } from '@/lib/control-panel/db'
import type {
  FCUser,
  FCEntity,
  FCAssessment,
  CreateUserPayload,
  CreateEntityPayload,
  CreateAssessmentPayload,
} from './assessment-types'

// ─── Users ───────────────────────────────────────────────────────────

/** Find user by email, or create one if none exists. Returns the user row. */
export async function findOrCreateUser(
  payload: CreateUserPayload,
): Promise<FCUser> {
  const db = getServiceClient()

  // Try to find existing user by email
  const { data: existing, error: findError } = await db
    .from('fc_users')
    .select('*')
    .eq('email', payload.email)
    .maybeSingle()

  if (findError) throw new Error(`Failed to query user: ${findError.message}`)
  if (existing) return existing as FCUser

  // Create new user
  const { data, error } = await db
    .from('fc_users')
    .insert({ email: payload.email })
    .select()
    .single()

  if (error) throw new Error(`Failed to create user: ${error.message}`)
  return data as FCUser
}

// ─── Entities ────────────────────────────────────────────────────────

/** Create an entity for a user. */
export async function createEntity(
  payload: CreateEntityPayload,
): Promise<FCEntity> {
  const db = getServiceClient()

  const { data, error } = await db
    .from('fc_entities')
    .insert({
      user_id: payload.userId,
      name: payload.name ?? 'Unnamed Entity',
      entity_type: payload.entityType ?? 'llc',
    })
    .select()
    .single()

  if (error) throw new Error(`Failed to create entity: ${error.message}`)
  return data as FCEntity
}

/** List entities for a user. */
export async function listEntities(userId: string): Promise<FCEntity[]> {
  const db = getServiceClient()

  const { data, error } = await db
    .from('fc_entities')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to list entities: ${error.message}`)
  return (data ?? []) as FCEntity[]
}

// ─── Assessments ─────────────────────────────────────────────────────

/** Save an assessment snapshot. */
export async function createAssessment(
  payload: CreateAssessmentPayload,
): Promise<FCAssessment> {
  const db = getServiceClient()

  const { data, error } = await db
    .from('fc_assessments')
    .insert({
      entity_id: payload.entityId,
      engine_version: payload.engineVersion,
      risk_score: payload.riskScore,
      risk_level: payload.riskLevel,
      result_json: payload.resultJSON,
    })
    .select()
    .single()

  if (error) throw new Error(`Failed to create assessment: ${error.message}`)
  return data as FCAssessment
}

/** List assessments for an entity, newest first. */
export async function listAssessments(
  entityId: string,
): Promise<FCAssessment[]> {
  const db = getServiceClient()

  const { data, error } = await db
    .from('fc_assessments')
    .select('*')
    .eq('entity_id', entityId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to list assessments: ${error.message}`)
  return (data ?? []) as FCAssessment[]
}
