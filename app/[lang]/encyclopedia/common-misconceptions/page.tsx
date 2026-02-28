import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import SearchButton from '@/components/SearchButton'
import InstitutionalBadge from '@/components/InstitutionalBadge'
import CiteThisEntry from '@/components/CiteThisEntry'
import Script from 'next/script'
import JsonLdScript from '@/components/JsonLdScript'
import PrimarySources from '@/components/PrimarySources'
import { getPrimarySources } from '@/lib/primary-sources-registry'
import { generateScholarlyArticleSchema, generateFAQSchema, generateBreadcrumbSchema, SITE_URL } from '@/lib/structured-data'
import CrossJurisdictionBadge from '@/components/CrossJurisdictionBadge'
import PracticalNextStep from '@/components/PracticalNextStep'
import type { PracticalMetadata } from '@/lib/encyclopedia-authority'

const PAGE_META = {
  slug: 'common-misconceptions',
  datePublished: '2025-10-01',
  dateModified: '2026-01-15',
  version: '1.0',
  wordCount: 2800,
  citationKey: 'ecl-enc-00005',
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const isEnglish = params.lang === 'en'
  const title = isEnglish
    ? 'Common Legal Misconceptions | EchoLegal'
    : 'Yaygın Yanlış Varsayımlar | EchoLegal'
  const url = `${SITE_URL}/${params.lang}/encyclopedia/${PAGE_META.slug}`

  return {
    title,
    description: isEnglish
      ? 'Common legal misconceptions about LLCs, immigration, contracts, and business law in the United States.'
      : 'LLC, göçmenlik, sözleşmeler ve ABD iş hukuku hakkında yaygın yanlış varsayımlar.',
    other: {
      'citation_title': isEnglish ? 'Common Legal Misconceptions' : 'Yaygın Yanlış Varsayımlar',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/10/01',
      'citation_lastmod': '2026/01/15',
      'citation_version': PAGE_META.version,
      'citation_language': params.lang,
      'citation_fulltext_html_url': url,
      'citation_id': PAGE_META.citationKey,
    },
  }
}

export default async function CommonMisconceptionsPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const pageUrl = `${SITE_URL}/${lang}/encyclopedia/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'Common Legal Misconceptions' : 'Yaygın Yanlış Varsayımlar'

  const scholarlySchema = generateScholarlyArticleSchema({
    title: isEnglish ? 'Common Legal Misconceptions' : 'Yaygın Yanlış Varsayımlar',
    alternativeHeadline: isEnglish ? 'Legal Myths — LLCs, Immigration, Contracts & Business Law' : 'Hukuki Yanılgılar — LLC, Göçmenlik, Sözleşmeler ve İş Hukuku',
    abstractText: isEnglish
      ? 'Widely believed but incorrect assumptions about business law, immigration, and contracts in the United States.'
      : 'ABD iş hukuku, göçmenlik ve sözleşmeler hakkında sık karşılaşılan yanlış inanışlar.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['legal-misconceptions', 'llc', 'immigration', 'contracts', 'business-law'],
    wordCount: PAGE_META.wordCount,
    citationKey: PAGE_META.citationKey,
    aboutTopics: ['Legal Misconceptions', 'Business Law', 'Immigration Law', 'Contract Law'],
  })

  const primarySources = getPrimarySources(PAGE_META.slug, lang)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Encyclopedia' : 'Ansiklopedi', url: `${SITE_URL}/${lang}/encyclopedia` },
    { name: pageTitle, url: pageUrl },
  ])

  const articleJsonLd = {
    ...scholarlySchema,
    description: isEnglish
      ? 'Common legal misconceptions about LLCs, immigration, contracts, and business law in the United States.'
      : 'LLC, göçmenlik, sözleşmeler ve ABD iş hukuku hakkında yaygın yanlış varsayımlar.',
    mainEntityOfPage: `${pageUrl}#webpage`,
    publisher: { '@type': 'Organization', name: 'EchoLegal', url: SITE_URL },
    author: { '@type': 'Organization', name: 'EchoLegal', url: SITE_URL },
  }

  const misconceptions = isEnglish ? [
    {
      myth: '"Forming an LLC gives me a visa"',
      fact: 'Owning an LLC does not grant any visa or immigration status. These are entirely separate legal processes.',
      details: 'You can own a U.S. company without having permission to live or work in the country. Certain visas like E-2 require substantial investment and active business operations—but the LLC itself is not what qualifies you. The visa application is a separate process through USCIS.'
    },
    {
      myth: '"Delaware is always the best choice"',
      fact: 'Delaware makes sense for specific situations: venture-backed startups, complex equity structures, or plans to go public. For simpler businesses, it can be overkill.',
      details: 'If you operate only in one state, forming your LLC there is often simpler and cheaper. You avoid paying fees in two states and dealing with foreign qualification requirements. Delaware\'s advantages matter most when sophisticated investors or legal structures are involved.'
    },
    {
      myth: '"A U.S. LLC lets me avoid all taxes"',
      fact: 'U.S. LLCs have tax obligations. The specifics depend on your residency, where you conduct business, and whether you have U.S.-sourced income.',
      details: 'Tax treatment varies based on how the LLC is classified (disregarded entity, partnership, or corporation) and your personal tax situation. Non-residents may still owe U.S. taxes on certain income. Professional tax advice is essential—generic information cannot replace it.'
    },
    {
      myth: '"A contract is only valid if notarized"',
      fact: 'Most contracts are valid without notarization. A contract requires offer, acceptance, consideration, and mutual intent—not a notary stamp.',
      details: 'Notarization adds authentication but is only legally required for specific documents like real estate deeds in some jurisdictions. Standard business contracts, NDAs, and service agreements do not need notarization to be enforceable.'
    },
    {
      myth: '"An NDA protects all my information"',
      fact: 'NDAs only protect information that qualifies as confidential under the agreement. Public information and independently developed knowledge cannot be restricted.',
      details: 'Courts will not enforce overly broad confidentiality clauses. Information that is already public, was known before the NDA, or was independently developed by the other party falls outside protection. Define your confidential information clearly and specifically.'
    },
    {
      myth: '"Independent contractors have no legal protections"',
      fact: 'Contractors have different protections than employees—but they are not unprotected. Contract law, payment rights, and intellectual property protections still apply.',
      details: 'Contractors can enforce payment terms through contract law, retain intellectual property rights if the contract allows, and sue for breach. What they lack are employment-specific benefits: unemployment insurance, workers\' compensation, and employer-provided health coverage.'
    }
  ] : [
    {
      myth: '"LLC\'m olması bana vize verir"',
      fact: 'Bir LLC kurmak, tek başına vize veya oturum hakkı sağlamaz. Şirket sahipliği ile göçmenlik tamamen ayrı süreçlerdir.',
      details: 'ABD\'de şirket sahibi olabilirsiniz, ancak bu size ülkede yaşama veya çalışma izni vermez. E-2 gibi bazı vizeler ciddi yatırım ve aktif iş faaliyeti gerektirir—ama vizeyi sağlayan LLC değil, ayrı bir USCIS başvurusudur.'
    },
    {
      myth: '"Delaware her zaman en iyi seçimdir"',
      fact: 'Delaware belirli durumlar için mantıklıdır: risk sermayesi destekli girişimler, karmaşık hisse yapıları veya halka arz planları. Basit işletmeler için gereksiz olabilir.',
      details: 'Yalnızca tek bir eyalette faaliyet gösteriyorsanız, LLC\'yi orada kurmak genellikle daha basit ve ucuzdur. İki eyalete ücret ödemekten ve yabancı şirket kaydı gerekliliklerinden kurtulursunuz. Delaware\'in avantajları, sofistike yatırımcılar veya karmaşık hukuki yapılar söz konusu olduğunda önem kazanır.'
    },
    {
      myth: '"ABD LLC\'siyle tüm vergilerden kaçınabilirim"',
      fact: 'ABD LLC\'lerinin vergi yükümlülükleri vardır. Detaylar ikametinize, iş yaptığınız yere ve ABD kaynaklı gelirinizin olup olmadığına göre değişir.',
      details: 'Vergi muamelesi, LLC\'nin nasıl sınıflandırıldığına (tek kişilik, ortaklık veya şirket) ve kişisel vergi durumunuza bağlıdır. ABD\'de ikamet etmeyenler bile bazı gelirler üzerinden vergi borçlu olabilir. Profesyonel vergi danışmanlığı şarttır—genel bilgiler bunun yerini tutamaz.'
    },
    {
      myth: '"Sözleşme ancak noter onaylıysa geçerlidir"',
      fact: 'Çoğu sözleşme noter onayı olmadan geçerlidir. Bir sözleşme için teklif, kabul, karşılık ve karşılıklı niyet gerekir—noter damgası değil.',
      details: 'Noter onayı kimlik doğrulaması sağlar, ancak yalnızca bazı yargı bölgelerindeki tapu senetleri gibi belirli belgeler için zorunludur. Standart iş sözleşmeleri, NDA\'lar ve hizmet anlaşmaları uygulanabilir olmak için noter onayı gerektirmez.'
    },
    {
      myth: '"NDA tüm bilgilerimi korur"',
      fact: 'NDA\'lar yalnızca sözleşmede gizli olarak tanımlanan bilgileri korur. Kamuya açık bilgiler ve bağımsız olarak geliştirilen bilgiler kısıtlanamaz.',
      details: 'Mahkemeler aşırı geniş gizlilik maddelerini uygulamaz. Zaten kamuya açık olan, NDA öncesinde bilinen veya karşı tarafça bağımsız olarak geliştirilen bilgiler koruma kapsamı dışındadır. Gizli bilgilerinizi açık ve spesifik şekilde tanımlayın.'
    },
    {
      myth: '"Bağımsız yüklenicilerin hiçbir yasal koruması yoktur"',
      fact: 'Yükleniciler, çalışanlardan farklı korumalara sahiptir—ancak korumasız değildir. Sözleşme hukuku, ödeme hakları ve fikri mülkiyet korumaları geçerlidir.',
      details: 'Yükleniciler ödeme şartlarını sözleşme hukuku aracılığıyla uygulayabilir, sözleşme izin veriyorsa fikri mülkiyet haklarını koruyabilir ve ihlal davası açabilir. Sahip olmadıkları, çalışanlara özgü haklardır: işsizlik sigortası, iş kazası tazminatı ve işveren sağlık sigortası.'
    }
  ]

  // Related contracts for cross-linking
  const relatedContracts = isEnglish ? [
    { slug: 'service-agreement', title: 'Service Agreement' },
    { slug: 'independent-contractor', title: 'Independent Contractor Agreement' },
    { slug: 'nda', title: 'Non-Disclosure Agreement (NDA)' },
  ] : [
    { slug: 'service-agreement', title: 'Hizmet Sözleşmesi' },
    { slug: 'independent-contractor', title: 'Bağımsız Yüklenici Sözleşmesi' },
    { slug: 'nda', title: 'Gizlilik Sözleşmesi (NDA)' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-bold">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <Link href={`/${lang}/contracts`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Contracts' : 'Sözleşmeler'}</Link>
            <Link href={`/${lang}/encyclopedia`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}</Link>
            <SearchButton lang={lang} />
            <Link href={`/${lang === 'en' ? 'tr' : 'en'}/encyclopedia/common-misconceptions`} className="border border-black rounded-full px-3 py-1 text-sm">{isEnglish ? 'TR' : 'EN'}</Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Script id="ld-article" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <JsonLdScript data={[breadcrumbSchema]} />

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <Link href={`/${lang}/encyclopedia`} className="hover:text-black">{isEnglish ? 'Encyclopedia' : 'Ansiklopedi'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'Common Misconceptions' : 'Yaygın Yanlış Varsayımlar'}</span>
        </nav>

        {/* Article Header */}
        <article>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {isEnglish ? 'Common Legal Misconceptions' : 'Yaygın Yanlış Varsayımlar'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'Widely believed but incorrect assumptions about business law, immigration, and contracts in the United States.'
              : 'ABD iş hukuku, göçmenlik ve sözleşmeler hakkında sık karşılaşılan yanlış inanışlar.'}
          </p>

          <InstitutionalBadge
            lang={lang}
            jurisdictions={['US']}
            lastReviewedAt={PAGE_META.dateModified}
            className="mb-12"
          />

          {/* Introduction */}
          <div className="bg-amber-50 border-l-4 border-[#C9A227] p-6 mb-12">
            <p className="text-gray-800 leading-relaxed">
              {isEnglish
                ? 'Legal myths lead to costly mistakes. This guide addresses misconceptions that business owners, entrepreneurs, and individuals commonly have about U.S. law. Understanding these distinctions helps you make better decisions.'
                : 'Hukuki yanılgılar maliyetli hatalara yol açar. Bu rehber, iş sahipleri, girişimciler ve bireylerin ABD hukuku hakkında sıkça düştüğü yanlışları ele alır. Bu ayrımları anlamak daha iyi kararlar vermenize yardımcı olur.'}
            </p>
          </div>

          {/* Misconceptions List */}
          <section className="space-y-8">
            {misconceptions.map((item, index) => (
              <div key={index} className="border-l-4 border-[#C9A227] bg-gray-50 rounded-r-lg overflow-hidden">
                {/* Myth Header */}
                <div className="px-6 py-4 bg-[#FEF3C7]">
                  <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                    {isEnglish ? 'Misconception' : 'Yanlış Varsayım'}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">
                    {item.myth}
                  </h3>
                </div>

                {/* Fact Section */}
                <div className="px-6 py-4">
                  <p className="text-gray-800 leading-relaxed font-medium">
                    {item.fact}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Related Contracts Section */}
          <section className="mt-12 bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {isEnglish ? 'Related Contracts & Templates' : 'İlgili Sözleşmeler ve Şablonlar'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedContracts.map((contract) => (
                <Link
                  key={contract.slug}
                  href={`/${lang}/contracts/${contract.slug}`}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
                >
                  <span className="font-medium text-gray-800">{contract.title}</span>
                  <span className="text-[#C9A227]">→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Key Takeaways */}
          <section className="mt-12 border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              {isEnglish ? 'Key Takeaways' : 'Önemli Noktalar'}
            </h2>
            <ul className="space-y-3">
              {(isEnglish ? [
                'Business formation and immigration are separate legal processes',
                'Liability protection requires ongoing compliance, not just registration',
                'Written contracts are preferable for evidentiary purposes',
                'Tax obligations depend on multiple factors—get professional advice',
                'Independent contractors have rights, just different ones than employees'
              ] : [
                'Şirket kurma ve göçmenlik ayrı hukuki süreçlerdir',
                'Sorumluluk koruması sadece kayıt değil, sürekli uyum gerektirir',
                'Yazılı sözleşmeler ispat açısından tercih edilir',
                'Vergi yükümlülükleri birçok faktöre bağlıdır—profesyonel danışmanlık alın',
                'Bağımsız yüklenicilerin hakları var, sadece çalışanlardan farklı'
              ]).map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#C9A227] font-bold">{i + 1}.</span>
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA Section */}
          <section className="mt-12">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">
                {isEnglish ? 'Need Legal Documents?' : 'Hukuki Belgelere mi İhtiyacınız Var?'}
              </h2>
              <p className="text-gray-300 mb-6">
                {isEnglish
                  ? 'Browse our professionally drafted contract templates. Available in English and Turkish. Pay what you can.'
                  : 'Profesyonelce hazırlanmış sözleşme şablonlarımıza göz atın. İngilizce ve Türkçe olarak mevcut. Gücünüz kadar ödeyin.'}
              </p>
              <Link
                href={`/${lang}/contracts`}
                className="inline-block bg-[#C9A227] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#B8922A] transition-colors"
              >
                {isEnglish ? 'Browse Contracts →' : 'Sözleşmelere Göz At →'}
              </Link>
            </div>
          </section>
          <PracticalNextStep
            lang={lang}
            className="mb-8"
            practical={isEnglish ? {
              affected: [
                'Individuals relying on informal legal assumptions',
                'Small business owners without legal counsel',
                'First-time founders',
              ],
              risk: 'Acting on common misconceptions may result in inadequate legal protection or unintended obligations.',
              nextStep: 'Identify which assumptions apply to your situation and verify them against the applicable statutory or regulatory framework.',
            } : {
              affected: [
                'Gayri resmi hukuki varsayımlara dayanan bireyler',
                'Hukuki danışmanlık almayan küçük işletme sahipleri',
                'İlk kez girişimciler',
              ],
              risk: 'Yaygın yanlış varsayımlara göre hareket etmek, yetersiz hukuki koruma veya istenmeyen yükümlülüklerle sonuçlanabilir.',
              nextStep: 'Durumunuza uygulanan varsayımları belirleyin ve bunları geçerli yasal veya düzenleyici çerçeveye göre doğrulayın.',
            }}
          />

          <PrimarySources sources={primarySources} lang={lang} />

          {/* Cite This Entry */}
          <CiteThisEntry
            lang={lang}
            title={isEnglish ? 'Common Legal Misconceptions' : 'Yaygın Yanlış Varsayımlar'}
            url={pageUrl}
            dateModified={PAGE_META.dateModified}
            version={PAGE_META.version}
            citationKey={PAGE_META.citationKey}
            contentType="encyclopedia-entry"
            className="mt-8"
          />

        </article>

        {/* Related Articles */}
        <section className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Articles' : 'İlgili Makaleler'}</h2>
          <ul className="space-y-2">
            <li>
              <Link href={`/${lang}/encyclopedia/what-is-nda`} className="text-[#C9A227] hover:underline">
                {isEnglish ? 'What is an NDA?' : 'NDA Nedir?'} →
              </Link>
              <CrossJurisdictionBadge lang={lang} sourceSlug={PAGE_META.slug} targetSlug="what-is-nda" />
            </li>
            <li>
              <Link href={`/${lang}/encyclopedia`} className="text-[#C9A227] hover:underline">
                {isEnglish ? 'Back to Encyclopedia' : 'Ansiklopediye Dön'} →
              </Link>
            </li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            {isEnglish
              ? 'LEGAL DISCLAIMER: This article is for educational purposes only and does not constitute legal advice. Laws vary by jurisdiction. Consult a licensed attorney for advice specific to your situation. Prepared under the supervision of a New York-licensed attorney.'
              : 'HUKUKI SORUMLULUK REDDİ: Bu makale yalnızca eğitim amaçlıdır ve hukuki tavsiye teşkil etmez. Yasalar yargı yetkisine göre değişir. Durumunuza özel tavsiye için lisanslı bir avukata danışın. New York lisanslı bir avukat gözetiminde hazırlanmıştır.'}
          </p>
          <p className="text-xs text-gray-400 mt-4">© 2025 EchoLegal.</p>
        </div>
      </footer>
    </div>
  )
}
