// app/[lang]/amerika/vizeler/[slug]/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { visaCategories, getVisaBySlug } from '@/lib/visa-categories'

export async function generateStaticParams() {
  return visaCategories.flatMap(visa => [
    { lang: 'en', slug: visa.slug },
    { lang: 'tr', slug: visa.slug },
  ])
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const visa = getVisaBySlug(slug)
  const isEnglish = lang === 'en'

  if (!visa) {
    return { title: 'Not Found' }
  }

  const title = isEnglish ? visa.titleEn : visa.titleTr

  return {
    title: isEnglish
      ? `${visa.code} ${title} | US Visa Guide | EchoLegal`
      : `${visa.code} ${title} | ABD Vize Rehberi | EchoLegal`,
    description: isEnglish ? visa.shortDescEn : visa.shortDescTr,
  }
}

export default async function VisaDetailPage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}) {
  const { lang, slug } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const visa = getVisaBySlug(slug)

  if (!visa) {
    notFound()
  }

  const title = isEnglish ? visa.titleEn : visa.titleTr
  const whatIs = isEnglish ? visa.whatIsEn : visa.whatIsTr
  const suitableFor = isEnglish ? visa.suitableForEn : visa.suitableForTr
  const doesNotAllow = isEnglish ? visa.doesNotAllowEn : visa.doesNotAllowTr
  const commonMistakes = isEnglish ? visa.commonMistakesEn : visa.commonMistakesTr
  const greenCardPath = isEnglish ? visa.greenCardPathEn : visa.greenCardPathTr
  const strategicNotes = isEnglish ? visa.strategicNotesEn : visa.strategicNotesTr

  // Get other visa categories for related links
  const otherVisas = visaCategories.filter(v => v.slug !== slug).slice(0, 3)

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
            <Link href={`/${lang}/amerika`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'US Hub' : 'ABD Merkezi'}
            </Link>
            <Link href={`/${lang}/amerika/abdye-gelme-yollari`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Visas' : 'Vizeler'}
            </Link>
            <Link
              href={`/${lang === 'en' ? 'tr' : 'en'}/amerika/vizeler/${slug}`}
              className="border border-black rounded-full px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition-all"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/amerika`} className="hover:text-black">{isEnglish ? 'US Hub' : 'ABD Merkezi'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/amerika/abdye-gelme-yollari`} className="hover:text-black">{isEnglish ? 'Visas' : 'Vizeler'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">{visa.code}</span>
        </nav>

        <article>
          {/* Hero */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{visa.icon}</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-mono font-bold">
                {visa.code}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-black mb-4 leading-tight">
              {title}
            </h1>

            <p className="text-lg text-gray-600">
              {isEnglish ? visa.shortDescEn : visa.shortDescTr}
            </p>
          </header>

          {/* Official Source */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-800">
              <strong>{isEnglish ? 'Official Reference:' : 'Resmi Referans:'}</strong>{' '}
              <a
                href={visa.uscisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-medium hover:underline"
              >
                USCIS.gov →
              </a>
            </p>
          </div>

          {/* Section 1: Bu Vize Nedir? */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              {isEnglish ? 'What Is This Visa?' : 'Bu Vize Nedir?'}
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">{whatIs}</p>
            </div>
          </section>

          {/* Section 2: Kimler İçin Uygundur? */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              {isEnglish ? 'Who Is This Visa For?' : 'Kimler İçin Uygundur?'}
            </h2>
            <ul className="space-y-3">
              {suitableFor.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-green-600 mt-1">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: Bu Vize Ne İzin Vermez? */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              {isEnglish ? 'What This Visa Does NOT Allow' : 'Bu Vize Ne İzin Vermez?'}
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-5">
              <ul className="space-y-3">
                {doesNotAllow.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-red-600 mt-1">✗</span>
                    <span className="text-red-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 4: Sık Yapılan Hatalar ve Riskler */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              {isEnglish ? 'Common Mistakes & Risks' : 'Sık Yapılan Hatalar ve Riskler'}
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
              <ul className="space-y-3">
                {commonMistakes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-amber-600 mt-1">⚠</span>
                    <span className="text-amber-900">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section 5: Green Card'a Gider mi? */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">5</span>
              {isEnglish ? 'Does This Lead to a Green Card?' : "Green Card'a Gider mi?"}
            </h2>
            <div className={`rounded-lg p-5 border ${
              greenCardPath.answer === 'yes' || greenCardPath.answer === 'evet'
                ? 'bg-green-50 border-green-200'
                : greenCardPath.answer === 'no' || greenCardPath.answer === 'hayır'
                ? 'bg-red-50 border-red-200'
                : 'bg-amber-50 border-amber-200'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-2xl font-bold ${
                  greenCardPath.answer === 'yes' || greenCardPath.answer === 'evet'
                    ? 'text-green-700'
                    : greenCardPath.answer === 'no' || greenCardPath.answer === 'hayır'
                    ? 'text-red-700'
                    : 'text-amber-700'
                }`}>
                  {greenCardPath.answer === 'yes' ? 'YES' :
                   greenCardPath.answer === 'evet' ? 'EVET' :
                   greenCardPath.answer === 'no' ? 'NO' :
                   greenCardPath.answer === 'hayır' ? 'HAYIR' :
                   greenCardPath.answer === 'indirect' ? 'INDIRECT' : 'DOLAYLI'}
                </span>
              </div>
              <p className={`${
                greenCardPath.answer === 'yes' || greenCardPath.answer === 'evet'
                  ? 'text-green-800'
                  : greenCardPath.answer === 'no' || greenCardPath.answer === 'hayır'
                  ? 'text-red-800'
                  : 'text-amber-800'
              }`}>
                {greenCardPath.explanation}
              </p>
            </div>
          </section>

          {/* Section 6: Stratejik Notlar */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">6</span>
              {isEnglish ? 'Strategic Notes' : 'Stratejik Notlar'}
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <p className="text-gray-700 leading-relaxed">{strategicNotes}</p>
            </div>
          </section>

          {/* Section 7: Hukuki Bilgilendirme */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
              <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">7</span>
              {isEnglish ? 'Legal Notice' : 'Hukuki Bilgilendirme'}
            </h2>
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-5">
              <p className="text-sm text-gray-700 leading-relaxed">
                {isEnglish
                  ? 'This content provides general legal information only and does not constitute immigration advice. Immigration law is complex, changes frequently, and individual circumstances vary significantly. The information presented is referenced from official U.S. government sources but should not be relied upon for individual decision-making. Consult a licensed immigration attorney for guidance specific to your situation.'
                  : 'Bu içerik yalnızca genel hukuki bilgi sağlar ve göçmenlik danışmanlığı teşkil etmez. Göçmenlik hukuku karmaşıktır, sık sık değişir ve bireysel koşullar önemli ölçüde farklılık gösterir. Sunulan bilgiler resmi ABD devlet kaynaklarından referans alınmıştır ancak bireysel karar alma için güvenilmemelidir. Durumunuza özgü rehberlik için lisanslı bir göçmenlik avukatına danışın.'}
              </p>
            </div>
          </section>

          {/* Review Schedule */}
          <div className="bg-gray-50 rounded-lg p-4 mb-10 text-sm text-gray-600">
            <p className="mb-1">
              <strong>{isEnglish ? 'Source:' : 'Kaynak:'}</strong>{' '}
              <a href={visa.uscisUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">USCIS</a>
            </p>
            <p><strong>{isEnglish ? 'Last reviewed:' : 'Son gözden geçirme:'}</strong> {isEnglish ? 'January 2026' : 'Ocak 2026'}</p>
            <p><strong>{isEnglish ? 'Next scheduled update:' : 'Sonraki planlanan güncelleme:'}</strong> {isEnglish ? 'April 2026' : 'Nisan 2026'}</p>
          </div>

          {/* Other Visa Categories */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-black mb-4">
              {isEnglish ? 'Other Visa Categories' : 'Diğer Vize Kategorileri'}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {otherVisas.map((otherVisa) => (
                <Link
                  key={otherVisa.slug}
                  href={`/${lang}/amerika/vizeler/${otherVisa.slug}`}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#C9A227] hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{otherVisa.icon}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-mono font-bold">
                      {otherVisa.code}
                    </span>
                  </div>
                  <h3 className="font-semibold text-black text-sm group-hover:text-[#C9A227] transition-colors">
                    {isEnglish ? otherVisa.titleEn : otherVisa.titleTr}
                  </h3>
                </Link>
              ))}
            </div>
            <Link
              href={`/${lang}/amerika/abdye-gelme-yollari`}
              className="inline-block mt-4 text-[#C9A227] font-medium hover:underline"
            >
              {isEnglish ? '← View All Visa Categories' : '← Tüm Vize Kategorilerini Görüntüle'}
            </Link>
          </section>

          {/* Related Resources */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-black mb-4">
              {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href={`/${lang}/library/llc-vize-yanilgisi`} className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'LLC ≠ Visa' : 'LLC Kurmak Vize Vermez'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'Understanding the separation' : 'Ayrımı anlama'}</p>
              </Link>
              <Link href={`/${lang}/amerika`} className="block border border-gray-200 rounded-lg p-4 hover:border-gray-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-black mb-1">{isEnglish ? 'US Business Hub' : 'ABD İş Merkezi'}</h3>
                <p className="text-sm text-gray-600">{isEnglish ? 'Complete US business guide' : 'Eksiksiz ABD iş rehberi'}</p>
              </Link>
            </div>
          </section>

          {/* CTA */}
          {(visa.slug === 'e2' || visa.slug === 'l1' || visa.slug === 'h1b') && (
            <section className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-black mb-4 text-center">
                {isEnglish ? 'Setting Up a US Business?' : "ABD'de İş mi Kuruyorsunuz?"}
              </h2>
              <p className="text-gray-600 text-center mb-6 max-w-xl mx-auto">
                {isEnglish
                  ? 'Our Business Starter Kit includes essential contracts and documents for launching your US business.'
                  : "Business Starter Kit'imiz ABD işinizi başlatmak için temel sözleşmeler ve belgeler içerir."}
              </p>
              <div className="text-center">
                <Link
                  href={`/${lang}/legal-kits/business-starter`}
                  className="inline-block bg-[#C9A227] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors"
                >
                  {isEnglish ? 'View Business Starter Kit →' : "Business Starter Kit'i Görüntüle →"}
                </Link>
              </div>
            </section>
          )}
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
