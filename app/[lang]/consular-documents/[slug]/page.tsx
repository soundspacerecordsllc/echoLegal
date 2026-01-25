import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { consularProcedures, getProcedureBySlug, getChecklistUrl } from '@/lib/consular-procedures'

export async function generateStaticParams() {
  return consularProcedures.flatMap(procedure => [
    { lang: 'en', slug: procedure.slug },
    { lang: 'tr', slug: procedure.slug },
  ])
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const procedure = getProcedureBySlug(slug)
  const isEnglish = lang === 'en'
  
  if (!procedure) {
    return { title: 'Not Found' }
  }

  const title = isEnglish ? procedure.titleEn : procedure.titleTr
  
  return {
    title: isEnglish 
      ? `${title} - Free Checklist (English & Turkish) | EchoLegal`
      : `${title} - Ücretsiz Kontrol Listesi (İngilizce & Türkçe) | EchoLegal`,
    description: isEnglish ? procedure.descriptionEn : procedure.descriptionTr,
  }
}

export default async function ProcedurePage({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>
}) {
  const { lang, slug } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  
  const procedure = getProcedureBySlug(slug)
  
  if (!procedure) {
    notFound()
  }

  const title = isEnglish ? procedure.titleEn : procedure.titleTr
  const description = isEnglish ? procedure.descriptionEn : procedure.descriptionTr
  const checklistUrl = getChecklistUrl(procedure, lang)

  // Related procedures for cross-linking
  const relatedProcedures = consularProcedures
    .filter(p => p.slug !== slug && p.available)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <Link href={`/${lang}/contracts`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Contracts' : 'Sözleşmeler'}</Link>
            <Link href={`/${lang}/consular-documents`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Consular Documents' : 'Konsolosluk Belgeleri'}</Link>
            <Link href={`/${lang === 'en' ? 'tr' : 'en'}/consular-documents/${slug}`} className="border border-black rounded-full px-3 py-1 text-sm">{isEnglish ? 'TR' : 'EN'}</Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <Link href={`/${lang}/consular-documents`} className="hover:text-black">{isEnglish ? 'Consular Documents' : 'Konsolosluk Belgeleri'}</Link>
          {' → '}
          <span className="text-black font-medium">{title}</span>
        </nav>

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          🇹🇷 {isEnglish ? 'Turkish Consulate Service' : 'Türk Konsolosluk Hizmeti'}
        </span>

        <h1 className="text-4xl md:text-5xl font-black mb-4">{title}</h1>

        <p className="text-sm text-gray-500 mb-8">{isEnglish ? 'Last Updated: January 2026' : 'Son Güncelleme: Ocak 2026'}</p>

        {/* Description */}
        <section className="mb-8">
          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
        </section>

        {/* Official Source */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-8">
          <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
            <span>🏛️</span>
            {isEnglish ? 'Official Source' : 'Resmi Kaynak'}
          </h3>
          <p className="text-sm text-red-800 mb-3">
            {isEnglish
              ? 'Consular procedures are administered by the Republic of Turkey Ministry of Foreign Affairs. Requirements may vary by consulate location.'
              : 'Konsolosluk işlemleri T.C. Dışişleri Bakanlığı tarafından yürütülür. Gereksinimler konsolosluk lokasyonuna göre değişebilir.'}
          </p>
          <a
            href="https://www.konsolosluk.gov.tr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-red-700 font-medium hover:underline text-sm"
          >
            konsolosluk.gov.tr →
          </a>
        </div>

        {/* Appointment Notice */}
        <div className="bg-amber-50 border-l-4 border-[#C9A227] p-6 rounded-r-lg mb-12">
          <h3 className="font-bold text-amber-900 mb-2">
            {isEnglish ? '📅 Appointment Required' : '📅 Randevu Gerekli'}
          </h3>
          <p className="text-amber-800">
            {isEnglish 
              ? 'This service requires an in-person appointment booked through '
              : 'Bu hizmet için '}
            <a href="https://konsolosluk.gov.tr" target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              konsolosluk.gov.tr
            </a>
            {isEnglish ? '. Cash payment only — no credit cards or checks accepted.' : ' üzerinden şahsen randevu alınması gereklidir. Sadece nakit — kredi kartı veya çek kabul edilmez.'}
          </p>
        </div>

        {/* Download Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">
            {isEnglish ? 'Download Checklist' : 'Kontrol Listesini İndirin'}
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {isEnglish
              ? 'Free printable checklist. Supporting EchoLegal helps maintain bilingual resources.'
              : 'Ücretsiz yazdırılabilir kontrol listesi. EchoLegal\'i desteklemek iki dilli kaynakları sürdürmeye yardımcı olur.'}
          </p>

          <a
            href="https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01"
            className="block w-full bg-[#C9A227] text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-[#B8922A] mb-3"
          >
            💳 {isEnglish ? 'I support EchoLegal – $20' : 'EchoLegal\'i destekliyorum – $20'}
          </a>

          <a
            href={checklistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gray-800 text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 mb-4"
          >
            📄 {isEnglish ? 'Download for free' : 'Ücretsiz indir'}
          </a>

          <p className="text-center text-sm text-gray-500">
            {isEnglish 
              ? 'Most users choose $20 to support ongoing updates and bilingual access.'
              : 'Çoğu kullanıcı, sürekli güncellemeleri ve iki dilli erişimi desteklemek için 20$ seçiyor.'}
          </p>
        </div>

        {/* Review Schedule */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm text-gray-600">
          <p className="mb-1">
            <strong>{isEnglish ? 'Source:' : 'Kaynak:'}</strong>{' '}
            <a href="https://www.konsolosluk.gov.tr" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">T.C. Dışişleri Bakanlığı (konsolosluk.gov.tr)</a>
          </p>
          <p><strong>{isEnglish ? 'Last reviewed:' : 'Son gözden geçirme:'}</strong> {isEnglish ? 'January 2026' : 'Ocak 2026'}</p>
          <p><strong>{isEnglish ? 'Next scheduled update:' : 'Sonraki planlanan güncelleme:'}</strong> {isEnglish ? 'April 2026' : 'Nisan 2026'}</p>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h3 className="font-semibold mb-3">⚖️ {isEnglish ? 'Legal Disclaimer' : 'Hukuki Sorumluluk Reddi'}</h3>
          <p className="text-sm text-gray-600">
            {isEnglish
              ? 'This checklist is for informational purposes only. Requirements may change. Always confirm current requirements with the Turkish Consulate General before your appointment.'
              : 'Bu kontrol listesi yalnızca bilgilendirme amaçlıdır. Gereksinimler değişebilir. Randevunuzdan önce güncel gereksinimleri T.C. Başkonsolosluğu\'ndan teyit edin.'}
          </p>
        </div>

        {/* Related Procedures */}
        <section className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Other Consular Services' : 'Diğer Konsolosluk Hizmetleri'}
          </h2>
          <div className="grid sm:grid-cols-1 gap-3">
            {relatedProcedures.map((relatedProcedure) => (
              <Link
                key={relatedProcedure.slug}
                href={`/${lang}/consular-documents/${relatedProcedure.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <span className="font-medium text-gray-800">
                  {isEnglish ? relatedProcedure.titleEn : relatedProcedure.titleTr}
                </span>
                <span className="text-[#C9A227]">→</span>
              </Link>
            ))}
            <Link
              href={`/${lang}/consular-documents`}
              className="text-center text-[#C9A227] font-semibold hover:underline mt-2"
            >
              {isEnglish ? 'View All Consular Services →' : 'Tüm Konsolosluk Hizmetlerini Gör →'}
            </Link>
          </div>
        </section>

        {/* Cross-sell to Contracts */}
        <section className="bg-gray-900 text-white rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">
            {isEnglish ? 'Need Legal Documents?' : 'Hukuki Belgelere mi İhtiyacınız Var?'}
          </h2>
          <p className="text-gray-300 mb-4">
            {isEnglish 
              ? 'Browse our professional legal templates for business and personal use.'
              : 'İş ve kişisel kullanım için profesyonel hukuki şablonlarımıza göz atın.'}
          </p>
          <Link
            href={`/${lang}/contracts`}
            className="inline-block bg-[#C9A227] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors"
          >
            {isEnglish ? 'Browse Contracts →' : 'Sözleşmelere Göz At →'}
          </Link>
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            {isEnglish 
              ? 'LEGAL DISCLAIMER: EchoLegal provides educational legal information for general informational purposes only. Requirements may change — always confirm with official sources. Prepared under supervision of NY licensed attorney (Bar #5552336).'
              : 'HUKUKI SORUMLULUK REDDİ: EchoLegal, yalnızca genel bilgilendirme amaçlı eğitici hukuki bilgiler sunar. Gereksinimler değişebilir — her zaman resmi kaynaklardan teyit alın. NY lisanslı avukat gözetiminde hazırlanmıştır (Bar #5552336).'}
          </p>
          <p className="text-xs text-gray-400 mt-4">© 2025 EchoLegal.</p>
        </div>
      </footer>
    </div>
  )
}
