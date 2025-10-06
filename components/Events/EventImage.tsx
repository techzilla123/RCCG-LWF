import * as React from "react";

interface EventImageProps {
  src: string;
  alt?: string;
  className?: string;
  isRounded?: boolean;
}

export const EventImage: React.FC<EventImageProps> = ({
  src,
  alt = "Event image",
  className = "",
  isRounded = false,
}) => {
  const baseClasses =
    "object-contain aspect-[1.78] max-w-[500px] w-full mx-auto transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"; 
  const roundedClasses = isRounded ? "rounded-3xl aspect-[1.72]" : "";

  return (
    <img
      src={src}
      alt={alt}
      className={`${baseClasses} ${roundedClasses} ${className}`.trim()}
    />
  );
};
