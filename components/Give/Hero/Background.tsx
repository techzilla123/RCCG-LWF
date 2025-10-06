"use client";
import * as React from "react";
import GivingHero from "./GivingHero";

function Background() {
  return (
    <div className="relative flex flex-col text-white leading-7 min-h-[465px] px-8 md:px-20 lg:px-40">
      {/* Background Image */}
      <img
        src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/3960d992d5c4ff6d2ca40a21fefa0b62a678c411?placeholderIfAbsent=true"
        alt="Background image for giving section"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Hero */}
      <GivingHero />
    </div>
  );
}

export default Background;
