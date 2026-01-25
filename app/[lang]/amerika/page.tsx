// app/[lang]/amerika/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'US Business & Legal Guide for Turkish Entrepreneurs | EchoLegal'
      : "ABD'de İş Yapan Türkler İçin Hukuki Rehber | EchoLegal",
    description: isEnglish
      ? 'Comprehensive legal reference hub for Turkish entrepreneurs doing business in the United States. LLC formation, tax facts, common misconceptions, and essential documents.'
      : "ABD'de iş yapan Türk girişimciler için kapsamlı hukuki referans merkezi. LLC kurulumu, vergi gerçekleri, yaygın yanılgılar ve temel belgeler.",
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function AmerikaHubPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const coveredTopics = isEnglish ? [
    'LLC formation basics and state selection',
    'Tax framework fundamentals for non-residents',
    'Common mistakes and practical risks',
    'Essential business documents and contracts',
  ] : [
    'LLC kurulumu ve eyalet seçimi temelleri',
    "ABD'de yerleşik olmayanlar için temel vergi çerçevesi",
    'Sık yapılan hatalar ve pratik riskler',
    'Temel iş belgeleri ve sözleşmeler',
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
            <Link href={`/${lang}/library`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Library' : 'Kütüphane'}
            </Link>
            <Link href={`/${lang}/contracts`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Contracts' : 'Sözleşmeler'}
            </Link>
            <Link
              href={`/${lang === 'en' ? 'tr' : 'en'}/amerika`}
              className="border border-black rounded-full px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition-all"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12">
          <span className="inline-block px-4 py-2 bg-blue-50 text-blue-800 rounded-full text-sm font-semibold mb-4">
            🇺🇸 {isEnglish ? 'US Business Hub' : 'ABD İş Merkezi'}
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
            {isEnglish
              ? 'US Business & Legal Guide'
              : "ABD'de İş Yapan Türkler İçin Rehber"}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            {isEnglish
              ? 'Clear, factual guides for Turkish entrepreneurs navigating US business, taxes, and legal requirements.'
              : 'ABD iş dünyası, vergileri ve hukuki gereksinimlerinde yol alan Türk girişimciler için açık ve gerçeklere dayalı rehberler.'}
          </p>
        </div>

        {/* Covered Topics */}
        <section className="mb-12">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-green-900 mb-4">
              {isEnglish ? 'What This Section Covers' : 'Kapsanan Konular'}
            </h2>
            <ul className="space-y-2">
              {coveredTopics.map((topic, index) => (
                <li key={index} className="flex items-start gap-3 text-green-800">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Scope Note */}
        <p className="text-sm text-gray-500 mb-12 leading-relaxed">
          {isEnglish
            ? 'This section provides general legal frameworks and structural information. It does not address individual cases or provide personalized legal guidance.'
            : 'Bu bölüm, genel hukuki çerçeve ve yapısal bilgileri sunmak amacıyla hazırlanmıştır. Bireysel dosyalara veya kişiye özel hukuki yönlendirmelere girmez.'}
        </p>

        {/* Featured Guides */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Featured Guides' : 'Öne Çıkan Rehberler'}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href={`/${lang}/library/llc-kurma-rehberi`}
              className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#C9A227] hover:shadow-lg transition-all group"
            >
              <span className="text-3xl mb-3 block">🏢</span>
              <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#C9A227] transition-colors">
                {isEnglish ? 'LLC Formation Guide' : "ABD'de LLC Kurmak"}
              </h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'State selection, formation process, and what you need to know.'
                  : 'Eyalet seçimi, kuruluş süreci ve bilmeniz gerekenler.'}
              </p>
            </Link>

            <Link
              href={`/${lang}/library/irs-vergi-gercekleri`}
              className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#C9A227] hover:shadow-lg transition-all group"
            >
              <span className="text-3xl mb-3 block">📋</span>
              <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#C9A227] transition-colors">
                {isEnglish ? 'IRS & Tax Facts' : 'IRS ve Vergi Gerçekleri'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'W-8, W-9, 1099 forms explained in plain language.'
                  : 'W-8, W-9, 1099 formları açık dilde açıklandı.'}
              </p>
            </Link>

            <Link
              href={`/${lang}/library/hukuki-yanilgilar`}
              className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#C9A227] hover:shadow-lg transition-all group"
            >
              <span className="text-3xl mb-3 block">❌</span>
              <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#C9A227] transition-colors">
                {isEnglish ? 'Common Misconceptions' : 'Yaygın Hukuki Yanılgılar'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'Myths vs. facts about doing business in the US.'
                  : "ABD'de iş yapma hakkında mitler ve gerçekler."}
              </p>
            </Link>

            <Link
              href={`/${lang}/library/llc-vize-yanilgisi`}
              className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#C9A227] hover:shadow-lg transition-all group"
            >
              <span className="text-3xl mb-3 block">🛂</span>
              <h3 className="text-lg font-bold text-black mb-2 group-hover:text-[#C9A227] transition-colors">
                {isEnglish ? 'LLC ≠ Visa' : 'LLC Kurmak Vize Vermez'}
              </h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'Understanding the immigration realities.'
                  : 'Göçmenlik gerçeklerini anlama.'}
              </p>
            </Link>
          </div>
        </section>

        {/* Quick Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Quick Reference Tools' : 'Hızlı Referans Araçları'}
          </h2>

          <div className="space-y-3">
            <Link
              href={`/${lang}/checklists/llc-kontrol-listesi`}
              className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <span className="font-medium text-black">
                {isEnglish ? 'LLC Pre-Formation Checklist' : "ABD'de LLC Kurmadan Önce: Kontrol Listesi"}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>

            <Link
              href={`/${lang}/checklists/w8-w9-karar-haritasi`}
              className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <span className="font-medium text-black">
                {isEnglish ? 'W-8 or W-9 Decision Map' : 'W-8 mi W-9 mu? Karar Haritası'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>

            <Link
              href={`/${lang}/checklists/irs-mektup-rehberi`}
              className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <span className="font-medium text-black">
                {isEnglish ? 'IRS Letter Guide' : "IRS'ten Mektup Geldiyse: İlk 7 Gerçek"}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
          </div>
        </section>

        {/* Editorial Resource Reference */}
        <section className="border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-700 mb-4">
            {isEnglish
              ? 'Common starter documents for US business operations:'
              : 'ABD iş operasyonları için yaygın kullanılan başlangıç belgeleri:'}
          </p>
          <ul className="text-sm text-gray-600 mb-4 space-y-1">
            <li>• {isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}</li>
            <li>• {isEnglish ? 'NDA (Non-Disclosure Agreement)' : 'Gizlilik Sözleşmesi (NDA)'}</li>
            <li>• {isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi'}</li>
            <li>• {isEnglish ? 'Privacy Policy & Terms of Service' : 'Gizlilik Politikası & Kullanım Koşulları'}</li>
          </ul>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Link
              href={`/${lang}/legal-kits/business-starter`}
              className="text-[#C9A227] font-medium hover:underline text-sm"
            >
              {isEnglish ? 'US Business Starter Legal Kit →' : 'ABD İş Başlangıç Hukuk Kiti →'}
            </Link>
            <span className="text-xs text-gray-500">
              {isEnglish ? 'I support EchoLegal – $20 recommended' : 'EchoLegal\'e destek olun – 20 $ önerilir'}
            </span>
          </div>
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
