"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard, { ProductCardProps } from "./Similar/ProductCard";
import NavigationButton from "./Similar/NavigationButton";
import { ProductGrid } from "./Similar/MobileShop/ProductGrid";

type Product = {
  productId: string;
  imageOne: string;
  productName: string;
  price: number;
};

const SimilarProducts: React.FC = () => {
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const productId = searchParams.keys().next().value || "";

 const [products, setProducts] = useState<ProductCardProps[]>([]);

useEffect(() => {
  const fetchSimilarProducts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
      };

      if (token) headers["Authorization"] = token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/fetch-product/${productId}`,
        { method: "GET", headers }
      );
      const json = await res.json();

      if (json.statusCode === 200 && Array.isArray(json.data?.similarProducts)) {
        const formatted: ProductCardProps[] = json.data.similarProducts.map((product: Product) => ({
          id: product.productId,
          image: product.imageOne,
          rating: 4.7,
          reviews: 400,
          title: product.productName,
          price: `$${product.price}`,
        }));
        setProducts(formatted);
      }
    } catch (error) {
      console.error("Failed to fetch similar products:", error);
    }
  };

  if (productId) {
    fetchSimilarProducts();
  }
}, [productId]);


  const scroll = (direction: "left" | "right") => {
    const scrollAmount = 300;
    const scrollTarget =
      window.innerWidth < 768 ? mobileScrollRef.current : desktopScrollRef.current;

    if (scrollTarget) {
      const { scrollLeft } = scrollTarget;
      scrollTarget.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!products.length) return null;

  return (
    <section className="flex flex-col px-8 py-10 bg-stone-50 max-md:px-4">
      {/* Header */}
      <header className="flex items-center justify-between w-full flex-wrap gap-6">
        <h2 className="text-2xl font-semibold text-black">Similar products</h2>
        <div className="flex gap-3">
          <NavigationButton
            direction="left"
            imageSrc="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/184ae31cf729fa37edeab2707659f7acd95fa2cf?placeholderIfAbsent=true"
            onClick={() => scroll("left")}
          />
          <NavigationButton
            direction="right"
            imageSrc="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/2fec114adbde4847dbbfb3f0e3b0bcdca6b4479e?placeholderIfAbsent=true"
            onClick={() => scroll("right")}
          />
        </div>
      </header>

      {/* Product List (Desktop) */}
      <div
        ref={desktopScrollRef}
        className="hidden md:flex gap-6 overflow-x-auto mt-8 pb-4 hide-scrollbar scroll-smooth"
      >
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Mobile ProductGrid */}
      <div className="block md:hidden mt-6 w-full">
        <ProductGrid scrollRef={mobileScrollRef} />
      </div>

      {/* See More Button */}
      <div className="flex justify-center mt-10">
        <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all">
          <span className="text-base font-medium text-black">See more</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/f395c476b09a1375b483c48e4e81c09fc7afa605?placeholderIfAbsent=true"
            alt="See more"
            className="w-5 h-5 object-contain"
          />
        </button>
      </div>
    </section>
  );
};

export default SimilarProducts;
