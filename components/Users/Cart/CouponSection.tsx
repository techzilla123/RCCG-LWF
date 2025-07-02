"use client";

import React, { useState } from "react";

export const CouponSection = () => {
  const [couponCode, setCouponCode] = useState("");
  const [applied, setApplied] = useState(false);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      alert("Please enter a coupon code.");
      return;
    }

    console.log("Applying coupon:", couponCode);
    setApplied(true);
  };

  const handleClearCart = () => {
    console.log("Clearing shopping cart...");
    setCouponCode("");
    setApplied(false);
  };

  return (
    <div className="flex flex-wrap gap-6 justify-between items-start pt-6 w-full">
      <div className="flex gap-3 w-full max-w-xl items-start">
      <input
  type="text"
  placeholder="Enter coupon code"
  value={couponCode}
  onChange={(e) => setCouponCode(e.target.value)}
  className="flex-1 max-w-[200px] px-4 py-2 rounded-full text-black placeholder-stone-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

        <button
          onClick={handleApplyCoupon}
          className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition break-words text-center"
          style={{ whiteSpace: "normal", wordBreak: "break-word" }}
        >
          {applied ? "Applied" : "Apply coupon"}
        </button>
      </div>

      <button
        onClick={handleClearCart}
        className="text-base underline text-black hover:text-red-600 transition"
      >
        Clear shopping cart
      </button>
    </div>
  );
};
