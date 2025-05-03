"use client";
import { SearchIcon, LocationIcon, StatusIcon, CaretDownIcon } from "./Icons";

export const FilterBar = () => {
  return (
    <section className="flex gap-2 items-center mt-6 max-md:flex-col max-md:items-start max-sm:flex-col max-sm:items-start">
      <div className="flex items-center px-4 py-0 w-60 h-10 bg-white border border-solid border-neutral-300 rounded-[50px]">
        <SearchIcon />
        <span className="ml-2">Search</span>
      </div>

      <button className="flex items-center px-2 py-0 h-10 rounded-lg border border-solid border-neutral-300">
        <LocationIcon />
        <span className="mx-2">Location: USA</span>
        <CaretDownIcon />
      </button>

      <button className="flex items-center px-2 py-0 h-10 rounded-lg border border-solid border-neutral-300">
        <StatusIcon />
        <span className="mx-2">Status: All</span>
        <CaretDownIcon />
      </button>
    </section>
  );
};
