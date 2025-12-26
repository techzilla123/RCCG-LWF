import type * as React from "react"
import Link from "next/link"

export const MinistriesDropdown: React.FC = () => {
  return (
    <div
      className="
        w-full
        bg-white
        md:absolute md:top-full md:left-0 md:mt-2
        md:shadow-lg md:border md:border-gray-200 md:rounded-md
        py-2
        md:min-w-[200px]
        z-50
      "
    >
      <Link
        href="/ministries"
        className="block px-6 py-4 md:py-3 text-sm font-medium text-zinc-800 hover:bg-gray-100 transition-colors uppercase"
      >
        Ministries
      </Link>

      <Link
        href="/groups"
        className="block px-6 py-4 md:py-3 text-sm font-medium text-zinc-800 hover:bg-gray-100 transition-colors uppercase"
      >
        Service Ministries
      </Link>
    </div>
  )
}
