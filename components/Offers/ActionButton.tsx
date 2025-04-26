"use client";

import * as React from "react";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ children, onClick }) => {
  return (
    <button
    onClick={onClick}
    className="w-[180px] h-[64px] px-8 py-4 bg-black text-white rounded-[50px] text-xl tracking-normal leading-8 hover:bg-gray-900 transition-colors duration-200"
  >
      {children}
    </button>
  );
};

export default ActionButton;
