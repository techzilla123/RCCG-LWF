"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  ChevronUp,
  Filter,
  List,
  Tag,
  DollarSign,
  Users,
  Calendar,
  Palette,
  Maximize,
  Star,
} from "lucide-react"

// Define types
type FilterType = "radio" | "checkbox"

interface FilterConfig {
  title: string
  icon: React.ElementType
  type: FilterType
  options: string[]
}

type FilterValue = string | string[]

interface SubCategory {
  subCategoryName: string
  subCategoryId: string
}

// Base config without dynamic subcategories
const baseFiltersConfig: FilterConfig[] = [
  { title: "Sort by", icon: Filter, type: "radio", options: ["Relevant to you", "Recently added", "Trending"] },
  { title: "Order by", icon: List, type: "radio", options: ["Ascending", "Descending"] },
  { title: "Sub Category", icon: Tag, type: "checkbox", options: [] }, // Will be populated dynamically
  { title: "Listings", icon: Tag, type: "radio", options: ["For sale", "Rental"] },
  { title: "Price", icon: DollarSign, type: "radio", options: ["Cheapest first", "Most expensive first"] },
  { title: "Gender", icon: Users, type: "checkbox", options: ["Kids", "Women", "Men"] },
  {
    title: "Occasion",
    icon: Calendar,
    type: "checkbox",
    options: ["Birthday", "Parties", "Events", "Holidays", "Others"],
  },
  {
    title: "Color",
    icon: Palette,
    type: "checkbox",
    options: ["Black", "Red", "Gold", "Purple", "Pink", "Green", "Blue"],
  },
  {
    title: "Size",
    icon: Maximize,
    type: "checkbox",
    options: ["X-Large", "Large", "Medium", "Small", "X-Small", "XX-Small"],
  },
  { title: "Customer Rating", icon: Star, type: "radio", options: ["5-star", "4-star", "3-star", "2-star", "1-star"] },
]

interface FiltersSidebarProps {
  onFiltersChange?: (filters: Record<string, FilterValue>) => void
}

export default function FiltersSidebar({ onFiltersChange }: FiltersSidebarProps) {
  const searchParams = useSearchParams()
 const getPrevPCT = () => {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("prevPCT")
  }
  return null
}

  const selectedSubcategoryId = searchParams.get("SCT")
  const router = useRouter()
  const [filtersConfig, setFiltersConfig] = useState<FilterConfig[]>(baseFiltersConfig)
  const [subcategoriesData, setSubcategoriesData] = useState<SubCategory[]>([])
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(baseFiltersConfig.map(({ title }) => [title, true])),
  )
  const [filters, setFilters] = useState<Record<string, FilterValue>>({
    "Sort by": "Relevant to you",
    Listings: "For sale",
    "Customer Rating": "4-star",
  })

  const productCategoryId = searchParams.get("PCT")
// const goBackToSubcategories = () => {
//   const params = new URLSearchParams(searchParams.toString())

//   const savedPCT = searchParams.get("__PCT")
//   if (savedPCT) {
//     params.set("PCT", savedPCT)
//   }

//   params.delete("SCT")      // Remove subcategory
//   params.delete("__PCT")    // Clean up
//   const newUrl = `?${params.toString()}`
//   router.push(newUrl)

//   setTimeout(() => {
//     window.location.reload()
//   }, 600)
// }

  useEffect(() => {
    if (!productCategoryId) {
      // Reset to original config if no PCT
      const resetConfig = baseFiltersConfig.map((filter) =>
        filter.title === "Sub Category" ? { ...filter, options: [] } : filter,
      )
      setFiltersConfig(resetConfig)
      setSubcategoriesData([])
      return
    }

    // Fetch dynamic subcategories if PCT exists
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product-sub-category/${productCategoryId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
              Authorization: localStorage.getItem("accessToken") || "",
            },
          },
        )
        const result = await response.json()
        const subcategories: SubCategory[] = result?.data || []

        // Store the full subcategory data
        setSubcategoriesData(subcategories)

        const names = subcategories.map((item: SubCategory) => item.subCategoryName)
        const updatedConfig = baseFiltersConfig.map((filter) =>
          filter.title === "Sub Category" ? { ...filter, options: names } : filter,
        )
        setFiltersConfig(updatedConfig)
      } catch (err) {
        console.error("Error fetching subcategories:", err)
      }
    }

    fetchSubcategories()
  }, [productCategoryId])

  // Notify parent component when filters change
  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters)
    }
  }, [filters, onFiltersChange])

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  const updateURL = (subcategoryId: string) => {
  const currentPCT = searchParams.get("PCT")
  if (currentPCT && typeof window !== "undefined") {
    sessionStorage.setItem("prevPCT", currentPCT)
  }

  const params = new URLSearchParams()
  params.set("SCT", subcategoryId)

  const newUrl = `?${params.toString()}`
  router.push(newUrl)

  setTimeout(() => {
    window.location.reload()
  }, 600)
}



 const goBackToSubcategories = () => {
  const prevPCT = getPrevPCT()
  const params = new URLSearchParams()

  if (prevPCT) {
    params.set("PCT", prevPCT)
    sessionStorage.removeItem("prevPCT")
  }

  const newUrl = `?${params.toString()}`
  router.push(newUrl)

  setTimeout(() => {
    window.location.reload()
  }, 600)
}



  const handleChange = (section: string, option: string, type: FilterType) => {
    // Special handling for subcategory selection
    if (section === "Sub Category") {
      const selectedSubcategory = subcategoriesData.find((sub) => sub.subCategoryName === option)

      if (selectedSubcategory) {
        updateURL(selectedSubcategory.subCategoryId)
      }
    }

    if (type === "radio") {
      setFilters((prev) => ({ ...prev, [section]: option }))
    } else {
      setFilters((prev) => {
        const current = prev[section]
        if (Array.isArray(current)) {
          return {
            ...prev,
            [section]: current.includes(option) ? current.filter((o) => o !== option) : [...current, option],
          }
        } else {
          return { ...prev, [section]: [option] }
        }
      })
    }
  }

  const clearAll = () => {
    const clearedFilters = {
      "Sort by": "Relevant to you",
      Listings: "For sale",
      "Customer Rating": "4-star",
    }
    setFilters(clearedFilters)
    // Clear all URL parameters
    router.push(window.location.pathname)
  }

  const applyFilters = () => {
    console.log("Applying filters:", filters)
  }

  return (
    <motion.div
      layout
      className="w-64 p-4 bg-white shadow-lg rounded-md transition-all duration-300 overflow-hidden inline-block"
    >
      <h3 className="text-xl font-semibold mb-4">Filters</h3>
      {selectedSubcategoryId && (
  <button
    onClick={goBackToSubcategories}
    className="mb-4 text-sm text-blue-600 hover:underline flex items-center"
  >
    ← Back to all subcategories
  </button>
)}

      {filtersConfig.map(({ title, icon: Icon, type, options }) => (
        <div key={title} className="mb-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection(title)}>
            <div className="flex items-center space-x-2">
              <Icon className="w-4 h-4" />
              <h3 className="font-medium">{title}</h3>
            </div>
            {openSections[title] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
          <AnimatePresence initial={false}>
            {openSections[title] && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mt-2 pl-6"
              >
                <div className="space-y-2">
                  {options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <input
                        type={type}
                        name={title}
                        value={option}
                        checked={
                          type === "radio"
                            ? (filters[title] as string) === option
                            : Array.isArray(filters[title])
                              ? (filters[title] as string[]).includes(option)
                              : false
                        }
                        onChange={() => handleChange(title, option, type)}
                        className="accent-blue-500"
                      />
                      <label className="text-sm cursor-pointer" onClick={() => handleChange(title, option, type)}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <div className="flex flex-col space-y-2 mt-6">
        <button onClick={applyFilters} className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Apply filters
        </button>
        <button onClick={clearAll} className="text-blue-600 py-2 rounded-md hover:underline">
          Clear all
        </button>
      </div>
    </motion.div>
  )
}
