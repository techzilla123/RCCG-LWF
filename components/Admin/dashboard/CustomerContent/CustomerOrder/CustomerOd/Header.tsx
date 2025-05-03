"use client";
import { FilterBar } from "./FilterBar";

export const Header = () => {
  return (
    <header className="flex justify-between items-center pb-1 mt-6 border-solid border-b-gray-200 max-md:flex-col max-md:items-start max-sm:flex-col max-sm:items-start">
      <h3 className="text-2xl font-bold text-black">Orders</h3>
      <FilterBar />
    </header>
  );
};
