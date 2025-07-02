"use client";

import React from "react";

interface NavigationButtonProps {
  direction: "left" | "right";
  imageSrc: string;
  onClick: () => void; // <-- ADD this
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  imageSrc,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center w-12 h-12 bg-white rounded-full shadow-md hover:bg-gray-100 active:scale-95 transition-transform"
      aria-label={`Navigate ${direction}`}
    >
      <img
        src={imageSrc}
        alt={`${direction} arrow`}
        className="w-6 h-6 object-contain"
      />
    </button>
  );
};

export default NavigationButton;
