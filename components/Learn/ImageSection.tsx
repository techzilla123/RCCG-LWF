import * as React from "react";

interface ImageSectionProps {
  src: string;
  aspectRatio: string;
  className?: string;
  children?: React.ReactNode;
}

function ImageSection({
  src,
  aspectRatio,
  className = "",
  children,
}: ImageSectionProps) {
  return (
    <section className={`max-w-full w-[486px] ${className}`}>
      <div className="relative flex items-start pb-1 w-full">
        <img
          src={src}
          className={`object-contain ${aspectRatio} max-w-[486px] min-w-60 w-[486px]`}
          alt=""
        />

        {/* Overlay text */}
        {children}
      </div>
    </section>
  );
}

export default ImageSection;
