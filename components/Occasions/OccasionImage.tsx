"use client";

import * as React from "react";

interface OccasionImageProps {
  src: string;
  alt: string;
  onClick?: () => void; // ✅ Allow onClick to be passed optionally
}

export const OccasionImage: React.FC<OccasionImageProps> = ({ src, alt, onClick }) => {
  return (
    <figure
      className="shrink-0 self-stretch my-auto cursor-pointer"
      onClick={onClick} // ✅ Attach onClick if available
    >
      <img
        src={src}
        alt={alt}
        className="object-contain aspect-square w-[172px]"
      />
    </figure>
  );
};
