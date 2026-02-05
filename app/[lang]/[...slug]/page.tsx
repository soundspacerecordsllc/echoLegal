import { notFound } from 'next/navigation'

// This catch-all route handles unknown paths under [lang]
// It triggers the not-found.tsx page
export default function CatchAllPage() {
  notFound()
}
