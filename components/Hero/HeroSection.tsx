"use client"

import { Montserrat } from "next/font/google"
import { useEffect, useState } from "react"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300"],
})

export const HeroSection = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Prevent hydration mismatch
    setReady(true)
  }, [])

  if (!ready) return null

  return (
    <section className="relative w-full -mt-[18px] overflow-hidden">
     <video
  src="/about.mp4"
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  disablePictureInPicture
  className="absolute inset-0 w-full h-full object-cover"
/>

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex flex-col items-start px-6 md:px-24 lg:px-48 pt-48 md:pt-80 pb-48">
        <h1
          className={`${montserrat.className} text-white uppercase font-light
          text-[28px] sm:text-[40px] md:text-[55px]`}
        >
          <span>A </span>
          <span className="font-bold">MISSION</span>
          <br />
          <span>FOR ALL PEOPLE TO</span>
        </h1>
      </div>
    </section>
  )
}
