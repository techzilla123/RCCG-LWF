"use client"

import type React from "react"

interface BenefitsModalProps {
  isOpen: boolean
  onClose: () => void
  onStartServing: () => void
}

export const BenefitsModal: React.FC<BenefitsModalProps> = ({ isOpen, onClose, onStartServing }) => {
  if (!isOpen) return null

  const benefits = [
    {
      title: "Spiritual Growth",
      description: "Deepen your faith and connection with God through meaningful service.",
    },
    {
      title: "Community Connection",
      description: "Build lasting relationships with like-minded volunteers and church members.",
    },
    {
      title: "Skill Development",
      description: "Learn new skills and gain valuable experience in a supportive environment.",
    },
    {
      title: "Make a Difference",
      description: "Directly impact lives and contribute to your community's wellbeing.",
    },
    {
      title: "Flexible Opportunities",
      description: "Choose from in-person or digital serving options that fit your schedule.",
    },
    {
      title: "Professional Training",
      description: "Receive specialized training to help you feel confident in your role.",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-3xl font-bold">Benefits of Serving</h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-2 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-gray-700 leading-relaxed">
              Whether you attend a location or entirely online, there&apos;s a role out there for you! We offer specialized
              training so you can always feel confident each time you serve. Join our community of volunteers making a
              real difference.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onStartServing}
              className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Start Serving Now
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
