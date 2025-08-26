"use client"
import { Search } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface ProductSuggestion {
  productId: string
  productName: string
  imageOne: string
}

interface ApiProduct {
  productId: string
  productName: string
  imageOne: string
}

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // Fetch suggestions from API
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length < 2) {
        setSuggestions([])
        return
      }
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/fetch-product-by-name/${encodeURIComponent(
            searchTerm.trim(),
          )}?page=1`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            },
          },
        )
        if (!res.ok) return
        const json = await res.json()
        const productList = Array.isArray(json.data?.product)
          ? json.data.product
          : Array.isArray(json.data)
          ? json.data
          : []

      setSuggestions(
  productList.map((p: ApiProduct): ProductSuggestion => ({
    productId: p.productId,
    productName: p.productName.replace(/\//g, ""), // remove all '/'
    imageOne: p.imageOne,
  }))
)


        setShowDropdown(true)
      } catch (err) {
        console.error("Suggestion fetch error:", err)
      }
    }

    const delayDebounce = setTimeout(() => {
      fetchSuggestions()
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [searchTerm])

  // Handle Enter search
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      router.push(`/shop?search=${encodeURIComponent(searchTerm.trim())}`)
      setShowDropdown(false)
    }
  }

const handleSelect = (name: string) => {
  const cleanName = name.replace(/\//g, "") // remove '/'
  setSearchTerm(cleanName)
  setShowDropdown(false)
  router.push(`/shop?search=${encodeURIComponent(cleanName)}`)
}

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <div className="flex items-center bg-stone-50 px-4 py-2 rounded-full min-h-10">
        <Search className="w-5 h-5 text-stone-400" />
        <input
          type="text"
          placeholder="Search..."
          className="ml-2 w-full bg-transparent outline-none text-base text-black placeholder-stone-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
        />
      </div>

      {/* Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto z-50">
          <div className="flex flex-col">
            {suggestions.map((s) => (
              <button
                key={s.productId}
                onClick={() => handleSelect(s.productName)}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-sm truncate"
                title={s.productName}
              >
                {/* Product Image */}
                <img
                  src={s.imageOne}
                  alt={s.productName}
                  className="w-10 h-10 object-cover rounded"
                />
                {/* Product Name */}
                <span className="truncate">{s.productName}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
