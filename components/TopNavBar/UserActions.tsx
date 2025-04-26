"use client"
import React from "react";
import { Heart } from "lucide-react";
import { CartDropdown } from "./CartDropdown";
import { NotificationBadge } from "./NotificationBadge";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export const UserActions = () => {
  const router = useRouter();

  // Navigate to /waitlist
  const handleGoToWaitlist = () => {
    router.push("/wishlist");
  };

  // Navigate to /cart
  const handleGoToCart = () => {
    router.push("/cart");
  };

  return (
    <div className="flex gap-3 items-center">
      {/* Heart Icon for Waitlist */}
      <div className="relative w-10 h-10 flex items-center justify-center cursor-pointer" onClick={handleGoToWaitlist}>
        <Heart className="w-5 h-5 text-black" />
        <NotificationBadge count={1} />
      </div>

      {/* Cart Icon - Dropdown */}
      <div className="cursor-pointer" onClick={handleGoToCart}>
        <CartDropdown />
      </div>

      {/* User Avatar */}
      <div className="w-7 h-7">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/fb060f5627cc820a40e94ae5d1986afb624c42ee?placeholderIfAbsent=true"
          alt="User"
          className="w-full h-full object-contain rounded-full"
        />
      </div>
    </div>
  );
};
