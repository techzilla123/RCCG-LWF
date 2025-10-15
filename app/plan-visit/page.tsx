"use client"

import type React from "react"
import ChurchHeader from "@/components/Header/ChurchHeader"
import Footer from '@/components/Footer/Footer';


import { useState } from "react"
import { MapPin, Clock, Phone, Mail, Car, Users } from "lucide-react"

const Button = ({
  children,
  onClick,
  className = "",
  size = "default",
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  size?: "default" | "lg"
}) => {
  const sizeClasses = size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"
  return (
    <button onClick={onClick} className={`${sizeClasses} rounded-lg font-semibold transition-colors ${className}`}>
      {children}
    </button>
  )
}

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onKeyPress,
  className = "",
}: {
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  className?: string
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      className={`px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    />
  )
}

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <div className={`bg-white rounded-xl border border-slate-200 ${className}`}>{children}</div>
}

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return <div className={className}>{children}</div>
}

export default function PlanVisitPage() {
  const [userAddress, setUserAddress] = useState("")
  const [showMap, setShowMap] = useState(false)

  const churchAddress = "8485 MICHAEL TALTY AVE, TERRELL, TX 75160, UNITED STATES"
  const churchAddressEncoded = encodeURIComponent(churchAddress)

  const handleGetDirections = () => {
    if (userAddress.trim()) {
      setShowMap(true)
    }
  }

  const getMapUrl = () => {
    if (userAddress.trim()) {
      const origin = encodeURIComponent(userAddress)
      return `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${origin}&destination=${churchAddressEncoded}&mode=driving`
    }
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${churchAddressEncoded}&zoom=15`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    
    <ChurchHeader/>  {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Plan Your Visit</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto text-pretty">
            We are excited to welcome you! Find directions, service times, and everything you need to know for your first
            visit.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Directions Section */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl md:text-3xl font-bold">Get Directions</h2>
            </div>

            <div className="mb-6">
              <p className="text-lg text-slate-700 mb-4">Enter your address to get directions to our church:</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Enter your starting address"
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleGetDirections()}
                  className="flex-1 text-base"
                />
                <Button
                  onClick={handleGetDirections}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                  size="lg"
                >
                  Get Directions
                </Button>
              </div>
            </div>

            {/* Church Address */}
            <div className="bg-slate-50 p-4 rounded-lg mb-6">
              <p className="font-semibold text-slate-900 mb-1">RCCG LWF FOR EVERYONE</p>
              <p className="text-slate-700">{churchAddress}</p>
            </div>

            {/* Google Map */}
            <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border-2 border-slate-200">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={getMapUrl()}
              />
            </div>
          </CardContent>
        </Card>

        {/* Service Times & Info Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Service Times */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold">Service Times</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="font-semibold text-slate-700">Sunday Worship</span>
                  <span className="text-slate-600">9:00 AM - 11:30 AM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="font-semibold text-slate-700">Bible Study</span>
                  <span className="text-slate-600">Wednesday 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-slate-700">Prayer Meeting</span>
                  <span className="text-slate-600">Friday 6:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold">Contact Us</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-slate-600 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-700">Phone</p>
                    <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                      (123) 456-7890
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-slate-600 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-700">Email</p>
                    <a href="mailto:info@rccglwf.org" className="text-blue-600 hover:underline">
                      info@rccglwf.org
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-600 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-700">Address</p>
                    <p className="text-slate-600 text-sm">
                      8485 Michael Talty Ave
                      <br />
                      Terrell, TX 75160
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What to Expect */}
        <Card className="shadow-lg mb-8">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-bold">What to Expect</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg text-slate-900 mb-2">Dress Code</h4>
                <p className="text-slate-600">
                  Come as you are! We welcome casual and formal attire. The most important thing is that you feel
                  comfortable.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-slate-900 mb-2">Childrens Ministry</h4>
                <p className="text-slate-600">
                  We offer age-appropriate programs for children during our Sunday service. Your kids will love it!
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-slate-900 mb-2">Service Length</h4>
                <p className="text-slate-600">
                  Our Sunday worship service typically lasts about 2.5 hours, including worship, teaching, and
                  fellowship time.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-slate-900 mb-2">First-Time Visitors</h4>
                <p className="text-slate-600">
                  Look for our welcome team at the entrance. They will help you find your way and answer any questions you
                  have.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parking Info */}
        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Car className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-bold">Parking Information</h3>
            </div>
            <p className="text-slate-600 text-lg">
              We have ample free parking available on-site. Our parking lot is located directly in front of the church
              building. Accessible parking spaces are available near the main entrance. Parking attendants are available
              on Sunday mornings to help direct you to available spots.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer/>
    </div>
  )
}
