'use client'

import { useState } from 'react'

type DownloadModalProps = {
  dict: any
  documentUrl: string
  onClose: () => void
}

export default function DownloadModal({ dict, documentUrl, onClose }: DownloadModalProps) {
  const [acknowledged, setAcknowledged] = useState(false)

  const handleDownload = () => {
    if (!acknowledged) {
      alert(dict.modal.acknowledgeCheckbox)
      return
    }
    
    // Trigger download
    window.location.href = documentUrl
    onClose()
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white max-w-2xl w-full rounded-xl p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-gray-600"
        >
          ×
        </button>

        <h3 className="font-serif text-2xl font-bold text-legal-navy mb-4">
          {dict.modal.freeDownloadTitle}
        </h3>

        <p className="text-legal-gray mb-4">
          {dict.modal.acknowledgeBefore}
        </p>

        <ul className="space-y-2 mb-6 text-legal-gray">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{dict.modal.point1}</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{dict.modal.point2}</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{dict.modal.point3}</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>{dict.modal.point4}</span>
          </li>
        </ul>

        <label className="flex items-start mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="mt-1 mr-3 w-5 h-5"
          />
          <span className="text-legal-gray">
            {dict.modal.acknowledgeCheckbox}
          </span>
        </label>

        <button
          onClick={handleDownload}
          disabled={!acknowledged}
          className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
            acknowledged
              ? 'bg-legal-gold text-white hover:bg-legal-gold-light'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {dict.modal.download}
        </button>
      </div>
    </div>
  )
}
