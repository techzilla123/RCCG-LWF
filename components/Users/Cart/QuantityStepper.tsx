"use client";
import React from "react";

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex items-center gap-2 w-fit rounded-full bg-white border border-gray-200 px-2 py-1">
      <button
        onClick={onDecrement}
        aria-label="Decrease quantity"
        className="w-6 h-6 flex items-center justify-center bg-stone-50 rounded-full hover:bg-stone-200 transition"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/9a9ae02de225b108e4eaa0e2f2bfc7bc8439b36f?placeholderIfAbsent=true"
          alt="Minus icon"
          className="w-3 h-3"
        />
      </button>

      <span
        className={`text-xs font-medium w-6 text-center ${
          quantity === 1 ? "text-stone-300" : "text-black"
        }`}
      >
        {quantity}
      </span>

      <button
        onClick={onIncrement}
        aria-label="Increase quantity"
        className="w-6 h-6 flex items-center justify-center bg-stone-50 rounded-full hover:bg-stone-200 transition"
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/3bc5c7d192816decb68dc65adaa585ec37f60786?placeholderIfAbsent=true"
          alt="Plus icon"
          className="w-3 h-3"
        />
      </button>
    </div>
  );
};
