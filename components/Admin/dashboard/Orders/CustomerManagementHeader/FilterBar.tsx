"use client";
import { useState } from "react";
import { SearchIcon, StatusIcon, CartIcon, CaretDownIcon } from "./Icons";

interface FilterBarProps {
  search: string;
  category: string;
  status: string;
  onSearch: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export const FilterBar = ({
  search,
  category,
  status,
  onSearch,
  onCategoryChange,
  onStatusChange,
}: FilterBarProps) => {
  const [showCategory, setShowCategory] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const categories = ["All", "Paid", "Cancelled", "Failed"];
  const statuses = [
    "All",
    "Approved",
    "Pending",
    "In-Progress",
    "Shipped",
    "Delivered",
    "Cancel",
    "Picked up",
    "Returned",
  ];

  return (
    <section className="flex gap-2 items-center mt-6 max-md:flex-col max-md:items-start">
      {/* Search */}
      <div className="flex items-center px-4 py-0 w-60 h-10 bg-white border border-neutral-300 rounded-[50px]">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="ml-2 flex-1 outline-none text-sm bg-transparent"
        />
      </div>

      {/* Category Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowCategory((prev) => !prev)}
          className="flex items-center px-2 h-10 rounded-lg border border-neutral-300 bg-white"
        >
          <CartIcon />
          <span className="mx-2 text-neutral-700">Payment Type: {category}</span>
          <CaretDownIcon />
        </button>
        {showCategory && (
          <ul className="absolute mt-1 bg-white border border-neutral-300 rounded-lg shadow-md w-40 z-10">
            {categories.map((c) => (
              <li
                key={c}
                onClick={() => {
                  onCategoryChange(c);
                  setShowCategory(false);
                }}
                className="px-3 py-2 hover:bg-neutral-100 cursor-pointer"
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Status Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowStatus((prev) => !prev)}
          className="flex items-center px-2 h-10 rounded-lg border border-neutral-300 bg-white"
        >
          <StatusIcon />
          <span className="mx-2">Status: {status}</span>
          <CaretDownIcon />
        </button>
        {showStatus && (
          <ul className="absolute mt-1 bg-white border border-neutral-300 rounded-lg shadow-md w-40 z-10">
            {statuses.map((s) => (
              <li
                key={s}
                onClick={() => {
                  onStatusChange(s);
                  setShowStatus(false);
                }}
                className="px-3 py-2 hover:bg-neutral-100 cursor-pointer"
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
