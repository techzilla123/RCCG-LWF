"use client"
import type React from "react"
import { useState, useEffect } from "react"
import type { SummaryItemType } from "./types"
import CartDelivery from "./CartDelivery"
import { calculateDistanceAction } from "./routes"
import { SignUpModal } from "../../Offer/SignUpModal"
import { LoginModal } from "../../Offer/LoginModal"
import { SuccessModal } from "../../Offer/SuccessModal"

interface OrderSummaryProps {
  items: SummaryItemType[]
  totalItems: number
  total: string
  orders: {
    amount: string
    quantity: string
    product_id: string
    product_name: string
    size: string
    color: string
  }[]
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

export const OrderSummary: React.FC<OrderSummaryProps> = ({ items, totalItems, total, orders }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("pickup")
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [calculatedShipping, setCalculatedShipping] = useState<number | null>(null)
  const [isShippingCalculated, setIsShippingCalculated] = useState(false)
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null)
  const [adjustedItems, setAdjustedItems] = useState<SummaryItemType[]>(items)
  const [adjustedTotal, setAdjustedTotal] = useState<string>(total)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setRentalMultiplier] = useState(1)

  // New state for signin modal
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false)
  const [guestEmail, setGuestEmail] = useState("")
  const [guestFirstName, setGuestFirstName] = useState("")
  const [guestLastName, setGuestLastName] = useState("")
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [modalType, setModalType] = useState<"signup" | "login" | "success" | null>(null)
  const [hasProvidedGuestInfo, setHasProvidedGuestInfo] = useState(false)
 const [apiShippingCost, setApiShippingCost] = useState<number | null>(null)
 
 useEffect(() => {
  const handleShippingCostCalculated = (event: CustomEvent) => {
    setApiShippingCost(event.detail.cost)
  }

  window.addEventListener("shippingCostCalculated", handleShippingCostCalculated as EventListener)
  
  // Load existing shipping cost from localStorage
  const savedShippingCost = localStorage.getItem("calculatedShippingCost")
  if (savedShippingCost) {
    setApiShippingCost(parseFloat(savedShippingCost))
  }

  return () => {
    window.removeEventListener("shippingCostCalculated", handleShippingCostCalculated as EventListener)
  }
}, [])
  // Check if any product has "Rentals" in the name
  const hasRentalProducts = orders.some(
    (order) =>
      order.product_name?.toLowerCase().includes("rentals") || order.product_name?.toLowerCase().includes("rental"),
  )

  // Function to calculate adjusted pricing for rental items
  const calculateAdjustedPricing = () => {
    const deliveryData = localStorage.getItem("deliveryLocation")
    if (!deliveryData || !hasRentalProducts) {
      setAdjustedItems(items)
      setAdjustedTotal(total)
      return
    }

    const parsedDeliveryData: LocationInfo = JSON.parse(deliveryData)
    const currentMethod = (localStorage.getItem("deliveryMethod") as DeliveryMethod) || "pickup"

    const startDate = currentMethod === "pickup" ? parsedDeliveryData.pickupDate : parsedDeliveryData.deliveryDate
    const startTime = currentMethod === "pickup" ? parsedDeliveryData.pickupTime : parsedDeliveryData.deliveryTime

    const multiplier = calculateRentalMultiplier(
      startDate,
      startTime,
      parsedDeliveryData.returnDate,
      parsedDeliveryData.returnTime,
    )

    setRentalMultiplier(multiplier)

    if (multiplier > 1) {
      // Multiply the price of rental items by the calculated multiplier
      const newItems = items.map((item) => {
        // Check if this item corresponds to a rental product
        const isRentalItem = orders.some(
          (order) =>
            (order.product_name?.toLowerCase().includes("rentals") ||
              order.product_name?.toLowerCase().includes("rental")) &&
            item.label.toLowerCase().includes(order.product_name.toLowerCase().split(" ")[0].toLowerCase()),
        )

        if (isRentalItem && item.label.toLowerCase() !== "taxes" && item.label.toLowerCase() !== "subtotal") {
          const currentAmount = Number.parseFloat(item.amount.replace(/[$,]/g, ""))
          const multipliedAmount = currentAmount * multiplier
          return {
            ...item,
            amount: `$${multipliedAmount.toFixed(2)}`,
          }
        }
        return item
      })

      // Recalculate total
      const subtotalItem = newItems.find((item) => item.label.toLowerCase() === "subtotal")
      const taxesItem = newItems.find((item) => item.label.toLowerCase() === "taxes")

      if (subtotalItem) {
        const otherItems = newItems.filter(
          (item) => item.label.toLowerCase() !== "subtotal" && item.label.toLowerCase() !== "taxes",
        )
        const newSubtotal = otherItems.reduce((sum, item) => {
          return sum + Number.parseFloat(item.amount.replace(/[$,]/g, ""))
        }, 0)

        subtotalItem.amount = `$${newSubtotal.toFixed(2)}`

        // Recalculate taxes if present (assuming same tax rate)
        if (taxesItem) {
          const originalSubtotal = Number.parseFloat(
            items.find((item) => item.label.toLowerCase() === "subtotal")?.amount.replace(/[$,]/g, "") || "0",
          )
          const originalTaxes = Number.parseFloat(taxesItem.amount.replace(/[$,]/g, ""))
          const taxRate = originalSubtotal > 0 ? originalTaxes / originalSubtotal : 0
          const newTaxes = newSubtotal * taxRate
          taxesItem.amount = `$${newTaxes.toFixed(2)}`

          const newTotal = newSubtotal + newTaxes
          setAdjustedTotal(`$${newTotal.toFixed(2)}`)
        } else {
          setAdjustedTotal(`$${newSubtotal.toFixed(2)}`)
        }
      }

      setAdjustedItems(newItems)
    } else {
      setAdjustedItems(items)
      setAdjustedTotal(total)
    }
  }

  // Listen for rental pricing changes
  useEffect(() => {
    const handleRentalPricingChange = () => {
      calculateAdjustedPricing()
    }

    window.addEventListener("rentalPricingChanged", handleRentalPricingChange)
    window.addEventListener("deliveryMethodChanged", handleRentalPricingChange)

    // Initial calculation
    calculateAdjustedPricing()

    return () => {
      window.removeEventListener("rentalPricingChanged", handleRentalPricingChange)
      window.removeEventListener("deliveryMethodChanged", handleRentalPricingChange)
    }
  }, [items, total, orders, hasRentalProducts])

  // Update delivery method when localStorage changes
  useEffect(() => {
    const updateDeliveryMethod = () => {
      const method = (localStorage.getItem("deliveryMethod") as DeliveryMethod) || "pickup"
      setDeliveryMethod(method)

      if (method === "pickup") {
        setCalculatedShipping(0)
        setIsShippingCalculated(true)
      } else {
        setCalculatedShipping(null)
        setIsShippingCalculated(false)
      }
      setCalculatedDistance(null)
    }

    updateDeliveryMethod()
    window.addEventListener("storage", updateDeliveryMethod)
    window.addEventListener("deliveryMethodChanged", updateDeliveryMethod)

    return () => {
      window.removeEventListener("storage", updateDeliveryMethod)
      window.removeEventListener("deliveryMethodChanged", updateDeliveryMethod)
    }
  }, [])

  // Updated required fields map to include return fields for rentals
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

  const taxes = adjustedItems.find((item) => item.label.toLowerCase() === "taxes")
  const otherItems = adjustedItems.filter(
    (item) => item.label.toLowerCase() !== "subtotal" && item.label.toLowerCase() !== "taxes",
  )

  const validateRequiredFields = (): boolean => {
    const deliveryData = localStorage.getItem("deliveryLocation")
    const currentMethod = (localStorage.getItem("deliveryMethod") as DeliveryMethod) || "pickup"
    console.log("Validating for method:", currentMethod)

    if (!deliveryData) {
      console.log("No delivery data found")
      return false
    }

    const parsedDeliveryData: LocationInfo = JSON.parse(deliveryData)
    const requiredFields = requiredFieldsMap[currentMethod]
    const isValid = requiredFields.every((field) => {
      const value = parsedDeliveryData[field as keyof LocationInfo]
      const isFieldValid = value && value.toString().trim() !== ""
      if (!isFieldValid) {
        console.log(`Missing required field: ${field}`)
      }
      return isFieldValid
    })

    console.log(`Validation result for ${currentMethod}:`, isValid)
    return isValid
  }

  const calculateDistance = async (destination: string): Promise<{ distance: number; duration: string } | null> => {
    try {
      const result = await calculateDistanceAction(destination)
      if (result.success) {
        return {
          distance: result.distance,
          duration: result.duration,
        }
      } else {
        console.error("Distance calculation failed:", result.error)
        setErrorMessage(result.error || "Failed to calculate distance")
        return null
      }
    } catch (error) {
      console.error("Error calculating distance:", error)
      setErrorMessage("Network error while calculating distance")
      return null
    }
  }

  // Modified Logistics Price Calculation
const calculateLogisticsPrice = (distance: number, hasRental: boolean): number => {
  if (hasRental) {
    // Rental rule
    if (distance <= 15) {
      return 75
    }
    const additionalMiles = distance - 15
    return 75 + Math.ceil(additionalMiles) * 5
  } else {
    // Non-rental rule (half of rental pricing)
    if (distance <= 15) {
      return 37.5
    }
    const additionalMiles = distance - 15
    return 37.5 + Math.ceil(additionalMiles) * 2.5
  }
}


  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateGuestInfo = (): boolean => {
    if (!guestFirstName.trim()) {
      setNameError("Please enter your first name")
      return false
    }
    if (!guestLastName.trim()) {
      setNameError("Please enter your last name")
      return false
    }
    if (!guestEmail.trim()) {
      setEmailError("Please enter your email address")
      return false
    }
    if (!validateEmail(guestEmail)) {
      setEmailError("Please enter a valid email address")
      return false
    }
    setNameError("")
    setEmailError("")
    return true
  }

  const handleEmailSubmit = () => {
    if (!validateGuestInfo()) {
      return
    }
    setHasProvidedGuestInfo(true)
    setIsSigninModalOpen(false)
    document.body.style.overflow = "auto"
    proceedWithCheckout()
  }

  const closeSigninModal = () => {
    setIsSigninModalOpen(false)
    setGuestEmail("")
    setGuestFirstName("")
    setGuestLastName("")
    setEmailError("")
    setNameError("")
    setModalType(null)
    setHasProvidedGuestInfo(false)
    document.body.style.overflow = "auto"
  }

  const handleClose = () => {
    setModalType(null)
    setHasProvidedGuestInfo(false)
    document.body.style.overflow = "auto"
  }

  const handleLoginSuccess = () => {
    setModalType("success")
  }

  const handleOpenSignUp = () => {
    setIsSigninModalOpen(false)
    setModalType("signup")
  }

  const handleOpenLogin = () => {
    setIsSigninModalOpen(false)
    setModalType("login")
  }

  const handleCheckout = async () => {
    setErrorMessage("")
    const token = localStorage.getItem("accessToken")
    const isSignedIn = !!token

    if (!isSignedIn && !hasProvidedGuestInfo) {
      setIsSigninModalOpen(true)
      document.body.style.overflow = "hidden"
      return
    }

    await proceedWithCheckout()
  }

  const proceedWithCheckout = async () => {
    const currentMethod = (localStorage.getItem("deliveryMethod") as DeliveryMethod) || "pickup"
    setDeliveryMethod(currentMethod)

    if (!validateRequiredFields()) {
      setErrorMessage("Please complete all required delivery information.")
      setIsModalOpen(true)
      document.body.style.overflow = "hidden"
      return
    }

    if (isShippingCalculated) {
      console.log("Shipping already calculated, proceeding to order creation")
      await createOrder(calculatedShipping || 0, currentMethod)
      return
    }

    if (currentMethod === "local") {
      setIsCalculatingShipping(true)
      try {
        const deliveryData = localStorage.getItem("deliveryLocation")
        if (deliveryData) {
          const parsedDeliveryData: LocationInfo = JSON.parse(deliveryData)
          if (!parsedDeliveryData.address || parsedDeliveryData.address.trim() === "") {
            setErrorMessage("Please enter a valid delivery address.")
            setIsModalOpen(true)
            document.body.style.overflow = "hidden"
            setIsCalculatingShipping(false)
            return
          }

          const distanceData = await calculateDistance(parsedDeliveryData.address)
          if (distanceData) {
            setCalculatedDistance(distanceData.distance)
            if (distanceData.distance > 50) {
              setErrorMessage(
                `The delivery distance is ${distanceData.distance} miles, which exceeds our 50-mile local delivery limit. Please select "Pickup" as your delivery method to continue.`,
              )
              setIsModalOpen(true)
              document.body.style.overflow = "hidden"
              setIsCalculatingShipping(false)
              return
            } else {
              const logisticsPrice = calculateLogisticsPrice(distanceData.distance, hasRentalProducts)
setCalculatedShipping(logisticsPrice)
setIsShippingCalculated(true)
              console.log(`Distance: ${distanceData.distance} miles, Logistics Price: $${logisticsPrice}`)
              alert(
                `✅ Delivery Confirmed!\n\nDistance: ${distanceData.distance} miles\nDelivery Cost: $${logisticsPrice}\n\nClick "Complete Order" to finalize your purchase.`,
              )
            }
          } else {
            setErrorMessage(errorMessage || "Unable to calculate distance. Please check your address and try again.")
            setIsModalOpen(true)
            document.body.style.overflow = "hidden"
          }
        }
      } catch (error) {
        console.error("Error during checkout:", error)
        setErrorMessage("An error occurred during checkout. Please try again.")
        setIsModalOpen(true)
        document.body.style.overflow = "hidden"
      } finally {
        setIsCalculatingShipping(false)
      }
    } else {
  let shippingCost = 0

  if (currentMethod === "shipping") {
    shippingCost = apiShippingCost ?? 0 // use API-provided shipping cost
  }

  setCalculatedShipping(shippingCost)
  setIsShippingCalculated(true)
  await createOrder(shippingCost, currentMethod)
}
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setErrorMessage("")
    document.body.style.overflow = "auto"

    const currentMethod = (localStorage.getItem("deliveryMethod") as DeliveryMethod) || "pickup"
    setDeliveryMethod(currentMethod)

    if (currentMethod !== deliveryMethod) {
      setCalculatedShipping(null)
      setIsShippingCalculated(false)
      setCalculatedDistance(null)
    }

    window.dispatchEvent(new Event("deliveryMethodChanged"))
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const createOrder = async (logisticsPrice: number, finalDeliveryMethod: DeliveryMethod) => {
    try {
      const token = localStorage.getItem("accessToken")
      const isSignedIn = !!token
      const userData = {
        firstname: localStorage.getItem("firstname"),
        lastname: localStorage.getItem("lastname"),
        userId: localStorage.getItem("userId"),
        email: localStorage.getItem("email"),
      }

      const deliveryLocationData = localStorage.getItem("deliveryLocation")
      const deliveryDetails: LocationInfo = deliveryLocationData
        ? JSON.parse(deliveryLocationData)
        : ({} as LocationInfo)

      let deliveryAddressString = ""

      if (finalDeliveryMethod === "pickup") {
        deliveryAddressString = `Pickup at: 1919 Faithon P Lucas Sr. Blvd, #135, Mesquite TX 75181 on ${deliveryDetails.pickupDate} at ${deliveryDetails.pickupTime}`
        if (deliveryDetails.phoneNumber) {
          deliveryAddressString += ` - Phone: ${deliveryDetails.phoneNumber}`
        }
         if (deliveryDetails.specialInstructions) {
    deliveryAddressString += ` - Instructions: ${deliveryDetails.specialInstructions}`
  }
   
        if (hasRentalProducts && deliveryDetails.returnDate && deliveryDetails.returnTime) {
          deliveryAddressString += ` - Return: ${deliveryDetails.returnDate} at ${deliveryDetails.returnTime}`
        }
        if (hasRentalProducts && deliveryDetails.specialInstructionsr) {
  deliveryAddressString += ` - Return Instructions: ${deliveryDetails.specialInstructionsr}`
}
      } else if (finalDeliveryMethod === "local") {
        deliveryAddressString = `Local Delivery to: ${deliveryDetails.address}, ${deliveryDetails.city}, ${deliveryDetails.postalCode} on ${deliveryDetails.deliveryDate} at ${deliveryDetails.deliveryTime}`
        if (deliveryDetails.phoneNumber) {
          deliveryAddressString += ` - Phone: ${deliveryDetails.phoneNumber}`
        }
        if (deliveryDetails.specialInstructions) {
          deliveryAddressString += ` - Instructions: ${deliveryDetails.specialInstructions}`
        }
        if (hasRentalProducts && deliveryDetails.returnDate && deliveryDetails.returnTime) {
          deliveryAddressString += ` - Return: ${deliveryDetails.returnDate} at ${deliveryDetails.returnTime}`
        }
         if (hasRentalProducts && deliveryDetails.returnDate && deliveryDetails.specialInstructionsr) {
  deliveryAddressString += ` - Return Instructions: ${deliveryDetails.specialInstructionsr}`
}
      } else if (finalDeliveryMethod === "shipping") {
        deliveryAddressString = `Ship to: ${deliveryDetails.address}, ${deliveryDetails.city}, ${deliveryDetails.postalCode}`
        if (deliveryDetails.phoneNumber) {
          deliveryAddressString += ` - Phone: ${deliveryDetails.phoneNumber}`
        }
        if (deliveryDetails.specialInstructions) {
          deliveryAddressString += ` - Instructions: ${deliveryDetails.specialInstructions}`
        }
        if (hasRentalProducts && deliveryDetails.returnDate && deliveryDetails.returnTime) {
          deliveryAddressString += ` - Return: ${deliveryDetails.returnDate} at ${deliveryDetails.returnTime}`
        }
      }

      // Use adjusted total for calculations
      const cleanTotal = adjustedTotal.replace(/[$,]/g, "")
      const totalAmount = Number.parseFloat(cleanTotal)

      // Check if rental pricing was multiplied
      const startDate = finalDeliveryMethod === "pickup" ? deliveryDetails.pickupDate : deliveryDetails.deliveryDate
      const startTime = finalDeliveryMethod === "pickup" ? deliveryDetails.pickupTime : deliveryDetails.deliveryTime
      const multiplier = calculateRentalMultiplier(
        startDate,
        startTime,
        deliveryDetails.returnDate,
        deliveryDetails.returnTime,
      )

      // Adjust order amounts for rental items if multiplier > 1
      const correctedOrders = orders.map((order) => {
        const quantity = Number.parseInt(order.quantity)
        let totalAmountForItem = Number.parseFloat(order.amount)

        // Multiply the price if it's a rental item and multiplier > 1
        if (
          multiplier > 1 &&
          hasRentalProducts &&
          (order.product_name?.toLowerCase().includes("rentals") ||
            order.product_name?.toLowerCase().includes("rental"))
        ) {
          totalAmountForItem *= multiplier
        }

        const unitPrice = quantity > 1 ? totalAmountForItem / quantity : totalAmountForItem
        return {
          ...order,
          amount: unitPrice.toFixed(2),
        }
      })

      const requestBody = {
        is_signed_in: isSignedIn,
        customer_id: userData.userId,
        create_account: false,
        email: isSignedIn ? userData.email : guestEmail,
        firstname: isSignedIn ? userData.firstname : guestFirstName,
        lastname: isSignedIn ? userData.lastname : guestLastName,
        phone_number: deliveryDetails.phoneNumber,
        total_amount: totalAmount + (hasRentalProducts ? 50 : 0), // add deposit
  refundable_deposit: hasRentalProducts ? 50 : 0,
        delivery_address: deliveryAddressString,
        logistics_price: logisticsPrice,
        delivery_type: finalDeliveryMethod,
        orders: correctedOrders,
        // Add return date and time as separate fields for rental products
        ...(hasRentalProducts &&
          deliveryDetails.returnDate &&
          deliveryDetails.returnTime && {
            return_date: deliveryDetails.returnDate,
            return_time: deliveryDetails.returnTime,
          }),
      }

      console.log("Order request body:", requestBody)

      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        ...(token ? { Authorization: token } : {}),
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/create-order`, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      })

      const result = await res.json()
      if (!res.ok) {
        throw new Error(result.message || "Order failed")
      }

      localStorage.removeItem("cart")
      localStorage.removeItem("deliveryLocation")
      localStorage.removeItem("deliveryMethod")

      if (result.data && result.data.url) {
        window.location.href = result.data.url
      } else {
        console.error("No checkout URL received from API")
        alert("Order created but no payment URL received. Please contact support.")
      }
    } catch (err) {
      console.error("Order error:", err)
      setErrorMessage("Order failed. Please try again.")
      setIsModalOpen(true)
      document.body.style.overflow = "hidden"
    }
  }

  const getShippingDisplay = () => {
  if (deliveryMethod === "pickup") {
    return "$0.00"
  }
  if (deliveryMethod === "shipping" && apiShippingCost !== null) {
    return `$${apiShippingCost.toFixed(2)}`
  }
  if (deliveryMethod === "local" && calculatedShipping !== null) {
    return `$${calculatedShipping.toFixed(2)}`
  }
  return "Calculated at checkout"
}
 const TAX_RATE = 0.0825

const getFinalTotal = () => {
  const baseTotal = parseFloat(adjustedTotal.replace(/[$,]/g, "")) || 0
  let shippingToAdd = 0
  
  if (deliveryMethod === "local" && calculatedShipping !== null) {
    shippingToAdd = calculatedShipping
  } else if (deliveryMethod === "shipping" && apiShippingCost !== null) {
    shippingToAdd = apiShippingCost
  }

  // ✅ Add refundable deposit if rentals exist
  const depositToAdd = hasRentalProducts ? 50 : 0

  const taxableAmount = baseTotal + shippingToAdd + depositToAdd
  const taxes = taxableAmount * TAX_RATE
  const finalTotal = taxableAmount + taxes

  return `$${finalTotal.toFixed(2)}`
}



  const getButtonText = () => {
    if (isCalculatingShipping) {
      return "Calculating..."
    }
    if (isShippingCalculated && deliveryMethod === "local" && calculatedShipping !== null) {
      return "Complete Order"
    }
    return "Proceed to checkout"
  }

  return (
    <aside className="p-6 bg-white rounded-2xl min-w-60 w-[364px] max-md:px-5 border border-solid border-[#EAEAEA]">
      <h2 className="pb-4 w-full text-xl font-semibold tracking-normal leading-6 text-black border-b border-solid border-b-[color:var(--colour-stroke-default,#D5D5D5)]">
        Order summary
      </h2>
      <div className="flex-1 mt-6 w-full">
        {otherItems.map((item, index) => (
          <div key={index} className="flex gap-10 justify-between items-center w-full text-base tracking-normal mt-3">
            <span className="self-stretch my-auto leading-6 text-neutral-500">{item.label}</span>
            <span className={`self-stretch my-auto  ${item.bold ? "font-semibold" : ""} leading-5 text-black`}>
              {item.amount}
            </span>
          </div>
        ))}
        {/* Refundable Deposit (for rentals) */}
{hasRentalProducts && (
  <div
    className="flex gap-10 justify-between items-center mt-3 cursor-pointer"
    onClick={() => alert("💰 Deposit will be refunded when items are returned.")}
    title="Deposit will be refunded when items are returned."
  >
    <span className="self-stretch my-auto leading-6 text-neutral-500">
      Refundable Deposit
    </span>
    <span className="self-stretch my-auto font-semibold leading-5 text-black">
      $50.00
    </span>
  </div>
)}

        {taxes && (
          <div className="flex gap-10 justify-between items-center mt-2 w-full">
  <span className="text-base tracking-normal leading-6 text-neutral-500">Taxes</span>
  <span className="text-base font-semibold tracking-normal leading-5 text-black">
    {(() => {
      const baseTotal = parseFloat(adjustedTotal.replace(/[$,]/g, "")) || 0
      let shippingToAdd = 0
      if (deliveryMethod === "local" && calculatedShipping !== null) {
        shippingToAdd = calculatedShipping
      } else if (deliveryMethod === "shipping" && apiShippingCost !== null) {
        shippingToAdd = apiShippingCost
      }
      const taxableAmount = baseTotal + shippingToAdd
      return `$${(taxableAmount * TAX_RATE).toFixed(2)}`
    })()}
  </span>
</div>

        )}
        <div className="flex gap-10 justify-between items-center mt-4 w-full">
          <div className="flex flex-col">
            <span className="text-base tracking-normal leading-6 whitespace-nowrap text-neutral-500">
              {deliveryMethod === "pickup" ? "Store Pickup" : deliveryMethod === "local" ? "Local Delivery" : "Shipping"}
            </span>
            {calculatedDistance && (
              <span className="text-xs text-gray-400">
                Distance: {calculatedDistance} miles
                {calculatedDistance > 50 && <span className="text-red-500 ml-1">(Exceeds 50-mile limit)</span>}
              </span>
            )}
          </div>
          <span className="self-stretch my-auto text-base font-semibold tracking-normal leading-5 text-black">
            {getShippingDisplay()}
          </span>
        </div>
      </div>
      <div className="flex gap-10 justify-between items-center pt-6 mt-6 w-full text-base tracking-normal border-t border-solid border-t-[color:var(--colour-stroke-default,#D5D5D5)]">
        <span className="self-stretch my-auto leading-6 text-neutral-500">TOTAL ({totalItems} items)</span>
        <span className="self-stretch my-auto font-semibold leading-5 text-black">
  {getFinalTotal()}
</span>

      </div>
      <div className="flex gap-2 items-center mt-6 w-full">
        <button
          className="flex gap-2 justify-center items-center self-stretch my-auto w-full h-14 bg-blue-600 basis-[0%] flex-1 min-h-14 min-w-60 rounded-[50px] shrink-1 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleCheckout}
          disabled={isCalculatingShipping}
        >
          <span className="self-stretch my-auto text-base font-medium tracking-normal leading-6 text-center text-white">
            {getButtonText()}
          </span>
          {!isCalculatingShipping && (
            <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-5">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/0ce34641f59b37d52efa24ad3ed287cc1edba4f6?placeholderIfAbsent=true"
                alt="Checkout arrow"
                className="object-contain self-stretch my-auto w-5 aspect-square"
              />
            </div>
          )}
        </button>
      </div>

      {/* Signin/Email Modal */}
      {isSigninModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeSigninModal}
              className="absolute top-4 right-4 text-black text-2xl font-bold"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                zIndex: 1000,
              }}
            >
              &times;
            </button>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Continue Your Order</h3>
              <p className="text-gray-600">Please provide your information to continue</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="guest-firstname" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    id="guest-firstname"
                    type="text"
                    value={guestFirstName}
                    onChange={(e) => {
                      setGuestFirstName(e.target.value)
                      setNameError("")
                    }}
                    placeholder="First name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="guest-lastname" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    id="guest-lastname"
                    type="text"
                    value={guestLastName}
                    onChange={(e) => {
                      setGuestLastName(e.target.value)
                      setNameError("")
                    }}
                    placeholder="Last name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
              <div>
                <label htmlFor="guest-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="guest-email"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => {
                    setGuestEmail(e.target.value)
                    setEmailError("")
                  }}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
              <button
                onClick={handleEmailSubmit}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Continue as Guest
              </button>
              <div className="text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleOpenLogin}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-[#10b988] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Sign In
                </button>
                <button
                  onClick={handleOpenSignUp}
                  className="w-full bg-[#10b981] text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Existing delivery modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black text-2xl font-bold"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                zIndex: 1000,
              }}
            >
              &times;
            </button>
            {errorMessage &&
              (errorMessage === "Please complete all required delivery information." ? (
                <div
                  className="mb-4 p-3 rounded"
                  style={{ backgroundColor: "#d1fae5", border: "1px solid #10b981", color: "#065f46" }}
                >
                  <strong>Kind Reminder:</strong>
                  <br />
                  Kindly fill in all required fields to continue.
                </div>
              ) : (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  <strong>Maximum Limit Exceeded:</strong>
                  <br />
                  {errorMessage}
                  <div className="mt-2 text-sm">
                    💡 <strong>Tip:</strong> Select &ldquo;Pickup&ldquo; below to continue with your order.
                  </div>
                </div>
              ))}
            <CartDelivery onSave={closeModal} orders={orders} />
          </div>
        </div>
      )}

      {/* Auth Modals */}
      {modalType === "signup" && <SignUpModal onClose={handleClose} onOpenLogin={() => setModalType("login")} />}
      {modalType === "login" && (
        <LoginModal
          onClose={handleClose}
          onOpenSignUp={() => setModalType("signup")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {modalType === "success" && <SuccessModal onClose={handleClose} />}
    </aside>
  )
}
