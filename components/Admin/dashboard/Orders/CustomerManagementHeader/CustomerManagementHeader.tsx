"use client";
import { CaretDownIcon } from "./Icons";

export const CustomerManagementHeader = () => {
  return (
    <header className="flex justify-between items-center pb-6 border-b  border-solid border-b-gray-200 max-md:flex-col max-md:items-start max-sm:flex-col max-sm:items-start">
      <h3 className="text-3xl font-bold text-black">Orders</h3>
      <button className="flex items-center p-2 text-sm text-black rounded-lg bg-stone-50">
        <span>Past month</span>
        <CaretDownIcon />
      </button>
    </header>
  );
};
