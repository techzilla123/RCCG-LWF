'use client'

import React from 'react';
import ChurchHeader from "@/components/Header/ChurchHeader"
import { HeroSection } from '@/components/AboutSection/HeroSection';
import { WelcomeSection } from '@/components/AboutSection/WelcomeSection';
import VisionMissionBeliefs from '@/components/AboutSection/VisionMissionBeliefs';
import MinistrySection from '@/components/AboutSection/MinistrySection';

const ChurchWebsite: React.FC = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />
      <div className="w-full min-h-screen bg-gray-50">
       <ChurchHeader />
        <HeroSection />
        <WelcomeSection />
        <VisionMissionBeliefs />
        <MinistrySection />
      </div>
    </>
  );
};

export default ChurchWebsite;
