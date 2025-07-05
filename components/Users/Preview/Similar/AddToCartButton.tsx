"use client";
import React from "react";

interface ProductData {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  discountPrice?: number;
  image: string;
}

interface AddToCartButtonProps {
  productId: string;
  productData: ProductData;
}

// Interface for localStorage cart items
interface LocalStorageCartItem {
  product_id: string;
  quantity: string;
  size: string;
  color: string;
  productName?: string;
  price?: number;
  discountPrice?: number;
  finalPrice?: number;
  imageOne?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId, productData }) => {
  // Helper function to save cart items to localStorage
  const saveCartToLocalStorage = (productId: string, productData: ProductData) => {
    try {
      const existingCart = localStorage.getItem("localCart");
      const cartItems: LocalStorageCartItem[] = existingCart ? JSON.parse(existingCart) : [];
      
      // Check if item already exists
      const existingItemIndex = cartItems.findIndex((item) => item.product_id === productId);
      
      // Parse price (remove $ and convert to number)
      const priceNum = parseFloat(productData.price.replace('$', '')) || 0;
      const originalPriceNum = productData.originalPrice ? parseFloat(productData.originalPrice.replace('$', '')) || 0 : 0;
      const discountAmount = productData.discountPrice || 0;
      
      const newItem: LocalStorageCartItem = {
        product_id: productId,
        quantity: "1",
        size: "",
        color: "",
        productName: productData.title,
        price: originalPriceNum > 0 ? originalPriceNum : priceNum,
        discountPrice: discountAmount,
        finalPrice: priceNum,
        imageOne: productData.image,
      };

      if (existingItemIndex > -1) {
        // Update existing item quantity
        const currentQty = parseInt(cartItems[existingItemIndex].quantity) || 1;
        cartItems[existingItemIndex].quantity = (currentQty + 1).toString();
      } else {
        // Add new item
        cartItems.push(newItem);
      }

      localStorage.setItem("localCart", JSON.stringify(cartItems));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
      // Save to localStorage instead of making API call
      const saved = saveCartToLocalStorage(productId, productData);
      if (saved) {
        alert("Product saved to cart! Sign in to sync your cart.");
      } else {
        alert("Failed to save product to cart.");
      }
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-cart`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          Authorization: token,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: "1",
          size: "",
          color: "",
        }),
      });

      const data = await res.json();
      if (data.statusCode === 200) {
        alert("Product added to cart");
        console.log("Cart response:", data);
      } else {
        console.error("Cart add failed:", data);
        alert("Could not add product to cart.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while adding to cart.");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex gap-2 justify-center items-center self-stretch py-3 w-full bg-blue-600 shadow-lg rounded-[50px]"
    >
      <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/56b2d25e225a538a4b817ec0f11240e5f9303340?placeholderIfAbsent=true"
          alt="Cart icon"
          className="object-contain self-stretch my-auto w-5 aspect-square"
        />
      </div>
      <span className="self-stretch my-auto text-base font-medium tracking-normal leading-6 text-center text-white">
        Add to cart
      </span>
    </button>
  );
};

export default AddToCartButton;
