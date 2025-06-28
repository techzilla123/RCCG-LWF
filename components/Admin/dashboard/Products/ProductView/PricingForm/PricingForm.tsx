"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Checkbox } from "./Checkbox"
import { InputField } from "./InputField"
import { CaretDownIcon, CalendarIcon } from "./Icons"

interface PricingFormProps {
  productId?: string | null
  onCancel: () => void
  onPrevious: () => void
  onNext: () => void
}

interface ProductData {
  productId: string
  categoryName: string
  subCategoryName: string
  generalCategoryName: string
  productName: string
  price: string
  discountPrice: string
  quantity: number
  description: string
  classification: string
  producer: string
  shippingInformation: string
  size: string[]
  color: string[]
  sku: string[]
  imageOne: string
  imageTwo: string
  imageThree: string
  status: string
  created_at: string
  review: Array<{
    review: string
    star: number
    customerName: string
  }>
  similarProducts: Array<{
    productId: string
    categoryName: string
    subCategoryName: string
    productName: string
    price: string
    discountPrice: string
    quantity: string
    imageOne: string
  }>
}

export const PricingForm: React.FC<PricingFormProps> = ({ productId, onCancel, onPrevious, onNext }) => {
  // State definitions
  const [enableDiscount, setEnableDiscount] = useState(true)
  const [enableShipping, setEnableShipping] = useState(true)
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [discount, setDiscount] = useState("")
  const [discountExpires, setDiscountExpires] = useState("2025-06-26")
  const [couponCode, setCouponCode] = useState("")
  const [shippedFrom, setShippedFrom] = useState("")
  const [shippingFee, setShippingFee] = useState("")
  const [waitingTime, setWaitingTime] = useState("")
  const [returnPolicy, setReturnPolicy] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // API helper function
  const getApiHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") || "" : ""
    return {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
      ...(token && { Authorization: token }),
    }
  }

  // Function to parse shipping information
  const parseShippingInfo = (shippingInfo: string) => {
    const parts = shippingInfo.split(", ")
    let shippedFromValue = ""
    let waitingTimeValue = ""
    let returnPolicyValue = ""
    let shippingFeeValue = ""

    parts.forEach((part) => {
      if (part.includes("Shipped from:")) {
        shippedFromValue = part.replace("Shipped from:", "").trim()
      } else if (part.includes("get by:")) {
        waitingTimeValue = part.replace("get by:", "").trim()
      } else if (part.includes("Return policy:")) {
        returnPolicyValue = part.replace("Return policy:", "").trim()
      } else if (part.includes("Shipping cost:")) {
        shippingFeeValue = part.replace("Shipping cost: $", "").trim()
      }
    })

    return {
      shippedFrom: shippedFromValue,
      waitingTime: waitingTimeValue,
      returnPolicy: returnPolicyValue,
      shippingFee: shippingFeeValue,
    }
  }

  // Function to calculate discount percentage
  const calculateDiscountPercentage = (originalPrice: string, discountAmount: string) => {
    const original = Number.parseFloat(originalPrice)
    const discount = Number.parseFloat(discountAmount)
    if (original > 0 && discount > 0) {
      const percentage = (discount / original) * 100
      return `${Math.round(percentage)}%`
    }
    return ""
  }

  // Fetch product data from API
  const fetchProductData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/fetch-product/${productId}`, {
        method: "GET",
        headers: getApiHeaders(),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.statusCode === 200 && result.data) {
        const productData: ProductData = result.data

        // Parse shipping information
        const shippingDetails = parseShippingInfo(productData.shippingInformation)

        // Calculate discount percentage (discountPrice is the discount amount, not final price)
        const discountPercentage = calculateDiscountPercentage(productData.price, productData.discountPrice)

        // Set form values from API data
        setPrice(productData.price)
        setStock(productData.quantity.toString())
        setDiscount(discountPercentage)
        setShippedFrom(shippingDetails.shippedFrom)
        setShippingFee(shippingDetails.shippingFee)
        setWaitingTime(shippingDetails.waitingTime)
        setReturnPolicy(shippingDetails.returnPolicy)

        // Enable discount if there's a discount price
        setEnableDiscount(Number.parseFloat(productData.discountPrice) > 0)

        // Enable shipping if shipping information exists
        setEnableShipping(!!productData.shippingInformation)
      } else {
        throw new Error(result.message || "Failed to fetch product data")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error fetching product data:", err)
    } finally {
      setLoading(false)
    }
  }

  // Load data on component mount
  useEffect(() => {
    if (productId) {
      fetchProductData()
    } else {
      // Fallback to localStorage if no productId
      const saved = localStorage.getItem("pricingFormData")
      if (saved) {
        const parsed = JSON.parse(saved)
        setEnableDiscount(parsed.enableDiscount ?? true)
        setEnableShipping(parsed.enableShipping ?? true)
        setPrice(parsed.price ?? "")
        setStock(parsed.stock ?? "")
        setDiscount(parsed.discount ?? "")
        setDiscountExpires(parsed.discountExpires ?? "")
        setCouponCode(parsed.couponCode ?? "")
        setShippedFrom(parsed.shippedFrom ?? "")
        setShippingFee(parsed.shippingFee ?? "")
        setWaitingTime(parsed.waitingTime ?? "")
        setReturnPolicy(parsed.returnPolicy ?? "")
      }
      setLoading(false)
    }
  }, [productId])

  // Save all fields to localStorage on any change
  useEffect(() => {
    if (!loading) {
      const data = {
        enableDiscount,
        enableShipping,
        price,
        stock,
        discount,
        discountExpires,
        couponCode,
        shippedFrom,
        shippingFee,
        waitingTime,
        returnPolicy,
      }
      localStorage.setItem("pricingFormData", JSON.stringify(data))
    }
  }, [
    loading,
    enableDiscount,
    enableShipping,
    price,
    stock,
    discount,
    discountExpires,
    couponCode,
    shippedFrom,
    shippingFee,
    waitingTime,
    returnPolicy,
  ])

  if (loading) {
    return (
      <main className="flex flex-col gap-6 p-10 mx-auto max-w-none bg-white rounded-2xl w-[640px] max-md:p-5 max-md:w-full max-md:max-w-[991px] max-sm:p-4 max-sm:max-w-screen-sm">
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading product price...</p>
                </div>
              </div>
            </main>
    )
  }

  if (error) {
    return (
      <section className="flex flex-col gap-6 p-10 mx-auto w-[640px] bg-white rounded-2xl max-md:p-5 max-sm:p-4 max-md:w-full">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <div className="text-lg text-red-600">Error loading product data</div>
          <div className="text-sm text-neutral-500">{error}</div>
          <button
            onClick={fetchProductData}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-6 p-10 mx-auto w-[640px] bg-white rounded-2xl max-md:p-5 max-sm:p-4 max-md:w-full">
      <header className="flex flex-col gap-6">
        <div className="flex gap-1 items-center">
          <span className="text-base font-bold text-blue-600">3/3</span>
          <span className="text-base text-neutral-500">Add product</span>
        </div>
        <h1 className="text-3xl font-bold text-black">Pricing</h1>
      </header>

      <form className="flex flex-col gap-4">
        <div className="flex gap-4">
          <InputField
            label="Price"
            required
            prefix="$"
            value={price}
            onChange={(value) => {
              setPrice(value)
              localStorage.setItem("price", value)
            }}
          />
          <InputField
            label="Initial stock"
            required
            value={stock}
            onChange={(value) => {
              setStock(value)
              localStorage.setItem("stock", value)
            }}
          />
        </div>

        <Checkbox label="Enable discount" checked={enableDiscount} onChange={setEnableDiscount} />

        {enableDiscount && (
          <>
            <div className="flex gap-4">
              <InputField label="Discount" value={discount} onChange={setDiscount} suffix={<CaretDownIcon />} />
              <InputField
                label="Discount expires"
                value={discountExpires}
                onChange={setDiscountExpires}
                suffix={<CalendarIcon />}
              />
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 px-4 py-2 h-10 text-base bg-white rounded-3xl border border-neutral-300 text-stone-300"
              />
              <button type="button" className="px-4 h-10 text-sm text-white bg-blue-600 rounded-[50px]">
                Create coupon
              </button>
            </div>
          </>
        )}

        <Checkbox label="Enable shipping and delivery" checked={enableShipping} onChange={setEnableShipping} />

        {enableShipping && (
          <>
            <div className="flex gap-4">
              <InputField label="Shipped from" value={shippedFrom} onChange={setShippedFrom} />
              <InputField label="Shipping fee" prefix="$" value={shippingFee} onChange={setShippingFee} />
            </div>
            <div className="flex gap-4">
              <InputField
                label="Waiting time"
                value={waitingTime}
                onChange={setWaitingTime}
                suffix={<CaretDownIcon />}
              />
              <InputField
                label="Return policy"
                value={returnPolicy}
                onChange={setReturnPolicy}
                suffix={<CaretDownIcon />}
              />
            </div>
          </>
        )}

        <footer className="flex gap-4 justify-end max-sm:flex-col max-sm:items-end">
          <button type="button" onClick={onCancel} className="px-4 h-10 text-sm text-black rounded-[50px]">
            Cancel
          </button>
          <button type="button" onClick={onPrevious} className="px-4 h-10 text-sm text-black rounded-[50px]">
            Previous
          </button>
          <button type="submit" className="px-4 h-10 text-sm text-white bg-blue-600 rounded-[50px]" onClick={onNext}>
            Preview & finish
          </button>
        </footer>
      </form>
    </section>
  )
}

export default PricingForm
