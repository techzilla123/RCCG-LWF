"use client"
import * as React from "react"
import { ProductRating } from "./ProductRating"
import { ProductActions } from "./ProductActions"
import { FavoriteButton } from "./FavoriteButton"
import { Inter } from "next/font/google"
import { useRouter } from "next/navigation"

const inter = Inter({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
})

interface ProductCardProps {
  id: string
  image: string // This prop will now be directly the image to display
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
  onAddToCart?: () => void
  onAddToWishlist: () => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image, // Now directly used for display
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
  onAddToCart,
  onAddToWishlist,
}) => {
  const router = useRouter()
  const [isFavorited, setIsFavorited] = React.useState(false)

  const handleProductClick = () => {
    router.push(`/preview?${id}`)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorited((prev) => !prev)
    onAddToWishlist()
  }

  return (
    <article className="overflow-hidden relative flex-1 shrink bg-white rounded-2xl basis-0 max-w-[360px] min-h-[440px] min-w-[280px]">
      <img
        src={image || "/placeholder.svg"} // Use the image prop directly
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
        <div className="flex flex-col gap-1 mb-2">
          {originalPrice && <span className="text-gray-500 line-through text-sm font-medium">{originalPrice}</span>}
          <ProductActions
            price={price}
            isAdded={isAdded}
            isDisabled={isOutOfStock}
            cartIcon={cartIcon}
            onAddToCart={onAddToCart}
          />
        </div>
      </div>
      <div onClick={handleFavoriteClick}>
        <FavoriteButton icon={isFavorited ? "/Vector(2).svg" : favoriteIcon} />
      </div>
      {isOutOfStock && (
        <div className="absolute top-0 left-0 bg-[#F03] text-white text-[14px] font-medium px-2.5 py-1 rounded-tl-[6px] rounded-br-[6px] z-10">
          Out of stock
        </div>
      )}
    </article>
  )
}
