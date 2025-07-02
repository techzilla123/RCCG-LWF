'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import Offer from "@/components/Offer"
import TopNavBar from "@/components/TopNavBar"
import CartHeader from "@/components/Users/CartHeader"
import CartItem from "@/components/Users/CartItem"
import Footer from "@/components/Footer"

export default function Home() {
  const [hasOrder, setHasOrder] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken") || ""
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/order-list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
        })

        const data = await response.json()

        // Check if there are any orders
        if (Array.isArray(data?.data) && data.data.length > 0) {
          setHasOrder(true)
        }
      } catch (error) {
        console.error("Failed to fetch orders", error)
      }
    }

    fetchOrders()
  }, [])

  const handleOrderClick = () => {
    router.push("/cart/success/order")
  }

  return (
    <div className="min-h-screen bg-white relative">
      <Offer />
      <TopNavBar />
      <CartHeader />
      <CartItem />
      <Footer />

      {hasOrder && (
        <button
          onClick={handleOrderClick}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-sm hover:bg-blue-700 z-50"
        >
          Order
        </button>
      )}
    </div>
  )
}
