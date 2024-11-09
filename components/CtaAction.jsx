"use client";

import React from 'react';

const CtaAction = () => {
  // Handle Pay Now button click
  const handlePayNow = () => {
    console.log('Pay Now clicked');
    window.location.href = '/client';  // Navigate to /client without using a router
  };

  return (
    <section className="flex justify-center items-center px-8 py-20 w-full bg-white text-center max-md:px-5">
      <div className="flex flex-col items-center px-8 py-10 bg-neutral-100 rounded-3xl w-full max-w-[768px] min-w-[240px] my-auto">
        {/* Logo Image */}
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/86198595b18ba5d8653ca6b90ded15524b366e4eeb5db260956d4b3111f1a5a1?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
          alt="Company logo" 
          className="object-contain w-[120px] max-w-full aspect-[2.14]" 
        />

        {/* Heading and Subheading */}
        <div className="flex flex-col mt-8 w-full text-center">
          <h2 className="text-2xl font-semibold text-green-900">
            Ready to start exploring financial possibilities?
          </h2>
          <p className="mt-2 text-base text-black">
            Make payments now or login to your dashboard
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-8 w-full flex justify-center">
          <button
            onClick={handlePayNow}
            className="px-6 py-3 h-10 w-[186px] bg-[#08AA3B] text-white rounded-full hover:bg-green-700 transition-all"
            aria-label="Pay Now"
          >
            Pay Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaAction;
