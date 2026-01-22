import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'

export default async function EncyclopediaPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const articles = [
    {
      slug: 'what-is-nda',
      title: isEnglish ? 'What is an NDA?' : 'NDA Nedir?',
      description: isEnglish 
        ? 'Everything you need to know about Non-Disclosure Agreements.'
        : 'Gizlilik Sözleşmeleri hakkında bilmeniz gereken her şey.',
      readTime: '8 min',
      available: true,
    },
    {
      slug: 'freelancer-legal-guide',
      title: isEnglish ? 'Freelancer Legal Guide' : 'Serbest Çalışan Hukuk Rehberi',
      description: isEnglish 
        ? 'Essential legal knowledge for freelancers and independent contractors.'
        : 'Serbest çalışanlar için temel hukuki bilgiler.',
      readTime: '12 min',
      available: false,
    },
    {
      slug: 'contractor-vs-employee',
      title: isEnglish ? 'Contractor vs Employee' : 'Yüklenici mi Çalışan mı?',
      description: isEnglish 
        ? 'Key differences and why classification matters.'
        : 'Temel farklar ve sınıflandırmanın önemi.',
      readTime: '10 min',
      available: false,
    },
    {
      slug: 'privacy-policy-guide',
      title: isEnglish ? 'Do I Need a Privacy Policy?' : 'Gizlilik Politikasına İhtiyacım Var mı?',
      description: isEnglish 
        ? 'GDPR, CCPA, and KVKK requirements explained.'
        : 'GDPR, CCPA ve KVKK gereksinimleri açıklandı.',
      readTime: '8 min',
      available: false,
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
            <Link href={`/${lang}/encyclopedia`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}</Link>
            <Link href={`/${lang}/support`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Support' : 'Destek'}</Link>
            <Link href={`/${lang === 'en' ? 'tr' : 'en'}/encyclopedia`} className="border border-black rounded-full px-3 py-1 text-sm">{isEnglish ? 'TR' : 'EN'}</Link>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black mb-4">
          {isEnglish ? 'Legal Encyclopedia' : 'Hukuk Ansiklopedisi'}
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          {isEnglish 
            ? 'Comprehensive guides on business law, employment, intellectual property, and more.'
            : 'İş hukuku, istihdam, fikri mülkiyet ve daha fazlası hakkında kapsamlı rehberler.'}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <div 
              key={article.slug}
              className={`border rounded-lg p-6 ${article.available ? 'border-gray-200 hover:shadow-lg transition-shadow' : 'border-gray-100 bg-gray-50'}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  article.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {article.available 
                    ? (isEnglish ? 'Available' : 'Mevcut') 
                    : (isEnglish ? 'Coming Soon' : 'Yakında')}
                </span>
                <span className="text-xs text-gray-400">⏱️ {article.readTime}</span>
              </div>
              
              <h2 className="text-xl font-bold mb-2">
                {article.title}
              </h2>
              
              <p className="text-gray-600 mb-4">
                {article.description}
              </p>
              
              {article.available ? (
                <Link
                  href={`/${lang}/encyclopedia/${article.slug}`}
                  className="inline-block text-[#C9A227] font-semibold hover:underline"
                >
                  {isEnglish ? 'Read Article →' : 'Makaleyi Oku →'}
                </Link>
              ) : (
                <span className="text-gray-400">
                  {isEnglish ? 'Coming Soon' : 'Yakında'}
                </span>
              )}
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400">© 2025 EchoLegal. Prepared under supervision of NY licensed attorney (Bar #5552336).</p>
        </div>
      </footer>
    </div>
  )
}
