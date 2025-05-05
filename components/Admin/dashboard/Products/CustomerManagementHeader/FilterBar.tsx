"use client";
import React, { useState, useEffect } from "react";
import { SearchIcon, SortIcon, StatusIcon, CartIcon, CaretDownIcon } from "./Icons";
import OrderDetails from "../ProductsAddOne/ProductDetailForm"; // Import modal component (adjust path if needed)

export const FilterBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
// ✅ Prevent background scroll when modal is open
useEffect(() => {
  if (isModalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  // Cleanup on unmount
  return () => {
    document.body.style.overflow = "auto";
  };
}, [isModalOpen]);
  return (
    <section className="flex justify-between items-center mt-6 mb-4 max-md:flex-col max-md:items-start w-full">
      {/* Left side: Filters */}
      <div className="flex gap-2 items-center flex-wrap">
        <div className="flex items-center px-4 py-0 w-60 h-10 bg-white border border-solid border-neutral-300 rounded-[50px]">
          <SearchIcon />
          <span className="ml-2 text-neutral-500">Search</span>
        </div>

        <button className="flex items-center px-2 h-10 rounded-lg border border-solid border-neutral-300 bg-white">
          <SortIcon />
          <span className="mx-2 text-neutral-700">Sort by: None</span>
          <CaretDownIcon />
        </button>

        <button className="flex items-center px-2 h-10 rounded-lg border border-solid border-neutral-300 bg-white">
          <CartIcon />
          <span className="mx-2 text-neutral-700">Category: All</span>
          <CaretDownIcon />
        </button>

        <button className="flex items-center px-2 h-10 rounded-lg border border-solid border-neutral-300 bg-white">
          <StatusIcon />
          <span className="mx-2 text-neutral-700">Status: All</span>
          <CaretDownIcon />
        </button>
      </div>

      {/* Right side: New Product Button */}
      <button
        className="flex gap-2 items-center bg-[#007AFF] rounded-[50px] px-4 py-2 h-10"
        onClick={handleOpenModal} // Open modal on click
      >
        <span className="flex w-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/85a982390ef9f7e6457da7dc54d4ae38e58f9655?placeholderIfAbsent=true"
            alt=""
            className="object-contain w-4 aspect-square"
          />
        </span>
        <span className="text-base font-medium text-white leading-6">New product</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
         
              {/* Directly render the modal component */}
              <OrderDetails onClose={handleCloseModal} />

       
          </div>
        </div>
      )}
    </section>
  );
};
