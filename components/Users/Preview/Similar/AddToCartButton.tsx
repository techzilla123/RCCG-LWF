"use client";

import React from "react";

interface AddToCartButtonProps {
  productId: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const handleAddToCart = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-cart`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          Authorization: token,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: "1",
          size: "",
          color: "",
        }),
      });

      const data = await res.json();

      if (data.statusCode === 200) {
        alert("Product added to cart");
        console.log("Cart response:", data);
      } else {
        console.error("Cart add failed:", data);
        alert("Could not add product to cart.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while adding to cart.");
    }
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
