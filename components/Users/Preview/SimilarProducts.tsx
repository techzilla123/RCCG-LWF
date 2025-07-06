"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import ProductCard, { type ProductCardProps } from "./Similar/ProductCard"
import NavigationButton from "./Similar/NavigationButton"
import { ProductGrid } from "./Similar/MobileShop/ProductGrid"

type Product = {
  productId: string
  imageOne: string
  productName: string
  price: number
  discountPrice?: number // Add discount price from API
}

// Mobile Product interface
interface MobileProduct {
  id: string
  image: string
  title: string
  price: number
  originalPrice?: number
  discountPrice?: number
  finalPrice: number
  isOutOfStock?: boolean
  isWishlisted?: boolean
  isAdded?: boolean
}

// Interface for localStorage cart items
interface LocalStorageCartItem {
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

// Interface for localStorage wishlist items
interface LocalStorageWishlistItem {
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

const SimilarProducts: React.FC = () => {
  const desktopScrollRef = useRef<HTMLDivElement>(null)
  const mobileScrollRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const productId = searchParams.keys().next().value || ""
  const [products, setProducts] = useState<ProductCardProps[]>([])
  const [mobileProducts, setMobileProducts] = useState<MobileProduct[]>([])

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        }
        if (token) headers["Authorization"] = token

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/fetch-product/${productId}`, {
          method: "GET",
          headers,
        })
        const json = await res.json()

        if (json.statusCode === 200 && Array.isArray(json.data?.similarProducts)) {
          // Format for desktop
          const formatted: ProductCardProps[] = json.data.similarProducts.map((product: Product) => {
            // Calculate correct price (original - discount)
            const originalPrice = Number(product.price) || 0
            const discountAmount = Number(product.discountPrice) || 0
            const finalPrice = originalPrice - discountAmount

            return {
              id: product.productId,
              image: product.imageOne,
              rating: 4.7,
              reviews: 400,
              title: product.productName.length > 26 ? product.productName.slice(0, 23) + "..." : product.productName,
              price: `$${(finalPrice > 0 ? finalPrice : originalPrice).toFixed(2)}`,
              originalPrice: discountAmount > 0 ? `$${originalPrice.toFixed(2)}` : undefined,
              discountPrice: discountAmount,
            }
          })

          // Format for mobile
          const mobileFormatted: MobileProduct[] = json.data.similarProducts.map((product: Product) => {
            const originalPrice = Number(product.price) || 0
            const discountAmount = Number(product.discountPrice) || 0
            const finalPrice = originalPrice - discountAmount

            return {
              id: product.productId,
              image: product.imageOne,
              title: product.productName.length > 26 ? product.productName.slice(0, 23) + "..." : product.productName,
              price: finalPrice > 0 ? finalPrice : originalPrice,
              originalPrice: discountAmount > 0 ? originalPrice : undefined,
              discountPrice: discountAmount,
              finalPrice: finalPrice > 0 ? finalPrice : originalPrice,
              isOutOfStock: false, // You can add this field from API if available
              isWishlisted: false,
              isAdded: false,
            }
          })

          setProducts(formatted)
          setMobileProducts(mobileFormatted)
        }
      } catch (error) {
        console.error("Failed to fetch similar products:", error)
      }
    }

    if (productId) {
      fetchSimilarProducts()
    }
  }, [productId])

  const scroll = (direction: "left" | "right") => {
    const scrollAmount = 300
    const scrollTarget = window.innerWidth < 768 ? mobileScrollRef.current : desktopScrollRef.current
    if (scrollTarget) {
      const { scrollLeft } = scrollTarget
      scrollTarget.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Helper function to save cart items to localStorage
  const saveCartToLocalStorage = (productId: string, productData: MobileProduct): boolean => {
    try {
      const existingCart = localStorage.getItem("localCart")
      const cartItems: LocalStorageCartItem[] = existingCart ? JSON.parse(existingCart) : []

      const existingItemIndex = cartItems.findIndex((item) => item.product_id === productId)
      const newItem: LocalStorageCartItem = {
        product_id: productId,
        quantity: "1",
        size: "",
        color: "",
        productName: productData.title,
        price: productData.originalPrice || productData.price,
        discountPrice: productData.discountPrice || 0,
        finalPrice: productData.finalPrice,
        imageOne: productData.image,
      }

      if (existingItemIndex > -1) {
        const currentQty = Number.parseInt(cartItems[existingItemIndex].quantity) || 1
        cartItems[existingItemIndex].quantity = (currentQty + 1).toString()
      } else {
        cartItems.push(newItem)
      }

      localStorage.setItem("localCart", JSON.stringify(cartItems))
      return true
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      return false
    }
  }

  // Helper function to save wishlist items to localStorage
  const saveWishlistToLocalStorage = (productId: string, productData: MobileProduct): boolean => {
    try {
      const existingWishlist = localStorage.getItem("localWishlist")
      const wishlistItems: LocalStorageWishlistItem[] = existingWishlist ? JSON.parse(existingWishlist) : []

      const existingItemIndex = wishlistItems.findIndex((item) => item.product_id === productId)
      if (existingItemIndex > -1) {
        return false
      }

      const newItem: LocalStorageWishlistItem = {
        product_id: productId,
        quantity: "1",
        size: "",
        color: "",
        productName: productData.title,
        price: productData.originalPrice || productData.price,
        discountPrice: productData.discountPrice || 0,
        finalPrice: productData.finalPrice,
        imageOne: productData.image,
      }

      wishlistItems.push(newItem)
      localStorage.setItem("localWishlist", JSON.stringify(wishlistItems))
      return true
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      return false
    }
  }

  // Handle add to cart for mobile products
  const handleAddToCart = async (productId: string) => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      // Save to localStorage instead of showing modal
      const productData = mobileProducts.find((p) => p.id === productId)
      if (productData) {
        const saved = saveCartToLocalStorage(productId, productData)
        if (saved) {
          // Update UI to show item as added
          setMobileProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, isAdded: true } : p)))
          alert("Product saved to cart! Sign in to sync your cart.")
        } else {
          alert("Failed to save product to cart.")
        }
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
        setMobileProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, isAdded: true } : p)))
        alert("Product added to cart")
      } else {
        console.error("Cart error:", data)
        alert("Failed to add product to cart")
      }
    } catch (err) {
      console.error("Add to cart failed:", err)
      alert("Failed to add product to cart")
    }
  }

  // Handle add to wishlist for mobile products
  const handleAddToWishlist = async (productId: string) => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      // Save to localStorage instead of showing modal
      const productData = mobileProducts.find((p) => p.id === productId)
      if (productData) {
        const saved = saveWishlistToLocalStorage(productId, productData)
        if (saved) {
          setMobileProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, isWishlisted: true } : p)))
          alert("Product saved to wishlist! Sign in to sync your wishlist.")
        } else {
          alert("Product is already in your wishlist!")
        }
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
        setMobileProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, isWishlisted: true } : p)))
        alert("Added to wishlist")
      } else {
        console.error("Wishlist error:", data)
        alert("Failed to add to wishlist")
      }
    } catch (err) {
      console.error("Wishlist failed:", err)
      alert("Failed to add to wishlist")
    }
  }

  if (!products.length) return null

  return (
    <section className="flex flex-col px-8 py-10 bg-stone-50 max-md:px-4">
      {/* Header */}
      <header className="flex items-center justify-between w-full flex-wrap gap-6">
        <h2 className="text-2xl font-semibold text-black">Similar products</h2>
        <div className="flex gap-3">
          <NavigationButton
            direction="left"
            imageSrc="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/184ae31cf729fa37edeab2707659f7acd95fa2cf?placeholderIfAbsent=true"
            onClick={() => scroll("left")}
          />
          <NavigationButton
            direction="right"
            imageSrc="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/2fec114adbde4847dbbfb3f0e3b0bcdca6b4479e?placeholderIfAbsent=true"
            onClick={() => scroll("right")}
          />
        </div>
      </header>

      {/* Product List (Desktop) */}
      <div
        ref={desktopScrollRef}
        className="hidden md:flex gap-6 overflow-x-auto mt-8 pb-4 hide-scrollbar scroll-smooth"
      >
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Mobile ProductGrid */}
      <div className="block md:hidden mt-6 w-full">
        <ProductGrid
          scrollRef={mobileScrollRef}
          products={mobileProducts}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
        />
      </div>

      {/* See More Button */}
      <div className="flex justify-center mt-10">
        <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all">
          <span className="text-base font-medium text-black">See more</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/f395c476b09a1375b483c48e4e81c09fc7afa605?placeholderIfAbsent=true"
            alt="See more"
            className="w-5 h-5 object-contain"
          />
        </button>
      </div>
    </section>
  )
}

export default SimilarProducts
