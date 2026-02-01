// app/[lang]/library/temel-sozlesmeler/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'Essential Contracts for Turkish Entrepreneurs in the US | EchoLegal'
      : 'ABD\'de İş Yapan Türkler İçin Olmazsa Olmaz Sözleşmeler | EchoLegal',
    description: isEnglish
      ? 'The must-have legal documents for Turkish entrepreneurs doing business in the United States. NDA, Service Agreements, Privacy Policies, and more.'
      : 'ABD\'de iş yapan Türk girişimciler için olmazsa olmaz hukuki belgeler. NDA, Hizmet Sözleşmeleri, Gizlilik Politikaları ve daha fazlası.',
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function EssentialContractsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const contracts = [
    {
      name: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
      slug: 'nda',
      priority: isEnglish ? 'Essential' : 'Temel',
      when: isEnglish
        ? 'Before sharing confidential business information with anyone—potential partners, investors, contractors, or employees.'
        : 'Gizli iş bilgilerini herhangi biriyle paylaşmadan önce—potansiyel ortaklar, yatırımcılar, yükleniciler veya çalışanlar.',
      protects: isEnglish
        ? 'Trade secrets, business plans, client lists, proprietary methods, and other confidential information.'
        : 'Ticari sırlar, iş planları, müşteri listeleri, tescilli yöntemler ve diğer gizli bilgiler.',
    },
    {
      name: isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi',
      slug: 'service-agreement',
      priority: isEnglish ? 'Essential' : 'Temel',
      when: isEnglish
        ? 'When you provide services to clients. Defines the scope of work, payment terms, and deliverables.'
        : 'Müşterilere hizmet sağladığınızda. İş kapsamını, ödeme koşullarını ve teslim edilecekleri tanımlar.',
      protects: isEnglish
        ? 'Both parties by clearly defining expectations, preventing scope creep, and establishing payment terms.'
        : 'Her iki tarafı da beklentileri net bir şekilde tanımlayarak, kapsam kaymasını önleyerek ve ödeme koşullarını belirleyerek korur.',
    },
    {
      name: isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi',
      slug: 'independent-contractor',
      priority: isEnglish ? 'Essential' : 'Temel',
      when: isEnglish
        ? 'When you hire freelancers, consultants, or contractors. Establishes the relationship as contractor (not employee).'
        : 'Serbest çalışanlar, danışmanlar veya yükleniciler çalıştırdığınızda. İlişkiyi yüklenici (çalışan değil) olarak belirler.',
      protects: isEnglish
        ? 'Against misclassification claims, defines work expectations, IP ownership, and payment terms.'
        : 'Yanlış sınıflandırma iddialarına karşı korur, iş beklentilerini, fikri mülkiyet sahipliğini ve ödeme koşullarını tanımlar.',
    },
    {
      name: isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası',
      slug: 'privacy-policy',
      priority: isEnglish ? 'Required' : 'Zorunlu',
      when: isEnglish
        ? 'If your website or app collects any user data (names, emails, cookies, analytics).'
        : 'Web siteniz veya uygulamanız herhangi bir kullanıcı verisi topluyorsa (isimler, e-postalar, çerezler, analitik).',
      protects: isEnglish
        ? 'Legal requirement for GDPR, CCPA, and other privacy laws. Failure to have one can result in fines.'
        : 'GDPR, CCPA ve diğer gizlilik yasaları için yasal gereklilik. Olmaması para cezalarıyla sonuçlanabilir.',
    },
    {
      name: isEnglish ? 'Terms of Service' : 'Kullanım Koşulları',
      slug: 'terms-of-service',
      priority: isEnglish ? 'Essential' : 'Temel',
      when: isEnglish
        ? 'For any website, app, or online service. Defines the rules users must follow and limits your liability.'
        : 'Herhangi bir web sitesi, uygulama veya çevrimiçi hizmet için. Kullanıcıların uyması gereken kuralları tanımlar ve sorumluluğunuzu sınırlar.',
      protects: isEnglish
        ? 'Limits your liability, establishes governing law, defines acceptable use, and provides dispute resolution terms.'
        : 'Sorumluluğunuzu sınırlar, geçerli hukuku belirler, kabul edilebilir kullanımı tanımlar ve uyuşmazlık çözüm koşulları sağlar.',
    },
    {
      name: isEnglish ? 'Freelance Service Agreement' : 'Serbest Çalışan Hizmet Sözleşmesi',
      slug: 'freelance-agreement',
      priority: isEnglish ? 'Important' : 'Önemli',
      when: isEnglish
        ? 'Specifically designed for freelancers working on project-based or ongoing client work.'
        : 'Proje bazlı veya sürekli müşteri işi yapan serbest çalışanlar için özel olarak tasarlanmış.',
      protects: isEnglish
        ? 'Clearly defines project scope, revisions, payment milestones, and intellectual property transfer.'
        : 'Proje kapsamını, revizyonları, ödeme aşamalarını ve fikri mülkiyet transferini net bir şekilde tanımlar.',
    },
    {
      name: isEnglish ? 'Influencer / Brand Agreement' : 'Influencer / Marka Sözleşmesi',
      slug: 'influencer-agreement',
      priority: isEnglish ? 'Important' : 'Önemli',
      when: isEnglish
        ? 'For content creators partnering with brands, or businesses hiring influencers for promotions.'
        : 'Markalarla ortaklık yapan içerik üreticileri veya tanıtımlar için influencer çalıştıran işletmeler için.',
      protects: isEnglish
        ? 'Defines deliverables, usage rights, FTC disclosure requirements, payment terms, and exclusivity.'
        : 'Teslim edilecekleri, kullanım haklarını, FTC açıklama gereksinimlerini, ödeme koşullarını ve münhasırlığı tanımlar.',
    },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
        <span className="mx-2">→</span>
        <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
        <span className="mx-2">→</span>
        <span className="text-black">{isEnglish ? 'Essential Contracts' : 'Temel Sözleşmeler'}</span>
      </nav>

      <article>
        <header className="mb-12">
          <span className="inline-block px-3 py-1 bg-purple-50 text-purple-800 rounded-full text-sm font-medium mb-4">
            {isEnglish ? 'Contract Guide' : 'Sözleşme Rehberi'}
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
            {isEnglish
              ? 'Essential Contracts for US Business'
              : 'ABD\'de İş Yapan Türkler İçin Olmazsa Olmaz Sözleşmeler'}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            {isEnglish
              ? 'A guide to the legal documents you\'ll likely need when doing business in or with the United States. Understanding when and why you need each contract.'
              : 'ABD\'de veya ABD ile iş yaparken muhtemelen ihtiyaç duyacağınız hukuki belgelere rehber. Her bir sözleşmeye ne zaman ve neden ihtiyaç duyacağınızı anlama.'}
          </p>
        </header>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-10">
          <p className="text-sm text-amber-900 leading-relaxed">
            <strong>{isEnglish ? 'Note:' : 'Not:'}</strong>{' '}
            {isEnglish
              ? 'This guide provides general information about common business contracts. Template documents should be reviewed by an attorney for your specific situation and jurisdiction.'
              : 'Bu rehber yaygın iş sözleşmeleri hakkında genel bilgi sağlar. Şablon belgeler, özel durumunuz ve yargı yetkiniz için bir avukat tarafından incelenmelidir.'}
          </p>
        </div>

        {/* Contracts List */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Contract Overview' : 'Sözleşmelere Genel Bakış'}
          </h2>

          <div className="space-y-6">
            {contracts.map((contract, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 flex items-center justify-between">
                  <h3 className="font-bold text-black">{contract.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    contract.priority === 'Essential' || contract.priority === 'Temel' || contract.priority === 'Required' || contract.priority === 'Zorunlu'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {contract.priority}
                  </span>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{isEnglish ? 'When to use:' : 'Ne zaman kullanılır:'}</p>
                    <p className="text-sm text-gray-600">{contract.when}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{isEnglish ? 'What it protects:' : 'Neyi korur:'}</p>
                    <p className="text-sm text-gray-600">{contract.protects}</p>
                  </div>
                  <Link
                    href={`/${lang}/contracts/${contract.slug}`}
                    className="inline-block text-sm text-[#C9A227] font-medium hover:text-[#B8922A]"
                  >
                    {isEnglish ? 'View Template →' : 'Şablonu Görüntüle →'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Start Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">
            {isEnglish ? 'Quick Start: Minimum Essentials' : 'Hızlı Başlangıç: Minimum Gereklilikler'}
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-900 mb-4">
              {isEnglish
                ? 'If you\'re just starting out, here are the absolute minimum documents you should have:'
                : 'Yeni başlıyorsanız, sahip olmanız gereken mutlak minimum belgeler şunlardır:'}
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-blue-900">
              <li><strong>NDA</strong> - {isEnglish ? 'Before any business discussions' : 'Herhangi bir iş görüşmesinden önce'}</li>
              <li><strong>{isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}</strong> - {isEnglish ? 'For all client work' : 'Tüm müşteri işleri için'}</li>
              <li><strong>{isEnglish ? 'Privacy Policy' : 'Gizlilik Politikası'}</strong> - {isEnglish ? 'If you have a website/app' : 'Web siteniz/uygulamanız varsa'}</li>
            </ol>
          </div>
        </section>

        {/* Product CTA */}
        <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-black mb-4 text-center">
            {isEnglish ? 'Get All Essential Documents' : 'Tüm Temel Belgeleri Alın'}
          </h2>
          <p className="text-gray-600 text-center mb-6 max-w-xl mx-auto">
            {isEnglish
              ? 'Our Business Starter Kit includes 5 essential legal documents. I support EchoLegal – $20 recommended.'
              : 'Business Starter Kit\'imiz 5 temel hukuki belge içerir. Gücünüz kadar ödeyin.'}
          </p>
          <div className="text-center">
            <Link
              href={`/${lang}/legal-kits/business-starter`}
              className="inline-block bg-[#C9A227] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors"
            >
              {isEnglish ? 'View Business Starter Kit →' : 'Business Starter Kit\'i Görüntüle →'}
            </Link>
          </div>
        </div>

        {/* Related */}
        <section>
          <h2 className="text-xl font-bold text-black mb-6">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href={`/${lang}/library/llc-kurma-rehberi`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
              <h3 className="font-semibold text-black mb-1">{isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}</h3>
              <p className="text-sm text-gray-600">{isEnglish ? 'If you\'re forming a US business' : 'ABD işi kuruyorsanız'}</p>
            </Link>
            <Link href={`/${lang}/contracts`} className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
              <h3 className="font-semibold text-black mb-1">{isEnglish ? 'All Contract Templates' : 'Tüm Sözleşme Şablonları'}</h3>
              <p className="text-sm text-gray-600">{isEnglish ? 'Browse our full library' : 'Tam kütüphanemize göz atın'}</p>
            </Link>
          </div>
        </section>
      </article>
    </main>
  )
}
