import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Do You Need to Visit the US to Start a Company? Remote Formation Guide | EchoLegal'
    : 'ABD\'de Şirket Kurmak İçin ABD\'ye Gelmek Gerekir mi? | EchoLegal'

  const description = isEnglish
    ? 'Learn if you can form a US company remotely from abroad. What you can do online vs what requires physical presence.'
    : 'Yurt dışından uzaktan ABD şirketi kurup kuramayacağınızı öğrenin. Neyi çevrimiçi yapabilirsiniz, ne fiziksel varlık gerektirir.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-sirket-kurmak-icin-gelmek-gerekir-mi`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-sirket-kurmak-icin-gelmek-gerekir-mi',
        'tr': 'https://echo-legal.com/tr/abd-sirket-kurmak-icin-gelmek-gerekir-mi',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function RemoteCompanyFormationPage({
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
    headline: isEnglish ? 'Do You Need to Visit the US to Start a Company?' : 'ABD\'de Şirket Kurmak İçin ABD\'ye Gelmek Gerekir mi?',
    author: { '@type': 'Person', name: 'Zeynep Ruziye Moore', jobTitle: 'Licensed in New York' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'Remote Company Formation' : 'Uzaktan Şirket Kurma'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'Do You Need to Visit the US to Start a Company?'
              : 'ABD\'de Şirket Kurmak İçin ABD\'ye Gelmek Gerekir mi?'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'The complete guide to remote US company formation for non-residents and foreigners.'
              : 'Yabancılar ve yerleşik olmayanlar için uzaktan ABD şirketi kurma rehberi.'}
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

          {/* Quick Answer */}
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-10">
            <h2 className="font-bold text-lg mb-3 text-green-900">{isEnglish ? 'Quick Answer: No Physical Presence Required' : 'Kısa Cevap: Fiziksel Varlık Gerekmiyor'}</h2>
            <p className="text-green-800">
              {isEnglish
                ? 'You can form an LLC or Corporation in most US states 100% remotely. Company formation, EIN application, and basic banking can all be done without setting foot in the US. However, some activities like opening accounts at certain banks or obtaining specific licenses may require in-person visits.'
                : 'Çoğu ABD eyaletinde %100 uzaktan LLC veya Corporation kurabilirsiniz. Şirket kurma, EIN başvurusu ve temel bankacılık ABD\'ye ayak basmadan yapılabilir. Ancak belirli bankalarda hesap açma veya belirli lisanslar alma gibi bazı faaliyetler yüz yüze ziyaret gerektirebilir.'}
            </p>
          </div>

          {/* What You CAN Do Remotely */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What You CAN Do 100% Remotely' : '%100 Uzaktan Yapabilecekleriniz'}</h2>

            <div className="space-y-4">
              {[
                { task: isEnglish ? 'Form an LLC or Corporation' : 'LLC veya Corporation Kurma', detail: isEnglish ? 'File Articles of Organization online with any state' : 'Herhangi bir eyaletle çevrimiçi Kuruluş Belgeleri dosyalama' },
                { task: isEnglish ? 'Get EIN (Tax ID)' : 'EIN (Vergi Numarası) Alma', detail: isEnglish ? 'Apply via fax using Form SS-4 (no SSN needed for foreigners)' : 'SS-4 Formu kullanarak faks ile başvurun (yabancılar için SSN gerekli değil)' },
                { task: isEnglish ? 'Open Business Bank Account' : 'Ticari Banka Hesabı Açma', detail: isEnglish ? 'Mercury, Relay, Wise Business accept remote applications' : 'Mercury, Relay, Wise Business uzaktan başvuruları kabul eder' },
                { task: isEnglish ? 'Get Registered Agent' : 'Kayıtlı Temsilci Edinme', detail: isEnglish ? 'Required for all states, hired online' : 'Tüm eyaletler için gerekli, çevrimiçi kiralanır' },
                { task: isEnglish ? 'Create Operating Agreement' : 'Operating Agreement Oluşturma', detail: isEnglish ? 'Digital documents are valid' : 'Dijital belgeler geçerlidir' },
                { task: isEnglish ? 'Accept Payments (Stripe, PayPal)' : 'Ödeme Kabul Etme (Stripe, PayPal)', detail: isEnglish ? 'With EIN and bank account' : 'EIN ve banka hesabı ile' },
                { task: isEnglish ? 'File Annual Reports' : 'Yıllık Raporları Dosyalama', detail: isEnglish ? 'All states accept online filings' : 'Tüm eyaletler çevrimiçi dosyalamayı kabul eder' },
                { task: isEnglish ? 'Pay Franchise Taxes' : 'Franchise Vergileri Ödeme', detail: isEnglish ? 'Online payment accepted' : 'Çevrimiçi ödeme kabul edilir' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-green-600 text-2xl">✓</span>
                  <div>
                    <p className="font-semibold text-green-900">{item.task}</p>
                    <p className="text-green-800 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* What MAY Require a Visit */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What MAY Require a US Visit' : 'ABD Ziyareti GEREKTİREBİLECEK Durumlar'}</h2>

            <div className="space-y-4">
              {[
                { task: isEnglish ? 'Traditional Bank Accounts' : 'Geleneksel Banka Hesapları', detail: isEnglish ? 'Chase, Bank of America, Wells Fargo often require in-person verification' : 'Chase, Bank of America, Wells Fargo genellikle yüz yüze doğrulama gerektirir' },
                { task: isEnglish ? 'Business Licenses' : 'İşletme Ruhsatları', detail: isEnglish ? 'Some cities/counties require in-person applications for certain industries' : 'Bazı şehirler/ilçeler belirli sektörler için yüz yüze başvuru gerektirir' },
                { task: isEnglish ? 'Notarization' : 'Noterlik', detail: isEnglish ? 'Some documents may need US notarization (though apostille from home country often works)' : 'Bazı belgeler ABD noterliği gerektirebilir (ancak kendi ülkenizdeki apostil genellikle işe yarar)' },
                { task: isEnglish ? 'E-2 Visa Application' : 'E-2 Vize Başvurusu', detail: isEnglish ? 'Consular interview required, plus often need to show US business presence' : 'Konsolosluk görüşmesi gerekli, ayrıca genellikle ABD iş varlığını göstermeniz gerekir' },
                { task: isEnglish ? 'Real Estate Purchase' : 'Gayrimenkul Satın Alma', detail: isEnglish ? 'While possible remotely, often easier with in-person closing' : 'Uzaktan mümkün olsa da, yüz yüze kapanış genellikle daha kolay' },
                { task: isEnglish ? 'State-Specific Licenses' : 'Eyalete Özel Ruhsatlar', detail: isEnglish ? 'Professional licenses (medical, legal, financial) have varying requirements' : 'Profesyonel lisansların (tıbbi, hukuki, finansal) farklı gereksinimleri var' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <span className="text-yellow-600 text-2xl">⚠</span>
                  <div>
                    <p className="font-semibold text-yellow-900">{item.task}</p>
                    <p className="text-yellow-800 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Step by Step Remote Process */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Step-by-Step Remote Formation Process' : 'Adım Adım Uzaktan Kurulum Süreci'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { step: 1, title: 'Choose Your State', description: 'Delaware, Wyoming, and New Mexico are popular for non-residents due to privacy, low fees, and no state income tax on out-of-state income.' },
                { step: 2, title: 'Hire a Registered Agent', description: 'Required by law. The registered agent receives legal documents on your behalf. Costs $50-300/year.' },
                { step: 3, title: 'File Formation Documents', description: 'Articles of Organization (LLC) or Articles of Incorporation (Corp). Most states process in 1-5 business days.' },
                { step: 4, title: 'Create Operating Agreement', description: 'Internal document defining ownership and management. Not filed with state but legally important.' },
                { step: 5, title: 'Apply for EIN', description: 'Submit Form SS-4 via fax to IRS. Processing takes 4-6 weeks for international applicants.' },
                { step: 6, title: 'Open Bank Account', description: 'Mercury, Relay, or Wise Business for remote-friendly banking. Some require video verification.' },
                { step: 7, title: 'Set Up Payment Processing', description: 'Stripe, PayPal Business, or similar. Requires EIN and bank account.' },
              ] : [
                { step: 1, title: 'Eyalet Seçin', description: 'Delaware, Wyoming ve New Mexico, gizlilik, düşük ücretler ve eyalet dışı gelir üzerinde eyalet gelir vergisi olmaması nedeniyle yerleşik olmayanlar için popülerdir.' },
                { step: 2, title: 'Kayıtlı Temsilci Kiralayın', description: 'Yasalar gereği zorunludur. Kayıtlı temsilci sizin adınıza yasal belgeleri alır. Yıllık 50-300$ maliyeti var.' },
                { step: 3, title: 'Kuruluş Belgelerini Dosyalayın', description: 'Kuruluş Maddeleri (LLC) veya Şirket Kuruluş Maddeleri (Corp). Çoğu eyalet 1-5 iş günü içinde işler.' },
                { step: 4, title: 'Operating Agreement Oluşturun', description: 'Sahiplik ve yönetimi tanımlayan dahili belge. Eyalet ile dosyalanmaz ama yasal olarak önemlidir.' },
                { step: 5, title: 'EIN Başvurusu Yapın', description: 'SS-4 Formunu IRS\'ye faks ile gönderin. Uluslararası başvuru sahipleri için işlem 4-6 hafta sürer.' },
                { step: 6, title: 'Banka Hesabı Açın', description: 'Uzaktan dostu bankacılık için Mercury, Relay veya Wise Business. Bazıları video doğrulaması gerektirir.' },
                { step: 7, title: 'Ödeme İşlemeyi Kurun', description: 'Stripe, PayPal Business veya benzeri. EIN ve banka hesabı gerektirir.' },
              ]).map((item) => (
                <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Best States for Remote Formation */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Best States for Remote Formation' : 'Uzaktan Kurulum İçin En İyi Eyaletler'}</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'State' : 'Eyalet'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Formation Fee' : 'Kuruluş Ücreti'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Annual Fee' : 'Yıllık Ücret'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Best For' : 'En İyi Kullanım'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { state: 'Wyoming', formation: '$100', annual: '$60', best: isEnglish ? 'Privacy, low fees' : 'Gizlilik, düşük ücretler' },
                    { state: 'Delaware', formation: '$90', annual: '$300', best: isEnglish ? 'Investors, fundraising' : 'Yatırımcılar, fon toplama' },
                    { state: 'New Mexico', formation: '$50', annual: '$0', best: isEnglish ? 'Lowest cost, privacy' : 'En düşük maliyet, gizlilik' },
                    { state: 'Nevada', formation: '$425', annual: '$350', best: isEnglish ? 'Asset protection' : 'Varlık koruması' },
                    { state: 'Texas', formation: '$300', annual: '$0', best: isEnglish ? 'No franchise tax under $2.47M' : '$2.47M altında franchise vergisi yok' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-200 p-3 font-medium">{row.state}</td>
                      <td className="border border-gray-200 p-3">{row.formation}</td>
                      <td className="border border-gray-200 p-3">{row.annual}</td>
                      <td className="border border-gray-200 p-3 text-gray-600">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Misconceptions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Common Misconceptions' : 'Yaygın Yanlış Anlamalar'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { myth: 'You need a US address to form a company', truth: 'Your registered agent provides the legal address. You can live anywhere.' },
                { myth: 'You need a Social Security Number (SSN)', truth: 'Foreigners can get EIN without SSN using Form SS-4.' },
                { myth: 'You need a US bank account before forming', truth: 'Form the company first, then open bank account with EIN.' },
                { myth: 'Only US citizens can own US companies', truth: 'Anyone can own an LLC or Corporation regardless of citizenship.' },
                { myth: 'You need to pay US taxes on all income', truth: 'Foreign-owned US companies may only owe taxes on US-sourced income (consult a tax professional).' },
              ] : [
                { myth: 'Şirket kurmak için ABD adresi gerekir', truth: 'Kayıtlı temsilciniz yasal adresi sağlar. Herhangi bir yerde yaşayabilirsiniz.' },
                { myth: 'Sosyal Güvenlik Numarası (SSN) gerekir', truth: 'Yabancılar SS-4 Formu kullanarak SSN olmadan EIN alabilir.' },
                { myth: 'Kurmadan önce ABD banka hesabı gerekir', truth: 'Önce şirketi kurun, sonra EIN ile banka hesabı açın.' },
                { myth: 'Sadece ABD vatandaşları ABD şirketi sahibi olabilir', truth: 'Vatandaşlık durumundan bağımsız olarak herkes LLC veya Corporation sahibi olabilir.' },
                { myth: 'Tüm gelir için ABD vergileri ödemeniz gerekir', truth: 'Yabancılara ait ABD şirketleri sadece ABD kaynaklı gelir için vergi borçlu olabilir (bir vergi uzmanına danışın).' },
              ]).map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-5">
                  <p className="font-semibold text-red-600 mb-2">
                    <span className="mr-2">✗</span>
                    {isEnglish ? 'Myth:' : 'Mit:'} {item.myth}
                  </p>
                  <p className="text-green-700">
                    <span className="mr-2">✓</span>
                    {isEnglish ? 'Truth:' : 'Gerçek:'} {item.truth}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Required Documents */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Documents You\'ll Need' : 'İhtiyacınız Olacak Belgeler'}</h2>

            <div className="bg-gray-50 rounded-lg p-5">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227]">●</span>
                  <div>
                    <strong>{isEnglish ? 'Passport Copy' : 'Pasaport Kopyası'}</strong>
                    <p className="text-sm text-gray-600">{isEnglish ? 'For identity verification when opening bank accounts' : 'Banka hesabı açarken kimlik doğrulaması için'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227]">●</span>
                  <div>
                    <strong>{isEnglish ? 'Proof of Address' : 'Adres Kanıtı'}</strong>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Utility bill or bank statement from your home country' : 'Kendi ülkenizdeki fatura veya banka ekstresi'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227]">●</span>
                  <div>
                    <strong>{isEnglish ? 'Company Name' : 'Şirket Adı'}</strong>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Must be unique in your chosen state' : 'Seçtiğiniz eyalette benzersiz olmalı'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#C9A227]">●</span>
                  <div>
                    <strong>{isEnglish ? 'Business Purpose' : 'İş Amacı'}</strong>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Brief description (can be general like "any lawful business")' : 'Kısa açıklama ("herhangi bir yasal iş" gibi genel olabilir)'}</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}</h2>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'Do I need a US phone number?' : 'ABD telefon numarasına ihtiyacım var mı?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'Helpful but not required. Services like Google Voice or Skype can provide US numbers. Many banks and platforms accept international numbers.'
                    : 'Faydalı ama gerekli değil. Google Voice veya Skype gibi hizmetler ABD numaraları sağlayabilir. Birçok banka ve platform uluslararası numaraları kabul eder.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'How long does remote formation take?' : 'Uzaktan kurulum ne kadar sürer?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'State filing: 1-5 days. EIN for foreigners: 4-6 weeks. Bank account: 1-2 weeks. Total: About 6-8 weeks to be fully operational.'
                    : 'Eyalet dosyalama: 1-5 gün. Yabancılar için EIN: 4-6 hafta. Banka hesabı: 1-2 hafta. Toplam: Tamamen operasyonel olmak için yaklaşık 6-8 hafta.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'Can I be the only member/shareholder?' : 'Tek üye/hissedar olabilir miyim?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'Yes, single-member LLCs and single-shareholder corporations are allowed in all states.'
                    : 'Evet, tek üyeli LLC\'ler ve tek hissedarlı şirketler tüm eyaletlerde izin veriliyor.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'What if I want to visit later for business?' : 'Daha sonra iş için ziyaret etmek istersem ne olur?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'B-1 visa allows short business visits. For longer stays or employment, you\'d need work authorization (E-2, L-1, etc.).'
                    : 'B-1 vizesi kısa iş ziyaretlerine izin verir. Daha uzun kalışlar veya istihdam için çalışma izni (E-2, L-1, vb.) gerekir.'}
                </p>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/abd-llc-kurmak-kac-gun-surer`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'How Long Does LLC Formation Take? →' : 'LLC Kurmak Ne Kadar Sürer? →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-ein-numarasi-nasil-alinir`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'How to Get an EIN Number →' : 'EIN Numarası Nasıl Alınır? →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-llc-banka-hesabi-acmak`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Opening a US Business Bank Account →' : 'ABD Ticari Banka Hesabı Açmak →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-sirket-kuran-turklerin-hatalari`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? '7 Legal Mistakes to Avoid →' : 'Kaçınılması Gereken 7 Hukuki Hata →'}
                </Link>
              </li>
            </ul>
          </section>

        </article>
      </main>
    </>
  )
}
