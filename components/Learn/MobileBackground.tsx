"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import ImageSection from "./ImageSection"
import LearnMoreSection from "./LearnMoreSection"
import HorizontalBorder from "./HorizontalBorder"

function Background() {
  const router = useRouter()

  return (
    <main className="relative overflow-hidden bg-[linear-gradient(110deg,#26235f,#6b4bff)] px-20 py-24 max-md:px-6 max-md:py-14">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-400/25 blur-[140px]" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="flex gap-20 max-md:flex-col max-md:gap-14">

          {/* LEFT COLUMN */}
          <div className="w-1/2 max-md:w-full">
            <div className="flex flex-col gap-10">

              {/* GROUPS — bottom right */}
              <div className="relative">
                <ImageCard src="/sss.jpeg" label="GROUPS" />

                <div className="absolute -bottom-6 right-0 flex items-center gap-4">
                  <LearnMoreSection
                    alignment="right"
                    topPadding="pt-0"
                    onClick={() => router.push("/groups")}
                  />
                  <HorizontalBorder className="w-24 opacity-60" />
                </div>
              </div>

              {/* SERVE — FAR LEFT + STRAIGHT TEXT */}
              <div className="relative self-end">
                <ImageCard src="/wal.jpeg" label="SERVE" />

                <div className="absolute -bottom-6 -left-14 flex items-center gap-4">
                  <HorizontalBorder className="w-24 opacity-60" />
                  <div className="leading-none flex items-center">
                    <LearnMoreSection
                      alignment="left"
                      topPadding="pt-0"
                       className="w-full whitespace-nowrap"
                      onClick={() => router.push("/serve")}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-1/2 max-md:w-full">
            <div className="flex flex-col justify-center gap-10 h-full">

              {/* EVENTS — FAR RIGHT */}
              <div className="relative">
                <ImageCard src="/wal1.jpeg" label="EVENTS" />

                <div className="absolute -bottom-6 right-0 flex items-center gap-4">
                  <LearnMoreSection
                    alignment="right"
                    topPadding="pt-0"
                    onClick={() => router.push("/events")}
                  />
                  <HorizontalBorder className="w-24 opacity-60" />
                </div>
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
/* IMAGE CARD */
/* ---------------------------------- */

const ImageCard = ({
  src,
  label,
}: {
  src: string
  label: string
}) => {
  return (
    <div className="relative group">

      <div className="absolute -inset-5 rounded-3xl bg-white/5 blur-2xl opacity-0 group-hover:opacity-100 transition duration-700" />

      <div className="relative w-[420px] max-md:w-[300px]">
        <ImageSection
          src={src}
          aspectRatio="aspect-[0.78]"
          className="
            rounded-3xl
            grayscale
            shadow-[0_40px_80px_rgba(0,0,0,0.45)]
            transition-all duration-700
            group-hover:grayscale-0
            group-hover:-translate-y-2
          "
        />
        <OverlayText label={label} />
      </div>
    </div>
  )
}

/* ---------------------------------- */
/* OVERLAY TEXT */
/* ---------------------------------- */

const OverlayText = ({ label }: { label: string }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <span
        className="
          text-transparent
          text-[3rem]
          max-md:text-[2.1rem]
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
