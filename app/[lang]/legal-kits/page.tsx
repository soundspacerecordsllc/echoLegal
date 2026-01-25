// app/[lang]/legal-kits/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'Legal Document Kits | Curated Bundles for Specific Needs | EchoLegal'
      : 'Hukuki Belge Kitleri | Özel İhtiyaçlar İçin Seçilmiş Paketler | EchoLegal',
    description: isEnglish
      ? 'Professionally curated legal document bundles for entrepreneurs, freelancers, and business owners. I support EchoLegal – $20 recommended.'
      : 'Girişimciler, serbest çalışanlar ve işletme sahipleri için profesyonelce hazırlanmış hukuki belge paketleri. EchoLegal\'i destekliyorum – 20$ önerilir.',
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function LegalKitsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const kits = [
    {
      slug: 'business-starter',
      title: 'ABD Business Starter Legal Kit',
      subtitle: isEnglish ? 'Essential Documents for US Business' : 'ABD İşi İçin Temel Belgeler',
      description: isEnglish
        ? '5 essential legal documents for Turkish entrepreneurs starting or operating a business in the United States. NDA, Service Agreement, Contractor Agreement, Privacy Policy & Terms of Service.'
        : "ABD'de iş kuran veya işleten Türk girişimciler için 5 temel hukuki belge. NDA, Hizmet Sözleşmesi, Yüklenici Sözleşmesi, Gizlilik Politikası ve Kullanım Koşulları.",
      documents: 5,
      available: true,
      featured: true,
    },
    {
      slug: 'freelancer-essentials',
      title: isEnglish ? 'Freelancer Essentials Kit' : 'Serbest Çalışan Temel Kit',
      subtitle: isEnglish ? 'Protect Your Freelance Business' : 'Serbest İşinizi Koruyun',
      description: isEnglish
        ? 'Essential contracts for freelancers working with US clients. Service Agreement, NDA, and Independent Contractor Agreement.'
        : "ABD'li müşterilerle çalışan serbest çalışanlar için temel sözleşmeler. Hizmet Sözleşmesi, NDA ve Bağımsız Yüklenici Sözleşmesi.",
      documents: 3,
      available: false,
      featured: false,
    },
    {
      slug: 'ecommerce-bundle',
      title: isEnglish ? 'E-Commerce Legal Bundle' : 'E-Ticaret Hukuki Paketi',
      subtitle: isEnglish ? 'Documents for Online Sellers' : 'Online Satıcılar İçin Belgeler',
      description: isEnglish
        ? 'Privacy Policy, Terms of Service, and Return Policy templates for e-commerce businesses.'
        : 'E-ticaret işletmeleri için Gizlilik Politikası, Kullanım Koşulları ve İade Politikası şablonları.',
      documents: 3,
      available: false,
      featured: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black text-black">
            EchoLegal
          </Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Home' : 'Ana Sayfa'}
            </Link>
            <Link href={`/${lang}/contracts`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Contracts' : 'Sözleşmeler'}
            </Link>
            <Link href={`/${lang}/legal-kits`} className="text-sm font-medium text-black border-b-2 border-black">
              {isEnglish ? 'Legal Kits' : 'Hukuki Kitler'}
            </Link>
            <Link href={`/${lang}/library`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Library' : 'Kütüphane'}
            </Link>
            <Link
              href={`/${lang === 'en' ? 'tr' : 'en'}/legal-kits`}
              className="border border-black rounded-full px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition-all"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
            {isEnglish ? 'Legal Document Kits' : 'Hukuki Belge Kitleri'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            {isEnglish
              ? 'Curated bundles of essential legal documents for specific business needs. I support EchoLegal – $20 recommended. Free access available.'
              : 'Belirli iş ihtiyaçları için seçilmiş temel hukuki belge paketleri. EchoLegal\'i destekliyorum – 20$ önerilir. Ücretsiz erişim mevcut.'}
          </p>
        </div>

        {/* Featured Kit */}
        {kits.filter(k => k.featured && k.available).map((kit) => (
          <div key={kit.slug} className="mb-12 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-xl p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
                  {isEnglish ? 'Featured Kit' : 'Öne Çıkan Kit'}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">{kit.title}</h2>
                <p className="text-gray-600 mb-4">{kit.description}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                  <span className="bg-white px-3 py-1 rounded-full border border-gray-200">
                    📄 {kit.documents} {isEnglish ? 'Documents' : 'Belge'}
                  </span>
                  <span className="bg-white px-3 py-1 rounded-full border border-gray-200">
                    🇺🇸🇹🇷 {isEnglish ? 'Bilingual' : 'İki Dilli'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href={`/${lang}/legal-kits/${kit.slug}`}
                  className="bg-[#C9A227] text-white text-center px-8 py-4 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors"
                >
                  {isEnglish ? 'View Kit →' : 'Kiti Görüntüle →'}
                </Link>
                <p className="text-sm text-gray-500 text-center">
                  {isEnglish ? '$20 recommended • Free option available' : '20$ önerilen • Ücretsiz seçenek mevcut'}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* All Kits Grid */}
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'All Kits' : 'Tüm Kitler'}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kits.map((kit) => (
            <div
              key={kit.slug}
              className={`border rounded-xl p-6 ${
                kit.available
                  ? 'border-gray-200 hover:border-gray-300 hover:shadow-md transition-all'
                  : 'border-gray-100 bg-gray-50'
              }`}
            >
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                kit.available
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {kit.available
                  ? (isEnglish ? 'Available' : 'Mevcut')
                  : (isEnglish ? 'Coming Soon' : 'Yakında')}
              </span>

              <h3 className="text-xl font-bold text-black mb-1">{kit.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{kit.subtitle}</p>
              <p className="text-gray-600 text-sm mb-4">{kit.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  📄 {kit.documents} {isEnglish ? 'documents' : 'belge'}
                </span>

                {kit.available ? (
                  <Link
                    href={`/${lang}/legal-kits/${kit.slug}`}
                    className="text-[#C9A227] font-semibold hover:text-[#B8922A] transition-colors"
                  >
                    {isEnglish ? 'View →' : 'Görüntüle →'}
                  </Link>
                ) : (
                  <span className="text-gray-400 text-sm">{isEnglish ? 'Coming Soon' : 'Yakında'}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            {isEnglish ? 'Looking for Individual Documents?' : 'Tek Tek Belge mi Arıyorsunuz?'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isEnglish
              ? 'Browse our full library of legal templates. Each document is available individually.'
              : 'Hukuki şablon kütüphanemizin tamamına göz atın. Her belge tek tek mevcuttur.'}
          </p>
          <Link
            href={`/${lang}/contracts`}
            className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            {isEnglish ? 'Browse All Contracts →' : 'Tüm Sözleşmelere Göz At →'}
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            {dict.disclaimer.global}
          </p>
          <p className="text-xs text-gray-400 mt-4">
            © 2025 EchoLegal. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
          </p>
        </div>
      </footer>
    </div>
  )
}
