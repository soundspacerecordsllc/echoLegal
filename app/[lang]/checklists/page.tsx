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
      slug: 'llc-kontrol-listesi',
      title: isEnglish ? 'Before Forming a US LLC: Checklist' : 'ABD\'de LLC Kurmadan Önce: Kontrol Listesi',
      description: isEnglish
        ? 'Key questions to consider before starting the LLC formation process.'
        : 'LLC kurulum sürecini başlatmadan önce düşünülmesi gereken temel sorular.',
      items: 8,
      available: true,
    },
    {
      slug: 'w8-w9-karar-haritasi',
      title: isEnglish ? 'W-8 or W-9? Quick Decision Map' : 'W-8 mi W-9 mu? Kısa Karar Haritası',
      description: isEnglish
        ? 'A simple decision tree to determine which tax form you need.'
        : 'Hangi vergi formuna ihtiyacınız olduğunu belirlemek için basit bir karar ağacı.',
      items: 5,
      available: true,
    },
    {
      slug: 'irs-mektup-rehberi',
      title: isEnglish ? 'IRS Letter Received: First 7 Facts' : 'IRS\'ten Mektup Geldiyse: İlk 7 Gerçek',
      description: isEnglish
        ? 'What to understand when you receive a letter from the IRS.'
        : 'IRS\'ten mektup aldığınızda anlamanız gerekenler.',
      items: 7,
      available: true,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href={`/${lang}`} className="text-2xl font-black text-black">EchoLegal</Link>
          <div className="flex items-center gap-6">
            <Link href={`/${lang}`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Home' : 'Ana Sayfa'}</Link>
            <Link href={`/${lang}/library`} className="text-sm font-medium hover:opacity-60">{isEnglish ? 'Library' : 'Kütüphane'}</Link>
            <Link href={`/${lang}/checklists`} className="text-sm font-medium text-black border-b-2 border-black">{isEnglish ? 'Checklists' : 'Kontrol Listeleri'}</Link>
            <Link href={`/${lang === 'en' ? 'tr' : 'en'}/checklists`} className="border border-black rounded-full px-3 py-1 text-sm font-medium hover:bg-black hover:text-white transition-all">
              {isEnglish ? 'TR' : 'EN'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12">
          <span className="inline-block px-3 py-1 bg-green-50 text-green-800 rounded-full text-sm font-medium mb-4">
            {isEnglish ? 'Quick Reference Tools' : 'Hızlı Referans Araçları'}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
            {isEnglish ? 'Checklists & Decision Maps' : 'Kontrol Listeleri ve Karar Haritaları'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            {isEnglish
              ? 'Simple reference tools to help clarify common legal questions. Not advice—just organized facts.'
              : 'Yaygın hukuki soruları netleştirmeye yardımcı basit referans araçları. Tavsiye değil—sadece düzenlenmiş gerçekler.'}
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-10">
          <h3 className="font-semibold text-amber-800 mb-2">
            {isEnglish ? 'What These Are' : 'Bunlar Nedir'}
          </h3>
          <p className="text-sm text-amber-900">
            {isEnglish
              ? 'These checklists are reference tools that organize common information. They do not provide legal, tax, or immigration advice. Your situation may have factors not covered here. Consult licensed professionals before making decisions.'
              : 'Bu kontrol listeleri yaygın bilgileri düzenleyen referans araçlarıdır. Hukuki, vergi veya göçmenlik tavsiyesi sağlamazlar. Durumunuzda burada ele alınmayan faktörler olabilir. Karar vermeden önce lisanslı profesyonellere danışın.'}
          </p>
        </div>

        {/* Checklists Grid */}
        <div className="space-y-6">
          {checklists.map((checklist) => (
            <Link
              key={checklist.slug}
              href={`/${lang}/checklists/${checklist.slug}`}
              className="block border border-gray-200 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-black mb-2 group-hover:text-[#C9A227] transition-colors">
                    {checklist.title}
                  </h2>
                  <p className="text-gray-600 mb-3">{checklist.description}</p>
                  <span className="text-sm text-gray-500">
                    {checklist.items} {isEnglish ? 'points' : 'madde'}
                  </span>
                </div>
                <span className="text-[#C9A227] font-medium ml-4">
                  {isEnglish ? 'View →' : 'Görüntüle →'}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Product CTA */}
        <div className="mt-12 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-xl font-bold text-black mb-4">
            {isEnglish ? 'Need the Full Picture?' : 'Tam Resme mi İhtiyacınız Var?'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isEnglish
              ? 'Our comprehensive guides provide detailed explanations of these topics.'
              : 'Kapsamlı rehberlerimiz bu konuların ayrıntılı açıklamalarını sağlar.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${lang}/library`}
              className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              {isEnglish ? 'Browse Library →' : 'Kütüphaneye Göz At →'}
            </Link>
            <Link
              href={`/${lang}/legal-kits/business-starter`}
              className="inline-block bg-[#C9A227] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8922A] transition-colors"
            >
              {isEnglish ? 'Business Starter Kit →' : 'Business Starter Kit →'}
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed max-w-4xl">{dict.disclaimer.global}</p>
          <p className="text-xs text-gray-400 mt-4">© 2025 EchoLegal. {isEnglish ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}</p>
        </div>
      </footer>
    </div>
  )
}
