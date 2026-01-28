// components/ContributorAttribution.tsx
// Professional, non-promotional contributor attribution for legal encyclopedia
// Designed for institutional credibility, not personal marketing

import { Contributor, getContributor, ZEYNEP_MOORE, EDITORIAL_TEAM } from '@/lib/contributors'
import { LanguageCode } from '@/lib/jurisdictions'

// Languages with full support for contributor content
type SupportedLang = 'en' | 'tr'
const getSupportedLang = (lang: LanguageCode | SupportedLang): SupportedLang =>
  lang === 'tr' ? 'tr' : 'en'

type ContributorAttributionProps = {
  contributorId?: string
  contributor?: Contributor
  lang: LanguageCode | SupportedLang
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
  // Normalize language to a supported one (fallback to English)
  const supportedLang = getSupportedLang(lang)
  const isEnglish = supportedLang === 'en'

  // Get contributor from ID or props
  const contributor = propContributor || (contributorId ? getContributor(contributorId) : undefined)

  if (!contributor) {
    return null
  }

  // Get primary bar admission (first verified one, or first one)
  const primaryBarAdmission = contributor.barAdmissions?.find(b => b.isVerified) || contributor.barAdmissions?.[0]

  // Inline variant - minimal attribution for compact spaces
  if (variant === 'inline') {
    return (
      <div className={`text-sm text-gray-600 ${className}`}>
        <span className="font-medium">{contributor.name[supportedLang]}</span>
        {contributor.isAttorney && primaryBarAdmission && (
          <span className="text-gray-400">
            {' '}
            · {contributor.designation[supportedLang]}, {primaryBarAdmission.jurisdictionName}
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
            <span className="font-semibold text-gray-900">{contributor.name[supportedLang]}</span>
            {contributor.isAttorney && (
              <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded">
                {contributor.designation[supportedLang]}
              </span>
            )}
          </div>
          {primaryBarAdmission && (
            <p className="text-xs text-gray-500 mt-0.5">
              {primaryBarAdmission.jurisdictionName} Bar No. {primaryBarAdmission.number}
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
          <h3 className="font-bold text-gray-900 text-lg">{contributor.name[supportedLang]}</h3>
          <p className="text-sm text-gray-600">{contributor.title[supportedLang]}</p>

          {/* Bar admissions */}
          {contributor.isAttorney && contributor.barAdmissions.length > 0 && (
            <div className="mt-1 space-y-0.5">
              {contributor.barAdmissions.map((admission, idx) => (
                <p key={idx} className="text-xs text-gray-500">
                  {admission.jurisdictionName} Bar No. {admission.number}
                  {admission.year && ` (${admission.year})`}
                  {admission.isVerified && (
                    <span className="ml-1 text-green-600" title="Verified">✓</span>
                  )}
                </p>
              ))}
            </div>
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
          {contributor.institutionalRole[supportedLang]}
        </p>
      </div>

      {/* Jurisdictional Note - Always shown for attorneys */}
      {showJurisdiction && contributor.jurisdictionalNote && (
        <div className="pt-4 mt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 leading-relaxed">
            {contributor.jurisdictionalNote[supportedLang]}
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
  reviewerId,
  lastReviewedAt,
  className = '',
}: {
  lang: 'en' | 'tr'
  reviewerId?: string
  lastReviewedAt?: string
  className?: string
}) {
  const isEnglish = lang === 'en'
  const reviewer = reviewerId ? getContributor(reviewerId) : ZEYNEP_MOORE

  return (
    <section className={`border-t border-gray-200 pt-8 mt-12 ${className}`}>
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        {isEnglish ? 'Legal Review' : 'Hukuki İnceleme'}
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        {isEnglish
          ? 'This content has been reviewed for accuracy by a licensed attorney.'
          : 'Bu içerik, lisanslı bir avukat tarafından doğruluk açısından incelenmiştir.'}
        {lastReviewedAt && (
          <span className="text-gray-400">
            {' '}
            {isEnglish ? 'Last reviewed:' : 'Son inceleme:'}{' '}
            {new Date(lastReviewedAt).toLocaleDateString(isEnglish ? 'en-US' : 'tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        )}
      </p>
      <ContributorAttribution
        contributor={reviewer}
        lang={lang}
        variant="compact"
      />
    </section>
  )
}
