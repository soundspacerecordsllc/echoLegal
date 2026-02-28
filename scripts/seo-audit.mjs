#!/usr/bin/env node
// scripts/seo-audit.mjs
// Automated SEO audit: validates sitemap XML structure + hreflang alternates,
// then fetches every URL and checks canonical + hreflang in HTML <head>.
// Requires Node 18+ (global fetch).

const SITE = process.env.AUDIT_URL || process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://echo-legal.com'
const SITEMAP_URL = `${SITE}/sitemap.xml`
const REQUIRED_HREFLANGS = ['en', 'tr', 'x-default']
const CONCURRENCY = 5
const REQUEST_TIMEOUT_MS = 15_000
const USER_AGENT = 'EchoLegalSEOAudit/1.0'

// ── helpers ──────────────────────────────────────────────────────────────────

function extractLocs(xml) {
  const locs = []
  const re = /<loc>([^<]+)<\/loc>/g
  let m
  while ((m = re.exec(xml)) !== null) locs.push(m[1].trim())
  return locs
}

function extractMetaTags(html) {
  const tags = []
  const re = /<meta\s[^>]*>/gi
  let m
  while ((m = re.exec(html)) !== null) tags.push(m[0])
  return tags
}

function extractLinkTags(html) {
  const tags = []
  const re = /<link\s[^>]*>/gi
  let m
  while ((m = re.exec(html)) !== null) tags.push(m[0])
  return tags
}

function attr(tag, name) {
  const re = new RegExp(`${name}=["']([^"']+)["']`, 'i')
  const m = tag.match(re)
  return m ? m[1] : null
}

async function fetchOnce(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
    return await res.text()
  } finally {
    clearTimeout(timer)
  }
}

async function fetchText(url) {
  try {
    return await fetchOnce(url)
  } catch {
    // retry once on network/timeout errors
    return await fetchOnce(url)
  }
}

/** Fetch with response metadata (content-type). Retries once. */
async function fetchResponse(url) {
  async function once() {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
        redirect: 'follow',
        signal: controller.signal,
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const contentType = res.headers.get('content-type') || ''
      const body = await res.text()
      return { contentType, body }
    } finally {
      clearTimeout(timer)
    }
  }
  try {
    return await once()
  } catch {
    return await once()
  }
}

// ── sitemap XML validation ──────────────────────────────────────────────────

/**
 * Validate sitemap XML structure, namespace, hreflang alternates per <url>,
 * and duplicate <loc> detection. Returns an array of error strings.
 */
function auditSitemapXml(xml, contentType) {
  const errors = []

  // 1. Must be XML (content-type or body structure)
  const isXmlContentType = contentType.includes('xml')
  const trimmed = xml.trimStart()
  const startsXml = trimmed.startsWith('<?xml') || trimmed.startsWith('<urlset')
  if (!isXmlContentType && !startsXml) {
    errors.push(
      `Sitemap is not valid XML (content-type: ${contentType}, body does not start with <?xml or <urlset>)`
    )
    return errors // cannot parse further
  }

  // 2. xmlns:xhtml namespace must be declared
  if (!/xmlns:xhtml\s*=\s*["']http:\/\/www\.w3\.org\/1999\/xhtml["']/.test(xml)) {
    errors.push('Missing xmlns:xhtml="http://www.w3.org/1999/xhtml" on <urlset>')
  }

  // 3. At least one <xhtml:link> must exist
  if (!/<xhtml:link\s/.test(xml)) {
    errors.push('Zero <xhtml:link> tags found in sitemap')
    return errors
  }

  // 4. Parse each <url> block
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) || []
  if (urlBlocks.length === 0) {
    errors.push('No <url> entries found in sitemap')
    return errors
  }

  const allLocs = []

  for (const block of urlBlocks) {
    // 4a. Exactly one <loc>
    const locMatches = block.match(/<loc>([^<]+)<\/loc>/g) || []
    if (locMatches.length === 0) {
      errors.push('<url> block missing <loc>')
      continue
    }
    const loc = locMatches[0].replace(/<\/?loc>/g, '').trim()
    if (locMatches.length > 1) {
      errors.push(`${loc}: multiple <loc> tags (${locMatches.length})`)
    }
    allLocs.push(loc)

    // 4b. Extract hreflang values from xhtml:link tags
    const hreflangRe = /<xhtml:link\s[^>]*hreflang=["']([^"']+)["'][^>]*\/?>/g
    const seen = new Set()
    const dupes = []
    let match
    while ((match = hreflangRe.exec(block)) !== null) {
      const lang = match[1]
      if (seen.has(lang)) dupes.push(lang)
      seen.add(lang)
    }

    // 4c. No duplicate hreflang within same <url>
    for (const d of dupes) {
      errors.push(`${loc}: duplicate hreflang="${d}"`)
    }

    // 4d. Must have all required hreflangs
    for (const req of REQUIRED_HREFLANGS) {
      if (!seen.has(req)) {
        errors.push(`${loc}: missing hreflang="${req}"`)
      }
    }
  }

  // 5. No duplicate <loc> across entire sitemap
  const locSet = new Set()
  for (const loc of allLocs) {
    if (locSet.has(loc)) {
      errors.push(`Duplicate <loc> in sitemap: ${loc}`)
    }
    locSet.add(loc)
  }

  return errors
}

async function pool(tasks, concurrency) {
  const results = []
  let i = 0
  async function worker() {
    while (i < tasks.length) {
      const idx = i++
      results[idx] = await tasks[idx]()
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker))
  return results
}

// ── audit one URL ────────────────────────────────────────────────────────────

function auditPage(url, html) {
  const errors = []
  const links = extractLinkTags(html)
  const path = new URL(url).pathname

  // 1. Canonical checks
  const canonicals = links.filter(
    (t) => attr(t, 'rel') === 'canonical'
  )

  if (canonicals.length === 0) {
    errors.push('Missing <link rel="canonical">')
  } else if (canonicals.length > 1) {
    errors.push(`Multiple canonicals (${canonicals.length})`)
  } else {
    const href = attr(canonicals[0], 'href') || ''

    // 2. Must be echo-legal.com
    if (!href.startsWith(SITE)) {
      errors.push(`Canonical host not echo-legal.com: ${href}`)
    }

    // 4. Language prefix check
    if (path.startsWith('/en') && !href.startsWith(`${SITE}/en`)) {
      errors.push(`EN page canonical doesn't start with ${SITE}/en: ${href}`)
    }
    if (path.startsWith('/tr') && !href.startsWith(`${SITE}/tr`)) {
      errors.push(`TR page canonical doesn't start with ${SITE}/tr: ${href}`)
    }
  }

  // 3. Hreflang checks
  const alternates = links.filter(
    (t) => attr(t, 'rel') === 'alternate' && attr(t, 'hreflang')
  )
  const hreflangMap = {}
  for (const t of alternates) {
    const lang = attr(t, 'hreflang')
    if (!lang) continue
    if (hreflangMap[lang]) {
      errors.push(`Duplicate hreflang="${lang}"`)
    }
    hreflangMap[lang] = attr(t, 'href')
  }

  for (const lang of REQUIRED_HREFLANGS) {
    if (!hreflangMap[lang]) {
      errors.push(`Missing hreflang="${lang}"`)
    }
  }

  // 5. Search pages must be noindex, follow
  if (isSearchPage(path)) {
    const metas = extractMetaTags(html)
    const robotsMeta = metas.find(
      (t) => attr(t, 'name')?.toLowerCase() === 'robots'
    )
    const robotsContent = robotsMeta ? attr(robotsMeta, 'content') || '' : ''
    if (!robotsContent.includes('noindex')) {
      errors.push('Search page missing robots "noindex"')
    }
    if (!robotsContent.includes('follow')) {
      errors.push('Search page missing robots "follow"')
    }
  }

  return errors
}

function isSearchPage(pathname) {
  // Matches /en/search, /tr/search (with or without trailing slash / query)
  return /^\/[a-z]{2}\/search\/?$/.test(pathname)
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Fetching sitemap: ${SITEMAP_URL}\n`)

  // ── Phase 1: Sitemap XML structural validation ──
  let xml
  let sitemapContentType
  try {
    const resp = await fetchResponse(SITEMAP_URL)
    xml = resp.body
    sitemapContentType = resp.contentType
  } catch (e) {
    console.error(`FATAL: Could not fetch sitemap – ${e.message}`)
    process.exit(1)
  }

  const sitemapErrors = auditSitemapXml(xml, sitemapContentType)
  const urls = extractLocs(xml)

  if (urls.length === 0) {
    console.error('FATAL: Sitemap contains zero <loc> entries.')
    process.exit(1)
  }
  console.log(`Found ${urls.length} URLs in sitemap.`)

  if (sitemapErrors.length) {
    console.log(`\nSitemap XML: ${sitemapErrors.length} issue(s) found:`)
    for (const e of sitemapErrors) console.log(`  - ${e}`)
  } else {
    console.log('Sitemap XML: OK (valid structure, namespace, hreflang alternates)')
  }
  console.log()

  // ── Phase 2: Per-page HTML canonical + hreflang checks ──
  const failures = []
  let passed = 0
  let fetchErrors = 0

  const tasks = urls.map((url) => async () => {
    let html
    try {
      html = await fetchText(url)
    } catch (e) {
      fetchErrors++
      failures.push({ url, errors: [`Fetch failed: ${e.message}`] })
      return
    }

    const errors = auditPage(url, html)
    if (errors.length) {
      failures.push({ url, errors })
    } else {
      passed++
    }
  })

  await pool(tasks, CONCURRENCY)

  // ── Phase 3: Search-page noindex probe (not in sitemap) ──
  const searchUrls = [`${SITE}/en/search`, `${SITE}/tr/search`]
  console.log(`Probing ${searchUrls.length} search page(s) for noindex...\n`)

  for (const sUrl of searchUrls) {
    let html
    try {
      html = await fetchText(sUrl)
    } catch (e) {
      fetchErrors++
      failures.push({ url: sUrl, errors: [`Fetch failed: ${e.message}`] })
      continue
    }
    const metas = extractMetaTags(html)
    const robotsMeta = metas.find(
      (t) => attr(t, 'name')?.toLowerCase() === 'robots'
    )
    const robotsContent = robotsMeta ? attr(robotsMeta, 'content') || '' : ''
    const searchErrors = []
    if (!robotsContent.includes('noindex')) {
      searchErrors.push('Search page missing robots "noindex"')
    }
    if (!robotsContent.includes('follow')) {
      searchErrors.push('Search page missing robots "follow"')
    }
    if (searchErrors.length) {
      failures.push({ url: sUrl, errors: searchErrors })
    } else {
      passed++
    }
  }

  // ── report ──
  const totalIssues = sitemapErrors.length + failures.length
  console.log('─'.repeat(60))

  if (totalIssues === 0) {
    console.log(`\nAll checks passed: sitemap XML valid, ${passed} page(s) OK.`)
    process.exit(0)
  }

  if (failures.length) {
    console.log(`\nFAILED: ${failures.length} page(s) with issues:\n`)
    for (const { url, errors } of failures) {
      console.log(`  ${url}`)
      for (const e of errors) console.log(`    - ${e}`)
      console.log()
    }
  }

  const parts = []
  if (sitemapErrors.length) parts.push(`${sitemapErrors.length} sitemap XML error(s)`)
  parts.push(`${passed} page(s) passed`)
  if (failures.length) parts.push(`${failures.length} page(s) failed`)
  if (fetchErrors) parts.push(`${fetchErrors} fetch error(s)`)
  console.log(`Summary: ${parts.join(', ')}`)
  process.exit(1)
}

main()
