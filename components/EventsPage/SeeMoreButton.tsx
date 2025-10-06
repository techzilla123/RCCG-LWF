"use client";
import * as React from "react";

export const SeeMoreButton: React.FC = () => {
  return (
    <button className="flex gap-2 justify-center items-center px-6 py-3.5 bg-violet-600 rounded-lg transition-all cursor-pointer duration-[0.2s] ease-[ease] max-sm:px-6 max-sm:py-4 max-sm:w-full">
      <span className="text-base font-semibold leading-6 text-center text-white">
        See more
      </span>
    </button>
  );
};
