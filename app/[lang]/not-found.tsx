import Link from 'next/link'

// This component is rendered within the [lang] layout
// The lang is determined by the URL path
export default function NotFound() {
  // Since we can't use hooks in a server component,
  // we'll provide bilingual content
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
          <span className="block text-2xl text-gray-600 mt-2">Sayfa Bulunamadı</span>
        </h1>
        <p className="text-gray-600 mb-2">
          The page you are looking for does not exist or has been moved.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/en"
            className="px-6 py-2.5 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Homepage (EN)
          </Link>
          <Link
            href="/tr"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 transition-colors"
          >
            Ana Sayfa (TR)
          </Link>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/en/templates"
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            Templates →
          </Link>
          <Link
            href="/tr/sablonlar"
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            Şablonlar →
          </Link>
        </div>
      </div>
    </div>
  )
}
