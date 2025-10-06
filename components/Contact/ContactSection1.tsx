"use client";
import * as React from "react";
import { Montserrat } from "next/font/google";

// Load Montserrat with desired weights
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"], // normal and bold
});

interface ContactSectionProps {
  className?: string;
}

function ContactSection1({ className = "" }: ContactSectionProps) {
  return (
    <section
      className={`absolute top-40 left-[110px] z-[1] 
      max-md:left-[60px] max-md:top-[140px] 
      max-sm:left-5 max-sm:top-[100px] ${className}`}
    >
      <p className="mb-9 text-base text-orange-200 uppercase max-md:text-base max-sm:mb-5 max-sm:text-sm">
        Contact
      </p>

      {/* Desktop / PC version (one full line) */}
      <h1
        className={`${montserrat.className} text-5xl font-bold tracking-tight text-white uppercase leading-[64px] w-[700px] 
        max-md:hidden`}
      >
        Get in touch with our church
      </h1>

      {/* Mobile / Tablet version (two lines) */}
      <h1
        className={`${montserrat.className} hidden max-md:block text-4xl font-bold tracking-tight text-white uppercase leading-[48px] w-[320px] 
        max-sm:text-2xl max-sm:leading-8 max-sm:w-[260px]`}
      >
        Get in touch with
        <br />
        our church
      </h1>
    </section>
  );
}

export default ContactSection1;
