"use client";
import * as React from "react";

interface ProductGalleryProps {
  mainImage: string;
  images: { full: string; thumbnail: string }[]; // <- now full and thumbnail
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  mainImage,
  images,
}) => {
  const [selectedImage, setSelectedImage] = React.useState(mainImage);

  const handleThumbnailClick = (fullImage: string) => {
    setSelectedImage(fullImage);
  };

  return (
    <section className="flex flex-col justify-center min-w-60 w-[756px] max-md:max-w-full">
      <div className="flex flex-col justify-center w-full max-w-[756px] min-h-[756px] max-md:max-w-full">
        <div className="flex flex-1 gap-6 size-full max-md:max-w-full">
          <img
            src={selectedImage}
            alt="Product preview"
            className="object-contain flex-1 shrink w-full aspect-[1.27] basis-0 min-w-60 max-md:max-w-full"
          />
        </div>
        <p className="flex-1 shrink gap-2.5 self-stretch mt-2 w-full text-base tracking-normal leading-6 text-center text-black basis-0 max-md:max-w-full">
          Click to view full screen
        </p>
        <div className="hide-scrollbar flex overflow-hidden overflow-x-auto gap-4 mt-2 w-full min-h-[120px] max-md:max-w-full">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.thumbnail}
              alt={`Product thumbnail ${index + 1}`}
              className="object-contain flex-1 shrink aspect-[1.67] basis-0 max-w-60 min-w-[200px] w-[200px] cursor-pointer"
              onClick={() => handleThumbnailClick(image.full)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
