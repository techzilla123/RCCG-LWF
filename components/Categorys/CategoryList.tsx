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
  categoryId: string
  items: { name: string; id: string; isSub: boolean }[]
}

export const CategoryList: React.FC<CategoryListProps> = ({ selectedCategory }) => {
  const [categories, setCategories] = React.useState<CategoryData[]>([])
  const [isLoading, setIsLoading] = React.useState(true) // Set initial loading to true
  const [generalCategories, setGeneralCategories] = React.useState<GeneralCategory[]>([])
  const router = useRouter()

  // New: Ref to store the consolidated map of all product categories and their subcategories
  const allProductCategorySubCategoryMap = React.useRef<
    Map<string, { categoryId: string; subCategories: SubCategory[] }>
  >(new Map())
  // New: State to track if the initial data (consolidated map) is loaded
  const [isInitialDataLoaded, setIsInitialDataLoaded] = React.useState(false)

  const handleItemClick = (item: { name: string; id: string; isSub: boolean }) => {
    const category = selectedCategory.toLowerCase()
    let basePath = ""
    if (category === "rentals") basePath = "/rentals"
    else if (category === "balloons") basePath = "/shop/balloon"
    else if (category === "party supplies") basePath = "/shop/party-supplies"
    else if (category === "decoration") basePath = "/shop/decorations"
    else if (category === "birthdays") basePath = "/shop/birthday"
    else if (category === "holidays & occasions") basePath = "/shop/holiday"
    else {
      console.log("No matching route for:", category)
      return
    }
    const queryParam = item.isSub ? `?SCT=${item.id}` : `?PCT=${item.id}`
    router.push(`${basePath}${queryParam}`)
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
      return data.data || []
    } catch (error) {
      console.error("Error fetching general categories:", error)
      return []
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

  // New: Effect to fetch all general categories and build the consolidated map
  React.useEffect(() => {
   const initializeData = async () => {
  setIsLoading(true)

  try {
    const fetchedGeneralCategories: GeneralCategory[] = await fetchGeneralCategories()
    setGeneralCategories(fetchedGeneralCategories)

    const consolidatedMap = new Map<string, { categoryId: string; subCategories: SubCategory[] }>()

    const categoryPromises = fetchedGeneralCategories.map(async (generalCat) => {
      const productCategories = await fetchProductCategories(generalCat.generalCategoryId)

      const subCategoryPromises = productCategories.map(async (productCat) => {
        const subCategories = await fetchSubCategories(productCat.categoryId)

        return {
          categoryName: productCat.categoryName,
          categoryId: productCat.categoryId,
          subCategories,
        }
      })

      const productCategoryResults = await Promise.all(subCategoryPromises)
      return productCategoryResults
    })

    const allResults = await Promise.all(categoryPromises)

    // Flatten and store
    allResults.flat().forEach(({ categoryName, categoryId, subCategories }) => {
      if (
        consolidatedMap.has(categoryName) &&
        consolidatedMap.get(categoryName)?.subCategories.length
      ) {
        return // skip if already populated with subs
      }
      consolidatedMap.set(categoryName, { categoryId, subCategories })
    })

    allProductCategorySubCategoryMap.current = consolidatedMap
    setIsInitialDataLoaded(true)
  } catch (error) {
    console.error("Error initializing data:", error)
  }
}


    initializeData()
  }, []) // Runs only once on mount

  // Modified: Effect to load categories for the selected category using the consolidated map
  React.useEffect(() => {
    const loadCategoriesForSelected = async () => {
      if (!selectedCategory || !isInitialDataLoaded) {
        // If initial data is not yet loaded, or no category selected, don't proceed
        return
      }

      setIsLoading(true) // Start loading for the displayable categories
      const apiCategoryName = reverseMapCategoryName(selectedCategory)
      const generalCategory = generalCategories.find((cat) => cat.name === apiCategoryName)

      if (!generalCategory) {
        setCategories([]) // Clear categories if no matching general category
        setIsLoading(false)
        return
      }

      try {
        // Fetch product categories for the currently selected general category
        const productCategoriesForSelectedGeneral: ProductCategory[] = await fetchProductCategories(
          generalCategory.generalCategoryId,
        )
        const categoriesWithSubs: CategoryData[] = []
        const categoriesWithoutSubs: CategoryData[] = []

        for (const productCategory of productCategoriesForSelectedGeneral) {
          // Use the consolidated map to get the definitive subcategories for this product category name
          const consolidated = allProductCategorySubCategoryMap.current.get(productCategory.categoryName)

          if (consolidated && consolidated.subCategories.length > 0) {
            categoriesWithSubs.push({
              parent: selectedCategory,
              title: productCategory.categoryName,
              categoryId: consolidated.categoryId, // Use the ID from the consolidated data
              items: consolidated.subCategories
                .map((sub) => ({
                  name: sub.subCategoryName,
                  id: sub.subCategoryId,
                  isSub: true,
                }))
                .reverse(),
            })
          } else {
            // If no consolidated data with subs, or consolidated data has no subs,
            // use the current product category as an item itself.
            categoriesWithoutSubs.push({
              parent: selectedCategory,
              title: productCategory.categoryName,
              categoryId: productCategory.categoryId,
              items: [
                {
                  name: productCategory.categoryName,
                  id: productCategory.categoryId,
                  isSub: false,
                },
              ],
            })
          }
        }

        const sortedCategories = [...categoriesWithSubs.reverse(), ...categoriesWithoutSubs.reverse()]
        setCategories(sortedCategories)
      } catch (error) {
        console.error("Error loading categories for selected:", error)
        setCategories([])
      } finally {
        setIsLoading(false)
      }
    }

    loadCategoriesForSelected()
  }, [selectedCategory, isInitialDataLoaded, generalCategories]) // Dependencies: selectedCategory, and when the initial map is ready, and generalCategories for the find operation.

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
          categoryId={category.categoryId}
          items={category.items}
          onItemClick={handleItemClick}
        />
      ))}
      <div className="flex z-0 flex-1 shrink basis-0 h-[100px] w-[209px]" />
      <ScrollBar />
    </section>
  )
}
