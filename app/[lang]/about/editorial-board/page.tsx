// app/[lang]/about/editorial-board/page.tsx

import { Locale } from '@/i18n-config'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import GovernanceNav from '@/components/GovernanceNav'
import { getActiveContributors, getEditorialTeam, Contributor } from '@/lib/contributors'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Editorial Board | EchoLegal'
    : 'Yayın Kurulu | EchoLegal'

  const description = isEnglish
    ? 'The editorial board holding final structural authority over EchoLegal content. Verification status, jurisdictional coverage, classification standards, and editorial roles.'
    : 'EchoLegal içeriği üzerinde nihai yapısal otoriteye sahip yayın kurulu. Doğrulama durumu, yargı alanı kapsamı, sınıflandırma standartları ve editöryal roller.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEnglish ? 'en_US' : 'tr_TR',
      siteName: 'EchoLegal',
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

function BoardMemberCard({ contributor, lang }: { contributor: Contributor; lang: 'en' | 'tr' }) {
  const isEnglish = lang === 'en'

  const roleLabels: Record<string, { en: string; tr: string }> = {
    'editorial-authority': { en: 'Editorial Director', tr: 'Editöryal Direktör' },
    'editor': { en: 'Editor', tr: 'Editör' },
    'reviewer': { en: 'Reviewer', tr: 'İncelemeci' },
    'author': { en: 'Content Research & Drafting', tr: 'İçerik Araştırma ve Hazırlık' },
  }

  const roleLabel = roleLabels[contributor.role]

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 ${contributor.isAttorney ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'} rounded flex items-center justify-center text-lg font-semibold flex-shrink-0`}>
          {contributor.initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900">
            {contributor.name[lang]}
          </h3>
          <p className="text-sm text-gray-600 mt-0.5">
            {roleLabel ? (isEnglish ? roleLabel.en : roleLabel.tr) : contributor.role}
          </p>

          {/* Bar Admissions */}
          {contributor.barAdmissions.length > 0 && (
            <div className="mt-3 space-y-1">
              {contributor.barAdmissions.map((admission, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  {admission.isVerified ? (
                    <span className="inline-flex items-center gap-1 text-green-700">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {isEnglish ? 'Verified' : 'Doğrulanmış'}
                    </span>
                  ) : (
                    <span className="text-gray-400">
                      {isEnglish ? 'Pending' : 'Beklemede'}
                    </span>
                  )}
                  <span className="text-gray-600">
                    {isEnglish
                      ? `Admitted in ${admission.jurisdictionName}`
                      : `${admission.jurisdictionName} Barosu`}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Bio */}
          {contributor.bio && (
            <p className="text-sm text-gray-600 mt-3">
              {contributor.bio[lang]}
            </p>
          )}

          {/* Jurisdictions & Languages */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {contributor.jurisdictions.filter(j => j !== 'GENERAL').map((j) => (
              <span key={j} className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                {j}
              </span>
            ))}
            {contributor.languages.map((l) => (
              <span key={l} className="inline-block px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded">
                {l.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function EditorialBoardPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const breadcrumbItems = [
    { label: isEnglish ? 'About' : 'Hakkımızda', href: `/${lang}/about` },
    { label: isEnglish ? 'Editorial Board' : 'Yayın Kurulu' },
  ]

  const allContributors = getActiveContributors()
  const attorneys = allContributors.filter(c => c.isAttorney)
  const teams = allContributors.filter(c => c.isTeam)

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={breadcrumbItems} lang={lang} />

      <GovernanceNav lang={lang} currentPath="/about/editorial-board" />

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
          {isEnglish ? 'Editorial Board' : 'Yayın Kurulu'}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {isEnglish
            ? 'The editorial board holds final structural authority over all published content. Members are responsible for maintaining accuracy, jurisdictional integrity, and classification standards across the encyclopedia.'
            : 'Yayın kurulu, tüm yayınlanan içerik üzerinde nihai yapısal otoriteye sahiptir. Üyeler, ansiklopedi genelinde doğruluk, yargı alanı bütünlüğü ve sınıflandırma standartlarının sürdürülmesinden sorumludur.'}
        </p>
      </div>

      {/* Editorial Standards Note */}
      <section className="mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-gray-700">
            {isEnglish
              ? 'All substantive legal content is reviewed by at least one licensed attorney before publication. The reviewing attorney verifies legal accuracy, ensures jurisdictional appropriateness, and confirms that required disclaimers are present. The editorial board retains final authority over AuthorityLevel assignment, CanonicalId assignment, and jurisdiction tagging for all entries. Review dates are displayed on every content page.'
              : 'Tüm esaslı hukuki içerik, yayınlanmadan önce en az bir lisanslı avukat tarafından incelenir. İnceleme avukatı hukuki doğruluğu doğrular, yargı alanı uygunluğunu sağlar ve gerekli feragatnamelerin mevcut olduğunu teyit eder. Yayın kurulu, tüm maddeler için AuthorityLevel ataması, CanonicalId ataması ve yargı alanı etiketlemesi üzerinde nihai otoriteyi elinde tutar. İnceleme tarihleri her içerik sayfasında gösterilir.'}
          </p>
        </div>
      </section>

      {/* Reviewing Attorneys */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Reviewing Attorneys' : 'İnceleme Avukatları'}
        </h2>
        <div className="space-y-4">
          {attorneys.map((contributor) => (
            <BoardMemberCard key={contributor.id} contributor={contributor} lang={lang} />
          ))}
        </div>
      </section>

      {/* Editorial Team */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Editorial Team' : 'Editör Ekibi'}
        </h2>
        <div className="space-y-4">
          {teams.map((contributor) => (
            <BoardMemberCard key={contributor.id} contributor={contributor} lang={lang} />
          ))}
        </div>
      </section>

      {/* Contribute */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-black mb-4">
          {isEnglish ? 'Contributing to EchoLegal' : 'EchoLegal\'a Katkıda Bulunma'}
        </h2>
        <p className="text-gray-700 mb-2">
          {isEnglish
            ? 'Licensed attorneys may apply to contribute jurisdiction-specific entries subject to editorial review. Accepted contributors are attributed on published entries and listed on this page with verified credentials.'
            : 'Lisanslı avukatlar, editöryal incelemeye tabi olarak yargı alanına özgü maddelere katkıda bulunmak üzere başvurabilir. Kabul edilen katkıda bulunanlar yayınlanan maddelerde atfedilir ve doğrulanmış kimlik bilgileriyle bu sayfada listelenir.'}
        </p>
        <p className="text-sm text-gray-500">
          {isEnglish
            ? 'Eligibility requirements and submission procedures are detailed in the Contributor Standards.'
            : 'Uygunluk gereksinimleri ve sunum prosedürleri Katkıda Bulunan Standartlarında detaylandırılmıştır.'}
        </p>
      </section>
    </main>
  )
}
