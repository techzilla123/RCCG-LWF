"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import FiltersDefault from "./Shop/FiltersDefault"
import { ProductCard } from "./Shop/ProductCard"
import { Pagination } from "./Shop/Pagination"
import { ProductGrid } from "./Shop/MobileShop/ProductGrid"
import { SignUpModal } from "../Offer/SignUpModal"
import { LoginModal } from "../Offer/LoginModal"
import { SuccessModal } from "../Offer/SuccessModal"
import { X } from "lucide-react"
import { usePathname } from "next/navigation"

interface ProductApiResponse {
  productId: string
  productName: string
  imageOne: string
  price: number | string
  discountPrice: number | string
  quantity: number
}

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

export function Shop() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalType, setModalType] = useState<"signup" | "login" | "success" | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [ready, setReady] = useState(false)
  const pathname = usePathname()
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const searchParams = useSearchParams()

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

  // Fetch products every time categoryId changes
  useEffect(() => {
    if (!ready) return // wait until pathname/categoryId logic is finished

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

    const fetchProducts = async () => {
      setLoading(true)
      try {
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

        setProducts(formatted)
      } catch (e: unknown) {
        console.error("Fetch error:", e)
        setError(e instanceof Error ? e.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId, ready])

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
        setProducts((prev) => prev.map((p) => (p.productId === productId ? { ...p, isAdded: true } : p)))
      } else {
        console.error("Cart error:", data)
      }
    } catch (err) {
      console.error("Add to cart failed:", err)
    }
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
        alert("Added to wishlist")
      } else {
        console.error("Wishlist error:", data)
      }
    } catch (err) {
      console.error("Wishlist failed:", err)
    }
  }

  const handleCloseModal = () => setModalType(null)
  const handleLoginSuccess = () => setModalType("success")

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

  if (error) return <div className="p-8 text-red-500">Error: {error}</div>

  return (
    <main className="flex gap-6 px-8 py-6 bg-[#F8F8F8]">
      <div className="hidden md:block">
        <FiltersDefault />
      </div>
      <section className="flex-1">
        <div className="flex justify-center md:hidden mb-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => setIsModalVisible(true)}>
            Filters
          </button>
        </div>

        {/* Show FiltersDefault as a modal on mobile or as a permanent component on desktop */}
        {isModalVisible && (
          <div className="max-md:flex max-md:fixed max-md:top-0 max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:bg-opacity-50 max-md:bg-black max-md:z-50 max-md:justify-center max-md:items-center max-md:overflow-y-auto">
            <div className="max-md:w-full max-md:h-auto ml-[60px] max-md:max-h-[90vh] max-md:overflow-y-scroll">
              <button
                className="fixed md:hidden ml-[100px] p-2 bg-blue-100 rounded-full hover:bg-gray-100 -mt-2 transition"
                onClick={() => setIsModalVisible(!isModalVisible)}
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
              <FiltersDefault />
            </div>
          </div>
        )}

        <div className="hidden md:flex flex-wrap gap-6 items-start w-full max-md:max-w-full">
          {products.map((p) => (
            <ProductCard
              key={p.productId}
              id={p.productId}
              image={p.imageOne}
              title={p.productName.length > 26 ? p.productName.slice(0, 23) + "..." : p.productName}
              rating={4.7}
              reviews={400}
              price={`$${Number(p.finalPrice || 0).toFixed(2)}`}
              originalPrice={
                (typeof p.discountPrice === "string" ? Number.parseFloat(p.discountPrice) : p.discountPrice) > 0
                  ? `$${Number(p.price || 0).toFixed(2)}`
                  : undefined
              }
              starIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true"
              cartIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/8cb390dce5451e2e781d761e03e8beb8ba033458?placeholderIfAbsent=true"
              favoriteIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/659be93a7c406efa8073a635c7fb839f349ddff8?placeholderIfAbsent=true"
              isAdded={p.isAdded}
              isOutOfStock={p.quantity === 0}
              onAddToCart={() => handleAddToCart(p.productId)}
              onAddToWishlist={() => handleAddToWishlist(p.productId)}
            />
          ))}
        </div>

        <div className="block md:hidden w-full">
          <ProductGrid />
        </div>

        <Pagination />
      </section>

      {modalType === "signup" && <SignUpModal onClose={handleCloseModal} onOpenLogin={() => setModalType("login")} />}
      {modalType === "login" && (
        <LoginModal
          onClose={handleCloseModal}
          onOpenSignUp={() => setModalType("signup")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {modalType === "success" && <SuccessModal onClose={handleCloseModal} />}
    </main>
  )
}

export default Shop
