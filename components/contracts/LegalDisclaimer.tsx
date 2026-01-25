type LegalDisclaimerProps = {
  text: string
}

export default function LegalDisclaimer({ text }: LegalDisclaimerProps) {
  return (
    <div className="my-8 py-4 px-5 bg-gray-50 rounded border border-gray-100">
      <p className="text-sm text-gray-500 leading-relaxed">
        {text}
      </p>
    </div>
  )
}
