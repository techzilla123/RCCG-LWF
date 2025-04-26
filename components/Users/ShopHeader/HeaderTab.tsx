"use client";

import * as React from "react";

interface HeaderTabProps {
  text: string;
  onClick?: () => void;
  active?: boolean;
}

export const HeaderTab: React.FC<HeaderTabProps> = ({ text, onClick, active }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 rounded-full transition-colors hover:bg-gray-100 text-black"
      role="tab"
    >
      <span
        className={`text-base font-medium ${
          active ? "border-b-2 border-black pb-1" : ""
        }`}
      >
        {text}
      </span>
    </button>
  );
};
