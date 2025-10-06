// FindYourFit.tsx
import React from "react";
import { HeroSection } from "./HeroSection";
import { ServiceGrid } from "./ServiceGrid";
import { CallToActionSection } from "./CallToActionSection";

export const FindYourFit: React.FC = () => {
  return (
    <main className="flex flex-col bg-white">
      <HeroSection />
      <ServiceGrid />
      <CallToActionSection />
    </main>
  );
};

export default FindYourFit;
