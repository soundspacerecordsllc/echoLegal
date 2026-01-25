# Changelog

All notable changes to this project will be documented in this file.

## [2026-01-25] — Visual Design System Upgrade

### Visual Changes

**New Design System Components** (`/components/contracts/`)
- `ContractHero` — Clean hero section with title, subtitle, jurisdiction, and breadcrumbs
- `ContractPageHeader` — Sticky navigation with search integration
- `ContractPageFooter` — Minimal footer with legal disclaimer
- `ContextCard` — Subtle left-bordered card for context-setting text
- `ContentCard` — Rounded card sections for major content blocks
- `ContentList` — Flexible list component (check, bullet, number variants)
- `DownloadSection` — Non-pushy CTA with clean button styling
- `RelatedResources` — Grid layout for related contracts
- `LegalDisclaimer` — Compact disclaimer styling

**Typography & Layout Improvements**
- Increased body text line-height for better readability
- Cleaner H1/H2/H3 hierarchy with `tracking-tight`
- Meta text (dates, jurisdiction) now visually secondary
- Max content width reduced to `max-w-3xl` for optimal reading
- Generous whitespace between sections

**Color & Visual Language**
- Removed bright colors and gradients
- Single subtle accent color (amber-50) for highlight cards
- White/off-white/light gray palette throughout
- Subtle borders (gray-100, gray-200) instead of heavy outlines

**CTA Integration**
- Removed "I CAN/CANNOT Afford" language
- CTAs now read as: "Support EchoLegal — $20" / "Download Free"
- Non-pushy presentation as informational options
- Related contracts presented as "commonly used alongside"

### Pages Updated

1. `/contracts/service-agreement` — Full redesign
2. `/contracts/nda` — Full redesign
3. `/contracts/independent-contractor` — Full redesign

### What Did NOT Change

- **Legal content**: All legal text, descriptions, and explanations remain identical
- **Document URLs**: Download links unchanged
- **Payment links**: Stripe links unchanged
- **Jurisdictions**: All jurisdiction information preserved
- **Disclaimers**: Legal disclaimer text preserved (styling only changed)

---

## [2026-01-25] — Turkish Misconceptions Page & Site Search

### New Features

**Turkish "Yaygın Yanlış Varsayımlar" Encyclopedia Page**
- New page at `/encyclopedia/common-misconceptions`
- Covers LLC/immigration, Delaware incorporation, taxes, contracts, NDAs
- Improved Turkish text with modern, natural language
- Clear myth/fact format for each misconception

**Site-Wide Search**
- SearchModal component with command-palette style UI
- SearchButton with Cmd+K keyboard shortcut
- Keyboard navigation (arrows, Enter, ESC)
- Bilingual search (EN/TR) with category labels
- "No results" state with suggested links

**Search Index**
- Build script at `/scripts/build-search-index.js`
- Generates `/public/search-index.json` at build time
- Indexes contracts, encyclopedia, consular docs, pages
- Includes keywords, jurisdiction, lastVerified fields

### Files Added

- `/app/[lang]/encyclopedia/common-misconceptions/page.tsx`
- `/components/SearchModal.tsx`
- `/components/SearchButton.tsx`
- `/scripts/build-search-index.js`
- `/public/search-index.json`
- `/components/contracts/*` (9 new components)

### Technical

- Added `build:search` npm script
- Updated `build` to run search index generation first
- Added `.gitignore` for `node_modules/` and `.next/`
