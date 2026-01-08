"use client"

import type React from "react"

interface ServiceDetailsModalProps {
  isOpen: boolean
  service: {
    title: string
    imageSrc: string
    description: string
    fullDescription: string
    responsibilities: string[]
  } | null
  onClose: () => void
  onJoin: () => void
}

export const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({
  isOpen,
  service,
  onClose,
  onJoin,
}) => {
  if (!isOpen || !service) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <h2 className="text-4xl font-bold mb-6">{service.title}</h2>

          <p className="text-lg text-gray-700 whitespace-pre-line mb-8">
            {service.fullDescription}
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">
              What You&apos;ll Do
            </h3>

            <ul className="space-y-3">
              {service.responsibilities.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onJoin}
              className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold"
            >
              Join This Ministry
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-8 py-4 border rounded-full font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
