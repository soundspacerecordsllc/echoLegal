// app/admin/layout.tsx
// Simple layout for admin pages

export const metadata = {
  title: 'Admin | EchoLegal',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}
