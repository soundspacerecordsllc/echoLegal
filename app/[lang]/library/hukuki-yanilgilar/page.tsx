// app/[lang]/library/hukuki-yanilgilar/page.tsx

import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import JsonLdScript from '@/components/JsonLdScript'
import { generateScholarlyArticleSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'

const PAGE_META = {
  slug: 'hukuki-yanilgilar',
  datePublished: '2025-10-01',
  dateModified: '2026-02-22',
  version: '2.0',
  wordCount: 3200,
  citationKey: 'ecl-enc-00006',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const url = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  return {
    title: isEnglish
      ? 'Common Legal Misconceptions About US Business | EchoLegal'
      : 'ABD\'de İş Hukukuna İlişkin Yaygın Yanılgılar | EchoLegal',
    description: isEnglish
      ? 'Reference entry addressing frequently misunderstood aspects of US business law for non-US entrepreneurs. Covers LLC formation, tax obligations, immigration, contracts, and banking.'
      : 'ABD dışından girişimciler için ABD iş hukukunun sıkça yanlış anlaşılan yönlerini ele alan başvuru maddesi. LLC kuruluşu, vergi yükümlülükleri, göçmenlik, sözleşmeler ve bankacılığı kapsar.',
    other: {
      'citation_title': isEnglish ? 'Common Legal Misconceptions About US Business' : 'ABD\'de İş Hukukuna İlişkin Yaygın Yanılgılar',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/10/01',
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

export default async function LegalMisconceptionsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const pageUrl = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  const pageTitle = isEnglish
    ? 'Common Legal Misconceptions About US Business'
    : 'ABD\'de İş Hukukuna İlişkin Yaygın Yanılgılar'

  const scholarlySchema = generateScholarlyArticleSchema({
    title: pageTitle,
    abstractText: isEnglish
      ? 'A reference entry addressing the legal misconceptions most commonly held by non-US entrepreneurs about doing business in the United States.'
      : 'ABD\'de iş yapma konusunda yabancı girişimciler tarafından en yaygın olarak benimsenen hukuki yanılgıları ele alan bir başvuru maddesi.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['legal-misconceptions', 'llc-myths', 'us-business-law', 'tax-obligations', 'immigration'],
    wordCount: PAGE_META.wordCount,
    citationKey: PAGE_META.citationKey,
    aboutTopics: ['US Business Misconceptions', 'LLC Formation', 'International Business Law'],
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Library' : 'Kütüphane', url: `${SITE_URL}/${lang}/library` },
    { name: isEnglish ? 'Legal Misconceptions' : 'Hukuki Yanılgılar', url: pageUrl },
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
        <span className="text-ink">{isEnglish ? 'Legal Misconceptions' : 'Hukuki Yanılgılar'}</span>
      </nav>

      <article>
        {/* Header */}
        <header className="mb-16">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-6 leading-tight tracking-tight">
            {pageTitle}
          </h1>

          <p className="text-lg text-muted leading-relaxed max-w-prose mb-8">
            {isEnglish
              ? 'A reference entry addressing the legal misconceptions most commonly held by non-US entrepreneurs about doing business in the United States.'
              : 'ABD\'de iş yapma konusunda yabancı girişimciler tarafından en yaygın olarak benimsenen hukuki yanılgıları ele alan bir başvuru maddesi.'}
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
              ? 'This entry provides general information about frequently misunderstood aspects of US business law. It does not constitute legal, tax, or immigration advice. Laws change and individual circumstances vary. Consult licensed professionals for your specific situation.'
              : 'Bu madde, ABD iş hukukunun sıkça yanlış anlaşılan yönleri hakkında genel bilgi sunmaktadır. Hukuki, vergisel veya göçmenlik tavsiyesi niteliği taşımaz. Yasalar değişir ve bireysel durumlar farklılık gösterir. Kendi durumunuza özgü değerlendirme için lisanslı uzmanlara başvurun.'}
          </p>
        </div>

        <div className="entry-body">

          {/* Scope & Method */}
          <h2>{isEnglish ? 'Scope & Method' : 'Kapsam ve Yöntem'}</h2>

          <p>
            {isEnglish
              ? 'This entry catalogs the legal misconceptions most frequently encountered among non-US entrepreneurs — particularly those based in Turkey — who are doing business in or with the United States. Each misconception is stated, followed by an explanation of the accurate legal position. The entry covers four areas: entity formation, tax obligations, contracts and documentation, and banking and payments.'
              : 'Bu madde, ABD\'de veya ABD ile iş yapan yabancı girişimciler — özellikle Türkiye merkezli olanlar — arasında en sık karşılaşılan hukuki yanılgıları kataloglamaktadır. Her yanılgı belirtilmekte ve ardından doğru hukuki pozisyonun açıklaması sunulmaktadır. Madde dört alanı kapsar: tüzel kişilik kuruluşu, vergi yükümlülükleri, sözleşmeler ve belgeler, bankacılık ve ödemeler.'}
          </p>

          <p>
            {isEnglish
              ? 'This entry does not provide detailed treatment of any single topic — each misconception is addressed concisely with references to other EchoLegal entries where deeper analysis is available.'
              : 'Bu madde, herhangi bir konunun ayrıntılı ele alınmasını sunmamaktadır — her yanılgı, daha derin analizin mevcut olduğu diğer EchoLegal maddelerine referanslarla özlü bir şekilde ele alınmaktadır.'}
          </p>

          {/* LLC & Entity Formation */}
          <h2>{isEnglish ? 'LLC and Entity Formation' : 'LLC ve Tüzel Kişilik Kuruluşu'}</h2>

          <h3>{isEnglish ? 'LLC formation confers immigration benefits' : 'LLC kuruluşu göçmenlik avantajı sağlar'}</h3>

          <p>
            {isEnglish
              ? 'LLC formation and immigration are governed by entirely separate bodies of law. Forming an LLC does not grant, support, or improve any visa application or immigration status. While certain visa categories (such as E-2 treaty investor visas) require the applicant to have a business in the United States, the business entity alone does not qualify the owner for any visa — the immigration application must independently satisfy its own statutory and regulatory requirements.'
              : 'LLC kuruluşu ve göçmenlik tamamen ayrı hukuk alanları tarafından düzenlenmektedir. LLC kurmak herhangi bir vize başvurusunu desteklemez veya göçmenlik statüsünü iyileştirmez. Belirli vize kategorileri (E-2 anlaşma yatırımcı vizeleri gibi) başvuru sahibinin ABD\'de bir işletmesi olmasını gerektirse de, ticari kuruluş tek başına sahibini herhangi bir vize için hak kazandırmaz — göçmenlik başvurusu kendi yasal ve düzenleyici gerekliliklerini bağımsız olarak karşılamalıdır.'}
          </p>

          <h3>{isEnglish ? 'An LLC provides absolute personal liability protection' : 'LLC mutlak kişisel sorumluluk koruması sağlar'}</h3>

          <p>
            {isEnglish
              ? 'Limited liability protection is not absolute. Courts may "pierce the corporate veil" and hold members personally liable where the LLC was used to perpetrate fraud, where personal and business finances were commingled, where the entity was undercapitalized, or where corporate formalities were not observed. The standards for veil-piercing vary by state, but the underlying principle is consistent: the liability shield protects members who treat the entity as a genuinely separate legal person.'
              : 'Sınırlı sorumluluk koruması mutlak değildir. Mahkemeler, LLC\'nin dolandırıcılık amacıyla kullanıldığı, kişisel ve ticari finansların karıştırıldığı, tüzel kişiliğin yetersiz sermayeyle kurulduğu veya kurumsal formalitelerin gözetilmediği durumlarda "tüzel kişilik perdesini kaldırabilir" ve üyeleri kişisel olarak sorumlu tutabilir. Perdenin kaldırılma standartları eyalete göre farklılık gösterir, ancak temel ilke tutarlıdır: sorumluluk kalkanı, tüzel kişiliğe gerçekten ayrı bir hukuki kişi olarak davranan üyeleri korur.'}
          </p>

          <h3>{isEnglish ? 'All US states have the same LLC laws' : 'Tüm ABD eyaletlerinin LLC yasaları aynıdır'}</h3>

          <p>
            {isEnglish
              ? 'LLC statutes vary significantly by state. Formation requirements, annual reporting obligations, franchise taxes, Operating Agreement requirements, and member liability protections all differ. Delaware\'s LLC Act, for example, provides maximum contractual freedom through the Operating Agreement, while other states impose mandatory provisions that cannot be waived. The choice of formation state is a substantive decision with ongoing compliance and cost implications — not merely a formality.'
              : 'LLC mevzuatı eyalete göre önemli ölçüde farklılık gösterir. Kuruluş gereklilikleri, yıllık raporlama yükümlülükleri, franchise vergileri, İşletme Sözleşmesi gereklilikleri ve üye sorumluluk korumaları tümü farklıdır. Örneğin Delaware LLC Yasası, İşletme Sözleşmesi aracılığıyla maksimum sözleşme özgürlüğü sağlarken, diğer eyaletler feragat edilemeyecek zorunlu hükümler dayatmaktadır. Kuruluş eyaleti seçimi, devam eden uyum ve maliyet etkileri olan esasa ilişkin bir karardır — salt bir formalite değildir.'}
          </p>

          <h3>{isEnglish ? 'A US LLC is required to work with US clients' : 'ABD müşterileriyle çalışmak için ABD LLC gereklidir'}</h3>

          <p>
            {isEnglish
              ? 'A non-US entrepreneur can work with US clients as a foreign individual or through a foreign entity. Many US companies routinely engage contractors and service providers based outside the United States. The decision to form a US LLC should be evaluated based on specific business needs — banking access, payment processing requirements, client preferences, and tax implications — rather than assumed as a prerequisite.'
              : 'ABD dışından bir girişimci, yabancı bir birey olarak veya yabancı bir tüzel kişi aracılığıyla ABD müşterileriyle çalışabilir. Birçok ABD şirketi düzenli olarak ABD dışında yerleşik yükleniciler ve hizmet sağlayıcılarla çalışmaktadır. ABD LLC kurma kararı, bir ön koşul olarak varsayılmak yerine belirli iş ihtiyaçlarına — bankacılık erişimi, ödeme işleme gereksinimleri, müşteri tercihleri ve vergi etkileri — göre değerlendirilmelidir.'}
          </p>

          {/* Tax Obligations */}
          <h2>{isEnglish ? 'Tax Obligations' : 'Vergi Yükümlülükleri'}</h2>

          <h3>{isEnglish ? 'A Delaware LLC eliminates all tax obligations' : 'Delaware LLC tüm vergi yükümlülüklerini ortadan kaldırır'}</h3>

          <p>
            {isEnglish
              ? 'Delaware does not impose state income tax on income earned from out-of-state operations. However, this has no effect on federal tax obligations, which apply regardless of the formation state. A non-US LLC owner may owe federal income tax on US-source income, and remains subject to the tax laws of their country of residence on worldwide income. The interaction between US federal obligations, home-country obligations, and applicable tax treaties creates a multi-layered analysis that cannot be resolved by state selection alone.'
              : 'Delaware, eyalet dışı faaliyetlerden elde edilen gelir üzerinden eyalet gelir vergisi almaz. Ancak bunun, kuruluş eyaletinden bağımsız olarak uygulanan federal vergi yükümlülükleri üzerinde hiçbir etkisi yoktur. ABD dışından bir LLC sahibi, ABD kaynaklı gelir üzerinden federal gelir vergisi borçlu olabilir ve dünya çapındaki gelir üzerinden ikamet ülkesinin vergi yasalarına tabi kalmaya devam eder. ABD federal yükümlülükleri, ikamet ülkesi yükümlülükleri ve geçerli vergi anlaşmaları arasındaki etkileşim, yalnızca eyalet seçimiyle çözülemeyecek çok katmanlı bir analiz gerektirir.'}
          </p>

          <h3>{isEnglish ? 'Non-US residence eliminates US tax obligations' : 'ABD dışında ikamet etmek ABD vergi yükümlülüklerini ortadan kaldırır'}</h3>

          <p>
            {isEnglish
              ? 'Owning a US LLC or receiving US-source income can create US tax filing obligations regardless of where the owner resides. These may include annual income tax returns, informational returns (such as Form 5472 for foreign-owned single-member LLCs), and — where the owner has signature authority over US financial accounts — FinCEN reporting requirements. The assumption that physical absence from the US eliminates tax exposure is a frequent and potentially costly error.'
              : 'ABD LLC\'sine sahip olmak veya ABD kaynaklı gelir almak, sahibinin nerede ikamet ettiğine bakılmaksızın ABD vergi beyannamesi yükümlülükleri yaratabilir. Bunlar yıllık gelir vergisi beyannamelerini, bilgi beyannamelerini (yabancı sahipli tek üyeli LLC\'ler için Form 5472 gibi) ve — sahibin ABD finansal hesapları üzerinde imza yetkisi olduğu durumlarda — FinCEN raporlama gerekliliklerini içerebilir. ABD\'den fiziksel uzaklığın vergi maruziyetini ortadan kaldırdığı varsayımı sık görülen ve potansiyel olarak maliyetli bir hatadır.'}
          </p>

          <h3>{isEnglish ? 'Payment method has no tax implications' : 'Ödeme yönteminin vergi etkisi yoktur'}</h3>

          <p>
            {isEnglish
              ? 'Payment platforms such as PayPal, Stripe, and similar services file information returns (1099-K) with the IRS for US-based accounts that exceed reporting thresholds. Wire transfers, ACH payments, and other electronic transfers create documentary records accessible to tax authorities. The method of payment does not affect whether income is taxable — it affects only whether and how the payment is reported to the IRS by the platform or financial institution.'
              : 'PayPal, Stripe ve benzeri ödeme platformları, raporlama eşiklerini aşan ABD merkezli hesaplar için IRS\'ye bilgi beyannameleri (1099-K) sunar. Banka havaleleri, ACH ödemeleri ve diğer elektronik transferler vergi otoritelerinin erişebileceği belgesel kayıtlar oluşturur. Ödeme yöntemi gelirin vergiye tabi olup olmadığını etkilemez — yalnızca ödemenin platform veya finansal kuruluş tarafından IRS\'ye nasıl ve ne şekilde raporlandığını etkiler.'}
          </p>

          {/* Contracts & Documentation */}
          <h2>{isEnglish ? 'Contracts and Documentation' : 'Sözleşmeler ve Belgeler'}</h2>

          <h3>{isEnglish ? 'Online templates substitute for legal counsel' : 'Çevrimiçi şablonlar hukuki danışmanlığın yerini tutar'}</h3>

          <p>
            {isEnglish
              ? 'Contract templates provide a structural starting point and are useful for understanding standard commercial terms. However, they cannot account for the specific circumstances of a transaction, the applicable jurisdiction\'s requirements, or the parties\' particular risk allocation needs. Contracts with material financial exposure — service agreements with significant liability provisions, equity arrangements, or cross-border transactions — should be reviewed by an attorney who understands the relevant law and the parties\' commercial context.'
              : 'Sözleşme şablonları yapısal bir başlangıç noktası sağlar ve standart ticari koşulları anlamak için faydalıdır. Ancak bir işlemin özel koşullarını, geçerli yargı alanının gerekliliklerini veya tarafların belirli risk dağılımı ihtiyaçlarını hesaba katamazlar. Önemli mali maruziyet içeren sözleşmeler — ciddi sorumluluk hükümleri olan hizmet sözleşmeleri, ortaklık düzenlemeleri veya sınır ötesi işlemler — ilgili hukuku ve tarafların ticari bağlamını anlayan bir avukat tarafından incelenmelidir.'}
          </p>

          <h3>{isEnglish ? 'Verbal agreements are equally enforceable' : 'Sözlü anlaşmalar eşit derecede uygulanabilir'}</h3>

          <p>
            {isEnglish
              ? 'Under the Statute of Frauds — adopted in some form in all US states — certain categories of contracts must be in writing to be enforceable, including contracts for the sale of goods over $500 (UCC § 2-201), contracts that cannot be performed within one year, and real property transfers. Even for contract types where oral agreements are theoretically valid, proving the terms of an oral agreement in litigation is substantially more difficult than proving a written agreement. Written contracts also reduce ambiguity about the parties\' obligations and provide a stable reference point for performance.'
              : 'Dolandırıcılık Statüsü kapsamında — tüm ABD eyaletlerinde bir biçimde kabul edilmiş — belirli sözleşme kategorilerinin uygulanabilir olması için yazılı olması gerekir; bunlar arasında 500 doların üzerinde mal satış sözleşmeleri (UCC § 2-201), bir yıl içinde yerine getirilemeyen sözleşmeler ve taşınmaz devir sözleşmeleri yer alır. Sözlü anlaşmaların teorik olarak geçerli olduğu sözleşme türlerinde bile, bir sözlü anlaşmanın koşullarını davada kanıtlamak yazılı bir anlaşmayı kanıtlamaktan önemli ölçüde daha zordur. Yazılı sözleşmeler ayrıca tarafların yükümlülükleri hakkındaki belirsizliği azaltır ve ifa için istikrarlı bir referans noktası sağlar.'}
          </p>

          {/* Banking & Payments */}
          <h2>{isEnglish ? 'Banking and Payments' : 'Bankacılık ve Ödemeler'}</h2>

          <h3>{isEnglish ? 'LLC ownership guarantees US bank account access' : 'LLC sahipliği ABD banka hesabı erişimini garanti eder'}</h3>

          <p>
            {isEnglish
              ? 'Many traditional US banks require in-person identity verification for account opening. Non-US residents who have formed a US LLC often discover that opening a corresponding bank account is the most practically challenging step in the process. While some banks and fintech providers offer remote onboarding for foreign-owned LLCs, the documentary requirements — EIN confirmation letter, Articles of Organization, Operating Agreement, and sometimes consular-authenticated identification — can be substantial. The available account types and features may also be more limited than those offered to domestic account holders.'
              : 'Birçok geleneksel ABD bankası hesap açılışı için yüz yüze kimlik doğrulaması gerektirmektedir. ABD LLC\'si kurmuş olan ABD dışı mukim kişiler, ilgili banka hesabı açmanın süreçteki pratik açıdan en zorlu adım olduğunu sıklıkla keşfeder. Bazı bankalar ve fintek sağlayıcılar yabancı sahipli LLC\'ler için uzaktan müşteri kabul süreci sunsa da belge gereklilikleri — EIN onay mektubu, kuruluş belgesi, işletme sözleşmesi ve bazen konsolosluk onaylı kimlik belgeleri — önemli olabilir. Mevcut hesap türleri ve özellikleri de yerli hesap sahiplerine sunulanlardan daha sınırlı olabilir.'}
          </p>

        </div>

        {/* Related Resources */}
        <section className="mt-14 mb-14">
          <h2 className="font-serif text-xl font-semibold text-ink mb-6">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
          <div className="divide-y divide-stone-200">
            <Link href={`/${lang}/library/llc-kurma-rehberi`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'LLC Formation in the United States' : 'ABD\'de LLC Kuruluşu'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'Legal structure, state selection, and formation process' : 'Hukuki yapı, eyalet seçimi ve kuruluş süreci'}</p>
            </Link>
            <Link href={`/${lang}/library/irs-vergi-gercekleri`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'US Tax Forms for Non-US Entrepreneurs' : 'ABD Dışından Girişimciler İçin Vergi Formları'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'W-8, W-9, 1099 forms and withholding obligations' : 'W-8, W-9, 1099 formları ve stopaj yükümlülükleri'}</p>
            </Link>
            <Link href={`/${lang}/library/llc-vize-yanilgisi`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'LLC and Visa Eligibility' : 'LLC ve Vize Uygunluğu'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'Why entity formation does not confer immigration benefits' : 'Tüzel kişilik kuruluşunun neden göçmenlik avantajı sağlamadığı'}</p>
            </Link>
            <Link href={`/${lang}/library/temel-sozlesmeler`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'Essential Contracts for US Business' : 'ABD\'de İş İçin Temel Sözleşmeler'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'Contracts commonly needed by non-US entrepreneurs' : 'Yabancı girişimcilerin yaygın olarak ihtiyaç duyduğu sözleşmeler'}</p>
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
