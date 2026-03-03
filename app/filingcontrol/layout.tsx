// app/filingcontrol/layout.tsx
// Root layout for the FilingControl standalone app.
// Separate from EchoLegal. No i18n. Navy/slate palette only.

import '@/app/globals.css'
import '@/app/filingcontrol/filingcontrol.css'

export const metadata = {
  title: 'FilingControl — Foreign-Owned LLC Compliance Radar',
  description:
    'Track IRS Form 5472, BOI, FBAR, and federal reporting deadlines for foreign-owned single-member LLCs.',
  robots: 'noindex, nofollow',
}

export default function FilingControlRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="fc-theme bg-[var(--fc-slate-50)] text-[var(--fc-navy)] min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
