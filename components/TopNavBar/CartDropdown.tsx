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
        <div className="absolute right-0 z-50 mt-2 w-44 text-white">
          {/* Pointer */}
          <div className="absolute top-0 right-3 w-3 h-3 bg-black rotate-45 -translate-y-1/2 z-0" />
          {/* Dropdown box */}
          <div className="relative bg-black rounded-xl p-3 pt-4">
            <div className="text-base">
              Total: <span className="font-bold text-white">$700</span>
            </div>
            <button className="mt-1 text-blue-400 underline text-base hover:text-blue-300 transition">
              View cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
