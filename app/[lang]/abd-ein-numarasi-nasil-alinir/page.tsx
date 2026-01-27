import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'How to Get an EIN (Federal Tax ID) for Your US LLC | EchoLegal'
    : 'ABD\'de Vergi Numarası (EIN) Nedir ve Nasıl Alınır? | EchoLegal'

  const description = isEnglish
    ? 'Complete guide to obtaining an EIN (Employer Identification Number) for your US LLC. Application process for foreign owners, timeline, and requirements.'
    : 'ABD LLC\'niz için EIN (İşveren Kimlik Numarası) alma rehberi. Yabancı sahipler için başvuru süreci, zaman çizelgesi ve gereksinimler.'

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', locale: isEnglish ? 'en_US' : 'tr_TR' },
    alternates: {
      canonical: `https://echo-legal.com/${lang}/abd-ein-numarasi-nasil-alinir`,
      languages: {
        'en': 'https://echo-legal.com/en/abd-ein-numarasi-nasil-alinir',
        'tr': 'https://echo-legal.com/tr/abd-ein-numarasi-nasil-alinir',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function EINGuidePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: isEnglish ? 'How to Get an EIN for Your US LLC' : 'ABD LLC\'niz İçin EIN Nasıl Alınır',
    author: { '@type': 'Person', name: 'Zeynep Ruziye Moore', jobTitle: 'Licensed in New York' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-8">
          <Link href={`/${lang}`} className="hover:text-black">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
          {' → '}
          <span className="text-black font-medium">{isEnglish ? 'EIN Guide' : 'EIN Rehberi'}</span>
        </nav>

        <article>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {isEnglish
              ? 'How to Get an EIN (Tax ID Number)'
              : 'ABD\'de Vergi Numarası (EIN) Nasıl Alınır?'}
          </h1>

          <p className="text-xl text-gray-600 mb-6">
            {isEnglish
              ? 'Everything you need to know about obtaining an EIN for your US LLC—including the special process for foreign owners who can\'t apply online.'
              : 'ABD LLC\'niz için EIN alma hakkında bilmeniz gereken her şey—online başvuru yapamayan yabancı sahipler için özel süreç dahil.'}
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
            <h2 className="font-bold text-lg mb-3">{isEnglish ? 'What is an EIN?' : 'EIN Nedir?'}</h2>
            <p className="text-gray-700">
              {isEnglish
                ? 'An EIN (Employer Identification Number) is a 9-digit number (XX-XXXXXXX) issued by the IRS to identify your business for tax purposes. It\'s like a Social Security Number for your LLC. You need it to open a bank account, hire employees, file taxes, and work with most US clients.'
                : 'EIN (İşveren Kimlik Numarası), IRS tarafından işletmenizi vergi amaçlı tanımlamak için verilen 9 haneli bir numaradır (XX-XXXXXXX). LLC\'niz için bir Sosyal Güvenlik Numarası gibidir. Banka hesabı açmak, çalışan işe almak, vergi dosyalamak ve çoğu ABD müşterisiyle çalışmak için buna ihtiyacınız var.'}
            </p>
          </div>

          {/* Application Methods */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'How to Apply: Two Methods' : 'Nasıl Başvurulur: İki Yöntem'}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
                <h3 className="font-semibold text-lg text-green-900 mb-3">{isEnglish ? 'Online (US Persons Only)' : 'Online (Sadece ABD Kişileri)'}</h3>
                <p className="text-green-800 text-sm mb-4">
                  {isEnglish
                    ? 'If you have an SSN or ITIN, you can apply online at irs.gov. EIN issued immediately.'
                    : 'SSN veya ITIN\'iniz varsa, irs.gov\'da online başvurabilirsiniz. EIN hemen verilir.'}
                </p>
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-500">{isEnglish ? 'Processing Time:' : 'İşlem Süresi:'}</p>
                  <p className="font-bold text-green-700">{isEnglish ? 'Immediate' : 'Anında'}</p>
                </div>
              </div>

              <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                <h3 className="font-semibold text-lg text-blue-900 mb-3">{isEnglish ? 'Fax/Mail (Foreign Owners)' : 'Faks/Posta (Yabancı Sahipler)'}</h3>
                <p className="text-blue-800 text-sm mb-4">
                  {isEnglish
                    ? 'If you don\'t have an SSN/ITIN, you must fax or mail Form SS-4 to the IRS.'
                    : 'SSN/ITIN\'iniz yoksa, Form SS-4\'ü IRS\'e faks veya posta ile göndermelisiniz.'}
                </p>
                <div className="bg-white rounded p-3">
                  <p className="text-xs text-gray-500">{isEnglish ? 'Processing Time:' : 'İşlem Süresi:'}</p>
                  <p className="font-bold text-blue-700">{isEnglish ? '2-4 weeks (fax) / 4-6 weeks (mail)' : '2-4 hafta (faks) / 4-6 hafta (posta)'}</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
              <p className="font-semibold text-yellow-900">{isEnglish ? '⚠️ Foreign Owners Cannot Apply Online' : '⚠️ Yabancı Sahipler Online Başvuru Yapamaz'}</p>
              <p className="text-yellow-800">
                {isEnglish
                  ? 'The IRS online system requires a US SSN or ITIN. As a Turkish citizen without these, you must use the fax method. The phone application option is no longer available for international callers as of 2024.'
                  : 'IRS online sistemi ABD SSN veya ITIN gerektirir. Bunlar olmadan Türk vatandaşı olarak faks yöntemini kullanmalısınız. Uluslararası arayanlar için telefon başvuru seçeneği 2024 itibarıyla artık mevcut değildir.'}
              </p>
            </div>
          </section>

          {/* Form SS-4 Instructions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Filling Out Form SS-4' : 'Form SS-4 Doldurma'}</h2>

            <p className="text-gray-600 mb-6">
              {isEnglish
                ? 'Form SS-4 is the application for an EIN. Here\'s how to complete it for a foreign-owned single-member LLC:'
                : 'Form SS-4, EIN başvurusudur. İşte yabancıya ait tek üyeli LLC için nasıl doldurulacağı:'}
            </p>

            <div className="space-y-4">
              {(isEnglish ? [
                { line: '1', field: 'Legal name of entity', instruction: 'Your LLC\'s full legal name exactly as filed with the state' },
                { line: '2', field: 'Trade name', instruction: 'DBA name if different from Line 1, otherwise leave blank' },
                { line: '3', field: 'Executor/Administrator', instruction: 'Leave blank for LLCs' },
                { line: '4a-b', field: 'Mailing address', instruction: 'Use your US registered agent\'s address' },
                { line: '5a-b', field: 'Street address', instruction: 'Same as Line 4 if using registered agent' },
                { line: '6', field: 'County and state', instruction: 'County and state where your LLC is located' },
                { line: '7a', field: 'Responsible party name', instruction: 'Your full name as on passport' },
                { line: '7b', field: 'SSN/ITIN', instruction: 'Write "Foreign" if you don\'t have one' },
                { line: '8a', field: 'LLC checkbox', instruction: 'Check "Limited liability company"' },
                { line: '8b', field: 'Number of members', instruction: 'Enter number of LLC members' },
                { line: '9a', field: 'Type of entity', instruction: 'Check "Other" and write "Disregarded entity" for single-member' },
                { line: '10', field: 'Reason for applying', instruction: 'Check "Started new business" and describe briefly' },
                { line: '11-17', field: 'Business details', instruction: 'Complete based on your business activities' },
                { line: '18', field: 'Third party designee', instruction: 'Optional: authorize someone to receive EIN info' },
              ] : [
                { line: '1', field: 'Kuruluşun yasal adı', instruction: 'LLC\'nizin eyalete dosyalandığı şekliyle tam yasal adı' },
                { line: '2', field: 'Ticari ad', instruction: 'Satır 1\'den farklıysa DBA adı, aksi takdirde boş bırakın' },
                { line: '3', field: 'Yürütücü/Yönetici', instruction: 'LLC\'ler için boş bırakın' },
                { line: '4a-b', field: 'Posta adresi', instruction: 'ABD kayıtlı temsilcinizin adresini kullanın' },
                { line: '5a-b', field: 'Sokak adresi', instruction: 'Kayıtlı temsilci kullanıyorsanız Satır 4 ile aynı' },
                { line: '6', field: 'İlçe ve eyalet', instruction: 'LLC\'nizin bulunduğu ilçe ve eyalet' },
                { line: '7a', field: 'Sorumlu taraf adı', instruction: 'Pasaportunuzdaki tam adınız' },
                { line: '7b', field: 'SSN/ITIN', instruction: 'Yoksa "Foreign" yazın' },
                { line: '8a', field: 'LLC onay kutusu', instruction: '"Limited liability company" işaretleyin' },
                { line: '8b', field: 'Üye sayısı', instruction: 'LLC üye sayısını girin' },
                { line: '9a', field: 'Kuruluş türü', instruction: '"Other" işaretleyin ve tek üye için "Disregarded entity" yazın' },
                { line: '10', field: 'Başvuru nedeni', instruction: '"Started new business" işaretleyin ve kısaca açıklayın' },
                { line: '11-17', field: 'İş detayları', instruction: 'İş faaliyetlerinize göre tamamlayın' },
                { line: '18', field: 'Üçüncü taraf temsilcisi', instruction: 'İsteğe bağlı: birini EIN bilgisi almak için yetkilendirin' },
              ]).map((item, i) => (
                <div key={i} className="flex gap-4 p-3 border border-gray-200 rounded">
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm font-mono h-fit">{item.line}</span>
                  <div>
                    <p className="font-semibold text-sm">{item.field}</p>
                    <p className="text-gray-600 text-sm">{item.instruction}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Fax Instructions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'How to Fax Form SS-4' : 'Form SS-4 Nasıl Fakslanır'}</h2>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="bg-[#C9A227] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <p className="font-semibold">{isEnglish ? 'Complete Form SS-4' : 'Form SS-4\'ü Tamamlayın'}</p>
                    <p className="text-gray-600 text-sm">{isEnglish ? 'Download from irs.gov, fill out completely, and sign.' : 'Irs.gov\'dan indirin, tamamen doldurun ve imzalayın.'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="bg-[#C9A227] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <p className="font-semibold">{isEnglish ? 'Use a Reliable Fax Service' : 'Güvenilir Faks Servisi Kullanın'}</p>
                    <p className="text-gray-600 text-sm">{isEnglish ? 'Online services like eFax, HelloFax, or FaxZero work from Turkey.' : 'eFax, HelloFax veya FaxZero gibi online servisler Türkiye\'den çalışır.'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="bg-[#C9A227] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <p className="font-semibold">{isEnglish ? 'Fax to IRS' : 'IRS\'e Faks Gönderin'}</p>
                    <p className="text-gray-600 text-sm">
                      {isEnglish
                        ? 'International fax: +1-304-707-9471 (for applicants with no legal residence in any US state)'
                        : 'Uluslararası faks: +1-304-707-9471 (herhangi bir ABD eyaletinde yasal ikameti olmayan başvurucular için)'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="bg-[#C9A227] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <div>
                    <p className="font-semibold">{isEnglish ? 'Wait for Response' : 'Yanıt Bekleyin'}</p>
                    <p className="text-gray-600 text-sm">{isEnglish ? 'IRS will fax your EIN back to the number you provided (usually within 2-4 weeks).' : 'IRS, EIN\'inizi verdiğiniz numaraya faksla gönderecektir (genellikle 2-4 hafta içinde).'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-100 rounded">
                <p className="font-semibold text-blue-900">{isEnglish ? 'IRS Fax Number for International Applicants:' : 'Uluslararası Başvurucular İçin IRS Faks Numarası:'}</p>
                <p className="text-2xl font-mono text-blue-800">+1-304-707-9471</p>
              </div>
            </div>
          </section>

          {/* Common Issues */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{isEnglish ? 'Common Issues & Solutions' : 'Yaygın Sorunlar ve Çözümler'}</h2>

            <div className="space-y-4">
              {(isEnglish ? [
                { issue: 'Fax not going through', solution: 'IRS fax lines can be busy. Try early morning US Eastern time (before 9 AM). Retry multiple times.' },
                { issue: 'No response after 4 weeks', solution: 'Refax the form. Keep confirmation of your original fax attempt. You can also mail Form SS-4 as backup.' },
                { issue: 'EIN assigned but no letter received', solution: 'Request Letter 147C from IRS to verify your EIN. Banks may accept this.' },
                { issue: 'Form rejected for errors', solution: 'IRS will usually fax back with explanation. Correct and resubmit.' },
              ] : [
                { issue: 'Faks geçmiyor', solution: 'IRS faks hatları meşgul olabilir. ABD Doğu saatiyle sabah erken saatleri deneyin (09.00\'dan önce). Birden fazla kez deneyin.' },
                { issue: '4 hafta sonra yanıt yok', solution: 'Formu yeniden faksla gönderin. Orijinal faks denemenizin onayını saklayın. Yedek olarak Form SS-4\'ü posta ile de gönderebilirsiniz.' },
                { issue: 'EIN atandı ama mektup gelmedi', solution: 'EIN\'inizi doğrulamak için IRS\'den 147C Mektubu talep edin. Bankalar bunu kabul edebilir.' },
                { issue: 'Form hatalar nedeniyle reddedildi', solution: 'IRS genellikle açıklama ile geri fakslar. Düzeltin ve yeniden gönderin.' },
              ]).map((item, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="font-semibold text-red-700">⚠ {item.issue}</p>
                  <p className="text-green-700 mt-1">✓ {item.solution}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/ein-itin-ssn-farki`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'EIN vs ITIN vs SSN: What\'s the Difference? →' : 'EIN vs ITIN vs SSN: Fark Nedir? →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-llc-banka-hesabi-acmak`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'Opening a US Bank Account →' : 'ABD Banka Hesabı Açmak →'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/abd-llc-kurmak-kac-gun-surer`} className="text-[#C9A227] hover:underline">
                  {isEnglish ? 'LLC Formation Timeline →' : 'LLC Kurma Süresi →'}
                </Link>
              </li>
            </ul>
          </section>

        </article>
      </main>
    </>
  )
}
