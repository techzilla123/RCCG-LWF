"use client"; // ← add this as the very first line

import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
=======
import { useRouter } from "next/navigation"; // ✅ CORRECT for App Router
>>>>>>> 3fb9c63ca731fd536dfd6a37fbacb746b7000412
import axios from "axios";

type Order = {
  id: number;
  orderId: string;
  orderStatus: string;
  amount: string;
<<<<<<< HEAD
  orderDate: string;
=======
>>>>>>> 3fb9c63ca731fd536dfd6a37fbacb746b7000412
};

export const RecentOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
<<<<<<< HEAD
  const router = useRouter();
=======
 const router = useRouter();
>>>>>>> 3fb9c63ca731fd536dfd6a37fbacb746b7000412

  useEffect(() => {
    const fetchRecentOrders = async () => {
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token || "",
      };

      try {
        const response = await axios.get(`${baseUrl}admin/order-list`, {
          headers,
        });

<<<<<<< HEAD
        if (
          response.status === 200 &&
          Array.isArray(response.data.data.orders)
        ) {
          const allOrders = response.data.data.orders;

          // Optional: sort by orderDate descending
          allOrders.sort(
            (a: Order, b: Order) =>
              new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          );

          const topFiveOrders = allOrders.slice(0, 5);
=======
        if (response.status === 200 && Array.isArray(response.data.data)) {
          const topFiveOrders = response.data.data.slice(0, 5);
>>>>>>> 3fb9c63ca731fd536dfd6a37fbacb746b7000412
          setOrders(topFiveOrders);
        }
      } catch (error) {
        console.error("Failed to fetch recent orders:", error);
      }
    };

    fetchRecentOrders();
  }, []);

  return (
    <section className="flex flex-col p-4 mt-6 w-full bg-white rounded-xl border border-gray-200 shadow-sm">
      <header className="flex gap-2 items-center pb-4">
        <h3 className="flex-1 text-base font-semibold leading-5 text-black">
          Recent Orders
        </h3>
      </header>

      <div className="flex items-center pb-2">
        <div className="flex-1">
          <div className="p-2 text-sm text-black rounded-lg bg-stone-50">
            Order ID
          </div>
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex p-2 mt-2 h-14 border-b border-[#EAEAEA]"
            >
              <div className="flex flex-col justify-center">
                <a href="#" className="text-blue-600 underline">
                  {order.orderId}
                </a>
                <p className="text-neutral-500 capitalize">
                  Status: {order.orderStatus}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[100px]">
          <div className="relative p-2 bg-stone-50">
            <span className="text-sm leading-6 text-black">Amount</span>
          </div>
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex p-2 mt-2 h-14 text-right border-b border-[#EAEAEA]"
            >
              <p className="text-base text-black">${order.amount}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push("/admin-orders")}
        className="self-center pt-4 pb-1 text-sm font-medium text-black hover:text-blue-700"
      >
        See more
      </button>
    </section>
  );
};
