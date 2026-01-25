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
      ? "Pathways to the United States - Visa Categories & Entry Options | EchoLegal"
      : "ABD'ye Gelme Yolları - Vize Kategorileri & Giriş Seçenekleri | EchoLegal",
    description: isEnglish
      ? "Comprehensive overview of immigrant and non-immigrant visa categories for Turkish citizens. Legal entry pathways to the United States."
      : "Türk vatandaşları için göçmen ve göçmen olmayan vize kategorilerinin kapsamlı özeti. ABD'ye yasal giriş yolları.",
  }
}

export default async function AbdyeGelmeYollariPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'
  const registryEntry = getRegistryEntry('abdye-gelme-yollari')

  const faqItems = [
    {
      question: isEnglish
        ? "Can I come to the US as a tourist and then apply for a work visa?"
        : "Turist olarak ABD'ye gelip sonra çalışma vizesi başvurusu yapabilir miyim?",
      answer: isEnglish
        ? "This is one of the most common misconceptions. Entering the US with tourist intent and then changing to a work-based status raises serious questions about immigrant intent and can result in visa fraud allegations. The 30/60 day rule and preconceived intent doctrine apply."
        : "Bu en yaygın yanlış varsayımlardan biridir. ABD'ye turist niyetiyle girip sonra çalışmaya dayalı statüye geçmek, göçmen niyeti hakkında ciddi sorular doğurur ve vize dolandırıcılığı iddialarına yol açabilir. 30/60 gün kuralı ve önceden tasarlanmış niyet doktrini uygulanır."
    },
    {
      question: isEnglish
        ? "What is the difference between immigrant and non-immigrant visas?"
        : "Göçmen ve göçmen olmayan vizeler arasındaki fark nedir?",
      answer: isEnglish
        ? "Non-immigrant visas (B, F, H, L, etc.) are for temporary stays with intent to return home. Immigrant visas lead to permanent residency (green card). Most non-immigrant visas require proving you will return to your home country."
        : "Göçmen olmayan vizeler (B, F, H, L vb.) eve dönme niyetiyle geçici kalışlar içindir. Göçmen vizeler kalıcı oturma iznine (yeşil kart) yol açar. Çoğu göçmen olmayan vize, ülkenize döneceğinizi kanıtlamanızı gerektirir."
    },
    {
      question: isEnglish
        ? "Is it easier to get a visa if I have a US company?"
        : "ABD şirketim varsa vize almak daha kolay mı?",
      answer: isEnglish
        ? "Having a US company does not automatically qualify you for any visa. E-2 treaty investor visas require substantial investment and Turkish nationality. L-1 visas require an existing foreign company with US operations. Each category has specific requirements."
        : "ABD şirketiniz olması sizi otomatik olarak herhangi bir vize için hak sahibi yapmaz. E-2 anlaşmalı yatırımcı vizeleri önemli yatırım ve Türk vatandaşlığı gerektirir. L-1 vizeleri ABD operasyonları olan mevcut bir yabancı şirket gerektirir. Her kategorinin kendine özgü gereksinimleri vardır."
    },
    {
      question: isEnglish
        ? "What is the 214(b) refusal?"
        : "214(b) reddi nedir?",
      answer: isEnglish
        ? "Section 214(b) of the Immigration and Nationality Act presumes that every visa applicant is an intending immigrant until they prove otherwise. A 214(b) refusal means the consular officer was not convinced you would return to your home country."
        : "Göçmenlik ve Vatandaşlık Yasasının 214(b) maddesi, her vize başvuru sahibinin aksi kanıtlanana kadar göçmen adayı olduğunu varsayar. 214(b) reddi, konsolosluk memurunun ülkenize döneceğinize ikna olmadığı anlamına gelir."
    },
    {
      question: isEnglish
        ? "Can I work remotely in the US on a tourist visa?"
        : "Turist vizesiyle ABD'de uzaktan çalışabilir miyim?",
      answer: isEnglish
        ? "Remote work for a foreign employer while physically in the US on a B visa is a gray area with significant risks. The safest interpretation is that any productive work activity in the US requires work authorization, regardless of where the employer is located."
        : "B vizesiyle ABD'de fiziksel olarak bulunurken yabancı bir işveren için uzaktan çalışma, önemli riskler taşıyan gri bir alandır. En güvenli yorum, işverenin nerede olduğuna bakılmaksızın ABD'deki herhangi bir üretken iş faaliyetinin çalışma izni gerektirdiğidir."
    },
    {
      question: isEnglish
        ? "How long can I stay in the US on a tourist visa?"
        : "Turist vizesiyle ABD'de ne kadar kalabilirim?",
      answer: isEnglish
        ? "The visa validity and the authorized stay are different. The I-94 record determines your authorized stay, typically up to 6 months for B visas. Overstaying triggers bars on future entry. Extensions are possible but not guaranteed."
        : "Vize geçerliliği ve izin verilen kalış süresi farklıdır. I-94 kaydı, B vizeleri için genellikle 6 aya kadar izin verilen kalışınızı belirler. Süreyi aşmak gelecekteki girişler için yasakları tetikler. Uzatmalar mümkündür ancak garanti değildir."
    },
    {
      question: isEnglish
        ? "What is dual intent?"
        : "Çifte niyet (dual intent) nedir?",
      answer: isEnglish
        ? "Some visa categories (H-1B, L-1) allow dual intent - you can have immigrant intent while holding these visas. Most other non-immigrant visas require non-immigrant intent, meaning you must plan to leave."
        : "Bazı vize kategorileri (H-1B, L-1) çifte niyete izin verir - bu vizelere sahipken göçmen niyetiniz olabilir. Diğer çoğu göçmen olmayan vize, göçmen olmayan niyet gerektirir, yani ayrılmayı planlamanız gerekir."
    },
    {
      question: isEnglish
        ? "Can my Turkish degree be used in the US?"
        : "Türkiye'deki diplomam ABD'de kullanılabilir mi?",
      answer: isEnglish
        ? "Foreign degrees generally need credential evaluation for immigration purposes (USCIS) and may need additional evaluation or licensing for professional practice (medicine, law, engineering vary by state)."
        : "Yabancı diplomalar genellikle göçmenlik amaçları için (USCIS) akreditasyon değerlendirmesi gerektirir ve mesleki uygulama için ek değerlendirme veya lisans gerektirebilir (tıp, hukuk, mühendislik eyalete göre değişir)."
    }
  ]

  const relatedPages = [
    { slug: 'turist-vizesi-gercekleri', title: isEnglish ? 'Tourist Visa Realities' : 'Turist Vizesi Gerçekleri' },
    { slug: 'statuden-statuye-gecis-gercekleri', title: isEnglish ? 'Status Change Realities' : 'Statüden Statüye Geçiş Gerçekleri' },
    { slug: 'abdde-llc-kurmak', title: isEnglish ? 'Forming an LLC in the US' : "ABD'de LLC Kurmak" },
    { slug: 'platform-ne-yapar-ne-yapmaz', title: isEnglish ? 'What This Platform Does' : 'Platform Ne Yapar Ne Yapmaz' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Home' : 'Ana Sayfa'}
            </Link>
            <Link href={`/${lang}/amerika`} className="text-sm font-medium hover:opacity-60">
              {isEnglish ? 'Amerika Hub' : 'Amerika'}
            </Link>
            <Link
              href={`/${lang === 'en' ? 'tr' : 'en'}/amerika/abdye-gelme-yollari`}
              className="border border-black rounded-full px-3 py-1 text-sm"
            >
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumb
          lang={lang}
          items={[
            { label: isEnglish ? 'Amerika Hub' : 'Amerika', href: `/${lang}/amerika` },
            { label: isEnglish ? 'Pathways to the US' : "ABD'ye Gelme Yolları" }
          ]}
        />

        <TrustStrip lang={lang} />

        {/* Header */}
        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold mb-4">
          📍 {isEnglish ? 'Jurisdiction: United States Federal Immigration Law' : 'Yargı Yetkisi: ABD Federal Göçmenlik Hukuku'}
        </span>

        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          {isEnglish ? "Pathways to the United States" : "ABD'ye Gelme Yolları"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {isEnglish ? 'Last verified:' : 'Son doğrulama:'} {registryEntry?.lastVerified || '2026-01-25'}
        </p>

        {/* TL;DR */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <h2 className="font-bold text-lg mb-3">TL;DR</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• {isEnglish
              ? "US visas are divided into immigrant (permanent) and non-immigrant (temporary) categories"
              : "ABD vizeleri göçmen (kalıcı) ve göçmen olmayan (geçici) kategorilere ayrılır"}</li>
            <li>• {isEnglish
              ? "Most non-immigrant visas require proving intent to return to your home country"
              : "Çoğu göçmen olmayan vize, ülkenize dönme niyetini kanıtlamayı gerektirir"}</li>
            <li>• {isEnglish
              ? "Having a US company does not automatically qualify you for any visa"
              : "ABD şirketiniz olması sizi otomatik olarak herhangi bir vize için hak sahibi yapmaz"}</li>
            <li>• {isEnglish
              ? "Visa category selection depends on purpose, duration, and individual circumstances"
              : "Vize kategorisi seçimi amaç, süre ve bireysel koşullara bağlıdır"}</li>
            <li>• {isEnglish
              ? "Misrepresentation or visa fraud can result in permanent bars"
              : "Yanlış beyan veya vize dolandırıcılığı kalıcı yasaklarla sonuçlanabilir"}</li>
          </ul>
        </section>

        {/* What This Covers / Doesn't Cover */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">
                {isEnglish ? 'This Page Covers' : 'Bu Sayfa Kapsar'}
              </h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• {isEnglish ? 'Main visa category overview' : 'Ana vize kategorileri genel bakışı'}</li>
                <li>• {isEnglish ? 'Immigrant vs non-immigrant distinction' : 'Göçmen vs göçmen olmayan ayrımı'}</li>
                <li>• {isEnglish ? 'Common misconceptions' : 'Yaygın yanlış varsayımlar'}</li>
                <li>• {isEnglish ? 'General eligibility concepts' : 'Genel uygunluk kavramları'}</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">
                {isEnglish ? 'This Page Does Not Cover' : 'Bu Sayfa Kapsamaz'}
              </h3>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• {isEnglish ? 'Individual visa applications' : 'Bireysel vize başvuruları'}</li>
                <li>• {isEnglish ? 'Case-specific eligibility' : 'Dosyaya özgü uygunluk'}</li>
                <li>• {isEnglish ? 'Interview preparation' : 'Mülakat hazırlığı'}</li>
                <li>• {isEnglish ? 'Refusal appeals' : 'Red itirazları'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Understanding US Visa Categories' : 'ABD Vize Kategorilerini Anlamak'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "The US immigration system divides visas into two fundamental categories: immigrant visas (leading to permanent residency) and non-immigrant visas (for temporary stays). This distinction affects everything from application process to permitted activities."
                : "ABD göçmenlik sistemi vizeleri iki temel kategoriye ayırır: göçmen vizeler (kalıcı oturma iznine yol açan) ve göçmen olmayan vizeler (geçici kalışlar için). Bu ayrım, başvuru sürecinden izin verilen faaliyetlere kadar her şeyi etkiler."}
            </p>
          </div>
        </section>

        {/* Non-Immigrant Visas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Non-Immigrant Visa Categories' : 'Göçmen Olmayan Vize Kategorileri'}
          </h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">B-1/B-2 ({isEnglish ? 'Business/Tourist' : 'İş/Turist'})</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "For temporary business visits or tourism. Cannot work or study. Requires proving ties to home country and intent to return."
                  : "Geçici iş ziyaretleri veya turizm için. Çalışma veya eğitim yapılamaz. Ülkeyle bağları ve dönme niyetini kanıtlamayı gerektirir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">F-1 ({isEnglish ? 'Student' : 'Öğrenci'})</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "For academic studies at SEVP-certified institutions. Limited work authorization. Must maintain full course load."
                  : "SEVP sertifikalı kurumlarda akademik eğitim için. Sınırlı çalışma izni. Tam ders yükünü sürdürmek gerekir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">H-1B ({isEnglish ? 'Specialty Occupation' : 'Uzmanlık Mesleği'})</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "For specialty occupations requiring at least a bachelor's degree. Employer-sponsored, subject to annual cap and lottery. Allows dual intent."
                  : "En az lisans derecesi gerektiren uzmanlık meslekleri için. İşveren sponsorluğunda, yıllık kotaya ve çekilişe tabi. Çifte niyete izin verir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">L-1 ({isEnglish ? 'Intracompany Transfer' : 'Şirket İçi Transfer'})</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "For managers, executives, or specialized knowledge employees transferring from foreign affiliate. Requires one year employment abroad. Allows dual intent."
                  : "Yabancı bağlı şirketten transfer olan yöneticiler, üst düzey yöneticiler veya özel bilgi çalışanları için. Yurt dışında bir yıl istihdam gerektirir. Çifte niyete izin verir."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">E-2 ({isEnglish ? 'Treaty Investor' : 'Anlaşmalı Yatırımcı'})</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "For citizens of treaty countries (including Turkey) making substantial investment. No set minimum but must be 'substantial' relative to business type. Does not lead directly to green card."
                  : "Önemli yatırım yapan anlaşma ülkesi vatandaşları (Türkiye dahil) için. Belirli bir minimum yok ancak iş türüne göre 'önemli' olmalı. Doğrudan yeşil karta yol açmaz."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">O-1 ({isEnglish ? 'Extraordinary Ability' : 'Olağanüstü Yetenek'})</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "For individuals with extraordinary ability in sciences, arts, education, business, or athletics. Requires sustained national or international acclaim."
                  : "Bilim, sanat, eğitim, iş veya atletizmde olağanüstü yeteneğe sahip bireyler için. Sürekli ulusal veya uluslararası tanınırlık gerektirir."}
              </p>
            </div>
          </div>
        </section>

        {/* Immigrant Visas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Immigrant Visa Categories' : 'Göçmen Vize Kategorileri'}
          </h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Family-Based' : 'Aile Bazlı'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Immediate relatives of US citizens (spouse, parents, unmarried children under 21) have no numerical limits. Other family categories have annual limits and significant backlogs."
                  : "ABD vatandaşlarının yakın akrabaları (eş, anne-baba, 21 yaş altı evlenmemiş çocuklar) sayısal sınıra tabi değildir. Diğer aile kategorilerinin yıllık limitleri ve önemli beklemeleri vardır."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Employment-Based' : 'İstihdam Bazlı'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "EB-1 through EB-5 categories for various employment situations. Most require employer sponsorship and labor certification. EB-5 is for investors ($800K-$1.05M)."
                  : "Çeşitli istihdam durumları için EB-1'den EB-5'e kategoriler. Çoğu işveren sponsorluğu ve işgücü sertifikası gerektirir. EB-5 yatırımcılar içindir ($800K-$1.05M)."}
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{isEnglish ? 'Diversity Visa Lottery' : 'Çeşitlilik Vizesi Çekilişi'}</h3>
              <p className="text-sm text-gray-600">
                {isEnglish
                  ? "Annual lottery for countries with low immigration rates to the US. Turkey is typically eligible. Random selection, approximately 55,000 visas annually."
                  : "ABD'ye düşük göç oranına sahip ülkeler için yıllık çekiliş. Türkiye genellikle uygundur. Rastgele seçim, yılda yaklaşık 55.000 vize."}
              </p>
            </div>
          </div>
        </section>

        {/* Common Misconceptions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Common Misconceptions and Practical Risks' : 'Yanlış Bilinenler ve Pratik Riskler'}
          </h2>

          <div className="space-y-4">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"I can come as a tourist and figure it out later"' : '"Turist olarak gelip sonra hallederim"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "This approach carries significant legal risks. Entering with tourist intent while planning to change status or stay can constitute misrepresentation, which has serious consequences including potential permanent bars."
                  : "Bu yaklaşım önemli hukuki riskler taşır. Statü değiştirmeyi veya kalmayı planlarken turist niyetiyle girmek, kalıcı yasaklar dahil ciddi sonuçları olan yanlış beyan teşkil edebilir."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"Having a US LLC gets me a visa"' : '"ABD LLC\'m olması bana vize verir"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "Owning a US company does not create any visa eligibility. E-2 visas require substantial investment and active direction, not just company formation. Each visa category has specific requirements beyond company ownership."
                  : "ABD şirketi sahibi olmak herhangi bir vize uygunluğu oluşturmaz. E-2 vizeleri sadece şirket kurulumu değil, önemli yatırım ve aktif yönetim gerektirir. Her vize kategorisinin şirket sahipliğinin ötesinde özel gereksinimleri vardır."}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <h3 className="font-semibold text-amber-900 mb-2">
                {isEnglish ? '"I can work remotely on a tourist visa"' : '"Turist vizesiyle uzaktan çalışabilirim"'}
              </h3>
              <p className="text-sm text-amber-800">
                {isEnglish
                  ? "This is a legally risky gray area. The safest interpretation is that productive work activities in the US require work authorization regardless of employer location. Violations can affect future visa applications."
                  : "Bu hukuki olarak riskli bir gri alandır. En güvenli yorum, ABD'deki üretken iş faaliyetlerinin işveren konumundan bağımsız olarak çalışma izni gerektirdiğidir. İhlaller gelecekteki vize başvurularını etkileyebilir."}
              </p>
            </div>
          </div>
        </section>

        {/* General Checklist */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'General Consideration Checklist' : 'Genel Değerlendirme Kontrol Listesi'}
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <ul className="space-y-3">
              {(isEnglish ? [
                'Identify your actual purpose and intended duration in the US',
                'Understand which visa categories may apply to your situation',
                'Assess your ties to your home country (property, employment, family)',
                'Consider whether your plans involve any work or business activities',
                'Research specific requirements for relevant visa categories',
                'Understand the distinction between visa validity and authorized stay (I-94)',
                'Be prepared to clearly articulate your plans at any interview',
                'Never misrepresent your intentions - consequences are severe'
              ] : [
                "ABD'deki gerçek amacınızı ve planlanan sürenizi belirleyin",
                'Durumunuza hangi vize kategorilerinin uygulanabileceğini anlayın',
                'Ülkenizle bağlarınızı değerlendirin (mülk, istihdam, aile)',
                'Planlarınızın herhangi bir iş veya ticari faaliyet içerip içermediğini düşünün',
                'İlgili vize kategorileri için özel gereksinimleri araştırın',
                'Vize geçerliliği ile izin verilen kalış (I-94) arasındaki farkı anlayın',
                'Herhangi bir mülakata planlarınızı net bir şekilde ifade etmeye hazır olun',
                'Asla niyetlerinizi yanlış beyan etmeyin - sonuçları ağırdır'
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#C9A227] mt-1">☐</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Related Templates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            {isEnglish ? 'Related Contracts and Templates' : 'İlgili Sözleşmeler ve Şablonlar'}
          </h2>

          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href={`/${lang}/contracts/nda`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Non-Disclosure Agreement (NDA)' : 'Gizlilik Sözleşmesi (NDA)'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts/service-agreement`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Service Agreement' : 'Hizmet Sözleşmesi'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts/independent-contractor`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Independent Contractor Agreement' : 'Bağımsız Yüklenici Sözleşmesi'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/amerika/legal-kitler/abdye-gelmeden-once-hukuki-gercekler-rehberi`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Pre-Arrival Legal Guide' : "ABD'ye Gelmeden Önce Hukuki Gerçekler Rehberi"}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
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

        {/* Last Verified */}
        <div className="border-t border-gray-200 pt-6 mb-8">
          <p className="text-sm text-gray-500">
            {isEnglish ? 'Last verified:' : 'Son doğrulama:'} {registryEntry?.lastVerified || '2026-01-25'}
          </p>
        </div>

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
              ? 'This content is for general informational purposes only and does not constitute legal advice. For specific legal questions, consult a licensed attorney in your jurisdiction.'
              : 'Bu içerik yalnızca genel bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez. Belirli hukuki sorular için yetki alanınızdaki lisanslı bir avukata danışın.'}
          </p>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400">
            © 2025 EchoLegal. {isEnglish
              ? 'Prepared under supervision of NY licensed attorney (Bar #5552336).'
              : 'NY lisanslı avukat gözetiminde hazırlanmıştır (Bar #5552336).'}
          </p>
        </div>
      </footer>
    </div>
  )
}
