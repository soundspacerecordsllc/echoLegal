# Foreign-Owned Single-Member LLC Compliance Control Panel -- Architecture

## 1. Architecture Overview

A new product area within EchoLegal providing compliance tracking for
foreign-owned single-member LLCs operating in the US. Lives at `/control-panel`
as a separate route tree, outside the existing i18n content site. English only
for MVP.

**Persona:** Non-resident founder, single-member LLC, US operations.

**Stack alignment:**
- Next.js 14 App Router (existing)
- Supabase Postgres + Supabase Auth (existing client installed)
- Stripe subscriptions (existing client installed)
- Resend for transactional email (new, minimal integration)
- Vercel Cron for scheduled reminders (existing pattern)
- Tailwind CSS with existing institutional palette

## 2. Routes

```
/control-panel                        Landing / sign-in
/control-panel/app                    Authenticated dashboard
/control-panel/app/onboarding         LLC profile questionnaire
/control-panel/app/checklist          Personalized compliance checklist
/control-panel/app/calendar           Deadlines calendar view
/control-panel/app/settings           Profile + LLC settings
/control-panel/billing                Subscription management
/api/stripe/webhook                   Stripe subscription lifecycle events
/api/cron/reminders                   Daily email reminder sender
```

All `/control-panel/app/*` routes require authentication.
`/control-panel/billing` requires authentication.
`/control-panel` (landing) is public.

## 3. Data Model

All tables prefixed `cp_` to avoid conflicts with existing schema.

### cp_profiles
| Column     | Type        | Notes                           |
|------------|-------------|---------------------------------|
| user_id    | UUID PK     | References auth.users(id)       |
| full_name  | TEXT NULL    |                                 |
| locale     | TEXT         | Default 'en'                    |
| timezone   | TEXT         | Default 'America/New_York'      |
| created_at | TIMESTAMPTZ  |                                 |
| updated_at | TIMESTAMPTZ  |                                 |

### cp_llc_profiles
| Column               | Type    | Notes                                     |
|----------------------|---------|-------------------------------------------|
| id                   | UUID PK | gen_random_uuid()                         |
| user_id              | UUID    | Unique, references auth.users(id)         |
| company_name         | TEXT    |                                           |
| state_of_formation   | TEXT    | State code (FL, WY, DE, etc.)             |
| formation_date       | DATE    |                                           |
| ein_status           | TEXT    | not_applied / applied_pending / received  |
| tax_classification   | TEXT    | disregarded_entity / c_corp / s_corp / partnership |
| foreign_owner        | BOOLEAN | Always TRUE for this product              |
| fiscal_year_end_month| INTEGER | 1-12                                      |
| has_us_bank_account  | BOOLEAN |                                           |
| created_at           | TIMESTAMPTZ |                                       |
| updated_at           | TIMESTAMPTZ |                                       |

### cp_compliance_items (reference data)
| Column          | Type    | Notes                                    |
|----------------|---------|------------------------------------------|
| id             | UUID PK |                                          |
| key            | TEXT    | Unique machine key (e.g., irs_form_5472) |
| title          | TEXT    |                                          |
| description    | TEXT    |                                          |
| authority_level| TEXT    | federal / state                          |
| jurisdiction   | TEXT    | 'federal' or state code                  |
| frequency      | TEXT    | one_time / annual / quarterly / monthly  |
| reference_event| TEXT    | formation_date / fiscal_year_end         |
| offset_days    | INTEGER | Days from reference event                |
| url            | TEXT    | Official source link                     |
| active         | BOOLEAN |                                          |

### cp_user_compliance
| Column               | Type        | Notes                          |
|----------------------|-------------|--------------------------------|
| id                   | UUID PK     |                                |
| user_id              | UUID        | References auth.users(id)      |
| compliance_item_id   | UUID        | References cp_compliance_items |
| status               | TEXT        | pending / upcoming / due_soon / overdue / completed / not_applicable |
| due_date             | DATE        |                                |
| completed_at         | TIMESTAMPTZ |                                |
| last_reminder_sent_at| TIMESTAMPTZ |                                |
| notes                | TEXT        |                                |
| created_at           | TIMESTAMPTZ |                                |
| updated_at           | TIMESTAMPTZ |                                |

### cp_subscriptions
| Column                  | Type        | Notes                      |
|------------------------|-------------|----------------------------|
| id                     | UUID PK     |                            |
| user_id                | UUID        | Unique, references auth.users |
| stripe_customer_id     | TEXT        |                            |
| stripe_subscription_id | TEXT        | Unique                     |
| status                 | TEXT        | trialing / active / past_due / canceled / unpaid |
| plan_id                | TEXT        | Stripe Price ID            |
| current_period_start   | TIMESTAMPTZ |                            |
| current_period_end     | TIMESTAMPTZ |                            |
| cancel_at_period_end   | BOOLEAN     |                            |
| created_at             | TIMESTAMPTZ |                            |
| updated_at             | TIMESTAMPTZ |                            |

All tables have Row Level Security (RLS) enabled. Users can only access their
own data. Subscription writes are restricted to service role (webhook only).

## 4. Core Services

### `lib/control-panel/types.ts`
All TypeScript types for the control panel data model.

### `lib/control-panel/db.ts`
Supabase client factory. Provides `getServiceClient()` (admin/cron operations)
and `getAnonClient()` (RLS-respecting queries).

### `lib/control-panel/auth.ts`
Session extraction from Supabase Auth cookies. `getSessionUser()` and
`requireAuth()` (redirects if unauthenticated).

### `lib/control-panel/compliance-rules.ts`
Deterministic rules engine. Takes an `LLCProfile`, returns applicable
`ComplianceItem[]` with calculated `due_date` values. Includes:
- Master registry of federal compliance items (Form 5472, FBAR, BOI, EIN, ITIN)
- State-level items (annual report, franchise tax)
- State-specific overrides for FL, WY, DE, NM, TX
- Date calculation functions (fiscal year deadlines, annual dates, anniversaries)

No external calls. Fully testable.

### `lib/control-panel/subscription.ts`
Stripe integration. Handles:
- Active subscription check (`getActiveSubscription`)
- Feature gating (`canAccessFeature`)
- Checkout session creation
- Billing portal session creation
- Webhook-driven subscription sync (`syncSubscriptionFromStripe`)

### `lib/control-panel/emails.ts`
Email service via Resend HTTP API. Single function: `sendComplianceReminder`.
Plain-text email with compliance items list.

## 5. Stripe Gating

**Two tiers for MVP:**

| Feature             | Free | Pro (subscribed) |
|---------------------|------|------------------|
| Onboarding          | Yes  | Yes              |
| Checklist preview   | Yes  | Yes              |
| Full checklist      | No   | Yes              |
| Calendar            | No   | Yes              |
| Email reminders     | No   | Yes              |
| Data export         | No   | Yes              |

**Enforcement flow:**
1. User completes onboarding (free).
2. Checklist page checks `canAccessFeature(userId, 'checklist_full')`.
3. If no active subscription, show preview with upgrade prompt.
4. Checkout creates a Stripe Checkout Session, redirects to Stripe.
5. Webhook at `/api/stripe/webhook` receives `customer.subscription.created`,
   calls `syncSubscriptionFromStripe()` to persist status.
6. Subsequent feature checks pass because `cp_subscriptions.status` is `active`.
7. Cancellation/expiry handled by same webhook flow.

**Single price ID** configured via `STRIPE_PRICE_ID` env var.

## 6. Scheduling / Reminders

**Cron job:** `/api/cron/reminders`, runs daily at 08:00 UTC via Vercel Cron.

**Flow:**
1. Query `cp_user_compliance` for items due within 30 days, not completed,
   not reminded in the last 7 days.
2. Group by user. Skip users without active subscription.
3. For each qualifying user, send one email with all upcoming items.
4. Update `last_reminder_sent_at` on processed items.

**Auth:** Protected by `CRON_SECRET` (same pattern as existing ingestion cron).

## 7. Files Added/Changed

### New files
```
lib/control-panel/types.ts              Type definitions
lib/control-panel/db.ts                 Supabase client helpers
lib/control-panel/auth.ts               Auth session helpers
lib/control-panel/compliance-rules.ts   Rules engine
lib/control-panel/subscription.ts       Stripe subscription management
lib/control-panel/emails.ts             Email reminder service

lib/db/control-panel-schema.sql         Database migration SQL

components/control-panel/ComplianceDisclaimer.tsx  Disclaimer component

app/control-panel/layout.tsx            Root layout (noindex)
app/control-panel/page.tsx              Landing / sign-in
app/control-panel/app/layout.tsx        Authenticated app layout
app/control-panel/app/page.tsx          Dashboard
app/control-panel/app/onboarding/page.tsx  Onboarding questionnaire
app/control-panel/app/checklist/page.tsx   Compliance checklist
app/control-panel/app/calendar/page.tsx    Deadlines calendar
app/control-panel/app/settings/page.tsx    Settings
app/control-panel/billing/page.tsx         Subscription management

app/api/stripe/webhook/route.ts         Stripe webhook handler
app/api/cron/reminders/route.ts         Daily reminder cron endpoint

docs/control-panel-architecture.md      This document
```

### Modified files
```
middleware.ts       Added /control-panel and /admin skip to locale redirect
vercel.json         Added /api/cron/reminders cron schedule
```

## 8. Environment Variables Required

```
# Supabase (may already be set)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=

# Email (Resend)
RESEND_API_KEY=
REMINDER_FROM_EMAIL=compliance@echo-legal.com

# Cron auth (may already be set)
CRON_SECRET=

# App
NEXT_PUBLIC_BASE_URL=https://echo-legal.com
```

## 9. Next Step Checklist

1. Run `control-panel-schema.sql` in Supabase SQL Editor to create tables.
2. Enable Supabase Auth (Email provider at minimum) in the Supabase dashboard.
3. Implement the onboarding form as a client component with form state and
   server action to insert `cp_llc_profiles` + generate `cp_user_compliance`.
4. Wire `requireAuth()` into `app/control-panel/app/layout.tsx`.
5. Create a Stripe product + price in the Stripe dashboard; set `STRIPE_PRICE_ID`.
6. Configure the Stripe webhook endpoint in the Stripe dashboard to point to
   `/api/stripe/webhook` with events: `customer.subscription.created`,
   `customer.subscription.updated`, `customer.subscription.deleted`.
7. Set up Resend domain verification and configure `RESEND_API_KEY`.
8. Implement checklist and calendar pages with real data from Supabase.
9. Add subscription gating checks to protected pages (checklist, calendar).
10. Write tests for `compliance-rules.ts` (deterministic, no mocking needed).
