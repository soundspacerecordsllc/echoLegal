// components/AuthorBox.tsx
// Institutional-grade author attribution component
// Designed to meet Big Law / Legal Encyclopedia standards

import { Contributor, getCanonicalAuthor, getContributor } from '@/lib/contributors'

type AuthorBoxProps = {
  lang: 'en' | 'tr'
  authorId?: string
  className?: string
  variant?: 'full' | 'compact'
}

/**
 * AuthorBox Component
 *
 * Renders an institutional-grade author attribution section that meets
 * Big Law firm and legal encyclopedia standards.
 *
 * Design principles:
 * - Third-person voice throughout
 * - Institutional phrasing (not personal bio)
 * - Clear authority hierarchy
 * - Professional legal tone
 * - Jurisdictional disclaimer integrated
 */
export default function AuthorBox({
  lang,
  authorId,
  className = '',
  variant = 'full'
}: AuthorBoxProps) {
  const author = authorId ? getContributor(authorId) : getCanonicalAuthor()

  if (!author) return null

  const isEnglish = lang === 'en'

  if (variant === 'compact') {
    return <AuthorBoxCompact author={author} lang={lang} className={className} />
  }

  return <AuthorBoxFull author={author} lang={lang} className={className} />
}

/**
 * Full AuthorBox - For article pages and detailed attribution
 */
function AuthorBoxFull({
  author,
  lang,
  className
}: {
  author: Contributor
  lang: 'en' | 'tr'
  className: string
}) {
  const isEnglish = lang === 'en'

  return (
    <section className={`border-t border-b border-gray-200 py-8 ${className}`}>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-black" />
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          {author.isTeam
            ? (isEnglish ? 'Editorial Authority' : 'Editöryal Otorite')
            : (isEnglish ? 'Contributing Attorney' : 'Katkıda Bulunan Avukat')
          }
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Author Initials / Photo */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gray-900 text-white rounded flex items-center justify-center text-2xl font-semibold">
            {author.initials}
          </div>
        </div>

        {/* Author Information */}
        <div className="flex-1">
          {/* Name and Designation */}
          <div className="mb-3">
            <h3 className="text-xl font-semibold text-gray-900">
              {author.name[lang]}
            </h3>
            {author.isAttorney && (
              <p className="text-sm text-gray-600 mt-1">
                {author.designation[lang]}
                {author.barAdmissions && author.barAdmissions.length > 0 && (
                  <span className="text-gray-400">
                    {' '}&middot;{' '}
                    {isEnglish
                      ? `Admitted in ${author.barAdmissions[0].jurisdictionName}`
                      : `${author.barAdmissions[0].jurisdictionName} Barosu`
                    }
                  </span>
                )}
              </p>
            )}
          </div>

          {/* Institutional Role */}
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            {author.institutionalRole[lang]}
          </p>

          {/* Education (for attorneys) */}
          {author.education && author.education.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {isEnglish ? 'Education' : 'Eğitim'}
              </h4>
              <ul className="space-y-1">
                {author.education.map((edu, idx) => (
                  <li key={idx} className="text-sm text-gray-600">
                    <span className="font-medium">{edu.degree}</span>
                    {', '}
                    {edu.institution}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Bar Admission (formal display) */}
          {author.barAdmissions && author.barAdmissions.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {isEnglish ? 'Bar Admission' : 'Baro Kaydı'}
              </h4>
              {author.barAdmissions.map((admission, idx) => (
                <p key={idx} className="text-sm text-gray-600">
                  {isEnglish
                    ? `${admission.jurisdictionName}`
                    : `${admission.jurisdictionName}`
                  }
                  <span className="text-gray-400 ml-2">
                    {isEnglish ? 'Registration No.' : 'Sicil No.'} {admission.number}
                  </span>
                </p>
              ))}
            </div>
          )}

          {/* Jurisdictional Disclaimer */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 leading-relaxed">
              {author.jurisdictionalNote[lang]}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Compact AuthorBox - For inline attribution in headers
 */
function AuthorBoxCompact({
  author,
  lang,
  className
}: {
  author: Contributor
  lang: 'en' | 'tr'
  className: string
}) {
  const isEnglish = lang === 'en'

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Initials */}
      <div className="w-10 h-10 bg-gray-900 text-white rounded flex items-center justify-center text-sm font-semibold flex-shrink-0">
        {author.initials}
      </div>

      {/* Info */}
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {author.name[lang]}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {author.isAttorney && author.barAdmissions && author.barAdmissions.length > 0 ? (
            <>
              {author.designation[lang]}
              <span className="text-gray-400">
                {' '}&middot;{' '}
                {author.barAdmissions[0].jurisdictionName}
              </span>
            </>
          ) : (
            author.title[lang]
          )}
        </p>
      </div>
    </div>
  )
}

/**
 * AuthorByline - Minimal inline byline for article headers
 */
export function AuthorByline({
  lang,
  authorId,
  showBar = true,
  className = ''
}: {
  lang: 'en' | 'tr'
  authorId?: string
  showBar?: boolean
  className?: string
}) {
  const author = authorId ? getContributor(authorId) : getCanonicalAuthor()

  if (!author) return null

  const isEnglish = lang === 'en'

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${className}`}>
      {/* Author name with icon */}
      <span className="flex items-center gap-1.5 text-gray-600">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        {author.name[lang]}
        {author.isAttorney && ', Esq.'}
      </span>

      {/* Bar badge */}
      {showBar && author.isAttorney && author.barAdmissions && author.barAdmissions.length > 0 && (
        <span className="flex items-center gap-1.5 text-blue-700">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          {author.barAdmissions[0].jurisdictionName} Bar #{author.barAdmissions[0].number}
        </span>
      )}
    </div>
  )
}

/**
 * AuthorSchema - JSON-LD schema for author
 */
export function getAuthorSchema(authorId?: string) {
  const author = authorId ? getContributor(authorId) : getCanonicalAuthor()

  if (!author) return null

  if (author.isTeam) {
    return {
      '@type': 'Organization',
      name: author.name.en,
      url: 'https://echo-legal.com',
    }
  }

  const schema: Record<string, unknown> = {
    '@type': 'Person',
    name: author.name.en,
    jobTitle: author.designation.en,
  }

  if (author.barAdmissions && author.barAdmissions.length > 0) {
    schema.credential = author.barAdmissions.map(a => `${a.jurisdictionName} Bar #${a.number}`).join('; ')
  }

  if (author.education && author.education.length > 0) {
    schema.alumniOf = author.education.map(edu => ({
      '@type': 'CollegeOrUniversity',
      name: edu.institution,
    }))
  }

  return schema
}
