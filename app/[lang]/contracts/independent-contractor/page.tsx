import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? 'Free Independent Contractor Agreement Template (English & Turkish) | EchoLegal'
      : 'Ücretsiz Bağımsız Yüklenici Sözleşmesi Şablonu (İngilizce & Türkçe) | EchoLegal',
    description: isEnglish
      ? 'Free bilingual contractor agreement template. I support EchoLegal ($49 recommended) or download free. Avoid misclassification issues.'
      : 'Ücretsiz iki dilli yüklenici sözleşmesi. Gücünüz kadar ödeyin (49$ önerilir) veya ücretsiz indirin.',
  }
}

export default async function IndependentContractorPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const stripePaymentLink = 'https://buy.stripe.com/aFa8wP0uAbpRdV01TFd7q03'
  const documentUrl = isEnglish
    ? '/documents/IndependentContractorAgreement-EN.docx'
    : '/documents/BagimsizYukleniciSozlesmesi-TR.docx'

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
          <span className="text-black font-medium">{isEnglish ? 'Independent Contractor' : 'Bağımsız Yüklenici'}</span>
        </nav>

        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          📍 {isEnglish ? 'Jurisdiction: United States / Turkey' : 'Yargı Yetkisi: ABD / Türkiye'}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi'}
        </h1>

        <p className="text-sm text-gray-500 mb-8">{isEnglish ? 'Last Updated: January 2026' : 'Son Güncelleme: Ocak 2026'}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What is This Agreement?' : 'Bu Sözleşme Nedir?'}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {isEnglish
              ? 'An Independent Contractor Agreement establishes a formal relationship between a business and a contractor. It clarifies that the contractor is not an employee, defines the scope of work, payment terms, intellectual property rights, and helps protect both parties from misclassification issues.'
              : 'Bağımsız Yüklenici Sözleşmesi, bir işletme ile yüklenici arasında resmi bir ilişki kurar. Yüklenicinin çalışan olmadığını açıklar, iş kapsamını, ödeme koşullarını, fikri mülkiyet haklarını tanımlar ve her iki tarafı da yanlış sınıflandırma sorunlarından korur.'}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'When to Use' : 'Ne Zaman Kullanılır'}</h2>
          <ul className="space-y-3">
            {(isEnglish ? [
              'Hiring contractors or consultants',
              'Outsourcing specific projects',
              'Engaging freelancers for ongoing work',
              'Protecting against IRS misclassification',
              'Defining intellectual property ownership'
            ] : [
              'Yüklenici veya danışman işe alırken',
              'Belirli projeleri dışarıya verirken',
              'Devam eden işler için serbest çalışanlarla çalışırken',
              'SGK/vergi yanlış sınıflandırmasına karşı koruma',
              'Fikri mülkiyet sahipliğini tanımlarken'
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
              'Companies hiring contractors instead of employees',
              'Staffing agencies',
              'Technology companies with remote workers',
              'Businesses with international contractors',
              'Any entity that needs to establish independent contractor relationship for tax purposes'
            ] : [
              'Çalışan yerine yüklenici kiralayan şirketler',
              'İstihdam ajansları',
              'Uzaktan çalışanları olan teknoloji şirketleri',
              'Uluslararası yüklenicileri olan işletmeler',
              'Vergi amaçlı bağımsız yüklenici ilişkisi kurmak isteyen tüm kuruluşlar'
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
              'Misclassification risk: IRS penalties, back taxes, benefits liability',
              'Without agreement: worker may be reclassified as employee (IRS 20-factor test)',
              'Missing control provisions: suggests employment relationship',
              'No IP assignment: contractor may retain ownership of work product',
              'Penalties can include back payroll taxes plus interest and penalties'
            ] : [
              'Yanlış sınıflandırma riski: IRS cezaları, geriye dönük vergiler, yan hak yükümlülükleri',
              'Sözleşme olmadan: çalışan, işçi olarak yeniden sınıflandırılabilir (IRS 20 faktör testi)',
              'Kontrol hükümleri eksikse: istihdam ilişkisinin varlığına işaret eder',
              'Fikri mülkiyet devri yoksa: yüklenici iş ürünü sahipliğini elinde tutabilir',
              'Cezalar geriye dönük bordro vergileri ile faiz ve ek yaptırımları içerebilir'
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
          <p className="text-center text-gray-600 mb-6">{isEnglish ? 'I support EchoLegal – $49 recommended.' : 'EchoLegal\'i destekliyorum – $49 önerilir.'}</p>

          <a href={stripePaymentLink} className="block w-full bg-[#C9A227] text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-[#B8922A] mb-3">
            💳 {isEnglish ? 'I CAN Afford It — $49 (Recommended)' : 'Ödeyebilirim — $49 (Önerilen)'}
          </a>

          <a href={documentUrl} download className="block w-full bg-gray-800 text-white text-center py-4 rounded-lg font-semibold text-lg hover:bg-gray-700 mb-4">
            📄 {isEnglish ? 'I CANNOT Afford It — Download Free' : 'Ödeyemiyorum — Ücretsiz İndir'}
          </a>

          {/* Microcopy */}
          <p className="text-center text-sm text-gray-500">
            {isEnglish
              ? 'Most users choose $49 to support ongoing updates and bilingual access.'
              : 'Çoğu kullanıcı, sürekli güncellemeleri ve iki dilli erişimi desteklemek için 49$ seçiyor.'}
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
