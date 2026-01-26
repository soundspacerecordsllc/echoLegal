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
      ? "Why Choose New York Law - Governing Law Selection | EchoLegal"
      : "NY Law Neden Tercih Edilir - Governing Law Seçimi | EchoLegal",
    description: isEnglish
      ? "Why New York law is preferred for international commercial contracts. Choice of law considerations and when NY law makes sense."
      : "Uluslararası ticari sözleşmeler için New York hukukunun neden tercih edildiği. Hukuk seçimi değerlendirmeleri ve NY hukukunun ne zaman mantıklı olduğu.",
  }
}

export default async function NYLawPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const registryEntry = getRegistryEntry('ny-law-neden-tercih-edilir')

  const faqItems = [
    {
      question: isEnglish ? "Can I choose New York law even if neither party is in New York?" : "Tarafların hiçbiri New York'ta olmasa bile New York hukukunu seçebilir miyim?",
      answer: isEnglish
        ? "Yes, under NY General Obligations Law § 5-1401, parties can choose NY law for contracts involving at least $250,000. This makes NY law accessible for significant commercial transactions regardless of party location."
        : "Evet, NY Genel Yükümlülükler Yasası § 5-1401 kapsamında, taraflar en az 250.000 dolar içeren sözleşmeler için NY hukukunu seçebilir. Bu, tarafların konumundan bağımsız olarak önemli ticari işlemler için NY hukukunu erişilebilir kılar."
    },
    {
      question: isEnglish ? "What is the difference between New York and Delaware law?" : "New York ve Delaware hukuku arasındaki fark nedir?",
      answer: isEnglish
        ? "Both are well-developed. Delaware is particularly known for corporate law (the Court of Chancery). NY is broader and often chosen for commercial contracts, financing transactions, and international deals."
        : "Her ikisi de iyi gelişmiştir. Delaware özellikle şirket hukuku (Court of Chancery) ile tanınır. NY daha geniştir ve genellikle ticari sözleşmeler, finansman işlemleri ve uluslararası anlaşmalar için seçilir."
    },
    {
      question: isEnglish ? "Does choosing NY law mean I have to sue in NY courts?" : "NY hukukunu seçmek NY mahkemelerinde dava açmam gerektiği anlamına mı gelir?",
      answer: isEnglish
        ? "Not necessarily. Governing law and dispute forum are separate. You can choose NY law to govern the contract while specifying arbitration or a different court for disputes. However, choosing NY courts (forum selection) often accompanies NY law choice."
        : "Mutlaka değil. Yürürlükteki hukuk ve uyuşmazlık forumu ayrıdır. Uyuşmazlıklar için tahkim veya farklı bir mahkeme belirtirken sözleşmeyi yönetmek için NY hukukunu seçebilirsiniz. Ancak, NY mahkemelerini seçmek (forum seçimi) genellikle NY hukuku seçimine eşlik eder."
    },
    {
      question: isEnglish ? "Is English required for NY law contracts?" : "NY hukuku sözleşmeleri için İngilizce gerekli mi?",
      answer: isEnglish
        ? "No legal requirement, but practical considerations favor English. NY courts operate in English, and most NY commercial law precedents and practice are in English. Bilingual contracts can specify which version controls."
        : "Yasal bir gereklilik yok, ancak pratik değerlendirmeler İngilizce'yi destekler. NY mahkemeleri İngilizce çalışır ve çoğu NY ticaret hukuku emsal ve uygulaması İngilizce'dir. İki dilli sözleşmeler hangi versiyonun geçerli olduğunu belirtebilir."
    },
    {
      question: isEnglish ? "What about consumer contracts or employment agreements?" : "Tüketici sözleşmeleri veya iş sözleşmeleri ne olacak?",
      answer: isEnglish
        ? "Choice of law has limitations. For consumer and employment contracts, mandatory protections of the consumer/employee's home jurisdiction often apply regardless of contractual choice. NY law choice works best for B2B commercial contracts."
        : "Hukuk seçiminin sınırlamaları var. Tüketici ve iş sözleşmeleri için, tüketici/çalışanın kendi yargı alanının zorunlu korumaları genellikle sözleşme seçiminden bağımsız olarak uygulanır. NY hukuku seçimi B2B ticari sözleşmeler için en iyi şekilde çalışır."
    }
  ]

  const relatedPages = [
    { slug: 'abdde-is-yapanlar-icin-sozlesmeler', title: isEnglish ? 'Contracts for US Business' : "ABD'de İş Yapanlar İçin Sözleşmeler" },
    { slug: 'abdde-llc-kurmak', title: isEnglish ? 'Forming an LLC in the US' : "ABD'de LLC Kurmak" },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'Why Choose New York Law' : 'NY Law Neden Tercih Edilir' }
          ]}
        />

        <TrustStrip lang={lang} />

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          📍 {isEnglish ? 'Jurisdiction: New York' : 'Yargı Yetkisi: New York'}
        </span>

        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          {isEnglish ? "Why Choose New York Law" : "NY Law Neden Tercih Edilir"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {isEnglish ? 'Last verified:' : 'Son doğrulama:'} {registryEntry?.lastVerified || '2026-01-25'}
        </p>

        {/* TL;DR */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="font-bold text-lg mb-3">TL;DR</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• {isEnglish
              ? "New York has well-developed commercial law with extensive case precedents"
              : "New York'un kapsamlı dava emsal kararlarıyla iyi gelişmiş ticaret hukuku var"}</li>
            <li>• {isEnglish
              ? "NY GOL § 5-1401 allows parties to choose NY law for contracts ≥$250K"
              : "NY GOL § 5-1401, tarafların ≥250K dolar sözleşmeler için NY hukukunu seçmesine izin verir"}</li>
            <li>• {isEnglish
              ? "International commercial contracts often specify NY law for predictability"
              : "Uluslararası ticari sözleşmeler genellikle öngörülebilirlik için NY hukukunu belirtir"}</li>
            <li>• {isEnglish
              ? "Governing law and dispute forum are separate choices"
              : "Yürürlükteki hukuk ve uyuşmazlık forumu ayrı seçimlerdir"}</li>
            <li>• {isEnglish
              ? "Not ideal for consumer/employment contracts due to mandatory local protections"
              : "Zorunlu yerel korumalar nedeniyle tüketici/iş sözleşmeleri için ideal değil"}</li>
          </ul>
        </section>

        {/* Why NY Law */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'Why New York Law is Preferred' : 'New York Hukuku Neden Tercih Edilir'}
          </h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Developed Case Law' : 'Gelişmiş İçtihat'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "NY courts have decided thousands of commercial disputes, creating extensive precedents. This means more predictable outcomes and clearer interpretations of contract terms."
                  : "NY mahkemeleri binlerce ticari uyuşmazlığı karara bağlayarak kapsamlı emsal kararlar oluşturmuştur. Bu, daha öngörülebilir sonuçlar ve sözleşme koşullarının daha net yorumları anlamına gelir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Commercial Division' : 'Ticaret Bölümü'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "NY Supreme Court has specialized Commercial Division courts with judges experienced in complex business disputes. Cases are handled more efficiently than general dockets."
                  : "NY Yüksek Mahkemesi, karmaşık iş uyuşmazlıklarında deneyimli hakimlerle uzmanlaşmış Ticaret Bölümü mahkemelerine sahiptir. Davalar genel dosyalardan daha verimli şekilde yürütülür."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Party Autonomy' : 'Taraf Özerkliği'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "NY law respects freedom of contract. Courts generally enforce terms as written without excessive paternalism, which sophisticated business parties often prefer."
                  : "NY hukuku sözleşme özgürlüğüne saygı gösterir. Mahkemeler genellikle aşırı paternalizm olmadan koşulları yazıldığı gibi uygular, bu da sofistike iş taraflarının genellikle tercih ettiği bir durumdur."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'International Recognition' : 'Uluslararası Tanınırlık'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "NY law is familiar to international parties and their counsel. Major financing, M&A, and cross-border transactions routinely use NY law, creating network effects."
                  : "NY hukuku uluslararası taraflara ve danışmanlarına aşinadır. Büyük finansman, M&A ve sınır ötesi işlemler rutin olarak NY hukukunu kullanır ve ağ etkileri yaratır."}
              </p>
            </div>
          </div>
        </section>

        {/* The $250K Rule */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'The $250,000 Rule' : '250.000 Dolar Kuralı'}
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-800 mb-4">
              {isEnglish
                ? "New York General Obligations Law § 5-1401 provides:"
                : "New York Genel Yükümlülükler Yasası § 5-1401 şunları sağlar:"}
            </p>
            <blockquote className="border-l-4 border-blue-400 pl-4 italic text-blue-900">
              {isEnglish
                ? "The parties to any contract...may agree that the law of this state shall govern their rights and duties in whole or in part, whether or not such contract...bears a reasonable relation to this state."
                : "Herhangi bir sözleşmenin tarafları... bu devletin hukukunun, sözleşmenin bu devletle makul bir ilişkisi olup olmadığına bakılmaksızın, haklarını ve görevlerini tamamen veya kısmen yöneteceğini kabul edebilir."}
            </blockquote>
            <p className="text-sm text-blue-700 mt-4">
              {isEnglish
                ? "This applies to contracts involving $250,000 or more in aggregate value."
                : "Bu, toplam değeri 250.000 dolar veya daha fazla olan sözleşmeler için geçerlidir."}
            </p>
          </div>
        </section>

        {/* When NOT to Choose NY Law */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'When NY Law May Not Be Ideal' : 'NY Hukuku Ne Zaman İdeal Olmayabilir'}
          </h2>

          <div className="space-y-4">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? 'Consumer Contracts' : 'Tüketici Sözleşmeleri'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Many jurisdictions have mandatory consumer protection laws that apply regardless of choice of law. A NY law clause won't override consumer protections in the consumer's home jurisdiction."
                  : "Birçok yargı alanı, hukuk seçiminden bağımsız olarak uygulanan zorunlu tüketici koruma yasalarına sahiptir. NY hukuku maddesi, tüketicinin kendi yargı alanındaki tüketici korumalarını geçersiz kılmaz."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? 'Employment Agreements' : 'İş Sözleşmeleri'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Employment law has strong local mandatory rules. Even with NY law choice, local labor laws where the employee works typically apply to key protections."
                  : "İş hukukunun güçlü yerel zorunlu kuralları vardır. NY hukuku seçimiyle bile, çalışanın çalıştığı yerdeki yerel iş yasaları genellikle temel korumalara uygulanır."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? 'Small Contracts' : 'Küçük Sözleşmeler'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "For contracts under $250,000, the special NY rule doesn't apply and courts may apply the law with the most significant relationship to the transaction."
                  : "250.000 doların altındaki sözleşmeler için özel NY kuralı uygulanmaz ve mahkemeler işlemle en önemli ilişkiye sahip hukuku uygulayabilir."}
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
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>NY General Obligations Law § 5-1401</span>
            </li>
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
              ? 'This content is for general informational purposes only and does not constitute legal advice.'
              : 'Bu içerik yalnızca genel bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez.'}
          </p>
        </div>
    </main>
  )
}
