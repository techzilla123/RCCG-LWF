"use client";

import * as React from "react";

interface ProductActionsProps {
  price: string;
  originalPrice?: string; // ✅ Added
  isAdded?: boolean;
  isDisabled?: boolean;
  cartIcon: string;
  onAddToCart?: () => void;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  price,
  originalPrice, // ✅ Destructure it here
  isAdded = false,
  isDisabled = false,
  cartIcon,
  onAddToCart,
}) => {
  const buttonStyles = isDisabled
    ? "bg-gray-200"
    : isAdded
    ? "bg-stone-50"
    : "bg-blue-600 shadow-lg";

  const textColor = isDisabled
    ? "text-stone-300"
    : isAdded
    ? "text-black"
    : "text-white";

  const handleClick = () => {
    if (!isDisabled && onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <div className="flex gap-4 items-center mt-2 w-full">
      <div className="flex flex-col">
        {/* ✅ Conditionally show original price if it exists */}
        {originalPrice && (
          <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
        )}
        <p className="text-base font-medium tracking-normal leading-6 text-black whitespace-nowrap">
          {price}
        </p>
      </div>

      <div className="flex flex-1 shrink gap-2 items-center basis-0">
        <button
          onClick={handleClick}
          disabled={isDisabled}
          className={`flex gap-2 justify-center items-center w-full rounded-[50px] py-2 px-4 ${buttonStyles}`}
        >
          <div className="w-5">
            <img
              src={cartIcon}
              alt="Cart icon"
              className="object-contain w-5 aspect-square"
            />
          </div>
          <span
            className={`text-base font-medium leading-6 text-center ${textColor}`}
          >
            {isAdded ? "Added" : "Add to cart"}
          </span>
        </button>
      </div>
    </div>
  );
};
