import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import TrustStrip from '@/components/TrustStrip'
import FAQAccordion from '@/components/FAQAccordion'
import KitCallout from '@/components/KitCallout'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? "Contracts for Doing Business in the US | EchoLegal"
      : "ABD'de Ticari Faaliyet İçin Gerekli Sözleşmeler | EchoLegal",
    description: isEnglish
      ? "Essential contracts for US business operations. NDAs, service agreements, independent contractor agreements, and governing law selection."
      : "ABD'de ticari faaliyet yürütenler için temel sözleşme türleri. NDA, hizmet sözleşmesi, bağımsız yüklenici sözleşmesi ve uygulanacak hukuk seçimi.",
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
      question: isEnglish ? "Do I need contracts in English even if I work with Turkish clients?" : "Türk müşterilerimle çalışırken bile sözleşmelerimi İngilizce hazırlamam gerekir mi?",
      answer: isEnglish
        ? "If your LLC is US-based and you want US law to govern, English contracts with clear choice of law provisions are advisable. Bilingual versions can provide clarity for all parties."
        : "LLC'niz ABD merkezliyse ve sözleşmeye ABD hukukunun uygulanmasını istiyorsanız, açık bir hukuk seçimi maddesi içeren İngilizce sözleşmeler hazırlamanız önerilir. İki dilli versiyonlar hazırlamak, tüm taraflar açısından netlik sağlar."
    },
    {
      question: isEnglish ? "What is a governing law clause?" : "Governing law (uygulanacak hukuk) maddesi nedir?",
      answer: isEnglish
        ? "A governing law clause specifies which jurisdiction's laws will interpret and govern the contract. For US-based businesses, New York or Delaware law are common choices due to their well-developed commercial law."
        : "Governing law maddesi, sözleşmenin hangi hukuk düzenine tâbi olacağını ve bu çerçevede nasıl yorumlanacağını belirler. ABD merkezli işletmeler, köklü ticaret hukuku birikimi nedeniyle genellikle New York veya Delaware hukukunu tercih eder."
    },
    {
      question: isEnglish ? "Should I use arbitration or court litigation?" : "Tahkim mi yoksa mahkeme yargılaması mı tercih etmeliyim?",
      answer: isEnglish
        ? "Arbitration is often faster and more private but can be expensive. Court litigation provides more formal procedures and appeal rights. For international disputes, arbitration with a recognized institution (AAA, ICC) is often preferred for enforceability."
        : "Tahkim genellikle daha hızlı ve gizlidir; ancak maliyeti yüksek olabilir. Mahkeme yargılaması ise daha resmi usul güvenceleri ve temyiz hakkı sunar. Uluslararası uyuşmazlıklarda, kararların tenfiz edilebilirliği açısından tanınmış kurumlar (AAA, ICC) nezdinde tahkim sıklıkla tercih edilir."
    },
    {
      question: isEnglish ? "What makes a contract enforceable in the US?" : "ABD hukukuna göre bir sözleşmenin geçerli ve uygulanabilir olması için ne gerekir?",
      answer: isEnglish
        ? "Basic requirements: offer, acceptance, consideration (exchange of value), capacity, and legality. Written contracts are preferred for evidence. Some contracts (real estate, agreements lasting over a year) must be written under the Statute of Frauds."
        : "Temel unsurlar: icap, kabul, karşılık (ivaz), ehliyet ve hukuka uygunluk. İspat kolaylığı açısından yazılı sözleşme tercih edilir. Bazı sözleşmelerin (gayrimenkul işlemleri, süresi bir yılı aşan anlaşmalar gibi) Statute of Frauds kuralı gereğince yazılı yapılması zorunludur."
    },
    {
      question: isEnglish ? "Do I need a lawyer to draft contracts?" : "Sözleşme hazırlamak için avukata ihtiyacım var mı?",
      answer: isEnglish
        ? "Templates can work for straightforward situations. For significant deals, complex terms, or when the other party has legal representation, professional review is advisable. The cost of legal review is often less than the cost of a poorly drafted contract."
        : "Basit işlemler için şablonlar yeterli olabilir. Ancak önemli tutarlı anlaşmalarda, karmaşık hükümlerde veya karşı tarafın avukatla temsil edildiği durumlarda profesyonel hukuki inceleme şiddetle tavsiye edilir. Bir avukatın inceleme maliyeti, kötü hazırlanmış bir sözleşmenin doğuracağı zararın yanında genellikle düşük kalır."
    }
  ]

  const contractTypes = [
    {
      slug: 'nda',
      title: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
      desc: isEnglish
        ? 'Protects confidential information shared between parties. Essential before discussing business ideas, partnerships, or proprietary information.'
        : 'Taraflar arasında paylaşılan gizli bilgilerin korunmasını sağlar. İş fikirleri, ortaklık görüşmeleri veya ticari sır niteliğindeki bilgilerin paylaşılmasından önce mutlaka imzalanmalıdır.'
    },
    {
      slug: 'service-agreement',
      title: isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi',
      desc: isEnglish
        ? 'Defines scope, payment, timeline, and terms for providing services. Foundation of client relationships.'
        : 'Sunulacak hizmetin kapsamını, ödeme koşullarını, takvimini ve genel şartlarını düzenler. Müşteri ilişkilerinin hukuki temelini oluşturur.'
    },
    {
      slug: 'independent-contractor',
      title: isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi',
      desc: isEnglish
        ? 'For hiring contractors (not employees). Crucial for establishing proper worker classification and IP ownership.'
        : 'Çalışan değil yüklenici olarak hizmet alımında kullanılır. İşçi sınıflandırmasının doğru yapılması ve fikri mülkiyet haklarının belirlenmesi açısından kritik öneme sahiptir.'
    },
    {
      slug: 'freelance-agreement',
      title: isEnglish ? 'Freelance Service Agreement' : 'Serbest Çalışan Hizmet Sözleşmesi',
      desc: isEnglish
        ? 'Tailored for freelance professionals. Covers project scope, revisions, payment terms, and ownership of work product.'
        : 'Serbest çalışan profesyonellere özel olarak düzenlenmiştir. Proje kapsamı, revizyon hakları, ödeme koşulları ve ortaya çıkan eserin mülkiyetini düzenler.'
    },
    {
      slug: 'influencer-agreement',
      title: isEnglish ? 'Influencer Agreement' : 'Influencer Sözleşmesi',
      desc: isEnglish
        ? 'For brand collaborations and sponsored content. Includes FTC disclosure requirements, content rights, and exclusivity terms.'
        : 'Marka iş birlikleri ve sponsorlu içerik üretimi için hazırlanmıştır. FTC bilgilendirme yükümlülükleri, içerik hakları ve münhasırlık koşullarını kapsar.'
    }
  ]

  const relatedPages = [
    { slug: 'ny-law-neden-tercih-edilir', title: isEnglish ? 'Why Choose New York Law' : 'New York Hukuku Neden Tercih Edilir' },
    { slug: 'abdde-llc-kurmak', title: isEnglish ? 'Forming an LLC in the US' : "ABD'de LLC Kurmak" },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'Contracts for US Business' : "ABD'de Ticari Faaliyet İçin Sözleşmeler" }
          ]}
        />

        <TrustStrip lang={lang} />

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          📍 {isEnglish ? 'Jurisdiction: United States / New York' : 'Kapsam: ABD / New York'}
        </span>

        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          {isEnglish ? "Contracts for Doing Business in the US" : "ABD'de Ticari Faaliyet İçin Gerekli Sözleşmeler"}
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
              : "ABD'de ticari faaliyet yürütmek için yazılı sözleşme şarttır"}</li>
            <li>• {isEnglish
              ? "Governing law clause determines which state's law applies"
              : "Governing law maddesi, sözleşmeye hangi eyalet hukukunun uygulanacağını belirler"}</li>
            <li>• {isEnglish
              ? "New York law is commonly chosen for commercial contracts"
              : "Ticari sözleşmelerde New York hukuku yaygın olarak tercih edilir"}</li>
            <li>• {isEnglish
              ? "NDAs should precede any confidential discussions"
              : "Gizli bilgi paylaşımından önce mutlaka NDA imzalanmalıdır"}</li>
            <li>• {isEnglish
              ? "Contractor vs employee classification has significant legal implications"
              : "Yüklenici ile çalışan ayrımının doğru yapılmaması ciddi hukuki sonuçlar doğurabilir"}</li>
          </ul>
        </section>

        {/* CTA - Above fold */}
        <KitCallout lang={lang} variant="compact" />

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
              <h3 className="font-semibold mb-2">{isEnglish ? 'Governing Law' : 'Uygulanacak Hukuk'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Specifies which state's laws will govern the contract. New York and Delaware are popular choices for commercial contracts."
                  : "Sözleşmenin hangi eyalet hukukuna tâbi olacağını belirler. Ticari sözleşmelerde New York ve Delaware hukuku en sık tercih edilen seçeneklerdir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Dispute Resolution' : 'Uyuşmazlık Çözümü'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "How disputes will be resolved - litigation, arbitration, or mediation. Consider enforceability across borders for international parties."
                  : "Uyuşmazlıkların hangi yolla çözüleceğini düzenler: mahkeme yargılaması, tahkim veya arabuluculuk. Uluslararası taraflar söz konusu olduğunda, verilen kararın sınır ötesi tenfiz edilebilirliği ayrıca değerlendirilmelidir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Intellectual Property' : 'Fikri Mülkiyet'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Who owns work product, pre-existing IP, and derivative works. Critical for creative and technical services."
                  : "Ortaya çıkan eserin, mevcut fikri mülkiyetin ve türev çalışmaların kime ait olacağını düzenler. Yaratıcı ve teknik hizmet ilişkilerinde bu madde büyük önem taşır."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Limitation of Liability' : 'Sorumluluk Sınırlaması'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Caps on damages and exclusions of certain damage types. Important for managing business risk."
                  : "Tazminat tutarına üst sınır getirilmesini ve belirli zarar türlerinin kapsam dışı bırakılmasını düzenler. Ticari riskin yönetimi açısından temel bir hükümdür."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Termination' : 'Fesih'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "How either party can end the agreement, notice requirements, and what happens to ongoing obligations."
                  : "Taraflardan her birinin sözleşmeyi hangi koşullarda ve nasıl feshedebileceğini, bildirim sürelerini ve fesih sonrasında devam eden yükümlülüklerin akıbetini düzenler."}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQAccordion
          items={faqItems}
          title={isEnglish ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}
        />

        {/* CTA - End of page */}
        <KitCallout lang={lang} variant="full" />

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
              : 'Bu içerik yalnızca genel bilgilendirme amacıyla sunulmaktadır. Şablonlar, somut durumunuza uygun biçimde gözden geçirilmeli ve uyarlanmalıdır.'}
          </p>
        </div>
    </main>
  )
}
