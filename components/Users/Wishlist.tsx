"use client";

import React, { useEffect, useState } from "react";
import { FiltersDefault } from "./Wish/FiltersDefault";
import { ProductCard } from "./Wish/ProductCard";
import { Pagination } from "./Wish/Pagination";
import { ProductGrid } from "./Shop/MobileShop/ProductGrid";

// Define types
interface ProductDetails {
  productId: string;
  productName: string;
  imageOne: string;
  discountPrice: number;
}

interface WishlistItem {
  productDetails: ProductDetails;
}

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const headers = {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          ...(token ? { Authorization: token } : {}),
        };

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/wish-list`;

        const res = await fetch(url, {
          method: "GET",
          headers,
        });

        const result = await res.json();

        if (res.ok && result.statusCode === 200) {
          setWishlistItems(result.data || []);
        } else {
          throw new Error(result.message || "Failed to fetch wishlist");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <main
      className="flex flex-wrap gap-6 px-8 py-6 max-md:px-5"
      style={{ background: "#FFFFFF" }}
    >
      <div className="self-start">
        <FiltersDefault />
      </div>

      <section className="flex flex-col flex-1 shrink justify-center self-start basis-8 min-w-60 max-md:max-w-full">
        {loading ? (
          <p className="text-center w-full">Loading wishlist...</p>
        ) : error ? (
          <p className="text-red-500 text-center w-full">{error}</p>
        ) : wishlistItems.length === 0 ? (
          <p className="text-center w-full">Your wishlist is empty.</p>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:flex flex-wrap gap-6 items-start w-full max-md:max-w-full">
              {wishlistItems.map((item, index) => {
                const product = item.productDetails;
                return (
                  <ProductCard
  key={product.productId || index}
  productId={product.productId} // <- Pass it here
  image={product.imageOne}
  title={product.productName}
  rating={4.7}
  reviews={400}
  price={`$${product.discountPrice}`}
  starIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true"
  cartIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/8cb390dce5451e2e781d761e03e8beb8ba033458?placeholderIfAbsent=true"
  favoriteIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/659be93a7c406efa8073a635c7fb839f349ddff8?placeholderIfAbsent=true"
/>

                );
              })}
            </div>

            {/* Mobile View */}
            <div className="block md:hidden w-full">
              <ProductGrid />
            </div>

            <Pagination />
          </>
        )}
      </section>
    </main>
  );
}
