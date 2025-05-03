"use client";
import { SearchIcon, SortIcon, StatusIcon, CartIcon, CaretDownIcon } from "./Icons";

export const FilterBar = () => {
  return (
    <section className="flex justify-between items-center mt-6 mb-4  max-md:flex-col max-md:items-start w-full">
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
      <button className="flex gap-2 items-center bg-[#007AFF] rounded-[50px] px-4 py-2 h-10">
        <span className="flex w-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/85a982390ef9f7e6457da7dc54d4ae38e58f9655?placeholderIfAbsent=true"
            alt=""
            className="object-contain w-4 aspect-square"
          />
        </span>
        <span className="text-base font-medium text-white leading-6">New product</span>
      </button>
    </section>
  );
};
