"use client"

import type React from "react"
import { useState } from "react"

interface VolunteerFormProps {
  preselectedMinistry?: string
  onSubmit: (data: VolunteerFormData) => void
  onCancel: () => void
  showMinistrySelect?: boolean
}

export interface VolunteerFormData {
  image: File | null
  fullName: string
  email: string
  phoneNumber: string
  serviceMinistry: string
  role: string
}

const ministries = [
  "Host Team",
  "LifeKids",
  "Operations Team",
  "Tech & Worship Team",
  "Switch",
  "Community",
  "Central Offices",
  "Life.Church Online",
]

export const VolunteerForm: React.FC<VolunteerFormProps> = ({
  preselectedMinistry,
  onSubmit,
  onCancel,
  showMinistrySelect = false,
}) => {
  const [formData, setFormData] = useState<VolunteerFormData>({
    image: null,
    fullName: "",
    email: "",
    phoneNumber: "",
    serviceMinistry: preselectedMinistry || "",
    role: "",
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.serviceMinistry || !formData.role) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/public/volunteer-applications`

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phoneNumber,
          preferredDepartment: formData.serviceMinistry,
          role: formData.role,
          ...(imagePreview && { image: imagePreview }),
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      const result = await response.json()
      console.log("[v0] API response:", result)
      onSubmit(formData)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit application"
      console.error("[v0] Submission error:", errorMessage)
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Volunteer Photo</label>
        <div className="flex gap-4 items-start">
          {imagePreview && (
            <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-24 h-24 rounded-lg object-cover" />
          )}
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isLoading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
            />
            <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF (max. 5MB)</p>
          </div>
        </div>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          disabled={isLoading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          disabled={isLoading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          required
        />
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number *</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          disabled={isLoading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          required
        />
      </div>

      {/* Service Ministry */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Service Ministry {showMinistrySelect ? "*" : ""}
        </label>
        <select
          name="serviceMinistry"
          value={formData.serviceMinistry}
          onChange={handleChange}
          disabled={(!showMinistrySelect && !!preselectedMinistry) || isLoading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          required={showMinistrySelect}
        >
          <option value="">{preselectedMinistry ? preselectedMinistry : "Select a ministry"}</option>
          {showMinistrySelect &&
            ministries.map((ministry) => (
              <option key={ministry} value={ministry}>
                {ministry}
              </option>
            ))}
        </select>
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Role *</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="e.g., Team Lead, Volunteer, Coordinator"
          disabled={isLoading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Submitting..." : "Submit Application"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
