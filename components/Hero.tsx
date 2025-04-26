"use client";
import * as React from "react";
import { HeroHeadline } from "./Hero/HeroHeadline";
import { HeroButton } from "./Hero/HeroButton";
import { HeroStats } from "./Hero/HeroStats";
import { Inter } from 'next/font/google';

const inter = Inter({
  weight: '600', // Medium
  subsets: ['latin'],
  variable: '--font-inter',
});


function Hero() {
  return (
    <section className="relative flex flex-col justify-center items-start px-20 pt-10 max-md:px-5 h-[calc(100vh-80px)]">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/721d5187d521e16fa4f3a607a55355c5db29fc21?placeholderIfAbsent=true"
        alt="Hero background"
        className="absolute inset-0 object-cover w-full h-full z-0"
      />
      <div className="relative z-10 max-w-[550px] text-left">
        <HeroHeadline />
        <p
      className={`${inter.variable} font-[var(--font-inter)] text-[20px] leading-[26px] text-black mt-6`}
    >
      Your one-stop shop for all colorful party supplies,
      <br />
      rentals & decorations made for kids and those who love them
    </p>
        <HeroButton />
        <HeroStats />
      </div>
    </section>
  );
}

export default Hero;
