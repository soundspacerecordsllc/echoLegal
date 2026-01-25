import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import HomeSearch from '@/components/HomeSearch'

export const metadata: Metadata = {
  title: 'EchoLegal | Trusted Legal Resources, Written by Attorneys',
  description:
    'A bilingual legal encyclopedia providing professionally drafted contracts, guides, and templates in English and Turkish. Reference-grade legal information for Turkish entrepreneurs in the US.',
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <div className="bg-white">
      {/* Hero Section - Professional Authority Design */}
      <section className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl">
            {/* Professional Tagline */}
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              {isEnglish
                ? 'Trusted Legal Resources, Written by Attorneys'
                : 'Avukatlar Tarafından Hazırlanan Güvenilir Hukuki Kaynaklar'}
            </p>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {isEnglish ? (
                <>
                  Reference-Grade Legal
                  <br />
                  <span className="text-gray-600">Information & Templates</span>
                </>
              ) : (
                <>
                  Referans Kalitesinde Hukuki
                  <br />
                  <span className="text-gray-600">Bilgi ve Şablonlar</span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
              {isEnglish
                ? 'A bilingual legal encyclopedia with professionally drafted contracts, comprehensive guides, and practical templates. Designed for Turkish entrepreneurs doing business in the United States.'
                : 'Profesyonelce hazırlanmış sözleşmeler, kapsamlı rehberler ve pratik şablonlar içeren iki dilli bir hukuk ansiklopedisi. ABD\'de iş yapan Türk girişimciler için tasarlandı.'}
            </p>

            {/* Search Bar - Prominent on Homepage */}
            <div className="mb-10">
              <HomeSearch lang={lang} />
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={isEnglish ? `/${lang}/templates` : `/${lang}/sablonlar`}
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
              >
                {isEnglish ? 'Explore Templates' : 'Şablonları İncele'}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href={`/${lang}/amerika`}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                {isEnglish ? 'US Business Hub' : 'ABD İş Merkezi'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats / Trust Signals */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900">50+</p>
              <p className="text-sm text-gray-500 mt-1">
                {isEnglish ? 'Document Templates' : 'Belge Şablonu'}
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-500 mt-1">
                {isEnglish ? 'Languages' : 'Dil'}
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">80+</p>
              <p className="text-sm text-gray-500 mt-1">
                {isEnglish ? 'Reference Articles' : 'Referans Makale'}
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">100%</p>
              <p className="text-sm text-gray-500 mt-1">
                {isEnglish ? 'Free Access' : 'Ücretsiz Erişim'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources - Clean Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {isEnglish ? 'Popular Resources' : 'Popüler Kaynaklar'}
              </h2>
              <p className="text-gray-500 mt-2">
                {isEnglish
                  ? 'Most frequently accessed legal guides and templates'
                  : 'En sık erişilen hukuki rehberler ve şablonlar'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* LLC Formation */}
            <ResourceCard
              href={`/${lang}/amerika/abdde-llc-kurmak`}
              title={isEnglish ? 'LLC Formation Guide' : 'ABD\'de LLC Kurmak'}
              description={
                isEnglish
                  ? 'Complete guide to forming a Limited Liability Company in the United States. State comparison, costs, and step-by-step process.'
                  : 'ABD\'de Limited Şirket kurma konusunda kapsamlı rehber. Eyalet karşılaştırması, maliyetler ve adım adım süreç.'
              }
              type={isEnglish ? 'Guide' : 'Rehber'}
              lang={lang}
            />

            {/* Tax Forms */}
            <ResourceCard
              href={`/${lang}/amerika/irs-vergi-gercekleri`}
              title={isEnglish ? 'IRS & Tax Facts' : 'IRS Vergi Gerçekleri'}
              description={
                isEnglish
                  ? 'W-8, W-9, 1099 forms explained. Understanding US tax obligations for non-resident business owners.'
                  : 'W-8, W-9, 1099 formları açıklandı. Yerleşik olmayan işletme sahipleri için ABD vergi yükümlülükleri.'
              }
              type={isEnglish ? 'Reference' : 'Referans'}
              lang={lang}
            />

            {/* NDA Template */}
            <ResourceCard
              href={`/${lang}/contracts/nda`}
              title={isEnglish ? 'Non-Disclosure Agreement' : 'Gizlilik Sözleşmesi'}
              description={
                isEnglish
                  ? 'Professionally drafted NDA template with detailed annotations. Mutual and unilateral options available.'
                  : 'Detaylı açıklamalarla profesyonelce hazırlanmış NDA şablonu. Karşılıklı ve tek taraflı seçenekler mevcut.'
              }
              type={isEnglish ? 'Template' : 'Şablon'}
              lang={lang}
            />

            {/* Contracts Overview */}
            <ResourceCard
              href={`/${lang}/amerika/abdde-is-yapanlar-icin-sozlesmeler`}
              title={isEnglish ? 'Essential Contracts' : 'Temel Sözleşmeler'}
              description={
                isEnglish
                  ? 'Overview of must-have contracts for doing business in the US. Service agreements, NDAs, and more.'
                  : 'ABD\'de iş yapmak için gerekli sözleşmelerin özeti. Hizmet sözleşmeleri, NDA\'lar ve daha fazlası.'
              }
              type={isEnglish ? 'Guide' : 'Rehber'}
              lang={lang}
            />

            {/* Bank Account */}
            <ResourceCard
              href={`/${lang}/amerika/abdde-banka-hesabi`}
              title={isEnglish ? 'US Bank Account' : 'ABD Banka Hesabı'}
              description={
                isEnglish
                  ? 'How to open a US business bank account as a non-resident. Requirements, options, and practical steps.'
                  : 'Yerleşik olmayan biri olarak ABD iş bankası hesabı nasıl açılır. Gereksinimler, seçenekler ve pratik adımlar.'
              }
              type={isEnglish ? 'Guide' : 'Rehber'}
              lang={lang}
            />

            {/* Business Starter Kit */}
            <ResourceCard
              href={`/${lang}/amerika/legal-kitler/abd-business-starter-legal-kit`}
              title={isEnglish ? 'Business Starter Kit' : 'İş Başlangıç Kiti'}
              description={
                isEnglish
                  ? '6 essential legal documents bundled for Turkish entrepreneurs starting a US business. NDA, Service Agreement, and more.'
                  : 'ABD\'de iş kuran Türk girişimciler için 6 temel hukuki belge paketi. NDA, Hizmet Sözleşmesi ve daha fazlası.'
              }
              type={isEnglish ? 'Kit' : 'Kit'}
              lang={lang}
            />
          </div>

          <div className="mt-10 text-center">
            <Link
              href={isEnglish ? `/${lang}/templates` : `/${lang}/sablonlar`}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              {isEnglish ? 'View all templates' : 'Tüm şablonları görüntüle'} →
            </Link>
          </div>
        </div>
      </section>

      {/* Content Categories */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              {isEnglish ? 'Browse by Category' : 'Kategoriye Göre Göz At'}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {isEnglish
                ? 'Organized legal resources covering business formation, contracts, taxes, and immigration.'
                : 'İşletme kurulumu, sözleşmeler, vergiler ve göçmenlik konularını kapsayan düzenli hukuki kaynaklar.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              href={`/${lang}/amerika`}
              title={isEnglish ? 'US Business Hub' : 'ABD İş Merkezi'}
              description={isEnglish ? '15+ comprehensive guides' : '15+ kapsamlı rehber'}
              count="15+"
              lang={lang}
            />
            <CategoryCard
              href={isEnglish ? `/${lang}/templates` : `/${lang}/sablonlar`}
              title={isEnglish ? 'Templates' : 'Şablonlar'}
              description={isEnglish ? 'Contracts & documents' : 'Sözleşmeler ve belgeler'}
              count="50+"
              lang={lang}
            />
            <CategoryCard
              href={`/${lang}/checklists/llc-checklist`}
              title={isEnglish ? 'Checklists' : 'Kontrol Listeleri'}
              description={isEnglish ? 'Step-by-step guides' : 'Adım adım rehberler'}
              count="5+"
              lang={lang}
            />
            <CategoryCard
              href={`/${lang}/consular-documents`}
              title={isEnglish ? 'Consular Services' : 'Konsolosluk Hizmetleri'}
              description={isEnglish ? 'Turkish consular procedures' : 'Türk konsolosluk işlemleri'}
              count="10+"
              lang={lang}
            />
          </div>
        </div>
      </section>

      {/* About / Mission Statement */}
      <section className="py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {isEnglish ? 'About EchoLegal' : 'EchoLegal Hakkında'}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  {isEnglish
                    ? 'EchoLegal is a bilingual legal reference platform providing encyclopedic legal information and professionally drafted document templates in English and Turkish.'
                    : 'EchoLegal, İngilizce ve Türkçe olarak ansiklopedik hukuki bilgiler ve profesyonelce hazırlanmış belge şablonları sunan iki dilli bir hukuk referans platformudur.'}
                </p>
                <p>
                  {isEnglish
                    ? 'Our resources are designed for Turkish entrepreneurs, professionals, and individuals navigating US legal and business requirements. All content is written with a focus on accuracy, clarity, and practical application.'
                    : 'Kaynaklarımız, ABD\'nin hukuki ve ticari gereksinimlerini anlamaya çalışan Türk girişimciler, profesyoneller ve bireyler için tasarlanmıştır. Tüm içerikler doğruluk, açıklık ve pratik uygulama odaklı yazılmıştır.'}
                </p>
              </div>
              <Link
                href={`/${lang}/about`}
                className="inline-flex items-center mt-6 text-gray-900 font-semibold hover:text-gray-600 transition-colors"
              >
                {isEnglish ? 'Learn more about us' : 'Hakkımızda daha fazla bilgi'} →
              </Link>
            </div>

            {/* What We Provide */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="font-semibold text-gray-900 mb-6">
                {isEnglish ? 'What We Provide' : 'Sunduklarımız'}
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {isEnglish ? 'Legal Information' : 'Hukuki Bilgi'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isEnglish
                        ? 'Reference-grade explanations of legal concepts, processes, and requirements.'
                        : 'Hukuki kavramların, süreçlerin ve gereksinimlerin referans kalitesinde açıklamaları.'}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {isEnglish ? 'Document Templates' : 'Belge Şablonları'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isEnglish
                        ? 'Professionally drafted contracts and business documents with annotations.'
                        : 'Açıklamalarla profesyonelce hazırlanmış sözleşmeler ve iş belgeleri.'}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {isEnglish ? 'Bilingual Support' : 'İki Dilli Destek'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {isEnglish
                        ? 'All content available in both English and Turkish with full parity.'
                        : 'Tüm içerik tam eşdeğerlik ile hem İngilizce hem de Türkçe olarak mevcuttur.'}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold mb-1">
                {isEnglish ? 'Legal Information, Not Legal Advice' : 'Hukuki Bilgi, Hukuki Tavsiye Değil'}
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {isEnglish
                  ? 'EchoLegal provides educational legal information for general reference purposes. This content does not constitute legal advice and does not create an attorney-client relationship. Consult a licensed attorney for advice specific to your situation.'
                  : 'EchoLegal, genel referans amaçlı eğitici hukuki bilgiler sunar. Bu içerik hukuki tavsiye teşkil etmez ve avukat-müvekkil ilişkisi oluşturmaz. Durumunuza özel tavsiye için lisanslı bir avukata danışın.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Resource Card Component
function ResourceCard({
  href,
  title,
  description,
  type,
  lang,
}: {
  href: string
  title: string
  description: string
  type: string
  lang: string
}) {
  return (
    <Link
      href={href}
      className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {type}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </Link>
  )
}

// Category Card Component
function CategoryCard({
  href,
  title,
  description,
  count,
  lang,
}: {
  href: string
  title: string
  description: string
  count: string
  lang: string
}) {
  return (
    <Link
      href={href}
      className="block bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all text-center group"
    >
      <p className="text-3xl font-bold text-gray-900 mb-2">{count}</p>
      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500">{description}</p>
    </Link>
  )
}
