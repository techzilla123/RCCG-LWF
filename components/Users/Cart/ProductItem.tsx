"use client"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { QuantityStepper } from "./QuantityStepper"
import type { ProductItemType } from "./types"

interface ProductItemProps {
  product: ProductItemType
  onQuantityChange: (id: string, color: string, size: string, newQuantity: number) => void | Promise<void>
  onRemoveFromCart: (productId: string, color: string, size: string) => Promise<void>
}

export const ProductItem: React.FC<ProductItemProps> = ({ product, onQuantityChange, onRemoveFromCart }) => {
  const router = useRouter()
  const [isRemoving, setIsRemoving] = useState(false)
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false)

  const handleIncrement = async () => {
    setIsUpdatingQuantity(true)
    try {
      await onQuantityChange(product.id, product.color, product.size, product.quantity + 1)
    } catch (error) {
      console.error("Error updating quantity:", error)
    } finally {
      setIsUpdatingQuantity(false)
    }
  }

  const handleDecrement = async () => {
    if (product.quantity > 1) {
      setIsUpdatingQuantity(true)
      try {
        await onQuantityChange(product.id, product.color, product.size, product.quantity - 1)
      } catch (error) {
        console.error("Error updating quantity:", error)
      } finally {
        setIsUpdatingQuantity(false)
      }
    }
  }

  const handleRemove = async () => {
    setIsRemoving(true)
    try {
      await onRemoveFromCart(product.id, product.color, product.size)
    } catch (error) {
      console.error("Error removing item:", error)
    } finally {
      setIsRemoving(false)
    }
  }

  const handleImageClick = () => {
    router.push(`/preview?${product.id}`)
  }

  return (
    <article className="flex flex-wrap items-start justify-between py-5 px-6 w-full border-b border-gray-200">
      {/* Product Column */}
      <div className="flex-1 min-w-0 flex flex-col sm:flex-row gap-4 items-start">
        {/* Image */}
        <div className="w-20 h-20 max-md:w-16 max-md:h-16 flex-shrink-0">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-contain rounded-md cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleImageClick}
          />
        </div>
        {/* Text */}
        <div className="flex flex-col">
          <div className="text-base font-medium text-black">
            ${product.price}{" "}
            {product.discount &&
              product.discount.percentage > 0 &&
              product.discount.percentage <= 100 &&
              !isNaN(product.discount.percentage) && (
                <span className="text-sm text-gray-500">({product.discount.percentage}% off)</span>
              )}
          </div>
          <h3 className="text-sm sm:text-lg font-semibold max-w-full w-[140px] sm:w-auto">{product.name}</h3>
          <p className="text-sm text-gray-500">
            Color: {product.color}, Size: {product.size}
          </p>
        </div>
      </div>

      {/* Quantity + Total Container */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:ml-auto gap-2 sm:gap-5 w-full sm:w-auto items-end mt-4 sm:mt-0">
        {/* Quantity Column */}
        <div className="w-[110px] flex justify-center sm:justify-end items-center">
          <div className={`${isUpdatingQuantity ? "opacity-50" : ""}`}>
            <QuantityStepper
              quantity={product.quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              disabled={isUpdatingQuantity}
            />
          </div>
        </div>

        {/* Total Column */}
        <div className="flex items-end justify-end gap-5">
          <div className="w-[100px] text-end text-base font-medium text-black">
            ${(product.price * product.quantity).toFixed(2)}
          </div>
          <div className="flex flex-col items-center gap-3">
            {/* X Button - Remove Item */}
            <button
              className={`flex items-center justify-center transition-opacity ${
                isRemoving ? "opacity-50 cursor-not-allowed" : "hover:opacity-70"
              }`}
              onClick={handleRemove}
              disabled={isRemoving}
              aria-label="Remove item from cart"
            >
              {isRemoving ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
            {/* Vector(2).svg - Keep as is */}
            <button className="flex items-center justify-center">
              <img src="/Vector(2).svg" alt="Additional action" className="w-4 aspect-auto" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
