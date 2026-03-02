# FilingControl — Entity Limits

FREE plan users are limited to **1 entity**. PRO plan users can create unlimited entities.

Enforcement is server-side at `POST /api/filingcontrol/entities`. When a FREE user at the limit attempts to create another entity, the API returns **402** with `{ error: "PLAN_LIMIT", limit: 1, current: N }`. The client (`AddEntityForm`) displays an inline callout with a link to upgrade.

Existing entities are never deleted on downgrade — the limit only prevents new creation. Pure gating logic lives in `lib/filingcontrol/entity-limit.ts` (`canCreateEntity`, `isProUser`).
