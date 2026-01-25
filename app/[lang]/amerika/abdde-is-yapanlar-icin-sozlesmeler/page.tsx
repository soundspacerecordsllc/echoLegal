import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import TrustStrip from '@/components/TrustStrip'
import FAQAccordion from '@/components/FAQAccordion'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? "Contracts for Doing Business in the US | EchoLegal"
      : "ABD'de İş Yapanlar İçin Sözleşmeler | EchoLegal",
    description: isEnglish
      ? "Essential contracts for US business operations. NDAs, service agreements, independent contractor agreements, and governing law selection."
      : "ABD iş operasyonları için temel sözleşmeler. NDA'lar, hizmet sözleşmeleri, bağımsız yüklenici sözleşmeleri ve governing law seçimi.",
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

  const faqItems = [
    {
      question: isEnglish ? "Do I need contracts in English even if I work with Turkish clients?" : "Türk müşterilerle çalışsam bile İngilizce sözleşmelere ihtiyacım var mı?",
      answer: isEnglish
        ? "If your LLC is US-based and you want US law to govern, English contracts with clear choice of law provisions are advisable. Bilingual versions can provide clarity for all parties."
        : "LLC'niz ABD merkezliyse ve ABD hukukunun yönetmesini istiyorsanız, açık hukuk seçimi hükümleri olan İngilizce sözleşmeler tavsiye edilir. İki dilli versiyonlar tüm taraflar için netlik sağlayabilir."
    },
    {
      question: isEnglish ? "What is a governing law clause?" : "Governing law (yürürlükteki hukuk) maddesi nedir?",
      answer: isEnglish
        ? "A governing law clause specifies which jurisdiction's laws will interpret and govern the contract. For US-based businesses, New York or Delaware law are common choices due to their well-developed commercial law."
        : "Governing law maddesi, hangi yargı alanının yasalarının sözleşmeyi yorumlayacağını ve yöneteceğini belirtir. ABD merkezli işletmeler için, iyi gelişmiş ticaret hukuku nedeniyle New York veya Delaware hukuku yaygın seçimlerdir."
    },
    {
      question: isEnglish ? "Should I use arbitration or court litigation?" : "Tahkim mi yoksa mahkeme davası mı kullanmalıyım?",
      answer: isEnglish
        ? "Arbitration is often faster and more private but can be expensive. Court litigation provides more formal procedures and appeal rights. For international disputes, arbitration with a recognized institution (AAA, ICC) is often preferred for enforceability."
        : "Tahkim genellikle daha hızlı ve daha özeldir ancak pahalı olabilir. Mahkeme davası daha resmi prosedürler ve temyiz hakları sağlar. Uluslararası uyuşmazlıklar için, tanınmış bir kurumla (AAA, ICC) tahkim genellikle uygulanabilirlik için tercih edilir."
    },
    {
      question: isEnglish ? "What makes a contract enforceable in the US?" : "Bir sözleşmeyi ABD'de uygulanabilir kılan nedir?",
      answer: isEnglish
        ? "Basic requirements: offer, acceptance, consideration (exchange of value), capacity, and legality. Written contracts are preferred for evidence. Some contracts (real estate, agreements lasting over a year) must be written under the Statute of Frauds."
        : "Temel gereksinimler: teklif, kabul, karşılık (değer değişimi), ehliyet ve yasallık. Kanıt için yazılı sözleşmeler tercih edilir. Bazı sözleşmeler (gayrimenkul, bir yıldan fazla süren anlaşmalar) Dolandırıcılık Yasası kapsamında yazılı olmalıdır."
    },
    {
      question: isEnglish ? "Do I need a lawyer to draft contracts?" : "Sözleşmeleri hazırlamak için avukata ihtiyacım var mı?",
      answer: isEnglish
        ? "Templates can work for straightforward situations. For significant deals, complex terms, or when the other party has legal representation, professional review is advisable. The cost of legal review is often less than the cost of a poorly drafted contract."
        : "Şablonlar basit durumlar için işe yarayabilir. Önemli anlaşmalar, karmaşık koşullar veya karşı tarafın hukuki temsili olduğunda, profesyonel inceleme tavsiye edilir. Hukuki incelemenin maliyeti genellikle kötü hazırlanmış bir sözleşmenin maliyetinden daha azdır."
    }
  ]

  const contractTypes = [
    {
      slug: 'nda',
      title: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
      desc: isEnglish
        ? 'Protects confidential information shared between parties. Essential before discussing business ideas, partnerships, or proprietary information.'
        : 'Taraflar arasında paylaşılan gizli bilgileri korur. İş fikirlerini, ortaklıkları veya özel bilgileri tartışmadan önce gereklidir.'
    },
    {
      slug: 'service-agreement',
      title: isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi',
      desc: isEnglish
        ? 'Defines scope, payment, timeline, and terms for providing services. Foundation of client relationships.'
        : 'Hizmet sunumu için kapsam, ödeme, zaman çizelgesi ve koşulları tanımlar. Müşteri ilişkilerinin temeli.'
    },
    {
      slug: 'independent-contractor',
      title: isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi',
      desc: isEnglish
        ? 'For hiring contractors (not employees). Crucial for establishing proper worker classification and IP ownership.'
        : 'Yüklenicileri (çalışan değil) işe almak için. Uygun işçi sınıflandırması ve fikri mülkiyet sahipliği oluşturmak için kritik.'
    },
    {
      slug: 'freelance-agreement',
      title: isEnglish ? 'Freelance Service Agreement' : 'Serbest Çalışan Hizmet Sözleşmesi',
      desc: isEnglish
        ? 'Tailored for freelance professionals. Covers project scope, revisions, payment terms, and ownership of work product.'
        : 'Serbest çalışan profesyoneller için özelleştirilmiş. Proje kapsamı, revizyonlar, ödeme koşulları ve iş ürünü sahipliğini kapsar.'
    },
    {
      slug: 'influencer-agreement',
      title: isEnglish ? 'Influencer Agreement' : 'Influencer Sözleşmesi',
      desc: isEnglish
        ? 'For brand collaborations and sponsored content. Includes FTC disclosure requirements, content rights, and exclusivity terms.'
        : 'Marka işbirlikleri ve sponsorlu içerik için. FTC ifşa gereksinimleri, içerik hakları ve münhasırlık koşullarını içerir.'
    }
  ]

  const relatedPages = [
    { slug: 'ny-law-neden-tercih-edilir', title: isEnglish ? 'Why Choose New York Law' : 'NY Law Neden Tercih Edilir' },
    { slug: 'abdde-llc-kurmak', title: isEnglish ? 'Forming an LLC in the US' : "ABD'de LLC Kurmak" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Home' : 'Ana Sayfa'}
            </Link>
            <Link href={`/${lang}/amerika`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Amerika Hub' : 'Amerika'}
            </Link>
            <Link
              href={`/${lang === 'en' ? 'tr' : 'en'}/amerika/abdde-is-yapanlar-icin-sozlesmeler`}
              className="border border-black rounded-full px-3 py-1 text-sm"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'Contracts for US Business' : "ABD'de İş Yapanlar İçin Sözleşmeler" }
          ]}
        />

        <TrustStrip lang={lang} />

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          📍 {isEnglish ? 'Jurisdiction: United States / New York' : 'Yargı Yetkisi: ABD / New York'}
        </span>

        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          {isEnglish ? "Contracts for Doing Business in the US" : "ABD'de İş Yapanlar İçin Sözleşmeler"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {isEnglish ? 'Last verified: January 2026' : 'Son doğrulama: Ocak 2026'}
        </p>

        {/* TL;DR */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="font-bold text-lg mb-3">TL;DR</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• {isEnglish
              ? "Written contracts are essential for US business operations"
              : "Yazılı sözleşmeler ABD iş operasyonları için gereklidir"}</li>
            <li>• {isEnglish
              ? "Governing law clause determines which state's law applies"
              : "Governing law maddesi hangi eyalet hukukunun geçerli olduğunu belirler"}</li>
            <li>• {isEnglish
              ? "New York law is commonly chosen for commercial contracts"
              : "New York hukuku ticari sözleşmeler için yaygın olarak seçilir"}</li>
            <li>• {isEnglish
              ? "NDAs should precede any confidential discussions"
              : "NDA'lar herhangi bir gizli tartışmadan önce gelmelidir"}</li>
            <li>• {isEnglish
              ? "Contractor vs employee classification has significant legal implications"
              : "Yüklenici vs çalışan sınıflandırmasının önemli hukuki etkileri vardır"}</li>
          </ul>
        </section>

        {/* Essential Contracts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'Essential Contract Types' : 'Temel Sözleşme Türleri'}
          </h2>

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

        {/* Key Contract Elements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Key Contract Elements' : 'Temel Sözleşme Unsurları'}
          </h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Governing Law' : 'Yürürlükteki Hukuk'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Specifies which state's laws will govern the contract. New York and Delaware are popular choices for commercial contracts."
                  : "Hangi eyalet yasalarının sözleşmeyi yöneteceğini belirtir. New York ve Delaware ticari sözleşmeler için popüler seçimlerdir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Dispute Resolution' : 'Uyuşmazlık Çözümü'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "How disputes will be resolved - litigation, arbitration, or mediation. Consider enforceability across borders for international parties."
                  : "Uyuşmazlıkların nasıl çözüleceği - dava, tahkim veya arabuluculuk. Uluslararası taraflar için sınırlar ötesi uygulanabilirliği düşünün."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Intellectual Property' : 'Fikri Mülkiyet'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Who owns work product, pre-existing IP, and derivative works. Critical for creative and technical services."
                  : "İş ürününü, önceden var olan fikri mülkiyeti ve türev eserleri kimin sahip olduğu. Yaratıcı ve teknik hizmetler için kritik."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Limitation of Liability' : 'Sorumluluk Sınırlaması'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Caps on damages and exclusions of certain damage types. Important for managing business risk."
                  : "Tazminat üst sınırları ve belirli tazminat türlerinin istisnaları. İş riskini yönetmek için önemli."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Termination' : 'Fesih'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "How either party can end the agreement, notice requirements, and what happens to ongoing obligations."
                  : "Her iki tarafın anlaşmayı nasıl sonlandırabileceği, bildirim gereksinimleri ve devam eden yükümlülüklere ne olacağı."}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQAccordion
          items={faqItems}
          title={isEnglish ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}
        />

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
              ? 'This content is for general informational purposes only. Templates should be reviewed and customized for your specific situation.'
              : 'Bu içerik yalnızca genel bilgilendirme amaçlıdır. Şablonlar özel durumunuz için gözden geçirilmeli ve özelleştirilmelidir.'}
          </p>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400">
            © 2025 EchoLegal. {isEnglish
              ? 'Prepared under supervision of NY licensed attorney (Bar #5552336).'
              : 'NY lisanslı avukat gözetiminde hazırlanmıştır (Bar #5552336).'}
          </p>
        </div>
      </footer>
    </div>
  )
}
