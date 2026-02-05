#!/usr/bin/env node
/**
 * Verify that DOCX downloads are accessible.
 * Usage: node scripts/check-downloads.mjs [baseUrl]
 * Default baseUrl: http://localhost:3000
 */

const baseUrl = process.argv[2] || 'http://localhost:3000'

const testFiles = [
  '/documents/NDA-EN.docx',
  '/documents/GizlilikSozlesmesi-TR.docx',
  '/documents/Service-Agreement-EN.docx',
  '/documents/Service-Agreement-TR.docx',
]

async function checkDownloads() {
  console.log(`Checking downloads at ${baseUrl}\n`)
  let allPassed = true

  for (const file of testFiles) {
    const url = `${baseUrl}${file}`
    try {
      const res = await fetch(url, { method: 'HEAD' })
      const contentType = res.headers.get('content-type') || ''
      const status = res.status

      if (status === 200 && contentType.includes('openxmlformats')) {
        console.log(`✓ ${file} - ${status}`)
      } else {
        console.log(`✗ ${file} - ${status} (${contentType})`)
        allPassed = false
      }
    } catch (err) {
      console.log(`✗ ${file} - Error: ${err.message}`)
      allPassed = false
    }
  }

  console.log('')
  if (allPassed) {
    console.log('All downloads OK')
    process.exit(0)
  } else {
    console.log('Some downloads failed')
    process.exit(1)
  }
}

checkDownloads()
