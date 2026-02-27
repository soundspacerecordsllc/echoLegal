// app/[lang]/library/llc-vize-yanilgisi/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import PrimarySources from '@/components/PrimarySources'
import { generateScholarlyArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'
import type { PrimarySourceEntry } from '@/lib/content-schema'

const PAGE_META = {
  slug: 'llc-vize-yanilgisi',
  datePublished: '2025-10-15',
  dateModified: '2026-02-22',
  version: '2.0',
  wordCount: 2400,
  citationKey: 'ecl-enc-00007',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const url = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  return {
    title: isEnglish
      ? 'LLC Formation and Visa Eligibility | EchoLegal'
      : 'LLC Kuruluşu ve Vize Uygunluğu | EchoLegal',
    description: isEnglish
      ? 'Reference entry on the legal separation between US business formation and immigration status. Explains why LLC formation does not confer visa eligibility or immigration benefits.'
      : 'ABD\'de şirket kuruluşu ile göçmenlik statüsü arasındaki hukuki ayrıma ilişkin başvuru maddesi. LLC kuruluşunun neden vize uygunluğu veya göçmenlik avantajı sağlamadığını açıklar.',
    other: {
      'citation_title': isEnglish ? 'LLC Formation and Visa Eligibility' : 'LLC Kuruluşu ve Vize Uygunluğu',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/10/15',
      'citation_lastmod': '2026/02/22',
      'citation_version': PAGE_META.version,
      'citation_language': lang,
      'citation_fulltext_html_url': url,
      'citation_id': PAGE_META.citationKey,
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

const PRIMARY_SOURCES: PrimarySourceEntry[] = [
  {
    type: 'USC',
    citation: '8 U.S.C. § 1101(a)(15)(E)',
    label: 'INA § 101(a)(15)(E) — Treaty trader and treaty investor visas',
    url: 'https://www.law.cornell.edu/uscode/text/8/1101',
    authorityLevel: 'federal_statute',
    canonicalId: 'usc-8-1101-a-15-e',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
  {
    type: 'CFR',
    citation: '22 C.F.R. § 41.51',
    label: 'Treaty investor visa regulations',
    url: 'https://www.law.cornell.edu/cfr/text/22/section-41.51',
    authorityLevel: 'federal_regulation',
    canonicalId: 'cfr-22-41.51',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
  {
    type: 'Guidance',
    citation: 'USCIS, E-2 Treaty Investors',
    label: 'Official guidance on E-2 visa requirements',
    url: 'https://www.uscis.gov/working-in-the-united-states/temporary-workers/e-2-treaty-investors',
    authorityLevel: 'agency_guidance',
    canonicalId: 'guidance-uscis-e2-treaty-investors',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
  {
    type: 'Guidance',
    citation: 'USCIS, Working in the United States',
    label: 'Overview of work authorization categories',
    url: 'https://www.uscis.gov/working-in-the-united-states',
    authorityLevel: 'agency_guidance',
    canonicalId: 'guidance-uscis-working-in-us',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
]

export default async function LLCVisaEligibilityPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const pageUrl = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  const pageTitle = isEnglish
    ? 'LLC Formation and Visa Eligibility'
    : 'LLC Kuruluşu ve Vize Uygunluğu'

  const scholarlySchema = generateScholarlyArticleSchema({
    title: pageTitle,
    abstractText: isEnglish
      ? 'A reference entry explaining the legal separation between US business entity formation and immigration status, addressing the common misconception that LLC formation confers visa eligibility.'
      : 'ABD\'de ticari tüzel kişilik kuruluşu ile göçmenlik statüsü arasındaki hukuki ayrımı açıklayan, LLC kuruluşunun vize uygunluğu sağladığı yaygın yanılgısını ele alan bir başvuru maddesi.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['llc', 'visa', 'immigration', 'e-2', 'work-authorization', 'business-formation'],
    wordCount: PAGE_META.wordCount,
    citationKey: PAGE_META.citationKey,
    aboutTopics: ['LLC Formation', 'US Immigration Law', 'Business vs Immigration'],
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Library' : 'Kütüphane', url: `${SITE_URL}/${lang}/library` },
    { name: pageTitle, url: pageUrl },
  ])

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <JsonLdScript data={[scholarlySchema, breadcrumbSchema]} />

      {/* Breadcrumb */}
      <nav className="text-sm text-muted mb-12">
        <Link href={`/${lang}`} className="hover:text-ink transition-colors">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
        <span className="mx-2 text-stone-300">/</span>
        <Link href={`/${lang}/library`} className="hover:text-ink transition-colors">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
        <span className="mx-2 text-stone-300">/</span>
        <span className="text-ink">{isEnglish ? 'LLC & Visa' : 'LLC ve Vize'}</span>
      </nav>

      <article>
        {/* Header */}
        <header className="mb-16">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-6 leading-tight tracking-tight">
            {pageTitle}
          </h1>

          <p className="text-lg text-muted leading-relaxed max-w-prose mb-8">
            {isEnglish
              ? 'A reference entry on the legal separation between US business entity formation and immigration status.'
              : 'ABD\'de ticari tüzel kişilik kuruluşu ile göçmenlik statüsü arasındaki hukuki ayrıma ilişkin başvuru maddesi.'}
          </p>

          <InstitutionalBadge
            lang={lang}
            jurisdictions={['US']}
            lastReviewedAt={PAGE_META.dateModified}
          />
        </header>

        {/* Disclaimer */}
        <div className="border-l-2 border-stone-300 pl-5 mb-14">
          <p className="text-sm text-muted leading-relaxed">
            <strong className="text-ink">{isEnglish ? 'Note' : 'Not'}</strong>{' — '}
            {isEnglish
              ? 'This entry provides general information about the relationship between business formation and immigration law. It does not constitute immigration advice. Immigration law is complex and changes frequently. Consult a licensed immigration attorney for your specific situation.'
              : 'Bu madde, şirket kuruluşu ile göçmenlik hukuku arasındaki ilişki hakkında genel bilgi sunmaktadır. Göçmenlik tavsiyesi niteliği taşımaz. Göçmenlik hukuku karmaşık olup sık değişmektedir. Kendi durumunuza özgü değerlendirme için lisanslı bir göçmenlik avukatına başvurun.'}
          </p>
        </div>

        <div className="entry-body">

          {/* Scope & Method */}
          <h2>{isEnglish ? 'Scope & Method' : 'Kapsam ve Yöntem'}</h2>

          <p>
            {isEnglish
              ? 'This entry addresses one of the most persistent misconceptions among non-US entrepreneurs: the belief that forming a US LLC confers visa eligibility or immigration benefits. It explains why business formation and immigration are legally distinct processes, identifies the limited circumstances in which a US business entity is relevant to an immigration application, and clarifies the distinction between operating a US business remotely and physically working in the United States.'
              : 'Bu madde, yabancı girişimciler arasında en kalıcı yanılgılardan birini ele almaktadır: ABD LLC kurmanın vize uygunluğu veya göçmenlik avantajı sağladığı inancı. Şirket kuruluşu ve göçmenliğin neden hukuki olarak ayrı süreçler olduğunu açıklar, bir ABD ticari kuruluşunun göçmenlik başvurusuyla ilgili olduğu sınırlı durumları tanımlar ve bir ABD işletmesini uzaktan yönetmek ile ABD\'de fiziken çalışmak arasındaki ayrımı netleştirir.'}
          </p>

          <p>
            {isEnglish
              ? 'This entry does not provide detailed analysis of specific visa categories, processing timelines, or application procedures. Immigration references are drawn from the Immigration and Nationality Act (INA), its implementing regulations, and official USCIS guidance.'
              : 'Bu madde, belirli vize kategorilerinin ayrıntılı analizini, işlem sürelerini veya başvuru prosedürlerini sunmamaktadır. Göçmenlik referansları, Göçmenlik ve Vatandaşlık Yasası (INA), uygulama düzenlemeleri ve resmi USCIS kılavuzlarından alınmıştır.'}
          </p>

          {/* Key Takeaways */}
          <h2>{isEnglish ? 'Key Takeaways' : 'Temel Çıkarımlar'}</h2>

          <ul className="list-disc">
            <li>
              {isEnglish
                ? 'Business formation and immigration are governed by entirely separate bodies of federal law. An LLC is a state-law entity that provides limited liability protection; a visa is a federal immigration status that authorizes presence in or admission to the United States.'
                : 'Şirket kuruluşu ve göçmenlik, tamamen ayrı federal hukuk alanları tarafından düzenlenmektedir. LLC, sınırlı sorumluluk koruması sağlayan bir eyalet hukuku kuruluşudur; vize ise ABD\'de bulunma veya ABD\'ye kabul yetkisi veren federal bir göçmenlik statüsüdür.'}
            </li>
            <li>
              {isEnglish
                ? 'Forming an LLC does not, by itself, create eligibility for any visa category. No provision of the INA or its implementing regulations grants immigration benefits based solely on business entity formation.'
                : 'LLC kurmak tek başına herhangi bir vize kategorisi için uygunluk yaratmaz. INA\'nın veya uygulama düzenlemelerinin hiçbir hükmü, yalnızca ticari kuruluş kurulmasına dayanarak göçmenlik avantajı sağlamamaktadır.'}
            </li>
            <li>
              {isEnglish
                ? 'Certain visa categories — most notably the E-2 treaty investor visa — require the applicant to have invested in or be actively managing a US business. However, the business entity is only one of many requirements that must be independently satisfied.'
                : 'Belirli vize kategorileri — en önemlisi E-2 anlaşma yatırımcı vizesi — başvuru sahibinin bir ABD işletmesine yatırım yapmış olmasını veya aktif olarak yönetmesini gerektirir. Ancak ticari kuruluş, bağımsız olarak karşılanması gereken birçok gereklilikten yalnızca biridir.'}
            </li>
            <li>
              {isEnglish
                ? 'A non-US entrepreneur can own and operate a US LLC entirely from abroad, serving US clients remotely, without needing any US visa or work authorization.'
                : 'ABD dışından bir girişimci, herhangi bir ABD vizesi veya çalışma iznine ihtiyaç duymadan tamamen yurt dışından bir ABD LLC\'sine sahip olabilir ve ABD müşterilerine uzaktan hizmet vererek işletebilir.'}
            </li>
          </ul>

          {/* The Legal Separation */}
          <h2>{isEnglish ? 'The Legal Separation' : 'Hukuki Ayrım'}</h2>

          <p>
            {isEnglish
              ? 'An LLC is formed under state law. It creates a business entity that can enter into contracts, hold property, and conduct commercial activity. It provides its owners with limited liability protection — meaning the owners\' personal assets are generally shielded from the entity\'s debts and obligations.'
              : 'LLC eyalet hukuku kapsamında kurulur. Sözleşme yapabilen, mülk sahibi olabilen ve ticari faaliyet yürütebilen bir ticari kuruluş oluşturur. Sahiplerine sınırlı sorumluluk koruması sağlar — yani sahiplerin kişisel varlıkları genellikle kuruluşun borç ve yükümlülüklerinden korunur.'}
          </p>

          <p>
            {isEnglish
              ? 'Immigration status is governed by federal law — primarily the Immigration and Nationality Act (8 U.S.C. § 1101 et seq.) and its implementing regulations. Visa eligibility depends on factors including nationality, the purpose of entry, qualifications, sponsorship, and compliance with specific statutory criteria. Business entity ownership is not among the statutory bases for any visa classification.'
              : 'Göçmenlik statüsü federal hukuk tarafından düzenlenir — esas olarak Göçmenlik ve Vatandaşlık Yasası (8 U.S.C. § 1101 ve devamı) ve uygulama düzenlemeleri. Vize uygunluğu, uyruk, giriş amacı, nitelikler, sponsorluk ve belirli yasal kriterlere uyum dahil faktörlere bağlıdır. Ticari kuruluş sahipliği, herhangi bir vize sınıflandırmasının yasal dayanakları arasında yer almamaktadır.'}
          </p>

          {/* Visa Categories That Reference a Business */}
          <h2>{isEnglish ? 'Visa Categories That Reference a US Business' : 'ABD İşletmesine Atıfta Bulunan Vize Kategorileri'}</h2>

          <p>
            {isEnglish
              ? 'A small number of visa categories require or consider the applicant\'s relationship to a US business. The most relevant for entrepreneurs is the E-2 treaty investor visa.'
              : 'Az sayıda vize kategorisi, başvuru sahibinin bir ABD işletmesiyle ilişkisini gerektirir veya dikkate alır. Girişimciler için en ilgili olanı E-2 anlaşma yatırımcı vizesidir.'}
          </p>

          <h3>{isEnglish ? 'E-2 Treaty Investor Visa' : 'E-2 Anlaşma Yatırımcı Vizesi'}</h3>

          <p>
            {isEnglish
              ? 'The E-2 visa (8 U.S.C. § 1101(a)(15)(E); 22 C.F.R. § 41.51) allows nationals of treaty countries to enter the United States to develop and direct a business in which they have made a substantial investment. Turkey is an E-2 treaty country, making this category available to Turkish nationals — but the requirements extend well beyond LLC formation.'
              : 'E-2 vizesi (8 U.S.C. § 1101(a)(15)(E); 22 C.F.R. § 41.51), anlaşma ülkelerinin vatandaşlarının önemli miktarda yatırım yaptıkları bir işletmeyi geliştirmek ve yönetmek amacıyla ABD\'ye girmelerine izin verir. Türkiye bir E-2 anlaşma ülkesidir, bu da bu kategoriyi Türk vatandaşlarına açık kılmaktadır — ancak gereklilikler LLC kuruluşunun çok ötesine uzanmaktadır.'}
          </p>

          <p>
            {isEnglish
              ? 'An E-2 application must demonstrate, among other requirements: (1) that the applicant is a national of a treaty country; (2) that a substantial investment has been made or is being actively committed — the amount is not fixed by statute but must be sufficient to ensure the successful operation of the enterprise; (3) that the applicant is coming to the US solely to develop and direct the investment enterprise; and (4) that the applicant has control of the funds and the investment is at risk in the commercial sense. The existence of an LLC satisfies none of these requirements by itself.'
              : 'Bir E-2 başvurusu, diğer gerekliliklerin yanı sıra şunları göstermelidir: (1) başvuru sahibinin bir anlaşma ülkesi vatandaşı olduğu; (2) önemli bir yatırımın yapılmış veya aktif olarak taahhüt edilmekte olduğu — miktar yasayla belirlenmemiştir ancak işletmenin başarılı bir şekilde faaliyet göstermesini sağlamaya yeterli olmalıdır; (3) başvuru sahibinin ABD\'ye yalnızca yatırım işletmesini geliştirmek ve yönetmek için geldiği; ve (4) başvuru sahibinin fonlar üzerinde kontrole sahip olduğu ve yatırımın ticari anlamda risk altında olduğu. Bir LLC\'nin varlığı bu gerekliliklerin hiçbirini tek başına karşılamamaktadır.'}
          </p>

          <h3>{isEnglish ? 'Other Relevant Categories' : 'Diğer İlgili Kategoriler'}</h3>

          <p>
            {isEnglish
              ? 'The L-1 intracompany transferee visa requires an existing foreign employer-employee relationship and transfer to a US affiliate, subsidiary, or parent company. The O-1 extraordinary ability visa requires evidence of extraordinary achievement in the applicant\'s field. Neither category is triggered by LLC formation alone — each has its own independent statutory and evidentiary requirements.'
              : 'L-1 şirket içi transfer vizesi, mevcut bir yabancı işveren-çalışan ilişkisi ve bir ABD bağlı kuruluşuna, yan kuruluşuna veya ana şirkete transfer gerektirir. O-1 olağanüstü yetenek vizesi, başvuru sahibinin alanında olağanüstü başarı kanıtı gerektirir. Her iki kategori de yalnızca LLC kuruluşuyla tetiklenmez — her birinin kendi bağımsız yasal ve ispat gereklilikleri vardır.'}
          </p>

          {/* Remote Operation vs. Physical Presence */}
          <h2>{isEnglish ? 'Remote Operation and Physical Presence' : 'Uzaktan Yönetim ve Fiziksel Mevcudiyet'}</h2>

          <p>
            {isEnglish
              ? 'A non-US entrepreneur can own a US LLC, receive payments through it, and serve US clients entirely from abroad. This does not require any US visa or work authorization. The legal question is not whether a person can own a US business — any person can — but whether a person can physically enter, remain in, or work within the United States.'
              : 'ABD dışından bir girişimci bir ABD LLC\'sine sahip olabilir, onun aracılığıyla ödeme alabilir ve tamamen yurt dışından ABD müşterilerine hizmet verebilir. Bu, herhangi bir ABD vizesi veya çalışma izni gerektirmez. Hukuki soru, bir kişinin ABD işletmesine sahip olup olamayacağı değildir — herkes olabilir — soru, kişinin ABD\'ye fiziken girip giremeyeceği, kalıp kalamayacağı veya ABD sınırları içinde çalışıp çalışamayacağıdır.'}
          </p>

          <p>
            {isEnglish
              ? 'Physically entering the US to manage the business, attend meetings, or perform work requires appropriate immigration authorization — whether a B-1 business visitor visa (for limited activities), an E-2, L-1, or other work-authorized status. The distinction between remote ownership and physical presence in the US is the critical line that determines whether immigration authorization is needed.'
              : 'İşletmeyi yönetmek, toplantılara katılmak veya iş yapmak için ABD\'ye fiziken girmek uygun göçmenlik izni gerektirir — ister B-1 iş ziyaretçi vizesi (sınırlı faaliyetler için), ister E-2, L-1 veya başka bir çalışma yetkili statü. Uzaktan sahiplik ile ABD\'de fiziksel mevcudiyet arasındaki ayrım, göçmenlik izninin gerekip gerekmediğini belirleyen kritik çizgidir.'}
          </p>

        </div>

        {/* Sources */}
        <section className="mt-14 mb-14">
          <PrimarySources sources={PRIMARY_SOURCES} lang={lang} />
        </section>

        {/* Related Resources */}
        <section className="mb-14">
          <h2 className="font-serif text-xl font-semibold text-ink mb-6">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
          <div className="divide-y divide-stone-200">
            <Link href={`/${lang}/library/llc-kurma-rehberi`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'LLC Formation in the United States' : 'ABD\'de LLC Kuruluşu'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'Legal structure, state selection, and formation process' : 'Hukuki yapı, eyalet seçimi ve kuruluş süreci'}</p>
            </Link>
            <Link href={`/${lang}/library/hukuki-yanilgilar`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'Common Legal Misconceptions' : 'Yaygın Hukuki Yanılgılar'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'Other frequently misunderstood aspects of US business law' : 'ABD iş hukukunun diğer sıkça yanlış anlaşılan yönleri'}</p>
            </Link>
            <Link href={`/${lang}/library/temel-sozlesmeler`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'Essential Contracts for US Business' : 'ABD\'de İş İçin Temel Sözleşmeler'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'Contracts needed for US business operations' : 'ABD iş faaliyetleri için ihtiyaç duyulan sözleşmeler'}</p>
            </Link>
          </div>
        </section>

        {/* Citation Block */}
        <CiteThisEntry
          lang={lang}
          title={pageTitle}
          url={pageUrl}
          version={PAGE_META.version}
          dateModified={PAGE_META.dateModified}
          citationKey={PAGE_META.citationKey}
        />
      </article>
    </main>
  )
}
