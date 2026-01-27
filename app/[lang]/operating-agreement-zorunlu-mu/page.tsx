import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Is an Operating Agreement Required? Facts for US LLCs | EchoLegal'
    : 'Operating Agreement Zorunlu mu? ABD LLC\'ler İçin Gerçekler | EchoLegal'

  const description = isEnglish
    ? 'Learn whether your US LLC needs an Operating Agreement, which states require it, and why it\'s essential even when not legally mandated.'
    : 'ABD LLC\'nizin İşletme Sözleşmesine ihtiyacı olup olmadığını, hangi eyaletlerin bunu gerektirdiğini ve yasal olarak zorunlu olmasa bile neden gerekli olduğunu öğrenin.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/operating-agreement-zorunlu-mu`,
      languages: {
        'en': 'https://echo-legal.com/en/operating-agreement-zorunlu-mu',
        'tr': 'https://echo-legal.com/tr/operating-agreement-zorunlu-mu',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function OperatingAgreementPage({
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
    headline: isEnglish ? 'Is an Operating Agreement Required for US LLCs?' : 'Operating Agreement ABD LLC\'ler İçin Zorunlu mu?',
    author: { '@type': 'Person', name: 'Zeynep Ruziye Moore', jobTitle: 'Licensed in New York' },
    datePublished: '2026-01-15',
    dateModified: '2026-01-27',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'Operating Agreement' : 'Operating Agreement'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'Is an Operating Agreement Required?'
              : 'Operating Agreement Zorunlu mu?'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'The facts about Operating Agreements for US LLCs: legal requirements, state-by-state rules, and why every LLC should have one.'
              : 'ABD LLC\'ler için Operating Agreement hakkında gerçekler: yasal gereksinimler, eyalete göre kurallar ve neden her LLC\'nin bir tanesine sahip olması gerektiği.'}
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

          {/* Quick Answer */}
          <div className="bg-[#C9A227]/10 border-2 border-[#C9A227] rounded-xl p-6 mb-10">
            <h2 className="font-bold text-lg mb-3">{isEnglish ? 'Quick Answer' : 'Kısa Cevap'}</h2>
            <p className="text-gray-700">
              {isEnglish
                ? 'Legally required in only 5 states (California, Delaware, Maine, Missouri, New York). However, practically required by ALL banks, payment processors, and for maintaining liability protection. Every LLC should have one regardless of state requirements.'
                : 'Yasal olarak yalnızca 5 eyalette zorunludur (California, Delaware, Maine, Missouri, New York). Ancak TÜM bankalar, ödeme işlemcileri ve sorumluluk korumasını sürdürmek için pratik olarak gereklidir. Her LLC, eyalet gereksinimlerinden bağımsız olarak bir tanesine sahip olmalıdır.'}
            </p>
          </div>

          {/* What is Operating Agreement */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What is an Operating Agreement?' : 'Operating Agreement Nedir?'}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {isEnglish
                ? 'An Operating Agreement is an internal document that outlines how your LLC will be run. It defines:'
                : 'Operating Agreement, LLC\'nizin nasıl yönetileceğini özetleyen dahili bir belgedir. Şunları tanımlar:'}
            </p>
            <ul className="space-y-2 mb-6">
              {(isEnglish ? [
                'Ownership percentages and capital contributions',
                'How profits and losses are distributed',
                'Member voting rights and decision-making processes',
                'Management structure (member-managed vs manager-managed)',
                'What happens if a member leaves or dies',
                'How the LLC can be dissolved',
              ] : [
                'Sahiplik yüzdeleri ve sermaye katkıları',
                'Kar ve zararların nasıl dağıtılacağı',
                'Üye oy hakları ve karar alma süreçleri',
                'Yönetim yapısı (üye yönetimli vs yönetici yönetimli)',
                'Bir üye ayrılırsa veya ölürse ne olacağı',
                'LLC nasıl feshedilebilir',
              ]).map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-[#C9A227] mr-2">•</span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* State Requirements */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'State-by-State Legal Requirements' : 'Eyalete Göre Yasal Gereksinimler'}</h2>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3 text-red-700">{isEnglish ? 'States Where Legally Required:' : 'Yasal Olarak Zorunlu Olduğu Eyaletler:'}</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {['California', 'Delaware', 'Maine', 'Missouri', 'New York'].map((state) => (
                  <span key={state} className="bg-red-100 text-red-800 px-3 py-2 rounded text-center text-sm font-medium">{state}</span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold mb-4">{isEnglish ? 'Popular LLC States:' : 'Popüler LLC Eyaletleri:'}</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold">Delaware</p>
                  <p className="text-gray-600 text-sm">
                    {isEnglish
                      ? 'REQUIRED. Delaware LLC Act §18-101(7) mandates a written Operating Agreement.'
                      : 'ZORUNLU. Delaware LLC Yasası §18-101(7) yazılı bir Operating Agreement zorunlu kılar.'}
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold">Wyoming</p>
                  <p className="text-gray-600 text-sm">
                    {isEnglish
                      ? 'Not legally required, but highly recommended. State provides default rules if you don\'t have one.'
                      : 'Yasal olarak zorunlu değil, ancak şiddetle tavsiye edilir. Yoksa eyalet varsayılan kurallar sağlar.'}
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="font-semibold">New York</p>
                  <p className="text-gray-600 text-sm">
                    {isEnglish
                      ? 'REQUIRED within 90 days of formation. NY LLC Law §417 requires written Operating Agreement.'
                      : 'ZORUNLU, kuruluştan sonraki 90 gün içinde. NY LLC Yasası §417 yazılı Operating Agreement gerektirir.'}
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold">Florida</p>
                  <p className="text-gray-600 text-sm">
                    {isEnglish
                      ? 'Not legally required. However, courts look for one when disputes arise.'
                      : 'Yasal olarak zorunlu değil. Ancak anlaşmazlıklar çıktığında mahkemeler bir tane arar.'}
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold">Texas</p>
                  <p className="text-gray-600 text-sm">
                    {isEnglish
                      ? 'Not legally required. Called "Company Agreement" in Texas.'
                      : 'Yasal olarak zorunlu değil. Texas\'ta "Company Agreement" olarak adlandırılır.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why You Need One */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Why You Need One Even If Not Required' : 'Zorunlu Olmasa Bile Neden İhtiyacınız Var'}</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h3 className="font-semibold text-blue-900 mb-2">{isEnglish ? '🏦 Banks Require It' : '🏦 Bankalar İstiyor'}</h3>
                <p className="text-blue-800 text-sm">
                  {isEnglish
                    ? 'Almost every US bank requires an Operating Agreement to open a business account. Mercury, Relay, Chase, Bank of America—all of them.'
                    : 'Hemen hemen her ABD bankası iş hesabı açmak için Operating Agreement ister. Mercury, Relay, Chase, Bank of America—hepsi.'}
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h3 className="font-semibold text-green-900 mb-2">{isEnglish ? '🛡️ Liability Protection' : '🛡️ Sorumluluk Koruması'}</h3>
                <p className="text-green-800 text-sm">
                  {isEnglish
                    ? 'Without one, courts may "pierce the corporate veil" and hold you personally liable for LLC debts.'
                    : 'Olmadan, mahkemeler "kurumsal perdeyi delip" LLC borçlarından sizi kişisel olarak sorumlu tutabilir.'}
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
                <h3 className="font-semibold text-purple-900 mb-2">{isEnglish ? '💳 Payment Processors' : '💳 Ödeme İşlemcileri'}</h3>
                <p className="text-purple-800 text-sm">
                  {isEnglish
                    ? 'Stripe, PayPal, and other processors may request it during verification.'
                    : 'Stripe, PayPal ve diğer işlemciler doğrulama sırasında isteyebilir.'}
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5">
                <h3 className="font-semibold text-orange-900 mb-2">{isEnglish ? '⚖️ Avoid State Default Rules' : '⚖️ Eyalet Varsayılan Kurallarından Kaçının'}</h3>
                <p className="text-orange-800 text-sm">
                  {isEnglish
                    ? 'Without an Operating Agreement, state default rules apply—which may not be what you want.'
                    : 'Operating Agreement olmadan, eyalet varsayılan kuralları geçerlidir—ki bunlar istediğiniz olmayabilir.'}
                </p>
              </div>
            </div>
          </section>

          {/* Single-Member vs Multi-Member */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Single-Member vs Multi-Member LLCs' : 'Tek Üyeli vs Çok Üyeli LLC\'ler'}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">{isEnglish ? 'Single-Member LLC' : 'Tek Üyeli LLC'}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {isEnglish
                    ? 'Even if you\'re the only owner, an Operating Agreement:'
                    : 'Tek sahip olsanız bile, Operating Agreement:'}
                </p>
                <ul className="space-y-2 text-sm">
                  {(isEnglish ? [
                    'Documents that the LLC is separate from you personally',
                    'Required by most banks for account opening',
                    'Protects your limited liability status',
                    'Can establish procedures for adding members later',
                  ] : [
                    'LLC\'nin sizden kişisel olarak ayrı olduğunu belgeler',
                    'Çoğu banka tarafından hesap açılışı için gereklidir',
                    'Sınırlı sorumluluk statünüzü korur',
                    'Daha sonra üye eklemek için prosedürler oluşturabilir',
                  ]).map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">{isEnglish ? 'Multi-Member LLC' : 'Çok Üyeli LLC'}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {isEnglish
                    ? 'With multiple owners, an Operating Agreement is CRITICAL:'
                    : 'Birden fazla sahiple, Operating Agreement KRİTİKTİR:'}
                </p>
                <ul className="space-y-2 text-sm">
                  {(isEnglish ? [
                    'Defines each member\'s ownership percentage',
                    'Establishes voting rights and decision-making rules',
                    'Specifies profit distribution (doesn\'t have to match ownership %)',
                    'Sets rules for adding or removing members',
                    'Prevents disputes with clear exit procedures',
                  ] : [
                    'Her üyenin sahiplik yüzdesini tanımlar',
                    'Oy hakları ve karar alma kurallarını belirler',
                    'Kar dağılımını belirtir (sahiplik %\'siyle eşleşmek zorunda değil)',
                    'Üye ekleme veya çıkarma kurallarını belirler',
                    'Net çıkış prosedürleriyle anlaşmazlıkları önler',
                  ]).map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* What to Include */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Essential Clauses to Include' : 'Dahil Edilmesi Gereken Temel Maddeler'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { clause: 'Formation Details', desc: 'LLC name, state of formation, principal office address, registered agent' },
                { clause: 'Members & Ownership', desc: 'Names of all members, ownership percentages, capital contributions' },
                { clause: 'Management Structure', desc: 'Member-managed or manager-managed, voting requirements' },
                { clause: 'Profit & Loss Distribution', desc: 'How profits/losses are allocated (can differ from ownership %)' },
                { clause: 'Meetings & Voting', desc: 'When meetings happen, quorum requirements, how decisions are made' },
                { clause: 'Transfer of Interests', desc: 'Can members sell their interest? Right of first refusal?' },
                { clause: 'Withdrawal & Dissolution', desc: 'What happens if a member wants to leave or dies' },
                { clause: 'Dispute Resolution', desc: 'Arbitration vs litigation, governing law, jurisdiction' },
              ] : [
                { clause: 'Kuruluş Detayları', desc: 'LLC adı, kuruluş eyaleti, ana ofis adresi, kayıtlı temsilci' },
                { clause: 'Üyeler ve Sahiplik', desc: 'Tüm üyelerin isimleri, sahiplik yüzdeleri, sermaye katkıları' },
                { clause: 'Yönetim Yapısı', desc: 'Üye yönetimli veya yönetici yönetimli, oy gereksinimleri' },
                { clause: 'Kar ve Zarar Dağılımı', desc: 'Kar/zararların nasıl dağıtılacağı (sahiplik %\'sinden farklı olabilir)' },
                { clause: 'Toplantılar ve Oylama', desc: 'Toplantılar ne zaman yapılır, yeter sayı gereksinimleri, kararlar nasıl alınır' },
                { clause: 'Payların Devri', desc: 'Üyeler paylarını satabilir mi? Önalım hakkı?' },
                { clause: 'Ayrılma ve Fesih', desc: 'Bir üye ayrılmak isterse veya ölürse ne olur' },
                { clause: 'Uyuşmazlık Çözümü', desc: 'Tahkim vs dava, geçerli hukuk, yargı yetkisi' },
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <span className="bg-[#C9A227] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                  <div>
                    <p className="font-semibold">{item.clause}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">{isEnglish ? 'Frequently Asked Questions' : 'Sık Sorulan Sorular'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { q: 'Do I need to file my Operating Agreement with the state?', a: 'No. Operating Agreements are internal documents. You keep them in your records but don\'t file them with any government agency. However, you may need to show them to banks, courts, or the IRS.' },
                { q: 'Can I write my own Operating Agreement?', a: 'Yes, but it\'s risky. A poorly drafted agreement can cause problems later. Using a lawyer-reviewed template or having an attorney draft one is recommended.' },
                { q: 'Can I change my Operating Agreement later?', a: 'Yes. Most Operating Agreements include an amendment provision. All members typically need to agree to changes.' },
                { q: 'What if I don\'t have one and need to open a bank account?', a: 'Create one immediately. Banks won\'t open accounts without it. Most can be created in a day using a proper template.' },
              ] : [
                { q: 'Operating Agreement\'ı eyalete dosyalamam gerekir mi?', a: 'Hayır. Operating Agreement\'lar dahili belgelerdir. Kayıtlarınızda tutarsınız ama herhangi bir devlet kurumuna dosyalamazsınız. Ancak, bankalara, mahkemelere veya IRS\'e göstermeniz gerekebilir.' },
                { q: 'Kendi Operating Agreement\'ımı yazabilir miyim?', a: 'Evet, ama riskli. Kötü hazırlanmış bir anlaşma daha sonra sorunlara neden olabilir. Avukat tarafından incelenmiş bir şablon kullanmak veya bir avukatın hazırlaması önerilir.' },
                { q: 'Operating Agreement\'ı daha sonra değiştirebilir miyim?', a: 'Evet. Çoğu Operating Agreement bir değişiklik hükmü içerir. Tüm üyelerin genellikle değişikliklere katılması gerekir.' },
                { q: 'Yoksa ve banka hesabı açmam gerekiyorsa ne olur?', a: 'Hemen bir tane oluşturun. Bankalar onsuz hesap açmaz. Çoğu uygun bir şablon kullanılarak bir günde oluşturulabilir.' },
              ]).map((faq, i) => (
                <details key={i} className="border border-gray-200 rounded-lg">
                  <summary className="p-4 font-semibold cursor-pointer hover:bg-gray-50">{faq.q}</summary>
                  <p className="p-4 pt-0 text-gray-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/abd-de-llc-kurmak-turkler-icin-adim-adim`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Complete LLC Formation Guide →' : 'Eksiksiz LLC Kurma Rehberi →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-sirket-kuran-turklerin-hatalari`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? '7 Legal Mistakes Turkish Business Owners Make →' : 'Türk İş Sahiplerinin Yaptığı 7 Hukuki Hata →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-llc-banka-hesabi-acmak`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Opening a US Bank Account for Your LLC →' : 'LLC\'niz İçin ABD Banka Hesabı Açmak →'}
                </Link>
              </li>
            </ul>
          </section>

        </article>
      </main>
    </>
  )
}
