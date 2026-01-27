import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Is a Privacy Policy Required in the US? Legal Obligations & Platform Rules | EchoLegal'
    : 'ABD\'de Privacy Policy (Gizlilik Politikası) Zorunlu mu? Yasal Yükümlülükler | EchoLegal'

  const description = isEnglish
    ? 'Comprehensive guide to US privacy policy requirements. Federal and state laws (CCPA, CalOPPA), platform obligations, penalties, and how to protect your business.'
    : 'ABD gizlilik politikası yükümlülüklerinin kapsamlı rehberi. Federal ve eyalet yasaları (CCPA, CalOPPA), platform zorunlulukları, yaptırımlar ve işletmenizi nasıl korursunuz.'

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

  const faqItems = isEnglish ? [
    { q: 'Is a privacy policy legally required in the US?', a: 'There is no single federal law requiring all websites to have a privacy policy. However, California\'s CalOPPA applies to any site collecting data from California residents, and CCPA imposes additional obligations on qualifying businesses. Most platforms also contractually require one.' },
    { q: 'What happens if I don\'t have a privacy policy?', a: 'Depending on the jurisdiction, fines can reach $7,500 per violation under CCPA. Platforms like Shopify, Stripe, Google, and Apple may suspend or terminate your account. Ad networks will reject your campaigns.' },
    { q: 'Does my Shopify or Etsy store need a privacy policy?', a: 'Yes. Both Shopify and Etsy require merchants to maintain a privacy policy as a condition of using the platform, independent of any legal obligation.' },
    { q: 'Do I need a privacy policy if I only use Google Analytics?', a: 'Yes. Google Analytics collects IP addresses, device data, and browsing behavior, all of which constitute personal information under California law. Google\'s Terms of Service also require you to disclose its use.' },
    { q: 'Can I use a free privacy policy generator?', a: 'Generic generators produce boilerplate text that may not accurately reflect your data practices. An inaccurate privacy policy can create more legal risk than having none at all. A policy should describe your actual data collection, use, and sharing practices.' },
  ] : [
    { q: 'ABD\'de gizlilik politikası yasal olarak zorunlu mu?', a: 'Tüm web sitelerini kapsayan tek bir federal yasa yoktur. Ancak Kaliforniya\'nın CalOPPA yasası, Kaliforniya sakinlerinden veri toplayan her siteye uygulanır ve CCPA belirli koşulları karşılayan işletmelere ek yükümlülükler getirir. Ayrıca platformların büyük çoğunluğu sözleşmesel olarak gizlilik politikası bulundurmayı şart koşar.' },
    { q: 'Gizlilik politikam yoksa ne olur?', a: 'Yargı bölgesine bağlı olarak CCPA kapsamında ihlal başına 7.500 dolara varan para cezaları uygulanabilir. Shopify, Stripe, Google ve Apple gibi platformlar hesabınızı askıya alabilir veya kapatabilir. Reklam ağları kampanyalarınızı reddeder.' },
    { q: 'Shopify veya Etsy mağazam için gizlilik politikası gerekli mi?', a: 'Evet. Hem Shopify hem de Etsy, herhangi bir yasal zorunluluktan bağımsız olarak, platform kullanım koşulları gereği satıcılardan gizlilik politikası bulundurmalarını şart koşar.' },
    { q: 'Sadece Google Analytics kullanıyorsam da gizlilik politikası gerekli mi?', a: 'Evet. Google Analytics; IP adresleri, cihaz bilgileri ve gezinme davranışı gibi verileri toplar — bunların tümü Kaliforniya yasalarına göre kişisel bilgi sayılır. Ayrıca Google\'ın Hizmet Şartları, Analytics kullanımınızı ziyaretçilerinize açıklamanızı zorunlu kılar.' },
    { q: 'Ücretsiz gizlilik politikası oluşturucusu kullanabilir miyim?', a: 'Otomatik oluşturucular, gerçek veri uygulamalarınızı yansıtmayan şablon metinler üretir. Gerçeği yansıtmayan bir gizlilik politikası, hiç bulundurmamaktan daha fazla hukuki risk doğurabilir. Politikanız, fiili veri toplama, kullanma ve paylaşma uygulamalarınızı tanımlamalıdır.' },
  ]

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: isEnglish ? 'Is a Privacy Policy Required in the US?' : 'ABD\'de Privacy Policy (Gizlilik Politikası) Zorunlu mu?',
      author: {
        '@type': 'Person',
        name: 'Zeynep Ruziye Moore',
        jobTitle: isEnglish ? 'Attorney, New York Bar' : 'Avukat, New York Barosu',
      },
      datePublished: '2026-01-15',
      dateModified: '2026-01-27',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' / '}
          <Link href={`/${lang}/abd-sirket-kuran-turklerin-hatalari`} className="hover:text-black">{isEnglish ? 'Legal Mistakes' : 'Hukuki Hatalar'}</Link>
          {' / '}
          <span className="text-black font-medium">{isEnglish ? 'Privacy Policy Required?' : 'Privacy Policy Zorunlu mu?'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'Is a Privacy Policy Required in the US?'
              : 'ABD\'de Gizlilik Politikası (Privacy Policy) Zorunlu mu?'}
          </h1>

          {/* Snippet-optimized direct answer */}
          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'Any business that collects personal data from users — including names, emails, IP addresses, or cookies — is subject to privacy policy requirements under California law and most major platform terms of service. While no single federal statute mandates a privacy policy for all US websites, the practical reality is that operating without one exposes businesses to state-level fines, platform account suspensions, and civil liability.'
              : 'Kullanıcılardan herhangi bir kişisel veri toplayan işletmeler — isim, e-posta, IP adresi veya çerez fark etmez — Kaliforniya yasaları ve büyük platformların kullanım koşulları kapsamında gizlilik politikası yükümlülüğüne tabidir. Her ne kadar tüm ABD web sitelerini kapsayan tek bir federal yasa bulunmasa da, gizlilik politikası olmadan faaliyet göstermek eyalet düzeyinde para cezalarına, platform hesaplarının askıya alınmasına ve hukuki sorumluluğa yol açabilir.'}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">ZM</div>
              <div>
                <p className="font-medium text-black">Zeynep Ruziye Moore</p>
                <p>{isEnglish ? 'Attorney, New York Bar | US-Turkey Legal Practice' : 'Avukat, New York Barosu | ABD-Turkiye Hukuk Pratigi'}</p>
              </div>
            </div>
            <span>|</span>
            <span>{isEnglish ? 'Updated: January 2026' : 'Guncelleme: Ocak 2026'}</span>
          </div>

          {/* Federal and State Legal Framework */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Federal and State Legal Framework' : 'Federal ve Eyalet Yasal Cercevesi'}</h2>

            <p className="text-gray-700 mb-6">
              {isEnglish
                ? 'The United States does not have a single, comprehensive federal privacy law equivalent to the European Union\'s GDPR. Instead, privacy obligations arise from a patchwork of state laws, sector-specific federal regulations, and contractual requirements imposed by platforms and payment processors.'
                : 'Amerika Birlesik Devletleri\'nde, Avrupa Birligi\'nin GDPR\'sine denk tek bir kapsamli federal gizlilik yasasi bulunmamaktadir. Bunun yerine gizlilik yukumlulukleri; eyalet yasalari, sektore ozel federal duzenlemeler ve platformlar ile odeme islemcilerinin sozlesmesel gereksinimleri olmak uzere farkli kaynaklardan dogmaktadir.'}
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-[#C9A227] pl-6">
                <h3 className="font-bold text-lg mb-2">CalOPPA (California Online Privacy Protection Act)</h3>
                <p className="text-gray-700 mb-2">
                  {isEnglish
                    ? 'CalOPPA is the broadest US privacy notice law. It applies to any website or online service that collects personally identifiable information from California residents — regardless of where the business is located. Because California has over 39 million residents and virtually any internet-facing business may attract Californian visitors, CalOPPA effectively functions as a nationwide standard.'
                    : 'CalOPPA, ABD\'nin en genis kapsamli gizlilik bildirimi yasasidir. Kaliforniya sakinlerinden kisisel tanimlayici bilgi toplayan tum web siteleri ve cevrimici hizmetler icin gecerlidir — isletmenin bulundugu yer fark etmez. Kaliforniya\'nin 39 milyonu askin nufusu ve internete acik hemen her isletmenin Kaliforniyali ziyaretci cekme olasiligi goz onune alindiginda, CalOPPA fiilen ulke capinda bir standart islevi gormektedir.'}
                </p>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'Requirements: Conspicuously posted privacy policy, description of data collected, third-party sharing practices, and how users can review or request changes to their data.'
                    : 'Gereksinimler: Acikca yayimlanan gizlilik politikasi, toplanan verilerin tanimlari, ucuncu taraflarla paylasim uygulamalari ve kullanicilarin verilerini nasil inceleyip degisiklik isteyebilecegi.'}
                </p>
              </div>

              <div className="border-l-4 border-[#C9A227] pl-6">
                <h3 className="font-bold text-lg mb-2">CCPA / CPRA (California Consumer Privacy Act)</h3>
                <p className="text-gray-700 mb-2">
                  {isEnglish
                    ? 'CCPA, amended by CPRA effective January 2023, imposes more detailed obligations on businesses that meet specific thresholds: annual gross revenue exceeding $25 million, processing personal information of 100,000 or more California residents, or deriving 50% or more of revenue from selling or sharing personal information.'
                    : 'CCPA ve onu degistiren CPRA (Ocak 2023\'ten itibaren yururlukte), belirli esikleri karsilayan isletmelere daha ayrintili yukumlulukler getirmektedir: yillik brut gelirin 25 milyon dolari asmasi, 100.000 veya daha fazla Kaliforniya sakininin kisisel bilgilerini islenmesi ya da gelirin yuzde 50\'sinden fazlasinin kisisel bilgi satis veya paylasimindanelde edilmesi.'}
                </p>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'Penalties: Up to $2,500 per unintentional violation and $7,500 per intentional violation. The California Attorney General and the California Privacy Protection Agency both have enforcement authority.'
                    : 'Yaptirimlar: Kasitsiz ihlal basina 2.500 dolara, kasitli ihlal basina 7.500 dolara varan para cezalari. Hem Kaliforniya Basbakanlik Ofisi hem de Kaliforniya Gizlilik Koruma Ajansi yaptirm yetkisine sahiptir.'}
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-6">
                <h3 className="font-bold text-lg mb-2">{isEnglish ? 'Other State Privacy Laws' : 'Diger Eyalet Gizlilik Yasalari'}</h3>
                <p className="text-gray-700">
                  {isEnglish
                    ? 'As of 2026, more than 15 US states have enacted comprehensive privacy legislation, including Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), Utah (UCPA), Texas (TDPSA), Oregon, Montana, and others. Each law has different applicability thresholds and consumer rights, but all require some form of privacy notice or policy from covered businesses.'
                    : '2026 itibariyla 15\'ten fazla ABD eyaleti kapsamli gizlilik mevzuati cikmistir: Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), Utah (UCPA), Texas (TDPSA), Oregon, Montana ve digerleri. Her yasanin farkli uygulanabilirlik esikleri ve tuketici haklari bulunmakla birlikte, tumuzkapsamdaki isletmelerden bir tur gizlilik bildirimi veya politikasi bulundurmasini gerektirmektedir.'}
                </p>
              </div>

              <div className="border-l-4 border-gray-300 pl-6">
                <h3 className="font-bold text-lg mb-2">{isEnglish ? 'Sector-Specific Federal Laws' : 'Sektore Ozel Federal Yasalar'}</h3>
                <p className="text-gray-700">
                  {isEnglish
                    ? 'Certain industries are subject to federal privacy requirements: HIPAA for healthcare, COPPA for websites directed at children under 13, GLBA for financial institutions, and FERPA for educational records. If your business falls within these sectors, additional disclosure and consent obligations apply beyond state-level requirements.'
                    : 'Belirli sektorler federal gizlilik gereksinimlerine tabidir: saglik sektoru icin HIPAA, 13 yas alti cocuklara yonelik web siteleri icin COPPA, finansal kuruluslar icin GLBA ve egitim kayitlari icin FERPA. Isletmeniz bu sektorlerden birine giriyorsa, eyalet duzeyindeki gereksinimlerin otesinde ek aciklama ve onay yukumlulukleri uygulanir.'}
                </p>
              </div>
            </div>
          </section>

          {/* Platform Contractual Requirements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Platform Contractual Requirements' : 'Platformlarin Sozlesmesel Gereksinimleri'}</h2>

            <p className="text-gray-700 mb-6">
              {isEnglish
                ? 'Beyond legal obligations, virtually every major platform and service provider requires merchants, developers, and publishers to maintain a privacy policy. This is a contractual requirement embedded in platform terms of service. Non-compliance can result in account suspension, revenue withholding, or permanent termination — often without prior notice.'
                : 'Yasal yukumluluklerin otesinde, neredeyse tum buyuk platformlar ve hizmet saglayicilari; saticilardan, gelistiricilerden ve yayincilardan gizlilik politikasi bulundurmalarini sart kosar. Bu, platform kullanim kosullarina yerlestirilmis sozlesmesel bir gerekliliktir. Uyumsuzluk; hesap askiya alma, gelir dondurma veya kalici hesap kapatma ile sonuclanabilir — cogu zaman onceden haber verilmeksizin.'}
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Platform / Service' : 'Platform / Hizmet'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Requirement Source' : 'Gereksinim Kaynagi'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Consequence of Non-Compliance' : 'Uyumsuzluk Sonucu'}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    isEnglish
                      ? { platform: 'Shopify', source: 'Terms of Service, Section 6', consequence: 'Store suspension or termination' }
                      : { platform: 'Shopify', source: 'Hizmet Sartlari, Bolum 6', consequence: 'Magaza askiya alma veya kapatma' },
                    isEnglish
                      ? { platform: 'Etsy', source: 'Seller Policy', consequence: 'Shop suspension, listing removal' }
                      : { platform: 'Etsy', source: 'Satici Politikasi', consequence: 'Magaza askiya alma, ilan kaldirma' },
                    isEnglish
                      ? { platform: 'Google Analytics', source: 'Terms of Service, Section 7', consequence: 'Account termination, data loss' }
                      : { platform: 'Google Analytics', source: 'Hizmet Sartlari, Bolum 7', consequence: 'Hesap kapatma, veri kaybi' },
                    isEnglish
                      ? { platform: 'Google AdSense', source: 'Program Policies', consequence: 'Ad account ban, revenue withholding' }
                      : { platform: 'Google AdSense', source: 'Program Politikalari', consequence: 'Reklam hesabi kapatma, gelir dondurma' },
                    isEnglish
                      ? { platform: 'Facebook / Meta Ads', source: 'Advertising Policies', consequence: 'Ad account restriction or ban' }
                      : { platform: 'Facebook / Meta Ads', source: 'Reklam Politikalari', consequence: 'Reklam hesabi kisitlama veya kapatma' },
                    isEnglish
                      ? { platform: 'Stripe', source: 'Services Agreement', consequence: 'Fund holds, account closure' }
                      : { platform: 'Stripe', source: 'Hizmet Sozlesmesi', consequence: 'Fon dondurma, hesap kapatma' },
                    isEnglish
                      ? { platform: 'PayPal', source: 'User Agreement', consequence: 'Account limitation or closure' }
                      : { platform: 'PayPal', source: 'Kullanici Sozlesmesi', consequence: 'Hesap kisitlama veya kapatma' },
                    isEnglish
                      ? { platform: 'Apple App Store', source: 'Developer Program License', consequence: 'App rejection or removal' }
                      : { platform: 'Apple App Store', source: 'Gelistirici Program Lisansi', consequence: 'Uygulama reddi veya kaldirma' },
                    isEnglish
                      ? { platform: 'Google Play Store', source: 'Developer Distribution Agreement', consequence: 'App removal, developer ban' }
                      : { platform: 'Google Play Store', source: 'Gelistirici Dagitim Sozlesmesi', consequence: 'Uygulama kaldirma, gelistirici yasagi' },
                    isEnglish
                      ? { platform: 'Amazon Associates', source: 'Operating Agreement', consequence: 'Affiliate account termination' }
                      : { platform: 'Amazon Associates', source: 'Isletme Sozlesmesi', consequence: 'Ortaklik hesabi kapatma' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-200 p-3 font-medium">{row.platform}</td>
                      <td className="border border-gray-200 p-3 text-gray-600">{row.source}</td>
                      <td className="border border-gray-200 p-3 text-gray-600">{row.consequence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* What a Privacy Policy Must Include */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What a Privacy Policy Must Include' : 'Gizlilik Politikasinda Bulunmasi Gerekenler'}</h2>

            <p className="text-gray-700 mb-4">
              {isEnglish
                ? 'The specific requirements vary by applicable law, but a comprehensive privacy policy for a US-facing business should address the following areas at minimum:'
                : 'Belirli gereksinimler uygulanacak yasaya gore degismekle birlikte, ABD\'ye yonelik bir isletmenin kapsamli gizlilik politikasi en azindan su konulari ele almalidir:'}
            </p>

            <div className="space-y-3">
              {(isEnglish ? [
                { title: 'Types of data collected', desc: 'Personal identifiers, device data, cookies, financial information, browsing behavior' },
                { title: 'How data is collected', desc: 'Directly from users, automatically via cookies/tracking, from third-party sources' },
                { title: 'Purpose of data collection', desc: 'Order fulfillment, marketing, analytics, legal compliance, account management' },
                { title: 'Third-party sharing', desc: 'Categories of recipients, purpose of sharing, whether data is sold' },
                { title: 'Consumer rights', desc: 'Right to access, delete, correct, opt out of sale, and non-discrimination' },
                { title: 'Data retention periods', desc: 'How long each category of data is stored and criteria for determining retention' },
                { title: 'Security measures', desc: 'General description of organizational and technical safeguards' },
                { title: 'Contact information', desc: 'How users can submit privacy requests or complaints' },
                { title: 'Effective date and update history', desc: 'When the policy was last modified and how users are notified of changes' },
              ] : [
                { title: 'Toplanan veri turleri', desc: 'Kisisel tanimlayi bilgiler, cihaz verileri, cerezler, finansal bilgiler, gezinme davranisi' },
                { title: 'Verilerin nasil toplandigi', desc: 'Dogrudan kullanicilardan, cerezler/izleme yoluyla otomatik olarak, ucuncu taraf kaynaklardan' },
                { title: 'Veri toplamanin amaci', desc: 'Siparis karsilama, pazarlama, analitik, yasal uyum, hesap yonetimi' },
                { title: 'Ucuncu taraflarla paylasim', desc: 'Alici kategorileri, paylasim amaci, verilerin satilip satilmadigi' },
                { title: 'Tuketici haklari', desc: 'Erisim, silme, duzeltme, satis disi birakma ve ayrimcilik yapilmama hakki' },
                { title: 'Veri saklama sureleri', desc: 'Her veri kategorisinin ne kadar sure saklandigi ve saklama kriterlerinin belirlenmesi' },
                { title: 'Guvenlik onlemleri', desc: 'Organizasyonel ve teknik koruma tedbirlerinin genel tanimi' },
                { title: 'Iletisim bilgileri', desc: 'Kullanicilarin gizlilik taleplerini veya sikayetlerini nasil iletebilecegi' },
                { title: 'Yururluk tarihi ve guncelleme gecmisi', desc: 'Politikanin en son ne zaman degistirildigin ve kullanicilarin degisikliklerden nasil bilgilendirilecegi' },
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <span className="text-gray-400 mt-1">—</span>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Consequences */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Consequences of Operating Without a Privacy Policy' : 'Gizlilik Politikasi Olmadan Faaliyet Gostermenin Sonuclari'}</h2>

            <p className="text-gray-700 mb-4">
              {isEnglish
                ? 'The risks of not maintaining a privacy policy are both legal and operational:'
                : 'Gizlilik politikasi bulundurmamanin riskleri hem hukuki hem de operasyonel boyutlar tasiir:'}
            </p>

            <div className="space-y-3">
              {(isEnglish ? [
                { title: 'Regulatory fines', desc: 'CCPA violations carry penalties up to $7,500 per intentional violation. CalOPPA non-compliance can result in enforcement action by the California Attorney General.' },
                { title: 'Platform account loss', desc: 'Shopify, Stripe, Google, Apple, and payment processors may freeze funds, suspend accounts, or terminate relationships without advance notice.' },
                { title: 'Advertising restrictions', desc: 'Google Ads, Facebook/Meta, and other ad networks will reject campaigns or disable ad accounts for sites without privacy disclosures.' },
                { title: 'Civil litigation exposure', desc: 'Data breaches affecting users who were never informed about data practices carry significantly higher damages in private lawsuits.' },
                { title: 'Loss of consumer trust', desc: 'Increasingly informed consumers check for privacy policies before submitting personal information, particularly for cross-border transactions.' },
              ] : [
                { title: 'Duzenleme kurumu para cezalari', desc: 'CCPA ihlalleri kasitli ihlal basina 7.500 dolara varan yaptirimlara yol acar. CalOPPA uyumsuzlugu, Kaliforniya Basbakanlik Ofisi tarafindan icra islemine neden olabilir.' },
                { title: 'Platform hesap kaybi', desc: 'Shopify, Stripe, Google, Apple ve odeme islemcileri; fonlari dondurabilir, hesaplari askiya alabilir veya iliskiyi onceden haber vermeksizin sonlandirabilir.' },
                { title: 'Reklam kisitlamalari', desc: 'Google Ads, Facebook/Meta ve diger reklam aglari; gizlilik bildirimi bulunmayan siteler icin kampanyalari reddeder veya reklam hesaplarini devre disi birakir.' },
                { title: 'Hukuki dava riski', desc: 'Veri uygulamalari hakkinda bilgilendirilmemis kullanicilari etkileyen veri ihlalleri, ozel davalarda cok daha yuksek tazminat miktarlarina yol acar.' },
                { title: 'Tuketici guveni kaybi', desc: 'Giderek daha bilinli hale gelen tuketiciler, ozellikle sinir otesi islemlerde kisisel bilgilerini paylasmadan once gizlilik politikasi olup olmadigini kontrol etmektedir.' },
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <span className="text-gray-400 mt-1">—</span>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Risk Prevention */}
          <section id="risk-onleme" className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'How to Prevent This Risk' : 'Bu Risk Nasil Onlenir?'}</h2>

            <div className="space-y-3">
              {(isEnglish ? [
                'Audit every point where your business collects personal data: website forms, checkout processes, analytics tools, cookies, email signups, and third-party integrations.',
                'Draft a privacy policy that accurately describes your actual data practices — not a generic template. An inaccurate policy creates more liability than no policy.',
                'Post the privacy policy in a conspicuous location: website footer, app settings, and account registration flow. CalOPPA requires the link to be "conspicuously posted."',
                'Implement cookie consent mechanisms if serving EU visitors (GDPR) or using advertising cookies in jurisdictions that require opt-in consent.',
                'Review and update the policy at least annually, and whenever you add new data collection tools, third-party services, or change data sharing practices.',
                'Maintain records of when and how users were notified of privacy policy changes, as this documentation is critical during regulatory investigations.',
              ] : [
                'Isletmenizin kisisel veri topladigi her noktayi denetleyin: web sitesi formlari, odeme surecleri, analitik araclari, cerezler, e-posta kayitlari ve ucuncu taraf entegrasyonlari.',
                'Gercek veri uygulamalarinizi dogru bicimde tanimlayan bir gizlilik politikasi hazirlayin — genel bir sablon degil. Geregi yansitmayan bir politika, hic olmamasindan daha fazla sorumluluk dogurur.',
                'Gizlilik politikasini gorunur bir konumda yayimlayin: web sitesi alt bilgisi, uygulama ayarlari ve hesap kayit sureci. CalOPPA, baglantinin "belirgin sekilde yayimlanmasini" sart kosar.',
                'AB ziyaretcilerine hizmet veriyorsaniz (GDPR) veya on onayi gerektiren yetki alanlarinda reklam cerezleri kullaniyorsaniz cerez onay mekanizmalari uygulayin.',
                'Politikanizi yilda en az bir kez ve yeni veri toplama araci, ucuncu taraf hizmeti eklediginizde veya veri paylasim uygulamalarinizi degistirdiginizde gozden gecirip guncelleyin.',
                'Kullanicilarin gizlilik politikasi degisikliklerinden ne zaman ve nasil haberdar edildigine iliskin kayitlari tutun — bu belgeler duzenleme sorusturmalari sirasinda kritik onem tasir.',
              ]).map((text, i) => (
                <div key={i} className="flex items-start gap-3 py-2">
                  <span className="text-[#C9A227] font-bold mt-0.5">{i + 1}.</span>
                  <p className="text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Document Reference */}
          <section className="border border-gray-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-2">{isEnglish ? 'Privacy Policy Template' : 'Gizlilik Politikasi Sablonu'}</h2>
            <p className="text-gray-600 mb-3">
              {isEnglish
                ? 'EchoLegal offers a privacy policy template designed for US-based businesses operated by non-US residents. The template covers CalOPPA, CCPA/CPRA, and major platform requirements.'
                : 'EchoLegal, ABD disinda yerlesik kisilerin islettigi ABD merkezli isletmeler icin tasarlanmis bir gizlilik politikasi sablonu sunmaktadir. Sablon; CalOPPA, CCPA/CPRA ve buyuk platformlarin gereksinimlerini kapsamaktadir.'}
            </p>
            <p className="text-gray-500 text-sm italic">Pay What You Can — $20 recommended</p>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Frequently Asked Questions' : 'Sik Sorulan Sorular'}</h2>
            <div className="space-y-6">
              {faqItems.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Resources — Hub and Spoke */}
          <section className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'Ilgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/abd-sirket-kuran-turklerin-hatalari`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Parent Guide: 7 Legal Mistakes Turkish Founders Make' : 'Ana Rehber: Turk Kurucularin Yaptigi 7 Hukuki Hata'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-terms-of-service-riskleri`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Risks of Not Having Terms of Service' : 'Terms of Service Olmamanin Riskleri'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/service-agreement-neden-gerekli`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Why You Need a Service Agreement' : 'Service Agreement Neden Gerekli?'}
                </Link>
              </li>
            </ul>
          </section>

          {/* Legal Disclaimer */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <p className="text-xs text-gray-400">
              {isEnglish
                ? 'This article is published for general informational purposes only and does not constitute legal or tax advice. Privacy law requirements vary by jurisdiction, business size, and industry. Consult a qualified attorney for advice specific to your situation. No attorney-client relationship is formed by reading this content.'
                : 'Bu makale yalnizca genel bilgilendirme amciyla yayimlanmistir; hukuki veya vergisel danismanlik niteligitasimaz. Gizlilik yasasi gereksinimleri yetki alanina, isletme buyuklugune ve sektore gore degisir. Durumunuza ozel tavsiye icin yetkin bir avukata danisin. Bu icerigi okumakla avukat-muvekkil iliskisi kurulmaz.'}
            </p>
          </div>
        </article>
      </main>
    </>
  )
}
