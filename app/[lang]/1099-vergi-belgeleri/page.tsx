// app/[lang]/1099-vergi-belgeleri/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? '1099 Forms & US Tax Documents Explained | EchoLegal'
    : '1099 Formları ve ABD Vergi Belgeleri Rehberi | EchoLegal'

  const description = isEnglish
    ? 'Complete guide to 1099 forms for Turkish entrepreneurs. 1099-NEC, 1099-MISC, 1099-K explained. When you receive them, what they mean, and what to do.'
    : 'Türk girişimciler için 1099 formlarına kapsamlı rehber. 1099-NEC, 1099-MISC, 1099-K açıklandı. Ne zaman alırsınız, ne anlama gelir ve ne yapmalısınız.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: isEnglish ? 'en_US' : 'tr_TR',
      siteName: 'EchoLegal',
    },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/1099-vergi-belgeleri`,
      languages: {
        'en': 'https://echo-legal.com/en/1099-vergi-belgeleri',
        'tr': 'https://echo-legal.com/tr/1099-vergi-belgeleri',
        'x-default': 'https://echo-legal.com/en/1099-vergi-belgeleri',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function TaxDocumentsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const tocItems = [
    { id: 'genel-bakis', label: isEnglish ? 'What Are 1099 Forms?' : '1099 Formları Nedir?' },
    { id: '1099-nec', label: isEnglish ? '1099-NEC: Non-Employee Compensation' : '1099-NEC: Çalışan Olmayan Tazminat' },
    { id: '1099-misc', label: isEnglish ? '1099-MISC: Miscellaneous Income' : '1099-MISC: Çeşitli Gelir' },
    { id: '1099-k', label: isEnglish ? '1099-K: Payment Card Transactions' : '1099-K: Ödeme Kartı İşlemleri' },
    { id: '1042-s', label: isEnglish ? '1042-S: Foreign Persons\' Income' : '1042-S: Yabancıların Geliri' },
    { id: 'yabancilar', label: isEnglish ? 'Do Foreign Persons Receive 1099s?' : 'Yabancılar 1099 Alır mı?' },
    { id: 'stopaj', label: isEnglish ? 'Backup Withholding Explained' : 'Yedek Stopaj Açıklaması' },
    { id: 'sss', label: isEnglish ? 'FAQ' : 'Sık Sorulan Sorular' },
    { id: 'kaynaklar', label: isEnglish ? 'Sources' : 'Kaynaklar' },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish
      ? '1099 Forms & US Tax Documents Explained'
      : '1099 Formları ve ABD Vergi Belgeleri',
    author: {
      '@type': 'Person',
      name: 'Zeynep Ruziye Moore',
      jobTitle: 'Licensed in New York',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    datePublished: '2026-01-25',
    dateModified: '2026-01-25',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://echo-legal.com/${lang}/1099-vergi-belgeleri`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isEnglish ? 'Home' : 'Ana Sayfa',
        item: `https://echo-legal.com/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isEnglish ? 'Tax & ID Guide' : 'Vergi ve Kimlik Rehberi',
        item: `https://echo-legal.com/${lang}/vergi-kimlik-rehberi`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isEnglish ? '1099 & Tax Documents' : '1099 ve Vergi Belgeleri',
        item: `https://echo-legal.com/${lang}/1099-vergi-belgeleri`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <span className="mx-2">→</span>
            <Link href={`/${lang}/vergi-kimlik-rehberi`} className="hover:text-black">{isEnglish ? 'Tax & ID Hub' : 'Vergi ve Kimlik'}</Link>
            <span className="mx-2">→</span>
            <span className="text-black">{isEnglish ? '1099 & Tax Documents' : '1099 ve Vergi Belgeleri'}</span>
          </nav>

          <article>
            {/* Header */}
            <header className="mb-10">
              <span className="inline-block px-3 py-1 bg-green-50 text-green-800 rounded-full text-sm font-medium mb-4">
                {isEnglish ? 'Tax Documents' : 'Vergi Belgeleri'}
              </span>

              <h1 className="text-3xl md:text-4xl font-black text-black mb-6 leading-tight">
                {isEnglish
                  ? '1099 Forms & US Tax Documents Explained'
                  : '1099 Formları ve ABD Vergi Belgeleri'}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'If you work with US clients or operate a US entity, you may encounter various IRS information returns. This guide explains what they are and what they mean for you.'
                  : 'ABD müşterileriyle çalışıyor veya ABD şirketi işletiyorsanız, çeşitli IRS bilgi beyannameleriyle karşılaşabilirsiniz. Bu rehber bunların ne olduğunu ve sizin için ne anlama geldiğini açıklar.'}
              </p>

              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <span>{isEnglish ? 'Last updated:' : 'Son güncelleme:'} {isEnglish ? 'January 2026' : 'Ocak 2026'}</span>
              </div>
            </header>

            {/* Disclaimer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-10">
              <p className="text-sm text-red-900 leading-relaxed">
                <strong>{isEnglish ? 'Important:' : 'Önemli:'}</strong>{' '}
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute tax advice. Tax laws are complex and change frequently. Always consult a qualified CPA or tax attorney for advice specific to your situation.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır; vergi danışmanlığı teşkil etmez. Vergi yasaları karmaşıktır ve sık sık değişir. Kendi durumunuza özgü tavsiye için mutlaka uzman bir mali müşavire danışın.'}
              </p>
            </div>

            {/* Table of Contents */}
            <nav className="bg-gray-50 rounded-lg p-6 mb-10">
              <h2 className="text-lg font-bold text-black mb-4">{isEnglish ? 'Table of Contents' : 'İçindekiler'}</h2>
              <ol className="space-y-2">
                {tocItems.map((item, index) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="text-gray-700 hover:text-black hover:underline">
                      {index + 1}. {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Section 1: Overview */}
            <section id="genel-bakis" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '1. What Are 1099 Forms?' : '1. 1099 Formları Nedir?'}
              </h2>

              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <p>Form 1099 is a series of IRS "information returns" used to report various types of income other than wages, salaries, and tips. When a US person or entity pays you for services, they may be required to report those payments to the IRS using a 1099 form.</p>
                    <p>Key points about 1099s:</p>
                    <ul>
                      <li><strong>They&apos;re information reports</strong> — they tell the IRS what you were paid</li>
                      <li><strong>The payer issues them</strong> — you don&apos;t create your own 1099</li>
                      <li><strong>They&apos;re due by January 31</strong> — for payments made in the previous year</li>
                      <li><strong>Copies go to you and the IRS</strong> — so both parties have the same information</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p>Form 1099, maaş, ücret ve bahşiş dışındaki çeşitli gelir türlerini bildirmek için kullanılan bir IRS "bilgi beyannamesi" serisidir. ABD kişisi veya kurumu size hizmet için ödeme yaptığında, bu ödemeleri 1099 formu kullanarak IRS&apos;e bildirmeleri gerekebilir.</p>
                    <p>1099&apos;lar hakkında temel noktalar:</p>
                    <ul>
                      <li><strong>Bilgi raporlarıdır</strong> — IRS&apos;e ne kadar ödendiğinizi söyler</li>
                      <li><strong>Ödeyici düzenler</strong> — kendi 1099&apos;unuzu oluşturmazsınız</li>
                      <li><strong>31 Ocak&apos;a kadar düzenlenir</strong> — önceki yılda yapılan ödemeler için</li>
                      <li><strong>Size ve IRS&apos;e kopyalar gider</strong> — böylece her iki taraf da aynı bilgiye sahip olur</li>
                    </ul>
                  </>
                )}
              </div>
            </section>

            {/* Section 2: 1099-NEC */}
            <section id="1099-nec" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '2. 1099-NEC: Non-Employee Compensation' : '2. 1099-NEC: Çalışan Olmayan Tazminat'}
              </h2>

              <div className="border-l-4 border-blue-500 pl-4 py-2 mb-6">
                <p className="font-bold text-black">{isEnglish ? 'Most common form for freelancers and contractors' : 'Serbest çalışanlar ve yükleniciler için en yaygın form'}</p>
              </div>

              <div className="prose prose-gray max-w-none mb-6">
                {isEnglish ? (
                  <>
                    <p><strong>What it reports:</strong> Payments of $600 or more to non-employees for services performed in a trade or business.</p>
                    <p><strong>Who receives it:</strong> Independent contractors, freelancers, consultants, and other self-employed individuals who provide services to US businesses.</p>
                    <p><strong>Example:</strong> A US company pays a contractor $5,000 for software development. The company issues a 1099-NEC to the contractor.</p>
                  </>
                ) : (
                  <>
                    <p><strong>Ne bildirir:</strong> Bir ticaret veya işte gerçekleştirilen hizmetler için çalışan olmayanlara yapılan 600 $ veya üzeri ödemeler.</p>
                    <p><strong>Kim alır:</strong> ABD işletmelerine hizmet sağlayan bağımsız yükleniciler, serbest çalışanlar, danışmanlar ve diğer serbest meslek sahipleri.</p>
                    <p><strong>Örnek:</strong> Bir ABD şirketi, yazılım geliştirme için bir yükleniciye 5.000 $ öder. Şirket yükleniciye 1099-NEC düzenler.</p>
                  </>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>{isEnglish ? 'Note:' : 'Not:'}</strong>{' '}
                  {isEnglish
                    ? 'Before 2020, this type of payment was reported on 1099-MISC Box 7. The IRS reintroduced the separate 1099-NEC form starting with tax year 2020.'
                    : '2020 öncesinde bu tür ödemeler 1099-MISC Kutu 7\'de bildiriliyordu. IRS, 2020 vergi yılından itibaren ayrı 1099-NEC formunu yeniden kullanıma aldı.'}
                </p>
              </div>
            </section>

            {/* Section 3: 1099-MISC */}
            <section id="1099-misc" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '3. 1099-MISC: Miscellaneous Income' : '3. 1099-MISC: Çeşitli Gelir'}
              </h2>

              <div className="prose prose-gray max-w-none mb-6">
                {isEnglish ? (
                  <>
                    <p><strong>What it reports:</strong> Various types of miscellaneous income including:</p>
                    <ul>
                      <li>Rent payments ($600 or more)</li>
                      <li>Royalties ($10 or more)</li>
                      <li>Prizes and awards</li>
                      <li>Medical and healthcare payments</li>
                      <li>Attorney fees</li>
                    </ul>
                    <p><strong>Who receives it:</strong> Landlords, authors receiving royalties, prize winners, and others receiving miscellaneous income.</p>
                  </>
                ) : (
                  <>
                    <p><strong>Ne bildirir:</strong> Çeşitli gelir türleri dahil:</p>
                    <ul>
                      <li>Kira ödemeleri (600 $ veya üzeri)</li>
                      <li>Telif hakları (10 $ veya üzeri)</li>
                      <li>Ödüller ve hediyeler</li>
                      <li>Tıbbi ve sağlık ödemeleri</li>
                      <li>Avukat ücretleri</li>
                    </ul>
                    <p><strong>Kim alır:</strong> Ev sahipleri, telif hakkı alan yazarlar, ödül kazananlar ve diğer çeşitli gelir alanlar.</p>
                  </>
                )}
              </div>
            </section>

            {/* Section 4: 1099-K */}
            <section id="1099-k" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '4. 1099-K: Payment Card and Third-Party Network Transactions' : '4. 1099-K: Ödeme Kartı ve Üçüncü Taraf Ağ İşlemleri'}
              </h2>

              <div className="border-l-4 border-purple-500 pl-4 py-2 mb-6">
                <p className="font-bold text-black">{isEnglish ? 'For payments through Stripe, PayPal, and similar platforms' : 'Stripe, PayPal ve benzeri platformlar aracılığıyla yapılan ödemeler için'}</p>
              </div>

              <div className="prose prose-gray max-w-none mb-6">
                {isEnglish ? (
                  <>
                    <p><strong>What it reports:</strong> Gross payments received through payment settlement entities (PSEs) like PayPal, Stripe, Venmo Business, Square, etc.</p>
                    <p><strong>Current threshold (2024+):</strong> The IRS has been adjusting thresholds. Check current IRS guidance for the applicable reporting threshold.</p>
                    <p><strong>Important:</strong> 1099-K reports gross payments, not net. It doesn&apos;t account for refunds, fees, or chargebacks — those are tracked separately for tax purposes.</p>
                  </>
                ) : (
                  <>
                    <p><strong>Ne bildirir:</strong> PayPal, Stripe, Venmo Business, Square vb. ödeme ödeme kuruluşları (PSE&apos;ler) aracılığıyla alınan brüt ödemeler.</p>
                    <p><strong>Güncel eşik (2024+):</strong> IRS eşikleri ayarlamaktadır. Geçerli raporlama eşiği için güncel IRS rehberliğini kontrol edin.</p>
                    <p><strong>Önemli:</strong> 1099-K brüt ödemeleri bildirir, net değil. İadeleri, ücretleri veya ters ibrazları hesaba katmaz — bunlar vergi amaçları için ayrı olarak izlenir.</p>
                  </>
                )}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-900">
                  <strong>{isEnglish ? 'For international sellers:' : 'Uluslararası satıcılar için:'}</strong>{' '}
                  {isEnglish
                    ? 'If you provided a W-8BEN to Stripe/PayPal, you typically won\'t receive a 1099-K since it\'s for US persons. However, the platform may still report your information differently.'
                    : 'Stripe/PayPal\'a W-8BEN sağladıysanız, 1099-K ABD kişileri için olduğundan genellikle almazsınız. Ancak platform bilgilerinizi farklı şekilde raporlayabilir.'}
                </p>
              </div>
            </section>

            {/* Section 5: 1042-S */}
            <section id="1042-s" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '5. 1042-S: Foreign Person\'s US Source Income' : '5. 1042-S: Yabancının ABD Kaynaklı Geliri'}
              </h2>

              <div className="border-l-4 border-green-500 pl-4 py-2 mb-6">
                <p className="font-bold text-black">{isEnglish ? 'The form foreign persons typically receive instead of 1099' : 'Yabancıların 1099 yerine genellikle aldığı form'}</p>
              </div>

              <div className="prose prose-gray max-w-none mb-6">
                {isEnglish ? (
                  <>
                    <p><strong>What it reports:</strong> Payments made to foreign persons that are subject to withholding, including:</p>
                    <ul>
                      <li>Dividends</li>
                      <li>Interest</li>
                      <li>Royalties</li>
                      <li>Certain service payments</li>
                    </ul>
                    <p><strong>Who receives it:</strong> Foreign persons (individuals or entities) who received US-source income subject to withholding.</p>
                    <p><strong>Key information shown:</strong></p>
                    <ul>
                      <li>Gross income paid</li>
                      <li>Tax withheld</li>
                      <li>Tax rate applied</li>
                      <li>Whether treaty benefits were claimed</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p><strong>Ne bildirir:</strong> Yabancılara yapılan ve stopaja tabi olan ödemeler, dahil:</p>
                    <ul>
                      <li>Temettüler</li>
                      <li>Faiz</li>
                      <li>Telif hakları</li>
                      <li>Belirli hizmet ödemeleri</li>
                    </ul>
                    <p><strong>Kim alır:</strong> Stopaja tabi ABD kaynaklı gelir alan yabancı kişiler (bireyler veya kurumlar).</p>
                    <p><strong>Gösterilen temel bilgiler:</strong></p>
                    <ul>
                      <li>Ödenen brüt gelir</li>
                      <li>Kesilen vergi</li>
                      <li>Uygulanan vergi oranı</li>
                      <li>Anlaşma avantajlarının talep edilip edilmediği</li>
                    </ul>
                  </>
                )}
              </div>
            </section>

            {/* Section 6: Foreign Persons */}
            <section id="yabancilar" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '6. Do Foreign Persons Receive 1099s?' : '6. Yabancılar 1099 Alır mı?'}
              </h2>

              <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6">
                <h3 className="font-bold text-green-900 mb-2">{isEnglish ? 'Short answer: Generally, no.' : 'Kısa cevap: Genellikle hayır.'}</h3>
                <p className="text-sm text-green-800">
                  {isEnglish
                    ? 'If you properly submitted a W-8BEN or W-8BEN-E certifying your foreign status, you should not receive a 1099. The payer uses your W-8 to determine that standard 1099 reporting does not apply to you.'
                    : 'Yabancı statünüzü belgeleyen bir W-8BEN veya W-8BEN-E\'yi düzgün şekilde sunduysan, 1099 almamanız gerekir. Ödeyici, standart 1099 raporlamasının size uygulanmadığını belirlemek için W-8\'inizi kullanır.'}
                </p>
              </div>

              <div className="prose prose-gray max-w-none">
                {isEnglish ? (
                  <>
                    <h3>What happens instead?</h3>
                    <ul>
                      <li><strong>If withholding applies:</strong> You may receive Form 1042-S showing the payment and any tax withheld</li>
                      <li><strong>If no withholding:</strong> The payer may have no US reporting obligation to you, but will report to their own records that payments were made to a foreign person</li>
                    </ul>

                    <h3>When might you still get a 1099?</h3>
                    <ul>
                      <li>You didn&apos;t provide a valid W-8 form, so the payer treated you as a US person</li>
                      <li>The payer made an error in their reporting</li>
                      <li>You have both US and foreign activities that got mixed up</li>
                    </ul>

                    <p><strong>If you receive a 1099 in error:</strong> Contact the payer to explain that you&apos;re a foreign person and provided a W-8. They may need to correct their records or issue a corrected form.</p>
                  </>
                ) : (
                  <>
                    <h3>Bunun yerine ne olur?</h3>
                    <ul>
                      <li><strong>Stopaj uygulanıyorsa:</strong> Ödemeyi ve kesilen vergiyi gösteren Form 1042-S alabilirsiniz</li>
                      <li><strong>Stopaj yoksa:</strong> Ödeyicinin size karşı ABD raporlama yükümlülüğü olmayabilir, ancak yabancı bir kişiye ödeme yapıldığını kendi kayıtlarına bildirecektir</li>
                    </ul>

                    <h3>Ne zaman yine de 1099 alabilirsiniz?</h3>
                    <ul>
                      <li>Geçerli bir W-8 formu sağlamadınız, bu yüzden ödeyici sizi ABD kişisi olarak kabul etti</li>
                      <li>Ödeyici raporlamada hata yaptı</li>
                      <li>Hem ABD hem de yabancı faaliyetleriniz var ve bunlar karıştı</li>
                    </ul>

                    <p><strong>Yanlışlıkla 1099 alırsanız:</strong> Yabancı olduğunuzu ve W-8 sağladığınızı açıklamak için ödeyiciyle iletişime geçin. Kayıtlarını düzeltmeleri veya düzeltilmiş form düzenlemeleri gerekebilir.</p>
                  </>
                )}
              </div>
            </section>

            {/* Section 7: Backup Withholding */}
            <section id="stopaj" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '7. Backup Withholding Explained' : '7. Yedek Stopaj Açıklaması'}
              </h2>

              <div className="prose prose-gray max-w-none mb-6">
                {isEnglish ? (
                  <>
                    <h3>What is backup withholding?</h3>
                    <p>Backup withholding is a 24% tax that US payers must withhold from payments when they cannot verify the payee&apos;s tax status. This happens when:</p>
                    <ul>
                      <li>You don&apos;t provide a valid W-9 (for US persons) or W-8 (for foreign persons)</li>
                      <li>The TIN you provided doesn&apos;t match IRS records</li>
                      <li>The IRS notifies the payer that you underreported income</li>
                    </ul>

                    <h3>How to avoid backup withholding</h3>
                    <ul>
                      <li><strong>US persons:</strong> Provide a complete, accurate W-9 with correct TIN</li>
                      <li><strong>Foreign persons:</strong> Provide the appropriate W-8 form (W-8BEN for individuals, W-8BEN-E for entities)</li>
                    </ul>

                    <h3>Can you recover backup withholding?</h3>
                    <p>Yes. If backup withholding was applied incorrectly, you may be able to recover it by filing a US tax return and claiming the withheld amount as a credit against your tax liability (or requesting a refund if you have no US tax liability).</p>
                  </>
                ) : (
                  <>
                    <h3>Yedek stopaj nedir?</h3>
                    <p>Yedek stopaj, ABD ödeyicilerinin alıcının vergi durumunu doğrulayamadığında ödemelerden kesmesi gereken %24&apos;lük bir vergidir. Bu şu durumlarda olur:</p>
                    <ul>
                      <li>Geçerli bir W-9 (ABD kişileri için) veya W-8 (yabancılar için) sağlamadınız</li>
                      <li>Sağladığınız TIN, IRS kayıtlarıyla eşleşmiyor</li>
                      <li>IRS, ödeyiciye geliri eksik bildirdiğinizi bildiriyor</li>
                    </ul>

                    <h3>Yedek stopajdan nasıl kaçınılır</h3>
                    <ul>
                      <li><strong>ABD kişileri:</strong> Doğru TIN ile tam, doğru bir W-9 sağlayın</li>
                      <li><strong>Yabancılar:</strong> Uygun W-8 formunu sağlayın (bireyler için W-8BEN, kurumlar için W-8BEN-E)</li>
                    </ul>

                    <h3>Yedek stopajı geri alabilir misiniz?</h3>
                    <p>Evet. Yedek stopaj yanlış uygulandıysa, ABD vergi beyannamesi vererek ve kesilen tutarı vergi borcunuza karşı kredi olarak talep ederek (veya ABD vergi borcunuz yoksa iade talep ederek) geri alabilirsiniz.</p>
                  </>
                )}
              </div>
            </section>

            {/* Section 8: FAQ */}
            <section id="sss" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '8. Frequently Asked Questions' : '8. Sık Sorulan Sorular'}
              </h2>

              <div className="space-y-4">
                {(isEnglish ? [
                  {
                    q: 'My US client says they need to send me a 1099. I\'m in Turkey. What do I do?',
                    a: 'Explain that you\'re a foreign person and provide a W-8BEN (or W-8BEN-E if you\'re operating through a non-US entity). With a valid W-8, they typically won\'t need to send you a 1099.',
                  },
                  {
                    q: 'I received a 1099-K from Stripe but I\'m not a US person. Why?',
                    a: 'This may happen if you didn\'t provide a W-8 to Stripe, or if there was an error in your account setup. Contact Stripe support to verify your tax status and ensure your W-8 is on file.',
                  },
                  {
                    q: 'Do I need to file a US tax return if I receive a 1099?',
                    a: 'Not necessarily. Receiving a 1099 doesn\'t automatically create a US tax filing obligation. Your filing requirement depends on factors like income type, amount, and your tax status. Consult a tax professional.',
                  },
                  {
                    q: 'The 1099 amount doesn\'t match what I was actually paid. What happened?',
                    a: 'For 1099-K especially, the form shows gross payments before fees, refunds, or chargebacks. The gross amount will be higher than your net receipts. Keep your own records to reconcile.',
                  },
                  {
                    q: 'What if my payer refuses to accept my W-8 form?',
                    a: 'Some payers may not be familiar with W-8 forms. You can direct them to IRS resources explaining the form. If they still refuse and apply backup withholding, you may need to file a US return to claim a refund.',
                  },
                ] : [
                  {
                    q: 'ABD\'li müşterim bana 1099 göndermesi gerektiğini söylüyor. Türkiye\'deyim. Ne yapmalıyım?',
                    a: 'Yabancı olduğunuzu açıklayın ve W-8BEN (veya ABD dışı bir kurum aracılığıyla faaliyet gösteriyorsanız W-8BEN-E) sağlayın. Geçerli bir W-8 ile genellikle size 1099 göndermeleri gerekmez.',
                  },
                  {
                    q: 'Stripe\'dan 1099-K aldım ama ABD kişisi değilim. Neden?',
                    a: 'Bu, Stripe\'a W-8 sağlamadıysanız veya hesap kurulumunuzda bir hata varsa olabilir. Vergi durumunuzu doğrulamak ve W-8\'inizin kayıtlarda olduğundan emin olmak için Stripe desteğiyle iletişime geçin.',
                  },
                  {
                    q: '1099 alırsam ABD vergi beyannamesi vermem gerekir mi?',
                    a: 'Zorunlu değil. 1099 almak otomatik olarak ABD vergi beyannamesi yükümlülüğü oluşturmaz. Beyanname gereksiniminiz gelir türü, tutarı ve vergi durumunuz gibi faktörlere bağlıdır. Bir vergi uzmanına danışın.',
                  },
                  {
                    q: '1099 tutarı gerçekte ödenen miktarla eşleşmiyor. Ne oldu?',
                    a: 'Özellikle 1099-K için form, ücretler, iadeler veya ters ibrazlardan önceki brüt ödemeleri gösterir. Brüt tutar, net gelirlerinizden daha yüksek olacaktır. Uzlaştırmak için kendi kayıtlarınızı tutun.',
                  },
                  {
                    q: 'Ödeyicim W-8 formumu kabul etmeyi reddederse ne olur?',
                    a: 'Bazı ödeyiciler W-8 formlarına aşina olmayabilir. Onları formu açıklayan IRS kaynaklarına yönlendirebilirsiniz. Yine de reddederlerse ve yedek stopaj uygularlarsa, iade talep etmek için ABD beyannamesi vermeniz gerekebilir.',
                  },
                ]).map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-5 py-4">
                      <h3 className="font-semibold text-black">{faq.q}</h3>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-gray-700 text-sm">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 9: Sources */}
            <section id="kaynaklar" className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? '9. Sources & Official Links' : '9. Kaynaklar ve Resmi Bağlantılar'}
              </h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/forms-pubs/about-form-1099-nec" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – About Form 1099-NEC
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Non-employee compensation reporting' : 'Çalışan olmayan tazminat raporlaması'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/forms-pubs/about-form-1099-k" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – About Form 1099-K
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Payment card and third-party network transactions' : 'Ödeme kartı ve üçüncü taraf ağ işlemleri'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/forms-pubs/about-form-1042-s" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – About Form 1042-S
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'Foreign person\'s US source income' : 'Yabancının ABD kaynaklı geliri'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400">•</span>
                  <div>
                    <a href="https://www.irs.gov/businesses/small-businesses-self-employed/backup-withholding" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                      IRS – Backup Withholding
                    </a>
                    <p className="text-sm text-gray-600">{isEnglish ? 'When and how backup withholding applies' : 'Yedek stopajın ne zaman ve nasıl uygulandığı'}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-black mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href={`/${lang}/irs-vergiler-ve-w8-w9-gercekleri`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-black mb-1">{isEnglish ? 'W-8/W-9 Guide' : 'W-8/W-9 Rehberi'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Which form to sign' : 'Hangi formu imzalamalı'}</p>
                </Link>
                <Link href={`/${lang}/ein-itin-ssn-farki`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-black mb-1">{isEnglish ? 'EIN vs ITIN vs SSN' : 'EIN, ITIN, SSN Farkları'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Tax ID numbers explained' : 'Vergi kimlik numaraları açıklandı'}</p>
                </Link>
                <Link href={`/${lang}/abd-odemeleri-alma-rehberi`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-black mb-1">{isEnglish ? 'Receiving US Payments' : 'ABD\'den Ödeme Alma'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'Stripe, PayPal, Wise guide' : 'Stripe, PayPal, Wise rehberi'}</p>
                </Link>
                <Link href={`/${lang}/abd-satis-vergisi-rehberi`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
                  <h3 className="font-semibold text-black mb-1">{isEnglish ? 'US Sales Tax & Nexus' : 'ABD Satış Vergisi'}</h3>
                  <p className="text-sm text-gray-600">{isEnglish ? 'E-commerce tax obligations' : 'E-ticaret vergi yükümlülükleri'}</p>
                </Link>
              </div>
            </section>

            {/* Final Disclaimer */}
            <div className="bg-gray-100 rounded-lg p-5">
              <p className="text-xs text-gray-600 leading-relaxed">
                {isEnglish
                  ? 'This content is for informational purposes only and does not constitute tax or legal advice. Tax laws are complex and change frequently. The information provided may not reflect current IRS guidance. Always consult a qualified CPA or tax attorney for advice specific to your situation. EchoLegal is not a law firm, accounting firm, or tax advisory service.'
                  : 'Bu içerik yalnızca bilgilendirme amaçlıdır; vergi veya hukuki danışmanlık teşkil etmez. Vergi yasaları karmaşıktır ve sık sık değişir. Sağlanan bilgiler güncel IRS rehberliğini yansıtmayabilir. Kendi durumunuza özgü tavsiye için mutlaka uzman bir mali müşavir veya vergi avukatına danışın. EchoLegal bir hukuk bürosu, muhasebe firması veya vergi danışmanlık hizmeti değildir.'}
              </p>
            </div>
          </article>
        </main>
      </div>
    </>
  )
}
