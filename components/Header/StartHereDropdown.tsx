import type * as React from "react"
import Link from "next/link"

export const StartHereDropdown: React.FC = () => {
  return (
    <div
      className="
        w-full
        bg-white
        md:absolute md:top-full md:left-0 md:mt-2
        md:shadow-lg md:border md:border-gray-200 md:rounded-md
        py-2
        md:min-w-[250px]
        z-50
      "
    >
      <Link
        href="/about"
        className="block px-6 py-4 md:py-3 text-sm font-medium text-zinc-800 hover:bg-gray-100 transition-colors uppercase"
      >
        ABOUT
      </Link>

      <Link
        href="/plan-visit"
        className="block px-6 py-4 md:py-3 text-sm font-medium text-zinc-800 hover:bg-gray-100 transition-colors uppercase"
      >
        PLAN YOUR VISIT
      </Link>

      <Link
        href="/about#our-beliefs"
        className="block px-6 py-4 md:py-3 text-sm font-medium text-zinc-800 hover:bg-gray-100 transition-colors uppercase"
      >
        WHAT WE BELIEVE
      </Link>
    </div>
  )
}
