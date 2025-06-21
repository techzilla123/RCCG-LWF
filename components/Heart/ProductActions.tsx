"use client";

import * as React from "react";

interface ProductActionsProps {
  price: string;
  isAdded?: boolean;
  isDisabled?: boolean;
  cartIcon: string;
  onClick?: () => void;
   onAddToCart?: () => void;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  price,
  isAdded = false,
  isDisabled = false,
  cartIcon,
  onClick,
   onAddToCart, // ✅ Add this here
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
      <p className="self-stretch my-auto text-base font-medium tracking-normal leading-6 text-black whitespace-nowrap">
        {price}
      </p>
      <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto basis-0">
        <button
          onClick={handleClick} // ✅ change from `onClick` to `handleClick`
          disabled={isDisabled}
          className={`flex gap-2 justify-center items-center self-stretch w-full rounded-[50px] py-2 px-4 ${buttonStyles}`}
        >
          <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-5">
            <img
              src={cartIcon}
              alt="Cart icon"
              className="object-contain self-stretch my-auto w-5 aspect-square"
            />
          </div>
          <span
            className={`self-stretch my-auto text-base font-medium tracking-normal leading-6 text-center ${textColor}`}
          >
            {isAdded ? "Added" : "Add to cart"}
          </span>
        </button>
      </div>
    </div>
  );
};
