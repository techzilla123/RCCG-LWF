"use client";
import React, { useState, useRef, useEffect } from "react";
import Actions from "./Dropdown/Actions";


const users = [
  {
    name: "Cynthia Morgan",
    email: "cynthiamorgan@gmail.com",
    location: "USA",
    date: "03-04-2025",
    orders: 20,
    status: "Unverified",
    image: "/16c4794e-7a23-43f1-b674-4e9c3aa38270.jpg",
  },
  {
    name: "Mateo Silva",
    email: "mateosilva@gmail.com",
    location: "Mexico",
    date: "03-04-2025",
    orders: 20,
    status: "Verified",
    image: "/16c4794e-7a23-43f1-b674-4e9c3aa38270.jpg",
  },
  {
    name: "John Carlson",
    email: "johncarlson@gmail.com",
    location: "USA",
    date: "03-04-2025",
    orders: 20,
    status: "Verified",
    image: "/16c4794e-7a23-43f1-b674-4e9c3aa38270.jpg",
  },
  {
    name: "Fatoumata Diallo",
    email: "fatoumatadiallo@email.com",
    location: "Ghana",
    date: "03-04-2025",
    orders: 20,
    status: "Unverified",
    image: "/16c4794e-7a23-43f1-b674-4e9c3aa38270.jpg",
  },
  {
    name: "Hiroshi Tana",
    email: "hiroshitana@email.com",
    location: "Taiwan",
    date: "03-04-2025",
    orders: 20,
    status: "Verified",
    image: "/16c4794e-7a23-43f1-b674-4e9c3aa38270.jpg",
  },
];

const statusColors: Record<string, string> = {
  Verified: "bg-green",
  Unverified: "bg-orange-400",
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

  return (
    <div className="mt-6 relative">

      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left font-medium">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Location</th>
            <th className="p-3">Date joined</th>
            <th className="p-3">Orders</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-3 flex items-center gap-3">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </td>
              <td className="p-3">{user.location}</td>
              <td className="p-3">{user.date}</td>
              <td className="p-3">{user.orders}</td>
              <td className="p-3 flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${statusColors[user.status]}`}
                  ></span>
                  {user.status}
                </div>
                <div
                  className="relative"
                  ref={(el) => (dropdownRefs.current[idx] = el)}
                >
                  <div
                    className="flex items-center gap-1 cursor-pointer"
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
