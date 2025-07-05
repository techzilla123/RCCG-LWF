"use client";
import React, { useState } from "react";

interface ProductData {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  discountPrice?: number;
  image: string;
}

interface WishlistButtonProps {
  productId: string;
  productData: ProductData;
}

// Interface for localStorage wishlist items
interface LocalStorageWishlistItem {
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

const WishlistButton: React.FC<WishlistButtonProps> = ({ productId, productData }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Helper function to save wishlist items to localStorage
  const saveWishlistToLocalStorage = (productId: string, productData: ProductData) => {
    try {
      const existingWishlist = localStorage.getItem("localWishlist");
      const wishlistItems: LocalStorageWishlistItem[] = existingWishlist ? JSON.parse(existingWishlist) : [];
      
      // Check if item already exists
      const existingItemIndex = wishlistItems.findIndex((item) => item.product_id === productId);
      
      if (existingItemIndex > -1) {
        // Item already in wishlist
        return false;
      }

      // Parse price (remove $ and convert to number)
      const priceNum = parseFloat(productData.price.replace('$', '')) || 0;
      const originalPriceNum = productData.originalPrice ? parseFloat(productData.originalPrice.replace('$', '')) || 0 : 0;
      const discountAmount = productData.discountPrice || 0;

      const newItem: LocalStorageWishlistItem = {
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

      wishlistItems.push(newItem);
      localStorage.setItem("localWishlist", JSON.stringify(wishlistItems));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  };

  const handleToggleWishlist = async () => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
      // Save to localStorage instead of making API call
      const saved = saveWishlistToLocalStorage(productId, productData);
      if (saved) {
        setIsWishlisted(true);
        alert("Product saved to wishlist! Sign in to sync your wishlist.");
      } else {
        alert("Product is already in your wishlist!");
      }
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-wish-list`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          Authorization: token,
        },
        body: JSON.stringify({
          product_id: productId,
        }),
      });

      const data = await res.json();
      if (data.statusCode === 200) {
        setIsWishlisted(true);
        alert("Product added to wishlist.");
        console.log("Wishlist response:", data);
      } else {
        console.error("Wishlist add failed:", data);
        alert("Could not add product to wishlist.");
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      alert("Something went wrong while adding to wishlist.");
    }
  };

  return (
    <div className="flex absolute top-3 right-3 z-0 flex-col items-end w-12">
      <button
        onClick={handleToggleWishlist}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="flex justify-center items-center p-4 w-12 h-12 bg-white rounded-full transition-all"
      >
        <img
          src={
            isWishlisted
              ? "/Vector(2).svg"
              : "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/6d4c88eb3b14ac9da2ed7a829f1e155f7dd127de?placeholderIfAbsent=true"
          }
          alt="Heart icon"
          className="object-contain w-10 h-10 transform scale-150"
        />
      </button>
    </div>
  );
};

export default WishlistButton;
