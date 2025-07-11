"use client"
import * as React from "react"
import { Button } from "./Button"

interface ProductInfoProps {
  productId: string
  title: string
  stock: number
  price: number
  originalPrice: number
  countdownTime: string
  description: string
  tags: string[]
  sizes: string[]
  colors: string[]
  shippingInfo?: string
  imageOne: string
  onColorChange?: (colorIndex: number) => void // New prop for color change callback
}

// Interface for localStorage items
interface LocalStorageItem {
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

export const ProductInfo: React.FC<ProductInfoProps> = ({
  productId,
  title,
  stock,
  price,
  originalPrice,
  countdownTime,
  description,
  tags,
  sizes,
  colors,
  shippingInfo,
  imageOne,
  onColorChange,
}) => {
  const [popupMessage, setPopupMessage] = React.useState<string | null>(null)
  const [popupType, setPopupType] = React.useState<"success" | "error" | null>(null)
  const [showViewCart, setShowViewCart] = React.useState(false)
  const [selectedSize, setSelectedSize] = React.useState("l")
  const [isInflated, setIsInflated] = React.useState(false)
  const [quantity, setQuantity] = React.useState(1)
  const [detailsOpen, setDetailsOpen] = React.useState(true)
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null)
  
  // Parse inflated price from description
  const [inflatedPrice, setInflatedPrice] = React.useState<number | null>(null)
  const [showInflatedOptions, setShowInflatedOptions] = React.useState(false)

  React.useEffect(() => {
    // Check if description contains inflated pricing pattern
    const inflatedMatch = description.match(/inflated\s*-\s*\$?(\d+(?:\.\d{2})?)/i)
    if (inflatedMatch) {
      const extractedPrice = parseFloat(inflatedMatch[1])
      setInflatedPrice(extractedPrice)
      setShowInflatedOptions(true)
    } else {
      setInflatedPrice(null)
      setShowInflatedOptions(false)
    }
  }, [description])

  React.useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => {
        setPopupMessage(null)
        setPopupType(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [popupMessage])

  const [countdown, setCountdown] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!countdownTime || !/^\d{2}-\d{2}-\d{4}$/.test(countdownTime)) {
      return
    }
    const [day, month, year] = countdownTime.split("-").map(Number)
    const targetDate = new Date(year, month - 1, day, 23, 59, 59) // end of day
    const updateCountdown = () => {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()
      if (diff <= 0) {
        setCountdown("Expired")
        return
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
    }
    updateCountdown()
    const intervalId = setInterval(updateCountdown, 1000)
    return () => clearInterval(intervalId)
  }, [countdownTime])

  // Calculate current display price based on inflated state
  const getCurrentPrice = () => {
    if (isInflated && inflatedPrice) {
      return inflatedPrice
    }
    return price - originalPrice
  }

  // Helper function to save cart items to localStorage
  const saveCartToLocalStorage = () => {
    try {
      const existingCart = localStorage.getItem("localCart")
      const cartItems: LocalStorageItem[] = existingCart ? JSON.parse(existingCart) : []
      // Check if item already exists with same product_id, size, and color
      const existingItemIndex = cartItems.findIndex(
        (item) => item.product_id === productId && item.size === selectedSize && item.color === selectedColor,
      )
      const finalPrice = getCurrentPrice()
      const newItem: LocalStorageItem = {
        product_id: productId,
        quantity: quantity.toString(),
        size: selectedSize,
        color: selectedColor || "",
        productName: title,
        price: isInflated && inflatedPrice ? inflatedPrice : price,
        discountPrice: originalPrice,
        finalPrice: finalPrice,
        imageOne: imageOne || "", // Ensure imageOne is always included
      }
      if (existingItemIndex > -1) {
        // Update existing item quantity
        const currentQty = Number.parseInt(cartItems[existingItemIndex].quantity) || 1
        cartItems[existingItemIndex].quantity = (currentQty + quantity).toString()
        // Also update the image in case it wasn't saved before
        if (imageOne) {
          cartItems[existingItemIndex].imageOne = imageOne
        }
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

  const handleAddToCart = async () => {
    if (colors.length > 0 && !selectedColor) {
      setPopupMessage("Please select a color.")
      setPopupType("error")
      return
    }
    if (sizes.length > 0 && !selectedSize) {
      setPopupMessage("Please select a size.")
      setPopupType("error")
      return
    }

    const token = localStorage.getItem("accessToken")
    if (!token) {
      // Save to localStorage instead of making API call
      const saved = saveCartToLocalStorage()
      if (saved) {
        setPopupMessage("Product saved to cart! Sign in to sync your cart.")
        window.dispatchEvent(new Event("cartUpdated"))
        setPopupType("success")
        setShowViewCart(true)
      } else {
        setPopupMessage("Failed to save product to cart.")
        setPopupType("error")
      }
      return
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-cart`
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      }
      const body = JSON.stringify({
        product_id: productId,
        quantity: quantity.toString(),
        size: selectedSize,
        color: selectedColor,
      })
      const res = await fetch(url, {
        method: "POST",
        headers,
        body,
      })
      const data = await res.json()
      if (!res.ok || data.statusCode !== 200) {
        const message = data.message || "Failed to add to cart."
        setPopupMessage(message)
        setPopupType("error")
        return
      }
      // Success
      setPopupMessage("Product added to cart successfully!")
      window.dispatchEvent(new Event("cartUpdated"))
      setPopupType("success")
      setShowViewCart(true)
    } catch (err) {
      setPopupMessage("Something went wrong. Please try again.")
      setPopupType("error")
      console.error(err)
    }
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= stock) {
      setQuantity(value)
    }
  }

  const handleColorChange = (color: string, index: number) => {
    setSelectedColor(color)
    if (onColorChange) {
      onColorChange(index)
    }
  }

  return (
    <>
      {popupMessage && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg z-50 transition-all duration-300
          ${popupType === "success" ? "bg-green text-white" : "bg-red-500 text-white"}`}
        >
          {popupMessage}
        </div>
      )}
      <aside className="flex-1 shrink bg-white rounded-lg basis-0 min-w-60 p-4 max-md:max-w-full">
        <div className="flex flex-col w-full leading-6 max-md:max-w-full">
          <span className="px-2 py-0.5 text-xs text-black bg-[#E1F7E6] w-[100px] rounded">{stock} In-stock</span>
          <h1 className="mt-3 text-2xl font-semibold text-black">{title}</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 text-sm bg-stone-50 rounded-full text-black">
                {tag}
              </span>
            ))}
          </div>
          <div className="pt-2 mt-3">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-black"> ${getCurrentPrice().toFixed(2)}</span>
              {originalPrice > 0 && !isInflated && <span className="text-sm line-through text-neutral-500">${price.toFixed(2)}</span>}
              {originalPrice > 0 && !isInflated ? (
                <span className="px-2 py-0.5 text-xs text-green-600 bg-green-50 rounded">
                  You save ${originalPrice.toFixed(2)} — Now {Math.round((originalPrice / price) * 100)}% off!
                </span>
              ) : null}
            </div>
            {countdown && (
              <p className="mt-1.5 text-sm font-medium">
                <span className="text-neutral-500">Ends in:</span>{" "}
                <span className="text-rose-600">{countdown}</span>
              </p>
            )}
          </div>
        </div>
        <div className="p-4 mt-6 bg-stone-50 rounded-xl">
          {sizes.length > 0 && (
            <div className="flex flex-col">
              <label className="text-sm font-medium text-black">Select size</label>
              <div className="flex justify-between mt-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-10 rounded-full ${
                      selectedSize === size ? "bg-black text-white" : "border border-black bg-transparent text-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {colors.length > 0 && (
            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium text-black">Choose colour</label>
              <div className="flex gap-4 mt-2">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => handleColorChange(color, i)}
                    className={`w-7 h-7 rounded-full border transition-all duration-200 ${
                      selectedColor === color ? "border-2 border-black scale-110" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col mt-4">
            <label className="text-sm font-medium text-black">Quantity</label>
            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => handleQuantityChange(quantity - 1)} className="px-3 py-1 bg-gray-300 rounded">
                -
              </button>
              <input
                type="number"
                min="1"
                max={stock}
                value={quantity}
                onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value))}
                className="w-12 text-center border rounded"
              />
              <button onClick={() => handleQuantityChange(quantity + 1)} className="px-3 py-1 bg-gray-300 rounded">
                +
              </button>
            </div>
          </div>
          {showInflatedOptions && (
            <div className="flex gap-4 mt-4">
              <label className="flex items-center gap-2 text-neutral-500">
                <input type="radio" checked={!isInflated} onChange={() => setIsInflated(false)} />
                Not inflated
              </label>
              <label className="flex items-center gap-2 text-neutral-500">
                <input type="radio" checked={isInflated} onChange={() => setIsInflated(true)} />
                Inflated
              </label>
            </div>
          )}
        </div>
        <div className="mt-6">
          {showViewCart ? (
            <a href="/cart">
              <Button variant="primary" fullWidth>
                View Cart
              </Button>
            </a>
          ) : (
            <Button variant="primary" fullWidth onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
        <section className="pt-6 mt-6 border-t">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setDetailsOpen(!detailsOpen)}
          >
            <h3 className="text-base font-semibold text-black">Product details</h3>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/568c68eeaaa026fc9e65ee05b5849ad0b09003cc?placeholderIfAbsent=true"
              alt="toggle"
              className="w-5 h-5"
            />
          </div>
          {detailsOpen && <div className="mt-4 text-sm text-neutral-500">{description}</div>}
          {shippingInfo && (
            <div className="mt-4 text-sm text-gray-700">
              <strong>Shipping Info:</strong> {shippingInfo}
            </div>
          )}
        </section>
      </aside>
    </>
  )
}
