'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Offer from "@/components/Offer"
import TopNavBar from "@/components/TopNavBar"
import Hero from "@/components/Hero"
import Occasions from "@/components/Occasions"
import Heart from "@/components/Heart"
import New from "@/components/New"
import Category from "@/components/Category"
import ForAdults from "@/components/ForAdults"
import AboutSection from "@/components/AboutSection"
import Faq from "@/components/Faq"
import Offers from "@/components/Offers"
import Footer from "@/components/Footer"
import Reviews from "@/components/Reviews"
import BotpressChat from "@/components/BotpressChat"

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

        // ✅ Corrected here
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
    <div className="min-h-screen w-screen bg-white relative overflow-x-hidden">

      <Offer />
      <TopNavBar />
      <Hero />
      <Occasions />
      <Heart />
      <New />
      <Category />
      <ForAdults />
      <AboutSection />
      <Faq />
      <Reviews />
      <Offers />
      <Footer />

       {hasOrder ? (
        <button
          onClick={handleOrderClick}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center text-sm hover:bg-blue-700 z-50"
        >
          Order
        </button>
      ) : (
        <BotpressChat />
      )}
    </div>
  )
}
