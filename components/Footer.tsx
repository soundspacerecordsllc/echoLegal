import Link from 'next/link'

type FooterProps = {
  lang: string
  dict: any
}

export default function Footer({ lang, dict }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-legal-navy text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">EchoLegal</h3>
            <p className="text-gray-300 text-sm">{dict.footer.tagline}</p>
            <p className="text-gray-400 text-xs mt-2">Updated January 2026</p>
          </div>

          {/* Contracts */}
          <div>
            <h4 className="font-semibold mb-4">{dict.footer.contracts}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href={`/${lang}/contracts/nda`} className="hover:text-legal-gold transition-colors">
                  Non-Disclosure Agreement
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contracts/service-agreement`} className="hover:text-legal-gold transition-colors">
                  Service Agreement
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contracts`} className="hover:text-legal-gold transition-colors">
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">{lang === 'en' ? 'Resources' : 'Kaynaklar'}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href={`/${lang}/amerika`} className="hover:text-legal-gold transition-colors">
                  {lang === 'en' ? 'Amerika Hub' : 'Amerika Hub'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/amerika/legal-kitler/abd-business-starter-legal-kit`} className="hover:text-legal-gold transition-colors">
                  {lang === 'en' ? 'Business Starter Kit' : 'Business Starter Kit'}
                </Link>
                <span className="block text-xs text-gray-500 mt-0.5">
                  {lang === 'en' ? 'Self-serve templates' : 'Self-serve şablonlar'}
                </span>
              </li>
              <li>
                <Link href={`/${lang}/encyclopedia`} className="hover:text-legal-gold transition-colors">
                  {lang === 'en' ? 'Encyclopedia' : 'Ansiklopedi'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{dict.footer.legal}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href={`/${lang}/legal/privacy`} className="hover:text-legal-gold transition-colors">
                  {dict.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/legal/cookies`} className="hover:text-legal-gold transition-colors">
                  {dict.footer.cookiePolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/legal/terms`} className="hover:text-legal-gold transition-colors">
                  {dict.footer.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/legal/disclaimer`} className="hover:text-legal-gold transition-colors">
                  {dict.footer.disclaimer}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Scope Strip */}
        <div className="border-t border-gray-700 pt-6 mt-8">
          <p className="text-sm text-gray-300 mb-4">
            {lang === 'en'
              ? 'EchoLegal does not provide individual representation. Content is for general informational purposes.'
              : 'EchoLegal bireysel temsil sunmaz. İçerikler genel bilgilendirme amaçlıdır.'}
          </p>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-gray-700 pt-6 mt-4">
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            {dict.disclaimer.global}
          </p>
          <p className="text-sm text-gray-400">
            {dict.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
