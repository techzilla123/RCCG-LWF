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
   <section className="flex flex-col justify-center min-w-60 w-[756px] max-md:w-full max-md:px-4 max-md:py-2">
  <div className="flex flex-col justify-center w-full max-w-[756px] max-md:w-full max-md:min-h-0">
    
    <div className="flex flex-1 gap-6 size-full max-md:gap-2 max-md:flex-col max-md:items-center">
      <img
        src={selectedImage}
        alt="Product preview"
        className="object-contain w-full max-md:w-full max-md:aspect-auto"
      />
    </div>

    <p className="mt-2 text-base text-center text-black max-md:text-sm max-md:mt-1">
      Click to view full screen
    </p>

    <div className="hide-scrollbar flex overflow-x-auto gap-4 mt-2 w-full min-h-[120px] max-md:gap-2 max-md:min-h-[100px]">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.thumbnail}
          alt={`Product thumbnail ${index + 1}`}
          className="object-contain aspect-[1.67] w-[200px] min-w-[160px] max-md:w-[140px] max-md:min-w-[140px] cursor-pointer"
          onClick={() => handleThumbnailClick(image.full)}
        />
      ))}
    </div>
    
  </div>
</section>
  );
};
