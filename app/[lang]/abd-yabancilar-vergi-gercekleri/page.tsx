import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'US Tax Facts for Foreign Business Owners | EchoLegal'
    : 'ABD\'de Şirket Kuran Yabancılar İçin Vergi Gerçekleri | EchoLegal'

  const description = isEnglish
    ? 'Essential tax information for non-US residents owning US companies. What you actually owe, filing requirements, and common misconceptions.'
    : 'ABD şirketlerine sahip olan ABD dışı yerleşikler için temel vergi bilgileri. Gerçekte ne borçlusunuz, dosyalama gereksinimleri ve yaygın yanlış anlamalar.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-yabancilar-vergi-gercekleri`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-yabancilar-vergi-gercekleri',
        'tr': 'https://echo-legal.com/tr/abd-yabancilar-vergi-gercekleri',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function ForeignerTaxGuidePage({
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
    headline: isEnglish ? 'US Tax Facts for Foreign Business Owners' : 'ABD\'de Şirket Kuran Yabancılar İçin Vergi Gerçekleri',
    author: { '@type': 'Person', name: 'Zeynep Ruziye Moore', jobTitle: 'Licensed in New York' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'Foreigner Tax Guide' : 'Yabancılar İçin Vergi Rehberi'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'US Tax Facts for Foreign Business Owners'
              : 'ABD\'de Şirket Kuran Yabancılar İçin Vergi Gerçekleri'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'What non-US residents actually need to know about US taxes when owning a US company.'
              : 'ABD\'de şirket sahibi olurken ABD dışı yerleşiklerin vergi hakkında gerçekte bilmesi gerekenler.'}
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

          {/* Important Disclaimer */}
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-10">
            <h2 className="font-bold text-lg mb-3 text-red-900">{isEnglish ? 'Important Disclaimer' : 'Önemli Uyarı'}</h2>
            <p className="text-red-800">
              {isEnglish
                ? 'This is general information only, not tax advice. International taxation is complex and depends on your specific situation, country of residence, and applicable tax treaties. Always consult a qualified tax professional for your specific situation.'
                : 'Bu sadece genel bilgidir, vergi tavsiyesi değildir. Uluslararası vergilendirme karmaşıktır ve özel durumunuza, ikamet ülkenize ve geçerli vergi anlaşmalarına bağlıdır. Özel durumunuz için her zaman nitelikli bir vergi uzmanına danışın.'}
            </p>
          </div>

          {/* The Big Picture */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'The Big Picture: How US Taxes Work for Foreigners' : 'Genel Resim: ABD Vergileri Yabancılar İçin Nasıl Çalışır'}</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
              <p className="text-blue-900 font-medium mb-3">{isEnglish ? 'The Basic Principle:' : 'Temel İlke:'}</p>
              <p className="text-blue-800">
                {isEnglish
                  ? 'The US generally taxes based on the SOURCE of income, not the citizenship/residency of the owner. Non-resident aliens (NRAs) are typically only taxed on US-sourced income.'
                  : 'ABD genellikle gelirin KAYNAĞINA göre vergilendirir, sahibinin vatandaşlık/ikamet durumuna göre değil. Yerleşik olmayan yabancılar (NRA\'lar) genellikle yalnızca ABD kaynaklı gelir üzerinden vergilendirilir.'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-green-200 rounded-lg p-5 bg-green-50">
                <h3 className="font-semibold text-green-900 mb-2">{isEnglish ? 'Generally NOT US Taxable' : 'Genellikle ABD Vergisine Tabi DEĞİL'}</h3>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• {isEnglish ? 'Services performed entirely outside the US' : 'Tamamen ABD dışında gerçekleştirilen hizmetler'}</li>
                  <li>• {isEnglish ? 'Products sold to US customers but made/shipped from abroad' : 'ABD müşterilerine satılan ama yurt dışında üretilen/sevk edilen ürünler'}</li>
                  <li>• {isEnglish ? 'Digital services provided remotely from abroad' : 'Yurt dışından uzaktan sağlanan dijital hizmetler'}</li>
                </ul>
              </div>

              <div className="border border-red-200 rounded-lg p-5 bg-red-50">
                <h3 className="font-semibold text-red-900 mb-2">{isEnglish ? 'Generally US Taxable' : 'Genellikle ABD Vergisine Tabi'}</h3>
                <ul className="space-y-2 text-red-800 text-sm">
                  <li>• {isEnglish ? 'Services performed in the US' : 'ABD\'de gerçekleştirilen hizmetler'}</li>
                  <li>• {isEnglish ? 'Real estate income from US property' : 'ABD gayrimenkulünden elde edilen gelir'}</li>
                  <li>• {isEnglish ? 'Income effectively connected with US trade/business' : 'ABD ticaret/işiyle etkin şekilde bağlantılı gelir'}</li>
                  <li>• {isEnglish ? 'US dividends, interest (with withholding)' : 'ABD temettüleri, faiz (stopaj ile)'}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Entity Type Matters */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'How Entity Type Affects Taxes' : 'Şirket Türü Vergileri Nasıl Etkiler'}</h2>

            <div className="space-y-6">
              {/* Single-Member LLC */}
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-3">{isEnglish ? 'Single-Member LLC (Foreign-Owned)' : 'Tek Üyeli LLC (Yabancı Sahipli)'}</h3>
                <ul className="space-y-2 text-gray-700 text-sm mb-4">
                  <li>• {isEnglish ? 'Treated as a "disregarded entity" for US tax purposes' : 'ABD vergi amaçları için "göz ardı edilen kuruluş" olarak değerlendirilir'}</li>
                  <li>• {isEnglish ? 'No separate US income tax return (Form 1120) required' : 'Ayrı ABD gelir vergisi beyannamesi (Form 1120) gerekli değil'}</li>
                  <li>• {isEnglish ? 'BUT: Must file Form 5472 annually (informational return)' : 'AMA: Yıllık Form 5472 dosyalamalısınız (bilgilendirme beyannamesi)'}</li>
                  <li>• {isEnglish ? 'Must file pro forma Form 1120 with Form 5472' : 'Form 5472 ile birlikte pro forma Form 1120 dosyalamalısınız'}</li>
                </ul>
                <div className="bg-yellow-50 p-3 rounded">
                  <p className="text-yellow-800 text-sm">
                    <strong>{isEnglish ? 'Penalty:' : 'Ceza:'}</strong> {isEnglish
                      ? 'Failure to file Form 5472: $25,000 per year!'
                      : 'Form 5472 dosyalamamak: Yıllık 25.000$!'}
                  </p>
                </div>
              </div>

              {/* Multi-Member LLC */}
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-3">{isEnglish ? 'Multi-Member LLC' : 'Çok Üyeli LLC'}</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• {isEnglish ? 'Treated as partnership by default' : 'Varsayılan olarak ortaklık olarak değerlendirilir'}</li>
                  <li>• {isEnglish ? 'Must file Form 1065 (partnership return)' : 'Form 1065 (ortaklık beyannamesi) dosyalamalısınız'}</li>
                  <li>• {isEnglish ? 'Foreign partners receive K-1 and may need to file Form 1040-NR' : 'Yabancı ortaklar K-1 alır ve Form 1040-NR dosyalaması gerekebilir'}</li>
                </ul>
              </div>

              {/* C-Corporation */}
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-3">{isEnglish ? 'C-Corporation' : 'C-Corporation'}</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• {isEnglish ? 'Separate tax entity - pays corporate income tax (21%)' : 'Ayrı vergi kuruluşu - kurumlar vergisi öder (%21)'}</li>
                  <li>• {isEnglish ? 'Must file Form 1120 annually' : 'Yıllık Form 1120 dosyalamalısınız'}</li>
                  <li>• {isEnglish ? 'Dividends to foreign shareholders subject to 30% withholding (may be reduced by tax treaty)' : 'Yabancı hissedarlara temettüler %30 stopaja tabi (vergi anlaşmasıyla indirilebilir)'}</li>
                  <li>• {isEnglish ? 'May file Form 5472 if foreign ownership' : 'Yabancı sahiplik varsa Form 5472 dosyalayabilir'}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Filing Requirements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Key Filing Requirements' : 'Temel Dosyalama Gereksinimleri'}</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Form' : 'Form'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Who Files' : 'Kim Dosyalar'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Deadline' : 'Son Tarih'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Penalty' : 'Ceza'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { form: 'Form 5472', who: isEnglish ? 'Foreign-owned LLCs/Corps' : 'Yabancı sahipli LLC/Corp', deadline: isEnglish ? 'April 15 (+ extensions)' : '15 Nisan (+ uzatmalar)', penalty: '$25,000' },
                    { form: 'Form 1120', who: isEnglish ? 'C-Corps (and with 5472)' : 'C-Corp\'lar (ve 5472 ile)', deadline: isEnglish ? 'April 15 (+ extensions)' : '15 Nisan (+ uzatmalar)', penalty: isEnglish ? 'Varies' : 'Değişir' },
                    { form: 'Form 1065', who: isEnglish ? 'Multi-member LLCs' : 'Çok üyeli LLC\'ler', deadline: isEnglish ? 'March 15' : '15 Mart', penalty: isEnglish ? '$220/partner/month' : '$220/ortak/ay' },
                    { form: 'Form 1040-NR', who: isEnglish ? 'NRAs with US income' : 'ABD geliri olan NRA\'lar', deadline: isEnglish ? 'April 15 or June 15' : '15 Nisan veya 15 Haziran', penalty: isEnglish ? 'Varies' : 'Değişir' },
                    { form: 'FBAR (FinCEN 114)', who: isEnglish ? 'US accounts > $10K' : 'ABD hesapları > 10K$', deadline: isEnglish ? 'April 15 (auto ext. Oct 15)' : '15 Nisan (oto uzatma 15 Ekim)', penalty: isEnglish ? 'Up to $12,500+' : '12.500$+ kadar' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-200 p-3 font-medium">{row.form}</td>
                      <td className="border border-gray-200 p-3">{row.who}</td>
                      <td className="border border-gray-200 p-3">{row.deadline}</td>
                      <td className="border border-gray-200 p-3 text-red-600 font-medium">{row.penalty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Tax Treaties */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Tax Treaties: What They Mean for You' : 'Vergi Anlaşmaları: Sizin İçin Ne Anlama Geliyor'}</h2>

            <p className="text-gray-700 mb-4">
              {isEnglish
                ? 'The US has tax treaties with many countries that can reduce or eliminate certain taxes. Here are some examples for Turkish residents:'
                : 'ABD\'nin birçok ülkeyle belirli vergileri azaltabilen veya ortadan kaldırabilen vergi anlaşmaları vardır. Türkiye\'de yaşayanlar için bazı örnekler:'}
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
              <h3 className="font-semibold text-blue-900 mb-3">{isEnglish ? 'US-Turkey Tax Treaty Benefits' : 'ABD-Türkiye Vergi Anlaşması Faydaları'}</h3>
              <ul className="space-y-2 text-blue-800 text-sm">
                <li>• <strong>{isEnglish ? 'Dividends:' : 'Temettüler:'}</strong> {isEnglish ? 'Reduced from 30% to 15% withholding' : '%30\'dan %15 stopaja indirilmiş'}</li>
                <li>• <strong>{isEnglish ? 'Interest:' : 'Faiz:'}</strong> {isEnglish ? 'May be reduced to 10-15%' : '%10-15\'e indirilebilir'}</li>
                <li>• <strong>{isEnglish ? 'Royalties:' : 'Telif Ücretleri:'}</strong> {isEnglish ? 'Reduced to 5-10%' : '%5-10\'a indirilmiş'}</li>
                <li>• <strong>{isEnglish ? 'Business Profits:' : 'Ticari Karlar:'}</strong> {isEnglish ? 'Only taxable in US if you have a "permanent establishment"' : 'Sadece "sabit işyeriniz" varsa ABD\'de vergilendirilebilir'}</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="text-yellow-800">
                <strong>{isEnglish ? 'Note:' : 'Not:'}</strong> {isEnglish
                  ? 'To claim treaty benefits, you typically need to file Form W-8BEN (individuals) or W-8BEN-E (entities) with your US payer.'
                  : 'Anlaşma haklarından yararlanmak için genellikle ABD ödeme yapan tarafına Form W-8BEN (bireyler) veya W-8BEN-E (kuruluşlar) dosyalamanız gerekir.'}
              </p>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Common Tax Mistakes by Foreign Owners' : 'Yabancı Sahiplerin Yaygın Vergi Hataları'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { mistake: 'Not filing Form 5472', consequence: '$25,000 penalty per year - IRS actively enforces this' },
                { mistake: 'Missing filing deadlines', consequence: 'Late filing penalties add up quickly, especially for partnerships' },
                { mistake: 'Not understanding "disregarded entity" status', consequence: 'Wrong assumptions about tax obligations' },
                { mistake: 'Ignoring state taxes', consequence: 'Some states (like California) have franchise taxes regardless of income' },
                { mistake: 'Treating all income as non-US sourced', consequence: 'May owe taxes on income you thought was exempt' },
                { mistake: 'Not keeping proper records', consequence: 'Cannot prove income source or deductions if audited' },
                { mistake: 'DIY complex international tax', consequence: 'Missing deductions, credits, or making costly errors' },
              ] : [
                { mistake: 'Form 5472 dosyalamamak', consequence: 'Yıllık 25.000$ ceza - IRS bunu aktif olarak uygular' },
                { mistake: 'Dosyalama son tarihlerini kaçırmak', consequence: 'Geç dosyalama cezaları hızla birikir, özellikle ortaklıklar için' },
                { mistake: '"Göz ardı edilen kuruluş" statüsünü anlamamak', consequence: 'Vergi yükümlülükleri hakkında yanlış varsayımlar' },
                { mistake: 'Eyalet vergilerini göz ardı etmek', consequence: 'Bazı eyaletler (Kaliforniya gibi) gelirden bağımsız franchise vergilerine sahip' },
                { mistake: 'Tüm geliri ABD dışı kaynaklı olarak değerlendirmek', consequence: 'Muaf sandığınız gelir üzerinden vergi borçlu olabilirsiniz' },
                { mistake: 'Düzgün kayıt tutmamak', consequence: 'Denetlenirseniz gelir kaynağını veya kesintileri kanıtlayamazsınız' },
                { mistake: 'Karmaşık uluslararası vergiyi kendiniz yapmak', consequence: 'Kesintileri, kredileri kaçırmak veya maliyetli hatalar yapmak' },
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <span className="text-red-600 text-xl">✗</span>
                  <div>
                    <p className="font-semibold text-red-900">{item.mistake}</p>
                    <p className="text-red-800 text-sm">{item.consequence}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* State Taxes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Don\'t Forget State Taxes' : 'Eyalet Vergilerini Unutmayın'}</h2>

            <p className="text-gray-700 mb-4">
              {isEnglish
                ? 'Even if you owe no federal income tax, some states charge annual fees or taxes:'
                : 'Federal gelir vergisi borçlu olmasanız bile, bazı eyaletler yıllık ücretler veya vergiler alır:'}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'State' : 'Eyalet'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Annual Fee/Tax' : 'Yıllık Ücret/Vergi'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Notes' : 'Notlar'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { state: 'Delaware', fee: '$300', notes: isEnglish ? 'Annual franchise tax (LLC)' : 'Yıllık franchise vergisi (LLC)' },
                    { state: 'California', fee: '$800', notes: isEnglish ? 'Minimum franchise tax (regardless of income)' : 'Minimum franchise vergisi (gelirden bağımsız)' },
                    { state: 'Wyoming', fee: '$60', notes: isEnglish ? 'Annual report fee only' : 'Sadece yıllık rapor ücreti' },
                    { state: 'New Mexico', fee: '$0', notes: isEnglish ? 'No annual fees for LLCs' : 'LLC\'ler için yıllık ücret yok' },
                    { state: 'Texas', fee: isEnglish ? '$0 (usually)' : '$0 (genellikle)', notes: isEnglish ? 'No franchise tax if revenue < $2.47M' : 'Gelir < 2.47M$ ise franchise vergisi yok' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-200 p-3 font-medium">{row.state}</td>
                      <td className="border border-gray-200 p-3">{row.fee}</td>
                      <td className="border border-gray-200 p-3 text-gray-600">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}</h2>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'If I have no US income, do I still need to file?' : 'ABD gelirim yoksa yine de dosyalamam gerekir mi?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'Yes, if you have a foreign-owned LLC, you must file Form 5472 regardless of income. This is an informational return about transactions with related parties.'
                    : 'Evet, yabancı sahipli LLC\'niz varsa, gelirden bağımsız olarak Form 5472 dosyalamalısınız. Bu, ilişkili taraflarla yapılan işlemler hakkında bilgilendirme beyannamesidir.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'Do I need a US tax professional?' : 'ABD vergi uzmanına ihtiyacım var mı?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'Strongly recommended for international tax situations. The cost is typically $500-2,000/year but saves you from penalties that can be $25,000 or more.'
                    : 'Uluslararası vergi durumları için şiddetle tavsiye edilir. Maliyet genellikle yıllık 500-2.000$ ama sizi 25.000$ veya daha fazla olabilen cezalardan korur.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'Will I be double-taxed by my home country?' : 'Kendi ülkem tarafından çifte vergilendirilir miyim?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'Depends on your country\'s tax laws and any tax treaty. Many countries offer foreign tax credits or exemptions. Consult a tax professional who knows both countries\' laws.'
                    : 'Ülkenizin vergi yasalarına ve herhangi bir vergi anlaşmasına bağlıdır. Birçok ülke yabancı vergi kredileri veya muafiyetler sunar. Her iki ülkenin yasalarını bilen bir vergi uzmanına danışın.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'Should I elect to be taxed as a C-Corp?' : 'C-Corp olarak vergilendirilmeyi seçmeli miyim?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'It depends. C-Corp status means the entity pays 21% corporate tax, but you avoid Form 5472 complexity. Distributions are taxed again (double taxation). Consult a professional to analyze your specific situation.'
                    : 'Duruma bağlı. C-Corp statüsü, kuruluşun %21 kurumlar vergisi ödemesi anlamına gelir, ama Form 5472 karmaşıklığından kaçınırsınız. Dağıtımlar tekrar vergilendirilir (çifte vergilendirme). Özel durumunuzu analiz etmesi için bir profesyonele danışın.'}
                </p>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/w-8ben-formu-nasil-doldurulur`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'How to Fill Out W-8BEN Form →' : 'W-8BEN Formu Nasıl Doldurulur? →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-ein-numarasi-nasil-alinir`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'How to Get an EIN Number →' : 'EIN Numarası Nasıl Alınır? →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-llc-irs-mektubu-neden-gelir`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Why You Got a Letter from the IRS →' : 'IRS\'den Neden Mektup Geldi? →'}
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
