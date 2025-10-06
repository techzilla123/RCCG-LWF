// CallToActionSection.tsx
import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const CallToActionSection: React.FC = () => {
  return (
    <section className="bg-[#333064] py-16 text-white text-center px-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <h2
          className={`${montserrat.className} text-4xl font-extrabold tracking-tight`}
        >
          It&apos;s time to get started!
        </h2>
        <p className="text-lg leading-relaxed">
          Just tap the button below, fill out your information, and we&apos;ll help
          with the rest.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button className="flex gap-2 items-center px-8 py-4 bg-white text-black rounded-full font-semibold">
            <img
              src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/837b8295327c10fa4df7c163f9fd18d1a40d2094?placeholderIfAbsent=true"
              alt=""
              className="w-5 h-5"
            />
            Start Serving
          </button>
          <button className="flex gap-2 items-center px-8 py-4 border border-white rounded-full font-semibold">
            View Ministries
            <img
              src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/5f3a2a1885750eaffc733f32b2eeb28ae0cae909?placeholderIfAbsent=true"
              alt=""
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
