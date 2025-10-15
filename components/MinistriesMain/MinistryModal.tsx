"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface MinistryModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
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
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for your interest! We'll be in touch soon.")
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
                {/* Close button */}
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
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6 md:mb-8"
                  >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 mb-3 md:mb-4 text-balance">
                      {title}
                    </h2>
                    <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">{description}</p>
                  </motion.div>

                  {/* Full Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 md:mb-8 p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 md:mb-4">About This Ministry</h3>
                    <div className="text-base sm:text-lg text-slate-700 leading-relaxed whitespace-pre-line">
                      {fullDetails}
                    </div>
                  </motion.div>

                  {/* Join Form */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 md:p-8"
                  >
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 md:mb-6">Join This Ministry</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                          focus:outline-none transition-colors text-base"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                          focus:outline-none transition-colors text-base"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                          focus:outline-none transition-colors text-base"
                          placeholder="(123) 456-7890"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                          Why do you want to join? (Optional)
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 
                          focus:outline-none transition-colors resize-none text-base"
                          placeholder="Tell us a bit about yourself..."
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className={`w-full ${buttonColor} text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full 
                        font-bold text-base sm:text-lg shadow-xl transition-all duration-300`}
                      >
                        Submit Application
                      </motion.button>
                    </form>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
