"use client";
import * as React from "react";
// import { MinistryHeading } from "./MinistryHeading";
// import { MinistryContent } from "./MinistryContent";
// import { MinistryImage } from "./MinistryImage";
import MinistryCarousel from "./MinistryCarousel";

export default function MinistrySection() {
  return (
    <section className="flex flex-col items-center w-full bg-white rounded-none max-md:py-24">
      <MinistryCarousel />
    </section>
  );
}
