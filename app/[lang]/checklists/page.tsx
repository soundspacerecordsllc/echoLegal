// app/[lang]/checklists/page.tsx

import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'
  return {
    title: isEnglish
      ? 'Legal Checklists & Decision Maps | EchoLegal'
      : 'Hukuki Kontrol Listeleri ve Karar Haritaları | EchoLegal',
    description: isEnglish
      ? 'Quick reference checklists and decision guides for common US business legal questions. LLC formation, tax forms, IRS letters explained.'
      : 'Yaygın ABD iş hukuku soruları için hızlı referans kontrol listeleri ve karar rehberleri. LLC kurulumu, vergi formları, IRS mektupları açıklandı.',
    alternates: {
      canonical: `https://echo-legal.com/${lang}/checklists`,
      languages: {
        en: 'https://echo-legal.com/en/checklists',
        tr: 'https://echo-legal.com/tr/checklists',
        'x-default': 'https://echo-legal.com/en/checklists',
      },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'tr' }]
}

export default async function ChecklistsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

  const checklists = [
    {
      slug: 'llc-checklist',
      title: isEnglish ? 'US LLC Formation Checklist' : 'ABD LLC Kurulum Kontrol Listesi',
      description: isEnglish
        ? 'Complete preparation checklist: state selection, documents, costs, and post-formation steps.'
        : 'Tam hazırlık listesi: eyalet seçimi, belgeler, maliyetler ve kuruluş sonrası adımlar.',
      items: 21,
      available: true,
    },
    {
      slug: 'w8-w9-karar-haritasi',
      title: isEnglish ? 'W-8 vs W-9 Decision Guide' : 'W-8 / W-9 Karar Rehberi',
      description: isEnglish
        ? 'Determine which IRS tax form applies to your situation.'
        : 'Durumunuza hangi IRS vergi formunun uygulandığını belirleyin.',
      items: 5,
      available: true,
    },
    {
      slug: 'irs-mektup-rehberi',
      title: isEnglish ? 'IRS Correspondence Guide' : 'IRS Yazışma Rehberi',
      description: isEnglish
        ? 'Understanding and responding to IRS letters and notices.'
        : 'IRS mektuplarını ve bildirimlerini anlama ve yanıtlama.',
      items: 7,
      available: true,
    },
    {
      slug: 'bank-account-checklist',
      title: isEnglish ? 'US Business Bank Account Checklist' : 'ABD İş Bankası Hesabı Listesi',
      description: isEnglish
        ? 'Documents and requirements for opening a US business bank account.'
        : 'ABD iş bankası hesabı açmak için belgeler ve gereksinimler.',
      items: 10,
      available: true,
    },
    {
      slug: 'tax-documents-checklist',
      title: isEnglish ? 'Tax Documents Checklist' : 'Vergi Belgeleri Listesi',
      description: isEnglish
        ? 'Essential IRS forms and compliance documents for foreign entrepreneurs.'
        : 'Yabancı girişimciler için gerekli IRS formları ve uyum belgeleri.',
      items: 8,
      available: true,
    },
  ]

  return (
    <div className="bg-white">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
            {isEnglish ? 'Reference Tools' : 'Referans Araçları'}
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-gray-900 mb-4">
            {isEnglish ? 'Checklists' : 'Kontrol Listeleri'}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {isEnglish
              ? 'Structured reference lists for common legal and business procedures. Use these to verify completeness—not as a substitute for professional guidance.'
              : 'Yaygın hukuki ve iş prosedürleri için yapılandırılmış referans listeleri. Bunları tamlığı doğrulamak için kullanın—profesyonel rehberliğin yerine değil.'}
          </p>
        </header>

        {/* Checklists List */}
        <div className="divide-y divide-gray-200">
          {checklists.map((checklist) => (
            <Link
              key={checklist.slug}
              href={`/${lang}/checklists/${checklist.slug}`}
              className="block py-6 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                    {checklist.title}
                  </h2>
                  <p className="text-gray-500 mt-1 text-sm leading-relaxed">
                    {checklist.description}
                  </p>
                </div>
                <span className="text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 mt-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Notice */}
        <aside className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 leading-relaxed">
            {isEnglish
              ? 'These checklists compile commonly required items based on general practice. Requirements vary by jurisdiction, institution, and circumstance. Verify all items with relevant authorities and consult licensed professionals for your specific situation.'
              : 'Bu kontrol listeleri, genel uygulamaya dayalı olarak yaygın olarak gerekli öğeleri derler. Gereksinimler yargı alanına, kuruma ve duruma göre değişir. Tüm öğeleri ilgili makamlarla doğrulayın ve özel durumunuz için lisanslı profesyonellere danışın.'}
          </p>
        </aside>

        {/* Related Resources */}
        <nav className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
            {isEnglish ? 'Related Resources' : 'İlgili Kaynaklar'}
          </h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${lang}/library`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'Reference Library →' : 'Referans Kütüphanesi →'}
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              href={`/${lang}/legal-kits`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'Legal Kits →' : 'Hukuki Kitler →'}
            </Link>
            <span className="text-gray-300">·</span>
            <Link
              href={isEnglish ? `/${lang}/templates` : `/${lang}/sablonlar`}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isEnglish ? 'Templates →' : 'Şablonlar →'}
            </Link>
          </div>
        </nav>
      </main>
    </div>
  )
}
