# EchoLegal Test Checklist

**Last Updated:** 2026-01-25

---

## Pre-Launch QA Checklist

### 1. Automated Smoke Test

Run the automated download verification:

```bash
# Local development
npm run dev
./scripts/smoke-test-downloads.sh http://localhost:3000

# Production
./scripts/smoke-test-downloads.sh https://www.echo-legal.com
```

Expected: All downloads return HTTP 200

---

### 2. Manual Payment Flow Tests

#### 2.1 Paid Download Test ($20)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Go to `/tr/contracts/nda` | Page loads correctly |
| 2 | Click "$20 Öde (Önerilen)" button | Stripe checkout opens |
| 3 | Complete payment with test card `4242 4242 4242 4242` | Payment succeeds |
| 4 | Verify redirect/confirmation | Success message shown |
| 5 | Verify download link works | File downloads correctly |

**Test on:**
- [ ] Desktop Chrome
- [ ] Desktop Safari
- [ ] Mobile iOS Safari
- [ ] Mobile Android Chrome

#### 2.2 Free Download Test ($0)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Go to `/tr/contracts/nda` | Page loads correctly |
| 2 | Click "Ücretsiz İndir" button | Download starts immediately |
| 3 | Open downloaded file | File opens in Word/compatible app |
| 4 | Verify content | Document contains expected content |

**Test on:**
- [ ] Desktop Chrome
- [ ] Desktop Safari
- [ ] Mobile iOS Safari
- [ ] Mobile Android Chrome

---

### 3. Legal Kit Download Tests

#### 3.1 ABD Business Starter Kit

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Go to `/tr/amerika/legal-kitler/abd-business-starter-legal-kit` | Page loads |
| 2 | Click "$20 Öde" | Stripe checkout opens |
| 3 | Click "Ücretsiz İndir" | ZIP file downloads |
| 4 | Extract ZIP | Contains 6 DOCX files |

**Files expected in ZIP:**
- [ ] NDA-EN.docx
- [ ] GizlilikSozlesmesi-TR.docx
- [ ] IndependentContractorAgreement-EN.docx
- [ ] BagimsizYukleniciSozlesmesi-TR.docx
- [ ] Service-Agreement-EN.docx
- [ ] Service-Agreement-TR.docx

#### 3.2 TR-US Legal Bridge Library

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Go to `/tr/amerika/legal-kitler/tr-us-legal-bridge-mini-library` | Page loads |
| 2 | Click "Ücretsiz İndir" | ZIP file downloads |
| 3 | Extract ZIP | Contains 14 DOCX files |

---

### 4. Cross-Browser Testing

| Browser | Contract Page | Download | Kit Page | Kit Download |
|---------|--------------|----------|----------|--------------|
| Chrome Desktop | [ ] | [ ] | [ ] | [ ] |
| Safari Desktop | [ ] | [ ] | [ ] | [ ] |
| Firefox Desktop | [ ] | [ ] | [ ] | [ ] |
| Chrome Mobile | [ ] | [ ] | [ ] | [ ] |
| Safari iOS | [ ] | [ ] | [ ] | [ ] |

---

### 5. Amerika Hub Page Tests

| Page | Route | Loads | Links Work | FAQ Expands |
|------|-------|-------|------------|-------------|
| Hub Index | `/tr/amerika` | [ ] | [ ] | N/A |
| ABD'ye Gelme Yolları | `/tr/amerika/abdye-gelme-yollari` | [ ] | [ ] | [ ] |
| Turist Vizesi | `/tr/amerika/turist-vizesi-gercekleri` | [ ] | [ ] | [ ] |
| Statü Geçiş | `/tr/amerika/statuden-statuye-gecis-gercekleri` | [ ] | [ ] | [ ] |
| LLC Kurmak | `/tr/amerika/abdde-llc-kurmak` | [ ] | [ ] | [ ] |
| LLC vs Corp | `/tr/amerika/llc-mi-corp-mu` | [ ] | [ ] | [ ] |
| Banka Hesabı | `/tr/amerika/abdde-banka-hesabi` | [ ] | [ ] | [ ] |
| IRS Vergi | `/tr/amerika/irs-vergi-gercekleri` | [ ] | [ ] | [ ] |
| Sözleşmeler | `/tr/amerika/abdde-is-yapanlar-icin-sozlesmeler` | [ ] | [ ] | [ ] |
| NY Law | `/tr/amerika/ny-law-neden-tercih-edilir` | [ ] | [ ] | [ ] |
| Platform | `/tr/amerika/platform-ne-yapar-ne-yapmaz` | [ ] | [ ] | [ ] |

---

### 6. Mobile Responsiveness

| Page Type | Portrait | Landscape | Touch Targets OK |
|-----------|----------|-----------|------------------|
| Contract Page | [ ] | [ ] | [ ] |
| Kit Page | [ ] | [ ] | [ ] |
| Amerika Hub | [ ] | [ ] | [ ] |
| Hub Content Page | [ ] | [ ] | [ ] |

---

### 7. SEO & Schema Verification

| Check | Tool | Status |
|-------|------|--------|
| Sitemap accessible | Browser `/sitemap.xml` | [ ] |
| Robots.txt correct | Browser `/robots.txt` | [ ] |
| FAQ Schema valid | Google Rich Results Test | [ ] |
| Breadcrumb Schema valid | Google Rich Results Test | [ ] |
| No broken links | Screaming Frog / manual | [ ] |

---

### 8. Performance Checks

| Metric | Target | Actual |
|--------|--------|--------|
| First Contentful Paint | < 1.8s | [ ] |
| Largest Contentful Paint | < 2.5s | [ ] |
| Time to Interactive | < 3.8s | [ ] |
| Mobile PageSpeed Score | > 80 | [ ] |
| Desktop PageSpeed Score | > 90 | [ ] |

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| QA | | | |
| Legal Review | | | |

---

## Known Issues

<!-- Document any known issues that should be monitored -->

1. _None currently documented_

---

## Notes

- All Stripe payment links point to production Stripe account
- Free downloads do not require any authentication
- ZIP files are served directly from `/public/documents/kits/`
