interface TrustStripProps {
  lang: 'en' | 'tr'
}

export default function TrustStrip({ lang }: TrustStripProps) {
  const isEnglish = lang === 'en'

  const items = isEnglish
    ? [
        { icon: '⚖️', text: 'NY Licensed Attorney' },
        { icon: '🌐', text: 'TR/US Bilingual Legal Reference' },
        { icon: '📚', text: 'Reference-Only Platform' }
      ]
    : [
        { icon: '⚖️', text: 'NY Lisanslı Avukat' },
        { icon: '🌐', text: 'TR/US İki Dilli Hukuk Referansı' },
        { icon: '📚', text: 'Yalnızca Referans Platformu' }
      ]

  return (
    <div className="border-y border-gray-200 py-4 mb-8">
      <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-gray-600">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
