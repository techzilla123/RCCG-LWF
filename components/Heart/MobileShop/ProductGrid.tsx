"use client"
import React, { useEffect, useState } from "react"
import { ProductCardM } from "./ProductCard"
import type { Product, LocalStorageItem } from "./types"

// Define the product structure returned by the API (matching desktop)
interface ProductApiResponse {
  productId: string
  productName: string
  imageOne: string
  price: number | string
  discountPrice: number | string
  quantity: number
  imageTwo?: string
  imageThree?: string
  imageFour?: string
  imageFive?: string
  imageSix?: string
  imageSeven?: string
  imageEight?: string
  imageNine?: string
  imageTen?: string
  imageEleven?: string
  imageTwelve?: string
  imageThirtheen?: string
}

// Extend the product with additional client-side fields (matching desktop)
interface ExtendedProduct extends ProductApiResponse {
  isAdded: boolean
  finalPrice: number // Calculated price after discount
  selectedImage: string // The currently displayed image
  imageList: string[] // All available images for the product
  currentImageIndex: number // Index of the currently displayed image
}

export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Shuffle function (matching desktop)
  function shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5)
  }

  // Helper function to calculate final price (matching desktop)
  const calculateFinalPrice = (price: number | string, discountPrice: number | string): number => {
    const priceNum = typeof price === "string" ? Number.parseFloat(price) || 0 : price || 0
    const discountNum = typeof discountPrice === "string" ? Number.parseFloat(discountPrice) || 0 : discountPrice || 0
    return Math.max(0, priceNum - discountNum) // Ensure price doesn't go below 0
  }

  // Helper function to save cart items to localStorage (matching desktop)
  const saveCartToLocalStorage = (productId: string, productData?: Product) => {
    try {
      const existingCart = localStorage.getItem("localCart")
      const cartItems: LocalStorageItem[] = existingCart ? JSON.parse(existingCart) : []

      // Check if item already exists
      const existingItemIndex = cartItems.findIndex((item) => item.product_id === productId)

      const newItem: LocalStorageItem = {
        product_id: productId,
        quantity: "1",
        size: "",
        color: "",
        ...(productData && {
          productName: productData.title,
          price: productData.price, // Product.price is always number
          discountPrice: 0,
          finalPrice: productData.price, // Product.price is always number
          imageOne: productData.image,
        }),
      }

      if (existingItemIndex > -1) {
        // Update existing item quantity
        const currentQty = Number.parseInt(cartItems[existingItemIndex].quantity) || 1
        cartItems[existingItemIndex].quantity = (currentQty + 1).toString()
      } else {
        // Add new item
        cartItems.push(newItem)
      }
      localStorage.setItem("localCart", JSON.stringify(cartItems))
      window.dispatchEvent(new Event("cartUpdated"))
      return true
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      return false
    }
  }

  // Helper function to save wishlist items to localStorage (matching desktop)
  const saveWishlistToLocalStorage = (productId: string, productData?: Product) => {
    try {
      const existingWishlist = localStorage.getItem("localWishlist")
      const wishlistItems: LocalStorageItem[] = existingWishlist ? JSON.parse(existingWishlist) : []

      // Check if item already exists
      const existingItemIndex = wishlistItems.findIndex((item) => item.product_id === productId)
      if (existingItemIndex > -1) {
        // Item already in wishlist
        return false
      }

      const newItem: LocalStorageItem = {
        product_id: productId,
        quantity: "1",
        size: "",
        color: "",
        ...(productData && {
          productName: productData.title,
          price: productData.price, // Product.price is always number
          discountPrice: 0,
          finalPrice: productData.price, // Product.price is always number
          imageOne: productData.image,
        }),
      }

      wishlistItems.push(newItem)
      localStorage.setItem("localWishlist", JSON.stringify(wishlistItems))
      window.dispatchEvent(new Event("wishlistUpdated"))
      return true
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      return false
    }
  }

  useEffect(() => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product`
    async function fetchProducts() {
      try {
        const token = localStorage.getItem("accessToken")
        const headers = {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          ...(token ? { Authorization: token } : {}),
        }

        // First, fetch the first page to get pagination info
        const firstPageRes = await fetch(baseUrl, {
          method: "GET",
          headers,
        })
        if (!firstPageRes.ok) {
          throw new Error(`Server error: ${firstPageRes.status}`)
        }
        const firstPageJson = await firstPageRes.json()
        if (firstPageJson.statusCode !== 200 || !Array.isArray(firstPageJson.data.product)) {
          throw new Error("Unexpected response structure")
        }
        const totalPages = firstPageJson.data.pagination.total_pages
        let allProducts: ProductApiResponse[] = [...firstPageJson.data.product]

        // If there are more pages, fetch from random pages
        if (totalPages > 1) {
          // Determine how many additional pages to fetch (fetch from 2-3 random pages)
          const pagesToFetch = Math.min(totalPages - 1, 2)
          const randomPages: number[] = []
          // Generate random page numbers (excluding page 1 which we already fetched)
          while (randomPages.length < pagesToFetch) {
            const randomPage = Math.floor(Math.random() * (totalPages - 1)) + 2 // Pages 2 to totalPages
            if (!randomPages.includes(randomPage)) {
              randomPages.push(randomPage)
            }
          }

          // Fetch products from random pages
          const pagePromises = randomPages.map(async (page) => {
            const pageRes = await fetch(`${baseUrl}?page=${page}`, {
              method: "GET",
              headers,
            })
            if (pageRes.ok) {
              const pageJson = await pageRes.json()
              if (pageJson.statusCode === 200 && Array.isArray(pageJson.data.product)) {
                return pageJson.data.product
              }
            }
            return []
          })
          const additionalPages = await Promise.all(pagePromises)
          // Combine all products from different pages
          additionalPages.forEach((pageProducts) => {
            allProducts = [...allProducts, ...pageProducts]
          })
        }

        // Format and deduplicate products by name
        const seenNames = new Set<string>()
        const formatted: ExtendedProduct[] = []
        for (const p of allProducts) {
          if (p.productName?.toUpperCase().startsWith("PPG#")) continue
          if (!seenNames.has(p.productName)) {
            seenNames.add(p.productName)
            const imageOptions = [
              p.imageOne,
              p.imageTwo,
              p.imageThree,
              p.imageFour,
              p.imageFive,
              p.imageSix,
              p.imageSeven,
              p.imageEight,
              p.imageNine,
              p.imageTen,
              p.imageEleven,
              p.imageTwelve,
              p.imageThirtheen,
            ].filter((img): img is string => Boolean(img)) // this filters out undefined and narrows type to string

            formatted.push({
              ...p,
              isAdded: false,
              finalPrice: calculateFinalPrice(p.price, p.discountPrice),
              selectedImage: imageOptions[0] || p.imageOne, // Set initial selected image
              imageList: imageOptions, // Store all images
              currentImageIndex: 0, // Set initial index
            })
          }
        }

        // Shuffle and limit to 16 products (matching desktop)
        const shuffledAndLimited = shuffleArray(formatted).slice(0, 16)

     // Force add the 2 balloons (mobile format)
const forcedProducts: Product[] = [
  {
    id: "5aa7726b-8d72-4309-816d-31d078149eb4",
    title: "11-inch Fashion White Latex Balloon w/ (Helium & Hi-Float) - 1 ct",
    image: "https://api.partyplaceandrentals.com/storage/products/9eouhQczgSt5PARuvax7scv8DtaVt7I5xc54WYxV.webp",
    price: 2.25,
    isOutOfStock: false,
    isWishlisted: false,
    isAdded: false,
    selectedImage: "https://api.partyplaceandrentals.com/storage/products/9eouhQczgSt5PARuvax7scv8DtaVt7I5xc54WYxV.webp",
    imageList: [
      "https://api.partyplaceandrentals.com/storage/products/9eouhQczgSt5PARuvax7scv8DtaVt7I5xc54WYxV.webp",
    ],
    currentImageIndex: 0,
  },
  {
    id: "c54ab3d0-474b-49b5-8db8-59ce7da14d13",
    title: "11-inch Bubble Gum Pink Latex Balloon w/ (Helium & Hi-Float) - 1 ct",
    image: "https://api.partyplaceandrentals.com/storage/products/rQiu55phVmrDIwSy6CEF5n8uS0r4BB37FpeA6Mt1.webp",
    price: 2.25,
    isOutOfStock: false,
    isWishlisted: false,
    isAdded: false,
    selectedImage: "https://api.partyplaceandrentals.com/storage/products/rQiu55phVmrDIwSy6CEF5n8uS0r4BB37FpeA6Mt1.webp",
    imageList: [
      "https://api.partyplaceandrentals.com/storage/products/rQiu55phVmrDIwSy6CEF5n8uS0r4BB37FpeA6Mt1.webp",
    ],
    currentImageIndex: 0,
  },
]

// Convert to mobile Product format
const mobileProducts: Product[] = formatted.map((p) => ({
  id: p.productId,
  image: p.imageOne,
  title: p.productName.length > 26 ? p.productName.slice(0, 23) + "..." : p.productName,
  price: p.finalPrice,
  isOutOfStock: p.quantity === 0,
  isWishlisted: false,
  isAdded: p.isAdded,
  selectedImage: p.selectedImage,
  imageList: p.imageList,
  currentImageIndex: p.currentImageIndex,
}))

// Merge forced + API products, remove duplicates
const merged = [
  ...forcedProducts,
  ...mobileProducts.filter((p) => !forcedProducts.some(fp => fp.id === p.id)),
]

// Shuffle everything together
const shuffledAll = shuffleArray(merged)

// Ensure max 16, but forced ones stay included
const finalProducts = shuffledAll.slice(0, 16)

// Guarantee forced ones are not cut off
forcedProducts.forEach(fp => {
  if (!finalProducts.some(p => p.id === fp.id)) {
    finalProducts.splice(Math.floor(Math.random() * finalProducts.length), 0, fp)
    if (finalProducts.length > 16) finalProducts.pop()
  }
})

setProducts(finalProducts)
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred"
        console.error("Fetch error:", e)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Effect for image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setProducts((prevProducts) =>
        prevProducts.map((product) => {
          if (!product.imageList || product.imageList.length <= 1) return product
          const nextIndex = (product.currentImageIndex + 1) % product.imageList.length
          return {
            ...product,
            selectedImage: product.imageList[nextIndex],
            currentImageIndex: nextIndex,
          }
        }),
      )
    }, 5000) // Rotate every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const handleAddToWishlist = async (productId: string) => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      // Save to localStorage instead of showing modal
      const productData = products.find((p) => p.id === productId)
      const saved = saveWishlistToLocalStorage(productId, productData)
      if (saved) {
        // Update UI to show item as wishlisted
        setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, isWishlisted: true } : p)))
        alert("Product saved to wishlist! Sign in to sync your wishlist.")
      } else {
        alert("Product is already in your wishlist!")
      }
      return
    }
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-wish-list`
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      }
      const body = JSON.stringify({
        product_id: productId,
        quantity: "1",
        size: "",
        color: "",
      })
      const res = await fetch(url, {
        method: "POST",
        headers,
        body,
      })
      const data = await res.json()
      if (data.statusCode === 200) {
        // Update UI to show item as wishlisted
        setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, isWishlisted: true } : p)))
        alert("Product added to wishlist")
        console.log("Wishlist response:", data)
      } else {
        console.error("Failed to add to wishlist:", data)
        alert("Could not add product to wishlist.")
      }
    } catch (err) {
      console.error("Wishlist error:", err)
      alert("Something went wrong while adding to wishlist.")
    }
  }

  const handleAddToCart = async (productId: string) => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      // Save to localStorage instead of showing modal
      const productData = products.find((p) => p.id === productId)
      const saved = saveCartToLocalStorage(productId, productData)
      if (saved) {
        // Update UI to show item as added
        setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, isAdded: true } : p)))
        alert("Product saved to cart! Sign in to sync your cart.")
      } else {
        alert("Failed to save product to cart.")
      }
      return
    }
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-cart`
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      }
      const body = JSON.stringify({
        product_id: productId,
        quantity: "1",
        size: "",
        color: "",
      })
      const res = await fetch(url, {
        method: "POST",
        headers,
        body,
      })
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`)
      }
      const data = await res.json()
      if (data.statusCode === 200) {
        setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, isAdded: true } : p)))
      } else {
        console.error("Unexpected response:", data)
      }
    } catch (err) {
      console.error("Add to cart failed:", err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[40vh]">
        <div className="relative w-24 h-48">
          <div className="w-16 h-20 bg-pink-400 rounded-full shadow-lg mx-auto animate-bounce" />
          <div className="w-3 h-3 bg-pink-500 mx-auto mt-1 rotate-45" />
          <div className="absolute top-[88px] left-1/2 transform -translate-x-1/2 w-px h-24 bg-gray-300 animate-pulse" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <section className="flex justify-center items-center p-8">
        <p className="text-red-500">Error: {error}</p>
      </section>
    )
  }

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
      {products.map((product) => (
        <React.Fragment key={product.id}>
          <ProductCardM product={product} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />
        </React.Fragment>
      ))}
    </section>
  )
}
