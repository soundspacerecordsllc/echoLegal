import Link from 'next/link'

type FooterProps = {
  lang: string
  dict: any
}

export default function Footer({ lang, dict }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const isEnglish = lang === 'en'
  const templatesUrl = isEnglish ? `/${lang}/templates` : '/tr/sablonlar'

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Library */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
              {isEnglish ? 'Library' : 'Kütüphane'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${lang}/library`} className="text-gray-300 hover:text-white transition-colors">
                  {isEnglish ? 'Reference Guides' : 'Referans Rehberleri'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/amerika`} className="text-gray-300 hover:text-white transition-colors">
                  {isEnglish ? 'US Business Hub' : 'ABD İş Merkezi'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/encyclopedia`} className="text-gray-300 hover:text-white transition-colors">
                  {isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Templates */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
              {isEnglish ? 'Templates' : 'Şablonlar'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={templatesUrl} className="text-gray-300 hover:text-white transition-colors">
                  {isEnglish ? 'All Templates' : 'Tüm Şablonlar'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contracts`} className="text-gray-300 hover:text-white transition-colors">
                  {isEnglish ? 'Contracts' : 'Sözleşmeler'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/legal-kits`} className="text-gray-300 hover:text-white transition-colors">
                  {isEnglish ? 'Legal Kits' : 'Hukuki Kitler'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
              {isEnglish ? 'Tools' : 'Araçlar'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${lang}/checklists`} className="text-gray-300 hover:text-white transition-colors">
                  {isEnglish ? 'Checklists' : 'Kontrol Listeleri'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/checklists/w8-w9-karar-haritasi`} className="text-gray-300 hover:text-white transition-colors">
                  {isEnglish ? 'W-8 / W-9 Guide' : 'W-8 / W-9 Rehberi'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/support`} className="text-gray-300 hover:text-white transition-colors">
                  {isEnglish ? 'Support' : 'Destek'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">
              {dict.footer.legal}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${lang}/legal/privacy`} className="text-gray-300 hover:text-white transition-colors">
                  {dict.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/legal/terms`} className="text-gray-300 hover:text-white transition-colors">
                  {dict.footer.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/legal/disclaimer`} className="text-gray-300 hover:text-white transition-colors">
                  {dict.footer.disclaimer}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-lg font-serif font-semibold text-white mb-1">EchoLegal</p>
              <p className="text-sm text-gray-400">{dict.footer.tagline}</p>
            </div>
            <p className="text-sm text-gray-500">
              {dict.footer.copyright}
            </p>
          </div>

          <p className="mt-6 text-xs text-gray-500 leading-relaxed max-w-3xl">
            {dict.disclaimer.global}
          </p>
        </div>
      </div>
    </footer>
  )
}
