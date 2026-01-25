import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function DisclaimerPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-legal-navy mb-4">
            {dict.footer.disclaimer}
          </h1>
          <p className="text-legal-gray mb-8">
            {isEnglish ? 'Last updated: January 2026' : 'Son güncelleme: Ocak 2026'}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8">
              <p className="text-legal-navy font-medium">
                {dict.disclaimer.global}
              </p>
            </div>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'No Legal Advice' : 'Hukuki Tavsiye Değildir'}
              </h2>
              <p className="text-legal-gray">
                {dict.disclaimer.noAdvice}
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'No Attorney-Client Relationship' : 'Avukat-Müvekkil İlişkisi Yoktur'}
              </h2>
              <p className="text-legal-gray">
                {dict.disclaimer.noRelationship}
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Jurisdiction Warning' : 'Yargı Yetkisi Uyarısı'}
              </h2>
              <p className="text-legal-gray">
                {dict.disclaimer.jurisdictionWarning}
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Disclaimer of Warranties' : 'Garanti Reddi'}
              </h2>
              <p className="text-legal-gray">
                {dict.disclaimer.warranty}
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Limitation of Liability' : 'Sorumluluk Sınırlaması'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'In no event shall EchoLegal, its owners, contributors, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of this website or the templates provided herein.'
                  : 'EchoLegal, sahipleri, katkıda bulunanlar veya bağlı kuruluşlar, bu web sitesinin veya burada sağlanan şablonların kullanımınızdan kaynaklanan veya bunlarla ilgili herhangi bir doğrudan, dolaylı, arızi, özel, sonuç olarak ortaya çıkan veya cezai zarardan hiçbir durumda sorumlu olmayacaktır.'
                }
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Accuracy of Information' : 'Bilgi Doğruluğu'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'While we strive to provide accurate and up-to-date information, laws and regulations change frequently. We make no representations or warranties about the accuracy, completeness, or timeliness of the information on this website. Always verify current legal requirements with a qualified attorney.'
                  : 'Doğru ve güncel bilgi sağlamaya çalışsak da, yasalar ve yönetmelikler sık sık değişir. Bu web sitesindeki bilgilerin doğruluğu, eksiksizliği veya güncelliği hakkında herhangi bir beyan veya garanti vermiyoruz. Güncel yasal gereklilikleri her zaman nitelikli bir avukatla doğrulayın.'
                }
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Use at Your Own Risk' : 'Riski Size Ait Olmak Üzere Kullanın'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'By using EchoLegal and downloading our templates, you acknowledge that you do so at your own risk. You are solely responsible for ensuring that any document you use is appropriate for your specific situation and jurisdiction.'
                  : 'EchoLegal\'ı kullanarak ve şablonlarımızı indirerek, bunu kendi riskinize yaptığınızı kabul etmiş olursunuz. Kullandığınız herhangi bir belgenin özel durumunuz ve yargı yetkiniz için uygun olmasını sağlamak tamamen sizin sorumluluğunuzdadır.'
                }
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Contact' : 'İletişim'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'If you have questions about this disclaimer, please contact us at support@echo-legal.com.'
                  : 'Bu sorumluluk reddi hakkında sorularınız varsa, lütfen support@echo-legal.com adresinden bize ulaşın.'
                }
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer lang={lang} dict={dict} />
    </>
  )
}
