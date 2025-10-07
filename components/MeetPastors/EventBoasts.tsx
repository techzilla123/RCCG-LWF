"use client"
import type React from "react"
import { BackgroundGlow } from "./BackgroundGlow"
import { LeftImageSection } from "./LeftImageSection"
import { PastorInfo } from "./PastorInfo"
import { RightImageSection } from "./RightImageSection"
import { DecorativeGraphic } from "./DecorativeGraphic"

export const EventBoasts: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-8 py-12 bg-stone-950 min-h-[615px] w-full overflow-hidden lg:px-32 lg:py-16 md:px-16 md:py-12 sm:px-6 sm:py-8">
      <BackgroundGlow />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16 w-full max-w-[1400px]">
        <LeftImageSection />
        <PastorInfo />
        <RightImageSection />
      </div>

      <DecorativeGraphic />
    </section>
  )
}

export default EventBoasts
