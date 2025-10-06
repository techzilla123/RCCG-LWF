import type * as React from "react"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300"], // Light
})

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full -mt-[18px] overflow-hidden">
      {/* Background Image */}
      <img
        src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/e586ae2f534758e44f492dec418a3845b1fda35a?placeholderIfAbsent=true"
        alt="Cross on a mountain"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text */}
      <div className="relative z-10 flex flex-col items-start px-6 md:px-24 lg:px-48 pt-48 md:pt-80 pb-48">
        <h1
          className={`${montserrat.className} text-white uppercase font-light text-[28px] leading-[32px] sm:text-[40px] sm:leading-[44px] md:text-[55px] md:leading-[60.5px]`}
        >
          <span>A </span>
          <span className="font-bold">MOVEMENT</span>
          <br />
          <span>FOR ALL PEOPLE TO</span>
        </h1>
      </div>
    </section>
  )
}
