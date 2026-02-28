// lib/filingcontrol/assessment-types.ts
// TypeScript types for the assessment persistence layer.

export interface FCUser {
  id: string
  email: string
  created_at: string
}

export interface FCEntity {
  id: string
  user_id: string
  name: string
  entity_type: string
  created_at: string
}

export interface FCAssessment {
  id: string
  entity_id: string
  engine_version: string
  risk_score: number
  risk_level: 'LOW' | 'MODERATE' | 'HIGH'
  result_json: Record<string, unknown>
  created_at: string
}

// ─── API payloads ────────────────────────────────────────────────────

export interface CreateUserPayload {
  email: string
}

export interface CreateEntityPayload {
  userId: string
  name?: string
  entityType?: string
}

export interface CreateAssessmentPayload {
  entityId: string
  engineVersion: string
  riskScore: number
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH'
  resultJSON: Record<string, unknown>
}
