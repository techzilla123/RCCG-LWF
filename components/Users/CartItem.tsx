"use client";
import React, { useEffect, useState } from "react";
import { ProductHeader } from "./Cart/ProductHeader";
import { ProductItem } from "./Cart/ProductItem";
import { CouponSection } from "./Cart/CouponSection";
import { OrderSummary } from "./Cart/OrderSummary";
import { ProductItemType } from "./Cart/types";

export interface ApiCartItem {
  productId: string;
  quantity: number;
  size: string;
  color: string;
  productDetails: {
    productId: string;
    categoryName: string;
    subCategoryName: string;
    productName: string;
    price: string;
    discountPrice: string;
    quantity: string;
    imageOne: string;
  };
}


export default function CartItem() {
  const [products, setProducts] = useState<ProductItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        ...(token ? { Authorization: token } : {}),
      };

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/cart-list`;

      const res = await fetch(url, {
        method: "GET",
        headers,
      });

      const result = await res.json();

      if (res.ok && result.statusCode === 200) {
     const transformed: ProductItemType[] = result.data.map((item: ApiCartItem) => {
  const details = item.productDetails;
  const price = Number(details.price);
  const discountPrice = Number(details.discountPrice);
  const hasDiscount = discountPrice > 0;

  return {
    id: item.productId,
    name: details.productName,
    image: details.imageOne,
    quantity: item.quantity,
    color: item.color || "",
    size: item.size || "",
    price: price - discountPrice,
    discount: hasDiscount
      ? {
          percentage: Math.round((discountPrice / price) * 100),
          originalPrice: price,
        }
      : undefined,
    categoryName: details.categoryName,
    subCategoryName: details.subCategoryName,
    rawPrice: price,
    rawDiscountPrice: discountPrice,
  };
});



        setProducts(transformed);
      } else {
        console.error("Failed to load cart items", result.message);
      }
    } catch (error) {
      console.error("Error loading cart items", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product,
      ),
    );
  };

  const totalItems = products.reduce(
    (sum, product) => sum + product.quantity,
    0,
  );

  const itemTotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  const summaryItems = [
    { label: "Item(s) total", amount: `$${itemTotal.toFixed(2)}`, bold: true },
    { label: "Coupon discount", amount: "-$0.00", bold: true }, // Update if you apply real coupons
    { label: "Sub total", amount: `$${itemTotal.toFixed(2)}`, bold: true },
    { label: "Taxes", amount: "$5.00", bold: true },
  ];

  const orderDetails = products.map((product) => ({
  amount: (product.price * product.quantity).toFixed(2),
  quantity: product.quantity.toString(),
  product_id: product.id,
  product_name: product.name,
  size: product.size,
  color: product.color,
}));

  return (
    <main className="flex flex-wrap gap-6 px-8 py-10 max-md:px-5">
      <section className="flex flex-col flex-1 shrink justify-center self-start basis-12 min-w-60 max-md:max-w-full">
        <ProductHeader />

        {isLoading ? (
          <p>Loading cart items...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onQuantityChange={handleQuantityChange}
            />
          ))
        ) : (
          <p>No products in cart.</p>
        )}

        <CouponSection />
      </section>

      <OrderSummary
  items={summaryItems}
  totalItems={totalItems}
  total={`$${(itemTotal + 5).toFixed(2)}`}
  orders={orderDetails}
/>

    </main>
  );
}
