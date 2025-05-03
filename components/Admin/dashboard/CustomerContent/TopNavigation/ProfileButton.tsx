"use client";
import * as React from "react";

export const ProfileButton: React.FC = () => {
  return (
    <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
      <img
        src="/16c4794e-7a23-43f1-b674-4e9c3aa38270.jpg"
        alt="Profile"
        className="w-7 h-7 rounded-full object-cover"
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/82c8f9d069e7aa215abfaeb6a6822903eb0491ec?placeholderIfAbsent=true"
        alt="Dropdown arrow"
        className="w-4 h-4 object-contain"
      />
    </button>
  );
};
