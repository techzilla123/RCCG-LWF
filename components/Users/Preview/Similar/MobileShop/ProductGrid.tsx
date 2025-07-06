"use client"
import type React from "react"
import { ProductCardM } from "./ProductCard"

export interface Product {
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

interface ProductGridProps {
  scrollRef?: React.RefObject<HTMLDivElement>
  products?: Product[]
  onAddToCart?: (productId: string) => void
  onAddToWishlist?: (productId: string) => void
}

export const ProductGrid: React.FC<ProductGridProps> = ({ scrollRef, products = [], onAddToCart, onAddToWishlist }) => {
  return (
    <section
      ref={scrollRef}
      className="
        flex max-sm:overflow-x-auto max-sm:scroll-smooth max-sm:gap-4 
        max-sm:px-2 sm:grid sm:grid-cols-3 gap-4 w-full no-scrollbar
      "
    >
      {products.map((product) => (
        <div key={product.id} className="max-sm:flex-shrink-0 max-sm:w-[153px]">
          <ProductCardM product={product} onAddToCart={onAddToCart} onAddToWishlist={onAddToWishlist} />
        </div>
      ))}
    </section>
  )
}
