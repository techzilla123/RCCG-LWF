"use client"

import type React from "react"

interface ServiceDetailsModalProps {
  isOpen: boolean
  service: {
    title: string
    imageSrc: string
    description: string
  } | null
  onClose: () => void
  onJoin: () => void
}

export const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({ isOpen, service, onClose, onJoin }) => {
  if (!isOpen || !service) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={service.imageSrc || "/placeholder.svg"}
            alt={service.title}
            className="w-full object-cover aspect-[16/9] rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{service.title}</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{service.description}</p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">What You'll Do</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Make a meaningful impact in your community</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Develop new skills and grow spiritually</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Connect with like-minded volunteers</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Receive specialized training and support</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onJoin}
              className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Join This Ministry
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-8 py-4 border border-gray-300 text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
