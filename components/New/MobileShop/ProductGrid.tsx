"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { ProductCardM } from "./ProductCard"
import type { Product } from "./types"

// Define the product structure returned by the API (matching desktop)
interface ProductApiResponse {
  productId: string
  productName: string
  imageOne: string
  price: number | string
  discountPrice: number | string
  quantity: number
}

// Extend the product with additional client-side fields (matching desktop)
interface ExtendedProduct extends ProductApiResponse {
  isAdded: boolean
  finalPrice: number // Calculated price after discount
}

// Interface for localStorage items (matching desktop)
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

interface ProductGridProps {
  scrollRef?: React.RefObject<HTMLDivElement>
  onAddToCart?: (productId: string) => void
  onAddToWishlist?: (productId: string) => void
  products?: Product[]
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  scrollRef,
  onAddToCart,
  onAddToWishlist,
  products: externalProducts,
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
          price: productData.price,
          discountPrice: productData.discountPrice || 0,
          finalPrice: productData.finalPrice || productData.price,
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
          price: productData.price,
          discountPrice: productData.discountPrice || 0,
          finalPrice: productData.finalPrice || productData.price,
          imageOne: productData.image,
        }),
      }

      wishlistItems.push(newItem)
      localStorage.setItem("localWishlist", JSON.stringify(wishlistItems))
      return true
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      return false
    }
  }

  useEffect(() => {
    // If external products are provided, use them instead of fetching
    if (externalProducts) {
      setProducts(externalProducts)
      setLoading(false)
      return
    }

    async function fetchProducts() {
      try {
        const token = localStorage.getItem("accessToken") || ""
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token ? { Authorization: token } : {}),
          },
        })

        if (!res.ok) throw new Error(`Server error: ${res.status}`)

        const { statusCode, data } = await res.json()

        if (statusCode !== 200 || !Array.isArray(data.product)) {
          throw new Error("Invalid response format")
        }

        const formattedProducts: ExtendedProduct[] = data.product.map((p: ProductApiResponse) => ({
          ...p,
          isAdded: false,
          finalPrice: calculateFinalPrice(p.price, p.discountPrice || 0),
        }))

        // Convert to mobile Product format
     const seenNames = new Set<string>()
const mobileProducts: Product[] = []

for (const p of formattedProducts) {
  const nameKey = p.productName.trim().toLowerCase()
  if (seenNames.has(nameKey)) continue
  seenNames.add(nameKey)

  mobileProducts.push({
    id: p.productId,
    image: p.imageOne,
    title: p.productName.length > 26 ? p.productName.slice(0, 23) + "..." : p.productName,
    price: p.finalPrice,
    originalPrice:
      (typeof p.discountPrice === "string" ? Number.parseFloat(p.discountPrice) : p.discountPrice) > 0
        ? Number(p.price || 0)
        : undefined,
    discountPrice: typeof p.discountPrice === "string" ? Number.parseFloat(p.discountPrice) : p.discountPrice,
    finalPrice: p.finalPrice,
    isOutOfStock: p.quantity === 0,
    isWishlisted: false,
    isAdded: p.isAdded,
  })
}


        setProducts(mobileProducts)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
        } else {
          setError("An unexpected error occurred")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [externalProducts])

  const handleAddToWishlist = async (productId: string) => {
    if (onAddToWishlist) {
      // Use parent's handler if provided
      onAddToWishlist(productId)
      return
    }

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
    if (onAddToCart) {
      // Use parent's handler if provided
      onAddToCart(productId)
      return
    }

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
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-cart/${productId}`
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      }

      const res = await fetch(url, {
        method: "GET",
        headers,
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

  if (loading) return <div className="p-4 text-center">Loading...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>

  return (
    <section
      ref={scrollRef}
      className="
        w-full gap-4 no-scrollbar
        flex overflow-x-auto scroll-smooth px-2
        sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0
      "
    >
      {products.map((product) => (
        <div key={product.id} className="flex-shrink-0 w-[153px] sm:w-auto">
          <ProductCardM product={product} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />
        </div>
      ))}
    </section>
  )
}
