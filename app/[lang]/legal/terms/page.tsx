import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'

export default async function TermsPage({
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
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-legal-navy mb-4">
            {dict.footer.terms}
          </h1>
          <p className="text-legal-gray mb-8">
            {isEnglish ? 'Last updated: January 2026' : 'Son güncelleme: Ocak 2026'}
          </p>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Acceptance of Terms' : 'Koşulların Kabulü'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'By accessing and using EchoLegal, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.'
                  : 'EchoLegal\'a erişerek ve kullanarak, bu Kullanım Koşullarına bağlı olmayı kabul etmiş olursunuz. Bu koşulları kabul etmiyorsanız, lütfen web sitemizi kullanmayın.'
                }
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Use of Content' : 'İçerik Kullanımı'}
              </h2>
              <p className="text-legal-gray mb-4">
                {isEnglish
                  ? 'All content on EchoLegal, including document templates and educational materials, is provided for informational and educational purposes only. You may:'
                  : 'EchoLegal\'daki belge şablonları ve eğitim materyalleri dahil tüm içerik, yalnızca bilgilendirme ve eğitim amaçlı sunulmaktadır. Şunları yapabilirsiniz:'
                }
              </p>
              <ul className="list-disc pl-6 text-legal-gray space-y-2">
                <li>{isEnglish ? 'Download and use templates for personal or business purposes' : 'Şablonları kişisel veya ticari amaçlarla indirmek ve kullanmak'}</li>
                <li>{isEnglish ? 'Modify templates to suit your needs' : 'Şablonları ihtiyaçlarınıza göre değiştirmek'}</li>
                <li>{isEnglish ? 'Share links to our website' : 'Web sitemize bağlantıları paylaşmak'}</li>
              </ul>
              <p className="text-legal-gray mt-4">
                {isEnglish
                  ? 'You may not redistribute, sell, or commercially exploit our templates without written permission.'
                  : 'Yazılı izin olmadan şablonlarımızı yeniden dağıtamazsınız, satamazsınız veya ticari olarak kullanamazsınız.'
                }
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'No Legal Advice' : 'Hukuki Tavsiye Değildir'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'EchoLegal does not provide legal advice. Our templates and educational content are not substitutes for professional legal counsel. Always consult with a qualified attorney before using any legal document in a binding situation.'
                  : 'EchoLegal hukuki tavsiye sağlamaz. Şablonlarımız ve eğitim içeriklerimiz profesyonel hukuki danışmanlığın yerine geçmez. Herhangi bir hukuki belgeyi bağlayıcı bir durumda kullanmadan önce mutlaka nitelikli bir avukata danışın.'
                }
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Support Model' : 'Destek Modeli'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'EchoLegal is a public legal knowledge resource. Supporting EchoLegal ($20 recommended) helps maintain and expand these resources. All support payments are non-refundable, and free downloads are available to everyone without restriction.'
                  : 'EchoLegal, halka açık bir hukuki bilgi kaynağıdır. EchoLegal\'i desteklemek (20$ önerilir) bu kaynakları sürdürmeye ve genişletmeye yardımcı olur. Tüm destek ödemeleri iade edilemez ve ücretsiz indirmeler herkes için kısıtlama olmaksızın mevcuttur.'
                }
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Limitation of Liability' : 'Sorumluluk Sınırlaması'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'EchoLegal and its contributors shall not be liable for any damages arising from the use of our website or templates. We provide all content "as is" without warranties of any kind.'
                  : 'EchoLegal ve katkıda bulunanlar, web sitemizin veya şablonlarımızın kullanımından kaynaklanan herhangi bir zarardan sorumlu olmayacaktır. Tüm içeriği herhangi bir garanti olmaksızın "olduğu gibi" sağlıyoruz.'
                }
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Changes to Terms' : 'Koşullardaki Değişiklikler'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.'
                  : 'Bu koşulları istediğimiz zaman değiştirme hakkını saklı tutuyoruz. Değişikliklerden sonra web sitesini kullanmaya devam etmek, yeni koşulları kabul ettiğiniz anlamına gelir.'
                }
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-legal-navy mb-4">
                {isEnglish ? 'Contact' : 'İletişim'}
              </h2>
              <p className="text-legal-gray">
                {isEnglish
                  ? 'For questions about these Terms of Use, please contact us at support@echo-legal.com.'
                  : 'Bu Kullanım Koşulları hakkında sorularınız için lütfen support@echo-legal.com adresinden bize ulaşın.'
                }
              </p>
            </section>
          </div>
        </div>
    </div>
  )
}
