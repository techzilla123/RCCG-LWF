// "use client"
import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import Actionsp from "../Dropdown/Actionsp";

export const ProfileCard: React.FC = () => {
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

  const index = 0; // Since there's only one card

  return (
    <article
      className="relative flex items-center gap-4 p-6 min-h-[180px] rounded-2xl border border-gray-200 bg-white min-w-60 max-md:px-4"
      ref={(el) => (dropdownRefs.current[index] = el)}
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/d29fe1bf9e21411c4bea0f62af4f6e5e65b0971b?placeholderIfAbsent=true"
        alt="Cynthia Morgan profile"
        className="w-[120px] aspect-[0.88] object-cover rounded-lg"
      />

      <div className="flex flex-col justify-center flex-1 text-sm text-black">
        <h3 className="text-xl font-bold leading-6 mb-2">Cynthia Morgan</h3>
        <p className="text-sm text-gray-800">cynthiamorgan@email.com</p>
        <p className="mt-2 text-base text-gray-500 mb-2">
          Joined: <span className="text-black">04-05-2025</span>
        </p>
        <p className="text-sm text-gray-500">USA, Los Angeles</p>
      </div>

      <button
        aria-label="More options"
        className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100"
        onClick={() => toggleDropdown(index)}
      >
        <MoreHorizontal className="w-5 h-5 text-gray-500" />
      </button>

      {openDropdownIndex === index && (
        <div className="absolute -mt-[140px] right-0 z-50">
          <Actionsp direction={dropdownDirection} />
        </div>
      )}
    </article>
  );
};
