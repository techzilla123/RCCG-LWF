"use client";
import * as React from "react";
import { Montserrat } from "next/font/google";
import HeroDescription from "./HeroDescription";
import GiveNowButton from "./GiveNowButton";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "800"],
});

function GivingHero() {
  const handleGiveNowClick = () => {
    // Scroll smoothly down by ~600px (adjust as needed)
    window.scrollBy({ top: 600, behavior: "smooth" });
  };

  return (
    <section className="relative z-10 flex flex-col items-start pt-24 pb-20 text-left max-w-3xl">
      <h1
        className={`${montserrat.className} text-[56px] font-extrabold leading-tight max-md:text-4xl`}
      >
        <span>Your giving is changing</span>
        <br />
        <span>the world</span>
      </h1>

      <HeroDescription>
        We believe in the power of generosity! Here at The Elevation Church,
        tithing and offering are joyful ways to show our appreciation for God's
        blessings in our lives. Explore the different ways you can contribute
        below.
      </HeroDescription>

      <GiveNowButton onClick={handleGiveNowClick}>give now</GiveNowButton>
    </section>
  );
}

export default GivingHero;
