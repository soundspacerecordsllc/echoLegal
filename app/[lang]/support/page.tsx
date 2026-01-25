import { Locale } from '@/i18n-config'

export default async function SupportPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return (
    <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-legal-navy mb-4">
            {isEnglish ? 'Support EchoLegal' : 'EchoLegal\'i Destekle'}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="font-serif text-2xl font-bold text-legal-navy mt-8 mb-4">
              {isEnglish ? 'About This Model' : 'Bu Model Hakkında'}
            </h2>
            <p className="text-legal-gray mb-6">
              {isEnglish
                ? 'EchoLegal is a public legal knowledge resource. Supporting EchoLegal helps maintain and expand this resource. Legal knowledge should be accessible to everyone.'
                : 'EchoLegal, halka açık bir hukuki bilgi kaynağıdır. EchoLegal\'i desteklemek bu kaynağı sürdürmeye ve genişletmeye yardımcı olur. Hukuki bilgi herkesin erişimine açık olmalıdır.'
              }
            </p>

            <h3 className="font-serif text-xl font-semibold text-legal-navy mb-3">
              {isEnglish ? 'Why $20?' : 'Neden 20$?'}
            </h3>
            <p className="text-legal-gray mb-6">
              {isEnglish
                ? 'The recommended $20 contribution helps us maintain this resource, expand our template library, keep information updated, and continue providing free access to those who need it.'
                : 'Önerilen 20$ katkı, bu kaynağı sürdürmemize, şablon kütüphanemizi genişletmemize, bilgileri güncel tutmamıza ve ihtiyacı olanlara ücretsiz erişim sağlamaya devam etmemize yardımcı olur.'
              }
            </p>

            <h3 className="font-serif text-xl font-semibold text-legal-navy mb-3">
              {isEnglish ? 'Free Access' : 'Ücretsiz Erişim'}
            </h3>
            <p className="text-legal-gray mb-6">
              {isEnglish
                ? 'If you cannot afford to pay, every template is available for free download. No questions asked, no judgment. We trust you to determine what works for your situation.'
                : 'Ödeyemiyorsanız, her şablon ücretsiz indirilebilir. Soru sorulmaz, yargılanmaz. Durumunuz için neyin işe yaradığını belirlemenize güveniyoruz.'
              }
            </p>

            <h3 className="font-serif text-xl font-semibold text-legal-navy mb-3">
              {isEnglish ? 'Contact Us' : 'Bize Ulaşın'}
            </h3>
            <p className="text-legal-gray mb-6">
              {isEnglish
                ? 'Have questions or feedback? Email us at support@echo-legal.com'
                : 'Sorularınız veya geri bildiriminiz mi var? Bize support@echo-legal.com adresinden e-posta gönderin.'
              }
            </p>
          </div>
        </div>
    </div>
  )
}
