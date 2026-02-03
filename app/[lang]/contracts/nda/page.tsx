import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  
  return {
    title: isEnglish 
      ? 'Free Non-Disclosure Agreement (NDA) Template (English & Turkish) | EchoLegal'
      : 'Ücretsiz Gizlilik Sözleşmesi (NDA) Şablonu (İngilizce & Türkçe) | EchoLegal',
    description: isEnglish
      ? 'Free bilingual NDA template. I support EchoLegal ($20 recommended) or download free. Protect confidential business information.'
      : 'Ücretsiz iki dilli NDA şablonu. Gücünüz kadar ödeyin (20$ önerilir) veya ücretsiz indirin. Gizli iş bilgilerinizi koruyun.',
  }
}

export default async function NDAPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/aFa8wP0uAbpRdV01TFd7q03'
  const documentUrl = isEnglish 
    ? '/documents/NDA-EN.docx'
    : '/documents/GizlilikSozlesmesi-TR.docx'

  // Cross-sell related contracts
  const relatedContracts = [
    {
      slug: 'freelance-agreement',
      title: isEnglish ? 'Freelance Service Agreement' : 'Serbest Çalışan Hizmet Sözleşmesi',
    },
    {
      slug: 'independent-contractor',
      title: isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi',
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
          <span className="text-black font-medium">NDA</span>
        </nav>

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          📍 {isEnglish ? 'Jurisdiction: United States / Turkey' : 'Yargı Yetkisi: ABD / Türkiye'}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)'}
        </h1>

        <p className="text-sm text-gray-500 mb-8">{isEnglish ? 'Last Updated: January 2026' : 'Son Güncelleme: Ocak 2026'}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What is This Agreement?' : 'Bu Sözleşme Nedir?'}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {isEnglish 
              ? 'A Non-Disclosure Agreement (NDA) is a legally binding contract that establishes a confidential relationship between parties. It protects sensitive business information, trade secrets, and proprietary data from being disclosed to unauthorized third parties.'
              : 'Gizlilik Sözleşmesi (NDA), taraflar arasında gizli bir ilişki kuran yasal olarak bağlayıcı bir sözleşmedir. Hassas iş bilgilerini, ticari sırları ve özel verileri yetkisiz üçüncü taraflara ifşa edilmekten korur.'}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'When to Use' : 'Ne Zaman Kullanılır'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Sharing business plans with potential investors',
              'Hiring employees or contractors with access to sensitive data',
              'Entering business partnerships or joint ventures',
              'Discussing merger or acquisition opportunities',
              'Working with vendors who need proprietary information'
            ] : [
              'Potansiyel yatırımcılarla iş planları paylaşırken',
              'Hassas verilere erişimi olan çalışanlar veya yükleniciler işe alırken',
              'İş ortaklıkları veya ortak girişimlere girerken',
              'Birleşme veya satın alma fırsatlarını görüşürken',
              'Özel bilgilere ihtiyaç duyan satıcılarla çalışırken'
            ]).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-[#C9A227] mr-3">✓</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Who Uses This?' : 'Kimler Kullanır?'}</h2>
          <p className="text-gray-600 mb-4">
            {isEnglish
              ? <>NDAs are among the most frequently used <Link href={`/${lang}/amerika/abdde-is-yapanlar-icin-sozlesmeler`} className="text-[#C9A227] underline hover:text-[#B8922A]">business contracts in the United States</Link>. Typical users include:</>
              : <>Gizlilik sözleşmeleri, <Link href={`/${lang}/amerika/abdde-is-yapanlar-icin-sozlesmeler`} className="text-[#C9A227] underline hover:text-[#B8922A]">ABD&apos;de iş yapanlar için temel sözleşmelerden</Link> biridir. Başlıca kullanıcılar şunlardır:</>}
          </p>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Entrepreneurs discussing business ideas with potential partners',
              'Companies hiring contractors or freelancers with access to proprietary information',
              'Startups in fundraising discussions with investors',
              'Businesses exploring mergers, acquisitions, or joint ventures',
              'Technology companies sharing technical specifications or trade secrets'
            ] : [
              'Potansiyel ortaklarla iş fikirlerini görüşen girişimciler',
              'Özel bilgilere erişimi olan yüklenici veya serbest çalışanları işe alan şirketler',
              'Yatırımcılarla finansman görüşmeleri yürüten girişimler (start-up\'lar)',
              'Birleşme, devralma veya ortak girişim fırsatlarını değerlendiren işletmeler',
              'Teknik spesifikasyonlarını veya ticari sırlarını paylaşan teknoloji şirketleri'
            ]).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-[#C9A227] mr-3">•</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What Happens If Misused or Missing?' : 'Yanlış veya Eksik Kullanılırsa Ne Olur?'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Without NDA: No legal recourse if confidential information is disclosed',
              'Overly broad NDA: May be unenforceable if scope is unreasonable',
              'Missing definition of confidential information: Creates ambiguity about what is protected',
              'No time limit: Some jurisdictions may refuse to enforce perpetual obligations',
              'No jurisdiction clause: Uncertainty about where disputes will be resolved'
            ] : [
              'NDA olmadan: Gizli bilgilerin ifşa edilmesi hâlinde hukuki başvuru yolu bulunmaz',
              'Aşırı geniş kapsamlı NDA: Kapsam makul değilse mahkemece uygulanamaz hâle gelebilir',
              'Gizli bilgi tanımının eksikliği: Neyin korunduğu konusunda belirsizlik yaratır',
              'Süre sınırı bulunmaması: Bazı yargı bölgeleri süresiz yükümlülükleri uygulamayı reddedebilir',
              'Yargı yetkisi maddesinin bulunmaması: Uyuşmazlıkların nerede çözüleceğine dair belirsizlik doğurur'
            ]).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-[#C9A227] mr-3">•</span>
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
