#!/usr/bin/env node
// scripts/seo-audit.mjs
// Automated SEO audit: fetches sitemap, checks canonical + hreflang on every URL.
// Requires Node 18+ (global fetch).

const SITE = 'https://echo-legal.com'
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

  let xml
  try {
    xml = await fetchText(SITEMAP_URL)
  } catch (e) {
    console.error(`FATAL: Could not fetch sitemap – ${e.message}`)
    process.exit(1)
  }

  const urls = extractLocs(xml)
  if (urls.length === 0) {
    console.error('FATAL: Sitemap contains zero <loc> entries.')
    process.exit(1)
  }
  console.log(`Found ${urls.length} URLs in sitemap.\n`)

  // Check for duplicate URLs in sitemap
  const seen = new Set()
  const dupes = []
  for (const u of urls) {
    if (seen.has(u)) dupes.push(u)
    seen.add(u)
  }
  if (dupes.length) {
    console.error('Duplicate URLs in sitemap:')
    dupes.forEach((d) => console.error(`  ${d}`))
    console.error()
  }

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

  // ── search-page noindex probe (these pages are not in the sitemap) ──
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
  console.log('─'.repeat(60))
  if (failures.length === 0 && dupes.length === 0) {
    console.log(`\nAll ${passed} URLs passed SEO checks.`)
    process.exit(0)
  }

  if (failures.length) {
    console.log(`\nFAILED: ${failures.length} URL(s) with issues:\n`)
    for (const { url, errors } of failures) {
      console.log(`  ${url}`)
      for (const e of errors) console.log(`    - ${e}`)
      console.log()
    }
  }

  console.log(`Summary: ${passed} passed, ${failures.length} failed${fetchErrors ? `, ${fetchErrors} fetch errors` : ''}${dupes.length ? `, ${dupes.length} sitemap duplicates` : ''}`)
  process.exit(1)
}

main()
