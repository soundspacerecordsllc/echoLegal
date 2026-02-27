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
  slug: 'statuden-statuye-gecis-gercekleri',
  datePublished: '2025-06-01',
  dateModified: '2026-01-25',
  version: '1.0',
  citationKey: 'ecl-gde-00009',
}

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const url = `${SITE_URL}/${lang}/amerika/${PAGE_META.slug}`
  return {
    title: isEnglish
      ? "Status Change Realities - Change of Status & Adjustment | EchoLegal"
      : "Statü Değişikliği Gerçekleri - ABD'de Statü Geçişi ve Düzeltmesi | EchoLegal",
    description: isEnglish
      ? "The truth about changing immigration status in the US. 30/60 day rule, preconceived intent, and adjustment of status realities."
      : "ABD'de göçmenlik statüsü değişikliğine ilişkin gerçekler. 30/60 gün kuralı, önceden planlanmış niyet doktrini ve statü düzeltmesi süreci.",
    other: {
      'citation_title': isEnglish ? 'Status Change Realities' : 'Statüden Statüye Geçiş Gerçekleri',
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

export default async function StatuGecisPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'
  const registryEntry = getRegistryEntry('statuden-statuye-gecis-gercekleri')

  const faqItems = [
    {
      question: isEnglish ? "What is the 30/60 day rule?" : "30/60 gün kuralı nedir?",
      answer: isEnglish
        ? "If you engage in conduct inconsistent with your visa status within 30 days of entry, USCIS presumes you misrepresented your intent. Between 30-60 days, your conduct may be considered but doesn't create an automatic presumption. After 60 days, the presumption doesn't apply, but your overall circumstances still matter."
        : "ABD'ye girişinizden sonraki 30 gün içinde vize statünüzle bağdaşmayan bir davranışta bulunursanız, USCIS giriş niyetinizi yanlış beyan ettiğiniz karinesinden hareket eder. 30-60 gün arasında davranışınız dikkate alınabilir ancak otomatik karine doğmaz. 60 günden sonra bu karine uygulanmaz; bununla birlikte genel koşullarınız yine değerlendirilir."
    },
    {
      question: isEnglish ? "Can I change from tourist to student status?" : "Turist statüsünden öğrenci statüsüne geçebilir miyim?",
      answer: isEnglish
        ? "Technically possible, but if you entered intending to study, you should have applied for an F-1 visa. Changing status shortly after entry raises questions about your original intent. The timing and your explanation matter significantly."
        : "Hukuken mümkündür; ancak eğitim almak niyetiyle giriş yaptıysanız, doğrudan F-1 vizesiyle başvurmanız gerekirdi. Girişin hemen ardından statü değiştirmek, asıl niyetiniz hakkında ciddi soru işaretleri doğurur. Zamanlama ve açıklamanız büyük önem taşır."
    },
    {
      question: isEnglish ? "What is adjustment of status?" : "Statü düzeltmesi (adjustment of status) nedir?",
      answer: isEnglish
        ? "Adjustment of status is the process of changing from a non-immigrant status to permanent resident (green card) while physically in the US. It's different from consular processing, which requires leaving the US to get an immigrant visa at a consulate abroad."
        : "Statü düzeltmesi, ABD'de bulunurken göçmen olmayan statüden daimi oturma iznine (yeşil kart) geçiş sürecidir. Yurt dışındaki bir konsolosluktan göçmen vizesi almayı gerektiren konsolosluk işleminden farklı bir yoldur."
    },
    {
      question: isEnglish ? "Can I work while my change of status is pending?" : "Statü değişikliği başvurum devam ederken çalışabilir miyim?",
      answer: isEnglish
        ? "Generally no. A pending change of status application does not authorize employment. You need specific work authorization (EAD) or a status that permits work. Working without authorization can have severe consequences."
        : "Kural olarak hayır. Bekleyen bir statü değişikliği başvurusu size çalışma hakkı tanımaz. Bunun için ayrı bir çalışma izni belgesi (EAD) veya çalışmaya elverişli bir statü gerekir. İzinsiz çalışmanın ağır sonuçları olabilir."
    },
    {
      question: isEnglish ? "What happens if I overstay my visa?" : "İzin verilen süreyi aşarsam ne olur?",
      answer: isEnglish
        ? "Overstaying triggers serious consequences: visa voidance, potential bars on re-entry (3-year bar for 180+ days, 10-year bar for 1+ year), and difficulty with future immigration benefits. Unlawful presence accrues after your I-94 expires."
        : "Süre aşımı ciddi yaptırımlar doğurur: vizeniz geçersiz hale gelir, yeniden giriş yasakları devreye girer (180 günü aşan kalış için 3 yıl, 1 yılı aşan kalış için 10 yıl yasak) ve gelecekteki göçmenlik başvurularınız zorlaşır. I-94 süreniz dolduktan sonra hukuka aykırı kalış süresi işlemeye başlar."
    },
    {
      question: isEnglish ? "Can I change status if my I-94 expired?" : "I-94 sürem dolduysa statü değiştirebilir miyim?",
      answer: isEnglish
        ? "Generally not for most changes of status. You must typically be in valid status to change status. Adjustment of status has different rules and may be available in some circumstances even with status violations, but this is complex and case-specific."
        : "Çoğu statü değişikliği türü için hayır. Statü değiştirmek için kural olarak geçerli statüde olmanız gerekir. Statü düzeltmesi (adjustment of status) ise farklı kurallara tabidir ve bazı durumlarda statü ihlali olsa bile başvuru yapılabilir; ancak bu husus karmaşıktır ve her dosyanın koşullarına göre değerlendirilir."
    }
  ]

  const relatedPages = [
    { slug: 'abdye-gelme-yollari', title: isEnglish ? 'Pathways to the US' : "ABD'ye Gelme Yolları" },
    { slug: 'turist-vizesi-gercekleri', title: isEnglish ? 'Tourist Visa Realities' : 'Turist Vizesi Gerçekleri' },
    { slug: 'platform-ne-yapar-ne-yapmaz', title: isEnglish ? 'What This Platform Does' : 'Platform Ne Yapar Ne Yapmaz' },
  ]

  const pageUrl = `${SITE_URL}/${lang}/amerika/${PAGE_META.slug}`
  const pageTitle = isEnglish ? 'Status Change Realities' : 'Statüden Statüye Geçiş Gerçekleri'

  const articleSchema = generateArticleSchema({
    title: pageTitle,
    description: isEnglish
      ? 'The truth about changing immigration status in the US.'
      : "ABD'de göçmenlik statüsü değişikliğine ilişkin gerçekler.",
    url: pageUrl,
    datePublished: PAGE_META.datePublished,
    dateModified: PAGE_META.dateModified,
    lang,
    version: PAGE_META.version,
    keywords: ['change-of-status', 'immigration', 'visa-transition', 'uscis'],
    section: 'jurisdictional-guide',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEnglish ? 'Home' : 'Ana Sayfa', url: `${SITE_URL}/${lang}` },
    { name: isEnglish ? 'Amerika Hub' : 'Amerika Hub', url: `${SITE_URL}/${lang}/amerika` },
    { name: pageTitle, url: pageUrl },
  ])

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
        <JsonLdScript data={[articleSchema, breadcrumbSchema]} />
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'Status Change Realities' : 'Statüden Statüye Geçiş Gerçekleri' }
          ]}
        />

        <TrustStrip lang={lang} />

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          {isEnglish ? 'Jurisdiction: US Federal Immigration Law' : 'Yargı Yetkisi: ABD Federal Göçmenlik Hukuku'}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {isEnglish ? "Status Change Realities" : "Statüden Statüye Geçiş Gerçekleri"}
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
              ? "The 30/60 day rule creates presumptions about your intent when you entered."
              : "30/60 gün kuralı, giriş anındaki niyetinize ilişkin karineler öngörür."}</li>
            <li>• {isEnglish
              ? "Change of Status is different from Adjustment of Status (green card process)."
              : "Statü değişikliği ile statü düzeltmesi (yeşil kart süreci) farklı hukuki yollardır."}</li>
            <li>• {isEnglish
              ? "Entering with intent to change status can constitute misrepresentation."
              : "Statü değiştirme niyetiyle giriş yapmak yanlış beyan sayılabilir."}</li>
            <li>• {isEnglish
              ? "Overstaying triggers bars on future entry (3-year and 10-year bars)."
              : "Süre aşımı, gelecekteki girişlere yönelik yasakları tetikler (3 ve 10 yıllık yasaklar)."}</li>
            <li>• {isEnglish
              ? "Pending applications generally don't authorize work or extend status."
              : "Bekleyen başvurular kural olarak ne çalışma izni verir ne de statünüzü uzatır."}</li>
          </ul>
        </section>

        {/* Main Content */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Change of Status vs Adjustment of Status' : 'Statü Değişikliği ile Statü Düzeltmesi Arasındaki Fark'}
          </h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Change of Status (COS)' : 'Statü Değişikliği (COS)'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Changing from one non-immigrant status to another (e.g., B-2 tourist to F-1 student). Must be in valid status. Filed with USCIS using Form I-539 or I-129 depending on category."
                  : "Bir göçmen olmayan statüden diğerine geçiştir (örneğin B-2 turistten F-1 öğrenciye). Geçerli statüde olmanız şarttır. Kategoriye göre Form I-539 veya I-129 ile USCIS'e başvurulur."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Adjustment of Status (AOS)' : 'Statü Düzeltmesi (AOS)'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Changing from non-immigrant to immigrant status (permanent resident/green card) while in the US. Filed with Form I-485. Different eligibility rules than COS - some status violations may be forgiven."
                  : "ABD'de bulunurken göçmen olmayan statüden daimi oturma iznine (yeşil kart) geçiş sürecidir. Form I-485 ile başvurulur. COS'tan farklı uygunluk kurallarına tabidir ve bazı statü ihlalleri bağışlanabilir."}
              </p>
            </div>
          </div>
        </section>

        {/* 30/60 Day Rule */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'The 30/60 Day Rule Explained' : '30/60 Gün Kuralı Açıklaması'}
          </h2>

          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'Within 30 Days' : '30 Gün İçinde'}
              </h3>
              <p className="text-sm text-red-800">
                {isEnglish
                  ? "Engaging in conduct inconsistent with your visa status creates a presumption of willful misrepresentation. This is very difficult to overcome."
                  : "Vize statünüzle bağdaşmayan davranışlar, kasıtlı yanlış beyan karinesi doğurur. Bu karineyi çürütmek son derece güçtür."}
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '30-60 Days' : '30-60 Gün'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Your conduct may be considered as a factor, but there's no automatic presumption of misrepresentation. Your explanation and circumstances matter."
                  : "Davranışınız bir değerlendirme unsuru olarak dikkate alınabilir; ancak otomatik bir yanlış beyan karinesi doğmaz. Açıklamanız ve koşullarınız belirleyici olur."}
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">
                {isEnglish ? 'After 60 Days' : '60 Günden Sonra'}
              </h3>
              <p className="text-sm text-green-800">
                {isEnglish
                  ? "The timing presumption doesn't apply, but USCIS can still examine your overall intent and circumstances. Legitimate changes in circumstances should be documented."
                  : "Zamanlama karinesi artık uygulanmaz; ancak USCIS genel niyetinizi ve koşullarınızı yine inceleyebilir. Koşullarınızdaki gerçek değişiklikleri belgelemeniz önerilir."}
              </p>
            </div>
          </div>
        </section>

        {/* Common Misconceptions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Common Misconceptions and Risks' : 'Sık Karşılaşılan Yanılgılar ve Riskler'}
          </h2>

          <div className="space-y-4">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"I can always extend my status"' : '"Statümü her zaman uzatabilirim"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Extensions are not guaranteed. USCIS evaluates each request. Multiple extensions, especially without strong justification, become increasingly difficult to obtain."
                  : "Uzatma hakkı otomatik değildir. USCIS her talebi ayrı ayrı değerlendirir. Güçlü gerekçe sunulmadan yapılan birden fazla uzatma talebi, giderek daha zor kabul görür."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"My pending application protects me"' : '"Bekleyen başvurum beni korur"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "A pending change of status application generally doesn't extend your current status or authorize work. If your I-94 expires while pending, you may start accruing unlawful presence."
                  : "Bekleyen bir statü değişikliği başvurusu kural olarak mevcut statünüzü uzatmaz ve çalışma izni vermez. Başvurunuz sonuçlanmadan I-94 süreniz dolarsa, hukuka aykırı kalış süresi işlemeye başlayabilir."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"I can fix overstay later"' : '"Süre aşımını sonra hallederim"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Overstaying 180 days or more triggers a 3-year bar. One year or more triggers a 10-year bar. These bars apply when you leave and try to return. Certain waivers exist but are not easy to obtain."
                  : "180 gün ve üzeri süre aşımı 3 yıllık giriş yasağını, bir yıl ve üzeri ise 10 yıllık giriş yasağını tetikler. Bu yasaklar ülkeden ayrılıp geri dönmeye çalıştığınızda devreye girer. Muafiyet mekanizmaları mevcuttur ancak elde edilmesi kolay değildir."}
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
          <h2 className="text-2xl font-bold mb-4">
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
              ? 'This content is for general informational purposes only and does not constitute legal advice.'
              : 'Bu içerik yalnızca genel bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez.'}
          </p>
        </div>
    </main>
  )
}
