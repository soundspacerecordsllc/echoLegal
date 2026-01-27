import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Start a US Company vs Buy an Existing One: Which is Better? | EchoLegal'
    : 'ABD\'de Şirket Kurmak mı, Şirket Satın Almak mı? | EchoLegal'

  const description = isEnglish
    ? 'Compare starting a new US company vs acquiring an existing business. Legal considerations, costs, risks, and what Turkish entrepreneurs should know.'
    : 'Yeni ABD şirketi kurmak ile mevcut işletme satın almayı karşılaştırın. Hukuki değerlendirmeler, maliyetler, riskler ve Türk girişimcilerin bilmesi gerekenler.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-sirket-kurmak-mi-satin-almak-mi`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-sirket-kurmak-mi-satin-almak-mi',
        'tr': 'https://echo-legal.com/tr/abd-sirket-kurmak-mi-satin-almak-mi',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function BuyVsStartPage({
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
    headline: isEnglish ? 'Start a US Company vs Buy an Existing One' : 'ABD\'de Şirket Kurmak mı, Şirket Satın Almak mı?',
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
          <span className="text-black font-medium">{isEnglish ? 'Start vs Buy' : 'Kurmak vs Satın Almak'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'Start a US Company vs Buy One'
              : 'ABD\'de Şirket Kurmak mı, Satın Almak mı?'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'A strategic comparison for Turkish entrepreneurs considering either path to US market entry.'
              : 'ABD pazarına giriş için her iki yolu da değerlendiren Türk girişimciler için stratejik karşılaştırma.'}
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

          {/* Comparison Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Quick Comparison' : 'Hızlı Karşılaştırma'}</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Factor' : 'Faktör'}</th>
                    <th className="border border-gray-200 p-3 text-left bg-blue-50">{isEnglish ? 'Start New' : 'Yeni Kurmak'}</th>
                    <th className="border border-gray-200 p-3 text-left bg-green-50">{isEnglish ? 'Buy Existing' : 'Mevcut Satın Almak'}</th>
                  </tr>
                </thead>
                <tbody>
                  {(isEnglish ? [
                    { factor: 'Initial Cost', start: '$500 - $2,000', buy: '$10,000 - $1M+' },
                    { factor: 'Time to Start', start: '2-6 weeks', buy: '3-12 months' },
                    { factor: 'Existing Revenue', start: 'No', buy: 'Yes (usually)' },
                    { factor: 'Brand/Reputation', start: 'Build from scratch', buy: 'Inherited (good or bad)' },
                    { factor: 'Hidden Liabilities', start: 'None', buy: 'Possible (due diligence needed)' },
                    { factor: 'Control', start: 'Full control', buy: 'May have transition period' },
                    { factor: 'Complexity', start: 'Simpler', buy: 'More complex' },
                    { factor: 'Visa Potential (E-2)', start: 'Harder to qualify', buy: 'Often easier' },
                  ] : [
                    { factor: 'Başlangıç Maliyeti', start: '$500 - $2,000', buy: '$10,000 - $1M+' },
                    { factor: 'Başlama Süresi', start: '2-6 hafta', buy: '3-12 ay' },
                    { factor: 'Mevcut Gelir', start: 'Hayır', buy: 'Evet (genellikle)' },
                    { factor: 'Marka/İtibar', start: 'Sıfırdan inşa', buy: 'Miras (iyi veya kötü)' },
                    { factor: 'Gizli Yükümlülükler', start: 'Yok', buy: 'Olası (durum tespiti gerekli)' },
                    { factor: 'Kontrol', start: 'Tam kontrol', buy: 'Geçiş dönemi olabilir' },
                    { factor: 'Karmaşıklık', start: 'Daha basit', buy: 'Daha karmaşık' },
                    { factor: 'Vize Potansiyeli (E-2)', start: 'Hak kazanmak daha zor', buy: 'Genellikle daha kolay' },
                  ]).map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-200 p-3 font-medium">{row.factor}</td>
                      <td className="border border-gray-200 p-3 bg-blue-50/30">{row.start}</td>
                      <td className="border border-gray-200 p-3 bg-green-50/30">{row.buy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Starting New */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Option 1: Starting a New Company' : 'Seçenek 1: Yeni Şirket Kurmak'}</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h3 className="font-semibold text-green-900 mb-3">{isEnglish ? '✓ Advantages' : '✓ Avantajlar'}</h3>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• {isEnglish ? 'Low startup cost ($500-2,000)' : 'Düşük başlangıç maliyeti ($500-2.000)'}</li>
                  <li>• {isEnglish ? 'Complete control from day one' : 'İlk günden tam kontrol'}</li>
                  <li>• {isEnglish ? 'No inherited problems or debts' : 'Miras alınan sorun veya borç yok'}</li>
                  <li>• {isEnglish ? 'Build exactly what you want' : 'Tam istediğinizi inşa edin'}</li>
                  <li>• {isEnglish ? 'Faster setup (2-6 weeks)' : 'Daha hızlı kurulum (2-6 hafta)'}</li>
                  <li>• {isEnglish ? 'Simpler legal process' : 'Daha basit hukuki süreç'}</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                <h3 className="font-semibold text-red-900 mb-3">{isEnglish ? '✗ Disadvantages' : '✗ Dezavantajlar'}</h3>
                <ul className="space-y-2 text-red-800 text-sm">
                  <li>• {isEnglish ? 'No existing revenue or customers' : 'Mevcut gelir veya müşteri yok'}</li>
                  <li>• {isEnglish ? 'Need to build brand from scratch' : 'Markayı sıfırdan inşa etmek gerekiyor'}</li>
                  <li>• {isEnglish ? 'Harder to qualify for E-2 visa' : 'E-2 vizesi almak daha zor'}</li>
                  <li>• {isEnglish ? 'No proven business model' : 'Kanıtlanmış iş modeli yok'}</li>
                  <li>• {isEnglish ? 'Longer time to profitability' : 'Karlılığa kadar daha uzun süre'}</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900">{isEnglish ? 'Best For:' : 'En Uygun Olduğu Durumlar:'}</p>
              <p className="text-blue-800">
                {isEnglish
                  ? 'Entrepreneurs with a clear business idea, limited budget, or those who want to test the US market with minimal risk. Also good for service businesses where personal expertise is the main asset.'
                  : 'Net bir iş fikri olan, sınırlı bütçeli veya ABD pazarını minimum riskle test etmek isteyen girişimciler. Ayrıca kişisel uzmanlığın ana varlık olduğu hizmet işletmeleri için de iyidir.'}
              </p>
            </div>
          </section>

          {/* Buying Existing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Option 2: Buying an Existing Business' : 'Seçenek 2: Mevcut İşletme Satın Almak'}</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h3 className="font-semibold text-green-900 mb-3">{isEnglish ? '✓ Advantages' : '✓ Avantajlar'}</h3>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• {isEnglish ? 'Immediate revenue stream' : 'Anında gelir akışı'}</li>
                  <li>• {isEnglish ? 'Existing customers and brand' : 'Mevcut müşteriler ve marka'}</li>
                  <li>• {isEnglish ? 'Proven business model' : 'Kanıtlanmış iş modeli'}</li>
                  <li>• {isEnglish ? 'Easier E-2 visa qualification' : 'Daha kolay E-2 vizesi hak kazanma'}</li>
                  <li>• {isEnglish ? 'Existing staff and operations' : 'Mevcut personel ve operasyonlar'}</li>
                  <li>• {isEnglish ? 'Faster bank financing options' : 'Daha hızlı banka finansman seçenekleri'}</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                <h3 className="font-semibold text-red-900 mb-3">{isEnglish ? '✗ Disadvantages' : '✗ Dezavantajlar'}</h3>
                <ul className="space-y-2 text-red-800 text-sm">
                  <li>• {isEnglish ? 'High purchase price' : 'Yüksek satın alma fiyatı'}</li>
                  <li>• {isEnglish ? 'Hidden liabilities risk' : 'Gizli yükümlülük riski'}</li>
                  <li>• {isEnglish ? 'Complex due diligence needed' : 'Karmaşık durum tespiti gerekli'}</li>
                  <li>• {isEnglish ? 'May inherit bad reputation' : 'Kötü itibar miras alınabilir'}</li>
                  <li>• {isEnglish ? 'Transition challenges' : 'Geçiş zorlukları'}</li>
                  <li>• {isEnglish ? 'Longer, more expensive legal process' : 'Daha uzun, daha pahalı hukuki süreç'}</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900">{isEnglish ? 'Best For:' : 'En Uygun Olduğu Durumlar:'}</p>
              <p className="text-blue-800">
                {isEnglish
                  ? 'Entrepreneurs seeking E-2 visa, those with significant capital, or those wanting immediate cash flow. Also good for entering industries where building from scratch would take years.'
                  : 'E-2 vizesi arayan, önemli sermayesi olan veya anında nakit akışı isteyen girişimciler. Ayrıca sıfırdan inşa etmenin yıllar alacağı sektörlere girmek için de iyidir.'}
              </p>
            </div>
          </section>

          {/* Legal Considerations for Buying */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Critical Legal Steps When Buying' : 'Satın Alırken Kritik Hukuki Adımlar'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { step: 'Due Diligence', desc: 'Review financials, contracts, lawsuits, tax returns, employee agreements. This typically takes 30-90 days.' },
                { step: 'Asset vs Stock Purchase', desc: 'Asset purchase: buy specific assets, avoid most liabilities. Stock purchase: buy entire entity including all liabilities. Asset purchase is usually safer.' },
                { step: 'Letter of Intent (LOI)', desc: 'Non-binding agreement outlining deal terms. Important before spending money on due diligence.' },
                { step: 'Purchase Agreement', desc: 'The main legal document. Should include representations, warranties, indemnification, and escrow provisions.' },
                { step: 'Transition Planning', desc: 'How will customers, employees, and vendors be transitioned? Often requires seller involvement for 30-90 days.' },
                { step: 'Regulatory Compliance', desc: 'Some industries require license transfers or new applications. Check before closing.' },
              ] : [
                { step: 'Durum Tespiti', desc: 'Finansalları, sözleşmeleri, davaları, vergi beyannamelerini, çalışan anlaşmalarını inceleyin. Bu genellikle 30-90 gün sürer.' },
                { step: 'Varlık vs Hisse Satın Alma', desc: 'Varlık satın alma: belirli varlıkları satın alın, çoğu yükümlülükten kaçının. Hisse satın alma: tüm yükümlülükler dahil tüm varlığı satın alın. Varlık satın alma genellikle daha güvenlidir.' },
                { step: 'Niyet Mektubu (LOI)', desc: 'Anlaşma koşullarını özetleyen bağlayıcı olmayan anlaşma. Durum tespitine para harcamadan önce önemlidir.' },
                { step: 'Satın Alma Sözleşmesi', desc: 'Ana hukuki belge. Beyanlar, garantiler, tazminat ve emanet hükümleri içermelidir.' },
                { step: 'Geçiş Planlaması', desc: 'Müşteriler, çalışanlar ve satıcılar nasıl devredilecek? Genellikle 30-90 gün satıcı katılımı gerektirir.' },
                { step: 'Düzenleyici Uyum', desc: 'Bazı sektörler lisans transferleri veya yeni başvurular gerektirir. Kapanıştan önce kontrol edin.' },
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <span className="bg-[#C9A227] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{item.step}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* E-2 Visa Consideration */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'E-2 Visa Considerations' : 'E-2 Vizesi Değerlendirmeleri'}</h2>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="font-semibold text-yellow-900">{isEnglish ? 'Turkey has E-2 Treaty Status' : 'Türkiye E-2 Anlaşma Statüsüne Sahiptir'}</p>
              <p className="text-yellow-800">
                {isEnglish
                  ? 'Turkish citizens are eligible for E-2 investor visas, which require a "substantial investment" in a US business. There\'s no fixed minimum, but typically $100,000+ is expected.'
                  : 'Türk vatandaşları, ABD işletmesinde "önemli yatırım" gerektiren E-2 yatırımcı vizeleri için uygundur. Sabit bir minimum yoktur, ancak genellikle 100.000$+ beklenir.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-3">{isEnglish ? 'Starting New for E-2' : 'E-2 için Yeni Kurmak'}</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• {isEnglish ? 'Must show viable business plan' : 'Uygulanabilir iş planı göstermelisiniz'}</li>
                  <li>• {isEnglish ? 'Investment must be "at risk"' : 'Yatırım "risk altında" olmalı'}</li>
                  <li>• {isEnglish ? 'Harder to prove "not marginal"' : '"Marjinal olmadığını" kanıtlamak daha zor'}</li>
                  <li>• {isEnglish ? 'No revenue track record' : 'Gelir geçmişi yok'}</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-3">{isEnglish ? 'Buying for E-2' : 'E-2 için Satın Almak'}</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• {isEnglish ? 'Existing revenue helps prove viability' : 'Mevcut gelir uygulanabilirliği kanıtlamaya yardımcı olur'}</li>
                  <li>• {isEnglish ? 'Purchase price = clear investment amount' : 'Satın alma fiyatı = net yatırım tutarı'}</li>
                  <li>• {isEnglish ? 'Easier to show job creation' : 'İş yaratmayı göstermek daha kolay'}</li>
                  <li>• {isEnglish ? 'Historical financials available' : 'Geçmiş finansallar mevcut'}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'How to Form a US LLC →' : 'ABD LLC Nasıl Kurulur →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-llc-kurmak-kac-gun-surer`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'How Long Does LLC Formation Take? →' : 'LLC Kurmak Ne Kadar Sürer? →'}
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
