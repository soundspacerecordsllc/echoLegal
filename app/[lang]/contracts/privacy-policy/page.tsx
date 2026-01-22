import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'

export default async function PrivacyPolicyPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/dRm3cv9163Xp7wCdCnd7q02'
  const documentUrl = isEnglish 
    ? '/documents/PrivacyPolicy-EN.docx'
    : '/documents/GizlilikPolitikasi-TR.docx'

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <Link href={`/${lang}/contracts`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Contracts' : 'Sözleşmeler'}</Link>
            <Link href={`/${lang === 'en' ? 'tr' : 'en'}/contracts/privacy-policy`} className="border border-black rounded-full px-3 py-1 text-sm">{isEnglish ? 'TR' : 'EN'}</Link>
          </div>
        </nav>
      </header>

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

        <h1 className="text-4xl md:text-5xl font-black mb-4">
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

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h3 className="font-semibold mb-3">⚖️ {isEnglish ? 'Legal Disclaimer' : 'Hukuki Sorumluluk Reddi'}</h3>
          <p className="text-sm text-gray-600">
            {isEnglish 
              ? 'This template is for informational purposes only and does not constitute legal advice. Consult a licensed attorney before use.'
              : 'Bu şablon yalnızca bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez. Kullanmadan önce lisanslı bir avukata danışın.'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">{isEnglish ? 'Download This Template' : 'Bu Şablonu İndirin'}</h2>
          <p className="text-center text-gray-600 mb-8">{isEnglish ? 'Pay what you can. $20 recommended. Includes Terms of Service!' : 'Ödeyebildiğiniz kadar ödeyin. $20 önerilir. Kullanım Koşulları dahil!'}</p>
          
          <a href={stripePaymentLink} className="block w-full bg-[#C9A227] text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-[#B8922A] mb-4">
            💳 {isEnglish ? 'I CAN Afford It – Pay $20' : 'Ödeyebilirim – $20 Öde'}
          </a>
          
          <a href={documentUrl} download className="block w-full bg-black text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-gray-800">
            📄 {isEnglish ? 'I CANNOT Afford It – Download Free' : 'Ödeyemiyorum – Ücretsiz İndir'}
          </a>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400">© 2025 EchoLegal. Prepared under supervision of NY licensed attorney (Bar #5552336).</p>
        </div>
      </footer>
    </div>
  )
}
