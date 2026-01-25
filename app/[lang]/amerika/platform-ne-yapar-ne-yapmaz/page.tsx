import { getDictionary } from '@/get-dictionary'
import { Locale } from '@/i18n-config'
import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import TrustStrip from '@/components/TrustStrip'

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params
  const isEnglish = lang === 'en'

  return {
    title: isEnglish
      ? "What This Platform Does and Does Not Do | EchoLegal"
      : "Platform Ne Yapar Ne Yapmaz | EchoLegal",
    description: isEnglish
      ? "Clear explanation of EchoLegal's scope, limitations, and what you can expect from this legal reference platform."
      : "EchoLegal'in kapsamı, sınırları ve bu hukuk referans platformundan ne bekleyebileceğinizin açık açıklaması.",
  }
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const isEnglish = lang === 'en'

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
              href={`/${lang === 'en' ? 'tr' : 'en'}/amerika/platform-ne-yapar-ne-yapmaz`}
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
            { label: isEnglish ? 'What This Platform Does' : 'Platform Ne Yapar Ne Yapmaz' }
          ]}
        />

        <TrustStrip lang={lang} />

        <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
          {isEnglish ? "What This Platform Does and Does Not Do" : "Platform Ne Yapar Ne Yapmaz"}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {isEnglish ? 'Last verified: January 2026' : 'Son doğrulama: Ocak 2026'}
        </p>

        {/* Core Statement */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            {isEnglish
              ? "EchoLegal is a legal reference and template platform. It provides general legal information and self-serve document templates. It does not provide individual legal representation, consultation, or case-specific advice."
              : "EchoLegal bir hukuk referans ve şablon platformudur. Genel hukuki bilgi ve self-servis belge şablonları sağlar. Bireysel hukuki temsil, danışmanlık veya dosyaya özgü tavsiye sağlamaz."}
          </p>
        </section>

        {/* What We Do */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'What This Platform Provides' : 'Bu Platform Ne Sağlar'}
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 border border-green-200 bg-green-50 rounded-lg">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-green-900">
                  {isEnglish ? 'General Legal Information' : 'Genel Hukuki Bilgi'}
                </h3>
                <p className="text-sm text-green-800">
                  {isEnglish
                    ? "Educational content about legal concepts, processes, and requirements. Written in plain language for understanding, not advice."
                    : "Hukuki kavramlar, süreçler ve gereksinimler hakkında eğitim içeriği. Tavsiye için değil, anlayış için sade bir dille yazılmıştır."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-green-200 bg-green-50 rounded-lg">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-green-900">
                  {isEnglish ? 'Document Templates' : 'Belge Şablonları'}
                </h3>
                <p className="text-sm text-green-800">
                  {isEnglish
                    ? "Bilingual contract templates (NDA, Service Agreement, etc.) for self-serve use. Templates require customization for your specific situation."
                    : "Self-servis kullanım için iki dilli sözleşme şablonları (NDA, Hizmet Sözleşmesi vb.). Şablonlar özel durumunuz için özelleştirme gerektirir."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-green-200 bg-green-50 rounded-lg">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-green-900">
                  {isEnglish ? 'Procedural Checklists' : 'Prosedürel Kontrol Listeleri'}
                </h3>
                <p className="text-sm text-green-800">
                  {isEnglish
                    ? "General checklists for common procedures (consular services, business formation steps). Not a substitute for official requirements."
                    : "Yaygın prosedürler için genel kontrol listeleri (konsolosluk hizmetleri, iş kurulum adımları). Resmi gereksinimlerin yerini tutmaz."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-green-200 bg-green-50 rounded-lg">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <h3 className="font-semibold text-green-900">
                  {isEnglish ? 'Bilingual Access' : 'İki Dilli Erişim'}
                </h3>
                <p className="text-sm text-green-800">
                  {isEnglish
                    ? "Content available in both English and Turkish for Turkish citizens navigating US legal systems."
                    : "ABD hukuk sistemlerinde yolunu bulmaya çalışan Türk vatandaşları için hem İngilizce hem de Türkçe içerik."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Don't Do */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'What This Platform Does NOT Provide' : 'Bu Platform Ne SAĞLAMAZ'}
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 border border-red-200 bg-red-50 rounded-lg">
              <span className="text-red-600 text-xl">✗</span>
              <div>
                <h3 className="font-semibold text-red-900">
                  {isEnglish ? 'Legal Representation' : 'Hukuki Temsil'}
                </h3>
                <p className="text-sm text-red-800">
                  {isEnglish
                    ? "No attorney-client relationship is formed through this platform. We do not represent individuals in any legal matter."
                    : "Bu platform aracılığıyla avukat-müvekkil ilişkisi kurulmaz. Herhangi bir hukuki konuda bireyleri temsil etmiyoruz."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-red-200 bg-red-50 rounded-lg">
              <span className="text-red-600 text-xl">✗</span>
              <div>
                <h3 className="font-semibold text-red-900">
                  {isEnglish ? 'Case-Specific Advice' : 'Dosyaya Özgü Tavsiye'}
                </h3>
                <p className="text-sm text-red-800">
                  {isEnglish
                    ? "We cannot evaluate your specific situation or tell you what to do. General information is not a substitute for individual legal advice."
                    : "Özel durumunuzu değerlendiremez veya ne yapmanız gerektiğini söyleyemeyiz. Genel bilgi, bireysel hukuki tavsiyenin yerini tutmaz."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-red-200 bg-red-50 rounded-lg">
              <span className="text-red-600 text-xl">✗</span>
              <div>
                <h3 className="font-semibold text-red-900">
                  {isEnglish ? 'Consultations or Intake' : 'Danışmanlık veya Dosya Kabulü'}
                </h3>
                <p className="text-sm text-red-800">
                  {isEnglish
                    ? "We do not offer consultations, case reviews, or take on clients. This is a reference platform only."
                    : "Danışmanlık, dosya incelemesi sunmuyor veya müvekkil kabul etmiyoruz. Bu yalnızca bir referans platformudur."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-red-200 bg-red-50 rounded-lg">
              <span className="text-red-600 text-xl">✗</span>
              <div>
                <h3 className="font-semibold text-red-900">
                  {isEnglish ? 'Immigration Services' : 'Göçmenlik Hizmetleri'}
                </h3>
                <p className="text-sm text-red-800">
                  {isEnglish
                    ? "We do not prepare visa applications, represent clients before USCIS, or provide immigration consultations."
                    : "Vize başvuruları hazırlamıyor, USCIS önünde müvekkilleri temsil etmiyor veya göçmenlik danışmanlığı sağlamıyoruz."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 border border-red-200 bg-red-50 rounded-lg">
              <span className="text-red-600 text-xl">✗</span>
              <div>
                <h3 className="font-semibold text-red-900">
                  {isEnglish ? 'Tax Filing Services' : 'Vergi Beyan Hizmetleri'}
                </h3>
                <p className="text-sm text-red-800">
                  {isEnglish
                    ? "We provide general tax information only. We do not prepare tax returns or provide tax planning advice."
                    : "Yalnızca genel vergi bilgisi sağlıyoruz. Vergi beyannamesi hazırlamıyor veya vergi planlama tavsiyesi vermiyoruz."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use This Platform */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'How to Use This Platform' : 'Bu Platformu Nasıl Kullanmalı'}
          </h2>

          <div className="prose max-w-none text-gray-600 space-y-4">
            <p>
              {isEnglish
                ? "Use this platform to educate yourself about legal concepts and processes. The information here can help you understand what questions to ask, what procedures exist, and what documents you might need."
                : "Bu platformu hukuki kavramlar ve süreçler hakkında kendinizi eğitmek için kullanın. Buradaki bilgiler hangi soruları sormanız gerektiğini, hangi prosedürlerin var olduğunu ve hangi belgelere ihtiyacınız olabileceğini anlamanıza yardımcı olabilir."}
            </p>
            <p>
              {isEnglish
                ? "For matters that affect your legal rights, business decisions, or immigration status, consult with a licensed attorney who can evaluate your specific circumstances."
                : "Hukuki haklarınızı, iş kararlarınızı veya göçmenlik statünüzü etkileyen konular için, özel koşullarınızı değerlendirebilecek lisanslı bir avukata danışın."}
            </p>
          </div>
        </section>

        {/* About the Author */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {isEnglish ? 'About This Platform' : 'Platform Hakkında'}
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              {isEnglish
                ? "EchoLegal content is prepared under the supervision of a New York licensed attorney (Bar #5552336) with experience in cross-border TR-US legal matters."
                : "EchoLegal içeriği, sınır ötesi TR-ABD hukuki konularda deneyimli bir New York lisanslı avukatın (Bar #5552336) gözetiminde hazırlanmaktadır."}
            </p>
            <p className="text-gray-700">
              {isEnglish
                ? "This platform exists because reliable, bilingual legal information is difficult to find. The goal is to help people understand legal frameworks before they act - not to replace professional advice when it's needed."
                : "Bu platform, güvenilir, iki dilli hukuki bilginin bulunmasının zor olması nedeniyle var. Amaç, insanların harekete geçmeden önce hukuki çerçeveleri anlamalarına yardımcı olmaktır - ihtiyaç duyulduğunda profesyonel tavsiyenin yerini almak değil."}
            </p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="bg-gray-50 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isEnglish ? 'Explore the Platform' : 'Platformu Keşfedin'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href={`/${lang}/amerika`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Amerika Hub' : 'Amerika'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/contracts`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Contract Templates' : 'Sözleşme Şablonları'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/consular-documents`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Consular Services' : 'Konsolosluk Hizmetleri'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
            <Link
              href={`/${lang}/legal/disclaimer`}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9A227] hover:shadow-md transition-all"
            >
              <span className="font-medium text-gray-800">
                {isEnglish ? 'Full Legal Disclaimer' : 'Tam Hukuki Sorumluluk Reddi'}
              </span>
              <span className="text-[#C9A227]">→</span>
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="text-sm text-gray-500">
          <p>
            {isEnglish
              ? 'This content is for general informational purposes only and does not constitute legal advice.'
              : 'Bu içerik yalnızca genel bilgilendirme amaçlıdır ve hukuki tavsiye teşkil etmez.'}
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
