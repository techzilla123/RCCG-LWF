"use client"

import type React from "react"
import { LeaderImage } from "./LeaderImage"
import { LeaderInfo } from "./LeaderInfo"

export const LeaderSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-stone-950 px-6 py-16 md:px-12 lg:px-24">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-120px] top-[120px] h-[300px] w-[300px] rounded-full bg-yellow-400/20 blur-[140px]" />
        <div className="absolute left-[-120px] bottom-[80px] h-[260px] w-[260px] rounded-full bg-indigo-500/20 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-20">
        <LeaderImage />
        <LeaderInfo />
      </div>
    </section>
  )
}

export default LeaderSection
