"use client";
import * as React from "react";

interface ProductGalleryProps {
  mainImage: string;
  images: { full: string; thumbnail: string }[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  mainImage,
  images,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(
    images.findIndex((img) => img.full === mainImage) || 0
  );

  const selectedImage = images[selectedIndex]?.full;

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <section className="flex flex-col justify-center min-w-60 w-[756px] max-md:w-full max-md:px-4 max-md:py-2">
      <div className="flex flex-col justify-center w-full max-w-[756px] max-md:w-full max-md:min-h-0">
        
        <div className="relative flex justify-center items-center w-full max-h-[500px]">
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 px-3 py-2 text-lg font-bold text-white bg-gray-400 rounded-full shadow hover:bg-gray-800 transition-all z-10"
            aria-label="Previous Image"
          >
            &#10094;
          </button>

          <img
            src={selectedImage}
            alt="Product preview"
            className="object-contain w-full max-h-[500px]"
          />
 <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-2 text-lg font-bold text-white bg-gray-400 rounded-full shadow hover:bg-gray-800 transition-all z-10"
            aria-label="Next Image"
          >
            &#10095;
          </button>
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
  className={`object-contain aspect-[1.67] w-[200px] min-w-[160px] max-md:w-[140px] max-md:min-w-[140px] cursor-pointer rounded-md transition-all duration-200 border-2 ${
    selectedIndex === index
      ? "border-gray-300"
      : "border-transparent hover:border-gray-300"
  }`}
  onClick={() => handleThumbnailClick(index)}
/>

          ))}
        </div>
        
      </div>
    </section>
  );
};
