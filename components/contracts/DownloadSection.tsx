type DownloadSectionProps = {
  lang: string
  title: string
  subtitle: string
  paidLabel: string
  freeLabel: string
  supportText: string
  stripeLink: string
  documentUrl: string
}

export default function DownloadSection({
  title,
  subtitle,
  paidLabel,
  freeLabel,
  supportText,
  stripeLink,
  documentUrl,
}: DownloadSectionProps) {
  return (
    <section className="my-12 py-10 px-6 md:px-8 bg-gray-50 rounded-lg border border-gray-100">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
          {title}
        </h2>
        <p className="text-gray-500 mb-8">
          {subtitle}
        </p>

        <div className="space-y-3">
          <a
            href={stripeLink}
            className="block w-full bg-gray-900 text-white py-3.5 px-6 rounded-lg font-medium text-base hover:bg-gray-800 transition-colors"
          >
            {paidLabel}
          </a>

          <a
            href={documentUrl}
            download
            className="block w-full bg-white text-gray-700 py-3.5 px-6 rounded-lg font-medium text-base border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            {freeLabel}
          </a>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          {supportText}
        </p>
      </div>
    </section>
  )
}
