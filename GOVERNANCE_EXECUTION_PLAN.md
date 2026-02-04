# EchoLegal — Governance & Architecture Execution Plan

**Classification:** Internal Technical Specification
**Date:** 2026-02-04
**Status:** Approved for Implementation
**Scope:** Full institutional transformation — codebase, governance, data architecture

---

## Preamble

This document translates the EchoLegal Strategic Readiness Audit into concrete,
implementable system changes. It assumes the existing Next.js/TypeScript codebase
as the starting point and specifies what must be built, restructured, or migrated
to convert EchoLegal from a bilingual legal content site into a globally credible
legal encyclopedia and contract library.

Every recommendation below is architectural or governance-level. No copywriting,
no visual design, no marketing tactics. This is an engineering and institutional
governance specification.

**Permanent Rules (applied to all future work):**
1. The founding editor's personal name is never displayed on any visible page.
   Credentials remain implemented in code (`lib/contributors.ts`) for internal
   validation and structured data only.
2. The hero statement ("Legal knowledge should belong to everyone") is permanent
   and unalterable.

---

# SECTION 1 — INSTITUTIONAL TRUST UPGRADE

## 1.1 Problem Statement

EchoLegal currently presents as a single-founder content site. For institutional
credibility — the kind required for attorney contributors to attach their names,
for courts to accept citations, and for AI systems to assign high authority — the
platform must present as a **governed institution** with transparent processes,
not a personal project with good intentions.

The founding editor's authority must be structurally embedded (editorial veto,
final review power, governance documents) without being personally visible on
any public page.

## 1.2 Required Pages & Components

### 1.2.1 New Pages to Create

| Page | Route | Purpose |
|------|-------|---------|
| Institutional Charter | `/[lang]/about/charter` | Defines EchoLegal's mission, editorial independence, and governance structure. States that all content is attorney-reviewed, that editorial authority is held by a licensed attorney, and that no commercial interest overrides editorial accuracy. Does NOT name the founding editor. |
| Editorial Board | `/[lang]/about/editorial-board` | Lists all verified contributors with `role >= reviewer`. Displays bar admissions, jurisdictions covered, and institutional role. The founding editor appears only as "Editorial Director" or equivalent title — no personal name. |
| Contributor Standards | `/[lang]/about/contributor-standards` | Public-facing version of contributor requirements. States: licensed attorneys only, bar verification required, peer review mandatory, jurisdictional competence enforced. |
| Correction & Retraction Policy | `/[lang]/about/corrections` | Describes how errors are reported, acknowledged, and corrected. Includes versioning commitment (all prior versions accessible). Modeled on academic journal retraction policies. |
| Citation Guide | `/[lang]/about/citation-guide` | Instructs users (including AI systems) on how to cite EchoLegal content. Provides Bluebook, OSCOLA, and machine-readable citation formats. |
| Jurisdiction Coverage | `/[lang]/jurisdictions` | Interactive registry of all jurisdictions EchoLegal covers. Shows active jurisdictions with content counts, pending jurisdictions marked as "In Development." Replaces any informal jurisdiction references. |

### 1.2.2 Pages to Restructure

| Existing Page | Current Route | Changes |
|---------------|---------------|---------|
| Editorial Policy | `/[lang]/about/editorial-policy` | Promote to primary governance document. Add sections on: contributor independence, conflict of interest policy, content retirement process. Remove any language that reads as marketing. |
| About | `/[lang]/about` | Restructure as institutional overview. Remove personal credentials display. Replace with: mission statement, governance summary, link to charter, link to editorial board, founding year, and jurisdiction count. Present as "About EchoLegal" not "About the Founder." |
| Terms of Service | `/[lang]/legal/terms` | Add contributor terms section (or link to separate Contributor Agreement page). |

### 1.2.3 New Components

| Component | File | Purpose |
|-----------|------|---------|
| `InstitutionalBadge` | `components/InstitutionalBadge.tsx` | Compact trust signal showing: "Attorney-Reviewed · [Jurisdiction] · Last Updated [Date]". Replaces any personal attribution in article headers. Rendered on every content page. |
| `GovernanceNav` | `components/GovernanceNav.tsx` | Sub-navigation for `/about/*` pages. Links: Charter, Editorial Policy, Editorial Board, Contributor Standards, Corrections, Citation Guide. |
| `JurisdictionCard` | `components/JurisdictionCard.tsx` | Card component for the jurisdiction registry page. Shows: jurisdiction name, flag, legal system type, content count, active/pending status, languages available. |
| `ContentVersionBanner` | `components/ContentVersionBanner.tsx` | Displays at top of any content that has been revised. Shows: "This entry was last substantively revised on [date]. View revision history." |

### 1.2.4 Site Hierarchy Changes

Current `/about` is a flat page. Restructure to:

```
/[lang]/about/                    → Institutional overview (landing)
/[lang]/about/charter             → Institutional Charter (NEW)
/[lang]/about/editorial-policy    → Editorial Policy (EXISTS — upgrade)
/[lang]/about/editorial-board     → Editorial Board (NEW)
/[lang]/about/contributor-standards → Contributor Standards (NEW)
/[lang]/about/corrections         → Correction Policy (NEW)
/[lang]/about/citation-guide      → Citation Guide (NEW)
```

Navigation update in `lib/nav.ts`: Add "About" as a top-level nav item with
children for each governance page.

### 1.2.5 Presenting Single-Founder Authority Without Fragility

The founding editor holds `editorial-authority` role in `lib/contributors.ts`.
This role grants `canPublish`, `canEditOthers`, and `canManageContributors`.

**What stays in code (not visible):**
- Full name, bar number, education in `contributors.ts`
- `editorial-authority` role and permissions
- Author/reviewer IDs on content metadata
- JSON-LD `author` references (use Organization, not Person)

**What appears publicly:**
- "Editorial Director" title on the Editorial Board page (no name)
- Institutional language: "All content is reviewed by a licensed attorney
  admitted to practice in [jurisdiction]"
- The `InstitutionalBadge` component on every content page
- Bar admission jurisdiction displayed abstractly: "Reviewed by a
  New York-admitted attorney" (not "Reviewed by [Name]")

**Structural safeguard against "single point of failure" perception:**
- The Charter page describes editorial succession: "Editorial authority is
  held by a licensed attorney designated by the governing board. Editorial
  standards survive any individual appointment."
- The Editorial Board page shows the team entity alongside any future
  contributors, so it never looks like a one-person operation.
- The `EDITORIAL_TEAM` contributor entity in `contributors.ts` is used as
  the visible authorship entity for all content.

---

# SECTION 2 — CONTRIBUTOR SYSTEM (FINAL FORM)

## 2.1 Contributor Tiers

The current system has 4 roles: `author`, `reviewer`, `editor`,
`editorial-authority`. This must expand to 7 tiers that reflect the full
lifecycle of a legal publishing institution.

| Tier | Role Key | Description | Minimum Credentials |
|------|----------|-------------|---------------------|
| 1 | `candidate` | Applied but not yet verified. Cannot publish or review. | Valid bar admission (claimed, unverified) |
| 2 | `author` | Can draft and submit content for review. Cannot self-publish. | Verified bar admission in at least 1 jurisdiction |
| 3 | `reviewer` | Can peer-review submissions within their jurisdictional competence. Can approve or request changes. Cannot publish. | Verified bar admission + 2 years practice OR academic appointment |
| 4 | `jurisdiction-editor` | Responsible for all content within a specific jurisdiction. Can commission, assign, and approve content. Can escalate to editorial board. | Verified bar admission in the specific jurisdiction + 5 years practice OR equivalent academic standing |
| 5 | `senior-editor` | Can review and publish content across multiple jurisdictions. Can override reviewer decisions with documented rationale. | Verified bar admission + demonstrated expertise across jurisdictions |
| 6 | `board-member` | Member of the Editorial Advisory Board. Participates in governance decisions, policy reviews, and institutional direction. May or may not actively author content. | Distinguished standing in legal practice or academia |
| 7 | `editorial-authority` | Final editorial authority. Can veto any publication, override any decision, appoint and remove contributors at all tiers. Exactly one holder at any time. | Defined by institutional charter |

## 2.2 Permissions Matrix

| Permission | candidate | author | reviewer | jurisdiction-editor | senior-editor | board-member | editorial-authority |
|------------|-----------|--------|----------|---------------------|---------------|--------------|---------------------|
| Submit drafts | — | Yes | Yes | Yes | Yes | Yes | Yes |
| Review submissions | — | — | Own jurisdiction | Own jurisdiction | Any | Advisory | Any |
| Approve for publication | — | — | — | Own jurisdiction | Any | — | Any |
| Edit others' published work | — | — | — | Own jurisdiction (with notice) | Any (with notice) | — | Any |
| Commission new content | — | — | — | Yes | Yes | Recommend | Yes |
| Manage contributors (invite/suspend) | — | — | — | — | Nominate | Nominate | Yes |
| Set editorial policy | — | — | — | — | Propose | Vote | Decide |
| Veto publication | — | — | — | — | — | — | Yes |

## 2.3 Authority Flow

```
Draft Submission
  │
  ▼
Author submits → Status: 'draft'
  │
  ▼
Assigned to Reviewer (must hold jurisdiction coverage) → Status: 'review'
  │
  ├─ Reviewer approves → Status: 'approved'
  │    │
  │    ▼
  │    Jurisdiction Editor or Senior Editor publishes → Status: 'published'
  │
  ├─ Reviewer requests changes → Status: 'revision-requested'
  │    │
  │    ▼
  │    Author revises → back to 'review'
  │
  └─ Reviewer rejects → Status: 'rejected' (with rationale)
       │
       ▼
       Author may appeal to Jurisdiction Editor

At any point:
  Editorial Authority may intervene, override, or veto.
  All actions are logged with timestamp, actor ID, and rationale.
```

## 2.4 Contributor Data Model

Replace the current `Contributor` type in `lib/contributors.ts` with:

```typescript
type ContributorTier =
  | 'candidate'
  | 'author'
  | 'reviewer'
  | 'jurisdiction-editor'
  | 'senior-editor'
  | 'board-member'
  | 'editorial-authority'

type VerificationStatus =
  | 'unverified'       // Claimed, no evidence submitted
  | 'documents-submitted' // Evidence submitted, pending review
  | 'verified'         // Confirmed by EchoLegal verification process
  | 'expired'          // Verification lapsed (annual re-check required)
  | 'suspended'        // Suspended pending investigation
  | 'revoked'          // Permanently removed

type BarAdmission = {
  jurisdiction: JurisdictionCode
  barNumber: string
  isVerified: VerificationStatus
  verifiedAt?: string          // ISO date
  verificationMethod?: 'bar-directory-lookup' | 'certificate-review' | 'peer-attestation'
  admissionYear: number
  status: 'active' | 'inactive' | 'retired' | 'suspended'
}

type ContributorProfile = {
  // Identity (PRIVATE — never displayed on public pages)
  id: string                          // Stable internal ID (e.g., 'contrib-a7x9k2')
  personalName: string                // Legal name — stored for contracts, never displayed
  email: string                       // Private contact

  // Public Display
  displayTitle: Record<LanguageCode, string>    // e.g., "Jurisdiction Editor, New York"
  institutionalRole: Record<LanguageCode, string> // e.g., "Senior Editor"
  publicBio: Record<LanguageCode, string>       // 2-3 sentence professional bio
  avatarUrl?: string                            // Optional professional photo

  // Credentials (stored, selectively displayed)
  barAdmissions: BarAdmission[]
  education: {
    degree: string
    institution: string
    location: string
    year: number
  }[]
  specializations: string[]          // e.g., ['immigration', 'corporate', 'tax']
  languages: LanguageCode[]
  yearsOfPractice?: number

  // System
  tier: ContributorTier
  jurisdictions: JurisdictionCode[]   // Jurisdictions this contributor is authorized to cover
  permissions: ContributorPermissions
  verificationStatus: VerificationStatus
  joinedAt: string                    // ISO date
  lastActiveAt?: string              // ISO date
  isActive: boolean

  // Metrics (internal, not displayed)
  stats: {
    draftsSubmitted: number
    articlesPublished: number
    reviewsCompleted: number
    revisionsRequested: number
    averageReviewDays?: number
  }

  // Agreements
  contributorAgreementSignedAt?: string
  conflictOfInterestDeclaredAt?: string
}

type ContributorPermissions = {
  canSubmitDrafts: boolean
  canReviewInJurisdiction: JurisdictionCode[]
  canApproveInJurisdiction: JurisdictionCode[]
  canPublish: boolean
  canEditOthers: boolean
  canCommissionContent: boolean
  canManageContributors: boolean
  canSetPolicy: boolean
  canVeto: boolean
}
```

## 2.5 Contributor Lifecycle

```
1. APPLICATION
   - Attorney submits application with: bar number, jurisdiction, specializations
   - System creates contributor record with tier='candidate', status='unverified'

2. VERIFICATION
   - EchoLegal verifies bar admission via:
     a) Automated bar directory lookup (where API available)
     b) Manual certificate review
     c) Peer attestation (2 verified contributors vouch)
   - On verification: tier promoted to 'author', status='verified'
   - Contributor signs Contributor Agreement (stored as signedAt timestamp)

3. ACTIVE CONTRIBUTION
   - Author submits drafts via editorial workflow
   - After 3 published articles + positive review record → eligible for 'reviewer' tier
   - Tier promotions require nomination by jurisdiction-editor or above

4. ANNUAL RE-VERIFICATION
   - Every 12 months: system flags contributors for re-verification
   - Contributor confirms: bar status active, contact current, COI declaration updated
   - Failure to re-verify within 60 days → status='expired', publishing paused

5. SUSPENSION / REMOVAL
   - Triggered by: bar suspension, COI violation, editorial misconduct, inactivity >18 months
   - Suspension: all permissions revoked, existing content remains with attribution
   - Removal: contributor record archived, content re-attributed to EDITORIAL_TEAM or co-author
```

## 2.6 Credential Verification — Conceptual Design

**Phase 1 (Manual — current stage):**
- Editorial authority verifies credentials personally
- Verification recorded in contributor record
- Suitable for first 20-30 contributors

**Phase 2 (Semi-automated — at 30+ contributors):**
- Integration with public bar directories (NY: iapps.courts.state.ny.us,
  CA: members.calbar.ca.gov, etc.)
- Automated lookup produces a match/no-match result
- Human confirms and marks verified

**Phase 3 (Institutional — at 100+ contributors):**
- Formal verification partnership with bar associations
- Annual batch re-verification
- API integrations where available
- Manual fallback for jurisdictions without digital directories

## 2.7 Migration from Current Contributor Data

Current `ZEYNEP_MOORE` and `EDITORIAL_TEAM` in `lib/contributors.ts` must be
migrated to the new schema:

- `ZEYNEP_MOORE` → `ContributorProfile` with `tier: 'editorial-authority'`,
  `personalName` stored privately, `displayTitle` set to "Editorial Director"
  in both languages. All current `authorId`/`reviewerId` references in
  `article-metadata.ts` remain valid (keyed by `id`).

- `EDITORIAL_TEAM` → `ContributorProfile` with `tier: 'author'`,
  `personalName: 'EchoLegal Editorial Team'`, used as institutional authorship
  entity. Retains `isTeam: true` flag (add to schema as optional field).

---

# SECTION 3 — CANONICAL CONTENT ARCHITECTURE

## 3.1 Content Types — Final Taxonomy

The current `content-schema.ts` defines content types but conflates documents
(contracts, forms) with editorial content (articles, guides). The final
taxonomy must cleanly separate these:

### 3.1.1 Editorial Content Types

| Type | Key | Description | Example |
|------|-----|-------------|---------|
| Encyclopedia Entry | `encyclopedia-entry` | Definitive reference article on a legal concept, statute, or procedure. Neutral tone, comprehensive, citable. Closest analog: Wikipedia legal article. | "What Is a Non-Disclosure Agreement" |
| Jurisdictional Guide | `jurisdictional-guide` | Step-by-step procedural guide specific to a jurisdiction. Practical, actionable, time-sensitive. | "Forming an LLC in Delaware" |
| Comparative Analysis | `comparative-analysis` | Side-by-side comparison of legal concepts, structures, or jurisdictions. | "LLC vs. Corporation: Structural Differences" |
| Legal Update | `legal-update` | Time-bound notification of a change in law, regulation, or administrative procedure. Short-lived authority. | "IRS Announces New Filing Threshold for 2026" |
| Checklist | `checklist` | Ordered procedural checklist. Derived from a guide or entry. | "LLC Formation Checklist — New York" |

### 3.1.2 Document Types

| Type | Key | Description | Example |
|------|-----|-------------|---------|
| Contract Template | `contract-template` | Downloadable, customizable legal agreement. Requires attorney review before use. | NDA, Service Agreement, Operating Agreement |
| Legal Form | `legal-form` | Government or procedural form with guidance. May be a fillable template or annotated reference. | IRS W-9, DS-160 Guidance |
| Sample Document | `sample-document` | Reference-only example of a completed document. NOT for direct use. Educational. | "Sample Independent Contractor Agreement" |
| Letter Template | `letter-template` | Formal correspondence template. | "Demand Letter Template" |
| Document Kit | `document-kit` | Bundled collection of related templates and guides. | "US Business Starter Kit" |

## 3.2 Required Metadata — Per Content Type

### 3.2.1 Universal Metadata (all content types)

```typescript
type UniversalMeta = {
  // Identity
  id: string                        // Globally unique, stable (e.g., 'ecl-enc-00142')
  canonicalSlug: string             // Language-independent slug (e.g., 'nda-overview')
  contentType: ContentTypeKey       // From taxonomy above
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived' | 'retracted'

  // Localization
  lang: LanguageCode                // Language of THIS version
  canonicalLang: LanguageCode       // Language of the ORIGINAL version
  availableTranslations: LanguageCode[]
  translatedFrom?: string           // ID of the source-language version

  // Jurisdiction
  jurisdictions: JurisdictionCode[] // All applicable jurisdictions
  primaryJurisdiction: JurisdictionCode

  // Authorship
  authorIds: string[]               // One or more contributor IDs
  reviewerIds: string[]             // One or more reviewer IDs
  lastReviewedAt: string            // ISO date — mandatory for published content
  lastReviewedBy: string            // Contributor ID

  // Dates
  createdAt: string
  firstPublishedAt?: string
  lastModifiedAt: string
  nextReviewDue?: string            // Computed from review policy

  // Classification
  tags: string[]
  category: string                  // Primary category within content type
  parentId?: string                 // For content that belongs to a series or kit
  relatedIds: string[]

  // Versioning
  version: string                   // Semantic: '1.0', '1.1', '2.0'
  revisionHistory: RevisionEntry[]
  changelogSummary?: string         // Human-readable summary of latest changes

  // Disclaimers
  disclaimers: DisclaimerType[]
  customDisclaimer?: Record<LanguageCode, string>

  // SEO & AI
  metaTitle: Record<LanguageCode, string>
  metaDescription: Record<LanguageCode, string>
  canonicalUrl: string              // Fully qualified, language-prefixed
  noIndex: boolean
  citationKey: string               // Machine-readable citation identifier
}

type RevisionEntry = {
  version: string
  date: string
  authorId: string
  summary: string
  type: 'substantive' | 'correction' | 'editorial' | 'translation-update'
}
```

### 3.2.2 Encyclopedia Entry — Additional Fields

```typescript
type EncyclopediaEntryMeta = UniversalMeta & {
  contentType: 'encyclopedia-entry'
  sections: { id: string; title: string; anchor: string }[]
  citations: Citation[]
  definedTerms: string[]           // Legal terms defined in this entry
  relatedStatutes?: string[]       // e.g., ['26 USC § 7701', 'INA § 101']
  keyTakeaways: string[]           // 3-5 bullet points
  readingTimeMinutes: number
  wordCount: number
  abstractSummary: Record<LanguageCode, string>  // 2-3 sentence abstract
}

type Citation = {
  id: string                       // e.g., 'cite-001'
  text: string                     // Full citation text
  url?: string                     // Link to source
  accessedAt?: string              // When the source was last accessed
  sourceType: 'statute' | 'regulation' | 'case' | 'government-source'
    | 'academic' | 'bar-association' | 'news' | 'other'
}
```

### 3.2.3 Contract Template — Additional Fields

```typescript
type ContractTemplateMeta = UniversalMeta & {
  contentType: 'contract-template'
  parties: string[]                 // e.g., ['Disclosing Party', 'Receiving Party']
  useCases: string[]                // e.g., ['freelancer', 'startup', 'enterprise']
  complexityLevel: 'simple' | 'moderate' | 'complex'
  requiresCustomization: boolean
  governingLaw: string              // e.g., 'State of New York'
  fileLinks: FileLink[]
  isSample: boolean                 // true = reference only, not for use
  relatedForms: string[]            // IDs of related forms
  clauseIndex?: string[]            // List of key clauses for searchability
}

type FileLink = {
  format: 'docx' | 'pdf' | 'md'
  lang: LanguageCode
  url: string
  sizeBytes?: number
  checksum?: string                 // SHA-256 for integrity verification
}
```

### 3.2.4 Legal Update — Additional Fields

```typescript
type LegalUpdateMeta = UniversalMeta & {
  contentType: 'legal-update'
  effectiveDate?: string            // When the legal change takes effect
  expiresAt?: string                // When this update is no longer current
  affectedContentIds: string[]      // IDs of encyclopedia/guide entries affected
  sourceAuthority: string           // e.g., 'Internal Revenue Service'
  sourceUrls: string[]
  urgency: 'routine' | 'important' | 'urgent'
}
```

## 3.3 Structural Differences: Contracts vs. Articles vs. Samples

| Dimension | Encyclopedia Entry / Guide | Contract Template | Sample Document |
|-----------|---------------------------|-------------------|-----------------|
| Purpose | Inform, explain, reference | Enable action (customizable legal document) | Illustrate (reference only) |
| Tone | Encyclopedic, neutral | Formal legal drafting | Annotated, educational |
| Authorship display | Full attribution with credentials | Institutional ("Drafted by EchoLegal") | Institutional |
| Versioning | Substantive (content evolves with law) | Formal (template versions with clause changes) | Rare (static reference) |
| Jurisdiction binding | Informational (covers law of X) | Operative (governed by law of X) | Illustrative |
| Downloadable | No (web-native) | Yes (DOCX, PDF) | Yes (PDF, marked "SAMPLE") |
| Citation format | Article-style (author, title, date) | Document-style (template name, version, publisher) | Not independently citable |
| Review cycle | Quarterly or on legal change | Annually or on legal change | On creation only |
| Disclaimer | General + educational | General + customization-required | General + sample-only |

## 3.4 Jurisdiction + Language Resolution

### 3.4.1 Canonical URL Structure

```
/{lang}/{content-type-path}/{canonical-slug}
```

Examples:
```
/en/encyclopedia/what-is-nda                    → English encyclopedia entry
/tr/ansiklopedi/gizlilik-sozlesmesi-nedir       → Turkish translation of same
/en/templates/nda                               → English NDA template
/tr/sablonlar/gizlilik-sozlesmesi               → Turkish NDA template
/en/jurisdictions/us-ny                          → New York jurisdiction page
```

### 3.4.2 Resolution Rules

1. **Language determines the URL prefix** (`/en/`, `/tr/`, `/de/`, etc.)
2. **Content type determines the path segment** (mapped per language in `lib/nav.ts`)
3. **Canonical slug is language-specific** but linked to a universal content ID
4. **Jurisdiction is metadata, not URL** — a single article about "LLC Formation"
   can cover multiple jurisdictions. The URL does not encode jurisdiction unless
   the content is jurisdiction-specific (e.g., `/en/guides/llc-formation-delaware`)
5. **Translations are linked by `id`** — all language versions share the same `id`
   and differ only in `lang` field. The `translatedFrom` field points to the
   original version.
6. **hreflang tags** are generated from `availableTranslations` array.

### 3.4.3 Migration from Hard-Coded Registries

Current state: `templates-registry.ts` contains 80+ entries as TypeScript objects.
`article-metadata.ts`, `Amerika-hub.ts`, etc. are similar hard-coded registries.

**Migration path:**

**Phase 1 — Schema enforcement (no storage change):**
- Define `UniversalMeta` and type-specific schemas in `lib/content-schema.ts`
- Add validation functions that enforce the schema at build time
- Existing registries remain as TypeScript files but must conform to new schema
- Build script validates all registry entries against schema

**Phase 2 — File-based content (MDX + frontmatter):**
- Each content entry becomes a directory:
  ```
  content/
    encyclopedia/
      what-is-nda/
        en.mdx          # English body + frontmatter (UniversalMeta)
        tr.mdx          # Turkish body + frontmatter
        meta.json        # Shared metadata (id, canonical slug, related IDs)
    templates/
      nda/
        meta.json        # Template metadata
        en.mdx           # English description/guidance
        tr.mdx           # Turkish description/guidance
        files/
          NDA-EN.docx
          NDA-TR.docx
  ```
- Frontmatter parsed by `gray-matter` (already a dependency)
- Build script generates search index and structured data from frontmatter

**Phase 3 — Database-backed content (Supabase):**
- Content metadata moves to Supabase tables
- MDX bodies stored as text columns or in object storage
- Editorial workflow (draft → review → publish) managed via database state
- Registry files become seed scripts for initial data
- `@supabase/supabase-js` is already a dependency

---

# SECTION 4 — AI & REFERENCE READINESS (HARD REQUIREMENTS)

## 4.1 Schema.org Types — Required Implementation

Current state: `lib/structured-data.ts` implements `Organization`, `WebSite`,
`Article`, `BreadcrumbList`, and `FAQPage`. This is insufficient for AI
citation and machine-readable legal reference.

### 4.1.1 Required Schema.org Types

| Schema Type | Used For | Current Status |
|-------------|----------|----------------|
| `Organization` | EchoLegal as publisher | Exists — adequate |
| `WebSite` | Site-level metadata + search | Exists — adequate |
| `ScholarlyArticle` | Encyclopedia entries (replaces generic `Article`) | **MISSING** |
| `Article` | Guides, updates (keep for non-encyclopedic content) | Exists — update |
| `LegalService` | Organizational classification | **MISSING** |
| `DigitalDocument` | Contract templates, forms, samples | **MISSING** |
| `CreativeWork` | Base type for document kits | **MISSING** |
| `HowTo` | Checklists and procedural guides | **MISSING** |
| `BreadcrumbList` | Navigation context | Exists — adequate |
| `FAQPage` | FAQ sections | Exists — adequate |
| `Person` | Individual contributor profiles (in JSON-LD only, not visible) | **MISSING** |
| `ItemList` | Jurisdiction registry, template collections | **MISSING** |

### 4.1.2 Mandatory Metadata Fields per Schema Type

**For `ScholarlyArticle` (Encyclopedia Entries):**
```json
{
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "@id": "https://echo-legal.com/en/encyclopedia/what-is-nda#article",
  "headline": "What Is a Non-Disclosure Agreement (NDA)",
  "alternativeHeadline": "NDA Overview — Definition, Types, and Enforceability",
  "abstract": "A non-disclosure agreement (NDA) is a legally binding contract...",
  "datePublished": "2025-06-15",
  "dateModified": "2026-01-25",
  "dateCreated": "2025-06-01",
  "version": "2.1",
  "inLanguage": "en",
  "author": { "@id": "https://echo-legal.com/#organization" },
  "publisher": { "@id": "https://echo-legal.com/#organization" },
  "isPartOf": { "@id": "https://echo-legal.com/#website" },
  "mainEntityOfPage": "https://echo-legal.com/en/encyclopedia/what-is-nda",
  "about": [
    { "@type": "Thing", "name": "Non-Disclosure Agreement" },
    { "@type": "Thing", "name": "Contract Law" }
  ],
  "citation": [
    {
      "@type": "Legislation",
      "name": "Uniform Trade Secrets Act",
      "url": "https://..."
    }
  ],
  "keywords": ["nda", "confidentiality", "trade-secrets", "contract-law"],
  "wordCount": 3200,
  "copyrightHolder": { "@id": "https://echo-legal.com/#organization" },
  "license": "https://echo-legal.com/en/legal/terms",
  "isAccessibleForFree": true
}
```

**For `DigitalDocument` (Contract Templates):**
```json
{
  "@context": "https://schema.org",
  "@type": "DigitalDocument",
  "@id": "https://echo-legal.com/en/templates/nda#document",
  "name": "Non-Disclosure Agreement Template",
  "description": "Professionally drafted NDA template...",
  "datePublished": "2025-03-01",
  "dateModified": "2026-01-10",
  "version": "1.3",
  "inLanguage": "en",
  "author": { "@id": "https://echo-legal.com/#organization" },
  "publisher": { "@id": "https://echo-legal.com/#organization" },
  "hasDigitalDocumentPermission": {
    "@type": "DigitalDocumentPermission",
    "permissionType": "https://schema.org/ReadPermission"
  },
  "encodingFormat": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf"],
  "keywords": ["nda", "template", "confidentiality"],
  "isAccessibleForFree": true
}
```

## 4.2 Citation Structure

### 4.2.1 Machine-Readable Citation

Every published content page must include a `<meta>` tag block:

```html
<meta name="citation_title" content="What Is a Non-Disclosure Agreement (NDA)">
<meta name="citation_publisher" content="EchoLegal">
<meta name="citation_publication_date" content="2025/06/15">
<meta name="citation_lastmod" content="2026/01/25">
<meta name="citation_version" content="2.1">
<meta name="citation_language" content="en">
<meta name="citation_fulltext_html_url" content="https://echo-legal.com/en/encyclopedia/what-is-nda">
<meta name="citation_id" content="ecl-enc-00142">
```

### 4.2.2 Human-Readable Citation Block

Every published content page must render a "Cite This Entry" block at the bottom:

```
EchoLegal, "What Is a Non-Disclosure Agreement (NDA)," EchoLegal Legal
Encyclopedia, v2.1 (last updated Jan. 25, 2026),
https://echo-legal.com/en/encyclopedia/what-is-nda.
```

Bluebook format:
```
What Is a Non-Disclosure Agreement (NDA), EchoLegal Legal Encyclopedia
(last updated Jan. 25, 2026), https://echo-legal.com/en/encyclopedia/what-is-nda.
```

### 4.2.3 Citation Key Format

```
ecl-{type-prefix}-{5-digit-id}
```

Type prefixes:
- `enc` — Encyclopedia entry
- `gde` — Jurisdictional guide
- `cmp` — Comparative analysis
- `upd` — Legal update
- `chk` — Checklist
- `tpl` — Contract template
- `frm` — Legal form
- `smp` — Sample document
- `ltr` — Letter template
- `kit` — Document kit

Example: `ecl-enc-00142`, `ecl-tpl-00003`, `ecl-upd-00089`

## 4.3 Versioning & Changelog System

### 4.3.1 Version Numbering

- **Major version** (2.0): Substantive legal change (new statute, overruled case,
  changed procedure)
- **Minor version** (1.1): Non-substantive improvement (clarity, additional
  examples, formatting)
- **Patch** (not tracked): Typo fixes, link updates

### 4.3.2 Changelog Requirements

Every published content entry must have a `revisionHistory` array.
Each entry contains:

```typescript
{
  version: '2.0',
  date: '2026-01-25',
  authorId: 'contrib-a7x9k2',
  summary: 'Updated to reflect 2026 IRS filing threshold changes',
  type: 'substantive'
}
```

The changelog is:
- Stored in content metadata (frontmatter or database)
- Rendered on the content page (expandable section)
- Included in JSON-LD as `version` field
- Accessible via URL: `/{lang}/encyclopedia/{slug}/history`

### 4.3.3 Archival

When content is superseded or retracted:
- Status changes to `archived` or `retracted`
- Content remains accessible at original URL with a banner:
  "This entry has been archived. See [link to current version]."
- Retracted content shows: "This entry has been retracted. See
  [correction notice] for details."
- JSON-LD includes `"isArchived": true` or custom extension

## 4.4 Canonical IDs & URLs

### 4.4.1 Canonical ID System

Every content entity receives a globally unique, permanent ID:

```
ecl-{type}-{numeric-sequence}
```

This ID:
- Never changes, even if slug, title, or language changes
- Is included in JSON-LD `@id` field
- Is included in `<meta name="citation_id">` tag
- Is the primary key in the database
- Is used in internal cross-references (`relatedIds`, `parentId`, etc.)

### 4.4.2 Canonical URL Rules

1. Every content entity has exactly ONE canonical URL per language
2. Canonical URL is constructed as:
   `https://echo-legal.com/{lang}/{type-path}/{slug}`
3. The canonical URL is set in:
   - `<link rel="canonical" href="...">` tag
   - JSON-LD `mainEntityOfPage` field
   - `citation_fulltext_html_url` meta tag
4. Language alternates are linked via `<link rel="alternate" hreflang="...">` tags
5. If a slug changes (rare), a 301 redirect is created from old to new URL
   permanently. Old URLs never 404.

---

# SECTION 5 — GLOBAL POSITIONING MECHANICS

## 5.1 Jurisdiction Activation Protocol

### 5.1.1 Jurisdiction States

Every jurisdiction in `lib/jurisdictions.ts` exists in one of four states:

| State | Meaning | Display |
|-------|---------|---------|
| `active` | Has published content, verified contributors, active editorial coverage | Full listing with content counts |
| `developing` | Has assigned jurisdiction-editor, content in progress | Listed as "In Development" with expected activation quarter |
| `planned` | On roadmap, no resources assigned | Listed on internal roadmap only, NOT on public site |
| `requested` | Community/user has requested coverage | Listed on a "Requested Jurisdictions" page with vote/interest count |

### 5.1.2 Activation Requirements

A jurisdiction transitions from `developing` to `active` when ALL of the following are met:

1. At least ONE verified contributor with bar admission in that jurisdiction
2. At least 5 published encyclopedia entries covering that jurisdiction's
   fundamental legal concepts
3. At least 3 published contract templates adapted for that jurisdiction
4. An assigned jurisdiction-editor (tier 4+) responsible for that jurisdiction
5. All content peer-reviewed by a second attorney admitted in that jurisdiction
6. Jurisdiction-specific disclaimers and legal notices drafted and approved

### 5.1.3 Current Jurisdiction Status

| Jurisdiction | State | Content | Contributors |
|-------------|-------|---------|--------------|
| US (Federal) | `active` | 50+ entries | 1 verified |
| US-NY | `active` | Covered under US | 1 verified |
| TR | `active` | 30+ entries | 1 verified |
| All others | `planned` | 0 | 0 |

## 5.2 Displaying Future Jurisdictions Without Diluting Authority

**Rule:** Never display a jurisdiction as if EchoLegal covers it when it doesn't.

**Implementation:**

1. The `/[lang]/jurisdictions` page shows ONLY `active` and `developing` jurisdictions
2. `active` jurisdictions show: flag, name, legal system, content count, languages,
   jurisdiction-editor title
3. `developing` jurisdictions show: flag, name, "In Development" badge,
   expected activation quarter, "Interested in contributing?" link
4. `planned` and `requested` jurisdictions are NOT shown on the main jurisdictions page
5. A separate `/[lang]/about/expansion` page (linked from footer only) may list
   the roadmap without making claims of current coverage

**Component:** `JurisdictionCard` renders differently based on state:
- `active`: Full card with content metrics
- `developing`: Muted card with "In Development" overlay and contributor CTA

## 5.3 Inviting Non-English, Non-Turkish Contributors

### 5.3.1 Contributor Application System

Create `/[lang]/contribute` page (available in all active languages) with:

1. **Eligibility statement:** "EchoLegal accepts contributions from licensed
   attorneys. All contributors must hold active bar admission in at least one
   jurisdiction."
2. **Application form structure:**
   - Bar admission jurisdiction and number
   - Years of practice
   - Specialization areas
   - Languages of fluency
   - Preferred contribution type (articles, templates, reviews)
   - Brief statement of interest
3. **Jurisdictions currently seeking contributors** — dynamically populated
   from jurisdictions in `developing` or `requested` state
4. **What contributors receive:**
   - Public professional attribution on all published work
   - Listing on the Editorial Board page
   - Professional credibility signal (peer-reviewed publication on a
     growing legal reference)

### 5.3.2 Language Expansion Protocol

When a new language is added:

1. **i18n infrastructure:** Add language code to `i18n-config.ts` `locales` array.
   Create `dictionaries/{lang}.json` with all UI strings translated by a
   qualified legal translator (not machine translation for legal terms).
2. **Path mappings:** Add content-type path translations to `lib/nav.ts`
   `PATH_MAPPINGS` (e.g., `/templates` → `/vorlagen` for German).
3. **Content priority:** First translations are:
   a. Institutional pages (Charter, Editorial Policy, Contributor Standards)
   b. Top 10 encyclopedia entries by traffic
   c. Top 5 contract templates by downloads
4. **Quality gate:** All legal content translations must be reviewed by an
   attorney who is both fluent in the target language AND admitted to practice
   in a jurisdiction where that language is official.

### 5.3.3 Translation Handling — Institutional Rules

1. **Machine translation is never published directly.** Machine translation
   may be used as a first draft but must be reviewed and approved by a
   qualified legal translator or attorney.
2. **Legal terminology must be jurisdiction-appropriate.** A Spanish translation
   of a US legal concept must use terminology that a Mexican, Spanish, or
   Argentine attorney would recognize — and must specify which jurisdiction's
   legal terminology is being used if there is ambiguity.
3. **Translation credits are attributed.** The translator (if different from
   the original author) is credited in content metadata and on the page.
4. **Source language version is canonical.** If a discrepancy exists between
   language versions, the `canonicalLang` version governs.
5. **Translation versions track independently.** A translation can be at
   version 1.2 while the source is at version 2.0 — the translation page
   must display: "This translation reflects version 1.2 of the original.
   The current original version is 2.0."

## 5.4 International Governance Signals

To be taken seriously by international legal communities, EchoLegal must
signal institutional rigor through structure, not claims:

1. **ISSN or equivalent registration** — Investigate registering the
   encyclopedia component as a serial publication with an ISSN. This is
   a concrete credibility signal for legal citation.
2. **DOI for major entries** — Investigate DOI registration for encyclopedia
   entries. This enables integration with academic citation systems
   (CrossRef, Google Scholar).
3. **Open access statement** — Explicitly state that all encyclopedic
   content is open access (free to read, cite, and reference), while
   document templates may require registration.
4. **Indexing submissions** — Submit to:
   - Google Scholar (requires proper `citation_*` meta tags — see Section 4)
   - DOAJ (Directory of Open Access Journals) — if ISSN is obtained
   - WorldCat — for library discoverability
5. **Structured contributor affiliations** — When contributors join from
   academic institutions or major firms, their institutional affiliation
   (with permission) adds credibility to the platform.

---

# SECTION 6 — STRICT IMPLEMENTATION ORDER

## Layer 1: IMMEDIATE — Must Happen Before Contributors Are Recruited

These items establish institutional credibility. Without them, no serious
attorney will attach their name to the platform.

### 1.1 Migrate Contributor Data Model
**System:** `lib/contributors.ts`
**Action:** Implement the full `ContributorProfile` type from Section 2.4.
Migrate existing `ZEYNEP_MOORE` and `EDITORIAL_TEAM` entries. Ensure the
founding editor's personal name is never rendered on any visible page.
**Why this unlocks next stage:** All subsequent contributor features
(application, verification, attribution) depend on this data model.

### 1.2 Create Institutional Governance Pages
**System:** App Router — `/[lang]/about/*`
**Action:** Create the 6 governance pages from Section 1.2.1 (Charter,
Editorial Board, Contributor Standards, Corrections, Citation Guide,
Jurisdiction Coverage). Create `GovernanceNav` component for sub-navigation.
**Why this unlocks next stage:** These pages ARE the institution.
Contributors evaluate EchoLegal by reading these before applying.

### 1.3 Restructure About Page
**System:** `app/[lang]/about/page.tsx`
**Action:** Remove personal credentials display. Present as institutional
overview with links to governance pages. No personal name anywhere.
**Why this unlocks next stage:** Current about page undermines institutional
framing by centering a single person.

### 1.4 Implement InstitutionalBadge Component
**System:** `components/InstitutionalBadge.tsx`
**Action:** Create and deploy on all content pages. Shows: "Attorney-Reviewed ·
[Jurisdiction] · Last Updated [Date]". Replaces any personal attribution
in article headers.
**Why this unlocks next stage:** Every content page needs institutional
(not personal) authority signals before public contributor recruitment.

### 1.5 Create Content Version Schema
**System:** `lib/content-schema.ts`
**Action:** Implement `UniversalMeta` and all type-specific schemas from
Section 3.2. Add build-time validation. Existing registries must conform.
**Why this unlocks next stage:** All subsequent content (from any contributor)
must be validated against this schema. Cannot accept contributions without it.

---

## Layer 2: STRUCTURAL — Platform Readiness

These items build the machinery that allows the platform to accept, review,
and publish contributions at scale.

### 2.1 Implement Editorial Workflow State Machine
**System:** New module `lib/editorial-workflow.ts`
**Action:** Implement the authority flow from Section 2.3. Content status
transitions (`draft` → `review` → `approved` → `published`) with permission
checks. All transitions logged.
**Why this unlocks next stage:** Cannot accept contributions without a
reviewed, permission-gated publication pipeline.

### 2.2 Implement Contributor Application System
**System:** New page `/[lang]/contribute`, new module `lib/contributor-applications.ts`
**Action:** Create application form, submission handler, and review interface
(admin). Implement candidate → author promotion workflow.
**Why this unlocks next stage:** This is the entry point for all new contributors.

### 2.3 Migrate to File-Based Content (MDX + Frontmatter)
**System:** New `content/` directory structure, build scripts
**Action:** Implement Phase 2 from Section 3.4.3. Move content from TypeScript
registries to MDX files with frontmatter conforming to `UniversalMeta`.
Update build script to generate search index from frontmatter.
**Why this unlocks next stage:** Contributors need to submit content as files
(not TypeScript edits). MDX + frontmatter is the bridge between human-authored
content and programmatic validation.

### 2.4 Upgrade JSON-LD to Full Schema Specification
**System:** `lib/structured-data.ts`
**Action:** Implement all schema.org types from Section 4.1. Add `ScholarlyArticle`,
`DigitalDocument`, `HowTo`, `Person`, `ItemList`. Add `citation_*` meta tags.
Add "Cite This Entry" block component.
**Why this unlocks next stage:** AI readiness and citation infrastructure must
be in place before content scales. Adding this retroactively to 1,000 entries
would be prohibitively expensive.

### 2.5 Implement Versioning & Revision History
**System:** Content metadata, new component `ContentVersionBanner.tsx`,
new route `/{lang}/{type}/{slug}/history`
**Action:** Every content entry tracks `revisionHistory`. Version history page
is publicly accessible. Content version banner appears on revised entries.
**Why this unlocks next stage:** Versioning is a trust requirement for legal
reference. Must exist before content volume grows.

### 2.6 Implement Jurisdiction Registry Page
**System:** New page `/[lang]/jurisdictions`, `JurisdictionCard` component
**Action:** Dynamic page that reads from `lib/jurisdictions.ts`. Displays
active jurisdictions with content counts, developing jurisdictions with CTAs.
**Why this unlocks next stage:** International contributors need to see where
they fit before they apply.

---

## Layer 3: VISION-CRITICAL — Required for Global Legitimacy

These items transform EchoLegal from a well-built legal content platform into
a citable institution of record.

### 3.1 Implement Canonical ID System
**System:** All content metadata, structured data, citation blocks
**Action:** Assign permanent IDs (`ecl-{type}-{sequence}`) to all existing
content. All new content receives an ID at creation. IDs appear in JSON-LD,
meta tags, and citation blocks. Implement 301 redirects for any slug changes.
**Why this unlocks next stage:** Permanent identifiers are a prerequisite for
DOI registration, academic citation, and AI training data reliability.

### 3.2 Migrate Content to Database (Supabase)
**System:** Supabase tables, API layer, admin interface
**Action:** Move content metadata and bodies from file system to Supabase.
Editorial workflow operates on database records. Build generates static pages
from database at build time (ISR or full SSG).
**Why this unlocks next stage:** File-based content does not scale beyond
~500 entries with multiple concurrent contributors. Database-backed content
enables real editorial workflow.

### 3.3 Implement Multi-Jurisdiction Content Expansion
**System:** Jurisdiction activation protocol, contributor recruitment
**Action:** Activate first non-US/TR jurisdiction following the protocol in
Section 5.1.2. Target: EU (likely Germany or France, based on civil law
coverage and contributor availability).
**Why this unlocks next stage:** The platform must demonstrate it can
actually serve multiple jurisdictions, not merely claim it can.

### 3.4 Language Expansion Infrastructure
**System:** i18n system, translation workflow, quality gates
**Action:** Add third language following the protocol in Section 5.3.2.
Translate institutional pages first, then top content. Implement
translation version tracking (Section 5.3.3, rule 5).
**Why this unlocks next stage:** Multilingual capability must be proven
with at least 3 languages before positioning as "global."

### 3.5 Register for Academic Indexing
**System:** External registrations, meta tag compliance
**Action:** Apply for ISSN (if applicable). Submit to Google Scholar.
Ensure all `citation_*` meta tags pass Google Scholar's inclusion
requirements. Investigate DOI registration for highest-traffic entries.
**Why this unlocks next stage:** Academic indexing is the strongest
possible credibility signal for a legal reference. It signals that
the content meets bibliographic standards.

### 3.6 Implement Contributor Credential Automation
**System:** `lib/contributor-verification.ts`, external API integrations
**Action:** Build semi-automated bar verification (Phase 2 from Section 2.6).
Integrate with publicly available bar directories. Implement annual
re-verification workflow.
**Why this unlocks next stage:** Manual verification does not scale beyond
30 contributors. Automation is required for institutional growth.

---

## Summary: Critical Path

```
Layer 1 (Institutional Foundation)
  │
  ├── 1.1 Contributor Data Model ─────────────┐
  ├── 1.2 Governance Pages ───────────────────┤
  ├── 1.3 About Page Restructure ─────────────┤
  ├── 1.4 InstitutionalBadge Component ───────┤
  └── 1.5 Content Version Schema ─────────────┤
                                               │
                                               ▼
Layer 2 (Platform Machinery)                 RECRUIT
  │                                        CONTRIBUTORS
  ├── 2.1 Editorial Workflow ─────────────────┐
  ├── 2.2 Contributor Application System ─────┤
  ├── 2.3 MDX Content Migration ──────────────┤
  ├── 2.4 Full JSON-LD Schemas ───────────────┤
  ├── 2.5 Versioning System ──────────────────┤
  └── 2.6 Jurisdiction Registry ──────────────┤
                                               │
                                               ▼
Layer 3 (Global Institution)              SCALE CONTENT
  │                                      & JURISDICTIONS
  ├── 3.1 Canonical ID System ───────────────┐
  ├── 3.2 Database Migration ────────────────┤
  ├── 3.3 Multi-Jurisdiction Expansion ──────┤
  ├── 3.4 Language Expansion ────────────────┤
  ├── 3.5 Academic Indexing ─────────────────┤
  └── 3.6 Credential Automation ─────────────┘
                                               │
                                               ▼
                                       GLOBAL LEGAL
                                       ENCYCLOPEDIA
```

---

*End of execution plan. All items are implementable against the existing
Next.js/TypeScript codebase. No item requires external funding, third-party
platform migration, or organizational restructuring beyond what is specified.*
