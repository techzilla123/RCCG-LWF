"use client"

import type React from "react"
import { useState } from "react"
import { HeroSection } from "./HeroSection"
import { ServiceGrid } from "./ServiceGrid"
import { CallToActionSection } from "./CallToActionSection"
import { ServiceDetailsModal } from "./ServiceDetailsModal"
import { VolunteerFormModal } from "./volunteer-form-modal"
import { BenefitsModal } from "./BenefitsModal"
import type { VolunteerFormData } from "./volunteer-form"

interface Service {
  title: string
  imageSrc: string
  description: string
}

export const FindYourFit: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showVolunteerForm, setShowVolunteerForm] = useState(false)
  const [showBenefitsModal, setShowBenefitsModal] = useState(false)
  const [preselectedMinistry, setPreselectedMinistry] = useState<string>("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successName, setSuccessName] = useState("")

  const handleLearnMore = (service: Service) => {
    setSelectedService(service)
    setShowDetailsModal(true)
  }

  const handleJoinFromDetails = () => {
    setShowDetailsModal(false)
    setPreselectedMinistry(selectedService?.title || "")
    setShowVolunteerForm(true)
  }

  const handleStartServing = () => {
    setShowBenefitsModal(true)
  }

  const handleStartServingFromBenefits = () => {
    setShowBenefitsModal(false)
    setPreselectedMinistry("")
    setShowVolunteerForm(true)
  }

  const handleVolunteerFormSubmit = (data: VolunteerFormData) => {
    setSuccessName(data.fullName)
    setShowSuccessMessage(true)
    setShowVolunteerForm(false)
    setSelectedService(null)
    setPreselectedMinistry("")

    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 5000)
  }

  return (
    <main className="flex flex-col bg-white">
      <HeroSection />
      <ServiceGrid onLearnMore={handleLearnMore} />
      <CallToActionSection onStartServing={handleStartServing} />

      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg z-50 max-w-sm">
          <p className="text-green-700 font-semibold">Thank you for your interest, {successName}!</p>
          <p className="text-green-600 text-sm mt-1">We&apos;ll be in touch soon with more information.</p>
        </div>
      )}

      <ServiceDetailsModal
        isOpen={showDetailsModal}
        service={selectedService}
        onClose={() => setShowDetailsModal(false)}
        onJoin={handleJoinFromDetails}
      />

      <VolunteerFormModal
        isOpen={showVolunteerForm}
        preselectedMinistry={preselectedMinistry}
        showMinistrySelect={!preselectedMinistry}
        onClose={() => {
          setShowVolunteerForm(false)
          setSelectedService(null)
          setPreselectedMinistry("")
        }}
        onSubmit={handleVolunteerFormSubmit}
        title={preselectedMinistry ? `Join ${preselectedMinistry}` : "Join Our Volunteer Team"}
      />

      <BenefitsModal
        isOpen={showBenefitsModal}
        onClose={() => setShowBenefitsModal(false)}
        onStartServing={handleStartServingFromBenefits}
      />
    </main>
  )
}

export default FindYourFit
