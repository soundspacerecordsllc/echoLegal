import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'How to Open a US Bank Account for Your LLC: Legal Requirements | EchoLegal'
    : 'ABD\'de Banka Hesabı Açmak: LLC Sahipleri İçin Hukuki Gereklilikler | EchoLegal'

  const description = isEnglish
    ? 'Complete guide to opening a US business bank account for foreign-owned LLCs. Required documents, best banks for non-residents, and common rejection reasons.'
    : 'Yabancıya ait LLC\'ler için ABD iş banka hesabı açma rehberi. Gerekli belgeler, yabancılar için en iyi bankalar ve yaygın ret nedenleri.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-llc-banka-hesabi-acmak`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-llc-banka-hesabi-acmak',
        'tr': 'https://echo-legal.com/tr/abd-llc-banka-hesabi-acmak',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function BankAccountPage({
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
    headline: isEnglish ? 'How to Open a US Bank Account for Your LLC' : 'ABD\'de LLC İçin Banka Hesabı Açmak',
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
          <span className="text-black font-medium">{isEnglish ? 'US Bank Account' : 'ABD Banka Hesabı'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'Opening a US Bank Account for Your LLC'
              : 'ABD\'de LLC İçin Banka Hesabı Açmak'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'The legal requirements and practical guide for Turkish LLC owners to open a US business bank account—with or without visiting the US.'
              : 'Türk LLC sahiplerinin ABD iş banka hesabı açması için hukuki gereksinimler ve pratik rehber—ABD\'yi ziyaret ederek veya etmeden.'}
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

          {/* Required Documents */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Required Documents' : 'Gerekli Belgeler'}</h2>

            <div className="bg-gray-50 rounded-lg p-6">
              <p className="mb-4 text-gray-600">
                {isEnglish
                  ? 'Most US banks require the following documents from foreign-owned LLCs:'
                  : 'Çoğu ABD bankası yabancıya ait LLC\'lerden aşağıdaki belgeleri ister:'}
              </p>

              <div className="space-y-3">
                {(isEnglish ? [
                  { doc: 'Articles of Organization', note: 'State-filed formation document (apostille may be required by some banks)' },
                  { doc: 'EIN Confirmation Letter (CP 575)', note: 'Or EIN verification letter from IRS' },
                  { doc: 'Operating Agreement', note: 'Signed by all members - this is CRITICAL' },
                  { doc: 'Government-Issued ID', note: 'Passport for all owners/signers' },
                  { doc: 'Proof of Address', note: 'Utility bill or bank statement (your home country is usually OK)' },
                  { doc: 'Business Description', note: 'What your company does, expected revenue, customers' },
                ] : [
                  { doc: 'Kuruluş Sözleşmesi', note: 'Eyalette dosyalanmış kuruluş belgesi (bazı bankalar apostil isteyebilir)' },
                  { doc: 'EIN Onay Mektubu (CP 575)', note: 'Veya IRS\'den EIN doğrulama mektubu' },
                  { doc: 'Operating Agreement', note: 'Tüm üyeler tarafından imzalanmış - bu KRİTİKTİR' },
                  { doc: 'Devlet Tarafından Verilmiş Kimlik', note: 'Tüm sahipler/imzacılar için pasaport' },
                  { doc: 'Adres Kanıtı', note: 'Fatura veya banka hesap özeti (kendi ülkeniz genellikle kabul edilir)' },
                  { doc: 'İş Açıklaması', note: 'Şirketinizin ne yaptığı, beklenen gelir, müşteriler' },
                ]).map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white rounded border border-gray-200">
                    <span className="text-green-600">✓</span>
                    <div>
                      <p className="font-semibold">{item.doc}</p>
                      <p className="text-gray-600 text-sm">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bank Options */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Best Banks for Foreign-Owned LLCs' : 'Yabancıya Ait LLC\'ler İçin En İyi Bankalar'}</h2>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">Mercury</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{isEnglish ? 'Recommended' : 'Önerilen'}</span>
                </div>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• {isEnglish ? '100% online application - no US visit required' : '%100 online başvuru - ABD ziyareti gerekmez'}</li>
                  <li>• {isEnglish ? 'No monthly fees' : 'Aylık ücret yok'}</li>
                  <li>• {isEnglish ? 'Foreign owners accepted' : 'Yabancı sahipler kabul edilir'}</li>
                  <li>• {isEnglish ? 'Good for startups and tech companies' : 'Startup\'lar ve teknoloji şirketleri için iyi'}</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">Relay</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{isEnglish ? 'Good Alternative' : 'İyi Alternatif'}</span>
                </div>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• {isEnglish ? 'Online application available' : 'Online başvuru mevcut'}</li>
                  <li>• {isEnglish ? 'No minimum balance requirements' : 'Minimum bakiye gereksinimi yok'}</li>
                  <li>• {isEnglish ? 'Multiple sub-accounts (good for bookkeeping)' : 'Çoklu alt hesaplar (muhasebe için iyi)'}</li>
                  <li>• {isEnglish ? 'Integrates with accounting software' : 'Muhasebe yazılımlarıyla entegre'}</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">Wise Business</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{isEnglish ? 'Multi-Currency' : 'Çoklu Para Birimi'}</span>
                </div>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• {isEnglish ? 'Not a full bank account, but useful for payments' : 'Tam banka hesabı değil, ancak ödemeler için kullanışlı'}</li>
                  <li>• {isEnglish ? 'Excellent for international transfers' : 'Uluslararası transferler için mükemmel'}</li>
                  <li>• {isEnglish ? 'Hold multiple currencies' : 'Birden fazla para birimi tutun'}</li>
                  <li>• {isEnglish ? 'Lower fees for Turkey-US transfers' : 'Türkiye-ABD transferleri için düşük ücretler'}</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">{isEnglish ? 'Traditional Banks (Chase, Bank of America)' : 'Geleneksel Bankalar (Chase, Bank of America)'}</h3>
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">{isEnglish ? 'In-Person Required' : 'Yüz Yüze Gerekli'}</span>
                </div>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• {isEnglish ? 'Usually require in-person visit to US branch' : 'Genellikle ABD şubesine yüz yüze ziyaret gerektirir'}</li>
                  <li>• {isEnglish ? 'More documentation requirements' : 'Daha fazla belge gereksinimi'}</li>
                  <li>• {isEnglish ? 'Higher rejection rates for foreign owners' : 'Yabancı sahipler için daha yüksek ret oranları'}</li>
                  <li>• {isEnglish ? 'May have monthly fees and minimum balances' : 'Aylık ücretler ve minimum bakiyeler olabilir'}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Rejection Reasons */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Why Banks Reject Applications' : 'Bankalar Başvuruları Neden Reddeder'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { reason: 'Missing Operating Agreement', fix: 'Create and sign an Operating Agreement before applying. This is the #1 reason for rejection.' },
                { reason: 'Business description unclear', fix: 'Clearly explain what your business does, who your customers are, and expected transaction volume.' },
                { reason: 'High-risk industry', fix: 'Crypto, gambling, adult content, and certain financial services face extra scrutiny or outright bans.' },
                { reason: 'Inconsistent information', fix: 'Make sure your name, address, and EIN match exactly across all documents.' },
                { reason: 'No clear business purpose', fix: 'Banks want to see legitimate business activity, not just a shell company for holding assets.' },
              ] : [
                { reason: 'Operating Agreement Eksik', fix: 'Başvurmadan önce Operating Agreement oluşturun ve imzalayın. Bu ret için 1 numaralı nedendir.' },
                { reason: 'İş açıklaması belirsiz', fix: 'İşletmenizin ne yaptığını, müşterilerinizin kim olduğunu ve beklenen işlem hacmini net bir şekilde açıklayın.' },
                { reason: 'Yüksek riskli sektör', fix: 'Kripto, kumar, yetişkin içeriği ve belirli finansal hizmetler ekstra inceleme veya doğrudan yasaklarla karşı karşıyadır.' },
                { reason: 'Tutarsız bilgi', fix: 'Adınızın, adresinizin ve EIN\'inizin tüm belgelerde tam olarak eşleştiğinden emin olun.' },
                { reason: 'Net iş amacı yok', fix: 'Bankalar sadece varlık tutma için bir paravan şirket değil, meşru iş faaliyeti görmek istiyor.' },
              ]).map((item, i) => (
                <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-semibold text-red-900">✗ {item.reason}</p>
                  <p className="text-green-700 mt-1">✓ {item.fix}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Step by Step */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Step-by-Step Process' : 'Adım Adım Süreç'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { step: 'Get your EIN first', time: '2-4 weeks', desc: 'You cannot open a bank account without an EIN. Apply via fax for foreign owners.' },
                { step: 'Prepare your Operating Agreement', time: '1-2 days', desc: 'Banks require this. Make sure it\'s signed and dated.' },
                { step: 'Gather all required documents', time: '1 day', desc: 'EIN letter, Articles of Organization, passport copies, address proof.' },
                { step: 'Choose your bank and apply', time: '1 day', desc: 'Online banks (Mercury, Relay) are usually fastest for foreign owners.' },
                { step: 'Complete verification', time: '1-7 days', desc: 'Answer any follow-up questions. Provide additional documents if requested.' },
                { step: 'Account opens', time: 'Same day - 2 weeks', desc: 'Online banks are faster. Traditional banks take longer.' },
              ] : [
                { step: 'Önce EIN alın', time: '2-4 hafta', desc: 'EIN olmadan banka hesabı açamazsınız. Yabancı sahipler için faksla başvurun.' },
                { step: 'Operating Agreement\'ınızı hazırlayın', time: '1-2 gün', desc: 'Bankalar bunu istiyor. İmzalı ve tarihli olduğundan emin olun.' },
                { step: 'Tüm gerekli belgeleri toplayın', time: '1 gün', desc: 'EIN mektubu, Kuruluş Sözleşmesi, pasaport kopyaları, adres kanıtı.' },
                { step: 'Bankanızı seçin ve başvurun', time: '1 gün', desc: 'Online bankalar (Mercury, Relay) yabancı sahipler için genellikle en hızlıdır.' },
                { step: 'Doğrulamayı tamamlayın', time: '1-7 gün', desc: 'Takip sorularını yanıtlayın. İstenirse ek belgeler sağlayın.' },
                { step: 'Hesap açılır', time: 'Aynı gün - 2 hafta', desc: 'Online bankalar daha hızlıdır. Geleneksel bankalar daha uzun sürer.' },
              ]).map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold text-sm">{i + 1}</div>
                    {i < 5 && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold">{item.step}</p>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Important Warning */}
          <section className="mb-12">
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="font-semibold text-red-900">{isEnglish ? '⚠️ Critical: Keep Business and Personal Finances Separate' : '⚠️ Kritik: İş ve Kişisel Finansları Ayrı Tutun'}</p>
              <p className="text-red-800">
                {isEnglish
                  ? 'Never mix personal and business funds. Using personal accounts for LLC transactions can "pierce the corporate veil" and make you personally liable for all business debts. Always use your business bank account for business transactions.'
                  : 'Kişisel ve iş fonlarını asla karıştırmayın. LLC işlemleri için kişisel hesapları kullanmak "kurumsal perdeyi delebilir" ve sizi tüm iş borçlarından kişisel olarak sorumlu tutabilir. İş işlemleri için her zaman iş banka hesabınızı kullanın.'}
              </p>
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/abd-ein-numarasi-nasil-alinir`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'How to Get an EIN →' : 'EIN Nasıl Alınır? →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/operating-agreement-zorunlu-mu`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Operating Agreement Requirements →' : 'Operating Agreement Gereksinimleri →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/checklists/bank-account-checklist`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Bank Account Opening Checklist →' : 'Banka Hesabı Açma Kontrol Listesi →'}
                </Link>
              </li>
            </ul>
          </section>

        </article>
      </main>
    </>
  )
}
