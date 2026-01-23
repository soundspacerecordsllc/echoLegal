import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import { consularProcedures } from '@/lib/consular-procedures'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  
  return {
    title: isEnglish 
      ? 'Turkish Consular Documents & Services Guide | EchoLegal'
      : 'Türk Konsolosluk Belgeleri ve Hizmetleri Rehberi | EchoLegal',
    description: isEnglish
      ? 'Free checklists for Turkish consular services: passport, ID card, notary, birth/marriage/death registration. Bilingual English & Turkish guides.'
      : 'Türk konsolosluk hizmetleri için ücretsiz kontrol listeleri: pasaport, kimlik, noter, doğum/evlilik/ölüm tescili. İki dilli rehberler.',
  }
}

export default async function ConsularDocumentsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <Link href={`/${lang}/contracts`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Contracts' : 'Sözleşmeler'}</Link>
            <Link href={`/${lang}/consular-documents`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Consular Documents' : 'Konsolosluk Belgeleri'}</Link>
            <Link href={`/${lang === 'en' ? 'tr' : 'en'}/consular-documents`} className="border border-black rounded-full px-3 py-1 text-sm">{isEnglish ? 'TR' : 'EN'}</Link>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'Consular Documents' : 'Konsolosluk Belgeleri'}</span>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish ? 'Turkish Consular Documents' : 'Türk Konsolosluk Belgeleri'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {isEnglish 
              ? 'Free printable checklists for Turkish consular services in the United States. Download, print, and prepare for your consulate appointment.'
              : 'ABD\'deki Türk konsolosluk hizmetleri için ücretsiz yazdırılabilir kontrol listeleri. İndirin, yazdırın ve konsolosluk randevunuza hazırlanın.'}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border-l-4 border-[#C9A227] p-6 rounded-r-lg mb-12">
          <h3 className="font-bold text-amber-900 mb-2">
            {isEnglish ? '📅 Appointment Required' : '📅 Randevu Gerekli'}
          </h3>
          <p className="text-amber-800">
            {isEnglish 
              ? 'All consular services require an in-person appointment booked through '
              : 'Tüm konsolosluk hizmetleri için '}
            <a href="https://konsolosluk.gov.tr" target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              konsolosluk.gov.tr
            </a>
            {isEnglish ? '. Cash payment only.' : ' üzerinden şahsen randevu alınması gereklidir. Sadece nakit ödeme.'}
          </p>
        </div>

        {/* Procedures Grid */}
        <section id="procedures" className="mb-16">
          <h2 className="text-2xl font-bold mb-8">{isEnglish ? 'All Procedures' : 'Tüm İşlemler'}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consularProcedures.filter(p => p.available).map((procedure) => (
              <div 
                key={procedure.slug}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-[#C9A227] transition-all"
              >
                <h3 className="text-xl font-bold mb-3">
                  {isEnglish ? procedure.titleEn : procedure.titleTr}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {isEnglish ? procedure.descriptionEn : procedure.descriptionTr}
                </p>
                <Link 
                  href={`/${lang}/consular-documents/${procedure.slug}`}
                  className="inline-flex items-center text-[#C9A227] font-semibold hover:underline"
                >
                  {isEnglish ? 'View Checklist' : 'Kontrol Listesini Gör'} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Download Section with Pay What You Can */}
        <section className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">
            {isEnglish ? 'Download All Checklists' : 'Tüm Kontrol Listelerini İndirin'}
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {isEnglish 
              ? 'Get all 8 consular checklists in one package. Pay what you can.'
              : '8 konsolosluk kontrol listesinin tümünü bir pakette alın. Gücünüz kadar ödeyin.'}
          </p>
          
          <div className="max-w-md mx-auto space-y-3">
            <a 
              href="https://buy.stripe.com/7sY4gzcdidxZ3gmdCnd7q01" 
              className="block w-full bg-[#C9A227] text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-[#B8922A]"
            >
              💳 {isEnglish ? 'I CAN Afford It — $20 (Recommended)' : 'Ödeyebilirim — $20 (Önerilen)'}
            </a>
            
            <div className="text-center text-gray-500 text-sm">
              {isEnglish ? 'or download individual checklists for free above' : 'veya yukarıdan ücretsiz olarak tek tek indirin'}
            </div>
          </div>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            {isEnglish 
              ? 'Most users choose $20 to support ongoing updates and bilingual access.'
              : 'Çoğu kullanıcı, sürekli güncellemeleri ve iki dilli erişimi desteklemek için 20$ seçiyor.'}
          </p>
        </section>

        {/* Related Contracts Cross-sell */}
        <section className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Related Legal Templates' : 'İlgili Hukuki Şablonlar'}
          </h2>
          <p className="text-gray-600 mb-4">
            {isEnglish 
              ? 'Need legal documents for your Turkey-related matters?'
              : 'Türkiye ile ilgili konularınız için hukuki belgelere mi ihtiyacınız var?'}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href={`/${lang}/contracts/nda`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts/freelance-agreement`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Freelance Service Agreement' : 'Serbest Çalışan Hizmet Sözleşmesi'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold mb-3">⚖️ {isEnglish ? 'Legal Disclaimer' : 'Hukuki Sorumluluk Reddi'}</h3>
          <p className="text-sm text-gray-600">
            {isEnglish 
              ? 'These checklists are for informational purposes only and do not constitute legal advice. Requirements may change. Always confirm current requirements with the Turkish Consulate General before your appointment.'
              : 'Bu kontrol listeleri yalnızca bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez. Gereksinimler değişebilir. Randevunuzdan önce güncel gereksinimleri T.C. Başkonsolosluğu\'ndan teyit edin.'}
          </p>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            {isEnglish 
              ? 'LEGAL DISCLAIMER: EchoLegal provides educational legal information for general informational purposes only. Nothing on this website constitutes legal advice. Requirements may change — always confirm with official sources.'
              : 'HUKUKI SORUMLULUK REDDİ: EchoLegal, yalnızca genel bilgilendirme amaçlı eğitici hukuki bilgiler sunar. Bu web sitesindeki hiçbir şey hukuki tavsiye teşkil etmez. Gereksinimler değişebilir — her zaman resmi kaynaklardan teyit alın.'}
          </p>
          <p className="text-xs text-gray-400 mt-4">
            © 2025 EchoLegal. {isEnglish ? 'Prepared under supervision of NY licensed attorney (Bar #5552336).' : 'NY lisanslı avukat gözetiminde hazırlanmıştır (Bar #5552336).'}
          </p>
        </div>
      </footer>
    </div>
  )
}
