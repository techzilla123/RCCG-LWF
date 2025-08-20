"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { OccasionImage } from "./OccasionImage";

export const OccasionGrid: React.FC = () => {
  const router = useRouter();

  const images = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/558f5b2604110bf5a627166b35589b37cfcbadef?placeholderIfAbsent=true",
      alt: "Occasion 1",
      path: "/shop/birthday",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/821f5a2165e9de395dc9a595f430472e910479dc?placeholderIfAbsent=true",
      alt: "Occasion 2",
      path: "/shop/party-supplies",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/04725187df508dfb9f4b586837449dfcde6c6d96?placeholderIfAbsent=true",
      alt: "Occasion 3",
      path: "/shop/decorations",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/e2adc0e089e6208e10ff1b7295b74a83e4885d2d?placeholderIfAbsent=true",
      alt: "Occasion 4",
      path: "/shop/holiday",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/4c57560f7462881443144956f86dde141ab6191e?placeholderIfAbsent=true",
      alt: "Occasion 5",
      path: "/shop/party-supplies?SCT=93caeb56-e278-4810-9b0e-cead08c487b6",
    },
  ];

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <section className="w-full mt-6">
      {/* Desktop layout (flex wrap) */}
      <div className="hidden md:flex flex-wrap gap-10 justify-center items-center w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className="transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(255,204,0,0.5)] cursor-pointer rounded-xl overflow-hidden"
            onClick={() => handleClick(image.path)}
          >
            <OccasionImage src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>

      {/* Mobile layout (horizontal scroll) */}
      <div className="md:hidden flex gap-4 overflow-x-auto px-4 snap-x snap-mandatory">
        {images.map((image, index) => (
          <div
            key={index}
            className="min-w-[45%] flex-shrink-0 rounded-xl overflow-hidden snap-start transition-transform duration-300 active:scale-95"
            onClick={() => handleClick(image.path)}
          >
            <OccasionImage src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </section>
  );
};
