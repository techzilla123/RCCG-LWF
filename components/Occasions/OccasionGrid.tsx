"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { OccasionImage } from "./OccasionImage";

export const OccasionGrid: React.FC = () => {
  const router = useRouter();

  const images = [
    { src: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/558f5b2604110bf5a627166b35589b37cfcbadef?placeholderIfAbsent=true", alt: "Occasion 1", path: "/shop/birthday" },
    { src: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/821f5a2165e9de395dc9a595f430472e910479dc?placeholderIfAbsent=true", alt: "Occasion 2", path: "/shop/party-supplies" },
    { src: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/04725187df508dfb9f4b586837449dfcde6c6d96?placeholderIfAbsent=true", alt: "Occasion 3", path: "/shop/decorations" },
    { src: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/e2adc0e089e6208e10ff1b7295b74a83e4885d2d?placeholderIfAbsent=true", alt: "Occasion 4", path: "/shop/holiday" },
    { src: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/4c57560f7462881443144956f86dde141ab6191e?placeholderIfAbsent=true", alt: "Occasion 5", path: "/shop/balloon" },
  ];

  const handleClick = (path: string) => {
    router.push(path);
  };

  return (
    <section className="flex flex-wrap gap-10 justify-center items-center mt-6 w-full max-md:max-w-full">
      {images.map((image, index) => (
        <OccasionImage
          key={index}
          src={image.src}
          alt={image.alt}
          onClick={() => handleClick(image.path)}
        />
      ))}
    </section>
  );
};
