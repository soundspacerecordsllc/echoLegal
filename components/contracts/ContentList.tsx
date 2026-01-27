type ContentListProps = {
  items: string[]
  variant?: 'check' | 'bullet' | 'number'
}

export default function ContentList({ items, variant = 'check' }: ContentListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          {variant === 'check' && (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
              <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
          {variant === 'bullet' && (
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 mt-2.5" />
          )}
          {variant === 'number' && (
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500 mt-0.5">
              {i + 1}
            </span>
          )}
          <span className="text-gray-600 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}
