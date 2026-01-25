// app/[lang]/checklists/w8-w9-karar-haritasi/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'W-8 or W-9? Quick Decision Map | EchoLegal'
      : 'W-8 mi W-9 mu? Kısa Karar Haritası | EchoLegal',
    description: isEnglish
      ? 'A simple decision tree to help determine which US tax form you may need. Reference tool for international entrepreneurs.'
      : 'Hangi ABD vergi formuna ihtiyacınız olabileceğini belirlemeye yardımcı basit bir karar ağacı. Uluslararası girişimciler için referans aracı.',
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function W8W9DecisionMapPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black text-black">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}/library`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
            <Link href={`/${lang}/checklists`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Checklists' : 'Kontrol Listeleri'}</Link>
            <Link href={`/${lang === 'en' ? 'tr' : 'en'}/checklists/w8-w9-karar-haritasi`} className="border border-black rounded-full px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition-all">
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/checklists`} className="hover:text-black">{isEnglish ? 'Checklists' : 'Kontrol Listeleri'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">W-8 / W-9</span>
        </nav>

        <article>
          <header className="mb-10">
            <span className="inline-block px-3 py-1 bg-green-50 text-green-800 rounded-full text-sm font-medium mb-4">
              {isEnglish ? 'Decision Map' : 'Karar Haritası'}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-black mb-4">
              {isEnglish ? 'W-8 or W-9?' : 'W-8 mi W-9 mu?'}
            </h1>
            <p className="text-lg text-gray-600">
              {isEnglish
                ? 'A simplified decision tree to help identify which form may apply to your situation.'
                : 'Durumunuza hangi formun uygulanabileceğini belirlemeye yardımcı basitleştirilmiş bir karar ağacı.'}
            </p>
          </header>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-10">
            <p className="text-sm text-amber-900">
              <strong>{isEnglish ? 'Important:' : 'Önemli:'}</strong>{' '}
              {isEnglish
                ? 'This is a simplified reference tool. Tax situations can be complex. The actual form requirements depend on many factors. Consult a tax professional for guidance specific to your situation.'
                : 'Bu basitleştirilmiş bir referans aracıdır. Vergi durumları karmaşık olabilir. Gerçek form gereksinimleri birçok faktöre bağlıdır. Durumunuza özel rehberlik için bir vergi uzmanına danışın.'}
            </p>
          </div>

          {/* Decision Tree */}
          <div className="space-y-6 mb-12">
            {/* Question 1 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-4">
                {isEnglish ? 'Question 1: Are you a US person?' : 'Soru 1: ABD\'li bir kişi misiniz?'}
              </h3>
              <p className="text-sm text-blue-800 mb-4">
                {isEnglish
                  ? '"US person" includes: US citizens, US resident aliens, US entities (including LLCs formed in the US)'
                  : '"ABD\'li kişi" şunları içerir: ABD vatandaşları, ABD\'de yerleşik yabancılar, ABD tüzel kişileri (ABD\'de kurulan LLC\'ler dahil)'}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="font-semibold text-green-700 mb-2">✓ {isEnglish ? 'Yes, I am a US person' : 'Evet, ABD\'li bir kişiyim'}</p>
                  <p className="text-sm text-gray-600">→ <strong>W-9</strong></p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="font-semibold text-gray-700 mb-2">✗ {isEnglish ? 'No, I am not a US person' : 'Hayır, ABD\'li bir kişi değilim'}</p>
                  <p className="text-sm text-gray-600">→ {isEnglish ? 'Continue to Question 2' : 'Soru 2\'ye devam edin'}</p>
                </div>
              </div>
            </div>

            {/* Question 2 */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-bold text-purple-900 mb-4">
                {isEnglish ? 'Question 2: Are you an individual or an entity?' : 'Soru 2: Birey misiniz yoksa tüzel kişi mi?'}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <p className="font-semibold text-purple-700 mb-2">{isEnglish ? 'Individual (personal capacity)' : 'Birey (kişisel kapasite)'}</p>
                  <p className="text-sm text-gray-600">→ <strong>W-8BEN</strong></p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <p className="font-semibold text-purple-700 mb-2">{isEnglish ? 'Entity (company, partnership, etc.)' : 'Tüzel kişi (şirket, ortaklık, vb.)'}</p>
                  <p className="text-sm text-gray-600">→ <strong>W-8BEN-E</strong></p>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-black mb-4">
                {isEnglish ? 'Quick Summary' : 'Hızlı Özet'}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded">W-9</span>
                  <span className="text-gray-700">{isEnglish ? 'US persons (including US LLCs)' : 'ABD\'li kişiler (ABD LLC\'ler dahil)'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-green-100 text-green-800 font-bold px-2 py-1 rounded">W-8BEN</span>
                  <span className="text-gray-700">{isEnglish ? 'Non-US individuals' : 'ABD dışından bireyler'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-purple-100 text-purple-800 font-bold px-2 py-1 rounded">W-8BEN-E</span>
                  <span className="text-gray-700">{isEnglish ? 'Non-US entities' : 'ABD dışı tüzel kişiler'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-10">
            <h3 className="font-semibold text-red-800 mb-2">
              {isEnglish ? 'Special Case: US LLC owned by non-US person' : 'Özel Durum: ABD dışından kişinin sahip olduğu ABD LLC'}
            </h3>
            <p className="text-sm text-red-900">
              {isEnglish
                ? 'If you\'re not a US person but you have a US LLC, the LLC is considered a US entity. In this case, the LLC would provide a W-9 (using its EIN). Your personal status remains non-US.'
                : 'ABD\'li bir kişi değilseniz ama ABD LLC\'niz varsa, LLC bir ABD tüzel kişisi olarak kabul edilir. Bu durumda LLC bir W-9 sağlar (EIN\'ini kullanarak). Kişisel statünüz ABD dışı olarak kalır.'}
            </p>
          </div>

          {/* Review Date */}
          <div className="bg-gray-50 rounded-lg p-4 mb-10 text-sm text-gray-600">
            <p><strong>{isEnglish ? 'Last reviewed:' : 'Son gözden geçirme:'}</strong> {isEnglish ? 'January 2026' : 'Ocak 2026'}</p>
            <p><strong>{isEnglish ? 'Next planned update:' : 'Sonraki planlanan güncelleme:'}</strong> {isEnglish ? 'July 2026' : 'Temmuz 2026'}</p>
          </div>

          {/* Related Resources */}
          <section>
            <h2 className="text-lg font-bold text-black mb-4">
              {isEnglish ? 'Related resources on this topic' : 'Bu konuyla bağlantılı hukuki kaynaklar'}
            </h2>
            <div className="space-y-3">
              <Link href={`/${lang}/library/irs-vergi-gercekleri`} className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <span className="font-medium text-black">{isEnglish ? 'IRS & Tax Facts (Full Guide)' : 'IRS ve Vergi Gerçekleri (Tam Rehber)'}</span>
                <span className="text-gray-500 text-sm ml-2">→</span>
              </Link>
              <Link href={`/${lang}/checklists/irs-mektup-rehberi`} className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <span className="font-medium text-black">{isEnglish ? 'IRS Letter Received: First 7 Facts' : 'IRS\'ten Mektup Geldiyse: İlk 7 Gerçek'}</span>
                <span className="text-gray-500 text-sm ml-2">→</span>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">{dict.disclaimer.global}</p>
          <p className="text-xs text-gray-400 mt-4">© 2025 EchoLegal. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}</p>
        </div>
      </footer>
    </div>
  )
}
