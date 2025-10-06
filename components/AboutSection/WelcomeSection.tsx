import React from 'react';
import { WelcomeContent } from './WelcomeContent';
import { ChurchImageSection } from './ChurchImageSection';

export const WelcomeSection: React.FC = () => {
  return (
    <section className="relative px-0 py-20 bg-gray-50 max-sm:px-0 max-sm:py-16 overflow-hidden">
      {/* Background Shape */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center">
        <img
          src="/Bg Shape.png" // Replace with your image path
          alt="Background Shape"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Content Wrapper */}
      <div className="px-6 py-0 mx-auto my-0 max-w-[1200px] max-sm:px-4 max-sm:py-0 relative z-10">
        <div className="grid gap-20 items-start grid-cols-[1fr_1fr] max-md:gap-16 max-md:grid-cols-[1fr] max-sm:gap-10">
          <WelcomeContent />
          <ChurchImageSection />
        </div>
      </div>
    </section>
  );
};
