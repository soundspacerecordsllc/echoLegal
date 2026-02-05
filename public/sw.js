/**
 * EchoLegal Service Worker
 *
 * Conservative offline-first strategy for legal reference content.
 * Caches: homepage, encyclopedia landing, concept pages, static assets.
 * Does NOT cache: API routes, forms, admin, documents, dynamic endpoints.
 */

const CACHE_NAME = 'echolegal-v1'

// Pages to pre-cache on install
const PRECACHE_URLS = [
  '/en',
  '/tr',
  '/en/encyclopedia',
  '/tr/encyclopedia',
  '/en/encyclopedia/concepts/contract-formation-enforceability',
  '/en/encyclopedia/concepts/governing-law-jurisdiction',
  '/en/encyclopedia/concepts/common-law-vs-civil-law',
  '/tr/encyclopedia/concepts/contract-formation-enforceability',
  '/tr/encyclopedia/concepts/governing-law-jurisdiction',
  '/tr/encyclopedia/concepts/common-law-vs-civil-law',
]

// Paths that should NEVER be cached
const NEVER_CACHE = [
  '/api/',
  '/admin',
  '/documents/',
  '/_next/data/',
]

function shouldNeverCache(url) {
  const path = new URL(url).pathname
  return NEVER_CACHE.some(prefix => path.startsWith(prefix))
}

function isNavigationRequest(request) {
  return request.mode === 'navigate' ||
    (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'))
}

function isStaticAsset(url) {
  const path = new URL(url).pathname
  return path.startsWith('/_next/static/') || path.match(/\.(js|css|woff2?|png|jpg|svg|ico)$/)
}

function isEncyclopediaPage(url) {
  const path = new URL(url).pathname
  return path.match(/^\/(en|tr)\/encyclopedia/)
}

// ── Install ─────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Pre-cache core pages; don't block install if individual fetches fail
      return Promise.allSettled(
        PRECACHE_URLS.map(url =>
          cache.add(url).catch(() => {
            // Non-critical — page will be cached on first visit instead
          })
        )
      )
    }).then(() => self.skipWaiting())
  )
})

// ── Activate ────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  )
})

// ── Fetch ───────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Only handle GET requests
  if (request.method !== 'GET') return

  // Never cache excluded paths
  if (shouldNeverCache(request.url)) return

  // Static assets: cache-first (immutable builds)
  if (isStaticAsset(request.url)) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetchAndCache(request))
    )
    return
  }

  // HTML pages: network-first, fall back to cache
  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Only cache encyclopedia and homepage responses
          const path = new URL(request.url).pathname
          if (isEncyclopediaPage(request.url) ||
              path === '/en' || path === '/tr' ||
              path === '/en/' || path === '/tr/') {
            const clone = response.clone()
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
          }
          return response
        })
        .catch(() => caches.match(request))
    )
    return
  }
})

function fetchAndCache(request) {
  return fetch(request).then(response => {
    if (response.ok) {
      const clone = response.clone()
      caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
    }
    return response
  })
}
