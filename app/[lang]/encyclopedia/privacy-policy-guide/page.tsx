import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateScholarlyArticleSchema, generateFAQSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'
import PrimarySources from '@/components/PrimarySources'
import { getPrimarySources } from '@/lib/primary-sources-registry'

const PAGE_META = {
  slug: 'privacy-policy-guide',
  datePublished: '2025-09-15',
  dateModified: '2026-01-18',
  version: '1.1',
  wordCount: 4800,
  citationKey: 'ecl-enc-00004',
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isEnglish = params.lang === 'en'
  const title = isEnglish
    ? 'Do I Need a Privacy Policy? GDPR, CCPA & KVKK Explained | EchoLegal'
    : 'Gizlilik Politikasına İhtiyacım Var mı? GDPR, CCPA ve KVKK Açıklaması | EchoLegal'
  const url = `${SITE_URL}/${params.lang}/encyclopedia/${PAGE_META.slug}`

  return {
    title,
    description: isEnglish
      ? 'Complete guide to privacy policy requirements under GDPR, CCPA, KVKK, and other laws. Learn when you need a privacy policy, what to include, and how to stay compliant.'
      : 'GDPR, CCPA, KVKK ve diğer yasalar kapsamında gizlilik politikası gereksinimleri için tam rehber. Ne zaman gizlilik politikasına ihtiyacınız olduğunu, neleri dahil edeceğinizi ve nasıl uyumlu kalacağınızı öğrenin.',
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en/encyclopedia/${PAGE_META.slug}`,
        'tr': `${SITE_URL}/tr/encyclopedia/${PAGE_META.slug}`,
      },
    },
    other: {
      'citation_title': isEnglish ? 'Do I Need a Privacy Policy? GDPR, CCPA & KVKK Explained' : 'Gizlilik Politikasına İhtiyacım Var mı? GDPR, CCPA ve KVKK Açıklaması',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/09/15',
      'citation_lastmod': '2026/01/18',
      'citation_version': PAGE_META.version,
      'citation_language': params.lang,
      'citation_fulltext_html_url': url,
      'citation_id': PAGE_META.citationKey,
    },
  }
}

export default async function PrivacyPolicyGuidePage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const primarySources = getPrimarySources('privacy-policy-guide', isEnglish ? 'en' : 'tr')
  const pageUrl = `${SITE_URL}/${lang}/encyclopedia/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'Do I Need a Privacy Policy?' : 'Gizlilik Politikasına İhtiyacım Var mı?'

  const faqs = isEnglish ? [
    { question: 'Do I need a privacy policy for a personal blog?', answer: 'If you use ANY analytics (even free ones like Google Analytics), have comments, use affiliate links, or have an email signup, yes. The safest approach is to have one for any public website.' },
    { question: 'Can I copy another company\'s privacy policy?', answer: 'No. This is copyright infringement AND your policy must accurately describe YOUR practices. A policy that doesn\'t match your actual practices exposes you to more liability, not less.' },
    { question: 'Do privacy policies need to be in the user\'s language?', answer: 'GDPR requires information to be in clear, plain language. Best practice is to provide policies in the languages you actively target. If your site is in Turkish, your privacy policy should be in Turkish.' },
    { question: 'How often should I update my privacy policy?', answer: 'Review annually at minimum, and update whenever you change data practices, add new services/tools, or when laws change. Always notify users of material changes.' },
    { question: 'Is a Terms of Service the same as a Privacy Policy?', answer: 'No, they\'re different documents. Terms of Service govern how users can use your service. Privacy Policy explains how you handle their data. You typically need both.' },
    { question: 'Do I need a Data Protection Officer (DPO)?', answer: 'Under GDPR, you need a DPO if you\'re a public authority, do large-scale systematic monitoring, or process sensitive data at scale. Most small businesses don\'t need one, but having a privacy point-of-contact is good practice.' }
  ] : [
    { question: 'Kişisel bir blog için gizlilik politikasına ihtiyacım var mı?', answer: 'HERHANGİ BİR analitik (Google Analytics gibi ücretsiz olanlar bile) kullanıyorsanız, yorumlarınız varsa, ortaklık bağlantıları kullanıyorsanız veya e-posta kaydınız varsa, evet. En güvenli yaklaşım, herhangi bir genel web sitesi için bir tane bulundurmaktır.' },
    { question: 'Başka bir şirketin gizlilik politikasını kopyalayabilir miyim?', answer: 'Hayır. Bu telif hakkı ihlalidir VE politikanız SİZİN uygulamalarınızı doğru bir şekilde tanımlamalıdır. Gerçek uygulamalarınızla eşleşmeyen bir politika sizi daha az değil, daha fazla sorumluluğa maruz bırakır.' },
    { question: 'Gizlilik politikalarının kullanıcının dilinde olması gerekir mi?', answer: 'GDPR, bilgilerin açık, sade bir dilde olmasını gerektirir. En iyi uygulama, aktif olarak hedeflediğiniz dillerde politikalar sağlamaktır. Siteniz Türkçeyse, gizlilik politikanız da Türkçe olmalıdır.' },
    { question: 'Gizlilik politikamı ne sıklıkla güncellemeliyim?', answer: 'Minimum yılda bir gözden geçirin ve veri uygulamalarını değiştirdiğinizde, yeni hizmetler/araçlar eklediğinizde veya yasalar değiştiğinde güncelleyin. Önemli değişiklikleri her zaman kullanıcılara bildirin.' },
    { question: 'Kullanım Koşulları Gizlilik Politikası ile aynı mı?', answer: 'Hayır, farklı belgelerdir. Kullanım Koşulları, kullanıcıların hizmetinizi nasıl kullanabileceğini yönetir. Gizlilik Politikası, verilerini nasıl işlediğinizi açıklar. Genellikle her ikisine de ihtiyacınız vardır.' },
    { question: 'Veri Koruma Görevlisine (DPO) ihtiyacım var mı?', answer: 'GDPR kapsamında, kamu otoritesiyseniz, büyük ölçekli sistematik izleme yapıyorsanız veya hassas verileri ölçekte işliyorsanız bir DPO\'ya ihtiyacınız vardır. Çoğu küçük işletmenin buna ihtiyacı yoktur, ancak bir gizlilik iletişim noktası bulundurmak iyi bir uygulamadır.' }
  ]

  const scholarlySchema = generateScholarlyArticleSchema({
    title: isEnglish ? 'Do I Need a Privacy Policy? GDPR, CCPA & KVKK Explained' : 'Gizlilik Politikasına İhtiyacım Var mı? GDPR, CCPA ve KVKK Açıklaması',
    alternativeHeadline: isEnglish ? 'Privacy Policy Guide — GDPR, CCPA, KVKK Compliance' : 'Gizlilik Politikası Rehberi — GDPR, CCPA, KVKK Uyumu',
    abstractText: isEnglish
      ? 'A comprehensive guide to privacy policy requirements under GDPR, CCPA, KVKK, and other laws. Learn when you need a privacy policy, what to include, and how to stay compliant.'
      : 'GDPR, CCPA, KVKK ve diğer yasalar kapsamında gizlilik politikası gereksinimleri için tam rehber. Ne zaman gizlilik politikasına ihtiyacınız olduğunu, neleri dahil edeceğinizi ve nasıl uyumlu kalacağınızı öğrenin.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['privacy-policy', 'gdpr', 'ccpa', 'kvkk', 'data-protection'],
    wordCount: PAGE_META.wordCount,
    citationKey: PAGE_META.citationKey,
    aboutTopics: ['Privacy Policy', 'GDPR', 'CCPA', 'KVKK', 'Data Protection'],
  })

  const faqSchema = generateFAQSchema(faqs)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Encyclopedia' : 'Ansiklopedi', url: `${SITE_URL}/${lang}/encyclopedia` },
    { name: pageTitle, url: pageUrl },
  ])

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <JsonLdScript data={[scholarlySchema, faqSchema, breadcrumbSchema]} />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
        {' → '}
        <Link href={`/${lang}/encyclopedia`} className="hover:text-black">{isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}</Link>
        {' → '}
        <span className="text-black font-medium">{isEnglish ? 'Privacy Policy Guide' : 'Gizlilik Politikası Rehberi'}</span>
      </nav>

      {/* Article Header */}
      <article>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {isEnglish ? 'Do I Need a Privacy Policy?' : 'Gizlilik Politikasına İhtiyacım Var mı?'}
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          {isEnglish
            ? 'A comprehensive guide to privacy laws worldwide: GDPR, CCPA, KVKK, and beyond. Understand your obligations, avoid hefty fines, and build user trust.'
            : 'Dünya çapında gizlilik yasalarına kapsamlı rehber: GDPR, CCPA, KVKK ve ötesi. Yükümlülüklerinizi anlayın, ağır para cezalarından kaçının ve kullanıcı güveni oluşturun.'}
        </p>

        <InstitutionalBadge
          lang={lang}
          jurisdictions={['US', 'TR']}
          lastReviewedAt={PAGE_META.dateModified}
          className="mb-12"
        />

        {/* Quick Answer Box */}
        <div className="bg-[#C9A227]/10 border-2 border-[#C9A227] rounded-xl p-6 mb-12">
          <h2 className="font-bold text-xl mb-3">{isEnglish ? 'Short Answer: Yes, You Probably Do' : 'Kısa Cevap: Evet, Muhtemelen İhtiyacınız Var'}</h2>
          <p className="text-gray-700 mb-4">
            {isEnglish
              ? 'If your website or app collects ANY personal information (names, emails, IP addresses, cookies, analytics), you need a privacy policy. This applies to businesses of all sizes, including freelancers and side projects.'
              : 'Web siteniz veya uygulamanız HERHANGİ BİR kişisel bilgi topluyorsa (isimler, e-postalar, IP adresleri, çerezler, analitik), bir gizlilik politikasına ihtiyacınız var. Bu, serbest çalışanlar ve yan projeler dahil her boyuttaki işletme için geçerlidir.'}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">{isEnglish ? 'GDPR: Up to €20M fines' : 'GDPR: 20M€\'ya kadar ceza'}</span>
            <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full">{isEnglish ? 'CCPA: $7,500 per violation' : 'CCPA: İhlal başına 7.500$'}</span>
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">{isEnglish ? 'KVKK: Up to ₺1.8M fines' : 'KVKK: 1,8M₺\'ye kadar ceza'}</span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="font-bold mb-4">{isEnglish ? 'Table of Contents' : 'İçindekiler'}</h2>
          <ul className="space-y-2">
            <li><a href="#what-is" className="text-[#C9A227] hover:underline">{isEnglish ? '1. What is a Privacy Policy?' : '1. Gizlilik Politikası Nedir?'}</a></li>
            <li><a href="#when-needed" className="text-[#C9A227] hover:underline">{isEnglish ? '2. When Do You Need One?' : '2. Ne Zaman İhtiyacınız Var?'}</a></li>
            <li><a href="#gdpr" className="text-[#C9A227] hover:underline">{isEnglish ? '3. GDPR (European Union)' : '3. GDPR (Avrupa Birliği)'}</a></li>
            <li><a href="#ccpa" className="text-[#C9A227] hover:underline">{isEnglish ? '4. CCPA/CPRA (California)' : '4. CCPA/CPRA (Kaliforniya)'}</a></li>
            <li><a href="#kvkk" className="text-[#C9A227] hover:underline">{isEnglish ? '5. KVKK (Turkey)' : '5. KVKK (Türkiye)'}</a></li>
            <li><a href="#other-laws" className="text-[#C9A227] hover:underline">{isEnglish ? '6. Other Privacy Laws' : '6. Diğer Gizlilik Yasaları'}</a></li>
            <li><a href="#what-to-include" className="text-[#C9A227] hover:underline">{isEnglish ? '7. What to Include in Your Privacy Policy' : '7. Gizlilik Politikanıza Neleri Dahil Etmeli'}</a></li>
            <li><a href="#compliance" className="text-[#C9A227] hover:underline">{isEnglish ? '8. Practical Compliance Steps' : '8. Pratik Uyum Adımları'}</a></li>
          </ul>
        </div>

        {/* Section 1: What is a Privacy Policy */}
        <section id="what-is" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '1. What is a Privacy Policy?' : '1. Gizlilik Politikası Nedir?'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'A privacy policy is a legal document that explains how your website, app, or business collects, uses, stores, and protects personal information from users or customers. It\'s not just a nice-to-have—it\'s legally required in most jurisdictions if you collect any personal data.'
              : 'Gizlilik politikası, web sitenizin, uygulamanızın veya işletmenizin kullanıcılardan veya müşterilerden kişisel bilgileri nasıl topladığını, kullandığını, sakladığını ve koruduğunu açıklayan yasal bir belgedir. Bu sadece olması güzel bir şey değildir—herhangi bir kişisel veri topluyorsanız çoğu yargı alanında yasal olarak zorunludur.'}
          </p>

          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="font-semibold mb-3">{isEnglish ? 'What Counts as "Personal Data"?' : '"Kişisel Veri" Olarak Ne Sayılır?'}</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-gray-700 mb-2">{isEnglish ? 'Obviously Personal:' : 'Açıkça Kişisel:'}</p>
                <ul className="text-gray-600 space-y-1">
                  <li>• {isEnglish ? 'Name, email, phone number' : 'İsim, e-posta, telefon numarası'}</li>
                  <li>• {isEnglish ? 'Physical address' : 'Fiziksel adres'}</li>
                  <li>• {isEnglish ? 'Payment information' : 'Ödeme bilgileri'}</li>
                  <li>• {isEnglish ? 'Government IDs' : 'Devlet kimlikleri'}</li>
                  <li>• {isEnglish ? 'Photos/videos of people' : 'İnsanların fotoğraf/videoları'}</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-2">{isEnglish ? 'Often Overlooked:' : 'Sıkça Gözden Kaçan:'}</p>
                <ul className="text-gray-600 space-y-1">
                  <li>• {isEnglish ? 'IP addresses' : 'IP adresleri'}</li>
                  <li>• {isEnglish ? 'Cookies and tracking data' : 'Çerezler ve izleme verileri'}</li>
                  <li>• {isEnglish ? 'Device identifiers' : 'Cihaz tanımlayıcıları'}</li>
                  <li>• {isEnglish ? 'Location data' : 'Konum verileri'}</li>
                  <li>• {isEnglish ? 'Browsing behavior' : 'Gezinme davranışı'}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: When Do You Need One */}
        <section id="when-needed" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '2. When Do You Need One?' : '2. Ne Zaman İhtiyacınız Var?'}</h2>

          <div className="space-y-4">
            <div className="flex items-start border-l-4 border-green-500 pl-4 bg-green-50 py-3 pr-4 rounded-r">
              <span className="text-green-600 font-bold mr-3">{isEnglish ? 'YES' : 'EVET'}</span>
              <span className="text-gray-700">{isEnglish ? 'You have a contact form that collects names/emails' : 'İsim/e-posta toplayan bir iletişim formunuz var'}</span>
            </div>
            <div className="flex items-start border-l-4 border-green-500 pl-4 bg-green-50 py-3 pr-4 rounded-r">
              <span className="text-green-600 font-bold mr-3">{isEnglish ? 'YES' : 'EVET'}</span>
              <span className="text-gray-700">{isEnglish ? 'You use Google Analytics, Facebook Pixel, or any tracking' : 'Google Analytics, Facebook Pixel veya herhangi bir izleme kullanıyorsunuz'}</span>
            </div>
            <div className="flex items-start border-l-4 border-green-500 pl-4 bg-green-50 py-3 pr-4 rounded-r">
              <span className="text-green-600 font-bold mr-3">{isEnglish ? 'YES' : 'EVET'}</span>
              <span className="text-gray-700">{isEnglish ? 'You have user accounts or logins' : 'Kullanıcı hesapları veya girişleriniz var'}</span>
            </div>
            <div className="flex items-start border-l-4 border-green-500 pl-4 bg-green-50 py-3 pr-4 rounded-r">
              <span className="text-green-600 font-bold mr-3">{isEnglish ? 'YES' : 'EVET'}</span>
              <span className="text-gray-700">{isEnglish ? 'You process payments' : 'Ödeme işliyorsunuz'}</span>
            </div>
            <div className="flex items-start border-l-4 border-green-500 pl-4 bg-green-50 py-3 pr-4 rounded-r">
              <span className="text-green-600 font-bold mr-3">{isEnglish ? 'YES' : 'EVET'}</span>
              <span className="text-gray-700">{isEnglish ? 'You have an email newsletter' : 'E-posta bülteniniz var'}</span>
            </div>
            <div className="flex items-start border-l-4 border-green-500 pl-4 bg-green-50 py-3 pr-4 rounded-r">
              <span className="text-green-600 font-bold mr-3">{isEnglish ? 'YES' : 'EVET'}</span>
              <span className="text-gray-700">{isEnglish ? 'You have any app (mobile or web) with users' : 'Kullanıcılı herhangi bir uygulamanız var (mobil veya web)'}</span>
            </div>
            <div className="flex items-start border-l-4 border-green-500 pl-4 bg-green-50 py-3 pr-4 rounded-r">
              <span className="text-green-600 font-bold mr-3">{isEnglish ? 'YES' : 'EVET'}</span>
              <span className="text-gray-700">{isEnglish ? 'You have EU, California, or Turkish visitors' : 'AB, Kaliforniya veya Türk ziyaretçileriniz var'}</span>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-semibold text-blue-900">{isEnglish ? 'Platform Requirements' : 'Platform Gereksinimleri'}</p>
            <p className="text-blue-800">
              {isEnglish
                ? 'Even if no law applied to you, platforms require privacy policies: Apple App Store, Google Play Store, Google AdSense, Google Analytics, Facebook/Meta advertising, Amazon Associates, and most payment processors all require one.'
                : 'Hiçbir yasa sizin için geçerli olmasa bile, platformlar gizlilik politikası gerektirir: Apple App Store, Google Play Store, Google AdSense, Google Analytics, Facebook/Meta reklamcılığı, Amazon Associates ve çoğu ödeme işlemcisi bir tane gerektirir.'}
            </p>
          </div>
        </section>

        {/* Section 3: GDPR */}
        <section id="gdpr" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '3. GDPR (European Union)' : '3. GDPR (Avrupa Birliği)'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The General Data Protection Regulation is the world\'s strictest privacy law. It applies to any business that processes personal data of EU residents—regardless of where your business is located.'
              : 'Genel Veri Koruma Yönetmeliği, dünyanın en katı gizlilik yasasıdır. İşletmenizin nerede olduğuna bakılmaksızın, AB sakinlerinin kişisel verilerini işleyen herhangi bir işletme için geçerlidir.'}
          </p>

          <div className="border border-blue-200 rounded-lg p-6 bg-blue-50 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">{isEnglish ? 'GDPR Applies to You If...' : 'GDPR Şu Durumlarda Sizin İçin Geçerlidir...'}</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{isEnglish ? 'You have an establishment in the EU' : 'AB\'de bir kuruluşunuz var'}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{isEnglish ? 'You offer goods/services to EU residents (even free services)' : 'AB sakinlerine mal/hizmet sunuyorsunuz (ücretsiz hizmetler bile)'}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{isEnglish ? 'You monitor behavior of people in the EU' : 'AB\'deki insanların davranışını izliyorsunuz'}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{isEnglish ? 'Key GDPR Requirements' : 'Temel GDPR Gereksinimleri'}</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2">{isEnglish ? 'Lawful Basis' : 'Hukuki Dayanak'}</h4>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'You need a legal basis for processing: consent, contract, legal obligation, vital interests, public task, or legitimate interests.'
                    : 'İşleme için yasal bir dayanağa ihtiyacınız var: rıza, sözleşme, yasal yükümlülük, hayati çıkarlar, kamu görevi veya meşru çıkarlar.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2">{isEnglish ? 'Consent Requirements' : 'Rıza Gereksinimleri'}</h4>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'Consent must be freely given, specific, informed, and unambiguous. Pre-ticked boxes are NOT valid consent.'
                    : 'Rıza özgürce verilmiş, belirli, bilgilendirilmiş ve açık olmalıdır. Önceden işaretlenmiş kutular geçerli rıza DEĞİLDİR.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2">{isEnglish ? 'User Rights' : 'Kullanıcı Hakları'}</h4>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'Right to access, rectify, erase ("right to be forgotten"), restrict processing, data portability, and object to processing.'
                    : 'Erişim, düzeltme, silme ("unutulma hakkı"), işlemeyi kısıtlama, veri taşınabilirliği ve işlemeye itiraz hakkı.'}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2">{isEnglish ? 'Data Breach Notification' : 'Veri İhlali Bildirimi'}</h4>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'Must notify supervisory authority within 72 hours of discovering a breach. Affected individuals must also be notified if high risk.'
                    : 'İhlali keşfettikten sonra 72 saat içinde denetim makamına bildirilmelidir. Yüksek risk varsa etkilenen bireyler de bilgilendirilmelidir.'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
            <p className="font-semibold text-red-900">{isEnglish ? 'GDPR Penalties' : 'GDPR Cezaları'}</p>
            <p className="text-red-800">
              {isEnglish
                ? 'Up to €20 million or 4% of annual global turnover (whichever is higher). Even small businesses have been fined. In 2023, Meta was fined €1.2 billion for data transfers to the US.'
                : '20 milyon €\'ya kadar veya yıllık küresel cironun %4\'ü (hangisi daha yüksekse). Küçük işletmeler bile ceza aldı. 2023\'te Meta, ABD\'ye veri aktarımı için 1,2 milyar € ceza aldı.'}
            </p>
          </div>
        </section>

        {/* Section 4: CCPA */}
        <section id="ccpa" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '4. CCPA/CPRA (California)' : '4. CCPA/CPRA (Kaliforniya)'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The California Consumer Privacy Act (enhanced by CPRA) is the strongest US privacy law. It gives California residents significant rights over their personal information.'
              : 'Kaliforniya Tüketici Gizliliği Yasası (CPRA ile güçlendirilmiş), ABD\'nin en güçlü gizlilik yasasıdır. Kaliforniya sakinlerine kişisel bilgileri üzerinde önemli haklar verir.'}
          </p>

          <div className="border border-orange-200 rounded-lg p-6 bg-orange-50 mb-6">
            <h3 className="text-lg font-semibold text-orange-900 mb-3">{isEnglish ? 'CCPA Applies to You If...' : 'CCPA Şu Durumlarda Sizin İçin Geçerlidir...'}</h3>
            <p className="text-orange-800 mb-3">{isEnglish ? 'You do business in California AND meet ANY of these:' : 'Kaliforniya\'da iş yapıyorsunuz VE bunlardan HERHANGİ BİRİNİ karşılıyorsunuz:'}</p>
            <ul className="space-y-2 text-orange-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{isEnglish ? 'Annual gross revenue over $25 million' : 'Yıllık brüt gelir 25 milyon doların üzerinde'}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{isEnglish ? 'Buy, sell, or share personal info of 100,000+ California residents/households' : '100.000+ Kaliforniya sakini/hanesinin kişisel bilgilerini satın alın, satın veya paylaşın'}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{isEnglish ? 'Derive 50%+ of revenue from selling/sharing personal information' : 'Gelirin %50+\'sini kişisel bilgi satma/paylaşmadan elde edin'}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{isEnglish ? 'Key CCPA/CPRA Rights' : 'Temel CCPA/CPRA Hakları'}</h3>

            <div className="grid md:grid-cols-2 gap-4">
              {(isEnglish ? [
                { title: 'Right to Know', desc: 'Consumers can request what personal info you\'ve collected about them and why' },
                { title: 'Right to Delete', desc: 'Consumers can request deletion of their personal information' },
                { title: 'Right to Opt-Out', desc: 'Must provide "Do Not Sell or Share My Personal Information" option' },
                { title: 'Right to Correct', desc: 'Consumers can request correction of inaccurate information' },
                { title: 'Right to Limit Use', desc: 'Can limit use of sensitive personal information' },
                { title: 'No Discrimination', desc: 'Can\'t penalize consumers for exercising their rights' }
              ] : [
                { title: 'Bilme Hakkı', desc: 'Tüketiciler sizin onlar hakkında hangi kişisel bilgileri topladığınızı ve nedenini talep edebilir' },
                { title: 'Silme Hakkı', desc: 'Tüketiciler kişisel bilgilerinin silinmesini talep edebilir' },
                { title: 'Çıkış Hakkı', desc: '"Kişisel Bilgilerimi Satma veya Paylaşma" seçeneği sağlanmalıdır' },
                { title: 'Düzeltme Hakkı', desc: 'Tüketiciler yanlış bilgilerin düzeltilmesini talep edebilir' },
                { title: 'Kullanımı Sınırlama Hakkı', desc: 'Hassas kişisel bilgi kullanımı sınırlandırılabilir' },
                { title: 'Ayrımcılık Yasağı', desc: 'Haklarını kullanan tüketiciler cezalandırılamaz' }
              ]).map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
            <p className="font-semibold text-yellow-900">{isEnglish ? 'CCPA Penalties' : 'CCPA Cezaları'}</p>
            <p className="text-yellow-800">
              {isEnglish
                ? '$2,500 per unintentional violation, $7,500 per intentional violation. Private right of action for data breaches ($100-$750 per consumer per incident). Sephora was fined $1.2M in 2022.'
                : 'Kasıtsız ihlal başına 2.500$, kasıtlı ihlal başına 7.500$. Veri ihlalleri için özel dava hakkı (olay başına tüketici başına 100$-750$). Sephora 2022\'de 1,2M$ ceza aldı.'}
            </p>
          </div>
        </section>

        {/* Section 5: KVKK */}
        <section id="kvkk" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '5. KVKK (Turkey)' : '5. KVKK (Türkiye)'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The Kişisel Verilerin Korunması Kanunu (Personal Data Protection Law) is Turkey\'s comprehensive data protection law, largely modeled after GDPR. It applies to any processing of personal data of individuals in Turkey.'
              : 'Kişisel Verilerin Korunması Kanunu, büyük ölçüde GDPR\'dan sonra modellenen Türkiye\'nin kapsamlı veri koruma yasasıdır. Türkiye\'deki bireylerin kişisel verilerinin işlenmesine uygulanır.'}
          </p>

          <div className="border border-red-200 rounded-lg p-6 bg-red-50 mb-6">
            <h3 className="text-lg font-semibold text-red-900 mb-3">{isEnglish ? 'KVKK Applies to You If...' : 'KVKK Şu Durumlarda Sizin İçin Geçerlidir...'}</h3>
            <ul className="space-y-2 text-red-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{isEnglish ? 'You process personal data of individuals in Turkey' : 'Türkiye\'deki bireylerin kişisel verilerini işliyorsunuz'}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{isEnglish ? 'You offer goods/services to people in Turkey (even from abroad)' : 'Türkiye\'deki insanlara mal/hizmet sunuyorsunuz (yurt dışından bile)'}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>{isEnglish ? 'You have a Turkish website, Turkish language content, or accept Turkish Lira' : 'Türkçe web siteniz, Türkçe içeriğiniz var veya Türk Lirası kabul ediyorsunuz'}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{isEnglish ? 'Key KVKK Requirements' : 'Temel KVKK Gereksinimleri'}</h3>

            <div className="space-y-3">
              <div className="border-l-4 border-[#C9A227] pl-4">
                <h4 className="font-semibold">{isEnglish ? 'VERBİS Registration' : 'VERBİS Kaydı'}</h4>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'Data controllers with 50+ employees OR processing sensitive data OR annual turnover over certain thresholds must register with the Data Controllers Registry (VERBİS).'
                    : '50+ çalışanı olan VEYA hassas veri işleyen VEYA belirli eşiklerin üzerinde yıllık cirosu olan veri sorumluları Veri Sorumluları Sicili\'ne (VERBİS) kaydolmalıdır.'}
                </p>
              </div>

              <div className="border-l-4 border-[#C9A227] pl-4">
                <h4 className="font-semibold">{isEnglish ? 'Explicit Consent' : 'Açık Rıza'}</h4>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'Consent must be explicit, informed, freely given, and specific. General terms and conditions are NOT sufficient for consent.'
                    : 'Rıza açık, bilgilendirilmiş, özgürce verilmiş ve belirli olmalıdır. Genel şartlar ve koşullar rıza için yeterli DEĞİLDİR.'}
                </p>
              </div>

              <div className="border-l-4 border-[#C9A227] pl-4">
                <h4 className="font-semibold">{isEnglish ? 'Data Subject Rights' : 'İlgili Kişi Hakları'}</h4>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'Rights to know if data is processed, request access, correction, deletion, object to profiling, and claim damages for violations.'
                    : 'Verinin işlenip işlenmediğini öğrenme, erişim, düzeltme, silme talep etme, profillemeye itiraz etme ve ihlaller için tazminat talep etme hakları.'}
                </p>
              </div>

              <div className="border-l-4 border-[#C9A227] pl-4">
                <h4 className="font-semibold">{isEnglish ? 'Cross-Border Transfers' : 'Sınır Ötesi Aktarımlar'}</h4>
                <p className="text-gray-600 text-sm">
                  {isEnglish
                    ? 'Transferring data abroad requires either explicit consent OR transfer to countries deemed adequate by the KVKK Board OR binding corporate rules/standard contractual clauses.'
                    : 'Yurt dışına veri aktarımı ya açık rıza YA DA KVKK Kurulu tarafından yeterli kabul edilen ülkelere aktarım VEYA bağlayıcı şirket kuralları/standart sözleşme maddeleri gerektirir.'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
            <p className="font-semibold text-red-900">{isEnglish ? 'KVKK Penalties' : 'KVKK Cezaları'}</p>
            <p className="text-red-800">
              {isEnglish
                ? 'Administrative fines from ₺50,000 to ₺1,800,000+ depending on the violation. The Personal Data Protection Authority actively investigates and fines companies. Criminal penalties also possible for certain violations.'
                : 'İhlale bağlı olarak 50.000₺\'den 1.800.000₺+\'ye kadar idari para cezaları. Kişisel Verileri Koruma Kurumu aktif olarak soruşturma yapar ve şirketlere ceza verir. Belirli ihlaller için cezai yaptırımlar da mümkündür.'}
            </p>
          </div>
        </section>

        {/* Section 6: Other Laws */}
        <section id="other-laws" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '6. Other Privacy Laws' : '6. Diğer Gizlilik Yasaları'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'Privacy laws are proliferating worldwide. Here are other significant regulations you may need to consider:'
              : 'Gizlilik yasaları dünya çapında çoğalıyor. İşte dikkate almanız gerekebilecek diğer önemli düzenlemeler:'}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Law' : 'Yasa'}</th>
                  <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Jurisdiction' : 'Yargı Alanı'}</th>
                  <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Key Feature' : 'Önemli Özellik'}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { law: 'LGPD', jurisdiction: isEnglish ? 'Brazil' : 'Brezilya', feature: isEnglish ? 'GDPR-like, applies to any business processing Brazilian data' : 'GDPR benzeri, Brezilya verilerini işleyen tüm işletmeler için geçerli' },
                  { law: 'PIPEDA', jurisdiction: isEnglish ? 'Canada' : 'Kanada', feature: isEnglish ? 'Consent-based, applies to commercial activities' : 'Rıza tabanlı, ticari faaliyetler için geçerli' },
                  { law: 'POPIA', jurisdiction: isEnglish ? 'South Africa' : 'Güney Afrika', feature: isEnglish ? 'GDPR-influenced, strict consent requirements' : 'GDPR etkisinde, katı rıza gereksinimleri' },
                  { law: 'PIPL', jurisdiction: isEnglish ? 'China' : 'Çin', feature: isEnglish ? 'Strict data localization, government access provisions' : 'Katı veri yerelleştirme, devlet erişim hükümleri' },
                  { law: 'APPI', jurisdiction: isEnglish ? 'Japan' : 'Japonya', feature: isEnglish ? 'EU-adequate status, strong user rights' : 'AB-yeterli statü, güçlü kullanıcı hakları' },
                  { law: 'CPA', jurisdiction: isEnglish ? 'Colorado, USA' : 'Colorado, ABD', feature: isEnglish ? 'CCPA-like, universal opt-out for targeted ads' : 'CCPA benzeri, hedefli reklamlar için evrensel çıkış' },
                  { law: 'VCDPA', jurisdiction: isEnglish ? 'Virginia, USA' : 'Virginia, ABD', feature: isEnglish ? 'CCPA-like, no private right of action' : 'CCPA benzeri, özel dava hakkı yok' },
                  { law: 'CTDPA', jurisdiction: isEnglish ? 'Connecticut, USA' : 'Connecticut, ABD', feature: isEnglish ? 'GDPR-influenced, loyalty program protections' : 'GDPR etkisinde, sadakat programı korumaları' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-200 p-3 font-medium">{row.law}</td>
                    <td className="border border-gray-200 p-3">{row.jurisdiction}</td>
                    <td className="border border-gray-200 p-3 text-gray-600">{row.feature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-semibold text-blue-900">{isEnglish ? 'US State Privacy Laws Expanding' : 'ABD Eyalet Gizlilik Yasaları Genişliyor'}</p>
            <p className="text-blue-800">
              {isEnglish
                ? 'As of 2026, 15+ US states have enacted comprehensive privacy laws. There\'s still no federal privacy law, creating a patchwork that businesses must navigate. Designing for CCPA/GDPR compliance generally covers most requirements.'
                : '2026 itibarıyla, 15+ ABD eyaleti kapsamlı gizlilik yasaları çıkardı. Hâlâ federal bir gizlilik yasası yok, bu da işletmelerin yönetmesi gereken bir yama işi oluşturuyor. CCPA/GDPR uyumu için tasarlamak genellikle çoğu gereksinimi karşılar.'}
            </p>
          </div>
        </section>

        {/* Section 7: What to Include */}
        <section id="what-to-include" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '7. What to Include in Your Privacy Policy' : '7. Gizlilik Politikanıza Neleri Dahil Etmeli'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'A comprehensive privacy policy should include all of the following sections:'
              : 'Kapsamlı bir gizlilik politikası aşağıdaki tüm bölümleri içermelidir:'}
          </p>

          <div className="space-y-4">
            {(isEnglish ? [
              { num: 1, title: 'Identity and Contact Information', desc: 'Who you are, your business name, address, and how to contact you (especially for privacy inquiries)' },
              { num: 2, title: 'What Data You Collect', desc: 'Be specific: names, emails, IP addresses, cookies, device info, location, payment data, etc.' },
              { num: 3, title: 'How You Collect Data', desc: 'Forms, cookies, analytics, third-party services, automatic collection' },
              { num: 4, title: 'Why You Collect Data', desc: 'Legal basis for processing: consent, contract, legitimate interest. Purpose for each type of data.' },
              { num: 5, title: 'How You Use Data', desc: 'Service delivery, communications, marketing, analytics, personalization, legal compliance' },
              { num: 6, title: 'Who You Share Data With', desc: 'Third parties: service providers, analytics, advertising partners, legal authorities' },
              { num: 7, title: 'International Transfers', desc: 'If data goes outside the user\'s country, explain where and what safeguards exist' },
              { num: 8, title: 'Data Retention', desc: 'How long you keep data and your deletion practices' },
              { num: 9, title: 'User Rights', desc: 'Access, correction, deletion, opt-out, portability—and how to exercise them' },
              { num: 10, title: 'Cookie Policy', desc: 'What cookies you use, why, and how users can manage them (often a separate page)' },
              { num: 11, title: 'Children\'s Privacy', desc: 'COPPA compliance if you may have users under 13 (or 16 in EU)' },
              { num: 12, title: 'Security Measures', desc: 'How you protect data (general terms, don\'t reveal specific security details)' },
              { num: 13, title: 'Policy Updates', desc: 'How you\'ll notify users of changes' },
              { num: 14, title: 'Effective Date', desc: 'When the policy was last updated' }
            ] : [
              { num: 1, title: 'Kimlik ve İletişim Bilgileri', desc: 'Kim olduğunuz, işletme adınız, adresiniz ve sizinle nasıl iletişime geçileceği (özellikle gizlilik sorguları için)' },
              { num: 2, title: 'Hangi Verileri Topluyorsunuz', desc: 'Spesifik olun: isimler, e-postalar, IP adresleri, çerezler, cihaz bilgileri, konum, ödeme verileri vb.' },
              { num: 3, title: 'Verileri Nasıl Topluyorsunuz', desc: 'Formlar, çerezler, analitik, üçüncü taraf hizmetleri, otomatik toplama' },
              { num: 4, title: 'Neden Veri Topluyorsunuz', desc: 'İşleme için yasal dayanak: rıza, sözleşme, meşru çıkar. Her veri türü için amaç.' },
              { num: 5, title: 'Verileri Nasıl Kullanıyorsunuz', desc: 'Hizmet sunumu, iletişim, pazarlama, analitik, kişiselleştirme, yasal uyum' },
              { num: 6, title: 'Verileri Kiminle Paylaşıyorsunuz', desc: 'Üçüncü taraflar: hizmet sağlayıcılar, analitik, reklam ortakları, yasal otoriteler' },
              { num: 7, title: 'Uluslararası Aktarımlar', desc: 'Veri kullanıcının ülkesi dışına çıkıyorsa, nereye gittiğini ve hangi güvencelerin olduğunu açıklayın' },
              { num: 8, title: 'Veri Saklama', desc: 'Verileri ne kadar süre tuttuğunuz ve silme uygulamalarınız' },
              { num: 9, title: 'Kullanıcı Hakları', desc: 'Erişim, düzeltme, silme, çıkış, taşınabilirlik—ve bunları nasıl kullanacakları' },
              { num: 10, title: 'Çerez Politikası', desc: 'Hangi çerezleri kullandığınız, neden ve kullanıcıların bunları nasıl yönetebileceği (genellikle ayrı bir sayfa)' },
              { num: 11, title: 'Çocukların Gizliliği', desc: '13 yaş altı (AB\'de 16) kullanıcılarınız olabiliyorsa COPPA uyumu' },
              { num: 12, title: 'Güvenlik Önlemleri', desc: 'Verileri nasıl koruduğunuz (genel terimler, belirli güvenlik ayrıntılarını açıklamayın)' },
              { num: 13, title: 'Politika Güncellemeleri', desc: 'Değişiklikleri kullanıcılara nasıl bildireceğiniz' },
              { num: 14, title: 'Yürürlük Tarihi', desc: 'Politikanın en son ne zaman güncellendiği' }
            ]).map((item) => (
              <div key={item.num} className="flex items-start border-l-4 border-[#C9A227] pl-4 py-2">
                <span className="bg-[#C9A227] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">{item.num}</span>
                <div>
                  <span className="font-semibold">{item.title}:</span>
                  <span className="text-gray-600 ml-1">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Practical Compliance */}
        <section id="compliance" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '8. Practical Compliance Steps' : '8. Pratik Uyum Adımları'}</h2>

          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">{isEnglish ? 'Minimum Compliance Checklist' : 'Minimum Uyum Kontrol Listesi'}</h3>
              <ul className="space-y-2 text-green-800">
                {(isEnglish ? [
                  'Create a comprehensive privacy policy (use this guide)',
                  'Add privacy policy link to website footer (visible on all pages)',
                  'Implement cookie consent banner for EU/UK visitors',
                  'Add "Do Not Sell My Info" link for California visitors',
                  'Create a process to handle data subject requests',
                  'Document what data you collect and why',
                  'Review third-party services for privacy compliance',
                  'Implement appropriate security measures',
                  'Train team members who handle personal data'
                ] : [
                  'Kapsamlı bir gizlilik politikası oluşturun (bu rehberi kullanın)',
                  'Web sitesi altbilgisine gizlilik politikası bağlantısı ekleyin (tüm sayfalarda görünür)',
                  'AB/İngiltere ziyaretçileri için çerez onay afişi uygulayın',
                  'Kaliforniya ziyaretçileri için "Bilgilerimi Satma" bağlantısı ekleyin',
                  'Veri sahibi taleplerini işlemek için bir süreç oluşturun',
                  'Hangi verileri topladığınızı ve nedenini belgeleyin',
                  'Gizlilik uyumu için üçüncü taraf hizmetlerini gözden geçirin',
                  'Uygun güvenlik önlemlerini uygulayın',
                  'Kişisel verileri işleyen ekip üyelerini eğitin'
                ]).map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-600 mr-2">[ ]</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">{isEnglish ? 'Cookie Consent Best Practices' : 'Çerez Onayı En İyi Uygulamaları'}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded">
                  <p className="font-semibold text-green-900 mb-2">{isEnglish ? 'Do:' : 'Yapın:'}</p>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• {isEnglish ? 'Show consent banner BEFORE setting non-essential cookies' : 'Zorunlu olmayan çerezleri ayarlamadan ÖNCE onay afişi gösterin'}</li>
                    <li>• {isEnglish ? 'Allow easy rejection (same prominence as accept)' : 'Kolay redde izin verin (kabul ile aynı belirginlikte)'}</li>
                    <li>• {isEnglish ? 'Provide granular choices by category' : 'Kategoriye göre ayrıntılı seçenekler sağlayın'}</li>
                    <li>• {isEnglish ? 'Remember user choices' : 'Kullanıcı tercihlerini hatırlayın'}</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded">
                  <p className="font-semibold text-red-900 mb-2">{isEnglish ? 'Don\'t:' : 'Yapmayın:'}</p>
                  <ul className="text-red-800 text-sm space-y-1">
                    <li>• {isEnglish ? 'Use pre-checked boxes' : 'Önceden işaretlenmiş kutular kullanmayın'}</li>
                    <li>• {isEnglish ? 'Make rejection harder than acceptance' : 'Reddi kabulden daha zor yapmayın'}</li>
                    <li>• {isEnglish ? 'Use manipulative design ("dark patterns")' : 'Manipülatif tasarım kullanmayın ("karanlık desenler")'}</li>
                    <li>• {isEnglish ? 'Ignore user choices' : 'Kullanıcı tercihlerini yok saymayın'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
            <p className="font-semibold text-yellow-900">{isEnglish ? 'Don\'t Use Free Templates Blindly' : 'Ücretsiz Şablonları Körü Körüne Kullanmayın'}</p>
            <p className="text-yellow-800">
              {isEnglish
                ? 'Generic privacy policy generators often miss important details or include provisions that don\'t match your actual practices. Your privacy policy should accurately describe YOUR data practices—not some generic template. Inaccurate policies can be worse than no policy at all.'
                : 'Genel gizlilik politikası oluşturucuları genellikle önemli ayrıntıları kaçırır veya gerçek uygulamalarınızla eşleşmeyen hükümler içerir. Gizlilik politikanız, SİZİN veri uygulamalarınızı doğru bir şekilde tanımlamalıdır—genel bir şablon değil. Yanlış politikalar hiç politika olmamasından daha kötü olabilir.'}
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Frequently Asked Questions' : 'Sık Sorulan Sorular'}</h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="border border-gray-200 rounded-lg">
                <summary className="p-4 font-semibold cursor-pointer hover:bg-gray-50">{faq.question}</summary>
                <p className="p-4 pt-0 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Summary: Privacy Compliance Essentials' : 'Özet: Gizlilik Uyumu Temelleri'}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-[#C9A227] mb-2">{isEnglish ? 'You Need a Privacy Policy If:' : 'Şu Durumlarda Gizlilik Politikasına İhtiyacınız Var:'}</h3>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• {isEnglish ? 'You collect any personal information' : 'Herhangi bir kişisel bilgi topluyorsunuz'}</li>
                  <li>• {isEnglish ? 'You use analytics or tracking' : 'Analitik veya izleme kullanıyorsunuz'}</li>
                  <li>• {isEnglish ? 'You have EU, California, or Turkish visitors' : 'AB, Kaliforniya veya Türk ziyaretçileriniz var'}</li>
                  <li>• {isEnglish ? 'You use any third-party services' : 'Herhangi bir üçüncü taraf hizmeti kullanıyorsunuz'}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-[#C9A227] mb-2">{isEnglish ? 'Key Requirements:' : 'Temel Gereksinimler:'}</h3>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• {isEnglish ? 'Clear, accessible privacy policy' : 'Açık, erişilebilir gizlilik politikası'}</li>
                  <li>• {isEnglish ? 'Cookie consent for EU visitors' : 'AB ziyaretçileri için çerez onayı'}</li>
                  <li>• {isEnglish ? 'Opt-out option for California residents' : 'Kaliforniya sakinleri için çıkış seçeneği'}</li>
                  <li>• {isEnglish ? 'Process for handling user requests' : 'Kullanıcı taleplerini işleme süreci'}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cite This Entry */}
        <CiteThisEntry
          lang={lang}
          title={isEnglish ? 'Do I Need a Privacy Policy? GDPR, CCPA & KVKK Explained' : 'Gizlilik Politikasına İhtiyacım Var mı? GDPR, CCPA ve KVKK Açıklaması'}
          url={pageUrl}
          dateModified={PAGE_META.dateModified}
          version={PAGE_META.version}
          citationKey={PAGE_META.citationKey}
          contentType="encyclopedia-entry"
          className="mt-8"
        />

      </article>

      <PrimarySources sources={primarySources} lang={isEnglish ? 'en' : 'tr'} />

      {/* Related Articles */}
      <section className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Articles' : 'İlgili Makaleler'}</h2>
        <ul className="space-y-2">
          <li>
            <Link href={`/${lang}/encyclopedia/freelancer-legal-guide`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'Freelancer Legal Guide' : 'Serbest Çalışan Hukuk Rehberi'} →
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/encyclopedia/what-is-nda`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'What is an NDA?' : 'NDA Nedir?'} →
            </Link>
          </li>
          <li>
            <Link href={`/${lang}/encyclopedia`} className="text-[#C9A227] hover:underline">
              {isEnglish ? 'Back to Encyclopedia' : 'Ansiklopediye Dön'} →
            </Link>
          </li>
        </ul>
      </section>
    </main>
  )
}
