// components/AuthorBox.tsx
// Authority/credentials are intentionally hidden (service-first). Do not render in UI.
// This component is retained for type compatibility but renders nothing.
// Authority signals exist only in hidden metadata (JSON-LD, Next.js metadata).

import { Contributor, getCanonicalAuthor, getContributor } from '@/lib/contributors'

type AuthorBoxProps = {
  lang: 'en' | 'tr'
  authorId?: string
  className?: string
  variant?: 'full' | 'compact'
}

/**
 * AuthorBox Component
 * Service-first: no visible personal credit rendered.
 * Authority signals exist in JSON-LD and metadata only.
 */
export default function AuthorBox({
  lang,
  authorId,
  className = '',
  variant = 'full'
}: AuthorBoxProps) {
  // Service-first: no visible personal credit rendered
  return null
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
            : (isEnglish ? 'Author' : 'Yazar')
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
 * AuthorByline - Service-first: returns null. No visible personal credit.
 */
export function AuthorByline({
  lang,
  authorId,
  className = ''
}: {
  lang: 'en' | 'tr'
  authorId?: string
  className?: string
}) {
  return null
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

  return {
    '@type': 'Person',
    name: author.name.en,
    jobTitle: author.designation.en,
  }
}
