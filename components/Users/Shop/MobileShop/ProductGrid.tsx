"use client"
import React, { useEffect, useState } from "react"
import { ProductCardM } from "./ProductCard"
import type { Product } from "./types"
import { useSearchParams, usePathname } from "next/navigation"

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
  products?: Product[]
  onAddToCart?: (productId: string) => void
  onAddToWishlist?: (productId: string) => void
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products: externalProducts,
  onAddToCart,
  onAddToWishlist,
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [categoryId, setCategoryId] = useState<string | null>(null)

  const pathname = usePathname()
  const searchParams = useSearchParams()

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

  // Set up categoryId based on URL params (matching desktop logic)
  useEffect(() => {
    const currentPath = pathname
    const SCT = searchParams.get("SCT")
    const PCT = searchParams.get("PCT")

    if (SCT) {
      // subcategory has highest priority
      setCategoryId(`SCT:${SCT}`)
    } else if (PCT) {
      // then category
      setCategoryId(`PCT:${PCT}`)
    } else {
      // fallback to pathname or saved category
      if (currentPath === "/rentals") {
        setCategoryId("GCT:c7d6c7e5-aafe-439d-a714-63dd3910d3f9")
      } else if (currentPath === "/shop/decorations") {
        setCategoryId("GCT:1fc158a6-5dbc-43e9-b385-4cadb8434a76")
      } else if (currentPath === "/shop/holiday") {
        setCategoryId("GCT:6f30f52f-47f2-4196-996c-7b0daabcd495")
      } else if (currentPath === "/shop/party-supplies") {
        setCategoryId("GCT:a72e830e-69ba-4977-b8e9-9250a196dd50")
      } else if (currentPath === "/shop/birthday") {
        setCategoryId("GCT:a48bac0e-05b1-4511-a23e-99e31dc6abec")
      } else if (currentPath === "/shop/balloon") {
        setCategoryId("GCT:91a306bf-4df5-4940-8740-d28e0260c10d")
      } else if (currentPath === "/shop") {
        setCategoryId(null)
      } else {
        const savedCategoryId = localStorage.getItem("activeCategoryId")
        setCategoryId(savedCategoryId ? `GCT:${savedCategoryId}` : null)
      }
    }
    setReady(true)
  }, [pathname, searchParams])

  useEffect(() => {
    // If external products are provided, use them instead of fetching
    if (externalProducts) {
      setProducts(externalProducts)
      setLoading(false)
      return
    }

    if (!ready) return // wait until pathname/categoryId logic is finished

    async function fetchProducts() {
      try {
        // Build URL based on categoryId (matching desktop logic)
        const url = (() => {
          if (!categoryId) {
            return `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product`
          }
          if (categoryId.startsWith("SCT:")) {
            const id = categoryId.replace("SCT:", "")
            return `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/filter-product-category/SCT/${id}`
          }
          if (categoryId.startsWith("PCT:")) {
            const id = categoryId.replace("PCT:", "")
            return `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/filter-product-category/PCT/${id}`
          }
          if (categoryId.startsWith("GCT:")) {
            const id = categoryId.replace("GCT:", "")
            return `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/filter-product-category/GCT/${id}`
          }
          return `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product`
        })()

        const token = localStorage.getItem("accessToken")
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token ? { Authorization: token } : {}),
          },
        })

        if (!res.ok) throw new Error(`Server error: ${res.status}`)

        const json = await res.json()
        const productList = Array.isArray(json.data?.product)
          ? json.data.product
          : Array.isArray(json.data)
            ? json.data
            : []

        const formatted = productList.map((p: ProductApiResponse) => {
          const finalPrice = calculateFinalPrice(p.price, p.discountPrice || 0)
          return {
            ...p,
            isAdded: false,
            finalPrice,
          }
        })

        // Convert to mobile Product format
        const mobileProducts: Product[] = formatted.map((p: ExtendedProduct) => ({
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
        }))

        setProducts(mobileProducts)
      } catch (err) {
        console.error("Failed to load products:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [externalProducts, categoryId, ready])

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          Authorization: token,
        },
        body: JSON.stringify({ product_id: productId, quantity: "1", size: "", color: "" }),
      })

      const data = await res.json()
      if (res.ok && data.statusCode === 200) {
        setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, isAdded: true } : p)))
      } else {
        console.error("Cart error:", data)
      }
    } catch (err) {
      console.error("Add to cart failed:", err)
    }
  }

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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-wish-list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          Authorization: token,
        },
        body: JSON.stringify({ product_id: productId, quantity: "1", size: "", color: "" }),
      })

      const data = await res.json()
      if (res.ok && data.statusCode === 200) {
        // Update UI to show item as wishlisted
        setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, isWishlisted: true } : p)))
        alert("Added to wishlist")
      } else {
        console.error("Wishlist error:", data)
      }
    } catch (err) {
      console.error("Wishlist failed:", err)
    }
  }

  if (loading) return <div className="p-4 text-center">Loading...</div>
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>

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
