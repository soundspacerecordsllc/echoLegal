// app/[lang]/library/hukuki-yanilgilar/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'Common Legal Misconceptions About US Business | EchoLegal'
      : 'ABD\'de İş Yapan Türklerin Sık Yapılan Hukuki Hataları | EchoLegal',
    description: isEnglish
      ? 'Debunking common myths about doing business in the US. LLC formation, visas, taxes, and more explained with facts.'
      : 'ABD\'de iş yapma hakkındaki yaygın mitleri çürütme. LLC kurulumu, vizeler, vergiler ve daha fazlası gerçeklerle açıklandı.',
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function LegalMisconceptionsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const misconceptions = [
    {
      id: 1,
      category: isEnglish ? 'LLC & Business' : 'LLC ve İş',
      myth: isEnglish
        ? '"Forming a US LLC will get me a visa or green card."'
        : '"ABD\'de LLC kurmak bana vize veya yeşil kart sağlar."',
      reality: isEnglish
        ? 'LLC formation and immigration are completely separate legal processes. An LLC is a business structure; it grants no immigration status whatsoever. Some visa categories (like E-2) require a business, but the business alone doesn\'t qualify you for the visa.'
        : 'LLC kurulumu ve göçmenlik tamamen ayrı hukuki süreçlerdir. LLC bir iş yapısıdır; hiçbir göçmenlik statüsü sağlamaz. Bazı vize kategorileri (E-2 gibi) bir işletme gerektirir, ancak işletme tek başına sizi vizeye hak kazandırmaz.',
      keyPoint: isEnglish
        ? 'Business formation ≠ immigration benefit'
        : 'Şirket kurulumu ≠ göçmenlik avantajı',
    },
    {
      id: 2,
      category: isEnglish ? 'Taxes' : 'Vergiler',
      myth: isEnglish
        ? '"A Delaware LLC means I won\'t pay any taxes."'
        : '"Delaware LLC vergisiz demektir."',
      reality: isEnglish
        ? 'Delaware has no state income tax on out-of-state income, but this doesn\'t eliminate your tax obligations. You may still owe: (1) US federal taxes depending on your situation, (2) taxes in your country of residence, (3) state taxes if you have nexus in other states.'
        : 'Delaware\'in eyalet dışı gelirler üzerinde eyalet gelir vergisi yoktur, ancak bu vergi yükümlülüklerinizi ortadan kaldırmaz. Yine de borçlu olabilirsiniz: (1) durumunuza bağlı olarak ABD federal vergileri, (2) ikamet ettiğiniz ülkede vergiler, (3) diğer eyaletlerde bağlantınız varsa eyalet vergileri.',
      keyPoint: isEnglish
        ? 'No state tax ≠ no tax at all'
        : 'Eyalet vergisi yok ≠ hiç vergi yok',
    },
    {
      id: 3,
      category: isEnglish ? 'Banking' : 'Bankacılık',
      myth: isEnglish
        ? '"With my LLC, I can easily open any US bank account remotely."'
        : '"LLC\'mle kolayca uzaktan ABD banka hesabı açabilirim."',
      reality: isEnglish
        ? 'Many traditional US banks require in-person visits or have strict KYC requirements for non-residents. While some fintech companies and newer banks offer remote account opening for LLC owners, the process often involves additional documentation and verification.'
        : 'Birçok geleneksel ABD bankası yüz yüze ziyaret gerektirir veya yerleşik olmayanlar için katı KYC gereksinimleri vardır. Bazı fintech şirketleri ve yeni bankalar LLC sahipleri için uzaktan hesap açma sunsa da, süreç genellikle ek dokümantasyon ve doğrulama içerir.',
      keyPoint: isEnglish
        ? 'LLC ownership ≠ guaranteed bank access'
        : 'LLC sahipliği ≠ garantili banka erişimi',
    },
    {
      id: 4,
      category: isEnglish ? 'Contracts' : 'Sözleşmeler',
      myth: isEnglish
        ? '"Online contract templates are just as good as lawyer-drafted ones."'
        : '"Çevrimiçi sözleşme şablonları avukat hazırladıkları kadar iyidir."',
      reality: isEnglish
        ? 'Templates provide a starting point and are useful for understanding common terms, but they cannot account for your specific situation, jurisdiction requirements, or business needs. Important contracts should be reviewed by an attorney who understands your circumstances.'
        : 'Şablonlar bir başlangıç noktası sağlar ve yaygın terimleri anlamak için kullanışlıdır, ancak özel durumunuzu, yargı yetkisi gereksinimlerini veya iş ihtiyaçlarınızı hesaba katamazlar. Önemli sözleşmeler, koşullarınızı anlayan bir avukat tarafından incelenmelidir.',
      keyPoint: isEnglish
        ? 'Templates are educational, not personalized advice'
        : 'Şablonlar eğiticidir, kişiselleştirilmiş tavsiye değildir',
    },
    {
      id: 5,
      category: isEnglish ? 'LLC & Business' : 'LLC ve İş',
      myth: isEnglish
        ? '"An LLC completely protects me from all personal liability."'
        : '"LLC beni tüm kişisel sorumluluktan tamamen korur."',
      reality: isEnglish
        ? 'While LLCs provide limited liability protection, this protection can be "pierced" if you: (1) don\'t maintain proper separation between personal and business finances, (2) commit fraud, (3) personally guarantee debts, or (4) fail to follow corporate formalities.'
        : 'LLC\'ler sınırlı sorumluluk koruması sağlasa da, bu koruma şu durumlarda "delinebilir": (1) kişisel ve işletme finansları arasında uygun ayrımı sürdürmezseniz, (2) dolandırıcılık yaparsanız, (3) borçları kişisel olarak garanti ederseniz veya (4) kurumsal formaliteleri takip etmezseniz.',
      keyPoint: isEnglish
        ? 'LLC protection has limits and requirements'
        : 'LLC korumasının sınırları ve gereksinimleri var',
    },
    {
      id: 6,
      category: isEnglish ? 'Taxes' : 'Vergiler',
      myth: isEnglish
        ? '"If I\'m outside the US, I don\'t need to worry about US taxes."'
        : '"ABD dışındaysam ABD vergileri hakkında endişelenmeme gerek yok."',
      reality: isEnglish
        ? 'If you own a US LLC or have US-source income, you may have US tax filing obligations regardless of where you live. This includes: (1) annual tax returns, (2) informational returns, (3) FBAR reporting if you have signature authority over US accounts.'
        : 'Bir ABD LLC\'niz varsa veya ABD kaynaklı geliriniz varsa, nerede yaşadığınızdan bağımsız olarak ABD vergi beyannamesi yükümlülükleriniz olabilir. Bu şunları içerir: (1) yıllık vergi beyannameleri, (2) bilgi beyannameleri, (3) ABD hesapları üzerinde imza yetkiniz varsa FBAR bildirimi.',
      keyPoint: isEnglish
        ? 'US business = potential US tax obligations'
        : 'ABD işi = potansiyel ABD vergi yükümlülükleri',
    },
    {
      id: 7,
      category: isEnglish ? 'Payments' : 'Ödemeler',
      myth: isEnglish
        ? '"I can receive payments through any method without tax implications."'
        : '"Herhangi bir yöntemle vergi etkisi olmadan ödeme alabilirim."',
      reality: isEnglish
        ? 'Payment platforms often report to tax authorities. PayPal, Stripe, and similar services issue 1099-K forms for US-based accounts. Additionally, wire transfers and other payment methods create documentation that tax authorities can access.'
        : 'Ödeme platformları genellikle vergi otoritelerine bildirimde bulunur. PayPal, Stripe ve benzeri hizmetler ABD merkezli hesaplar için 1099-K formları düzenler. Ayrıca banka havaleleri ve diğer ödeme yöntemleri vergi otoritelerinin erişebileceği belgeler oluşturur.',
      keyPoint: isEnglish
        ? 'Payment methods create tax documentation'
        : 'Ödeme yöntemleri vergi belgeleri oluşturur',
    },
    {
      id: 8,
      category: isEnglish ? 'LLC & Business' : 'LLC ve İş',
      myth: isEnglish
        ? '"I need a US LLC to work with US clients."'
        : '"ABD müşterileriyle çalışmak için ABD LLC\'ye ihtiyacım var."',
      reality: isEnglish
        ? 'You can often work with US clients as a foreign individual or through your foreign company. The decision to form a US LLC should be based on various factors: banking needs, payment processing, client requirements, and tax implications—not assumption.'
        : 'Genellikle ABD müşterileriyle yabancı bir birey olarak veya yabancı şirketiniz aracılığıyla çalışabilirsiniz. ABD LLC kurma kararı çeşitli faktörlere dayanmalıdır: bankacılık ihtiyaçları, ödeme işleme, müşteri gereksinimleri ve vergi etkileri—varsayıma değil.',
      keyPoint: isEnglish
        ? 'LLC is optional, not required for US business'
        : 'LLC isteğe bağlıdır, ABD işi için zorunlu değildir',
    },
    {
      id: 9,
      category: isEnglish ? 'Contracts' : 'Sözleşmeler',
      myth: isEnglish
        ? '"Verbal agreements are just as enforceable as written contracts."'
        : '"Sözlü anlaşmalar yazılı sözleşmeler kadar uygulanabilir."',
      reality: isEnglish
        ? 'While some verbal agreements can be legally binding, many types of contracts must be in writing to be enforceable (Statute of Frauds). Even when verbal agreements are valid, proving their terms in court is extremely difficult without written documentation.'
        : 'Bazı sözlü anlaşmalar yasal olarak bağlayıcı olabilse de, birçok sözleşme türünün uygulanabilir olması için yazılı olması gerekir (Dolandırıcılık Statüsü). Sözlü anlaşmalar geçerli olduğunda bile, yazılı belge olmadan koşullarını mahkemede kanıtlamak son derece zordur.',
      keyPoint: isEnglish
        ? 'Always get important agreements in writing'
        : 'Önemli anlaşmaları her zaman yazılı alın',
    },
    {
      id: 10,
      category: isEnglish ? 'LLC & Business' : 'LLC ve İş',
      myth: isEnglish
        ? '"All US states have the same LLC laws."'
        : '"Tüm ABD eyaletlerinin LLC yasaları aynıdır."',
      reality: isEnglish
        ? 'LLC laws vary significantly by state. Requirements for formation, annual reports, fees, taxation, and operating agreement provisions differ. What\'s required in Delaware may not be the same as Wyoming or your home state.'
        : 'LLC yasaları eyalete göre önemli ölçüde farklılık gösterir. Kuruluş, yıllık raporlar, ücretler, vergilendirme ve işletme sözleşmesi hükümleri için gereksinimler farklıdır. Delaware\'de gerekli olan Wyoming veya kendi eyaletinizle aynı olmayabilir.',
      keyPoint: isEnglish
        ? 'State laws differ—research your specific state'
        : 'Eyalet yasaları farklıdır—kendi eyaletinizi araştırın',
    },
  ]

  const categories = Array.from(new Set(misconceptions.map(m => m.category)))

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black text-black">
            EchoLegal
          </Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Home' : 'Ana Sayfa'}
            </Link>
            <Link href={`/${lang}/contracts`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Contracts' : 'Sözleşmeler'}
            </Link>
            <Link href={`/${lang}/library`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Library' : 'Kütüphane'}
            </Link>
            <Link
              href={`/${lang === 'en' ? 'tr' : 'en'}/library/hukuki-yanilgilar`}
              className="border border-black rounded-full px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition-all"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          <span className="mx-2">→</span>
          <Link href={`/${lang}/library`} className="hover:text-black">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
          <span className="mx-2">→</span>
          <span className="text-black">{isEnglish ? 'Common Mistakes' : 'Sık Yapılan Hatalar'}</span>
        </nav>

        {/* Article Header */}
        <article>
          <header className="mb-12">
            <span className="inline-block px-3 py-1 bg-red-50 text-red-800 rounded-full text-sm font-medium mb-4">
              {isEnglish ? 'Legal Truth Library' : 'Hukuki Gerçekler Kütüphanesi'}
            </span>

            <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
              {isEnglish
                ? 'Common Legal Misconceptions'
                : 'ABD\'de İş Yapan Türklerin Sık Yapılan Hukuki Hataları'}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              {isEnglish
                ? 'Facts vs. myths about doing business in the United States. These are common misunderstandings we see among international entrepreneurs.'
                : 'ABD\'de iş yapma hakkında gerçekler ve mitler. Bunlar uluslararası girişimciler arasında gördüğümüz yaygın yanlış anlamalardır.'}
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                {isEnglish ? 'Last updated: January 2026' : 'Son güncelleme: Ocak 2026'}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full">
                {misconceptions.length} {isEnglish ? 'misconceptions covered' : 'yanılgı ele alındı'}
              </span>
            </div>
          </header>

          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-10">
            <p className="text-sm text-amber-900 leading-relaxed">
              <strong>{isEnglish ? 'Note:' : 'Not:'}</strong>{' '}
              {isEnglish
                ? 'This guide provides general information for educational purposes. Laws change and individual circumstances vary. This is not legal, tax, or immigration advice. Consult licensed professionals for your specific situation.'
                : 'Bu rehber eğitim amaçlı genel bilgi sağlar. Yasalar değişir ve bireysel durumlar farklılık gösterir. Bu hukuki, vergi veya göçmenlik tavsiyesi değildir. Özel durumunuz için lisanslı profesyonellere danışın.'}
            </p>
          </div>

          {/* Quick Jump */}
          <div className="bg-gray-50 rounded-lg p-6 mb-10">
            <h2 className="font-bold text-black mb-4">
              {isEnglish ? 'Categories' : 'Kategoriler'}
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`#${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-gray-400 transition-colors"
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>

          {/* Misconceptions by Category */}
          {categories.map((category) => (
            <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-6 pb-2 border-b border-gray-200">
                {category}
              </h2>

              <div className="space-y-6">
                {misconceptions.filter(m => m.category === category).map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Myth */}
                    <div className="bg-red-50 border-b border-red-100 p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-red-500 text-xl">✗</span>
                        <div>
                          <span className="text-xs font-semibold text-red-700 uppercase tracking-wider">
                            {isEnglish ? 'Myth' : 'Yanılgı'}
                          </span>
                          <p className="text-red-900 font-medium mt-1">{item.myth}</p>
                        </div>
                      </div>
                    </div>

                    {/* Reality */}
                    <div className="bg-white p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✓</span>
                        <div>
                          <span className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                            {isEnglish ? 'Reality' : 'Gerçek'}
                          </span>
                          <p className="text-gray-700 mt-1">{item.reality}</p>
                        </div>
                      </div>
                    </div>

                    {/* Key Point */}
                    <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
                      <p className="text-sm">
                        <span className="font-semibold text-gray-700">{isEnglish ? 'Key takeaway:' : 'Önemli çıkarım:'}</span>{' '}
                        <span className="text-gray-600">{item.keyPoint}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Summary */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6">
              {isEnglish ? 'Key Principles to Remember' : 'Hatırlanması Gereken Temel İlkeler'}
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <ul className="space-y-3 text-blue-900">
                <li className="flex items-start gap-3">
                  <span className="font-bold">1.</span>
                  <span>
                    {isEnglish
                      ? 'Business formation and immigration are separate processes.'
                      : 'Şirket kurulumu ve göçmenlik ayrı süreçlerdir.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">2.</span>
                  <span>
                    {isEnglish
                      ? '"No state tax" doesn\'t mean "no tax."'
                      : '"Eyalet vergisi yok" demek "vergi yok" demek değildir.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">3.</span>
                  <span>
                    {isEnglish
                      ? 'LLC protection has requirements and limitations.'
                      : 'LLC korumasının gereksinimleri ve sınırlamaları vardır.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">4.</span>
                  <span>
                    {isEnglish
                      ? 'US business activity creates US obligations.'
                      : 'ABD iş faaliyeti ABD yükümlülükleri oluşturur.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">5.</span>
                  <span>
                    {isEnglish
                      ? 'Always document important agreements in writing.'
                      : 'Önemli anlaşmaları her zaman yazılı olarak belgeleyin.'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold">6.</span>
                  <span>
                    {isEnglish
                      ? 'Consult professionals for your specific situation.'
                      : 'Özel durumunuz için profesyonellere danışın.'}
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Product CTA */}
          <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-black mb-4 text-center">
              {isEnglish ? 'Need Business Documents?' : 'İş Belgelerine İhtiyacınız Var mı?'}
            </h2>
            <p className="text-gray-600 text-center mb-6 max-w-xl mx-auto">
              {isEnglish
                ? 'Our Business Starter Kit includes essential contracts for US business operations.'
                : 'Business Starter Kit\'imiz ABD iş operasyonları için temel sözleşmeleri içerir.'}
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

          {/* Related Resources */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-black mb-6">
              {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href={`/${lang}/library/llc-kurma-rehberi`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-black mb-1">
                  {isEnglish ? 'LLC Formation Guide' : 'LLC Kurma Rehberi'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Understanding how to form an LLC in the US.'
                    : 'ABD\'de LLC kurmanın temellerini anlama.'}
                </p>
              </Link>

              <Link
                href={`/${lang}/library/irs-vergi-gercekleri`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-black mb-1">
                  {isEnglish ? 'IRS & Tax Facts' : 'IRS ve Vergi Gerçekleri'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'W-8, W-9, 1099 forms explained.'
                    : 'W-8, W-9, 1099 formları açıklandı.'}
                </p>
              </Link>

              <Link
                href={`/${lang}/library/llc-vize-yanilgisi`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-black mb-1">
                  {isEnglish ? 'LLC ≠ Visa' : 'LLC Kurmak Vize Vermez'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Understanding immigration realities.'
                    : 'Göçmenlik gerçeklerini anlama.'}
                </p>
              </Link>

              <Link
                href={`/${lang}/contracts`}
                className="block border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-black mb-1">
                  {isEnglish ? 'Contract Templates' : 'Sözleşme Şablonları'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish
                    ? 'Browse our library of legal templates.'
                    : 'Hukuki şablon kütüphanemize göz atın.'}
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">
            {dict.disclaimer.global}
          </p>
          <p className="text-xs text-gray-400 mt-4">
            © 2025 EchoLegal. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
          </p>
        </div>
      </footer>
    </div>
  )
}
