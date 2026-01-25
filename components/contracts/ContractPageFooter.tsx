type ContractPageFooterProps = {
  disclaimerText: string
}

export default function ContractPageFooter({ disclaimerText }: ContractPageFooterProps) {
  return (
    <footer className="border-t border-gray-100 mt-16">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-xs text-gray-400 leading-relaxed">
          {disclaimerText}
        </p>
        <p className="text-xs text-gray-400 mt-4">
          © 2025 EchoLegal
        </p>
      </div>
    </footer>
  )
}
