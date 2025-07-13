"use client"
import * as React from "react"
import type { UploadedFile } from "../ProductsAddOne/MediaUpload"

interface ActionButtonsProps {
  onCancel: () => void
  uploadedFiles: UploadedFile[]
  // productId is removed as per your request to only handle 'create'
}

export const ActionButtons = ({ onCancel, uploadedFiles }: ActionButtonsProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false) // isSaved state removed

  const handleSave = async () => {
    setIsSubmitting(true)
    try {
      const token = localStorage.getItem("accessToken") || ""
      const formDataToSend = new FormData()

      // Product Info
      formDataToSend.append("category_id", localStorage.getItem("categoryId") || "")
      formDataToSend.append("sub_category_id", localStorage.getItem("subCategoryId") || "")
      formDataToSend.append("general_category_id", localStorage.getItem("generalCategoryId") || "")
      const newProductName = localStorage.getItem("productName") || ""
      formDataToSend.append("product_name", newProductName)
      formDataToSend.append("description", localStorage.getItem("description") || "")
      formDataToSend.append("producer", localStorage.getItem("producer") || "")
      formDataToSend.append("classification", localStorage.getItem("category") || "")

      const keywords = JSON.parse(localStorage.getItem("keywords") || "[]")
      keywords.forEach((sku: string) => {
        formDataToSend.append("sku[]", sku)
      })

      const pricingFormData = JSON.parse(localStorage.getItem("pricingFormData") || "{}")
      const price = pricingFormData.price || "0"
      formDataToSend.append("price", price)
      const priceValue = Number(price)
      const rawDiscount = pricingFormData.discount || "0"
      const cleanedDiscount = rawDiscount.replace("%", "").trim()
      const discountPercent = Number(cleanedDiscount)
      if (!isNaN(discountPercent)) {
        const discountAmount = priceValue * (discountPercent / 100)
        formDataToSend.append("discount_price", discountAmount.toFixed(2))
      } else {
        formDataToSend.append("discount_price", "0.00")
      }

      // Quantity
      formDataToSend.append("quantity", localStorage.getItem("stock") || "")

      const shippingInfoParts: string[] = []
      const shippedFrom = pricingFormData.shippedFrom?.trim()
      const waitingTime = pricingFormData.waitingTime?.trim()
      const returnPolicy = pricingFormData.returnPolicy?.trim()
      const shippingFee = pricingFormData.shippingFee?.trim()

      if (shippedFrom) {
        shippingInfoParts.push(`Shipped from: ${shippedFrom}`)
      }
      if (waitingTime) {
        shippingInfoParts.push(`Order now, get by: ${waitingTime}`)
      }
      if (returnPolicy) {
        shippingInfoParts.push(`Return policy: ${returnPolicy}`)
      }
      if (shippingFee) {
        shippingInfoParts.push(`Shipping cost: $${shippingFee}`)
      }
      const combinedShippingInfo = shippingInfoParts.join(", ")
      formDataToSend.append("shipping_information", combinedShippingInfo)

      // Sizes & Colors
      const sizes = JSON.parse(localStorage.getItem("selectedSizes") || "[]")
      const colors = JSON.parse(localStorage.getItem("selectedColors") || "[]")
      sizes.forEach((size: string) => formDataToSend.append("size[]", size))
      colors.forEach((color: string) => formDataToSend.append("color[]", color))

      // Endpoint and method for product creation (always POST)
      const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/create-product`
      const method = "POST"

      // Handle Images
      const imageFieldNames = [
        "image_one",
        "image_two",
        "image_three",
        "image_four",
        "image_five",
        "image_six",
        "image_seven",
        "image_eight",
        "image_nine",
        "image_ten",
        "image_eleven",
        "image_twelve",
        "image_thirteen",
        "image_fourteen",
        "image_fifteen",
        "image_sixteen",
        "image_seventeen",
        "image_eighteen",
        "image_nineteen",
        "image_twenty",
      ]
      let imagesAppendedCount = 0 // Count of valid images appended

      // Iterate through uploadedFiles (which can contain new files or existing API URLs)
      uploadedFiles.forEach((fileData, index) => {
        if (index < imageFieldNames.length) {
          if (fileData.file && fileData.file instanceof File && fileData.file.size > 0) {
            // This is a newly uploaded file with actual content
            formDataToSend.append(imageFieldNames[index], fileData.file)
            imagesAppendedCount++
            console.log(`Appending new ${imageFieldNames[index]}: ${fileData.name}, size: ${fileData.file.size}`)
          } else if (fileData.image) {
            // This is an existing image (from API) or a placeholder URL.
            // Send its URL. This assumes the backend's create endpoint can handle URL strings for image fields.
            formDataToSend.append(imageFieldNames[index], fileData.image)
            imagesAppendedCount++
            console.log(`Appending existing image URL ${imageFieldNames[index]}: ${fileData.image}`)
          } else {
            console.warn(`Skipping ${imageFieldNames[index]}: Invalid file data.`, fileData)
          }
        }
      })

      // Final validation: at least one valid image must have been appended for creation
      if (imagesAppendedCount === 0) {
        alert("At least one image is required to create a new product. Please upload an image.")
        setIsSubmitting(false)
        return
      }

      // Submit to backend
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          ...(token && { Authorization: token }),
          // Do NOT set Content-Type for FormData, browser sets it automatically with boundary
        },
        body: formDataToSend,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Submission failed")
      }

      alert("Product created successfully!")
      window.location.reload()
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert("Failed to save product")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="flex items-center justify-between mt-6 w-full text-base font-medium tracking-normal text-center">
      <>
        <button className="text-base text-black leading-[24px]" onClick={onCancel}>
          Cancel
        </button>
        <div className="flex-1" />
        <button
          className="px-4 py-0 h-14 text-base font-medium text-white bg-blue-600 cursor-pointer rounded-[50px]"
          onClick={handleSave}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create product"}
        </button>
      </>
    </section>
  )
}
