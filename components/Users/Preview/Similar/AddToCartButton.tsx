"use client";
import React from "react";

const AddToCartButton: React.FC = () => {
  const handleAddToCart = () => {
    // Add to cart functionality would go here
    console.log("Added to cart");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex gap-2 justify-center items-center self-stretch py-3 w-full bg-blue-600 shadow-lg rounded-[50px]"
    >
      <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/56b2d25e225a538a4b817ec0f11240e5f9303340?placeholderIfAbsent=true"
          alt="Cart icon"
          className="object-contain self-stretch my-auto w-5 aspect-square"
        />
      </div>
      <span className="self-stretch my-auto text-base font-medium tracking-normal leading-6 text-center text-white">
        Add to cart
      </span>
    </button>
  );
};

export default AddToCartButton;
