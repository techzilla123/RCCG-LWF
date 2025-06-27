"use client"

import * as React from "react"
import { MenuButton } from "./MenuButton"

type SideMenuProps = {
  selectedCategory: string
  onSelect: (label: string) => void
}

interface GeneralCategory {
  name: string
  generalCategoryId: string
}

export const SideMenu: React.FC<SideMenuProps> = ({ selectedCategory, onSelect }) => {
  const [generalCategories, setGeneralCategories] = React.useState<GeneralCategory[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  // Static icons mapping for each category
  const categoryIcons: { [key: string]: string } = {
    Balloons:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/88a215d095a9cc37f0fbf899503dc8dec471dea2?placeholderIfAbsent=true",
    Birthdays:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/99669d3261e528df3456c6036e91dcac48d26dad?placeholderIfAbsent=true",
    "Holidays & Occasions":
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/36ec17d9786b941b0e883c6bf11e39f2a2b38c99?placeholderIfAbsent=true",
    "Party Supplies":
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/f3b1bdaac013192d5bc79182008198990569a8b8?placeholderIfAbsent=true",
    Decoration:
      "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/dad70678c904999895db481e1567a7c3089a1dbd?placeholderIfAbsent=true",
    Rentals: "https://www.svgrepo.com/show/284053/disco-ball-disco.svg",
  }

  // API helper function
  const getApiHeaders = () => {
    const token = localStorage.getItem("accessToken") || ""
    return {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
      ...(token && { Authorization: token }),
    }
  }

  // Map API category names to display names
  const mapCategoryName = (apiName: string): string => {
    const mapping: { [key: string]: string } = {
      Balloon: "Balloons",
      "Birthday Shop": "Birthdays",
      "Holidays & Occassions": "Holidays & Occasions",
      "Party Supplies": "Party Supplies",
      Decoration: "Decoration",
      Rentals: "Rentals",
    }
    return mapping[apiName] || apiName
  }

  // Fetch general categories
  const fetchGeneralCategories = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product-general-category`, {
        method: "GET",
        headers: getApiHeaders(),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch general categories")
      }

      const data = await response.json()
      setGeneralCategories(data.data || [])
    } catch (error) {
      console.error("Error fetching general categories:", error)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchGeneralCategories()
  }, [])

  const menuItems = generalCategories.map((category) => ({
    label: mapCategoryName(category.name),
    icon: categoryIcons[mapCategoryName(category.name)] || categoryIcons["Balloons"],
    generalCategoryId: category.generalCategoryId,
  }))

  if (isLoading) {
    return (
      <nav className="p-4 rounded-2xl bg-stone-50 min-w-60 w-[267px]">
        <div className="flex-1 w-full">
          <div className="animate-pulse space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="p-4 rounded-2xl bg-stone-50 min-w-60 w-[267px]">
      <div className="flex-1 w-full">
        {menuItems.map(({ label, icon }) => (
          <MenuButton
            key={label}
            icon={icon}
            label={label}
            isActive={selectedCategory === label}
            onClick={() => onSelect(label)}
          />
        ))}
      </div>
      <div className="pt-2 w-full border-t border-solid border-t-[#D5D5D5]">
        <button className="flex gap-10 justify-between items-center pt-16 pb-8 w-full h-8 bg-black bg-opacity-0 min-h-8 rounded-[50px]">
          <span className="self-stretch my-auto text-sm tracking-normal leading-6 text-center text-blue-600">
            View all
          </span>
          <span className="flex gap-2.5 justify-center items-center self-stretch my-auto w-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/eeb4c98c4293661beb0261761ebda38f9ed3beaf?placeholderIfAbsent=true"
              className="object-contain self-stretch my-auto w-4 aspect-square"
              alt=""
            />
          </span>
        </button>
      </div>
    </nav>
  )
}
