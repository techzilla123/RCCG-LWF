"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Copy } from "lucide-react";
import Actions from "./Dropdown/Actions";

type Order = {
  id: number;
  orderId: string;
  orderDate: string;
  deliveryDate: string | null;
  orderStatus: string;
  amount: string;
  noOfItem: number;
  productName: string;
  customerName: string;
};

const statusColors: Record<string, string> = {
  Successful: "bg-green",
  Pending: "bg-orange-400",
  Returned: "bg-stone-400",
  Rejected: "bg-red-700",
  pending: "bg-yellow-500",
};

const Table = ({ currentPage, itemsPerPage }: { currentPage: number; itemsPerPage: number }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">("down");
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");

  useEffect(() => {
    const fetchCustomerOrders = async () => {
      if (!customerId) return;

      try {
        const token = localStorage.getItem("accessToken") || "";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/fetch-customer/${customerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
              ...(token && { Authorization: token }),
            },
          }
        );

        const data = await response.json();
        if (data.statusCode === 200) {
          setOrders(data.data.orderList);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchCustomerOrders();
  }, [customerId]);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleDropdown = (index: number) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null);
      return;
    }
    const rect = dropdownRefs.current[index]?.getBoundingClientRect();
    const spaceBelow = window.innerHeight - (rect?.bottom || 0);
    setDropdownDirection(spaceBelow < 100 ? "up" : "down");
    setOpenDropdownIndex(index);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openDropdownIndex !== null &&
        dropdownRefs.current[openDropdownIndex] &&
        !dropdownRefs.current[openDropdownIndex]?.contains(e.target as Node)
      ) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownIndex]);

  // ✅ Pagination slicing
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="mt-6 relative overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 font-medium">
          <tr>
            <th className="p-3">Order ID</th>
            <th className="p-3">Product</th>
            <th className="p-3">Order Date</th>
            <th className="p-3">Delivery Date</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Items</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order, idx) => (
            <tr key={order.id} className="border-b">
              <td className="p-3">
                <div className="flex items-center gap-2 relative">
                  <span className="text-blue-600 underline hover:text-blue-800">
                    {order.orderId}
                  </span>
                  <button
                    onClick={() => handleCopy(order.orderId)}
                    className="text-gray-500 hover:text-gray-800"
                    title="Copy Order ID"
                  >
                    <Copy size={16} />
                  </button>
                  {copiedId === order.orderId && (
                    <span className="absolute top-full mt-1 text-xs text-green-600 bg-white px-1 rounded shadow">
                      Copied!
                    </span>
                  )}
                </div>
              </td>
              <td className="p-3">{order.productName}</td>
              <td className="p-3">{order.orderDate}</td>
              <td className="p-3">{order.deliveryDate || "Not delivered"}</td>
              <td className="p-3">${order.amount}</td>
              <td className="p-3">{order.noOfItem}</td>
              <td className="p-3 flex items-center justify-between w-full">
                <div className="flex items-center gap-2 pt-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      statusColors[order.orderStatus] || "bg-gray-300"
                    }`}
                  ></span>
                  {order.orderStatus}
                </div>
                <div
                  className="relative"
                  ref={((el: HTMLDivElement | null) => {
                    dropdownRefs.current[idx] = el;
                  }) as React.Ref<HTMLDivElement>}
                >
                  <div
                    className="flex items-center gap-1 cursor-pointer pt-3"
                    onClick={() => toggleDropdown(idx)}
                  >
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  </div>

                  {openDropdownIndex === idx && (
                    <div className="absolute right-0 z-50">
                      <Actions direction={dropdownDirection} />
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
