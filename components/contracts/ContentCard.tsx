type ContentCardProps = {
  title: string
  children: React.ReactNode
  variant?: 'default' | 'highlight'
}

export default function ContentCard({ title, children, variant = 'default' }: ContentCardProps) {
  const baseClasses = 'rounded-lg p-6 md:p-8 mb-6'
  const variantClasses = variant === 'highlight'
    ? 'bg-amber-50/50 border border-amber-200'
    : 'bg-white border border-gray-200'

  return (
    <section className={`${baseClasses} ${variantClasses}`}>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-5 tracking-tight">
        {title}
      </h2>
      <div className="text-gray-600 leading-relaxed">
        {children}
      </div>
    </section>
  )
}
