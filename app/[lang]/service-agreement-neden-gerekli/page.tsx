import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Why Service Agreements Are Essential for US Business | EchoLegal'
    : 'ABD\'de Şirket Kuranlar İçin Service Agreement Neden Şarttır? | EchoLegal'

  const description = isEnglish
    ? 'Learn why every freelancer, consultant, and agency needs a Service Agreement when working with US clients. Key clauses, legal protection, and getting paid.'
    : 'ABD müşterileriyle çalışırken her serbest çalışan, danışman ve ajansın neden Service Agreement\'a ihtiyacı olduğunu öğrenin. Temel maddeler, hukuki koruma ve ödeme alma.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/service-agreement-neden-gerekli`,
      languages: {
        'en': 'https://echo-legal.com/en/service-agreement-neden-gerekli',
        'tr': 'https://echo-legal.com/tr/service-agreement-neden-gerekli',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function ServiceAgreementPage({
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
    headline: isEnglish ? 'Why Service Agreements Are Essential' : 'Service Agreement Neden Şart',
    author: { '@type': 'Person', name: 'Zeynep Ruziye Moore', jobTitle: 'Licensed in New York' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'Service Agreement' : 'Service Agreement'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'Why Service Agreements Are Essential'
              : 'Service Agreement Neden Şart?'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'The critical contract every freelancer, consultant, and agency needs when working with US clients—and what happens without one.'
              : 'ABD müşterileriyle çalışırken her serbest çalışan, danışman ve ajansın ihtiyacı olan kritik sözleşme—ve bir tane olmadan neler olacağı.'}
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

          {/* What is Service Agreement */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'What is a Service Agreement?' : 'Service Agreement Nedir?'}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {isEnglish
                ? 'A Service Agreement (also called a Client Services Agreement, Consulting Agreement, or Freelance Contract) is a legally binding contract between you and your client that defines the terms of your working relationship.'
                : 'Service Agreement (Müşteri Hizmetleri Sözleşmesi, Danışmanlık Sözleşmesi veya Serbest Çalışan Sözleşmesi olarak da adlandırılır), çalışma ilişkinizin koşullarını tanımlayan siz ve müşteriniz arasındaki yasal bağlayıcı bir sözleşmedir.'}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {isEnglish
                ? 'It protects both parties by clearly establishing what work will be done, how much it costs, when payment is due, and what happens if things go wrong.'
                : 'Her iki tarafı da korur: hangi işin yapılacağını, ne kadara mal olacağını, ödemenin ne zaman yapılacağını ve işler ters giderse ne olacağını açıkça belirleyerek.'}
            </p>
          </section>

          {/* Why You Need One */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Why You Need a Service Agreement' : 'Neden Service Agreement\'a İhtiyacınız Var'}</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {(isEnglish ? [
                { title: 'Get Paid', desc: 'Clear payment terms make it easier to enforce payment. Without a contract, collecting from non-paying clients is nearly impossible.' },
                { title: 'Define Scope', desc: 'Prevent "scope creep" where clients keep adding work. If it\'s not in the contract, it\'s not included.' },
                { title: 'Limit Liability', desc: 'Cap your exposure. Without a limitation clause, you could be liable for unlimited damages.' },
                { title: 'Own Your Work', desc: 'Define who owns intellectual property. By default, you might give away more rights than intended.' },
                { title: 'Set Expectations', desc: 'Clear deliverables and deadlines prevent disputes about what was promised.' },
                { title: 'Legal Standing', desc: 'A contract gives you legal recourse. Verbal agreements are hard to prove in court.' },
              ] : [
                { title: 'Ödeme Alın', desc: 'Net ödeme koşulları ödeme almayı kolaylaştırır. Sözleşme olmadan, ödeme yapmayan müşterilerden tahsilat neredeyse imkansızdır.' },
                { title: 'Kapsamı Tanımlayın', desc: 'Müşterilerin sürekli iş eklediği "kapsam genişlemesini" önleyin. Sözleşmede yoksa, dahil değildir.' },
                { title: 'Sorumluluğu Sınırlayın', desc: 'Maruziyetinizi sınırlayın. Sınırlama maddesi olmadan, sınırsız zararlardan sorumlu olabilirsiniz.' },
                { title: 'İşinize Sahip Olun', desc: 'Fikri mülkiyetin kime ait olduğunu tanımlayın. Varsayılan olarak, amaçlananın ötesinde haklar verebilirsiniz.' },
                { title: 'Beklentileri Belirleyin', desc: 'Net teslim edilecekler ve son tarihler, neyin vaat edildiğine dair anlaşmazlıkları önler.' },
                { title: 'Hukuki Dayanak', desc: 'Bir sözleşme size hukuki başvuru hakkı verir. Sözlü anlaşmaları mahkemede kanıtlamak zordur.' },
              ]).map((item, i) => (
                <div key={i} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-semibold text-blue-900">{item.title}</p>
                  <p className="text-blue-800 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Essential Clauses */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Essential Clauses to Include' : 'Dahil Edilmesi Gereken Temel Maddeler'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { clause: 'Scope of Services', importance: 'Critical', desc: 'Exactly what you will (and won\'t) deliver. Be specific about deliverables.' },
                { clause: 'Payment Terms', importance: 'Critical', desc: 'How much, when due, late fees, and accepted payment methods.' },
                { clause: 'Timeline/Deadlines', importance: 'High', desc: 'When work starts, milestones, and final delivery date.' },
                { clause: 'Revision Limits', importance: 'High', desc: 'How many revision rounds are included. Extra revisions = extra cost.' },
                { clause: 'Intellectual Property', importance: 'Critical', desc: 'Who owns the work product. Transfer upon payment or license?' },
                { clause: 'Limitation of Liability', importance: 'Critical', desc: 'Cap damages at the contract value. Exclude consequential damages.' },
                { clause: 'Termination', importance: 'High', desc: 'How either party can end the contract. Notice period and final payment.' },
                { clause: 'Confidentiality', importance: 'Medium', desc: 'Protect client information and your business methods.' },
                { clause: 'Governing Law', importance: 'High', desc: 'Which jurisdiction\'s laws apply and where disputes are resolved.' },
                { clause: 'Dispute Resolution', importance: 'High', desc: 'Mediation, arbitration, or litigation. International clients often prefer arbitration.' },
              ] : [
                { clause: 'Hizmet Kapsamı', importance: 'Kritik', desc: 'Tam olarak ne teslim edeceğiniz (ve etmeyeceğiniz). Teslim edilecekler hakkında spesifik olun.' },
                { clause: 'Ödeme Koşulları', importance: 'Kritik', desc: 'Ne kadar, ne zaman vadesi dolacak, gecikme ücretleri ve kabul edilen ödeme yöntemleri.' },
                { clause: 'Zaman Çizelgesi/Son Tarihler', importance: 'Yüksek', desc: 'İşin ne zaman başladığı, kilometre taşları ve son teslim tarihi.' },
                { clause: 'Revizyon Sınırları', importance: 'Yüksek', desc: 'Kaç revizyon turu dahildir. Ekstra revizyonlar = ekstra maliyet.' },
                { clause: 'Fikri Mülkiyet', importance: 'Kritik', desc: 'İş ürününün sahibi kim. Ödeme üzerine devir mi lisans mı?' },
                { clause: 'Sorumluluk Sınırlaması', importance: 'Kritik', desc: 'Zararları sözleşme değeriyle sınırlayın. Dolaylı zararları hariç tutun.' },
                { clause: 'Fesih', importance: 'Yüksek', desc: 'Her iki tarafın sözleşmeyi nasıl sonlandırabileceği. İhbar süresi ve son ödeme.' },
                { clause: 'Gizlilik', importance: 'Orta', desc: 'Müşteri bilgilerini ve iş yöntemlerinizi koruyun.' },
                { clause: 'Geçerli Hukuk', importance: 'Yüksek', desc: 'Hangi yargı yetkisinin yasalarının geçerli olduğu ve anlaşmazlıkların nerede çözüleceği.' },
                { clause: 'Uyuşmazlık Çözümü', importance: 'Yüksek', desc: 'Arabuluculuk, tahkim veya dava. Uluslararası müşteriler genellikle tahkimi tercih eder.' },
              ]).map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    item.importance === 'Critical' || item.importance === 'Kritik' ? 'bg-red-100 text-red-800' :
                    item.importance === 'High' || item.importance === 'Yüksek' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>{item.importance}</span>
                  <div>
                    <p className="font-semibold">{item.clause}</p>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Real Scenarios */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Real Scenarios Where Contracts Matter' : 'Sözleşmelerin Önemli Olduğu Gerçek Senaryolar'}</h2>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="font-semibold text-red-900">{isEnglish ? 'Scenario: Client doesn\'t pay' : 'Senaryo: Müşteri ödeme yapmıyor'}</p>
                <p className="text-red-800 text-sm mt-2">
                  {isEnglish
                    ? 'Without contract: You have no proof of agreed price or payment terms. Your options are limited. With contract: Clear payment terms, late fees, and dispute resolution process. Can pursue in small claims court or arbitration.'
                    : 'Sözleşme olmadan: Anlaşılan fiyat veya ödeme koşullarının kanıtı yok. Seçenekleriniz sınırlı. Sözleşmeyle: Net ödeme koşulları, gecikme ücretleri ve uyuşmazlık çözüm süreci. Küçük davalar mahkemesinde veya tahkimde takip edebilirsiniz.'}
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="font-semibold text-red-900">{isEnglish ? 'Scenario: Client keeps requesting changes' : 'Senaryo: Müşteri sürekli değişiklik istiyor'}</p>
                <p className="text-red-800 text-sm mt-2">
                  {isEnglish
                    ? 'Without contract: No way to charge for extra work. You do it for free or damage the relationship. With contract: "This exceeds our agreed revision limit. Additional changes are $X per hour."'
                    : 'Sözleşme olmadan: Ekstra iş için ücret almanın yolu yok. Ya ücretsiz yaparsınız ya da ilişkiye zarar verirsiniz. Sözleşmeyle: "Bu, anlaşılan revizyon sınırımızı aşıyor. Ek değişiklikler saat başına X$."'}
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="font-semibold text-red-900">{isEnglish ? 'Scenario: Client\'s business fails because of your work' : 'Senaryo: Müşterinin işi sizin işiniz yüzünden başarısız oluyor'}</p>
                <p className="text-red-800 text-sm mt-2">
                  {isEnglish
                    ? 'Without contract: Client can sue for unlimited damages ("I lost $1M because of your mistake!"). With contract: Liability capped at contract value. No consequential damages.'
                    : 'Sözleşme olmadan: Müşteri sınırsız zarar için dava açabilir ("Hatanız yüzünden 1M$ kaybettim!"). Sözleşmeyle: Sorumluluk sözleşme değeriyle sınırlı. Dolaylı zarar yok.'}
                </p>
              </div>
            </div>
          </section>

          {/* International Considerations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Special Considerations for International Work' : 'Uluslararası İş İçin Özel Değerlendirmeler'}</h2>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="font-semibold text-yellow-900">{isEnglish ? 'Working from Turkey with US Clients' : 'Türkiye\'den ABD Müşterileriyle Çalışmak'}</p>
              <p className="text-yellow-800 mt-2">
                {isEnglish
                  ? 'When working internationally, contracts are even more important because enforcing verbal agreements across borders is extremely difficult. Include these provisions:'
                  : 'Uluslararası çalışırken, sözlü anlaşmaları sınırlar arasında uygulamak son derece zor olduğu için sözleşmeler daha da önemlidir. Bu hükümleri ekleyin:'}
              </p>
            </div>

            <ul className="space-y-3">
              {(isEnglish ? [
                'Governing Law: Choose which country/state\'s laws apply',
                'Currency: Specify USD to avoid exchange rate disputes',
                'Payment Method: Wire transfer, PayPal, Wise—be specific',
                'Time Zones: Reference specific timezone for deadlines',
                'Dispute Resolution: Consider international arbitration (cheaper than cross-border litigation)',
                'Language: Specify English version controls if translated',
              ] : [
                'Geçerli Hukuk: Hangi ülke/eyalet yasalarının geçerli olacağını seçin',
                'Para Birimi: Kur anlaşmazlıklarından kaçınmak için USD belirtin',
                'Ödeme Yöntemi: Havale, PayPal, Wise—spesifik olun',
                'Saat Dilimleri: Son tarihler için belirli saat dilimini referans alın',
                'Uyuşmazlık Çözümü: Uluslararası tahkimi düşünün (sınır ötesi davalardan daha ucuz)',
                'Dil: Tercüme edilmişse İngilizce versiyonun geçerli olduğunu belirtin',
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#C9A227]">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/abd-freelancer-hukuki-rehber`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'US Freelancer Legal Guide →' : 'ABD Freelancer Hukuki Rehberi →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/encyclopedia/freelancer-legal-guide`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Complete Freelancer Legal Handbook →' : 'Eksiksiz Serbest Çalışan Hukuk El Kitabı →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-sirket-kuran-turklerin-hatalari`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? '7 Legal Mistakes to Avoid →' : 'Kaçınılması Gereken 7 Hukuki Hata →'}
                </Link>
              </li>
            </ul>
          </section>

        </article>
      </main>
    </>
  )
}
