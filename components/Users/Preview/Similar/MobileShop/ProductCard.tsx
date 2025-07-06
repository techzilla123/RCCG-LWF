"use client"

import { useState } from "react"
import type React from "react"

import Link from "next/link"
import type { Product } from "./types"
import { HeartIcon } from "./HeartIcon"
import { CartIcon } from "./CartIcon"
import { IconButton } from "./IconButton"
import { OutOfStockBadge } from "./OutOfStockBadge"

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
  onAddToWishlist?: (productId: string) => void
}

export const ProductCardM: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted || false)
  const [isInCart, setIsInCart] = useState(product.isAdded || false)
  const [loading, setLoading] = useState(false)
  const [wishlistLoading, setWishlistLoading] = useState(false)

  const handleWishlist = async () => {
    if (wishlistLoading) return
    setWishlistLoading(true)

    try {
      if (onAddToWishlist) {
        await onAddToWishlist(product.id)
        setIsWishlisted(true)
      } else {
        setIsWishlisted(!isWishlisted)
      }
    } catch (error) {
      console.error("Error with wishlist:", error)
    } finally {
      setWishlistLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (product.isOutOfStock || loading) return
    setLoading(true)

    try {
      if (onAddToCart) {
        await onAddToCart(product.id)
        setIsInCart(true)
      } else {
        setIsInCart(!isInCart)
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className="flex relative flex-col items-start bg-white rounded-lg flex-grow h-[220px] w-full min-w-0 shadow-sm overflow-hidden">
      <Link href={`/preview?${product.id}`} className="w-full">
      <img
  src={product.image || "/placeholder.svg"}
  alt={product.title}
  className="h-[130px] w-full object-contain bg-white rounded-t-[8px] cursor-pointer"

/>

      </Link>

      <div className="flex flex-col gap-1 items-start p-3 w-full flex-1">
        <Link href={`/preview?${product.id}`} className="w-full flex-1">
          <h3 className="w-full text-sm leading-4 text-black line-clamp-2 cursor-pointer font-medium">
            {product.title}
          </h3>
        </Link>

        <div className="flex flex-col gap-1 justify-end items-start w-full mt-auto">
          {product.originalPrice && (
            <span className="text-xs text-gray-500 line-through">
              ${Number(product.originalPrice).toFixed(2)}
            </span>
          )}
          <p className="w-full text-base font-bold leading-5 text-black">
            ${Number(product.finalPrice || product.price).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex absolute top-2 flex-col gap-1 items-end right-[6.5px]">
        <IconButton
          onClick={handleWishlist}
          ariaLabel={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          disabled={wishlistLoading}
        >
          {wishlistLoading ? (
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
