"use client"

import type * as React from "react"

interface HamburgerIconProps {
  isOpen: boolean
  onClick: () => void
}

export const HamburgerIcon: React.FC<HamburgerIconProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 md:hidden z-50 relative"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
    >
      <span
        className={`w-6 h-0.5 bg-slate-700 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
      />
      <span className={`w-6 h-0.5 bg-slate-700 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
      <span
        className={`w-6 h-0.5 bg-slate-700 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
      />
    </button>
  )
}
