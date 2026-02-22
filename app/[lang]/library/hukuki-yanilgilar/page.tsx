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
  dateModified: '2026-01-25',
  version: '1.1',
  wordCount: 3000,
  citationKey: 'ecl-enc-00006',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const url = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  return {
    title: isEnglish
      ? 'Common Legal Misconceptions About US Business | EchoLegal'
      : 'ABD\'de İş Yapan Türklerin Sık Yapılan Hukuki Hataları | EchoLegal',
    description: isEnglish
      ? 'Debunking common myths about doing business in the US. LLC formation, visas, taxes, and more explained with facts.'
      : 'ABD\'de iş yapma hakkındaki yaygın mitleri çürütme. LLC kurulumu, vizeler, vergiler ve daha fazlası gerçeklerle açıklandı.',
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en/library/${PAGE_META.slug}`,
        'tr': `${SITE_URL}/tr/library/${PAGE_META.slug}`,
      },
    },
    other: {
      'citation_title': isEnglish ? 'Common Legal Misconceptions About US Business' : 'ABD\'de İş Yapan Türklerin Sık Yapılan Hukuki Hataları',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/10/01',
      'citation_lastmod': '2026/01/25',
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
  const pageTitle = isEnglish ? 'Common Legal Misconceptions' : 'ABD\'de İş Yapan Türklerin Sık Yapılan Hukuki Hataları'

  const scholarlySchema = generateScholarlyArticleSchema({
    title: isEnglish ? 'Common Legal Misconceptions About US Business' : 'ABD\'de İş Yapan Türklerin Sık Yapılan Hukuki Hataları',
    abstractText: isEnglish
      ? 'Facts vs. myths about doing business in the United States. Common misunderstandings about LLC formation, visas, taxes, and legal obligations for international entrepreneurs.'
      : 'ABD\'de iş yapma hakkında gerçekler ve mitler. LLC kurulumu, vizeler, vergiler ve uluslararası girişimciler için hukuki yükümlülükler hakkında yaygın yanlış anlamalar.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['legal-misconceptions', 'llc-myths', 'us-business', 'tax-myths', 'visa-myths'],
    wordCount: PAGE_META.wordCount,
    citationKey: PAGE_META.citationKey,
    aboutTopics: ['US Business Misconceptions', 'LLC Formation', 'International Business'],
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Library' : 'Kütüphane', url: `${SITE_URL}/${lang}/library` },
    { name: pageTitle, url: pageUrl },
  ])

  const misconceptions = [
    {
      id: 1,
      category: isEnglish ? 'LLC & Business' : 'LLC ve İş',
      claim: isEnglish
        ? '"Forming a US LLC will get me a visa or green card."'
        : '"ABD\'de LLC kurmak bana vize veya yeşil kart sağlar."',
      correctedFraming: isEnglish
        ? 'LLC formation and immigration are separate legal processes. An LLC is a business structure; it confers no immigration status. Certain visa categories (e.g., E-2) require a qualifying business, but the LLC itself does not make you eligible.'
        : 'LLC kurulumu ve göçmenlik ayrı hukuki süreçlerdir. LLC bir iş yapısıdır; göçmenlik statüsü sağlamaz. E-2 gibi bazı vize kategorileri nitelikli bir işletme gerektirir, ancak LLC tek başına hak kazandırmaz.',
      takeaway: isEnglish
        ? 'Business formation ≠ immigration benefit'
        : 'Şirket kurulumu ≠ göçmenlik avantajı',
    },
    {
      id: 2,
      category: isEnglish ? 'Taxes' : 'Vergiler',
      claim: isEnglish
        ? '"A Delaware LLC means I won\'t pay any taxes."'
        : '"Delaware LLC vergisiz demektir."',
      correctedFraming: isEnglish
        ? 'Delaware imposes no state income tax on out-of-state income, but that does not eliminate all tax obligations. Federal taxes may still apply, along with taxes in your country of residence and in any state where you have nexus.'
        : 'Delaware eyalet dışı gelirler üzerinde gelir vergisi almaz, ancak bu tüm vergi yükümlülüklerini ortadan kaldırmaz. Federal vergiler, ikamet ettiğiniz ülkedeki vergiler ve bağlantınız olan eyaletlerdeki vergiler yine geçerli olabilir.',
      takeaway: isEnglish
        ? 'No state tax ≠ no tax at all'
        : 'Eyalet vergisi yok ≠ hiç vergi yok',
    },
    {
      id: 3,
      category: isEnglish ? 'Banking' : 'Bankacılık',
      claim: isEnglish
        ? '"With my LLC, I can easily open any US bank account remotely."'
        : '"LLC\'mle kolayca uzaktan ABD banka hesabı açabilirim."',
      correctedFraming: isEnglish
        ? 'Most traditional US banks require in-person verification or impose strict KYC requirements on non-residents. Some fintechs offer remote account opening, but the process typically involves additional documentation and longer timelines.'
        : 'Geleneksel ABD bankalarının çoğu yüz yüze doğrulama gerektirir veya yerleşik olmayanlar için katı KYC kuralları uygular. Bazı fintek şirketleri uzaktan hesap açma sunar, ancak süreç genellikle ek belgeler ve daha uzun süreler içerir.',
      takeaway: isEnglish
        ? 'LLC ownership ≠ guaranteed bank access'
        : 'LLC sahipliği ≠ garantili banka erişimi',
    },
    {
      id: 4,
      category: isEnglish ? 'Contracts' : 'Sözleşmeler',
      claim: isEnglish
        ? '"Online contract templates are just as good as lawyer-drafted ones."'
        : '"Çevrimiçi sözleşme şablonları avukat hazırladıkları kadar iyidir."',
      correctedFraming: isEnglish
        ? 'Templates are a useful starting point for understanding standard terms, but they cannot address your specific circumstances, jurisdiction, or business needs. Significant contracts should be reviewed by counsel familiar with your situation.'
        : 'Şablonlar standart terimleri anlamak için faydalı bir başlangıçtır, ancak özel koşullarınızı, yargı yetkisi gerekliliklerini veya iş ihtiyaçlarınızı karşılayamaz. Önemli sözleşmeler, durumunuzu bilen bir avukat tarafından incelenmelidir.',
      takeaway: isEnglish
        ? 'Templates are educational, not personalized advice'
        : 'Şablonlar eğiticidir, kişiselleştirilmiş tavsiye değildir',
    },
    {
      id: 5,
      category: isEnglish ? 'LLC & Business' : 'LLC ve İş',
      claim: isEnglish
        ? '"An LLC completely protects me from all personal liability."'
        : '"LLC beni tüm kişisel sorumluluktan tamamen korur."',
      correctedFraming: isEnglish
        ? 'LLCs provide limited liability, but courts can pierce that protection if you commingle personal and business finances, commit fraud, personally guarantee debts, or neglect corporate formalities.'
        : 'LLC\'ler sınırlı sorumluluk koruması sağlar, ancak kişisel ve işletme finanslarını karıştırırsanız, dolandırıcılık yaparsanız, borçları kişisel olarak garanti ederseniz veya kurumsal formaliteleri ihmal ederseniz bu koruma delinebilir.',
      takeaway: isEnglish
        ? 'LLC protection has limits and requirements'
        : 'LLC korumasının sınırları ve gereksinimleri var',
    },
    {
      id: 6,
      category: isEnglish ? 'Taxes' : 'Vergiler',
      claim: isEnglish
        ? '"If I\'m outside the US, I don\'t need to worry about US taxes."'
        : '"ABD dışındaysam ABD vergileri hakkında endişelenmeme gerek yok."',
      correctedFraming: isEnglish
        ? 'Owning a US LLC or earning US-source income can create filing obligations regardless of where you live—including annual returns, informational filings, and FBAR reporting for accounts with US signature authority.'
        : 'ABD LLC\'sine sahip olmak veya ABD kaynaklı gelir elde etmek, nerede yaşarsanız yaşayın beyanname yükümlülükleri oluşturabilir—yıllık beyannameler, bilgi formları ve ABD hesapları üzerindeki imza yetkisi için FBAR bildirimi dahil.',
      takeaway: isEnglish
        ? 'US business = potential US tax obligations'
        : 'ABD işi = potansiyel ABD vergi yükümlülükleri',
    },
    {
      id: 7,
      category: isEnglish ? 'Payments' : 'Ödemeler',
      claim: isEnglish
        ? '"I can receive payments through any method without tax implications."'
        : '"Herhangi bir yöntemle vergi etkisi olmadan ödeme alabilirim."',
      correctedFraming: isEnglish
        ? 'Payment platforms routinely report to tax authorities. PayPal, Stripe, and similar services issue 1099-K forms for US-based accounts. Wire transfers and other methods also generate records accessible to regulators.'
        : 'Ödeme platformları düzenli olarak vergi otoritelerine bildirimde bulunur. PayPal, Stripe ve benzeri hizmetler ABD merkezli hesaplar için 1099-K formları düzenler. Banka havaleleri ve diğer yöntemler de düzenleyicilerin erişebildiği kayıtlar oluşturur.',
      takeaway: isEnglish
        ? 'Payment methods create tax documentation'
        : 'Ödeme yöntemleri vergi belgeleri oluşturur',
    },
    {
      id: 8,
      category: isEnglish ? 'LLC & Business' : 'LLC ve İş',
      claim: isEnglish
        ? '"I need a US LLC to work with US clients."'
        : '"ABD müşterileriyle çalışmak için ABD LLC\'ye ihtiyacım var."',
      correctedFraming: isEnglish
        ? 'You can often serve US clients as a foreign individual or through a foreign entity. The decision to form a US LLC should weigh banking needs, payment processing, client expectations, and tax implications—not default assumptions.'
        : 'ABD müşterilerine yabancı bir birey olarak veya yabancı şirketiniz aracılığıyla hizmet verebilirsiniz. ABD LLC kurma kararı, bankacılık ihtiyaçları, ödeme işleme, müşteri beklentileri ve vergi etkilerine göre değerlendirilmeli—varsayımlara değil.',
      takeaway: isEnglish
        ? 'LLC is optional, not required for US business'
        : 'LLC isteğe bağlıdır, ABD işi için zorunlu değildir',
    },
    {
      id: 9,
      category: isEnglish ? 'Contracts' : 'Sözleşmeler',
      claim: isEnglish
        ? '"Verbal agreements are just as enforceable as written contracts."'
        : '"Sözlü anlaşmalar yazılı sözleşmeler kadar uygulanabilir."',
      correctedFraming: isEnglish
        ? 'Some verbal agreements are legally binding, but many contract types must be in writing to be enforceable under the Statute of Frauds. Even valid oral agreements are extremely difficult to prove in court without documentation.'
        : 'Bazı sözlü anlaşmalar hukuken bağlayıcıdır, ancak birçok sözleşme türü Dolandırıcılık Statüsü uyarınca uygulanabilir olmak için yazılı olmalıdır. Geçerli sözlü anlaşmaların bile yazılı belge olmadan mahkemede ispatı son derece güçtür.',
      takeaway: isEnglish
        ? 'Always get important agreements in writing'
        : 'Önemli anlaşmaları her zaman yazılı alın',
    },
    {
      id: 10,
      category: isEnglish ? 'LLC & Business' : 'LLC ve İş',
      claim: isEnglish
        ? '"All US states have the same LLC laws."'
        : '"Tüm ABD eyaletlerinin LLC yasaları aynıdır."',
      correctedFraming: isEnglish
        ? 'LLC laws vary significantly by state. Formation requirements, annual reports, fees, tax treatment, and operating agreement provisions all differ. What applies in Delaware may not apply in Wyoming or your home state.'
        : 'LLC yasaları eyalete göre önemli ölçüde farklılık gösterir. Kuruluş gereksinimleri, yıllık raporlar, ücretler, vergi muamelesi ve işletme sözleşmesi hükümleri hep farklıdır. Delaware\'de geçerli olan Wyoming\'de veya kendi eyaletinizde geçerli olmayabilir.',
      takeaway: isEnglish
        ? 'State laws differ—research your specific state'
        : 'Eyalet yasaları farklıdır—kendi eyaletinizi araştırın',
    },
  ]

  const categories = Array.from(new Set(misconceptions.map(m => m.category)))

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <JsonLdScript data={[scholarlySchema, breadcrumbSchema]} />

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">{isEnglish ? 'Common Mistakes' : 'Sık Yapılan Hatalar'}</span>
        </nav>

        {/* Article Header */}
        <article>
          <header className="mb-10">
            <span className="text-sm tracking-wide uppercase text-gray-500 mb-4 block">
              {isEnglish ? 'Legal Truth Library' : 'Hukuki Gerçekler Kütüphanesi'}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">
              {pageTitle}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {isEnglish
                ? 'Common misunderstandings among international entrepreneurs about US business formation, taxes, banking, and contracts.'
                : 'Uluslararası girişimcilerin ABD\'de şirket kurulumu, vergiler, bankacılık ve sözleşmeler hakkındaki yaygın yanlış anlamaları.'}
            </p>

            <InstitutionalBadge
              lang={lang}
              jurisdictions={['US']}
              lastReviewedAt={PAGE_META.dateModified}
              className="mb-4"
            />

            <p className="text-xs text-gray-500">
              <span className="font-medium">{isEnglish ? 'General notice' : 'Genel uyarı'}</span>
              {' — '}
              {isEnglish
                ? 'This guide is for educational purposes only and does not constitute legal, tax, or immigration advice. Consult a licensed professional for your situation.'
                : 'Bu rehber yalnızca eğitim amaçlıdır; hukuki, vergi veya göçmenlik tavsiyesi teşkil etmez. Durumunuza özel olarak lisanslı bir profesyonele danışın.'}
            </p>
          </header>

          {/* Category Navigation */}
          <nav className="mb-10 pb-4 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3 py-1 text-sm text-gray-600 border border-gray-300 hover:border-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-1 focus:ring-gray-400"
                >
                  {cat}
                </a>
              ))}
            </div>
          </nav>

          {/* Misconceptions by Category */}
          {categories.map((category) => (
            <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6 pb-2 border-b border-gray-200">
                {category}
              </h2>

              <div className="space-y-6">
                {misconceptions.filter(m => m.category === category).map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Claim */}
                    <div className="px-6 py-4">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {isEnglish ? 'Claim' : 'İddia'}
                      </span>
                      <p className="text-gray-900 font-medium mt-1">{item.claim}</p>
                    </div>

                    {/* Correct framing */}
                    <div className="px-6 py-4 border-t border-gray-100">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {isEnglish ? 'Correct framing' : 'Doğru çerçeve'}
                      </span>
                      <p className="text-gray-700 mt-1">{item.correctedFraming}</p>
                    </div>

                    {/* Takeaway */}
                    <div className="px-6 py-3 border-t border-gray-100">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {isEnglish ? 'Takeaway' : 'Sonuç'}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{item.takeaway}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Summary */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Key Principles to Remember' : 'Hatırlanması Gereken Temel İlkeler'}
            </h2>

            <div className="border border-gray-200 rounded-lg p-6">
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gray-400">1.</span>
                  <span>
                    {isEnglish
                      ? 'Business formation and immigration are separate processes.'
                      : 'Şirket kurulumu ve göçmenlik ayrı süreçlerdir.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gray-400">2.</span>
                  <span>
                    {isEnglish
                      ? '"No state tax" doesn\'t mean "no tax."'
                      : '"Eyalet vergisi yok" demek "vergi yok" demek değildir.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gray-400">3.</span>
                  <span>
                    {isEnglish
                      ? 'LLC protection has requirements and limitations.'
                      : 'LLC korumasının gereksinimleri ve sınırlamaları vardır.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gray-400">4.</span>
                  <span>
                    {isEnglish
                      ? 'US business activity creates US obligations.'
                      : 'ABD iş faaliyeti ABD yükümlülükleri oluşturur.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gray-400">5.</span>
                  <span>
                    {isEnglish
                      ? 'Always document important agreements in writing.'
                      : 'Önemli anlaşmaları her zaman yazılı olarak belgeleyin.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gray-400">6.</span>
                  <span>
                    {isEnglish
                      ? 'Consult professionals for your specific situation.'
                      : 'Özel durumunuz için profesyonellere danışın.'}
                  </span>
                </li>
              </ol>
            </div>
          </section>

          {/* Product CTA */}
          <div className="border border-gray-200 rounded-lg p-8 mb-12">
            <h2 className="text-xl font-bold text-black mb-3">
              {isEnglish ? 'Need Business Documents?' : 'İş Belgelerine İhtiyacınız Var mı?'}
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl">
              {isEnglish
                ? 'Our Business Starter Kit includes essential contracts for US business operations.'
                : 'Business Starter Kit\'imiz ABD iş operasyonları için temel sözleşmeleri içerir.'}
            </p>
            <Link
              href={`/${lang}/legal-kits/business-starter`}
              className="inline-block text-sm font-medium text-gray-900 border border-gray-300 px-6 py-3 hover:border-gray-600 transition-colors"
            >
              {isEnglish ? 'View Business Starter Kit →' : 'Business Starter Kit\'i Görüntüle →'}
            </Link>
          </div>

          {/* Related Resources */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-black mb-6">
              {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href={`/${lang}/library/llc-kurma-rehberi`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="text-sm font-semibold text-black mb-1">
                  {isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Understanding how to form an LLC in the US.'
                    : 'ABD\'de LLC kurmanın temellerini anlama.'}
                </p>
              </Link>

              <Link
                href={`/${lang}/library/irs-vergi-gercekleri`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="text-sm font-semibold text-black mb-1">
                  {isEnglish ? 'IRS & Tax Facts' : 'IRS ve Vergi Gerçekleri'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'W-8, W-9, 1099 forms explained.'
                    : 'W-8, W-9, 1099 formları açıklandı.'}
                </p>
              </Link>

              <Link
                href={`/${lang}/library/llc-vize-yanilgisi`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="text-sm font-semibold text-black mb-1">
                  {isEnglish ? 'LLC ≠ Visa' : 'LLC Kurmak Vize Vermez'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Understanding immigration realities.'
                    : 'Göçmenlik gerçeklerini anlama.'}
                </p>
              </Link>

              <Link
                href={`/${lang}/contracts`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="text-sm font-semibold text-black mb-1">
                  {isEnglish ? 'Contract Templates' : 'Sözleşme Şablonları'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Browse our library of legal templates.'
                    : 'Hukuki şablon kütüphanemize göz atın.'}
                </p>
              </Link>
            </div>
          </section>

          {/* Citation Block */}
          <CiteThisEntry
            lang={lang}
            title={isEnglish ? 'Common Legal Misconceptions About US Business' : 'ABD\'de İş Yapan Türklerin Sık Yapılan Hukuki Hataları'}
            url={pageUrl}
            version={PAGE_META.version}
            dateModified={PAGE_META.dateModified}
            citationKey={PAGE_META.citationKey}
          />
        </article>
      </main>
  )
}
