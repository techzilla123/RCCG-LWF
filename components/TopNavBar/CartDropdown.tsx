"use client";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { NotificationBadge } from "./NotificationBadge";

export const CartDropdown = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button className="relative w-10 h-10 flex items-center justify-center">
        <ShoppingCart className="w-5 h-5 text-black" />
        <NotificationBadge count={3} />
      </button>

      {hovered && (
  <div className="absolute left-1/2 top-full z-50 mt-2 flex flex-col items-center -translate-x-1/2">
    {/* Pointer */}
    <div className="w-4 h-4 bg-black rotate-45 -translate-y-1/2" />

    {/* Dropdown box */}
    <div className="bg-black w-[101px] h-[54px] rounded-lg flex flex-col items-center justify-center text-white px-2 -mt-4">
      <div className="text-[15px]">
        Total: <span className="font-bold">$700</span>
      </div>
      <button className="mt-0.5 text-blue-400 underline text-[15px] hover:text-blue-300 transition">
        View cart
      </button>
    </div>
  </div>
)}


    </div>
  );
};
