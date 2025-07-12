"use client"
import { useEffect, useState } from "react"
import { ShoppingCart } from "lucide-react"
import { NotificationBadge } from "./NotificationBadge"

// Interface for localStorage items (copied from ProductInfo for consistency)
interface LocalStorageItem {
  product_id: string
  quantity: string
  size: string
  color: string
  productName?: string
  price?: number
  discountPrice?: number
  finalPrice?: number // This holds the pre-calculated final price (inflated or discounted)
  imageOne?: string
}

export const CartDropdown = () => {
  const [hovered, setHovered] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    const fetchCart = async () => {
  const token = localStorage.getItem("accessToken") || ""
  console.log("Token exists?", !!token)

  try {
    if (token) {
      console.log("Fetching from API...")

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/cart-list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          Authorization: token,
        },
      })

      const result = await response.json()
      console.log("API cart data:", result)

      const items = result?.data || []
      let total = 0
      let count = 0

      for (const item of items) {
        const details = item?.productDetails || {}
        const price = Number.parseFloat(details.price || "0")
        const discount = Number.parseFloat(details.discountPrice || "0")
        const finalPrice = price - discount
        const qty = Number.parseInt(item?.quantity || "0")

        total += finalPrice * qty
        count += qty
      }

      console.log("API Cart count:", count, "Total:", total)
      setCartTotal(total)
      setItemCount(count)
    } else {
      console.log("Using localStorage fallback")
      const localCart = localStorage.getItem("localCart")
      const cartItems: LocalStorageItem[] = localCart ? JSON.parse(localCart) : []
      console.log("Local cart items:", cartItems)

      let total = 0
      let count = 0

      for (const item of cartItems) {
        const itemPrice = Number.parseFloat(item.finalPrice?.toString() || "0")
        const qty = Number.parseInt(item.quantity || "0")
        total += itemPrice * qty
        count += qty
      }

      console.log("Local Cart count:", count, "Total:", total)
      setCartTotal(total)
      setItemCount(count)
    }
  } catch (error) {
    console.error("Failed to fetch cart", error)
  }
}


    fetchCart()
    // ✅ Listen to custom event and update cart
    window.addEventListener("cartUpdated", fetchCart)
    // Cleanup on unmount
    return () => {
      window.removeEventListener("cartUpdated", fetchCart)
    }
  }, [])

  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <button className="relative w-10 h-10 flex items-center justify-center">
        <ShoppingCart className="w-5 h-5 text-black" />
        <NotificationBadge count={itemCount} />
      </button>
      {hovered && (
        <div className="absolute left-1/2 top-full z-50 mt-2 flex flex-col items-center -translate-x-1/2">
          {/* Pointer */}
          <div className="w-4 h-4 bg-black rotate-45 -translate-y-1/2" />
          {/* Dropdown box */}
          <div className="bg-black w-[140px] h-[60px] rounded-lg flex flex-col items-center justify-center text-white px-2 -mt-4">
            <div className="text-[15px]">
              Total: <span className="font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="mt-0.5 text-blue-400 underline text-[15px] hover:text-blue-300 transition">
              View cart
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
