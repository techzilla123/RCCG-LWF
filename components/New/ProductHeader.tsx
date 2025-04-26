"use client";

import * as React from "react";

interface ProductHeaderProps {
  rightArrowIcon: string;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({
  rightArrowIcon,
}) => {
  return (
    <header className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
      <h2 className="self-stretch my-auto text-2xl text-black">New  Arrivals</h2>
      {/* <button className="flex gap-2 justify-center items-center self-stretch py-2 px-4 my-auto bg-white rounded-[50px]">
        <span className="self-stretch my-auto text-base font-medium tracking-normal leading-6 text-center text-black">
          Find more
        </span>
        <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-4">
          <img
            src={rightArrowIcon}
            alt="Right arrow"
            className="object-contain self-stretch my-auto w-4 aspect-square"
          />
        </div>
      </button> */}
    </header>
  );
};
