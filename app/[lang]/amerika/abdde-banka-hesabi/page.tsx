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
      ? "US Bank Account - Opening Business & Personal Accounts | EchoLegal"
      : "ABD'de Banka Hesabı - İş ve Kişisel Hesap Açma | EchoLegal",
    description: isEnglish
      ? "How to open a US bank account as a non-resident. Business accounts, EIN/ITIN requirements, FBAR obligations, and common challenges."
      : "Yerleşik olmayan biri olarak ABD banka hesabı nasıl açılır. İş hesapları, EIN/ITIN gereksinimleri, FBAR yükümlülükleri ve yaygın zorluklar.",
  }
}

export default async function BankaHesabiPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const registryEntry = getRegistryEntry('abdde-banka-hesabi')

  const faqItems = [
    {
      question: isEnglish ? "Can I open a US bank account without being in the US?" : "ABD'de olmadan ABD banka hesabı açabilir miyim?",
      answer: isEnglish
        ? "Most traditional banks require in-person verification. Some banks and fintech services allow remote account opening for business accounts with proper documentation. Personal accounts typically require physical presence."
        : "Çoğu geleneksel banka yüz yüze doğrulama gerektirir. Bazı bankalar ve fintech hizmetleri, uygun belgelerle iş hesapları için uzaktan hesap açmaya izin verir. Kişisel hesaplar genellikle fiziksel varlık gerektirir."
    },
    {
      question: isEnglish ? "Do I need an EIN or ITIN?" : "EIN veya ITIN'e ihtiyacım var mı?",
      answer: isEnglish
        ? "For business accounts, you need an EIN (Employer Identification Number) for your LLC or corporation. For personal accounts, banks typically want an SSN, though some accept ITIN. Non-resident aliens without SSN/ITIN face more limited options."
        : "İş hesapları için LLC veya şirketiniz için EIN'e (İşveren Kimlik Numarası) ihtiyacınız var. Kişisel hesaplar için bankalar genellikle SSN ister, ancak bazıları ITIN kabul eder. SSN/ITIN'siz yerleşik olmayan yabancılar daha sınırlı seçeneklerle karşı karşıyadır."
    },
    {
      question: isEnglish ? "What documents do banks typically require?" : "Bankalar genellikle hangi belgeleri ister?",
      answer: isEnglish
        ? "Common requirements include: formation documents (Articles of Organization), EIN letter from IRS, Operating Agreement, passport copies of all owners, proof of business address, and sometimes a business plan or website."
        : "Yaygın gereksinimler şunları içerir: kuruluş belgeleri (Articles of Organization), IRS'den EIN mektubu, Operating Agreement, tüm sahiplerin pasaport kopyaları, iş adresi kanıtı ve bazen bir iş planı veya web sitesi."
    },
    {
      question: isEnglish ? "Why do some banks reject non-resident applications?" : "Bazı bankalar neden yerleşik olmayan başvuruları reddediyor?",
      answer: isEnglish
        ? "Banks have compliance obligations (AML/KYC) and view non-resident accounts as higher risk. Without US presence, verifying identity and business legitimacy is harder. Each bank sets its own risk tolerance."
        : "Bankaların uyum yükümlülükleri (AML/KYC) vardır ve yerleşik olmayan hesapları daha yüksek riskli olarak görür. ABD'de varlık olmadan, kimlik ve iş meşruiyetini doğrulamak daha zordur. Her banka kendi risk toleransını belirler."
    },
    {
      question: isEnglish ? "What is FBAR and does it apply to me?" : "FBAR nedir ve bana uygulanır mı?",
      answer: isEnglish
        ? "FBAR (Report of Foreign Bank Accounts) is a US reporting requirement. If you're a US person with foreign accounts exceeding $10,000 aggregate value, you must file. For non-US persons, FBAR generally doesn't apply unless you become a US tax resident."
        : "FBAR (Yabancı Banka Hesapları Raporu) bir ABD raporlama gereksinimidir. Toplam değeri 10,000 doları aşan yabancı hesapları olan bir ABD kişisiyseniz, dosyalamanız gerekir. ABD dışı kişiler için, ABD vergi mukimi olmadıkça FBAR genellikle uygulanmaz."
    },
    {
      question: isEnglish ? "Can I use online banks or fintech services?" : "Online bankalar veya fintech hizmetleri kullanabilir miyim?",
      answer: isEnglish
        ? "Several fintech services cater to non-resident business owners. They often have easier onboarding but may have limitations (no check deposits, limited integrations, etc.). Research specific services for current offerings."
        : "Birçok fintech hizmeti yerleşik olmayan işletme sahiplerine hizmet verir. Genellikle daha kolay işe alım süreçleri vardır ancak sınırlamaları olabilir (çek yatırma yok, sınırlı entegrasyonlar vb.). Güncel teklifler için belirli hizmetleri araştırın."
    }
  ]

  const relatedPages = [
    { slug: 'abdde-llc-kurmak', title: isEnglish ? 'Forming an LLC in the US' : "ABD'de LLC Kurmak" },
    { slug: 'irs-vergi-gercekleri', title: isEnglish ? 'IRS Tax Realities' : 'IRS Vergi Gerçekleri' },
    { slug: 'llc-mi-corp-mu', title: isEnglish ? 'LLC vs Corporation' : 'LLC mi Corp mu?' },
  ]

  return (
    <div className="bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'US Bank Account' : "ABD'de Banka Hesabı" }
          ]}
        />

        <TrustStrip lang={lang} />

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          {isEnglish ? 'Jurisdiction: United States' : 'Yargı Yetkisi: ABD'}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {isEnglish ? "US Bank Account" : "ABD'de Banka Hesabı"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {isEnglish ? 'Last verified:' : 'Son doğrulama:'} {registryEntry?.lastVerified || '2026-01-25'}
        </p>

        {/* TL;DR */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="font-bold text-lg mb-3">TL;DR</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• {isEnglish
              ? "Business accounts require EIN; personal accounts typically require SSN or ITIN"
              : "İş hesapları EIN gerektirir; kişisel hesaplar genellikle SSN veya ITIN gerektirir"}</li>
            <li>• {isEnglish
              ? "Most traditional banks require in-person verification"
              : "Çoğu geleneksel banka yüz yüze doğrulama gerektirir"}</li>
            <li>• {isEnglish
              ? "Some fintech services allow remote account opening for businesses"
              : "Bazı fintech hizmetleri işletmeler için uzaktan hesap açmaya izin verir"}</li>
            <li>• {isEnglish
              ? "Banks have their own policies - rejection by one doesn't mean rejection by all"
              : "Bankaların kendi politikaları var - birinin reddi tümünün reddi anlamına gelmez"}</li>
            <li>• {isEnglish
              ? "FBAR reporting applies if you're a US person with foreign accounts over $10K"
              : "10K dolardan fazla yabancı hesabı olan bir ABD kişisiyseniz FBAR raporlaması geçerlidir"}</li>
          </ul>
        </section>

        {/* Business vs Personal */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'Business vs Personal Accounts' : 'İş vs Kişisel Hesaplar'}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">{isEnglish ? 'Business Account' : 'İş Hesabı'}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• {isEnglish ? 'Requires EIN' : 'EIN gerektirir'}</li>
                <li>• {isEnglish ? 'LLC/Corp formation documents needed' : 'LLC/Corp kuruluş belgeleri gerekli'}</li>
                <li>• {isEnglish ? 'Operating Agreement typically required' : 'Operating Agreement genellikle gerekli'}</li>
                <li>• {isEnglish ? 'Some options for remote opening' : 'Uzaktan açma için bazı seçenekler var'}</li>
                <li>• {isEnglish ? 'Essential for business credibility' : 'İş güvenilirliği için gerekli'}</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">{isEnglish ? 'Personal Account' : 'Kişisel Hesap'}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• {isEnglish ? 'SSN preferred, some accept ITIN' : 'SSN tercih edilir, bazıları ITIN kabul eder'}</li>
                <li>• {isEnglish ? 'Usually requires physical presence' : 'Genellikle fiziksel varlık gerektirir'}</li>
                <li>• {isEnglish ? 'Passport + visa documentation' : 'Pasaport + vize belgeleri'}</li>
                <li>• {isEnglish ? 'Proof of US address often required' : 'ABD adresi kanıtı genellikle gerekli'}</li>
                <li>• {isEnglish ? 'More limited options for non-residents' : 'Yerleşik olmayanlar için daha sınırlı seçenekler'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Typical Requirements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Typical Documentation Requirements' : 'Tipik Belge Gereksinimleri'}
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold mb-4">{isEnglish ? 'For LLC Business Account' : 'LLC İş Hesabı İçin'}</h3>
            <ul className="space-y-3">
              {(isEnglish ? [
                'Articles of Organization (certified copy)',
                'EIN confirmation letter from IRS',
                'Operating Agreement',
                'Passport copies of all members/managers',
                'Proof of business address (registered agent acceptable for some)',
                'Resolution authorizing account opening (for multi-member LLCs)',
                'Business description or website'
              ] : [
                'Articles of Organization (onaylı kopya)',
                "IRS'den EIN onay mektubu",
                'Operating Agreement',
                'Tüm üyelerin/yöneticilerin pasaport kopyaları',
                'İş adresi kanıtı (bazıları için registered agent kabul edilebilir)',
                'Hesap açmayı yetkilendiren karar (çok üyeli LLC\'ler için)',
                'İş tanımı veya web sitesi'
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#C9A227] mt-1">☐</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Common Challenges */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Common Challenges' : 'Yaygın Zorluklar'}
          </h2>

          <div className="space-y-4">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? 'No US Physical Presence' : 'ABD Fiziksel Varlığı Yok'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Many banks require in-person verification. Options: visit the US to open accounts, use fintech services that allow remote opening, or work with banks in states where you have registered agent presence."
                  : "Birçok banka yüz yüze doğrulama gerektirir. Seçenekler: hesap açmak için ABD'yi ziyaret edin, uzaktan açmaya izin veren fintech hizmetlerini kullanın veya registered agent varlığınız olan eyaletlerdeki bankalarla çalışın."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? 'Bank Compliance Concerns' : 'Banka Uyum Endişeleri'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Banks must comply with anti-money laundering (AML) and know-your-customer (KYC) regulations. Non-resident accounts receive extra scrutiny. Be prepared to explain your business clearly."
                  : "Bankalar kara para aklama önleme (AML) ve müşterini tanı (KYC) düzenlemelerine uymak zorundadır. Yerleşik olmayan hesaplar ekstra incelemeye tabi tutulur. İşinizi açıkça açıklamaya hazır olun."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? 'Maintaining the Account' : 'Hesabı Sürdürme'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Some banks close accounts that appear dormant or have activity patterns they consider suspicious. Maintain regular, explainable activity and keep your contact information current."
                  : "Bazı bankalar hareketsiz görünen veya şüpheli buldukları faaliyet kalıplarına sahip hesapları kapatır. Düzenli, açıklanabilir faaliyet sürdürün ve iletişim bilgilerinizi güncel tutun."}
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
              ? 'This content is for general informational purposes only. Bank policies change frequently - verify current requirements directly with institutions.'
              : 'Bu içerik yalnızca genel bilgilendirme amaçlıdır. Banka politikaları sık sık değişir - güncel gereksinimleri doğrudan kurumlarla doğrulayın.'}
          </p>
        </div>
      </main>
    </div>
  )
}
