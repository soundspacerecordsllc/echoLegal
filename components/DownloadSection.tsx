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
      <div className="max-w-2xl mx-auto my-12 p-8 bg-gray-50 border border-gray-200">
        <h2 className="font-serif text-xl font-semibold text-center mb-2 text-gray-900">
          {dict.contract.downloadTitle}
        </h2>

        <p className="text-center text-gray-500 text-sm mb-8">
          {dict.contract.downloadSubtitle}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Contribution Option */}
          <div className="p-4 border border-gray-200 bg-white">
            <a
              href={stripePaymentLink}
              className="block w-full bg-gray-900 text-white text-center py-3 px-4 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              {dict.contract.canAfford}
            </a>
            <p className="text-center text-xs text-gray-500 mt-2">
              {dict.contract.canAffordSub}
            </p>
          </div>

          {/* Free Option */}
          <div className="p-4 border border-gray-200 bg-white">
            <button
              onClick={() => setShowModal(true)}
              className="block w-full bg-white text-gray-900 text-center py-3 px-4 text-sm font-medium border border-gray-300 hover:border-gray-400 transition-colors"
            >
              {dict.contract.cannotAfford}
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">
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
