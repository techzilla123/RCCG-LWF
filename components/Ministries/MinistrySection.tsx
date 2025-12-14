"use client";
import * as React from "react";
import MinistryCarousel from "./MinistryCarousel";

export default function MinistrySection() {
  return (
    <section
      id="ministry-section"
      className="flex flex-col items-center w-full bg-white max-md:py-24 transition-all duration-[1200ms] ease-out opacity-100 translate-y-0"
      style={{
        marginTop: "-30px", // keeps alignment with EventsSection
      }}
    >
      <MinistryCarousel />
    </section>
  );
}
