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
  text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[40px]`}
>
  Our Mission is to preach the gospel of reconciliation through the
  sacrifice of our Lord Jesus Christ — 2 Corinthians 5:17–21.
</h1>

        <p className="text-lg leading-relaxed text-gray-300 max-md:text-base max-sm:text-sm">
          To build word practitioners that will become examples of believers in word, conversation, charity, spirit, and purity. — James 1:22, 1 Timothy 4:12
        </p>
      </div>
    </section>
  );
};
