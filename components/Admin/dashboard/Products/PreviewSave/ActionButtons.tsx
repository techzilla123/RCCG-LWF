import * as React from "react";
import type { UploadedFile } from "../ProductsAddOne/MediaUpload"; // or correct relative path

interface ActionButtonsProps {
  onCancel: () => void;
  uploadedFiles: UploadedFile[];
}

export const ActionButtons = ({ onCancel, uploadedFiles }: ActionButtonsProps) => {
  const [isSaved, setIsSaved] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
// const imageFieldNames = ["image_one", "image_two", "image_three"];


  const handleSave = async () => {
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("accessToken") || "";
      const formDataToSend = new FormData();

      formDataToSend.append("category_id", localStorage.getItem("categoryId") || "");
      formDataToSend.append("product_name", localStorage.getItem("productName") || "");
      formDataToSend.append("description", localStorage.getItem("description") || "");
      formDataToSend.append("producer", localStorage.getItem("producer") || "");
      formDataToSend.append("classification", localStorage.getItem("category") || "");
formDataToSend.append("sub_category_id", localStorage.getItem("subCategoryId") || "");

const price = localStorage.getItem("price");
if (price && !isNaN(Number(price))) {
  formDataToSend.append("price", price);
}
const discount = localStorage.getItem("discount") || "0";
const discountPercent = Number(discount);

const priceValue = Number(localStorage.getItem("price") || "0");
const discountAmount = priceValue * (discountPercent / 100);

formDataToSend.append("discount_price", discountAmount.toFixed(2));



formDataToSend.append("quantity", localStorage.getItem("stock") || "");
 const shippedFrom = localStorage.getItem("shippedFrom") || "";
const waitingTime = localStorage.getItem("waitingTime") || "";
const returnPolicy = localStorage.getItem("returnPolicy") || "";

const shippingInfoParts = [];

if (shippedFrom && shippedFrom !== "null") {
  shippingInfoParts.push(`Shipped from: ${shippedFrom}`);
}
if (waitingTime && waitingTime !== "null") {
  shippingInfoParts.push(`Waiting time: ${waitingTime}`);
}
if (returnPolicy && returnPolicy !== "null") {
  shippingInfoParts.push(`Return policy: ${returnPolicy}`);
}

const combinedShippingInfo = shippingInfoParts.join(", ");
formDataToSend.append("shipping_information", combinedShippingInfo);


    
      const sizes = JSON.parse(localStorage.getItem("selectedSizes") || "[]");
      const colors = JSON.parse(localStorage.getItem("selectedColors") || "[]");

      sizes.forEach((size: string) => formDataToSend.append("size[]", size));
      colors.forEach((color: string) => formDataToSend.append("color[]", color));

      // Append real File objects
      if (!uploadedFiles || uploadedFiles.length === 0) {
        alert("Please upload at least one image.");
        setIsSubmitting(false);
        return;
      }

 const imageFieldNames = [
  "image_one", "image_two", "image_three", "image_four", "image_five",
  "image_six", "image_seven", "image_eight", "image_nine", "image_ten",
  "image_eleven", "image_twelve", "image_thirteen", "image_fourteen",
  "image_fifteen", "image_sixteen", "image_seventeen", "image_eighteen",
  "image_nineteen", "image_twenty"
];

uploadedFiles.forEach((file, index) => {
  if (index < imageFieldNames.length) {
    formDataToSend.append(imageFieldNames[index], file.file);
  }
});





      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/create-product`,
        {
          method: "POST",
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Submission failed");
      }

      
      alert("Product created successfully!");
      setIsSaved(true);
   } catch (error) {
  console.error("❌ Error saving product:", error);

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
    setIsSaved(false);
  };

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
            {isSubmitting ? "Saving..." : "Save product"}
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
  );
};
