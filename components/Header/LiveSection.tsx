"use client"

import React from "react"

import { Racing_Sans_One } from "next/font/google"
import { useRouter } from "next/navigation"

const racingSansOne = Racing_Sans_One({
  weight: "400",
  subsets: ["latin"],
})

export const LiveSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const router = useRouter()
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleLiveClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleRCCGLFWLiveClick = () => {
    router.push("/live/rccg-lwf")
    setIsDropdownOpen(false)
  }

  const handleRCCGLiveClick = () => {
    router.push("/live/rccg")
    setIsDropdownOpen(false)
  }

  return (
    <div ref={dropdownRef} className="absolute right-12 md:right-8 top-[38px] z-[15]">
      <section
        onClick={handleLiveClick}
        className="flex items-center h-[30px] md:h-[38px] w-auto gap-1.5 md:gap-2 cursor-pointer hover:opacity-80 transition-opacity"
      >
        <img src="/LWF 2 Logo 1.png" alt="Live streaming indicator" className="w-8 h-[30px] md:w-10 md:h-[38px]" />
        <p className={`${racingSansOne.className} text-slate-700 text-sm md:text-lg`}>Live</p>
      </section>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white shadow-lg border border-gray-200 rounded-md py-2 min-w-[200px] z-50">
          <button
            onClick={handleRCCGLFWLiveClick}
            className="block w-full text-left px-6 py-3 text-sm font-medium text-zinc-800 hover:bg-gray-100 transition-colors uppercase"
          >
            RCCG LFW Live
          </button>
          <button
            onClick={handleRCCGLiveClick}
            className="block w-full text-left px-6 py-3 text-sm font-medium text-zinc-800 hover:bg-gray-100 transition-colors uppercase"
          >
            RCCG Live
          </button>
        </div>
      )}
    </div>
  )
}
