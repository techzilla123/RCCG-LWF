"use client";

import React, { useEffect, useState } from 'react';
import { ProductCardM } from './ProductCard';
import { Product } from './types';

export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token ? { Authorization: token } : {}),
          },
        });

        const json = await res.json();
        if (json.statusCode === 200 && Array.isArray(json.data.product)) {
          const formatted = json.data.product.map((p: any) => ({
            id: p.productId,
            image: p.imageOne,
            title: p.productName,
            price: p.price,
            isOutOfStock: p.quantity === 0,
            isWishlisted: false,
          }));
          setProducts(formatted);
        } else {
          console.error("Invalid data format");
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
      {products.map((product) => (
        <React.Fragment key={product.id}>
          <ProductCardM product={product} />
        </React.Fragment>
      ))}
    </section>
  );
};
