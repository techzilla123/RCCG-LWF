import React from "react";
import { BackgroundDecorations } from "./BackgroundDecorations";
import { ADLaM_Display } from "next/font/google";

const adlam = ADLaM_Display({
  weight: "400", // Regular
  subsets: ["latin"],
});

export const HeroSection: React.FC = () => {
  return (
    <section className="flex overflow-hidden relative justify-center items-center min-h-[500px]">
      <BackgroundDecorations />
      <div className="px-6 py-0 text-center max-w-[800px] z-[1] max-sm:px-4 max-sm:py-0">
        <p className="mb-6 text-sm font-semibold text-gray-400 tracking-[2px]">
          ABOUT US
        </p>
        <h1
          className={`${adlam.className} mb-6 font-bold leading-tight text-white 
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[55px]`}
        >
          Our mission is to guide people to live fully devoted to Christ.
        </h1>
        <p className="text-lg leading-relaxed text-gray-300 max-md:text-base max-sm:text-sm">
          That's how we're able to make a difference. And it's the driving
          force behind everything we do.
        </p>
      </div>
    </section>
  );
};
