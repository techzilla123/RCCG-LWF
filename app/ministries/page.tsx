'use client'

import React from 'react';
import ChurchHeader from "@/components/Header/ChurchHeader"
import Header from "@/components/MinistriesMain/Header"
import MinistryTabs from '@/components/MinistriesMain/MinistryTabs';

// import { HeroSection } from '@/components/AboutSection/HeroSection';
// import { WelcomeSection } from '@/components/AboutSection/WelcomeSection';
// import VisionMissionBeliefs from '@/components/AboutSection/VisionMissionBeliefs';
// import MinistrySection from '@/components/AboutSection/MinistrySection';

const ChurchWebsite: React.FC = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />
      <div className="w-full min-h-screen bg-gray-50">
       <ChurchHeader />
       <Header />
       <MinistryTabs />
       
        
     
      </div>
    </>
  );
};

export default ChurchWebsite;
