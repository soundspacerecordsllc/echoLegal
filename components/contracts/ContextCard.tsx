type ContextCardProps = {
  children: React.ReactNode
}

export default function ContextCard({ children }: ContextCardProps) {
  return (
    <div className="bg-gray-50 border-l-2 border-gray-200 px-6 py-5 my-8">
      <p className="text-gray-600 leading-relaxed text-base">
        {children}
      </p>
    </div>
  )
}
