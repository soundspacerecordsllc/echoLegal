// app/control-panel/layout.tsx
// Root layout for the Control Panel product area.
// Separate from the [lang] content site. No i18n (English only for MVP).

import '@/app/globals.css'

export const metadata = {
  title: 'Compliance Control Panel | EchoLegal',
  description:
    'Compliance tracking for foreign-owned single-member LLCs in the United States.',
  robots: 'noindex, nofollow', // private app, not indexed
}

export default function ControlPanelRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-surface text-ink min-h-screen">
        {children}
      </body>
    </html>
  )
}
