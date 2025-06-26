"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { SummaryItemType } from "./types"
import CartDelivery from "./CartDelivery"

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

type DeliveryMethod = "pickup" | "local" | "shipping"

export const OrderSummary: React.FC<OrderSummaryProps> = ({ items, totalItems, total, orders }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("pickup")
  // const [deliveryLocation, setDeliveryLocation] = useState<any>(null)

  useEffect(() => {
    const method = (localStorage.getItem("deliveryMethod") as DeliveryMethod) || "pickup"
    // const location = localStorage.getItem("deliveryLocation")
    setDeliveryMethod(method)
    // setDeliveryLocation(location ? JSON.parse(location) : null)
  }, [])

  const requiredFieldsMap: Record<DeliveryMethod, string[]> = {
    pickup: ["pickupDate", "pickupTime", "phoneNumber"],
    local: ["deliveryDate", "deliveryTime", "address", "postalCode", "phoneNumber"],
    shipping: ["address", "postalCode", "phoneNumber"],
  }

  const taxes = items.find((item) => item.label.toLowerCase() === "taxes")
  const otherItems = items.filter(
    (item) => item.label.toLowerCase() !== "subtotal" && item.label.toLowerCase() !== "taxes",
  )

  const validateRequiredFields = (): boolean => {
    const deliveryData = localStorage.getItem("deliveryLocation")
    if (!deliveryData) return false

    const parsedDeliveryData: LocationInfo = JSON.parse(deliveryData)
    const requiredFields = requiredFieldsMap[deliveryMethod]

    return requiredFields.every((field) => {
      const value = parsedDeliveryData[field as keyof LocationInfo]
      return value && value.toString().trim() !== ""
    })
  }

  const handleCheckout = () => {
    if (validateRequiredFields()) {
      createOrder()
    } else {
      setIsModalOpen(true)
      document.body.style.overflow = "hidden"
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"

    // Re-check validation after modal closes to prevent reopening
    const isValid = validateRequiredFields()
    if (isValid) {
      // If fields are now valid, proceed with checkout
      setTimeout(() => {
        createOrder()
      }, 100)
    }
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const createOrder = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const userData = {
        firstname: localStorage.getItem("firstname"),
        lastname: localStorage.getItem("lastname"),
        userId: localStorage.getItem("userId"),
        email: localStorage.getItem("email"),
      }

      // Get the correct delivery details from localStorage
      const deliveryLocationData = localStorage.getItem("deliveryLocation")
      const deliveryDetails: LocationInfo = deliveryLocationData
        ? JSON.parse(deliveryLocationData)
        : ({} as LocationInfo)

      // Format delivery address as a simple string based on delivery method
      let deliveryAddressString = ""

      if (deliveryMethod === "pickup") {
        deliveryAddressString = `Pickup at: 1919 Faithon P Lucas Sr. Blvd, #135, Mesquite TX 75181 on ${deliveryDetails.pickupDate} at ${deliveryDetails.pickupTime}`
      } else if (deliveryMethod === "local") {
        deliveryAddressString = `Local Delivery to: ${deliveryDetails.address}, ${deliveryDetails.city}, ${deliveryDetails.postalCode} on ${deliveryDetails.deliveryDate} at ${deliveryDetails.deliveryTime}`
        if (deliveryDetails.specialInstructions) {
          deliveryAddressString += ` - Instructions: ${deliveryDetails.specialInstructions}`
        }
      } else if (deliveryMethod === "shipping") {
        deliveryAddressString = `Ship to: ${deliveryDetails.address}, ${deliveryDetails.city}, ${deliveryDetails.postalCode}`
        if (deliveryDetails.specialInstructions) {
          deliveryAddressString += ` - Instructions: ${deliveryDetails.specialInstructions}`
        }
      }

      // Parse total amount properly - remove currency symbols and convert to number
      const cleanTotal = total.replace(/[$,]/g, "")
      const totalAmount = Number.parseFloat(cleanTotal)

      // Fix orders array to ensure amount is unit price, not total price
      const correctedOrders = orders.map((order) => {
        const quantity = Number.parseInt(order.quantity)
        const totalAmountForItem = Number.parseFloat(order.amount)
        const unitPrice = quantity > 1 ? totalAmountForItem / quantity : totalAmountForItem

        return {
          ...order,
          amount: unitPrice.toFixed(2), // Ensure unit price with 2 decimal places
        }
      })

      const requestBody = {
        is_signed_in: true,
        customer_id: userData.userId,
        create_account: false,
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
        phone_number: deliveryDetails.phoneNumber,
        total_amount: totalAmount,
        delivery_address: deliveryAddressString,
        orders: correctedOrders, // Use corrected orders instead of original orders
      }

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


      // Clear cart and redirect to success page
      localStorage.removeItem("cart")
      localStorage.removeItem("deliveryLocation")
      localStorage.removeItem("deliveryMethod")

      // You can add redirect logic here
      // window.location.href = "/order-success";

  

      // Clear cart data
      localStorage.removeItem("cart")
      localStorage.removeItem("deliveryLocation")
      localStorage.removeItem("deliveryMethod")

      // Redirect to Stripe checkout URL
      if (result.data && result.data.url) {
        window.location.href = result.data.url
      } else {
        console.error("No checkout URL received from API")
        alert("Order created but no payment URL received. Please contact support.")
      }
    } catch (err) {
      console.error("Order error:", err)
      alert("Order failed. Please try again.")
    }
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

        {taxes && (
          <div className="flex gap-10 justify-between items-center mt-2 w-full">
            <span className="text-base tracking-normal leading-6 text-neutral-500">Taxes</span>
            <span className="text-base font-semibold tracking-normal leading-5 text-black">{taxes.amount}</span>
          </div>
        )}

        <div className="flex gap-10 justify-between items-center mt-4 w-full">
          <label className="flex gap-2 items-center self-stretch my-auto">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span className="text-base tracking-normal leading-6 whitespace-nowrap text-neutral-500">Shipping</span>
          </label>
          <span className="self-stretch my-auto text-base font-semibold tracking-normal leading-5 text-black">---</span>
        </div>
      </div>

      <div className="flex gap-10 justify-between items-center pt-6 mt-6 w-full text-base tracking-normal border-t border-solid border-t-[color:var(--colour-stroke-default,#D5D5D5)]">
        <span className="self-stretch my-auto leading-6 text-neutral-500">TOTAL ({totalItems} items)</span>
        <span className="self-stretch my-auto font-semibold leading-5 text-black">{total}</span>
      </div>

      <div className="flex gap-2 items-center mt-6 w-full">
        <button
          className="flex gap-2 justify-center items-center self-stretch my-auto w-full h-14 bg-blue-600 basis-[0%] flex-1 min-h-14 min-w-60 rounded-[50px] shrink-1"
          onClick={handleCheckout}
        >
          <span className="self-stretch my-auto text-base font-medium tracking-normal leading-6 text-center text-white">
            Proceed to checkout
          </span>
          <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-5">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/0ce34641f59b37d52efa24ad3ed287cc1edba4f6?placeholderIfAbsent=true"
              alt="Checkout arrow"
              className="object-contain self-stretch my-auto w-5 aspect-square"
            />
          </div>
        </button>
      </div>

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
            <CartDelivery />
          </div>
        </div>
      )}
    </aside>
  )
}
