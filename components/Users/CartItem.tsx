"use client";
import React, { useState } from "react";
import { ProductHeader } from "./Cart/ProductHeader";
import { ProductItem } from "./Cart/ProductItem";
import { CouponSection } from "./Cart/CouponSection";
import { OrderSummary } from "./Cart/OrderSummary";
import { ProductItemType } from "./Cart/types";

const initialProducts: ProductItemType[] = [
  {
    id: "1",
    name: "Transparent bubble balloon w...",
    price: 400,
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/f0496f2e44d541a59c9c6afa1b49515c1d329e16?placeholderIfAbsent=true",
    quantity: 1,
    color: "black",
    size: "lg",
  },
  {
    id: "2",
    name: "Sweet Treats Birthday Table Display...",
    price: 300,
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/0bec2b8bf1b782cc6a972ede00961991374184ca?placeholderIfAbsent=true",
    quantity: 3,
    color: "black",
    size: "lg",
    discount: {
      percentage: 50,
      originalPrice: 600,
    },
  },
  {
    id: "3",
    name: "Latex multiple colour balloons",
    price: 20,
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/84d35feaec0df38b429d2d293ed2950597858623?placeholderIfAbsent=true",
    quantity: 5,
    color: "black",
    size: "lg",
  },
];

const summaryItems = [
  { label: "Item(s) total", amount: "$800.00", bold: true },
  { label: "Coupon discount", amount: "-$200.00", bold: true },
  { label: "Sub total", amount: "$600.00", bold: true },
  { label: "Taxes", amount: "$5.00", bold: true },
];

export default function CartItem() {
  const [products, setProducts] = useState<ProductItemType[]>(initialProducts);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product,
      ),
    );
  };

  const totalItems = products.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  return (
    <main className="flex flex-wrap gap-6 px-8 py-10 max-md:px-5">
    <section className="flex flex-col flex-1 shrink justify-center self-start basis-12 min-w-60 max-md:max-w-full">
  
    
        <ProductHeader />
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onQuantityChange={handleQuantityChange}
            />
          ))}
  
      <CouponSection />
    </section>
    <OrderSummary
      items={summaryItems}
      totalItems={totalItems}
      total="$605.00"
    />
  </main>
  
  );
}
