// app/[lang]/about/corrections/page.tsx

import { Locale } from '@/i18n-config'
import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import GovernanceNav from '@/components/GovernanceNav'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const title = isEnglish
    ? 'Correction & Retraction Policy | EchoLegal'
    : 'Düzeltme ve Geri Çekme Politikası | EchoLegal'

  const description = isEnglish
    ? 'How EchoLegal handles errors, corrections, and retractions. Reporting process, correction notices, and version history commitments.'
    : 'EchoLegal\'ın hataları, düzeltmeleri ve geri çekmeleri nasıl ele aldığı. Raporlama süreci, düzeltme bildirimleri ve sürüm geçmişi taahhütleri.'

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
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function CorrectionsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const isEnglish = lang === 'en'

  const breadcrumbItems = [
    { label: isEnglish ? 'About' : 'Hakkımızda', href: `/${lang}/about` },
    { label: isEnglish ? 'Corrections' : 'Düzeltmeler' },
  ]

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={breadcrumbItems} lang={lang} />

      <GovernanceNav lang={lang} currentPath="/about/corrections" />

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
          {isEnglish ? 'Correction & Retraction Policy' : 'Düzeltme ve Geri Çekme Politikası'}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {isEnglish
            ? 'How errors are reported, acknowledged, and corrected on EchoLegal.'
            : 'EchoLegal\'da hataların nasıl raporlandığı, kabul edildiği ve düzeltildiği.'}
        </p>
      </div>

      {/* Principles */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Principles' : 'İlkeler'}
        </h2>
        <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-gray-900">
          <div className="space-y-3 text-gray-700">
            <p>
              {isEnglish
                ? 'Legal information must be accurate. When errors are identified in EchoLegal content, they are corrected promptly and transparently. The correction record is preserved so that readers who may have relied on prior versions can understand what changed and when.'
                : 'Hukuki bilgi doğru olmalıdır. EchoLegal içeriğinde hatalar tespit edildiğinde, derhal ve şeffaf bir şekilde düzeltilir. Düzeltme kaydı korunur, böylece önceki sürümlere güvenmiş olabilecek okuyucular neyin ne zaman değiştiğini anlayabilir.'}
            </p>
            <p>
              {isEnglish
                ? 'EchoLegal does not silently alter published content. All substantive changes are documented in the revision history.'
                : 'EchoLegal yayınlanmış içeriği sessizce değiştirmez. Tüm esaslı değişiklikler revizyon geçmişinde belgelenir.'}
            </p>
          </div>
        </div>
      </section>

      {/* Correction Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Correction Categories' : 'Düzeltme Kategorileri'}
        </h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-black mb-2">
              {isEnglish ? 'Editorial Corrections' : 'Editöryal Düzeltmeler'}
            </h3>
            <p className="text-sm text-gray-700">
              {isEnglish
                ? 'Typographical errors, formatting issues, broken links, or minor clarifications that do not alter the legal substance of the content. These are corrected without a formal notice but are reflected in the modification date.'
                : 'Yazım hataları, biçimlendirme sorunları, bozuk bağlantılar veya içeriğin hukuki özünü değiştirmeyen küçük açıklamalar. Bunlar resmi bir bildirim olmadan düzeltilir ancak değişiklik tarihine yansıtılır.'}
            </p>
          </div>

          <div className="border border-amber-200 bg-amber-50 rounded-lg p-5">
            <h3 className="font-semibold text-amber-900 mb-2">
              {isEnglish ? 'Substantive Corrections' : 'Esaslı Düzeltmeler'}
            </h3>
            <p className="text-sm text-amber-800">
              {isEnglish
                ? 'Errors of legal fact, incorrect citations, outdated statutory references, or misstatements that could affect reader understanding or decisions. These are corrected with a visible correction notice displayed at the top of the affected content. The notice states what was corrected, when, and why.'
                : 'Hukuki olgu hataları, yanlış atıflar, güncel olmayan kanun referansları veya okuyucu anlayışını veya kararlarını etkileyebilecek yanlış beyanlar. Bunlar, etkilenen içeriğin üst kısmında gösterilen görünür bir düzeltme bildirimiyle düzeltilir. Bildirim neyin, ne zaman ve neden düzeltildiğini belirtir.'}
            </p>
          </div>

          <div className="border border-red-200 bg-red-50 rounded-lg p-5">
            <h3 className="font-semibold text-red-900 mb-2">
              {isEnglish ? 'Retractions' : 'Geri Çekmeler'}
            </h3>
            <p className="text-sm text-red-800">
              {isEnglish
                ? 'Content that is found to be fundamentally flawed, misleading, or no longer legally valid is retracted. Retracted content remains accessible at its original URL with a retraction notice explaining the reason. The content is marked as retracted in metadata and search results. Retractions are authorized by the Editorial Director.'
                : 'Temelden kusurlu, yanıltıcı veya artık hukuken geçerli olmadığı tespit edilen içerik geri çekilir. Geri çekilen içerik, nedenini açıklayan bir geri çekme bildirimiyle orijinal URL\'sinde erişilebilir kalır. İçerik meta verilerde ve arama sonuçlarında geri çekilmiş olarak işaretlenir. Geri çekmeler Editöryal Direktör tarafından yetkilendirilir.'}
            </p>
          </div>
        </div>
      </section>

      {/* Reporting an Error */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Reporting an Error' : 'Hata Bildirme'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'Readers, attorneys, and other professionals who identify an error in EchoLegal content are encouraged to report it. Error reports should include:'
              : 'EchoLegal içeriğinde bir hata tespit eden okuyucular, avukatlar ve diğer profesyoneller bunu bildirmeye teşvik edilir. Hata raporları şunları içermelidir:'}
          </p>
          <ul className="list-disc list-inside space-y-2 ml-1">
            <li>
              {isEnglish
                ? 'The URL of the affected content.'
                : 'Etkilenen içeriğin URL\'si.'}
            </li>
            <li>
              {isEnglish
                ? 'A description of the error (what is incorrect or misleading).'
                : 'Hatanın açıklaması (neyin yanlış veya yanıltıcı olduğu).'}
            </li>
            <li>
              {isEnglish
                ? 'If available, a reference to the correct information (statute, regulation, official source).'
                : 'Mevcutsa, doğru bilgiye referans (kanun, yönetmelik, resmi kaynak).'}
            </li>
          </ul>
          <p>
            {isEnglish
              ? 'All error reports are reviewed by the relevant Jurisdiction Editor or the Editorial Director. Reports involving potential substantive errors are prioritized and investigated within five business days of receipt.'
              : 'Tüm hata raporları ilgili Yargı Alanı Editörü veya Editöryal Direktör tarafından incelenir. Potansiyel esaslı hataları içeren raporlar önceliklendirilir ve alındıktan sonra beş iş günü içinde araştırılır.'}
          </p>
        </div>
      </section>

      {/* Version History */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-black mb-6">
          {isEnglish ? 'Version History Commitment' : 'Sürüm Geçmişi Taahhüdü'}
        </h2>
        <div className="space-y-4 text-gray-700">
          <p>
            {isEnglish
              ? 'Every published content entry on EchoLegal maintains a revision history that records:'
              : 'EchoLegal\'daki her yayınlanmış içerik maddesi, aşağıdakileri kaydeden bir revizyon geçmişi tutar:'}
          </p>
          <div className="bg-gray-50 rounded-lg p-5">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-gray-400">—</span>
                <span>
                  {isEnglish
                    ? 'The version number (major version for substantive changes, minor for editorial).'
                    : 'Sürüm numarası (esaslı değişiklikler için ana sürüm, editöryal için küçük sürüm).'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">—</span>
                <span>
                  {isEnglish
                    ? 'The date of each revision.'
                    : 'Her revizyonun tarihi.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">—</span>
                <span>
                  {isEnglish
                    ? 'A summary of what changed.'
                    : 'Neyin değiştiğinin özeti.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400">—</span>
                <span>
                  {isEnglish
                    ? 'The classification of the change (substantive, correction, editorial, or translation update).'
                    : 'Değişikliğin sınıflandırması (esaslı, düzeltme, editöryal veya çeviri güncellemesi).'}
                </span>
              </li>
            </ul>
          </div>
          <p>
            {isEnglish
              ? 'Revision histories are publicly accessible. No published version is silently overwritten. This practice ensures that citations referencing a specific version of EchoLegal content remain verifiable.'
              : 'Revizyon geçmişleri kamuya açıktır. Yayınlanmış hiçbir sürüm sessizce üzerine yazılmaz. Bu uygulama, EchoLegal içeriğinin belirli bir sürümüne atıfta bulunan alıntıların doğrulanabilir kalmasını sağlar.'}
          </p>
        </div>
      </section>

      {/* Report */}
      <section className="border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-black mb-4">
          {isEnglish ? 'Submit a Correction Report' : 'Düzeltme Raporu Gönderin'}
        </h2>
        <p className="text-gray-700">
          {isEnglish
            ? 'To report an error or request a correction, use the support page below.'
            : 'Bir hata bildirmek veya düzeltme talep etmek için aşağıdaki destek sayfasını kullanın.'}
        </p>
        <Link
          href={`/${lang}/support`}
          className="inline-block mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
        >
          {isEnglish ? 'Report an Error' : 'Hata Bildirin'}
        </Link>
      </section>
    </main>
  )
}
