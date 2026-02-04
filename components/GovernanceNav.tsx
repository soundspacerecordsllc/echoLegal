// components/GovernanceNav.tsx
// Sub-navigation for /about/* governance pages

import Link from 'next/link'

type GovernanceNavItem = {
  labelEn: string
  labelTr: string
  href: string
}

const GOVERNANCE_ITEMS: GovernanceNavItem[] = [
  {
    labelEn: 'Charter',
    labelTr: 'Tüzük',
    href: '/about/charter',
  },
  {
    labelEn: 'Editorial Policy',
    labelTr: 'Editöryal Politika',
    href: '/about/editorial-policy',
  },
  {
    labelEn: 'Editorial Board',
    labelTr: 'Yayın Kurulu',
    href: '/about/editorial-board',
  },
  {
    labelEn: 'Contributor Standards',
    labelTr: 'Katkıda Bulunan Standartları',
    href: '/about/contributor-standards',
  },
  {
    labelEn: 'Corrections',
    labelTr: 'Düzeltmeler',
    href: '/about/corrections',
  },
  {
    labelEn: 'Citation Guide',
    labelTr: 'Atıf Rehberi',
    href: '/about/citation-guide',
  },
]

type GovernanceNavProps = {
  lang: 'en' | 'tr'
  currentPath?: string
}

export default function GovernanceNav({ lang, currentPath }: GovernanceNavProps) {
  const isEnglish = lang === 'en'

  return (
    <nav className="border border-gray-200 rounded-lg p-4 mb-10" aria-label="Governance pages">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        {isEnglish ? 'Governance' : 'Yönetişim'}
      </h2>
      <ul className="space-y-1">
        {GOVERNANCE_ITEMS.map((item) => {
          const fullHref = `/${lang}${item.href}`
          const isActive = currentPath === item.href

          return (
            <li key={item.href}>
              <Link
                href={fullHref}
                className={`block px-3 py-2 text-sm rounded transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                }`}
              >
                {isEnglish ? item.labelEn : item.labelTr}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
