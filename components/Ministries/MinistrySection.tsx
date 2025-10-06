"use client";
import * as React from "react";
import { MinistryHeading } from "./MinistryHeading";
import { MinistryContent } from "./MinistryContent";
import { MinistryImage } from "./MinistryImage";

export default function MinistrySection() {
  return (
    <section className="flex flex-col rounded-none max-md:py-24">
      {/* Top row with two images far left and far right */}
      

      {/* Main content */}
      <div className="flex overflow-hidden relative flex-col px-64 pt-16 pb-14 mt-0 w-full max-w-[1600px] min-h-[804px] max-md:px-5 max-md:mt-0 max-md:max-w-full">
        <img
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/f10cab0e5abf36e41741d3fdea3d4c62fcfe9615?placeholderIfAbsent=true"
          alt="Background"
          className="object-cover absolute inset-0 size-full"
        />

        <MinistryHeading />

        <div className="flex relative flex-wrap gap-8 items-start pt-1 pb-4 max-w-full w-[1080px]">
          <MinistryContent />
          <MinistryImage />
        </div>
      </div>
    </section>
  );
}
