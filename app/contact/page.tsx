"use client"

import React from 'react';
import ChurchHeader from "@/components/Header/ChurchHeader"
import ContactSection from "@/components/Contact/ContactSection"
import Header from "@/components/Contact/Header"
import Footer from '@/components/Footer/Footer';

const ChurchWebsite: React.FC = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      />

      <div className="w-full min-h-screen bg-gray-50">
        
        <ChurchHeader />

        {/* Move Header upward */}
        <div className="-mt-5"> 
          <Header />
        </div>

        <ContactSection />
        <Footer />
      </div>
    </>
  );
};

export default ChurchWebsite;
