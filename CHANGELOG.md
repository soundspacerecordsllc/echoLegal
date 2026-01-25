# EchoLegal Changelog

## [2026-01-25] Monetization Update: I Support EchoLegal

### Changed
- Replaced all "Pay What You Can" language with "I support EchoLegal – $20 recommended"
- Updated editorial CTAs on high-intent pages (visa guides, LLC guides)
- Fixed Turkish apostrophe syntax errors across contract templates
- Maintained compliance-safe, non-sales language throughout

---

## [2026-01-25] Cashflow Acceleration + Amerika Hub

### Added

#### Payment & Download Infrastructure
- **Smoke Test Script** (`scripts/smoke-test-downloads.sh`)
  - Automated verification for all 30+ downloadable files
  - Tests DOCX, PDF, and ZIP files
  - Returns pass/fail status with detailed output

- **TEST-CHECKLIST.md**
  - Manual QA checklist for paid ($20) and free download paths
  - Cross-browser testing matrix
  - Mobile responsiveness checks
  - SEO schema validation steps

#### SEO & Indexing
- **Sitemap** (`app/sitemap.ts`)
  - Dynamic sitemap covering 80+ pages
  - All TR and EN routes included
  - Priority weighting (TR Amerika pages: 0.9)

- **Robots.txt** (`app/robots.ts`)
  - Proper crawl directives
  - Sitemap reference for search engines

- **INDEXING.md**
  - Step-by-step Google Search Console guide
  - Priority page indexing order
  - Troubleshooting common indexing issues

#### Conversion Components
- **KitCallout Component** (`components/KitCallout.tsx`)
  - Reusable CTA component for kit promotion
  - Two variants: `compact` (inline) and `full` (card)
  - Bilingual EN/TR support
  - Links to Stripe payment and free download

#### Site-wide Updates
- **Footer Enhancement** (`components/Footer.tsx`)
  - Added "Resources" section with Amerika Hub links
  - Business Starter Kit link with "Self-serve templates" subtitle
  - Scope strip: "EchoLegal bireysel temsil sunmaz..."

### Modified

#### Money Page CTAs
- **ABD'de LLC Kurmak** (`/amerika/abdde-llc-kurmak`)
  - CTA 1: After TL;DR (above fold)
  - CTA 2: After State Comparison (~50% scroll)
  - CTA 3: After FAQ (full variant, end of page)

- **Sözleşmeler** (`/amerika/abdde-is-yapanlar-icin-sozlesmeler`)
  - CTA 1: After TL;DR (above fold)
  - CTA 2: After FAQ (full variant, end of page)

### Legal Kit Downloads
- Created ZIP bundles in `/public/documents/kits/`:
  - `abd-business-starter-kit.zip` (6 templates)
  - `tr-us-legal-bridge-library.zip` (14 templates)
  - `abdye-gelmeden-once-rehberi.zip` (reference guide)

---

## [2.0.0] - 2026-01-25

### 🚀 Major Feature: Passive Income Architecture

Complete restructure of EchoLegal into a high-conversion, authority-driven legal reference platform focused on passive income generation for Turkish entrepreneurs doing business in the US.

### New Sections

#### Legal Reference Library (`/library`)
- **LLC Formation Guide** (`/library/llc-kurma-rehberi`) - Comprehensive reference guide on US LLC formation
- **IRS & Tax Facts** (`/library/irs-vergi-gercekleri`) - W-8, W-9, 1099 forms explained
- **Common Legal Misconceptions** (`/library/hukuki-yanilgilar`) - Myth vs. reality format for US business
- **LLC ≠ Visa** (`/library/llc-vize-yanilgisi`) - Immigration realities for business owners
- **Essential Contracts** (`/library/temel-sozlesmeler`) - Guide to must-have business contracts

#### Legal Kits (`/legal-kits`)
- **Legal Kits Hub** (`/legal-kits`) - Curated document bundles overview
- **ABD Business Starter Legal Kit** (`/legal-kits/business-starter`) - 5 essential documents for Turkish entrepreneurs

#### Checklists & Decision Maps (`/checklists`)
- **Checklists Hub** (`/checklists`) - Quick reference tools overview
- **LLC Formation Checklist** (`/checklists/llc-kontrol-listesi`) - Pre-formation considerations
- **W-8 or W-9 Decision Map** (`/checklists/w8-w9-karar-haritasi`) - Tax form selection guide
- **IRS Letter Guide** (`/checklists/irs-mektup-rehberi`) - First 7 facts when receiving IRS correspondence

### Design Principles Applied
- **Editorial conversion patterns** - CTAs framed as "related legal resources"
- **No sales language** - Reference-only presentation
- **Trust signals** - "Last reviewed" and "Next update" dates on all content
- **Compliance-first** - Clear disclaimers on every page
- **Natural Turkish** - All content written in flowing, human Turkish (not translated)

---

## Previous Versions

### [1.x.x] - Pre-existing
- Contract templates (NDA, Service Agreement, Freelance Agreement, etc.)
- Turkish Consular Documents section
- Encyclopedia foundation
- Support page
- Legal compliance pages (Privacy, Terms, Cookies, Disclaimer)

---

*Last updated: January 25, 2026*
