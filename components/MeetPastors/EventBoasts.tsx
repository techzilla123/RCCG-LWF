"use client"

import type React from "react"
import { BackgroundGlow } from "./BackgroundGlow"
import { DecorativeGraphic } from "./DecorativeGraphic"
import { LeaderImage } from "./LeaderImage"
import { LeaderInfo } from "./LeaderInfo"

export const EventBoasts: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 px-6 py-20 md:px-12 lg:px-24">
      {/* Decorative Background */}
      <BackgroundGlow />
      <DecorativeGraphic />

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center gap-16 lg:flex-row lg:gap-20">
        <LeaderImage />
        <LeaderInfo />
      </div>
    </section>
  )
}

export default EventBoasts
