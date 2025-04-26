"use client";

import React from "react";
import { QuantityStepper } from "./QuantityStepper";
import { ProductItemType } from "./types";

interface ProductItemProps {
  product: ProductItemType;
  onQuantityChange: (id: string, newQuantity: number) => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onQuantityChange,
}) => {
  const handleIncrement = () => {
    onQuantityChange(product.id, product.quantity + 1);
  };

  const handleDecrement = () => {
    if (product.quantity > 1) {
      onQuantityChange(product.id, product.quantity - 1);
    }
  };

  return (
    <article className="flex items-center justify-between py-5 px-6 w-full border-b border-gray-200">
      {/* Product Column */}
      <div className="flex-1 min-w-0 flex gap-4 items-start">
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 object-contain"
        />
        <div className="flex flex-col">
          <div className="text-base font-medium text-black">
            ${product.price}{" "}
            {product.discount && (
              <span className="text-sm text-gray-500">
                ({product.discount.percentage}% off)
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500">
            Color: {product.color}, Size: {product.size}
          </p>
        </div>
      </div>


      {/* Quantity Column */}
      <div className="w-[110px] flex justify-center items-center">
        <QuantityStepper
          quantity={product.quantity}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </div>


      {/* Total Column */}
      <div className="flex items-center justify-end gap-5 ml-auto -pr-10">
  <div className="w-[100px] text-end text-base font-medium text-black">
    ${product.price * product.quantity}
  </div>
  <div className="flex flex-col items-center gap-3">
  {/* X Button */}
  <button className="flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16" // Reduced size
      height="16" // Reduced size
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-4 h-4" // Adjusted to a smaller size
    >
      <path
        strokeLinecap="round"  // Corrected to camelCase
        strokeLinejoin="round" // Corrected to camelCase
        strokeWidth="2"   
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>

  {/* Vector(2).svg */}
  <button className="flex items-center justify-center">
    <img
      src="/Vector(2).svg" // Replace with the actual path to your SVG file
      alt="Remove item"
      className="w-4 aspect-auto" // Adjusted to a smaller size
    />
  </button>
</div>

</div>


    </article>
  );
};
