import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Is a Privacy Policy Required in the US? Shopify, Etsy, Websites | EchoLegal'
    : 'ABD\'de Privacy Policy Zorunlu mu? Shopify, Etsy, Web Siteleri | EchoLegal'

  const description = isEnglish
    ? 'Learn when a privacy policy is legally required for US businesses. CCPA requirements, platform rules, and what happens without one.'
    : 'ABD işletmeleri için gizlilik politikasının ne zaman yasal olarak zorunlu olduğunu öğrenin. CCPA gereksinimleri, platform kuralları ve olmadan neler olacağı.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-privacy-policy-zorunlu-mu`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-privacy-policy-zorunlu-mu',
        'tr': 'https://echo-legal.com/tr/abd-privacy-policy-zorunlu-mu',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function PrivacyPolicyRequiredPage({
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
    headline: isEnglish ? 'Is a Privacy Policy Required in the US?' : 'ABD\'de Privacy Policy Zorunlu mu?',
    author: { '@type': 'Person', name: 'Zeynep Ruziye Moore', jobTitle: 'Licensed in New York' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'Privacy Policy Required?' : 'Privacy Policy Zorunlu mu?'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'Is a Privacy Policy Required?'
              : 'ABD\'de Privacy Policy Zorunlu mu?'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'Privacy policy requirements for e-commerce, Shopify stores, Etsy sellers, and any website serving US customers.'
              : 'E-ticaret, Shopify mağazaları, Etsy satıcıları ve ABD müşterilerine hizmet veren herhangi bir web sitesi için gizlilik politikası gereksinimleri.'}
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
            <h2 className="font-bold text-lg mb-3">{isEnglish ? 'Quick Answer: Yes' : 'Kısa Cevap: Evet'}</h2>
            <p className="text-gray-700">
              {isEnglish
                ? 'If you collect ANY personal information from website visitors (including names, emails, IP addresses, or cookies), you need a privacy policy. California law (CCPA/CPRA) requires it for businesses serving California residents, and most platforms (Shopify, Etsy, Stripe, Google) require it regardless of location.'
                : 'Web sitesi ziyaretçilerinden HERHANGİ BİR kişisel bilgi topluyorsanız (isimler, e-postalar, IP adresleri veya çerezler dahil), gizlilik politikasına ihtiyacınız var. Kaliforniya yasası (CCPA/CPRA), Kaliforniya sakinlerine hizmet veren işletmeler için bunu zorunlu kılıyor ve çoğu platform (Shopify, Etsy, Stripe, Google) konumdan bağımsız olarak bunu gerektiriyor.'}
            </p>
          </div>

          {/* Who Needs One */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Who Needs a Privacy Policy?' : 'Kimin Privacy Policy\'ye İhtiyacı Var?'}</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-green-900">{isEnglish ? 'Shopify/WooCommerce Stores' : 'Shopify/WooCommerce Mağazaları'}</p>
                  <p className="text-green-800 text-sm">{isEnglish ? 'You collect names, addresses, payment info, emails' : 'İsimler, adresler, ödeme bilgileri, e-postalar topluyorsunuz'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-green-900">{isEnglish ? 'Etsy Sellers' : 'Etsy Satıcıları'}</p>
                  <p className="text-green-800 text-sm">{isEnglish ? 'You receive customer data through Etsy + may have own website' : 'Etsy aracılığıyla müşteri verisi alıyorsunuz + kendi web siteniz olabilir'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-green-900">{isEnglish ? 'Websites with Google Analytics' : 'Google Analytics\'li Web Siteleri'}</p>
                  <p className="text-green-800 text-sm">{isEnglish ? 'IP addresses and browsing data are personal information' : 'IP adresleri ve gezinme verileri kişisel bilgidir'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-green-900">{isEnglish ? 'Sites with Contact Forms' : 'İletişim Formu Olan Siteler'}</p>
                  <p className="text-green-800 text-sm">{isEnglish ? 'You collect names and emails' : 'İsimler ve e-postalar topluyorsunuz'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-green-900">{isEnglish ? 'Email Newsletter' : 'E-posta Bülteni'}</p>
                  <p className="text-green-800 text-sm">{isEnglish ? 'You collect and store email addresses' : 'E-posta adreslerini topluyorsunuz ve saklıyorsunuz'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-green-600 text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-green-900">{isEnglish ? 'Mobile Apps' : 'Mobil Uygulamalar'}</p>
                  <p className="text-green-800 text-sm">{isEnglish ? 'App stores require privacy policies' : 'Uygulama mağazaları gizlilik politikası gerektirir'}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Requirements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'US Legal Requirements' : 'ABD Yasal Gereksinimleri'}</h2>

            <div className="space-y-6">
              <div className="border border-orange-200 rounded-lg p-5 bg-orange-50">
                <h3 className="font-semibold text-lg text-orange-900 mb-3">CCPA/CPRA (California)</h3>
                <p className="text-orange-800 text-sm mb-3">
                  {isEnglish
                    ? 'Applies if you do business with California residents AND meet any of these:'
                    : 'Kaliforniya sakinleriyle iş yapıyorsanız VE bunlardan herhangi birini karşılıyorsanız geçerlidir:'}
                </p>
                <ul className="space-y-1 text-orange-800 text-sm">
                  <li>• {isEnglish ? '$25M+ annual revenue' : 'Yıllık 25M$+ gelir'}</li>
                  <li>• {isEnglish ? 'Buy/sell/share data of 100,000+ Californians' : '100.000+ Kaliforniyalının verilerini satın alın/satın/paylaşın'}</li>
                  <li>• {isEnglish ? '50%+ revenue from selling personal info' : 'Gelirin %50+\'sı kişisel bilgi satışından'}</li>
                </ul>
                <div className="mt-3 p-3 bg-white rounded">
                  <p className="text-red-700 font-semibold">{isEnglish ? 'Penalty: Up to $7,500 per violation' : 'Ceza: İhlal başına 7.500$\'a kadar'}</p>
                </div>
              </div>

              <div className="border border-blue-200 rounded-lg p-5 bg-blue-50">
                <h3 className="font-semibold text-lg text-blue-900 mb-3">CalOPPA (California Online Privacy Protection Act)</h3>
                <p className="text-blue-800 text-sm">
                  {isEnglish
                    ? 'Applies to ANY website or app that collects personal information from California residents. No minimum thresholds. Requires conspicuously posted privacy policy.'
                    : 'Kaliforniya sakinlerinden kişisel bilgi toplayan HERHANGİ BİR web sitesi veya uygulama için geçerlidir. Minimum eşik yok. Belirgin şekilde yayınlanmış gizlilik politikası gerektirir.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-3">{isEnglish ? 'Other US States' : 'Diğer ABD Eyaletleri'}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {isEnglish
                    ? 'Virginia, Colorado, Connecticut, Utah, and other states have enacted privacy laws. By 2026, 15+ states have comprehensive privacy legislation.'
                    : 'Virginia, Colorado, Connecticut, Utah ve diğer eyaletler gizlilik yasaları çıkardı. 2026 itibarıyla 15+ eyalette kapsamlı gizlilik mevzuatı var.'}
                </p>
              </div>
            </div>
          </section>

          {/* Platform Requirements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Platform Requirements' : 'Platform Gereksinimleri'}</h2>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="font-semibold text-yellow-900">{isEnglish ? 'Important' : 'Önemli'}</p>
              <p className="text-yellow-800">
                {isEnglish
                  ? 'Even if no law applies to you, most platforms REQUIRE a privacy policy in their Terms of Service. Violating platform terms can result in account suspension or termination.'
                  : 'Hiçbir yasa sizin için geçerli olmasa bile, çoğu platform Hizmet Şartlarında gizlilik politikası GEREKTİRİR. Platform şartlarını ihlal etmek, hesap askıya alma veya sonlandırmayla sonuçlanabilir.'}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Platform' : 'Platform'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Privacy Policy Required?' : 'Privacy Policy Gerekli mi?'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Notes' : 'Notlar'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { platform: 'Shopify', required: isEnglish ? 'Yes' : 'Evet', notes: isEnglish ? 'In Terms of Service' : 'Hizmet Şartlarında' },
                    { platform: 'Etsy', required: isEnglish ? 'Yes' : 'Evet', notes: isEnglish ? 'Required for shops' : 'Mağazalar için gerekli' },
                    { platform: 'Google Analytics', required: isEnglish ? 'Yes' : 'Evet', notes: isEnglish ? 'Must disclose use' : 'Kullanımı açıklamalısınız' },
                    { platform: 'Google AdSense', required: isEnglish ? 'Yes' : 'Evet', notes: isEnglish ? 'Account requirement' : 'Hesap gereksinimi' },
                    { platform: 'Facebook/Meta Ads', required: isEnglish ? 'Yes' : 'Evet', notes: isEnglish ? 'Advertising policy' : 'Reklam politikası' },
                    { platform: 'Stripe', required: isEnglish ? 'Yes' : 'Evet', notes: isEnglish ? 'Terms of Service' : 'Hizmet Şartları' },
                    { platform: 'PayPal', required: isEnglish ? 'Yes' : 'Evet', notes: isEnglish ? 'User Agreement' : 'Kullanıcı Anlaşması' },
                    { platform: 'Apple App Store', required: isEnglish ? 'Yes' : 'Evet', notes: isEnglish ? 'Required for all apps' : 'Tüm uygulamalar için gerekli' },
                    { platform: 'Google Play Store', required: isEnglish ? 'Yes' : 'Evet', notes: isEnglish ? 'Required for all apps' : 'Tüm uygulamalar için gerekli' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-200 p-3 font-medium">{row.platform}</td>
                      <td className="border border-gray-200 p-3 text-green-600 font-medium">{row.required}</td>
                      <td className="border border-gray-200 p-3 text-gray-600">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* What Happens Without One */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Consequences of Not Having One' : 'Olmamanın Sonuçları'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { consequence: 'CCPA Fines', detail: 'Up to $7,500 per intentional violation, $2,500 per unintentional' },
                { consequence: 'Platform Bans', detail: 'Shopify, Stripe, Google can suspend your account without warning' },
                { consequence: 'Ad Account Rejection', detail: 'Google and Facebook will reject ad accounts without privacy policy' },
                { consequence: 'App Store Removal', detail: 'Apple and Google will remove your app' },
                { consequence: 'Lost Customer Trust', detail: 'Savvy customers look for privacy policies before purchasing' },
                { consequence: 'Lawsuit Risk', detail: 'Private lawsuits for data breaches have higher damages without compliance' },
              ] : [
                { consequence: 'CCPA Cezaları', detail: 'Kasıtlı ihlal başına 7.500$, kasıtsız başına 2.500$\'a kadar' },
                { consequence: 'Platform Yasakları', detail: 'Shopify, Stripe, Google hesabınızı uyarı olmadan askıya alabilir' },
                { consequence: 'Reklam Hesabı Reddi', detail: 'Google ve Facebook gizlilik politikası olmadan reklam hesaplarını reddedecek' },
                { consequence: 'Uygulama Mağazasından Kaldırma', detail: 'Apple ve Google uygulamanızı kaldıracak' },
                { consequence: 'Kaybedilen Müşteri Güveni', detail: 'Bilinçli müşteriler satın almadan önce gizlilik politikalarına bakar' },
                { consequence: 'Dava Riski', detail: 'Veri ihlalleri için özel davalar uyum olmadan daha yüksek zararlarla sonuçlanır' },
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <span className="text-red-600 text-xl">⚠</span>
                  <div>
                    <p className="font-semibold text-red-900">{item.consequence}</p>
                    <p className="text-red-800 text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/encyclopedia/privacy-policy-guide`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Complete Privacy Policy Guide (GDPR, CCPA, KVKK) →' : 'Eksiksiz Gizlilik Politikası Rehberi (GDPR, CCPA, KVKK) →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-terms-of-service-riskleri`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Risks of Not Having Terms of Service →' : 'Terms of Service Olmamanın Riskleri →'}
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
