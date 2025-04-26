"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Add this
import { ChevronDown } from "lucide-react";
import Categorys from "@/components/Categorys";

export const NavigationLinks = () => {
  const [showCategories, setShowCategories] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter(); // ✅ initialize router

  const toggleDropdown = () => setShowCategories((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Map each link to its path
  const links = [
    { label: "On sales", path: "/shop" },
    { label: "Rentals", path: "/rentals" },
    { label: "Balloon Decors", path: "/shop/decorations" },
  ];

  return (
    <nav className="relative z-50 flex gap-4 items-center">
      {/* Shop button with dropdown toggle */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 text-black text-base h-10 px-4 rounded-full hover:bg-gray-100 transition"
        >
          Shop
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* Dropdown menu */}
        {showCategories && (
          <div
            className="fixed left-0 top-[10px] mt-2 w-screen bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden"
            ref={dropdownRef}
          >
            <Categorys />
          </div>
        )}
      </div>

      {/* Other navigation buttons */}
      {links.map((link) => (
        <button
          key={link.label}
          onClick={() => router.push(link.path)} // ✅ navigate on click
          className="text-black text-base h-10 px-4 rounded-full hover:bg-gray-100 transition"
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
};
