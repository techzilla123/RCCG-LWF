"use client"

import * as React from "react"
import { CategorySection } from "./CategorySection"
import { ScrollBar } from "./ScrollBar"

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

  // Reverse map display names to API names
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

  // Fetch general categories
  const fetchGeneralCategories = async () => {
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
    }
  }

  // Fetch product categories for a general category
  const fetchProductCategories = async (generalCategoryId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product-category/${generalCategoryId}`,
        {
          method: "GET",
          headers: getApiHeaders(),
        },
      )

      if (!response.ok) {
        throw new Error("Failed to fetch product categories")
      }

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error("Error fetching product categories:", error)
      return []
    }
  }

  // Fetch sub categories for a product category
  const fetchSubCategories = async (categoryId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product-sub-category/${categoryId}`,
        {
          method: "GET",
          headers: getApiHeaders(),
        },
      )

      if (!response.ok) {
        throw new Error("Failed to fetch sub categories")
      }

      const data = await response.json()
      return data.data || []
    } catch (error) {
      console.error("Error fetching sub categories:", error)
      return []
    }
  }

  // Load categories when selected category changes
  React.useEffect(() => {
    const loadCategories = async () => {
      if (!selectedCategory) return

      setIsLoading(true)

      // Find the general category ID for the selected category
      const apiCategoryName = reverseMapCategoryName(selectedCategory)
      const generalCategory = generalCategories.find((cat) => cat.name === apiCategoryName)

      if (!generalCategory) {
        setIsLoading(false)
        return
      }

      try {
        // Fetch product categories
        const productCategories: ProductCategory[] = await fetchProductCategories(generalCategory.generalCategoryId)

        // Fetch sub categories for each product category
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

  // Load general categories on mount
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
        <CategorySection key={index} title={category.title} items={category.items} />
      ))}
      <div className="flex z-0 flex-1 shrink basis-0 h-[100px] w-[209px]" />
      <ScrollBar />
    </section>
  )
}
