# EchoLegal Citation Canon v1

Standard for legal citation formatting in structured metadata fields.

**Scope:** `primarySources` data, registry `citation` fields, and any
machine-readable citation metadata. Does NOT apply to narrative body text
or user-facing prose.

**Module:** `lib/citations/canon.ts`

---

## Rules

### 1. Federal statutes

```
26 U.S.C. § 7701(a)(3)
26 U.S.C. §§ 1441–1443
8 U.S.C. § 1101 et seq.
```

- Always `U.S.C.` with periods.
- Always one space after `§` or `§§`.
- En dash (`–`) for section and subsection ranges.

### 2. Federal regulations

```
26 C.F.R. § 301.7701-1
26 C.F.R. §§ 301.7701-1 through 301.7701-3
```

- Always `C.F.R.` with periods.
- Use `through` (not en dash) for CFR section ranges — section numbers
  already contain hyphens.

### 3. State statutes (Bluebook abbreviations)

```
6 Del. C. § 18-101 et seq.
Wyo. Stat. § 17-29-101 et seq.
N.Y. Gen. Oblig. Law § 5-1401
```

### 4. Treaties

```
U.S.–Turkey Income Tax Treaty, TIAS 10205 (1996)
```

- Formal citation data: `U.S.–` with periods and en dash.
- Body text may use `US-Turkey` (informal).
- Always include TIAS number and year in citation fields.

### 5. Agency guidance

```
IRS Rev. Proc. 2023-32
IRS Pub. 515
IRS, Instructions for Form W-8BEN
```

- `Pub.` in citation fields; `Publication` acceptable in body text.
- `IRS, Instructions for Form [X]` — comma after IRS.

### 6. Section symbols

- One space after `§` or `§§`: `§ 7701`, never `§7701`.
- `§§` for ranges spanning multiple sections.
- `§` for single sections, even with subsection ranges.

### 7. Typography

- Straight quotes only (no curly quotes).
- En dash (`–`) for numeric ranges.
- No double spaces in citation text.

---

## What we do NOT normalize

- Body text. Narrative prose is written for human readers and uses
  informal conventions (`US-Turkey`, `Publication 515`, etc.).
- Internal planning documents (`REVIEW.md`, `GOVERNANCE_EXECUTION_PLAN.md`).
- Search query strings.
- Code comments (except inline citation examples in type definitions).

---

## Enforcement

- **Render-time:** `PrimarySources` component applies `normalizeCitationText()`
  automatically. Data entry does not need to be perfect.
- **Lint:** `node scripts/lint-citations.js` scans citation fields in
  registry files for common violations.
- **Tests:** `node scripts/test-citation-canon.js` validates the normalizer.

---

## Adding a new citation

1. Use the closest matching format from the rules above.
2. Prefer the official citation form (USC/CFR) over popular names.
3. Put popular names in the `label` field, not the `citation` field.
4. Include a URL to the authoritative source where available (eCFR,
   Congress.gov, IRS.gov).
