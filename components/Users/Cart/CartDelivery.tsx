"use client"

import { useState, useEffect, useRef } from "react"
import type { google } from "google-maps"

declare global {
  interface Window {
    initGoogleMaps: () => void
  }
}

// Updated LocationInfo type to include return fields
type LocationInfo = {
  country: string
  city: string
  deliveryDate: string
  deliveryTime: string
  address: string
  postalCode: string
  specialInstructions: string
  specialInstructionsr: string
  pickupLocation: string
  pickupDate: string
  pickupTime: string
  phoneNumber: string
  returnDate: string
  returnTime: string
}

type DeliveryMethod = "pickup" | "local" | "shipping"

// Updated defaultLocations with return fields
const defaultLocations: Record<DeliveryMethod, LocationInfo> = {
  pickup: {
    country: "USA",
    city: "Houston, Texas",
    deliveryDate: "",
    deliveryTime: "",
    address: "",
    postalCode: "",
    specialInstructions: "",
    specialInstructionsr: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    phoneNumber: "",
    returnDate: "",
    returnTime: "",
  },
  local: {
    country: "USA",
    city: "Houston, Texas",
    deliveryDate: "",
    deliveryTime: "",
    address: "",
    postalCode: "",
    specialInstructions: "",
    specialInstructionsr: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    phoneNumber: "",
    returnDate: "",
    returnTime: "",
  },
  shipping: {
    country: "USA",
    city: "Houston, Texas",
    deliveryDate: "",
    deliveryTime: "",
    address: "",
    postalCode: "",
    specialInstructions: "",
    specialInstructionsr: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    phoneNumber: "",
    returnDate: "",
    returnTime: "",
  },
}

// Helper function to validate if a time is within allowed hours
const isTimeWithinAllowedHours = (time: string, date: string, type: "delivery" | "pickup" | "return"): boolean => {
  if (!time || !date) return false

  // const selectedDate = new Date(date)

  const getDayOfWeek = (dateStr: string): number => {
    if (!dateStr) return -1
    const [year, month, day] = dateStr.split("-").map(Number)
    // new Date(year, monthIndex, day) is LOCAL without timezone shifting
    const localDate = new Date(year, month - 1, day)
    return localDate.getDay()
  }

  const dayOfWeek = getDayOfWeek(date)

  const [hours, minutes] = time.split(":").map(Number)
  const timeInMinutes = hours * 60 + minutes

  if (type === "delivery") {
    if (dayOfWeek === 0) {
      // Sunday: 2pm - 7pm
      return timeInMinutes >= 14 * 60 && timeInMinutes <= 19 * 60
    } else {
      // Mon-Sat: 10am - 9pm
      return timeInMinutes >= 10 * 60 && timeInMinutes <= 21 * 60
    }
  } else if (type === "pickup" || type === "return") {
    if (dayOfWeek === 0) {
      // Sunday: 2pm - 7pm
      return timeInMinutes >= 14 * 60 && timeInMinutes <= 19 * 60
    } else {
      // Mon-Sat: 11am - 7pm
      return timeInMinutes >= 11 * 60 && timeInMinutes <= 19 * 60
    }
  }

  return false
}

// Helper function to get time range text for display
const getTimeRangeText = (date: string, type: "delivery" | "pickup" | "return"): string => {
  if (!date) return ""

  // const selectedDate = new Date(date)
  const getDayOfWeek = (dateStr: string): number => {
    if (!dateStr) return -1
    const [year, month, day] = dateStr.split("-").map(Number)
    // new Date(year, monthIndex, day) is LOCAL without timezone shifting
    const localDate = new Date(year, month - 1, day)
    return localDate.getDay()
  }

  const dayOfWeek = getDayOfWeek(date)

  if (type === "delivery") {
    return dayOfWeek === 0 ? "2:00 PM - 7:00 PM" : "10:00 AM - 9:00 PM"
  } else if (type === "pickup" || type === "return") {
    return dayOfWeek === 0 ? "2:00 PM - 7:00 PM" : "11:00 AM - 7:00 PM"
  }

  return ""
}

// Convert "2:00 PM - 7:00 PM" → { min: "14:00", max: "19:00" }
const getTimeRangeValues = (
  date: string,
  type: "delivery" | "pickup" | "return",
): { min: string; max: string } | null => {
  if (!date) return null

  const textRange = getTimeRangeText(date, type)
  if (!textRange) return null

  const [start, end] = textRange.split(" - ")

  const to24Hour = (timeStr: string): string => {
    const [time, modifier] = timeStr.split(" ")
    let [hours] = time.split(":").map(Number) // hours = 12
    const [, minutes] = time.split(":").map(Number) // minutes = 45

    if (modifier.toLowerCase() === "pm" && hours !== 12) hours += 12
    if (modifier.toLowerCase() === "am" && hours === 12) hours = 0

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
  }

  return {
    min: to24Hour(start),
    max: to24Hour(end),
  }
}

// Generate array of time options in 15-min increments (filters past times)
const generateTimeSlots = (date: string, type: "delivery" | "pickup" | "return", interval = 15): string[] => {
  if (!date) return []

  const range = getTimeRangeValues(date, type)
  if (!range) return []

  const slots: string[] = []
  const current = new Date(date + "T" + range.min)
  const end = new Date(date + "T" + range.max)

  const now = new Date()
  const todayStr = now.toISOString().split("T")[0] // e.g. "2025-08-20"

  while (current <= end) {
    const hh = current.getHours().toString().padStart(2, "0")
    const mm = current.getMinutes().toString().padStart(2, "0")
    const slot = `${hh}:${mm}`

    // ✅ Only push if slot is not in the past
    if (date > todayStr || current.getTime() >= now.getTime()) {
      slots.push(slot)
    }

    current.setMinutes(current.getMinutes() + interval)
  }

  return slots
}

// Helper function to calculate pricing multiplier based on days
const calculateRentalMultiplier = (
  startDate: string,
  startTime: string,
  returnDate: string,
  returnTime: string,
): number => {
  if (!startDate || !startTime || !returnDate || !returnTime) return 1

  const startDateTime = new Date(`${startDate}T${startTime}:00`)
  const returnDateTime = new Date(`${returnDate}T${returnTime}:00`)

  const diffInHours = (returnDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60)
  const diffInDays = Math.floor(diffInHours / 24)

  // Base price for same day or up to 24 hours
  if (diffInHours <= 24) return 1

  // Beyond 1 day: x2, beyond 2 days: x3, etc.
  return diffInDays + 1
}

let isGoogleMapsLoaded = false
let isGoogleMapsLoading = false

interface DeliveryOptionsProps {
  onSave?: () => void
  orders?: {
    product_name: string
    [key: string]: string
  }[]
}

const DeliveryOptions = ({ onSave, orders = [] }: DeliveryOptionsProps) => {
  // Check if any product has "Rentals" in the name
  const hasRentalProducts = orders.some(
    (order) =>
      order.product_name?.toLowerCase().includes("rentals") || order.product_name?.toLowerCase().includes("rental"),
  )

  const hasDecorProducts = orders.some((order) => order.product_name?.toLowerCase().includes("PPR#"))

  const savedMethod =
    typeof window !== "undefined" ? (localStorage.getItem("deliveryMethod") as DeliveryMethod) || "pickup" : "pickup"
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(savedMethod)
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const addressInputRef = useRef<HTMLInputElement>(null)
  const [isGoogleMapsReady, setIsGoogleMapsReady] = useState(false)
  const [showShippingRecommendation, setShowShippingRecommendation] = useState(false)
  const [shippingCost, setShippingCost] = useState<number | null>(null)
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false)
  const [estimatedDelivery, setEstimatedDelivery] = useState<string | null>(null)
  const savedLocation = typeof window !== "undefined" ? localStorage.getItem("deliveryLocation") : null
  const [location, setLocation] = useState<LocationInfo>(
    savedLocation ? JSON.parse(savedLocation) : defaultLocations[savedMethod],
  )

  const fetchShippingCost = async (zipCode: string) => {
    if (!zipCode || zipCode.length < 5) {
      setShippingCost(null)
      localStorage.removeItem("calculatedShippingCost")
      window.dispatchEvent(new CustomEvent("shippingCostCalculated", { detail: { cost: null } }))
      return
    }

    setIsCalculatingShipping(true)
    try {
      // Calculate weight: 0.5g × quantity of all products
      const totalQuantity = orders.reduce((sum, order) => {
        const qty = Number(order.quantity) || 0
        return sum + qty
      }, 0)

      const weight = (totalQuantity * 0.5).toString()

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/get-shipping-cost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        },
        body: JSON.stringify({
          weight,
          zip_code: zipCode,
        }),
      })

      const data = await response.json()
      if (response.ok && data.data && data.data.length > 0) {
        const calculatedCost = data.data[0].price
        const deliveryDate = data.data[0].estimatedDelivery

        setShippingCost(calculatedCost)
        setEstimatedDelivery(deliveryDate) // ✅ Save delivery date
        localStorage.setItem("calculatedShippingCost", calculatedCost.toString())

        // Notify OrderSummary component about the shipping cost
        window.dispatchEvent(new CustomEvent("shippingCostCalculated", { detail: { cost: calculatedCost } }))

        console.log(`Shipping cost calculated: $${calculatedCost} for ${weight}g to ${zipCode}, ETA: ${deliveryDate}`)
      } else {
        console.error("Failed to get shipping cost", data)
        setShippingCost(null)
        localStorage.removeItem("calculatedShippingCost")
        window.dispatchEvent(new CustomEvent("shippingCostCalculated", { detail: { cost: null } }))
      }
    } catch (err) {
      console.error("Error fetching shipping cost:", err)
      setShippingCost(null)
      localStorage.removeItem("calculatedShippingCost")
      window.dispatchEvent(new CustomEvent("shippingCostCalculated", { detail: { cost: null } }))
    } finally {
      setIsCalculatingShipping(false)
    }
  }

  useEffect(() => {
    if (deliveryMethod === "shipping" && location.postalCode && location.postalCode.length >= 5) {
      const timeoutId = setTimeout(() => {
        fetchShippingCost(location.postalCode)
      }, 500) // Debounce API calls

      return () => clearTimeout(timeoutId)
    } else if (deliveryMethod === "shipping") {
      setShippingCost(null)
      localStorage.removeItem("calculatedShippingCost")
      window.dispatchEvent(new CustomEvent("shippingCostCalculated", { detail: { cost: null } }))
    }
  }, [deliveryMethod, location.postalCode, orders.length])

  // Check if return is over 24 hours for pricing notification
  const [rentalMultiplier, setRentalMultiplier] = useState(1)

  // Check if we should show shipping recommendation
  useEffect(() => {
    const errorMessage = localStorage.getItem("deliveryError")
    if (errorMessage && errorMessage.includes("50-mile")) {
      setShowShippingRecommendation(true)
    }
  }, [])

  // Check rental multiplier whenever relevant fields change
  useEffect(() => {
    if (hasRentalProducts) {
      const startDate = deliveryMethod === "pickup" ? location.pickupDate : location.deliveryDate
      const startTime = deliveryMethod === "pickup" ? location.pickupTime : location.deliveryTime

      const multiplier = calculateRentalMultiplier(startDate, startTime, location.returnDate, location.returnTime)
      setRentalMultiplier(multiplier)

      // Dispatch event to notify other components about pricing change
      window.dispatchEvent(new CustomEvent("rentalPricingChanged", { detail: { rentalMultiplier: multiplier } }))
    }
  }, [
    location.pickupDate,
    location.pickupTime,
    location.deliveryDate,
    location.deliveryTime,
    location.returnDate,
    location.returnTime,
    deliveryMethod,
    hasRentalProducts,
  ])

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

        window.initGoogleMaps = () => {
          // Add a small delay to ensure everything is loaded
          setTimeout(() => {
            isGoogleMapsLoaded = true
            isGoogleMapsLoading = false
            setIsGoogleMapsReady(true)
          }, 100)
        }

        script.onerror = () => {
          console.error("Failed to load Google Maps API")
          isGoogleMapsLoading = false
        }

        document.head.appendChild(script)
      }
    }
  }, [])

  // Initialize autocomplete for local delivery
  useEffect(() => {
    if (deliveryMethod === "local" && addressInputRef.current && isGoogleMapsReady && !autocomplete) {
      // Double-check that Google Maps is actually available
      if (typeof window !== "undefined" && window.google && window.google.maps && window.google.maps.places) {
        const autocompleteInstance = new window.google.maps.places.Autocomplete(addressInputRef.current, {
          types: ["address"],
          componentRestrictions: { country: "us" },
        })

        autocompleteInstance.addListener("place_changed", () => {
          const place = autocompleteInstance.getPlace()
          if (place.formatted_address) {
            handleLocationChange("address", place.formatted_address)
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
    }

    return () => {
      if (
        autocomplete &&
        typeof window !== "undefined" &&
        window.google &&
        window.google.maps &&
        window.google.maps.event
      ) {
        window.google.maps.event.clearInstanceListeners(autocomplete)
      }
    }
  }, [deliveryMethod, isGoogleMapsReady, autocomplete])

  useEffect(() => {
    localStorage.setItem("deliveryLocation", JSON.stringify(location))
  }, [location])

  useEffect(() => {
    localStorage.setItem("deliveryMethod", deliveryMethod)
    setLocation(defaultLocations[deliveryMethod])

    if (deliveryMethod === "shipping") {
      setShowShippingRecommendation(false)
    }

    if (deliveryMethod !== "shipping") {
      setShippingCost(null)
      localStorage.removeItem("calculatedShippingCost")
      window.dispatchEvent(new CustomEvent("shippingCostCalculated", { detail: { cost: null } }))
    }

    window.dispatchEvent(new Event("deliveryMethodChanged"))
  }, [deliveryMethod])

  const handleLocationChange = (key: keyof LocationInfo, value: string) => {
    setLocation((prev) => {
      const newLocation = { ...prev, [key]: value }

      // Reset time when date changes to ensure valid time selection
      if (key === "pickupDate") {
        newLocation.pickupTime = ""
      } else if (key === "deliveryDate") {
        newLocation.deliveryTime = ""
      } else if (key === "returnDate") {
        newLocation.returnTime = ""
      }

      return newLocation
    })
  }
  // ✅ Validate USA phone numbers
const isValidUSPhoneNumber = (phone: string): boolean => {
  // Remove spaces, dashes, parentheses
  const cleaned = phone.replace(/\D/g, "")

  // Must be 10 digits (without country code) OR 11 with leading "1"
  if (/^1?\d{10}$/.test(cleaned)) {
    return true
  }

  return false
}
 

 const validateRequiredFields = (): boolean => {
  const requiredFieldsMap: Record<DeliveryMethod, string[]> = {
    pickup: hasRentalProducts
      ? ["pickupDate", "pickupTime", "phoneNumber", "returnDate", "returnTime"]
      : ["pickupDate", "pickupTime", "phoneNumber"],
    local: hasRentalProducts
      ? ["deliveryDate", "deliveryTime", "address", "postalCode", "phoneNumber", "returnDate", "returnTime"]
      : ["deliveryDate", "deliveryTime", "address", "postalCode", "phoneNumber"],
    shipping: hasRentalProducts
      ? ["address", "postalCode", "phoneNumber", "returnDate", "returnTime"]
      : ["address", "postalCode", "phoneNumber"],
  }

  const requiredFields = requiredFieldsMap[deliveryMethod]
  const basicValidation = requiredFields.every((field) => {
    const value = location[field as keyof LocationInfo]
    return value && value.toString().trim() !== ""
  })

  if (!basicValidation) return false

  // ✅ Extra validation: phone must be a valid U.S. number
  if (!isValidUSPhoneNumber(location.phoneNumber)) {
    return false
  }

  // Time validation stays the same...
  if (deliveryMethod === "pickup") {
    if (
      location.pickupTime &&
      location.pickupDate &&
      !isTimeWithinAllowedHours(location.pickupTime, location.pickupDate, "pickup")
    ) {
      return false
    }
  } else if (deliveryMethod === "local") {
    if (
      location.deliveryTime &&
      location.deliveryDate &&
      !isTimeWithinAllowedHours(location.deliveryTime, location.deliveryDate, "delivery")
    ) {
      return false
    }
  }

  if (
    hasRentalProducts &&
    location.returnTime &&
    location.returnDate &&
    !isTimeWithinAllowedHours(location.returnTime, location.returnDate, "return")
  ) {
    return false
  }

  return true
}


  const handleSave = () => {
    if (validateRequiredFields()) {
      localStorage.setItem("deliveryLocation", JSON.stringify(location))
      localStorage.setItem("deliveryMethod", deliveryMethod)
      localStorage.removeItem("deliveryError")
      window.dispatchEvent(new Event("deliveryMethodChanged"))

      if (onSave) {
        onSave()
      }
    } else {
      alert("Please fill in all required fields before saving.")
    }
  }

  // Available delivery methods based on rental products
  const availableDeliveryMethods = [
    {
      method: "pickup",
      label: "Store Pickup",
      icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    },
    {
      method: "local",
      label: "Local Delivery",
      icon: "/Branded_Van__1_-removebg-preview.png",
    },
    // Only show shipping if no rental products
    ...(!hasRentalProducts && !hasDecorProducts
      ? [
          {
            method: "shipping",
            label: "Shipping",
            icon: "https://cdn-icons-png.flaticon.com/512/1239/1239525.png",
          },
        ]
      : []),
  ]

  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold text-black mb-3">Choose Delivery Method</h3>

      {hasRentalProducts && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-400 text-blue-800 rounded">
          <div className="flex items-center">
            <span className="text-lg mr-2">ℹ️</span>
            <div>
              <strong>Rental Products Detected:</strong>
              <br />
              Shipping is not available for rental items. Please choose pickup or local delivery.
            </div>
          </div>
        </div>
      )}

      {hasRentalProducts && rentalMultiplier > 1 && (
        <div className="mb-4 p-3 bg-orange-100 border border-orange-400 text-orange-800 rounded">
          <div className="flex items-center">
            <span className="text-lg mr-2">⏰</span>
            <div>
              <strong>Extended Rental Period:</strong>
              <br />
              Return is {rentalMultiplier - 1} day{rentalMultiplier > 2 ? "s" : ""} beyond pickup/delivery. Rental
              prices will be multiplied by {rentalMultiplier}x.
            </div>
          </div>
        </div>
      )}

      {showShippingRecommendation && !hasRentalProducts && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
          <div className="flex items-center">
            <span className="text-lg mr-2">⚠️</span>
            <div>
              <strong>Shipping Recommended:</strong>
              <br />
              Your delivery address exceeds our 50-mile local delivery limit. Please select {"Shipping"} to continue.
            </div>
          </div>
        </div>
      )}

      {deliveryMethod === "shipping" && !hasRentalProducts && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-800 rounded">
          <div className="flex items-center">
            <span className="text-lg mr-2">📦</span>
            <div>
              <strong>Shipping Cost Calculation:</strong>
              <br />
              {orders.length > 0 && (
                <div className="hidden">
                  Weight: {(orders.length * 0.5).toFixed(1)}g ({orders.length} items × 0.5g each)
                  <br />
                </div>
              )}
              {isCalculatingShipping && "Calculating shipping cost..."}
              {!isCalculatingShipping && shippingCost !== null && (
                <>
                  Shipping cost: <strong>${shippingCost.toFixed(2)}</strong>
                  <p className="text-sm text-gray-700 mt-2">
                    Item ships within <strong>24hrs</strong> with the expected delivery <br /> of
                    <strong> 3–7 Business days</strong>.
                  </p>
                  {/* Show estimated delivery date */}
                  {/*
              Suppose you save API response like:
              setEstimatedDelivery(data.data[0].estimatedDelivery)
            */}
                  {estimatedDelivery && (
                    <p className="text-sm text-gray-600 mt-1">
                      📅 Estimated Delivery Date: <strong>{new Date(estimatedDelivery).toDateString()}</strong>
                    </p>
                  )}
                </>
              )}
              {!isCalculatingShipping &&
                shippingCost === null &&
                location.postalCode &&
                location.postalCode.length >= 5 &&
                "Unable to calculate shipping cost"}
              {!location.postalCode && "Enter zip code below to calculate shipping cost"}
            </div>
          </div>
        </div>
      )}

      {/* Delivery Method Options */}
      <div className="flex justify-between gap-4">
        {availableDeliveryMethods.map(({ method, label, icon }) => (
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
          <h3 className="text-base font-semibold text-black">Store Pickup Location</h3>
          <div className="mt-2">
            <p className="text-sm text-black">
              <strong>Address:</strong> 1919 Faithon P Lucas Sr. Blvd, #135, Mesquite TX 75181
            </p>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Pickup Date *</label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]} // disables past dates
              value={location.pickupDate}
              onChange={(e) => handleLocationChange("pickupDate", e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Pickup Time *</label>
            <select
              value={location.pickupTime}
              onChange={(e) => handleLocationChange("pickupTime", e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            >
              <option value="">Select a time</option>
              {generateTimeSlots(location.pickupDate, "pickup").map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            {location.pickupDate && (
              <p className="text-xs text-gray-500 mt-1">
                Available hours: {getTimeRangeText(location.pickupDate, "pickup")}
              </p>
            )}
            {location.pickupTime &&
              location.pickupDate &&
              !isTimeWithinAllowedHours(location.pickupTime, location.pickupDate, "pickup") && (
                <p className="text-xs text-red-500 mt-1">
                  Please select a time within allowed hours: {getTimeRangeText(location.pickupDate, "pickup")}
                </p>
              )}
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
  {location.phoneNumber && !isValidUSPhoneNumber(location.phoneNumber) && (
    <p className="text-xs text-red-500 mt-1">Please enter a valid U.S. phone number</p>
  )}
</div>


          {/* 🔹 Special Instructions (added for Pickup) */}
          <div className="mt-4">
            <label className="block text-sm font-medium">Special Instructions</label>
            <textarea
              value={location.specialInstructions}
              onChange={(e) => handleLocationChange("specialInstructions", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Any special instructions?"
            />
          </div>

          {/* Return fields for rental products */}
          {hasRentalProducts && (
            <>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-base font-semibold text-black mb-3">Return Information</h4>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Return Date *</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]} // disables past dates
                  value={location.returnDate}
                  onChange={(e) => handleLocationChange("returnDate", e.target.value)}
                  className="p-2 border rounded-lg w-full"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Return Time *</label>
                <select
                  value={location.returnTime}
                  onChange={(e) => handleLocationChange("returnTime", e.target.value)}
                  className="p-2 border rounded-lg w-full"
                  required
                >
                  <option value="">Select a time</option>
                  {generateTimeSlots(location.returnDate, "return").map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>

                {location.returnDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Available hours: {getTimeRangeText(location.returnDate, "return")}
                  </p>
                )}
                {location.returnTime &&
                  location.returnDate &&
                  !isTimeWithinAllowedHours(location.returnTime, location.returnDate, "return") && (
                    <p className="text-xs text-red-500 mt-1">
                      Please select a time within allowed hours: {getTimeRangeText(location.returnDate, "return")}
                    </p>
                  )}

                <div className="mt-4">
                  <label className="block text-sm font-medium">Special Instructions</label>
                  <textarea
                    value={location.specialInstructionsr}
                    onChange={(e) => handleLocationChange("specialInstructionsr", e.target.value)}
                    className="p-2 border rounded-lg w-full"
                    placeholder="Any special instructions?"
                  />
                </div>
              </div>
            </>
          )}
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
              min={new Date().toISOString().split("T")[0]} // disables past dates
              value={location.deliveryDate}
              onChange={(e) => handleLocationChange("deliveryDate", e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Delivery Time *</label>
            <select
              value={location.deliveryTime}
              onChange={(e) => handleLocationChange("deliveryTime", e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            >
              <option value="">Select a time</option>
              {generateTimeSlots(location.deliveryDate, "delivery").map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            {location.deliveryDate && (
              <p className="text-xs text-gray-500 mt-1">
                Available hours: {getTimeRangeText(location.deliveryDate, "delivery")}
              </p>
            )}
            {location.deliveryTime &&
              location.deliveryDate &&
              !isTimeWithinAllowedHours(location.deliveryTime, location.deliveryDate, "delivery") && (
                <p className="text-xs text-red-500 mt-1">
                  Please select a time within allowed hours: {getTimeRangeText(location.deliveryDate, "delivery")}
                </p>
              )}
          </div>

          {/* ℹ️ Info under the times */}
          <div className="mt-5 bg-purple-100 border border-purple-400 text-purple-800 rounded">
            <div className="flex items-center">
              <span className="text-lg mr-2">🚚</span>
              <div>
                Our <strong>earliest delivery time</strong> is <strong>2hrs after checkout</strong>.
              </div>
            </div>
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
  {location.phoneNumber && !isValidUSPhoneNumber(location.phoneNumber) && (
    <p className="text-xs text-red-500 mt-1">Please enter a valid U.S. phone number</p>
  )}
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

          {/* Return fields for rental products */}
          {hasRentalProducts && (
            <>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-base font-semibold text-black mb-3">Return Information</h4>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Return Date *</label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]} // disables past dates
                  value={location.returnDate}
                  onChange={(e) => handleLocationChange("returnDate", e.target.value)}
                  className="p-2 border rounded-lg w-full"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Return Time *</label>
                <select
                  value={location.returnTime}
                  onChange={(e) => handleLocationChange("returnTime", e.target.value)}
                  className="p-2 border rounded-lg w-full"
                  required
                >
                  <option value="">Select a return time</option>
                  {generateTimeSlots(location.returnDate, "delivery").map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>

                {location.returnDate && (
                  <p className="text-xs text-gray-500 mt-1">
                    Available hours: {getTimeRangeText(location.returnDate, "return")}
                  </p>
                )}
                {location.returnTime &&
                  location.returnDate &&
                  !isTimeWithinAllowedHours(location.returnTime, location.returnDate, "return") && (
                    <p className="text-xs text-red-500 mt-1">
                      Please select a time within allowed hours: {getTimeRangeText(location.returnDate, "return")}
                    </p>
                  )}

                <div className="mt-4">
                  <label className="block text-sm font-medium">Special Instructions</label>
                  <textarea
                    value={location.specialInstructionsr}
                    onChange={(e) => handleLocationChange("specialInstructionsr", e.target.value)}
                    className="p-2 border rounded-lg w-full"
                    placeholder="Any special instructions?"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Shipping Details - Only shown if no rental products */}
      {deliveryMethod === "shipping" && !hasRentalProducts && (
        <div className="mt-6">
          <h3 className="text-base font-semibold text-black">Shipping Information</h3>
          {showShippingRecommendation && (
            <div className="mb-4 p-2 bg-green-100 border border-green-300 text-green-700 rounded text-sm">
              ✅ Great choice! Shipping is available everywhere in the USA with no distance restrictions.
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
              placeholder="Enter Zip code (required for shipping cost calculation)"
              required
            />
            {location.postalCode && location.postalCode.length >= 5 && (
              <div className="mt-2 text-sm">
                {isCalculatingShipping && <span className="text-blue-600">🔄 Calculating shipping cost...</span>}
                {!isCalculatingShipping && shippingCost !== null && (
                  <span className="text-green-600">✅ Shipping cost: ${shippingCost.toFixed(2)}</span>
                )}
                {!isCalculatingShipping && shippingCost === null && location.postalCode.length >= 5 && (
                  <span className="text-red-600">❌ Unable to calculate shipping cost</span>
                )}
              </div>
            )}
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
  {location.phoneNumber && !isValidUSPhoneNumber(location.phoneNumber) && (
    <p className="text-xs text-red-500 mt-1">Please enter a valid U.S. phone number</p>
  )}
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
