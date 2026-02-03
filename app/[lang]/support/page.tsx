import { Locale } from '@/i18n-config'
import Link from 'next/link'

export default async function SupportPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return (
    <div className="bg-white">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            {isEnglish ? 'About' : 'Hakkında'}
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 mb-4">
            {isEnglish ? 'Access & Sustainability' : 'Erişim ve Sürdürülebilirlik'}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {isEnglish
              ? 'EchoLegal operates as a public legal knowledge resource. This page explains the access model.'
              : 'EchoLegal, kamusal bir hukuki bilgi kaynağı olarak faaliyet göstermektedir. Bu sayfa erişim modelini açıklamaktadır.'}
          </p>
        </header>

        {/* Access Model */}
        <section className="mb-12">
          <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">
            {isEnglish ? 'Access Model' : 'Erişim Modeli'}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'All reference content on EchoLegal is freely accessible. Document templates are available through two options:'
              : 'EchoLegal\'daki tüm referans içeriklere ücretsiz erişilebilir. Belge şablonları iki seçenek üzerinden sunulmaktadır:'}
          </p>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-gray-400 mt-1">1.</span>
              <span>
                <strong className="text-gray-900">{isEnglish ? 'Contribution option' : 'Katkı seçeneği'}</strong>
                {isEnglish
                  ? ' — $49 (USD). Proceeds support infrastructure and content maintenance.'
                  : ' — 49$ (USD). Gelirler altyapı ve içerik bakımını destekler.'}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gray-400 mt-1">2.</span>
              <span>
                <strong className="text-gray-900">{isEnglish ? 'Free access' : 'Ücretsiz erişim'}</strong>
                {isEnglish
                  ? ' — Full document access without payment. Requires acknowledgment of terms.'
                  : ' — Ödeme olmaksızın tam belge erişimi. Şartların kabul edilmesini gerektirir.'}
              </span>
            </li>
          </ul>
        </section>

        {/* Sustainability */}
        <section className="mb-12">
          <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">
            {isEnglish ? 'Sustainability' : 'Sürdürülebilirlik'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isEnglish
              ? 'Contributions fund hosting, content updates, and expansion of the template library. This model maintains free access while supporting ongoing operations.'
              : 'Katkılar barındırma, içerik güncellemeleri ve şablon kütüphanesinin genişletilmesini finanse eder. Bu model, devam eden operasyonları desteklerken ücretsiz erişimi sürdürür.'}
          </p>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">
            {isEnglish ? 'Contact' : 'İletişim'}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {isEnglish
              ? 'For inquiries: support@echo-legal.com'
              : 'Sorularınız için: support@echo-legal.com'}
          </p>
        </section>

        {/* Related */}
        <nav className="pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
            {isEnglish ? 'Related' : 'İlgili'}
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/legal/disclaimer`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'Legal Disclaimer →' : 'Yasal Sorumluluk Reddi →'}
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              href={`/${lang}/legal/terms`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'Terms of Use →' : 'Kullanım Koşulları →'}
            </Link>
          </div>
        </nav>
      </main>
    </div>
  )
}
