// app/[lang]/library/llc-kurma-rehberi/page.tsx

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
  slug: 'llc-kurma-rehberi',
  datePublished: '2025-09-01',
  dateModified: '2026-02-22',
  version: '2.0',
  wordCount: 3400,
  citationKey: 'ecl-gde-00001',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const url = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  return {
    title: isEnglish
      ? 'LLC Formation in the United States | EchoLegal'
      : 'ABD\'de LLC Kuruluşu | EchoLegal',
    description: isEnglish
      ? 'Reference entry on LLC formation in the United States for non-US entrepreneurs. Covers legal structure, state selection, formation process, tax classification, and common misconceptions.'
      : 'ABD dışından girişimciler için ABD\'de LLC kuruluşuna ilişkin başvuru maddesi. Hukuki yapı, eyalet seçimi, kuruluş süreci, vergi sınıflandırması ve yaygın yanılgıları kapsar.',
    other: {
      'citation_title': isEnglish ? 'LLC Formation in the United States' : 'ABD\'de LLC Kuruluşu',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/09/01',
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
    type: 'CFR',
    citation: '26 C.F.R. §§ 301.7701-1 through 301.7701-3',
    label: 'Entity classification regulations (check-the-box)',
    url: 'https://www.law.cornell.edu/cfr/text/26/section-301.7701-2',
    authorityLevel: 'federal_regulation',
    canonicalId: 'cfr-26-301.7701-1',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
  {
    type: 'StateStatute',
    citation: '6 Del. C. § 18-101 et seq.',
    label: 'Delaware Limited Liability Company Act',
    url: 'https://delcode.delaware.gov/title6/c018/index.html',
    authorityLevel: 'state_statute',
    canonicalId: 'del-stat-c-6-18-101',
    jurisdiction: 'Delaware',
    jurisdictionScope: 'US-DE',
  },
  {
    type: 'StateStatute',
    citation: 'Wyo. Stat. § 17-29-101 et seq.',
    label: 'Wyoming Limited Liability Company Act',
    url: 'https://wyoleg.gov/statutes/compress/title17.pdf',
    authorityLevel: 'state_statute',
    canonicalId: 'wyo-stat-17-29-101',
    jurisdiction: 'Wyoming',
    jurisdictionScope: 'US-WY',
  },
  {
    type: 'Guidance',
    citation: 'IRS, Limited Liability Company (LLC)',
    label: 'IRS overview of LLC tax treatment',
    url: 'https://www.irs.gov/businesses/small-businesses-self-employed/limited-liability-company-llc',
    authorityLevel: 'agency_guidance',
    canonicalId: 'guidance-irs-llc-overview',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
  {
    type: 'Other',
    citation: 'Revised Uniform Limited Liability Company Act (RULLCA)',
    label: 'Model act adopted in 25+ jurisdictions',
    authorityLevel: 'publication',
    canonicalId: 'publication-rullca',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
]

export default async function LLCFormationGuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const pageUrl = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  const pageTitle = isEnglish
    ? 'LLC Formation in the United States'
    : 'ABD\'de LLC Kuruluşu'

  const scholarlySchema = generateScholarlyArticleSchema({
    title: pageTitle,
    alternativeHeadline: isEnglish ? 'LLC Formation Guide for Non-US Entrepreneurs' : 'ABD Dışından Girişimciler İçin LLC Kurulum Rehberi',
    abstractText: isEnglish
      ? 'A reference entry explaining the legal structure, formation process, and tax classification of limited liability companies in the United States, with attention to considerations specific to non-US entrepreneurs.'
      : 'ABD\'de sınırlı sorumlu şirketlerin hukuki yapısını, kuruluş sürecini ve vergi sınıflandırmasını açıklayan, ABD dışından girişimcilere özgü hususlara dikkat çeken bir başvuru maddesi.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['llc', 'limited-liability-company', 'business-formation', 'delaware', 'wyoming', 'entity-classification', 'ein'],
    wordCount: PAGE_META.wordCount,
    citationKey: PAGE_META.citationKey,
    aboutTopics: ['LLC Formation', 'US Business Law', 'Entity Classification', 'Corporate Structure'],
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
        <span className="text-ink">{isEnglish ? 'LLC Formation' : 'LLC Kuruluşu'}</span>
      </nav>

      <article>
        {/* Header */}
        <header className="mb-16">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-6 leading-tight tracking-tight">
            {pageTitle}
          </h1>

          <p className="text-lg text-muted leading-relaxed max-w-prose mb-8">
            {isEnglish
              ? 'A reference entry on the legal structure, formation process, and tax classification of limited liability companies in the United States.'
              : 'ABD\'de sınırlı sorumlu şirketlerin hukuki yapısı, kuruluş süreci ve vergi sınıflandırmasına ilişkin başvuru maddesi.'}
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
              ? 'This entry provides general information about LLC formation under US law. It does not constitute legal, tax, or immigration advice. Laws and requirements vary by state and change frequently. Consult licensed professionals before making decisions.'
              : 'Bu madde, ABD hukuku kapsamında LLC kuruluşu hakkında genel bilgi sunmaktadır. Hukuki, vergisel veya göçmenlik tavsiyesi niteliği taşımaz. Mevzuat ve gereklilikler eyalete göre farklılık gösterir ve sık sık değişir. Karar almadan önce lisanslı uzmanlara danışın.'}
          </p>
        </div>

        <div className="entry-body">

          {/* Scope & Method */}
          <h2>{isEnglish ? 'Scope & Method' : 'Kapsam ve Yöntem'}</h2>

          <p>
            {isEnglish
              ? 'This entry explains the legal structure of a limited liability company (LLC) as it exists under US state law, the general formation process, and the federal tax classification framework. It gives particular attention to considerations relevant to entrepreneurs based outside the United States — including state selection, EIN application procedures, and cross-border tax implications.'
              : 'Bu madde, ABD eyalet hukuku kapsamında sınırlı sorumlu şirketin (LLC) hukuki yapısını, genel kuruluş sürecini ve federal vergi sınıflandırma çerçevesini açıklamaktadır. ABD dışından girişimcilerle ilgili hususlara — eyalet seçimi, EIN başvuru prosedürleri ve sınır ötesi vergi etkileri dahil — özel dikkat gösterilmektedir.'}
          </p>

          <p>
            {isEnglish
              ? 'This entry does not cover S-Corp election requirements in detail, employment law obligations for LLCs with employees, or visa and immigration pathways. The relationship between LLC formation and immigration status is addressed in a separate entry.'
              : 'Bu madde, S-Corp seçim gerekliliklerini ayrıntılı olarak, çalışanları olan LLC\'ler için iş hukuku yükümlülüklerini veya vize ve göçmenlik yollarını kapsamamaktadır. LLC kuruluşu ile göçmenlik statüsü arasındaki ilişki ayrı bir maddede ele alınmaktadır.'}
          </p>

          {/* Key Takeaways */}
          <h2>{isEnglish ? 'Key Takeaways' : 'Temel Çıkarımlar'}</h2>

          <ul className="list-disc">
            <li>
              {isEnglish
                ? 'An LLC is a state-level entity that provides limited liability protection to its owners (members) while offering flexibility in management structure and tax treatment.'
                : 'LLC, sahiplerine (üyelere) sınırlı sorumluluk koruması sağlarken yönetim yapısı ve vergi muamelesi konusunda esneklik sunan eyalet düzeyinde bir tüzel kişiliktir.'}
            </li>
            <li>
              {isEnglish
                ? 'LLCs are formed under state law, not federal law. Each state has its own LLC statute, and the governing framework varies — particularly regarding operating agreement requirements, annual reporting, and franchise taxes.'
                : 'LLC\'ler federal hukuk kapsamında değil eyalet hukuku kapsamında kurulur. Her eyaletin kendi LLC mevzuatı vardır ve düzenleyici çerçeve — özellikle işletme sözleşmesi gereklilikleri, yıllık raporlama ve franchise vergileri bakımından — farklılık gösterir.'}
            </li>
            <li>
              {isEnglish
                ? 'For federal tax purposes, an LLC is classified under the "check-the-box" regulations (26 C.F.R. § 301.7701-3). A single-member LLC defaults to a disregarded entity; a multi-member LLC defaults to a partnership. Either may elect corporate treatment.'
                : 'Federal vergi amaçları bakımından, LLC "check-the-box" düzenlemeleri (26 C.F.R. § 301.7701-3) kapsamında sınıflandırılır. Tek üyeli LLC varsayılan olarak vergisel açıdan yok sayılan yapı statüsündedir; çok üyeli LLC varsayılan olarak ortaklıktır. Her ikisi de şirket statüsünü seçebilir.'}
            </li>
            <li>
              {isEnglish
                ? 'LLC formation does not confer any immigration benefit or visa eligibility. These are entirely separate legal domains.'
                : 'LLC kuruluşu herhangi bir göçmenlik avantajı veya vize hakkı sağlamaz. Bunlar tamamen ayrı hukuk alanlarıdır.'}
            </li>
            <li>
              {isEnglish
                ? 'Non-US residents can form LLCs in any US state. Delaware and Wyoming are commonly chosen for their privacy protections, low fees, and well-developed LLC statutes.'
                : 'ABD\'de ikamet etmeyenler herhangi bir ABD eyaletinde LLC kurabilir. Delaware ve Wyoming, gizlilik korumaları, düşük harçları ve gelişmiş LLC mevzuatları nedeniyle yaygın olarak tercih edilmektedir.'}
            </li>
          </ul>

          {/* What an LLC Is */}
          <h2>{isEnglish ? 'Legal Structure of an LLC' : 'LLC\'nin Hukuki Yapısı'}</h2>

          <p>
            {isEnglish
              ? 'A limited liability company is a hybrid business entity that combines the limited liability protection of a corporation with the operational flexibility and pass-through taxation of a partnership. The LLC form was first adopted by Wyoming in 1977 and has since been enacted in all 50 states and the District of Columbia.'
              : 'Sınırlı sorumlu şirket, bir anonim şirketin sınırlı sorumluluk korumasını bir ortaklığın operasyonel esnekliği ve geçişken vergilendirmesiyle birleştiren hibrit bir ticari kuruluştur. LLC formu ilk olarak 1977\'de Wyoming tarafından kabul edilmiş ve o zamandan bu yana 50 eyaletin tamamı ve Columbia Bölgesi\'nde yasalaştırılmıştır.'}
          </p>

          <p>
            {isEnglish
              ? 'The defining characteristic of an LLC is that its members are not personally liable for the debts and obligations of the company, absent fraud, personal guarantees, or "piercing the corporate veil" circumstances. This liability shield operates at the state level — each state\'s LLC act establishes the conditions under which the shield may be lost.'
              : 'LLC\'nin belirleyici özelliği, üyelerinin — dolandırıcılık, kişisel garantiler veya "tüzel kişilik perdesinin kaldırılması" durumları haricinde — şirketin borç ve yükümlülüklerinden kişisel olarak sorumlu olmamasıdır. Bu sorumluluk kalkanı eyalet düzeyinde işler — her eyaletin LLC yasası kalkanın kaybedilebileceği koşulları belirler.'}
          </p>

          <p>
            {isEnglish
              ? 'The Revised Uniform Limited Liability Company Act (RULLCA), promulgated by the Uniform Law Commission, provides a model statutory framework adopted in over 25 jurisdictions. However, high-formation-volume states like Delaware and Wyoming maintain their own distinctive LLC statutes.'
              : 'Tekdüzen Hukuk Komisyonu tarafından yayımlanan Revize Tekdüzen Sınırlı Sorumlu Şirket Yasası (RULLCA), 25\'ten fazla yargı alanında kabul edilen bir model yasal çerçeve sunmaktadır. Ancak Delaware ve Wyoming gibi yoğun şirket kuruluşu yapılan eyaletler kendi ayırt edici LLC mevzuatlarını sürdürmektedir.'}
          </p>

          {/* State Selection */}
          <h2>{isEnglish ? 'State Selection' : 'Eyalet Seçimi'}</h2>

          <p>
            {isEnglish
              ? 'Because LLCs are creatures of state law, the choice of formation state determines the governing statutory framework, annual compliance obligations, and associated costs. For non-US residents who do not conduct physical operations in any particular US state, this choice is relatively unconstrained.'
              : 'LLC\'ler eyalet hukukunun ürünü olduğundan, kuruluş eyaleti seçimi düzenleyici yasal çerçeveyi, yıllık uyum yükümlülüklerini ve ilgili maliyetleri belirler. Herhangi bir ABD eyaletinde fiziksel faaliyet yürütmeyen ABD dışı mukim kişiler için bu seçim nispeten kısıtlanmamıştır.'}
          </p>

          <h3>Delaware</h3>

          <p>
            {isEnglish
              ? 'Delaware\'s LLC Act (6 Del. C. § 18-101 et seq.) is the most extensively litigated and judicially interpreted LLC statute in the United States. The Delaware Court of Chancery, a specialized equity court, provides a well-developed body of case law on LLC governance disputes. Delaware is commonly chosen by venture-backed startups and entities anticipating complex multi-member arrangements. The state imposes an annual franchise tax of $300 but does not tax out-of-state income.'
              : 'Delaware LLC Yasası (6 Del. C. § 18-101 ve devamı), ABD\'de en kapsamlı şekilde dava edilmiş ve yargısal olarak yorumlanmış LLC mevzuatıdır. Uzman bir hakkaniyet mahkemesi olan Delaware Court of Chancery, LLC yönetim uyuşmazlıkları konusunda gelişmiş bir içtihat birikimi sunmaktadır. Delaware yaygın olarak risk sermayesi destekli girişimler ve karmaşık çok üyeli düzenlemeler öngören kuruluşlar tarafından tercih edilir. Eyalet yıllık 300 dolar franchise vergisi almakta ancak eyalet dışı geliri vergilendirmemektedir.'}
          </p>

          <h3>Wyoming</h3>

          <p>
            {isEnglish
              ? 'Wyoming (Wyo. Stat. § 17-29-101 et seq.) was the first state to adopt LLC legislation and remains popular among international entrepreneurs for its low costs, strong privacy protections (no requirement to disclose member names in public filings), and absence of state income tax. Annual report fees are modest compared to other formation-friendly states.'
              : 'Wyoming (Wyo. Stat. § 17-29-101 ve devamı), LLC mevzuatını kabul eden ilk eyalet olup düşük maliyetleri, güçlü gizlilik korumaları (kamuya açık dosyalamalarda üye isimlerini açıklama zorunluluğu yoktur) ve eyalet gelir vergisinin bulunmaması nedeniyle uluslararası girişimciler arasında popülerliğini sürdürmektedir. Yıllık rapor ücretleri diğer kuruluş dostu eyaletlere kıyasla düşüktür.'}
          </p>

          <h3>{isEnglish ? 'Home State Considerations' : 'İkamet Edilen Eyalet'}</h3>

          <p>
            {isEnglish
              ? 'Entrepreneurs residing in the United States generally benefit from forming in their state of residence. Forming in another state while conducting business locally typically triggers "foreign qualification" requirements — meaning the LLC must register and pay fees in both the formation state and the operating state, increasing compliance burden without meaningful legal advantage.'
              : 'ABD\'de ikamet eden girişimciler genellikle ikamet ettikleri eyalette kuruluş yapmaktan fayda görür. Yerel olarak iş yaparken başka bir eyalette kuruluş yapmak tipik olarak "yabancı tescil" gerekliliklerini tetikler — yani LLC\'nin hem kuruluş eyaletinde hem de faaliyet eyaletinde tescil olması ve ücret ödemesi gerekir, bu da anlamlı bir hukuki avantaj sağlamadan uyum yükünü artırır.'}
          </p>

          {/* Formation Process */}
          <h2>{isEnglish ? 'Formation Process' : 'Kuruluş Süreci'}</h2>

          <p>
            {isEnglish
              ? 'While the specifics vary by state, LLC formation follows a common sequence in commercial practice.'
              : 'Ayrıntılar eyalete göre farklılık gösterse de LLC kuruluşu ticari uygulamada ortak bir sıralama izler.'}
          </p>

          <p>
            <strong>{isEnglish ? 'Name selection.' : 'İsim seçimi.'}</strong>{' '}
            {isEnglish
              ? 'The entity name must be distinguishable from existing entities registered in the formation state and must include a designation such as "LLC" or "Limited Liability Company." Most states provide an online name availability search.'
              : 'Kuruluş adı, kuruluş eyaletinde kayıtlı mevcut kuruluşlardan ayırt edilebilir olmalı ve "LLC" veya "Limited Liability Company" gibi bir ibare içermelidir. Çoğu eyalet çevrimiçi isim uygunluk sorgulaması sunmaktadır.'}
          </p>

          <p>
            <strong>{isEnglish ? 'Registered agent.' : 'Kayıtlı temsilci.'}</strong>{' '}
            {isEnglish
              ? 'Every LLC must designate a registered agent — a person or entity with a physical address in the formation state authorized to receive service of process and official correspondence. For non-US residents, commercial registered agent services fulfill this requirement.'
              : 'Her LLC bir kayıtlı temsilci belirlemelidir — tebligat ve resmi yazışmaları almaya yetkili, kuruluş eyaletinde fiziki adresi olan bir kişi veya kuruluş. ABD dışında ikamet edenler için ticari kayıtlı temsilci hizmetleri bu gerekliliği karşılamaktadır.'}
          </p>

          <p>
            <strong>{isEnglish ? 'Articles of Organization.' : 'Kuruluş Belgesi (Articles of Organization).'}</strong>{' '}
            {isEnglish
              ? 'The formation document — typically called Articles of Organization or Certificate of Formation — is filed with the state\'s Secretary of State or equivalent office. Filing fees range from approximately $50 (Kentucky) to $500 (Massachusetts), with most states in the $100–$200 range.'
              : 'Kuruluş belgesi — genellikle Articles of Organization veya Certificate of Formation olarak adlandırılır — eyaletin Dışişleri Bakanlığı (Secretary of State) veya eşdeğer makama sunulur. Başvuru ücretleri yaklaşık 50 dolardan (Kentucky) 500 dolara (Massachusetts) kadar değişmekte olup çoğu eyalet 100-200 dolar aralığındadır.'}
          </p>

          <p>
            <strong>{isEnglish ? 'Operating Agreement.' : 'İşletme Sözleşmesi (Operating Agreement).'}</strong>{' '}
            {isEnglish
              ? 'An Operating Agreement is the internal governance document that defines member rights, profit allocation, management structure, and dissolution procedures. While not all states require a written Operating Agreement, it is considered essential in practice — particularly for multi-member LLCs and for establishing the formalities that support the liability shield.'
              : 'İşletme Sözleşmesi, üye haklarını, kâr dağılımını, yönetim yapısını ve tasfiye prosedürlerini tanımlayan iç yönetim belgesidir. Her eyalet yazılı İşletme Sözleşmesi gerektirmese de uygulamada — özellikle çok üyeli LLC\'ler için ve sorumluluk kalkanını destekleyen formalitelerin oluşturulması için — gerekli kabul edilir.'}
          </p>

          <p>
            <strong>{isEnglish ? 'EIN application.' : 'EIN başvurusu.'}</strong>{' '}
            {isEnglish
              ? 'An Employer Identification Number (EIN) is a federal tax identification number issued by the IRS. It is required for opening US bank accounts, filing tax returns, and hiring employees. US residents can apply online; non-US residents without an SSN or ITIN must apply by fax or mail using IRS Form SS-4.'
              : 'İşveren Kimlik Numarası (EIN), IRS tarafından verilen federal bir vergi kimlik numarasıdır. ABD banka hesabı açmak, vergi beyannamesi vermek ve çalışan işe almak için gereklidir. ABD\'de ikamet edenler çevrimiçi başvurabilir; SSN veya ITIN\'i olmayan ABD dışı mukim kişiler IRS Form SS-4 kullanarak faks veya posta ile başvurmalıdır.'}
          </p>

          {/* Tax Classification */}
          <h2>{isEnglish ? 'Tax Classification' : 'Vergi Sınıflandırması'}</h2>

          <p>
            {isEnglish
              ? 'For federal tax purposes, an LLC is not a separate tax classification. Instead, the IRS classifies LLCs under the "check-the-box" regulations (26 C.F.R. §§ 301.7701-1 through 301.7701-3), which allow eligible entities to elect their tax treatment.'
              : 'Federal vergi amaçları bakımından LLC ayrı bir vergi sınıflandırması değildir. Bunun yerine IRS, LLC\'leri uygun kuruluşların vergi muamelelerini seçmelerine izin veren "check-the-box" düzenlemeleri (26 C.F.R. §§ 301.7701-1 ila 301.7701-3) kapsamında sınıflandırır.'}
          </p>

          <p>
            {isEnglish
              ? 'A single-member LLC defaults to treatment as a disregarded entity — its income and expenses are reported on the owner\'s personal tax return. A multi-member LLC defaults to partnership treatment. Either type may elect to be taxed as a C corporation, and a domestic LLC taxed as a C corporation may further elect S corporation status if it meets the eligibility requirements (which exclude non-resident alien shareholders).'
              : 'Tek üyeli LLC varsayılan olarak vergisel açıdan yok sayılan yapı olarak muamele görür — gelir ve giderleri sahibinin kişisel vergi beyannamesinde raporlanır. Çok üyeli LLC varsayılan olarak ortaklık olarak muamele görür. Her iki tür de C şirketi olarak vergilendirilmeyi seçebilir ve C şirketi olarak vergilendirilen bir yerli LLC, uygunluk gerekliliklerini karşılaması halinde (yerleşik olmayan yabancı hissedarları hariç tutan) S şirketi statüsünü de seçebilir.'}
          </p>

          <p>
            {isEnglish
              ? 'For non-US residents, the tax implications are substantially more complex. US-source income earned through an LLC may be subject to withholding requirements, and the interaction between US tax obligations and the owner\'s home country tax system — including applicable tax treaties — requires professional analysis. The common belief that a Delaware LLC eliminates all tax obligations is incorrect: Delaware imposes no state income tax on out-of-state earnings, but federal obligations and home-country obligations remain.'
              : 'ABD dışında ikamet edenler için vergi etkileri önemli ölçüde daha karmaşıktır. LLC aracılığıyla elde edilen ABD kaynaklı gelir stopaj gerekliliklerine tabi olabilir ve ABD vergi yükümlülükleri ile sahibin kendi ülkesindeki vergi sistemi arasındaki etkileşim — geçerli vergi anlaşmaları dahil — profesyonel analiz gerektirmektedir. Delaware LLC\'nin tüm vergi yükümlülüklerini ortadan kaldırdığı yaygın inanışı yanlıştır: Delaware eyalet dışı kazançlar üzerinden eyalet gelir vergisi almaz, ancak federal yükümlülükler ve ikamet edilen ülkedeki yükümlülükler devam eder.'}
          </p>

          {/* Risk Allocation & Common Failure Modes */}
          <h2>{isEnglish ? 'Risk Allocation and Common Failure Modes' : 'Risk Dağılımı ve Yaygın Başarısızlık Modları'}</h2>

          <p>
            <strong>{isEnglish ? 'Conflating LLC formation with immigration benefit.' : 'LLC kuruluşunu göçmenlik avantajı ile karıştırma.'}</strong>{' '}
            {isEnglish
              ? 'Forming an LLC does not grant, support, or improve any visa application or immigration status. Business formation and immigration are governed by entirely separate bodies of law. This misconception is widespread among non-US entrepreneurs and can lead to costly missteps.'
              : 'LLC kurmak herhangi bir vize başvurusunu desteklemez veya göçmenlik statüsünü iyileştirmez. Şirket kuruluşu ve göçmenlik tamamen ayrı hukuk alanları tarafından düzenlenir. Bu yanılgı ABD dışından girişimciler arasında yaygındır ve maliyetli hatalara yol açabilir.'}
          </p>

          <p>
            <strong>{isEnglish ? 'Assuming Delaware eliminates tax obligations.' : 'Delaware\'ın vergi yükümlülüklerini ortadan kaldırdığını varsayma.'}</strong>{' '}
            {isEnglish
              ? 'While Delaware does not impose state income tax on earnings from out-of-state operations, federal tax obligations (including filing requirements and potential withholding on US-source income) persist. Additionally, an LLC owner residing in Turkey remains subject to Turkish tax law on worldwide income, with foreign tax credits potentially applicable.'
              : 'Delaware eyalet dışı faaliyetlerden elde edilen kazançlar üzerinden eyalet gelir vergisi almasa da federal vergi yükümlülükleri (beyanname verme gereklilikleri ve ABD kaynaklı gelir üzerinden potansiyel stopaj dahil) devam eder. Ayrıca Türkiye\'de ikamet eden bir LLC sahibi, potansiyel olarak uygulanabilir yabancı vergi kredileri ile birlikte dünya çapındaki gelir üzerinden Türk vergi hukukuna tabi kalmaya devam eder.'}
          </p>

          <p>
            <strong>{isEnglish ? 'Operating without an Operating Agreement.' : 'İşletme Sözleşmesi olmadan faaliyet gösterme.'}</strong>{' '}
            {isEnglish
              ? 'In the absence of a written Operating Agreement, the LLC is governed by the default rules of the formation state\'s LLC statute. These defaults may not align with the members\' actual intentions — particularly regarding profit distribution, transfer restrictions, and dissolution triggers. Courts have also considered the absence of corporate formalities when evaluating veil-piercing claims.'
              : 'Yazılı bir İşletme Sözleşmesi yokluğunda, LLC kuruluş eyaletinin LLC mevzuatının varsayılan kurallarına göre yönetilir. Bu varsayılanlar, üyelerin gerçek niyetleri ile — özellikle kâr dağılımı, devir kısıtlamaları ve tasfiye tetikleyicileri bakımından — uyuşmayabilir. Mahkemeler ayrıca tüzel kişilik perdesinin kaldırılması taleplerini değerlendirirken kurumsal formalitelerin yokluğunu da dikkate almıştır.'}
          </p>

          <p>
            <strong>{isEnglish ? 'Difficulty opening US bank accounts.' : 'ABD banka hesabı açmada zorluk.'}</strong>{' '}
            {isEnglish
              ? 'Many traditional US banks require in-person identity verification for account opening, which presents a practical barrier for non-US residents. While some banks and fintech providers offer remote onboarding for foreign-owned LLCs, the documentary requirements (EIN confirmation, Articles of Organization, Operating Agreement, and sometimes personal identification documents authenticated by a US embassy) can be substantial.'
              : 'Birçok geleneksel ABD bankası hesap açılışı için yüz yüze kimlik doğrulaması gerektirmektedir, bu da ABD dışında ikamet edenler için pratik bir engel oluşturur. Bazı bankalar ve fintek sağlayıcılar yabancı sahipli LLC\'ler için uzaktan müşteri kabul süreci sunsa da belge gereklilikleri (EIN onayı, kuruluş belgesi, işletme sözleşmesi ve bazen ABD büyükelçiliği tarafından doğrulanmış kişisel kimlik belgeleri) önemli olabilir.'}
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
            <Link href={`/${lang}/library/irs-vergi-gercekleri`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'IRS Tax Forms Explained' : 'IRS Vergi Formları Açıklamalı'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'W-8, W-9, and 1099 forms for non-US entrepreneurs' : 'ABD dışından girişimciler için W-8, W-9 ve 1099 formları'}</p>
            </Link>
            <Link href={`/${lang}/library/llc-vize-yanilgisi`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'LLC and Visa Eligibility' : 'LLC ve Vize Uygunluğu'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'Why LLC formation does not confer immigration benefits' : 'LLC kuruluşunun neden göçmenlik avantajı sağlamadığı'}</p>
            </Link>
            <Link href={`/${lang}/library/temel-sozlesmeler`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'Essential Contracts for US Business' : 'ABD\'de İş İçin Temel Sözleşmeler'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'Contracts commonly needed after LLC formation' : 'LLC kuruluşundan sonra yaygın olarak ihtiyaç duyulan sözleşmeler'}</p>
            </Link>
            <Link href={`/${lang}/library/hukuki-yanilgilar`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'Common Legal Misconceptions' : 'Yaygın Hukuki Yanılgılar'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'Frequently misunderstood aspects of US business law' : 'ABD iş hukuku hakkında sıkça yanlış anlaşılan konular'}</p>
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

        {/* Related Document Kit — outside article body, understated */}
        <div className="mt-10 pt-8 border-t border-stone-200">
          <p className="text-sm text-muted">
            {isEnglish ? 'Related document kit: ' : 'İlgili belge kiti: '}
            <Link href={`/${lang}/legal-kits/business-starter`} className="pillar-link">
              {isEnglish ? 'Business Starter Kit' : 'İş Başlangıç Kiti'}
            </Link>
            {isEnglish
              ? ' — includes NDA, Service Agreement, and Privacy Policy templates for new LLCs.'
              : ' — yeni LLC\'ler için NDA, Hizmet Sözleşmesi ve Gizlilik Politikası şablonlarını içerir.'}
          </p>
        </div>
      </article>
    </main>
  )
}
