import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import TrustStrip from '@/components/TrustStrip'
import FAQAccordion from '@/components/FAQAccordion'
import { getRegistryEntry } from '@/lib/amerika-content-registry'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const PAGE_META = {
  slug: 'irs-vergi-gercekleri',
  datePublished: '2025-06-01',
  dateModified: '2026-01-25',
  version: '1.0',
  citationKey: 'ecl-gde-00005',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const url = `${SITE_URL}/${lang}/amerika/${PAGE_META.slug}`
  return {
    title: isEnglish
      ? "IRS Tax Realities - US Tax Basics for Non-Residents | EchoLegal"
      : "IRS Vergi Gerçekleri – ABD'de Mukim Olmayanlar İçin Temel Vergi Bilgileri | EchoLegal",
    description: isEnglish
      ? "Understanding US tax obligations for non-resident aliens. Substantial presence test, FATCA, FBAR, FDAP vs ECI, US-Turkey tax treaty (TIAS 10205), W-8 forms, state taxes, estimated payments, and common misconceptions."
      : "Mukim olmayan yabancılar için ABD vergi yükümlülüklerine kapsamlı bakış. Substantial presence test, FATCA, FBAR, FDAP ve ECI ayrımı, ABD-Türkiye vergi anlaşması (TIAS 10205), W-8 formları, eyalet vergileri, tahmini vergi ödemeleri ve sık karşılaşılan yanılgılar.",
    other: {
      'citation_title': isEnglish ? 'IRS Tax Realities' : 'IRS Vergi Gerçekleri',
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

export default async function IRSVergiPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const registryEntry = getRegistryEntry('irs-vergi-gercekleri')

  const faqItems = [
    {
      question: isEnglish ? "Do I have to pay US taxes if I own a US LLC?" : "ABD'de bir LLC'm varsa ABD'ye vergi ödemem gerekir mi?",
      answer: isEnglish
        ? "It depends on your tax residency status and income source. A single-member LLC owned by a non-resident alien with no US-source income generally has minimal US federal tax obligations, but there are still filing requirements (such as Form 5472) and state-level taxes to consider."
        : "Bu, vergi mukimlik durumunuza ve gelir kaynağınıza göre değişir. ABD kaynaklı geliri bulunmayan ve mukim olmayan bir yabancının sahip olduğu tek üyeli LLC'nin federal düzeyde vergi yükümlülüğü genellikle sınırlıdır. Bununla birlikte, beyanname verme zorunlulukları (Form 5472 gibi) ve eyalet düzeyindeki vergiler ayrıca değerlendirilmelidir."
    },
    {
      question: isEnglish ? "What is the substantial presence test?" : "Substantial presence test nedir?",
      answer: isEnglish
        ? "A formula to determine US tax residency: you're a resident if you're in the US at least 31 days in the current year AND 183 days over 3 years (current year days + 1/3 of prior year days + 1/6 of second prior year days). Certain visa holders are exempt."
        : "ABD vergi mukimliğini belirlemek için kullanılan bir formüldür. Cari yılda en az 31 gün ABD'de bulunmanız ve üç yıllık ağırlıklı hesaplamada toplam 183 güne ulaşmanız hâlinde mukim sayılırsınız. Formül şu şekilde uygulanır: cari yıl günleri + bir önceki yılın günlerinin üçte biri + iki önceki yılın günlerinin altıda biri. Belirli vize kategorileri bu testten muaftır."
    },
    {
      question: isEnglish ? "What is FATCA?" : "FATCA nedir?",
      answer: isEnglish
        ? "Foreign Account Tax Compliance Act requires foreign financial institutions to report accounts held by US persons to the IRS. If you're a US tax resident or citizen, your foreign banks report your accounts to the IRS."
        : "FATCA (Foreign Account Tax Compliance Act), yabancı finansal kuruluşların ABD vatandaşları ve mukimleri adına tutulan hesapları IRS'e bildirmesini zorunlu kılan federal bir düzenlemedir. ABD vergi mukimi veya vatandaşıysanız, yurt dışındaki bankalarınız hesap bilgilerinizi doğrudan IRS'e iletir."
    },
    {
      question: isEnglish ? "What is FBAR?" : "FBAR nedir?",
      answer: isEnglish
        ? "Report of Foreign Bank and Financial Accounts. US persons with foreign financial accounts exceeding $10,000 aggregate value at any time during the year must file FinCEN Form 114. Penalties for non-filing are severe."
        : "FBAR (Report of Foreign Bank and Financial Accounts), yurt dışındaki finansal hesapların bildirim yükümlülüğüdür. Yıl içinde herhangi bir anda toplam bakiyesi 10.000 doları aşan yabancı hesaplara sahip ABD kişileri, FinCEN Form 114'ü elektronik olarak beyan etmek zorundadır. Bu yükümlülüğe uyulmaması hâlinde ağır para cezaları uygulanır."
    },
    {
      question: isEnglish ? "Is there a US-Turkey tax treaty?" : "ABD-Türkiye vergi anlaşması var mı?",
      answer: isEnglish
        ? "Yes. The US-Turkey tax treaty (TIAS 10205) provides rules for avoiding double taxation and reduced withholding rates on certain income types. Treaty benefits require proper claiming via Form W-8BEN or W-8BEN-E and, where applicable, Form 8833."
        : "Evet. ABD-Türkiye vergi anlaşması (TIAS 10205), çifte vergilendirmenin önlenmesine ilişkin kurallar ile belirli gelir türlerinde indirimli stopaj oranları öngörür. Anlaşma kapsamındaki haklardan yararlanabilmek için W-8BEN veya W-8BEN-E formu ve gerekli hâllerde Form 8833 ile usulüne uygun başvuru yapılması şarttır."
    },
    {
      question: isEnglish ? "Do I need an ITIN and how do I apply?" : "ITIN'e ihtiyacım var mı ve nasıl başvururum?",
      answer: isEnglish
        ? "An Individual Taxpayer Identification Number is for those who need to file US taxes but aren't eligible for an SSN. Non-resident aliens with US tax filing obligations typically need an ITIN. Apply by submitting Form W-7 with a complete tax return and identity documentation. Applications can be mailed to the IRS or submitted in person at an IRS Taxpayer Assistance Center or through a Certifying Acceptance Agent (CAA)."
        : "ITIN (Individual Taxpayer Identification Number), ABD'de vergi beyannamesi vermesi gereken ancak SSN almaya hak kazanamayan kişiler için düzenlenen vergi kimlik numarasıdır. ABD'de beyanname yükümlülüğü bulunan mukim olmayan yabancıların genellikle ITIN edinmesi gerekir. Başvuru, Form W-7'nin eksiksiz doldurulmuş vergi beyannamesi ve kimlik belgeleriyle birlikte IRS'e gönderilmesiyle yapılır. Başvuru posta yoluyla, IRS Taxpayer Assistance Center'da bizzat veya yetkili bir Certifying Acceptance Agent (CAA) aracılığıyla tamamlanabilir."
    },
    {
      question: isEnglish ? "Do I need to make quarterly estimated tax payments?" : "Üç aylık tahmini vergi ödemesi yapmam gerekir mi?",
      answer: isEnglish
        ? "If you expect to owe $1,000 or more in federal tax for the year (after credits and withholding), you generally must make quarterly estimated payments using Form 1040-ES. Non-resident aliens use Form 1040-ES (NR). Failure to make timely payments results in underpayment penalties under IRC Section 6654."
        : "Yıl sonunda (mahsuplar ve stopajlar düşüldükten sonra) 1.000 dolar veya üzeri federal vergi borcu doğmasını bekliyorsanız, Form 1040-ES ile üç aylık tahmini vergi ödemesi yapmanız gerekir. Mukim olmayan yabancılar Form 1040-ES (NR) kullanır. Ödemelerin zamanında yapılmaması hâlinde IRC Section 6654 kapsamında eksik ödeme cezası uygulanır."
    },
    {
      question: isEnglish ? "Do state taxes apply to foreign LLC owners?" : "Yabancı LLC sahipleri eyalet vergisine tabi midir?",
      answer: isEnglish
        ? "Yes, potentially. If your LLC is formed in or does business in a state with income tax, you may owe state taxes regardless of your foreign residence. Some states also impose franchise taxes or gross receipts taxes that apply irrespective of whether there is net income."
        : "Evet, potansiyel olarak tabi olabilirsiniz. LLC'niz gelir vergisi uygulayan bir eyalette kurulmuşsa veya orada faaliyet gösteriyorsa, yurt dışında ikamet etmenize rağmen eyalet vergisi yükümlülüğünüz doğabilir. Bazı eyaletler ayrıca net kâr olup olmadığına bakılmaksızın franchise vergisi veya brüt hasılat vergisi tahsil eder."
    },
    {
      question: isEnglish ? "When should I file a W-8BEN vs a W-9?" : "W-8BEN mi yoksa W-9 mu doldurmam gerekir?",
      answer: isEnglish
        ? "W-9 is for US persons (citizens, residents, and US entities). W-8BEN is for non-resident alien individuals claiming foreign status or treaty benefits. W-8BEN-E is the entity equivalent for foreign organizations. If you are a non-resident alien or your entity is foreign, you file a W-8 form, not W-9."
        : "W-9, ABD vatandaşları, mukimleri ve ABD tüzel kişileri için kullanılır. W-8BEN, yabancı statüsünü veya vergi anlaşması avantajlarını beyan eden mukim olmayan yabancı gerçek kişiler içindir. W-8BEN-E ise yabancı tüzel kişiler için hazırlanmış eşdeğer formdur. Mukim olmayan bir yabancıysanız veya kuruluşunuz yabancı statüdeyse, W-9 değil W-8 formu doldurmanız gerekir."
    },
    {
      question: isEnglish ? "What is Form 5472 and do I have to file it?" : "Form 5472 nedir ve doldurmam zorunlu mu?",
      answer: isEnglish
        ? "Form 5472 is an information return required for any US LLC or corporation that is at least 25% foreign-owned and has reportable transactions. Single-member LLCs owned by a foreign person must file Form 5472 attached to a pro forma Form 1120. The penalty for failure to file is $25,000 per form per year."
        : "Form 5472, en az %25 oranında yabancı ortağı bulunan ve bildirimi gereken işlemleri olan ABD LLC veya şirketlerinin doldurmak zorunda olduğu bir bilgi beyannamesidir. Yabancı bir kişinin sahip olduğu tek üyeli LLC'ler, Form 5472'yi proforma Form 1120 ekinde sunmalıdır. Bu beyannamenin zamanında verilmemesi hâlinde her form ve her yıl için 25.000 dolar ceza uygulanır."
    }
  ]

  const relatedPages = [
    { slug: 'abdde-llc-kurmak', title: isEnglish ? 'Forming an LLC in the US' : "ABD'de LLC Kurmak" },
    { slug: 'abdde-banka-hesabi', title: isEnglish ? 'US Bank Account' : "ABD'de Banka Hesabı" },
    { slug: 'llc-mi-corp-mu', title: isEnglish ? 'LLC vs Corporation' : 'LLC mi Corp mu?' },
  ]

  const pageUrl = `${SITE_URL}/${lang}/amerika/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'IRS Tax Realities' : 'IRS Vergi Gerçekleri'

  const articleSchema = generateArticleSchema({
    title: pageTitle,
    description: isEnglish
      ? 'Understanding US tax obligations for non-resident aliens.'
      : 'Mukim olmayan yabancılar için ABD vergi yükümlülüklerine kapsamlı bakış.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['irs', 'tax', 'fatca', 'fbar', 'us-turkey-treaty', 'w-8'],
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
            { label: isEnglish ? 'IRS Tax Realities' : 'IRS Vergi Gerçekleri' }
          ]}
        />

        <TrustStrip lang={lang} />

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          {isEnglish ? 'Jurisdiction: US Federal Tax Law + US-Turkey Treaty' : 'Kapsam: ABD Federal Vergi Hukuku + ABD-Türkiye Vergi Anlaşması'}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {isEnglish ? "IRS Tax Realities" : "IRS Vergi Gerçekleri"}
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
              ? "US tax residency is determined by substantial presence test or green card test."
              : "ABD vergi mukimliği, substantial presence test veya yeşil kart testi ile belirlenir."}</li>
            <li>• {isEnglish
              ? "Owning a US LLC does not automatically create US tax obligations for non-residents."
              : "ABD'de LLC sahibi olmak, mukim olmayanlar için tek başına vergi yükümlülüğü doğurmaz."}</li>
            <li>• {isEnglish
              ? "US-source income is categorized as FDAP or ECI, each with different tax treatment."
              : "ABD kaynaklı gelir, FDAP veya ECI olarak sınıflandırılır; her birinin vergi uygulaması farklıdır."}</li>
            <li>• {isEnglish
              ? "FATCA and FBAR have separate reporting requirements with severe penalties."
              : "FATCA ve FBAR birbirinden ayrı bildirim yükümlülükleri içerir; ihlâl hâlinde ağır yaptırımlar uygulanır."}</li>
            <li>• {isEnglish
              ? "US-Turkey tax treaty (TIAS 10205) provides double taxation relief and reduced withholding rates."
              : "ABD-Türkiye vergi anlaşması (TIAS 10205) çifte vergilendirmeyi hafifletir ve indirimli stopaj oranları sağlar."}</li>
            <li>• {isEnglish
              ? "State taxes, franchise taxes, and filing obligations (Form 5472) apply even to foreign-owned LLCs."
              : "Eyalet vergileri, franchise vergileri ve beyanname yükümlülükleri (Form 5472) yabancı sahipli LLC'ler için de geçerlidir."}</li>
            <li>• {isEnglish
              ? "Tax planning requires professional advice - this is general information only."
              : "Vergi planlaması profesyonel destek gerektirir; buradaki bilgiler yalnızca genel niteliktedir."}</li>
          </ul>
        </section>

        {/* Warning */}
        <section className="mb-12">
          <div className="bg-amber-50 border-l-4 border-[#C9A227] p-6 rounded-r-lg">
            <h3 className="font-bold text-amber-900 mb-2">
              {isEnglish ? 'Important Notice' : 'Önemli Uyarı'}
            </h3>
            <p className="text-sm text-amber-800">
              {isEnglish
                ? 'Tax law is complex and highly dependent on individual circumstances. This page provides general educational information only. For tax planning, filing, or specific questions, consult a qualified tax professional (CPA, tax attorney, or enrolled agent).'
                : 'Vergi hukuku karmaşık bir alandır ve sonuçları kişinin bireysel koşullarına göre büyük farklılık gösterir. Bu sayfa yalnızca genel bilgilendirme amacı taşır. Vergi planlaması, beyanname hazırlığı veya somut sorularınız için mutlaka yetkili bir vergi uzmanına (CPA, vergi avukatı veya enrolled agent) başvurun.'}
            </p>
          </div>
        </section>

        {/* Tax Residency */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Determining US Tax Residency' : 'ABD Vergi Mukimliğinin Tespiti'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4 mb-6">
            <p>
              {isEnglish
                ? "For any non-US person with US connections, the threshold question is whether they qualify as a US tax resident. Tax residency determines which income is subject to US taxation and what filing obligations apply. Two primary tests govern this determination: the Green Card Test and the Substantial Presence Test, both codified under IRC Section 7701(b)."
                : "ABD ile bağlantısı olan her yabancı kişi için temel soru, ABD vergi mukimi sayılıp sayılmadığıdır. Vergi mukimliği, hangi gelirin ABD vergilendirmesine tabi olduğunu ve hangi beyanname yükümlülüklerinin geçerli olduğunu belirler. Bu tespiti iki temel test yönetir: Yeşil Kart Testi ve Substantial Presence Testi. Her ikisi de IRC Section 7701(b) kapsamında düzenlenmiştir."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Green Card Test' : 'Yeşil Kart Testi'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "You are a US tax resident if you hold lawful permanent resident status (green card) at any point during the calendar year. This status remains in effect until formally revoked, or until an administrative or judicial determination establishes that it has been abandoned."
                  : "Takvim yılı içinde herhangi bir anda yasal daimi oturma iznine (yeşil kart) sahipseniz ABD vergi mukimi sayılırsınız. Bu statü, resmi olarak iptal edilene kadar geçerliliğini korur. İdari veya yargısal bir kararla terk edilmiş sayılması da statüyü sona erdirir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Substantial Presence Test' : 'Substantial Presence Testi'}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {isEnglish
                  ? "You are a US tax resident if you satisfy both of the following conditions:"
                  : "Aşağıdaki her iki koşulu birlikte sağlıyorsanız ABD vergi mukimi kabul edilirsiniz:"}
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• {isEnglish ? "Present in the US at least 31 days in the current year" : "Cari yılda en az 31 gün ABD'de fiziksel olarak bulunmuş olmak"}</li>
                <li>• {isEnglish
                  ? "The weighted three-year total reaches 183 days or more. Formula: current year days + 1/3 of prior year days + 1/6 of the year before that"
                  : "Üç yıllık ağırlıklı toplamın 183 güne ulaşması veya aşması. Formül: cari yıl günleri + bir önceki yılın günlerinin 1/3'ü + iki önceki yılın günlerinin 1/6'sı"}</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Exempt Individuals' : 'Muaf Tutulan Kişiler'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Certain categories of individuals are exempt from the day count. These include F/J/M/Q visa holders in student or trainee status (subject to time limits), foreign government officials, and teachers or trainees under J visa (for the first two years). Professional athletes present solely for charitable events are also excluded."
                  : "Bazı kişi kategorileri gün hesabından muaf tutulur. Bunlar arasında öğrenci veya stajyer statüsündeki F/J/M/Q vize sahipleri (belirli süre sınırlarına tabi), yabancı devlet görevlileri ve J vizesiyle bulunan öğretmenler ile stajyerler (ilk iki yıl) yer alır. Yalnızca hayır amaçlı etkinliklere katılan profesyonel sporcular da kapsam dışındadır."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Closer Connection Exception' : 'Daha Yakın Bağlantı İstisnası'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Meeting the substantial presence test does not automatically establish tax residency. You may retain non-resident alien status if three conditions are met: you were present in the US fewer than 183 days during the current year, you maintain a tax home in a foreign country, and you have a closer connection to that country than to the US. To claim this exception, you must file Form 8840 (Closer Connection Exception Statement)."
                  : "Substantial presence testini karşılamak, vergi mukimliğini otomatik olarak kesinleştirmez. Üç koşulun birlikte sağlanması hâlinde mukim olmayan yabancı statüsünü koruyabilirsiniz: cari yılda ABD'de 183 günden az bulunmuş olmak, yabancı bir ülkede vergi ikametgâhınızı sürdürmek ve o ülkeyle ABD'ye kıyasla daha güçlü bir bağ kanıtlayabilmek. Bu istisnadan yararlanmak için Form 8840 (Closer Connection Exception Statement) beyanını sunmanız gerekir."}
              </p>
            </div>
          </div>
        </section>

        {/* LLC Taxation */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'LLC Taxation Basics' : 'LLC Vergilendirmesinin Esasları'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "By default, LLCs are 'pass-through' entities for federal tax purposes. The LLC itself does not pay federal income tax. Instead, income and losses pass through to the owners' personal returns. The IRS classifies a single-member LLC as a 'disregarded entity' and a multi-member LLC as a partnership. Either type may elect corporate taxation by filing Form 8832."
                : "LLC'ler federal vergi hukuku açısından varsayılan olarak \"geçişli\" (pass-through) kuruluşlardır. LLC tüzel kişiliği federal gelir vergisi ödemez. Gelir ve zararlar doğrudan sahiplerin kişisel beyannamelerine yansır. IRS, tek üyeli LLC'yi \"yok sayılan kuruluş\" (disregarded entity), çok üyeli LLC'yi ise ortaklık (partnership) olarak sınıflandırır. Her iki tür de Form 8832 aracılığıyla kurumsal vergilendirme seçimi yapabilir."}
            </p>
            <p>
              {isEnglish
                ? "A single-member LLC owned by a non-resident alien with no US-source income (FDAP or ECI) has minimal federal tax obligations. However, state taxes, FBAR reporting, and other requirements may still apply. Form 5472 must be filed regardless of whether any tax is owed."
                : "ABD kaynaklı geliri (FDAP veya ECI) bulunmayan, mukim olmayan bir yabancıya ait tek üyeli LLC'nin federal vergi yükümlülüğü oldukça sınırlıdır. Bununla birlikte eyalet vergileri, FBAR bildirimi ve diğer beyanname zorunlulukları geçerli olabilir. Vergi borcu doğmasa dahi Form 5472 beyannamesi verilmelidir."}
            </p>
            <p className="text-sm">
              {isEnglish
                ? "For a detailed comparison of LLC vs Corporation structures, see "
                : "LLC ve şirket (Corporation) yapılarının ayrıntılı karşılaştırması için "}
              <Link href={`/${lang}/amerika/llc-mi-corp-mu`} className="text-[#C9A227] underline hover:text-[#b08d1e]">
                {isEnglish ? "LLC vs Corporation" : "LLC mi Corp mu?"}
              </Link>
              {isEnglish ? "." : " sayfasına bakınız."}
            </p>
          </div>
        </section>

        {/* US-Source Income Types: FDAP vs ECI */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'US-Source Income Types: FDAP vs ECI' : 'ABD Kaynaklı Gelir Türleri: FDAP ve ECI'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4 mb-6">
            <p>
              {isEnglish
                ? "The US taxes non-resident aliens on their US-source income, which falls into two fundamental categories. The classification determines the applicable tax rate, available deductions, and filing requirements."
                : "ABD, mukim olmayan yabancıları ABD kaynaklı gelirleri üzerinden vergilendirir. Bu gelirler iki temel kategoriye ayrılır. Sınıflandırma, uygulanacak vergi oranını, kullanılabilecek indirimleri ve beyanname yükümlülüklerini belirler."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'FDAP Income (Fixed, Determinable, Annual, Periodical)' : 'FDAP Geliri (Fixed, Determinable, Annual, Periodical)'}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {isEnglish
                  ? "FDAP income is passive-type income from US sources. It is subject to a flat 30% withholding tax (or a lower rate under an applicable treaty), and no deductions are allowed. The payer withholds tax at the source. Common examples include:"
                  : "FDAP geliri, ABD kaynaklarından elde edilen pasif nitelikli gelirdir. Sabit %30 stopaj oranına (veya geçerli anlaşma kapsamında daha düşük orana) tabi olup herhangi bir indirim uygulanmaz. Vergiyi ödemeyi yapan taraf kaynakta keser. Başlıca örnekler şunlardır:"}
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• {isEnglish ? "Interest income (with exceptions for portfolio interest)" : "Faiz geliri (portföy faizi istisnaları saklıdır)"}</li>
                <li>• {isEnglish ? "Dividends" : "Temettü (kâr payı) gelirleri"}</li>
                <li>• {isEnglish ? "Royalties (software licensing fees, intellectual property)" : "Telif hakları (yazılım lisans ücretleri, fikri mülkiyet gelirleri)"}</li>
                <li>• {isEnglish ? "Rents from US real property" : "ABD'deki gayrimenkullerden elde edilen kira gelirleri"}</li>
                <li>• {isEnglish ? "Certain service payments where no ECI election is made" : "ECI seçimi yapılmamış belirli hizmet ödemeleri"}</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                {isEnglish
                  ? "For Turkish entrepreneurs: if your US LLC receives royalty payments for software you developed, or if a US company pays you licensing fees, this income is typically classified as FDAP and subject to 30% withholding unless reduced by the US-Turkey tax treaty."
                  : "Türk girişimciler için örnek: ABD LLC'niz geliştirdiğiniz yazılım için telif ödemesi alıyorsa veya bir ABD şirketi size lisans ücreti ödüyorsa, bu gelir genellikle FDAP olarak sınıflandırılır ve ABD-Türkiye vergi anlaşmasıyla indirilmediği takdirde %30 stopaja tabidir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'ECI (Effectively Connected Income)' : 'ECI (Effectively Connected Income – Fiilen Bağlantılı Gelir)'}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {isEnglish
                  ? "ECI is income effectively connected with a US trade or business. Unlike FDAP, it is taxed at graduated rates — the same rates that apply to US residents — and allows deductions for business expenses. Filing Form 1040-NR is required. Common examples include:"
                  : "ECI, ABD'deki bir ticari faaliyet ile fiilen bağlantılı olan gelirdir. FDAP'tan farklı olarak kademeli oranlarla — ABD mukimlerine uygulanan oranlarla aynı — vergilendirilir ve işletme giderlerinin düşülmesine olanak tanır. Form 1040-NR beyannamesi verilmesi zorunludur. Başlıca örnekler:"}
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• {isEnglish ? "Income from services performed in the US" : "ABD'de ifa edilen hizmetlerden elde edilen gelir"}</li>
                <li>• {isEnglish ? "Sales of inventory within the US" : "ABD içinde gerçekleştirilen stok satışları"}</li>
                <li>• {isEnglish ? "Income from a US office or fixed place of business" : "ABD'deki bir ofis veya sabit işyerinden elde edilen gelir"}</li>
                <li>• {isEnglish ? "Income from a US partnership interest (if engaged in US trade or business)" : "ABD ortaklık payından elde edilen gelir (ABD'de ticari faaliyet yürütülüyorsa)"}</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                {isEnglish
                  ? "For Turkish entrepreneurs: if you personally perform freelance consulting services while physically present in the US, or if your LLC has a US office generating SaaS revenue from US customers, the resulting income is typically ECI."
                  : "Türk girişimciler için örnek: ABD'de fiziksel olarak bulunurken serbest danışmanlık hizmeti veriyorsanız veya LLC'nizin ABD müşterilerinden SaaS geliri elde eden bir ABD ofisi varsa, elde edilen gelir genellikle ECI olarak değerlendirilir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Practical Distinction for Digital Income' : 'Dijital Gelirler İçin Pratik Ayrım'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Advertising revenue (such as Google AdSense paid by a US company to your foreign account) is typically FDAP. SaaS subscription revenue collected through a US LLC with a US-based operation may be ECI. Software sold as a product (not licensed) from outside the US to US customers may not constitute US-source income at all, depending on where the sale is deemed to occur. Each situation requires individual analysis."
                  : "Reklam geliri (örneğin ABD'li bir şirketin yabancı hesabınıza ödediği Google AdSense geliri) genellikle FDAP olarak değerlendirilir. ABD merkezli bir operasyon üzerinden ABD LLC'si aracılığıyla tahsil edilen SaaS abonelik geliri ECI niteliğinde olabilir. ABD dışından ABD müşterilerine ürün olarak (lisans değil) satılan yazılım ise satışın gerçekleştiği yere bağlı olarak ABD kaynaklı gelir teşkil etmeyebilir. Her durum bireysel olarak analiz edilmelidir."}
              </p>
            </div>
          </div>
        </section>

        {/* US-Turkey Tax Treaty */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'US-Turkey Tax Treaty (TIAS 10205)' : 'ABD-Türkiye Vergi Anlaşması (TIAS 10205)'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4 mb-6">
            <p>
              {isEnglish
                ? "The United States and Turkey maintain a bilateral income tax treaty (TIAS 10205, effective 1997). Its purpose is to prevent double taxation and fiscal evasion. The treaty modifies the default US tax rules for Turkish tax residents who derive US-source income. The key provisions relevant to Turkish entrepreneurs and professionals are set out below."
                : "Amerika Birleşik Devletleri ile Türkiye arasında bir ikili gelir vergisi anlaşması (TIAS 10205, 1997'den itibaren yürürlükte) bulunmaktadır. Anlaşmanın amacı çifte vergilendirmeyi ve vergi kaçakçılığını önlemektir. ABD kaynaklı gelir elde eden Türkiye vergi mukimleri için varsayılan ABD vergi kurallarını değiştirir. Aşağıda Türk girişimciler ve profesyoneller açısından öne çıkan hükümler ele alınmıştır."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Article VII - Business Profits' : 'Madde VII – Ticari Kazançlar'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Business profits of a Turkish resident are taxable in the US only if the enterprise operates through a 'permanent establishment' (PE) in the US. Without a PE, the US cannot tax those profits. A PE generally includes a fixed place of business such as an office, branch, or factory. The mere use of a US registered agent or mailing address does not constitute a PE."
                  : "Türkiye mukimi bir işletmenin ticari kazançları, yalnızca ABD'de bir \"daimi işyeri\" (permanent establishment – PE) aracılığıyla faaliyet göstermesi hâlinde ABD'de vergilendirilebilir. Daimi işyeri bulunmuyorsa ABD bu kazançları vergilendiremez. Daimi işyeri genel olarak ofis, şube veya fabrika gibi sabit bir işyerini kapsar. Yalnızca bir registered agent veya posta adresi kullanılması daimi işyeri oluşturmaz."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Article XIV - Independent Personal Services' : 'Madde XIV – Bağımsız Kişisel Hizmetler'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Income that a Turkish resident derives from independent personal services (freelance, consulting) is taxable in the US only under two circumstances: the individual has a fixed base regularly available in the US, or the individual is present in the US for 183 days or more in the relevant fiscal year. Turkish freelancers working remotely from Turkey for US clients are, as a rule, not subject to US tax on such income under this article."
                  : "Türkiye mukimi bir kişinin bağımsız kişisel hizmetlerden (serbest meslek, danışmanlık) elde ettiği gelir, ABD'de yalnızca iki durumda vergilendirilebilir: kişinin ABD'de düzenli olarak kullanabileceği sabit bir üssü olması veya ilgili mali yılda ABD'de 183 gün ya da daha fazla bulunmuş olması. Türkiye'den uzaktan çalışarak ABD müşterilerine hizmet veren serbest çalışanlar, kural olarak bu madde kapsamında ABD vergisine tabi değildir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Article XII - Royalties' : 'Madde XII – Gayrimaddi Hak Bedelleri'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Royalties arising in the US and paid to a Turkish resident may be taxed in the US, but the treaty caps the withholding rate at 10% (versus the default 30% statutory rate). This covers payments for the use of, or the right to use, copyrights, patents, trademarks, and similar intellectual property. Software licensing payments may qualify as royalties under this provision."
                  : "ABD kaynaklı olup Türkiye mukimine ödenen gayrimaddi hak bedelleri ABD'de vergilendirilebilir; ancak anlaşma stopaj oranını %10 ile sınırlar (kanuni varsayılan %30 yerine). Bu hüküm; telif hakları, patentler, ticari markalar ve benzeri fikri mülkiyet haklarının kullanımı veya kullanım hakkı karşılığında yapılan ödemeleri kapsar. Yazılım lisans bedelleri de bu kapsamda gayrimaddi hak bedeli sayılabilir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Claiming Treaty Benefits' : 'Anlaşma Avantajlarından Yararlanma'}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {isEnglish
                  ? "Treaty benefits are not automatic. To claim reduced withholding rates or exemptions, the following steps are required:"
                  : "Anlaşma kapsamındaki avantajlar otomatik olarak uygulanmaz. İndirimli stopaj oranları veya muafiyetlerden yararlanmak için aşağıdaki adımlar gereklidir:"}
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• {isEnglish
                  ? "File Form W-8BEN (individuals) or W-8BEN-E (entities) with the US payer, claiming treaty country (Turkey) and the specific article"
                  : "ABD'deki ödeme yapan tarafa Form W-8BEN (gerçek kişiler) veya W-8BEN-E (tüzel kişiler) sunarak anlaşma ülkesini (Türkiye) ve ilgili maddeyi beyan etmek"}</li>
                <li>• {isEnglish
                  ? "Provide a valid Turkish tax identification number (TIN) on the W-8 form"
                  : "W-8 formunda geçerli bir Türk vergi kimlik numarası belirtmek"}</li>
                <li>• {isEnglish
                  ? "File Form 8833 (Treaty-Based Return Position Disclosure) with your US tax return if claiming a treaty-based position that affects your tax liability"
                  : "Vergi yükümlülüğünüzü etkileyen bir anlaşma pozisyonu talep ediyorsanız, ABD vergi beyannamenizle birlikte Form 8833 (Treaty-Based Return Position Disclosure) sunmak"}</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                {isEnglish
                  ? "For detailed guidance on which W-8 form to use, see the "
                  : "Hangi W-8 formunun kullanılacağına ilişkin ayrıntılı rehber için "}
                <Link href={`/${lang}/checklists/w8-w9-karar-haritasi`} className="text-[#C9A227] underline hover:text-[#b08d1e]">
                  {isEnglish ? "W-8/W-9 Decision Map" : "W-8/W-9 Karar Haritası"}
                </Link>
                {isEnglish ? " checklist." : " kontrol listesine bakınız."}
              </p>
            </div>
          </div>
        </section>

        {/* State Income Tax */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'State Income Tax' : 'Eyalet Gelir Vergisi'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4 mb-6">
            <p>
              {isEnglish
                ? "Federal taxes are only part of the picture. Each US state has its own tax regime. State-level obligations frequently catch foreign LLC owners off guard, particularly because state taxes can apply even when federal tax liability is minimal or zero."
                : "Federal vergiler, tablonun yalnızca bir bölümünü oluşturur. Her ABD eyaletinin kendine özgü bir vergi rejimi vardır. Eyalet düzeyindeki yükümlülükler, özellikle federal vergi yükümlülüğünün sınırlı veya sıfır olduğu durumlarda bile geçerli olabildiğinden, yabancı LLC sahiplerini sıklıkla hazırlıksız yakalar."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'States with No Individual Income Tax' : 'Bireysel Gelir Vergisi Almayan Eyaletler'}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {isEnglish
                  ? "The following states impose no individual income tax: Wyoming (WY), Nevada (NV), Texas (TX), Florida (FL), South Dakota (SD), Washington (WA), Alaska (AK). New Hampshire (NH) and Tennessee (TN) do not tax earned income but historically taxed interest and dividends (NH's tax on interest/dividends expired in 2025)."
                  : "Aşağıdaki eyaletler bireysel gelir vergisi uygulamaz: Wyoming (WY), Nevada (NV), Texas (TX), Florida (FL), South Dakota (SD), Washington (WA), Alaska (AK). New Hampshire (NH) ve Tennessee (TN) kazanç gelirini vergilendirmez; ancak tarihsel olarak faiz ve temettü vergisi uygulamıştır (NH'nin faiz/temettü vergisi 2025 itibarıyla sona ermiştir)."}
              </p>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "The absence of individual income tax does not mean the state imposes no taxes on businesses. Texas, for example, has a franchise tax (margin tax) that applies to entities doing business in the state."
                  : "Bireysel gelir vergisi olmaması, eyaletin işletmelere hiç vergi uygulamadığı anlamına gelmez. Örneğin Texas, eyalette faaliyet gösteren kuruluşlara franchise vergisi (margin tax) uygular."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'State Nexus' : 'Eyalet Bağlantısı (Nexus)'}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {isEnglish
                  ? "'Nexus' refers to a sufficient connection between a business and a state that allows the state to impose its taxes. Common nexus triggers include:"
                  : "\"Nexus\" (bağlantı noktası), bir eyaletin vergi uygulayabilmesi için gerekli olan yeterli bağlantıyı ifade eder. Nexus oluşturan yaygın durumlar şunlardır:"}
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• {isEnglish ? "Being formed (organized) in the state" : "Eyalette kuruluş (tescil)"}</li>
                <li>• {isEnglish ? "Having a physical office, warehouse, or employees in the state" : "Eyalette fiziksel ofis, depo veya çalışan bulundurma"}</li>
                <li>• {isEnglish ? "Exceeding economic nexus thresholds (revenue or transaction counts from that state)" : "Ekonomik nexus eşiklerinin aşılması (eyaletten elde edilen gelir veya işlem sayısı)"}</li>
                <li>• {isEnglish ? "Having a registered agent in the state (for franchise tax purposes in some states)" : "Eyalette registered agent bulundurma (bazı eyaletlerde franchise vergisi açısından)"}</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Franchise Tax vs Income Tax' : 'Franchise Vergisi ve Gelir Vergisi Farkı'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "A franchise tax is a fee for the privilege of doing business in a state. Unlike income tax, it may apply regardless of whether the entity earns a profit. Delaware charges LLCs an annual $300 flat-fee franchise tax. California imposes an annual $800 minimum franchise tax on LLCs. Texas applies a margin-based franchise tax. Wyoming and Nevada impose neither franchise tax nor state income tax — one reason they are popular for foreign-owned LLCs."
                  : "Franchise vergisi, bir eyalette ticari faaliyet gösterme ayrıcalığı karşılığında ödenen bir vergidir. Gelir vergisinden farklı olarak kuruluşun kâr edip etmediğine bakılmaksızın uygulanabilir. Delaware LLC'lerden yıllık sabit 300 dolar franchise vergisi alır. California LLC'lere yıllık asgari 800 dolar franchise vergisi uygular. Texas marj üzerinden franchise vergisi tahsil eder. Wyoming ve Nevada ne franchise vergisi ne de eyalet gelir vergisi uygular — bu durum, yabancı sahipli LLC'ler arasında bu eyaletlerin tercih edilme nedenlerinden biridir."}
              </p>
            </div>
          </div>
        </section>

        {/* Quarterly Estimated Tax */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Quarterly Estimated Tax Payments' : 'Üç Aylık Tahmini Vergi Ödemeleri'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4 mb-6">
            <p>
              {isEnglish
                ? "The US tax system operates on a pay-as-you-go basis. If income is not subject to sufficient withholding, estimated tax payments may be required throughout the year."
                : "ABD vergi sistemi, gelir elde edildikçe vergi ödenmesi (pay-as-you-go) esasına dayanır. Gelir yeterli stopaja tabi değilse, yıl boyunca tahmini vergi ödemelerinin yapılması gerekebilir."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Who Must Pay' : 'Kimler Ödemekle Yükümlüdür'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "If you expect to owe $1,000 or more in federal tax after subtracting withholding and refundable credits, you generally must make estimated tax payments. For corporations, the threshold is $500. Non-resident aliens with ECI or other US-source income not fully covered by withholding are subject to this requirement."
                  : "Stopajlar ve iade edilebilir mahsuplar düşüldükten sonra 1.000 dolar veya üzeri federal vergi borcu doğmasını bekliyorsanız, genellikle tahmini vergi ödemesi yapmanız gerekir. Şirketler için bu eşik 500 dolardır. ECI veya stopajla tam olarak karşılanmayan diğer ABD kaynaklı geliri bulunan mukim olmayan yabancılar bu yükümlülüğe tabidir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Payment Schedule and Forms' : 'Ödeme Takvimi ve Formlar'}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {isEnglish
                  ? "Estimated payments are due quarterly:"
                  : "Tahmini vergi ödemeleri üç aylık dönemlerde yapılır:"}
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• {isEnglish ? "Q1: April 15" : "1. Çeyrek: 15 Nisan"}</li>
                <li>• {isEnglish ? "Q2: June 15" : "2. Çeyrek: 15 Haziran"}</li>
                <li>• {isEnglish ? "Q3: September 15" : "3. Çeyrek: 15 Eylül"}</li>
                <li>• {isEnglish ? "Q4: January 15 (of the following year)" : "4. Çeyrek: 15 Ocak (takip eden yıl)"}</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                {isEnglish
                  ? "Individuals use Form 1040-ES; non-resident aliens use Form 1040-ES (NR). Corporations use the schedule prescribed under Form 1120. Payments can be made electronically through the IRS Direct Pay system or EFTPS (Electronic Federal Tax Payment System)."
                  : "Gerçek kişiler Form 1040-ES kullanır; mukim olmayan yabancılar Form 1040-ES (NR) kullanır. Şirketler, Form 1120 kapsamındaki takvimi uygular. Ödemeler IRS Direct Pay sistemi veya EFTPS (Electronic Federal Tax Payment System) aracılığıyla elektronik ortamda yapılabilir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Underpayment Penalties and Safe Harbor' : 'Eksik Ödeme Cezaları ve Güvenli Liman Kuralı'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Inadequate estimated payments trigger an underpayment penalty under IRC Section 6654. The penalty is calculated as interest on the shortfall. Safe harbor rules provide protection: the penalty does not apply if you pay at least 100% of the prior year's tax liability (110% if prior year AGI exceeded $150,000) or at least 90% of the current year's liability. For non-resident aliens filing for the first time, the prior-year safe harbor may not be available."
                  : "Yetersiz tahmini ödeme, IRC Section 6654 kapsamında eksik ödeme cezasını tetikler. Ceza, eksik kalan tutar üzerinden faiz olarak hesaplanır. Güvenli liman kuralları koruma sağlar: bir önceki yılın vergi borcunun en az %100'ünü (önceki yıl düzeltilmiş brüt geliri 150.000 doları aşmışsa %110'unu) veya cari yıl borcunun en az %90'ını öderseniz ceza uygulanmaz. İlk kez beyanname veren mukim olmayan yabancılar için önceki yıl güvenli limanı geçerli olmayabilir."}
              </p>
            </div>
          </div>
        </section>

        {/* W-8 and W-9 Forms */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'W-8 and W-9 Forms' : 'W-8 ve W-9 Formları'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4 mb-6">
            <p>
              {isEnglish
                ? "US payers are required to determine the tax status of their payees. The W-8 and W-9 form series serves this purpose. Filing the correct form is essential for proper withholding and treaty benefit claims."
                : "ABD'deki ödeme yapan taraflar, ödeme aldıkları kişilerin vergi statüsünü tespit etmekle yükümlüdür. W-8 ve W-9 form serisi bu amaca hizmet eder. Doğru formun doldurulması, uygun stopaj uygulaması ve anlaşma avantajlarından yararlanılması için zorunludur."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">W-9</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Used by US persons (citizens, resident aliens, and US entities). A US person provides a W-9 to certify their taxpayer identification number (SSN or EIN) and confirm they are not subject to backup withholding. If your LLC has elected to be treated as a US corporation or you are a US tax resident, you file W-9."
                  : "ABD kişileri (vatandaşlar, mukim yabancılar ve ABD tüzel kişileri) tarafından kullanılır. ABD kişisi, vergi kimlik numarasını (SSN veya EIN) teyit etmek ve yedek stopaja tabi olmadığını beyan etmek için W-9 sunar. LLC'niz ABD şirketi olarak vergilendirilmeyi seçtiyse veya ABD vergi mukimiyseniz W-9 doldurursunuz."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">W-8BEN</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Certificate of Foreign Status of Beneficial Owner. Non-resident alien individuals use this form to certify foreign status, claim treaty benefits, and establish the applicable withholding rate. It is valid for three calendar years and expires on December 31 of the third year. Example: A Turkish software developer receiving royalties from a US company files W-8BEN, citing Article XII of the US-Turkey treaty for the 10% reduced rate."
                  : "Nihai lehdarın yabancı statü belgesidir. Mukim olmayan yabancı gerçek kişiler bu formu yabancı statülerini teyit etmek, anlaşma avantajlarını talep etmek ve geçerli stopaj oranını belirlemek amacıyla kullanır. Üç takvim yılı boyunca geçerlidir ve üçüncü yılın 31 Aralık tarihinde sona erer. Örnek: ABD'li bir şirketten telif geliri alan Türk yazılım geliştirici, ABD-Türkiye anlaşmasının XII. maddesine atıfla %10 indirimli oran için W-8BEN doldurur."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">W-8BEN-E</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "The entity version of W-8BEN. Used by foreign organizations (including foreign-owned LLCs that have not elected US tax treatment) to claim foreign status and treaty benefits. Requires the entity's foreign tax identification number. Example: A Turkish limited company (Ltd. Sti.) receiving consulting fees from a US client files W-8BEN-E."
                  : "W-8BEN'in tüzel kişi versiyonudur. Yabancı kuruluşlar (ABD vergi seçimi yapmamış yabancı sahipli LLC'ler dahil) tarafından yabancı statü ve anlaşma avantajlarını talep etmek için kullanılır. Kuruluşun yabancı vergi kimlik numarasını gerektirir. Örnek: ABD'li bir müşteriden danışmanlık ücreti alan bir Türk limited şirketi (Ltd. Şti.) W-8BEN-E doldurur."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">W-8ECI</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Used by a foreign person to claim that income is effectively connected with a US trade or business (ECI). Filing W-8ECI means the income is not subject to 30% withholding at the source; instead, the payee reports and pays tax on the net income via their tax return. Example: A non-resident alien operating a US-based consulting business through their LLC files W-8ECI with their clients."
                  : "Yabancı bir kişi tarafından gelirin ABD'deki ticari faaliyetle fiilen bağlantılı olduğunu (ECI) beyan etmek için kullanılır. W-8ECI verilmesi, gelirin kaynakta %30 stopaja tabi olmadığı anlamına gelir; bunun yerine, gelir elde eden taraf net geliri beyannamesi üzerinden beyan ederek vergisini öder. Örnek: LLC'si aracılığıyla ABD merkezli danışmanlık işi yürüten mukim olmayan yabancı, müşterilerine W-8ECI sunar."}
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              {isEnglish
                ? "Use the interactive "
                : "Doğru formu belirlemek için "}
              <Link href={`/${lang}/checklists/w8-w9-karar-haritasi`} className="text-[#C9A227] underline hover:text-[#b08d1e]">
                {isEnglish ? "W-8/W-9 Decision Map" : "W-8/W-9 Karar Haritası"}
              </Link>
              {isEnglish
                ? " to determine which form applies to your situation."
                : " etkileşimli kontrol listesini kullanabilirsiniz."}
            </p>
          </div>
        </section>

        {/* Tax Filing Requirements Summary */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Tax Filing Requirements Summary' : 'Vergi Beyanname Yükümlülükleri Özeti'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4 mb-6">
            <p>
              {isEnglish
                ? "The following forms are commonly relevant to non-resident aliens and foreign-owned US entities. Filing requirements depend on tax residency, entity type, income source, and treaty positions."
                : "Aşağıdaki formlar, mukim olmayan yabancılar ve yabancı sahipli ABD kuruluşları için genellikle geçerlidir. Beyanname yükümlülükleri, vergi mukimliğine, kuruluş türüne, gelir kaynağına ve anlaşma pozisyonlarına göre değişir."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Form 1040-NR</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "US nonresident alien income tax return. Required for non-resident aliens with US-source income, ECI, or when claiming a refund of over-withheld tax. Due date: April 15 (if you received wages subject to withholding) or June 15 (if no wages were subject to withholding). Extensions available via Form 4868."
                  : "ABD mukim olmayan yabancı gelir vergisi beyannamesidir. ABD kaynaklı geliri, ECI'si olan veya fazla kesilen verginin iadesini talep eden mukim olmayan yabancılar için zorunludur. Son tarih: 15 Nisan (stopaja tabi ücret aldıysanız) veya 15 Haziran (stopaja tabi ücret almadıysanız). Form 4868 ile süre uzatımı talep edilebilir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Form 1120 + Form 5472</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "A foreign-owned single-member LLC that is a disregarded entity must file a pro forma Form 1120 with Form 5472 attached. Form 5472 reports transactions between the LLC and its foreign owner (such as capital contributions, distributions, and loans). Due date: April 15. Penalty for non-filing: $25,000 per form per year. This is required even if the LLC has no income."
                  : "Yabancı sahipli, yok sayılan kuruluş statüsündeki tek üyeli LLC, proforma Form 1120 ve ekinde Form 5472 beyannamesi vermek zorundadır. Form 5472, LLC ile yabancı sahibi arasındaki işlemleri (sermaye katkıları, dağıtımlar, krediler gibi) bildirir. Son tarih: 15 Nisan. Vermeme cezası: her form ve her yıl için 25.000 dolar. LLC'nin geliri olmasa bile bu beyanname zorunludur."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Form 8833</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Treaty-Based Return Position Disclosure. Required when a taxpayer takes a position on a tax return that a treaty provision overrides or modifies the Internal Revenue Code. For example, if you claim under the US-Turkey treaty that your business profits are exempt from US tax because you have no permanent establishment, you must disclose this position on Form 8833."
                  : "Vergi anlaşmasına dayalı beyanname pozisyonu bildirimidir. Mükellefin vergi beyannamesinde bir anlaşma hükmünün İç Gelir Kanunu'nu (IRC) geçersiz kıldığı veya değiştirdiği bir pozisyon alması hâlinde zorunludur. Örneğin, ABD-Türkiye anlaşması kapsamında daimi işyeriniz olmadığı için ticari kazançlarınızın ABD vergisinden muaf olduğunu ileri sürüyorsanız, bu pozisyonu Form 8833 ile bildirmeniz gerekir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Form 8938 (FATCA)</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Statement of Specified Foreign Financial Assets. Required for US persons (including tax residents) whose foreign financial assets exceed certain thresholds. Filed with the annual tax return. Thresholds vary: $50,000 at year-end or $75,000 at any time during the year (higher for joint filers and those living abroad)."
                  : "Belirli yabancı finansal varlıkların beyanıdır. Yurt dışı finansal varlıkları belirli eşikleri aşan ABD kişileri (vergi mukimleri dahil) için zorunludur. Yıllık vergi beyannamesinin ekinde sunulur. Eşikler değişkendir: yıl sonu itibarıyla 50.000 dolar veya yıl içinde herhangi bir anda 75.000 dolar (müşterek beyanname verenler ve yurt dışında yaşayanlar için daha yüksek)."}
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              {isEnglish
                ? "For a comprehensive filing checklist, see the "
                : "Kapsamlı bir beyanname kontrol listesi için "}
              <Link href={`/${lang}/checklists/tax-documents-checklist`} className="text-[#C9A227] underline hover:text-[#b08d1e]">
                {isEnglish ? "Tax Documents Checklist" : "Vergi Belgeleri Kontrol Listesi"}
              </Link>
              {isEnglish
                ? ". If you receive correspondence from the IRS, consult the "
                : " sayfasına bakınız. IRS'ten yazı aldıysanız, "}
              <Link href={`/${lang}/checklists/irs-mektup-rehberi`} className="text-[#C9A227] underline hover:text-[#b08d1e]">
                {isEnglish ? "IRS Letter Guide" : "IRS Mektup Rehberi"}
              </Link>
              {isEnglish ? "." : "'ne başvurabilirsiniz."}
            </p>
          </div>
        </section>

        {/* FATCA and FBAR */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'FATCA and FBAR Requirements' : 'FATCA ve FBAR Yükümlülükleri'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4 mb-6">
            <p>
              {isEnglish
                ? "FATCA and FBAR are separate reporting regimes with distinct thresholds, filing methods, and penalties. Both target foreign financial accounts but serve different purposes and are administered by different agencies."
                : "FATCA ve FBAR, farklı eşiklere, beyanname yöntemlerine ve yaptırımlara sahip ayrı bildirim rejimleridir. Her ikisi de yurt dışı finansal hesapları hedef alır ancak farklı amaçlara hizmet eder ve farklı kurumlar tarafından yönetilir."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">FATCA (Form 8938)</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "US persons must report specified foreign financial assets if they exceed thresholds ($50,000-$200,000+ depending on filing status and residence). Filed with your tax return. Administered by the IRS. Penalties: $10,000 for failure to file, up to $50,000 for continued non-filing after IRS notice."
                  : "ABD vergi mükellefleri, yurt dışındaki belirli finansal varlıkları kanunda öngörülen eşikleri aştığında bildirmekle yükümlüdür (beyanname durumuna ve ikamete göre 50.000–200.000 dolar ve üzeri). Bu bildirim, yıllık vergi beyannamesiyle birlikte yapılır. IRS tarafından yönetilir. Cezalar: bildirim yapılmaması hâlinde 10.000 dolar, IRS uyarısından sonra devam eden ihlâl için 50.000 dolara kadar."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">FBAR (FinCEN Form 114)</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "US persons with foreign financial accounts exceeding $10,000 aggregate value at any time during the year must file. Separate from tax return, filed electronically with FinCEN (Financial Crimes Enforcement Network). Due date: April 15, with automatic extension to October 15. Penalties: up to $16,117 per account per year for non-willful violations; up to $161,174 or 50% of account balance for willful violations. Criminal penalties may also apply."
                  : "Yıl içinde herhangi bir anda toplam bakiyesi 10.000 doları aşan yurt dışı finansal hesaplara sahip ABD kişileri bu formu doldurmak zorundadır. Vergi beyannamesinden ayrı olarak FinCEN'e (Financial Crimes Enforcement Network) elektronik ortamda beyan edilir. Son tarih: 15 Nisan, otomatik uzatma ile 15 Ekim. Cezalar: kasıtsız ihlâllerde hesap başına yılda 16.117 dolara kadar; kasıtlı ihlâllerde 161.174 dolar veya hesap bakiyesinin %50'sine kadar. Cezai yaptırımlar da söz konusu olabilir."}
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              {isEnglish
                ? "FBAR and FATCA obligations are closely related to US banking. For information on opening a US bank account, see "
                : "FBAR ve FATCA yükümlülükleri ABD bankacılığıyla yakından ilişkilidir. ABD banka hesabı açma hakkında bilgi için "}
              <Link href={`/${lang}/amerika/abdde-banka-hesabi`} className="text-[#C9A227] underline hover:text-[#b08d1e]">
                {isEnglish ? "US Bank Account" : "ABD'de Banka Hesabı"}
              </Link>
              {isEnglish ? "." : " sayfasına bakınız."}
            </p>
          </div>
        </section>

        {/* Common Misconceptions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Common Misconceptions' : 'Sık Karşılaşılan Yanılgılar'}
          </h2>

          <div className="space-y-4">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"I can avoid all taxes with a Delaware LLC"' : '"Delaware LLC ile tüm vergilerden kurtulabilirim"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Delaware's lack of state income tax for out-of-state businesses doesn't eliminate federal taxes, taxes in states where you actually do business, or your home country's taxes. Delaware still charges an annual $300 franchise tax for LLCs."
                  : "Delaware'in eyalet dışı işletmelerden gelir vergisi almaması, federal vergileri, fiilen faaliyet gösterdiğiniz eyaletlerdeki vergileri veya kendi ülkenizdeki vergi yükümlülüklerini ortadan kaldırmaz. Delaware ayrıca LLC'lerden yıllık 300 dolar franchise vergisi almaya devam eder."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"FBAR is only for big accounts"' : '"FBAR yalnızca yüksek bakiyeli hesaplar için geçerlidir"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "The $10,000 threshold is the aggregate of ALL foreign financial accounts at any time during the year. Multiple small accounts can trigger the requirement."
                  : "10.000 dolarlık eşik, yıl içinde herhangi bir anda sahip olduğunuz TÜM yurt dışı finansal hesapların toplam bakiyesidir. Tek başına küçük olan birden fazla hesap, bir arada değerlendirildiğinde bildirim yükümlülüğünü doğurabilir."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish
                  ? '"I pay taxes in Turkey, so I don\'t need to pay taxes in the US too"'
                  : '"Türkiye\'de vergi ödüyorum, ABD\'ye de ödemem gerekir mi?"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Paying taxes in Turkey does not automatically exempt you from US tax obligations. The US-Turkey tax treaty provides relief through credit mechanisms — taxes paid to one country are credited against the tax owed to the other — not through blanket exemptions. The treaty operates article by article: some income categories may be exempt, others may be subject to reduced rates, and some may remain fully taxable. Each income type must be analyzed individually."
                  : "Türkiye'de vergi ödüyor olmak ABD vergi yükümlülüklerinden otomatik muafiyet sağlamaz. ABD-Türkiye vergi anlaşması toptan muafiyet değil, mahsup mekanizması yoluyla çifte vergilendirmeyi hafifletir — bir ülkeye ödenen vergi diğer ülkedeki vergi borcundan düşülür. Anlaşma madde bazında işler: bazı gelir kategorileri muaf olabilir, bazılarında indirimli oran uygulanabilir, bazıları ise tam vergilendirmeye tabi kalabilir. Her gelir türü ayrı ayrı değerlendirilmelidir."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish
                  ? '"Everyone who gets an EIN is a US taxpayer"'
                  : '"EIN alan herkes vergi mükellefi midir?"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "An EIN (Employer Identification Number) is a tax identification number for an entity, not a determination of tax liability. Obtaining an EIN does not by itself create US tax obligations. However, having an EIN triggers certain filing requirements (such as Form 5472 for foreign-owned LLCs) regardless of whether any tax is owed. The EIN is necessary for opening a US bank account, filing required forms, and conducting business, but it is an administrative identifier, not a tax status determination."
                  : "EIN (Employer Identification Number) bir kuruluşa verilen vergi kimlik numarasıdır; vergi yükümlülüğü tespiti değildir. EIN edinmek tek başına ABD vergi yükümlülüğü doğurmaz. Ancak EIN sahibi olmak, vergi borcu olup olmadığına bakılmaksızın belirli beyanname yükümlülüklerini (yabancı sahipli LLC'ler için Form 5472 gibi) tetikler. EIN, ABD banka hesabı açmak, zorunlu formları doldurmak ve ticari faaliyette bulunmak için gereklidir; ancak idari bir tanımlayıcıdır, vergi statüsü belirlemesi değildir."}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQAccordion
          items={faqItems}
          title={isEnglish ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}
        />

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

        {/* Related Pages */}
        <section className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
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

          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <Link
              href={`/${lang}/checklists/w8-w9-karar-haritasi`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">{isEnglish ? 'W-8/W-9 Decision Map' : 'W-8/W-9 Karar Haritası'}</span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/checklists/tax-documents-checklist`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">{isEnglish ? 'Tax Documents Checklist' : 'Vergi Belgeleri Kontrol Listesi'}</span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/checklists/irs-mektup-rehberi`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">{isEnglish ? 'IRS Letter Guide' : 'IRS Mektup Rehberi'}</span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/amerika/abdde-llc-kurmak`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">{isEnglish ? 'Forming an LLC in the US' : "ABD'de LLC Kurmak"}</span>
              <span className="text-[#C9A227]">→</span>
            </Link>
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
              ? 'This content is for general informational purposes only and does not constitute tax or legal advice. Consult a qualified tax professional for advice specific to your situation.'
              : 'Bu içerik yalnızca genel bilgilendirme amacıyla hazırlanmış olup vergi veya hukuki danışmanlık niteliği taşımaz. Durumunuza özel tavsiye için yetkili bir vergi uzmanına danışınız.'}
          </p>
        </div>
      </main>
    </div>
  )
}
