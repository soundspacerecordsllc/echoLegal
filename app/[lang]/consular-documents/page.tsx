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
      ? 'Turkish Consular Documents — Checklists & Requirements (EN/TR) | EchoLegal'
      : 'Konsolosluk Belgeleri — Kontrol Listeleri & Gereksinimler (EN/TR) | EchoLegal',
    description: isEnglish
      ? 'Free Turkish consular procedure checklists in English & Turkish. Passport, ID, notary, birth/marriage registration. Appointment portal guidance.'
      : 'Ücretsiz Türk konsolosluk işlem kontrol listeleri İngilizce & Türkçe. Pasaport, kimlik, noter, doğum/evlilik kaydı. Randevu portalı rehberi.',
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
            <Link href={`/${lang}/consular-documents`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Consular' : 'Konsolosluk'}</Link>
            <Link href={`/${lang === 'en' ? 'tr' : 'en'}/consular-documents`} className="border border-black rounded-full px-3 py-1 text-sm">{isEnglish ? 'TR' : 'EN'}</Link>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <span className="inline-block px-4 py-2 bg-red-50 text-red-800 rounded-full text-sm font-semibold mb-4">
            🇹🇷 {isEnglish ? 'For Turkish Citizens Abroad' : 'Yurt Dışındaki Türk Vatandaşları İçin'}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish ? 'Consular Documents & Procedures' : 'Konsolosluk Belgeleri & İşlemleri'}
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mb-6">
            {isEnglish 
              ? 'Plain-language checklists for Turkish consular procedures. Know what to bring before your appointment.'
              : 'Türk konsolosluk işlemleri için sade dilde kontrol listeleri. Randevunuzdan önce ne getireceğinizi bilin.'}
          </p>

          {/* CTA Block */}
          <div className="bg-gradient-to-r from-red-50 to-white border border-red-100 rounded-xl p-6 max-w-2xl">
            <p className="font-semibold text-gray-900 mb-2">
              {isEnglish
                ? 'Free checklists in English & Turkish. I support EchoLegal – $20 recommended.'
                : 'İngilizce & Türkçe ücretsiz kontrol listeleri. EchoLegal\'i destekliyorum – 20$ önerilir.'}
            </p>
            <Link 
              href="#procedures"
              className="inline-block bg-[#C9A227] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors"
            >
              {isEnglish ? 'Browse Procedures ↓' : 'İşlemleri Görüntüle ↓'}
            </Link>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-12 rounded-r-lg">
          <p className="font-semibold text-blue-900 mb-1">
            {isEnglish ? '📅 Appointments Required' : '📅 Randevu Zorunludur'}
          </p>
          <p className="text-blue-800 text-sm">
            {isEnglish 
              ? 'Most procedures require an appointment via the official portal: konsolosluk.gov.tr. Walk-ins are generally not accepted.'
              : 'Çoğu işlem resmi portal üzerinden randevu gerektirir: konsolosluk.gov.tr. Randevusuz başvuru genellikle kabul edilmez.'}
          </p>
          <a 
            href="https://www.konsolosluk.gov.tr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-2 text-blue-600 font-medium hover:underline"
          >
            {isEnglish ? 'Go to Appointment Portal →' : 'Randevu Portalına Git →'}
          </a>
        </div>

        {/* Procedures Grid */}
        <section id="procedures">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'All Procedures' : 'Tüm İşlemler'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consularProcedures.map((procedure) => (
              <Link
                key={procedure.slug}
                href={`/${lang}/consular-documents/${procedure.slug}`}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-[#C9A227] transition-all group"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#C9A227]">
                  {isEnglish ? procedure.titleEn : procedure.titleTr}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {isEnglish ? procedure.descriptionEn : procedure.descriptionTr}
                </p>
                <span className="text-[#C9A227] font-medium text-sm">
                  {isEnglish ? 'View Checklist →' : 'Kontrol Listesini Gör →'}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold mb-2">⚖️ {isEnglish ? 'Disclaimer' : 'Sorumluluk Reddi'}</h3>
          <p className="text-sm text-gray-600">
            {isEnglish 
              ? 'This page is informational, not official government instructions. Requirements can change. Confirm on the official consular portal and with the mission.'
              : 'Bu sayfa bilgilendirme amaçlıdır; resmi talimat değildir. Şartlar değişebilir. Resmi konsolosluk portalından ve temsilcilikten teyit ediniz.'}
          </p>
        </div>

        {/* Cross-sell to Contracts */}
        <section className="mt-12 bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {isEnglish ? 'Often Needed Together' : 'Birlikte Sık Kullanılanlar'}
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {isEnglish 
              ? 'These templates are often requested alongside consular procedures.'
              : 'Bu şablonlar, konsolosluk işlemleriyle birlikte sıkça talep edilir.'}
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { slug: 'service-agreement', titleEn: 'Service Agreement', titleTr: 'Hizmet Sözleşmesi' },
              { slug: 'independent-contractor', titleEn: 'Independent Contractor', titleTr: 'Bağımsız Yüklenici' },
              { slug: 'nda', titleEn: 'NDA', titleTr: 'Gizlilik Sözleşmesi' },
            ].map((contract) => (
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
