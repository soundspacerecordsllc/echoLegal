// app/[lang]/about/editorial-policy/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Editorial Policy | EchoLegal Standards'
    : 'Editöryal Politika | EchoLegal Standartları'

  const description = isEnglish
    ? 'EchoLegal\'s editorial standards for legal content. Source hierarchy, update policy, accuracy verification, and attorney oversight procedures.'
    : 'EchoLegal\'ın hukuki içerik için editöryal standartları. Kaynak hiyerarşisi, güncelleme politikası, doğruluk doğrulaması ve avukat gözetim prosedürleri.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isEnglish ? 'en_US' : 'tr_TR',
      siteName: 'EchoLegal',
    },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/about/editorial-policy`,
      languages: {
        'en': 'https://echo-legal.com/en/about/editorial-policy',
        'tr': 'https://echo-legal.com/tr/about/editorial-policy',
        'x-default': 'https://echo-legal.com/en/about/editorial-policy',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function EditorialPolicyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const breadcrumbItems = [
    { label: isEnglish ? 'About' : 'Hakkımızda', href: `/${lang}/about` },
    { label: isEnglish ? 'Editorial Policy' : 'Editöryal Politika' },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={breadcrumbItems} lang={lang} />

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
          {isEnglish ? 'Editorial Policy' : 'Editöryal Politika'}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {isEnglish
            ? 'Our standards for creating accurate, reliable, and useful legal content.'
            : 'Doğru, güvenilir ve faydalı hukuki içerik oluşturma standartlarımız.'}
        </p>
        <p className="text-sm text-gray-500 mt-4">
          {isEnglish ? 'Last updated: January 2026' : 'Son güncelleme: Ocak 2026'}
        </p>
      </div>

      {/* Source Hierarchy */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Source Hierarchy' : 'Kaynak Hiyerarşisi'}
        </h2>
        <p className="text-gray-700 mb-4">
          {isEnglish
            ? 'We prioritize sources in the following order when creating content:'
            : 'İçerik oluştururken kaynakları aşağıdaki sıraya göre önceliklendiriyoruz:'}
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <span className="text-xl font-bold text-blue-600">1</span>
            <div>
              <h3 className="font-semibold text-blue-900">
                {isEnglish ? 'Primary Government Sources' : 'Birincil Hükümet Kaynakları'}
              </h3>
              <p className="text-sm text-blue-800 mt-1">
                {isEnglish
                  ? 'USCIS, IRS, Department of State, state agency websites. Official forms, instructions, and policy manuals.'
                  : 'USCIS, IRS, Dışişleri Bakanlığı, eyalet kurumu web siteleri. Resmi formlar, talimatlar ve politika kılavuzları.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <span className="text-xl font-bold text-green-600">2</span>
            <div>
              <h3 className="font-semibold text-green-900">
                {isEnglish ? 'Statutes and Regulations' : 'Kanunlar ve Yönetmelikler'}
              </h3>
              <p className="text-sm text-green-800 mt-1">
                {isEnglish
                  ? 'Immigration and Nationality Act (INA), Internal Revenue Code (IRC), Code of Federal Regulations (CFR), state business codes.'
                  : 'Göçmenlik ve Vatandaşlık Yasası (INA), İç Gelir Yasası (IRC), Federal Yönetmelikler Yasası (CFR), eyalet iş yasaları.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
            <span className="text-xl font-bold text-amber-600">3</span>
            <div>
              <h3 className="font-semibold text-amber-900">
                {isEnglish ? 'Administrative Guidance' : 'İdari Rehberlik'}
              </h3>
              <p className="text-sm text-amber-800 mt-1">
                {isEnglish
                  ? 'USCIS Policy Manual, IRS Publications, AAO decisions, memoranda from agency leadership.'
                  : 'USCIS Politika Kılavuzu, IRS Yayınları, AAO kararları, kurum liderliğinden memorandumlar.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
            <span className="text-xl font-bold text-gray-600">4</span>
            <div>
              <h3 className="font-semibold text-gray-900">
                {isEnglish ? 'Professional Resources' : 'Profesyonel Kaynaklar'}
              </h3>
              <p className="text-sm text-gray-700 mt-1">
                {isEnglish
                  ? 'AILA practice pointers, bar association publications, academic legal journals. Used for context, never as sole authority.'
                  : 'AILA uygulama ipuçları, baro birliği yayınları, akademik hukuk dergileri. Bağlam için kullanılır, asla tek otorite olarak değil.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Update Policy */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Update Policy' : 'Güncelleme Politikası'}
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 mb-4">
            {isEnglish
              ? 'Legal information changes frequently. We take the following approach to keep content current:'
              : 'Hukuki bilgiler sık sık değişir. İçeriği güncel tutmak için aşağıdaki yaklaşımı benimsiyoruz:'}
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-black mb-3">
              {isEnglish ? 'Date Transparency' : 'Tarih Şeffaflığı'}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>datePublished:</strong>{' '}
                {isEnglish
                  ? 'When the article was first created'
                  : 'Makalenin ilk oluşturulduğu tarih'}
              </li>
              <li>
                <strong>dateModified:</strong>{' '}
                {isEnglish
                  ? 'When the content was last substantively reviewed or updated'
                  : 'İçeriğin son olarak esaslı şekilde gözden geçirildiği veya güncellendiği tarih'}
              </li>
            </ul>
          </div>

          <h3 className="font-semibold text-black mb-3">
            {isEnglish ? 'Review Schedule' : 'Gözden Geçirme Takvimi'}
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
            <li>
              {isEnglish
                ? 'Immigration content: Reviewed quarterly or when USCIS issues significant policy updates'
                : 'Göçmenlik içeriği: Üç ayda bir veya USCIS önemli politika güncellemeleri yayınladığında gözden geçirilir'}
            </li>
            <li>
              {isEnglish
                ? 'Tax content: Reviewed annually before tax season and when IRS issues new guidance'
                : 'Vergi içeriği: Vergi sezonu öncesi yıllık olarak ve IRS yeni rehberlik yayınladığında gözden geçirilir'}
            </li>
            <li>
              {isEnglish
                ? 'Contract templates: Reviewed annually or when relevant state laws change'
                : 'Sözleşme şablonları: Yıllık olarak veya ilgili eyalet yasaları değiştiğinde gözden geçirilir'}
            </li>
            <li>
              {isEnglish
                ? 'Business formation: Reviewed when state filing fees or requirements change'
                : 'Şirket kurulumu: Eyalet dosyalama ücretleri veya gereksinimleri değiştiğinde gözden geçirilir'}
            </li>
          </ul>
        </div>
      </section>

      {/* Accuracy Standards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Accuracy Standards' : 'Doğruluk Standartları'}
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Fact-Checking Process' : 'Doğrulama Süreci'}
            </h3>
            <p className="text-gray-700">
              {isEnglish
                ? 'Every factual claim must be traceable to a specific source. When we state a fee amount, threshold, or deadline, we link to or cite the official source. If we cannot verify a claim, we either do not include it or clearly label it as "commonly reported" or "unverified."'
                : 'Her olgusal iddia belirli bir kaynağa kadar izlenebilir olmalıdır. Bir ücret tutarı, eşik veya son tarih belirttiğimizde, resmi kaynağa bağlantı veririz veya alıntılarız. Bir iddiayı doğrulayamazsak, ya dahil etmeyiz ya da açıkça "yaygın olarak bildirilen" veya "doğrulanmamış" olarak etiketleriz.'}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Correction Policy' : 'Düzeltme Politikası'}
            </h3>
            <p className="text-gray-700">
              {isEnglish
                ? 'If we discover an error, we correct it promptly and update the dateModified. For significant corrections that could have affected reader decisions, we add a correction notice at the top of the article.'
                : 'Bir hata keşfedersek, derhal düzeltiriz ve dateModified\'ı güncelleriz. Okuyucu kararlarını etkileyebilecek önemli düzeltmeler için, makalenin başına bir düzeltme bildirimi ekleriz.'}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Scope Limitations' : 'Kapsam Sınırlamaları'}
            </h3>
            <p className="text-gray-700">
              {isEnglish
                ? 'We explicitly state the scope of our content. For example, "This guide covers single-member LLCs. Multi-member LLCs have additional considerations not covered here." We do not attempt to cover everything; we cover specific topics thoroughly.'
                : 'İçeriğimizin kapsamını açıkça belirtiriz. Örneğin, "Bu rehber tek üyeli LLC\'leri kapsar. Çok üyeli LLC\'lerin burada kapsanmayan ek hususları vardır." Her şeyi kapsamaya çalışmıyoruz; belirli konuları kapsamlı bir şekilde kapsıyoruz.'}
            </p>
          </div>
        </div>
      </section>

      {/* Attorney Oversight */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Attorney Oversight' : 'Avukat Gözetimi'}
        </h2>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="text-gray-700 mb-4">
            {isEnglish
              ? 'All legal content on EchoLegal is reviewed for accuracy before publication. The review process:'
              : 'EchoLegal\'daki tüm hukuki içerik, yayınlanmadan önce doğruluk açısından gözden geçirilir. Gözden geçirme süreci:'}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              {isEnglish
                ? 'Verifies legal accuracy of statements'
                : 'İfadelerin hukuki doğruluğunu doğrular'}
            </li>
            <li>
              {isEnglish
                ? 'Ensures appropriate disclaimers are present'
                : 'Uygun feragatnamelerin mevcut olduğundan emin olur'}
            </li>
            <li>
              {isEnglish
                ? 'Identifies areas where readers should seek individual counsel'
                : 'Okuyucuların bireysel danışmanlık alması gereken alanları belirler'}
            </li>
            <li>
              {isEnglish
                ? 'Flags content that may be outdated due to recent legal changes'
                : 'Son yasal değişiklikler nedeniyle güncelliğini yitirmiş olabilecek içerikleri işaretler'}
            </li>
          </ul>
        </div>
      </section>

      {/* What We Avoid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Content We Avoid' : 'Kaçındığımız İçerik'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">
              {isEnglish ? 'No Marketing Language' : 'Pazarlama Dili Yok'}
            </h3>
            <p className="text-sm text-red-800">
              {isEnglish
                ? 'We don\'t use urgency tactics, fear-based messaging, or exaggerated claims about benefits.'
                : 'Aciliyet taktikleri, korku temelli mesajlaşma veya faydalar hakkında abartılı iddialar kullanmıyoruz.'}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">
              {isEnglish ? 'No Specific Advice' : 'Özel Tavsiye Yok'}
            </h3>
            <p className="text-sm text-red-800">
              {isEnglish
                ? 'We explain general rules, not "what you should do." Individual situations require individual analysis.'
                : 'Genel kuralları açıklıyoruz, "ne yapmanız gerektiğini" değil. Bireysel durumlar bireysel analiz gerektirir.'}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">
              {isEnglish ? 'No Guarantees' : 'Garanti Yok'}
            </h3>
            <p className="text-sm text-red-800">
              {isEnglish
                ? 'We never guarantee outcomes. Legal results depend on individual circumstances and decision-makers.'
                : 'Asla sonuç garantisi vermiyoruz. Hukuki sonuçlar bireysel koşullara ve karar vericilere bağlıdır.'}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2">
              {isEnglish ? 'No Unofficial Workarounds' : 'Gayri Resmi Çözümler Yok'}
            </h3>
            <p className="text-sm text-red-800">
              {isEnglish
                ? 'We don\'t suggest questionable strategies or gray-area tactics that could cause problems.'
                : 'Sorun yaratabilecek şüpheli stratejiler veya gri alan taktikleri önermiyoruz.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-black mb-4">
          {isEnglish ? 'Report an Error' : 'Hata Bildirin'}
        </h2>
        <p className="text-gray-700">
          {isEnglish
            ? 'If you believe any content on EchoLegal contains an error, please contact us through our support page. We take accuracy seriously and will investigate all reports.'
            : 'EchoLegal\'daki herhangi bir içeriğin hata içerdiğini düşünüyorsanız, lütfen destek sayfamız aracılığıyla bizimle iletişime geçin. Doğruluğu ciddiye alıyoruz ve tüm raporları araştıracağız.'}
        </p>
        <Link
          href={`/${lang}/support`}
          className="inline-block mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          {isEnglish ? 'Contact Support' : 'Desteğe Başvurun'}
        </Link>
      </section>
    </main>
  )
}
