#!/usr/bin/env node
/**
 * Generate minimal PWA icons for EchoLegal.
 * Produces PNG files from raw pixel data (no external dependencies).
 * Icons: dark background (#111827) with gold "EL" monogram (#C9A227).
 */

const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

// ── Minimal PNG encoder ─────────────────────────────────────────────
function createPNG(width, height, pixels) {
  // pixels: Uint8Array of RGBA data (width * height * 4 bytes)
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  // IHDR
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8  // bit depth
  ihdr[9] = 6  // RGBA
  ihdr[10] = 0 // compression
  ihdr[11] = 0 // filter
  ihdr[12] = 0 // interlace
  const ihdrChunk = makeChunk('IHDR', ihdr)

  // IDAT – filter type 0 (None) for each row
  const raw = Buffer.alloc(height * (1 + width * 4))
  for (let y = 0; y < height; y++) {
    const rowStart = y * (1 + width * 4)
    raw[rowStart] = 0 // filter: None
    pixels.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4)
  }
  const compressed = zlib.deflateSync(raw, { level: 9 })
  const idatChunk = makeChunk('IDAT', compressed)

  // IEND
  const iendChunk = makeChunk('IEND', Buffer.alloc(0))

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk])
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeB = Buffer.from(type, 'ascii')
  const crc = crc32(Buffer.concat([typeB, data]))
  const crcB = Buffer.alloc(4)
  crcB.writeUInt32BE(crc, 0)
  return Buffer.concat([len, typeB, data, crcB])
}

// CRC32 for PNG
const crcTable = (() => {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)
    }
    table[n] = c
  }
  return table
})()

function crc32(buf) {
  let crc = 0xFFFFFFFF
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8)
  }
  return (crc ^ 0xFFFFFFFF) >>> 0
}

// ── Drawing primitives ──────────────────────────────────────────────
function fillRect(pixels, w, x, y, rw, rh, r, g, b, a = 255) {
  for (let dy = 0; dy < rh; dy++) {
    for (let dx = 0; dx < rw; dx++) {
      const px = x + dx
      const py = y + dy
      if (px >= 0 && px < w && py >= 0 && py < w) {
        const idx = (py * w + px) * 4
        pixels[idx] = r
        pixels[idx + 1] = g
        pixels[idx + 2] = b
        pixels[idx + 3] = a
      }
    }
  }
}

// Simple bitmap font for "E" and "L" – block-style monogram
function drawE(pixels, size, ox, oy, scale, r, g, b) {
  // E: 5 wide x 7 tall grid
  const pattern = [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
  ]
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 5; col++) {
      if (pattern[row][col]) {
        fillRect(pixels, size, ox + col * scale, oy + row * scale, scale, scale, r, g, b)
      }
    }
  }
}

function drawL(pixels, size, ox, oy, scale, r, g, b) {
  // L: 5 wide x 7 tall grid
  const pattern = [
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,1,1,1,1],
  ]
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 5; col++) {
      if (pattern[row][col]) {
        fillRect(pixels, size, ox + col * scale, oy + row * scale, scale, scale, r, g, b)
      }
    }
  }
}

// ── Generate icon at given size ─────────────────────────────────────
function generateIcon(size, maskable = false) {
  const pixels = Buffer.alloc(size * size * 4)

  // Background: #111827 (gray-900)
  const bgR = 17, bgG = 24, bgB = 39
  for (let i = 0; i < size * size; i++) {
    pixels[i * 4] = bgR
    pixels[i * 4 + 1] = bgG
    pixels[i * 4 + 2] = bgB
    pixels[i * 4 + 3] = 255
  }

  // Gold monogram: #C9A227
  const goldR = 201, goldG = 162, goldB = 39

  // Maskable icons need a larger safe zone (inner 80%)
  const safeInset = maskable ? Math.floor(size * 0.1) : 0
  const safeSize = size - safeInset * 2

  // Scale: each cell in the 5x7 grid
  const totalGridW = 11 // E(5) + gap(1) + L(5)
  const totalGridH = 7
  const scale = Math.floor(Math.min(safeSize * 0.6 / totalGridW, safeSize * 0.6 / totalGridH))

  const monogramW = totalGridW * scale
  const monogramH = totalGridH * scale
  const ox = safeInset + Math.floor((safeSize - monogramW) / 2)
  const oy = safeInset + Math.floor((safeSize - monogramH) / 2)

  drawE(pixels, size, ox, oy, scale, goldR, goldG, goldB)
  drawL(pixels, size, ox + 6 * scale, oy, scale, goldR, goldG, goldB)

  return createPNG(size, size, pixels)
}

// ── Write files ─────────────────────────────────────────────────────
const outDir = path.join(__dirname, '..', 'public', 'icons')
fs.mkdirSync(outDir, { recursive: true })

const icon192 = generateIcon(192)
fs.writeFileSync(path.join(outDir, 'icon-192.png'), icon192)
console.log('Generated icon-192.png')

const icon512 = generateIcon(512)
fs.writeFileSync(path.join(outDir, 'icon-512.png'), icon512)
console.log('Generated icon-512.png')

const iconMask = generateIcon(512, true)
fs.writeFileSync(path.join(outDir, 'icon-maskable-512.png'), iconMask)
console.log('Generated icon-maskable-512.png')

// Apple touch icon (180x180)
const apple = generateIcon(180)
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), apple)
console.log('Generated apple-touch-icon.png')

// Favicon (32x32) - simplified
const fav = generateIcon(32)
fs.writeFileSync(path.join(outDir, 'favicon-32.png'), fav)
console.log('Generated favicon-32.png')

console.log('All icons generated.')
