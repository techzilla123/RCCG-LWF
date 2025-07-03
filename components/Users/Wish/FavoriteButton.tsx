"use client"

import type * as React from "react"

interface FavoriteButtonProps {
  icon: string
  isInWishlist?: boolean
  isRemoving?: boolean
  onRemoveFromWishlist?: () => void
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  icon,
  isInWishlist = false,
  isRemoving = false,
  onRemoveFromWishlist,
}) => {
  const handleClick = () => {
    if (isInWishlist && onRemoveFromWishlist) {
      onRemoveFromWishlist()
    }
  }

  return (
    <div className="flex absolute top-3 right-3 z-0 flex-col items-end w-12">
      <button
        className={`flex justify-center items-center p-4 w-12 h-12 rounded-full transition-all duration-200 ${
          isInWishlist ? "bg-red-500 hover:bg-red-600" : "bg-white hover:bg-gray-100"
        } ${isRemoving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onClick={handleClick}
        disabled={isRemoving}
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isRemoving ? (
          <div className="w-6 h-6 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
        ) : (
          <img
            src={icon || "/placeholder.svg"}
            alt="Favorite"
            className={`object-contain w-10 h-10 transform scale-150 ${
              isInWishlist ? "filter brightness-0 invert" : ""
            }`}
          />
        )}
      </button>
    </div>
  )
}
