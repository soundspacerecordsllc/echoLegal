// app/[lang]/library/temel-sozlesmeler/page.tsx

import { getDictionary } from '@/get-dictionary'
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
  slug: 'temel-sozlesmeler',
  datePublished: '2025-09-01',
  dateModified: '2026-02-22',
  version: '2.0',
  wordCount: 3200,
  citationKey: 'ecl-gde-00003',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const url = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  return {
    title: isEnglish
      ? 'Essential Contracts for Turkish Entrepreneurs in the US | EchoLegal'
      : 'ABD\'de İş Yapan Türkler İçin Temel Sözleşmeler | EchoLegal',
    description: isEnglish
      ? 'Reference entry on the contracts most commonly required when a non-US entrepreneur begins doing business in or with the United States. Covers NDAs, service agreements, privacy policies, terms of service, and contractor agreements.'
      : 'ABD\'de veya ABD ile iş yapan yabancı girişimcilerin en sık ihtiyaç duyduğu sözleşmelere ilişkin başvuru maddesi. NDA, hizmet sözleşmeleri, gizlilik politikaları, kullanım koşulları ve yüklenici sözleşmelerini kapsar.',
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en/library/${PAGE_META.slug}`,
        'tr': `${SITE_URL}/tr/library/${PAGE_META.slug}`,
      },
    },
    other: {
      'citation_title': isEnglish ? 'Essential Contracts for Turkish Entrepreneurs in the US' : 'ABD\'de İş Yapan Türkler İçin Temel Sözleşmeler',
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
    type: 'USC',
    citation: '18 U.S.C. § 1836 et seq.',
    label: 'Defend Trade Secrets Act (DTSA)',
    url: 'https://www.law.cornell.edu/uscode/text/18/1836',
    authorityLevel: 'federal_statute',
    canonicalId: 'usc-18-1836',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
  {
    type: 'USC',
    citation: '15 U.S.C. § 45',
    label: 'FTC Act § 5 — unfair or deceptive acts',
    url: 'https://www.law.cornell.edu/uscode/text/15/45',
    authorityLevel: 'federal_statute',
    canonicalId: 'usc-15-45',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
  {
    type: 'CFR',
    citation: '16 C.F.R. Part 255',
    label: 'FTC Guides Concerning Use of Endorsements and Testimonials',
    url: 'https://www.law.cornell.edu/cfr/text/16/part-255',
    authorityLevel: 'federal_regulation',
    canonicalId: 'cfr-16-255',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
  {
    type: 'StateStatute',
    citation: 'Cal. Civ. Code § 1798.100 et seq.',
    label: 'California Consumer Privacy Act (CCPA)',
    url: 'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?division=3.&part=4.&lawCode=CIV&title=1.81.5',
    authorityLevel: 'state_statute',
    canonicalId: 'ca-civ-1798-100',
    jurisdiction: 'California',
    jurisdictionScope: 'US-CA',
  },
  {
    type: 'Guidance',
    citation: 'IRS, Independent Contractor (Self-Employed) or Employee?',
    label: 'Worker classification guidance',
    url: 'https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee',
    authorityLevel: 'agency_guidance',
    canonicalId: 'guidance-irs-worker-classification',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
  {
    type: 'Other',
    citation: 'Uniform Trade Secrets Act (UTSA)',
    label: 'Model act adopted in 48 states',
    authorityLevel: 'publication',
    canonicalId: 'publication-utsa',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
]

export default async function EssentialContractsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const pageUrl = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  const pageTitle = isEnglish
    ? 'Essential Contracts for US Business'
    : 'ABD\'de İş İçin Temel Sözleşmeler'

  const scholarlySchema = generateScholarlyArticleSchema({
    title: isEnglish ? 'Essential Contracts for Turkish Entrepreneurs in the US' : 'ABD\'de İş Yapan Türkler İçin Temel Sözleşmeler',
    abstractText: isEnglish
      ? 'A reference entry on the contracts most commonly required when a non-US entrepreneur begins doing business in or with the United States.'
      : 'ABD\'de veya ABD ile iş yapan yabancı girişimcilerin en sık ihtiyaç duyduğu sözleşmelere ilişkin başvuru maddesi.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['contracts', 'nda', 'service-agreement', 'privacy-policy', 'terms-of-service', 'independent-contractor', 'business-documents'],
    wordCount: PAGE_META.wordCount,
    citationKey: PAGE_META.citationKey,
    aboutTopics: ['Business Contracts', 'Trade Secrets', 'Privacy Law', 'US Business Law'],
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
        <span className="text-ink">{isEnglish ? 'Essential Contracts' : 'Temel Sözleşmeler'}</span>
      </nav>

      <article>
        {/* Header */}
        <header className="mb-16">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-6 leading-tight tracking-tight">
            {pageTitle}
          </h1>

          <p className="text-lg text-muted leading-relaxed max-w-prose mb-8">
            {isEnglish
              ? 'A reference entry on the contracts most commonly required when a non-US entrepreneur begins doing business in or with the United States.'
              : 'ABD\'de veya ABD ile iş yapan yabancı girişimcilerin en sık ihtiyaç duyduğu sözleşmelere ilişkin başvuru maddesi.'}
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
              ? 'This entry provides general information about common business contracts under US law. It does not constitute legal advice. Template documents referenced here should be reviewed by a licensed attorney before use.'
              : 'Bu madde, ABD hukuku kapsamındaki yaygın ticari sözleşmeler hakkında genel bilgi sunmaktadır. Hukuki tavsiye niteliği taşımaz. Burada atıfta bulunulan şablon belgeler, kullanılmadan önce lisanslı bir avukat tarafından incelenmelidir.'}
          </p>
        </div>

        <div className="entry-body">

          {/* §1 Scope & Method */}
          <h2>{isEnglish ? 'Scope & Method' : 'Kapsam ve Yöntem'}</h2>

          <p>
            {isEnglish
              ? 'This entry identifies the contracts most commonly required when a non-US entrepreneur — particularly one based in Turkey — begins commercial operations in the United States or enters into agreements with US-based counterparties. It covers both transactional agreements (service contracts, NDAs) and regulatory compliance documents (privacy policies, terms of service).'
              : 'Bu madde, ABD dışından — özellikle Türkiye merkezli — bir girişimcinin ABD\'de ticari faaliyetlere başlaması veya ABD merkezli karşı taraflarla sözleşme yapması durumunda en sık ihtiyaç duyulan sözleşmeleri tanımlamaktadır. Hem işlemsel sözleşmeleri (hizmet sözleşmeleri, NDA) hem de düzenleyici uyum belgelerini (gizlilik politikaları, kullanım koşulları) kapsar.'}
          </p>

          <p>
            {isEnglish
              ? 'The analysis addresses US federal law where applicable; state-level variation is noted where material. Cross-border considerations specific to Turkish entrepreneurs are addressed in a dedicated section. This entry does not cover entity formation documents, employment agreements for W-2 employees, or real estate contracts.'
              : 'Analiz, uygulanabilir olduğu durumlarda ABD federal hukukunu ele almaktadır; eyalet düzeyindeki farklılıklar önemli olduğu yerlerde belirtilmiştir. Türk girişimcilere özgü sınır ötesi hususlar ayrı bir bölümde ele alınmaktadır. Bu madde, şirket kuruluş belgeleri, W-2 çalışanlar için iş sözleşmeleri veya gayrimenkul sözleşmelerini kapsamamaktadır.'}
          </p>

          {/* §2 Key Takeaways */}
          <h2>{isEnglish ? 'Key Takeaways' : 'Temel Çıkarımlar'}</h2>

          <ul className="list-disc">
            <li>
              {isEnglish
                ? 'A non-disclosure agreement is the threshold document in most commercial relationships — it precedes substantive business discussions and is governed primarily by state trade secret law, supplemented by the federal Defend Trade Secrets Act.'
                : 'Gizlilik sözleşmesi, çoğu ticari ilişkide eşik belge niteliğindedir — esasa ilişkin iş görüşmelerinden önce gelir ve esas olarak eyalet ticari sır hukuku ile federal Ticari Sırların Korunması Yasası tarafından düzenlenir.'}
            </li>
            <li>
              {isEnglish
                ? 'Service agreements and independent contractor agreements serve distinct functions: the former defines the scope of work between a provider and a client; the latter establishes the classification of the worker to avoid misclassification liability.'
                : 'Hizmet sözleşmeleri ve bağımsız yüklenici sözleşmeleri farklı işlevlere hizmet eder: ilki, hizmet sağlayıcı ile müşteri arasındaki iş kapsamını tanımlar; ikincisi, yanlış sınıflandırma sorumluluğundan kaçınmak için çalışanın statüsünü belirler.'}
            </li>
            <li>
              {isEnglish
                ? 'A privacy policy is not optional for any business that collects user data online — it is a statutory requirement under CCPA, GDPR (where applicable), and various state consumer protection laws.'
                : 'Çevrimiçi kullanıcı verisi toplayan herhangi bir işletme için gizlilik politikası isteğe bağlı değildir — CCPA, GDPR (uygulanabilir olduğu durumlarda) ve çeşitli eyalet tüketici koruma yasaları kapsamında yasal bir gerekliliktir.'}
            </li>
            <li>
              {isEnglish
                ? 'Terms of service establish the contractual framework between a platform and its users, including liability limitations, governing law, and dispute resolution mechanisms.'
                : 'Kullanım koşulları, bir platform ile kullanıcıları arasındaki sözleşme çerçevesini — sorumluluk sınırlamaları, uygulanacak hukuk ve uyuşmazlık çözüm mekanizmaları dahil — oluşturur.'}
            </li>
            <li>
              {isEnglish
                ? 'For influencer and brand collaborations, FTC endorsement guidelines (16 C.F.R. Part 255) impose specific disclosure obligations that must be reflected in the agreement.'
                : 'İçerik üretici ve marka iş birlikleri için, FTC onay kılavuzları (16 C.F.R. Bölüm 255) sözleşmeye yansıtılması gereken belirli açıklama yükümlülükleri getirmektedir.'}
            </li>
          </ul>

          {/* §4 Analysis — each contract as a subsection */}
          <h2>{isEnglish ? 'Contracts in Detail' : 'Sözleşmeler Detaylı Olarak'}</h2>

          {/* NDA */}
          <h3>{isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)'}</h3>

          <p>
            {isEnglish
              ? 'A non-disclosure agreement is a contract by which one or both parties agree not to disclose confidential information received during a business relationship. NDAs are standard practice before sharing business plans, client data, proprietary methods, or technical specifications with potential partners, investors, or contractors.'
              : 'Gizlilik sözleşmesi, taraflardan birinin veya her ikisinin ticari ilişki sırasında aldıkları gizli bilgileri ifşa etmemeyi kabul ettiği bir sözleşmedir. NDA\'ler, iş planlarını, müşteri verilerini, tescilli yöntemleri veya teknik özellikleri potansiyel ortaklar, yatırımcılar veya yüklenicilerle paylaşmadan önce standart uygulamadır.'}
          </p>

          <p>
            {isEnglish
              ? 'The enforceability of an NDA depends primarily on state law. Most states have adopted some form of the Uniform Trade Secrets Act (UTSA), which provides the substantive framework for trade secret protection. At the federal level, the Defend Trade Secrets Act (18 U.S.C. § 1836 et seq.) provides a federal cause of action for trade secret misappropriation, but does not preempt state law.'
              : 'Bir NDA\'nın uygulanabilirliği esasen eyalet hukukuna bağlıdır. Çoğu eyalet, ticari sır koruması için esasa ilişkin çerçeveyi sağlayan Tek Tip Ticari Sırlar Yasası\'nın (UTSA) bir biçimini benimsemiştir. Federal düzeyde, Ticari Sırların Korunması Yasası (18 U.S.C. § 1836 ve devamı) ticari sır ihlali için federal bir dava hakkı sağlamakla birlikte eyalet hukukunun yerini almaz.'}
          </p>

          <p>
            <Link href={`/${lang}/contracts/nda`} className="arrow-link">
              {isEnglish ? 'View NDA Template' : 'NDA Şablonunu Görüntüle'} <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>

          {/* Service Agreement */}
          <h3>{isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}</h3>

          <p>
            {isEnglish
              ? 'A service agreement defines the terms under which one party provides services to another. It typically specifies the scope of work, deliverables, payment terms, timelines, and intellectual property allocation. In commercial practice, service agreements are the primary instrument for managing client relationships and preventing disputes over scope and compensation.'
              : 'Hizmet sözleşmesi, bir tarafın diğerine hizmet sunma koşullarını tanımlar. Genellikle iş kapsamını, teslim edilecekleri, ödeme koşullarını, zaman çizelgelerini ve fikri mülkiyet tahsisini belirtir. Ticari uygulamada, hizmet sözleşmeleri müşteri ilişkilerini yönetmek ve kapsam ile ücretlendirme konusundaki anlaşmazlıkları önlemek için temel araçtır.'}
          </p>

          <p>
            {isEnglish
              ? 'The agreement should address governing law — particularly important when the service provider is based outside the United States — as well as dispute resolution, indemnification, and limitation of liability provisions.'
              : 'Sözleşme, özellikle hizmet sağlayıcının ABD dışında bulunması halinde önem kazanan uygulanacak hukuku, uyuşmazlık çözümünü, tazminat ve sorumluluk sınırlaması hükümlerini ele almalıdır.'}
          </p>

          <p>
            <Link href={`/${lang}/contracts/service-agreement`} className="arrow-link">
              {isEnglish ? 'View Service Agreement Template' : 'Hizmet Sözleşmesi Şablonunu Görüntüle'} <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>

          {/* Independent Contractor Agreement */}
          <h3>{isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi'}</h3>

          <p>
            {isEnglish
              ? 'An independent contractor agreement establishes that a hired individual is a contractor rather than an employee. This distinction carries significant legal consequences: employers owe payroll taxes, benefits, and labor law protections to employees but not to independent contractors. Misclassification exposes the hiring party to back taxes, penalties, and potential liability under federal and state employment law.'
              : 'Bağımsız yüklenici sözleşmesi, işe alınan bir kişinin çalışan değil yüklenici olduğunu belirler. Bu ayrım önemli hukuki sonuçlar doğurur: işverenler çalışanlara bordro vergileri, yan haklar ve iş hukuku korumaları borçludur, ancak bağımsız yüklenicilere değil. Yanlış sınıflandırma, işe alan tarafı geriye dönük vergiler, cezalar ve federal ile eyalet iş hukuku kapsamında potansiyel sorumluluğa maruz bırakır.'}
          </p>

          <p>
            {isEnglish
              ? 'The IRS applies a multi-factor test examining behavioral control, financial control, and the type of relationship to determine worker classification. Several states, notably California (under AB 5 and the ABC test), apply stricter standards than the federal test.'
              : 'IRS, işçi sınıflandırmasını belirlemek için davranışsal kontrol, finansal kontrol ve ilişki türünü inceleyen çok faktörlü bir test uygular. Başta Kaliforniya (AB 5 ve ABC testi kapsamında) olmak üzere birçok eyalet, federal testten daha katı standartlar uygulamaktadır.'}
          </p>

          <p>
            <Link href={`/${lang}/contracts/independent-contractor`} className="arrow-link">
              {isEnglish ? 'View Contractor Agreement Template' : 'Yüklenici Sözleşmesi Şablonunu Görüntüle'} <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>

          {/* Privacy Policy */}
          <h3>{isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası'}</h3>

          <p>
            {isEnglish
              ? 'A privacy policy is a legally required disclosure document for any business that collects personal information from users — including names, email addresses, cookies, and analytics data. Unlike the other contracts in this entry, a privacy policy is not negotiated between parties; it is a unilateral disclosure mandated by statute.'
              : 'Gizlilik politikası, kullanıcılardan kişisel bilgi toplayan — isimler, e-posta adresleri, çerezler ve analitik veriler dahil — herhangi bir işletme için yasal olarak zorunlu bir bilgilendirme belgesidir. Bu maddedeki diğer sözleşmelerden farklı olarak, gizlilik politikası taraflar arasında müzakere edilmez; yasayla zorunlu kılınan tek taraflı bir bilgilendirmedir.'}
          </p>

          <p>
            {isEnglish
              ? 'The applicable regulatory framework depends on the location of users, not the business. A Turkish entrepreneur whose website is accessible to California residents must comply with the California Consumer Privacy Act (Cal. Civ. Code § 1798.100 et seq.). If European users access the service, the General Data Protection Regulation (GDPR) applies regardless of where the business is incorporated.'
              : 'Uygulanacak düzenleyici çerçeve, işletmenin değil kullanıcıların konumuna bağlıdır. Web sitesine Kaliforniya sakinlerinin erişebildiği bir Türk girişimci, Kaliforniya Tüketici Gizlilik Yasası\'na (Cal. Civ. Code § 1798.100 ve devamı) uymak zorundadır. Hizmete Avrupa\'daki kullanıcılar erişiyorsa, işletmenin nerede kurulduğuna bakılmaksızın Genel Veri Koruma Yönetmeliği (GDPR) uygulanır.'}
          </p>

          <p>
            <Link href={`/${lang}/contracts/privacy-policy`} className="arrow-link">
              {isEnglish ? 'View Privacy Policy Template' : 'Gizlilik Politikası Şablonunu Görüntüle'} <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>

          {/* Terms of Service */}
          <h3>{isEnglish ? 'Terms of Service' : 'Kullanım Koşulları'}</h3>

          <p>
            {isEnglish
              ? 'Terms of service (also "terms of use" or "terms and conditions") establish the contractual relationship between a website or application operator and its users. They typically address acceptable use policies, intellectual property rights, limitation of liability, governing law, and dispute resolution — including whether disputes are resolved by arbitration or litigation, and in which forum.'
              : 'Kullanım koşulları (ayrıca "kullanım şartları" veya "şartlar ve koşullar"), bir web sitesi veya uygulama işletmecisi ile kullanıcıları arasındaki sözleşme ilişkisini oluşturur. Genellikle kabul edilebilir kullanım politikalarını, fikri mülkiyet haklarını, sorumluluk sınırlamasını, uygulanacak hukuku ve uyuşmazlık çözümünü — uyuşmazlıkların tahkim veya dava yoluyla mı ve hangi forumda çözüleceği dahil — ele alır.'}
          </p>

          <p>
            {isEnglish
              ? 'The enforceability of terms of service depends on whether the user has manifested assent. "Clickwrap" agreements (requiring affirmative action such as checking a box) are generally enforceable; "browsewrap" agreements (posted on the site but requiring no affirmative act) are enforceable only where the user had actual or constructive notice.'
              : 'Kullanım koşullarının uygulanabilirliği, kullanıcının rıza gösterip göstermediğine bağlıdır. "Clickwrap" sözleşmeleri (onay kutusu işaretleme gibi olumlu bir eylem gerektiren) genellikle uygulanabilirdir; "browsewrap" sözleşmeleri (sitede yayınlanan ancak olumlu bir eylem gerektirmeyen) yalnızca kullanıcının fiili veya varsayılan bildirime sahip olduğu durumlarda uygulanabilirdir.'}
          </p>

          <p>
            <Link href={`/${lang}/contracts/terms-of-service`} className="arrow-link">
              {isEnglish ? 'View Terms of Service Template' : 'Kullanım Koşulları Şablonunu Görüntüle'} <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>

          {/* Freelance Service Agreement */}
          <h3>{isEnglish ? 'Freelance Service Agreement' : 'Serbest Çalışan Hizmet Sözleşmesi'}</h3>

          <p>
            {isEnglish
              ? 'A freelance service agreement is a variant of the general service agreement tailored for project-based or ongoing freelance engagements. It addresses concerns specific to freelance work: revision limits, milestone-based payment schedules, intellectual property transfer upon payment, and kill fees. Several US jurisdictions — including New York City (Freelance Isn\'t Free Act) — have enacted legislation providing specific protections for freelance workers, including mandatory written contracts for engagements above a statutory threshold.'
              : 'Serbest çalışan hizmet sözleşmesi, proje bazlı veya sürekli serbest çalışma ilişkileri için uyarlanmış genel hizmet sözleşmesinin bir varyantıdır. Serbest çalışmaya özgü konuları ele alır: revizyon sınırları, aşama bazlı ödeme takvimleri, ödeme üzerine fikri mülkiyet devri ve iptal ücretleri. New York City (Freelance Isn\'t Free Act) dahil olmak üzere birçok ABD yargı alanı, yasal bir eşiğin üzerindeki işler için zorunlu yazılı sözleşmeler dahil serbest çalışanlara özel korumalar sağlayan mevzuat çıkarmıştır.'}
          </p>

          <p>
            <Link href={`/${lang}/contracts/freelance-agreement`} className="arrow-link">
              {isEnglish ? 'View Freelance Agreement Template' : 'Serbest Çalışan Sözleşmesi Şablonunu Görüntüle'} <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>

          {/* Influencer / Brand Agreement */}
          <h3>{isEnglish ? 'Influencer and Brand Agreement' : 'İçerik Üretici ve Marka Sözleşmesi'}</h3>

          <p>
            {isEnglish
              ? 'An influencer or brand collaboration agreement governs the relationship between a content creator and a brand for sponsored content or promotional campaigns. Beyond standard service agreement terms, these agreements must address content usage rights (including duration and platform scope), exclusivity periods, and — critically — FTC compliance.'
              : 'İçerik üretici veya marka iş birliği sözleşmesi, sponsorlu içerik veya tanıtım kampanyaları için bir içerik üretici ile bir marka arasındaki ilişkiyi düzenler. Standart hizmet sözleşmesi koşullarının ötesinde, bu sözleşmeler içerik kullanım haklarını (süre ve platform kapsamı dahil), münhasırlık sürelerini ve — kritik olarak — FTC uyumluluğunu ele almalıdır.'}
          </p>

          <p>
            {isEnglish
              ? 'Under the FTC Act (15 U.S.C. § 45) and its implementing guidance (16 C.F.R. Part 255), any "material connection" between an endorser and a brand must be clearly and conspicuously disclosed. The agreement should specify the form and placement of these disclosures, and allocate liability for non-compliance.'
              : 'FTC Yasası (15 U.S.C. § 45) ve uygulama kılavuzu (16 C.F.R. Bölüm 255) kapsamında, bir onaylayıcı ile bir marka arasındaki herhangi bir "maddi bağlantı" açık ve belirgin şekilde ifşa edilmelidir. Sözleşme, bu ifşaların biçimini ve yerleşimini belirtmeli ve uyumsuzluk sorumluluğunu tahsis etmelidir.'}
          </p>

          <p>
            <Link href={`/${lang}/contracts/influencer-agreement`} className="arrow-link">
              {isEnglish ? 'View Influencer Agreement Template' : 'İçerik Üretici Sözleşmesi Şablonunu Görüntüle'} <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>

          {/* §6 Cross-Border Considerations */}
          <h2>{isEnglish ? 'Cross-Border Considerations' : 'Sınır Ötesi Hususlar'}</h2>

          <p>
            {isEnglish
              ? 'When one party is based in Turkey and the other in the United States, several additional dimensions require attention in contract drafting.'
              : 'Taraflardan birinin Türkiye\'de, diğerinin ABD\'de bulunması halinde, sözleşme hazırlamada birkaç ek boyut dikkat gerektirmektedir.'}
          </p>

          <p>
            {isEnglish
              ? 'Governing law and forum selection clauses determine which jurisdiction\'s law applies and where disputes are heard. In the absence of a governing law clause, courts apply conflict-of-laws principles that can produce unpredictable results — particularly when performance occurs in multiple jurisdictions. A clearly drafted choice-of-law clause avoids this uncertainty.'
              : 'Uygulanacak hukuk ve yetki mahkemesi seçim maddeleri, hangi yargı alanının hukukunun uygulanacağını ve uyuşmazlıkların nerede görüleceğini belirler. Uygulanacak hukuk maddesi bulunmadığında, mahkemeler — özellikle edimin birden fazla yargı alanında gerçekleştiği durumlarda — öngörülemeyen sonuçlar doğurabilecek kanunlar ihtilafı ilkelerini uygular. Açık bir hukuk seçimi maddesi bu belirsizliği ortadan kaldırır.'}
          </p>

          <p>
            {isEnglish
              ? 'Language control clauses specify which language version of the agreement prevails in the event of a discrepancy between the English and Turkish texts. This is particularly relevant for NDAs and service agreements where precise definitions of "confidential information" or "scope of work" may be interpreted differently across languages.'
              : 'Dil kontrolü maddeleri, İngilizce ve Türkçe metinler arasında bir tutarsızlık olması halinde sözleşmenin hangi dil versiyonunun geçerli olacağını belirtir. Bu, "gizli bilgi" veya "iş kapsamı" gibi kesin tanımların diller arasında farklı yorumlanabileceği NDA ve hizmet sözleşmeleri için özellikle önemlidir.'}
          </p>

          <p>
            {isEnglish
              ? 'Enforcement across borders presents practical challenges. A US court judgment may not be directly enforceable in Turkey without a separate proceeding, and vice versa. Arbitration clauses — particularly those designating institutions such as the ICC or ISTAC — can mitigate this, as arbitral awards are generally enforceable under the New York Convention (to which both the US and Turkey are signatories).'
              : 'Sınır ötesi icra pratik zorluklar sunar. ABD mahkeme kararı, ayrı bir dava açılmadan Türkiye\'de doğrudan icra edilemeyebilir ve bunun tersi de geçerlidir. Tahkim maddeleri — özellikle ICC veya İSTAC gibi kurumları belirleyenler — bunu hafifletebilir, çünkü tahkim kararları genellikle New York Sözleşmesi kapsamında (hem ABD hem de Türkiye\'nin taraf olduğu) icra edilebilirdir.'}
          </p>

          {/* §7 Risk Allocation & Common Failure Modes */}
          <h2>{isEnglish ? 'Risk Allocation and Common Failure Modes' : 'Risk Dağılımı ve Yaygın Başarısızlık Modları'}</h2>

          <p>
            {isEnglish
              ? 'The most frequent contractual failures among non-US entrepreneurs operating in the United States tend to follow identifiable patterns.'
              : 'ABD\'de faaliyet gösteren yabancı girişimciler arasında en sık görülen sözleşme başarısızlıkları belirli kalıpları takip etme eğilimindedir.'}
          </p>

          <p>
            <strong>{isEnglish ? 'Absent or ambiguous governing law clause.' : 'Bulunmayan veya belirsiz uygulanacak hukuk maddesi.'}</strong>{' '}
            {isEnglish
              ? 'Without a governing law clause, disputes default to conflict-of-laws analysis, which is expensive and unpredictable. This is the single most common deficiency in cross-border contracts reviewed by practitioners.'
              : 'Uygulanacak hukuk maddesi olmaksızın, uyuşmazlıklar pahalı ve öngörülemez olan kanunlar ihtilafı analizine tabi olur. Bu, uygulayıcılar tarafından incelenen sınır ötesi sözleşmelerde en yaygın tek eksikliktir.'}
          </p>

          <p>
            <strong>{isEnglish ? 'Worker misclassification.' : 'İşçi yanlış sınıflandırması.'}</strong>{' '}
            {isEnglish
              ? 'Engaging a worker as an independent contractor without a written agreement — or with an agreement that does not reflect the actual working relationship — creates exposure to back taxes, penalties, and benefits liability. The risk is heightened in states with strict classification standards.'
              : 'Bir çalışanı yazılı sözleşme olmaksızın veya fiili çalışma ilişkisini yansıtmayan bir sözleşmeyle bağımsız yüklenici olarak çalıştırmak, geriye dönük vergiler, cezalar ve yan hak yükümlülüğüne maruz kalma riski yaratır. Katı sınıflandırma standartlarına sahip eyaletlerde bu risk artmaktadır.'}
          </p>

          <p>
            <strong>{isEnglish ? 'Missing privacy policy.' : 'Eksik gizlilik politikası.'}</strong>{' '}
            {isEnglish
              ? 'Operating a website or application without a privacy policy — or with one that does not accurately describe data practices — violates CCPA, GDPR, and similar statutes. Enforcement actions can result in per-violation fines that accumulate rapidly.'
              : 'Gizlilik politikası olmaksızın veya veri uygulamalarını doğru şekilde tanımlamayan bir gizlilik politikasıyla bir web sitesi veya uygulama işletmek, CCPA, GDPR ve benzeri yasaları ihlal eder. Uygulama eylemleri, hızla biriken ihlal başına para cezalarıyla sonuçlanabilir.'}
          </p>

          <p>
            <strong>{isEnglish ? 'Unaddressed IP allocation.' : 'Ele alınmamış fikri mülkiyet tahsisi.'}</strong>{' '}
            {isEnglish
              ? 'Service agreements and contractor agreements that do not explicitly address intellectual property ownership leave both parties vulnerable. Under US copyright law (17 U.S.C. § 201), the default rule is that the creator owns the copyright unless there is a written "work made for hire" agreement or an express assignment.'
              : 'Fikri mülkiyet sahipliğini açıkça ele almayan hizmet sözleşmeleri ve yüklenici sözleşmeleri her iki tarafı da savunmasız bırakır. ABD telif hakkı hukuku kapsamında (17 U.S.C. § 201), varsayılan kural, yazılı bir "işe alma kapsamında eser" sözleşmesi veya açık bir devir olmadıkça, telif hakkının yaratıcıya ait olduğudur.'}
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
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'Entity formation and structuring for US operations' : 'ABD operasyonları için şirket kuruluşu ve yapılandırma'}</p>
            </Link>
            <Link href={`/${lang}/library/irs-vergi-gercekleri`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'IRS Tax Forms Explained' : 'IRS Vergi Formları Açıklamalı'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'W-8, W-9, and 1099 forms for non-US entrepreneurs' : 'ABD dışından girişimciler için W-8, W-9 ve 1099 formları'}</p>
            </Link>
            <Link href={`/${lang}/contracts`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'All Contract Templates' : 'Tüm Sözleşme Şablonları'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'Browse the full template library' : 'Tam şablon kütüphanesine göz atın'}</p>
            </Link>
          </div>
        </section>

        {/* Citation Block */}
        <CiteThisEntry
          lang={lang}
          title={isEnglish ? 'Essential Contracts for Turkish Entrepreneurs in the US' : 'ABD\'de İş Yapan Türkler İçin Temel Sözleşmeler'}
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
              ? ' — includes NDA, Service Agreement, and Privacy Policy templates.'
              : ' — NDA, Hizmet Sözleşmesi ve Gizlilik Politikası şablonlarını içerir.'}
          </p>
        </div>
      </article>
    </main>
  )
}
