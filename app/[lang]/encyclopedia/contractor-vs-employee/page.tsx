import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateScholarlyArticleSchema, generateFAQSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const PAGE_META = {
  slug: 'contractor-vs-employee',
  datePublished: '2025-07-10',
  dateModified: '2026-01-22',
  version: '1.3',
  wordCount: 5200,
  citationKey: 'ecl-enc-00003',
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isEnglish = params.lang === 'en'
  const url = `${SITE_URL}/${params.lang}/encyclopedia/${PAGE_META.slug}`
  return {
    title: isEnglish
      ? 'Contractor vs Employee: Complete Classification Guide | EchoLegal'
      : 'Bağımsız Yüklenici mi, İşçi mi: Kapsamlı Sınıflandırma Rehberi | EchoLegal',
    description: isEnglish
      ? 'Understand the critical differences between contractors and employees. Learn IRS tests, legal factors, misclassification risks, and how to properly classify workers.'
      : 'Bağımsız yüklenici ile işçi arasındaki temel farklar. IRS testleri, hukuki kriterler, hatalı sınıflandırma riskleri ve doğru statü belirleme yöntemleri.',
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en/encyclopedia/${PAGE_META.slug}`,
        'tr': `${SITE_URL}/tr/encyclopedia/${PAGE_META.slug}`,
      },
    },
    other: {
      'citation_title': isEnglish ? 'Contractor vs Employee: Complete Classification Guide' : 'Bağımsız Yüklenici mi, İşçi mi: Kapsamlı Sınıflandırma Rehberi',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/07/10',
      'citation_lastmod': '2026/01/22',
      'citation_version': PAGE_META.version,
      'citation_language': params.lang,
      'citation_fulltext_html_url': url,
      'citation_id': PAGE_META.citationKey,
    },
  }
}

export default async function ContractorVsEmployeePage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const pageUrl = `${SITE_URL}/${lang}/encyclopedia/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'Contractor vs Employee' : 'Bağımsız Yüklenici mi, İşçi mi?'

  const faqs = isEnglish ? [
    { question: 'Can a contract override classification rules?', answer: 'No. A contract calling someone a "contractor" doesn\'t make them one legally. Classification is determined by the actual nature of the working relationship, not by labels or agreements. Courts and agencies look at how work is actually performed.' },
    { question: 'What if I\'ve been misclassified?', answer: 'You can file a complaint with the IRS (Form SS-8), Department of Labor, or your state labor agency. You may be entitled to back pay, overtime, benefits, and tax refunds. Consider consulting an employment attorney.' },
    { question: 'Can I be a contractor for one company and employee for another?', answer: 'Yes, absolutely. Classification is determined relationship by relationship. You could be an employee at your day job and a legitimate contractor for freelance work, as long as each relationship meets the appropriate criteria.' },
    { question: 'Does working from home make me a contractor?', answer: 'No. Remote work alone doesn\'t determine classification. Many employees work from home. What matters is the degree of control over HOW work is performed, not WHERE.' },
    { question: 'What about the gig economy?', answer: 'Gig workers (Uber, DoorDash, etc.) have been the subject of major legal battles. Some states (California) have moved toward classifying them as employees, while others maintain contractor status. This area of law is rapidly evolving.' }
  ] : [
    { question: 'Sözleşme sınıflandırma kurallarını geçersiz kılabilir mi?', answer: 'Hayır. Birini "yüklenici" olarak adlandıran bir sözleşme onu yasal olarak yüklenici yapmaz. Sınıflandırma, etiketler veya anlaşmalarla değil, çalışma ilişkisinin gerçek doğasıyla belirlenir. Mahkemeler ve kurumlar işin gerçekte nasıl yapıldığına bakar.' },
    { question: 'Yanlış sınıflandırılmışsam ne olur?', answer: 'IRS (Form SS-8), Çalışma Bakanlığı veya eyalet çalışma kurumunuza şikayette bulunabilirsiniz. Geri ödeme, fazla mesai, haklar ve vergi iadeleri hakkınız olabilir. Bir iş hukuku avukatına danışmayı düşünün.' },
    { question: 'Bir şirket için yüklenici ve başka biri için çalışan olabilir miyim?', answer: 'Evet, kesinlikle. Sınıflandırma ilişkiye göre belirlenir. Günlük işinizde çalışan ve serbest çalışma için meşru yüklenici olabilirsiniz, her ilişki uygun kriterleri karşıladığı sürece.' },
    { question: 'Evden çalışmak beni yüklenici yapar mı?', answer: 'Hayır. Uzaktan çalışma tek başına sınıflandırmayı belirlemez. Birçok çalışan evden çalışır. Önemli olan işin NEREDE değil, NASIL yapıldığı üzerindeki kontrol derecesidir.' },
    { question: 'Gig ekonomisi ne olacak?', answer: 'Gig çalışanları (Uber, DoorDash, vb.) büyük hukuki mücadelelerin konusu olmuştur. Bazı eyaletler (Kaliforniya) onları çalışan olarak sınıflandırmaya doğru ilerledi, diğerleri yüklenici statüsünü sürdürüyor. Bu hukuk alanı hızla gelişiyor.' }
  ]

  const scholarlySchema = generateScholarlyArticleSchema({
    title: isEnglish ? 'Contractor vs Employee: Complete Classification Guide' : 'Bağımsız Yüklenici mi, İşçi mi: Kapsamlı Sınıflandırma Rehberi',
    alternativeHeadline: isEnglish ? 'Worker Classification — IRS Tests, ABC Test, and Compliance' : 'İşçi Sınıflandırması — IRS Testleri, ABC Testi ve Uyum',
    abstractText: isEnglish
      ? 'A reference guide to worker classification: legal tests, compliance requirements, and structuring working relationships.'
      : 'İşçi sınıflandırması referans rehberi: hukuki testler, uyum gereklilikleri ve çalışma ilişkilerinin yapılandırılması.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['contractor', 'employee', 'worker-classification', 'irs-test', 'abc-test', 'misclassification'],
    wordCount: PAGE_META.wordCount,
    citationKey: PAGE_META.citationKey,
    aboutTopics: ['Worker Classification', 'Employment Law', 'Independent Contractor'],
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
        <span className="text-black font-medium">{isEnglish ? 'Contractor vs Employee' : 'Bağımsız Yüklenici mi, İşçi mi'}</span>
      </nav>

      {/* Article Header */}
      <article>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {isEnglish ? 'Contractor vs Employee' : 'Bağımsız Yüklenici mi, İşçi mi?'}
        </h1>

        <p className="text-xl text-gray-600 mb-6">
          {isEnglish
            ? 'A reference guide to worker classification: legal tests, compliance requirements, and structuring working relationships.'
            : 'İşçi sınıflandırması referans rehberi: hukuki testler, uyum gereklilikleri ve çalışma ilişkilerinin yapılandırılması.'}
        </p>

        <InstitutionalBadge
          lang={lang}
          jurisdictions={['US']}
          lastReviewedAt={PAGE_META.dateModified}
          className="mb-12"
        />

        {/* Warning Box */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-12">
          <h2 className="font-bold text-red-900 mb-2">{isEnglish ? 'Why This Matters' : 'Bu Neden Önemli'}</h2>
          <p className="text-red-800">
            {isEnglish
              ? 'Misclassifying an employee as an independent contractor can result in back taxes, penalties calculated as a percentage of unpaid employment taxes [citation needed for current rates], lawsuits for unpaid benefits, and even criminal prosecution. Both businesses hiring workers and individuals working as contractors need to understand these rules.'
              : 'Bir işçiyi bağımsız yüklenici olarak hatalı sınıflandırmak ciddi sonuçlar doğurabilir: geriye dönük vergi borcu, ödenmemiş istihdam vergilerinin belirli bir yüzdesine ulaşan cezalar [güncel oranlar için kaynak doğrulaması gereklidir], hak talepleri davaları ve hatta cezai soruşturma. Bu kuralları hem işveren hem de yüklenici konumundaki kişilerin bilmesi zorunludur.'}
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="font-bold mb-4">{isEnglish ? 'Table of Contents' : 'İçindekiler'}</h2>
          <ul className="space-y-2">
            <li><a href="#overview" className="text-[#C9A227] hover:underline">{isEnglish ? '1. Overview: Employee vs Contractor' : '1. Genel Bakış: İşçi ve Yüklenici Ayrımı'}</a></li>
            <li><a href="#irs-test" className="text-[#C9A227] hover:underline">{isEnglish ? '2. The IRS 3-Factor Test' : '2. IRS 3-Faktör Testi'}</a></li>
            <li><a href="#abc-test" className="text-[#C9A227] hover:underline">{isEnglish ? '3. The ABC Test (California & Beyond)' : '3. ABC Testi (Kaliforniya ve Ötesi)'}</a></li>
            <li><a href="#economic-reality" className="text-[#C9A227] hover:underline">{isEnglish ? '4. Economic Reality Test (DOL)' : '4. Ekonomik Gerçeklik Testi (DOL)'}</a></li>
            <li><a href="#comparison" className="text-[#C9A227] hover:underline">{isEnglish ? '5. Side-by-Side Comparison' : '5. Yan Yana Karşılaştırma'}</a></li>
            <li><a href="#misclassification" className="text-[#C9A227] hover:underline">{isEnglish ? '6. Misclassification Consequences' : '6. Yanlış Sınıflandırma Sonuçları'}</a></li>
            <li><a href="#international" className="text-[#C9A227] hover:underline">{isEnglish ? '7. International Considerations' : '7. Uluslararası Değerlendirmeler'}</a></li>
            <li><a href="#best-practices" className="text-[#C9A227] hover:underline">{isEnglish ? '8. Best Practices for Compliance' : '8. Uyum İçin En İyi Uygulamalar'}</a></li>
          </ul>
        </div>

        {/* Section 1: Overview */}
        <section id="overview" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '1. Overview: Employee vs Contractor' : '1. Genel Bakış: İşçi ve Yüklenici Ayrımı'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'The distinction between an employee and an independent contractor isn\'t just about job titles or what a contract says—it\'s determined by the actual nature of the working relationship. What you call the worker doesn\'t matter; what matters is how the work is actually performed.'
              : 'İşçi ile bağımsız yüklenici arasındaki fark, iş unvanına ya da sözleşmede yazılana göre değil, fiili çalışma ilişkisinin niteliğine göre belirlenir. Kişiye hangi sıfatı verdiğiniz değil, işin pratikte nasıl yürütüldüğü belirleyicidir.'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">{isEnglish ? 'Employee' : 'İşçi (Çalışan)'}</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Works under employer\'s control and direction' : 'İşverenin emir ve talimatları doğrultusunda çalışır'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Set hours and workplace' : 'Çalışma saatleri ve yeri işverence belirlenir'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Uses employer\'s tools and equipment' : 'İşverenin araç ve gereçlerini kullanır'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Receives benefits (health, retirement, etc.)' : 'Sosyal haklardan yararlanır (sağlık, emeklilik vb.)'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Taxes withheld by employer' : 'Vergi kesintisi işverence yapılır'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Protected by labor laws' : 'İş mevzuatı kapsamında koruma altındadır'}</span>
                </li>
              </ul>
            </div>

            <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
              <h3 className="text-xl font-semibold mb-4 text-green-900">{isEnglish ? 'Independent Contractor' : 'Bağımsız Yüklenici'}</h3>
              <ul className="space-y-2 text-green-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Controls how, when, and where work is done' : 'İşin nasıl, ne zaman ve nerede yapılacağına kendisi karar verir'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Sets own schedule and location' : 'Çalışma takvimini ve mekanını kendisi belirler'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Uses own tools and equipment' : 'Kendi araç ve gereçlerini kullanır'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'No benefits from client' : 'Müşteriden sosyal hak talep edemez'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Pays own taxes (self-employment)' : 'Vergisini kendisi öder (serbest meslek)'}</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{isEnglish ? 'Works for multiple clients' : 'Birden fazla müşteriye hizmet verir'}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: IRS Test */}
        <section id="irs-test" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '2. The IRS 3-Factor Test' : '2. IRS 3-Faktör Testi'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'The IRS uses a "common law" test that examines the degree of control and independence in the relationship. It focuses on three categories of factors:'
              : 'IRS, taraflar arasındaki kontrol ve bağımsızlık derecesini değerlendiren bir "common law" testi uygular. Bu test üç ana faktör grubunu inceler:'}
          </p>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-[#C9A227] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                {isEnglish ? 'Behavioral Control' : 'Davranışsal Kontrol'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isEnglish
                  ? 'Does the company control or have the right to control what the worker does and how they do it?'
                  : 'Şirket, işçinin ne yaptığını ve nasıl yaptığını fiilen kontrol ediyor mu ya da buna hakkı var mı?'}
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="font-semibold mb-2">{isEnglish ? 'Key Questions:' : 'Önemli Sorular:'}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {isEnglish ? 'Does the company dictate when, where, and how work is done?' : 'Şirket işin zamanını, yerini ve yöntemini belirliyor mu?'}</li>
                  <li>• {isEnglish ? 'Does the company provide training on methods?' : 'Şirket çalışma yöntemleri konusunda eğitim veriyor mu?'}</li>
                  <li>• {isEnglish ? 'Is there a sequence in which work must be performed?' : 'İşin belirli bir sırayla yapılması isteniyor mu?'}</li>
                  <li>• {isEnglish ? 'Does the company evaluate HOW work is done vs just results?' : 'Şirket yalnızca sonucu mu yoksa işin NASIL yapıldığını mı denetliyor?'}</li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-[#C9A227] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                {isEnglish ? 'Financial Control' : 'Finansal Kontrol'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isEnglish
                  ? 'Does the business direct or control the financial and business aspects of the worker\'s job?'
                  : 'İşletme, işçinin mali ve ticari faaliyetlerini yönlendiriyor veya denetliyor mu?'}
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="font-semibold mb-2">{isEnglish ? 'Key Questions:' : 'Önemli Sorular:'}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {isEnglish ? 'Does the worker have unreimbursed business expenses?' : 'İşçinin tazmin edilmeyen iş giderleri var mı?'}</li>
                  <li>• {isEnglish ? 'Does the worker invest in their own equipment/facilities?' : 'İşçi kendi ekipman veya tesisine yatırım yapıyor mu?'}</li>
                  <li>• {isEnglish ? 'Does the worker make their services available to the market?' : 'İşçi hizmetlerini açık piyasada sunuyor mu?'}</li>
                  <li>• {isEnglish ? 'How is the worker paid (hourly vs project vs commission)?' : 'Ödeme nasıl yapılıyor (saatlik mi, proje bazlı mı, komisyon mu)?'}</li>
                  <li>• {isEnglish ? 'Can the worker realize profit or loss?' : 'İşçi kâr veya zarar edebilecek konumda mı?'}</li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-[#C9A227] text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                {isEnglish ? 'Type of Relationship' : 'İlişki Türü'}
              </h3>
              <p className="text-gray-600 mb-4">
                {isEnglish
                  ? 'What is the nature of the relationship between the parties?'
                  : 'Taraflar arasındaki ilişkinin doğası nedir?'}
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="font-semibold mb-2">{isEnglish ? 'Key Questions:' : 'Önemli Sorular:'}</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {isEnglish ? 'Are there written contracts describing the relationship?' : 'İlişkiyi düzenleyen yazılı bir sözleşme var mı?'}</li>
                  <li>• {isEnglish ? 'Does the worker receive benefits (insurance, pension, vacation)?' : 'İşçi sosyal haklardan yararlanıyor mu (sigorta, emeklilik, izin)?'}</li>
                  <li>• {isEnglish ? 'Is the relationship expected to be permanent or for a project?' : 'İlişki süresiz mi yoksa belirli bir projeye mi bağlı?'}</li>
                  <li>• {isEnglish ? 'Is the work a key aspect of the regular business?' : 'Yapılan iş, işletmenin esas faaliyet alanının parçası mı?'}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-semibold text-blue-900">{isEnglish ? 'Important Note' : 'Önemli Not'}</p>
            <p className="text-blue-800">
              {isEnglish
                ? 'No single factor is determinative. The IRS looks at the entire relationship. You can request an IRS determination using Form SS-8, but this can take 6+ months and may trigger an audit.'
                : 'Tek bir faktör belirleyici değildir; IRS ilişkinin bütününü değerlendirir. SS-8 Formu ile IRS\'ten statü tespiti talep edebilirsiniz; ancak bu süreç altı ayı aşabilir ve vergi denetimi başlatabilir.'}
            </p>
          </div>
        </section>

        {/* Section 3: ABC Test */}
        <section id="abc-test" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '3. The ABC Test (California & Beyond)' : '3. ABC Testi (Kaliforniya ve Ötesi)'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'California\'s AB5 law (and similar laws in other states like New Jersey, Massachusetts, and Illinois) uses the stricter ABC Test. Under this test, a worker is presumed to be an employee unless ALL THREE conditions are met:'
              : 'Kaliforniya\'nın AB5 yasası (ve New Jersey, Massachusetts, Illinois gibi eyaletlerdeki benzerleri) daha katı olan ABC Testini uygular. Bu teste göre, aşağıdaki ÜÇ koşulun TAMAMI sağlanmadıkça kişi işçi sayılır:'}
          </p>

          <div className="space-y-4">
            <div className="border-2 border-[#C9A227] rounded-lg p-6 bg-amber-50">
              <h3 className="text-lg font-bold mb-2 flex items-center">
                <span className="bg-[#C9A227] text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3">A</span>
                {isEnglish ? 'Free from Control' : 'Kontrolden Bağımsız'}
              </h3>
              <p className="text-gray-700">
                {isEnglish
                  ? 'The worker is free from the control and direction of the hiring entity in performing the work, both under the contract and in fact.'
                  : 'İşçi, hem sözleşme gereği hem de fiilen, işi veren tarafın kontrol ve yönlendirmesinden bağımsız biçimde çalışmalıdır.'}
              </p>
            </div>

            <div className="border-2 border-[#C9A227] rounded-lg p-6 bg-amber-50">
              <h3 className="text-lg font-bold mb-2 flex items-center">
                <span className="bg-[#C9A227] text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3">B</span>
                {isEnglish ? 'Outside Usual Business' : 'Olağan İşin Dışında'}
              </h3>
              <p className="text-gray-700">
                {isEnglish
                  ? 'The worker performs work that is outside the usual course of the hiring entity\'s business.'
                  : 'İşçinin yaptığı iş, işi veren kuruluşun olağan faaliyet alanının dışında kalmalıdır.'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {isEnglish
                  ? 'Example: A plumber hired by a retail store = contractor. A plumber hired by a plumbing company = likely employee.'
                  : 'Örnek: Perakende mağazanın tuttuğu tesisatçı = yüklenici. Tesisat şirketinin istihdam ettiği tesisatçı = büyük olasılıkla işçi.'}
              </p>
            </div>

            <div className="border-2 border-[#C9A227] rounded-lg p-6 bg-amber-50">
              <h3 className="text-lg font-bold mb-2 flex items-center">
                <span className="bg-[#C9A227] text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center mr-3">C</span>
                {isEnglish ? 'Independent Business' : 'Bağımsız İş'}
              </h3>
              <p className="text-gray-700">
                {isEnglish
                  ? 'The worker is customarily engaged in an independently established trade, occupation, or business of the same nature as the work performed.'
                  : 'İşçi, yaptığı işle aynı nitelikteki bağımsız bir ticari faaliyet, meslek veya işletmeyi fiilen sürdürüyor olmalıdır.'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {isEnglish
                  ? 'Evidence: Business license, own website, multiple clients, advertising services publicly'
                  : 'Kanıt olabilecekler: İşletme ruhsatı, kendi web sitesi, birden fazla müşteri, hizmetlerin kamuya açık tanıtımı'}
              </p>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
            <p className="font-semibold text-red-900">{isEnglish ? 'The "B" Prong is the Hardest' : '"B" Şartı En Zordur'}</p>
            <p className="text-red-800">
              {isEnglish
                ? 'Many businesses fail the ABC test on prong B. If a software company hires a freelance developer to write code, that\'s arguably within their "usual course of business." This has made contractor relationships much harder in ABC test states.'
                : 'Pek çok işletme ABC testinin B koşulunu sağlayamaz. Örneğin bir yazılım şirketi, kod yazdırmak için serbest geliştirici tutarsa, bu iş şirketin "olağan faaliyet alanı" içinde kalır. Bu durum, ABC testi uygulayan eyaletlerde yüklenici ilişkisi kurmayı belirgin şekilde zorlaştırmıştır.'}
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="font-semibold mb-3">{isEnglish ? 'States Using ABC Test (as of 2026)' : 'ABC Testi Kullanan Eyaletler (2026 itibarıyla)'}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              {['California', 'Connecticut', 'Delaware', 'Illinois', 'Indiana', 'Louisiana', 'Massachusetts', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'Vermont', 'Washington', 'West Virginia'].map((state) => (
                <span key={state} className="bg-white px-2 py-1 rounded border">{state}</span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">{isEnglish ? 'Note: States may use ABC test for specific purposes (e.g., unemployment) only.' : 'Not: Eyaletler ABC testini yalnızca belirli amaçlar için (örneğin, işsizlik) kullanabilir.'}</p>
          </div>
        </section>

        {/* Section 4: Economic Reality Test */}
        <section id="economic-reality" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '4. Economic Reality Test (DOL)' : '4. Ekonomik Gerçeklik Testi (DOL)'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'The Department of Labor uses the Economic Reality Test for determining worker classification under the Fair Labor Standards Act (FLSA). This test focuses on whether the worker is economically dependent on the employer.'
              : 'ABD Çalışma Bakanlığı (DOL), Adil Çalışma Standartları Yasası (FLSA) kapsamında statü belirlemek için Ekonomik Gerçeklik Testini uygular. Bu testte esas soru, işçinin ekonomik açıdan işverene bağımlı olup olmadığıdır.'}
          </p>

          <div className="space-y-4">
            {(isEnglish ? [
              { factor: 'Opportunity for Profit or Loss', desc: 'Can the worker\'s managerial skill affect their profit or loss?' },
              { factor: 'Investment', desc: 'Does the worker invest in equipment, materials, or helpers?' },
              { factor: 'Permanence of Relationship', desc: 'Is the work relationship indefinite/continuous or project-based?' },
              { factor: 'Nature and Degree of Control', desc: 'How much control does the employer exercise over the work?' },
              { factor: 'Integral to Business', desc: 'Is the work integral to the employer\'s business?' },
              { factor: 'Skill and Initiative', desc: 'Does the worker use specialized skills and business-like initiative?' }
            ] : [
              { factor: 'Kâr veya Zarar İmkanı', desc: 'İşçinin yönetsel kararları, kâr veya zarar sonucunu etkiler mi?' },
              { factor: 'Yatırım', desc: 'İşçi ekipman, malzeme veya yardımcı personele yatırım yapıyor mu?' },
              { factor: 'İlişkinin Sürekliliği', desc: 'Çalışma ilişkisi belirsiz süreli mi yoksa proje bazlı mı?' },
              { factor: 'Kontrolün Niteliği ve Kapsamı', desc: 'İşveren, iş üzerinde ne düzeyde kontrol uyguluyor?' },
              { factor: 'İşletme Faaliyetiyle Bütünlük', desc: 'Yapılan iş, işverenin esas faaliyetinin ayrılmaz parçası mı?' },
              { factor: 'Beceri ve Girişimcilik', desc: 'İşçi, uzmanlık gerektiren beceriler ve ticari girişimcilik sergiliyor mu?' }
            ]).map((item, i) => (
              <div key={i} className="flex items-start border-l-4 border-gray-300 pl-4">
                <span className="font-semibold text-[#C9A227] mr-2">{i + 1}.</span>
                <div>
                  <span className="font-semibold">{item.factor}:</span>
                  <span className="text-gray-600 ml-1">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
            <p className="font-semibold text-blue-900">{isEnglish ? 'The Core Question' : 'Temel Soru'}</p>
            <p className="text-blue-800">
              {isEnglish
                ? 'The ultimate question is: Is this worker economically dependent on the employer (employee) or in business for themselves (contractor)? No single factor is decisive—the totality of circumstances matters.'
                : 'Nihai soru şudur: Bu kişi ekonomik olarak işverene mi bağımlıdır (işçi), yoksa kendi adına mı faaliyet göstermektedir (yüklenici)? Tek bir faktör belirleyici değildir; koşulların bütünü esas alınır.'}
            </p>
          </div>
        </section>

        {/* Section 5: Comparison */}
        <section id="comparison" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '5. Side-by-Side Comparison' : '5. Yan Yana Karşılaştırma'}</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Factor' : 'Faktör'}</th>
                  <th className="border border-gray-200 p-3 text-left bg-blue-50">{isEnglish ? 'Employee' : 'İşçi'}</th>
                  <th className="border border-gray-200 p-3 text-left bg-green-50">{isEnglish ? 'Contractor' : 'Yüklenici'}</th>
                </tr>
              </thead>
              <tbody>
                {(isEnglish ? [
                  { factor: 'Schedule', employee: 'Set by employer', contractor: 'Sets own hours' },
                  { factor: 'Location', employee: 'Works at employer\'s site', contractor: 'Works anywhere' },
                  { factor: 'Tools', employee: 'Employer provides', contractor: 'Provides own' },
                  { factor: 'Training', employee: 'Receives training', contractor: 'Already skilled' },
                  { factor: 'Payment', employee: 'Regular salary/hourly', contractor: 'Per project/invoice' },
                  { factor: 'Taxes', employee: 'Withheld by employer', contractor: 'Pays own (1099)' },
                  { factor: 'Benefits', employee: 'May receive', contractor: 'None from client' },
                  { factor: 'Termination', employee: 'Can be fired', contractor: 'Contract ends' },
                  { factor: 'Exclusivity', employee: 'Often exclusive', contractor: 'Multiple clients' },
                  { factor: 'Direction', employee: 'Told how to work', contractor: 'Controls methods' },
                ] : [
                  { factor: 'Çalışma Saati', employee: 'İşverence belirlenir', contractor: 'Kendi belirler' },
                  { factor: 'Çalışma Yeri', employee: 'İşverenin tesisinde', contractor: 'İstediği yerde' },
                  { factor: 'Araç-Gereç', employee: 'İşveren sağlar', contractor: 'Kendisi sağlar' },
                  { factor: 'Eğitim', employee: 'İşverence verilir', contractor: 'Mevcut uzmanlığı kullanır' },
                  { factor: 'Ödeme', employee: 'Düzenli maaş veya saatlik', contractor: 'Proje bazlı / fatura ile' },
                  { factor: 'Vergi', employee: 'İşverence kesilir', contractor: 'Kendisi öder (1099)' },
                  { factor: 'Sosyal Haklar', employee: 'Hak sahibi olabilir', contractor: 'Müşteriden talep edemez' },
                  { factor: 'Sona Erme', employee: 'İşten çıkarılabilir', contractor: 'Sözleşme ile sona erer' },
                  { factor: 'Münhasırlık', employee: 'Genellikle tek işveren', contractor: 'Birden fazla müşteriye hizmet verir' },
                  { factor: 'Yönlendirme', employee: 'Çalışma yöntemi işverence belirlenir', contractor: 'Yöntemini kendisi seçer' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-200 p-3 font-medium">{row.factor}</td>
                    <td className="border border-gray-200 p-3 bg-blue-50/50">{row.employee}</td>
                    <td className="border border-gray-200 p-3 bg-green-50/50">{row.contractor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Misclassification */}
        <section id="misclassification" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '6. Misclassification Consequences' : '6. Hatalı Sınıflandırmanın Sonuçları'}</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {isEnglish
              ? 'Misclassifying employees as contractors carries serious legal and financial penalties for businesses. Workers may also have claims for unpaid benefits and protections.'
              : 'İşçileri yüklenici olarak hatalı sınıflandırmanın işletmeler açısından ağır hukuki ve mali yaptırımları vardır. İşçiler de eksik kalan hak ve korumaları talep edebilir.'}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
              <h3 className="text-lg font-semibold text-red-900 mb-4">{isEnglish ? 'For Businesses' : 'İşletmeler İçin'}</h3>
              <ul className="space-y-3 text-red-800">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">--</span>
                  <div>
                    <strong>{isEnglish ? 'Back Taxes:' : 'Geriye Dönük Vergiler:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'All unpaid employment taxes (Social Security, Medicare, unemployment)' : 'Eksik yatırılan tüm istihdam vergileri (Sosyal Güvenlik, Medicare, işsizlik sigortası)'}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">--</span>
                  <div>
                    <strong>{isEnglish ? 'Penalties:' : 'Cezalar:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'Up to 40% of unpaid taxes, plus interest' : 'Eksik vergilerin %40\'ına varan para cezası ve faiz'}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">--</span>
                  <div>
                    <strong>{isEnglish ? 'Unpaid Benefits:' : 'Ödenmemiş Haklar:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'Health insurance, retirement, paid leave owed' : 'Sağlık sigortası, emeklilik ve ücretli izin borçları'}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">--</span>
                  <div>
                    <strong>{isEnglish ? 'Overtime & Minimum Wage:' : 'Fazla Mesai ve Asgari Ücret:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'FLSA violations with liquidated damages (2x)' : 'FLSA ihlali halinde iki katına kadar tazminat'}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">--</span>
                  <div>
                    <strong>{isEnglish ? 'Criminal Liability:' : 'Cezai Sorumluluk:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'Willful violations can lead to prosecution' : 'Kasıtlı ihlaller cezai kovuşturma konusu olabilir'}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border border-orange-200 rounded-lg p-6 bg-orange-50">
              <h3 className="text-lg font-semibold text-orange-900 mb-4">{isEnglish ? 'For Workers' : 'İşçiler İçin'}</h3>
              <ul className="space-y-3 text-orange-800">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">!</span>
                  <div>
                    <strong>{isEnglish ? 'No Employer Tax Match:' : 'İşveren Vergi Katkısı Yok:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'You pay full 15.3% self-employment tax' : 'Serbest meslek vergisinin tamamını (%15,3) siz ödersiniz'}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">!</span>
                  <div>
                    <strong>{isEnglish ? 'No Benefits:' : 'Sosyal Hak Yok:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'No health insurance, retirement, PTO' : 'Sağlık sigortası, emeklilik veya ücretli izin hakkı bulunmaz'}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">!</span>
                  <div>
                    <strong>{isEnglish ? 'No Worker Protections:' : 'İş Mevzuatı Koruması Yok:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'No unemployment, workers\' comp, FMLA' : 'İşsizlik sigortası, iş kazası tazminatı ve FMLA korumasından yararlanamaz'}</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">--</span>
                  <div>
                    <strong>{isEnglish ? 'You May Have Claims:' : 'Hak Talebi Yolunuz Açık:'}</strong>
                    <span className="text-sm block">{isEnglish ? 'Can file complaints with DOL, state agencies, or sue for back pay/benefits' : 'DOL veya eyalet kurumlarına başvurabilir ya da birikmiş ücret ve haklar için dava açabilirsiniz'}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 my-6">
            <h3 className="font-semibold mb-3">{isEnglish ? 'Real-World Penalties' : 'Uygulamadaki Yaptırımlar'}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span>{isEnglish ? 'Failure to withhold taxes' : 'Vergi kesintisi yapılmaması'}</span>
                <span className="font-semibold">{isEnglish ? '1.5% of wages + 40% of FICA' : 'Ücretlerin %1,5 + FICA\'nın %40\'ı'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span>{isEnglish ? 'Failure to file W-2s' : 'W-2 formlarının bildirilmemesi'}</span>
                <span className="font-semibold">$50-$280 {isEnglish ? 'per form' : 'form başına'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span>{isEnglish ? 'FLSA overtime violations' : 'FLSA fazla mesai ihlalleri'}</span>
                <span className="font-semibold">{isEnglish ? '2x back pay + attorney fees' : '2 kat geriye dönük ödeme + avukatlık ücreti'}</span>
              </div>
              <div className="flex justify-between">
                <span>{isEnglish ? 'State penalties (CA example)' : 'Eyalet cezaları (CA örneği)'}</span>
                <span className="font-semibold">$5,000-$25,000 {isEnglish ? 'per violation' : 'ihlal başına'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: International */}
        <section id="international" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '7. International Considerations' : '7. Uluslararası Değerlendirmeler'}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {isEnglish
              ? 'Worker classification rules vary significantly by country. When working across borders, both businesses and workers need to understand local requirements.'
              : 'İşçi sınıflandırma kuralları ülkeden ülkeye büyük farklılıklar gösterir. Uluslararası faaliyet gösteren hem işletmelerin hem de çalışanların, ilgili ülkenin yerel düzenlemelerini bilmesi gerekir.'}
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Turkey' : 'Türkiye'}</h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'Turkey uses a "subordination" test focusing on whether the worker is under the employer\'s authority and instruction. Turkish law strongly presumes employment relationships, and misclassification can result in back social security contributions plus penalties.'
                  : 'Türk hukukunda belirleyici kriter "bağımlılık" unsurudur: İşçi, işverenin emir ve talimatlarına tabi midir? Türk iş mevzuatı, şüphe halinde iş ilişkisinin varlığını esas alır. Hatalı sınıflandırma durumunda geriye dönük SGK primleri ve idari para cezaları gündeme gelir.'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'European Union' : 'Avrupa Birliği'}</h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'EU member states have varying tests but generally favor employee classification. The proposed Platform Work Directive would create presumption of employment for platform workers, shifting burden to platforms to prove contractor status.'
                  : 'AB üye devletleri farklı testler uygular; ancak genel eğilim, kişiyi işçi olarak sınıflandırmaktan yanadır. Hazırlanan Platform Çalışma Direktifi, platform çalışanları için iş ilişkisi karinesi öngörmekte ve yüklenici statüsünü ispat yükünü platforma yüklemektedir.'}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'United Kingdom' : 'Birleşik Krallık'}</h3>
              <p className="text-gray-600 text-sm">
                {isEnglish
                  ? 'UK has three categories: employee, worker, and self-employed. The "worker" status provides some protections (minimum wage, paid leave) without full employment rights. IR35 rules require companies to determine contractor status for tax purposes.'
                  : 'Birleşik Krallık hukukunda üç kategori bulunur: çalışan (employee), işçi (worker) ve serbest meslek erbabı. "Worker" statüsü, tam istihdam haklarına sahip olmaksızın asgari ücret ve ücretli izin gibi bazı korumaları kapsar. IR35 düzenlemeleri, şirketlerin vergisel açıdan yüklenici statüsünü tespit etmesini zorunlu kılar.'}
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
            <p className="font-semibold text-yellow-900">{isEnglish ? 'Cross-Border Hiring' : 'Sınır Ötesi İşe Alma'}</p>
            <p className="text-yellow-800">
              {isEnglish
                ? 'If you hire contractors in other countries, you must comply with THAT country\'s classification rules, not just US rules. Many companies use Employer of Record (EOR) services to manage international compliance.'
                : 'Başka ülkelerde yüklenici çalıştırıyorsanız, yalnızca ABD kurallarına değil, ilgili ülkenin sınıflandırma düzenlemelerine de uymanız gerekir. Pek çok şirket, uluslararası uyumu sağlamak için kayıtlı işveren (EOR) hizmetlerinden yararlanmaktadır.'}
            </p>
          </div>
        </section>

        {/* Section 8: Best Practices */}
        <section id="best-practices" className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? '8. Best Practices for Compliance' : '8. Uyum İçin En İyi Uygulamalar'}</h2>

          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4">{isEnglish ? 'For Businesses Hiring Contractors' : 'Yüklenici İşe Alan İşletmeler İçin'}</h3>
              <ul className="space-y-2 text-green-800">
                {(isEnglish ? [
                  'Use clear written contracts specifying contractor relationship',
                  'Don\'t control HOW work is done—focus on results',
                  'Allow contractors to work for others',
                  'Don\'t provide training (hire skilled contractors)',
                  'Let contractors set their own hours and workplace',
                  'Pay by project/milestone, not hourly/salary',
                  'Require contractors to provide their own tools',
                  'Don\'t offer employee benefits',
                  'Issue 1099s, not W-2s',
                  'Document the business purpose for contractor vs employee decision'
                ] : [
                  'Yüklenici ilişkisini açıkça belirten yazılı sözleşme düzenleyin',
                  'İşin NASIL yapıldığını değil, sonucunu denetleyin',
                  'Yüklenicinin başka müşterilerle çalışmasına engel olmayın',
                  'Eğitim vermeyin; gerekli uzmanlığa sahip kişilerle çalışın',
                  'Yüklenicinin çalışma saatlerini ve mekanını kendisinin belirlemesine izin verin',
                  'Maaş veya saatlik ücret yerine proje ya da aşama bazlı ödeme yapın',
                  'Yüklenicinin kendi araç-gereçlerini kullanmasını sağlayın',
                  'İşçilere sağlanan sosyal hakları sunmayın',
                  'W-2 değil, 1099 formu düzenleyin',
                  'Yüklenici tercihinin ticari gerekçesini yazılı olarak belgeleyin'
                ]).map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-600 mr-2">--</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">{isEnglish ? 'For Workers/Freelancers' : 'İşçiler/Serbest Çalışanlar İçin'}</h3>
              <ul className="space-y-2 text-blue-800">
                {(isEnglish ? [
                  'Form a business entity (LLC) to demonstrate independence',
                  'Work for multiple clients',
                  'Have your own website and marketing materials',
                  'Use your own equipment and software',
                  'Set your own rates and hours',
                  'Invoice for your work (don\'t accept paychecks)',
                  'Carry your own insurance',
                  'Sign contracts as a business, not an individual',
                  'Avoid arrangements that look like employment'
                ] : [
                  'Bağımsızlığı göstermek için bir iş kuruluşu (LLC) kurun',
                  'Birden fazla müşteri için çalışın',
                  'Kendi web siteniz ve pazarlama materyalleriniz olsun',
                  'Kendi ekipman ve yazılımınızı kullanın',
                  'Kendi ücretlerinizi ve saatlerinizi belirleyin',
                  'İşiniz için fatura kesin (maaş çeki kabul etmeyin)',
                  'Kendi sigortanızı taşıyın',
                  'Sözleşmeleri birey olarak değil, işletme olarak imzalayın',
                  'İstihdam gibi görünen düzenlemelerden kaçının'
                ]).map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-600 mr-2">--</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Summary Decision Tree */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Quick Classification Checklist' : 'Hızlı Sınıflandırma Kontrol Listesi'}</h2>
            <p className="text-gray-300 mb-4">
              {isEnglish
                ? 'If most answers are "Yes," the worker is likely a contractor. If most are "No," they\'re likely an employee.'
                : 'Cevapların çoğu "Evet" ise, işçi muhtemelen yüklenicidir. Çoğu "Hayır" ise, muhtemelen çalışandır.'}
            </p>
            <div className="space-y-3">
              {(isEnglish ? [
                'Does the worker control how, when, and where they work?',
                'Can they work for other clients simultaneously?',
                'Do they provide their own tools and equipment?',
                'Are they paid per project rather than hourly/salary?',
                'Do they have a registered business entity?',
                'Can they realize a profit or loss on the engagement?',
                'Is the relationship project-based with a defined end?',
                'Are they free from day-to-day supervision?'
              ] : [
                'İşçi nasıl, ne zaman ve nerede çalıştığını kontrol ediyor mu?',
                'Aynı anda diğer müşteriler için çalışabilir mi?',
                'Kendi araç ve ekipmanlarını sağlıyor mu?',
                'Saatlik/maaş yerine proje başına mı ödeme yapılıyor?',
                'Kayıtlı bir iş kuruluşu var mı?',
                'Angajmandan kar veya zarar edebilir mi?',
                'İlişki tanımlanmış bir sonu olan proje bazlı mı?',
                'Günlük denetimden bağımsız mı?'
              ]).map((q, i) => (
                <div key={i} className="flex items-center">
                  <span className="text-[#C9A227] mr-3">[ ]</span>
                  <span className="text-gray-300">{q}</span>
                </div>
              ))}
            </div>
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

        {/* Cite This Entry */}
        <CiteThisEntry
          lang={lang}
          title={isEnglish ? 'Contractor vs Employee: Complete Classification Guide' : 'Bağımsız Yüklenici mi, İşçi mi: Kapsamlı Sınıflandırma Rehberi'}
          url={pageUrl}
          dateModified={PAGE_META.dateModified}
          version={PAGE_META.version}
          citationKey={PAGE_META.citationKey}
          contentType="encyclopedia-entry"
          className="mt-8"
        />

      </article>

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
            <Link href={`/${lang}/1099-vergi-belgeleri`} className="text-[#C9A227] hover:underline">
              {isEnglish ? '1099 Tax Documents Explained' : '1099 Vergi Belgeleri Açıklaması'} →
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
