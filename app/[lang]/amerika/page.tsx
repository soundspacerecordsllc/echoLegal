import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import TrustStrip from '@/components/TrustStrip'
import { amerikaHubPages, legalKits, getHubPagesByCategory } from '@/lib/amerika-hub'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? "Coming to America & Starting a Business in the US (For Turks) | EchoLegal"
      : "Amerika'ya Gelmek & ABD'de İş Kurmak (Türkler için) | EchoLegal",
    description: isEnglish
      ? "Comprehensive legal reference for Turkish citizens coming to the US or starting a business. Immigration, LLC formation, taxes, and contracts."
      : "ABD'ye gelen veya iş kuran Türk vatandaşları için kapsamlı hukuk referansı. Göçmenlik, LLC kurulumu, vergiler ve sözleşmeler.",
  }
}

export default async function AmerikaHubPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const immigrationPages = getHubPagesByCategory('immigration')
  const businessPages = getHubPagesByCategory('business')
  const taxPages = getHubPagesByCategory('tax')
  const contractPages = getHubPagesByCategory('contracts')
  const platformPages = getHubPagesByCategory('platform')

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Home' : 'Ana Sayfa'}
            </Link>
            <Link href={`/${lang}/contracts`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Contracts' : 'Sözleşmeler'}
            </Link>
            <Link
              href={`/${lang === 'en' ? 'tr' : 'en'}/amerika`}
              className="border border-black rounded-full px-3 py-1 text-sm"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika' }
          ]}
        />

        <TrustStrip lang={lang} />

        {/* Hero Section */}
        <div className="mb-16">
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
            📍 {isEnglish ? 'Jurisdiction: United States / Turkey' : 'Yargı Yetkisi: ABD / Türkiye'}
          </span>

          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            {isEnglish
              ? "Coming to America & Starting a Business in the US"
              : "Amerika'ya Gelmek & ABD'de İş Kurmak"}
          </h1>

          <p className="text-xl text-gray-600 mb-4">
            {isEnglish
              ? "A comprehensive legal reference for Turkish citizens"
              : "Türk vatandaşları için kapsamlı hukuk referansı"}
          </p>

          <p className="text-gray-500 text-sm">
            {isEnglish ? 'Last verified: January 2026' : 'Son doğrulama: Ocak 2026'}
          </p>
        </div>

        {/* What This Hub Covers */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'What This Hub Covers' : 'Bu Bölüm Neyi Kapsar'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">
                {isEnglish ? 'Covered' : 'Kapsanan Konular'}
              </h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• {isEnglish ? 'Visa categories and entry pathways' : 'Vize kategorileri ve giriş yolları'}</li>
                <li>• {isEnglish ? 'LLC and Corporation formation' : 'LLC ve şirket kurulumu'}</li>
                <li>• {isEnglish ? 'US tax basics for non-residents' : 'Yerleşik olmayanlar için ABD vergi temelleri'}</li>
                <li>• {isEnglish ? 'Essential business contracts' : 'Temel iş sözleşmeleri'}</li>
                <li>• {isEnglish ? 'Common misconceptions and risks' : 'Yaygın yanlış bilinenler ve riskler'}</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'Not Covered' : 'Kapsamayan Konular'}
              </h3>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• {isEnglish ? 'Individual visa applications' : 'Bireysel vize başvuruları'}</li>
                <li>• {isEnglish ? 'Legal representation' : 'Hukuki temsil'}</li>
                <li>• {isEnglish ? 'Case-specific advice' : 'Dosyaya özgü tavsiyeler'}</li>
                <li>• {isEnglish ? 'Immigration consultations' : 'Göçmenlik danışmanlığı'}</li>
                <li>• {isEnglish ? 'Tax filing services' : 'Vergi beyan hizmetleri'}</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
            {isEnglish
              ? 'This platform provides general legal information only. It does not provide individual representation or legal advice.'
              : 'Bu platform yalnızca genel hukuki bilgi sunar. Bireysel temsil veya hukuki tavsiye sağlamaz.'}
          </div>
        </section>

        {/* Immigration Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>✈️</span>
            {isEnglish ? 'Immigration & Visas' : 'Göçmenlik & Vizeler'}
          </h2>
          <div className="grid gap-3">
            {immigrationPages.map(page => (
              <Link
                key={page.slug}
                href={`/${lang}/amerika/${page.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <div>
                  <span className="font-medium text-gray-900">
                    {isEnglish ? page.titleEn : page.titleTr}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {isEnglish ? page.descriptionEn : page.descriptionTr}
                  </p>
                </div>
                <span className="text-[#C9A227] text-xl">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Business Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>🏢</span>
            {isEnglish ? 'Starting a Business' : 'İş Kurmak'}
          </h2>
          <div className="grid gap-3">
            {businessPages.map(page => (
              <Link
                key={page.slug}
                href={`/${lang}/amerika/${page.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <div>
                  <span className="font-medium text-gray-900">
                    {isEnglish ? page.titleEn : page.titleTr}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {isEnglish ? page.descriptionEn : page.descriptionTr}
                  </p>
                </div>
                <span className="text-[#C9A227] text-xl">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Tax Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>📊</span>
            {isEnglish ? 'Taxes' : 'Vergiler'}
          </h2>
          <div className="grid gap-3">
            {taxPages.map(page => (
              <Link
                key={page.slug}
                href={`/${lang}/amerika/${page.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <div>
                  <span className="font-medium text-gray-900">
                    {isEnglish ? page.titleEn : page.titleTr}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {isEnglish ? page.descriptionEn : page.descriptionTr}
                  </p>
                </div>
                <span className="text-[#C9A227] text-xl">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Contracts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>📝</span>
            {isEnglish ? 'Contracts' : 'Sözleşmeler'}
          </h2>
          <div className="grid gap-3">
            {contractPages.map(page => (
              <Link
                key={page.slug}
                href={`/${lang}/amerika/${page.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <div>
                  <span className="font-medium text-gray-900">
                    {isEnglish ? page.titleEn : page.titleTr}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {isEnglish ? page.descriptionEn : page.descriptionTr}
                  </p>
                </div>
                <span className="text-[#C9A227] text-xl">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Legal Kits Section */}
        <section className="mb-12 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-2">
            {isEnglish ? 'Legal Kits' : 'Legal Kitler'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isEnglish
              ? 'Curated template and guide packages. Pay what you can.'
              : 'Derlenmiş şablon ve rehber paketleri. Ödeyebildiğiniz kadar ödeyin.'}
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {legalKits.map(kit => (
              <Link
                key={kit.slug}
                href={`/${lang}/amerika/legal-kitler/${kit.slug}`}
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {isEnglish ? kit.titleEn : kit.titleTr}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {isEnglish ? kit.descriptionEn : kit.descriptionTr}
                </p>
                <span className="text-[#C9A227] font-medium text-sm">
                  ${kit.price} {isEnglish ? 'recommended' : 'önerilen'} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Platform Info */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>ℹ️</span>
            {isEnglish ? 'About This Platform' : 'Platform Hakkında'}
          </h2>
          <div className="grid gap-3">
            {platformPages.map(page => (
              <Link
                key={page.slug}
                href={`/${lang}/amerika/${page.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <div>
                  <span className="font-medium text-gray-900">
                    {isEnglish ? page.titleEn : page.titleTr}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {isEnglish ? page.descriptionEn : page.descriptionTr}
                  </p>
                </div>
                <span className="text-[#C9A227] text-xl">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer Disclaimer */}
        <div className="border-t border-gray-200 pt-8 text-sm text-gray-500">
          <p>
            {isEnglish
              ? 'This content is for general informational purposes only and does not constitute legal advice. For specific legal questions, consult a licensed attorney in your jurisdiction.'
              : 'Bu içerik yalnızca genel bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez. Belirli hukuki sorular için yetki alanınızdaki lisanslı bir avukata danışın.'}
          </p>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400">
            © 2025 EchoLegal. {isEnglish
              ? 'Prepared under supervision of NY licensed attorney (Bar #5552336).'
              : 'NY lisanslı avukat gözetiminde hazırlanmıştır (Bar #5552336).'}
          </p>
        </div>
      </footer>
    </div>
  )
}
