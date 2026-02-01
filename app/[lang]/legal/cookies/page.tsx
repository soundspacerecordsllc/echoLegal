import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-legal-navy mb-4">
            {dict.footer.cookiePolicy}
          </h1>
          <p className="text-legal-gray mb-8">
            {isEnglish ? 'Last updated: January 2026' : 'Son güncelleme: Ocak 2026'}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'What Are Cookies' : 'Çerezler Nedir'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.'
                  : 'Çerezler, bir web sitesini ziyaret ettiğinizde cihazınıza yerleştirilen küçük metin dosyalarıdır. Web sitelerinin daha verimli çalışmasını sağlamak ve web sitesi sahiplerine bilgi sunmak için yaygın olarak kullanılırlar.'
                }
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'How We Use Cookies' : 'Çerezleri Nasıl Kullanıyoruz'}
              </h2>
              <p className="text-legal-gray mb-4">
                {isEnglish
                  ? 'EchoLegal uses cookies for the following purposes:'
                  : 'EchoLegal, çerezleri aşağıdaki amaçlarla kullanır:'
                }
              </p>
              <ul className="list-disc pl-6 text-legal-gray space-y-2">
                <li>
                  <strong>{isEnglish ? 'Language Preferences:' : 'Dil Tercihleri:'}</strong>{' '}
                  {isEnglish
                    ? 'We remember your language preference (English or Turkish) so you don\'t have to select it each time you visit.'
                    : 'Dil tercihinizi (İngilizce veya Türkçe) hatırlıyoruz, böylece her ziyaretinizde seçmeniz gerekmez.'
                  }
                </li>
                <li>
                  <strong>{isEnglish ? 'Analytics:' : 'Analitik:'}</strong>{' '}
                  {isEnglish
                    ? 'We use analytics cookies to understand how visitors interact with our website, helping us improve the user experience.'
                    : 'Ziyaretçilerin web sitemizle nasıl etkileşime girdiğini anlamak için analitik çerezleri kullanıyoruz, bu da kullanıcı deneyimini geliştirmemize yardımcı oluyor.'
                  }
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Types of Cookies We Use' : 'Kullandığımız Çerez Türleri'}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-legal-navy">
                    {isEnglish ? 'Essential Cookies' : 'Zorunlu Çerezler'}
                  </h3>
                  <p className="text-legal-gray">
                    {isEnglish
                      ? 'These cookies are necessary for the website to function properly. They enable basic functions like language selection and page navigation.'
                      : 'Bu çerezler, web sitesinin düzgün çalışması için gereklidir. Dil seçimi ve sayfa gezintisi gibi temel işlevleri etkinleştirirler.'
                    }
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-legal-navy">
                    {isEnglish ? 'Analytics Cookies' : 'Analitik Çerezler'}
                  </h3>
                  <p className="text-legal-gray">
                    {isEnglish
                      ? 'These cookies help us understand how visitors use our website by collecting anonymous statistical information.'
                      : 'Bu çerezler, anonim istatistiksel bilgiler toplayarak ziyaretçilerin web sitemizi nasıl kullandığını anlamamıza yardımcı olur.'
                    }
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Managing Cookies' : 'Çerezleri Yönetme'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies or delete existing cookies. Please note that disabling cookies may affect the functionality of our website, particularly language preferences.'
                  : 'Çerezleri tarayıcı ayarlarınız aracılığıyla kontrol edebilir ve yönetebilirsiniz. Çoğu tarayıcı, çerezleri reddetmenize veya mevcut çerezleri silmenize izin verir. Çerezleri devre dışı bırakmanın, özellikle dil tercihleri olmak üzere web sitemizin işlevselliğini etkileyebileceğini lütfen unutmayın.'
                }
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Third-Party Cookies' : 'Üçüncü Taraf Çerezleri'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'When you make a payment through our website, Stripe (our payment processor) may place cookies on your device. These cookies are governed by Stripe\'s privacy policy.'
                  : 'Web sitemiz üzerinden ödeme yaptığınızda, Stripe (ödeme işlemcimiz) cihazınıza çerez yerleştirebilir. Bu çerezler Stripe\'ın gizlilik politikası tarafından yönetilir.'
                }
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Contact Us' : 'Bize Ulaşın'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'If you have questions about our use of cookies, please contact us at support@echo-legal.com.'
                  : 'Çerez kullanımımız hakkında sorularınız varsa, lütfen support@echo-legal.com adresinden bize ulaşın.'
                }
              </p>
            </section>
          </div>
        </div>
    </div>
  )
}
