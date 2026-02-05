import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? 'Free Privacy Policy Template (English & Turkish) | EchoLegal'
      : 'Ücretsiz Gizlilik Politikası Şablonu (İngilizce & Türkçe) | EchoLegal',
    description: isEnglish
      ? 'Free bilingual privacy policy template. GDPR, CCPA & KVKK compliant. I support EchoLegal ($49 recommended) or download free.'
      : 'Ücretsiz iki dilli gizlilik politikası şablonu. GDPR, CCPA ve KVKK uyumlu. Gücünüz kadar ödeyin (49$ önerilir).',
  }
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/dRm3cv9163Xp7wCdCnd7q02'
  const documentUrl = isEnglish
    ? '/documents/PrivacyPolicy-EN.docx'
    : '/documents/GizlilikPolitikasi-TR.docx'

  // Cross-sell related contracts
  const relatedContracts = [
    {
      slug: 'terms-of-service',
      title: isEnglish ? 'Terms of Service' : 'Kullanım Koşulları',
    },
    {
      slug: 'nda',
      title: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
    },
  ]

  return (
    <div className="bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <Link href={`/${lang}/contracts`} className="hover:text-black">{isEnglish ? 'Contracts' : 'Sözleşmeler'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası'}</span>
        </nav>

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          📍 {isEnglish ? 'Jurisdiction: GDPR / CCPA / KVKK Compliant' : 'Yargı Yetkisi: GDPR / CCPA / KVKK Uyumlu'}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {isEnglish ? 'Privacy Policy Template' : 'Gizlilik Politikası Şablonu'}
        </h1>

        <p className="text-sm text-gray-500 mb-8">{isEnglish ? 'Last Updated: January 2026' : 'Son Güncelleme: Ocak 2026'}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What is This Document?' : 'Bu Belge Nedir?'}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {isEnglish
              ? 'A Privacy Policy is a legal document that explains how your website or app collects, uses, stores, and protects user data. It is required by law in most jurisdictions (GDPR in Europe, CCPA in California, KVKK in Turkey) for any website that collects personal information.'
              : 'Gizlilik Politikası, web sitenizin veya uygulamanızın kullanıcı verilerini nasıl topladığını, kullandığını, sakladığını ve koruduğunu açıklayan yasal bir belgedir. Kişisel bilgi toplayan herhangi bir web sitesi için çoğu yargı bölgesinde (Avrupa\'da GDPR, California\'da CCPA, Türkiye\'de KVKK) yasalarca zorunludur.'}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'When You Need This' : 'Ne Zaman Gerekli'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Any website that collects user data',
              'E-commerce stores',
              'SaaS applications',
              'Mobile apps',
              'Websites using cookies or analytics',
              'Email newsletter sign-ups'
            ] : [
              'Kullanıcı verisi toplayan herhangi bir web sitesi',
              'E-ticaret mağazaları',
              'SaaS uygulamaları',
              'Mobil uygulamalar',
              'Çerez veya analitik kullanan web siteleri',
              'E-posta bülteni kayıtları'
            ]).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-[#C9A227] mr-3">✓</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">{isEnglish ? 'Who Uses This?' : 'Kimler Kullanır?'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Any website or app collecting user data',
              'E-commerce businesses',
              'SaaS platforms',
              'Mobile app developers',
              'Businesses operating in GDPR, CCPA, or KVKK jurisdictions'
            ] : [
              'Kullanıcı verisi toplayan tüm web siteleri veya uygulamalar',
              'E-ticaret işletmeleri',
              'SaaS platformları',
              'Mobil uygulama geliştiricileri',
              'GDPR, CCPA veya KVKK yargı bölgelerinde faaliyet gösteren işletmeler'
            ]).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-[#C9A227] mr-3">✓</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            {isEnglish
              ? <>Browse all contract templates on our <Link href={`/${lang}/amerika/abdde-is-yapanlar-icin-sozlesmeler`} className="text-[#C9A227] hover:underline">Contracts for Doing Business in the US</Link> guide.</>
              : <>Tüm sözleşme şablonlarını <Link href={`/${lang}/amerika/abdde-is-yapanlar-icin-sozlesmeler`} className="text-[#C9A227] hover:underline">ABD&apos;de İş Yapanlar İçin Sözleşmeler</Link> rehberimizde inceleyin.</>}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">{isEnglish ? 'What Happens If Misused or Missing?' : 'Yanlış veya Eksik Kullanılırsa Ne Olur?'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Without policy: GDPR fines up to \u20AC20M or 4% global revenue, CCPA penalties up to $7,500 per violation, KVKK fines up to 1,946,000 TL',
              'Outdated policy: non-compliance if data practices change',
              'Missing cookie disclosure: ePrivacy Directive violations',
              'No data breach procedure: increased liability and regulatory scrutiny'
            ] : [
              'Politika olmadan: GDPR kapsamında 20 milyon EUR veya küresel cironun %4\'üne kadar para cezası, CCPA kapsamında ihlal başına 7.500 USD ceza, KVKK kapsamında 1.946.000 TL\'ye kadar para cezası',
              'Güncelliğini yitirmiş politika: veri uygulamaları değişirse uyumsuzluk',
              'Çerez beyanı eksikse: eGizlilik Yönergesi ihlalleri',
              'Veri ihlali prosedürü yoksa: artan sorumluluk ve düzenleyici denetim'
            ]).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-red-500 mr-3">✗</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h3 className="font-semibold mb-3">⚖️ {isEnglish ? 'Legal Disclaimer' : 'Hukuki Sorumluluk Reddi'}</h3>
          <p className="text-sm text-gray-600">
            {isEnglish
              ? 'This template is for informational purposes only and does not constitute legal advice. Consult a licensed attorney before use.'
              : 'Bu şablon yalnızca bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez. Kullanmadan önce lisanslı bir avukata danışın.'}
          </p>
        </div>

        {/* Download Section - Updated */}
        <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">{isEnglish ? 'Download This Template' : 'Bu Şablonu İndirin'}</h2>
          <p className="text-center text-gray-600 mb-6">{isEnglish ? 'I support EchoLegal – $49 recommended. Includes Terms of Service!' : 'EchoLegal\'i destekliyorum – $49 önerilir. Kullanım Koşulları dahil!'}</p>

          <a href={stripePaymentLink} className="block w-full bg-[#C9A227] text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-[#B8922A] mb-3">
            💳 {isEnglish ? 'I CAN Afford It — $49 (Recommended)' : 'Ödeyebilirim — $49 (Önerilen)'}
          </a>

          <a href={documentUrl} download className="block w-full bg-gray-800 text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 mb-4">
            📄 {isEnglish ? 'I CANNOT Afford It — Download Free' : 'Ödeyemiyorum — Ücretsiz İndir'}
          </a>

          {/* Microcopy */}
          <p className="text-center text-sm text-gray-500">
            {isEnglish
              ? 'Most users choose $49 to support ongoing updates and bilingual access.'
              : 'Çoğu kullanıcı, sürekli güncellemeleri ve iki dilli erişimi desteklemek için 49$ seçiyor.'}
          </p>
        </div>

        {/* Cross-sell: People also download */}
        <section className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'People Also Download' : 'Bunlar da İndiriliyor'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedContracts.map((contract) => (
              <Link
                key={contract.slug}
                href={`/${lang}/contracts/${contract.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <span className="font-medium text-gray-800">{contract.title}</span>
                <span className="text-[#C9A227]">→</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
