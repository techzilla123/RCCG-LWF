"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        const response = await axios.get(`${baseUrl}admin/products/list-product`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            Authorization: token || "",
          },
        });

        if (
          response.status === 200 &&
          response.data?.data?.product &&
          Array.isArray(response.data.data.product)
        ) {
          const formatted = response.data.data.product.slice(0, 5).map((item) => ({
            name: item.productName?.slice(0, 30),
            shop: item.categoryName,
            sales: `$${Number(String(item.price).replace(/,/g, "")).toLocaleString()}`,

          }));

          setProducts(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch top products:", error);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <section className="flex flex-col p-4 w-full bg-white rounded-xl border border-gray-200 shadow-sm ">
      <header className="flex gap-2 items-center pb-4">
        <h3 className="flex-1 text-base font-semibold leading-5 text-black">
          Top Products
        </h3>
        <button className="flex items-center gap-2 h-8 px-2 rounded-lg hover:bg-gray-100">
          <span className="text-sm leading-6 text-black">On sales</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/82c8f9d069e7aa215abfaeb6a6822903eb0491ec?placeholderIfAbsent=true"
            alt=""
            className="w-4 h-4"
          />
        </button>
      </header>

      <div className="flex items-center pb-2">
        <div className="flex-1">
          <div className="py-2 px-4 text-sm text-black bg-stone-50">Products</div>
          {products.map((product, index) => (
            <div
              key={index}
              className="flex p-2 mt-2 h-14 border-b border-[#EAEAEA]"
            >
              <div className="flex flex-col justify-center">
                <p className="text-base text-black">{product.name}</p>
                <p className="text-sm text-neutral-500">{product.shop}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[100px]">
          <div className="relative p-2 bg-stone-50">
            <span className="text-sm leading-6 text-black">Amount</span>
          </div>
          {products.map((product, index) => (
            <div
              key={index}
              className="flex p-2 mt-2 h-14 text-right border-b border-[#EAEAEA]"
            >
              <p className="text-base text-black">{product.sales}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push("/admin-products")}
        className="self-center pt-4 pb-1 text-sm font-medium text-black hover:text-gray-700"
      >
        See more
      </button>
    </section>
  );
};
