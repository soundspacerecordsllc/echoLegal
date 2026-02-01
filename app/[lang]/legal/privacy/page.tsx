import { Locale } from '@/i18n-config'

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return (
    <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-legal-navy mb-4">
            {isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası'}
          </h1>
          <p className="text-legal-gray mb-8">
            {isEnglish ? 'Last updated: January 2026' : 'Son güncelleme: Ocak 2026'}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Information We Collect' : 'Topladığımız Bilgiler'}
              </h2>
              <p className="text-legal-gray mb-4">
                {isEnglish
                  ? 'EchoLegal collects minimal information necessary to provide our services. When you visit our website, we may collect:'
                  : 'EchoLegal, hizmetlerini sunabilmek için yalnızca gerekli olan asgari bilgiyi toplar. Sitemizi ziyaret ettiğinizde aşağıdaki veriler toplanabilir:'
                }
              </p>
              <ul className="list-disc pl-6 text-legal-gray space-y-2">
                <li>{isEnglish ? 'Browser type and language preferences' : 'Tarayıcı türü ve dil tercihleri'}</li>
                <li>{isEnglish ? 'Pages visited and time spent on site' : 'Ziyaret edilen sayfalar ve sitede geçirilen süre'}</li>
                <li>{isEnglish ? 'Referring website addresses' : 'Yönlendiren web sitesi adresleri'}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'How We Use Your Information' : 'Bilgilerinizi Nasıl Kullanıyoruz'}
              </h2>
              <p className="text-legal-gray mb-4">
                {isEnglish
                  ? 'We use collected information to:'
                  : 'Toplanan veriler aşağıdaki amaçlarla kullanılmaktadır:'
                }
              </p>
              <ul className="list-disc pl-6 text-legal-gray space-y-2">
                <li>{isEnglish ? 'Improve our website and user experience' : 'Web sitemizi ve kullanıcı deneyimini geliştirmek'}</li>
                <li>{isEnglish ? 'Analyze usage patterns and trends' : 'Kullanım kalıplarını ve eğilimleri analiz etmek'}</li>
                <li>{isEnglish ? 'Ensure website security and prevent fraud' : 'Web sitesi güvenliğini sağlamak ve dolandırıcılığı önlemek'}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Payment Processing' : 'Ödeme İşleme'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'When you make a payment, transactions are processed securely through Stripe. We do not store your credit card information. Please review Stripe\'s privacy policy for information about how they handle your payment data.'
                  : 'Ödeme işlemleri Stripe altyapısı üzerinden güvenli biçimde gerçekleştirilir. Kredi kartı bilgileriniz tarafımızca saklanmaz. Stripe\'ın ödeme verilerini nasıl işlediğine dair ayrıntılar için Stripe gizlilik politikasına başvurabilirsiniz.'
                }
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Your Rights' : 'Haklarınız'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'You have the right to access, correct, or delete your personal information. To exercise these rights or for any privacy-related questions, please contact us at support@echo-legal.com.'
                  : 'Kişisel verilerinize erişim, düzeltme veya silme talep etme hakkınız saklıdır. Bu haklarınızı kullanmak ya da kişisel verilerin korunmasına ilişkin soru sormak için support@echo-legal.com adresine başvurabilirsiniz.'
                }
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Contact Us' : 'Bize Ulaşın'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'If you have questions about this Privacy Policy, please contact us at support@echo-legal.com.'
                  : 'Bu Gizlilik Politikası hakkındaki sorularınız için support@echo-legal.com adresinden bizimle iletişime geçebilirsiniz.'
                }
              </p>
            </section>
          </div>
        </div>
    </div>
  )
}
