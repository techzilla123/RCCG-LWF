"use client"

import * as React from "react"
import { CategorySection } from "./CategorySection"
import { ScrollBar } from "./ScrollBar"
import { useRouter } from "next/navigation"


type CategoryListProps = {
  selectedCategory: string
}

interface GeneralCategory {
  name: string
  generalCategoryId: string
}

interface ProductCategory {
  categoryId: string
  categoryName: string
  generalCategoryName: string
  noOfProducts: number
}

interface SubCategory {
  subCategoryName: string
  subCategoryId: string
}

interface CategoryData {
  parent: string
  title: string
  items: string[]
}

export const CategoryList: React.FC<CategoryListProps> = ({ selectedCategory }) => {
  const [categories, setCategories] = React.useState<CategoryData[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [generalCategories, setGeneralCategories] = React.useState<GeneralCategory[]>([])

  const router = useRouter()

const handleItemClick = (item: string) => {
  const category = selectedCategory.toLowerCase()

  if (category === "rentals") {
    router.push("/rentals")
  } else if (category === "balloons") {
    router.push("/shop/balloon")
  } else if (category === "party supplies") {
    router.push("/shop/party-supplies")
  } else if (category === "decoration") {
    router.push("/shop/decorations")
  } else if (category === "birthdays") {
    router.push("/shop/birthday")
  } else if (category === "holidays & occasions") {
    router.push("/shop/holiday")
  } else {
    console.log("No matching route for:", category)
  }
}

  const getApiHeaders = () => {
    const token = localStorage.getItem("accessToken") || ""
    return {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
      ...(token && { Authorization: token }),
    }
  }

  const reverseMapCategoryName = (displayName: string): string => {
    const mapping: { [key: string]: string } = {
      Balloons: "Balloon",
      Birthdays: "Birthday Shop",
      "Holidays & Occasions": "Holidays & Occassions",
      "Party Supplies": "Party Supplies",
      Decoration: "Decoration",
      Rentals: "Rentals",
    }
    return mapping[displayName] || displayName
  }

  const fetchGeneralCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product-general-category`, {
        method: "GET",
        headers: getApiHeaders(),
      })

      if (!response.ok) throw new Error("Failed to fetch general categories")

      const data = await response.json()
      setGeneralCategories(data.data || [])
    } catch (error) {
      console.error("Error fetching general categories:", error)
    }
  }

  const fetchProductCategories = async (generalCategoryId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product-category/${generalCategoryId}`,
        {
          method: "GET",
          headers: getApiHeaders(),
        },
      )

      if (!response.ok) throw new Error("Failed to fetch product categories")

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error("Error fetching product categories:", error)
      return []
    }
  }

  const fetchSubCategories = async (categoryId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product-sub-category/${categoryId}`,
        {
          method: "GET",
          headers: getApiHeaders(),
        },
      )

      if (!response.ok) throw new Error("Failed to fetch sub categories")

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error("Error fetching sub categories:", error)
      return []
    }
  }

  React.useEffect(() => {
    const loadCategories = async () => {
      if (!selectedCategory) return

      setIsLoading(true)

      const apiCategoryName = reverseMapCategoryName(selectedCategory)
      const generalCategory = generalCategories.find((cat) => cat.name === apiCategoryName)

      if (!generalCategory) {
        setIsLoading(false)
        return
      }

      try {
        const productCategories: ProductCategory[] = await fetchProductCategories(generalCategory.generalCategoryId)

        const categoriesWithSubs = await Promise.all(
          productCategories.map(async (productCategory) => {
            const subCategories: SubCategory[] = await fetchSubCategories(productCategory.categoryId)
            return {
              parent: selectedCategory,
              title: productCategory.categoryName,
              items: subCategories.map((sub) => sub.subCategoryName),
            }
          }),
        )

        setCategories(categoriesWithSubs)
      } catch (error) {
        console.error("Error loading categories:", error)
        setCategories([])
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [selectedCategory, generalCategories])

  React.useEffect(() => {
    fetchGeneralCategories()
  }, [])

  if (isLoading) {
    return (
      <section className="flex relative flex-wrap flex-1 shrink gap-10 items-start px-4 h-full basis-0 min-w-60 max-md:max-w-full">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-64 h-32 bg-gray-200 rounded"></div>
          ))}
        </div>
        <ScrollBar />
      </section>
    )
  }

  return (
    <section className="flex relative flex-wrap flex-1 shrink gap-10 items-start px-4 h-full basis-0 min-w-60 max-md:max-w-full">
      {categories.map((category, index) => (
       <CategorySection
  key={index}
  title={category.title}
  items={category.items}
  onItemClick={handleItemClick}
/>

      ))}
      <div className="flex z-0 flex-1 shrink basis-0 h-[100px] w-[209px]" />
      <ScrollBar />
    </section>
  )
}
