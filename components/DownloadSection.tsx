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
      <div className="max-w-3xl mx-auto my-12 p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-legal-gray-light">
        <h2 className="font-serif text-3xl font-bold text-center mb-4 text-legal-navy">
          {dict.contract.downloadTitle}
        </h2>
        
        <p className="text-center text-legal-gray mb-8">
          {dict.contract.downloadSubtitle}
        </p>

        {/* Paid Option */}
        <div className="mb-6">
          <a
            href={stripePaymentLink}
            className="block w-full bg-legal-gold text-white text-center py-4 px-6 rounded-lg font-semibold text-lg hover:bg-legal-gold-light transition-all hover:shadow-lg"
          >
            💳 {dict.contract.canAfford}
          </a>
          <p className="text-center text-sm text-legal-gray mt-2">
            {dict.contract.canAffordSub}
          </p>
        </div>

        {/* Free Option */}
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="block w-full bg-legal-navy text-white text-center py-4 px-6 rounded-lg font-semibold text-lg hover:bg-legal-navy-light transition-all hover:shadow-lg"
          >
            📄 {dict.contract.cannotAfford}
          </button>
          <p className="text-center text-sm text-legal-gray mt-2">
            {dict.contract.cannotAffordSub}
          </p>
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
