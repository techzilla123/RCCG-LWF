"use client"
import type * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProductRating } from "./ProductRating"
import { ProductActions } from "./ProductActions"
import { FavoriteButton } from "./FavoriteButton"
import { Inter } from "next/font/google"

const inter = Inter({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
})

interface ProductCardProps {
  productId: string
  image: string
  title: string
  rating: number
  reviews: number
  price: string
  originalPrice?: string
  starIcon: string
  cartIcon: string
  favoriteIcon: string
  isAdded?: boolean
  isOutOfStock?: boolean
  isInWishlist?: boolean
  onRemoveFromWishlist?: (productId: string) => void
  onAddToCart?: (productId: string) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  image,
  title,
  rating,
  reviews,
  price,
  originalPrice,
  starIcon,
  cartIcon,
  favoriteIcon,
  isAdded = false,
  isOutOfStock = false,
  isInWishlist = false,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  const router = useRouter()
  const [added, setAdded] = useState(isAdded)
  const [adding, setAdding] = useState(false)
  const [removingFromWishlist, setRemovingFromWishlist] = useState(false)

  const handleProductClick = () => {
    router.push(`/preview?${productId}`)
  }

  const handleAddToCart = async () => {
    if (onAddToCart) {
      // Use parent's handler if provided (for wishlist page)
      onAddToCart(productId)
      return
    }

    const token = localStorage.getItem("accessToken")
    if (!token) {
      // Handle localStorage cart addition here if needed
      alert("Product saved to cart! Sign in to sync your cart.")
      setAdded(true)
      return
    }

    try {
      setAdding(true)
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-cart`
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      }

      const body = JSON.stringify({
        product_id: productId,
        quantity: "1",
        size: "", // Update if needed
        color: "", // Update if needed
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

      setAdded(true)
    } catch (error) {
      console.error("Add to cart failed:", error)
      alert("Could not add to cart.")
    } finally {
      setAdding(false)
    }
  }

  const handleRemoveFromWishlist = async () => {
    if (onRemoveFromWishlist) {
      // Use parent's handler if provided (for wishlist page)
      onRemoveFromWishlist(productId)
      return
    }

    const token = localStorage.getItem("accessToken")
    if (!token) {
      // Remove from localStorage only
      const localWishlist = localStorage.getItem("localWishlist")
      if (localWishlist) {
        const localItems = JSON.parse(localWishlist)
        const updatedItems = localItems.filter((item: any) => item.product_id !== productId)
        localStorage.setItem("localWishlist", JSON.stringify(updatedItems))
        alert("Product removed from wishlist!")
      }
      return
    }

    try {
      setRemovingFromWishlist(true)
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/remove-from-wish-list/${productId}`
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      }

      const response = await fetch(url, {
        method: "GET",
        headers,
      })

      const result = await response.json()
      if (!response.ok || result.statusCode !== 200) {
        throw new Error(result.message || "Failed to remove from wishlist")
      }

      alert("Product removed from wishlist!")
    } catch (error) {
      console.error("Remove from wishlist failed:", error)
      alert("Could not remove from wishlist.")
    } finally {
      setRemovingFromWishlist(false)
    }
  }

  return (
    <article className="overflow-hidden relative flex-1 shrink bg-white rounded-2xl basis-0 max-w-[360px] min-h-[440px] min-w-[280px]">
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="cursor-pointer object-contain z-0 w-full aspect-[1.19]"
        onClick={handleProductClick}
      />
      <div className="z-0 flex-1 px-4 pt-4 pb-6 w-full">
        <div className="flex flex-col flex-1 w-full">
          <ProductRating rating={rating} reviews={reviews} starIcon={starIcon} />
          <h3
            className={`${inter.variable} font-[var(--font-inter)] font-semibold text-xl tracking-normal leading-[26px] text-black mt-2 mb-2`}
          >
            {title}
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          {originalPrice && <span className="text-gray-500 line-through text-sm">{originalPrice}</span>}
          <ProductActions
            price={price}
            isAdded={added}
            isDisabled={isOutOfStock || adding}
            cartIcon={cartIcon}
            onClick={handleAddToCart}
          />
        </div>
      </div>
      <FavoriteButton
        icon={favoriteIcon}
        isInWishlist={isInWishlist}
        isRemoving={removingFromWishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
      />
      {isOutOfStock && (
        <div className="absolute top-0 left-0 bg-[#F03] text-white text-[14px] font-medium px-2.5 py-1 rounded-tl-[6px] rounded-br-[6px] z-10">
          Out of stock
        </div>
      )}
    </article>
  )
}
