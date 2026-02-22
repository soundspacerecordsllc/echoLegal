// app/[lang]/library/irs-vergi-gercekleri/page.tsx

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
  slug: 'irs-vergi-gercekleri',
  datePublished: '2025-09-15',
  dateModified: '2026-02-22',
  version: '2.0',
  wordCount: 3100,
  citationKey: 'ecl-gde-00002',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const url = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  return {
    title: isEnglish
      ? 'US Tax Forms for Non-US Entrepreneurs: W-8, W-9, 1099 | EchoLegal'
      : 'ABD Dışından Girişimciler İçin Vergi Formları: W-8, W-9, 1099 | EchoLegal',
    description: isEnglish
      ? 'Reference entry on the US tax forms most relevant to non-US entrepreneurs. Covers W-8BEN, W-8BEN-E, W-9, 1099-NEC, withholding obligations, and the US–Turkey tax treaty.'
      : 'ABD dışından girişimciler için en ilgili ABD vergi formlarına ilişkin başvuru maddesi. W-8BEN, W-8BEN-E, W-9, 1099-NEC, stopaj yükümlülükleri ve ABD-Türkiye vergi anlaşmasını kapsar.',
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_URL}/en/library/${PAGE_META.slug}`,
        'tr': `${SITE_URL}/tr/library/${PAGE_META.slug}`,
      },
    },
    other: {
      'citation_title': isEnglish ? 'US Tax Forms for Non-US Entrepreneurs: W-8, W-9, 1099' : 'ABD Dışından Girişimciler İçin Vergi Formları: W-8, W-9, 1099',
      'citation_publisher': 'EchoLegal',
      'citation_publication_date': '2025/09/15',
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
    citation: '26 U.S.C. § 1441',
    label: 'Withholding of tax on nonresident aliens',
    url: 'https://www.law.cornell.edu/uscode/text/26/1441',
    authorityLevel: 'federal_statute',
    canonicalId: 'usc-26-1441',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
  {
    type: 'USC',
    citation: '26 U.S.C. § 7701(a)(30)',
    label: 'Definition of "United States person"',
    url: 'https://www.law.cornell.edu/uscode/text/26/7701',
    authorityLevel: 'federal_statute',
    canonicalId: 'usc-26-7701-a-30',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
  {
    type: 'USC',
    citation: '26 U.S.C. § 6041',
    label: 'Information at source — 1099 reporting requirements',
    url: 'https://www.law.cornell.edu/uscode/text/26/6041',
    authorityLevel: 'federal_statute',
    canonicalId: 'usc-26-6041',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
  {
    type: 'CFR',
    citation: '26 C.F.R. § 1.1441-1',
    label: 'Withholding of tax on nonresident aliens — regulations',
    url: 'https://www.law.cornell.edu/cfr/text/26/section-1.1441-1',
    authorityLevel: 'federal_regulation',
    canonicalId: 'cfr-26-1.1441-1',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
  {
    type: 'Guidance',
    citation: 'IRS Publication 515',
    label: 'Withholding of Tax on Nonresident Aliens and Foreign Entities',
    url: 'https://www.irs.gov/publications/p515',
    authorityLevel: 'agency_guidance',
    canonicalId: 'publication-irs-515',
    jurisdiction: 'United States',
    jurisdictionScope: 'US',
  },
  {
    type: 'Treaty',
    citation: 'U.S.\u2013Turkey Income Tax Treaty, TIAS 10205 (1996)',
    label: 'Convention for the avoidance of double taxation',
    url: 'https://www.irs.gov/businesses/international-businesses/turkey-tax-treaty-documents',
    authorityLevel: 'treaty',
    canonicalId: 'treaty-us-turkey-1996-tias-10205',
    jurisdiction: 'United States / Turkey',
    jurisdictionScope: 'US',
  },
]

export default async function IRSTaxFormsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const pageUrl = `${SITE_URL}/${lang}/library/${PAGE_META.slug}`
  const pageTitle = isEnglish
    ? 'US Tax Forms for Non-US Entrepreneurs'
    : 'ABD Dışından Girişimciler İçin Vergi Formları'

  const scholarlySchema = generateScholarlyArticleSchema({
    title: pageTitle,
    abstractText: isEnglish
      ? 'A reference entry on the US tax forms most relevant to non-US entrepreneurs doing business with American companies, including W-8BEN, W-9, 1099-NEC, and withholding obligations.'
      : 'ABD şirketleri ile iş yapan yabancı girişimciler için en ilgili ABD vergi formlarına — W-8BEN, W-9, 1099-NEC ve stopaj yükümlülükleri dahil — ilişkin başvuru maddesi.',
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['irs', 'w-8ben', 'w-9', '1099-nec', 'tax-forms', 'withholding-tax', 'tax-treaty', 'fatca'],
    wordCount: PAGE_META.wordCount,
    citationKey: PAGE_META.citationKey,
    aboutTopics: ['US Tax Forms', 'IRS', 'International Taxation', 'Withholding Tax'],
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
        <span className="text-ink">{isEnglish ? 'Tax Forms' : 'Vergi Formları'}</span>
      </nav>

      <article>
        {/* Header */}
        <header className="mb-16">
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink mb-6 leading-tight tracking-tight">
            {pageTitle}
          </h1>

          <p className="text-lg text-muted leading-relaxed max-w-prose mb-8">
            {isEnglish
              ? 'A reference entry on the IRS tax forms encountered by non-US entrepreneurs doing business with American companies, and the withholding framework that governs cross-border payments.'
              : 'ABD şirketleri ile iş yapan yabancı girişimcilerin karşılaştığı IRS vergi formlarına ve sınır ötesi ödemeleri düzenleyen stopaj çerçevesine ilişkin başvuru maddesi.'}
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
              ? 'This entry provides general information about US tax forms and withholding obligations. It does not constitute tax advice. Tax laws are complex, change frequently, and vary based on individual circumstances. Consult a qualified tax professional for your specific situation.'
              : 'Bu madde, ABD vergi formları ve stopaj yükümlülükleri hakkında genel bilgi sunmaktadır. Vergi tavsiyesi niteliği taşımaz. Vergi mevzuatı karmaşıktır, sık değişir ve bireysel koşullara göre farklılık gösterir. Kendi durumunuza özgü değerlendirme için uzman bir vergi danışmanına başvurun.'}
          </p>
        </div>

        <div className="entry-body">

          {/* Scope & Method */}
          <h2>{isEnglish ? 'Scope & Method' : 'Kapsam ve Yöntem'}</h2>

          <p>
            {isEnglish
              ? 'This entry explains the US tax forms most commonly encountered by non-US entrepreneurs who receive payments from or through US sources. It covers the W-8 series (for establishing foreign status), Form W-9 (for US persons and entities), the 1099 series (for information reporting), and the withholding framework under 26 U.S.C. § 1441. It also addresses the US\u2013Turkey income tax treaty where relevant.'
              : 'Bu madde, ABD kaynaklarından veya ABD kaynakları aracılığıyla ödeme alan yabancı girişimcilerin en sık karşılaştığı ABD vergi formlarını açıklamaktadır. W-8 serisini (yabancı statüsünün belirlenmesi), Form W-9\'u (ABD\'li kişi ve tüzel kişiler için), 1099 serisini (bilgi raporlaması) ve 26 U.S.C. § 1441 kapsamındaki stopaj çerçevesini kapsar. İlgili olduğu yerlerde ABD-Türkiye gelir vergisi anlaşmasını da ele almaktadır.'}
          </p>

          <p>
            {isEnglish
              ? 'This entry does not cover FATCA reporting requirements in detail, state-level tax obligations, or tax return preparation. The interaction between US tax obligations and the entrepreneur\'s home-country tax system requires professional analysis specific to the individual\'s circumstances.'
              : 'Bu madde, FATCA raporlama gerekliliklerini ayrıntılı olarak, eyalet düzeyindeki vergi yükümlülüklerini veya vergi beyannamesi hazırlamayı kapsamamaktadır. ABD vergi yükümlülükleri ile girişimcinin kendi ülkesindeki vergi sistemi arasındaki etkileşim, bireyin koşullarına özgü profesyonel analiz gerektirmektedir.'}
          </p>

          {/* Key Takeaways */}
          <h2>{isEnglish ? 'Key Takeaways' : 'Temel Çıkarımlar'}</h2>

          <ul className="list-disc">
            <li>
              {isEnglish
                ? 'The W-8 series (W-8BEN for individuals, W-8BEN-E for entities) certifies that a payee is not a "United States person" as defined under 26 U.S.C. § 7701(a)(30). The W-9 certifies US person status.'
                : 'W-8 serisi (bireyler için W-8BEN, tüzel kişiler için W-8BEN-E), alacaklının 26 U.S.C. § 7701(a)(30) kapsamında tanımlanan "ABD\'li kişi" olmadığını belgeler. W-9 ise ABD\'li kişi statüsünü belgeler.'}
            </li>
            <li>
              {isEnglish
                ? 'A US LLC is treated as a domestic entity for tax form purposes. Its owner provides a W-9 (with the LLC\'s EIN), not a W-8, regardless of the owner\'s nationality or residence.'
                : 'ABD LLC\'si vergi formu amaçları bakımından yerli kuruluş olarak muamele görür. Sahibi, uyruğu veya ikametgahı ne olursa olsun W-8 değil W-9 (LLC\'nin EIN\'i ile) sağlar.'}
            </li>
            <li>
              {isEnglish
                ? 'US payers are generally required to withhold 30% of payments to foreign persons under 26 U.S.C. § 1441, unless a reduced rate applies under an applicable tax treaty. The W-8BEN establishes eligibility for treaty benefits.'
                : 'ABD\'de ödeme yapanlar, uygulanabilir bir vergi anlaşması kapsamında indirimli oran geçerli olmadıkça, 26 U.S.C. § 1441 uyarınca yabancı kişilere yapılan ödemelerin %30\'unu stopaj olarak kesmekle yükümlüdür. W-8BEN, anlaşma avantajları için uygunluğu belirler.'}
            </li>
            <li>
              {isEnglish
                ? 'The 1099-NEC reports nonemployee compensation of $600 or more paid during a tax year. It is an information return filed by the payer, not a tax bill — but the income reported on it must be included in the recipient\'s tax filings.'
                : '1099-NEC, bir vergi yılı içinde ödenen 600 dolar ve üzeri bağımsız yüklenici ödemelerini raporlar. Ödeme yapan tarafından sunulan bir bilgi beyanıdır, vergi faturası değildir — ancak üzerinde raporlanan gelir alıcının vergi beyannamelerine dahil edilmelidir.'}
            </li>
          </ul>

          {/* W-8 Forms */}
          <h2>{isEnglish ? 'W-8 Series: Establishing Foreign Status' : 'W-8 Serisi: Yabancı Statüsünün Belirlenmesi'}</h2>

          <h3>W-8BEN</h3>

          <p>
            {isEnglish
              ? 'Form W-8BEN ("Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding and Reporting") is provided by a non-US individual to a US payer. It serves two functions: it certifies that the payee is not a US person (and therefore is not subject to standard US income tax reporting), and it allows the payee to claim reduced withholding rates under an applicable income tax treaty.'
              : 'W-8BEN Formu ("ABD Vergi Stopajı ve Raporlaması İçin Gerçek Hak Sahibinin Yabancı Statüsü Belgesi"), ABD dışından bir birey tarafından ABD\'deki ödeme yapan tarafa sağlanır. İki işleve hizmet eder: alacaklının ABD\'li kişi olmadığını belgeler (ve dolayısıyla standart ABD gelir vergisi raporlamasına tabi olmadığını) ve alacaklının uygulanabilir bir gelir vergisi anlaşması kapsamında indirimli stopaj oranları talep etmesine izin verir.'}
          </p>

          <p>
            {isEnglish
              ? 'The form requires the payee\'s country of citizenship, permanent address, and — if claiming treaty benefits — the specific treaty article and rate being claimed. A W-8BEN is valid for three years from the date of signing, after which it must be renewed.'
              : 'Form, alacaklının vatandaşlık ülkesini, daimi adresini ve — anlaşma avantajları talep ediliyorsa — talep edilen belirli anlaşma maddesini ve oranını gerektirir. W-8BEN, imza tarihinden itibaren üç yıl geçerlidir ve ardından yenilenmesi gerekir.'}
          </p>

          <h3>W-8BEN-E</h3>

          <p>
            {isEnglish
              ? 'Form W-8BEN-E serves the same function as W-8BEN but is used by foreign entities (corporations, partnerships, and other non-individual organizations). It is substantially more complex than the individual version, requiring detailed information about the entity\'s classification, FATCA status, and beneficial ownership structure.'
              : 'W-8BEN-E Formu, W-8BEN ile aynı işleve hizmet eder ancak yabancı tüzel kişiler (şirketler, ortaklıklar ve diğer bireysel olmayan kuruluşlar) tarafından kullanılır. Bireysel versiyondan önemli ölçüde daha karmaşıktır ve kuruluşun sınıflandırması, FATCA statüsü ve gerçek faydalanıcı yapısı hakkında ayrıntılı bilgi gerektirir.'}
          </p>

          {/* W-9 */}
          <h2>{isEnglish ? 'W-9: Certification of US Person Status' : 'W-9: ABD\'li Kişi Statüsünün Belgelenmesi'}</h2>

          <p>
            {isEnglish
              ? 'Form W-9 ("Request for Taxpayer Identification Number and Certification") is provided by US persons — including US citizens, residents, and domestic entities such as US-formed LLCs — to a requesting payer. The form provides the payee\'s taxpayer identification number (SSN, ITIN, or EIN) and certifies US person status.'
              : 'W-9 Formu ("Vergi Mükellefi Kimlik Numarası Talebi ve Beyanı"), ABD\'li kişiler — ABD vatandaşları, mukim kişiler ve ABD\'de kurulan LLC\'ler gibi yerli kuruluşlar dahil — tarafından talep eden ödeme yapan tarafa sağlanır. Form, alacaklının vergi kimlik numarasını (SSN, ITIN veya EIN) sağlar ve ABD\'li kişi statüsünü belgeler.'}
          </p>

          <p>
            {isEnglish
              ? 'A non-US entrepreneur who has formed a US LLC provides a W-9 on behalf of the LLC, not a W-8. The LLC is a domestic entity regardless of its owner\'s nationality. This is a common point of confusion: the relevant factor is the entity\'s formation jurisdiction, not the owner\'s residence or citizenship.'
              : 'ABD LLC\'si kurmuş bir yabancı girişimci, W-8 değil LLC adına W-9 sağlar. LLC, sahibinin uyruğuna bakılmaksızın yerli bir kuruluştur. Bu yaygın bir karışıklık noktasıdır: belirleyici faktör, sahibinin ikametgahı veya vatandaşlığı değil kuruluşun tescil yargı alanıdır.'}
          </p>

          {/* 1099 Series */}
          <h2>{isEnglish ? '1099 Series: Information Reporting' : '1099 Serisi: Bilgi Raporlaması'}</h2>

          <p>
            {isEnglish
              ? 'The 1099 series comprises information returns filed by payers to report various types of payments to the IRS. The form most relevant to entrepreneurs is the 1099-NEC (Nonemployee Compensation), which reports payments of $600 or more made to independent contractors and other non-employees during a tax year (26 U.S.C. § 6041).'
              : '1099 serisi, ödeme yapanlar tarafından IRS\'ye çeşitli ödeme türlerini bildirmek için sunulan bilgi beyanlarından oluşur. Girişimciler için en ilgili form, bir vergi yılı içinde bağımsız yüklenicilere ve diğer çalışan olmayan kişilere yapılan 600 dolar ve üzeri ödemeleri raporlayan 1099-NEC\'dir (Bağımsız Yüklenici Ödemeleri) (26 U.S.C. § 6041).'}
          </p>

          <p>
            {isEnglish
              ? 'The 1099-MISC (Miscellaneous Information) covers other payment types including rents, royalties, and prizes. Receiving a 1099 does not itself create a tax liability — it is an information document. However, the income reported on it must be accounted for in the recipient\'s tax filings in the applicable jurisdictions.'
              : '1099-MISC (Çeşitli Bilgiler) kiralar, telif ücretleri ve ikramiyeler dahil diğer ödeme türlerini kapsar. Bir 1099 almak kendi başına vergi yükümlülüğü yaratmaz — bu bir bilgi belgesidir. Ancak üzerinde raporlanan gelir, alıcının geçerli yargı alanlarındaki vergi beyannamelerinde hesaba katılmalıdır.'}
          </p>

          {/* Withholding */}
          <h2>{isEnglish ? 'Withholding on Payments to Foreign Persons' : 'Yabancı Kişilere Yapılan Ödemelerde Stopaj'}</h2>

          <p>
            {isEnglish
              ? 'Under 26 U.S.C. § 1441, US payers making payments of US-source income to non-US persons are generally required to withhold 30% of the gross payment and remit it to the IRS. This applies to fixed, determinable, annual, or periodical (FDAP) income — which includes service fees, royalties, and other compensation types common in cross-border business relationships.'
              : '26 U.S.C. § 1441 uyarınca, ABD kaynaklı gelir ödemesi yapan ABD\'deki ödeme yapanlar, genellikle brüt ödemenin %30\'unu stopaj olarak kesmek ve IRS\'ye göndermekle yükümlüdür. Bu, sabit, belirlenebilir, yıllık veya periyodik (FDAP) gelir için geçerlidir — ki bu, sınır ötesi iş ilişkilerinde yaygın olan hizmet ücretleri, telif ücretleri ve diğer ücret türlerini içerir.'}
          </p>

          <p>
            {isEnglish
              ? 'Tax treaties between the US and other countries may reduce or eliminate this withholding for specific income types. The US\u2013Turkey Income Tax Treaty (TIAS 10205, in force since 1996) provides reduced rates for certain categories of income, including dividends, interest, and royalties. Treaty benefits are claimed by completing the relevant W-8 form with the treaty article and rate.'
              : 'ABD ile diğer ülkeler arasındaki vergi anlaşmaları, belirli gelir türleri için bu stopajı azaltabilir veya ortadan kaldırabilir. ABD-Türkiye Gelir Vergisi Anlaşması (TIAS 10205, 1996\'dan bu yana yürürlükte) temettüler, faiz ve telif ücretleri dahil belirli gelir kategorileri için indirimli oranlar sağlamaktadır. Anlaşma avantajları, ilgili W-8 formunda anlaşma maddesi ve oranı belirtilerek talep edilir.'}
          </p>

          <p>
            {isEnglish
              ? 'The application of treaty benefits to specific payments depends on the nature of the income, the residency of the payee, and the specific treaty provisions — all of which require professional evaluation for a given transaction.'
              : 'Anlaşma avantajlarının belirli ödemelere uygulanması, gelirin niteliğine, alacaklının ikametgahına ve belirli anlaşma hükümlerine bağlıdır — bunların tümü belirli bir işlem için profesyonel değerlendirme gerektirir.'}
          </p>

          {/* Risk Allocation */}
          <h2>{isEnglish ? 'Common Failure Modes' : 'Yaygın Başarısızlık Modları'}</h2>

          <p>
            <strong>{isEnglish ? 'Providing the wrong form.' : 'Yanlış form sağlama.'}</strong>{' '}
            {isEnglish
              ? 'A non-US individual who provides a W-9 instead of a W-8BEN misrepresents their tax status, which can create withholding errors, reporting complications, and potential penalties. Conversely, a US LLC owner who provides a W-8 instead of a W-9 delays payment processing and may trigger additional compliance inquiries from the payer.'
              : 'W-8BEN yerine W-9 sağlayan ABD dışından bir birey vergi statüsünü yanlış beyan etmiş olur, bu da stopaj hataları, raporlama komplikasyonları ve potansiyel cezalar yaratabilir. Tersine, W-9 yerine W-8 sağlayan bir ABD LLC sahibi ödeme işlemlerini geciktirir ve ödeme yapan taraftan ek uyum sorgulamalarını tetikleyebilir.'}
          </p>

          <p>
            <strong>{isEnglish ? 'Failing to claim applicable treaty benefits.' : 'Geçerli anlaşma avantajlarını talep etmeme.'}</strong>{' '}
            {isEnglish
              ? 'A Turkish national who submits a W-8BEN without completing the treaty claim section (Part II) may be subject to the full 30% withholding rate on payments that would otherwise qualify for a reduced rate under the US\u2013Turkey treaty. The excess withholding can sometimes be recovered through a US tax return filing, but this creates additional administrative burden.'
              : 'W-8BEN\'i anlaşma talep bölümünü (Bölüm II) doldurmadan sunan bir Türk vatandaşı, aksi takdirde ABD-Türkiye anlaşması kapsamında indirimli orana hak kazanacak ödemeler üzerinde tam %30 stopaj oranına tabi olabilir. Fazla stopaj bazen bir ABD vergi beyannamesi başvurusuyla geri alınabilir, ancak bu ek idari yük yaratır.'}
          </p>

          <p>
            <strong>{isEnglish ? 'Neglecting to renew expired W-8 forms.' : 'Süresi dolmuş W-8 formlarını yenilememe.'}</strong>{' '}
            {isEnglish
              ? 'W-8BEN forms expire three years after signing. When a form expires, the US payer is required to apply backup withholding at the statutory rate until a new form is received. Maintaining current forms with US business partners avoids payment interruptions and unnecessary withholding.'
              : 'W-8BEN formları imzalanmadan sonra üç yıl içinde sona erer. Bir form süresi dolduğunda, ABD\'deki ödeme yapan taraf yeni bir form alınana kadar yasal oranda yedek stopaj uygulamakla yükümlüdür. ABD iş ortakları ile güncel formların sürdürülmesi ödeme kesintilerini ve gereksiz stopajı önler.'}
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
            <Link href={`/${lang}/library/temel-sozlesmeler`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'Essential Contracts for US Business' : 'ABD\'de İş İçin Temel Sözleşmeler'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'Contracts needed alongside tax compliance' : 'Vergi uyumluluğu ile birlikte ihtiyaç duyulan sözleşmeler'}</p>
            </Link>
            <Link href={`/${lang}/library/hukuki-yanilgilar`} className="block py-4 group">
              <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-accent transition-colors">{isEnglish ? 'Common Legal Misconceptions' : 'Yaygın Hukuki Yanılgılar'}</h3>
              <p className="text-sm text-muted">{isEnglish ? 'Tax myths and other misunderstandings' : 'Vergi mitleri ve diğer yanlış anlamalar'}</p>
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
