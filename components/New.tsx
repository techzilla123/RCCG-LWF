"use client"
import { useEffect, useState, useRef } from "react"
import { ProductHeader } from "./New/ProductHeader"
import { ProductCard } from "./New/ProductCard"
import { ProductGrid } from "./New/MobileShop/ProductGrid"
import { SignUpModal } from "./Offer/SignUpModal"
import { LoginModal } from "./Offer/LoginModal"
import { SuccessModal } from "./Offer/SuccessModal"

// --- Define API and UI product types ---
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
  imageThirteen?: string
}

interface Product extends ProductApiResponse {
  imageList: string[]
  currentImageIndex: number
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

export function New() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalType, setModalType] = useState<"signup" | "login" | "success" | null>(null)
  const desktopScrollRef = useRef<HTMLDivElement | null>(null)
  const mobileScrollRef = useRef<HTMLDivElement | null>(null)

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
      return true
    } catch (error) {
      console.error("Error saving to localStorage:", error)
      return false
    }
  }

  const scrollMobile = (direction: "left" | "right") => {
    if (mobileScrollRef.current) {
      const scrollAmount = 200
      mobileScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product`
    async function fetchProducts() {
      try {
        const token = localStorage.getItem("accessToken")
        const headers = {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          ...(token ? { Authorization: token } : {}),
        }

        const res = await fetch(url, {
          method: "GET",
          headers,
        })

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`)
        }

        const json = await res.json()
        if (json.statusCode === 200 && Array.isArray(json.data.product)) {
          const seenNames = new Set<string>()
const formattedProducts: Product[] = []

for (const p of json.data.product) {
  if (!seenNames.has(p.productName)) {
    seenNames.add(p.productName)

    const imageList = [
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
      p.imageThirteen,
    ].filter(Boolean) // Remove undefined/null

    formattedProducts.push({
      ...p,
      isAdded: false,
      finalPrice: calculateFinalPrice(p.price, p.discountPrice || 0),
      imageList,
      currentImageIndex: 0,
    })
  }
}

// Shuffle the products
for (let i = formattedProducts.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [formattedProducts[i], formattedProducts[j]] = [formattedProducts[j], formattedProducts[i]];
}

setProducts(formattedProducts)


        } else {
          throw new Error("Unexpected response structure")
        }
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "An unknown error occurred"
        console.error("Fetch error:", e)
        setError(message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

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
         window.dispatchEvent(new Event("wishlistUpdated"))
       
      } else {
        console.error("Failed to add to wishlist:", data)
        alert("Could not add product to wishlist.")
      }
    } catch (err) {
      console.error("Wishlist error:", err)
      alert("Something went wrong while adding to wishlist.")
    }
  }

  useEffect(() => {
  const interval = setInterval(() => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        const nextIndex = (product.currentImageIndex + 1) % product.imageList.length
        return {
          ...product,
          currentImageIndex: nextIndex,
        }
      })
    )
  }, 3000) // Change image every 3 seconds

  return () => clearInterval(interval)
}, [])

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
         window.dispatchEvent(new Event("cartUpdated"))
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
        setProducts((prev) => prev.map((p) => (p.productId === productId ? { ...p, isAdded: true } : p)))
        setModalType("success")
      } else {
        console.error("Unexpected response:", data)
      }
    } catch (err) {
      console.error("Add to cart failed:", err)
    }
  }

  const handleClose = () => setModalType(null)
  const handleLoginSuccess = () => setModalType("success")

  const scroll = (direction: "left" | "right") => {
    if (desktopScrollRef.current) {
      const scrollAmount = 300
      desktopScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (loading) {
    return (
      <section className="flex justify-center items-center p-8 bg-sky-50">
        <div className="relative w-24 h-48">
          <div className="w-16 h-20 bg-pink-400 rounded-full shadow-lg mx-auto animate-bounce" />
          <div className="w-3 h-3 bg-pink-500 mx-auto mt-1 rotate-45" />
          <div className="absolute top-[88px] left-1/2 transform -translate-x-1/2 w-px h-24 bg-gray-300 animate-pulse" />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="flex justify-center items-center p-8 bg-sky-50">
        <p className="text-red-500">Error: {error}</p>
      </section>
    )
  }

  return (
    <section className="relative px-8 py-10 bg-sky-50 max-md:px-5">
      <ProductHeader />
      {/* Mobile scroll buttons */}
      <div className="flex md:hidden justify-end gap-4 mt-4 pr-4">
        <button
          onClick={() => scrollMobile("left")}
          className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100"
        >
          <span className="text-lg text-black">‹</span>
        </button>
        <button
          onClick={() => scrollMobile("right")}
          className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100"
        >
          <span className="text-lg text-black">›</span>
        </button>
      </div>

      {/* Desktop scroll buttons */}
      <div className="hidden md:flex justify-end gap-4 mt-4 pr-4">
        <button
          onClick={() => scroll("left")}
          className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100"
        >
          <span className="text-lg text-black">‹</span>
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100"
        >
          <span className="text-lg text-black">›</span>
        </button>
      </div>

      {/* Desktop scrollable row */}
      <div
        ref={desktopScrollRef}
        className="hidden md:flex gap-6 overflow-x-auto scroll-smooth no-scrollbar mt-4 px-12"
      >
        {products.map((p) => (
          <ProductCard
            key={p.productId}
            id={p.productId}
           image={p.imageList[p.currentImageIndex]}
            title={p.productName.length > 26 ? p.productName.slice(0, 23) + "..." : p.productName}
            rating={5.0}
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

      {/* Mobile scrollable ProductGrid */}
      <div className="block md:hidden mt-6 w-full">
        <ProductGrid scrollRef={mobileScrollRef} />
      </div>

      {/* Modals */}
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

export default New
