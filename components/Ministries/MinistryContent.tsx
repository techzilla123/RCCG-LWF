"use client"

import { Montserrat } from "next/font/google"
import React from "react"

const montserrat = Montserrat({ weight: "300", subsets: ["latin"] })
const montserratBold = Montserrat({ weight: "700", subsets: ["latin"] })

interface MinistryContentProps {
  className?: string
  ministry: {
    title: string
    slogan: string
    gradientClass: string
    description: string
  }
  onReadMore: () => void
}

export function MinistryContent({
  className = "",
  ministry,
  onReadMore,
}: MinistryContentProps) {
  return (
    <article className={`flex-1 text-center md:text-left ${className}`}>
      <span
        className={`${montserratBold.className} text-3xl uppercase text-transparent bg-clip-text ${ministry.gradientClass}`}
      >
        {ministry.slogan}
      </span>

      <h2 className="mt-4 text-2xl font-bold text-zinc-800">
        {ministry.title}
      </h2>

      <p
        className={`${montserrat.className} mt-4 text-zinc-700`}
        style={{ lineHeight: "27px" }}
      >
        {ministry.description}
      </p>

      <button
        onClick={onReadMore}
        className="mt-8 px-6 py-3 text-white uppercase rounded transition-colors"
        style={{ backgroundColor: "#333064" }}
      >
        Read More
      </button>
    </article>
  )
}
