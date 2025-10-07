import type React from "react"
import { PastorCard } from "./PastorCard"

export const PastorInfo: React.FC = () => {
  return (
    <section className="flex relative flex-col gap-8 items-start w-full max-w-[450px] lg:items-start md:items-center sm:items-center">
      <header className="flex relative flex-col gap-5 items-start w-full lg:items-start md:items-center sm:items-center">
        <h1 className="relative text-5xl font-bold tracking-wider text-white leading-tight lg:text-5xl lg:text-left md:text-4xl md:text-center sm:text-3xl sm:text-center">
          Meet Our Honorable Pastors
        </h1>
        <p className="relative text-base leading-relaxed text-zinc-300 w-full max-w-[417px] lg:text-left md:text-center sm:text-sm sm:text-center">
          The event features renowned influencers and innovators shaping trends and driving creativity across various
          industries.
        </p>
      </header>
      <div className="flex relative gap-12 items-start w-full flex-wrap lg:flex-nowrap lg:gap-16 md:gap-10 md:justify-center sm:flex-col sm:gap-6 sm:items-center">
        <PastorCard name="Sarah Johnson" title="Senior Pastor" />
        <PastorCard name="Christopher Wilson" title="Pastor, innovation Leader" />
      </div>
    </section>
  )
}
