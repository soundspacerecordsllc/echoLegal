import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  
  return {
    title: isEnglish 
      ? 'Free Terms of Service Template (English & Turkish) | EchoLegal'
      : 'Ücretsiz Kullanım Koşulları Şablonu (İngilizce & Türkçe) | EchoLegal',
    description: isEnglish
      ? 'Free bilingual Terms of Service template. Pay what you can ($20 recommended) or download free. Protect your website or app.'
      : 'Ücretsiz iki dilli Kullanım Koşulları şablonu. Gücünüz kadar ödeyin (20$ önerilir) veya ücretsiz indirin.',
  }
}

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/dRm3cv9163Xp7wCdCnd7q02'
  const documentUrl = isEnglish 
    ? '/documents/TermsOfService-EN.docx'
    : '/documents/KullanimKosullari-TR.docx'

  // Cross-sell related contracts
  const relatedContracts = [
    {
      slug: 'privacy-policy',
      title: isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası',
    },
    {
      slug: 'nda',
      title: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <Link href={`/${lang}/contracts`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Contracts' : 'Sözleşmeler'}</Link>
            <Link href={`/${lang === 'en' ? 'tr' : 'en'}/contracts/terms-of-service`} className="border border-black rounded-full px-3 py-1 text-sm">{isEnglish ? 'TR' : 'EN'}</Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <Link href={`/${lang}/contracts`} className="hover:text-black">{isEnglish ? 'Contracts' : 'Sözleşmeler'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'Terms of Service' : 'Kullanım Koşulları'}</span>
        </nav>

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          📍 {isEnglish ? 'Jurisdiction: United States / Turkey' : 'Yargı Yetkisi: ABD / Türkiye'}
        </span>

        <h1 className="text-4xl md:text-5xl font-black mb-4">
          {isEnglish ? 'Terms of Service Template' : 'Kullanım Koşulları Şablonu'}
        </h1>

        <p className="text-sm text-gray-500 mb-8">{isEnglish ? 'Last Updated: January 2026' : 'Son Güncelleme: Ocak 2026'}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What is This Document?' : 'Bu Belge Nedir?'}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {isEnglish 
              ? 'Terms of Service (also called Terms and Conditions or Terms of Use) is a legal agreement between you and your users that establishes the rules for using your website, app, or service. It protects your business by limiting liability, establishing user conduct rules, and defining intellectual property rights.'
              : 'Kullanım Koşulları (Hizmet Şartları veya Kullanım Şartları olarak da bilinir), web sitenizi, uygulamanızı veya hizmetinizi kullanma kurallarını belirleyen sizinle kullanıcılarınız arasındaki yasal bir anlaşmadır. Sorumluluğu sınırlayarak, kullanıcı davranış kuralları oluşturarak ve fikri mülkiyet haklarını tanımlayarak işletmenizi korur.'}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'When You Need This' : 'Ne Zaman Gerekli'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Any website or web application',
              'SaaS products and online services',
              'E-commerce stores',
              'Mobile applications',
              'Online communities or forums',
              'Subscription-based services'
            ] : [
              'Herhangi bir web sitesi veya web uygulaması',
              'SaaS ürünleri ve online hizmetler',
              'E-ticaret mağazaları',
              'Mobil uygulamalar',
              'Online topluluklar veya forumlar',
              'Abonelik tabanlı hizmetler'
            ]).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-[#C9A227] mr-3">✓</span>
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
          <p className="text-center text-gray-600 mb-6">{isEnglish ? 'Pay what you can. $20 recommended.' : 'Ödeyebildiğiniz kadar ödeyin. $20 önerilir.'}</p>
          
          <a href={stripePaymentLink} className="block w-full bg-[#C9A227] text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-[#B8922A] mb-3">
            💳 {isEnglish ? 'I CAN Afford It — $20 (Recommended)' : 'Ödeyebilirim — $20 (Önerilen)'}
          </a>
          
          <a href={documentUrl} download className="block w-full bg-gray-800 text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 mb-4">
            📄 {isEnglish ? 'I CANNOT Afford It — Download Free' : 'Ödeyemiyorum — Ücretsiz İndir'}
          </a>

          {/* Microcopy */}
          <p className="text-center text-sm text-gray-500">
            {isEnglish 
              ? 'Most users choose $20 to support ongoing updates and bilingual access.'
              : 'Çoğu kullanıcı, sürekli güncellemeleri ve iki dilli erişimi desteklemek için 20$ seçiyor.'}
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

      <footer className="border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400">© 2025 EchoLegal. Prepared under supervision of NY licensed attorney (Bar #5552336).</p>
        </div>
      </footer>
    </div>
  )
}
