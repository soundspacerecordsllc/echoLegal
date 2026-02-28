// scripts/test-persistence-layer.mjs
// Tests for the FilingControl persistence layer.
// Covers: types, schema validation, API route input validation.
// Does NOT require a live database — tests structure and contracts only.

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ─── Schema file tests ──────────────────────────────────────────────

describe('Assessment schema', () => {
  const schemaPath = resolve(ROOT, 'lib/db/assessment-schema.sql')

  it('schema file exists', () => {
    assert.ok(existsSync(schemaPath), 'assessment-schema.sql must exist')
  })

  it('defines fc_users table', () => {
    const sql = readFileSync(schemaPath, 'utf8')
    assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS fc_users'), 'must define fc_users')
    assert.ok(sql.includes('email'), 'fc_users must have email column')
  })

  it('defines fc_entities table', () => {
    const sql = readFileSync(schemaPath, 'utf8')
    assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS fc_entities'), 'must define fc_entities')
    assert.ok(sql.includes('user_id'), 'fc_entities must have user_id FK')
    assert.ok(sql.includes('entity_type'), 'fc_entities must have entity_type')
  })

  it('defines fc_assessments table', () => {
    const sql = readFileSync(schemaPath, 'utf8')
    assert.ok(sql.includes('CREATE TABLE IF NOT EXISTS fc_assessments'), 'must define fc_assessments')
    assert.ok(sql.includes('entity_id'), 'fc_assessments must have entity_id FK')
    assert.ok(sql.includes('engine_version'), 'must have engine_version')
    assert.ok(sql.includes('risk_score'), 'must have risk_score')
    assert.ok(sql.includes('risk_level'), 'must have risk_level')
    assert.ok(sql.includes('result_json'), 'must have result_json')
  })

  it('has cascade deletes for referential integrity', () => {
    const sql = readFileSync(schemaPath, 'utf8')
    const cascadeCount = (sql.match(/ON DELETE CASCADE/g) || []).length
    assert.ok(cascadeCount >= 2, 'must have CASCADE on both FKs')
  })

  it('constrains risk_level to valid values', () => {
    const sql = readFileSync(schemaPath, 'utf8')
    assert.ok(sql.includes("'LOW'"), 'must allow LOW')
    assert.ok(sql.includes("'MODERATE'"), 'must allow MODERATE')
    assert.ok(sql.includes("'HIGH'"), 'must allow HIGH')
  })
})

// ─── Type file tests ─────────────────────────────────────────────────

describe('Assessment types', () => {
  const typesPath = resolve(ROOT, 'lib/filingcontrol/assessment-types.ts')

  it('types file exists', () => {
    assert.ok(existsSync(typesPath), 'assessment-types.ts must exist')
  })

  it('exports FCUser interface', () => {
    const src = readFileSync(typesPath, 'utf8')
    assert.ok(src.includes('export interface FCUser'), 'must export FCUser')
    assert.ok(src.includes('email: string'), 'FCUser must have email')
  })

  it('exports FCEntity interface', () => {
    const src = readFileSync(typesPath, 'utf8')
    assert.ok(src.includes('export interface FCEntity'), 'must export FCEntity')
    assert.ok(src.includes('user_id: string'), 'FCEntity must have user_id')
    assert.ok(src.includes('entity_type: string'), 'FCEntity must have entity_type')
  })

  it('exports FCAssessment interface', () => {
    const src = readFileSync(typesPath, 'utf8')
    assert.ok(src.includes('export interface FCAssessment'), 'must export FCAssessment')
    assert.ok(src.includes('entity_id: string'), 'FCAssessment must have entity_id')
    assert.ok(src.includes('engine_version: string'), 'must have engine_version')
    assert.ok(src.includes('result_json'), 'must have result_json')
  })

  it('exports API payload types', () => {
    const src = readFileSync(typesPath, 'utf8')
    assert.ok(src.includes('export interface CreateUserPayload'), 'must export CreateUserPayload')
    assert.ok(src.includes('export interface CreateEntityPayload'), 'must export CreateEntityPayload')
    assert.ok(src.includes('export interface CreateAssessmentPayload'), 'must export CreateAssessmentPayload')
  })
})

// ─── DB abstraction tests ────────────────────────────────────────────

describe('Assessment DB abstraction', () => {
  const dbPath = resolve(ROOT, 'lib/filingcontrol/assessment-db.ts')

  it('db abstraction file exists', () => {
    assert.ok(existsSync(dbPath), 'assessment-db.ts must exist')
  })

  it('exports findOrCreateUser', () => {
    const src = readFileSync(dbPath, 'utf8')
    assert.ok(src.includes('export async function findOrCreateUser'), 'must export findOrCreateUser')
  })

  it('exports createEntity', () => {
    const src = readFileSync(dbPath, 'utf8')
    assert.ok(src.includes('export async function createEntity'), 'must export createEntity')
  })

  it('exports createAssessment', () => {
    const src = readFileSync(dbPath, 'utf8')
    assert.ok(src.includes('export async function createAssessment'), 'must export createAssessment')
  })

  it('exports listAssessments', () => {
    const src = readFileSync(dbPath, 'utf8')
    assert.ok(src.includes('export async function listAssessments'), 'must export listAssessments')
  })

  it('exports listEntities', () => {
    const src = readFileSync(dbPath, 'utf8')
    assert.ok(src.includes('export async function listEntities'), 'must export listEntities')
  })

  it('uses getServiceClient from control-panel', () => {
    const src = readFileSync(dbPath, 'utf8')
    assert.ok(
      src.includes("from '@/lib/control-panel/db'") || src.includes('from "@/lib/control-panel/db"'),
      'must import from control-panel/db',
    )
  })
})

// ─── API route file tests ────────────────────────────────────────────

describe('API routes', () => {
  it('POST /api/users route exists', () => {
    const routePath = resolve(ROOT, 'app/api/users/route.ts')
    assert.ok(existsSync(routePath), 'app/api/users/route.ts must exist')
    const src = readFileSync(routePath, 'utf8')
    assert.ok(src.includes('export async function POST'), 'must export POST handler')
    assert.ok(src.includes('email'), 'must validate email')
  })

  it('POST /api/entities route exists', () => {
    const routePath = resolve(ROOT, 'app/api/entities/route.ts')
    assert.ok(existsSync(routePath), 'app/api/entities/route.ts must exist')
    const src = readFileSync(routePath, 'utf8')
    assert.ok(src.includes('export async function POST'), 'must export POST handler')
    assert.ok(src.includes('userId'), 'must validate userId')
  })

  it('POST + GET /api/assessments route exists', () => {
    const routePath = resolve(ROOT, 'app/api/assessments/route.ts')
    assert.ok(existsSync(routePath), 'app/api/assessments/route.ts must exist')
    const src = readFileSync(routePath, 'utf8')
    assert.ok(src.includes('export async function POST'), 'must export POST handler')
    assert.ok(src.includes('export async function GET'), 'must export GET handler')
    assert.ok(src.includes('entityId'), 'must validate entityId')
    assert.ok(src.includes('riskLevel'), 'must validate riskLevel')
  })
})

// ─── UI integration tests ────────────────────────────────────────────

describe('UI integration', () => {
  it('ConversionGate accepts resultJSON prop', () => {
    const gatePath = resolve(ROOT, 'components/filingcontrol/ConversionGate.tsx')
    const src = readFileSync(gatePath, 'utf8')
    assert.ok(src.includes('resultJSON'), 'ConversionGate must accept resultJSON prop')
    assert.ok(src.includes('onSaved'), 'ConversionGate must accept onSaved callback')
    assert.ok(src.includes('/api/users'), 'must call users API')
    assert.ok(src.includes('/api/entities'), 'must call entities API')
    assert.ok(src.includes('/api/assessments'), 'must call assessments API')
  })

  it('result page passes resultJSON to ConversionGate', () => {
    const resultPath = resolve(ROOT, 'app/filingcontrol/assessment/result/page.tsx')
    const src = readFileSync(resultPath, 'utf8')
    assert.ok(src.includes('resultJSON={'), 'must pass resultJSON to ConversionGate')
  })

  it('assessment page saves entity profile to sessionStorage', () => {
    const assessPath = resolve(ROOT, 'app/filingcontrol/assessment/page.tsx')
    const src = readFileSync(assessPath, 'utf8')
    assert.ok(src.includes('fc_entity_profile'), 'must save entity profile to sessionStorage')
  })

  it('dashboard reads entity_id from sessionStorage', () => {
    const dashPath = resolve(ROOT, 'app/filingcontrol/dashboard/page.tsx')
    const src = readFileSync(dashPath, 'utf8')
    assert.ok(src.includes('fc_entity_id'), 'must read entity_id from sessionStorage')
    assert.ok(src.includes('/api/assessments'), 'must fetch from assessments API')
  })
})
