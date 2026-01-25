# EchoLegal Amerika Hub - Review & Verification Checklist

**Last Updated:** 2026-01-25
**Status:** DRAFT - Awaiting Legal Review

---

## Page-by-Page Status

### Hub Main Page
| Page | Route | Status | Needs Verification |
|------|-------|--------|-------------------|
| Amerika Hub | `/tr/amerika` | ✅ Complete | No |

### Immigration Section
| Page | Route | Status | Needs Verification |
|------|-------|--------|-------------------|
| ABD'ye Gelme Yolları | `/tr/amerika/abdye-gelme-yollari` | ✅ Complete | **YES** |
| Turist Vizesi Gerçekleri | `/tr/amerika/turist-vizesi-gercekleri` | ✅ Complete | **YES** |
| Statüden Statüye Geçiş | `/tr/amerika/statuden-statuye-gecis-gercekleri` | ✅ Complete | **YES** |

### Business Section
| Page | Route | Status | Needs Verification |
|------|-------|--------|-------------------|
| ABD'de LLC Kurmak | `/tr/amerika/abdde-llc-kurmak` | ✅ Complete | **YES** |
| LLC mi Corp mu? | `/tr/amerika/llc-mi-corp-mu` | ✅ Complete | **YES** |
| ABD'de Banka Hesabı | `/tr/amerika/abdde-banka-hesabi` | ✅ Complete | **YES** |

### Tax Section
| Page | Route | Status | Needs Verification |
|------|-------|--------|-------------------|
| IRS Vergi Gerçekleri | `/tr/amerika/irs-vergi-gercekleri` | ✅ Complete | **YES** |

### Contracts Section
| Page | Route | Status | Needs Verification |
|------|-------|--------|-------------------|
| ABD'de İş Yapanlar İçin Sözleşmeler | `/tr/amerika/abdde-is-yapanlar-icin-sozlesmeler` | ✅ Complete | No |
| NY Law Neden Tercih Edilir | `/tr/amerika/ny-law-neden-tercih-edilir` | ✅ Complete | No |

### Platform Section
| Page | Route | Status | Needs Verification |
|------|-------|--------|-------------------|
| Platform Ne Yapar Ne Yapmaz | `/tr/amerika/platform-ne-yapar-ne-yapmaz` | ✅ Complete | No |

### Legal Kits
| Page | Route | Status | Needs Verification |
|------|-------|--------|-------------------|
| Legal Kits Index | `/tr/amerika/legal-kitler` | ✅ Complete | No |
| ABD Business Starter Kit | `/tr/amerika/legal-kitler/abd-business-starter-legal-kit` | ✅ Complete | No |
| ABD'ye Gelmeden Önce Rehberi | `/tr/amerika/legal-kitler/abdye-gelmeden-once-hukuki-gercekler-rehberi` | ⏳ Pending | No |
| TR-US Legal Bridge Library | `/tr/amerika/legal-kitler/tr-us-legal-bridge-mini-library` | ⏳ Pending | No |

---

## Items Flagged "NEEDS VERIFICATION"

### High Priority - Immigration Content

#### 1. ABD'ye Gelme Yolları (`/tr/amerika/abdye-gelme-yollari`)
**Sections requiring verification:**
- Göçmen vize kategorileri (EB-1 through EB-5 descriptions)
- E-2 Treaty Investor requirements for Turkish nationals
- Current H-1B cap and lottery process

**Lexis Research Queries:**
- `immigrant visa categories INA 201-203`
- `E-2 treaty investor Turkey substantial investment`

**Questions for Legal Approval:**
- [ ] Verify current E-2 substantial investment guidance for Turkish nationals
- [ ] Confirm H-1B FY2026 cap status and lottery dates
- [ ] Review EB-5 investment amounts ($800K/$1.05M) - confirm current

---

#### 2. Turist Vizesi Gerçekleri (`/tr/amerika/turist-vizesi-gercekleri`)
**Sections requiring verification:**
- 214(b) presumption explanation
- Remote work on B visa guidance (gray area - verify current interpretation)

**Questions for Legal Approval:**
- [ ] Review 214(b) explanation for accuracy
- [ ] Verify remote work guidance reflects current DOS/CBP interpretation
- [ ] Confirm 214(b) reapplication guidance is appropriate

---

#### 3. Statüden Statüye Geçiş Gerçekleri (`/tr/amerika/statuden-statuye-gecis-gercekleri`)
**Sections requiring verification:**
- 30/60 day rule explanation
- Unlawful presence bars (3-year/10-year)
- Change of Status vs Adjustment of Status distinctions

**Lexis Research Queries:**
- `change of status while I-94 expired`
- `adjustment of status 30/60 day rule`
- `preconceived intent doctrine change of status`

**Questions for Legal Approval:**
- [ ] Verify 30/60 day rule explanation matches current USCIS/DOS policy
- [ ] Confirm unlawful presence bar triggers are accurately described
- [ ] Review "pending application" guidance for accuracy

---

### High Priority - Business/Tax Content

#### 4. ABD'de LLC Kurmak (`/tr/amerika/abdde-llc-kurmak`)
**Sections requiring verification:**
- Delaware vs Wyoming comparison (fees may have changed)
- EIN application process for non-residents
- State-specific annual requirements

**Questions for Legal Approval:**
- [ ] Verify Delaware franchise tax minimum ($300)
- [ ] Confirm Wyoming annual fee ($60)
- [ ] Review EIN process for non-resident owners

---

#### 5. IRS Vergi Gerçekleri (`/tr/amerika/irs-vergi-gercekleri`)
**Sections requiring verification:**
- Substantial presence test formula
- FATCA thresholds
- FBAR threshold ($10,000)
- US-Turkey tax treaty summary

**Lexis Research Queries:**
- `substantial presence test 26 USC 7701(b)`
- `US Turkey tax treaty TIAS 10205 provisions`

**Questions for Legal Approval:**
- [ ] Verify substantial presence test formula is current
- [ ] Confirm FATCA reporting thresholds
- [ ] Verify FBAR $10,000 threshold and penalty structure
- [ ] Review US-Turkey treaty summary for accuracy

---

## Lexis/Westlaw Research Checklist

For pages marked "Needs Verification," the following primary sources should be confirmed:

### Immigration
- [ ] INA § 214(b) - Presumption of immigrant intent
- [ ] 8 CFR § 248 - Change of nonimmigrant classification
- [ ] 8 U.S.C. § 1255 - Adjustment of Status
- [ ] 9 FAM 402.2 - B Visa guidance
- [ ] USCIS Policy Manual - Change of Status chapter

### Business
- [ ] 6 Del. C. § 18-101 et seq. - Delaware LLC Act
- [ ] Wyo. Stat. § 17-29-101 et seq. - Wyoming LLC Act
- [ ] Current Delaware and Wyoming filing fees

### Tax
- [ ] 26 U.S.C. § 7701(b) - Tax residency definitions
- [ ] 31 U.S.C. § 5311 et seq. - FBAR requirements
- [ ] US-Turkey Tax Treaty (TIAS 10205) - current provisions
- [ ] IRS Publication 519 - U.S. Tax Guide for Aliens

---

## Components Created

| Component | Location | Status |
|-----------|----------|--------|
| Breadcrumb | `/components/Breadcrumb.tsx` | ✅ Complete |
| FAQAccordion | `/components/FAQAccordion.tsx` | ✅ Complete |
| TrustStrip | `/components/TrustStrip.tsx` | ✅ Complete |

---

## Data Files Created

| File | Location | Status |
|------|----------|--------|
| Content Registry | `/lib/amerika-content-registry.ts` | ✅ Complete |
| Hub Data | `/lib/amerika-hub.ts` | ✅ Complete |

---

## Voice & Style Compliance Checklist

For each page, verify:
- [ ] No "Bize ulaşın" or consultation language
- [ ] No marketing/sales/hype language
- [ ] No fear/panic/manipulative expressions
- [ ] No excessive disclaimers (one per page is sufficient)
- [ ] No blog/forum/social media tone
- [ ] No personal opinions ("bence", "bizce")
- [ ] No vague/unsourced claims
- [ ] No false authority implications
- [ ] No AI attribution in public content
- [ ] Encyclopedic, authoritative tone maintained

---

## Pre-Publish Final Checks

Before marking any page APPROVED:

1. [ ] All legal claims verified against primary sources
2. [ ] Dates updated to reflect verification date
3. [ ] Internal links tested and working
4. [ ] Bilingual content matches (EN/TR consistency)
5. [ ] No broken download links
6. [ ] FAQ schema implemented correctly
7. [ ] Breadcrumb schema implemented correctly
8. [ ] Mobile responsiveness tested
9. [ ] Voice compliance verified

---

## Approval Log

| Page | Reviewed By | Date | Status |
|------|-------------|------|--------|
| - | - | - | Awaiting review |

---

## Notes for Legal Review

1. **Immigration content** is the highest risk area. All statements about visa categories, status changes, and consequences should be verified against current USCIS/DOS guidance.

2. **Tax content** should be reviewed by someone with tax expertise. The general information approach is appropriate, but specific thresholds and rules change.

3. **Contract templates** referenced in the hub are existing templates on the platform - they don't need re-review unless content has changed.

4. **"Pay What You Can" model** - ensure all payment links work and download links function correctly before launch.

---

**NOTHING GOES LIVE UNTIL MARKED APPROVED**
