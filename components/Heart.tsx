"use client"
import { useEffect, useState } from "react"
import { ProductHeader } from "./Heart/ProductHeader"
import { ProductCard } from "./Heart/ProductCard"
import { ProductGrid } from "@/components/Heart/MobileShop/ProductGrid"
import { SignUpModal } from "./Offer/SignUpModal"
import { LoginModal } from "./Offer/LoginModal"
import { SuccessModal } from "./Offer/SuccessModal"

// Define the product structure returned by the API
interface ProductApiResponse {
  productId: string
  productName: string
  imageOne: string
  price: number | string
  discountPrice: number | string
  quantity: number
}

// Extend the product with additional client-side fields
interface Product extends ProductApiResponse {
  isAdded: boolean
  finalPrice: number // Calculated price after discount
}

// Interface for localStorage items
interface LocalStorageItem {
  product_id: string
  quantity: string
  size: string
  color: string
  productName?: string
  price?: number
  discountPrice?: number
  finalPrice?: number
  imageOne?: string
}

export function Heart() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalType, setModalType] = useState<"signup" | "login" | "success" | null>(null)

  function shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5)
  }

  // Helper function to calculate final price
  const calculateFinalPrice = (price: number | string, discountPrice: number | string): number => {
    const priceNum = typeof price === "string" ? Number.parseFloat(price) || 0 : price || 0
    const discountNum = typeof discountPrice === "string" ? Number.parseFloat(discountPrice) || 0 : discountPrice || 0
    return Math.max(0, priceNum - discountNum) // Ensure price doesn't go below 0
  }

  // Helper function to save cart items to localStorage
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
          productName: productData.productName,
          price:
            typeof productData.price === "string" ? Number.parseFloat(productData.price) || 0 : productData.price || 0,
          discountPrice:
            typeof productData.discountPrice === "string"
              ? Number.parseFloat(productData.discountPrice) || 0
              : productData.discountPrice || 0,
          finalPrice: productData.finalPrice,
          imageOne: productData.imageOne,
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

  // Helper function to save wishlist items to localStorage
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
          productName: productData.productName,
          price:
            typeof productData.price === "string" ? Number.parseFloat(productData.price) || 0 : productData.price || 0,
          discountPrice:
            typeof productData.discountPrice === "string"
              ? Number.parseFloat(productData.discountPrice) || 0
              : productData.discountPrice || 0,
          finalPrice: productData.finalPrice,
          imageOne: productData.imageOne,
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

        // Format all products
        const formatted: Product[] = allProducts.map((p: ProductApiResponse) => ({
          ...p,
          isAdded: false,
          finalPrice: calculateFinalPrice(p.price, p.discountPrice),
        }))

        // Shuffle and limit to 16 products
        const shuffledAndLimited = shuffleArray(formatted).slice(0, 16)
        setProducts(shuffledAndLimited)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
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
      <section className="flex justify-center items-center p-8 bg-sky-50">
        <p className="text-red-500">Error: {error}</p>
      </section>
    )
  }

  const handleAddToWishlist = async (productId: string) => {
    const token = localStorage.getItem("accessToken")

    if (!token) {
      // Save to localStorage instead of showing modal
      const productData = products.find((p) => p.productId === productId)
      const saved = saveWishlistToLocalStorage(productId, productData)
      if (saved) {
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
      const productData = products.find((p) => p.productId === productId)
      const saved = saveCartToLocalStorage(productId, productData)
      if (saved) {
        // Update UI to show item as added
        setProducts((prev) => prev.map((p) => (p.productId === productId ? { ...p, isAdded: true } : p)))
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
        setProducts((prev) => prev.map((p) => (p.productId === productId ? { ...p, isAdded: true } : p)))
      } else {
        console.error("Unexpected response:", data)
      }
    } catch (err) {
      console.error("Add to cart failed:", err)
    }
  }

  const handleClose = () => setModalType(null)
  const handleLoginSuccess = () => setModalType("success")

  return (
    <section className="flex overflow-hidden flex-col justify-center self-stretch px-8 py-10 bg-sky-50 max-md:px-5">
      <ProductHeader rightArrowIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/66d546e330544d515b682a58503bcbd12bbada55?placeholderIfAbsent=true" />

      <div className="hidden md:flex flex-wrap gap-6 items-start mt-6 w-full">
        {products.map((p) => (
          <ProductCard
            key={p.productId}
            id={p.productId}
            image={p.imageOne}
            title={p.productName.length > 26 ? p.productName.slice(0, 23) + "..." : p.productName}
            rating={4.7}
            reviews={0}
            price={`$${Number(p.finalPrice || 0).toFixed(2)}`}
            originalPrice={
              (typeof p.discountPrice === "string" ? Number.parseFloat(p.discountPrice) : p.discountPrice) > 0
                ? `$${Number(p.price || 0).toFixed(2)}`
                : undefined
            }
            starIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true"
            cartIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/8cb390dce5451e2e781d761e03e8beb8ba033458?placeholderIfAbsent=true"
            favoriteIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/659be93a7c406efa8073a635c7fb839f349ddff8?placeholderIfAbsent=true"
            isOutOfStock={p.quantity === 0}
            isAdded={p.isAdded}
            onAddToCart={() => handleAddToCart(p.productId)}
            onAddToWishlist={() => handleAddToWishlist(p.productId)}
          />
        ))}
      </div>

      <div className="block mt-6 md:hidden w-full">
        <ProductGrid />
      </div>

      <>
        {modalType === "signup" && <SignUpModal onClose={handleClose} onOpenLogin={() => setModalType("login")} />}
        {modalType === "login" && (
          <LoginModal
            onClose={handleClose}
            onOpenSignUp={() => setModalType("signup")}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        {modalType === "success" && <SuccessModal onClose={handleClose} />}
      </>
    </section>
  )
}

export default Heart
