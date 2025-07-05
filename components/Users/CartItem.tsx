"use client"
import { useEffect, useState } from "react"
import { ProductHeader } from "./Cart/ProductHeader"
import { ProductItem } from "./Cart/ProductItem"
import { CouponSection } from "./Cart/CouponSection"
import { OrderSummary } from "./Cart/OrderSummary"
import type { ProductItemType } from "./Cart/types"

export interface ApiCartItem {
  productId: string
  quantity: number
  size: string
  color: string
  productDetails: {
    productId: string
    categoryName: string
    subCategoryName: string
    productName: string
    price: string
    discountPrice: string
    quantity: string
    imageOne: string
  }
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

export default function CartItem() {
  const [products, setProducts] = useState<ProductItemType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)

  // Helper function to calculate final price
  const calculateFinalPrice = (price: number, discountPrice: number): number => {
    return Math.max(0, price - discountPrice)
  }

  // Function to update/replace items with same product_id in localStorage
  const updateLocalStorageWithLatestItems = (items: LocalStorageCartItem[]) => {
    try {
      const latestItems: { [key: string]: LocalStorageCartItem } = {}

      // Keep only the latest item for each product_id (this will replace previous ones)
      items.forEach((item) => {
        latestItems[item.product_id] = { ...item } // This will overwrite previous item with same product_id
      })

      const finalItems = Object.values(latestItems)
      localStorage.setItem("localCart", JSON.stringify(finalItems))
      return finalItems
    } catch (error) {
      console.error("Error updating localStorage with latest items:", error)
      return items
    }
  }

  // // Function to add/update item in localStorage (replaces existing item with same product_id)
  // const addToLocalCart = (newItem: LocalStorageCartItem): void => {
  //   try {
  //     const localCart = localStorage.getItem("localCart")
  //     const cartItems: LocalStorageCartItem[] = localCart ? JSON.parse(localCart) : []

  //     // Remove any existing item with the same product_id
  //     const filteredItems = cartItems.filter((item) => item.product_id !== newItem.product_id)

  //     // Add the new item
  //     filteredItems.push(newItem)

  //     localStorage.setItem("localCart", JSON.stringify(filteredItems))
  //   } catch (error) {
  //     console.error("Error adding to local cart:", error)
  //   }
  // }

  // Function to sync localStorage cart to server
  const syncLocalCartToServer = async (token: string) => {
    try {
      setSyncing(true)
      const localCart = localStorage.getItem("localCart")
      if (!localCart) {
        setSyncing(false)
        return
      }

      const localItems: LocalStorageCartItem[] = JSON.parse(localCart)
      if (localItems.length === 0) {
        setSyncing(false)
        return
      }

      // Update localStorage to keep only latest items per product_id
      const latestItems = updateLocalStorageWithLatestItems(localItems)

      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      }

      // Sync each item to server
      const syncPromises = latestItems.map(async (item) => {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-cart`
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
      localStorage.removeItem("localCart")
      console.log("Cart synced successfully")
    } catch (err) {
      console.error("Failed to sync cart:", err)
    } finally {
      setSyncing(false)
    }
  }

  // Function to update localStorage cart item quantity
  const updateLocalStorageQuantity = (productId: string, newQuantity: number) => {
    try {
      const localCart = localStorage.getItem("localCart")
      if (localCart) {
        const localItems: LocalStorageCartItem[] = JSON.parse(localCart)
        const updatedItems = localItems.map((item) =>
          item.product_id === productId ? { ...item, quantity: newQuantity.toString() } : item,
        )
        localStorage.setItem("localCart", JSON.stringify(updatedItems))
      }
    } catch (error) {
      console.error("Error updating localStorage quantity:", error)
    }
  }

  // Function to remove item from localStorage
  const removeFromLocalStorage = (productId: string) => {
    try {
      const localCart = localStorage.getItem("localCart")
      if (localCart) {
        const localItems: LocalStorageCartItem[] = JSON.parse(localCart)
        const updatedItems = localItems.filter((item) => item.product_id !== productId)
        localStorage.setItem("localCart", JSON.stringify(updatedItems))
      }
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  }

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("accessToken")

      if (!token) {
        // No token found, load from localStorage
        const localCart = localStorage.getItem("localCart")
        if (localCart) {
          const localItems: LocalStorageCartItem[] = JSON.parse(localCart)
          // Update localStorage to keep only latest items per product_id
          const latestItems = updateLocalStorageWithLatestItems(localItems)

          const formattedItems: ProductItemType[] = latestItems.map((item) => {
            const price = item.price || 0
            const discountPrice = item.discountPrice || 0
            const finalPrice = item.finalPrice || calculateFinalPrice(price, discountPrice)
            const hasDiscount = discountPrice > 0

            return {
              id: item.product_id,
              name: item.productName || "Unknown Product",
              image: item.imageOne || "",
              quantity: Number.parseInt(item.quantity) || 1,
              color: item.color || "",
              size: item.size || "",
              price: finalPrice,
              discount: hasDiscount
                ? {
                    percentage: Math.round((discountPrice / price) * 100),
                    originalPrice: price,
                  }
                : undefined,
              categoryName: "",
              subCategoryName: "",
              rawPrice: price,
              rawDiscountPrice: discountPrice,
            }
          })
          setProducts(formattedItems)
        } else {
          setProducts([])
        }
        setIsLoading(false)
        return
      }

      // Token found, sync localStorage first, then fetch from API
      await syncLocalCartToServer(token)

      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      }

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/cart-list`
      const res = await fetch(url, {
        method: "GET",
        headers,
      })

      const result = await res.json()
      if (res.ok && result.statusCode === 200) {
        const transformed: ProductItemType[] = result.data.map((item: ApiCartItem) => {
          const details = item.productDetails
          const price = Number(details.price)
          const discountPrice = Number(details.discountPrice)
          const hasDiscount = discountPrice > 0

          return {
            id: item.productId,
            name: details.productName,
            image: details.imageOne,
            quantity: item.quantity,
            color: item.color || "",
            size: item.size || "",
            price: price - discountPrice,
            discount: hasDiscount
              ? {
                  percentage: Math.round((discountPrice / price) * 100),
                  originalPrice: price,
                }
              : undefined,
            categoryName: details.categoryName,
            subCategoryName: details.subCategoryName,
            rawPrice: price,
            rawDiscountPrice: discountPrice,
          }
        })
        setProducts(transformed)
      } else {
        console.error("Failed to load cart items", result.message)
      }
    } catch (error) {
      console.error("Error loading cart items", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCartItems()
  }, [])

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    const token = localStorage.getItem("accessToken")

    if (!token) {
      // Update localStorage only
      updateLocalStorageQuantity(id, newQuantity)
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? { ...product, quantity: newQuantity } : product)),
      )
      return
    }

    // Update server if token exists
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      }

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/update-cart-quantity`
      const body = JSON.stringify({
        product_id: id,
        quantity: newQuantity.toString(),
      })

      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      })

      const result = await response.json()
      if (response.ok && result.statusCode === 200) {
        // Update local state after successful server update
        setProducts((prev) =>
          prev.map((product) => (product.id === id ? { ...product, quantity: newQuantity } : product)),
        )
      } else {
        console.error("Failed to update quantity:", result.message)
        alert("Failed to update quantity")
      }
    } catch (error) {
      console.error("Error updating quantity:", error)
      alert("Something went wrong while updating quantity")
    }
  }

  const handleRemoveFromCart = async (productId: string) => {
    const token = localStorage.getItem("accessToken")

    if (!token) {
      // Remove from localStorage only
      removeFromLocalStorage(productId)
      setProducts((prev) => prev.filter((product) => product.id !== productId))
      return
    }

    // Remove from server if token exists
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      }

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/remove-from-cart/${productId}`
      const response = await fetch(url, {
        method: "GET",
        headers,
      })

      const result = await response.json()
      if (!response.ok || result.statusCode !== 200) {
        throw new Error(result.message || "Failed to remove from cart")
      }

      // Remove item from local state
      setProducts((prev) => prev.filter((product) => product.id !== productId))
    } catch (error) {
      console.error("Remove from cart failed:", error)
      alert("Could not remove item from cart.")
    }
  }

  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0)

  const itemTotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0)

  const summaryItems = [
    { label: "Item(s) total", amount: `$${itemTotal.toFixed(2)}`, bold: true },
    { label: "Coupon discount", amount: "-$0.00", bold: true },
    { label: "Sub total", amount: `$${itemTotal.toFixed(2)}`, bold: true },
    { label: "Taxes", amount: "$5.00", bold: true },
  ]

  const orderDetails = products.map((product) => ({
    amount: (product.price * product.quantity).toFixed(2),
    quantity: product.quantity.toString(),
    product_id: product.id,
    product_name: product.name,
    size: product.size,
    color: product.color,
  }))

  return (
    <main className="flex flex-wrap gap-6 px-8 py-10 max-md:px-5">
      <section className="flex flex-col flex-1 shrink justify-center self-start basis-12 min-w-60 max-md:max-w-full">
        <ProductHeader />
        {syncing && (
          <div className="text-center w-full mb-4 p-2 bg-blue-100 text-blue-800 rounded">Syncing your cart...</div>
        )}
        {isLoading ? (
          <p>Loading cart items...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductItem
              key={product.id} // Using product.id as key (no duplicates now)
              product={product}
              onQuantityChange={handleQuantityChange}
              onRemoveFromCart={handleRemoveFromCart}
            />
          ))
        ) : (
          <p>No products in cart.</p>
        )}
        <CouponSection />
      </section>
      <OrderSummary
        items={summaryItems}
        totalItems={totalItems}
        total={`$${(itemTotal + 5).toFixed(2)}`}
        orders={orderDetails}
      />
    </main>
  )
}
