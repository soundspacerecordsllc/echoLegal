import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import {
  EncyclopediaAuthorityLevel,
  sortByAuthority,
  validateEncyclopediaEntries,
} from '@/lib/encyclopedia-authority'
import type { EncyclopediaIndexEntry } from '@/lib/encyclopedia-authority'

export default async function EncyclopediaPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const articles: EncyclopediaIndexEntry[] = [
    {
      slug: 'contractor-vs-employee',
      title: isEnglish ? 'Contractor vs Employee' : 'Bağımsız Yüklenici mi, İşçi mi?',
      description: isEnglish
        ? 'Key differences and why classification matters.'
        : 'Temel farklar ve doğru sınıflandırmanın hukuki önemi.',
      readTime: '10 min',
      available: true,
      authorityLevel: EncyclopediaAuthorityLevel.FEDERAL_STATUTORY,
      canonicalId: 'ecl-enc-00003',
    },
    {
      slug: 'what-is-nda',
      title: isEnglish ? 'What is an NDA?' : 'Gizlilik Sözleşmesi (NDA) Nedir?',
      description: isEnglish
        ? 'Everything you need to know about Non-Disclosure Agreements.'
        : 'Gizlilik sözleşmelerinin hukuki niteliği, kapsamı ve uygulamadaki yeri.',
      readTime: '8 min',
      available: true,
      authorityLevel: EncyclopediaAuthorityLevel.DOCTRINAL_FRAMEWORK,
      canonicalId: 'ecl-enc-00001',
    },
    {
      slug: 'privacy-policy-guide',
      title: isEnglish ? 'Do I Need a Privacy Policy?' : 'Gizlilik Politikası Gerekli mi?',
      description: isEnglish
        ? 'GDPR, CCPA, and KVKK requirements explained.'
        : 'GDPR, CCPA ve KVKK kapsamında yükümlülükleriniz.',
      readTime: '8 min',
      available: true,
      authorityLevel: EncyclopediaAuthorityLevel.COMPLIANCE_REGULATORY,
      canonicalId: 'ecl-enc-00004',
    },
    {
      slug: 'freelancer-legal-guide',
      title: isEnglish ? 'Freelancer Legal Guide' : 'Serbest Çalışanlar İçin Hukuk Rehberi',
      description: isEnglish
        ? 'Essential legal knowledge for freelancers and independent contractors.'
        : 'Serbest çalışanların ve bağımsız yüklenicilerin bilmesi gereken temel hukuki konular.',
      readTime: '12 min',
      available: true,
      authorityLevel: EncyclopediaAuthorityLevel.PROCEDURAL_GUIDE,
      canonicalId: 'ecl-enc-00002',
    },
  ]

  // Validate invariants — throws in dev, returns errors for build
  const validation = validateEncyclopediaEntries(articles)
  if (!validation.valid) {
    throw new Error(
      `Encyclopedia index build failed:\n${validation.errors.join('\n')}`
    )
  }

  const sorted = sortByAuthority(articles)

  return (
    <div className="bg-white">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">
          {isEnglish ? 'Legal Encyclopedia' : 'Hukuk Ansiklopedisi'}
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          {isEnglish
            ? 'Comprehensive guides on business law, employment, intellectual property, and more.'
            : 'Ticaret hukuku, iş ilişkileri, fikri mülkiyet ve daha birçok konuda kapsamlı rehberler.'}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {sorted.map((article) => (
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
                    ? (isEnglish ? 'Available' : 'Yayında')
                    : (isEnglish ? 'Coming Soon' : 'Yakında')}
                </span>
                <span className="text-xs text-gray-400">{article.readTime}</span>
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
                  {isEnglish ? 'Read Article →' : 'Yazıyı Oku →'}
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
    </div>
  )
}
