"use client";
import React, { useState, useRef, useEffect } from "react";
import Actions from "./Dropdown/Actions";
import { Copy } from 'lucide-react'; 

const users = [
  {
    id: 'ORD-9284FHT7',
    location: "03-04-2025",
    date: "03-04-2025",
    orders: "$200",
    cart: 20,
    status: "Pending",
    image: "/16c4794e-7a23-43f1-b674-4e9c3aa38270.jpg",
  },
  {
    id: 'HBD-58YVJ2K9',
    location: "03-04-2025",
    date: "03-04-2025",
    orders: "$200",
    cart: 20,
    status: "Successful",
    image: "/16c4794e-7a23-43f1-b674-4e9c3aa38270.jpg",
  },
  {
    id: 'PAS-9K3VJ2K0',
    location: "03-04-2025",
    date: "03-04-2025",
    orders: "$200",
    cart: 20,
    status: "Returned",
    image: "/16c4794e-7a23-43f1-b674-4e9c3aa38270.jpg",
  },
  {
    id: 'DEC-8492DK201',
    location: "03-04-2025",
    date: "03-04-2025",
    orders: "$200",
    cart: 20,
    status: "Rejected",
    image: "/16c4794e-7a23-43f1-b674-4e9c3aa38270.jpg",
  },
  {
    id: 'HOO-0KMSL9E0D',
    location: "03-04-2025",
    date: "03-04-2025",
    orders: "$200",
    cart: 20,
    
    status: "Successful",
    image: "/16c4794e-7a23-43f1-b674-4e9c3aa38270.jpg",
  },
];

const statusColors: Record<string, string> = {
  Successful: "bg-green",
  Pending: "bg-orange-400",
  Returned: "bg-stone-400",
  Rejected: "bg-red-700",

};

const Table = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">("down");

  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // ✅ Handle outside click
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

  const [copiedId, setCopiedId] = useState<string | null>(null);

const handleCopy = (id: string) => {
  navigator.clipboard.writeText(id);
  setCopiedId(id);
  setTimeout(() => setCopiedId(null), 2000); // hide after 2 seconds
};

  return (
    <div className="mt-6 relative">

      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left font-medium">
          <tr>
            <th className="p-3">Order Id</th>
            <th className="p-3">Date initiated</th>
            <th className="p-3">Date delivered</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Cart items</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx} className="border-b">
          <td className="p-3">
  <div className="flex items-center gap-2 relative">
    <a href="#" className="text-blue-600 underline hover:text-blue-800">
      {user.id}
    </a>
    <button
      onClick={() => handleCopy(user.id)}
      className="text-gray-500 hover:text-gray-800"
      title="Copy ID"
    >
      <Copy size={16} />
    </button>
    {copiedId === user.id && (
      <span className="absolute top-full mt-1 text-xs text-green-600 bg-white px-1 rounded shadow">
        Copied!
      </span>
    )}
  </div>
</td>


              <td className="p-3">{user.location}</td>
              <td className="p-3">{user.date}</td>
              <td className="p-3">{user.orders}</td>
              <td className="p-6">{user.cart  }</td>
              
              <td className="p-3 flex items-center justify-between w-full">
                <div className="flex items-center gap-2 pt-3">
                  <span
                    className={`w-2 h-2 rounded-full ${statusColors[user.status]}`}
                  ></span>
                  {user.status}
                </div>
                <div
                  className="relative"
                  ref={
                    ((el: HTMLDivElement | null) => {
                      dropdownRefs.current[idx] = el;
                    }) as React.Ref<HTMLDivElement>
                  }
                  
                  
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
