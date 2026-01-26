// components/ContributorAttribution.tsx
// Professional, non-promotional contributor attribution for legal encyclopedia
// Designed for institutional credibility, not personal marketing

import { Contributor, getContributor, ZEYNEP_MOORE, EDITORIAL_TEAM } from '@/lib/contributors'

type ContributorAttributionProps = {
  contributorId?: string
  contributor?: Contributor
  lang: 'en' | 'tr'
  variant?: 'full' | 'compact' | 'inline'
  showJurisdiction?: boolean
  showCredentials?: boolean
  className?: string
}

export default function ContributorAttribution({
  contributorId,
  contributor: propContributor,
  lang,
  variant = 'full',
  showJurisdiction = true,
  showCredentials = true,
  className = '',
}: ContributorAttributionProps) {
  const isEnglish = lang === 'en'

  // Get contributor from ID or props
  const contributor = propContributor || (contributorId ? getContributor(contributorId) : undefined)

  if (!contributor) {
    return null
  }

  // Inline variant - minimal attribution for compact spaces
  if (variant === 'inline') {
    return (
      <div className={`text-sm text-gray-600 ${className}`}>
        <span className="font-medium">{contributor.name[lang]}</span>
        {contributor.isAttorney && contributor.barAdmission && (
          <span className="text-gray-400">
            {' '}
            · {contributor.designation[lang]}, {contributor.barAdmission.jurisdiction}
          </span>
        )}
      </div>
    )
  }

  // Compact variant - single line with key credentials
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 ${className}`}>
        {/* Initials avatar */}
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600 flex-shrink-0">
          {contributor.initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-900">{contributor.name[lang]}</span>
            {contributor.isAttorney && (
              <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded">
                {contributor.designation[lang]}
              </span>
            )}
          </div>
          {contributor.barAdmission && (
            <p className="text-xs text-gray-500 mt-0.5">
              {contributor.barAdmission.jurisdiction} Bar No. {contributor.barAdmission.number}
            </p>
          )}
        </div>
      </div>
    )
  }

  // Full variant - complete attribution box
  return (
    <div className={`bg-gray-50 rounded-xl border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-lg font-semibold text-gray-600 flex-shrink-0">
          {contributor.initials}
        </div>

        <div className="min-w-0 flex-1">
          {/* Name and designation */}
          <h3 className="font-bold text-gray-900 text-lg">{contributor.name[lang]}</h3>
          <p className="text-sm text-gray-600">{contributor.title[lang]}</p>

          {/* Bar admission */}
          {contributor.isAttorney && contributor.barAdmission && (
            <p className="text-xs text-gray-500 mt-1">
              {contributor.barAdmission.jurisdiction} Bar No. {contributor.barAdmission.number}
              {contributor.barAdmission.year && ` (${contributor.barAdmission.year})`}
            </p>
          )}
        </div>
      </div>

      {/* Credentials */}
      {showCredentials && contributor.credentials.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {contributor.credentials.map((credential, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600"
            >
              {credential}
            </span>
          ))}
        </div>
      )}

      {/* Education */}
      {contributor.education.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {isEnglish ? 'Education' : 'Eğitim'}
          </h4>
          <ul className="space-y-1">
            {contributor.education.map((edu, idx) => (
              <li key={idx} className="text-sm text-gray-600">
                <span className="font-medium">{edu.degree}</span>
                <span className="text-gray-400"> · </span>
                {edu.institution}
                {edu.location && <span className="text-gray-400">, {edu.location}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Institutional Role */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          {isEnglish ? 'Role at EchoLegal' : 'EchoLegal\'daki Rolü'}
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {contributor.institutionalRole[lang]}
        </p>
      </div>

      {/* Jurisdictional Note - Always shown for attorneys */}
      {showJurisdiction && contributor.jurisdictionalNote && (
        <div className="pt-4 mt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 leading-relaxed">
            {contributor.jurisdictionalNote[lang]}
          </p>
        </div>
      )}
    </div>
  )
}

// Pre-configured attribution for primary author
export function PrimaryAuthorAttribution({
  lang,
  variant = 'full',
  className = '',
}: {
  lang: 'en' | 'tr'
  variant?: 'full' | 'compact' | 'inline'
  className?: string
}) {
  return (
    <ContributorAttribution
      contributor={ZEYNEP_MOORE}
      lang={lang}
      variant={variant}
      className={className}
    />
  )
}

// Pre-configured attribution for editorial team
export function EditorialTeamAttribution({
  lang,
  variant = 'compact',
  className = '',
}: {
  lang: 'en' | 'tr'
  variant?: 'full' | 'compact' | 'inline'
  className?: string
}) {
  return (
    <ContributorAttribution
      contributor={EDITORIAL_TEAM}
      lang={lang}
      variant={variant}
      showCredentials={false}
      className={className}
    />
  )
}

// Section for articles showing reviewer info
export function ArticleReviewerSection({
  lang,
  className = '',
}: {
  lang: 'en' | 'tr'
  className?: string
}) {
  const isEnglish = lang === 'en'

  return (
    <section className={`border-t border-gray-200 pt-8 mt-12 ${className}`}>
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        {isEnglish ? 'Legal Review' : 'Hukuki İnceleme'}
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        {isEnglish
          ? 'This content has been reviewed for accuracy by a licensed attorney.'
          : 'Bu içerik, lisanslı bir avukat tarafından doğruluk açısından incelenmiştir.'}
      </p>
      <PrimaryAuthorAttribution lang={lang} variant="compact" />
    </section>
  )
}
