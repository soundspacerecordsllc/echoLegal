import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import TrustStrip from '@/components/TrustStrip'
import FAQAccordion from '@/components/FAQAccordion'
import { getRegistryEntry } from '@/lib/amerika-content-registry'
import InstitutionalBadge from '@/components/InstitutionalBadge'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? "LLC vs Corporation - Choosing Your US Business Structure | EchoLegal"
      : "LLC mi Corporation mu? - ABD'de Doğru İş Yapısını Seçmek | EchoLegal",
    description: isEnglish
      ? "Compare LLC and Corporation structures for your US business. Tax implications, liability protection, investor expectations, and when each makes sense."
      : "ABD işletmeniz için LLC ve Corporation yapılarının karşılaştırması. Vergisel sonuçlar, sorumluluk koruması, yatırımcı beklentileri ve hangi yapının ne zaman uygun olduğu.",
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
      question: isEnglish ? "Which is better for a startup seeking investors?" : "Yatırımcı arayan bir girişim için hangisi daha uygun?",
      answer: isEnglish
        ? "C-Corporations are generally preferred by venture capital investors. The familiar stock structure, ability to issue different share classes, and established legal framework make due diligence and investment structuring easier."
        : "Risk sermayesi yatırımcıları genellikle C-Corporation yapısını tercih eder. Alışılagelen hisse senedi yapısı, farklı hisse sınıfları ihraç edebilme imkanı ve yerleşik hukuki çerçeve, hem durum tespiti sürecini hem de yatırım yapılandırmasını kolaylaştırır."
    },
    {
      question: isEnglish ? "Can an LLC have investors?" : "LLC'nin yatırımcısı olabilir mi?",
      answer: isEnglish
        ? "Yes, LLCs can have investors through membership interests. However, the structure is less standardized than corporate stock, which can complicate negotiations and documentation. Some investors specifically require conversion to C-Corp."
        : "Evet, LLC'ler üyelik payları aracılığıyla yatırım alabilir. Ancak bu yapı, şirket hisselerine kıyasla daha az standartlaştırılmıştır; bu durum müzakereleri ve sözleşme sürecini karmaşıklaştırabilir. Bazı yatırımcılar C-Corp'a dönüşümü şart koşar."
    },
    {
      question: isEnglish ? "What is pass-through taxation?" : "Geçişli vergilendirme (pass-through) nedir?",
      answer: isEnglish
        ? "Pass-through means the business entity itself doesn't pay federal income tax. Instead, profits and losses 'pass through' to owners' personal tax returns. LLCs and S-Corps are pass-through by default. C-Corps face 'double taxation' - corporate tax plus shareholder tax on dividends."
        : "Geçişli vergilendirmede işletmenin kendisi federal gelir vergisi ödemez. Kar ve zararlar doğrudan sahiplerin kişisel vergi beyannamelerine yansır. LLC'ler ve S-Corp'lar varsayılan olarak bu rejime tabidir. C-Corp'larda ise 'çifte vergilendirme' söz konusudur: önce kurum kazancı vergilendirilir, ardından dağıtılan temettüler üzerinden hissedar vergisi alınır."
    },
    {
      question: isEnglish ? "Can I convert from LLC to Corporation later?" : "İleride LLC'den Corporation'a dönüşebilir miyim?",
      answer: isEnglish
        ? "Yes, conversion is possible in most states. However, conversion can trigger tax consequences and requires proper legal documentation. It's generally easier to start with the right structure than to convert later."
        : "Evet, çoğu eyalette dönüşüm mümkündür. Ancak bu süreç vergisel sonuçlar doğurabilir ve uygun hukuki belgelendirme gerektirir. Sonradan dönüştürmek yerine baştan doğru yapıyı seçmek genellikle daha pratiktir."
    },
    {
      question: isEnglish ? "What about S-Corporation?" : "S-Corporation ne anlama geliyor?",
      answer: isEnglish
        ? "S-Corp is a tax election, not a business structure. Both LLCs and Corporations can elect S-Corp taxation. S-Corp provides pass-through taxation but has restrictions: max 100 shareholders, only US residents/citizens, one class of stock."
        : "S-Corp bir iş yapısı değil, vergisel bir tercihtir. Hem LLC'ler hem de Corporation'lar S-Corp statüsünü seçebilir. Geçişli vergilendirme avantajı sunar ancak kısıtlamaları vardır: en fazla 100 hissedar, yalnızca ABD mukimi veya vatandaşları ve tek hisse sınıfı."
    },
    {
      question: isEnglish ? "Which has better liability protection?" : "Hangisinin sorumluluk koruması daha güçlü?",
      answer: isEnglish
        ? "Both LLCs and Corporations provide limited liability protection when properly maintained. The key is observing formalities - keeping business and personal finances separate, maintaining proper records, and following state requirements."
        : "Her iki yapı da usulüne uygun yönetildiğinde sınırlı sorumluluk koruması sağlar. Belirleyici olan formalitelere uyumdur: iş ve kişisel finansları ayrı tutmak, düzenli kayıt tutmak ve eyalet yükümlülüklerini yerine getirmek."
    },
    {
      question: isEnglish ? "Is an LLC easier to manage?" : "LLC'yi yönetmek daha mı kolay?",
      answer: isEnglish
        ? "Generally yes. LLCs have fewer required formalities - no mandatory board meetings, shareholder meetings, or detailed corporate minutes. However, you should still maintain proper records and an Operating Agreement."
        : "Genel olarak evet. LLC'lerde zorunlu formalite yükü daha azdır: yönetim kurulu toplantısı, hissedar toplantısı veya ayrıntılı şirket tutanağı tutma zorunluluğu yoktur. Bununla birlikte düzenli kayıt tutmanız ve Operating Agreement'ınızı güncel tutmanız gerekir."
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
          {isEnglish ? 'Jurisdiction: United States' : 'Yargı Yetkisi: ABD'}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {isEnglish ? "LLC vs Corporation" : "LLC mi Corp mu?"}
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
              ? "LLC: Simpler, flexible, pass-through taxation by default."
              : "LLC: Daha yalın yapı, esnek yönetim, varsayılan olarak geçişli vergilendirme."}</li>
            <li>• {isEnglish
              ? "C-Corp: Preferred by VC investors, can issue stock options, double taxation."
              : "C-Corp: Risk sermayesi yatırımcılarının tercihi, hisse opsiyonu imkanı, çifte vergilendirme."}</li>
            <li>• {isEnglish
              ? "S-Corp: Tax election (not a structure), pass-through with restrictions."
              : "S-Corp: Bir iş yapısı değil vergisel tercih; kısıtlamalarla geçişli vergilendirme."}</li>
            <li>• {isEnglish
              ? "Both provide liability protection when properly maintained."
              : "Her iki yapı da usulüne uygun yönetildiğinde sınırlı sorumluluk koruması sunar."}</li>
            <li>• {isEnglish
              ? "The 'right' choice depends on your specific goals and circumstances."
              : "Doğru seçim, hedeflerinize ve somut koşullarınıza göre belirlenir."}</li>
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
            {isEnglish ? 'When LLC Makes Sense' : 'LLC Ne Zaman Uygundur'}
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
                'Küçük ölçekli işletme veya serbest meslek faaliyeti',
                'Gayrimenkul yatırımları',
                'Az sayıda ortağı olan ve yalın yapı tercih eden işletmeler',
                'Dış yatırımcı alma planı bulunmayan yapılar',
                'Kurumsal formalite yükünden kaçınmak isteyenler',
                'Geçişli vergilendirmenin avantajlı olduğu durumlar'
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
