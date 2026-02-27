import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import TrustStrip from '@/components/TrustStrip'
import FAQAccordion from '@/components/FAQAccordion'
import KitCallout from '@/components/KitCallout'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const PAGE_META = {
  slug: 'abdde-is-yapanlar-icin-sozlesmeler',
  datePublished: '2025-06-01',
  dateModified: '2026-01-25',
  version: '1.0',
  citationKey: 'ecl-gde-00003',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const url = `${SITE_URL}/${lang}/amerika/${PAGE_META.slug}`
  return {
    title: isEnglish
      ? "Contracts for Doing Business in the US | EchoLegal"
      : "ABD'de Ticari Faaliyet İçin Gerekli Sözleşmeler | EchoLegal",
    description: isEnglish
      ? "Comprehensive guide to US business contracts: types, key clauses, red flags, international enforcement, and when to seek legal review. NDAs, service agreements, contractor agreements, and more."
      : "ABD'de ticari sözleşmelere ilişkin kapsamlı rehber: sözleşme türleri, kritik hükümler, tehlikeli maddeler, uluslararası tenfiz ve hukuki inceleme gerekliliği. NDA, hizmet sözleşmesi, yüklenici sözleşmesi ve daha fazlası.",
    other: {
      'citation_title': isEnglish ? 'Business Contracts in the US' : "ABD'de İş Yapanlar İçin Sözleşmeler",
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

export default async function SozlesmelerPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const pageUrl = `${SITE_URL}/${lang}/amerika/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'Business Contracts in the US' : "ABD'de İş Yapanlar İçin Sözleşmeler"

  const articleSchema = generateArticleSchema({
    title: pageTitle,
    description: isEnglish
      ? 'Comprehensive guide to US business contracts.'
      : "ABD'de ticari sözleşmelere ilişkin kapsamlı rehber.",
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['contracts', 'business-agreements', 'us-law', 'nda', 'service-agreement'],
    section: 'jurisdictional-guide',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Amerika Hub' : 'Amerika Hub', url: `${SITE_URL}/${lang}/amerika` },
    { name: pageTitle, url: pageUrl },
  ])

  const faqItems = [
    {
      question: isEnglish ? "Do I need contracts in English even if my counterparties are Turkish?" : "Karşı tarafım Türk olsa bile sözleşmelerimi İngilizce mi hazırlamalıyım?",
      answer: isEnglish
        ? "If your LLC is US-based and the governing law clause designates a US jurisdiction, drafting the contract in English is strongly advisable. US courts will interpret the English text; a Turkish translation appended for convenience does not override the English version unless the contract expressly states otherwise. For cross-border relationships, a bilingual contract with an explicit hierarchy clause (e.g., 'In the event of conflict, the English version shall prevail') provides clarity to both sides while ensuring legal certainty."
        : "LLC'niz ABD merkezliyse ve uygulanacak hukuk maddesi bir ABD yargı çevresini işaret ediyorsa, sözleşmenin İngilizce hazırlanması kuvvetle önerilir. ABD mahkemeleri İngilizce metni esas alarak yorum yapar; kolaylık amacıyla eklenen Türkçe çeviri, sözleşmede aksi açıkça belirtilmedikçe İngilizce versiyonun önüne geçmez. Sınır ötesi ilişkilerde, açık bir öncelik hükmü içeren iki dilli sözleşme ('Metinler arasında çelişki hâlinde İngilizce metin geçerlidir' gibi) her iki taraf açısından hem anlaşılabilirlik hem de hukuki kesinlik sağlar."
    },
    {
      question: isEnglish ? "What is a governing law clause and why does it matter?" : "Uygulanacak hukuk maddesi nedir ve neden bu kadar önemlidir?",
      answer: isEnglish
        ? "A governing law clause (also called 'choice of law') specifies which jurisdiction's substantive law will interpret and govern the contract. Without this clause, courts apply conflict-of-laws rules that can lead to unpredictable results. For US-based businesses, New York law is commonly selected due to its extensive body of commercial case law and the statutory provision under NY General Obligations Law Section 5-1401, which allows parties to choose New York law for contracts valued at $250,000 or more regardless of any connection to New York. Delaware law is another frequent choice, particularly for entity-related agreements."
        : "Uygulanacak hukuk maddesi (choice of law), sözleşmenin hangi hukuk düzeninin maddi hukuk kurallarına göre yorumlanacağını ve uygulanacağını belirler. Bu madde olmadığında mahkemeler kanunlar ihtilafı kurallarını uygular ve bu durum öngörülemeyen sonuçlar doğurabilir. ABD merkezli işletmeler açısından New York hukuku, köklü ticari içtihat birikimi ve NY General Obligations Law Section 5-1401 hükmü sayesinde sıklıkla tercih edilir. Bu düzenleme, bedeli 250.000 dolar ve üzeri sözleşmelerde tarafların New York ile herhangi bir bağlantıları olmasa dahi New York hukukunu seçmelerine olanak tanır. Delaware hukuku ise özellikle şirket yapısına ilişkin sözleşmelerde yaygın bir alternatiftir."
    },
    {
      question: isEnglish ? "Should I choose arbitration or court litigation for dispute resolution?" : "Uyuşmazlık çözümünde tahkim mi yoksa mahkeme yargılaması mı tercih edilmeli?",
      answer: isEnglish
        ? "Each mechanism has distinct advantages. Arbitration is generally faster, confidential, and — critically for international parties — produces awards enforceable in over 170 countries under the New York Convention (1958). However, arbitration can be expensive (institutional fees, arbitrator compensation) and typically offers limited appeal rights. Court litigation provides formal procedural protections, appeal mechanisms, and public precedent, but may be slower and involves enforceability challenges across borders. For purely domestic US disputes, court litigation is often sufficient. For cross-border contracts involving Turkish and US parties, arbitration through a recognized institution (ICC, AAA-ICDR, ISTAC) is generally the more practical choice."
        : "Her iki yöntemin kendine özgü avantajları bulunur. Tahkim genellikle daha hızlı ve gizlidir; uluslararası taraflar açısından en kritik avantajı ise 1958 tarihli New York Sözleşmesi kapsamında 170'ten fazla ülkede tenfiz edilebilir kararlar üretmesidir. Öte yandan tahkim maliyetli olabilir (kurum masrafları, hakem ücretleri) ve kural olarak sınırlı itiraz hakkı sunar. Mahkeme yargılaması ise usul güvenceleri, temyiz mekanizması ve emsal karar oluşturma imkanı sağlar; ancak süreç daha uzun sürebilir ve sınır ötesi tenfiz zorlukları yaşanabilir. Yalnızca ABD'deki taraflar arasındaki uyuşmazlıklarda mahkeme yargılaması genellikle yeterlidir. Türk ve ABD'li tarafları içeren sınır ötesi sözleşmelerde ise tanınmış bir kurum (ICC, AAA-ICDR, ISTAC) nezdinde tahkim daha pratik bir çözüm sunar."
    },
    {
      question: isEnglish ? "What makes a contract enforceable under US law?" : "ABD hukukuna göre bir sözleşmenin geçerli ve bağlayıcı olması için hangi unsurlar gerekir?",
      answer: isEnglish
        ? "US contract formation requires four core elements: (1) offer and acceptance — a clear proposal and unequivocal agreement to its terms; (2) consideration — a bargained-for exchange of value (a promise for a promise, or a promise for performance); (3) capacity — parties must be of legal age and sound mind; and (4) legality — the contract's purpose must not violate law or public policy. Additionally, the Statute of Frauds (applicable in all US states) requires certain contracts to be in writing: real estate transactions, agreements that cannot be performed within one year, guarantees of another's debt, and contracts for the sale of goods over $500 under the UCC. Even where not legally required, written contracts are strongly preferred as evidence."
        : "ABD sözleşme hukukunda geçerli bir sözleşmenin kurulması dört temel unsur gerektirir: (1) icap ve kabul — açık bir öneri ile bu önerinin koşullarına tereddütsüz rıza gösterilmesi; (2) ivaz (consideration) — karşılıklı bir değer değişimi (taahhüde karşı taahhüt veya taahhüde karşı edim); (3) ehliyet — tarafların yasal yaşta ve ayırt etme gücüne sahip olması; (4) hukuka uygunluk — sözleşme konusunun hukuka veya kamu düzenine aykırı olmaması. Bunlara ek olarak, tüm ABD eyaletlerinde uygulanan Statute of Frauds kuralı belirli sözleşmelerin yazılı yapılmasını zorunlu kılar: gayrimenkul işlemleri, bir yıl içinde ifa edilemeyecek anlaşmalar, üçüncü kişinin borcunun garantisi ve UCC kapsamında 500 doları aşan mal satışları. Yazılı sözleşme yasal olarak zorunlu olmasa dahi, ispat kolaylığı açısından her durumda kesinlikle tercih edilmelidir."
    },
    {
      question: isEnglish ? "Are electronic signatures legally valid for US contracts?" : "ABD sözleşmelerinde elektronik imza hukuken geçerli midir?",
      answer: isEnglish
        ? "Yes. Under the federal ESIGN Act (2000) and the Uniform Electronic Transactions Act (UETA) adopted by most states, electronic signatures carry the same legal weight as handwritten signatures for most commercial contracts. Exceptions include wills, family law documents, court orders, and certain UCC transactions. For international contracts, the validity of electronic signatures also depends on the law of the counterparty's jurisdiction. Turkey recognizes electronic signatures under the Electronic Signature Law (5070 sayılı Kanun), with qualified electronic signatures (nitelikli elektronik imza) having the same evidentiary value as wet signatures. Platforms such as DocuSign and Adobe Sign are widely accepted in US commercial practice."
        : "Evet. Federal ESIGN Act (2000) ve çoğu eyaletin benimsediği Uniform Electronic Transactions Act (UETA) uyarınca, elektronik imzalar ticari sözleşmelerin büyük çoğunluğunda el yazısı imzalarla aynı hukuki geçerliliğe sahiptir. Vasiyetnameler, aile hukuku belgeleri, mahkeme kararları ve belirli UCC işlemleri bu kapsamın dışındadır. Uluslararası sözleşmelerde elektronik imzanın geçerliliği ayrıca karşı tarafın tâbi olduğu hukuka da bağlıdır. Türk hukukunda 5070 sayılı Elektronik İmza Kanunu elektronik imzayı tanır; nitelikli elektronik imza ıslak imza ile aynı ispat değerini taşır. DocuSign ve Adobe Sign gibi platformlar ABD ticari uygulamasında yaygın olarak kabul görmektedir."
    },
    {
      question: isEnglish ? "Can a contract be drafted in both English and Turkish? Which version controls?" : "Sözleşme hem İngilizce hem Türkçe hazırlanabilir mi? Hangi metin bağlayıcıdır?",
      answer: isEnglish
        ? "Bilingual contracts are common in cross-border practice and are perfectly valid. The critical issue is including a 'language priority' or 'controlling language' clause that specifies which version prevails in case of discrepancy. Without such a clause, courts must determine the authoritative text — an expensive and unpredictable exercise. Standard practice: draft the operative version in the language of the governing law jurisdiction (English for US law), provide a certified translation in the other language, and include an express clause stating which version controls. If the contract is governed by Turkish law, the Turkish text should be the controlling version."
        : "İki dilli sözleşmeler sınır ötesi ticari ilişkilerde yaygındır ve hukuken geçerlidir. Kritik husus, metinler arasında çelişki hâlinde hangisinin esas alınacağını belirleyen bir 'dil önceliği' veya 'bağlayıcı metin' maddesinin eklenmesidir. Böyle bir hüküm bulunmadığında mahkemeler hangi metnin bağlayıcı olduğunu resen belirlemek zorunda kalır; bu hem maliyetli hem de sonucu öngörülemez bir süreçtir. Yerleşik uygulama şu şekildedir: asıl metin uygulanacak hukukun diline göre hazırlanır (ABD hukuku için İngilizce), diğer dilde yeminli tercüme eklenir ve hangi metnin bağlayıcı olduğunu açıkça belirten bir madde konulur. Sözleşmeye Türk hukuku uygulanacaksa bağlayıcı metin Türkçe olmalıdır."
    },
    {
      question: isEnglish ? "What remedies are available when the other party breaches a contract?" : "Karşı taraf sözleşmeyi ihlâl ettiğinde hangi hukuki yollara başvurulabilir?",
      answer: isEnglish
        ? "US contract law provides several remedies for breach: (1) Compensatory damages — monetary recovery for actual losses caused by the breach; (2) Consequential damages — indirect losses that were foreseeable at the time of contracting (e.g., lost profits), subject to the Hadley v. Baxendale foreseeability test; (3) Liquidated damages — a pre-agreed sum specified in the contract, enforceable if the amount is a reasonable estimate of anticipated harm and not a penalty; (4) Specific performance — a court order compelling the breaching party to perform, available when monetary damages are inadequate (common in real property and unique goods); (5) Rescission — cancellation of the contract, restoring parties to their pre-contract positions. The non-breaching party has a duty to mitigate damages. Punitive damages are generally not available in contract actions."
        : "ABD sözleşme hukuku, ihlâl hâlinde birden fazla hukuki yol öngörür: (1) Telafi edici tazminat (compensatory damages) — ihlâlden kaynaklanan fiili zararın tazmini; (2) Dolaylı zararlar (consequential damages) — sözleşmenin kurulduğu sırada öngörülebilir nitelikteki dolaylı kayıpların (örneğin mahrum kalınan kâr) tazmini; Hadley v. Baxendale kararıyla yerleşen öngörülebilirlik testine tâbidir; (3) Götürü tazminat (liquidated damages) — sözleşmede önceden kararlaştırılmış sabit tutar; beklenen zararın makul bir tahmini olması ve cezai nitelik taşımaması koşuluyla geçerlidir; (4) Aynen ifa (specific performance) — mahkemenin ihlâl eden tarafı edimi yerine getirmeye zorlaması; parasal tazminatın yetersiz kaldığı hâllerde uygulanır (gayrimenkul ve eşsiz mallar için yaygındır); (5) Fesih ve eski hâle iade (rescission) — sözleşmenin iptali ile tarafların sözleşme öncesi durumlarına döndürülmesi. İhlâle uğrayan taraf zararı azaltma yükümlülüğü (duty to mitigate) altındadır. Sözleşme davalarında cezai tazminata (punitive damages) kural olarak hükmedilemez."
    },
    {
      question: isEnglish ? "What is the statute of limitations for contract claims in the US?" : "ABD'de sözleşmeden doğan taleplerde zamanaşımı süresi ne kadardır?",
      answer: isEnglish
        ? "Statutes of limitations for contract claims vary by state and contract type. For written contracts: New York allows 6 years (CPLR 213), California allows 4 years (CCP 337), and Delaware allows 3 years from accrual for most claims. For oral contracts, periods are generally shorter (e.g., 3 years in New York). Under the UCC, the limitation period for sale-of-goods claims is 4 years, which parties can contractually reduce to no less than 1 year. The limitation period typically begins when the breach occurs, not when it is discovered — although some states apply a 'discovery rule' for certain claims. Contractual limitation clauses that shorten the statute of limitations are enforceable in most states if reasonable."
        : "Sözleşme davalarında zamanaşımı süreleri eyalete ve sözleşme türüne göre farklılık gösterir. Yazılı sözleşmelerde: New York 6 yıl (CPLR 213), California 4 yıl (CCP 337) ve Delaware çoğu talep için ihlâlden itibaren 3 yıl öngörür. Sözlü sözleşmelerde süreler genellikle daha kısadır (örneğin New York'ta 3 yıl). UCC kapsamındaki mal satışı uyuşmazlıklarında zamanaşımı 4 yıldır ve bu süre sözleşmeyle en az 1 yıla indirilebilir. Zamanaşımı süresi tipik olarak ihlâlin meydana geldiği tarihte başlar; ihlâlin öğrenildiği tarihte değil. Ancak bazı eyaletler belirli talep türleri için 'keşif kuralı' (discovery rule) uygular. Zamanaşımını kısaltan sözleşme hükümleri, makul olmak koşuluyla çoğu eyalette geçerli kabul edilir."
    },
    {
      question: isEnglish ? "Are verbal contracts enforceable in the United States?" : "ABD'de sözlü (şifahî) sözleşmeler hukuken bağlayıcı mıdır?",
      answer: isEnglish
        ? "Verbal contracts are generally enforceable under US law, provided the standard elements of contract formation are present (offer, acceptance, consideration, capacity, legality). However, the Statute of Frauds requires certain categories of contracts to be in writing to be enforceable: real property transactions, agreements that cannot be performed within one year from their making, promises to pay another person's debt (suretyship), contracts for the sale of goods priced at $500 or more under UCC Section 2-201, and prenuptial agreements. Even for contracts not covered by the Statute of Frauds, the practical challenge of proving the terms of an oral agreement in court makes written contracts strongly preferable. Absent a writing, disputes reduce to competing testimonies about what was agreed."
        : "Sözlü sözleşmeler, sözleşme kurulmasının temel unsurları (icap, kabul, ivaz, ehliyet, hukuka uygunluk) mevcut olduğu sürece ABD hukukunda kural olarak bağlayıcıdır. Ancak Statute of Frauds kuralı, belirli sözleşme türlerinin geçerli olabilmesi için yazılı yapılmasını zorunlu kılar: gayrimenkul işlemleri, kurulduğu tarihten itibaren bir yıl içinde ifa edilemeyecek anlaşmalar, üçüncü kişinin borcunun garantisi (kefalet), UCC md. 2-201 kapsamında bedeli 500 dolar ve üzeri mal satışları ve evlilik öncesi mal rejimi sözleşmeleri. Statute of Frauds kapsamına girmeyen sözleşmelerde dahi, sözlü anlaşmanın şartlarını mahkemede ispat etmenin pratik güçlüğü yazılı sözleşmeyi kesinlikle tercih edilir kılmaktadır. Yazılı belge yokluğunda uyuşmazlıklar, nelerin kararlaştırıldığına ilişkin çelişen tanıklıklara dönüşür."
    },
    {
      question: isEnglish ? "What are liquidated damages and when are they enforceable?" : "Götürü tazminat (liquidated damages) nedir ve ne zaman geçerlidir?",
      answer: isEnglish
        ? "Liquidated damages are a pre-determined sum specified in the contract that becomes payable upon a particular breach. US courts enforce liquidated damages clauses when two conditions are satisfied: (1) actual damages arising from the breach would be difficult to calculate at the time of contracting, and (2) the stipulated amount represents a reasonable estimate of the anticipated or actual harm — not a penalty designed to punish the breaching party. If a court determines that the amount is grossly disproportionate to any conceivable loss, it will strike the clause as an unenforceable penalty. The reasonableness analysis may be applied at the time of contracting (majority rule) or at the time of breach (minority rule), depending on the jurisdiction. Liquidated damages provisions are common in construction contracts, software development agreements, and service-level agreements where delay or non-performance causes quantifiable but hard-to-prove harm."
        : "Götürü tazminat, sözleşmede belirli bir ihlâl hâlinde ödenmesi önceden kararlaştırılan sabit bir meblağdır. ABD mahkemeleri götürü tazminat hükümlerini iki koşulun birlikte gerçekleşmesi hâlinde geçerli sayar: (1) ihlâlden doğacak fiilî zararın sözleşmenin kurulduğu sırada hesaplanmasının güç olması ve (2) belirlenen tutarın beklenen veya fiilî zararın makul bir tahmini olması — ihlâl eden tarafı cezalandırmaya yönelik bir müeyyide niteliği taşımaması. Mahkeme, belirlenen meblağın tasavvur edilebilecek herhangi bir zarara oranla aşırı ölçüde yüksek olduğunu tespit ederse, hükmü uygulanamaz bir cezai şart olarak iptal eder. Makullük değerlendirmesi, yargı çevresine bağlı olarak sözleşmenin kurulduğu anda (çoğunluk görüşü) veya ihlâlin gerçekleştiği anda (azınlık görüşü) yapılabilir. Götürü tazminat hükümleri, gecikme veya ifa etmemenin ölçülebilir ancak ispatı güç zararlara yol açtığı inşaat sözleşmeleri, yazılım geliştirme anlaşmaları ve hizmet düzeyi sözleşmelerinde yaygındır."
    }
  ]

  const contractTypes = [
    {
      slug: 'nda',
      title: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
      desc: isEnglish
        ? 'Protects confidential information exchanged between parties. Defines what constitutes confidential information, permitted disclosures, duration of obligations, and remedies for breach. Essential before discussing business ideas, proprietary processes, client lists, or financial data. Mutual NDAs provide reciprocal protection; unilateral NDAs protect only the disclosing party.'
        : 'Taraflar arasında paylaşılan gizli bilgilerin korunmasını düzenler. Gizli bilginin tanımını, izin verilen açıklamaları, yükümlülük süresini ve ihlâl hâlinde başvurulacak yolları belirler. İş fikirleri, ticari sır niteliğindeki süreçler, müşteri listeleri veya finansal veriler paylaşılmadan önce imzalanmalıdır. Karşılıklı NDA her iki tarafı korurken, tek taraflı NDA yalnızca bilgiyi açıklayan tarafı korur.'
    },
    {
      slug: 'service-agreement',
      title: isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi',
      desc: isEnglish
        ? 'Defines the scope, deliverables, payment terms, timeline, and general conditions for providing professional services. Serves as the legal foundation of client-provider relationships. Should address acceptance criteria, revision limits, expense reimbursement, and what happens when the scope changes. Industry-specific variations exist for consulting, marketing, design, and technology services.'
        : 'Sunulacak profesyonel hizmetin kapsamını, teslim edilecek çıktıları, ödeme koşullarını, takvimini ve genel şartlarını düzenler. Müşteri ile hizmet sağlayıcı arasındaki ilişkinin hukuki temelini oluşturur. Kabul kriterleri, revizyon sınırları, masraf iadesi ve kapsam değişikliği hâlinde izlenecek prosedür açıkça ele alınmalıdır. Danışmanlık, pazarlama, tasarım ve teknoloji hizmetleri için sektöre özgü varyasyonlar mevcuttur.'
    },
    {
      slug: 'independent-contractor',
      title: isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi',
      desc: isEnglish
        ? 'Establishes a non-employment relationship for hiring contractors. Critical for proper worker classification — misclassification can trigger IRS penalties, back taxes, and state labor law violations. Must address the contractor\'s control over methods and schedule, provision of own tools, ability to work for other clients, and absence of employee benefits. Should include clear IP assignment provisions and tax identification requirements (W-9 or W-8BEN).'
        : 'İstihdam ilişkisi dışında yüklenici olarak hizmet alımını düzenler. İşçi sınıflandırmasının doğru yapılması kritik öneme sahiptir; yanlış sınıflandırma IRS cezalarına, geriye dönük vergi yükümlülüklerine ve eyalet iş hukuku ihlâllerine yol açabilir. Yüklenicinin iş yapma yöntemini ve çalışma takvimini belirleme serbestisi, kendi araç gereçlerini kullanması, başka müşterilerle çalışabilmesi ve çalışan haklarından yararlanmaması açıkça düzenlenmelidir. Fikri mülkiyet devri hükümleri ve vergi kimlik belgesi (W-9 veya W-8BEN) gereklilikleri de sözleşmede yer almalıdır.'
    },
    {
      slug: 'freelance-agreement',
      title: isEnglish ? 'Freelance Service Agreement' : 'Serbest Çalışan Hizmet Sözleşmesi',
      desc: isEnglish
        ? 'Tailored for freelance professionals providing project-based services. Covers project scope and milestones, revision rights and limits, payment schedules (deposits, milestone payments, final payment), and ownership of work product. Note: New York City\'s Freelance Isn\'t Free Act requires written contracts for engagements valued at $800 or more and mandates timely payment. Similar legislation exists or is pending in other jurisdictions.'
        : 'Proje bazlı hizmet sunan serbest çalışan profesyoneller için özel olarak düzenlenmiştir. Proje kapsamı ve aşamalarını, revizyon haklarını ve sınırlarını, ödeme takvimini (avans, ara ödemeler, nihai ödeme) ve ortaya çıkan eserin mülkiyetini kapsar. Not: New York City\'nin Freelance Isn\'t Free Act düzenlemesi, tutarı 800 dolar ve üzeri işlerde yazılı sözleşme yapılmasını ve ödemenin zamanında yapılmasını zorunlu kılar. Benzer düzenlemeler başka yargı çevrelerinde de yürürlüktedir veya yasalaşma aşamasındadır.'
    },
    {
      slug: 'influencer-agreement',
      title: isEnglish ? 'Influencer Agreement' : 'Influencer Sözleşmesi',
      desc: isEnglish
        ? 'Governs brand collaborations, sponsored content, and social media partnerships. Addresses FTC disclosure requirements (endorsement guidelines), content approval workflows, usage rights and licensing of created content, exclusivity periods, performance metrics, and payment structures (flat fee, per-post, affiliate commission). Must ensure compliance with platform-specific advertising policies.'
        : 'Marka iş birlikleri, sponsorlu içerik üretimi ve sosyal medya ortaklıklarını düzenler. FTC bilgilendirme yükümlülüklerini (reklam beyanı kuralları), içerik onay süreçlerini, üretilen içeriğin kullanım hakları ve lisansını, münhasırlık dönemini, performans ölçütlerini ve ödeme yapısını (sabit ücret, gönderi başına ücret, bağlı kuruluş komisyonu) kapsar. Platform bazında geçerli reklam politikalarına uyum sağlanması zorunludur.'
    },
    {
      slug: 'employment-agreement',
      title: isEnglish ? 'Employment Agreement' : 'İş Sözleşmesi (Employment Agreement)',
      desc: isEnglish
        ? 'Formalizes the employer-employee relationship. Covers position and duties, compensation and benefits, work schedule, at-will or fixed-term employment status, confidentiality obligations, non-compete and non-solicitation covenants, and termination conditions. US employment is generally "at-will" (either party can terminate at any time for any lawful reason), but contractual terms can modify this default. Must comply with federal (FLSA, Title VII) and applicable state employment laws.'
        : 'İşveren ile çalışan arasındaki iş ilişkisini resmi olarak düzenler. Pozisyon ve görev tanımını, ücret ve yan hakları, çalışma düzenini, belirsiz veya belirli süreli istihdam statüsünü, gizlilik yükümlülüklerini, rekabet yasağı ve müşteri ayartmama taahhütlerini ve fesih koşullarını kapsar. ABD\'de iş ilişkisi kural olarak "at-will" niteliktedir (her iki taraf herhangi bir hukuka uygun sebeple ilişkiyi sonlandırabilir); ancak sözleşme hükümleriyle bu kural değiştirilebilir. Federal düzenlemelere (FLSA, Title VII) ve uygulanabilir eyalet iş hukukuna uyum zorunludur.'
    },
    {
      slug: 'partnership-operating-agreement',
      title: isEnglish ? 'Partnership / Operating Agreement' : 'Ortaklık / Operating Agreement',
      desc: isEnglish
        ? 'Defines the internal governance structure of a partnership or LLC. Covers ownership percentages, capital contributions, profit and loss allocation, management authority, voting rights, transfer restrictions, buy-sell provisions, and dissolution procedures. For LLCs, the Operating Agreement is the single most important governance document — it determines member rights, manager authority, and procedures for major decisions. Without one, default state law provisions apply, which may not align with the parties\' intentions.'
        : 'Bir ortaklığın veya LLC\'nin iç yönetim yapısını belirler. Ortaklık paylarını, sermaye katkılarını, kâr ve zarar dağılımını, yönetim yetkisini, oy haklarını, pay devir kısıtlamalarını, alım-satım hükümlerini ve tasfiye usullerini düzenler. LLC\'ler açısından Operating Agreement en temel yönetim belgesidir; üye hakları, yönetici yetkileri ve kritik kararlar için izlenecek prosedürler bu belgeyle şekillenir. Operating Agreement bulunmadığında eyaletin varsayılan hükümleri uygulanır; bu hükümler tarafların gerçek iradesiyle örtüşmeyebilir.'
    },
    {
      slug: 'licensing-agreement',
      title: isEnglish ? 'Licensing Agreement' : 'Lisans Sözleşmesi',
      desc: isEnglish
        ? 'Grants permission to use intellectual property (trademarks, patents, copyrights, software, trade secrets) under defined conditions. Specifies whether the license is exclusive or non-exclusive, the territory and duration, permitted uses, sublicensing rights, royalty structure, quality control standards, and conditions for termination. Distinct from an IP assignment, which transfers ownership entirely. For software, distinguishes between SaaS licenses, perpetual licenses, and open-source license compliance.'
        : 'Fikri mülkiyet haklarının (marka, patent, telif, yazılım, ticari sır) belirli koşullar altında kullanımına izin verir. Lisansın münhasır veya münhasır olmayan niteliğini, geçerli olduğu bölge ve süreyi, izin verilen kullanım biçimlerini, alt lisans haklarını, lisans bedeli yapısını, kalite kontrol standartlarını ve sona erme koşullarını belirler. Mülkiyetin tamamen devredildiği fikri mülkiyet devir sözleşmesinden farklıdır. Yazılım lisanslarında SaaS lisansı, süresiz lisans ve açık kaynak lisans uyumluluğu ayrımları önem taşır.'
    }
  ]

  const relatedPages = [
    { slug: 'abdde-llc-kurmak', title: isEnglish ? 'Forming an LLC in the US' : "ABD'de LLC Kurmak" },
    { slug: 'irs-vergi-gercekleri', title: isEnglish ? 'IRS Tax Realities' : 'IRS Vergi Gerçekleri' },
    { slug: 'ny-law-neden-tercih-edilir', title: isEnglish ? 'Why Choose New York Law' : 'New York Hukuku Neden Tercih Edilir' },
    { slug: 'llc-mi-corp-mu', title: isEnglish ? 'LLC vs Corporation' : 'LLC mi Corp mu?' },
    { slug: 'abdde-banka-hesabi', title: isEnglish ? 'US Bank Account' : "ABD'de Banka Hesabı" },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
        <JsonLdScript data={[articleSchema, breadcrumbSchema]} />
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'Contracts for US Business' : "ABD'de Ticari Faaliyet İçin Sözleşmeler" }
          ]}
        />

        <TrustStrip lang={lang} />

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          {isEnglish ? 'Jurisdiction: United States / New York' : 'Kapsam: ABD / New York'}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {isEnglish ? "Contracts for Doing Business in the US" : "ABD'de Ticari Faaliyet İçin Gerekli Sözleşmeler"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {isEnglish ? 'Last verified: January 2026' : 'Son doğrulama: Ocak 2026'}
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
              ? "Written contracts are the primary evidence of commercial relationships under US law — verbal agreements are difficult to prove and certain transactions require writing."
              : "Yazılı sözleşmeler, ABD hukukunda ticari ilişkilerin birincil ispat aracıdır; sözlü anlaşmaların ispatı güçtür ve belirli işlemler için yazılı şekil zorunludur."}</li>
            <li>• {isEnglish
              ? "A governing law clause determines which state's substantive law interprets the contract — New York and Delaware are common choices."
              : "Uygulanacak hukuk maddesi, sözleşmenin hangi eyaletin maddi hukukuna göre yorumlanacağını belirler — New York ve Delaware en yaygın tercihlerdir."}</li>
            <li>• {isEnglish
              ? "Worker classification (employee vs. contractor) carries significant tax, liability, and compliance implications."
              : "İşçi sınıflandırmasının (çalışan mı, bağımsız yüklenici mi) vergi, sorumluluk ve uyum açısından ciddi sonuçları vardır."}</li>
            <li>• {isEnglish
              ? "For cross-border contracts, arbitration clauses enable enforcement under the New York Convention across 170+ countries."
              : "Sınır ötesi sözleşmelerde tahkim şartı, New York Sözleşmesi kapsamında 170'ten fazla ülkede kararın tenfizini mümkün kılar."}</li>
            <li>• {isEnglish
              ? "Red-flag clauses (unlimited indemnification, vague IP assignment, one-sided termination) can expose a party to disproportionate risk."
              : "Tehlikeli hükümler (sınırsız tazmin yükümlülüğü, belirsiz fikri mülkiyet devri, tek taraflı fesih hakkı) bir tarafı orantısız riske maruz bırakabilir."}</li>
            <li>• {isEnglish
              ? "Electronic signatures are legally valid for most US commercial contracts under ESIGN and UETA."
              : "Elektronik imzalar, ESIGN ve UETA kapsamında ABD ticari sözleşmelerinin büyük çoğunluğunda hukuken geçerlidir."}</li>
          </ul>
        </section>

        {/* CTA - Above fold */}
        <KitCallout lang={lang} variant="compact" />

        {/* Contract Enforceability in the US */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Contract Enforceability in the US' : "ABD'de Sözleşmenin Geçerliliği ve Bağlayıcılığı"}
          </h2>

          <p className="text-gray-600 mb-6">
            {isEnglish
              ? "US contract law is predominantly state law, derived from common-law principles and, for the sale of goods, the Uniform Commercial Code (UCC). Before examining specific contract types, it is essential to understand the five elements that must coexist for a contract to be valid and enforceable."
              : "ABD sözleşme hukuku ağırlıklı olarak eyalet hukukuna dayanır; temel ilkeler common law'dan, mal satışına ilişkin kurallar ise Tekdüzen Ticaret Kanunu'ndan (UCC) türetilir. Belirli sözleşme türlerini incelemeden önce, bir sözleşmenin geçerli ve bağlayıcı olabilmesi için bir arada bulunması gereken beş unsuru kavramak zorunludur."}
          </p>

          <div className="space-y-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">{isEnglish ? '1. Offer (İcap)' : '1. İcap (Offer)'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "A clear, definite proposal communicated to the offeree, demonstrating the offeror's willingness to be bound upon acceptance. The offer must contain sufficiently definite terms — at minimum, the parties, subject matter, and consideration. Advertisements and price lists are generally treated as invitations to negotiate, not binding offers, unless they contain specific, limiting language (e.g., 'first come, first served' with a stated quantity). An offer can be revoked at any time before acceptance, unless supported by separate consideration (an option contract) or made irrevocable by statute (UCC firm offer rule for merchants, Section 2-205)."
                  : "Muhataba iletilen, icapcının kabul hâlinde bağlanma iradesini ortaya koyan açık ve kesin bir öneridir. İcap yeterince belirli şartları içermelidir — en azından taraflar, konu ve karşılık. Reklamlar ve fiyat listeleri, belirli ve sınırlayıcı ifadeler içermedikçe ('ilk gelen alır' gibi, belirli miktarla sınırlı) kural olarak müzakereye davet sayılır, bağlayıcı icap değildir. İcap, ayrı bir karşılıkla desteklenmedikçe (opsiyon sözleşmesi) veya kanunla geri alınamaz kılınmadıkça (UCC md. 2-205 kapsamında tacirler için kesin icap kuralı) kabul öncesinde her zaman geri alınabilir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">{isEnglish ? '2. Acceptance (Kabul)' : '2. Kabul (Acceptance)'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "An unconditional assent to the terms of the offer. Under the common-law 'mirror image rule,' any material alteration to the terms constitutes a counteroffer, not an acceptance — the original offer is thereby rejected. The UCC relaxes this rule for transactions between merchants: under Section 2-207, a definite expression of acceptance operates as an acceptance even if it contains additional or different terms, unless acceptance is expressly conditioned on assent to the new terms. Acceptance must be communicated through the method specified in the offer; if none is specified, any reasonable method suffices."
                  : "İcabın şartlarına koşulsuz olarak verilen onay beyanıdır. Common law'daki 'ayna kuralı' (mirror image rule) uyarınca, şartlarda yapılan her esaslı değişiklik kabul değil karşı icap niteliği taşır ve asıl icap reddedilmiş sayılır. UCC, tacirler arası işlemlerde bu kuralı esnetir: md. 2-207 uyarınca kesin bir kabul beyanı, ek veya farklı şartlar içerse dahi, kabul açıkça yeni şartlara rıza koşuluna bağlanmadıkça kabul olarak hüküm doğurur. Kabul, icapta belirlenen yöntemle bildirilmelidir; bir yöntem belirlenmemişse herhangi bir makul yöntem yeterlidir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">{isEnglish ? '3. Consideration (Karşılık / İvaz)' : '3. Karşılık / İvaz (Consideration)'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "A bargained-for exchange of value between the parties — a promise for a promise, a promise for an act, or a promise for forbearance. Each party must incur a legal detriment or confer a legal benefit. Past consideration (a benefit already conferred before the promise was made) does not satisfy this requirement. Nominal consideration ($1 in exchange for an option) is generally sufficient. Without consideration, an agreement is typically unenforceable, with limited exceptions: promissory estoppel (detrimental reliance), charitable pledges, and modification of existing contracts under the UCC (Section 2-209, which does not require consideration for good-faith modifications)."
                  : "Taraflar arasında karşılıklı olarak pazarlık edilen bir değer değişimidir — taahhüde karşı taahhüt, taahhüde karşı edim veya taahhüde karşı bir haktan feragat. Her iki tarafın da hukuki bir yükümlülük üstlenmesi veya hukuki bir menfaat sağlaması gerekir. Geçmiş edim (taahhütten önce zaten sağlanmış olan fayda) bu unsuru karşılamaz. Sembolik karşılık (bir opsiyon için 1 dolar) genel olarak yeterli kabul edilir. Karşılık bulunmaksızın yapılan bir anlaşma kural olarak bağlayıcı değildir; sınırlı istisnalar mevcuttur: estoppel (güven ilkesi), hayır vaatleri ve UCC kapsamında mevcut sözleşmelerin değiştirilmesi (md. 2-209, iyi niyetli değişiklikler için karşılık aramaz)."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">{isEnglish ? '4. Capacity (Ehliyet)' : '4. Ehliyet (Capacity)'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Parties must possess legal capacity to enter into a binding agreement. Minors (under 18 in most states), individuals adjudicated mentally incompetent, and persons under the influence of substances to the degree they cannot understand the transaction may lack capacity. Contracts entered into by parties lacking capacity are generally voidable (not void) — the incapacitated party may choose to affirm or disaffirm. For business entities, the individual executing the contract must have actual or apparent authority to bind the organization; absent such authority, the entity may not be bound."
                  : "Tarafların bağlayıcı bir sözleşme yapma ehliyetine sahip olması gerekir. Küçükler (çoğu eyalette 18 yaş altı), mahkemece akıl sağlığı yetersiz bulunan kişiler ve işlemin niteliğini kavrayamayacak derecede madde etkisinde olan kişiler ehliyetsiz sayılabilir. Ehliyetsiz kişilerin yaptığı sözleşmeler genel olarak iptal edilebilir (butlan değil) niteliktedir — ehliyetsiz taraf sözleşmeyi onaylama veya iptal etme seçeneğine sahiptir. Tüzel kişiler bakımından, sözleşmeyi imzalayan gerçek kişinin kuruluşu bağlayacak fiilî veya görünürde yetkiye sahip olması gerekir; bu yetki bulunmadığında tüzel kişi bağlanmayabilir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold mb-2">{isEnglish ? '5. Legality (Hukuka Uygunluk)' : '5. Hukuka Uygunluk (Legality)'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "The contract's subject matter and purpose must be lawful. Agreements to commit crimes, engage in fraud, restrain trade unreasonably, or violate public policy are void ab initio and confer no enforceable rights on either party. Where illegality affects only a severable portion of the contract and a valid severability clause exists, the remaining provisions may survive. Courts in some jurisdictions will reform rather than void an overly broad restrictive covenant."
                  : "Sözleşmenin konusu ve amacı hukuka uygun olmalıdır. Suç işlemeye, dolandırıcılığa, ticareti makul olmayan biçimde kısıtlamaya veya kamu düzenini ihlâle yönelik anlaşmalar baştan itibaren geçersiz (batıl) olup hiçbir tarafa uygulanabilir hak sağlamaz. Hukuka aykırılık sözleşmenin yalnızca ayrılabilir bir bölümünü etkiliyorsa ve geçerli bir bölünebilirlik maddesi mevcutsa, kalan hükümler geçerliliğini koruyabilir. Bazı yargı çevrelerindeki mahkemeler, aşırı geniş kısıtlayıcı hükümleri tamamen geçersiz saymak yerine daraltma yoluyla yeniden düzenler."}
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold mb-3">
            {isEnglish ? 'The Parol Evidence Rule' : 'Parol Evidence Kuralı (Sözlü Kanıt Yasağı)'}
          </h3>
          <p className="text-gray-600 mb-4">
            {isEnglish
              ? "Where parties have reduced their agreement to a final, integrated written document, the parol evidence rule bars the introduction of prior or contemporaneous oral or written statements to contradict its terms. A well-drafted 'entire agreement' or 'merger' clause reinforces this protection by declaring that the written contract supersedes all prior negotiations, understandings, and agreements. Exceptions permit parol evidence to show fraud, duress, mutual mistake, ambiguity requiring clarification, or the existence of a condition precedent. The practical implication is significant: once you sign a comprehensive written contract, earlier email exchanges, verbal promises, or draft term sheets will generally be inadmissible to alter the contract's meaning."
              : "Taraflar anlaşmalarını nihai ve bütünleşik bir yazılı belgeye dönüştürdüğünde, parol evidence kuralı sözleşme hükümlerine aykırı düşen önceki veya eşzamanlı sözlü ya da yazılı beyanların kanıt olarak ileri sürülmesini engeller. İyi hazırlanmış bir 'bütünlük maddesi' (entire agreement / merger clause), yazılı sözleşmenin önceki tüm müzakereleri, mutabakatları ve anlaşmaları geçersiz kıldığını beyan ederek bu korumayı pekiştirir. İstisnalar, hile, zorlama, karşılıklı yanılma, açıklama gerektiren belirsizlik veya geciktirici koşulun varlığının ispatına olanak tanır. Pratik sonucu önemlidir: kapsamlı bir yazılı sözleşme imzaladığınızda, önceki e-posta yazışmaları, sözlü vaatler veya taslak şart sayfaları sözleşmenin anlamını değiştirmek amacıyla kural olarak delil olarak kabul edilmez."}
          </p>

          <p className="text-gray-600">
            {isEnglish
              ? <>These enforceability principles apply to every contract type discussed on this page. Whether you are executing an <Link href={`/${lang}/contracts/nda`} className="text-[#C9A227] underline hover:text-[#B8922A]">NDA</Link>, a <Link href={`/${lang}/contracts/service-agreement`} className="text-[#C9A227] underline hover:text-[#B8922A]">Service Agreement</Link>, or an <Link href={`/${lang}/contracts/independent-contractor`} className="text-[#C9A227] underline hover:text-[#B8922A]">Independent Contractor Agreement</Link>, the same foundational requirements govern whether the agreement will be upheld in court. For entity-related contracts, note that when you <Link href={`/${lang}/amerika/abdde-llc-kurmak`} className="text-[#C9A227] underline hover:text-[#B8922A]">form an LLC in the US</Link>, the operating agreement is itself a contract among members subject to these same rules.</>
              : <>Bu bağlayıcılık ilkeleri, bu sayfada ele alınan tüm sözleşme türleri için geçerlidir. İster bir <Link href={`/${lang}/contracts/nda`} className="text-[#C9A227] underline hover:text-[#B8922A]">NDA</Link>, ister bir <Link href={`/${lang}/contracts/service-agreement`} className="text-[#C9A227] underline hover:text-[#B8922A]">Hizmet Sözleşmesi</Link>, ister bir <Link href={`/${lang}/contracts/independent-contractor`} className="text-[#C9A227] underline hover:text-[#B8922A]">Bağımsız Yüklenici Sözleşmesi</Link> imzalıyor olun, anlaşmanın mahkemede ayakta kalıp kalmayacağını aynı temel gereklilikler belirler. Kurumsal sözleşmeler açısından, <Link href={`/${lang}/amerika/abdde-llc-kurmak`} className="text-[#C9A227] underline hover:text-[#B8922A]">ABD&apos;de LLC kurduğunuzda</Link> işletme sözleşmesinin (operating agreement) üyeler arasında aynı kurallara tâbi bir sözleşme niteliği taşıdığını unutmayın.</>}
          </p>
        </section>

        {/* Why Written Contracts Matter */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Why Written Contracts Matter' : 'Yazılı Sözleşmeler Neden Vazgeçilmezdir'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "US contract law generally does not require a written instrument for a valid agreement — oral contracts can be enforceable. However, the practical reality of commercial litigation makes written contracts indispensable for three reasons."
                : "ABD sözleşme hukuku, kural olarak geçerli bir anlaşma için yazılı belge aramaz; sözlü sözleşmeler de hukuken bağlayıcı olabilir. Ancak ticari uyuşmazlıkların pratik gerçekliği, yazılı sözleşmeyi üç temel nedenle vazgeçilmez kılmaktadır."}
            </p>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Enforceability and the Statute of Frauds' : 'Bağlayıcılık ve Statute of Frauds Kuralı'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "The Statute of Frauds, codified in every US state, requires certain categories of contracts to be in writing to be enforceable: agreements that cannot be performed within one year, contracts for the sale of land, promises to pay another person's debt, and sale of goods exceeding $500 under UCC Article 2. A contract falling within these categories without a signed writing is voidable by the party against whom enforcement is sought. Beyond these statutory requirements, many courts view the absence of a written agreement as evidence that no binding contract exists."
                  : "ABD'nin tüm eyaletlerinde düzenlenen Statute of Frauds kuralı, belirli sözleşme türlerinin geçerli olabilmesi için yazılı yapılmasını şart koşar: bir yıl içinde ifa edilemeyecek sözleşmeler, taşınmaz satışına ilişkin anlaşmalar, üçüncü kişinin borcunu üstlenme taahhütleri ve UCC Madde 2 kapsamında tutarı 500 doları aşan mal satış sözleşmeleri. Bu kategorilere giren bir sözleşme imzalı yazılı belge olmaksızın yapıldığında, aleyhine ileri sürülen tarafça iptal edilebilir nitelik taşır. Kanuni zorunluluğun ötesinde, birçok mahkeme yazılı sözleşme bulunmamasını bağlayıcı bir anlaşmanın mevcut olmadığının delili olarak değerlendirmektedir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Evidentiary Value' : 'İspat Değeri'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "In litigation and arbitration, a well-drafted written contract is the most reliable evidence of the parties' intent. The parol evidence rule — a fundamental doctrine of US contract law — generally excludes prior or contemporaneous oral statements from contradicting the terms of a fully integrated written agreement. This means the written document becomes the definitive record of the deal. Without it, disputes reduce to credibility contests over who said what, with unpredictable outcomes."
                  : "Yargılama veya tahkim sürecinde, özenle hazırlanmış yazılı sözleşme tarafların iradesinin en güvenilir kanıtıdır. ABD sözleşme hukukunun temel ilkelerinden olan parol evidence rule (sözlü kanıt yasağı), tam entegre bir yazılı sözleşmenin hükümlerinin, önceki veya eşzamanlı sözlü beyanlarla çeliştirilmesini kural olarak engeller. Bu ilke uyarınca yazılı belge, anlaşmanın kesin kaydı hâline gelir. Yazılı sözleşme bulunmadığında uyuşmazlıklar 'kim ne dedi' tartışmasına dönüşür ve sonuçlar öngörülemez hâl alır."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Dispute Prevention and Resolution' : 'Uyuşmazlık Önleme ve Çözüm'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Written contracts prevent disputes before they arise by establishing clear expectations. A comprehensive contract addresses foreseeable contingencies: what happens if a deadline is missed, how scope changes are handled, which party bears specific risks, and how the relationship ends. When disputes do arise, forum selection and arbitration clauses channel them to predetermined venues with predictable procedures. For cross-border relationships, these clauses are particularly valuable — they eliminate preliminary jurisdictional battles that can consume months and significant legal fees."
                  : "Yazılı sözleşmeler, açık beklentiler ortaya koyarak uyuşmazlıkları doğmadan önler. Kapsamlı bir sözleşme, öngörülebilir olasılıkları düzenler: bir sürenin kaçırılması hâlinde ne olacağı, kapsam değişikliklerinin nasıl yönetileceği, hangi risklerin hangi tarafa ait olduğu ve ilişkinin nasıl sona ereceği. Uyuşmazlık yine de çıktığında, yetki şartı ve tahkim maddeleri onu önceden belirlenmiş bir mercie ve öngörülebilir usul kurallarına yönlendirir. Sınır ötesi ilişkilerde bu hükümler özellikle değerlidir; aylarca sürebilecek ve ciddi avukatlık masraflarına yol açabilecek yetki uyuşmazlıklarını baştan ortadan kaldırır."}
              </p>
            </div>
          </div>
        </section>

        {/* Complete Contract Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Contract Types for US Business Operations' : 'ABD Ticari Faaliyetleri İçin Sözleşme Türleri'}
          </h2>

          <p className="text-gray-600 mb-6">
            {isEnglish
              ? "The following contract types cover the most common commercial relationships encountered by businesses operating in or with the United States. Each type serves a distinct function; in practice, a single business relationship may require several of these agreements working in combination."
              : "Aşağıdaki sözleşme türleri, ABD'de veya ABD ile ticari faaliyet yürüten işletmelerin en sık karşılaştığı ilişki biçimlerini kapsar. Her tür farklı bir işlev üstlenir; uygulamada tek bir ticari ilişki, bu sözleşmelerin birkaçının bir arada kullanılmasını gerektirebilir."}
          </p>

          <div className="space-y-4">
            {contractTypes.map(contract => (
              <Link
                key={contract.slug}
                href={`/${lang}/contracts/${contract.slug}`}
                className="block p-6 border border-gray-200 rounded-lg hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{contract.title}</h3>
                    <p className="text-sm text-gray-600">{contract.desc}</p>
                  </div>
                  <span className="text-[#C9A227] text-xl">→</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href={`/${lang}/contracts`}
              className="inline-block px-6 py-3 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              {isEnglish ? 'View All Contract Templates' : 'Tüm Sözleşme Şablonlarını Görüntüle'} →
            </Link>
          </div>
        </section>

        {/* Red Flags and Dangerous Clauses */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Red Flags and Dangerous Clauses' : 'Tehlikeli Hükümler ve Dikkat Edilmesi Gereken Maddeler'}
          </h2>

          <p className="text-gray-600 mb-6">
            {isEnglish
              ? "Certain contract provisions can create disproportionate exposure for one party. When reviewing any contract — particularly one drafted by the counterparty — watch for the following patterns."
              : "Belirli sözleşme hükümleri, taraflardan birini orantısız bir riske maruz bırakabilir. Herhangi bir sözleşmeyi incelerken — özellikle karşı tarafın hazırladığı metinlerde — aşağıdaki düzenlemelere dikkat edilmelidir."}
          </p>

          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'Unlimited Indemnification' : 'Sınırsız Tazmin Yükümlülüğü'}
              </h3>
              <p className="text-sm text-red-800">
                {isEnglish
                  ? "An indemnification clause without a cap exposes the indemnifying party to unlimited financial liability. In balanced commercial contracts, indemnification is typically limited to the total contract value or a multiple thereof, with carve-outs for gross negligence, willful misconduct, or IP infringement. An obligation to indemnify against 'any and all claims, losses, and damages' without limitation is a significant red flag. Negotiate a cap, or at minimum ensure the scope is narrowed to claims arising directly from your breach."
                  : "Üst sınır içermeyen bir tazmin maddesi, tazmin eden tarafı sınırsız mali sorumluluğa maruz bırakır. Dengeli ticari sözleşmelerde tazmin yükümlülüğü genellikle toplam sözleşme bedeli veya bunun belirli bir katı ile sınırlandırılır; ağır ihmal, kasıt veya fikri mülkiyet ihlâli gibi hâller bu sınırlamanın dışında tutulabilir. 'Her türlü talep, kayıp ve zararı' herhangi bir sınır olmaksızın tazmin etmeyi öngören bir hüküm ciddi bir risk göstergesidir. Bir üst sınır müzakere edin veya en azından kapsamın yalnızca kendi ihlâlinizden doğrudan kaynaklanan taleplerle daraltılmasını sağlayın."}
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'Unreasonable Non-Compete Restrictions' : 'Orantısız Rekabet Yasağı Kayıtları'}
              </h3>
              <p className="text-sm text-red-800">
                {isEnglish
                  ? "Non-compete clauses must be reasonable in scope, duration, and geographic area to be enforceable. A non-compete that prohibits all competitive activity globally for five years is almost certainly unenforceable in most US states. Recent trends favor narrowing enforcement: the FTC proposed a broad ban on non-competes for employees (currently challenged in court), and states like California, Oklahoma, and North Dakota largely prohibit them. Even where enforceable, courts apply a reasonableness test. Ensure any non-compete is limited to a specific industry, a defined territory, and a proportionate duration (typically 6-24 months)."
                  : "Rekabet yasağı maddeleri, kapsam, süre ve coğrafi alan bakımından makul olmalıdır; aksi hâlde uygulanabilirlik kazanamazlar. Dünya genelinde beş yıl boyunca her türlü rekabetçi faaliyeti yasaklayan bir hüküm, ABD eyaletlerinin büyük çoğunluğunda geçersiz kabul edilir. Güncel eğilimler, uygulamanın daraltılması yönündedir: FTC çalışanlar için geniş kapsamlı bir rekabet yasağı yasağı önermiş (hâlihazırda mahkemede tartışılmaktadır) ve California, Oklahoma, North Dakota gibi eyaletler rekabet yasağını büyük ölçüde yasaklamıştır. Uygulanabilir olduğu eyaletlerde dahi mahkemeler makullük testi uygular. Rekabet yasağının belirli bir sektörle, tanımlı bir bölgeyle ve orantılı bir süreyle (genellikle 6-24 ay) sınırlı tutulmasını sağlayın."}
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'One-Sided Termination Rights' : 'Tek Taraflı Fesih Hakkı'}
              </h3>
              <p className="text-sm text-red-800">
                {isEnglish
                  ? "A clause that allows one party to terminate at any time without cause while binding the other party to the full term creates a fundamental imbalance. Balanced contracts provide symmetric termination rights: both parties should have the ability to terminate for convenience (with reasonable notice, typically 30-90 days) or for cause (material breach with a cure period). Watch also for termination provisions that eliminate the right to payment for work already performed."
                  : "Bir tarafa sebep göstermeksizin dilediği zaman fesih hakkı tanırken diğer tarafı sözleşme süresinin tamamına bağlayan hüküm, temel bir dengesizlik yaratır. Dengeli sözleşmelerde fesih hakkı simetrik olmalıdır: her iki taraf da kolaylık feshi (makul bir bildirim süresiyle, genellikle 30-90 gün) veya haklı sebeple fesih (esaslı ihlâl ve giderim süresi öngörülerek) hakkına sahip olmalıdır. Fesih hâlinde, halihazırda ifa edilmiş işlerin bedelini alma hakkını ortadan kaldıran hükümlere de ayrıca dikkat edin."}
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'Vague or Overbroad IP Assignment' : 'Belirsiz veya Aşırı Geniş Fikri Mülkiyet Devri'}
              </h3>
              <p className="text-sm text-red-800">
                {isEnglish
                  ? "An IP clause that assigns 'all intellectual property created during the term of this agreement' without distinguishing between project-specific deliverables and pre-existing IP can strip a service provider of their core business assets. Proper IP provisions should clearly identify: (a) pre-existing IP that remains with its owner; (b) project deliverables that transfer to the client upon full payment; (c) licenses granted for background IP incorporated into deliverables; and (d) residual knowledge rights that allow the provider to use general skills and knowledge gained during the engagement."
                  : "Önceden mevcut fikri mülkiyet ile projeye özgü çıktıları birbirinden ayırmadan 'sözleşme süresi boyunca üretilen tüm fikri mülkiyeti' devreden bir madde, hizmet sağlayıcıyı temel iş varlıklarından yoksun bırakabilir. Doğru düzenlenmiş bir fikri mülkiyet hükmü şunları açıkça belirlemelidir: (a) sahibinde kalan mevcut fikri mülkiyet; (b) ödemenin tamamlanması üzerine müşteriye devredilen proje çıktıları; (c) çıktılara dahil edilen arka plan fikri mülkiyeti için verilen lisanslar; (d) hizmet sağlayıcının çalışma sürecinde edindiği genel beceri ve bilgiyi kullanma hakkı (residual knowledge rights)."}
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'Automatic Renewal Traps' : 'Otomatik Yenileme Tuzakları'}
              </h3>
              <p className="text-sm text-red-800">
                {isEnglish
                  ? "Automatic renewal (evergreen) clauses silently extend the contract for successive terms unless one party provides advance notice of non-renewal. The risk: a narrow notice window (e.g., 'written notice of non-renewal must be given no earlier than 90 and no later than 60 days before the renewal date') can lock a party into an unwanted renewal if the deadline is missed by even one day. Review the notice period carefully, calendar the opt-out date, and negotiate broader windows or shorter renewal terms where possible."
                  : "Otomatik yenileme (evergreen) maddeleri, taraflardan biri belirli süre öncesinde bildirimde bulunmadıkça sözleşmeyi ardışık dönemler için sessizce uzatır. Risk şudur: dar bir bildirim penceresi (örneğin 'yenileme tarihinden en erken 90, en geç 60 gün önce yazılı bildirim yapılmalıdır') bir günlük gecikmeyle dahi tarafı istenmeyen bir yenilemeye bağlayabilir. Bildirim süresini dikkatle inceleyin, çıkış tarihini takviminize kaydedin ve mümkünse daha geniş bildirim pencereleri veya daha kısa yenileme süreleri müzakere edin."}
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'Unilateral Modification Clauses' : 'Tek Taraflı Değişiklik Hükümleri'}
              </h3>
              <p className="text-sm text-red-800">
                {isEnglish
                  ? "Clauses that permit one party to amend material terms — pricing, scope, service levels, or obligations — without the other party's written consent. In a negotiated commercial contract, amendments should require mutual written agreement. A provision stating 'Company reserves the right to modify these terms at any time' is common in consumer click-wrap agreements but is a significant red flag in B2B contracts where both parties have bargaining power. Such clauses effectively render the contract illusory — if one party can change its obligations at will, the other party's consideration may be undermined. Negotiate for mutual consent requirements or, at minimum, notice-and-opt-out mechanics."
                  : "Bir tarafın karşı tarafın yazılı onayı olmaksızın fiyat, kapsam, hizmet düzeyi veya yükümlülük gibi esaslı şartları değiştirmesine olanak tanıyan maddelerdir. Müzakere edilen ticari sözleşmelerde değişiklikler karşılıklı yazılı mutabakat gerektirmelidir. 'Şirket bu şartları herhangi bir zamanda değiştirme hakkını saklı tutar' şeklindeki hüküm, tüketici tıkla-kabul et sözleşmelerinde yaygın olmakla birlikte, her iki tarafın müzakere gücüne sahip olduğu B2B sözleşmelerde ciddi bir tehlike işaretidir. Bu tür maddeler sözleşmeyi fiilen 'göstermelik' (illusory) kılabilir — bir taraf yükümlülüklerini istediği gibi değiştirebiliyorsa, diğer tarafın karşılığı (consideration) zayıflamış olur. Karşılıklı onay şartı veya en azından bildirim ve çıkış mekanizması müzakere edin."}
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'Forum Selection Away from Your Jurisdiction' : 'Kendi Yargı Çevreniz Dışında Yetki Şartı'}
              </h3>
              <p className="text-sm text-red-800">
                {isEnglish
                  ? <>Forum selection clauses requiring dispute resolution in a distant or inconvenient jurisdiction impose substantial practical burdens: travel costs, retention of local counsel, unfamiliarity with local procedural rules, and the psychological disadvantage of litigating on the opposing party&apos;s home turf. US courts enforce forum selection clauses under the standard established in M/S Bremen v. Zapata Off-Shore Co. (1972) unless the clause is unreasonable, was procured by fraud, or enforcement would violate public policy. For a Turkish business owner operating through a US LLC, a clause requiring litigation in a remote US state can be as burdensome as a clause requiring proceedings in Turkey would be for an American counterparty. Where possible, negotiate for a neutral forum or your own jurisdiction. For cross-border contracts, an arbitration clause with a neutral seat — as discussed in the <Link href={`/${lang}/amerika/ny-law-neden-tercih-edilir`} className="text-[#C9A227] underline hover:text-[#B8922A]">governing law analysis</Link> — is often the most equitable solution.</>
                  : <>Uyuşmazlıkların uzak veya elverişsiz bir yargı çevresinde çözülmesini gerektiren yetki şartı maddeleri önemli pratik yükler getirir: seyahat masrafları, yerel avukat tutulması, yerel usul kurallarına yabancılık ve karşı tarafın sahasında dava takip etmenin psikolojik dezavantajı. ABD mahkemeleri yetki şartı maddelerini M/S Bremen v. Zapata Off-Shore Co. (1972) kararıyla belirlenen ölçüt çerçevesinde, madde makul olmadıkça, hile yoluyla elde edilmedikçe veya uygulanması kamu düzenini ihlâl etmedikçe geçerli sayar. ABD LLC&apos;si aracılığıyla faaliyet gösteren bir Türk iş insanı için uzak bir ABD eyaletinde dava açılmasını gerektiren bir madde, Amerikan tarafa Türkiye&apos;de yargılama gerektiren bir madde kadar külfetli olabilir. Mümkünse tarafsız bir forum veya kendi yargı çevreniz için müzakere edin. Sınır ötesi sözleşmelerde, <Link href={`/${lang}/amerika/ny-law-neden-tercih-edilir`} className="text-[#C9A227] underline hover:text-[#B8922A]">uygulanacak hukuk analizinde</Link> tartışıldığı gibi tarafsız bir tahkim yeri ile tahkim şartı çoğu zaman en hakkaniyetli çözümdür.</>}
              </p>
            </div>
          </div>
        </section>

        {/* Key Contract Elements */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Key Contract Elements' : 'Temel Sözleşme Unsurları'}
          </h2>

          <p className="text-gray-600 mb-6">
            {isEnglish
              ? "Regardless of contract type, the following five elements appear in virtually every well-drafted commercial agreement. Each one addresses a distinct category of risk and should be tailored to the specific transaction."
              : "Sözleşme türü ne olursa olsun, aşağıdaki beş unsur iyi hazırlanmış her ticari sözleşmede yer alır. Her biri farklı bir risk kategorisini düzenler ve somut işleme uygun olarak kaleme alınmalıdır."}
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Governing Law (Choice of Law)' : 'Uygulanacak Hukuk (Choice of Law)'}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {isEnglish
                  ? "Specifies which jurisdiction's substantive law governs interpretation and enforcement of the contract. This clause determines everything from how ambiguous terms are construed to what remedies are available for breach."
                  : "Sözleşmenin yorumlanması ve uygulanması bakımından hangi yargı çevresinin maddi hukukunun geçerli olacağını belirler. Bu madde, belirsiz hükümlerin nasıl yorumlanacağından ihlâl hâlinde başvurulabilecek hukuki yollara kadar her şeyi şekillendirir."}
              </p>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "New York is the dominant choice for commercial contracts. Under NY GOL § 5-1401, parties to a contract worth $250,000 or more may choose New York law regardless of any connection to the state. New York courts have developed extensive commercial jurisprudence, creating predictable outcomes. Delaware law is preferred for entity governance matters, and California law may be relevant when consumer protection statutes or employment law apply. A governing law clause should be distinguished from a forum selection clause: the first determines which law applies, the second determines where disputes are litigated."
                  : "Ticari sözleşmelerde New York hukuku baskın tercih konumundadır. NY GOL § 5-1401 uyarınca, bedeli 250.000 dolar ve üzeri sözleşmelerin tarafları, eyaletle herhangi bir bağlantıları bulunmasa dahi New York hukukunu seçebilir. New York mahkemeleri kapsamlı bir ticari içtihat birikimi geliştirmiştir ve bu durum öngörülebilir sonuçlar sağlar. Delaware hukuku kurumsal yönetim meseleleri için tercih edilirken, tüketici koruma düzenlemeleri veya iş hukuku devreye girdiğinde California hukuku gündeme gelebilir. Uygulanacak hukuk maddesi, yetki şartından (forum selection clause) ayrı tutulmalıdır: birincisi hangi hukukun uygulanacağını, ikincisi uyuşmazlığın nerede görüleceğini belirler."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Dispute Resolution' : 'Uyuşmazlık Çözümü'}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {isEnglish
                  ? "Establishes the mechanism for resolving disputes: litigation in a specific court, arbitration before a designated institution, or a tiered process (negotiation, then mediation, then arbitration or litigation). The choice has profound implications for cost, speed, confidentiality, and cross-border enforceability."
                  : "Uyuşmazlıkların çözüm mekanizmasını belirler: belirli bir mahkemede dava, belirlenen bir kurum nezdinde tahkim veya kademeli süreç (önce müzakere, ardından arabuluculuk, akabinde tahkim veya dava). Bu tercih maliyet, hız, gizlilik ve sınır ötesi tenfiz kabiliyeti üzerinde doğrudan etkiye sahiptir."}
              </p>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "For international transactions, an arbitration clause designating a recognized institution (ICC, AAA-ICDR, LCIA) and a neutral seat of arbitration is the standard approach. The arbitration clause should specify: the number of arbitrators (one for smaller disputes, three for complex matters), the language of proceedings, the seat (legal place) of arbitration, and whether the award is final and binding. A well-drafted arbitration clause avoids 'pathological' provisions — those that are internally contradictory, name a non-existent institution, or create ambiguity about whether the parties actually consented to arbitration."
                  : "Uluslararası işlemlerde, tanınmış bir kurumu (ICC, AAA-ICDR, LCIA) ve tarafsız bir tahkim yerini belirleyen tahkim şartı standart yaklaşımdır. Tahkim maddesi şunları açıkça belirlemelidir: hakem sayısı (küçük uyuşmazlıklarda bir, karmaşık meselelerde üç), yargılama dili, tahkim yeri (hukuki anlamda) ve kararın kesin ve bağlayıcı olup olmadığı. İyi kaleme alınmış bir tahkim şartı, 'patolojik' hükümlerden kaçınır — iç çelişki taşıyan, mevcut olmayan bir kuruma atıfta bulunan veya tarafların tahkime gerçekten rıza gösterip göstermediği konusunda belirsizlik yaratan düzenlemeler."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Intellectual Property' : 'Fikri Mülkiyet'}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {isEnglish
                  ? "Determines ownership and usage rights for work product, pre-existing IP, and derivative works. Under US copyright law (17 U.S.C. § 201), works created by independent contractors generally belong to the contractor — not the hiring party — unless a valid 'work made for hire' agreement exists or the rights are expressly assigned in writing."
                  : "Ortaya çıkan eser, mevcut fikri mülkiyet ve türev çalışmalar üzerindeki mülkiyet ve kullanım haklarını belirler. ABD telif hukuku (17 U.S.C. § 201) uyarınca, bağımsız yüklenicilerin ürettiği eserler — geçerli bir 'work made for hire' sözleşmesi bulunmadıkça veya haklar yazılı olarak açıkça devredilmedikçe — kural olarak işi veren tarafa değil, yükleniciye aittir."}
              </p>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "This default rule catches many businesses off guard. A properly drafted IP clause should: (a) require written assignment of all project deliverables upon full payment; (b) reserve ownership of pre-existing IP to its creator while granting the client a license to use it as incorporated in deliverables; (c) address moral rights where applicable; and (d) include cooperation obligations for registration and enforcement. For software, additional considerations include source code escrow, open-source license compliance, and API usage rights."
                  : "Bu varsayılan kural birçok işletmeyi hazırlıksız yakalar. Doğru düzenlenmiş bir fikri mülkiyet maddesi şunları içermelidir: (a) tüm proje çıktılarının ödemenin tamamlanması üzerine yazılı olarak devri; (b) mevcut fikri mülkiyetin sahibinde kalması, ancak müşteriye çıktılara dahil edildiği ölçüde kullanım lisansı verilmesi; (c) uygulanabilir olduğunda manevi hakların düzenlenmesi; (d) tescil ve hak takibi süreçlerinde iş birliği yükümlülükleri. Yazılım alanında kaynak kodu emaneti (source code escrow), açık kaynak lisans uyumluluğu ve API kullanım hakları gibi ek hususlar da değerlendirilmelidir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Limitation of Liability' : 'Sorumluluk Sınırlaması'}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {isEnglish
                  ? "Caps the total amount one party can recover from the other and excludes certain categories of damages. This clause is the primary tool for managing financial exposure in a commercial contract."
                  : "Bir tarafın diğerinden talep edebileceği toplam tutara üst sınır getirir ve belirli zarar türlerini kapsam dışı bırakır. Bu madde, ticari sözleşmelerde mali riskin yönetilmesinde birincil araçtır."}
              </p>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "A typical structure: (1) a general liability cap equal to fees paid in the preceding 12 months or total contract value; (2) exclusion of indirect, incidental, consequential, and punitive damages; (3) carve-outs from the cap for specific high-risk obligations (confidentiality breaches, IP infringement, indemnification for third-party claims). The enforceability of limitation clauses varies by state — some jurisdictions do not allow limitation for gross negligence or willful misconduct. In consumer contracts, such clauses may face additional scrutiny under state consumer protection laws."
                  : "Tipik bir yapı şu şekildedir: (1) önceki 12 ayda ödenen bedel veya toplam sözleşme bedeli tutarında genel sorumluluk tavanı; (2) dolaylı, arızi, sonuç olarak doğan ve cezai nitelikteki zararların kapsam dışı bırakılması; (3) belirli yüksek riskli yükümlülükler (gizlilik ihlâli, fikri mülkiyet ihlâli, üçüncü taraf taleplerinde tazmin) için tavandan istisna. Sorumluluk sınırlama maddelerinin uygulanabilirliği eyalete göre değişir; bazı yargı çevreleri ağır ihmal veya kasıt hâlinde sınırlamaya izin vermez. Tüketici sözleşmelerinde bu maddeler, eyalet tüketici koruma kanunları kapsamında ek denetime tâbi tutulabilir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Termination' : 'Fesih'}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {isEnglish
                  ? "Defines how the contractual relationship ends — by expiration, mutual agreement, termination for convenience, or termination for cause. The termination clause determines each party's exit rights and the consequences of ending the relationship."
                  : "Sözleşme ilişkisinin nasıl sona ereceğini belirler. Sona erme; sürenin dolması, karşılıklı mutabakat, kolaylık feshi veya haklı sebeple fesih yoluyla gerçekleşebilir. Fesih maddesi tarafların çıkış haklarını ve ilişkinin sona ermesinin hukuki sonuçlarını düzenler."}
              </p>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "A comprehensive termination clause addresses: (1) termination for cause — what constitutes a material breach and whether the breaching party has a cure period (typically 15-30 days); (2) termination for convenience — either party's right to end the agreement without cause upon advance written notice; (3) effect of termination — what happens to accrued payment obligations, ongoing confidentiality duties, and work in progress; (4) survival — which provisions continue after termination (typically confidentiality, IP ownership, limitation of liability, and dispute resolution). Without clear termination provisions, unwinding a commercial relationship becomes unpredictable and expensive."
                  : "Kapsamlı bir fesih maddesi dört temel konuyu ele alır. Birincisi, haklı sebeple fesih: esaslı ihlâlin ne anlama geldiğini ve ihlâl eden tarafa giderim süresi tanınıp tanınmadığını belirler (genellikle 15-30 gün). İkincisi, kolaylık feshi: tarafların önceden yazılı bildirimde bulunarak sebep göstermeksizin sözleşmeyi sona erdirme hakkıdır. Üçüncüsü, feshin sonuçları: birikmiş ödeme yükümlülüklerinin, devam eden gizlilik görevlerinin ve sürmekte olan işlerin akıbetini düzenler. Dördüncüsü, geçerliliğini koruyacak hükümler (survival): fesihten sonra da yürürlükte kalacak maddeleri kapsar — genellikle gizlilik, fikri mülkiyet, sorumluluk sınırlaması ve uyuşmazlık çözümü. Açık fesih hükümleri bulunmadığında ticari ilişkinin tasfiyesi öngörülemez ve maliyetli bir sürece dönüşür."}
              </p>
            </div>
          </div>
        </section>

        {/* CTA - Mid page */}
        <KitCallout lang={lang} variant="compact" />

        {/* International Enforcement */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'International Contract Enforcement' : 'Uluslararası Sözleşme Tenfizi'}
          </h2>

          <p className="text-gray-600 mb-6">
            {isEnglish
              ? "For parties operating across the US-Turkey corridor, the enforceability of judgments and awards across borders is a critical practical concern. The mechanism chosen for dispute resolution directly determines whether the outcome can be enforced in the counterparty's home jurisdiction."
              : "ABD-Türkiye ticaret hattında faaliyet gösteren taraflar için, yargı kararlarının ve tahkim kararlarının sınır ötesinde tenfiz edilebilirliği pratik açıdan kritik bir meseledir. Uyuşmazlık çözümü için seçilen mekanizma, sonucun karşı tarafın ülkesinde icra edilip edilemeyeceğini doğrudan belirler."}
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Enforcing US Court Judgments in Turkey' : 'ABD Mahkeme Kararlarının Türkiye\'de Tenfizi'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "The United States and Turkey are not parties to a bilateral treaty on mutual recognition of judgments. Turkey also has not ratified the Hague Convention on Choice of Court Agreements (2005). Consequently, enforcement of a US court judgment in Turkey requires a tenfiz (enforcement) proceeding before a Turkish civil court under the International Private and Procedural Law (MÖHUK, Law No. 5718, Articles 50-59). Turkish courts will review: (a) whether the rendering court had jurisdiction under Turkish private international law principles; (b) whether the judgment is final and not contrary to Turkish public order; (c) whether the defendant was properly served and given adequate opportunity to be heard; and (d) reciprocity — whether Turkey's judgments are recognized in the rendering state. Since reciprocity between the US and Turkey is not well established, enforcement of US court judgments in Turkey remains uncertain."
                  : "ABD ile Türkiye arasında karşılıklı mahkeme kararlarının tanınmasına ilişkin ikili bir anlaşma bulunmamaktadır. Türkiye ayrıca 2005 tarihli Lahey Mahkeme Seçimi Sözleşmesi'ni de onaylamamıştır. Bu nedenle, bir ABD mahkeme kararının Türkiye'de icrası için 5718 sayılı Milletlerarası Özel Hukuk ve Usul Hukuku Hakkında Kanun (MÖHUK) madde 50-59 kapsamında Türk asliye hukuk mahkemesinde tenfiz davası açılması gerekmektedir. Türk mahkemeleri şu hususları inceler: (a) kararı veren mahkemenin Türk milletlerarası özel hukuk ilkeleri uyarınca yetkili olup olmadığı; (b) kararın kesinleşmiş olması ve Türk kamu düzenine aykırı bulunmaması; (c) davalıya usulüne uygun tebligat yapılmış ve savunma hakkının yeterli ölçüde tanınmış olması; (d) karşılıklılık koşulu — Türk mahkeme kararlarının kararı veren ülkede tanınıp tanınmadığı. ABD ile Türkiye arasında karşılıklılığın yeterince yerleşmemiş olması nedeniyle, ABD mahkeme kararlarının Türkiye'de tenfizi belirsizlik taşımaktadır."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Enforcing Turkish Court Judgments in the US' : 'Türk Mahkeme Kararlarının ABD\'de Tenfizi'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "The US has no federal statute governing recognition of foreign judgments. Each state applies its own framework: most states have adopted either the Uniform Foreign-Country Money Judgments Recognition Act (2005) or its predecessor (1962). Under these statutes, Turkish money judgments can be recognized if: the Turkish court had jurisdiction, the proceedings were fair, and the judgment is final and conclusive. Grounds for non-recognition include lack of due process, lack of personal jurisdiction, and repugnancy to the public policy of the recognizing state. New York, a common forum for international commercial disputes, has a well-developed body of case law on foreign judgment recognition under CPLR Article 53."
                  : "ABD'de yabancı mahkeme kararlarının tanınmasına ilişkin federal düzeyde bir yasa bulunmamaktadır. Her eyalet kendi çerçevesini uygular: çoğu eyalet 2005 tarihli Uniform Foreign-Country Money Judgments Recognition Act'i veya 1962 tarihli öncülünü benimsemiştir. Bu düzenlemeler kapsamında Türk para alacağına ilişkin kararlar şu koşullarla tanınabilir: Türk mahkemesinin yetkili olması, yargılama sürecinin âdil yürütülmüş olması ve kararın kesinleşmiş bulunması. Tanımama sebepleri arasında usul hakkının ihlâli, şahsi yetki yokluğu ve kararın tanıyan eyaletin kamu düzenine açıkça aykırılığı yer alır. Uluslararası ticari uyuşmazlıklarda sıkça başvurulan New York mahkemeleri, CPLR Madde 53 kapsamında yabancı kararların tanınmasına ilişkin gelişmiş bir içtihat birikimine sahiptir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Arbitration: The Practical Solution (New York Convention)' : 'Tahkim: Pratik Çözüm Yolu (New York Sözleşmesi)'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Given the uncertainties in cross-border court judgment enforcement, international commercial arbitration provides the most reliable enforcement mechanism for US-Turkey contracts. Both the United States and Turkey are signatories to the 1958 New York Convention on the Recognition and Enforcement of Foreign Arbitral Awards. Under this convention, arbitral awards rendered in one signatory state must be recognized and enforced by courts in any other signatory state, subject to limited grounds for refusal (Article V). This makes an arbitration clause the single most important provision for parties who need cross-border enforceability. The recommended approach: choose a reputable arbitral institution (ICC, AAA-ICDR, or ISTAC for Turkey-related disputes), designate a neutral seat of arbitration (Geneva, London, or Paris are common neutral choices), and specify the language of proceedings."
                  : "Sınır ötesi mahkeme kararlarının tenfizindeki belirsizlikler göz önüne alındığında, uluslararası ticari tahkim ABD-Türkiye sözleşmeleri için en güvenilir tenfiz mekanizmasını sunar. Hem ABD hem de Türkiye, 1958 tarihli Yabancı Hakem Kararlarının Tanınması ve Tenfizine İlişkin New York Sözleşmesi'ne taraftır. Bu sözleşme uyarınca, bir taraf devlette verilen hakem kararları diğer tüm taraf devletlerin mahkemeleri tarafından tanınmak ve tenfiz edilmek zorundadır; ret sebepleri sınırlı tutulmuştur (Madde V). Bu durum, sınır ötesi icra kabiliyetine ihtiyaç duyan taraflar için tahkim şartını sözleşmenin en kritik hükmü hâline getirir. Önerilen yaklaşım: saygın bir tahkim kurumu seçilmesi (ICC, AAA-ICDR veya Türkiye bağlantılı uyuşmazlıklar için ISTAC), tarafsız bir tahkim yeri belirlenmesi (Cenevre, Londra veya Paris yaygın tarafsız seçeneklerdir) ve yargılama dilinin açıkça belirtilmesi."}
              </p>
            </div>
          </div>
        </section>

        {/* When to Get Legal Review */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'When to Get Legal Review' : 'Hukuki İnceleme Ne Zaman Gereklidir'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "Not every contract requires attorney involvement. The decision to engage legal counsel should be guided by the complexity of the transaction, the amounts at stake, and the relative bargaining power of the parties. The following framework provides a practical guide."
                : "Her sözleşme için avukat desteği zorunlu değildir. Hukuki danışmanlık alma kararı, işlemin karmaşıklığına, söz konusu tutarlara ve taraflar arasındaki müzakere gücü dengesine göre şekillenmelidir. Aşağıdaki çerçeve pratik bir yol haritası sunar."}
            </p>
          </div>

          <div className="space-y-4 mt-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">
                {isEnglish ? 'Template May Be Sufficient' : 'Şablon Yeterli Olabilir'}
              </h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• {isEnglish ? 'Standard NDA for preliminary discussions' : 'Ön görüşmeler için standart NDA'}</li>
                <li>• {isEnglish ? 'Simple freelance engagement under $5,000' : 'Tutarı 5.000 doların altındaki basit serbest çalışan anlaşmaları'}</li>
                <li>• {isEnglish ? 'Repeat transactions with established counterparties using previously reviewed forms' : 'Daha önce incelenen formlarla bilinen karşı taraflarla tekrarlanan işlemler'}</li>
                <li>• {isEnglish ? 'Internal team agreements and standard onboarding documents' : 'Kurum içi ekip anlaşmaları ve standart işe alım belgeleri'}</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? 'Legal Review Advisable' : 'Hukuki İnceleme Tavsiye Edilir'}
              </h3>
              <ul className="text-sm text-amber-800 space-y-1">
                <li>• {isEnglish ? 'Contracts valued at $25,000 or more' : 'Bedeli 25.000 dolar ve üzeri sözleşmeler'}</li>
                <li>• {isEnglish ? 'Agreements involving IP assignment or exclusive licensing' : 'Fikri mülkiyet devri veya münhasır lisans içeren anlaşmalar'}</li>
                <li>• {isEnglish ? 'Employment agreements with non-compete or equity provisions' : 'Rekabet yasağı veya pay sahipliği hükümleri içeren iş sözleşmeleri'}</li>
                <li>• {isEnglish ? 'Contracts drafted by the counterparty (review for adverse terms)' : 'Karşı tarafın hazırladığı sözleşmeler (aleyhe hükümler açısından inceleme)'}</li>
                <li>• {isEnglish ? 'Multi-year commitments with automatic renewal' : 'Otomatik yenilemeli çok yıllık taahhütler'}</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'Legal Counsel Essential' : 'Avukat Desteği Zorunludur'}
              </h3>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• {isEnglish ? 'Cross-border contracts with enforcement considerations' : 'Tenfiz gereksinimi olan sınır ötesi sözleşmeler'}</li>
                <li>• {isEnglish ? 'Partnership or operating agreements defining ownership structure' : 'Ortaklık yapısını belirleyen ortaklık veya operating agreement'}</li>
                <li>• {isEnglish ? 'Contracts with government entities or regulated industries' : 'Kamu kurumlarıyla veya düzenlemeye tâbi sektörlerde yapılan sözleşmeler'}</li>
                <li>• {isEnglish ? 'Transactions involving real estate, securities, or M&A' : 'Gayrimenkul, menkul kıymet veya birleşme-devralma işlemleri'}</li>
                <li>• {isEnglish ? 'Situations where the counterparty has legal representation and you do not' : 'Karşı tarafın avukatla temsil edildiği, sizin edilmediğiniz durumlar'}</li>
              </ul>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            {isEnglish
              ? "Cost perspective: A basic contract review by a US attorney typically ranges from $500-$2,500 depending on complexity. Custom drafting ranges from $1,500-$10,000+. Compare this against the potential cost of a poorly drafted contract: litigation costs in US federal court average $50,000-$100,000+ for straightforward commercial disputes."
              : "Maliyet perspektifi: ABD'de bir avukatın temel sözleşme incelemesi, karmaşıklığa göre genellikle 500-2.500 dolar arasında değişir. Sıfırdan hazırlama ise 1.500-10.000 dolar ve üzeri tutabilir. Bu rakamları, kötü hazırlanmış bir sözleşmenin olası maliyetiyle karşılaştırın: ABD federal mahkemelerinde basit bir ticari uyuşmazlığın dava masrafları ortalama 50.000-100.000 dolar ve üzeridir."}
          </p>
        </section>

        {/* Contract Management After Signature */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Contract Management After Signature' : 'İmza Sonrası Sözleşme Yönetimi'}
          </h2>

          <p className="text-gray-600 mb-6">
            {isEnglish
              ? "Signing a contract is not the end of the process — it is the beginning of an ongoing management obligation. Failure to track key dates, amendments, and compliance requirements is a common source of preventable disputes and financial loss."
              : "Sözleşmeyi imzalamak sürecin sonu değil, devam eden bir yönetim yükümlülüğünün başlangıcıdır. Kritik tarihlerin, değişikliklerin ve uyum gerekliliklerinin takip edilmemesi, önlenebilir uyuşmazlıkların ve mali kayıpların yaygın bir sebebidir."}
          </p>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Amendment Procedures' : 'Sözleşme Değişikliği Usulü'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Most commercial contracts include a 'no oral modification' clause requiring all amendments to be in writing and signed by both parties. Respect this requirement — verbal agreements to change terms may be unenforceable even if both parties acted in accordance with the new understanding. Each amendment should be documented as a numbered addendum that references the original agreement, identifies the specific provisions being modified, and is signed by authorized representatives of both parties. Maintain a version log that tracks all amendments chronologically."
                  : "Çoğu ticari sözleşme, tüm değişikliklerin yazılı yapılmasını ve her iki tarafça imzalanmasını şart koşan bir 'sözlü değişiklik yasağı' hükmü içerir. Bu koşula riayet edin; şartları değiştirmeye yönelik sözlü mutabakatlar, her iki taraf yeni anlayışa göre davranmış olsa dahi uygulanamaz hâle gelebilir. Her değişiklik, orijinal sözleşmeye atıf yapan, değiştirilen hükümleri açıkça tespit eden ve her iki tarafın yetkili temsilcileri tarafından imzalanan numaralı bir ek protokol olarak belgelenmelidir. Tüm değişiklikleri kronolojik olarak izleyen bir versiyon kaydı tutun."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Renewal and Expiration Tracking' : 'Yenileme ve Süre Sonu Takibi'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Implement a calendar system that flags critical contract dates at least 90 days in advance: renewal opt-out deadlines, notice periods, milestone delivery dates, and payment schedules. For auto-renewing contracts, set alerts well before the non-renewal notice window opens. A missed opt-out deadline on a multi-year contract can result in being locked into unfavorable terms. Maintain a centralized contract register — even a structured spreadsheet — that records each agreement's counterparty, effective date, term, renewal provisions, governing law, and key obligations."
                  : "Kritik sözleşme tarihlerini en az 90 gün öncesinden uyaran bir takvim sistemi oluşturun: yenileme çıkış süreleri, bildirim dönemleri, teslimat tarihleri ve ödeme takvimleri. Otomatik yenilemeli sözleşmelerde, yenilememe bildirim penceresi açılmadan çok önce hatırlatıcı kurun. Çok yıllık bir sözleşmede kaçırılan çıkış tarihi, elverişsiz koşullara bağlı kalınmasıyla sonuçlanabilir. Her sözleşmenin karşı tarafını, yürürlük tarihini, süresini, yenileme hükümlerini, uygulanacak hukuku ve temel yükümlülüklerini kayıt altına alan merkezi bir sözleşme defteri tutun; yapılandırılmış bir elektronik tablo bile bu amaca hizmet edebilir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Digital Signatures and Execution' : 'Dijital İmza ve Sözleşme İmzalama'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Under the federal ESIGN Act (15 U.S.C. Section 7001 et seq.) and the Uniform Electronic Transactions Act (UETA) adopted by most states, electronic signatures are legally equivalent to handwritten signatures for the vast majority of commercial contracts. Platforms such as DocuSign, HelloSign (now Dropbox Sign), and Adobe Sign produce comprehensive audit trails documenting the identity of each signatory, timestamps, IP addresses, and email confirmations — all of which serve as evidence of execution. Exceptions to e-signature validity include wills, certain trust instruments, specific UCC transactions (negotiable instruments), and court orders. For international transactions involving Turkish counterparts, Turkey's Electronic Signature Law (5070 sayili Kanun) recognizes qualified electronic signatures (nitelikli elektronik imza) as having the same legal effect as handwritten signatures. When using e-signature platforms, ensure that the final executed PDF includes a tamper-evident certificate and that all parties receive a complete copy immediately upon execution."
                  : "Federal ESIGN Yasası (15 U.S.C. md. 7001 vd.) ve çoğu eyaletin benimsediği UETA kapsamında, elektronik imzalar ticari sözleşmelerin büyük çoğunluğunda el yazısı imzalarla hukuken eşdeğerdir. DocuSign, HelloSign (artık Dropbox Sign) ve Adobe Sign gibi platformlar, her imzacının kimliğini, zaman damgasını, IP adresini ve e-posta onaylarını belgeleyen kapsamlı denetim izleri üretir; tüm bu veriler imza sürecinin kanıtı olarak işlev görür. E-imza geçerliliğinin istisnaları arasında vasiyetnameler, belirli vakıf senetleri, bazı UCC işlemleri (kıymetli evraklar) ve mahkeme kararları yer alır. Türk muhatapları içeren uluslararası işlemlerde, 5070 sayılı Elektronik İmza Kanunu nitelikli elektronik imzayı el yazısı imza ile aynı hukuki etkiye sahip olarak kabul eder. E-imza platformları kullanılırken, nihai imzalı PDF'in değişikliğe karşı korumalı bir sertifika içerdiğinden ve tüm tarafların imzadan hemen sonra eksiksiz bir kopya aldığından emin olun."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Record Keeping and Compliance' : 'Kayıt Tutma ve Uyum'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Retain executed originals (or certified digital copies with valid electronic signatures) of all contracts and amendments for the duration of the agreement plus the applicable statute of limitations period — typically 6 years for written contracts in New York. Store related correspondence, change orders, and performance records alongside the contract. For regulatory compliance (tax, employment, export controls), maintain separate compliance files that can be produced on demand. In the event of a dispute, your ability to produce a complete documentary record — the signed contract, all amendments, relevant communications, and evidence of performance — is often the decisive factor."
                  : "İmzalanmış asılları (veya geçerli elektronik imzalı onaylı dijital kopyaları) tüm sözleşme ve eklerinin, sözleşme süresi artı uygulanacak zamanaşımı süresi boyunca — New York'ta yazılı sözleşmeler için genellikle 6 yıl — muhafaza edin. İlgili yazışmaları, iş değişikliği taleplerini ve ifaya ilişkin kayıtları sözleşmeyle birlikte saklayın. Mevzuat uyumu (vergi, istihdam, ihracat kontrolleri) açısından, talep üzerine ibraz edilebilecek ayrı uyum dosyaları oluşturun. Uyuşmazlık hâlinde, eksiksiz bir belge kaydı sunabilme kapasiteniz — imzalı sözleşme, tüm değişiklikleri, ilgili yazışmalar ve ifa kanıtları — çoğu zaman belirleyici etken olmaktadır."}
              </p>
            </div>
          </div>
        </section>

        {/* Privacy & Data Protection Contracts */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {isEnglish ? 'Privacy and Data Protection Contracts' : 'Gizlilik ve Veri Koruma Sözleşmeleri'}
          </h2>

          <p className="text-gray-600 mb-6">
            {isEnglish
              ? <>Businesses that collect, process, or transfer personal data operate within an increasingly complex regulatory environment. The contractual infrastructure supporting data protection is distinct from general commercial contracts and serves both compliance and risk allocation functions. For the public-facing disclosure document, see our <Link href={`/${lang}/contracts/privacy-policy`} className="text-[#C9A227] underline hover:text-[#B8922A]">Privacy Policy template</Link>; for website terms, see our <Link href={`/${lang}/contracts/terms-of-service`} className="text-[#C9A227] underline hover:text-[#B8922A]">Terms of Service template</Link>.</>
              : <>Kişisel veri toplayan, işleyen veya aktaran işletmeler giderek karmaşıklaşan bir düzenleyici çerçeve içinde faaliyet gösterir. Veri korumayı destekleyen sözleşme altyapısı, genel ticari sözleşmelerden farklıdır ve hem uyumluluk hem de risk dağılımı işlevlerini yerine getirir. Kamuya yönelik bilgilendirme belgesi için <Link href={`/${lang}/contracts/privacy-policy`} className="text-[#C9A227] underline hover:text-[#B8922A]">Gizlilik Politikası şablonumuza</Link>; web sitesi koşulları için <Link href={`/${lang}/contracts/terms-of-service`} className="text-[#C9A227] underline hover:text-[#B8922A]">Kullanım Koşulları şablonumuza</Link> bakınız.</>}
          </p>

          <h3 className="text-lg font-bold mb-3">
            {isEnglish ? 'When You Need a Data Processing Agreement (DPA)' : 'Veri İşleme Sözleşmesine (DPA) Ne Zaman İhtiyaç Duyarsınız'}
          </h3>
          <p className="text-gray-600 mb-4">
            {isEnglish
              ? "A Data Processing Agreement is a binding contract between a data controller (the entity determining the purposes and means of processing) and a data processor (the entity processing data on the controller's behalf). A DPA is legally required whenever you engage a third party to process personal data — whether a cloud hosting provider, an email marketing platform, a payroll service, or an analytics tool. The DPA must specify: the subject matter and duration of processing, the nature and purpose of processing, the type of personal data and categories of data subjects, the controller's obligations and rights, and the processor's obligations regarding sub-processors, security measures, breach notification timelines, data return or deletion upon termination, and audit rights."
              : "Veri İşleme Sözleşmesi, veri sorumlusu (işleme amaç ve araçlarını belirleyen kuruluş) ile veri işleyen (veri sorumlusu adına veri işleyen kuruluş) arasında bağlayıcı bir sözleşmedir. Kişisel verilerin işlenmesi için bir üçüncü tarafı görevlendirdiğiniz her durumda — bulut barındırma sağlayıcısı, e-posta pazarlama platformu, bordro hizmeti veya analitik aracı olsun — DPA hukuken zorunludur. DPA'da şu hususlar belirtilmelidir: işlemenin konusu ve süresi, işlemenin niteliği ve amacı, kişisel veri türleri ve ilgili kişi kategorileri, veri sorumlusunun yükümlülükleri ve hakları, veri işleyenin alt işleyiciler, güvenlik önlemleri, ihlâl bildirim süreleri, sona ermede verilerin iadesi veya silinmesi ve denetim hakları konusundaki yükümlülükleri."}
          </p>

          <h3 className="text-lg font-bold mb-3">
            {isEnglish ? 'Applicable Regulatory Frameworks' : 'Uygulanabilir Düzenleyici Çerçeveler'}
          </h3>
          <div className="space-y-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-1">GDPR (EU/EEA)</h4>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "The General Data Protection Regulation applies to any entity processing personal data of individuals in the EU/EEA, regardless of where the entity is established. Article 28 mandates a written contract (the DPA) between controller and processor. For US-based businesses serving EU customers, GDPR compliance requires DPAs with all processors, a documented lawful basis for each processing activity, privacy-by-design implementation, and appropriate safeguards for international data transfers. Non-compliance penalties can reach EUR 20 million or 4% of global annual turnover, whichever is higher."
                  : "Genel Veri Koruma Tüzüğü (GDPR), kuruluş yeri ne olursa olsun, AB/AEA'daki bireylerin kişisel verilerini işleyen her kuruluşa uygulanır. Madde 28, veri sorumlusu ile veri işleyen arasında yazılı bir sözleşme (DPA) yapılmasını zorunlu kılar. AB müşterilerine hizmet veren ABD merkezli işletmelerin GDPR uyumu için tüm veri işleyenlerle DPA imzalaması, her işleme faaliyeti için belgelenmiş hukuki dayanak bulundurması, tasarımdan itibaren gizlilik (privacy-by-design) ilkesini uygulaması ve uluslararası veri transferleri için uygun güvenceler sağlaması gerekmektedir. Uyumsuzluk yaptırımları 20 milyon Euro'ya veya küresel yıllık cironun %4'üne (hangisi yüksekse) ulaşabilir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-1">CCPA / CPRA (California)</h4>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "The California Consumer Privacy Act (as amended by the California Privacy Rights Act) requires written 'service provider' or 'contractor' agreements with entities processing personal information on a business's behalf. These agreements must prohibit the service provider from selling or sharing the information, restrict use to the contracted purposes, require the same level of privacy protection as the CCPA provides, and grant the business the right to audit compliance. Similar comprehensive state privacy laws are in effect or pending in Virginia, Colorado, Connecticut, Utah, Iowa, Indiana, Tennessee, Montana, Texas, Oregon, and other states."
                  : "Kaliforniya Tüketici Gizlilik Yasası (CPRA ile değişik), bir işletme adına kişisel bilgi işleyen kuruluşlarla yazılı 'hizmet sağlayıcı' veya 'yüklenici' sözleşmesi yapılmasını şart koşar. Bu sözleşmeler, hizmet sağlayıcının bilgiyi satmasını veya paylaşmasını yasaklamalı, kullanımı sözleşmede belirlenen amaçlarla sınırlandırmalı, CCPA'nın öngördüğü düzeyde gizlilik koruması gerektirmeli ve işletmeye uyumluluk denetimi hakkı tanımalıdır. Benzer kapsamlı eyalet gizlilik yasaları Virginia, Colorado, Connecticut, Utah, Iowa, Indiana, Tennessee, Montana, Texas, Oregon ve diğer eyaletlerde yürürlüktedir veya yasalaşma aşamasındadır."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold mb-1">KVKK (Turkey)</h4>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Turkey's Personal Data Protection Law (Law No. 6698, KVKK) closely follows the GDPR model. KVKK imposes obligations on data controllers and processors, requires explicit or implicit consent depending on the processing category, and restricts international data transfers to countries with adequate protection as determined by the Personal Data Protection Board (KVKK Kurulu) or where the parties provide sufficient safeguards through written commitments approved by the Board. For businesses operating across both the US and Turkey, KVKK and GDPR compliance must be addressed in parallel, with particular attention to cross-border data transfer mechanisms."
                  : "6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK), GDPR modelini yakından takip eder. KVKK, veri sorumlularına ve veri işleyenlere yükümlülükler getirir, işleme kategorisine bağlı olarak açık veya zımnî rıza arar ve uluslararası veri aktarımını Kişisel Verileri Koruma Kurulu tarafından yeterli koruma düzeyi bulunduğu tespit edilen ülkelerle veya tarafların Kurul onaylı yazılı taahhütlerle yeterli güvence sağladığı durumlarla sınırlandırır. Hem ABD hem Türkiye'de faaliyet gösteren işletmelerin KVKK ve GDPR uyum gerekliliklerini eş zamanlı olarak ele alması, özellikle sınır ötesi veri aktarım mekanizmalarına dikkat göstermesi zorunludur."}
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold mb-3">
            {isEnglish ? 'Standard Contractual Clauses for International Data Transfers' : 'Uluslararası Veri Transferleri İçin Standart Sözleşme Hükümleri'}
          </h3>
          <p className="text-gray-600">
            {isEnglish
              ? "Standard Contractual Clauses (SCCs) are pre-approved contractual terms adopted by the European Commission providing adequate safeguards for transferring personal data from the EU/EEA to third countries. The current SCCs (adopted June 2021) employ a modular structure covering four scenarios: controller-to-controller, controller-to-processor, processor-to-processor, and processor-to-controller. In addition to executing the SCCs, businesses must conduct a Transfer Impact Assessment evaluating whether the recipient country's legal framework provides protection essentially equivalent to that in the EU. For US-Turkey data flows where EU-origin data is involved, SCCs may need to be supplemented with additional technical and organizational measures. Under KVKK, the Turkish data protection authority may require analogous written commitments for cross-border transfers from Turkey."
              : "Standart Sözleşme Hükümleri (SCC'ler), Avrupa Komisyonu tarafından kabul edilen, kişisel verilerin AB/AEA'dan üçüncü ülkelere aktarılması için yeterli güvence sağlayan önceden onaylanmış sözleşme şartlarıdır. Güncel SCC'ler (Haziran 2021'de kabul edilen) dört senaryoyu kapsayan modüler bir yapı benimser: sorumluden sorumluya, sorumluden işleyene, işleyenden işleyene ve işleyenden sorumluya. SCC'lerin imzalanmasına ek olarak, işletmelerin alıcı ülkenin hukuki çerçevesinin AB'deki korumaya esasen eşdeğer koruma sağlayıp sağlamadığını değerlendiren bir Transfer Etki Değerlendirmesi yapması gerekmektedir. AB kökenli verilerin söz konusu olduğu ABD-Türkiye veri akışlarında, SCC'lerin ek teknik ve organizasyonel önlemlerle desteklenmesi gerekebilir. KVKK kapsamında, Türk veri koruma otoritesi Türkiye'den yapılacak sınır ötesi aktarımlar için benzer nitelikte yazılı taahhütler isteyebilir."}
          </p>
        </section>

        {/* FAQ */}
        <FAQAccordion
          items={faqItems}
          title={isEnglish ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}
        />

        {/* CTA - End of page */}
        <KitCallout lang={lang} variant="full" />

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
            <Link
              href={`/${lang}/contracts/nda`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">{isEnglish ? 'NDA Template' : 'NDA Şablonu'}</span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts/service-agreement`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">{isEnglish ? 'Service Agreement Template' : 'Hizmet Sözleşmesi Şablonu'}</span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts/independent-contractor`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">{isEnglish ? 'Independent Contractor Template' : 'Bağımsız Yüklenici Şablonu'}</span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts/freelance-agreement`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">{isEnglish ? 'Freelance Agreement Template' : 'Serbest Çalışan Sözleşmesi Şablonu'}</span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts/privacy-policy`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">{isEnglish ? 'Privacy Policy Template' : 'Gizlilik Politikası Şablonu'}</span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts/terms-of-service`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">{isEnglish ? 'Terms of Service Template' : 'Kullanım Koşulları Şablonu'}</span>
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
              ? 'This content is for general informational purposes only and does not constitute legal advice. Contract templates should be reviewed by a qualified attorney and customized for your specific situation and jurisdiction.'
              : 'Bu içerik yalnızca genel bilgilendirme amacıyla hazırlanmış olup hukuki danışmanlık niteliği taşımaz. Sözleşme şablonları, somut durumunuza ve tâbi olduğunuz hukuk düzenine uygun biçimde yetkili bir avukat tarafından incelenmeli ve uyarlanmalıdır.'}
          </p>
        </div>
    </main>
  )
}
