"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { FormHeader } from "./FormHeader"
import { MultiSelect } from "./MultiSelect"
import { CloseCircleIcon } from "./Icons"

interface CustomerOptionsFormProps {
  onPrevious: () => void
  onNext: () => void
  onCancel: () => void
  onClose: () => void
  productId: string | null
}

const fullSizeMap = ["xxsmall", "xsmall", "small", "medium", "large", "xlarge", "xxlarge", "xxxlarge"]
const shortSizeMap = ["xxs", "xs", "sm", "md", "l", "xl", "xxl", "xxxl"]

const mapToFull = (sizes: string[]) =>
  sizes.map((s) => {
    const index = shortSizeMap.indexOf(s)
    return index !== -1 ? fullSizeMap[index] : s
  })

const mapToShort = (sizes: string[]) =>
  sizes.map((s) => {
    const index = fullSizeMap.indexOf(s)
    return index !== -1 ? shortSizeMap[index] : s
  })

// From CSS color spec: 140+ named colors
const allColors = [
  "AliceBlue",
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "Black",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
  "BurlyWood",
  "CadetBlue",
  "Chartreuse",
  "Chocolate",
  "Coral",
  "CornflowerBlue",
  "Cornsilk",
  "Crimson",
  "Cyan",
  "DarkBlue",
  "DarkCyan",
  "DarkGoldenRod",
  "DarkGray",
  "DarkGreen",
  "DarkKhaki",
  "DarkMagenta",
  "DarkOliveGreen",
  "DarkOrange",
  "DarkOrchid",
  "DarkRed",
  "DarkSalmon",
  "DarkSeaGreen",
  "DarkSlateBlue",
  "DarkSlateGray",
  "DarkTurquoise",
  "DarkViolet",
  "DeepPink",
  "DeepSkyBlue",
  "DimGray",
  "DodgerBlue",
  "FireBrick",
  "FloralWhite",
  "ForestGreen",
  "Fuchsia",
  "Gainsboro",
  "GhostWhite",
  "Gold",
  "GoldenRod",
  "Gray",
  "Green",
  "GreenYellow",
  "HoneyDew",
  "HotPink",
  "IndianRed",
  "Indigo",
  "Ivory",
  "Khaki",
  "Lavender",
  "LavenderBlush",
  "LawnGreen",
  "LemonChiffon",
  "LightBlue",
  "LightCoral",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightGray",
  "LightGreen",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "LightSkyBlue",
  "LightSlateGray",
  "LightSteelBlue",
  "LightYellow",
  "Lime",
  "LimeGreen",
  "Linen",
  "Magenta",
  "Maroon",
  "MediumAquaMarine",
  "MediumBlue",
  "MediumOrchid",
  "MediumPurple",
  "MediumSeaGreen",
  "MediumSlateBlue",
  "MediumSpringGreen",
  "MediumTurquoise",
  "MediumVioletRed",
  "MidnightBlue",
  "MintCream",
  "MistyRose",
  "Moccasin",
  "NavajoWhite",
  "Navy",
  "OldLace",
  "Olive",
  "OliveDrab",
  "Orange",
  "OrangeRed",
  "Orchid",
  "PaleGoldenRod",
  "PaleGreen",
  "PaleTurquoise",
  "PaleVioletRed",
  "PapayaWhip",
  "PeachPuff",
  "Peru",
  "Pink",
  "Plum",
  "PowderBlue",
  "Purple",
  "RebeccaPurple",
  "Red",
  "RosyBrown",
  "RoyalBlue",
  "SaddleBrown",
  "Salmon",
  "SandyBrown",
  "SeaGreen",
  "SeaShell",
  "Sienna",
  "Silver",
  "SkyBlue",
  "SlateBlue",
  "SlateGray",
  "Snow",
  "SpringGreen",
  "SteelBlue",
  "Tan",
  "Teal",
  "Thistle",
  "Tomato",
  "Turquoise",
  "Violet",
  "Wheat",
  "White",
  "WhiteSmoke",
  "Yellow",
  "YellowGreen",
]

const CustomerOptionsForm: React.FC<CustomerOptionsFormProps> = ({
  onPrevious,
  onNext,
  onCancel,
  onClose,
  productId,
}) => {
  const [sizeStyle, setSizeStyle] = useState<"full" | "short">("full")
  const [sizes, setSizes] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [isLoadingProduct, setIsLoadingProduct] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const currentSizeOptions = sizeStyle === "full" ? fullSizeMap : shortSizeMap

  // Updated API helper function with window check
  const getApiHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") || "" : ""
    return {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
      ...(token && { Authorization: token }),
    }
  }

  // Fetch product details when productId is provided
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) {
        // Load from localStorage if no productId (new product)
        const savedSizes = JSON.parse(localStorage.getItem("selectedSizes") || "null")
        const savedColors = JSON.parse(localStorage.getItem("selectedColors") || "null")

        if (savedSizes && Array.isArray(savedSizes) && savedSizes.length > 0) {
          const isShort = shortSizeMap.includes(savedSizes[0])
          setSizeStyle(isShort ? "short" : "full")
          setSizes(savedSizes)
        } else {
          setSizes(["medium", "large"])
        }

        if (savedColors && Array.isArray(savedColors) && savedColors.length > 0) {
          setColors(savedColors)
        } else {
          setColors(["Red"])
        }

        return
      }

      setIsLoadingProduct(true)
      setErrorMessage("")

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/fetch-product/${productId}`,
          {
            method: "GET",
            headers: getApiHeaders(),
          },
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to fetch product details.")
        }

        const data = await response.json()
        const productData = data.data

        // Set sizes from product data
        let finalSizes = ["medium", "large"] // default
        if (productData.size && Array.isArray(productData.size) && productData.size.length > 0) {
          const productSizes = productData.size
          // Check if the sizes are in short format
          const isShort = productSizes.some((size: string) => shortSizeMap.includes(size))
          setSizeStyle(isShort ? "short" : "full")

          if (isShort) {
            finalSizes = productSizes
          } else {
            // Convert to appropriate format if needed
            const convertedSizes = productSizes.map((size: string) => {
              const shortIndex = shortSizeMap.indexOf(size)
              const fullIndex = fullSizeMap.indexOf(size)
              if (shortIndex !== -1) return size
              if (fullIndex !== -1) return size
              return size // Keep as is if not found in either map
            })
            finalSizes = convertedSizes
          }
        }

        // Set colors from product data
        let finalColors = ["Red"] // default
        if (productData.color && Array.isArray(productData.color) && productData.color.length > 0) {
          finalColors = productData.color
        }

        setSizes(finalSizes)
        setColors(finalColors)

        // IMPORTANT: Save API data to localStorage so it persists across steps
        localStorage.setItem("selectedSizes", JSON.stringify(finalSizes))
        localStorage.setItem("selectedColors", JSON.stringify(finalColors))
      } catch (error) {
        let message = "Failed to load product details. Please try again."
        if (error instanceof Error) {
          message = error.message
        } else if (typeof error === "string") {
          message = error
        }
        setErrorMessage(message)
        // Fallback to default values on error
        setSizes(["medium", "large"])
        setColors(["Red"])
      } finally {
        setIsLoadingProduct(false)
      }
    }

    fetchProductDetails()
  }, [productId])

  // Save to localStorage when sizes or colors change
  useEffect(() => {
    localStorage.setItem("selectedSizes", JSON.stringify(sizes))
    localStorage.setItem("selectedColors", JSON.stringify(colors))
  }, [sizes, colors])

  const handleToggleSizeStyle = () => {
    setSizeStyle((prevStyle) => {
      const newStyle = prevStyle === "full" ? "short" : "full"
      const convertedSizes = newStyle === "short" ? mapToShort(sizes) : mapToFull(sizes)
      setSizes(convertedSizes)
      return newStyle
    })
  }

  const handleAddSize = (size: string) => {
    if (!sizes.includes(size)) {
      setSizes((prev) => [...prev, size])
    }
  }

  const handleRemoveSize = (size: string) => {
    setSizes((prev) => prev.filter((s) => s !== size))
  }

  const handleAddColor = (color: string) => {
    if (!colors.includes(color)) {
      setColors((prev) => [...prev, color])
    }
  }

  const handleRemoveColor = (color: string) => {
    setColors((prev) => prev.filter((c) => c !== color))
  }

  // Show loading state while fetching product details
  if (isLoadingProduct) {
    return (
      <main className="flex flex-col gap-6 p-10 mx-auto max-w-none bg-white rounded-2xl w-[640px] max-md:p-5 max-md:w-full max-md:max-w-[991px] max-sm:p-4 max-sm:max-w-screen-sm">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product options...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col gap-6 p-10 mx-auto max-w-none bg-white rounded-2xl w-[640px] max-md:p-5 max-md:w-full max-md:max-w-[991px] max-sm:p-4 max-sm:max-w-screen-sm">
      <FormHeader
        step={2}
        totalSteps={4}
        title={productId ? "Edit Product" : "Customer options"}
        subtitle={productId ? "Update customer options" : "Add customer options"}
      />

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{errorMessage}</div>
      )}

      <section className="flex flex-col gap-6">
        {/* Size Selection */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-end mb-2">
            <button
              onClick={handleToggleSizeStyle}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-full"
            >
              Switch to {sizeStyle === "full" ? "short" : "full"} sizes
            </button>
          </div>
          <MultiSelect
            label="Available Sizes"
            selectedItems={sizes}
            allOptions={currentSizeOptions}
            onAddItem={handleAddSize}
            onRemoveItem={handleRemoveSize}
          />
        </div>

        {/* Color Selection */}
        <div className="flex flex-col gap-4">
          <MultiSelect
            label="Available Colors"
            selectedItems={colors}
            allOptions={allColors}
            onAddItem={handleAddColor}
            onRemoveItem={handleRemoveColor}
          />
        </div>
      </section>

      <footer className="flex gap-4 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-0 h-14 text-base font-medium text-black cursor-pointer rounded-[50px]"
        >
          Cancel
        </button>
        <button
          onClick={onPrevious}
          className="px-4 py-0 h-14 text-base font-medium text-black cursor-pointer rounded-[50px]"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="px-4 py-0 h-14 text-base font-medium text-white bg-blue-600 cursor-pointer rounded-[50px]"
        >
          Next
        </button>
      </footer>

      <button
        onClick={onClose}
        className="flex absolute top-4 right-4 justify-center items-center w-14 h-14 rounded-lg"
        aria-label="Close"
      >
        <CloseCircleIcon />
      </button>
    </main>
  )
}

export default CustomerOptionsForm
