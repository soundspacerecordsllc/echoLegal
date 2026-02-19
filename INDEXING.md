# EchoLegal Search Console Indexing Guide

**Last Updated:** 2026-01-25

---

## Prerequisites

1. Google Search Console access for `echo-legal.com`
2. Domain ownership verified in GSC

---

## Step 1: Submit Sitemap

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select property: `https://echo-legal.com`
3. In left sidebar, click **Sitemaps**
4. In "Add a new sitemap" field, enter: `sitemap.xml`
5. Click **Submit**
6. Verify status shows "Success"

**Expected URLs in sitemap:** ~80+ pages (TR and EN versions)

---

## Step 2: Request Indexing for Priority Pages

### High Priority: Amerika Hub Money Pages

Request indexing for these pages first (they have the highest conversion potential):

#### 1. ABD'de LLC Kurmak
```
https://echo-legal.com/tr/amerika/abdde-llc-kurmak
```
- Go to URL Inspection tool
- Paste the URL above
- Click "Request Indexing"

#### 2. ABD'de İş Yapanlar İçin Sözleşmeler
```
https://echo-legal.com/tr/amerika/abdde-is-yapanlar-icin-sozlesmeler
```
- Go to URL Inspection tool
- Paste the URL above
- Click "Request Indexing"

#### 3. IRS Vergi Gerçekleri
```
https://echo-legal.com/tr/amerika/irs-vergi-gercekleri
```
- Go to URL Inspection tool
- Paste the URL above
- Click "Request Indexing"

#### 4. Business Starter Kit
```
https://echo-legal.com/tr/amerika/legal-kitler/abd-business-starter-legal-kit
```
- Go to URL Inspection tool
- Paste the URL above
- Click "Request Indexing"

---

## Step 3: Request Indexing for All Amerika Hub Pages

After priority pages, request indexing for remaining hub pages:

| Page | URL |
|------|-----|
| Amerika Hub | `https://echo-legal.com/tr/amerika` |
| ABD'ye Gelme Yolları | `https://echo-legal.com/tr/amerika/abdye-gelme-yollari` |
| Turist Vizesi Gerçekleri | `https://echo-legal.com/tr/amerika/turist-vizesi-gercekleri` |
| Statüden Statüye Geçiş | `https://echo-legal.com/tr/amerika/statuden-statuye-gecis-gercekleri` |
| LLC mi Corp mu? | `https://echo-legal.com/tr/amerika/llc-mi-corp-mu` |
| ABD'de Banka Hesabı | `https://echo-legal.com/tr/amerika/abdde-banka-hesabi` |
| NY Law Neden Tercih Edilir | `https://echo-legal.com/tr/amerika/ny-law-neden-tercih-edilir` |
| Platform Ne Yapar Ne Yapmaz | `https://echo-legal.com/tr/amerika/platform-ne-yapar-ne-yapmaz` |
| Legal Kitler Index | `https://echo-legal.com/tr/amerika/legal-kitler` |

---

## Step 4: Verify Indexing Status

After 24-48 hours:

1. Go to URL Inspection tool
2. Check each priority URL
3. Look for "URL is on Google" status
4. If "URL is not on Google", click "Request Indexing" again

---

## Step 5: Monitor Coverage

Weekly check:

1. Go to **Coverage** in left sidebar
2. Review "Valid" vs "Excluded" pages
3. Check for any "Errors" that need fixing
4. Review "Valid with warnings" for potential issues

---

## Troubleshooting

### "Discovered - currently not indexed"
- Page is in queue, will be indexed eventually
- Can request indexing to speed up

### "Crawled - currently not indexed"
- Google found the page but decided not to index
- Check for: thin content, duplicate content, noindex tags
- Ensure page has unique, valuable content

### "Excluded by 'noindex' tag"
- Check for accidental noindex meta tags
- Verify robots.txt isn't blocking

---

## Notes

- Google limits indexing requests to ~10-20 per day
- Focus on TR pages first (primary audience)
- EN versions will often be discovered through internal linking
- Re-check status weekly until all priority pages are indexed

---

## Quick Reference: URL Inspection Steps

1. Copy URL from table above
2. Paste into Search Console URL Inspection bar
3. Wait for inspection to complete
4. Click "Request Indexing" button
5. Confirm the request
6. Move to next URL

---

**Contact:** For technical issues, check Vercel deployment logs or site build status.
