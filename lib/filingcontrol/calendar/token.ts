// lib/filingcontrol/calendar/token.ts
// Calendar token generation and management.
// Tokens provide private, token-based access to ICS feeds.

import { randomUUID } from 'crypto'

/**
 * Generate a new calendar token.
 * Uses crypto.randomUUID() for uniqueness.
 */
export function generateCalendarToken(): string {
  return randomUUID()
}

/**
 * Ensure a user row has a calendar_token.
 * Returns { calendar_token, needsUpdate } — the caller should persist
 * the token if needsUpdate is true.
 *
 * Does NOT regenerate if a token already exists.
 */
export function ensureCalendarToken(userRow: {
  calendar_token?: string | null
}): { calendar_token: string; needsUpdate: boolean } {
  if (userRow.calendar_token) {
    return { calendar_token: userRow.calendar_token, needsUpdate: false }
  }
  return { calendar_token: generateCalendarToken(), needsUpdate: true }
}
