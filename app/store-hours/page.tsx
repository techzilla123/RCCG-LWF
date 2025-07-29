"use client"
import React, { useState } from "react"
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Star } from 'lucide-react'
import Offer from "@/components/Offer"
import TopNavBar from "@/components/TopNavBar"
import Footer from "@/components/Footer"
import BotpressChat from "@/components/BotpressChat"

// UI Components
const Card = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <div
    className={`bg-white rounded-2xl shadow-md ${onClick ? "cursor-pointer" : ""} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
)

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-0 ${className}`}>{children}</div>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <h3
    className={`text-2xl font-semibold ${onClick ? "cursor-pointer" : ""} ${className}`}
    onClick={onClick}
  >
    {children}
  </h3>
)

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  disabled = false,
}: {
  children: React.ReactNode
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  const variants = {
    default: "bg-[#4F46E5] text-white hover:bg-[#4338CA] focus:ring-[#4F46E5]",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-[#4F46E5]",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400",
  }
  const sizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-xs",
    lg: "px-6 py-3 text-base",
  }
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

interface HoursSection {
  id: string
  title: string
  hours: { day: string; time: string }[]
}

const storeHours: HoursSection[] = [
  {
    id: "physical-store",
    title: "Party Place and Rentals Store",
    hours: [
      { day: "Monday", time: "11 AM – 6 PM" },
      { day: "Tuesday", time: "11 AM – 7 PM" },
      { day: "Wednesday", time: "11 AM – 7 PM" },
      { day: "Thursday", time: "11 AM – 7 PM" },
      { day: "Friday", time: "10 AM – 7 PM" },
      { day: "Saturday", time: "10 AM – 7 PM" },
      { day: "Sunday", time: "1:30 PM – 5:30 PM" },
      
    ],
  },
  {
    id: "online-service",
    title: "Online Service Hours",
    hours: [
      { day: "Monday", time: "Open 24 Hours" },
      { day: "Tuesday", time: "Open 24 Hours" },
      { day: "Wednesday", time: "Open 24 Hours" },
      { day: "Thursday", time: "Open 24 Hours" },
      { day: "Friday", time: "Open 24 Hours" },
      { day: "Saturday", time: "Open 24 Hours" },
      { day: "Sunday", time: "Open 24 Hours" },
      
    ],
  },
]

export default function StoreHoursPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(storeHours.map((section) => section.id))
  )

  const toggleSectionExpansion = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  return (
    <>
      <Offer />
      <TopNavBar />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-500 to-purple-600 text-white py-20 shadow-lg rounded-3xl">
        {/* Animated stars background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-100">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-5 place-items-center">
              {[...Array(60)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-white/50"
                  style={{ animation: "spin 10s linear infinite" }}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Glass overlay */}
        <div className="absolute inset-0 z-0 bg-white/5 backdrop-blur-[1px] rounded-3xl" />
        {/* Header Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            🕒 Party Place & Rentals Store Hours
          </h1>
          <p className="text-lg md:text-xl font-medium text-white/90 drop-shadow-sm">
            1919 Faithon P Lucas Sr. Blvd, #135, Mesquite, TX 75181
          </p>
        </div>
      </section>
      {/* Store Hours */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Hours</h2>
          <div className="space-y-8">
            {storeHours.map((section) => (
              <Card key={section.id} className="bg-gray-800 text-black overflow-hidden">
                <CardHeader className="flex items-center justify-between">
                  <CardTitle>{section.title}</CardTitle>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-gray-700 text-white hover:bg-gray-600"
                    onClick={() => toggleSectionExpansion(section.id)}
                  >
                    {expandedSections.has(section.id) ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </Button>
                </CardHeader>
                {expandedSections.has(section.id) && (
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {section.hours.map((hour, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
                        >
                          <span className="font-medium text-black text-lg">{hour.day}</span>
                          <span className="text-gray-800 text-lg">{hour.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
      <BotpressChat />
      <Footer />
    </>
  )
}
