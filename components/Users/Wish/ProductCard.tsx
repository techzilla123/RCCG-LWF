"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductRating } from "./ProductRating";
import { ProductActions } from "./ProductActions";
import { FavoriteButton } from "./FavoriteButton";
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: ['500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
});

interface ProductCardProps {
  productId: string;
  image: string;
  title: string;
  rating: number;
  reviews: number;
  price: string;
  starIcon: string;
  cartIcon: string;
  favoriteIcon: string;
  isAdded?: boolean;
  isOutOfStock?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  image,
  title,
  rating,
  reviews,
  price,
  starIcon,
  cartIcon,
  favoriteIcon,
  isAdded = false,
  isOutOfStock = false,
}) => {
  const router = useRouter();
  const [added, setAdded] = useState(isAdded);
  const [adding, setAdding] = useState(false);

  const handleProductClick = () => {
    router.push(`/preview?${productId}`);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("You must be logged in to add to cart.");
      return;
    }

    try {
      setAdding(true);

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-cart`;

      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      };

      const body = JSON.stringify({
        product_id: productId,
        quantity: "1",
        size: "", // Update if needed
        color: "", // Update if needed
      });

      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      const result = await response.json();

      if (!response.ok || result.statusCode !== 200) {
        throw new Error(result.message || "Failed to add to cart");
      }

      setAdded(true);
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Could not add to cart.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <article className="overflow-hidden relative flex-1 shrink bg-white rounded-2xl basis-0 max-w-[360px] min-h-[440px] min-w-[280px]">
      <img
        src={image}
        alt={title}
        className="cursor-pointer object-contain z-0 w-full aspect-[1.19]"
        onClick={handleProductClick}
      />
      <div className="z-0 flex-1 px-4 pt-4 pb-6 w-full">
        <div className="flex flex-col flex-1 w-full">
          <ProductRating
            rating={rating}
            reviews={reviews}
            starIcon={starIcon}
          />
          <h3
            className={`${inter.variable} font-[var(--font-inter)] font-semibold text-xl tracking-normal leading-[26px] text-black mt-2 mb-2`}
          >
            {title}
          </h3>
        </div>
        <ProductActions
          price={price}
          isAdded={added}
          isDisabled={isOutOfStock || adding}
          cartIcon={cartIcon}
          onClick={handleAddToCart}
        />
      </div>
      <FavoriteButton icon={favoriteIcon} />
      {isOutOfStock && (
        <div className="absolute top-0 left-0 bg-[#F03] text-white text-[14px] font-medium px-2.5 py-1 rounded-tl-[6px] rounded-br-[6px] z-10">
          Out of stock
        </div>
      )}
    </article>
  );
};
