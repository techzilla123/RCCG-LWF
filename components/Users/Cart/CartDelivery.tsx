"use client"

import { useState, useEffect, useRef } from "react"
import type { google } from "google-maps"

declare global {
  interface Window {
    initGoogleMaps: () => void
  }
}

// 1. Define the LocationInfo type
type LocationInfo = {
  country: string
  city: string
  deliveryDate: string
  deliveryTime: string
  address: string
  postalCode: string
  specialInstructions: string
  pickupLocation: string
  pickupDate: string
  pickupTime: string
  phoneNumber: string
}

// 2. Define the delivery methods
type DeliveryMethod = "pickup" | "local" | "shipping"

// 3. Define defaultLocations with proper typing
const defaultLocations: Record<DeliveryMethod, LocationInfo> = {
  pickup: {
    country: "USA",
    city: "Houston, Texas",
    deliveryDate: "",
    deliveryTime: "",
    address: "",
    postalCode: "",
    specialInstructions: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    phoneNumber: "",
  },
  local: {
    country: "USA",
    city: "Houston, Texas",
    deliveryDate: "",
    deliveryTime: "",
    address: "",
    postalCode: "",
    specialInstructions: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    phoneNumber: "",
  },
  shipping: {
    country: "USA",
    city: "Houston, Texas",
    deliveryDate: "",
    deliveryTime: "",
    address: "",
    postalCode: "",
    specialInstructions: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    phoneNumber: "",
  },
}

// Global flag to track if Google Maps is loaded
let isGoogleMapsLoaded = false
let isGoogleMapsLoading = false

interface DeliveryOptionsProps {
  onSave?: () => void
}

const DeliveryOptions = ({ onSave }: DeliveryOptionsProps) => {
  const savedMethod =
    typeof window !== "undefined" ? (localStorage.getItem("deliveryMethod") as DeliveryMethod) || "pickup" : "pickup"

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(savedMethod)
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const addressInputRef = useRef<HTMLInputElement>(null)
  const [isGoogleMapsReady, setIsGoogleMapsReady] = useState(false)
  const [showShippingRecommendation, setShowShippingRecommendation] = useState(false)

  const savedLocation = typeof window !== "undefined" ? localStorage.getItem("deliveryLocation") : null

  const [location, setLocation] = useState<LocationInfo>(
    savedLocation ? JSON.parse(savedLocation) : defaultLocations[savedMethod],
  )

  // Check if we should show shipping recommendation
  useEffect(() => {
    const errorMessage = localStorage.getItem("deliveryError")
    if (errorMessage && errorMessage.includes("50-mile")) {
      setShowShippingRecommendation(true)
    }
  }, [])

  // Load Google Maps API only once
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.google && window.google.maps && window.google.maps.places) {
        isGoogleMapsLoaded = true
        setIsGoogleMapsReady(true)
        return
      }

      if (!isGoogleMapsLoading && !isGoogleMapsLoaded) {
        isGoogleMapsLoading = true
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places&callback=initGoogleMaps`
        script.async = true
        script.defer = true

        // Add callback function to window
        window.initGoogleMaps = () => {
  isGoogleMapsLoaded = true
  isGoogleMapsLoading = false
  setIsGoogleMapsReady(true)
}


        document.head.appendChild(script)
      }
    }
  }, [])

  // Initialize autocomplete for local delivery
  useEffect(() => {
    if (deliveryMethod === "local" && addressInputRef.current && isGoogleMapsReady && !autocomplete) {
      const autocompleteInstance = new window.google.maps.places.Autocomplete(addressInputRef.current, {
        types: ["address"],
        componentRestrictions: { country: "us" },
      })

      autocompleteInstance.addListener("place_changed", () => {
        const place = autocompleteInstance.getPlace()
        if (place.formatted_address) {
          handleLocationChange("address", place.formatted_address)

          // Extract postal code if available
          const postalCodeComponent = place.address_components?.find((component) =>
            component.types.includes("postal_code"),
          )
          if (postalCodeComponent) {
            handleLocationChange("postalCode", postalCodeComponent.long_name)
          }
        }
      })

      setAutocomplete(autocompleteInstance)
    }

    return () => {
      if (autocomplete) {
        window.google?.maps?.event?.clearInstanceListeners(autocomplete)
      }
    }
  }, [deliveryMethod, isGoogleMapsReady, autocomplete])

  useEffect(() => {
    localStorage.setItem("deliveryLocation", JSON.stringify(location))
  }, [location])

  useEffect(() => {
    localStorage.setItem("deliveryMethod", deliveryMethod)
    setLocation(defaultLocations[deliveryMethod])

    // Clear shipping recommendation when method changes
    if (deliveryMethod === "shipping") {
      setShowShippingRecommendation(false)
    }

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("deliveryMethodChanged"))
  }, [deliveryMethod])

  const handleLocationChange = (key: keyof LocationInfo, value: string) => {
    setLocation((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const validateRequiredFields = (): boolean => {
    const requiredFieldsMap: Record<DeliveryMethod, string[]> = {
      pickup: ["pickupDate", "pickupTime", "phoneNumber"],
      local: ["deliveryDate", "deliveryTime", "address", "postalCode", "phoneNumber"],
      shipping: ["address", "postalCode", "phoneNumber"],
    }

    const requiredFields = requiredFieldsMap[deliveryMethod]

    return requiredFields.every((field) => {
      const value = location[field as keyof LocationInfo]
      return value && value.toString().trim() !== ""
    })
  }

  const handleSave = () => {
    if (validateRequiredFields()) {
      // Save to localStorage
      localStorage.setItem("deliveryLocation", JSON.stringify(location))
      localStorage.setItem("deliveryMethod", deliveryMethod)

      // Clear any delivery errors
      localStorage.removeItem("deliveryError")

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("deliveryMethodChanged"))

      // Call the onSave callback if provided
      if (onSave) {
        onSave()
      }
    } else {
      alert("Please fill in all required fields before saving.")
    }
  }

  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold text-black mb-3">Choose Delivery Method</h3>

      {showShippingRecommendation && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
          <div className="flex items-center">
            <span className="text-lg mr-2">⚠️</span>
            <div>
              <strong>Shipping Recommended:</strong>
              <br />
              Your delivery address exceeds our 50-mile local delivery limit. Please select &quot;Shipping&quot; to continue.
            </div>
          </div>
        </div>
      )}

      {/* Delivery Method Options */}
      <div className="flex justify-between gap-4">
        {[
          {
            method: "pickup",
            label: "Pickup",
            icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          },
          {
            method: "local",
            label: "Local Delivery",
            icon: "/Branded_Van__1_-removebg-preview.png",
          },
          {
            method: "shipping",
            label: "Shipping",
            icon: "https://cdn-icons-png.flaticon.com/512/1239/1239525.png",
          },
        ].map(({ method, label, icon }) => (
          <button
            key={method}
            onClick={() => setDeliveryMethod(method as DeliveryMethod)}
            className={`flex-1 border border-gray-300 rounded-xl p-3 flex flex-col items-center hover:shadow-md ${
              deliveryMethod === method ? "border-black shadow-lg" : ""
            } ${showShippingRecommendation && method === "shipping" ? "border-green-500 bg-green-50 shadow-lg" : ""}`}
          >
            <img src={icon || "/placeholder.svg"} alt={label} className="w-10 h-10 mb-2" />
            <span className="text-sm text-black font-medium">
              {label}
              {showShippingRecommendation && method === "shipping" && (
                <span className="block text-xs text-green-600 mt-1">✓ Recommended</span>
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Pickup Details */}
      {deliveryMethod === "pickup" && (
        <div className="mt-6">
          <h3 className="text-base font-semibold text-black">Pickup Location</h3>
          <div className="mt-2">
            <p className="text-sm text-black">
              <strong>Address:</strong> 1919 Faithon P Lucas Sr. Blvd, #135, Mesquite TX 75181
            </p>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Pickup Date *</label>
            <input
              type="date"
              value={location.pickupDate}
              onChange={(e) => handleLocationChange("pickupDate", e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Pickup Time *</label>
            <input
              type="time"
              value={location.pickupTime}
              onChange={(e) => handleLocationChange("pickupTime", e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Phone Number *</label>
            <input
              type="tel"
              value={location.phoneNumber}
              onChange={(e) => handleLocationChange("phoneNumber", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>
      )}

      {/* Local Delivery Details */}
      {deliveryMethod === "local" && (
        <div className="mt-6">
          <h3 className="text-base font-semibold text-black">Local Delivery</h3>
          <div className="mt-2">
            <label className="block text-sm font-medium">Delivery Date *</label>
            <input
              type="date"
              value={location.deliveryDate}
              onChange={(e) => handleLocationChange("deliveryDate", e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Delivery Time *</label>
            <input
              type="time"
              value={location.deliveryTime}
              onChange={(e) => handleLocationChange("deliveryTime", e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Delivery Address *</label>
            <input
              ref={addressInputRef}
              type="text"
              value={location.address}
              onChange={(e) => handleLocationChange("address", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Start typing your address..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">Address suggestions will appear as you type</p>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Phone Number *</label>
            <input
              type="tel"
              value={location.phoneNumber}
              onChange={(e) => handleLocationChange("phoneNumber", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Zip Code *</label>
            <input
              type="text"
              value={location.postalCode}
              onChange={(e) => handleLocationChange("postalCode", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Enter Zip code"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Special Instructions</label>
            <textarea
              value={location.specialInstructions}
              onChange={(e) => handleLocationChange("specialInstructions", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Any special instructions?"
            />
          </div>
        </div>
      )}

      {/* Shipping Details */}
      {deliveryMethod === "shipping" && (
        <div className="mt-6">
          <h3 className="text-base font-semibold text-black">Shipping Information</h3>
          {showShippingRecommendation && (
            <div className="mb-4 p-2 bg-green-100 border border-green-300 text-green-700 rounded text-sm">
              ✅ Great choice! Shipping is available in everywhere USA with no distance restrictions.
            </div>
          )}
          <div className="mt-2">
            <label className="block text-sm font-medium">Shipping Address *</label>
            <input
              type="text"
              value={location.address}
              onChange={(e) => handleLocationChange("address", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Enter shipping address"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Zip Code *</label>
            <input
              type="text"
              value={location.postalCode}
              onChange={(e) => handleLocationChange("postalCode", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Enter Zip code"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Phone Number *</label>
            <input
              type="tel"
              value={location.phoneNumber}
              onChange={(e) => handleLocationChange("phoneNumber", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Special Instructions</label>
            <textarea
              value={location.specialInstructions}
              onChange={(e) => handleLocationChange("specialInstructions", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Any special instructions?"
            />
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Save Delivery Information
        </button>
      </div>
    </div>
  )
}

export default DeliveryOptions
