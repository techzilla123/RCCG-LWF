"use client";

import React, { useEffect, useState, useRef } from "react";
import Actions from "./Dropdown/Actions";
import { Copy } from "lucide-react";
import { useRouter } from "next/navigation"; // optional for navigation

type Order = {
  id: number;
  orderId: string;
  orderDate: string;
  deliveryDate: string | null;
  amount: string;
  noOfItem: number;
  orderStatus: string;
};

const statusColors: Record<string, string> = {
  successful: "bg-green-500",
  pending: "bg-orange-400",
  returned: "bg-stone-400",
  rejected: "bg-red-700",
};

const Table: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">("down");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token || "",
      };

      try {
        const res = await fetch(`${baseUrl}admin/order-list`, { headers });
        const json = await res.json();
        if (json.statusCode === 200 && Array.isArray(json.data)) {
          setOrders(json.data.slice(0, 5));
        } else {
          console.error("Unexpected data", json);
        }
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };

    fetchOrders();
  }, []);

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

  const toggleDropdown = (i: number) => {
    if (openDropdownIndex === i) {
      setOpenDropdownIndex(null);
      return;
    }
    const rect = dropdownRefs.current[i]?.getBoundingClientRect();
    const spaceBelow = window.innerHeight - (rect?.bottom || 0);
    setDropdownDirection(spaceBelow < 100 ? "up" : "down");
    setOpenDropdownIndex(i);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(text);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="mt-6 relative">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left font-medium">
          <tr>
            <th className="p-3">Order Id</th>
            <th className="p-3">Customers</th>
            <th className="p-3">Date initiated</th>
            <th className="p-3">Date delivered</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Cart items</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={order.id} className="border-b">
              <td className="p-3">
                <div className="flex items-center gap-2 relative">
                  <a href="#" className="text-blue-600 underline hover:text-blue-800">
                    {order.orderId}
                  </a>
                  <button
                    onClick={() => handleCopy(order.orderId)}
                    className="text-gray-500 hover:text-gray-800"
                    title="Copy ID"
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
              <td className="p-3">
                <div className="flex items-center gap-2 relative">
                  <span className="text-gray-700">—</span> {/* Placeholder */}
                </div>
              </td>
              <td className="p-3">{new Date(order.orderDate).toLocaleDateString()}</td>
              <td className="p-3">
                {order.deliveryDate
                  ? new Date(order.deliveryDate).toLocaleDateString()
                  : "-"}
              </td>
              <td className="p-3">${Number(order.amount).toLocaleString()}</td>
              <td className="p-6">{order.noOfItem}</td>
              <td className="p-3 flex items-center justify-between w-full">
                <div className="flex items-center gap-2 pt-3">
                  <span
                    className={`w-2 h-2 rounded-full ${statusColors[order.orderStatus] || "bg-gray-400"}`}
                  ></span>
                  {order.orderStatus}
                </div>

                <div
                  className="relative"
                  ref={(el) => (dropdownRefs.current[idx] = el)}
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
    <Actions direction={dropdownDirection} order={{ id: order.id, orderId: order.orderId }} />
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
