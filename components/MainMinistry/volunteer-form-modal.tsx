"use client"

import type React from "react"
import { VolunteerForm, type VolunteerFormData } from "./volunteer-form"

interface VolunteerFormModalProps {
  isOpen: boolean
  preselectedMinistry?: string
  showMinistrySelect?: boolean
  onClose: () => void
  onSubmit: (data: VolunteerFormData) => void
  title?: string
}

export const VolunteerFormModal: React.FC<VolunteerFormModalProps> = ({
  isOpen,
  preselectedMinistry,
  showMinistrySelect = false,
  onClose,
  onSubmit,
  title = "Join Our Volunteer Team",
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <VolunteerForm
            preselectedMinistry={preselectedMinistry}
            showMinistrySelect={showMinistrySelect}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  )
}
