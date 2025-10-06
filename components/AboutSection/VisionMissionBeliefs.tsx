"use client";
import React from "react";
import { VisionMissionSection } from "./VisionMissionSection";
import { BeliefAccordion } from "./BeliefAccordion";
import { CoreValuesSection } from "./CoreValuesSection";

export const VisionMissionBeliefs: React.FC = () => {
  return (
    <main className="flex flex-col items-center px-4">
      <VisionMissionSection />

      <section className="flex flex-col items-center gap-8 mt-20 w-full max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-black">Our Beliefs</h2>
        <BeliefAccordion />
      </section>

      <CoreValuesSection />
    </main>
  );
};

export default VisionMissionBeliefs;
