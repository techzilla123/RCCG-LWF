"use client";

import * as React from "react";

interface ProductRatingProps {
  rating: number;
  reviews: number;
  starIcon: string;
}

export const ProductRating: React.FC<ProductRatingProps> = ({
  rating,
  reviews,
  starIcon,
}) => {
  return (
    <div className="flex gap-1 items-center self-start">
      <p className="self-stretch my-auto text-sm font-medium tracking-normal leading-6 text-black">
        {rating}
      </p>
      <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-4 rotate-[3.141592653589793rad]">
        <img
          src={starIcon}
          alt="Rating star"
          className="object-contain self-stretch my-auto w-4 aspect-square"
        />
      </div>
      <p className="self-stretch my-auto text-sm tracking-normal leading-6 text-neutral-500">
        ({reviews})
      </p>
    </div>
  );
};
