"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

import Offer from "@/components/Offer"
import TopNavBar from "@/components/TopNavBar"
import CartHeader from "@/components/Users/CartHeader"
import CartItem from "@/components/Users/CartItem"
import Footer from "@/components/Footer"

const options = [
  {
    label: "Pickup",
    image: "/ezgif-3c75295c92496b-removebg-preview.png",
  },
  {
    label: "Local Delivery",
    image: "/Branded_Van__1_-removebg-preview.png",
  },
  {
    label: "Shipping",
    image: "https://cdn-icons-png.flaticon.com/512/1239/1239525.png",
  },
]

// cooldown before showing modal again (in hours)
const COOLDOWN_HOURS = 24

export default function Home() {
  const [hasOrder, setHasOrder] = useState(false)
  const [showOptions, setShowOptions] = useState(false) // start hidden
  const [index, setIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken") || ""
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/order-list`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
              ...(token && { Authorization: token }),
            },
          }
        )

        const data = await response.json()
        if (Array.isArray(data?.data) && data.data.length > 0) {
          setHasOrder(true)
        }
      } catch (error) {
        console.error("Failed to fetch orders", error)
      }
    }

    fetchOrders()
  }, [])

  // ✅ Modal first-time + cooldown check
  useEffect(() => {
    const lastShown = localStorage.getItem("checkoutOptionsLastShown")
    const now = Date.now()

    if (!lastShown) {
      // first visit
      setShowOptions(true)
      localStorage.setItem("checkoutOptionsLastShown", now.toString())
    } else {
      const hoursSince = (now - parseInt(lastShown, 10)) / (1000 * 60 * 60)
      if (hoursSince >= COOLDOWN_HOURS) {
        setShowOptions(true)
        localStorage.setItem("checkoutOptionsLastShown", now.toString())
      }
    }
  }, [])

  // rotate checkout options
  useEffect(() => {
    if (!showOptions) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % options.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [showOptions])

  const handleOrderClick = () => {
    router.push("/cart/success/order")
  }

  const current = options[index]

  return (
    <div className="min-h-screen bg-white relative">
      <Offer />
      <TopNavBar />
      <CartHeader />
      <CartItem />
      <Footer />

      {/* 🔥 Modal overlay + animated card */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white rounded-xl shadow-lg p-4 w-[280px] text-center"
            >
              {/* Close button */}
              <button
                onClick={() => setShowOptions(false)}
                className="absolute top-2 right-3 text-lg text-gray-400 hover:text-red-500"
              >
                ×
              </button>

              {/* Option content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-2"
                >
                  <img
                    src={current.image}
                    alt={current.label}
                    className="w-14 h-14 object-contain"
                  />
                  <h2 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 text-sm">
                    {current.label}
                  </h2>
                  <p className="text-gray-600 text-xs">available at checkout</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Order Button */}
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
