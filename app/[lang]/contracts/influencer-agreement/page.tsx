import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? 'Free Influencer Agreement Template (English & Turkish) | EchoLegal'
      : 'Ücretsiz Influencer Sözleşmesi Şablonu (İngilizce & Türkçe) | EchoLegal',
    description: isEnglish
      ? 'Free bilingual influencer/brand collaboration template. I support EchoLegal ($20 recommended) or download free. FTC compliant.'
      : 'Ücretsiz iki dilli influencer/marka işbirliği şablonu. Gücünüz kadar ödeyin (20$ önerilir) veya ücretsiz indirin.',
  }
}

export default async function InfluencerAgreementPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/aFa8wP0uAbpRdV01TFd7q03'
  const documentUrl = isEnglish
    ? '/documents/InfluencerAgreement-Modern-EN.docx'
    : '/documents/InfluencerSozlesmesi-Modern-TR.docx'

  // Cross-sell related contracts
  const relatedContracts = [
    {
      slug: 'freelance-agreement',
      title: isEnglish ? 'Freelance Service Agreement' : 'Serbest Çalışan Hizmet Sözleşmesi',
    },
    {
      slug: 'nda',
      title: isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)',
    },
  ]

  return (
    <div className="bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <Link href={`/${lang}/contracts`} className="hover:text-black">{isEnglish ? 'Contracts' : 'Sözleşmeler'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'Influencer Agreement' : 'Influencer Sözleşmesi'}</span>
        </nav>

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          📍 {isEnglish ? 'Jurisdiction: United States / Turkey' : 'Yargı Yetkisi: ABD / Türkiye'}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {isEnglish ? 'Influencer / Brand Collaboration Agreement' : 'Influencer / Marka İşbirliği Sözleşmesi'}
        </h1>

        <p className="text-sm text-gray-500 mb-8">{isEnglish ? 'Last Updated: January 2026' : 'Son Güncelleme: Ocak 2026'}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What is This Agreement?' : 'Bu Sözleşme Nedir?'}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {isEnglish
              ? 'An Influencer Agreement is a contract between a content creator and a brand that outlines the terms of a sponsored collaboration. It covers deliverables, compensation, content rights, FTC disclosure requirements, exclusivity, and more.'
              : 'Influencer Sözleşmesi, bir içerik üreticisi ile marka arasında sponsorlu işbirliğinin şartlarını belirleyen bir sözleşmedir. Teslimatları, ücreti, içerik haklarını, reklam beyanı gereksinimlerini ve münhasırlığı kapsar.'}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'When to Use' : 'Ne Zaman Kullanılır'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Brand partnership or sponsorship deals',
              'Paid social media collaborations',
              'Product reviews or unboxing content',
              'Affiliate marketing arrangements',
              'Ambassador or long-term partnerships'
            ] : [
              'Marka ortaklığı veya sponsorluk anlaşmaları',
              'Ücretli sosyal medya işbirlikleri',
              'Ürün incelemeleri veya kutu açılışı içerikleri',
              'Affiliate pazarlama düzenlemeleri',
              'Elçilik veya uzun vadeli ortaklıklar'
            ]).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-[#C9A227] mr-3">✓</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">{isEnglish ? 'Who Uses This?' : 'Kimler Kullanır?'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Brands running influencer marketing campaigns',
              'Influencers and content creators formalizing sponsorships',
              'Marketing agencies managing influencer relationships',
              'E-commerce companies with affiliate or ambassador programs',
              'PR firms coordinating product placements'
            ] : [
              'Influencer pazarlama kampanyaları yürüten markalar',
              'Sponsorlukları resmileştiren influencer ve içerik üreticileri',
              'Influencer ilişkilerini yöneten pazarlama ajansları',
              'Affiliate veya marka elçisi programlarına sahip e-ticaret şirketleri',
              'Ürün yerleştirmelerini koordine eden halkla ilişkiler firmaları'
            ]).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-[#C9A227] mr-3">✓</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            {isEnglish
              ? <>Browse all contract templates on our <Link href={`/${lang}/amerika/abdde-is-yapanlar-icin-sozlesmeler`} className="text-[#C9A227] hover:underline">Contracts for Doing Business in the US</Link> guide.</>
              : <>Tüm sözleşme şablonlarını <Link href={`/${lang}/amerika/abdde-is-yapanlar-icin-sozlesmeler`} className="text-[#C9A227] hover:underline">ABD'de İş Yapanlar İçin Sözleşmeler</Link> rehberimizde inceleyin.</>}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">{isEnglish ? 'What Happens If Misused or Missing?' : 'Yanlış veya Eksik Kullanılırsa Ne Olur?'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Without FTC disclosures: regulatory fines for undisclosed sponsorship (FTC Act Section 5)',
              'Missing content approval: brand damage from off-message posts',
              'No exclusivity terms: influencer may promote competing brands simultaneously',
              'Missing usage rights: brand cannot repurpose content',
              'No performance metrics: disputes over campaign success'
            ] : [
              'FTC beyanları olmadan: açıklanmamış sponsorluk için düzenleyici cezalar (FTC Yasası Bölüm 5)',
              'İçerik onayı eksikse: mesaj dışı paylaşımlardan marka itibarı zararı',
              'Münhasırlık koşulları yoksa: influencer aynı anda rakip markaları tanıtabilir',
              'Kullanım hakları belirsizse: marka içeriği yeniden kullanamaz',
              'Performans ölçütleri yoksa: kampanya başarısı konusunda anlaşmazlıklar'
            ]).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-red-500 mr-3">✗</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h3 className="font-semibold mb-3">⚖️ {isEnglish ? 'Legal Disclaimer' : 'Hukuki Sorumluluk Reddi'}</h3>
          <p className="text-sm text-gray-600">
            {isEnglish
              ? 'This template is for informational purposes only and does not constitute legal advice. Consult a licensed attorney before use.'
              : 'Bu şablon yalnızca bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez. Kullanmadan önce lisanslı bir avukata danışın.'}
          </p>
        </div>

        {/* Download Section - Updated */}
        <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">{isEnglish ? 'Download This Template' : 'Bu Şablonu İndirin'}</h2>
          <p className="text-center text-gray-600 mb-6">{isEnglish ? 'I support EchoLegal – $20 recommended.' : 'EchoLegal\'i destekliyorum – $20 önerilir.'}</p>

          <a href={stripePaymentLink} className="block w-full bg-[#C9A227] text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-[#B8922A] mb-3">
            💳 {isEnglish ? 'I CAN Afford It — $20 (Recommended)' : 'Ödeyebilirim — $20 (Önerilen)'}
          </a>

          <a href={documentUrl} download className="block w-full bg-gray-800 text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 mb-4">
            📄 {isEnglish ? 'I CANNOT Afford It — Download Free' : 'Ödeyemiyorum — Ücretsiz İndir'}
          </a>

          {/* Microcopy */}
          <p className="text-center text-sm text-gray-500">
            {isEnglish
              ? 'Most users choose $20 to support ongoing updates and bilingual access.'
              : 'Çoğu kullanıcı, sürekli güncellemeleri ve iki dilli erişimi desteklemek için 20$ seçiyor.'}
          </p>
        </div>

        {/* Cross-sell: People also download */}
        <section className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'People Also Download' : 'Bunlar da İndiriliyor'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {relatedContracts.map((contract) => (
              <Link
                key={contract.slug}
                href={`/${lang}/contracts/${contract.slug}`}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
              >
                <span className="font-medium text-gray-800">{contract.title}</span>
                <span className="text-[#C9A227]">→</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
