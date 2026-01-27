import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Why Do Turkish LLC Owners Receive IRS Letters? | EchoLegal'
    : 'ABD\'de LLC Kuran Türkler Neden IRS Mektubu Alır? | EchoLegal'

  const description = isEnglish
    ? 'Common reasons Turkish LLC owners receive letters from the IRS. What different notices mean, how to respond, and how to prevent compliance issues.'
    : 'Türk LLC sahiplerinin IRS\'den mektup almasının yaygın nedenleri. Farklı bildirimlerin anlamı, nasıl yanıt verilir ve uyum sorunları nasıl önlenir.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-llc-irs-mektubu-neden-gelir`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-llc-irs-mektubu-neden-gelir',
        'tr': 'https://echo-legal.com/tr/abd-llc-irs-mektubu-neden-gelir',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function IRSLetterPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish ? 'Why Do Turkish LLC Owners Receive IRS Letters?' : 'ABD\'de LLC Kuran Türkler Neden IRS Mektubu Alır?',
    author: { '@type': 'Person', name: 'Zeynep Ruziye Moore', jobTitle: 'Licensed in New York' },
    datePublished: '2026-01-15',
    dateModified: '2026-01-27',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'IRS Letters Explained' : 'IRS Mektupları Açıklaması'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'Why Do Turkish LLC Owners Receive IRS Letters?'
              : 'ABD\'de LLC Kuran Türkler Neden IRS Mektubu Alır?'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'Understanding the most common IRS notices, what they mean, and how to respond—before panic sets in.'
              : 'En yaygın IRS bildirimlerini, ne anlama geldiklerini ve panik başlamadan nasıl yanıt verileceğini anlayın.'}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">ZM</div>
              <div>
                <p className="font-medium text-black">Zeynep Ruziye Moore</p>
                <p>{isEnglish ? 'Licensed in New York' : 'New York Lisanslı'}</p>
              </div>
            </div>
            <span>•</span>
            <span>{isEnglish ? 'Updated: January 2026' : 'Güncelleme: Ocak 2026'}</span>
          </div>

          {/* Don't Panic Box */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-10">
            <h2 className="font-bold text-lg mb-3 text-blue-900">{isEnglish ? '🧘 Don\'t Panic' : '🧘 Panik Yapmayın'}</h2>
            <p className="text-blue-800">
              {isEnglish
                ? 'Most IRS letters are routine—confirmation of your EIN, requests for missing forms, or reminders about filing deadlines. Very few are about audits or penalties. Read the letter carefully before assuming the worst.'
                : 'Çoğu IRS mektubu rutindir—EIN onayı, eksik form talepleri veya dosyalama son tarihleri hakkında hatırlatmalar. Çok azı denetimler veya cezalar hakkındadır. En kötüsünü varsaymadan önce mektubu dikkatlice okuyun.'}
            </p>
          </div>

          {/* Common Letter Types */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Most Common IRS Letters for LLC Owners' : 'LLC Sahipleri İçin En Yaygın IRS Mektupları'}</h2>

            <div className="space-y-6">
              <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📬</span>
                  <div>
                    <h3 className="font-semibold text-lg text-green-900">CP 575 / EIN Confirmation</h3>
                    <p className="text-green-800 mb-2">{isEnglish ? 'Good news! This confirms your EIN assignment.' : 'İyi haber! Bu EIN atamanızı onaylıyor.'}</p>
                    <p className="text-green-700 text-sm">
                      {isEnglish
                        ? 'Action: Keep this letter. You\'ll need it to open bank accounts and file taxes. This is NOT a problem.'
                        : 'Eylem: Bu mektubu saklayın. Banka hesabı açmak ve vergi dosyalamak için gerekecek. Bu bir sorun DEĞİLDİR.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-yellow-200 rounded-lg p-6 bg-yellow-50">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h3 className="font-semibold text-lg text-yellow-900">CP 259 / First Notice of Missing Return</h3>
                    <p className="text-yellow-800 mb-2">{isEnglish ? 'The IRS believes you should have filed a return but didn\'t.' : 'IRS beyanname vermeniz gerektiğine inanıyor ama vermediniz.'}</p>
                    <p className="text-yellow-700 text-sm">
                      {isEnglish
                        ? 'Action: If you filed, send proof. If you didn\'t need to file (foreign-owned LLC with no US income), respond explaining why. If you forgot, file immediately.'
                        : 'Eylem: Dosyaladıysanız, kanıt gönderin. Dosyalamanız gerekmiyorsa (ABD geliri olmayan yabancıya ait LLC), nedenini açıklayarak yanıt verin. Unuttuysan, hemen dosyala.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-yellow-200 rounded-lg p-6 bg-yellow-50">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📄</span>
                  <div>
                    <h3 className="font-semibold text-lg text-yellow-900">Letter 147C / EIN Verification</h3>
                    <p className="text-yellow-800 mb-2">{isEnglish ? 'Confirmation of your EIN if you requested verification.' : 'Doğrulama talep ettiyseniz EIN\'inizin onayı.'}</p>
                    <p className="text-yellow-700 text-sm">
                      {isEnglish
                        ? 'Action: This is usually requested by you or your bank. Keep it for your records.'
                        : 'Eylem: Bu genellikle sizin veya bankanız tarafından talep edilir. Kayıtlarınız için saklayın.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h3 className="font-semibold text-lg text-orange-900">Form 5471 / Form 5472 Notice</h3>
                    <p className="text-orange-800 mb-2">{isEnglish ? 'You may have missed important foreign ownership reporting.' : 'Önemli yabancı sahiplik raporlamasını kaçırmış olabilirsiniz.'}</p>
                    <p className="text-orange-700 text-sm">
                      {isEnglish
                        ? 'Action: Form 5472 is REQUIRED for foreign-owned single-member LLCs. Penalty for late filing is $25,000. Consult a tax professional immediately.'
                        : 'Eylem: Form 5472, yabancıya ait tek üyeli LLC\'ler için ZORUNLUDUR. Geç dosyalama cezası 25.000$. Hemen bir vergi uzmanına danışın.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🚨</span>
                  <div>
                    <h3 className="font-semibold text-lg text-red-900">CP 2000 / Underreported Income</h3>
                    <p className="text-red-800 mb-2">{isEnglish ? 'The IRS thinks you have unreported income.' : 'IRS bildirilmemiş geliriniz olduğunu düşünüyor.'}</p>
                    <p className="text-red-700 text-sm">
                      {isEnglish
                        ? 'Action: Review carefully. If correct, pay the amount due. If incorrect, respond with documentation within 30 days.'
                        : 'Eylem: Dikkatlice inceleyin. Doğruysa, ödenmesi gereken tutarı ödeyin. Yanlışsa, 30 gün içinde belgelerle yanıt verin.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Foreign Owners Get More Letters */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Why Foreign LLC Owners Get More Letters' : 'Yabancı LLC Sahipleri Neden Daha Fazla Mektup Alır?'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { reason: 'Form 5472 Requirement', detail: 'Foreign-owned LLCs must file Form 5472 annually, even with zero income. Many owners don\'t know this.' },
                { reason: 'Pro Forma 1120 Requirement', detail: 'Along with Form 5472, you need to file a "pro forma" Form 1120 (just the first page).' },
                { reason: 'No ITIN/SSN', detail: 'Without a US tax ID, some IRS systems flag the account for manual review.' },
                { reason: 'Address Issues', detail: 'If your registered agent changes or mail isn\'t forwarded, you may miss deadlines.' },
                { reason: 'Bank Reporting', detail: 'US banks report account information. Discrepancies trigger notices.' },
              ] : [
                { reason: 'Form 5472 Gereksinimi', detail: 'Yabancıya ait LLC\'ler, sıfır gelirle bile yıllık Form 5472 dosyalamalıdır. Birçok sahip bunu bilmiyor.' },
                { reason: 'Pro Forma 1120 Gereksinimi', detail: 'Form 5472 ile birlikte, "pro forma" Form 1120 (sadece ilk sayfa) dosyalamanız gerekiyor.' },
                { reason: 'ITIN/SSN Yok', detail: 'ABD vergi kimliği olmadan, bazı IRS sistemleri hesabı manuel inceleme için işaretler.' },
                { reason: 'Adres Sorunları', detail: 'Kayıtlı temsilciniz değişirse veya posta yönlendirilmezse, son tarihleri kaçırabilirsiniz.' },
                { reason: 'Banka Raporlaması', detail: 'ABD bankaları hesap bilgilerini raporlar. Tutarsızlıklar bildirimleri tetikler.' },
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <span className="text-[#C9A227] font-bold">{i + 1}.</span>
                  <div>
                    <p className="font-semibold">{item.reason}</p>
                    <p className="text-gray-600 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to Respond */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'How to Respond to IRS Letters' : 'IRS Mektuplarına Nasıl Yanıt Verilir'}</h2>

            <div className="bg-gray-50 rounded-lg p-6">
              <ol className="space-y-4">
                {(isEnglish ? [
                  'Read the entire letter carefully. Note the notice number (top right) and response deadline.',
                  'Don\'t ignore it. Even if you think it\'s wrong, you must respond by the deadline.',
                  'Gather documentation. Bank statements, filed returns, contracts—whatever supports your case.',
                  'Respond in writing. Use certified mail with return receipt. Keep copies of everything.',
                  'If you need more time, call the number on the letter to request an extension.',
                  'Consider professional help for complex issues, especially Form 5472 penalties.',
                ] : [
                  'Tüm mektubu dikkatlice okuyun. Bildirim numarasını (sağ üst) ve yanıt son tarihini not edin.',
                  'Görmezden gelmeyin. Yanlış olduğunu düşünseniz bile, son tarihe kadar yanıt vermelisiniz.',
                  'Belgeleri toplayın. Banka hesap özetleri, dosyalanmış beyannameler, sözleşmeler—davanızı destekleyen her şey.',
                  'Yazılı olarak yanıt verin. Alındı teyitli taahhütlü posta kullanın. Her şeyin kopyasını saklayın.',
                  'Daha fazla zamana ihtiyacınız varsa, uzatma talep etmek için mektuptaki numarayı arayın.',
                  'Karmaşık konular için, özellikle Form 5472 cezaları için profesyonel yardım düşünün.',
                ]).map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="bg-[#C9A227] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Prevention */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'How to Prevent IRS Issues' : 'IRS Sorunlarını Nasıl Önlersiniz'}</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {(isEnglish ? [
                { title: 'File Form 5472 Annually', desc: 'Due April 15 (or with extension). $25,000 penalty for late/missing filing.' },
                { title: 'Keep Good Records', desc: 'Document all transactions between you and your LLC.' },
                { title: 'Use a Reliable Registered Agent', desc: 'Ensure IRS mail reaches you. Check mail regularly.' },
                { title: 'Have an Operating Agreement', desc: 'Demonstrates your LLC is properly structured.' },
                { title: 'Consult a Tax Professional', desc: 'US-Turkey tax rules are complex. Don\'t guess.' },
                { title: 'Stay Current on Deadlines', desc: 'Mark all filing deadlines on your calendar.' },
              ] : [
                { title: 'Yıllık Form 5472 Dosyalayın', desc: 'Son tarih 15 Nisan (veya uzatmayla). Geç/eksik dosyalama için 25.000$ ceza.' },
                { title: 'İyi Kayıtlar Tutun', desc: 'Siz ve LLC\'niz arasındaki tüm işlemleri belgeleyin.' },
                { title: 'Güvenilir Kayıtlı Temsilci Kullanın', desc: 'IRS postasının size ulaştığından emin olun. Postayı düzenli kontrol edin.' },
                { title: 'İşletme Sözleşmeniz Olsun', desc: 'LLC\'nizin düzgün yapılandırıldığını gösterir.' },
                { title: 'Vergi Uzmanına Danışın', desc: 'ABD-Türkiye vergi kuralları karmaşıktır. Tahmin etmeyin.' },
                { title: 'Son Tarihleri Takip Edin', desc: 'Tüm dosyalama son tarihlerini takviminize işaretleyin.' },
              ]).map((item, i) => (
                <div key={i} className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="font-semibold text-green-900">{item.title}</p>
                  <p className="text-green-700 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/checklists/irs-mektup-rehberi`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'IRS Letter Response Guide (Checklist) →' : 'IRS Mektup Yanıt Rehberi (Kontrol Listesi) →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/operating-agreement-zorunlu-mu`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Is an Operating Agreement Required? →' : 'Operating Agreement Zorunlu mu? →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'IRS Tax Facts for Turks →' : 'Türkler İçin IRS Vergi Gerçekleri →'}
                </Link>
              </li>
            </ul>
          </section>

        </article>
      </main>
    </>
  )
}
