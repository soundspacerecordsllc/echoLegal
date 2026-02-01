'use client'

import { useState } from 'react'
import DownloadModal from './DownloadModal'

type DownloadSectionProps = {
  lang: string
  dict: any
  stripePaymentLink: string
  documentUrl: string
}

export default function DownloadSection({
  lang,
  dict,
  stripePaymentLink,
  documentUrl
}: DownloadSectionProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        <h2 className="font-serif text-xl font-semibold text-center mb-2 text-gray-900">
          {dict.contract.downloadTitle}
        </h2>

        <p className="text-center text-gray-500 text-sm mb-8">
          {dict.contract.downloadSubtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Contribution Option */}
          <div className="p-5 border border-gray-200 rounded-lg bg-gray-50">
            <a
              href={stripePaymentLink}
              className="block w-full bg-gray-900 text-white text-center py-3.5 px-4 text-sm font-semibold rounded hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
            >
              {dict.contract.canAfford}
            </a>
            <p className="text-center text-xs text-gray-500 mt-3 leading-relaxed">
              {dict.contract.canAffordSub}
            </p>
          </div>

          {/* Free Option */}
          <div className="p-5 border border-gray-200 rounded-lg bg-white">
            <button
              onClick={() => setShowModal(true)}
              className="block w-full bg-white text-gray-900 text-center py-3.5 px-4 text-sm font-semibold border border-gray-300 rounded hover:border-gray-500 hover:bg-gray-50 transition-all"
            >
              {dict.contract.cannotAfford}
            </button>
            <p className="text-center text-xs text-gray-500 mt-3 leading-relaxed">
              {dict.contract.cannotAffordSub}
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <DownloadModal
          dict={dict}
          documentUrl={documentUrl}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
