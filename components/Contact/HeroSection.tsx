// HeroSection.tsx
import React from 'react';

function HeroSection() {
  return (
    <section className="relative w-full min-h-[70vh] lg:min-h-screen">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/e044b2dacf4136ab5d306525888066b68aa421de?width=2880"
        alt="Church background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center">
        <div className="px-6 md:px-12 lg:px-24 max-w-5xl">
          <p className="mb-4 text-sm md:text-lg text-orange-200 tracking-wider">
            CONTACT
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase">
            Get in touch with
            <br />
            our church
          </h1>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

