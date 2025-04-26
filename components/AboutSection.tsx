"use client";
import * as React from "react";
import { AboutContent } from "./AboutSection/AboutContent";
import { AboutImage } from "./AboutSection/AboutImage";

export default function AboutSection() {
  return (
    <section className="flex overflow-hidden flex-wrap gap-0 justify-center items-center self-stretch py-20 pr-12 pl-32 bg-white max-md:px-5">
      <AboutContent />
      <AboutImage />
    </section>
  );
}
