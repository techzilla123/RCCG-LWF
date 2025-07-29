"use client"
import { useEffect, useState } from "react"
import { FiltersDefault } from "./Wish/FiltersDefault"
import { ProductCard } from "./Wish/ProductCard"
import { Pagination } from "./Wish/Pagination"
import { ProductGrid } from "./Wish/MobileShop/ProductGrid"

// Define types
interface ProductDetails {
  productId: string
  productName: string
  imageOne: string
  price: string // Original price
  discountPrice: string // Discount amount
}

interface WishlistItem {
  productDetails: ProductDetails
}

// Interface for localStorage items (matching the Heart component)
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

// Interface for cart localStorage items
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

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [syncing, setSyncing] = useState(false)

  // Helper function to calculate final price
  const calculateFinalPrice = (price: number, discountPrice: number): number => {
    return Math.max(0, price - discountPrice)
  }

  // Helper function to save cart items to localStorage
  const saveCartToLocalStorage = (productId: string, productData?: ProductDetails) => {
    try {
      const existingCart = localStorage.getItem("localCart")
      const cartItems: LocalStorageCartItem[] = existingCart ? JSON.parse(existingCart) : []
      
      // Check if item already exists
      const existingItemIndex = cartItems.findIndex((item) => item.product_id === productId)
      
      const price = typeof productData?.price === "string" ? Number.parseFloat(productData.price) || 0 : 0
      const discountPrice = typeof productData?.discountPrice === "string" ? Number.parseFloat(productData.discountPrice) || 0 : 0
      const finalPrice = calculateFinalPrice(price, discountPrice)
      
      const newItem: LocalStorageCartItem = {
        product_id: productId,
        quantity: "1",
        size: "",
        color: "",
        ...(productData && {
          productName: productData.productName,
          price: price,
          discountPrice: discountPrice,
          finalPrice: finalPrice,
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

  // Function to sync localStorage wishlist to server
  const syncLocalWishlistToServer = async (token: string) => {
    try {
      setSyncing(true)
      const localWishlist = localStorage.getItem("localWishlist")
      if (!localWishlist) {
        setSyncing(false)
        return
      }

      const localItems: LocalStorageWishlistItem[] = JSON.parse(localWishlist)
      if (localItems.length === 0) {
        setSyncing(false)
        return
      }

      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      }

      // Sync each item to server
      const syncPromises = localItems.map(async (item) => {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-wish-list`
        const body = JSON.stringify({
          product_id: item.product_id,
          quantity: item.quantity || "1",
          size: item.size || "",
          color: item.color || "",
        })

        const res = await fetch(url, {
          method: "POST",
          headers,
          body,
        })

        return res.json()
      })

      await Promise.all(syncPromises)
      // Clear localStorage after successful sync
      localStorage.removeItem("localWishlist")
      console.log("Wishlist synced successfully")
    } catch (err) {
      console.error("Failed to sync wishlist:", err)
    } finally {
      setSyncing(false)
    }
  }

  // Watch for token changes and sync when token becomes available
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      syncLocalWishlistToServer(token)
    }
  }, []) // Run once on mount

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("accessToken")
        if (!token) {
          // No token found, load from localStorage
          const localWishlist = localStorage.getItem("localWishlist")
          if (localWishlist) {
            const localItems: LocalStorageWishlistItem[] = JSON.parse(localWishlist)
            const formattedItems: WishlistItem[] = localItems.map((item) => ({
              productDetails: {
                productId: item.product_id,
                productName: item.productName || "Unknown Product",
                imageOne: item.imageOne || "",
                price: (item.price || 0).toString(),
                discountPrice: (item.discountPrice || 0).toString(),
              },
            }))
            setWishlistItems(formattedItems)
          } else {
            setWishlistItems([])
          }
          setLoading(false)
          return
        }

        // Token found, fetch from API
        const headers = {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          Authorization: token,
        }

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/wish-list`
        const res = await fetch(url, {
          method: "GET",
          headers,
        })

        const result = await res.json()
        if (res.ok && result.statusCode === 200) {
          setWishlistItems(result.data || [])
        } else {
          throw new Error(result.message || "Failed to fetch wishlist")
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Something went wrong")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [])

  const handleRemoveFromWishlist = async (productId: string) => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      // Remove from localStorage only
      const localWishlist = localStorage.getItem("localWishlist")
      if (localWishlist) {
        const localItems: LocalStorageWishlistItem[] = JSON.parse(localWishlist)
        const updatedItems = localItems.filter((item) => item.product_id !== productId)
        localStorage.setItem("localWishlist", JSON.stringify(updatedItems))
      }
      // Update state
      setWishlistItems((prevItems) => prevItems.filter((item) => item.productDetails.productId !== productId))
      return
    }

    // Remove from server if token exists
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      }

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/remove-from-wish-list`
      const body = JSON.stringify({
        product_id: productId,
      })

      const res = await fetch(url, {
        method: "DELETE", // or POST depending on your API
        headers,
        body,
      })

      const result = await res.json()
      if (res.ok && result.statusCode === 200) {
        // Update state after successful removal
        setWishlistItems((prevItems) => prevItems.filter((item) => item.productDetails.productId !== productId))
      } else {
        console.error("Failed to remove from wishlist:", result.message)
        alert("Failed to remove item from wishlist")
      }
    } catch (err) {
      console.error("Error removing from wishlist:", err)
      alert("Something went wrong while removing from wishlist")
    }
  }

  const handleAddToCart = async (productId: string) => {
    const token = localStorage.getItem("accessToken")
    const productData = wishlistItems.find((item) => item.productDetails.productId === productId)?.productDetails

    if (!token) {
      // Save to localStorage instead of showing login alert
      const saved = saveCartToLocalStorage(productId, productData)
      if (saved) {
        alert("Product saved to cart! Sign in to sync your cart.")
      } else {
        alert("Failed to save product to cart.")
      }
      return
    }

    // Add to server cart if token exists
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

      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      })

      const result = await response.json()
      if (!response.ok || result.statusCode !== 200) {
        throw new Error(result.message || "Failed to add to cart")
      }

      alert("Product added to cart successfully!")
    } catch (error) {
      console.error("Add to cart failed:", error)
      alert("Could not add to cart.")
    }
  }

 const calculateDiscountedPrice = (originalPrice: string, discountAmount: string) => {
  const original = Number.parseFloat(originalPrice)
  const discount = Number.parseFloat(discountAmount)

  if (!discount || isNaN(discount) || discount <= 0) {
    return null // No discount
  }

  return (original - discount).toFixed(2)
}


  return (
    <main className="flex flex-wrap gap-6 px-8 py-6 max-md:px-5" style={{ background: "#FFFFFF" }}>
      <div className="self-start">
        <FiltersDefault />
      </div>
      <section className="flex flex-col flex-1 shrink justify-center self-start basis-8 min-w-60 max-md:max-w-full">
        {syncing && (
          <div className="text-center w-full mb-4 p-2 bg-blue-100 text-blue-800 rounded">Syncing your wishlist...</div>
        )}
        {loading ? (
          <p className="text-center w-full">Loading wishlist...</p>
        ) : error ? (
          <p className="text-red-500 text-center w-full">{error}</p>
        ) : wishlistItems.length === 0 ? (
          <p className="text-center w-full">Your wishlist is empty.</p>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:flex flex-wrap gap-6 items-start w-full max-md:max-w-full">
              {wishlistItems.map((item, index) => {
  const product = item.productDetails

  if (!product || !product.price || !product.discountPrice) {
    console.warn(`Invalid product data at index ${index}:`, product)
    return null // or render a fallback UI
  }

 const discountedPrice = calculateDiscountedPrice(product.price, product.discountPrice)
const showDiscount = discountedPrice !== null && discountedPrice !== product.price

  return (
    <ProductCard
      key={product.productId || index}
      productId={product.productId}
      image={product.imageOne}
      title={product.productName}
      rating={4.7}
      reviews={400}
       price={`$${showDiscount ? discountedPrice : product.price}`}
  originalPrice={showDiscount ? `$${product.price}` : undefined}
      starIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true"
      cartIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/8cb390dce5451e2e781d761e03e8beb8ba033458?placeholderIfAbsent=true"
      favoriteIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/659be93a7c406efa8073a635c7fb839f349ddff8?placeholderIfAbsent=true"
      isInWishlist={true}
      onRemoveFromWishlist={handleRemoveFromWishlist}
      onAddToCart={handleAddToCart}
    />
  )
})}

            </div>
            {/* Mobile View */}
            <div className="block md:hidden w-full">
              <ProductGrid />
            </div>
          <div className="hidden">
  <Pagination />
</div>
          </>
        )}
      </section>
    </main>
  )
}
