import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { consularProcedures, getProcedureBySlug, getOppositeSlug } from '@/lib/consular-procedures'

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  
  consularProcedures.forEach((procedure) => {
    params.push({ lang: 'en', slug: procedure.slug })
    params.push({ lang: 'tr', slug: procedure.slugTr })
  })
  
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const procedure = getProcedureBySlug(slug)
  
  if (!procedure) return { title: 'Not Found' }
  
  const isEnglish = lang === 'en'
  
  return {
    title: isEnglish ? procedure.metaTitleEn : procedure.metaTitleTr,
    description: isEnglish ? procedure.metaDescEn : procedure.metaDescTr,
  }
}

export default async function ConsularProcedurePage({
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

  const oppositeSlug = getOppositeSlug(slug, lang)
  const stripePaymentLink = 'https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01'
  const checklistUrl = isEnglish ? procedure.checklistUrlEn : procedure.checklistUrlTr

  // Get related procedures
  const relatedProcedures = procedure.relatedProcedures
    .map(s => consularProcedures.find(p => p.slug === s))
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <Link href={`/${lang}/contracts`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Contracts' : 'Sözleşmeler'}</Link>
            <Link href={`/${lang}/consular-documents`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Consular' : 'Konsolosluk'}</Link>
            <Link href={`/${lang === 'en' ? 'tr' : 'en'}/consular-documents/${oppositeSlug}`} className="border border-black rounded-full px-3 py-1 text-sm">{isEnglish ? 'TR' : 'EN'}</Link>
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
          <span className="text-black font-medium">{isEnglish ? procedure.titleEn : procedure.titleTr}</span>
        </nav>

        <span className="inline-block px-4 py-2 bg-red-50 text-red-800 rounded-full text-sm font-semibold mb-4">
          🇹🇷 {isEnglish ? 'Turkish Consular Procedure' : 'Türk Konsolosluk İşlemi'}
        </span>

        <h1 className="text-4xl md:text-5xl font-black mb-4">
          {isEnglish ? procedure.titleEn : procedure.titleTr}
        </h1>

        {/* Overview */}
        <section className="mb-10">
          <p className="text-lg text-gray-600 leading-relaxed">
            {isEnglish ? procedure.summaryEn : procedure.summaryTr}
          </p>
        </section>

        {/* Appointment Notice */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-10 rounded-r-lg">
          <p className="font-semibold text-blue-900 mb-1">
            {isEnglish ? '📅 Appointment Required' : '📅 Randevu Zorunlu'}
          </p>
          <p className="text-blue-800 text-sm mb-2">
            {isEnglish 
              ? 'Schedule your appointment via the official portal. In-person attendance is required for identity verification and biometrics.'
              : 'Randevunuzu resmi portal üzerinden alın. Kimlik doğrulama ve biyometrik işlemler için şahsen başvuru zorunludur.'}
          </p>
          <a 
            href="https://www.konsolosluk.gov.tr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-blue-600 font-medium hover:underline"
          >
            konsolosluk.gov.tr →
          </a>
        </div>

        {/* Requirements Checklist */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Typical Requirements' : 'Gerekli Belgeler (Genel)'}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {isEnglish 
              ? 'This checklist covers typical requirements. Confirm with the consulate as requirements may vary.'
              : 'Bu kontrol listesi genel gereksinimleri kapsar. Şartlar değişebileceğinden konsolosluktan teyit alın.'}
          </p>
          <ul className="space-y-3">
            {(isEnglish ? procedure.requirementsEn : procedure.requirementsTr).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-[#C9A227] mr-3 mt-1">☐</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Printable Checklist Download */}
        <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 mb-10">
          <h3 className="text-xl font-bold text-center mb-2">
            {isEnglish ? '📋 Printable Checklist' : '📋 Yazdırılabilir Kontrol Listesi'}
          </h3>
          <p className="text-center text-gray-600 mb-4 text-sm">
            {isEnglish ? 'Take it to your appointment. Pay what you can.' : 'Randevunuza götürün. Gücünüz kadar ödeyin.'}
          </p>
          
          <a href={stripePaymentLink} className="block w-full bg-[#C9A227] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#B8922A] mb-2">
            💳 {isEnglish ? 'Support Us — $20 (Recommended)' : 'Bizi Destekle — $20 (Önerilen)'}
          </a>
          
          <a href={checklistUrl} download className="block w-full bg-gray-800 text-white text-center py-3 rounded-lg font-semibold hover:bg-gray-700 mb-3">
            📄 {isEnglish ? 'Download Free' : 'Ücretsiz İndir'}
          </a>

          {/* Email Capture Stub - TODO: Connect to backend */}
          <label className="flex items-center gap-2 text-sm text-gray-500 justify-center">
            <input type="checkbox" className="rounded" disabled />
            <span className="opacity-50">
              {isEnglish 
                ? 'Email me if requirements change (coming soon)'
                : 'Şartlar değişirse e-posta gönder (yakında)'}
            </span>
          </label>
        </div>

        {/* Processing Notes */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Processing Notes' : 'İşlem Notları'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? procedure.processingNotesEn : procedure.processingNotesTr).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-blue-500 mr-3">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Official Links */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-10">
          <h3 className="font-semibold mb-3">🔗 {isEnglish ? 'Official Resources' : 'Resmi Kaynaklar'}</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://www.konsolosluk.gov.tr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {isEnglish ? 'Appointment Portal (konsolosluk.gov.tr)' : 'Randevu Portalı (konsolosluk.gov.tr)'}
              </a>
            </li>
            <li>
              <a href="https://washington.be.mfa.gov.tr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {isEnglish ? 'Turkish Embassy Washington DC' : 'Türkiye Büyükelçiliği Washington DC'}
              </a>
            </li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-10 rounded-r-lg">
          <p className="text-sm text-amber-900">
            {isEnglish 
              ? '⚠️ This page is informational, not official government instructions. Requirements can change. Confirm on the official consular portal and with the mission.'
              : '⚠️ Bu sayfa bilgilendirme amaçlıdır; resmi talimat değildir. Şartlar değişebilir. Resmi konsolosluk portalından ve temsilcilikten teyit ediniz.'}
          </p>
        </div>

        {/* Related Procedures */}
        {relatedProcedures.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Procedures' : 'İlgili İşlemler'}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedProcedures.map((rp) => rp && (
                <Link
                  key={rp.slug}
                  href={`/${lang}/consular-documents/${isEnglish ? rp.slug : rp.slugTr}`}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
                >
                  <span className="font-medium text-gray-800">{isEnglish ? rp.titleEn : rp.titleTr}</span>
                  <span className="text-[#C9A227]">→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Cross-sell Contracts */}
        <section className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {isEnglish ? 'Often Needed Together' : 'Birlikte Sık Kullanılanlar'}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {isEnglish 
              ? 'These templates are often requested alongside consular procedures.'
              : 'Bu şablonlar, konsolosluk işlemleriyle birlikte sıkça talep edilir.'}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {procedure.relatedContracts.map((contract) => (
              <Link
                key={contract.slug}
                href={`/${lang}/contracts/${contract.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <span className="font-medium text-gray-800">{isEnglish ? contract.titleEn : contract.titleTr}</span>
                <span className="text-[#C9A227]">→</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400">© 2025 EchoLegal. {isEnglish ? 'Informational resource, not affiliated with Turkish government.' : 'Bilgilendirme kaynağı, Türk hükümeti ile bağlantılı değildir.'}</p>
        </div>
      </footer>
    </div>
  )
}
