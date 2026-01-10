"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import ImageSection from "./ImageSection"
import LearnMoreSection from "./LearnMoreSection"
import HorizontalBorder from "./HorizontalBorder"

/* ---------------------------------- */
/* MAIN BACKGROUND SECTION */
/* ---------------------------------- */

function Background() {
  const router = useRouter()

  return (
    <main className="relative overflow-hidden bg-[linear-gradient(110deg,#26235f,#6b4bff)] px-20 py-32 max-md:px-6 max-md:py-20">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-48 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-purple-400/25 blur-[160px]" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="flex gap-28 max-md:flex-col max-md:gap-24">

          {/* LEFT COLUMN */}
          <div className="w-1/2 max-md:w-full">
            <div className="flex flex-col gap-32 max-md:gap-24">

              <ImageCard
                src="/sss.jpeg"
                label="GROUPS"
                className="self-start"
              />

              <div className="flex items-center">
                <LearnMoreSection
                  alignment="right"
                  topPadding="pt-24 max-md:pt-16"
                  onClick={() => router.push("/groups")}
                />
                <HorizontalBorder className="flex-1 opacity-60" />
              </div>

              <ImageCard
                src="/wal.jpeg"
                label="SERVE"
                className="self-end"
              />

            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-1/2 max-md:w-full">
            <div className="flex flex-col justify-center gap-32 max-md:gap-24 h-full">

              <div className="flex items-center gap-8">
                <HorizontalBorder className="flex-1 opacity-60" />
                <LearnMoreSection
                  alignment="left"
                  topPadding="pt-24 max-md:pt-16"
                  onClick={() => router.push("/ministries")}
                />
              </div>

              <ImageCard
                src="/wal1.jpeg"
                label="EVENTS"
                className="self-start"
              />

              <div className="flex items-center gap-8">
                <HorizontalBorder className="flex-1 opacity-60" />
                <LearnMoreSection
                  alignment="left"
                  topPadding="pt-24 max-md:pt-16"
                  onClick={() => router.push("/events")}
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  )
}

export default Background

/* ---------------------------------- */
/* PREMIUM IMAGE CARD */
/* ---------------------------------- */

const ImageCard = ({
  src,
  label,
  className = "",
}: {
  src: string
  label: string
  className?: string
}) => {
  return (
    <div className={`relative group ${className}`}>

      {/* Soft glow layer */}
      <div className="absolute -inset-8 rounded-3xl bg-white/5 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />

      {/* Image container */}
      <div className="relative w-[420px] max-md:w-[300px]">
        <ImageSection
          src={src}
          aspectRatio="aspect-[0.78]"
          className="
            rounded-3xl
            grayscale
            shadow-[0_50px_90px_rgba(0,0,0,0.45)]
            transition-all duration-700 ease-out
            group-hover:grayscale-0
            group-hover:-translate-y-4
          "
        />
        <OverlayText label={label} />
      </div>
    </div>
  )
}

/* ---------------------------------- */
/* EDITORIAL OVERLAY TEXT */
/* ---------------------------------- */

const OverlayText = ({ label }: { label: string }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <span
        className="
          text-transparent
          text-[3rem]
          max-md:text-[2.2rem]
          font-black
          tracking-[0.45em]
          [-webkit-text-stroke:2px_rgba(255,255,255,0.9)]
          opacity-90
        "
      >
        {label}
      </span>
    </div>
  )
}
