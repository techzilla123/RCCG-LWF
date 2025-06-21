"use client";

import * as React from "react";

interface MenuButtonProps {
  icon: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void; // Add this line
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  icon,
  label,
  isActive = false,
  onClick, // And this line
}) => {
  return (
    <button
      onClick={onClick} // Enable clicking
      className={`flex overflow-hidden gap-2 items-center pr-4 pl-2 w-full rounded-lg min-h-10 ${
        isActive ? "bg-gray-200" : "shadow-sm bg-black bg-opacity-0"
      }`}
    >
      <span className="flex gap-2.5 justify-center items-center self-stretch px-1 my-auto w-6 h-6 bg-white rounded-[50px]">
        <img
          src={icon}
          className="object-contain self-stretch my-auto w-4 aspect-square"
          alt=""
        />
      </span>
      <span className="self-stretch my-auto text-sm tracking-normal leading-6 text-black">
        {label}
      </span>
    </button>
  );
};
