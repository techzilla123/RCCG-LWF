"use client";

import React from "react";

export const ProductHeader = () => {
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-[#F8F8F8] rounded-lg w-full">
      {/* Product Column */}
      <div className="flex-1 min-w-0 flex justify-start items-center">
        <h3 className="text-lg font-semibold">Product</h3>
      </div>

      {/* Divider */}
      <div className="border-r border-gray-300 mx-4 h-6" />

      {/* Quantity Column */}
      <div className="w-[110px] flex justify-center items-center">
        <h3 className="text-lg font-semibold">Quantity</h3>
      </div>

      {/* Divider */}
      <div className="border-r border-gray-300 mx-4 h-6" />

      {/* Total Column */}
      <div className="w-[100px] flex justify-center items-center">
        <h3 className="text-lg font-semibold">Total</h3>
      </div>
    </header>
  );
};
