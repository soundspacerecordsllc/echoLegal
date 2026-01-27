import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? '7 Legal Mistakes Turkish Entrepreneurs Make When Forming US Companies | EchoLegal'
    : 'ABD\'de Şirket Kuran Türklerin Yaptığı 7 Hukuki Hata | EchoLegal'

  const description = isEnglish
    ? 'The most common legal mistakes Turkish entrepreneurs make when forming US companies—and how to avoid costly errors with LLCs, taxes, and compliance.'
    : 'Türk girişimcilerin ABD şirketi kurarken yaptıkları en yaygın hukuki hatalar—ve LLC, vergi ve uyumla ilgili maliyetli hatalardan nasıl kaçınılır.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-sirket-kuran-turklerin-hatalari`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-sirket-kuran-turklerin-hatalari',
        'tr': 'https://echo-legal.com/tr/abd-sirket-kuran-turklerin-hatalari',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function MistakesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish ? '7 Legal Mistakes Turkish Entrepreneurs Make When Forming US Companies' : 'ABD\'de Şirket Kuran Türklerin Yaptığı 7 Hukuki Hata',
    author: { '@type': 'Person', name: 'Zeynep Ruziye Moore', jobTitle: 'Licensed in New York' },
    datePublished: '2026-01-15',
    dateModified: '2026-01-27',
  }

  const mistakes = isEnglish ? [
    {
      num: 1,
      title: 'Not Having an Operating Agreement',
      problem: 'Many Turkish entrepreneurs skip the Operating Agreement thinking it\'s optional or unnecessary for single-member LLCs.',
      consequence: 'Banks will reject your account opening. Courts may "pierce the corporate veil" and hold you personally liable. You\'ll face issues with payment processors.',
      solution: 'Create an Operating Agreement before opening any bank accounts. It\'s required by banks, protects your liability, and is legally mandated in states like Delaware and New York.',
      link: '/operating-agreement-zorunlu-mu',
      linkText: 'Learn more about Operating Agreements →'
    },
    {
      num: 2,
      title: 'Forgetting Form 5472 (IRS Reporting)',
      problem: 'Foreign-owned single-member LLCs must file Form 5472 annually with a pro forma Form 1120. Most Turkish LLC owners don\'t know this requirement exists.',
      consequence: '$25,000 penalty PER FORM for late or missing filing. This is one of the highest penalties in the tax code.',
      solution: 'File Form 5472 by April 15 each year (or with extension). Even if your LLC had zero income. Keep records of all transactions between you and your LLC.',
      link: '/abd-llc-irs-mektubu-neden-gelir',
      linkText: 'Understanding IRS requirements →'
    },
    {
      num: 3,
      title: 'Mixing Personal and Business Finances',
      problem: 'Using personal accounts for business transactions, or using LLC funds for personal expenses without proper documentation.',
      consequence: 'Loss of limited liability protection. The IRS and courts can treat your LLC as a "sham" entity and hold you personally responsible for all debts.',
      solution: 'Open a dedicated US business bank account. Never mix personal and business funds. Document all transactions properly.',
      link: '/abd-llc-banka-hesabi-acmak',
      linkText: 'How to open a US business bank account →'
    },
    {
      num: 4,
      title: 'Choosing the Wrong State',
      problem: 'Forming an LLC in Delaware or Wyoming because "everyone does" without understanding tax implications when you have no actual business there.',
      consequence: 'You may need to register as a foreign LLC in states where you actually do business, doubling your fees and filing requirements.',
      solution: 'Consider where your customers are, where you\'ll have employees, and your actual business activities. Sometimes your home state (if you have US presence) is the best choice.',
      link: '/abd-de-llc-kurmak-turkler-icin-adim-adim',
      linkText: 'State selection guide →'
    },
    {
      num: 5,
      title: 'No Written Contracts with Clients',
      problem: 'Working on handshake deals or vague email agreements instead of proper contracts.',
      consequence: 'No legal protection when clients don\'t pay, scope creep, or disputes arise. Difficult to enforce payment across international borders.',
      solution: 'Use written Service Agreements for every client relationship. Include payment terms, scope, deliverables, and dispute resolution clauses.',
      link: '/service-agreement-neden-gerekli',
      linkText: 'Why you need a Service Agreement →'
    },
    {
      num: 6,
      title: 'Ignoring Privacy Policy & Terms Requirements',
      problem: 'Running a website or app without Privacy Policy and Terms of Service, especially when serving US customers.',
      consequence: 'CCPA violations (California) can cost $7,500 per incident. Platform bans from Stripe, PayPal, app stores. Loss of customer trust.',
      solution: 'Have compliant Privacy Policy and Terms of Service on your website. Update them for GDPR, CCPA, and KVKK as needed.',
      link: '/abd-privacy-policy-zorunlu-mu',
      linkText: 'Do you need a Privacy Policy? →'
    },
    {
      num: 7,
      title: 'Not Understanding Tax Treaty Benefits',
      problem: 'Paying 30% US withholding tax on income when treaty benefits could reduce or eliminate it.',
      consequence: 'Overpaying taxes significantly. Turkey-US treaty can reduce withholding to 0-15% depending on income type.',
      solution: 'Complete Form W-8BEN (individuals) or W-8BEN-E (LLCs) to claim treaty benefits. Provide your Turkish TC Kimlik number.',
      link: '/w-8ben-formu-nasil-doldurulur',
      linkText: 'How to fill out W-8BEN →'
    },
  ] : [
    {
      num: 1,
      title: 'Operating Agreement Olmadan İlerlemek',
      problem: 'Birçok Türk girişimci, isteğe bağlı veya tek üyeli LLC\'ler için gereksiz olduğunu düşünerek Operating Agreement\'ı atlıyor.',
      consequence: 'Bankalar hesap açma talebinizi reddedecek. Mahkemeler "kurumsal perdeyi delip" sizi kişisel olarak sorumlu tutabilir. Ödeme işlemcileriyle sorun yaşarsınız.',
      solution: 'Herhangi bir banka hesabı açmadan önce Operating Agreement oluşturun. Bankalar tarafından gereklidir, sorumluluğunuzu korur ve Delaware ve New York gibi eyaletlerde yasal olarak zorunludur.',
      link: '/operating-agreement-zorunlu-mu',
      linkText: 'Operating Agreement hakkında daha fazla bilgi →'
    },
    {
      num: 2,
      title: 'Form 5472\'yi Unutmak (IRS Raporlaması)',
      problem: 'Yabancıya ait tek üyeli LLC\'ler yıllık olarak pro forma Form 1120 ile Form 5472 dosyalamalıdır. Çoğu Türk LLC sahibi bu gereksinimin varlığını bilmiyor.',
      consequence: 'Geç veya eksik dosyalama için FORM BAŞINA 25.000$ ceza. Bu, vergi yasasındaki en yüksek cezalardan biridir.',
      solution: 'Her yıl 15 Nisan\'a kadar (veya uzatmayla) Form 5472 dosyalayın. LLC\'nizin sıfır geliri olsa bile. Siz ve LLC\'niz arasındaki tüm işlemlerin kayıtlarını tutun.',
      link: '/abd-llc-irs-mektubu-neden-gelir',
      linkText: 'IRS gereksinimlerini anlama →'
    },
    {
      num: 3,
      title: 'Kişisel ve İş Finanslarını Karıştırmak',
      problem: 'İş işlemleri için kişisel hesapları kullanmak veya LLC fonlarını uygun belgeleme olmadan kişisel harcamalar için kullanmak.',
      consequence: 'Sınırlı sorumluluk korumasının kaybı. IRS ve mahkemeler LLC\'nizi "sahte" bir varlık olarak değerlendirebilir ve sizi tüm borçlardan kişisel olarak sorumlu tutabilir.',
      solution: 'Özel bir ABD iş banka hesabı açın. Kişisel ve iş fonlarını asla karıştırmayın. Tüm işlemleri düzgün bir şekilde belgeleyin.',
      link: '/abd-llc-banka-hesabi-acmak',
      linkText: 'ABD iş banka hesabı nasıl açılır →'
    },
    {
      num: 4,
      title: 'Yanlış Eyalet Seçmek',
      problem: 'Orada gerçek işiniz olmadan vergi etkilerini anlamadan "herkes yapıyor" diye Delaware veya Wyoming\'de LLC kurmak.',
      consequence: 'Gerçekten iş yaptığınız eyaletlerde yabancı LLC olarak kaydolmanız gerekebilir, bu da ücretlerinizi ve dosyalama gereksinimlerinizi ikiye katlar.',
      solution: 'Müşterilerinizin nerede olduğunu, nerede çalışanlarınız olacağını ve gerçek iş faaliyetlerinizi düşünün. Bazen kendi eyaletiniz (ABD\'de varlığınız varsa) en iyi seçimdir.',
      link: '/abd-de-llc-kurmak-turkler-icin-adim-adim',
      linkText: 'Eyalet seçim rehberi →'
    },
    {
      num: 5,
      title: 'Müşterilerle Yazılı Sözleşme Yapmamak',
      problem: 'Uygun sözleşmeler yerine el sıkışma anlaşmaları veya belirsiz e-posta anlaşmalarıyla çalışmak.',
      consequence: 'Müşteriler ödemediğinde, kapsam genişlemesi veya anlaşmazlıklar ortaya çıktığında hukuki koruma yok. Uluslararası sınırlar arasında ödeme uygulamak zor.',
      solution: 'Her müşteri ilişkisi için yazılı Hizmet Sözleşmeleri kullanın. Ödeme koşulları, kapsam, teslim edilecekler ve uyuşmazlık çözüm maddelerini ekleyin.',
      link: '/service-agreement-neden-gerekli',
      linkText: 'Neden Service Agreement gerekli →'
    },
    {
      num: 6,
      title: 'Privacy Policy ve Terms Gereksinimlerini Görmezden Gelmek',
      problem: 'Özellikle ABD müşterilerine hizmet verirken Privacy Policy ve Terms of Service olmadan web sitesi veya uygulama çalıştırmak.',
      consequence: 'CCPA ihlalleri (Kaliforniya) olay başına 7.500$ mal olabilir. Stripe, PayPal, uygulama mağazalarından yasaklanma. Müşteri güveninin kaybı.',
      solution: 'Web sitenizde uyumlu Privacy Policy ve Terms of Service bulundurun. GDPR, CCPA ve KVKK için gerektiği gibi güncelleyin.',
      link: '/abd-privacy-policy-zorunlu-mu',
      linkText: 'Privacy Policy gerekli mi? →'
    },
    {
      num: 7,
      title: 'Vergi Anlaşması Avantajlarını Anlamamak',
      problem: 'Anlaşma avantajları azaltabilir veya ortadan kaldırabilirken gelir üzerinden %30 ABD stopaj vergisi ödemek.',
      consequence: 'Önemli ölçüde fazla vergi ödemek. Türkiye-ABD anlaşması, gelir türüne bağlı olarak stopajı %0-15\'e düşürebilir.',
      solution: 'Anlaşma avantajlarını talep etmek için W-8BEN (bireyler) veya W-8BEN-E (LLC\'ler) formunu doldurun. Türk TC Kimlik numaranızı sağlayın.',
      link: '/w-8ben-formu-nasil-doldurulur',
      linkText: 'W-8BEN nasıl doldurulur →'
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? '7 Legal Mistakes' : '7 Hukuki Hata'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? '7 Legal Mistakes Turkish Entrepreneurs Make'
              : 'ABD\'de Şirket Kuran Türklerin Yaptığı 7 Hukuki Hata'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'The most common (and costly) mistakes—and how to avoid them when forming and running a US company.'
              : 'En yaygın (ve maliyetli) hatalar—ve ABD şirketi kurarken ve yönetirken bunlardan nasıl kaçınılır.'}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#C9A227] rounded-full flex items-center justify-center text-white font-bold">ZM</div>
              <div>
                <p className="font-medium text-black">Zeynep Ruziye Moore</p>
                <p>{isEnglish ? 'Licensed in New York' : 'New York Lisanslı'}</p>
              </div>
            </div>
            <span>•</span>
            <span>{isEnglish ? 'Updated: January 2026' : 'Güncelleme: Ocak 2026'}</span>
          </div>

          {/* Mistakes */}
          <div className="space-y-10">
            {mistakes.map((mistake) => (
              <section key={mistake.num} className="border-l-4 border-[#C9A227] pl-6">
                <h2 className="text-2xl font-bold mb-4">
                  <span className="text-[#C9A227]">#{mistake.num}</span> {mistake.title}
                </h2>

                <div className="space-y-4">
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="font-semibold text-red-900 mb-1">{isEnglish ? '❌ The Mistake:' : '❌ Hata:'}</p>
                    <p className="text-red-800">{mistake.problem}</p>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="font-semibold text-orange-900 mb-1">{isEnglish ? '⚠️ The Consequence:' : '⚠️ Sonuç:'}</p>
                    <p className="text-orange-800">{mistake.consequence}</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="font-semibold text-green-900 mb-1">{isEnglish ? '✅ The Solution:' : '✅ Çözüm:'}</p>
                    <p className="text-green-800">{mistake.solution}</p>
                  </div>

                  <Link href={`/${lang}${mistake.link}`} className="text-[#C9A227] hover:underline inline-block">
                    {mistake.linkText}
                  </Link>
                </div>
              </section>
            ))}
          </div>

          {/* Summary Checklist */}
          <section className="mt-12 bg-gray-900 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Quick Compliance Checklist' : 'Hızlı Uyum Kontrol Listesi'}</h2>
            <div className="space-y-3">
              {(isEnglish ? [
                'Operating Agreement created and signed',
                'Form 5472 filed annually (by April 15)',
                'Separate business bank account opened',
                'Written contracts with all clients',
                'Privacy Policy and Terms of Service on website',
                'W-8BEN/W-8BEN-E completed for treaty benefits',
                'State registration requirements understood',
              ] : [
                'Operating Agreement oluşturuldu ve imzalandı',
                'Form 5472 yıllık olarak dosyalandı (15 Nisan\'a kadar)',
                'Ayrı iş banka hesabı açıldı',
                'Tüm müşterilerle yazılı sözleşmeler',
                'Web sitesinde Privacy Policy ve Terms of Service',
                'Anlaşma avantajları için W-8BEN/W-8BEN-E tamamlandı',
                'Eyalet kayıt gereksinimleri anlaşıldı',
              ]).map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[#C9A227]">☐</span>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </section>

        </article>
      </main>
    </>
  )
}
