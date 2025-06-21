"use client";
import React, { useState, useEffect } from "react";
import { ProductCardM } from "./ProductCard";
import { Product } from "./types";

interface APIProduct {
  productId: string;
  imageOne: string;
  productName: string;
  price: number;
  quantity: number;
}

export const ProductGrid: React.FC<{ scrollRef?: React.RefObject<HTMLDivElement> }> = ({ scrollRef }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token ? { Authorization: token } : {}),
          },
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        const { statusCode, data } = await res.json();
        if (statusCode !== 200 || !Array.isArray(data.product)) {
          throw new Error("Invalid response format");
        }

        setProducts(data.product.map((p: APIProduct) => ({
          id: p.productId,
          image: p.imageOne,
          title: p.productName,
          price: p.price,
          isOutOfStock: p.quantity === 0,
          isWishlisted: false,
        })));
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <section
      ref={scrollRef}
      className="
        w-full gap-4 no-scrollbar
        flex overflow-x-auto scroll-smooth px-2
        sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0
      "
    >
      {products.map(product => (
        <div key={product.id} className="flex-shrink-0 w-[153px] sm:w-auto">
          <ProductCardM product={product} />
        </div>
      ))}
    </section>
  );
};
