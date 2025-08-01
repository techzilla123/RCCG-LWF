"use client";

import * as React from "react";
import { useRouter } from "next/navigation"; // For App Router (Next.js 13+)

interface ProductHeaderProps {
  rightArrowIcon: string;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({
  rightArrowIcon,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/shop");
  };

  return (
    <header className="flex flex-nowrap justify-between items-center w-full">
      <h2 className="text-2xl text-black">Top Products</h2>
      <button
        onClick={handleClick}
        className="flex gap-2 justify-center items-center py-2 px-4 bg-white rounded-[50px]"
      >
        <span className="text-base font-medium leading-6 text-black">
          Find more
        </span>
        <div className="flex justify-center items-center w-4">
          <img
            src={rightArrowIcon}
            alt="Right arrow"
            className="object-contain w-4 aspect-square"
          />
        </div>
      </button>
    </header>
  );
};
