// HeroSection.tsx
import React from "react";
import { Poppins, Playfair_Display } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full text-center text-white">
      <img
        src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/3960d992d5c4ff6d2ca40a21fefa0b62a678c411?placeholderIfAbsent=true"
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative flex flex-col items-center justify-center px-6 py-16 md:py-20 lg:py-24 max-w-4xl mx-auto">
        <h1
          className={`${playfair.className} text-4xl md:text-5xl font-black mb-4`}
        >
          Find Your Fit
        </h1>
        <h2
          className={`${poppins.className} text-xl md:text-2xl font-semibold mb-4`}
        >
          Explore in-person or digital serving opportunities.
        </h2>
        <p
          className={`${poppins.className} text-sm md:text-base leading-relaxed max-w-2xl mx-auto`}
        >
          RCCG LWF is full of diverse people, and God made each of us to serve
          in different ways. Whether you attend a location or entirely online,
          there's a role out there for you! And don't worry, we offer
          specialized training so you can always feel confident each time you
          serve.
        </p>
      </div>
    </section>
  );
};
