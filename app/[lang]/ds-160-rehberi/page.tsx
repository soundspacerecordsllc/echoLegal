// app/[lang]/ds-160-rehberi/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'DS-160 Form Guide for Turkish Visa Applicants | EchoLegal'
    : 'DS-160 Formu Rehberi: Türkler İçin Adım Adım | EchoLegal'

  const description = isEnglish
    ? 'Complete guide to filling out DS-160 online visa application. Section-by-section instructions, common mistakes to avoid, and tips for Turkish nationals.'
    : 'DS-160 online vize başvuru formunu doldurma rehberi. Bölüm bölüm talimatlar, sık yapılan hatalar ve Türk vatandaşları için ipuçları.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      locale: isEnglish ? 'en_US' : 'tr_TR',
      siteName: 'EchoLegal',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/ds-160-rehberi`,
      languages: {
        'en': 'https://echo-legal.com/en/ds-160-rehberi',
        'tr': 'https://echo-legal.com/tr/ds-160-rehberi',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function DS160GuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const tocItems = [
    { id: 'ds160-nedir', label: isEnglish ? 'What is DS-160?' : 'DS-160 Nedir?' },
    { id: 'baslangic', label: isEnglish ? 'Before You Start' : 'Başlamadan Önce' },
    { id: 'kisisel-bilgiler', label: isEnglish ? 'Personal Information' : 'Kişisel Bilgiler' },
    { id: 'seyahat-bilgileri', label: isEnglish ? 'Travel Information' : 'Seyahat Bilgileri' },
    { id: 'gecmis-seyahatler', label: isEnglish ? 'Previous US Travel' : 'Önceki ABD Seyahatleri' },
    { id: 'adres-iletisim', label: isEnglish ? 'Address & Contact' : 'Adres ve İletişim' },
    { id: 'pasaport', label: isEnglish ? 'Passport Information' : 'Pasaport Bilgileri' },
    { id: 'abd-iletisim', label: isEnglish ? 'US Point of Contact' : 'ABD İletişim Kişisi' },
    { id: 'aile-bilgileri', label: isEnglish ? 'Family Information' : 'Aile Bilgileri' },
    { id: 'is-egitim', label: isEnglish ? 'Work & Education' : 'İş ve Eğitim' },
    { id: 'guvenlik-sorulari', label: isEnglish ? 'Security Questions' : 'Güvenlik Soruları' },
    { id: 'fotograf', label: isEnglish ? 'Photo Requirements' : 'Fotoğraf Gereksinimleri' },
    { id: 'sik-hatalar', label: isEnglish ? 'Common Mistakes' : 'Sık Yapılan Hatalar' },
    { id: 'sss', label: isEnglish ? 'FAQ' : 'Sık Sorulan Sorular' },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEnglish
      ? 'DS-160 Form Guide for Turkish Visa Applicants'
      : 'DS-160 Formu Rehberi: Türkler İçin Adım Adım',
    author: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EchoLegal',
      url: 'https://echo-legal.com',
    },
    datePublished: '2026-01-25',
    dateModified: '2026-01-25',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://echo-legal.com/${lang}/ds-160-rehberi`,
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isEnglish ? 'How long does it take to complete DS-160?' : 'DS-160 doldurmak ne kadar sürer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEnglish
            ? 'Most applicants complete the DS-160 in 60-90 minutes. However, you should gather all documents beforehand. The form auto-saves, so you can complete it in multiple sessions.'
            : 'Çoğu başvuru sahibi DS-160\'ı 60-90 dakikada tamamlar. Ancak önceden tüm belgeleri hazırlamalısınız. Form otomatik kaydedilir, bu nedenle birden fazla oturumda tamamlayabilirsiniz.',
        },
      },
      {
        '@type': 'Question',
        name: isEnglish ? 'Can I edit DS-160 after submission?' : 'DS-160\'ı gönderdikten sonra düzenleyebilir miyim?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEnglish
            ? 'No, once submitted you cannot edit DS-160. You must start a new application. Minor corrections can be discussed at the interview. Always review thoroughly before submission.'
            : 'Hayır, gönderildikten sonra DS-160\'ı düzenleyemezsiniz. Yeni bir başvuru başlatmanız gerekir. Küçük düzeltmeler mülakatta tartışılabilir. Göndermeden önce her zaman dikkatlice kontrol edin.',
        },
      },
      {
        '@type': 'Question',
        name: isEnglish ? 'What photo specifications does DS-160 require?' : 'DS-160 hangi fotoğraf özelliklerini gerektirir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isEnglish
            ? 'The photo must be: 5x5 cm (2x2 inches), taken within the last 6 months, white or off-white background, face covering 50-69% of frame, neutral expression, eyes open.'
            : 'Fotoğraf şu özelliklerde olmalı: 5x5 cm (2x2 inç), son 6 ay içinde çekilmiş, beyaz veya kırık beyaz arka plan, yüz karenin %50-69\'unu kaplamalı, nötr ifade, gözler açık.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-100">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href={`/${lang}`} className="text-2xl font-black text-black">EchoLegal</Link>
            <div className="flex items-center gap-6">
              <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
              <Link href={`/${lang}/amerika`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'US Hub' : 'ABD Merkezi'}</Link>
              <Link href={`/${lang}/library`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
              <Link
                href={`/${lang === 'en' ? 'tr' : 'en'}/ds-160-rehberi`}
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
            <Link href={`/${lang}/amerika`} className="hover:text-black">{isEnglish ? 'US Hub' : 'ABD Merkezi'}</Link>
            <span className="mx-2">→</span>
            <span className="text-black">{isEnglish ? 'DS-160 Guide' : 'DS-160 Rehberi'}</span>
          </nav>

          {/* Hero */}
          <div className="mb-12">
            <span className="inline-block px-4 py-2 bg-blue-50 text-blue-800 rounded-full text-sm font-semibold mb-4">
              📋 {isEnglish ? 'Visa Application' : 'Vize Başvurusu'}
            </span>

            <h1 className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight">
              {isEnglish
                ? 'DS-160 Form Guide'
                : 'DS-160 Formu Rehberi'}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              {isEnglish
                ? 'The DS-160 is the online nonimmigrant visa application required for all US visa types. This guide walks you through each section with tips specific to Turkish applicants.'
                : 'DS-160, tüm ABD vize türleri için gerekli olan çevrimiçi göçmen olmayan vize başvurusudur. Bu rehber, Türk başvuru sahiplerine özel ipuçlarıyla her bölümde size yol gösterir.'}
            </p>
          </div>

          {/* Official Source */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-10">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <span>🏛️</span>
              {isEnglish ? 'Official Application Portal' : 'Resmi Başvuru Portalı'}
            </h3>
            <p className="text-sm text-blue-800 mb-3">
              {isEnglish
                ? 'DS-160 can only be submitted through the official Consular Electronic Application Center (CEAC).'
                : 'DS-160 yalnızca resmi Konsolosluk Elektronik Başvuru Merkezi (CEAC) üzerinden gönderilebilir.'}
            </p>
            <a
              href="https://ceac.state.gov/genniv/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
            >
              ceac.state.gov/genniv <span>↗</span>
            </a>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12">
            <h2 className="text-lg font-bold text-black mb-4">{isEnglish ? 'Contents' : 'İçindekiler'}</h2>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {tocItems.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm text-gray-600 hover:text-black flex items-center gap-2"
                >
                  <span className="text-gray-400">{index + 1}.</span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            {/* DS-160 Nedir */}
            <section id="ds160-nedir" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'What is DS-160?' : 'DS-160 Nedir?'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'The DS-160, Online Nonimmigrant Visa Application, is the standard form used for applying for nonimmigrant visas to the United States. This includes tourist visas (B-1/B-2), student visas (F-1), work visas (H-1B, L-1), and many others.'
                  : 'DS-160, Çevrimiçi Göçmen Olmayan Vize Başvurusu, Amerika Birleşik Devletleri\'ne göçmen olmayan vizeler için başvurmak amacıyla kullanılan standart formdur. Bu, turist vizeleri (B-1/B-2), öğrenci vizeleri (F-1), çalışma vizeleri (H-1B, L-1) ve diğer birçok vize türünü kapsar.'}
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
                <p className="text-sm text-amber-800">
                  <strong>{isEnglish ? 'Important:' : 'Önemli:'}</strong>{' '}
                  {isEnglish
                    ? 'The DS-160 must be completed and submitted online before scheduling your visa interview. You cannot attend an interview without a confirmed DS-160.'
                    : 'DS-160, vize mülakatınızı planlamadan önce çevrimiçi olarak tamamlanmalı ve gönderilmelidir. Onaylanmış bir DS-160 olmadan mülakata katılamazsınız.'}
                </p>
              </div>
            </section>

            {/* Başlamadan Önce */}
            <section id="baslangic" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Before You Start: Documents to Gather' : 'Başlamadan Önce: Hazırlanacak Belgeler'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Gather these documents before starting your DS-160 to avoid delays:'
                  : 'Gecikmeleri önlemek için DS-160\'ınızı başlatmadan önce şu belgeleri hazırlayın:'}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>{isEnglish ? 'Valid Passport' : 'Geçerli Pasaport'}</strong> – {isEnglish ? 'Number, issue date, expiration date, issuing authority' : 'Numara, veriliş tarihi, son kullanma tarihi, veren makam'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Travel Dates' : 'Seyahat Tarihleri'}</strong> – {isEnglish ? 'Intended arrival date and length of stay' : 'Planlanan varış tarihi ve kalış süresi'}
                </li>
                <li>
                  <strong>{isEnglish ? 'US Contact' : 'ABD İletişim Bilgileri'}</strong> – {isEnglish ? 'Name and address of person/organization you\'ll visit' : 'Ziyaret edeceğiniz kişi/kuruluşun adı ve adresi'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Employment History' : 'İş Geçmişi'}</strong> – {isEnglish ? 'Last 5 years: employer names, addresses, dates' : 'Son 5 yıl: işveren adları, adresleri, tarihler'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Education History' : 'Eğitim Geçmişi'}</strong> – {isEnglish ? 'Schools attended with dates' : 'Devam edilen okullar ve tarihleri'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Previous US Visas' : 'Önceki ABD Vizeleri'}</strong> – {isEnglish ? 'If any: visa numbers and dates' : 'Varsa: vize numaraları ve tarihleri'}
                </li>
                <li>
                  <strong>{isEnglish ? 'Digital Photo' : 'Dijital Fotoğraf'}</strong> – {isEnglish ? 'Meeting US visa photo requirements' : 'ABD vize fotoğrafı gereksinimlerini karşılayan'}
                </li>
              </ul>
            </section>

            {/* Kişisel Bilgiler */}
            <section id="kisisel-bilgiler" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Personal Information Section' : 'Kişisel Bilgiler Bölümü'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'This section collects your basic biographical data. Enter information exactly as it appears on your passport.'
                  : 'Bu bölüm temel biyografik verilerinizi toplar. Bilgileri pasaportunuzda göründüğü şekilde tam olarak girin.'}
              </p>

              <div className="bg-gray-50 rounded-lg p-5 my-6">
                <h4 className="font-semibold text-black mb-3">{isEnglish ? 'Turkish Name Format Tips' : 'Türk İsim Formatı İpuçları'}</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  <li>
                    {isEnglish
                      ? 'Enter names in CAPITAL LETTERS as shown on passport'
                      : 'İsimleri pasaportta gösterildiği gibi BÜYÜK HARFLERLE girin'}
                  </li>
                  <li>
                    {isEnglish
                      ? 'Turkish characters (İ, Ö, Ü, Ş, Ğ, Ç) should be converted: İ→I, Ö→O, Ü→U, Ş→S, Ğ→G, Ç→C'
                      : 'Türkçe karakterler (İ, Ö, Ü, Ş, Ğ, Ç) dönüştürülmeli: İ→I, Ö→O, Ü→U, Ş→S, Ğ→G, Ç→C'}
                  </li>
                  <li>
                    {isEnglish
                      ? 'If you have a middle name, include it in the "Given Names" field'
                      : 'Orta adınız varsa, "Verilen Adlar" alanına ekleyin'}
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 p-4 my-6">
                <p className="text-sm text-red-800">
                  <strong>{isEnglish ? 'Critical:' : 'Kritik:'}</strong>{' '}
                  {isEnglish
                    ? 'Your name must match your passport EXACTLY. Even small differences (like "AHMET" vs "AHMED") can cause your visa to be denied or delayed.'
                    : 'İsminiz pasaportunuzla TAM OLARAK eşleşmelidir. Küçük farklılıklar bile (örneğin "AHMET" ile "AHMED") vizenizin reddedilmesine veya gecikmesine neden olabilir.'}
                </p>
              </div>
            </section>

            {/* Seyahat Bilgileri */}
            <section id="seyahat-bilgileri" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Travel Information' : 'Seyahat Bilgileri'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Provide details about your intended trip to the United States.'
                  : 'Amerika Birleşik Devletleri\'ne planladığınız seyahat hakkında detayları verin.'}
              </p>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Purpose of Trip' : 'Seyahat Amacı'}</h4>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Select the primary purpose that matches your visa type. Common selections for Turkish applicants:'
                  : 'Vize türünüzle eşleşen birincil amacı seçin. Türk başvuru sahipleri için yaygın seçimler:'}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>B-1:</strong> {isEnglish ? 'Business meetings, conferences, negotiations' : 'İş toplantıları, konferanslar, müzakereler'}</li>
                <li><strong>B-2:</strong> {isEnglish ? 'Tourism, visiting family, medical treatment' : 'Turizm, aile ziyareti, tıbbi tedavi'}</li>
                <li><strong>F-1:</strong> {isEnglish ? 'Academic studies' : 'Akademik eğitim'}</li>
                <li><strong>H-1B:</strong> {isEnglish ? 'Specialty occupation employment' : 'Uzmanlık mesleği istihdamı'}</li>
              </ul>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Intended Date of Arrival' : 'Planlanan Varış Tarihi'}</h4>
              <p className="text-gray-700">
                {isEnglish
                  ? 'Enter your best estimate. This is not binding, but should be realistic. Your visa interview should be scheduled at least 2-3 weeks before this date.'
                  : 'En iyi tahmininizi girin. Bu bağlayıcı değildir, ancak gerçekçi olmalıdır. Vize mülakatınız bu tarihten en az 2-3 hafta önce planlanmalıdır.'}
              </p>
            </section>

            {/* Geçmiş Seyahatler */}
            <section id="gecmis-seyahatler" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Previous US Travel' : 'Önceki ABD Seyahatleri'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'If you have previously traveled to the US, provide accurate details. This information will be verified against CBP records.'
                  : 'Daha önce ABD\'ye seyahat ettiyseniz, doğru bilgileri verin. Bu bilgiler CBP kayıtlarıyla doğrulanacaktır.'}
              </p>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
                <p className="text-sm text-green-800">
                  <strong>{isEnglish ? 'Tip:' : 'İpucu:'}</strong>{' '}
                  {isEnglish
                    ? 'If you have previous US travel with no issues, this strengthens your application. Include all trips, even short ones.'
                    : 'Sorunsuz önceki ABD seyahatleriniz varsa, bu başvurunuzu güçlendirir. Kısa olanlar dahil tüm seyahatleri ekleyin.'}
                </p>
              </div>

              <p className="text-gray-700">
                {isEnglish
                  ? 'Required information for each previous trip:'
                  : 'Her önceki seyahat için gerekli bilgiler:'}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
                <li>{isEnglish ? 'Date of arrival' : 'Varış tarihi'}</li>
                <li>{isEnglish ? 'Length of stay' : 'Kalış süresi'}</li>
                <li>{isEnglish ? 'Visa type used' : 'Kullanılan vize türü'}</li>
              </ul>
            </section>

            {/* Adres ve İletişim */}
            <section id="adres-iletisim" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Address & Contact Information' : 'Adres ve İletişim Bilgileri'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Enter your current residential address in Turkey. This must be where you actually live, not a work address.'
                  : 'Türkiye\'deki mevcut ikamet adresinizi girin. Bu, iş adresiniz değil, gerçekten yaşadığınız yer olmalıdır.'}
              </p>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Turkish Address Format' : 'Türk Adres Formatı'}</h4>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <p>{isEnglish ? 'Street Address:' : 'Sokak Adresi:'} Atatürk Caddesi No: 123 Daire: 5</p>
                <p>{isEnglish ? 'City:' : 'Şehir:'} Istanbul</p>
                <p>{isEnglish ? 'State/Province:' : 'İl:'} Istanbul</p>
                <p>{isEnglish ? 'Postal Code:' : 'Posta Kodu:'} 34000</p>
                <p>{isEnglish ? 'Country:' : 'Ülke:'} TURKEY</p>
              </div>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Phone Number' : 'Telefon Numarası'}</h4>
              <p className="text-gray-700">
                {isEnglish
                  ? 'Enter your Turkish mobile number with country code: +90 5XX XXX XX XX'
                  : 'Türk cep telefonu numaranızı ülke koduyla girin: +90 5XX XXX XX XX'}
              </p>
            </section>

            {/* Pasaport Bilgileri */}
            <section id="pasaport" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Passport Information' : 'Pasaport Bilgileri'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Enter your passport details exactly as they appear on the document.'
                  : 'Pasaport bilgilerinizi belgede göründüğü şekilde tam olarak girin.'}
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 my-6">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">{isEnglish ? 'Field' : 'Alan'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">{isEnglish ? 'Where to Find' : 'Nerede Bulunur'}</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">{isEnglish ? 'Format' : 'Format'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'Passport Number' : 'Pasaport Numarası'}</td>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'Top right of data page' : 'Veri sayfasının sağ üstü'}</td>
                      <td className="px-4 py-3 text-sm border-b font-mono">U12345678</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'Issue Date' : 'Veriliş Tarihi'}</td>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'Data page' : 'Veri sayfası'}</td>
                      <td className="px-4 py-3 text-sm border-b font-mono">DD/MM/YYYY</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'Expiration Date' : 'Son Kullanma Tarihi'}</td>
                      <td className="px-4 py-3 text-sm border-b">{isEnglish ? 'Data page' : 'Veri sayfası'}</td>
                      <td className="px-4 py-3 text-sm border-b font-mono">DD/MM/YYYY</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">{isEnglish ? 'Issuing Authority' : 'Veren Makam'}</td>
                      <td className="px-4 py-3 text-sm">{isEnglish ? 'Data page' : 'Veri sayfası'}</td>
                      <td className="px-4 py-3 text-sm font-mono">T.C. NVI</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
                <p className="text-sm text-amber-800">
                  <strong>{isEnglish ? 'Note:' : 'Not:'}</strong>{' '}
                  {isEnglish
                    ? 'Your passport must be valid for at least 6 months beyond your intended stay in the US.'
                    : 'Pasaportunuz, ABD\'de planlanan kalışınızın ötesinde en az 6 ay geçerli olmalıdır.'}
                </p>
              </div>
            </section>

            {/* ABD İletişim Kişisi */}
            <section id="abd-iletisim" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'US Point of Contact' : 'ABD İletişim Kişisi'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'You must provide a contact person or organization in the United States.'
                  : 'Amerika Birleşik Devletleri\'nde bir iletişim kişisi veya kuruluş sağlamalısınız.'}
              </p>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'For Tourist Visa (B-1/B-2)' : 'Turist Vizesi (B-1/B-2) İçin'}</h4>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'If visiting family/friends, provide their name and address. If traveling independently, you can list your hotel.'
                  : 'Aile/arkadaş ziyareti yapıyorsanız, adlarını ve adreslerini verin. Bağımsız seyahat ediyorsanız, otelinizi listeleyebilirsiniz.'}
              </p>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'For Business Visa' : 'İş Vizesi İçin'}</h4>
              <p className="text-gray-700">
                {isEnglish
                  ? 'Provide the company name, address, and a contact person at the organization you will be visiting.'
                  : 'Ziyaret edeceğiniz kuruluştaki şirket adını, adresini ve bir iletişim kişisini sağlayın.'}
              </p>
            </section>

            {/* Aile Bilgileri */}
            <section id="aile-bilgileri" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Family Information' : 'Aile Bilgileri'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Provide information about your immediate family members (parents, spouse, children).'
                  : 'Birinci derece aile üyeleriniz (ebeveynler, eş, çocuklar) hakkında bilgi verin.'}
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                <p className="text-sm text-blue-800">
                  <strong>{isEnglish ? 'Why This Matters:' : 'Bu Neden Önemli:'}</strong>{' '}
                  {isEnglish
                    ? 'Family ties in your home country demonstrate "binding ties" that suggest you will return after your US visit. This is a key factor in visa decisions.'
                    : 'Kendi ülkenizdeki aile bağları, ABD ziyaretinizden sonra döneceğinizi gösteren "bağlayıcı bağları" gösterir. Bu, vize kararlarında önemli bir faktördür.'}
                </p>
              </div>
            </section>

            {/* İş ve Eğitim */}
            <section id="is-egitim" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Work & Education History' : 'İş ve Eğitim Geçmişi'}
              </h2>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Current Employment' : 'Mevcut İş'}</h4>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'Provide detailed information about your current job, including:'
                  : 'Mevcut işiniz hakkında aşağıdakileri içeren detaylı bilgi verin:'}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>{isEnglish ? 'Job title' : 'İş unvanı'}</li>
                <li>{isEnglish ? 'Employer name and address' : 'İşveren adı ve adresi'}</li>
                <li>{isEnglish ? 'Start date' : 'Başlangıç tarihi'}</li>
                <li>{isEnglish ? 'Monthly salary (in local currency is acceptable)' : 'Aylık maaş (yerel para birimi kabul edilir)'}</li>
                <li>{isEnglish ? 'Brief description of duties' : 'Görevlerin kısa açıklaması'}</li>
              </ul>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Previous Employment (Last 5 Years)' : 'Önceki İş (Son 5 Yıl)'}</h4>
              <p className="text-gray-700">
                {isEnglish
                  ? 'List all employers from the past 5 years with dates of employment and addresses.'
                  : 'Son 5 yıldaki tüm işverenleri çalışma tarihleri ve adresleriyle listeleyin.'}
              </p>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Education' : 'Eğitim'}</h4>
              <p className="text-gray-700">
                {isEnglish
                  ? 'List educational institutions attended (high school and above) with dates and degrees/certificates obtained.'
                  : 'Devam edilen eğitim kurumlarını (lise ve üstü) tarihler ve alınan dereceler/sertifikalarla listeleyin.'}
              </p>
            </section>

            {/* Güvenlik Soruları */}
            <section id="guvenlik-sorulari" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Security and Background Questions' : 'Güvenlik ve Geçmiş Soruları'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'The DS-160 includes a series of yes/no questions about criminal history, immigration violations, and other security-related matters.'
                  : 'DS-160, suç geçmişi, göçmenlik ihlalleri ve güvenlikle ilgili diğer konular hakkında bir dizi evet/hayır sorusu içerir.'}
              </p>

              <div className="bg-red-50 border-l-4 border-red-400 p-4 my-6">
                <p className="text-sm text-red-800">
                  <strong>{isEnglish ? 'Critical Warning:' : 'Kritik Uyarı:'}</strong>{' '}
                  {isEnglish
                    ? 'Answer ALL questions truthfully. Lying on a DS-160 is a federal crime and will result in permanent visa ineligibility. If you are unsure about any question, consult an immigration attorney before submitting.'
                    : 'TÜM soruları doğru bir şekilde cevaplayın. DS-160\'da yalan söylemek federal bir suçtur ve kalıcı vize yetersizliğine yol açacaktır. Herhangi bir soru hakkında emin değilseniz, göndermeden önce bir göçmenlik avukatına danışın.'}
                </p>
              </div>

              <p className="text-gray-700">
                {isEnglish
                  ? 'The questions cover topics including:'
                  : 'Sorular aşağıdaki konuları kapsar:'}
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
                <li>{isEnglish ? 'Communicable diseases' : 'Bulaşıcı hastalıklar'}</li>
                <li>{isEnglish ? 'Criminal activity' : 'Suç faaliyetleri'}</li>
                <li>{isEnglish ? 'Drug-related violations' : 'Uyuşturucu ile ilgili ihlaller'}</li>
                <li>{isEnglish ? 'Immigration violations (overstays, deportation)' : 'Göçmenlik ihlalleri (süresi aşma, sınır dışı etme)'}</li>
                <li>{isEnglish ? 'Terrorist activities' : 'Terör faaliyetleri'}</li>
              </ul>
            </section>

            {/* Fotoğraf */}
            <section id="fotograf" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Photo Requirements' : 'Fotoğraf Gereksinimleri'}
              </h2>
              <p className="text-gray-700 mb-4">
                {isEnglish
                  ? 'A digital photo is required as part of your DS-160 submission. The same specifications apply to the printed photo for your interview.'
                  : 'DS-160 başvurunuzun bir parçası olarak dijital bir fotoğraf gereklidir. Aynı özellikler mülakatınız için basılı fotoğrafa da uygulanır.'}
              </p>

              <div className="bg-gray-50 rounded-lg p-5 my-6">
                <h4 className="font-semibold text-black mb-3">{isEnglish ? 'Technical Specifications' : 'Teknik Özellikler'}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{isEnglish ? 'Dimensions' : 'Boyutlar'}</p>
                    <p className="text-gray-600">5x5 cm (2x2 {isEnglish ? 'inches' : 'inç'})</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{isEnglish ? 'File Format' : 'Dosya Formatı'}</p>
                    <p className="text-gray-600">JPEG</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{isEnglish ? 'File Size' : 'Dosya Boyutu'}</p>
                    <p className="text-gray-600">{isEnglish ? 'Between 240KB and 240KB' : '240KB ile 240KB arasında'}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{isEnglish ? 'Resolution' : 'Çözünürlük'}</p>
                    <p className="text-gray-600">{isEnglish ? 'Minimum 600x600 pixels' : 'Minimum 600x600 piksel'}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{isEnglish ? 'Background' : 'Arka Plan'}</p>
                    <p className="text-gray-600">{isEnglish ? 'White or off-white' : 'Beyaz veya kırık beyaz'}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{isEnglish ? 'Recency' : 'Güncellik'}</p>
                    <p className="text-gray-600">{isEnglish ? 'Taken within last 6 months' : 'Son 6 ay içinde çekilmiş'}</p>
                  </div>
                </div>
              </div>

              <h4 className="font-semibold text-black mt-6 mb-3">{isEnglish ? 'Photo Do\'s and Don\'ts' : 'Fotoğraf Yapılması ve Yapılmaması Gerekenler'}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-medium text-green-700 mb-2">✓ {isEnglish ? 'Do' : 'Yapın'}</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>{isEnglish ? 'Face the camera directly' : 'Doğrudan kameraya bakın'}</li>
                    <li>{isEnglish ? 'Neutral facial expression' : 'Nötr yüz ifadesi'}</li>
                    <li>{isEnglish ? 'Both eyes open and visible' : 'Her iki göz açık ve görünür'}</li>
                    <li>{isEnglish ? 'Head centered in frame' : 'Baş çerçevede ortalanmış'}</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-red-700 mb-2">✗ {isEnglish ? 'Don\'t' : 'Yapmayın'}</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>{isEnglish ? 'Wear glasses' : 'Gözlük takma'}</li>
                    <li>{isEnglish ? 'Wear head coverings (except religious)' : 'Baş örtüsü takma (dini hariç)'}</li>
                    <li>{isEnglish ? 'Smile with teeth showing' : 'Dişler görünecek şekilde gülümse'}</li>
                    <li>{isEnglish ? 'Use filters or editing' : 'Filtre veya düzenleme kullan'}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Sık Yapılan Hatalar */}
            <section id="sik-hatalar" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Common Mistakes to Avoid' : 'Kaçınılması Gereken Sık Yapılan Hatalar'}
              </h2>

              <div className="space-y-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">1. {isEnglish ? 'Name Mismatch' : 'İsim Uyuşmazlığı'}</h4>
                  <p className="text-sm text-red-800">
                    {isEnglish
                      ? 'Entering your name differently than it appears on your passport. This includes spelling variations and missing middle names.'
                      : 'İsminizi pasaportunuzda göründüğünden farklı girmek. Bu, yazım farklılıklarını ve eksik orta adları içerir.'}
                  </p>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">2. {isEnglish ? 'Inconsistent Dates' : 'Tutarsız Tarihler'}</h4>
                  <p className="text-sm text-red-800">
                    {isEnglish
                      ? 'Employment or education dates that don\'t match your resume or supporting documents. Cross-check all dates before submitting.'
                      : 'Özgeçmişiniz veya destekleyici belgelerinizle eşleşmeyen iş veya eğitim tarihleri. Göndermeden önce tüm tarihleri çapraz kontrol edin.'}
                  </p>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">3. {isEnglish ? 'Leaving Fields Blank' : 'Alanları Boş Bırakmak'}</h4>
                  <p className="text-sm text-red-800">
                    {isEnglish
                      ? 'Every required field must be completed. If something doesn\'t apply, enter "N/A" or "NONE" - don\'t leave it empty.'
                      : 'Her gerekli alan doldurulmalıdır. Bir şey geçerli değilse, "N/A" veya "YOK" girin - boş bırakmayın.'}
                  </p>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">4. {isEnglish ? 'Wrong Visa Category' : 'Yanlış Vize Kategorisi'}</h4>
                  <p className="text-sm text-red-800">
                    {isEnglish
                      ? 'Selecting the wrong visa type. If you\'re visiting family AND doing tourism, select B-1/B-2 (combined), not just B-2.'
                      : 'Yanlış vize türü seçmek. Aile ziyareti VE turizm yapıyorsanız, sadece B-2 değil, B-1/B-2 (birleşik) seçin.'}
                  </p>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">5. {isEnglish ? 'Photo Rejection' : 'Fotoğraf Reddi'}</h4>
                  <p className="text-sm text-red-800">
                    {isEnglish
                      ? 'Uploading a photo that doesn\'t meet specifications. Use the State Department\'s photo tool to test your image before uploading.'
                      : 'Özellikleri karşılamayan bir fotoğraf yüklemek. Yüklemeden önce görüntünüzü test etmek için Dışişleri Bakanlığı\'nın fotoğraf aracını kullanın.'}
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="sss" className="mb-12 scroll-mt-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                {isEnglish ? 'Frequently Asked Questions' : 'Sık Sorulan Sorular'}
              </h2>

              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-black mb-2">
                    {isEnglish ? 'How long does it take to complete DS-160?' : 'DS-160 doldurmak ne kadar sürer?'}
                  </h4>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'Most applicants complete the DS-160 in 60-90 minutes. However, you should gather all documents beforehand. The form auto-saves, so you can complete it in multiple sessions using your Application ID.'
                      : 'Çoğu başvuru sahibi DS-160\'ı 60-90 dakikada tamamlar. Ancak önceden tüm belgeleri hazırlamalısınız. Form otomatik kaydedilir, bu nedenle Başvuru Kimliğinizi kullanarak birden fazla oturumda tamamlayabilirsiniz.'}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-black mb-2">
                    {isEnglish ? 'Can I edit DS-160 after submission?' : 'DS-160\'ı gönderdikten sonra düzenleyebilir miyim?'}
                  </h4>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'No, once submitted you cannot edit DS-160. You must start a new application. Minor corrections can sometimes be discussed at the interview, but it\'s better to get it right the first time.'
                      : 'Hayır, gönderildikten sonra DS-160\'ı düzenleyemezsiniz. Yeni bir başvuru başlatmanız gerekir. Küçük düzeltmeler bazen mülakatta tartışılabilir, ancak ilk seferde doğru yapmak daha iyidir.'}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-black mb-2">
                    {isEnglish ? 'What if I don\'t know my exact travel dates?' : 'Kesin seyahat tarihlerimi bilmiyorsam ne olur?'}
                  </h4>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'Enter your best estimate. The dates on DS-160 are not binding - you can travel on different dates after your visa is approved (within the visa validity period).'
                      : 'En iyi tahmininizi girin. DS-160\'taki tarihler bağlayıcı değildir - vizeniz onaylandıktan sonra farklı tarihlerde seyahat edebilirsiniz (vize geçerlilik süresi içinde).'}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-black mb-2">
                    {isEnglish ? 'Should I fill DS-160 in English or Turkish?' : 'DS-160\'ı İngilizce mi Türkçe mi doldurmalıyım?'}
                  </h4>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'The form must be completed in English. While some fields show Turkish translations for guidance, all your answers must be in English characters.'
                      : 'Form İngilizce olarak doldurulmalıdır. Bazı alanlar rehberlik için Türkçe çeviriler gösterse de, tüm cevaplarınız İngilizce karakterlerle olmalıdır.'}
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h4 className="font-semibold text-black mb-2">
                    {isEnglish ? 'How long is DS-160 valid?' : 'DS-160 ne kadar süre geçerlidir?'}
                  </h4>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'DS-160 confirmation is valid for one year from the date of submission. You must attend your visa interview within this period.'
                      : 'DS-160 onayı, gönderim tarihinden itibaren bir yıl geçerlidir. Bu süre içinde vize mülakatınıza katılmalısınız.'}
                  </p>
                </div>

                <div className="pb-6">
                  <h4 className="font-semibold text-black mb-2">
                    {isEnglish ? 'What should I bring to the interview?' : 'Mülakata ne getirmeliyim?'}
                  </h4>
                  <p className="text-gray-700">
                    {isEnglish
                      ? 'Bring your DS-160 confirmation page (with barcode), valid passport, one printed photo meeting specifications, interview appointment letter, and any supporting documents relevant to your visa type.'
                      : 'DS-160 onay sayfanızı (barkodlu), geçerli pasaportunuzu, özellikleri karşılayan bir basılı fotoğrafı, mülakat randevu mektubunuzu ve vize türünüzle ilgili destekleyici belgeleri getirin.'}
                  </p>
                </div>
              </div>
            </section>

            {/* Kaynaklar */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-black mb-4">
                {isEnglish ? 'Official Sources' : 'Resmi Kaynaklar'}
              </h2>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://ceac.state.gov/genniv/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                  >
                    {isEnglish ? 'DS-160 Online Application Portal' : 'DS-160 Çevrimiçi Başvuru Portalı'}
                    <span>↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                  >
                    {isEnglish ? 'US Visa Photo Requirements' : 'ABD Vize Fotoğraf Gereksinimleri'}
                    <span>↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://tr.usembassy.gov/visas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                  >
                    {isEnglish ? 'US Embassy Ankara - Visa Information' : 'ABD Ankara Büyükelçiliği - Vize Bilgileri'}
                    <span>↗</span>
                  </a>
                </li>
              </ul>
            </section>

            {/* Disclaimer */}
            <div className="bg-gray-100 rounded-lg p-6 text-sm text-gray-600">
              <p className="font-semibold text-gray-900 mb-2">{isEnglish ? 'Disclaimer' : 'Yasal Uyarı'}</p>
              <p>
                {isEnglish
                  ? 'This guide is for informational purposes only and does not constitute legal advice. Visa requirements and procedures may change. Always verify current requirements on official US government websites. EchoLegal is not affiliated with the US Department of State or any government agency.'
                  : 'Bu rehber yalnızca bilgilendirme amaçlıdır ve hukuki tavsiye niteliği taşımaz. Vize gereksinimleri ve prosedürleri değişebilir. Güncel gereksinimleri her zaman resmi ABD hükümeti web sitelerinden doğrulayın. EchoLegal, ABD Dışişleri Bakanlığı veya herhangi bir hükümet kurumu ile bağlantılı değildir.'}
              </p>
            </div>
          </div>

          {/* Related Pages */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-black mb-4">{isEnglish ? 'Related Guides' : 'İlgili Rehberler'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href={`/${lang}/amerika/abdye-gelme-yollari`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-black">{isEnglish ? 'US Visa Categories' : 'ABD Vize Kategorileri'}</span>
                <span className="block text-sm text-gray-600 mt-1">{isEnglish ? 'Overview of all visa types' : 'Tüm vize türlerine genel bakış'}</span>
              </Link>
              <Link
                href={`/${lang}/amerika/abd-ye-gelmeden-once`}
                className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium text-black">{isEnglish ? 'Pre-Arrival Checklist' : 'Gelmeden Önce Yapılacaklar'}</span>
                <span className="block text-sm text-gray-600 mt-1">{isEnglish ? 'What to prepare before your trip' : 'Seyahatinizden önce hazırlanacaklar'}</span>
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-sm text-gray-500">
              © 2026 EchoLegal. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
