"use client"

import * as React from "react"
import type { UploadedFile } from "../ProductsAddOne/MediaUpload"

interface ActionButtonsProps {
  onCancel: () => void
  uploadedFiles: UploadedFile[]
  productId?: string | null
}

export const ActionButtons = ({ onCancel, uploadedFiles, productId }: ActionButtonsProps) => {
  const [isSaved, setIsSaved] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSave = async () => {
    setIsSubmitting(true)
    try {
      const token = localStorage.getItem("accessToken") || ""
      const formDataToSend = new FormData()

      // Product Info
      formDataToSend.append("category_id", localStorage.getItem("categoryId") || "")
      formDataToSend.append("sub_category_id", localStorage.getItem("subCategoryId") || "")
      formDataToSend.append("general_category_id", localStorage.getItem("generalCategoryId") || "")
      formDataToSend.append("product_name", localStorage.getItem("productName") || "")
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
      if (pricingFormData.shippedFrom && pricingFormData.shippedFrom !== "null") {
        shippingInfoParts.push(`Shipped from: ${pricingFormData.shippedFrom}`)
      }
      if (pricingFormData.waitingTime && pricingFormData.waitingTime !== "null") {
        shippingInfoParts.push(`Order now, get by: ${pricingFormData.waitingTime}`)
      }
      if (pricingFormData.returnPolicy && pricingFormData.returnPolicy !== "null") {
        shippingInfoParts.push(`Return policy: ${pricingFormData.returnPolicy}`)
      }
      if (pricingFormData.shippingFee && pricingFormData.shippingFee !== "null") {
        shippingInfoParts.push(`Shipping cost: $${pricingFormData.shippingFee}`)
      }

      const combinedShippingInfo = shippingInfoParts.join(", ")
      formDataToSend.append("shipping_information", combinedShippingInfo)

      // Sizes & Colors
      const sizes = JSON.parse(localStorage.getItem("selectedSizes") || "[]")
      const colors = JSON.parse(localStorage.getItem("selectedColors") || "[]")
      sizes.forEach((size: string) => formDataToSend.append("size[]", size))
      colors.forEach((color: string) => formDataToSend.append("color[]", color))

      // Handle Images
      console.log("📸 Uploaded files received:", uploadedFiles)

      // Validate that we have at least one image
      if (!uploadedFiles || uploadedFiles.length === 0) {
        alert("No images available. Please go back and upload at least one image or ensure existing images are loaded.")
        setIsSubmitting(false)
        return
      }

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

      // Handle image uploads
      let imagesAdded = 0
      uploadedFiles.forEach((fileData, index) => {
        if (index < imageFieldNames.length) {
          // For new uploaded files
          if (fileData.file && fileData.file instanceof File && fileData.file.size > 0) {
            formDataToSend.append(imageFieldNames[index], fileData.file)
            imagesAdded++
            console.log(`✅ Added new image ${index + 1}:`, fileData.file.name)
          }
          // For existing images from API (when editing)
          else if (fileData.image && productId) {
            // For existing images, we might need to handle them differently
            // depending on your backend API requirements
            console.log(`📷 Existing image ${index + 1}:`, fileData.image)
            // You might need to fetch the image and convert it to a File object
            // or your backend might handle existing images differently
            imagesAdded++
          }
        }
      })

      console.log(`📊 Total images processed: ${imagesAdded}`)

      if (imagesAdded === 0) {
        alert("No valid images found. Please ensure at least one image is properly uploaded.")
        setIsSubmitting(false)
        return
      }

      // Use only the update endpoint
      const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/update-product/${productId}`

     

      // Submit to backend
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          ...(token && { Authorization: token }),
        },
        body: formDataToSend,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Submission failed")
      }

      alert("Product updated successfully!")
      window.location.reload()
    } catch (error) {
      console.error("❌ Error saving product:", error)
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert("Failed to save product")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = () => {
    setIsSaved(false)
  }

  return (
    <section className="flex items-center justify-between mt-6 w-full text-base font-medium tracking-normal text-center">
      {!isSaved ? (
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
            {isSubmitting ? "Updating..." : "Update product"}
          </button>
        </>
      ) : (
        <>
          <div className="flex gap-6 items-center">
            <button className="text-base text-red-500 leading-[24px]">Delete</button>
            <button className="text-base text-black leading-[24px]">Disable</button>
          </div>
          <button
            onClick={handleEdit}
            className="px-6 py-2 h-14 text-base font-medium text-white bg-blue-600 cursor-pointer rounded-[50px]"
          >
            Edit
          </button>
        </>
      )}
    </section>
  )
}
