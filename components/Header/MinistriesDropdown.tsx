import type * as React from "react"
import Link from "next/link"

export const MinistriesDropdown: React.FC = () => {
  return (
    <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border border-gray-200 rounded-md py-2 min-w-[200px] z-50">
      <Link
        href="/ministries"
        className="block px-6 py-3 text-sm font-medium text-zinc-800 hover:bg-gray-100 transition-colors uppercase"
      >
        Ministries
      </Link>
      <Link
        href="/ministries/groups"
        className="block px-6 py-3 text-sm font-medium text-zinc-800 hover:bg-gray-100 transition-colors uppercase"
      >
        Group
      </Link>
      <Link
        href="/ministries/serve"
        className="block px-6 py-3 text-sm font-medium text-zinc-800 hover:bg-gray-100 transition-colors uppercase"
      >
        Serve
      </Link>
    </div>
  )
}
