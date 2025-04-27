"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Categorys from "@/components/Categorys";

export const NavigationLinks = () => {
  const [showCategories, setShowCategories] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const toggleDropdown = () => setShowCategories((prev) => !prev);

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

  const links = [
    { label: "On sales", path: "/shop" },
    { label: "Rentals", path: "/rentals" },
    { label: "Balloon Decors", path: "/shop/decorations" },
  ];

  return (
    <nav className="relative z-50 flex flex-col w-full">
      {/* Top navigation links */}
      <div className="flex gap-4 items-center w-full">
        {/* Shop button with dropdown toggle */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-1 text-black text-base h-10 px-4 rounded-full hover:bg-gray-100 transition"
          >
            Shop
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Other navigation buttons */}
        {links.map((link) => (
          <button
            key={link.label}
            onClick={() => router.push(link.path)}
            className="text-black text-base h-10 px-4 rounded-full hover:bg-gray-100 transition"
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Dropdown under Shop */}
      {showCategories && (
  <div className="absolute left-0 top-full mt-2 w-[calc(100vw-12px)] overflow-x-hidden -ml-[163px] bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
    <Categorys />
  </div>
)}




    </nav>
  );
};
