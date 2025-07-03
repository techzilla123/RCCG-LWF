"use client"

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
  price: number
  discountPrice?: number // Add discount price from API
  quantity: number
}

interface Product extends ProductApiResponse {
  isAdded: boolean
  finalPrice: number // Calculated price after discount
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

  useEffect(() => {
    const currentPath = pathname
    if (currentPath === "/rentals") {
      setCategoryId("c7d6c7e5-aafe-439d-a714-63dd3910d3f9")
    } else if (currentPath === "/shop/decorations") {
      setCategoryId("1fc158a6-5dbc-43e9-b385-4cadb8434a76")
    } else if (currentPath === "/shop/holiday") {
      setCategoryId("6f30f52f-47f2-4196-996c-7b0daabcd495")
    } else if (currentPath === "/shop/balloon") {
      setCategoryId("91a306bf-4df5-4940-8740-d28e0260c10d")
    } else if (currentPath === "/shop") {
      setCategoryId(null)
    } else {
      const savedCategoryId = localStorage.getItem("activeCategoryId")
      setCategoryId(savedCategoryId)
    }
    setReady(true) // mark as ready after setting category
  }, [pathname])

  // Fetch products every time categoryId changes
  useEffect(() => {
    if (!ready) return // wait until pathname/categoryId logic is finished

    const url = categoryId
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/filter-product-category/GCT/${categoryId}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product`

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
          // Ensure proper number conversion
          const originalPrice = Number(p.price) || 0
          const discountAmount = Number(p.discountPrice) || 0
          const finalPrice = originalPrice - discountAmount

          return {
            ...p,
            price: originalPrice, // Store as number
            discountPrice: discountAmount, // Store as number
            isAdded: false,
            finalPrice: finalPrice > 0 ? finalPrice : originalPrice,
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
      setModalType("signup")
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
      setModalType("signup")
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
              price={`$${p.finalPrice.toFixed(2)}`}
              originalPrice={p.discountPrice && p.discountPrice > 0 ? `$${Number(p.price).toFixed(2)}` : undefined}
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
