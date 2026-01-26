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
      ? 'Legal Document Kits | Curated Bundles | EchoLegal'
      : 'Hukuki Belge Kitleri | Seçilmiş Paketler | EchoLegal',
    description: isEnglish
      ? 'Professionally curated legal document bundles for specific business and legal use cases. Reference-grade templates with annotations.'
      : 'Belirli iş ve hukuki kullanım durumları için profesyonelce hazırlanmış hukuki belge paketleri. Açıklamalı referans kalitesinde şablonlar.',
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
      title: isEnglish ? 'US Business Starter Legal Kit' : 'ABD İş Başlangıç Hukuk Kiti',
      subtitle: isEnglish ? 'Essential Documents for US Business Formation' : 'ABD Şirket Kuruluşu İçin Temel Belgeler',
      description: isEnglish
        ? '5 essential legal documents for starting or operating a business in the United States. NDA, Service Agreement, Contractor Agreement, Privacy Policy & Terms of Service. Available in English and Turkish.'
        : "ABD'de iş kurmak veya işletmek için 5 temel hukuki belge. NDA, Hizmet Sözleşmesi, Yüklenici Sözleşmesi, Gizlilik Politikası ve Kullanım Koşulları. İngilizce ve Türkçe olarak mevcuttur.",
      documents: 5,
      available: true,
      featured: true,
      jurisdiction: 'US',
    },
    {
      slug: 'freelancer-essentials',
      title: isEnglish ? 'Freelancer Essentials Kit' : 'Serbest Çalışan Temel Kiti',
      subtitle: isEnglish ? 'Contracts for Independent Professionals' : 'Bağımsız Profesyoneller İçin Sözleşmeler',
      description: isEnglish
        ? 'Essential contracts for freelancers and independent contractors. Service Agreement, NDA, and Independent Contractor Agreement with detailed annotations.'
        : 'Serbest çalışanlar ve bağımsız yükleniciler için temel sözleşmeler. Detaylı açıklamalarla Hizmet Sözleşmesi, NDA ve Bağımsız Yüklenici Sözleşmesi.',
      documents: 3,
      available: false,
      featured: false,
      jurisdiction: 'General',
    },
    {
      slug: 'ecommerce-bundle',
      title: isEnglish ? 'E-Commerce Legal Bundle' : 'E-Ticaret Hukuki Paketi',
      subtitle: isEnglish ? 'Legal Framework for Online Sellers' : 'Çevrimiçi Satıcılar İçin Hukuki Çerçeve',
      description: isEnglish
        ? 'Privacy Policy, Terms of Service, and Return Policy templates for e-commerce businesses operating online.'
        : 'Çevrimiçi faaliyet gösteren e-ticaret işletmeleri için Gizlilik Politikası, Kullanım Koşulları ve İade Politikası şablonları.',
      documents: 3,
      available: false,
      featured: false,
      jurisdiction: 'General',
    },
  ]

  return (
    <div className="bg-white">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Legal Document Kits' : 'Hukuki Belge Kitleri'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            {isEnglish
              ? 'Curated bundles of legal documents for specific use cases. Each kit contains professionally drafted templates with annotations and usage guidance.'
              : 'Belirli kullanım durumları için hazırlanmış hukuki belge paketleri. Her kit, açıklamalar ve kullanım rehberiyle profesyonelce hazırlanmış şablonlar içerir.'}
          </p>
        </div>

        {/* Featured Kit */}
        {kits.filter(k => k.featured && k.available).map((kit) => (
          <div key={kit.slug} className="mb-12 bg-gray-50 border border-gray-200 rounded-lg p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block px-3 py-1 bg-gray-900 text-white rounded text-xs font-medium">
                    {isEnglish ? 'Featured' : 'Öne Çıkan'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {kit.jurisdiction}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{kit.title}</h2>
                <p className="text-gray-600 mb-4">{kit.description}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                  <span className="px-3 py-1 rounded border border-gray-200 bg-white">
                    {kit.documents} {isEnglish ? 'documents' : 'belge'}
                  </span>
                  <span className="px-3 py-1 rounded border border-gray-200 bg-white">
                    {isEnglish ? 'EN / TR' : 'İngilizce / Türkçe'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href={`/${lang}/legal-kits/${kit.slug}`}
                  className="bg-gray-900 text-white text-center px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  {isEnglish ? 'View Kit →' : 'Kiti Görüntüle →'}
                </Link>
                <p className="text-xs text-gray-500 text-center">
                  {isEnglish ? 'Free access available' : 'Ücretsiz erişim mevcut'}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* All Kits Grid */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {isEnglish ? 'All Kits' : 'Tüm Kitler'}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kits.map((kit) => (
            <div
              key={kit.slug}
              className={`border rounded-lg p-6 ${
                kit.available
                  ? 'border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all'
                  : 'border-gray-100 bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                  kit.available
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {kit.available
                    ? (isEnglish ? 'Available' : 'Mevcut')
                    : (isEnglish ? 'Coming Soon' : 'Yakında')}
                </span>
                <span className="text-xs text-gray-400">{kit.jurisdiction}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">{kit.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{kit.subtitle}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{kit.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  {kit.documents} {isEnglish ? 'documents' : 'belge'}
                </span>

                {kit.available ? (
                  <Link
                    href={`/${lang}/legal-kits/${kit.slug}`}
                    className="text-gray-900 font-medium hover:text-gray-600 transition-colors text-sm"
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

        {/* Browse Individual Documents */}
        <section className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            {isEnglish
              ? 'Looking for individual documents? Browse our full template library.'
              : 'Tek tek belge mi arıyorsunuz? Tam şablon kütüphanemize göz atın.'}
          </p>
          <Link
            href={isEnglish ? `/${lang}/templates` : `/${lang}/sablonlar`}
            className="text-gray-900 font-medium hover:text-gray-600 transition-colors"
          >
            {isEnglish ? 'Browse all templates →' : 'Tüm şablonlara göz at →'}
          </Link>
        </section>
      </main>
    </div>
  )
}
