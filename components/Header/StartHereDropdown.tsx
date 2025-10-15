import type * as React from "react"
import Link from "next/link"

export const StartHereDropdown: React.FC = () => {
  return (
    <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border border-gray-200 rounded-md py-2 min-w-[250px] z-50">
      <Link
        href="/about"
        className="block px-6 py-3 text-sm font-medium text-zinc-800 hover:bg-gray-100 transition-colors uppercase"
      >
        ABOUT
      </Link>
      <Link
        href="/plan-visit"
        className="block px-6 py-3 text-sm font-medium text-zinc-800 hover:bg-gray-100 transition-colors uppercase"
      >
        PLAN YOUR VISIT
      </Link>
      <Link
        href="/about#our-beliefs"
        className="block px-6 py-3 text-sm font-medium text-zinc-800 hover:bg-gray-100 transition-colors uppercase"
      >
        WHAT WE BELIEVE
      </Link>
    </div>
  )
}
