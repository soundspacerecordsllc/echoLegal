import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'How Long Does It Take to Form an LLC in the US? | EchoLegal'
    : 'ABD\'de LLC Kurmak Kaç Gün Sürer? | EchoLegal'

  const description = isEnglish
    ? 'Realistic timeline for forming a US LLC as a Turkish resident. State processing times, EIN wait times, and factors that affect speed.'
    : 'Türkiye\'den ABD LLC kurmanın gerçekçi zaman çizelgesi. Eyalet işlem süreleri, EIN bekleme süreleri ve hızı etkileyen faktörler.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-llc-kurmak-kac-gun-surer`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-llc-kurmak-kac-gun-surer',
        'tr': 'https://echo-legal.com/tr/abd-llc-kurmak-kac-gun-surer',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function LLCTimelinePage({
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
    headline: isEnglish ? 'How Long Does It Take to Form an LLC in the US?' : 'ABD\'de LLC Kurmak Kaç Gün Sürer?',
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
          <span className="text-black font-medium">{isEnglish ? 'LLC Timeline' : 'LLC Süresi'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish ? 'How Long Does It Take to Form an LLC?' : 'ABD\'de LLC Kurmak Kaç Gün Sürer?'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'The realistic timeline for forming a US LLC from Turkey: what to expect at each stage and how to speed up the process.'
              : 'Türkiye\'den ABD LLC kurmanın gerçekçi zaman çizelgesi: her aşamada ne beklenmeli ve süreci nasıl hızlandırılır.'}
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
          <div className="bg-[#C9A227]/10 border-2 border-[#C9A227] rounded-xl p-6 mb-10">
            <h2 className="font-bold text-lg mb-3">{isEnglish ? 'Quick Answer' : 'Kısa Cevap'}</h2>
            <p className="text-gray-700 mb-4">
              {isEnglish
                ? 'Total time: 2-6 weeks from Turkey. State filing takes 1-10 business days depending on the state. EIN for foreign owners adds 2-4 weeks. Expedited options can cut state processing to same-day.'
                : 'Toplam süre: Türkiye\'den 2-6 hafta. Eyalet başvurusu eyalete bağlı olarak 1-10 iş günü sürer. Yabancı sahipler için EIN 2-4 hafta ekler. Hızlandırılmış seçenekler eyalet işlemini aynı güne indirebilir.'}
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-3">
                <p className="text-2xl font-bold text-[#C9A227]">1-3</p>
                <p className="text-xs text-gray-600">{isEnglish ? 'days (Delaware)' : 'gün (Delaware)'}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-2xl font-bold text-[#C9A227]">3-5</p>
                <p className="text-xs text-gray-600">{isEnglish ? 'days (Wyoming)' : 'gün (Wyoming)'}</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-2xl font-bold text-[#C9A227]">2-4</p>
                <p className="text-xs text-gray-600">{isEnglish ? 'weeks (EIN)' : 'hafta (EIN)'}</p>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Complete Timeline Breakdown' : 'Tam Zaman Çizelgesi'}</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-semibold text-lg">{isEnglish ? 'Preparation' : 'Hazırlık'}</h3>
                  <p className="text-gray-500 text-sm mb-2">{isEnglish ? '1-2 days' : '1-2 gün'}</p>
                  <p className="text-gray-600">
                    {isEnglish
                      ? 'Choose your state, company name, and registered agent. Gather required information (address, owner details).'
                      : 'Eyalet, şirket adı ve kayıtlı temsilci seçin. Gerekli bilgileri toplayın (adres, sahip bilgileri).'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-semibold text-lg">{isEnglish ? 'State Filing (Articles of Organization)' : 'Eyalet Başvurusu (Kuruluş Sözleşmesi)'}</h3>
                  <p className="text-gray-500 text-sm mb-2">{isEnglish ? '1-10 business days (varies by state)' : '1-10 iş günü (eyalete göre değişir)'}</p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <p className="font-medium mb-2">{isEnglish ? 'Processing Times by State:' : 'Eyaletlere Göre İşlem Süreleri:'}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between"><span>Delaware</span><span className="text-green-600">1-3 gün</span></div>
                      <div className="flex justify-between"><span>Wyoming</span><span className="text-green-600">3-5 gün</span></div>
                      <div className="flex justify-between"><span>Florida</span><span className="text-yellow-600">5-7 gün</span></div>
                      <div className="flex justify-between"><span>New Mexico</span><span className="text-green-600">1-2 gün</span></div>
                      <div className="flex justify-between"><span>Texas</span><span className="text-yellow-600">3-5 gün</span></div>
                      <div className="flex justify-between"><span>California</span><span className="text-red-600">7-10 gün</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-semibold text-lg">{isEnglish ? 'EIN Application (Federal Tax ID)' : 'EIN Başvurusu (Federal Vergi Kimliği)'}</h3>
                  <p className="text-gray-500 text-sm mb-2">{isEnglish ? '2-4 weeks for foreign owners' : 'Yabancı sahipler için 2-4 hafta'}</p>
                  <p className="text-gray-600">
                    {isEnglish
                      ? 'Foreign owners cannot apply online and must fax Form SS-4 to the IRS. This is often the longest part of the process.'
                      : 'Yabancı sahipler çevrimiçi başvuru yapamaz ve SS-4 Formunu IRS\'e faks ile göndermelidir. Bu genellikle sürecin en uzun kısmıdır.'}
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mt-3">
                    <p className="text-yellow-800 text-sm">
                      {isEnglish
                        ? '💡 Tip: Some registered agents can help expedite EIN applications for foreign owners.'
                        : '💡 İpucu: Bazı kayıtlı temsilciler yabancı sahipler için EIN başvurularını hızlandırmaya yardımcı olabilir.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-semibold text-lg">{isEnglish ? 'Operating Agreement' : 'İşletme Sözleşmesi'}</h3>
                  <p className="text-gray-500 text-sm mb-2">{isEnglish ? '1-2 days' : '1-2 gün'}</p>
                  <p className="text-gray-600">
                    {isEnglish
                      ? 'Draft and sign your Operating Agreement. This can be done while waiting for state approval or EIN.'
                      : 'İşletme Sözleşmenizi hazırlayın ve imzalayın. Bu, eyalet onayı veya EIN beklerken yapılabilir.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">✓</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{isEnglish ? 'Bank Account Opening' : 'Banka Hesabı Açma'}</h3>
                  <p className="text-gray-500 text-sm mb-2">{isEnglish ? '1-7 days (after EIN)' : '1-7 gün (EIN\'den sonra)'}</p>
                  <p className="text-gray-600">
                    {isEnglish
                      ? 'Once you have your EIN and Operating Agreement, you can open a US business bank account. Mercury, Relay, and similar neobanks often approve foreign-owned LLCs faster.'
                      : 'EIN ve İşletme Sözleşmeniz olduğunda, ABD iş banka hesabı açabilirsiniz. Mercury, Relay ve benzeri neobanker, yabancılara ait LLC\'leri genellikle daha hızlı onaylar.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Expedited Options */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Expedited Filing Options' : 'Hızlandırılmış Başvuru Seçenekleri'}</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'State' : 'Eyalet'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Standard' : 'Standart'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Expedited' : 'Hızlandırılmış'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Same-Day' : 'Aynı Gün'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Delaware</td>
                    <td className="border border-gray-200 p-3">3-5 days (free)</td>
                    <td className="border border-gray-200 p-3">24hr ($100)</td>
                    <td className="border border-gray-200 p-3">Same-day ($1,000)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 p-3 font-medium">Wyoming</td>
                    <td className="border border-gray-200 p-3">3-5 days (free)</td>
                    <td className="border border-gray-200 p-3">24hr ($100)</td>
                    <td className="border border-gray-200 p-3">Same-day ($200)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Florida</td>
                    <td className="border border-gray-200 p-3">5-7 days (free)</td>
                    <td className="border border-gray-200 p-3">1-2 days ($50)</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'Not available' : 'Mevcut değil'}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 p-3 font-medium">New Mexico</td>
                    <td className="border border-gray-200 p-3">1-2 days (free)</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'N/A (already fast)' : 'Yok (zaten hızlı)'}</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'N/A' : 'Yok'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Common Delays */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What Can Cause Delays?' : 'Gecikmelere Neler Sebep Olabilir?'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { issue: 'Name already taken', solution: 'Search state database before filing. Have 2-3 backup names.' },
                { issue: 'Incorrect information on forms', solution: 'Double-check all details, especially addresses and member names.' },
                { issue: 'EIN fax issues', solution: 'Use a reliable fax service. IRS fax lines can be busy - try early morning US time.' },
                { issue: 'Missing registered agent', solution: 'Appoint a registered agent BEFORE filing. Required in all states.' },
                { issue: 'State backlog', solution: 'Check current processing times. Pay for expedited if urgent.' },
              ] : [
                { issue: 'İsim zaten alınmış', solution: 'Başvurmadan önce eyalet veritabanını arayın. 2-3 yedek isim hazırlayın.' },
                { issue: 'Formlarda yanlış bilgi', solution: 'Tüm detayları, özellikle adresleri ve üye isimlerini iki kez kontrol edin.' },
                { issue: 'EIN faks sorunları', solution: 'Güvenilir bir faks servisi kullanın. IRS faks hatları meşgul olabilir - ABD saatiyle sabah erken saatleri deneyin.' },
                { issue: 'Kayıtlı temsilci eksik', solution: 'Başvurmadan ÖNCE kayıtlı temsilci atayın. Tüm eyaletlerde zorunludur.' },
                { issue: 'Eyalet iş yükü', solution: 'Mevcut işlem sürelerini kontrol edin. Acilse hızlandırılmış için ödeme yapın.' },
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <span className="text-red-500 text-xl">⚠</span>
                  <div>
                    <p className="font-semibold">{item.issue}</p>
                    <p className="text-gray-600 text-sm">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Guides' : 'İlgili Rehberler'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Complete LLC Formation Guide →' : 'Eksiksiz LLC Kurma Rehberi →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-ein-numarasi-nasil-alinir`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'How to Get an EIN →' : 'EIN Nasıl Alınır? →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/operating-agreement-zorunlu-mu`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Is an Operating Agreement Required? →' : 'İşletme Sözleşmesi Zorunlu mu? →'}
                </Link>
              </li>
            </ul>
          </section>

        </article>
      </main>
    </>
  )
}
