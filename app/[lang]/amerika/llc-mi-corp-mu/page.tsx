import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import TrustStrip from '@/components/TrustStrip'
import FAQAccordion from '@/components/FAQAccordion'
import { getRegistryEntry } from '@/lib/amerika-content-registry'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? "LLC vs Corporation - Choosing Your US Business Structure | EchoLegal"
      : "LLC mi Corp mu? - ABD İş Yapısı Seçimi | EchoLegal",
    description: isEnglish
      ? "Compare LLC and Corporation structures for your US business. Tax implications, liability protection, investor expectations, and when each makes sense."
      : "ABD işletmeniz için LLC ve Corporation yapılarını karşılaştırın. Vergi etkileri, sorumluluk koruması, yatırımcı beklentileri ve her birinin ne zaman mantıklı olduğu.",
  }
}

export default async function LLCvsCorpPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const registryEntry = getRegistryEntry('llc-mi-corp-mu')

  const faqItems = [
    {
      question: isEnglish ? "Which is better for a startup seeking investors?" : "Yatırımcı arayan bir startup için hangisi daha iyi?",
      answer: isEnglish
        ? "C-Corporations are generally preferred by venture capital investors. The familiar stock structure, ability to issue different share classes, and established legal framework make due diligence and investment structuring easier."
        : "C-Corporation'lar genellikle risk sermayesi yatırımcıları tarafından tercih edilir. Tanıdık hisse yapısı, farklı hisse sınıfları çıkarma yeteneği ve yerleşik yasal çerçeve, durum tespitini ve yatırım yapılandırmasını kolaylaştırır."
    },
    {
      question: isEnglish ? "Can an LLC have investors?" : "LLC'nin yatırımcıları olabilir mi?",
      answer: isEnglish
        ? "Yes, LLCs can have investors through membership interests. However, the structure is less standardized than corporate stock, which can complicate negotiations and documentation. Some investors specifically require conversion to C-Corp."
        : "Evet, LLC'lerin üyelik payları aracılığıyla yatırımcıları olabilir. Ancak yapı, kurumsal hisselerden daha az standartlaştırılmıştır, bu da müzakereleri ve belgelendirmeyi karmaşıklaştırabilir. Bazı yatırımcılar özellikle C-Corp'a dönüşüm gerektirir."
    },
    {
      question: isEnglish ? "What is pass-through taxation?" : "Geçişli vergilendirme nedir?",
      answer: isEnglish
        ? "Pass-through means the business entity itself doesn't pay federal income tax. Instead, profits and losses 'pass through' to owners' personal tax returns. LLCs and S-Corps are pass-through by default. C-Corps face 'double taxation' - corporate tax plus shareholder tax on dividends."
        : "Geçişli, işletme kuruluşunun kendisinin federal gelir vergisi ödemediği anlamına gelir. Bunun yerine, kar ve zararlar sahiplerin kişisel vergi beyannamelerine 'geçer'. LLC'ler ve S-Corp'lar varsayılan olarak geçişlidir. C-Corp'lar 'çifte vergilendirme' ile karşı karşıyadır - kurumlar vergisi artı temettüler üzerinden hissedar vergisi."
    },
    {
      question: isEnglish ? "Can I convert from LLC to Corporation later?" : "Daha sonra LLC'den Corporation'a dönüşebilir miyim?",
      answer: isEnglish
        ? "Yes, conversion is possible in most states. However, conversion can trigger tax consequences and requires proper legal documentation. It's generally easier to start with the right structure than to convert later."
        : "Evet, dönüşüm çoğu eyalette mümkündür. Ancak dönüşüm vergi sonuçlarını tetikleyebilir ve uygun yasal belgelendirme gerektirir. Daha sonra dönüştürmektense doğru yapıyla başlamak genellikle daha kolaydır."
    },
    {
      question: isEnglish ? "What about S-Corporation?" : "S-Corporation ne olacak?",
      answer: isEnglish
        ? "S-Corp is a tax election, not a business structure. Both LLCs and Corporations can elect S-Corp taxation. S-Corp provides pass-through taxation but has restrictions: max 100 shareholders, only US residents/citizens, one class of stock."
        : "S-Corp bir vergi seçimidir, iş yapısı değil. Hem LLC'ler hem de Corporation'lar S-Corp vergilendirmesini seçebilir. S-Corp geçişli vergilendirme sağlar ancak kısıtlamaları vardır: maksimum 100 hissedar, yalnızca ABD mukimleri/vatandaşları, tek hisse sınıfı."
    },
    {
      question: isEnglish ? "Which has better liability protection?" : "Hangisinin sorumluluk koruması daha iyi?",
      answer: isEnglish
        ? "Both LLCs and Corporations provide limited liability protection when properly maintained. The key is observing formalities - keeping business and personal finances separate, maintaining proper records, and following state requirements."
        : "Hem LLC'ler hem de Corporation'lar düzgün bir şekilde sürdürüldüğünde sınırlı sorumluluk koruması sağlar. Anahtar formalitelere uymaktır - iş ve kişisel finansları ayrı tutmak, uygun kayıtları sürdürmek ve eyalet gereksinimlerini takip etmek."
    },
    {
      question: isEnglish ? "Is an LLC easier to manage?" : "LLC yönetmesi daha kolay mı?",
      answer: isEnglish
        ? "Generally yes. LLCs have fewer required formalities - no mandatory board meetings, shareholder meetings, or detailed corporate minutes. However, you should still maintain proper records and an Operating Agreement."
        : "Genel olarak evet. LLC'lerin daha az zorunlu formalitesi vardır - zorunlu yönetim kurulu toplantıları, hissedar toplantıları veya ayrıntılı şirket tutanakları yok. Ancak yine de uygun kayıtları ve Operating Agreement'ı sürdürmelisiniz."
    }
  ]

  const relatedPages = [
    { slug: 'abdde-llc-kurmak', title: isEnglish ? 'Forming an LLC in the US' : "ABD'de LLC Kurmak" },
    { slug: 'irs-vergi-gercekleri', title: isEnglish ? 'IRS Tax Realities' : 'IRS Vergi Gerçekleri' },
    { slug: 'abdde-banka-hesabi', title: isEnglish ? 'US Bank Account' : "ABD'de Banka Hesabı" },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'LLC vs Corporation' : 'LLC mi Corp mu?' }
          ]}
        />

        <TrustStrip lang={lang} />

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          📍 {isEnglish ? 'Jurisdiction: United States' : 'Yargı Yetkisi: ABD'}
        </span>

        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          {isEnglish ? "LLC vs Corporation" : "LLC mi Corp mu?"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {isEnglish ? 'Last verified:' : 'Son doğrulama:'} {registryEntry?.lastVerified || '2026-01-25'}
        </p>

        {/* TL;DR */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="font-bold text-lg mb-3">TL;DR</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• {isEnglish
              ? "LLC: Simpler, flexible, pass-through taxation by default"
              : "LLC: Daha basit, esnek, varsayılan olarak geçişli vergilendirme"}</li>
            <li>• {isEnglish
              ? "C-Corp: Preferred by VC investors, can issue stock options, double taxation"
              : "C-Corp: VC yatırımcıları tarafından tercih edilir, hisse opsiyonu çıkarabilir, çifte vergilendirme"}</li>
            <li>• {isEnglish
              ? "S-Corp: Tax election (not a structure), pass-through with restrictions"
              : "S-Corp: Vergi seçimi (yapı değil), kısıtlamalarla geçişli"}</li>
            <li>• {isEnglish
              ? "Both provide liability protection when properly maintained"
              : "Her ikisi de düzgün sürdürüldüğünde sorumluluk koruması sağlar"}</li>
            <li>• {isEnglish
              ? "The 'right' choice depends on your specific goals and circumstances"
              : "'Doğru' seçim, özel hedeflerinize ve koşullarınıza bağlıdır"}</li>
          </ul>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'Quick Comparison' : 'Hızlı Karşılaştırma'}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">{isEnglish ? 'Factor' : 'Faktör'}</th>
                  <th className="border border-gray-200 p-3 text-left">LLC</th>
                  <th className="border border-gray-200 p-3 text-left">C-Corporation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">{isEnglish ? 'Default Taxation' : 'Varsayılan Vergilendirme'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Pass-through' : 'Geçişli'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Double taxation' : 'Çifte vergilendirme'}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 p-3 font-medium">{isEnglish ? 'Ownership' : 'Sahiplik'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Membership interests' : 'Üyelik payları'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Stock/shares' : 'Hisse senetleri'}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">{isEnglish ? 'Management' : 'Yönetim'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Flexible (member or manager)' : 'Esnek (üye veya yönetici)'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Board + Officers required' : 'Yönetim Kurulu + Yöneticiler gerekli'}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 p-3 font-medium">{isEnglish ? 'Formalities' : 'Formaliteler'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Fewer required' : 'Daha az gerekli'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Annual meetings, minutes, etc.' : 'Yıllık toplantılar, tutanaklar vb.'}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 p-3 font-medium">{isEnglish ? 'VC Investment' : 'VC Yatırımı'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Less common' : 'Daha az yaygın'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Standard/preferred' : 'Standart/tercih edilen'}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 p-3 font-medium">{isEnglish ? 'Stock Options' : 'Hisse Opsiyonları'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Complicated' : 'Karmaşık'}</td>
                  <td className="border border-gray-200 p-3">{isEnglish ? 'Standard mechanism' : 'Standart mekanizma'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* When to Choose LLC */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'When LLC Makes Sense' : 'LLC Ne Zaman Mantıklı'}
          </h2>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <ul className="space-y-3">
              {(isEnglish ? [
                'Small business or freelance operation',
                'Real estate holdings',
                'Business with few owners who want simplicity',
                'No plans for outside investment',
                'Want to avoid corporate formalities',
                'Pass-through taxation is advantageous for your situation'
              ] : [
                'Küçük işletme veya serbest çalışma operasyonu',
                'Gayrimenkul holdingleri',
                'Basitlik isteyen az sayıda sahibi olan işletme',
                'Dışarıdan yatırım planı yok',
                'Kurumsal formalitelerden kaçınmak isteyenler',
                'Geçişli vergilendirme durumunuz için avantajlı'
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-green-600">✓</span>
                  <span className="text-green-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* When to Choose Corporation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'When C-Corporation Makes Sense' : 'C-Corporation Ne Zaman Mantıklı'}
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <ul className="space-y-3">
              {(isEnglish ? [
                'Seeking venture capital or angel investment',
                'Plan to offer employee stock options',
                'Anticipate going public (IPO) eventually',
                'Want familiar structure for sophisticated investors',
                'Significant reinvestment of profits (retained earnings)',
                'Planning for eventual acquisition by larger company'
              ] : [
                'Risk sermayesi veya melek yatırımı arıyorsanız',
                'Çalışan hisse opsiyonları sunmayı planlıyorsanız',
                'Sonunda halka arz (IPO) yapmayı öngörüyorsanız',
                'Sofistike yatırımcılar için tanıdık yapı istiyorsanız',
                'Karların önemli ölçüde yeniden yatırımı (birikmiş karlar)',
                'Daha büyük şirket tarafından satın alınmayı planlıyorsanız'
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-blue-600">✓</span>
                  <span className="text-blue-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Common Misconceptions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Common Misconceptions' : 'Yaygın Yanlış Varsayımlar'}
          </h2>

          <div className="space-y-4">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"Corporations have better liability protection"' : '"Corporation\'ların sorumluluk koruması daha iyi"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Both structures provide comparable liability protection when properly maintained. The key is respecting the separation between personal and business - not the entity type."
                  : "Her iki yapı da düzgün sürdürüldüğünde karşılaştırılabilir sorumluluk koruması sağlar. Anahtar, kişisel ve iş ayrımına saygı göstermektir - kuruluş türü değil."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"LLCs can\'t have investors"' : '"LLC\'lerin yatırımcıları olamaz"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "LLCs can absolutely have investors. The structure is just less standardized, which can make negotiations more complex. Some institutional investors prefer corporations for familiarity."
                  : "LLC'lerin kesinlikle yatırımcıları olabilir. Yapı sadece daha az standartlaştırılmıştır, bu da müzakereleri daha karmaşık hale getirebilir. Bazı kurumsal yatırımcılar aşinalık için şirketleri tercih eder."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"You should always start with an LLC and convert later"' : '"Her zaman LLC ile başlamalı ve daha sonra dönüştürmelisiniz"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Conversion has costs and potential tax consequences. If you know you'll seek VC funding, starting as a C-Corp (typically Delaware) may be more efficient."
                  : "Dönüşümün maliyetleri ve potansiyel vergi sonuçları vardır. VC finansmanı arayacağınızı biliyorsanız, C-Corp olarak başlamak (genellikle Delaware) daha verimli olabilir."}
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

        {/* Disclaimer */}
        <div className="text-sm text-gray-500">
          <p>
            {isEnglish
              ? 'This content is for general informational purposes only and does not constitute legal or tax advice.'
              : 'Bu içerik yalnızca genel bilgilendirme amaçlıdır ve hukuki veya vergi tavsiyesi teşkil etmez.'}
          </p>
        </div>
    </main>
  )
}
