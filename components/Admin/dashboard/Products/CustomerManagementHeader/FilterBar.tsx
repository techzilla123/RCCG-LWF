"use client";
import React, { useState, useEffect } from "react";
import { SortIcon, StatusIcon, CartIcon, CaretDownIcon } from "./Icons";
import OrderDetails from "../ProductsAddOne/ProductDetailForm"; // Import modal component (adjust path if needed)

interface Category {
  generalCategoryId: string;
  name: string;
}



export const FilterBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
const [showStatusDropdown, setShowStatusDropdown] = useState(false);
const [selectedStatus, setSelectedStatus] = useState("All");
const [showCatDropdown, setShowCatDropdown] = useState(false);
const [selectedCat, setSelectedCat] = useState("All");
const [categories, setCategories] = useState<Category[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

const fetchCategories = async () => {
  setIsLoading(true);
  setErrorMessage("");

  try {
    const token = localStorage.getItem("accessToken") || "";

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/products/list-product-general-category`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          ...(token && { Authorization: token }),
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch categories.");
    }

    const data = await response.json();

    setCategories(data.data || []);  // Store full objects here
  } catch (error) {
    let message = "Something went wrong. Please try again.";
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === "string") {
      message = error;
    }
    setErrorMessage(message);
  } finally {
    setIsLoading(false);
  }
};

useEffect(() => {
  fetchCategories();
}, []);

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
  {/* <SearchIcon /> */}
  <input
    type="text"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    placeholder="Search"
    className="ml-2 outline-none bg-transparent text-sm text-neutral-700 w-full placeholder:text-neutral-500"
  />
</div>


        <button className="flex items-center px-2 h-10 rounded-lg border border-solid border-neutral-300 bg-white">
          <SortIcon />
          <span className="mx-2 text-neutral-700">Sort by: None</span>
          <CaretDownIcon />
        </button>

         <div className="relative inline-block">
<button
  className="flex items-center px-2 h-10 rounded-lg border border-solid border-neutral-300 bg-white"
  onClick={() => setShowCatDropdown(!showCatDropdown)}
>
  <CartIcon />
  <span className="mx-2 text-neutral-700">Category: {selectedCat}</span>
  <CaretDownIcon />
</button>


  {showCatDropdown && (
  <div className="absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white border border-gray-200 z-10">
    {/* Show loading message */}
    {isLoading && (
      <div className="px-4 py-2 text-sm text-gray-500">Loading categories...</div>
    )}

    {/* Show error message */}
    {errorMessage && (
      <div className="px-4 py-2 text-sm text-red-500">{errorMessage}</div>
    )}

    {/* Show list only if not loading and no error */}
    {!isLoading && !errorMessage && (
      <ul>
        {/* Optional "All" item */}
        <li
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
          onClick={() => {
            setSelectedCat("All");
            setShowCatDropdown(false);
          }}
        >
          All
        </li>

        {/* Render categories */}
     {categories.map((cat, index) => (
  <li
    key={`${cat.generalCategoryId}-${index}`}
    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
    onClick={() => {
      setSelectedCat(cat.name);
      setShowCatDropdown(false);
    }}
  >
    {cat.name}
  </li>
))}


      </ul>
    )}
  </div>
)}


</div>

       <div className="relative inline-block">
  <button
    className="flex items-center px-2 h-10 rounded-lg border border-solid border-neutral-300 bg-white"
    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
  >
    <StatusIcon />
    <span className="mx-2 text-neutral-700">Status: {selectedStatus}</span>
    <CaretDownIcon />
  </button>

  {showStatusDropdown && (
    <div className="absolute left-0 mt-2 w-32 rounded-md shadow-lg bg-white border border-gray-200 z-10">
      <ul>
        {["All", "Active", "Declined"].map((status) => (
          <li
            key={status}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            onClick={() => {
              setSelectedStatus(status);
              setShowStatusDropdown(false);
            }}
          >
            {status}
          </li>
        ))}
      </ul>
    </div>
  )}
</div>

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
