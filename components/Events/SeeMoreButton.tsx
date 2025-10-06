"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export const SeeMoreButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/events");
  };

  return (
    <button
      onClick={handleClick}
      className="mt-12 max-md:mt-10 px-6 py-3 bg-[#333064] text-white text-base font-medium rounded-lg shadow-md hover:bg-[#2a2853] active:scale-95 transition-transform duration-200"
    >
      See More
    </button>
  );
};
