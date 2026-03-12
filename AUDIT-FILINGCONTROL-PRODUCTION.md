# FilingControl + EchoLegal — Full Production Audit

**Date:** 2026-03-12
**Auditor:** Automated deep-code audit
**Scope:** Full-stack product, logic, UX, and production audit

---

## 1. Executive Summary

### Overall Product Health: PROTOTYPE — NOT READY FOR PAID USERS

FilingControl is a well-architected but **incomplete prototype** masquerading as a production SaaS. The backend infrastructure (Stripe billing, compliance engine, notification pipeline, cron reminders) is genuinely functional. The frontend, however, is a **scaffolding shell** — the dashboard shows placeholder values everywhere, authentication is completely non-functional, and the onboarding flow does not exist. A real user who reaches the dashboard today sees `--` placeholders across all summary cards, a static checklist with every item marked "pending" with `--` due dates, and a message saying "Complete onboarding to see calculated deadlines for your entity" — but there is no onboarding to complete.

**Top Risks:**
1. **Login is completely broken** — all form inputs are disabled, the "Sign In" button is grayed out. No user can authenticate.
2. **Dashboard is a static facade** — no real user data flows into the UI. Summary cards are hardcoded `--`, checklist items are all "pending" with `--` dates.
3. **No onboarding flow exists** — the app tells users to "complete onboarding" but there is no onboarding page or flow.
4. **Critical security gaps** — compliance-state and notifications API endpoints accept raw userId query params with no authentication, exposing user data to anyone who guesses a UUID.
5. **Two incompatible data models** — the cron reminders query `cp_user_compliance` / `cp_subscriptions` / `cp_profiles` tables while the FilingControl dashboard uses `fc_entities` / `fc_users` / `fc_assessments` tables. These systems don't talk to each other.

**Verdict:** This product is between "prototype" and "alpha." The compliance engine logic is real and well-built. The billing pipeline is complete. But the user-facing product is non-functional for any real workflow. No user should be asked to pay for this today.

---

## 2. What Is Working Well

These components are solid and should not be disturbed unnecessarily:

- **Compliance rules engine** (`lib/control-panel/compliance-rules.ts`): Well-structured, deterministic, handles state overrides for FL/WY/DE/NM/TX, correctly computes deadlines from formation date and fiscal year end. Clean separation of concerns.
- **Deadline computation engine** (`lib/engine/deadlines.ts`): Pure function, deterministic, testable. Correctly maps Form 5472 + Pro Forma 1120 to April 15 following tax year end.
- **Filing Obligation Checker tool** (`/filingcontrol/tool`): The best part of the product. Fully client-side, no auth needed, produces real results. This is genuinely useful and could drive organic traffic.
- **Stripe billing integration**: Complete checkout flow, webhook handling, idempotent event tracking via `fc_stripe_events`, customer portal sessions. Well-engineered.
- **Monitoring pipeline** (`/api/filingcontrol/internal/monitor`): Properly secured with `FC_MONITOR_SECRET`, idempotent upserts, notification event generation with deduplication via unique constraints. Production-grade.
- **Notification event system** (`lib/filingcontrol/notifications.ts`): Clean threshold-based event generation with deterministic dedup keys. Well-designed.
- **Visual design / CSS**: The navy/slate institutional palette is appropriate for a compliance product. Consistent, professional, not overdone.
- **Middleware**: i18n locale routing correctly skips `/filingcontrol/*` paths. www-to-apex redirect works. Cookie handling is solid.
- **Disclaimer placement**: Present on every page (dashboard layout, login, pricing, tool footer). Appropriate for a legal-adjacent product.

---

## 3. Critical Issues

### CRITICAL-1: Authentication Is Completely Non-Functional

**Evidence:** `app/filingcontrol/login/page.tsx` lines 38-61 — every form input has `disabled` attribute. The "Sign In" button has `disabled`, `opacity-50`, `cursor-not-allowed`. The "Create one" link is a `<span>` not an `<a>` tag. The comment says "Reuses shared Supabase auth" but no Supabase auth integration exists.

**Impact:** No user can sign in, create an account, or access any authenticated features. The entire product is inaccessible past the landing page. The "Get Started" CTA on the landing page leads to this dead page.

**Category:** Product risk — total blocker

**Fix:** Implement Supabase email/password auth (or magic link). Connect the login form to `supabase.auth.signInWithPassword()`. Add sign-up flow. Store session token in sessionStorage as `fc_token` (the dashboard components already expect this).

---

### CRITICAL-2: Dashboard Shows Only Placeholder/Static Data

**Evidence:** `app/filingcontrol/dashboard/page.tsx` lines 62-77 — all three summary cards hardcoded to `value="--"`. Lines 104-119 — all checklist items rendered with `status="pending"` and `dueDate="--"` hardcoded, ignoring the actual `generateComplianceItems()` function in the compliance rules engine. The dashboard uses `DEFAULT_INPUT` (lines 25-32) with empty state `''` and computes deadlines — but only Form 5472 and Pro Forma 1120 appear in the deadline section because `computeDeadlines()` only handles those two forms.

**Impact:** A user reaching the dashboard (if they could authenticate) sees a wall of `--` values. The computed deadlines at the top are real, but everything below is fake. This immediately destroys trust.

**Category:** Trust risk + product risk

**Fix:**
1. Wire summary cards to actual entity data (count pending items, count due-this-month items, show plan status)
2. Use `generateComplianceItems()` with actual entity profile instead of static `COMPLIANCE_ITEMS` array
3. Show real due dates computed from entity's formation date and fiscal year
4. Block dashboard access until at least one entity is created

---

### CRITICAL-3: No Onboarding Flow Exists

**Evidence:** Dashboard footer says "Complete onboarding to see calculated deadlines for your entity" (line 127). But there is no `/filingcontrol/onboarding` route. There is no guided flow to collect entity data. The `OnboardingData` type exists in `lib/control-panel/types.ts` (lines 111-119) but is never used. The Settings page has an `AddEntityForm` that collects only company name, state of formation, and formation date — but doesn't collect fiscal year end month, EIN status, tax classification, foreign owner confirmation, or US bank account status, all of which are defined in the `LLCProfile` type and needed by the compliance engine.

**Impact:** The product tells users to complete onboarding that doesn't exist. Even the Add Entity form in Settings doesn't collect enough data for the compliance engine to compute accurate results. This is misleading.

**Category:** Product risk + trust risk

**Fix:** Build a minimal onboarding flow (could be a single-page form) that collects: company name, state of formation, formation date, fiscal year end month, foreign owner confirmation, EIN status. Gate dashboard access behind entity creation.

---

### CRITICAL-4: Security — Unauthenticated Data Access Endpoints

**Evidence:**
- `/api/filingcontrol/compliance-state?userId=<uuid>` — no auth, returns compliance states for any user
- `/api/filingcontrol/notifications?userId=<uuid>` — no auth, returns notification events for any user
- Both endpoints only validate UUID format, not ownership

The dashboard components (`compliance-status.tsx` line 51, `notifications-panel.tsx`) read `userId` from URL query parameters — meaning anyone who knows or guesses a user UUID can read that user's compliance data and notification history.

**Impact:** Information disclosure vulnerability. While UUIDs are hard to guess, this is security-through-obscurity. Any shared URL with `?userId=` exposes the data.

**Category:** Compliance risk + security risk

**Fix:** Add Bearer token auth (consistent with `/api/filingcontrol/entities` and `/api/filingcontrol/assessments` which already do this correctly). Verify the authenticated user matches the requested userId.

---

### CRITICAL-5: Dashboard Auth Check Is Explicitly Skipped

**Evidence:** `app/filingcontrol/dashboard/layout.tsx` line 13: `// TODO: Check auth with requireAuth() and redirect if not authenticated.` followed by `// For scaffolding, render layout without auth check.`

**Impact:** Even if login were functional, the dashboard has no server-side auth guard. Any visitor can navigate directly to `/filingcontrol/dashboard` without being logged in.

**Category:** Security risk

**Fix:** Implement `requireAuth()` check in the dashboard layout. Redirect unauthenticated users to `/filingcontrol/login`.

---

### CRITICAL-6: Cron Reminders Use Wrong Table Schema

**Evidence:** `/api/cron/reminders/route.ts` queries `cp_user_compliance`, `cp_subscriptions`, `cp_profiles` tables — these are the old control-panel tables. FilingControl uses `fc_entities`, `fc_users`, `fc_assessments`, `fc_compliance_state`, `fc_notification_events`. The cron job will find zero data in the `cp_*` tables for FilingControl users and silently send no reminders.

**Impact:** Email reminders (the primary PRO feature driving monetization) will never fire for FilingControl users. The PRO plan's core value proposition is broken.

**Category:** Product risk + monetization risk — total blocker for PRO value

**Fix:** Rewrite the cron reminders to query `fc_notification_events` (PENDING status events), join to `fc_entities` → `fc_users` to get email and plan, and send reminders based on `fc_compliance_state` data.

---

## 4. Medium-Priority Issues

### MED-1: Deadline Engine Only Handles 2 of 8+ Forms

**Evidence:** `lib/engine/deadlines.ts` only computes deadlines for Form 5472 and Pro Forma 1120 (lines 59-78). The compliance rules engine defines 8 compliance items (EIN, Form 5472, FBAR, BOI, ITIN, Registered Agent, Annual Report, Franchise Tax) but the deadline engine ignores all except Form 5472/1120.

**Impact:** The "Next Filing Deadlines" section on the dashboard only ever shows Form 5472 and Pro Forma 1120. FBAR (due April 15), BOI (90 days from formation), state annual reports — none of these appear as deadlines. Users see an incomplete picture.

**Fix:** Extend `computeDeadlines()` to handle all forms, or consolidate with `generateComplianceItems()` which already computes dates for all items.

---

### MED-2: FBAR Shown to All Foreign-Owned LLCs Without Qualification

**Evidence:** `lib/control-panel/compliance-rules.ts` includes FBAR (Form 114) for all entities regardless of whether they have foreign financial accounts exceeding $10,000. The description says "Required if aggregate value of foreign financial accounts exceeds $10,000" but the compliance engine shows it unconditionally.

**Impact:** Displaying FBAR as a requirement when it may not apply creates unnecessary anxiety and reduces trust. The `LLCProfile` type has `has_us_bank_account` but this isn't used to conditionally include FBAR, and there's no `has_foreign_accounts` field.

**Fix:** Add a `has_foreign_accounts` boolean to entity profile. Only show FBAR when the user indicates they have foreign accounts over $10,000. Alternatively, show it as "May apply — check if..." with clear conditional language.

---

### MED-3: BOI Report Status Is Legally Uncertain

**Evidence:** The BOI compliance item (`lib/control-panel/compliance-rules.ts` line 66-75) states companies formed after Jan 1, 2024 must file within 90 days, and existing companies by Jan 1, 2025. However, the Corporate Transparency Act has been subject to legal challenges, injunctions, and shifting enforcement dates throughout 2024-2025. The app presents BOI as a definitive requirement without noting ongoing legal uncertainty.

**Impact:** Presenting BOI as a fixed requirement when enforcement status may have changed could mislead users. This is a compliance risk for a compliance product.

**Fix:** Add a notice on the BOI item indicating enforcement status should be verified. Consider adding a `legal_status` field to compliance items (e.g., "active", "enjoined", "uncertain"). Link to FinCEN's current guidance page.

---

### MED-4: `/api/debug/nav` Is Completely Unprotected

**Evidence:** `app/api/debug/nav/route.ts` — no authentication, no environment check. Returns navigation structure (keys, count, hasCompliance flag) to any caller. No `ECHO_DEBUG_KEY` or similar token exists in the codebase despite the audit brief mentioning it.

**Impact:** Low-severity information disclosure. The endpoint only returns nav item keys, not sensitive data. But it sets a bad precedent — debug endpoints should not be publicly accessible.

**Fix:** Add environment check (`NODE_ENV !== 'production'`) or require a debug token header.

---

### MED-5: Billing Page Subscribe Button Is Disabled/Dead

**Evidence:** `app/filingcontrol/dashboard/billing/page.tsx` lines 31-34 — the "Subscribe" button has `disabled`, `opacity-50`, `cursor-not-allowed`. There is no Stripe checkout integration on this page, even though the API endpoint (`/api/filingcontrol/billing/create-checkout`) is fully functional.

**Impact:** A user who navigates to Billing to subscribe cannot do so. The only working upgrade path is the `UpgradePrompt` component on the dashboard, which is easy to miss.

**Fix:** Connect the Billing page subscribe button to the create-checkout API. Show current plan status using the `user-plan` endpoint (like `PlanStatus` component does on dashboard).

---

### MED-6: `Registered Agent` Incorrectly Labeled as Federal

**Evidence:** `lib/control-panel/compliance-rules.ts` lines 92-103 — the "Maintain Registered Agent" item has `authority_level: 'federal'` and `jurisdiction: 'federal'`. Registered agent requirements are state-level, not federal. Every state requires a registered agent, but this is a state law requirement.

**Impact:** Mislabeling authority undermines credibility with knowledgeable users.

**Fix:** Change to `authority_level: 'state'` and `jurisdiction: 'any'`.

---

### MED-7: State Items Show "ANY" Jurisdiction in Dashboard

**Evidence:** When state is empty (which it is by default on dashboard), the compliance items with `jurisdiction: 'any'` display as `State — ANY` in the dashboard checklist. This looks like placeholder text, not a real compliance system.

**Impact:** Trust damage. "State — ANY" looks unfinished and generic.

**Fix:** When state is not set, either hide state-specific items or show "State — (set your state in Settings)".

---

### MED-8: Two Separate Entity/User Data Models Coexist

**Evidence:** The codebase has two parallel systems:
- `cp_*` tables: `cp_profiles`, `cp_user_compliance`, `cp_subscriptions`, `cp_compliance_items` (old control panel)
- `fc_*` tables: `fc_users`, `fc_entities`, `fc_assessments`, `fc_compliance_state`, `fc_notification_events` (new FilingControl)

The cron reminders, some types, and some lib files reference `cp_*`. The dashboard, billing, entities, and monitoring use `fc_*`.

**Impact:** Maintenance confusion. Data lives in two places. Features built on `cp_*` don't work for `fc_*` users and vice versa.

**Fix:** Migrate fully to `fc_*` schema. Remove or deprecate `cp_*` references.

---

## 5. Low-Priority / Polish Issues

### LOW-1: Filing Obligation Checker Defaults to Current Year (Not Previous)

The tool page defaults `taxYear` to current year (2026), but the dashboard defaults to `current year - 1` (2025). Users filing now would typically be filing for the prior tax year. The tool should default to `current year - 1`.

### LOW-2: No Logout Button

The dashboard layout has navigation (Checklist, Settings, Billing) but no sign-out option. Even once auth is implemented, users can't log out.

### LOW-3: `filingcontrolapp.com` Domain Referenced but Likely Not Active

`lib/filingcontrol/config.ts` sets `domain: 'filingcontrolapp.com'`. This appears in the footer. If this domain doesn't resolve or isn't configured, it's a dead reference.

### LOW-4: Pricing Page "Get Started" Links to Disabled Login

The pricing page CTA "Get Started" links to `/filingcontrol/login` which is non-functional. This is a conversion dead-end.

### LOW-5: No Loading States on Dashboard Page

The main dashboard page is a server component and renders synchronously. But `ComplianceStatusSection` and `NotificationsPanel` (client components) show "Loading..." text — there's no skeleton or spinner, just plain text.

### LOW-6: `robots: "noindex, nofollow"` on All FilingControl Pages

`app/filingcontrol/layout.tsx` sets `noindex, nofollow`. While appropriate during development, this must be removed before launch or the product will never appear in search results.

### LOW-7: No Email Verification on Checkout

The `create-checkout` endpoint accepts any syntactically valid email and creates a user + Stripe customer without verification. Someone could type the wrong email and end up with an orphaned subscription.

### LOW-8: Calendar ICS Feed Has No Cache Headers

`/api/filingcontrol/calendar/[token]` serves ICS content but doesn't set `Cache-Control` headers. Calendar clients may cache aggressively or not at all.

---

## 6. Product Positioning Assessment

### Does FilingControl currently feel like a true "Foreign-Owned LLC Survival Tool"?

**Partially.** The positioning is present in the right places but inconsistent:

**Where positioning is sharp:**
- Landing page headline: "Foreign-Owned U.S. Entities: Compliance, Under Control." — Good.
- Subhead: "built for foreign founders" — Clear target.
- Compliance rules are specifically designed for foreign-owned single-member LLCs.
- Form 5472 + Pro Forma 1120 are correctly prioritized (the signature obligation for foreign-owned LLCs).

**Where positioning is still generic:**
- Dashboard headline is just "Compliance Checklist" — says nothing about foreign ownership.
- Dashboard subhead: "Federal and state filing obligations for your entity" — generic.
- Config tagline: "Structured compliance tracking for U.S. entities" — generic, not specific to foreign-owned.
- Pricing page: "Full compliance tracking" — could be any compliance tool.
- The tool page headline "Filing Obligation Checker" — generic.
- Value props section: "Compliance Checklists", "Due Date Tracking", "Email Reminders" — these are features, not positioning.

**What must change:**
1. Dashboard headline should reference foreign-owned LLC context: "Your Foreign-Owned LLC Compliance Status" or similar
2. Config tagline should be: "Compliance survival tool for foreign-owned U.S. LLCs"
3. The checklist should prioritize Form 5472 at the top, not alphabetically/by-ID
4. Add urgency language specific to foreign-owner penalties ($25,000 per form per year for Form 5472 failure)
5. The value props should speak to the pain: "Avoid $25,000 IRS penalties", "Navigate Form 5472 requirements", "Stay compliant as a non-US founder"

---

## 7. Monetization Audit

### What is currently blocking conversion?

1. **Login is broken** — no one can sign up or pay. Total blocker.
2. **Billing page subscribe button is disabled** — even if users reached it.
3. **No clear FREE vs PRO differentiation on dashboard** — users don't see what they're missing.
4. **PRO value is buried** — the UpgradePrompt at the bottom of the dashboard just says "Email monitoring is available on PRO." This is weak.
5. **No penalty/risk framing anywhere in the upgrade flow** — the product doesn't make the cost of NOT subscribing clear.

### What PRO value is clear?
- Email reminders before deadlines
- Calendar feed integration (ICS)
- Unlimited entities (vs 1 for FREE)

### What PRO value is unclear?
- What exactly do free users get vs PRO users? The dashboard shows the same content to everyone.
- "Status tracking per item" — is this free or PRO? Unclear.
- "Authority source references" — listed as PRO but links appear for all users on the checklist.

### What exact copy changes would improve conversion?

**Current UpgradePrompt:** "Email monitoring is available on PRO" + "Enable Email Monitoring (PRO)"

**Recommended revision:**
> **Don't miss a $25,000 deadline.**
> Form 5472 penalties start at $25,000 per form, per year. PRO sends automatic email alerts 90, 30, and 7 days before every deadline — so you never file late.
>
> [Get PRO — $49/month →]

**Current Pricing page description:** "Full compliance tracking with email reminders."

**Recommended revision:**
> "Automated deadline alerts for foreign-owned LLC compliance. Never miss Form 5472, BOI, FBAR, or state filing deadlines again."

### Top 5 Highest-Leverage Conversion Improvements

1. **Make login work** — this is the #1 blocker. No auth = no conversion.
2. **Add penalty framing to every upgrade prompt** — "$25,000 per missed Form 5472" is the most compelling copy this product has. Use it everywhere.
3. **Show FREE users a locked/blurred version of computed deadlines** — let them see what they'd get, but gate the details behind PRO.
4. **Move the upgrade prompt ABOVE the checklist, not below it** — put it where attention is highest.
5. **Add a "Days until next deadline" counter to the dashboard hero** — create urgency on every visit.

---

## 8. Logic / Compliance Engine Audit

### Which displayed compliance items appear genuinely dynamic?

| Item | Dynamic? | Notes |
|------|----------|-------|
| Form 5472 deadline | **Yes** | Computed from fiscal year end + 105 days. Correctly produces April 15 for calendar year entities. |
| Pro Forma 1120 deadline | **Yes** | Same logic as Form 5472. Correct. |
| State annual report due date | **Yes** | Uses state overrides (FL=May 1, DE=June 1, TX=May 15, WY=anniversary). Correct for supported states. |
| Franchise tax due date | **Yes** | Only shown for states with franchise tax (DE, TX). Correct. |
| EIN application | **Yes** | Skipped if `ein_status === 'received'`. Good. |
| BOI report | **Partially** | Due date computed as formation_date + 90 days. But doesn't distinguish pre-2024 vs post-2024 formation. |

### Which appear static or underdeveloped?

| Item | Issue |
|------|-------|
| FBAR (Form 114) | Shown unconditionally. Should be gated behind foreign accounts threshold question. |
| ITIN (Form W-7) | Always shown. Should only appear if member has no SSN — no data field exists to determine this. |
| Registered Agent | Hardcoded as "federal" when it's a state requirement. Offset of 365 days from formation (arbitrary). |
| Dashboard checklist | **Entirely static** — all items show `status="pending"` and `dueDate="--"` regardless of entity data. |
| Summary cards | **Entirely static** — all show `"--"`. |

### What data dependencies are missing?

The `AddEntityForm` collects only: company name, state, formation date.

The compliance engine needs but doesn't collect:
- **fiscal_year_end_month** — defaults to 12, but this should be explicitly confirmed
- **foreign_owner** — assumed true, never confirmed by user
- **ein_status** — defaults to `not_applied`, never asked
- **has_us_bank_account** — never asked (relevant for FBAR)
- **has_foreign_accounts** — doesn't exist (needed for FBAR)
- **has_ssn** — doesn't exist (needed for ITIN)
- **tax_classification** — defaults to `disregarded_entity`, never asked

### What should be gated behind onboarding?

The dashboard should NOT render compliance data until:
1. At least one entity exists with: company name, state, formation date, fiscal year end month, foreign owner confirmation
2. Fiscal year end month is explicitly set (not assumed)
3. Foreign ownership is confirmed (not assumed)

Currently the dashboard renders with `DEFAULT_INPUT` using an empty state and assumed values, producing misleading results.

---

## 9. Recommended Fix Order

### Fix Now (Blockers — Must Fix Before Any Real User Touches This)

1. **Implement authentication** — login, sign-up, session management
2. **Add auth guard to dashboard layout** — redirect unauthenticated users
3. **Secure compliance-state and notifications endpoints** — add Bearer auth
4. **Build minimal onboarding** — collect entity data before showing dashboard
5. **Wire dashboard to real entity data** — replace all `--` placeholders

### Fix Next (Required for Paid Users / Monetization)

6. **Fix cron reminders to use fc_* tables** — PRO email reminders are the core monetization feature
7. **Connect billing page subscribe button to Stripe checkout**
8. **Extend deadline engine to handle all forms** (not just 5472/1120)
9. **Add penalty framing to upgrade prompts**
10. **Fix Registered Agent authority_level to "state"**

### Fix Later (Polish / Credibility)

11. Add BOI legal status caveat
12. Make FBAR conditional on foreign accounts
13. Add ITIN conditionality
14. Remove `noindex, nofollow` before launch
15. Add logout button
16. Fix default tax year on tool page
17. Add loading skeletons
18. Protect `/api/debug/nav`

---

## 10. If You Had Only 1 Day

To maximize trust, usefulness, and conversion in one day:

### Morning: Make It Real (4 hours)

1. **Implement Supabase magic-link auth** on the login page (fastest auth to implement, no password management). Store session in sessionStorage as `fc_token` and email as `fc_email`.
2. **Add auth guard** to dashboard layout — redirect to login if no session.
3. **Build a 1-page onboarding form** at `/filingcontrol/onboarding` that collects: company name, state, formation date, fiscal year end month (default 12), foreign owner confirmation (default true). On submit, POST to `/api/filingcontrol/entities` and redirect to dashboard.

### Afternoon: Make It Useful (3 hours)

4. **Wire the dashboard to real entity data.** After onboarding, fetch the user's entity and pass it to `generateComplianceItems()`. Replace `--` placeholders with real computed dates. Replace static `status="pending"` with computed statuses.
5. **Add penalty framing** to the UpgradePrompt: "$25,000 per missed Form 5472 filing."
6. **Connect the billing page subscribe button** to the Stripe checkout flow.

### End of Day: Make It Secure (1 hour)

7. **Add Bearer auth** to `/api/filingcontrol/compliance-state` and `/api/filingcontrol/notifications`.
8. **Protect `/api/debug/nav`** with environment check.

This gets you from "non-functional prototype" to "minimum viable product that a real foreign-owned LLC founder could sign up for, see their compliance obligations, and subscribe to PRO for email reminders."

---

## Appendix: Route Inventory

| Route | Status | Notes |
|-------|--------|-------|
| `/filingcontrol` | **Working** | Landing page renders correctly |
| `/filingcontrol/pricing` | **Working** | But CTA leads to dead login |
| `/filingcontrol/login` | **BROKEN** | All inputs disabled, non-functional |
| `/filingcontrol/dashboard` | **Misleading** | Renders but shows only placeholder data |
| `/filingcontrol/dashboard/settings` | **Partial** | Profile shows `--`, AddEntity form works if authenticated |
| `/filingcontrol/dashboard/billing` | **BROKEN** | Subscribe button disabled |
| `/filingcontrol/tool` | **Working** | Best feature — fully functional |
| `/api/debug/nav` | **Exposed** | No auth, no env check |
| `/api/filingcontrol/entities` | **Working** | Properly secured with Bearer auth |
| `/api/filingcontrol/assessments` | **Working** | Properly secured with Bearer auth |
| `/api/filingcontrol/compliance-state` | **Insecure** | No auth, userId in query param |
| `/api/filingcontrol/notifications` | **Insecure** | No auth, userId in query param |
| `/api/filingcontrol/billing/create-checkout` | **Working** | No auth needed (creates user) |
| `/api/filingcontrol/billing/webhook` | **Working** | Stripe signature verification |
| `/api/filingcontrol/billing/user-plan` | **Working** | Email lookup, no auth |
| `/api/filingcontrol/internal/monitor` | **Working** | Properly secured |
| `/api/cron/reminders` | **BROKEN for FC** | Queries wrong tables (cp_* not fc_*) |

---

*End of audit. Issues flagged with evidence. Severity levels assigned. Fix order provided.*
