"use client";

import * as React from "react";

interface OccasionImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

export const OccasionImage: React.FC<OccasionImageProps> = ({ src, alt, onClick }) => {
  return (
    <figure
      className="shrink-0 self-stretch my-auto cursor-pointer"
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className="object-cover w-[120px] md:w-[172px] h-[120px] md:h-[172px] rounded-xl"
      />
    </figure>
  );
};
