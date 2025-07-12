"use client"
import { Search } from "lucide-react"
import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`)
      // Optionally clear the search term after search
      // setSearchTerm("");
    }
  }

  return (
    <div className="flex items-center w-full max-w-md bg-stone-50 px-4 py-2 rounded-full min-h-10">
      <Search className="w-5 h-5 text-stone-400" />
      <input
        type="text"
        placeholder="Search..."
        className="ml-2 w-full bg-transparent outline-none text-base text-black placeholder-stone-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  )
}
