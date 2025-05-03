"use client";
import * as React from "react";

interface IconButtonProps {
  icon: string;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  className = "",
}) => {
  return (
    <button
      className={`flex items-center justify-center w-10 h-10 p-2 rounded-lg hover:bg-gray-100 transition ${className}`}
    >
      <img src={icon} alt="icon" className="w-5 h-5 object-contain" />
    </button>
  );
};
