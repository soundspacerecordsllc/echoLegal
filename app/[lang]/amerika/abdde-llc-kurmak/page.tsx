import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import TrustStrip from '@/components/TrustStrip'
import FAQAccordion from '@/components/FAQAccordion'
import KitCallout from '@/components/KitCallout'
import { getRegistryEntry } from '@/lib/amerika-content-registry'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const PAGE_META = {
  slug: 'abdde-llc-kurmak',
  datePublished: '2025-06-01',
  dateModified: '2026-01-25',
  version: '2.0',
  citationKey: 'ecl-gde-00001',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const url = `${SITE_URL}/${lang}/amerika/${PAGE_META.slug}`
  return {
    title: isEnglish
      ? "Forming an LLC in the US - Complete Guide to State Selection, Formation & Compliance | EchoLegal"
      : "ABD'de LLC Kurmak - Eyalet Seçimi, Kuruluş ve Uyum Yükümlülükleri Rehberi | EchoLegal",
    description: isEnglish
      ? "Comprehensive guide to forming a US LLC. State comparison (Delaware, Wyoming, Florida, Nevada, New Mexico), formation steps, Operating Agreement, EIN application, post-formation compliance, and corporate veil protection."
      : "ABD'de LLC kurulumuna ilişkin kapsamlı rehber. Eyalet karşılaştırması (Delaware, Wyoming, Florida, Nevada, New Mexico), kuruluş adımları, Operating Agreement, EIN başvurusu, kuruluş sonrası uyum yükümlülükleri ve tüzel kişilik perdesi korunması.",
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en/amerika/${PAGE_META.slug}`,
        'tr': `${SITE_URL}/tr/amerika/${PAGE_META.slug}`,
      },
    },
    other: {
      'citation_title': isEnglish ? 'Forming an LLC in the US' : "ABD'de LLC Kurmak",
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/06/01',
      'citation_lastmod': '2026/01/25',
      'citation_version': PAGE_META.version,
      'citation_language': lang,
      'citation_fulltext_html_url': url,
      'citation_id': PAGE_META.citationKey,
    },
  }
}

export default async function AbddeLLCPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const registryEntry = getRegistryEntry('abdde-llc-kurmak')

  const faqItems = [
    {
      question: isEnglish ? "Can a non-US resident form a US LLC?" : "ABD'de ikamet etmeyen biri ABD LLC'si kurabilir mi?",
      answer: isEnglish
        ? "Yes. US LLCs can be formed by non-residents without a visa or physical presence. The formation process is handled entirely through state filing, a registered agent, and supporting documents. However, LLC formation alone does not provide any immigration status, work authorization, or right to enter the United States."
        : "Evet. ABD dışında yaşayan kişiler, vize veya fiziksel bulunma şartı aranmaksızın ABD LLC'si kurabilir. Kuruluş süreci eyalet dosyalaması, registered agent ve destekleyici belgeler aracılığıyla tamamen uzaktan yürütülebilir. Ancak LLC kurmak tek başına herhangi bir göçmenlik statüsü, çalışma izni veya ABD'ye giriş hakkı sağlamaz."
    },
    {
      question: isEnglish ? "Why do people choose Delaware or Wyoming?" : "Delaware veya Wyoming neden tercih ediliyor?",
      answer: isEnglish
        ? "Delaware offers a specialized business court (Court of Chancery), extensive case law, and predictable legal outcomes. Wyoming charges no state income tax, has low annual fees ($60), and provides strong asset protection and privacy. Neither is universally 'better' - the choice depends on your business model, where you operate, and cost tolerance. Many small businesses are better served by forming in their home state."
        : "Delaware, iş uyuşmazlıklarına bakan uzmanlaşmış bir mahkeme (Court of Chancery), zengin içtihat birikimi ve öngörülebilir hukuki sonuçlar sunar. Wyoming ise eyalet gelir vergisi almaz, düşük yıllık harçlar uygular (60 $) ve güçlü varlık korumasıyla gizlilik güvenceleri sağlar. Hiçbiri her koşulda 'daha iyi' değildir; seçim iş modelinize, faaliyet gösterdiğiniz bölgeye ve maliyet toleransınıza bağlıdır. Küçük ölçekli pek çok işletme için asıl faaliyet eyaletinde kurulum daha avantajlıdır."
    },
    {
      question: isEnglish ? "Do I need a US address to form an LLC?" : "LLC kurmak için ABD adresine ihtiyacım var mı?",
      answer: isEnglish
        ? "You need a registered agent with a physical street address (not a P.O. box) in the state of formation. This can be a professional registered agent service. Your personal address can be anywhere in the world. Note that some states also require a principal office address on formation documents, but this does not have to be in the US for foreign-owned LLCs."
        : "Kuruluş eyaletinde fiziksel bir sokak adresi (posta kutusu değil) bulunan bir registered agent atamanız zorunludur. Bu hizmeti profesyonel bir registered agent firmasından temin edebilirsiniz. Kişisel adresinizin ABD'de olması gerekmez. Bazı eyaletler kuruluş belgelerinde ana iş yeri adresi de istese de yabancı sahipli LLC'lerde bu adresin ABD'de olma zorunluluğu bulunmaz."
    },
    {
      question: isEnglish ? "What is an EIN and do I need one?" : "EIN nedir ve almam gerekir mi?",
      answer: isEnglish
        ? "An Employer Identification Number (EIN) is a nine-digit federal tax identification number assigned by the IRS to business entities. You need an EIN to open a US bank account, file federal tax returns, and hire employees. Even single-member LLCs with no employees typically obtain an EIN because banks require it. Foreign owners without an SSN can apply by fax or mail using Form SS-4."
        : "EIN (Employer Identification Number), IRS tarafından ticari kuruluşlara verilen dokuz haneli federal vergi kimlik numarasıdır. ABD'de banka hesabı açmak, federal vergi beyannamesi vermek ve çalışan istihdam etmek için EIN gereklidir. Çalışanı olmayan tek üyeli LLC'ler bile bankalar talep ettiği için genellikle EIN alır. SSN sahibi olmayan yabancı sahipler, SS-4 formuyla faks veya posta yoluyla başvurabilir."
    },
    {
      question: isEnglish ? "Does forming an LLC give me a visa or immigration benefit?" : "LLC kurmak vize veya göçmenlik avantajı sağlar mı?",
      answer: isEnglish
        ? "No. LLC formation has no connection to immigration status. You cannot sponsor yourself for a work visa through your own LLC without independently meeting specific visa category requirements (e.g., substantial investment for E-2, extraordinary ability for O-1). Online claims suggesting otherwise are misleading."
        : "Hayır. LLC kurulumunun göçmenlik hukukuyla hiçbir bağlantısı yoktur. Belirli vize kategorisi şartlarını bağımsız olarak karşılamadan (örneğin E-2 için esaslı yatırım, O-1 için olağanüstü yetenek) kendi LLC'niz aracılığıyla kendinize vize sponsorluğu yapamazsınız. Aksini iddia eden çevrimiçi kaynaklar yanıltıcıdır."
    },
    {
      question: isEnglish ? "What are the ongoing requirements after formation?" : "Kurulumdan sonra hangi yükümlülükler devam eder?",
      answer: isEnglish
        ? "Requirements vary by state but typically include: annual report filings (due dates and fees differ per state), franchise taxes or annual fees, maintaining a registered agent continuously, keeping the Operating Agreement current, and filing Beneficial Ownership Information reports with FinCEN. At the federal level, applicable tax returns (income, employment) must be filed with the IRS."
        : "Yükümlülükler eyalete göre değişmekle birlikte genellikle şunları kapsar: yıllık rapor bildirimi (vade tarihleri ve harçlar eyalete göre farklılık gösterir), franchise vergisi veya yıllık harç ödemesi, registered agent'ın kesintisiz sürdürülmesi, Operating Agreement'ın güncel tutulması ve FinCEN'e Beneficial Ownership Information (BOI) raporunun sunulması. Federal düzeyde ise ilgili vergi beyannameleri (gelir, istihdam) IRS'e verilmelidir."
    },
    {
      question: isEnglish ? "Single-member or multi-member LLC - what is the difference?" : "Tek üyeli ve çok üyeli LLC arasındaki fark nedir?",
      answer: isEnglish
        ? "A single-member LLC is owned by one person or entity and is treated as a disregarded entity for federal tax purposes by default - all income flows to the owner's personal return. A multi-member LLC has two or more owners and is taxed as a partnership by default, filing Form 1065 with the IRS. Both structures can elect corporate taxation (C-Corp or S-Corp). The number of members also affects Operating Agreement requirements and management structure."
        : "Tek üyeli LLC, bir kişi veya kuruluşa aittir ve federal vergi açısından varsayılan olarak disregarded entity (vergisel açıdan bağımsız sayılan kuruluş) kabul edilir; tüm gelir doğrudan sahibin kişisel beyannamesine yansır. Çok üyeli LLC'de iki veya daha fazla ortak bulunur ve varsayılan olarak ortaklık (partnership) statüsünde vergilendirilir; IRS'e Form 1065 sunulur. Her iki yapı da kurumsal vergilendirme (C-Corp veya S-Corp) tercihinde bulunabilir. Üye sayısı, Operating Agreement gereksinimleri ile yönetim yapısını da etkiler."
    },
    {
      question: isEnglish ? "Do I need an Operating Agreement?" : "Operating Agreement zorunlu mu?",
      answer: isEnglish
        ? "Legal requirements vary by state - some states (like New York and California) require one, while others do not mandate it. Regardless of state law, an Operating Agreement is functionally essential: banks typically require it to open a business account, it defines member rights and responsibilities, it strengthens your liability protection by documenting the separation between you and the entity, and it prevents state default rules from governing your LLC."
        : "Yasal zorunluluk eyalete göre değişir: bazı eyaletler (New York ve California gibi) Operating Agreement'ı zorunlu tutar, diğerleri yasal olarak şart koşmaz. Ancak eyalet hukuku ne derse desin, pratikte bu belge vazgeçilmezdir. Bankalar iş hesabı açılışında onu ister, üyelerin hak ve sorumluluklarını belirler, siz ile tüzel kişilik arasındaki ayrımı belgeleyerek sınırlı sorumluluk korumanızı güçlendirir ve eyaletin varsayılan kurallarının LLC'nizi yönetmesini engeller."
    },
    {
      question: isEnglish ? "How long does the entire LLC formation process take?" : "LLC kurulumu toplamda ne kadar sürer?",
      answer: isEnglish
        ? "State filing typically takes 1-5 business days with standard processing (some states offer expedited processing for additional fees). The EIN application adds another 4-8 weeks for foreign applicants using fax or mail. Opening a bank account varies widely - some banks process applications in days, others take weeks and may require an in-person visit. From start to a fully operational LLC with EIN and bank account, plan for 6-12 weeks for foreign owners."
        : "Eyalet dosyalaması standart işlemle genellikle 1-5 iş günü sürer (bazı eyaletler ek ücretle hızlandırılmış işlem sunar). Yabancı başvuru sahipleri için faks veya posta yoluyla yapılan EIN başvurusu 4-8 hafta daha ekler. Banka hesabı açılış süresi bankaya göre büyük değişiklik gösterir: bazı bankalar başvuruyu günler içinde sonuçlandırırken diğerleri haftalarca bekletebilir ve yüz yüze görüşme isteyebilir. Yabancı sahipler için EIN ve banka hesabıyla birlikte tam işlevsel bir LLC elde etmek toplamda 6-12 hafta sürebilir."
    },
    {
      question: isEnglish ? "Can my LLC protection be lost?" : "LLC koruması kaybedilebilir mi?",
      answer: isEnglish
        ? "Yes. Courts can 'pierce the corporate veil' and hold members personally liable if the LLC is not operated as a separate entity. Common triggers include commingling personal and business funds, using the LLC to commit fraud, failing to maintain adequate capitalization, and not observing basic formalities like keeping separate records. Maintaining proper separation between personal and business affairs is essential to preserving liability protection."
        : "Evet. Mahkemeler, LLC'nin ayrı bir tüzel kişilik olarak işletilmediği sonucuna varırsa 'tüzel kişilik perdesini kaldırarak' üyeleri şahsen sorumlu tutabilir. Sık karşılaşılan gerekçeler arasında kişisel ve ticari fonların karıştırılması, LLC'nin hile aracı olarak kullanılması, yeterli sermaye bulundurulmaması ve ayrı kayıt tutma gibi temel formalitelerin ihmal edilmesi yer alır. Sınırlı sorumluluk korumasının sürdürülebilmesi için kişisel ve ticari işlerin birbirinden kesin çizgilerle ayrılması şarttır."
    }
  ]

  const relatedPages = [
    { slug: 'llc-mi-corp-mu', title: isEnglish ? 'LLC vs Corporation' : 'LLC mi Corp mu?' },
    { slug: 'abdde-banka-hesabi', title: isEnglish ? 'US Bank Account' : "ABD'de Banka Hesabı" },
    { slug: 'irs-vergi-gercekleri', title: isEnglish ? 'IRS Tax Realities' : 'IRS Vergi Gerçekleri' },
    { slug: 'abdde-is-yapanlar-icin-sozlesmeler', title: isEnglish ? 'Contracts for US Business' : "ABD'de İş Yapanlar İçin Sözleşmeler" },
  ]

  const pageUrl = `${SITE_URL}/${lang}/amerika/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'Forming an LLC in the US' : "ABD'de LLC Kurmak"

  const articleSchema = generateArticleSchema({
    title: pageTitle,
    description: isEnglish
      ? 'Comprehensive guide to forming a US LLC.'
      : "ABD'de LLC kurulumuna ilişkin kapsamlı rehber.",
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['llc', 'us-business', 'formation', 'delaware', 'wyoming', 'operating-agreement'],
    section: 'jurisdictional-guide',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Amerika Hub' : 'Amerika Hub', url: `${SITE_URL}/${lang}/amerika` },
    { name: pageTitle, url: pageUrl },
  ])

  return (
    <div className="bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <JsonLdScript data={[articleSchema, breadcrumbSchema]} />
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'Forming an LLC' : "ABD'de LLC Kurmak" }
          ]}
        />

        <TrustStrip lang={lang} />

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          {isEnglish ? 'Jurisdiction: US State Law (Delaware, Wyoming, Florida, Nevada, New Mexico)' : 'Kapsam: ABD Eyalet Hukuku (Delaware, Wyoming, Florida, Nevada, New Mexico)'}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {isEnglish ? "Forming an LLC in the United States" : "ABD'de LLC Kurmak"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {isEnglish ? 'Last verified:' : 'Son doğrulama:'} {registryEntry?.lastVerified || '2026-01-25'}
        </p>
        <InstitutionalBadge
          lang={lang}
          jurisdictions={['US']}
          lastReviewedAt="2026-01-25"
          className="mt-6 mb-4"
        />

        {/* TL;DR */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="font-bold text-lg mb-3">TL;DR</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• {isEnglish
              ? "An LLC provides personal asset protection and pass-through taxation in a single, flexible structure."
              : "LLC, kişisel varlık koruması ile geçişli vergilendirmeyi tek bir esnek yapıda birleştirir."}</li>
            <li>• {isEnglish
              ? "Non-US residents can form US LLCs without visa or physical presence."
              : "ABD dışında yaşayanlar, vize veya fiziksel bulunma şartı olmaksızın LLC kurabilir."}</li>
            <li>• {isEnglish
              ? "LLC formation does NOT provide any immigration status or visa."
              : "LLC kurmak herhangi bir göçmenlik statüsü veya vize SAĞLAMAZ."}</li>
            <li>• {isEnglish
              ? "State selection (Delaware, Wyoming, Florida, Nevada, New Mexico, Home State) depends on your specific needs and budget."
              : "Eyalet seçimi (Delaware, Wyoming, Florida, Nevada, New Mexico, kendi eyaletiniz) ihtiyaçlarınıza ve bütçenize göre şekillenir."}</li>
            <li>• {isEnglish
              ? "Post-formation compliance (annual reports, franchise taxes, registered agent) is mandatory and ongoing."
              : "Kurulum sonrası uyum yükümlülükleri (yıllık raporlar, franchise vergisi, registered agent) zorunlu ve süreklidir."}</li>
            <li>• {isEnglish
              ? "An Operating Agreement and EIN are functionally required for every LLC."
              : "Operating Agreement ve EIN, pratikte her LLC için zorunludur."}</li>
          </ul>
        </section>

        {/* CTA 1 - Above fold */}
        <KitCallout lang={lang} variant="compact" />

        {/* What This Covers */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">
                {isEnglish ? 'This Page Covers' : 'Bu Sayfa Kapsar'}
              </h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• {isEnglish ? 'LLC structure, liability protection, and taxation' : 'LLC yapısı, sorumluluk koruması ve vergilendirme'}</li>
                <li>• {isEnglish ? 'Comparison with other entity types' : 'Diğer işletme türleriyle karşılaştırma'}</li>
                <li>• {isEnglish ? 'State selection factors and cost comparison' : 'Eyalet seçiminde belirleyici unsurlar ve maliyet karşılaştırması'}</li>
                <li>• {isEnglish ? 'Step-by-step formation process' : 'Adım adım kuruluş süreci'}</li>
                <li>• {isEnglish ? 'Post-formation compliance and deadlines' : 'Kuruluş sonrası uyum yükümlülükleri ve süreler'}</li>
                <li>• {isEnglish ? 'Operating Agreement essentials' : 'Operating Agreement esasları'}</li>
                <li>• {isEnglish ? 'EIN application process' : 'EIN başvuru süreci'}</li>
                <li>• {isEnglish ? 'Piercing the corporate veil risks' : 'Tüzel kişilik perdesinin kaldırılması riskleri'}</li>
                <li>• {isEnglish ? 'Multi-state operations and foreign registration' : 'Çok eyaletli faaliyet ve yabancı LLC tescili'}</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'This Page Does Not Cover' : 'Bu Sayfa Kapsamaz'}
              </h3>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• {isEnglish ? 'Specific state-by-state filing procedures' : 'Eyalet bazında detaylı dosyalama prosedürleri'}</li>
                <li>• {isEnglish ? 'Tax planning or tax return preparation' : 'Vergi planlaması veya beyanname hazırlığı'}</li>
                <li>• {isEnglish ? 'Formation service provider recommendations' : 'Kuruluş hizmeti sağlayıcı tavsiyeleri'}</li>
                <li>• {isEnglish ? 'Individual business structure advice' : 'Kişiye özel iş yapısı danışmanlığı'}</li>
                <li>• {isEnglish ? 'Immigration or visa guidance' : 'Göçmenlik veya vize yönlendirmesi'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ===== SECTION 1: What is an LLC ===== */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'What Is an LLC?' : 'LLC Nedir?'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "A Limited Liability Company (LLC) is a hybrid business structure authorized by state statute in all fifty US states and the District of Columbia. It combines the limited liability shield of a corporation with the operational flexibility and tax treatment of a partnership. The result is a business form widely used by both domestic and foreign entrepreneurs for operations ranging from freelance consulting to real estate holdings to technology ventures."
                : "LLC (Limited Liability Company), ABD'nin elli eyaletinin tamamında ve Columbia Bölgesi'nde eyalet yasalarıyla düzenlenen karma bir işletme yapısıdır. Şirketlere özgü sınırlı sorumluluk kalkanını, ortaklıkların sunduğu operasyonel esneklik ve vergisel avantajlarla bir araya getirir. Ortaya çıkan bu yapı, serbest danışmanlıktan gayrimenkul yatırımlarına, teknoloji girişimlerinden uluslararası ticarete kadar geniş bir yelpazede hem yerli hem de yabancı girişimciler tarafından yaygın biçimde kullanılmaktadır."}
            </p>

            <h3 className="font-semibold text-gray-900 text-lg mt-6">
              {isEnglish ? 'Liability Protection' : 'Sorumluluk Koruması'}
            </h3>
            <p>
              {isEnglish
                ? "The defining characteristic of an LLC is personal asset protection. When properly maintained, an LLC creates a legal separation between business obligations and the personal assets of its members (owners). Creditors of the LLC generally cannot reach members' personal bank accounts, real property, or other individual holdings to satisfy business debts. This protection is not absolute - it can be lost through certain conduct described in the \"Piercing the Corporate Veil\" section below."
                : "LLC'nin temel ayırt edici özelliği, kişisel varlık korumasıdır. Usulüne uygun yönetildiğinde LLC, ticari yükümlülükler ile üyelerin (sahiplerin) kişisel varlıkları arasında hukuki bir ayrım oluşturur. LLC'nin alacaklıları, işletme borçlarını tahsil etmek için üyelerin kişisel banka hesaplarına, taşınmazlarına veya diğer bireysel varlıklarına kural olarak başvuramaz. Ancak bu koruma mutlak değildir; aşağıda \"Tüzel Kişilik Perdesinin Kaldırılması\" başlığında açıklanan belirli davranışlarla kaybedilebilir."}
            </p>

            <h3 className="font-semibold text-gray-900 text-lg mt-6">
              {isEnglish ? 'Pass-Through Taxation' : 'Geçişli Vergilendirme'}
            </h3>
            <p>
              {isEnglish
                ? "By default, the IRS does not treat an LLC as a separate taxable entity at the federal level. A single-member LLC is classified as a \"disregarded entity,\" meaning all income and expenses are reported on the member's personal tax return (Schedule C of Form 1040 for US persons). A multi-member LLC is classified as a partnership and files an informational return (Form 1065), with each member receiving a Schedule K-1 reflecting their share of income, deductions, and credits. No entity-level federal income tax is owed in either default classification."
                : "IRS, LLC'yi federal düzeyde varsayılan olarak ayrı bir vergi mükellefi olarak değerlendirmez. Tek üyeli LLC, \"disregarded entity\" (vergisel açıdan bağımsız sayılan kuruluş) olarak sınıflandırılır; tüm gelir ve giderler doğrudan üyenin kişisel vergi beyannamesine yansır (ABD kişileri için Form 1040'ın Schedule C eki). Çok üyeli LLC ise ortaklık (partnership) olarak sınıflandırılır ve bilgi amaçlı beyanname (Form 1065) sunar; her üye, gelir, indirim ve kredi payını gösteren bir Schedule K-1 alır. Her iki varsayılan sınıflandırmada da kuruluş düzeyinde federal gelir vergisi doğmaz."}
            </p>

            <h3 className="font-semibold text-gray-900 text-lg mt-6">
              {isEnglish ? 'Tax Election Flexibility' : 'Vergisel Tercih Esnekliği'}
            </h3>
            <p>
              {isEnglish
                ? "LLCs possess a distinctive advantage: the ability to elect different federal tax treatments without changing the underlying business structure. An LLC may elect to be taxed as an S-Corporation (by filing Form 2553) or a C-Corporation (by filing Form 8832). This flexibility allows the same legal entity to optimize its tax posture as business circumstances evolve. For a detailed comparison, see the "
                : "LLC'lerin belirgin bir avantajı, altta yatan iş yapısını değiştirmeden farklı federal vergi rejimlerini seçebilme imkanıdır. LLC, Form 2553 sunarak S-Corporation veya Form 8832 sunarak C-Corporation olarak vergilendirilmeyi tercih edebilir. Bu esneklik, aynı tüzel kişiliğin iş koşulları değiştikçe vergisel konumunu optimize etmesini sağlar. Detaylı bir karşılaştırma için "}
              <Link href={`/${lang}/amerika/llc-mi-corp-mu`} className="text-[#C9A227] underline hover:text-[#B8922A]">
                {isEnglish ? 'LLC vs Corporation' : 'LLC mi Corp mu?'}
              </Link>
              {isEnglish ? ' page.' : ' sayfasına bakınız.'}
            </p>

            <h3 className="font-semibold text-gray-900 text-lg mt-6">
              {isEnglish ? 'Operational Flexibility' : 'Operasyonel Esneklik'}
            </h3>
            <p>
              {isEnglish
                ? "Unlike corporations, LLCs are not required to maintain a board of directors, hold annual shareholder meetings, or keep formal corporate minutes. Governance rules are established by the Operating Agreement, which can be tailored to nearly any management structure the members choose - from a single owner making all decisions to a multi-manager structure with detailed voting procedures."
                : "Şirketlerden farklı olarak LLC'ler, yönetim kurulu bulundurmak, yıllık hissedar toplantısı düzenlemek veya resmi şirket tutanakları tutmak zorunda değildir. Yönetim kuralları, üyelerin ihtiyaçlarına göre serbestçe şekillendirilebilen Operating Agreement ile belirlenir. Bu yapı, tek bir sahibin tüm kararları aldığı basit bir modelden detaylı oylama prosedürleri içeren çok yöneticili bir modele kadar geniş bir yelpazede tasarlanabilir."}
            </p>
          </div>
        </section>

        {/* ===== SECTION 2: LLC vs Other Entity Types ===== */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'LLC vs Other Entity Types' : 'LLC ile Diğer İşletme Türlerinin Karşılaştırması'}
          </h2>

          <div className="prose max-w-none text-gray-600 mb-6">
            <p>
              {isEnglish
                ? "Choosing a business entity type is one of the earliest and most consequential decisions in forming a US business. The table below summarizes four common structures. For a deeper analysis of the LLC-versus-Corporation decision, see the dedicated "
                : "İşletme türü seçimi, ABD'de iş kurma sürecinin en erken ve en belirleyici kararlarından biridir. Aşağıdaki tablo dört yaygın yapıyı özetlemektedir. LLC ile Corporation arasındaki karşılaştırmanın daha detaylı analizi için "}
              <Link href={`/${lang}/amerika/llc-mi-corp-mu`} className="text-[#C9A227] underline hover:text-[#B8922A]">
                {isEnglish ? 'LLC vs Corporation' : 'LLC mi Corp mu?'}
              </Link>
              {isEnglish ? ' page.' : ' sayfasını inceleyebilirsiniz.'}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Factor' : 'Faktör'}</th>
                  <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Sole Proprietorship' : 'Şahıs İşletmesi'}</th>
                  <th className="border border-gray-200 p-3 text-left">LLC</th>
                  <th className="border border-gray-200 p-3 text-left">S-Corporation</th>
                  <th className="border border-gray-200 p-3 text-left">C-Corporation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">{isEnglish ? 'Liability Protection' : 'Sorumluluk Koruması'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'None' : 'Yok'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Yes' : 'Var'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Yes' : 'Var'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Yes' : 'Var'}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 p-3 font-medium">{isEnglish ? 'Default Taxation' : 'Varsayılan Vergilendirme'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Pass-through' : 'Geçişli'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Pass-through' : 'Geçişli'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Pass-through' : 'Geçişli'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Double taxation' : 'Çifte vergilendirme'}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">{isEnglish ? 'Formation Filing' : 'Kuruluş Dosyalaması'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'None required' : 'Gerekli değil'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Articles of Organization' : 'Articles of Organization'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Articles of Incorporation + IRS election' : 'Articles of Incorporation + IRS tercihi'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Articles of Incorporation' : 'Articles of Incorporation'}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 p-3 font-medium">{isEnglish ? 'Ongoing Formalities' : 'Süregelen Formaliteler'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Minimal' : 'Asgari'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Moderate' : 'Orta'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Significant' : 'Yüksek'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Significant' : 'Yüksek'}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">{isEnglish ? 'Ownership Limits' : 'Sahiplik Kısıtlamaları'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? '1 owner' : '1 sahip'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Unlimited' : 'Sınırsız'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Max 100 (US persons only)' : 'Maks 100 (yalnızca ABD kişileri)'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Unlimited' : 'Sınırsız'}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 p-3 font-medium">{isEnglish ? 'Foreign Owners' : 'Yabancı Sahiplik'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'N/A' : 'Uygulanmaz'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Allowed' : 'Mümkün'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Not allowed' : 'Mümkün değil'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Allowed' : 'Mümkün'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <p>{isEnglish
              ? "Note: S-Corporation is a tax election (IRS Form 2553), not a separate business structure. Both LLCs and C-Corporations can elect S-Corp taxation, subject to eligibility requirements. Non-resident aliens are not eligible for S-Corp status."
              : "Not: S-Corporation, ayrı bir iş yapısı değil vergisel bir tercih statüsüdür (IRS Form 2553). Hem LLC'ler hem de C-Corporation'lar, uygunluk şartlarını sağlamak kaydıyla S-Corp vergilendirmesini seçebilir. ABD'de mukim olmayan yabancılar S-Corp statüsünden yararlanamaz."}</p>
          </div>
        </section>

        {/* ===== SECTION 3: State Selection ===== */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'State Selection for LLC Formation' : 'LLC Kurulumu İçin Eyalet Seçimi'}
          </h2>

          <div className="prose max-w-none text-gray-600 mb-6">
            <p>
              {isEnglish
                ? "Where you incorporate your LLC affects annual costs, tax obligations, privacy, legal protections, and administrative burden. The following analysis covers the states most commonly considered by both domestic and foreign-owned LLCs."
                : "LLC'nizi hangi eyalette kurduğunuz, yıllık maliyetlerinizi, vergi yükümlülüklerinizi, gizlilik düzeyinizi, hukuki korumalarınızı ve idari yükünüzü doğrudan etkiler. Aşağıdaki analiz, hem yerli hem de yabancı sahipli LLC'ler tarafından en sık değerlendirilen eyaletleri kapsamaktadır."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Delaware</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>{isEnglish ? 'Advantages:' : 'Avantajlar:'}</strong> {isEnglish
                  ? "The Court of Chancery, a dedicated equity court with expert judges (no juries), provides fast and predictable resolution of business disputes. Delaware has the most extensive body of LLC case law in the United States, which reduces legal uncertainty. The Delaware Limited Liability Company Act is widely considered the most flexible in the nation, granting maximum freedom in structuring Operating Agreements."
                  : "Jürisiz, uzman hakimlerden oluşan özel bir hakkaniyet mahkemesi olan Court of Chancery, ticari uyuşmazlıkları hızlı ve öngörülebilir biçimde çözer. ABD'de en kapsamlı LLC içtihat birikimi Delaware'e aittir; bu durum hukuki belirsizliği azaltır. Delaware Limited Liability Company Act, Operating Agreement yapılandırmasında azami serbestlik tanıyan, ülkedeki en esnek düzenleme olarak kabul edilir."}</p>
                <p><strong>{isEnglish ? 'Considerations:' : 'Dikkat Edilecekler:'}</strong> {isEnglish
                  ? "Annual franchise tax of $300 minimum. Registered agent required ($50-$300/year). If you operate in another state, you must also register there as a foreign LLC, adding costs. Best suited for businesses with complex equity structures, investor expectations, or multi-state operations."
                  : "Asgari 300 $ yıllık franchise vergisi alınır. Registered agent zorunludur (yıllık 50-300 $). Başka bir eyalette fiilen faaliyet gösteriyorsanız, orada da yabancı LLC tescili yaptırmanız gerekir; bu durum ek maliyet yaratır. Karmaşık ortaklık yapıları, yatırımcı beklentileri veya çok eyaletli operasyonlar için en uygun seçenektir."}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Wyoming</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>{isEnglish ? 'Advantages:' : 'Avantajlar:'}</strong> {isEnglish
                  ? "No state income tax. Annual report fee of only $60 (or minimum $60 based on assets). Strong charging order protections for single-member LLCs, making Wyoming particularly attractive for asset protection. Lifetime proxy provisions and nominee arrangements support privacy. Wyoming was the first state to adopt LLC legislation (1977)."
                  : "Eyalet gelir vergisi yoktur. Yıllık rapor harcı yalnızca 60 $ (veya varlıklara göre asgari 60 $) tutarındadır. Tek üyeli LLC'ler için güçlü charging order korumaları, Wyoming'i özellikle varlık koruması açısından cazip kılar. Ömür boyu vekalet düzenlemeleri ve nominee yapıları gizliliği destekler. LLC mevzuatını ilk benimseyen eyalet Wyoming'dir (1977)."}</p>
                <p><strong>{isEnglish ? 'Considerations:' : 'Dikkat Edilecekler:'}</strong> {isEnglish
                  ? "Less established case law compared to Delaware. Court system is less specialized in business disputes. Still requires foreign LLC registration in any state where you have physical presence or conduct business."
                  : "Delaware ile karşılaştırıldığında içtihat birikimi daha sınırlıdır. Mahkeme sistemi ticari uyuşmazlıklarda aynı düzeyde uzmanlaşmamıştır. Fiziksel varlığınızın bulunduğu veya fiilen iş yaptığınız eyaletlerde yabancı LLC tescili yine gereklidir."}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Florida</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>{isEnglish ? 'Advantages:' : 'Avantajlar:'}</strong> {isEnglish
                  ? "No state personal income tax. Strong homestead protections. Large business community with extensive service provider network. Filing fee of $125. Florida is a practical choice for businesses with physical operations or customers in the southeastern US."
                  : "Eyalet düzeyinde kişisel gelir vergisi yoktur. Güçlü homestead (mesken) korumaları mevcuttur. Geniş bir iş topluluğu ve kapsamlı hizmet sağlayıcı ağı bulunur. Kuruluş harcı 125 $'dır. Güneydoğu ABD'de fiziksel operasyonları veya müşterileri bulunan işletmeler için Florida pratik bir seçimdir."}</p>
                <p><strong>{isEnglish ? 'Considerations:' : 'Dikkat Edilecekler:'}</strong> {isEnglish
                  ? "Annual report fee of $138.75 due by May 1 each year, with a $400 late fee if missed. Florida requires public disclosure of member/manager information in annual reports. Registered agent required."
                  : "Her yıl 1 Mayıs'a kadar ödenmesi gereken 138,75 $ yıllık rapor harcı bulunur; süre kaçırılırsa 400 $ gecikme cezası uygulanır. Florida, yıllık raporlarda üye/yönetici bilgilerinin kamuya açıklanmasını zorunlu kılar. Registered agent gereklidir."}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Nevada</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>{isEnglish ? 'Advantages:' : 'Avantajlar:'}</strong> {isEnglish
                  ? "No state corporate income tax, no franchise tax, and no personal income tax. Strong privacy protections - Nevada does not share information with the IRS. Charging order is the exclusive remedy for creditors of LLC members."
                  : "Eyalet kurumlar vergisi, franchise vergisi ve kişisel gelir vergisi yoktur. Güçlü gizlilik korumaları sunar; Nevada, IRS ile bilgi paylaşımında bulunmaz. LLC üyelerinin alacaklıları için charging order tek hukuki yoldur."}</p>
                <p><strong>{isEnglish ? 'Considerations:' : 'Dikkat Edilecekler:'}</strong> {isEnglish
                  ? "Annual fees are higher than Wyoming: $150 business license fee plus $150 annual list filing. State Business License is required ($200 initial). Total annual cost is approximately $350+. Nevada's reputation for privacy has led to increased IRS scrutiny of Nevada entities."
                  : "Yıllık harçlar Wyoming'den yüksektir: 150 $ işletme lisans harcı artı 150 $ yıllık liste dosyalama harcı. Eyalet İş Lisansı zorunludur (başlangıçta 200 $). Yıllık toplam maliyet yaklaşık 350 $+ düzeyindedir. Nevada'nın gizlilik konusundaki itibarı, IRS'in bu eyaletteki kuruluşlara yönelik denetimini artırmasına yol açmıştır."}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">New Mexico</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>{isEnglish ? 'Advantages:' : 'Avantajlar:'}</strong> {isEnglish
                  ? "No annual report requirement and no annual fees after formation - making it the lowest-cost state to maintain an LLC long-term. No public disclosure of member information. Filing fee is only $50. Attractive for holding companies, dormant entities, and foreign owners seeking minimal ongoing obligations."
                  : "Kuruluş sonrasında yıllık rapor ve yıllık harç yükümlülüğü yoktur; bu özellik, New Mexico'yu uzun vadede LLC sürdürme maliyeti en düşük eyalet yapar. Üye bilgileri kamuya açıklanmaz. Kuruluş harcı yalnızca 50 $'dır. Holding şirketleri, atıl kuruluşlar ve asgari düzeyde devam eden yükümlülük arayan yabancı sahipler için caziptir."}</p>
                <p><strong>{isEnglish ? 'Considerations:' : 'Dikkat Edilecekler:'}</strong> {isEnglish
                  ? "Less established business case law. Has a gross receipts tax (GRT) that applies to businesses operating within the state. Limited banking and business infrastructure compared to larger states. Not as widely recognized by international banks for account opening."
                  : "İş hukuku içtihadı sınırlıdır. Eyalet içinde faaliyet gösteren işletmelere gayri safi hasılat vergisi (GRT) uygulanır. Büyük eyaletlere kıyasla bankacılık ve iş altyapısı daha kısıtlıdır. Uluslararası bankalar tarafından hesap açılışında diğer eyaletler kadar yaygın kabul görmez."}</p>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Home State (Where You Operate)' : 'Kendi Eyaletiniz (Faaliyet Gösterdiğiniz Yer)'}</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>{isEnglish ? 'Advantages:' : 'Avantajlar:'}</strong> {isEnglish
                  ? "If you have physical presence, employees, or customers in a specific state, forming there avoids the need (and cost) to register as a foreign LLC in that state. Simplifies compliance by dealing with only one state. Often the most practical and cost-effective choice for businesses with a clear geographic base."
                  : "Belirli bir eyalette fiziksel varlığınız, çalışanlarınız veya müşterileriniz varsa, LLC'yi orada kurmak o eyalette yabancı LLC tescili zorunluluğunu (ve maliyetini) ortadan kaldırır. Yalnızca tek bir eyaletin yükümlülüklerine tabi olmak uyum sürecini basitleştirir. Belirgin bir coğrafi tabanı olan işletmeler için genellikle en pratik ve maliyet etkin seçenektir."}</p>
                <p><strong>{isEnglish ? 'Considerations:' : 'Dikkat Edilecekler:'}</strong> {isEnglish
                  ? "State-specific rules, fees, taxes, and reporting obligations vary significantly. Some states have high formation fees (e.g., California's $800 annual franchise tax minimum, Massachusetts' $500 filing fee). Research your specific state's requirements before deciding."
                  : "Eyalete özgü kurallar, harçlar, vergiler ve bildirim yükümlülükleri önemli farklılıklar gösterir. Bazı eyaletlerde kuruluş maliyetleri yüksektir (örneğin California'da asgari 800 $ yıllık franchise vergisi, Massachusetts'te 500 $ dosyalama harcı). Karar vermeden önce ilgili eyaletin gereksinimlerini ayrıntılı biçimde araştırın."}</p>
              </div>
            </div>
          </div>

          {/* Cost Comparison Table */}
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-3">
              {isEnglish ? 'Annual Cost Comparison (Approximate)' : 'Yıllık Maliyet Karşılaştırması (Yaklaşık)'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'State' : 'Eyalet'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Formation Fee' : 'Kuruluş Harcı'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Annual Cost' : 'Yıllık Maliyet'}</th>
                    <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'State Income Tax' : 'Eyalet Gelir Vergisi'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Delaware</td>
                    <td className="border border-gray-200 p-3">$90</td>
                    <td className="border border-gray-200 p-3">$300+</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'None for out-of-state' : 'Eyalet dışı için yok'}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 p-3 font-medium">Wyoming</td>
                    <td className="border border-gray-200 p-3">$100</td>
                    <td className="border border-gray-200 p-3">$60</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'None' : 'Yok'}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">Florida</td>
                    <td className="border border-gray-200 p-3">$125</td>
                    <td className="border border-gray-200 p-3">$138.75</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'None (personal)' : 'Yok (kişisel)'}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 p-3 font-medium">Nevada</td>
                    <td className="border border-gray-200 p-3">$75 + $200</td>
                    <td className="border border-gray-200 p-3">$350+</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'None' : 'Yok'}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 p-3 font-medium">New Mexico</td>
                    <td className="border border-gray-200 p-3">$50</td>
                    <td className="border border-gray-200 p-3">$0</td>
                    <td className="border border-gray-200 p-3">{isEnglish ? 'Yes (if operating in-state)' : 'Var (eyalet içi faaliyet halinde)'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {isEnglish
                ? "Fees shown exclude registered agent costs ($50-$300/year) which apply in all states. Amounts are approximate and subject to change."
                : "Gösterilen harçlara tüm eyaletlerde geçerli olan registered agent maliyeti (yıllık 50-300 $) dahil değildir. Tutarlar yaklaşıktır ve değişikliğe tabidir."}
            </p>
          </div>
        </section>

        {/* CTA 2 - Mid page */}
        <KitCallout lang={lang} variant="compact" />

        {/* ===== SECTION 4: Formation Steps ===== */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Formation Steps' : 'Kuruluş Adımları'}
          </h2>

          <div className="prose max-w-none text-gray-600 mb-6">
            <p>
              {isEnglish
                ? "The following seven steps outline the standard LLC formation process. For a printable version, see the "
                : "Aşağıdaki yedi adım, standart LLC kuruluş sürecini özetlemektedir. Yazdırılabilir bir sürüm için "}
              <Link href={`/${lang}/checklists/llc-kontrol-listesi`} className="text-[#C9A227] underline hover:text-[#B8922A]">
                {isEnglish ? 'LLC Formation Checklist' : 'LLC Kuruluş Kontrol Listesi'}
              </Link>
              {isEnglish ? '.' : ' sayfasını ziyaret edebilirsiniz.'}
            </p>
          </div>

          <div className="space-y-4">
            {(isEnglish ? [
              { step: '1', title: 'Choose a State', desc: 'Evaluate where you will physically operate, where your customers are located, tax implications, annual compliance costs, and legal protections offered by each state. If your business has no US physical presence, Wyoming and New Mexico are common choices for cost and simplicity. If you expect institutional investment, Delaware is often preferred.' },
              { step: '2', title: 'Select and Reserve a Name', desc: 'Your LLC name must be distinguishable from existing entities in your chosen state and must include a designator such as "LLC," "L.L.C.," or "Limited Liability Company." Most states offer online name availability searches through the Secretary of State website. Consider reserving the name (typically $25-$50, valid for 60-120 days) while you prepare other documents.' },
              { step: '3', title: 'Appoint a Registered Agent', desc: 'Every state requires a registered agent (tescil acentesi) - a person or entity authorized to receive legal documents, tax notices, and official correspondence on behalf of the LLC. The registered agent must have a physical street address in the state of formation and be available during normal business hours. Professional registered agent services typically charge $50-$300 per year.' },
              { step: '4', title: 'File Articles of Organization', desc: 'This is the official formation document filed with the state\'s Secretary of State (or equivalent office). Required information typically includes the LLC name, registered agent details, principal office address, whether the LLC is member-managed or manager-managed, and organizer information. Filing fees range from $50 (New Mexico) to $500+ (Massachusetts). Processing times vary from same-day to several weeks.' },
              { step: '5', title: 'Draft an Operating Agreement', desc: 'While not filed with the state, the Operating Agreement is the governing document of the LLC. It should address member contributions, ownership percentages, management structure, voting procedures, profit and loss allocation, distribution rules, transfer restrictions, and dissolution procedures. See the dedicated Operating Agreement section below for details.' },
              { step: '6', title: 'Obtain an EIN', desc: 'Apply for an Employer Identification Number from the IRS. US persons with SSNs can apply online and receive the EIN immediately. Foreign applicants without SSNs must apply by fax or mail using Form SS-4, with processing taking 4-8 weeks. The EIN is required before opening a bank account. See the EIN Application section below.' },
              { step: '7', title: 'Open a Business Bank Account', desc: 'A separate business bank account is essential for maintaining the legal separation between personal and business finances. Banks typically require the Articles of Organization, Operating Agreement, EIN confirmation letter, and government-issued identification of all members. Requirements and accessibility vary significantly by bank.' }
            ] : [
              { step: '1', title: 'Eyalet Seçin', desc: 'Fiziksel olarak nerede faaliyet göstereceğinizi, müşterilerinizin nerede bulunduğunu, vergisel sonuçları, yıllık uyum maliyetlerini ve her eyaletin sunduğu hukuki korumaları değerlendirin. İşletmenizin ABD\'de fiziksel varlığı yoksa maliyet ve pratiklik açısından Wyoming ve New Mexico yaygın tercihlerdir. Kurumsal yatırım bekliyorsanız Delaware genellikle öne çıkar.' },
              { step: '2', title: 'İsim Seçin ve Ayırtın', desc: 'LLC adınız, seçtiğiniz eyaletteki mevcut kuruluşlardan ayırt edilebilir olmalı ve "LLC," "L.L.C." veya "Limited Liability Company" gibi bir tanımlayıcı içermelidir. Çoğu eyalet, Secretary of State web sitesi üzerinden çevrimiçi isim uygunluk sorgulaması sunar. Diğer belgeleri hazırlarken ismi ayırtmayı düşünebilirsiniz (genellikle 25-50 $, 60-120 gün geçerli).' },
              { step: '3', title: 'Registered Agent Atayın', desc: 'Her eyalet, LLC adına yasal belgeleri, vergi bildirimlerini ve resmi yazışmaları teslim almaya yetkili bir registered agent (tescil acentesi) bulundurulmasını zorunlu kılar. Registered agent, kuruluş eyaletinde fiziksel bir sokak adresine sahip olmalı ve mesai saatlerinde ulaşılabilir olmalıdır. Profesyonel registered agent hizmetleri genellikle yıllık 50-300 $ arasında ücret alır.' },
              { step: '4', title: 'Articles of Organization Dosyalayın', desc: 'Eyaletin Secretary of State\'ine (veya muadil kuruma) sunulan resmi kuruluş belgesidir. Genellikle LLC adı, registered agent bilgileri, ana iş yeri adresi, LLC\'nin üye yönetimli mi yoksa yönetici yönetimli mi olduğu ve organizatör bilgileri istenir. Dosyalama harçları 50 $ (New Mexico) ile 500 $+ (Massachusetts) arasında değişir. İşlem süreleri aynı günden birkaç haftaya kadar farklılık gösterir.' },
              { step: '5', title: 'Operating Agreement Hazırlayın', desc: 'Eyalete sunulmasa da Operating Agreement, LLC\'nin yönetim belgesidir. Üye katkıları, ortaklık payları, yönetim yapısı, oylama prosedürleri, kar ve zarar dağılımı, dağıtım kuralları, pay devir kısıtlamaları ve tasfiye prosedürlerini kapsamalıdır. Detaylar için aşağıdaki Operating Agreement bölümüne bakınız.' },
              { step: '6', title: 'EIN Alın', desc: 'IRS\'den Employer Identification Number başvurusunda bulunun. SSN sahibi ABD kişileri çevrimiçi başvurarak EIN\'i anında alabilir. SSN\'si olmayan yabancı başvuru sahipleri SS-4 formuyla faks veya posta yoluyla başvurmalıdır; işlem 4-8 hafta sürer. Banka hesabı açılmadan önce EIN gereklidir. Aşağıdaki EIN Başvurusu bölümüne bakınız.' },
              { step: '7', title: 'İş Banka Hesabı Açın', desc: 'Kişisel ve ticari finansların hukuki ayrımını sürdürmek için ayrı bir iş banka hesabı şarttır. Bankalar genellikle Articles of Organization, Operating Agreement, EIN onay mektubu ve tüm üyelerin resmi kimlik belgelerini ister. Gereksinimler ve erişilebilirlik bankadan bankaya önemli farklılıklar gösterir.' }
            ]).map((item, i) => (
              <div key={i} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-8 h-8 bg-[#C9A227] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">
                    {item.desc}
                    {i === 6 && (
                      <>
                        {' '}
                        <Link href={`/${lang}/amerika/abdde-banka-hesabi`} className="text-[#C9A227] underline hover:text-[#B8922A]">
                          {isEnglish ? 'See our US Bank Account guide for details.' : 'Detaylar için ABD\'de Banka Hesabı rehberimize bakınız.'}
                        </Link>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SECTION 5: Post-Formation Compliance ===== */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Post-Formation Compliance' : 'Kuruluş Sonrası Uyum Yükümlülükleri'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "Forming an LLC is not a one-time event. Maintaining good standing with the state requires ongoing compliance. Failure to meet these obligations can result in penalties, loss of good standing, administrative dissolution of the LLC, and - in extreme cases - loss of liability protection."
                : "LLC kurmak tek seferlik bir işlem değildir. Eyalet nezdinde iyi durumun (good standing) korunması, süregelen uyum yükümlülüklerinin yerine getirilmesini gerektirir. Bu yükümlülüklerin karşılanmaması para cezalarına, good standing kaybına, LLC'nin idari tasfiyesine ve aşırı durumlarda sınırlı sorumluluk korumasının yitirilmesine neden olabilir."}
            </p>
          </div>

          <div className="space-y-4 mt-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Annual Reports' : 'Yıllık Raporlar'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Most states require LLCs to file an annual (or biennial) report confirming basic information: registered agent, principal address, members/managers. Due dates and fees vary by state. Late filing typically triggers penalties ($25-$400+) and may lead to administrative dissolution. Notable exception: New Mexico does not require annual reports."
                  : "Çoğu eyalet, LLC'lerden temel bilgileri (registered agent, ana adres, üyeler/yöneticiler) doğrulayan yıllık (veya iki yıllık) rapor sunmasını ister. Vade tarihleri ve harçlar eyalete göre değişir. Geç dosyalama genellikle para cezası (25-400+ $) doğurur ve idari tasfiyeye yol açabilir. Önemli istisna: New Mexico yıllık rapor zorunluluğu uygulamaz."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Franchise Taxes and Annual Fees' : 'Franchise Vergisi ve Yıllık Harçlar'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Several states impose franchise taxes or annual privilege fees on LLCs, separate from income taxes. Delaware charges a flat $300 annually. California imposes an $800 minimum franchise tax. Wyoming charges $60 minimum based on assets held in-state. These are due regardless of whether the LLC earned revenue during the period."
                  : "Birçok eyalet, gelir vergisinden ayrı olarak LLC'lere franchise vergisi veya yıllık imtiyaz harcı uygular. Delaware sabit 300 $ yıllık harç alır. California asgari 800 $ franchise vergisi uygular. Wyoming, eyalet içinde tutulan varlıklara göre asgari 60 $ talep eder. Bu yükümlülükler, LLC'nin ilgili dönemde gelir elde edip etmediğinden bağımsız olarak doğar."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Registered Agent Maintenance' : 'Registered Agent Sürdürülmesi'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "A registered agent must be maintained continuously. If the registered agent resigns or the service lapses, the state may send notices that go undelivered, potentially resulting in default judgments, missed tax deadlines, or involuntary dissolution. Always update registered agent information promptly with the state."
                  : "Registered agent kesintisiz olarak sürdürülmelidir. Registered agent istifa ederse veya hizmet sona ererse, eyaletin gönderdiği bildirimler tebliğ edilemez; bu durum gıyabi kararlar, kaçırılan vergi süreleri veya zorunlu tasfiye ile sonuçlanabilir. Registered agent bilgileri değiştiğinde eyalet nezdinde derhal güncelleme yapılmalıdır."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Beneficial Ownership Information (BOI) Report' : 'Gerçek Lehtar Bilgi (BOI) Raporu'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Under the Corporate Transparency Act, most LLCs must file a Beneficial Ownership Information report with FinCEN identifying individuals who own or control the entity. Existing entities formed before 2024 had until January 1, 2025. New entities generally must file within 90 days of formation. Check current FinCEN guidance as deadlines and enforcement status have been subject to legal challenges."
                  : "Corporate Transparency Act kapsamında çoğu LLC, kuruluşun sahibi veya kontrolörü olan gerçek kişileri tanımlayan Beneficial Ownership Information (BOI) raporunu FinCEN'e sunmak zorundadır. 2024 öncesinde kurulan mevcut kuruluşlar için süre 1 Ocak 2025'ti. Yeni kuruluşların genellikle kuruluştan itibaren 90 gün içinde dosyalama yapması gerekir. Süreler ve uygulama durumu hukuki itirazlara tabi olduğundan güncel FinCEN rehberliğini kontrol ediniz."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Federal Tax Filings' : 'Federal Vergi Beyannameleri'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Federal filing obligations depend on the LLC's tax classification and member residency. Even single-member LLCs owned by foreign persons may need to file Form 5472 (reporting transactions with foreign owners) and a pro-forma Form 1120. For a comprehensive overview of US tax obligations, see "
                  : "Federal dosyalama yükümlülükleri, LLC'nin vergi sınıflandırmasına ve üyelerin mukimlik durumuna göre belirlenir. Yabancı sahipli tek üyeli LLC'ler bile Form 5472 (yabancı sahiplerle yapılan işlemlerin bildirilmesi) ve pro-forma Form 1120 sunmak zorunda kalabilir. ABD vergi yükümlülüklerine ilişkin kapsamlı bir genel bakış için "}
                <Link href={`/${lang}/amerika/irs-vergi-gercekleri`} className="text-[#C9A227] underline hover:text-[#B8922A]">
                  {isEnglish ? 'IRS Tax Realities' : 'IRS Vergi Gerçekleri'}
                </Link>
                {isEnglish ? '.' : ' sayfasına bakınız.'}
              </p>
            </div>
          </div>
        </section>

        {/* ===== SECTION 6: Operating Agreement ===== */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'The Operating Agreement' : 'Operating Agreement (İşletme Sözleşmesi)'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "The Operating Agreement is the internal governance document of an LLC. While it is not filed with the state, it is the single most important document defining how the LLC operates, how decisions are made, and how members' rights and obligations are structured."
                : "Operating Agreement, LLC'nin iç yönetim belgesidir. Eyalete sunulmasa da LLC'nin nasıl işletildiğini, kararların nasıl alındığını ve üyelerin hak ve yükümlülüklerinin nasıl yapılandırıldığını belirleyen en önemli belgedir."}
            </p>

            <h3 className="font-semibold text-gray-900 text-lg mt-6">
              {isEnglish ? 'Why It Matters' : 'Neden Önemlidir'}
            </h3>
            <p>
              {isEnglish
                ? "Without an Operating Agreement, the LLC is governed by the default rules of the state's LLC statute. These default rules may not reflect what the members actually intended. For example, many state default rules provide for equal profit sharing regardless of capital contributions, require unanimous consent for major decisions, and allow members to freely transfer their interests. An Operating Agreement overrides these defaults with rules tailored to the specific business."
                : "Operating Agreement bulunmadığında LLC, eyaletin LLC yasasındaki varsayılan kurallarla yönetilir. Bu varsayılan kurallar, üyelerin gerçek niyetini yansıtmayabilir. Örneğin pek çok eyaletin varsayılan kuralları, sermaye katkılarından bağımsız olarak eşit kar paylaşımı öngörür, önemli kararlar için oy birliği arar ve üyelerin paylarını serbestçe devretmesine izin verir. Operating Agreement, bu varsayılanları işletmeye özgü kurallarla değiştirir."}
            </p>

            <h3 className="font-semibold text-gray-900 text-lg mt-6">
              {isEnglish ? 'Key Provisions to Include' : 'Dahil Edilmesi Gereken Temel Hükümler'}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>{isEnglish
                ? "Member contributions and ownership percentages: Document each member's initial contribution (cash, property, services) and the corresponding ownership interest."
                : "Üye katkıları ve ortaklık payları: Her üyenin başlangıç katkısı (nakit, mal, hizmet) ile buna karşılık gelen ortaklık payı belgelenmelidir."}</li>
              <li>{isEnglish
                ? "Management structure: Specify whether the LLC is member-managed (all members participate in daily operations) or manager-managed (designated managers handle operations while other members remain passive)."
                : "Yönetim yapısı: LLC'nin üye yönetimli (tüm üyeler günlük operasyonlara katılır) veya yönetici yönetimli (belirlenen yöneticiler operasyonları yürütürken diğer üyeler pasif kalır) olduğu açıkça belirtilmelidir."}</li>
              <li>{isEnglish
                ? "Voting rights and procedures: Define which decisions require simple majority, supermajority, or unanimous consent. Establish procedures for meetings, quorum, and proxy voting."
                : "Oy hakları ve prosedürleri: Hangi kararların basit çoğunluk, nitelikli çoğunluk veya oy birliği gerektirdiği tanımlanmalıdır. Toplantı, yeter sayı ve vekaleten oy kullanma prosedürleri belirlenmelidir."}</li>
              <li>{isEnglish
                ? "Profit and loss allocation and distributions: Specify how profits and losses are allocated (which may differ from ownership percentages) and when and how cash distributions are made."
                : "Kar ve zarar dağılımı ile nakit dağıtımları: Kar ve zararların nasıl dağıtılacağı (ortaklık paylarından farklı olabilir) ve nakit dağıtımların ne zaman ve nasıl yapılacağı belirlenmelidir."}</li>
              <li>{isEnglish
                ? "Transfer restrictions and buyout provisions: Address how membership interests can be transferred, rights of first refusal, buy-sell triggers (death, disability, departure), and valuation methods for buyouts."
                : "Devir kısıtlamaları ve çıkış hükümleri: Üyelik paylarının nasıl devredileceği, önalım hakları, alım-satım tetikleyicileri (ölüm, engellilik, ayrılma) ve çıkış değerlemesi yöntemleri düzenlenmelidir."}</li>
              <li>{isEnglish
                ? "Dissolution and winding-up: Specify the events that trigger dissolution and the procedure for winding up business affairs and distributing remaining assets."
                : "Tasfiye ve sonlandırma: Tasfiyeyi tetikleyen olaylar ile iş ilişkilerinin sonlandırılması ve kalan varlıkların dağıtılmasına ilişkin prosedür açıklanmalıdır."}</li>
            </ul>

            <h3 className="font-semibold text-gray-900 text-lg mt-6">
              {isEnglish ? 'Banks Require It' : 'Bankalar İster'}
            </h3>
            <p>
              {isEnglish
                ? "Virtually every US bank requires a copy of the Operating Agreement to open a business account. Even for single-member LLCs, banks want to verify who has authority over the account and how the LLC is governed. An LLC without an Operating Agreement may face significant delays or denials in opening banking relationships."
                : "ABD'deki hemen her banka, iş hesabı açılışında Operating Agreement'ın bir kopyasını ister. Tek üyeli LLC'lerde bile bankalar, hesap üzerinde kimin yetkili olduğunu ve LLC'nin nasıl yönetildiğini doğrulamak ister. Operating Agreement'ı bulunmayan bir LLC, banka ilişkisi kurarken ciddi gecikmeler veya retlerle karşılaşabilir."}
            </p>

            <p>
              {isEnglish
                ? "For related contract templates that your LLC may need, see the "
                : "LLC'nizin ihtiyaç duyabileceği ilgili sözleşme şablonları için "}
              <Link href={`/${lang}/contracts/service-agreement`} className="text-[#C9A227] underline hover:text-[#B8922A]">
                {isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}
              </Link>
              {isEnglish ? ' and ' : ' ve '}
              <Link href={`/${lang}/contracts/nda`} className="text-[#C9A227] underline hover:text-[#B8922A]">
                {isEnglish ? 'NDA' : 'Gizlilik Sözleşmesi'}
              </Link>
              {isEnglish ? ' template pages.' : ' şablon sayfalarına bakınız.'}
            </p>
          </div>
        </section>

        {/* ===== SECTION 7: EIN Application ===== */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'EIN Application Process' : 'EIN Başvuru Süreci'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "The Employer Identification Number (EIN) is a nine-digit number assigned by the IRS to identify business entities for tax purposes. It functions as the business equivalent of a Social Security Number. Every LLC that has employees, files certain tax returns, or opens a business bank account needs an EIN."
                : "EIN (Employer Identification Number), IRS tarafından ticari kuruluşları vergi amaçlı tanımlamak üzere atanan dokuz haneli bir numaradır. İşletmelerin Sosyal Güvenlik Numarası (SSN) muadili olarak işlev görür. Çalışanı olan, belirli vergi beyannameleri sunan veya iş banka hesabı açan her LLC'nin EIN'e ihtiyacı vardır."}
            </p>

            <h3 className="font-semibold text-gray-900 text-lg mt-6">
              {isEnglish ? 'Application Methods (Form SS-4)' : 'Başvuru Yöntemleri (Form SS-4)'}
            </h3>
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-1">{isEnglish ? 'Online (US Persons Only)' : 'Çevrimiçi (Yalnızca ABD Kişileri)'}</h4>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? "Applicants with a valid SSN or ITIN can apply online at IRS.gov. The EIN is issued immediately upon successful completion. This is the fastest method but is unavailable to foreign applicants without an SSN/ITIN."
                    : "Geçerli SSN veya ITIN sahibi başvuru sahipleri IRS.gov üzerinden çevrimiçi başvurabilir. Başarılı tamamlama sonrasında EIN anında verilir. En hızlı yöntem olmakla birlikte SSN/ITIN'i olmayan yabancı başvuru sahipleri bu yöntemi kullanamaz."}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-1">{isEnglish ? 'Fax (Domestic and International)' : 'Faks (Yurtiçi ve Uluslararası)'}</h4>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? "Complete Form SS-4 and fax to the IRS. International applicants fax to (855) 215-1627 or (304) 707-9471. The IRS typically faxes the EIN assignment back within 4-7 business days. This is the preferred method for foreign applicants as it is faster than mail."
                    : "SS-4 formunu doldurup IRS'e fakslayın. Uluslararası başvurular (855) 215-1627 veya (304) 707-9471 numarasına gönderilir. IRS, EIN atamasını genellikle 4-7 iş günü içinde faksla iletir. Posta yönteminden hızlı olması nedeniyle yabancı başvuru sahipleri için tercih edilen yöntemdir."}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-1">{isEnglish ? 'Mail' : 'Posta'}</h4>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? "Mail completed Form SS-4 to the IRS. Processing takes 4-8 weeks. International applicants mail to: Internal Revenue Service, Attn: EIN International Operation, Cincinnati, OH 45999. This is the slowest method and should be used only if fax is unavailable."
                    : "Tamamlanan SS-4 formunu IRS'e postalayın. İşlem 4-8 hafta sürer. Uluslararası başvurular şu adrese gönderilir: Internal Revenue Service, Attn: EIN International Operation, Cincinnati, OH 45999. En yavaş yöntemdir ve yalnızca faks kullanılamıyorsa tercih edilmelidir."}
                </p>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 text-lg mt-6">
              {isEnglish ? 'Common Issues' : 'Sık Karşılaşılan Sorunlar'}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>{isEnglish
                ? "Name mismatch: The LLC name on the SS-4 must exactly match the name on file with the state. Any discrepancy will cause rejection."
                : "İsim uyuşmazlığı: SS-4'teki LLC adı, eyalette kayıtlı isimle tam olarak örtüşmelidir. Herhangi bir tutarsızlık başvurunun reddine neden olur."}</li>
              <li>{isEnglish
                ? "Responsible party: The IRS requires a \"responsible party\" who controls or manages the entity. For single-member LLCs, this is the sole member. The responsible party must have an SSN, ITIN, or foreign identification."
                : "Sorumlu taraf: IRS, kuruluşu kontrol eden veya yöneten bir \"sorumlu taraf\" (responsible party) ister. Tek üyeli LLC'lerde bu, tek üyenin kendisidir. Sorumlu tarafın SSN, ITIN veya yabancı kimlik numarası olmalıdır."}</li>
              <li>{isEnglish
                ? "Phone application discontinued: The IRS no longer processes EIN applications by phone for international applicants. Fax or mail are the only options for those without SSN/ITIN."
                : "Telefonla başvuru sonlandırılmıştır: IRS artık uluslararası başvuru sahipleri için telefonla EIN başvurusu kabul etmemektedir. SSN/ITIN sahibi olmayanlar için faks veya posta tek seçeneklerdir."}</li>
            </ul>
          </div>
        </section>

        {/* ===== SECTION 8: Piercing the Corporate Veil ===== */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Piercing the Corporate Veil' : 'Tüzel Kişilik Perdesinin Kaldırılması'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "\"Piercing the corporate veil\" is a legal doctrine through which courts disregard the LLC's separate legal identity and hold members personally liable for business obligations. While LLC formation creates a presumption of limited liability, that presumption can be overcome when the LLC is not operated as a genuine separate entity."
                : "\"Tüzel kişilik perdesinin kaldırılması\" (piercing the corporate veil), mahkemelerin LLC'nin ayrı tüzel kişiliğini yok sayarak üyeleri işletme yükümlülüklerinden şahsen sorumlu tutmasını sağlayan bir hukuk doktrinidir. LLC kurulumu sınırlı sorumluluk karinesi oluştursa da bu karine, LLC'nin gerçek anlamda ayrı bir kuruluş olarak işletilmediği durumlarda çürütülebilir."}
            </p>

            <p>
              {isEnglish
                ? "Courts consider multiple factors, and no single factor is automatically decisive. However, the following are the most commonly cited grounds:"
                : "Mahkemeler birden fazla faktörü birlikte değerlendirir ve tek bir faktör kendi başına kesin belirleyici değildir. Bununla birlikte en sık başvurulan gerekçeler şunlardır:"}
            </p>
          </div>

          <div className="space-y-4 mt-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'Commingling of Funds' : 'Kişisel ve Ticari Varlıkların Karıştırılması'}
              </h3>
              <p className="text-sm text-red-800">
                {isEnglish
                  ? "Using the LLC's bank account for personal expenses, depositing business income into personal accounts, or failing to maintain separate financial records. This is the most common basis for veil-piercing. Always maintain a dedicated business bank account and never mix personal and business funds."
                  : "LLC'nin banka hesabını kişisel harcamalar için kullanmak, iş gelirlerini kişisel hesaplara yatırmak veya ayrı mali kayıt tutmamak. Perdenin kaldırılması davalarında en yaygın karşılaşılan gerekçedir. Her zaman ayrı bir iş banka hesabı bulundurun ve kişisel ile ticari fonları asla karıştırmayın."}
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'Fraud or Misrepresentation' : 'Hile veya Yanıltıcı Beyan'}
              </h3>
              <p className="text-sm text-red-800">
                {isEnglish
                  ? "Using the LLC to perpetrate fraud, deceive creditors, or evade existing obligations. When the entity form is used as a tool for wrongdoing rather than legitimate business purposes, courts will not allow the LLC structure to shield the wrongdoer."
                  : "LLC'yi dolandırıcılık yapmak, alacaklıları aldatmak veya mevcut yükümlülüklerden kaçmak amacıyla kullanmak. Tüzel kişilik yapısı, meşru ticari amaçlar yerine hukuka aykırı eylemler için bir araç olarak kullanıldığında mahkemeler LLC yapısının haksız fiil faili koruma kalkanı olmasına izin vermez."}
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'Undercapitalization' : 'Yetersiz Sermaye'}
              </h3>
              <p className="text-sm text-red-800">
                {isEnglish
                  ? "Forming or operating an LLC without adequate capital to meet its reasonably anticipated obligations. If the LLC was never funded sufficiently to operate as a genuine business, courts may conclude it was merely a shell intended to shield the owner from liability."
                  : "LLC'yi, makul olarak öngörülebilen yükümlülüklerini karşılayacak yeterli sermaye olmaksızın kurmak veya işletmek. LLC, gerçek bir işletme olarak faaliyet gösterecek düzeyde hiçbir zaman yeterli sermayeyle donatılmamışsa mahkemeler, kuruluşun yalnızca sahibini sorumluluktan korumak için oluşturulmuş bir paravan olduğu sonucuna varabilir."}
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'Failure to Observe Formalities' : 'Formalitelere Uyulmaması'}
              </h3>
              <p className="text-sm text-red-800">
                {isEnglish
                  ? "Not maintaining an Operating Agreement, failing to file required state reports, not holding documented member meetings for significant decisions, or ignoring the entity's separate existence in day-to-day operations. While LLCs have fewer formality requirements than corporations, they are not exempt from all organizational discipline."
                  : "Operating Agreement bulundurmamak, zorunlu eyalet raporlarını sunmamak, önemli kararlar için belgelenmiş üye toplantıları yapmamak veya günlük işlemlerde kuruluşun ayrı varlığını göz ardı etmek. LLC'lerin şirketlere kıyasla daha az formalite yükü olsa da hiçbir kurumsal disiplinden tamamen muaf değildirler."}
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-600 mt-6">
            <p>
              {isEnglish
                ? "Maintaining proper contracts reinforces the LLC's separate identity and reduces veil-piercing risk. Ensure all client engagements, vendor relationships, and confidential exchanges are governed by written agreements executed in the LLC's name. For templates, see our "
                : "Usulüne uygun sözleşmelerin sürdürülmesi, LLC'nin ayrı kimliğini güçlendirir ve tüzel kişilik perdesinin kaldırılması riskini azaltır. Tüm müşteri ilişkilerinin, tedarikçi bağlantılarının ve gizli bilgi paylaşımlarının LLC adına imzalanmış yazılı sözleşmelerle yönetilmesini sağlayın. Şablonlar için "}
              <Link href={`/${lang}/amerika/abdde-is-yapanlar-icin-sozlesmeler`} className="text-[#C9A227] underline hover:text-[#B8922A]">
                {isEnglish ? 'Contracts for US Business' : "ABD'de İş Yapanlar İçin Sözleşmeler"}
              </Link>
              {isEnglish ? ' page.' : ' sayfamıza bakınız.'}
            </p>
          </div>
        </section>

        {/* ===== SECTION 9: Multi-State Operations ===== */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Multi-State Operations and Foreign LLC Registration' : 'Çok Eyaletli Faaliyet ve Yabancı LLC Tescili'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "An LLC formed in one state is a \"domestic\" LLC in that state. If the same LLC conducts business in another state, it must register as a \"foreign LLC\" in that second state. \"Foreign\" in this context means out-of-state, not international."
                : "Bir eyalette kurulan LLC, o eyalette \"yerli\" (domestic) LLC sayılır. Aynı LLC başka bir eyalette de ticari faaliyet yürütüyorsa, o ikinci eyalette \"yabancı LLC\" (foreign LLC) olarak tescil yaptırması gerekir. Buradaki \"yabancı\" ifadesi uluslararası anlamda değil, eyalet dışı anlamında kullanılmaktadır."}
            </p>

            <h3 className="font-semibold text-gray-900 text-lg mt-6">
              {isEnglish ? 'When Is Foreign Registration Required?' : 'Yabancı LLC Tescili Ne Zaman Gerekir?'}
            </h3>
            <p>
              {isEnglish
                ? "Each state defines \"doing business\" or \"transacting business\" differently, but common triggers include: having a physical office or employees in the state, holding real estate, maintaining inventory, and conducting repeated or sustained business transactions with state residents. Merely having a bank account in a state or occasional sales to state residents generally does not trigger registration requirements."
                : "Her eyalet \"iş yapmak\" veya \"ticari işlem yürütmek\" kavramını farklı tanımlar; ancak yaygın tetikleyiciler şunlardır: eyalette fiziksel ofis veya çalışan bulundurmak, gayrimenkul sahibi olmak, envanter tutmak ve eyalet sakinleriyle tekrarlanan veya sürekli ticari işlemler gerçekleştirmek. Bir eyalette yalnızca banka hesabına sahip olmak veya eyalet sakinlerine ara sıra satış yapmak genellikle tescil zorunluluğu doğurmaz."}
            </p>

            <h3 className="font-semibold text-gray-900 text-lg mt-6">
              {isEnglish ? 'Nexus and Tax Implications' : 'Nexus ve Vergisel Etkileri'}
            </h3>
            <p>
              {isEnglish
                ? "\"Nexus\" refers to the level of connection between a business and a state that triggers the state's jurisdiction to impose taxes. Physical nexus (offices, employees, inventory) is the traditional standard. Economic nexus, established by many states following the 2018 Supreme Court decision in South Dakota v. Wayfair, can trigger sales tax collection obligations based on revenue or transaction thresholds even without physical presence. Understanding nexus is critical because operating in a state without proper registration and tax compliance can result in penalties, back taxes, and loss of the right to bring legal claims in that state's courts."
                : "\"Nexus\" (vergisel bağlantı noktası), bir işletme ile eyalet arasında o eyaletin vergi yetki alanını harekete geçiren bağlantı düzeyini ifade eder. Fiziksel nexus (ofis, çalışan, envanter) geleneksel standarttır. 2018'deki South Dakota v. Wayfair Yüksek Mahkeme kararının ardından birçok eyaletin benimsediği ekonomik nexus ise fiziksel varlık olmaksızın gelir veya işlem eşiklerine dayanarak satış vergisi tahsilat yükümlülüğü doğurabilir. Nexus kavramını anlamak kritik önem taşır; çünkü uygun tescil ve vergi uyumu olmadan bir eyalette faaliyet göstermek para cezalarına, geriye dönük vergi taleplerine ve o eyaletin mahkemelerinde dava açma hakkının kaybedilmesine yol açabilir."}
            </p>

            <h3 className="font-semibold text-gray-900 text-lg mt-6">
              {isEnglish ? 'Costs of Foreign Registration' : 'Yabancı LLC Tescili Maliyetleri'}
            </h3>
            <p>
              {isEnglish
                ? "Foreign LLC registration typically costs $50-$500 per state for the initial filing, plus ongoing annual report fees and a registered agent in each state. These costs add up and are a primary reason why forming in your home state (or the state where you primarily operate) is often the most cost-effective approach for businesses with a clear geographic focus."
                : "Yabancı LLC tescili, ilk dosyalama için eyalet başına genellikle 50-500 $ arasında maliyet gerektirir; buna her eyaletteki devam eden yıllık rapor harçları ve registered agent ücreti de eklenir. Bu maliyetler birikir ve belirgin bir coğrafi odağı olan işletmeler için kendi eyaletinde (veya ağırlıklı faaliyet gösterilen eyalette) kurulumun genellikle en maliyet etkin yaklaşım olmasının temel nedenini oluşturur."}
            </p>
          </div>
        </section>

        {/* ===== SECTION 10: Common Misconceptions ===== */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Common Misconceptions' : 'Sık Karşılaşılan Yanılgılar'}
          </h2>

          <div className="space-y-4">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"Having an LLC gives me a visa"' : '"LLC kurmak bana vize sağlar"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "LLC formation has zero connection to immigration. You cannot sponsor yourself for a work visa through your own LLC without meeting specific visa requirements independently (substantial investment for E-2, extraordinary ability for O-1, etc.). No legitimate immigration pathway is created by simply forming a business entity."
                  : "LLC kurulumunun göçmenlik hukukuyla hiçbir bağlantısı yoktur. Belirli vize şartlarını bağımsız olarak karşılamadan (E-2 için esaslı yatırım, O-1 için olağanüstü yetenek vb.) kendi LLC'niz üzerinden kendinize vize sponsorluğu yapamazsınız. Salt bir ticari kuruluş oluşturmak hiçbir meşru göçmenlik yolu açmaz."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"Delaware is always the best choice"' : '"Delaware her zaman en iyi seçimdir"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Delaware makes sense for certain situations - VC-backed startups, complex equity structures, multi-state operations, or businesses that anticipate litigation. However, for a solo freelancer or small e-commerce operation, Delaware's $300 annual franchise tax and the potential need for foreign registration in your actual operating state may create unnecessary costs. Forming in your home state or choosing a low-cost state like Wyoming or New Mexico is often more practical."
                  : "Delaware, risk sermayesi destekli girişimler, karmaşık ortaklık yapıları, çok eyaletli operasyonlar veya dava süreçleri öngören işletmeler gibi belirli senaryolarda mantıklıdır. Ancak tek başına çalışan bir serbest meslek erbabı veya küçük ölçekli bir e-ticaret işletmesi için Delaware'in 300 $ yıllık franchise vergisi ve fiili faaliyet eyaletinde yabancı LLC tescili gerekliliği gereksiz maliyetler yaratabilir. Kendi eyaletinizde kurulum veya Wyoming ya da New Mexico gibi düşük maliyetli bir eyalet seçimi genellikle daha pratiktir."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"I can avoid all taxes with a US LLC"' : '"ABD LLC\'siyle tüm vergilerden kurtulabilirim"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "US LLCs have tax obligations. The specifics depend on your residency, where you operate, whether you have US-source income, and your home country's tax treaties. A non-resident alien owning a US LLC with no US-source income may have limited US federal tax liability, but state taxes, filing obligations, and home-country taxes still apply. For details, see "
                  : "ABD LLC'lerinin vergi yükümlülükleri vardır. Detaylar ikametgahınıza, faaliyet gösterdiğiniz yere, ABD kaynaklı gelirinizin bulunup bulunmadığına ve ülkenizin vergi anlaşmalarına göre şekillenir. ABD kaynaklı geliri olmayan mukim olmayan bir yabancının sahip olduğu LLC'nin federal vergi yükümlülüğü sınırlı olabilir; ancak eyalet vergileri, beyanname verme zorunlulukları ve kendi ülkesindeki vergiler yine geçerlidir. Detaylar için "}
                <Link href={`/${lang}/amerika/irs-vergi-gercekleri`} className="text-[#C9A227] underline hover:text-[#B8922A]">
                  {isEnglish ? 'IRS Tax Realities' : 'IRS Vergi Gerçekleri'}
                </Link>
                {isEnglish ? '.' : ' sayfasına bakınız.'}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"An LLC makes my business legitimate / a real company"' : '"LLC kurmak işletmemi meşrulaştırır / gerçek bir şirket yapar"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "An LLC is a legal structure, not a measure of legitimacy. A sole proprietorship conducting lawful business is equally legitimate. What an LLC provides is liability protection and a formal organizational framework - not inherent credibility. Credibility comes from the quality of your work, compliance with applicable laws, and professional conduct."
                  : "LLC bir hukuki yapıdır, meşruiyet ölçütü değildir. Yasal faaliyet yürüten bir şahıs işletmesi aynı derecede meşrudur. LLC'nin sağladığı, sorumluluk koruması ve resmi bir örgütsel çerçevedir; doğuştan gelen bir itibar değildir. İtibar, işinizin kalitesinden, ilgili mevzuata uyumunuzdan ve profesyonel tutumunuzdan kaynaklanır."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"Once I form the LLC, I\'m done"' : '"LLC\'yi kurduğumda her şey tamamlanmıştır"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Formation is just the beginning. Maintaining the LLC requires ongoing compliance: annual reports, franchise taxes, registered agent renewals, federal tax filings, BOI reports, and keeping the Operating Agreement current. Neglecting post-formation obligations can result in administrative dissolution, loss of good standing, and vulnerability to veil-piercing claims."
                  : "Kuruluş yalnızca başlangıçtır. LLC'nin sürdürülmesi, devam eden uyum yükümlülüklerini gerektirir: yıllık raporlar, franchise vergisi, registered agent yenilemeleri, federal vergi beyannameleri, BOI raporları ve Operating Agreement'ın güncel tutulması. Kuruluş sonrası yükümlülüklerin ihmal edilmesi idari tasfiye, good standing kaybı ve tüzel kişilik perdesinin kaldırılması taleplerine karşı savunmasızlık ile sonuçlanabilir."}
              </p>
            </div>
          </div>
        </section>

        {/* ===== SECTION 11: Related Templates ===== */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Related Contracts and Templates' : 'İlgili Sözleşmeler ve Şablonlar'}
          </h2>

          <div className="prose max-w-none text-gray-600 mb-4">
            <p>
              {isEnglish
                ? "Once your LLC is formed, you will need contracts for business operations. The following templates are commonly used by US-based LLCs, including Operating Agreement frameworks. For a complete package, see the Business Starter Kit below."
                : "LLC'niz kurulduktan sonra ticari faaliyetleriniz için sözleşmelere ihtiyaç duyacaksınız. Aşağıdaki şablonlar, Operating Agreement çerçeveleri dahil olmak üzere ABD merkezli LLC'ler tarafından yaygın biçimde kullanılmaktadır. Tüm şablonları içeren paket için aşağıdaki Business Starter Kit'e bakınız."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href={`/${lang}/contracts/service-agreement`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts/independent-contractor`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts/nda`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/amerika/legal-kitler/abd-business-starter-legal-kit`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'US Business Starter Kit' : 'ABD Business Starter Kit'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/checklists/llc-kontrol-listesi`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'LLC Formation Checklist' : 'LLC Kuruluş Kontrol Listesi'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/amerika/abdde-is-yapanlar-icin-sozlesmeler`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Contracts for US Business' : "ABD'de İş Yapanlar İçin Sözleşmeler"}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts/freelance-agreement`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Freelance Agreement' : 'Freelance Sözleşmesi'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
          </div>
        </section>

        {/* ===== SECTION 12: FAQ ===== */}
        <FAQAccordion
          items={faqItems}
          title={isEnglish ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}
        />

        {/* CTA 3 - End of page */}
        <KitCallout lang={lang} variant="full" />

        {/* Sources */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Sources' : 'Kaynaklar'}
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {registryEntry?.sources.map((source, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-gray-400">•</span>
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A227] underline">
                    {source.title}
                  </a>
                ) : (
                  <span>{source.title}{source.citation && ` (${source.citation})`}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Last Verified */}
        <div className="border-t border-gray-200 pt-6 mb-8">
          <p className="text-sm text-gray-500">
            {isEnglish ? 'Last verified:' : 'Son doğrulama:'} {registryEntry?.lastVerified || '2026-01-25'}
          </p>
        </div>

        {/* Related Pages */}
        <section className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {isEnglish ? 'Related Pages' : 'İlgili Sayfalar'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedPages.map(page => (
              <Link
                key={page.slug}
                href={`/${lang}/amerika/${page.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <span className="font-medium text-gray-800">{page.title}</span>
                <span className="text-[#C9A227]">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Cite This Entry */}
        <CiteThisEntry
          lang={lang}
          title={pageTitle}
          url={pageUrl}
          dateModified={PAGE_META.dateModified}
          version={PAGE_META.version}
          citationKey={PAGE_META.citationKey}
          contentType="jurisdictional-guide"
          className="mb-8"
        />

        {/* Disclaimer */}
        <div className="text-sm text-gray-500">
          <p>
            {isEnglish
              ? 'This content is for general informational purposes only and does not constitute legal, tax, or immigration advice. Consult a qualified attorney or CPA for guidance specific to your situation.'
              : 'Bu içerik yalnızca genel bilgilendirme amaçlıdır ve hukuki, vergisel veya göçmenlik danışmanlığı teşkil etmez. Durumunuza özgü yönlendirme için yetkili bir avukata veya mali müşavire başvurunuz.'}
          </p>
        </div>
      </main>
    </div>
  )
}
