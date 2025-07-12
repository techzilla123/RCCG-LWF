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
  setIsSubmitting(true);
  try {
    const token = localStorage.getItem("accessToken") || "";
    const formDataToSend = new FormData();

    // Fetch current product data
    let existingProductName = "";
    if (productId) {
      const fetchResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/fetch-product/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
        }
      );

      if (fetchResponse.ok) {
        const data = await fetchResponse.json();
        existingProductName = data?.data?.productName || "";
      }
    }

    // Product Info
    formDataToSend.append("category_id", localStorage.getItem("categoryId") || "");
    formDataToSend.append("sub_category_id", localStorage.getItem("subCategoryId") || "");
    formDataToSend.append("general_category_id", localStorage.getItem("generalCategoryId") || "");

    const newProductName = localStorage.getItem("productName") || "";
    if (newProductName && newProductName !== existingProductName) {
      formDataToSend.append("product_name", newProductName);
    }

    formDataToSend.append("description", localStorage.getItem("description") || "");
    formDataToSend.append("producer", localStorage.getItem("producer") || "");
    formDataToSend.append("classification", localStorage.getItem("category") || "");

    const keywords = JSON.parse(localStorage.getItem("keywords") || "[]");
    keywords.forEach((sku: string) => {
      formDataToSend.append("sku[]", sku);
    });

    const pricingFormData = JSON.parse(localStorage.getItem("pricingFormData") || "{}");
    const price = pricingFormData.price || "0";
    formDataToSend.append("price", price);

    const priceValue = Number(price);
    const rawDiscount = pricingFormData.discount || "0";
    const cleanedDiscount = rawDiscount.replace("%", "").trim();
    const discountPercent = Number(cleanedDiscount);

    if (!isNaN(discountPercent)) {
      const discountAmount = priceValue * (discountPercent / 100);
      formDataToSend.append("discount_price", discountAmount.toFixed(2));
    } else {
      formDataToSend.append("discount_price", "0.00");
    }

    // Quantity
    formDataToSend.append("quantity", localStorage.getItem("stock") || "");

   const shippingInfoParts: string[] = [];

const shippedFrom = pricingFormData.shippedFrom?.trim();
const waitingTime = pricingFormData.waitingTime?.trim();
const returnPolicy = pricingFormData.returnPolicy?.trim();
const shippingFee = pricingFormData.shippingFee?.trim();


if (shippedFrom) {
  shippingInfoParts.push(`Shipped from: ${shippedFrom}`);
}
if (waitingTime) {
  shippingInfoParts.push(`Order now, get by: ${waitingTime}`);
}
if (returnPolicy) {
  shippingInfoParts.push(`Return policy: ${returnPolicy}`);
}
if (shippingFee) {
  shippingInfoParts.push(`Shipping cost: $${shippingFee}`);
}

const combinedShippingInfo = shippingInfoParts.join(", ");

// Always append — even if it's empty (to overwrite previous data if user clears it)
formDataToSend.append("shipping_information", combinedShippingInfo);


    // Sizes & Colors
    const sizes = JSON.parse(localStorage.getItem("selectedSizes") || "[]");
    const colors = JSON.parse(localStorage.getItem("selectedColors") || "[]");
    sizes.forEach((size: string) => formDataToSend.append("size[]", size));
    colors.forEach((color: string) => formDataToSend.append("color[]", color));

    // Handle Images
    if (!uploadedFiles || uploadedFiles.length === 0) {
      alert("No images available. Please go back and upload at least one image or ensure existing images are loaded.");
      setIsSubmitting(false);
      return;
    }

    const imageFieldNames = [
      "image_one", "image_two", "image_three", "image_four", "image_five",
      "image_six", "image_seven", "image_eight", "image_nine", "image_ten",
      "image_eleven", "image_twelve", "image_thirteen", "image_fourteen", "image_fifteen",
      "image_sixteen", "image_seventeen", "image_eighteen", "image_nineteen", "image_twenty",
    ];

    let imagesAdded = 0;
    uploadedFiles.forEach((fileData, index) => {
      if (index < imageFieldNames.length) {
        if (fileData.file && fileData.file instanceof File && fileData.file.size > 0) {
          formDataToSend.append(imageFieldNames[index], fileData.file);
          imagesAdded++;
        } else if (fileData.image && productId) {
          imagesAdded++;
        }
      }
    });

    if (imagesAdded === 0) {
      alert("No valid images found. Please ensure at least one image is properly uploaded.");
      setIsSubmitting(false);
      return;
    }

    // Submit to backend
    const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/update-product/${productId}`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        ...(token && { Authorization: token }),
      },
      body: formDataToSend,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Submission failed");
    }

    alert("Product updated successfully!");
    window.location.reload();
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Failed to save product");
    }
  } finally {
    setIsSubmitting(false);
  }
};

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
