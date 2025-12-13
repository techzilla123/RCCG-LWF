"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface MinistryModalProps {
  isOpen: boolean
  onClose: () => void
  title: React.ReactNode
  description: string
  fullDetails: string
  buttonColor: string
}

export const MinistryModal: React.FC<MinistryModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  fullDetails,
  buttonColor,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    dateOfBirth: "",
  })


  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onloadend = () => setPreview(reader.result as string)
  reader.readAsDataURL(file)
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: "1992-08-10",
      ministry: title,
      role: "Member",
      notes: formData.message,
      status: "Active",
      ...(preview && { image: preview }),
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/public/member-applications`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )

    if (!response.ok) throw new Error("Submission failed")

    alert("Thank you for your interest! We'll be in touch soon.")
    onClose()
  } catch {
    alert("Something went wrong. Please try again.")
  } finally {
    setIsSubmitting(false)
  }
}


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          <div className="fixed inset-0 z-[101] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white 
                  shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>

                <div className="overflow-y-auto max-h-[85vh] p-6 sm:p-8 md:p-12">
                  
                  {/* Header */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 mb-3 md:mb-4">
                    {title}
                  </h2>
                  <p className="text-lg sm:text-xl text-slate-600">{description}</p>

                  {/* Full Details */}
                  <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">About This Ministry</h3>
                    <p className="text-slate-700 whitespace-pre-line">{fullDetails}</p>
                  </div>

                  {/* FORM */}
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Join This Ministry</h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      
                      {/* Upload Section */}
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center">
                          {preview ? (
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-gray-400 text-4xl">+</span>
                          )}
                        </div>

                        <label className="cursor-pointer px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100 transition">
                          Upload Photo
                          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>

                        <p className="text-xs text-gray-500">JPG, PNG or GIF. Max 10MB</p>
                      </div>

                      {/* Inputs */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
  <label className="block text-sm font-semibold mb-2">Date of Birth *</label>
  <input
    type="date"
    name="dateOfBirth"
    required
    value={formData.dateOfBirth}
    onChange={handleChange}
    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors"
  />
</div>


                      <div>
                        <label className="block text-sm font-semibold mb-2">Why do you want to join?</label>
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full ${buttonColor} text-white py-4 rounded-full font-bold text-lg shadow-xl transition-all`}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </motion.button>

                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
