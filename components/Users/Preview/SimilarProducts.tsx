"use client";

import React, { useRef } from "react";
import ProductCard from "./Similar/ProductCard";
import NavigationButton from "./Similar/NavigationButton";
import { ProductGrid } from "./Similar/MobileShop/ProductGrid";

const SimilarProducts: React.FC = () => {
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

 
  const scroll = (direction: "left" | "right") => {
    const scrollAmount = 300; // Adjust as needed
  
    const scrollTarget =
      window.innerWidth < 768 ? mobileScrollRef.current : desktopScrollRef.current;
  
    if (scrollTarget) {
      const { scrollLeft } = scrollTarget;
  
      scrollTarget.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };


  const products = [
    {
      id: 1,
      image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/6cf0e98e8c2f2e0b68fcd6dfd1b762fdb5730ca5?placeholderIfAbsent=true",
      rating: 4.7,
      reviews: 400,
      title: "Colourful Artistic Party Handbag - Gift Style",
      price: "$40,000",
    },
    {
      id: 2,
      image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/a9d15a18691d4ac6c3299fd7e1eac4a9900811ca?placeholderIfAbsent=true",
      rating: 4.7,
      reviews: 400,
      title: "Festive Colorful Confetti Patterned Party Hat - Modern",
      price: "$40,000",
    },
    {
      id: 3,
      image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/029ae28f51f8336455e402a58aa1daa69e875263?placeholderIfAbsent=true",
      rating: 4.7,
      reviews: 400,
      title: "Whimsical Sky High Helium Balloon Party Extravaganza Pack",
      price: "$40,000",
    },
    {
      id: 4,
      image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/6cf0e98e8c2f2e0b68fcd6dfd1b762fdb5730ca5?placeholderIfAbsent=true",
      rating: 4.7,
      reviews: 400,
      title: "All-In-One Happy Birthday Bash Décor Kit with Banners, Tassels & More",
      price: "$40,000",
    },
    {
      id: 5,
      image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/a9d15a18691d4ac6c3299fd7e1eac4a9900811ca?placeholderIfAbsent=true",
      rating: 4.7,
      reviews: 400,
      title: "Sweet Treats Birthday Table Display Set – Confetti, Skirts & Centerpieces",
      price: "$40,000",
    },
  ];

  return (
    <section className="flex flex-col px-8 py-10 bg-stone-50 max-md:px-4">
      {/* Header */}
      <header className="flex items-center justify-between w-full flex-wrap gap-6">
        <h2 className="text-2xl font-semibold text-black">Similar products</h2>
        <div className="flex gap-3">
          <NavigationButton
            direction="left"
            imageSrc="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/184ae31cf729fa37edeab2707659f7acd95fa2cf?placeholderIfAbsent=true"
            onClick={() => scroll("left")}
          />
          <NavigationButton
            direction="right"
            imageSrc="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/2fec114adbde4847dbbfb3f0e3b0bcdca6b4479e?placeholderIfAbsent=true"
            onClick={() => scroll("right")}
          />
        </div>
      </header>

 
      {/* Product List (Desktop) */}
      <div
        ref={desktopScrollRef}
        className="hidden md:flex gap-6 overflow-x-auto mt-8 pb-4 hide-scrollbar scroll-smooth"
      >
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Mobile ProductGrid */}
      <div className="block md:hidden mt-6 w-full">
        <ProductGrid scrollRef={mobileScrollRef} />
      </div>

      {/* See More Button */}
      <div className="flex justify-center mt-10">
        <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all">
          <span className="text-base font-medium text-black">See more</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/f395c476b09a1375b483c48e4e81c09fc7afa605?placeholderIfAbsent=true"
            alt="See more"
            className="w-5 h-5 object-contain"
          />
        </button>
      </div>
    </section>
  );
};

export default SimilarProducts;
