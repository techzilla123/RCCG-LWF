"use client";
import React, { useState } from "react";

const WishlistButton: React.FC = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="flex absolute top-3 right-3 z-0 flex-col items-end w-12">
      <button
        onClick={handleToggleWishlist}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="flex justify-center items-center p-4 w-12 h-12 bg-white rounded-full transition-all"
      >
        <img
          src={
            isWishlisted
              ? "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/6d4c88eb3b14ac9da2ed7a829f1e155f7dd127de?placeholderIfAbsent=true"
              : "/Vector(2).svg"
          }
          alt="Heart icon"
          className="object-contain w-10 h-10 transform scale-150"
        />
      </button>
    </div>
  );
};

export default WishlistButton;
