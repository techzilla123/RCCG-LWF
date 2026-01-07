"use client";

import React from "react";
import dynamic from "next/dynamic";
import { BeliefAccordion } from "./BeliefAccordion";
import { CoreValuesSection } from "./CoreValuesSection";

// Dynamic import for client-only rendering
const VisionMissionSection = dynamic(
  () => import("./VisionMissionSection"), // adjust the path if needed
  { ssr: false }
);

export const VisionMissionBeliefs: React.FC = () => {
  return (
    <main className="flex flex-col items-center px-4 mt-3">
      <VisionMissionSection />

      <section
        id="our-beliefs"
        className="flex flex-col items-center gap-8 mt-20 w-full max-w-4xl text-center"
      >
        <h2 className="text-3xl md:text-4xl font-black">Our Core Values</h2>
        <BeliefAccordion />
      </section>

      <CoreValuesSection />
    </main>
  );
};

export default VisionMissionBeliefs;
