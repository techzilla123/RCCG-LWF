"use client";
import * as React from "react";
import { MinistryHeading } from "./MinistryHeading";
import { MinistryContent } from "./MinistryContent";
import { MinistryImage } from "./MinistryImage";

export default function MinistrySection() {
  return (
    <section className="flex flex-col items-center w-full bg-white rounded-none max-md:py-24">
      {/* Main content container */}
      <div
        className="
          flex relative flex-col overflow-hidden 
          pt-16 pb-14 mt-0 min-h-[804px] w-full 
          px-8 sm:px-12 md:px-24 lg:px-48 xl:px-64 
          max-w-[3000px] 2xl:max-w-[3000px]
          mx-auto
        "
      >
        {/* Background image */}
        <img
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/f10cab0e5abf36e41741d3fdea3d4c62fcfe9615?placeholderIfAbsent=true"
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full"
        />

        {/* Ministry heading */}
        <MinistryHeading />

        {/* Content + Image side by side (stack on mobile) */}
        <div className="flex relative flex-wrap gap-8 items-start pt-1 pb-4 w-full max-w-[1080px] mx-auto">
          <MinistryContent />
          <MinistryImage />
        </div>
      </div>
    </section>
  );
}
