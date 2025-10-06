"use client";
import * as React from "react";
import { EventDetails } from "./EventDetails";
import { ActionButtons } from "./ActionButtons";
import { BrandStrip } from "./BrandStrip";

export function HeroSection() {
  return (
    <main className="flex flex-col w-full ">
      <section className="relative flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 pt-16 pb-10 w-full min-h-[70vh]">
        {/* Background */}
        <img
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/b511bc3850dd97ef41502588ce51ab1a60d43bb1?placeholderIfAbsent=true"
          alt="Conference background"
          className="absolute inset-0 object-cover w-full h-full "
        />

        {/* Content wrapper */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full max-w-7xl">
          {/* Text Section */}
          <article className="flex flex-col items-start justify-center w-full lg:w-1/2 text-center lg:text-left">
            <EventDetails
              date="15–17 November, Living Word Forney"
              title="Living Word Conference 2025"
              description="Living Word Conference 2025: Three days of powerful worship, inspiring messages, and life-transforming encounters with God."
            />
            <ActionButtons primaryText="View Details" secondaryText="See Schedule" />
          </article>

          {/* Image Section */}
          <div className="flex justify-center w-full lg:w-1/2">
            <img
              src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/6c9703e04c6218ec292eb9afbb4cbe5d2ecf9919?placeholderIfAbsent=true"
              alt="Conference speaker or event imagery"
              className="object-contain rounded-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full"
            />
          </div>
        </div>

        {/* Decorative Elements */}
        <img
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/b330258210c48828dc2d34f94bd8cb13a0bbb1d4?placeholderIfAbsent=true"
          alt="Decorative element"
          className="absolute bottom-4 left-4 h-16 w-16 md:h-20 md:w-20"
        />
        <img
          src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/7ce763b53d426ebce0615de481ad7a8009dfcc82?placeholderIfAbsent=true"
          alt="Decorative accent"
          className="absolute top-1/3 right-1/4 h-6 w-6 md:h-8 md:w-8"
        />
      </section>

      <BrandStrip />
    </main>
  );
}

export default HeroSection;
