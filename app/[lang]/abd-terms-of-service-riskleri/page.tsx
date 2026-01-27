import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Risks of Not Having Terms of Service in the US | EchoLegal'
    : 'ABD\'de Terms of Service Olmadan İş Yapmanın Riskleri | EchoLegal'

  const description = isEnglish
    ? 'Learn why Terms of Service are essential for US businesses. Legal risks, liability protection, and what happens without proper TOS.'
    : 'ABD işletmeleri için Hizmet Şartlarının neden gerekli olduğunu öğrenin. Yasal riskler, sorumluluk koruması ve düzgün TOS olmadan neler olacağı.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-terms-of-service-riskleri`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-terms-of-service-riskleri',
        'tr': 'https://echo-legal.com/tr/abd-terms-of-service-riskleri',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function TermsOfServiceRisksPage({
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
    headline: isEnglish ? 'Risks of Not Having Terms of Service in the US' : 'ABD\'de Terms of Service Olmadan İş Yapmanın Riskleri',
    author: { '@type': 'Person', name: 'Zeynep Ruziye Moore', jobTitle: 'Licensed in New York' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'Terms of Service Risks' : 'TOS Riskleri'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'Risks of Not Having Terms of Service'
              : 'ABD\'de Terms of Service Olmadan İş Yapmanın Riskleri'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'Why every US business needs Terms of Service - and what you\'re exposing yourself to without them.'
              : 'Neden her ABD işletmesinin Hizmet Şartlarına ihtiyacı var - ve onlar olmadan kendinizi neye maruz bırakıyorsunuz.'}
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
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-10">
            <h2 className="font-bold text-lg mb-3 text-red-900">{isEnglish ? 'The Short Answer: Major Risk' : 'Kısa Cevap: Büyük Risk'}</h2>
            <p className="text-red-800">
              {isEnglish
                ? 'Without Terms of Service, you have no legal contract with your users. This means no limitation of liability, no dispute resolution process, no intellectual property protection, and no ability to terminate accounts for abuse. Every lawsuit becomes harder to defend.'
                : 'Hizmet Şartları olmadan, kullanıcılarınızla yasal bir sözleşmeniz yok. Bu, sorumluluk sınırlaması yok, uyuşmazlık çözüm süreci yok, fikri mülkiyet koruması yok ve kötüye kullanım için hesapları sonlandırma yeteneği yok demektir. Her dava savunması zorlaşır.'}
            </p>
          </div>

          {/* What Are Terms of Service */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What Are Terms of Service?' : 'Terms of Service Nedir?'}</h2>

            <p className="text-gray-700 mb-4">
              {isEnglish
                ? 'Terms of Service (TOS), also called Terms and Conditions or Terms of Use, is a legally binding contract between you and your users. It defines the rules for using your website, app, or service.'
                : 'Hizmet Şartları (TOS), Şartlar ve Koşullar veya Kullanım Şartları olarak da adlandırılan, siz ve kullanıcılarınız arasında yasal olarak bağlayıcı bir sözleşmedir. Web sitenizi, uygulamanızı veya hizmetinizi kullanma kurallarını tanımlar.'}
            </p>

            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="font-semibold mb-3">{isEnglish ? 'What TOS Typically Covers:' : 'TOS Genellikle Neyi Kapsar:'}</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {isEnglish ? 'User rights and responsibilities' : 'Kullanıcı hakları ve sorumlulukları'}</li>
                <li>• {isEnglish ? 'Acceptable use policies' : 'Kabul edilebilir kullanım politikaları'}</li>
                <li>• {isEnglish ? 'Intellectual property rights' : 'Fikri mülkiyet hakları'}</li>
                <li>• {isEnglish ? 'Limitation of liability' : 'Sorumluluk sınırlaması'}</li>
                <li>• {isEnglish ? 'Dispute resolution (arbitration, jurisdiction)' : 'Uyuşmazlık çözümü (tahkim, yargı yetkisi)'}</li>
                <li>• {isEnglish ? 'Account termination rights' : 'Hesap sonlandırma hakları'}</li>
                <li>• {isEnglish ? 'Payment terms and refund policies' : 'Ödeme şartları ve iade politikaları'}</li>
                <li>• {isEnglish ? 'Warranty disclaimers' : 'Garanti feragatnameleri'}</li>
              </ul>
            </div>
          </section>

          {/* The 7 Major Risks */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? '7 Major Risks Without Terms of Service' : 'Terms of Service Olmadan 7 Büyük Risk'}</h2>

            <div className="space-y-6">
              {/* Risk 1 */}
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-bold text-lg mb-2">
                  <span className="text-red-600 mr-2">1.</span>
                  {isEnglish ? 'Unlimited Liability' : 'Sınırsız Sorumluluk'}
                </h3>
                <p className="text-gray-700 mb-3">
                  {isEnglish
                    ? 'Without a limitation of liability clause, you can be sued for the full amount of any damages a user claims - even millions of dollars for perceived harm.'
                    : 'Sorumluluk sınırlama maddesi olmadan, bir kullanıcının iddia ettiği zararların tamamı için dava edilebilirsiniz - algılanan zarar için milyonlarca dolar bile.'}
                </p>
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-red-800 text-sm">
                    <strong>{isEnglish ? 'Real Example:' : 'Gerçek Örnek:'}</strong> {isEnglish
                      ? 'A user loses data due to a glitch. Without TOS, they can sue for full business losses, not just a refund.'
                      : 'Bir kullanıcı bir aksaklık nedeniyle veri kaybeder. TOS olmadan, sadece iade değil, tam iş kayıpları için dava açabilirler.'}
                  </p>
                </div>
              </div>

              {/* Risk 2 */}
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-bold text-lg mb-2">
                  <span className="text-red-600 mr-2">2.</span>
                  {isEnglish ? 'Class Action Vulnerability' : 'Toplu Dava Açığı'}
                </h3>
                <p className="text-gray-700 mb-3">
                  {isEnglish
                    ? 'Many TOS include arbitration clauses and class action waivers. Without these, disgruntled users can band together for class action lawsuits - which are exponentially more expensive to defend.'
                    : 'Birçok TOS tahkim maddeleri ve toplu dava feragatnameleri içerir. Bunlar olmadan, memnun olmayan kullanıcılar toplu dava için bir araya gelebilir - savunması katlanarak daha pahalıdır.'}
                </p>
              </div>

              {/* Risk 3 */}
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-bold text-lg mb-2">
                  <span className="text-red-600 mr-2">3.</span>
                  {isEnglish ? 'No Control Over User Behavior' : 'Kullanıcı Davranışı Üzerinde Kontrol Yok'}
                </h3>
                <p className="text-gray-700 mb-3">
                  {isEnglish
                    ? 'Without an acceptable use policy, you have no clear grounds to ban users who abuse your platform, post harmful content, or engage in illegal activities.'
                    : 'Kabul edilebilir kullanım politikası olmadan, platformunuzu kötüye kullanan, zararlı içerik yayınlayan veya yasadışı faaliyetlerde bulunan kullanıcıları yasaklamak için net bir gerekçeniz yok.'}
                </p>
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-red-800 text-sm">
                    <strong>{isEnglish ? 'Problem:' : 'Sorun:'}</strong> {isEnglish
                      ? 'Banned users can sue you for arbitrary termination and potentially win.'
                      : 'Yasaklanan kullanıcılar sizi keyfi sonlandırma için dava edebilir ve potansiyel olarak kazanabilir.'}
                  </p>
                </div>
              </div>

              {/* Risk 4 */}
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-bold text-lg mb-2">
                  <span className="text-red-600 mr-2">4.</span>
                  {isEnglish ? 'Intellectual Property Theft' : 'Fikri Mülkiyet Hırsızlığı'}
                </h3>
                <p className="text-gray-700 mb-3">
                  {isEnglish
                    ? 'Without IP clauses, users may claim ownership of content they upload, or argue they can freely copy your content, branding, or features.'
                    : 'Fikri mülkiyet maddeleri olmadan, kullanıcılar yükledikleri içeriğin sahipliğini iddia edebilir veya içeriğinizi, markanızı veya özelliklerinizi serbestçe kopyalayabileceklerini savunabilir.'}
                </p>
              </div>

              {/* Risk 5 */}
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-bold text-lg mb-2">
                  <span className="text-red-600 mr-2">5.</span>
                  {isEnglish ? 'Unfavorable Jurisdiction' : 'Olumsuz Yargı Yetkisi'}
                </h3>
                <p className="text-gray-700 mb-3">
                  {isEnglish
                    ? 'Without a governing law clause, users can sue you in their local jurisdiction - potentially forcing you to defend lawsuits across the country or internationally.'
                    : 'Yönetim hukuku maddesi olmadan, kullanıcılar sizi yerel yargı bölgelerinde dava edebilir - potansiyel olarak sizi ülke genelinde veya uluslararası alanda davaları savunmaya zorlayabilir.'}
                </p>
                <div className="bg-red-50 p-3 rounded">
                  <p className="text-red-800 text-sm">
                    <strong>{isEnglish ? 'Cost Impact:' : 'Maliyet Etkisi:'}</strong> {isEnglish
                      ? 'Defending a lawsuit in a distant jurisdiction can cost 2-3x more in legal fees and travel.'
                      : 'Uzak bir yargı bölgesinde dava savunması yasal ücretler ve seyahatte 2-3 kat daha fazla maliyete neden olabilir.'}
                  </p>
                </div>
              </div>

              {/* Risk 6 */}
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-bold text-lg mb-2">
                  <span className="text-red-600 mr-2">6.</span>
                  {isEnglish ? 'Refund Chaos' : 'İade Kaosu'}
                </h3>
                <p className="text-gray-700 mb-3">
                  {isEnglish
                    ? 'Without clear payment terms, users can demand refunds at any time for any reason. Credit card companies will side with customers in disputes when you have no documented policy.'
                    : 'Net ödeme şartları olmadan, kullanıcılar herhangi bir zamanda herhangi bir nedenle iade talep edebilir. Belgelenmiş politikanız olmadığında kredi kartı şirketleri anlaşmazlıklarda müşterilerin tarafını tutacaktır.'}
                </p>
              </div>

              {/* Risk 7 */}
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-bold text-lg mb-2">
                  <span className="text-red-600 mr-2">7.</span>
                  {isEnglish ? 'Warranty Claims' : 'Garanti Talepleri'}
                </h3>
                <p className="text-gray-700 mb-3">
                  {isEnglish
                    ? 'Without warranty disclaimers, users may claim implied warranties exist - that your product or service will work perfectly for their specific needs. This creates liability for any disappointment.'
                    : 'Garanti feragatnameleri olmadan, kullanıcılar zımni garantilerin var olduğunu iddia edebilir - ürününüzün veya hizmetinizin belirli ihtiyaçları için mükemmel çalışacağını. Bu, herhangi bir hayal kırıklığı için sorumluluk yaratır.'}
                </p>
              </div>
            </div>
          </section>

          {/* Who Needs TOS */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Who Needs Terms of Service?' : 'Kimin Hizmet Şartlarına İhtiyacı Var?'}</h2>

            <div className="space-y-4">
              {[
                { type: isEnglish ? 'E-commerce Stores' : 'E-ticaret Mağazaları', reason: isEnglish ? 'Payment terms, returns, liability for products' : 'Ödeme şartları, iadeler, ürünler için sorumluluk' },
                { type: isEnglish ? 'SaaS/Software' : 'SaaS/Yazılım', reason: isEnglish ? 'Service availability, data ownership, termination' : 'Hizmet kullanılabilirliği, veri sahipliği, sonlandırma' },
                { type: isEnglish ? 'Marketplaces' : 'Pazaryerleri', reason: isEnglish ? 'Buyer/seller disputes, commission terms' : 'Alıcı/satıcı anlaşmazlıkları, komisyon şartları' },
                { type: isEnglish ? 'Content Platforms' : 'İçerik Platformları', reason: isEnglish ? 'User-generated content, copyright, moderation' : 'Kullanıcı tarafından oluşturulan içerik, telif hakkı, moderasyon' },
                { type: isEnglish ? 'Mobile Apps' : 'Mobil Uygulamalar', reason: isEnglish ? 'App store requirements, in-app purchases' : 'Uygulama mağazası gereksinimleri, uygulama içi satın almalar' },
                { type: isEnglish ? 'Freelance Services' : 'Freelance Hizmetler', reason: isEnglish ? 'Scope of work, revisions, payment terms' : 'İş kapsamı, revizyonlar, ödeme şartları' },
                { type: isEnglish ? 'Membership Sites' : 'Üyelik Siteleri', reason: isEnglish ? 'Subscription terms, cancellation, access rights' : 'Abonelik şartları, iptal, erişim hakları' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <span className="text-[#C9A227] text-2xl">●</span>
                  <div>
                    <p className="font-semibold text-black">{item.type}</p>
                    <p className="text-gray-600 text-sm">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TOS vs Privacy Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Terms of Service vs Privacy Policy' : 'Hizmet Şartları vs Gizlilik Politikası'}</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-4">
              <p className="text-blue-800">
                {isEnglish
                  ? 'These are two different documents that serve different purposes. Most businesses need BOTH.'
                  : 'Bunlar farklı amaçlara hizmet eden iki farklı belgedir. Çoğu işletmenin HER İKİSİNE DE ihtiyacı var.'}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Aspect' : 'Yön'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Terms of Service' : 'Hizmet Şartları'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      aspect: isEnglish ? 'Purpose' : 'Amaç',
                      tos: isEnglish ? 'Rules for using your service' : 'Hizmetinizi kullanma kuralları',
                      pp: isEnglish ? 'How you handle user data' : 'Kullanıcı verilerini nasıl işlediğiniz'
                    },
                    {
                      aspect: isEnglish ? 'Legally Required?' : 'Yasal Olarak Zorunlu mu?',
                      tos: isEnglish ? 'No (but strongly recommended)' : 'Hayır (ama şiddetle tavsiye edilir)',
                      pp: isEnglish ? 'Yes (in many cases)' : 'Evet (birçok durumda)'
                    },
                    {
                      aspect: isEnglish ? 'Main Benefit' : 'Ana Fayda',
                      tos: isEnglish ? 'Limits your liability' : 'Sorumluluğunuzu sınırlar',
                      pp: isEnglish ? 'Legal compliance' : 'Yasal uyumluluk'
                    },
                    {
                      aspect: isEnglish ? 'Who It Protects' : 'Kimi Korur',
                      tos: isEnglish ? 'Primarily YOU' : 'Öncelikle SİZİ',
                      pp: isEnglish ? 'Primarily USERS' : 'Öncelikle KULLANICILARI'
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-200 p-3 font-medium">{row.aspect}</td>
                      <td className="border border-gray-200 p-3">{row.tos}</td>
                      <td className="border border-gray-200 p-3">{row.pp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Key Clauses */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Essential TOS Clauses' : 'Temel TOS Maddeleri'}</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { clause: isEnglish ? 'Limitation of Liability' : 'Sorumluluk Sınırlaması', importance: isEnglish ? 'Caps damages you can be sued for' : 'Dava edilebileceğiniz zararları sınırlar' },
                { clause: isEnglish ? 'Arbitration Clause' : 'Tahkim Maddesi', importance: isEnglish ? 'Avoids expensive court litigation' : 'Pahalı mahkeme davalarından kaçınır' },
                { clause: isEnglish ? 'Governing Law' : 'Yönetim Hukuku', importance: isEnglish ? 'Sets which jurisdiction applies' : 'Hangi yargı yetkisinin geçerli olduğunu belirler' },
                { clause: isEnglish ? 'Acceptable Use' : 'Kabul Edilebilir Kullanım', importance: isEnglish ? 'Defines prohibited behavior' : 'Yasaklı davranışları tanımlar' },
                { clause: isEnglish ? 'Termination Rights' : 'Sonlandırma Hakları', importance: isEnglish ? 'Your right to ban users' : 'Kullanıcıları yasaklama hakkınız' },
                { clause: isEnglish ? 'IP Ownership' : 'Fikri Mülkiyet Sahipliği', importance: isEnglish ? 'Protects your content and brand' : 'İçeriğinizi ve markanızı korur' },
                { clause: isEnglish ? 'Warranty Disclaimer' : 'Garanti Feragatnamesi', importance: isEnglish ? 'Limits "as-is" expectations' : '"Olduğu gibi" beklentilerini sınırlar' },
                { clause: isEnglish ? 'Modification Rights' : 'Değişiklik Hakları', importance: isEnglish ? 'Your right to update terms' : 'Şartları güncelleme hakkınız' },
              ].map((item, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg">
                  <p className="font-semibold text-black">{item.clause}</p>
                  <p className="text-gray-600 text-sm">{item.importance}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}</h2>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'Can I use a template TOS?' : 'Şablon TOS kullanabilir miyim?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'Templates can be a starting point, but generic TOS often miss industry-specific risks. For significant businesses, customized terms are recommended.'
                    : 'Şablonlar başlangıç noktası olabilir, ancak genel TOS genellikle sektöre özgü riskleri kaçırır. Önemli işletmeler için özelleştirilmiş şartlar önerilir.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'Do users need to click "I agree"?' : 'Kullanıcıların "Kabul ediyorum" tıklaması gerekir mi?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? '"Clickwrap" agreements (requiring a click) are more enforceable than "browsewrap" (just having a link in the footer). For important transactions, require affirmative agreement.'
                    : '"Clickwrap" anlaşmaları (tıklama gerektiren), "browsewrap"tan (sadece alt bilgide bir bağlantı bulundurmak) daha uygulanabilirdir. Önemli işlemler için olumlu onay isteyin.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'Can I change my TOS after users agree?' : 'Kullanıcılar kabul ettikten sonra TOS\'umu değiştirebilir miyim?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'Yes, if your TOS includes a modification clause. Best practice is to notify users of material changes and give them the option to cancel.'
                    : 'Evet, TOS\'unuz bir değişiklik maddesi içeriyorsa. En iyi uygulama, kullanıcıları önemli değişiklikler hakkında bilgilendirmek ve iptal seçeneği sunmaktır.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-semibold mb-2">{isEnglish ? 'Are arbitration clauses enforceable?' : 'Tahkim maddeleri uygulanabilir mi?'}</h3>
                <p className="text-gray-600">
                  {isEnglish
                    ? 'Generally yes, under the Federal Arbitration Act. However, some states have limitations, and consumer protection laws may override certain provisions.'
                    : 'Federal Tahkim Yasası kapsamında genellikle evet. Ancak bazı eyaletlerin sınırlamaları var ve tüketici koruma yasaları belirli hükümleri geçersiz kılabilir.'}
                </p>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/abd-privacy-policy-zorunlu-mu`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Is a Privacy Policy Required? →' : 'Privacy Policy Zorunlu mu? →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/service-agreement-neden-gerekli`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Why Service Agreements Matter →' : 'Service Agreement Neden Gerekli? →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-sirket-kuran-turklerin-hatalari`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? '7 Legal Mistakes to Avoid →' : 'Kaçınılması Gereken 7 Hukuki Hata →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-freelancer-hukuki-rehber`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Complete US Freelancer Legal Guide →' : 'ABD Freelancer Hukuki Rehberi →'}
                </Link>
              </li>
            </ul>
          </section>

        </article>
      </main>
    </>
  )
}
