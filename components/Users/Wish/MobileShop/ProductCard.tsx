"use client"

import type React from "react"

import { useState } from "react"
import type { Product } from "./types"
import { HeartIcon } from "./HeartIcon"
import { CartIcon } from "./CartIcon"
import { IconButton } from "./IconButton"
import { OutOfStockBadge } from "./OutOfStockBadge"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  onRemoveFromWishlist?: (productId: string) => void
  onAddToCart?: (productId: string) => void
}

export const ProductCardM: React.FC<ProductCardProps> = ({ product, onRemoveFromWishlist, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted || false)
  const [isInCart, setIsInCart] = useState(product.isAdded || false)
  const [loading, setLoading] = useState(false)
  const [removingFromWishlist, setRemovingFromWishlist] = useState(false)

  const handleWishlist = async () => {
    if (isWishlisted && onRemoveFromWishlist) {
      // Remove from wishlist
      setRemovingFromWishlist(true)
      try {
        await onRemoveFromWishlist(product.id)
        setIsWishlisted(false)
      } catch (error) {
        console.error("Error removing from wishlist:", error)
      } finally {
        setRemovingFromWishlist(false)
      }
    } else {
      // Add to wishlist logic (if needed)
      setIsWishlisted((prev) => !prev)
    }
  }

  const handleAddToCart = async () => {
    if (product.isOutOfStock || loading) return

    setLoading(true)
    try {
      if (onAddToCart) {
        // Use parent's handler if provided
        await onAddToCart(product.id)
        setIsInCart(true)
      } else {
        // Fallback to original logic
        const token = localStorage.getItem("accessToken")
        if (!token) {
          console.warn("User not logged in")
          alert("Product saved to cart! Sign in to sync your cart.")
          setIsInCart(true)
          return
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            Authorization: token,
          },
          body: JSON.stringify({
            product_id: product.id,
            quantity: "1",
            size: "",
            color: "",
          }),
        })

        const json = await res.json()
        if (res.ok && json.statusCode === 200) {
          setIsInCart(true)
        } else {
          console.error("Add to cart failed:", json)
          alert("Failed to add to cart")
        }
      }
    } catch (e) {
      console.error("Error adding to cart:", e)
      alert("Failed to add to cart")
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className="relative flex flex-col p-2 bg-white rounded-lg">
      <Link href={`/preview?${product.id}`} className="block w-full">
        <div className="w-full h-[160px] overflow-hidden rounded-t">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-cover cursor-pointer"
          />
        </div>
      </Link>

      <div className="mt-2 flex-1">
        <h3 className="text-xs font-semibold truncate">{product.title}</h3>
       <p className="mt-1 font-bold">
  ${typeof product.price === "number" ? product.price.toLocaleString() : "0.00"}
</p>

      </div>

      <div className="absolute top-2 right-2 flex flex-col gap-1">
        <IconButton onClick={handleWishlist} ariaLabel="Remove from wishlist" disabled={removingFromWishlist}>
          {removingFromWishlist ? (
            <div className="w-3 h-3 border border-gray-300 border-t-red-500 rounded-full animate-spin" />
          ) : (
            <HeartIcon filled={isWishlisted} />
          )}
        </IconButton>

        {!product.isOutOfStock && (
          <IconButton onClick={handleAddToCart} ariaLabel="Add to cart" disabled={loading}>
            {loading ? (
              <div className="w-3 h-3 border border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            ) : (
              <CartIcon filled={isInCart} />
            )}
          </IconButton>
        )}
      </div>

      {product.isOutOfStock && <OutOfStockBadge />}
    </article>
  )
}
