import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import RandomImage from "./RandomImage";

function HeroSection() {
  return (
    <section
      data-layername="sectionHero"
      className="flex relative z-0 gap-10 px-8 pt-[35.6px] pb-20 w-full bg-teal-50 sm:px-16 sm:pt-[45px] md:px-32 md:pt-[55px] max-md:px-5 max-md:pt-[40px]"
    >
      {/* Hero Image */}
      <img
        loading="lazy"
        src="/herod.png"
        alt=""
        className="object-contain absolute inset-x-0 z-0 self-start aspect-[3.39] bottom-[137px] top-[200px] w-[1280px] max-md:max-w-full max-md:top-[150px]"
      />

<div
  className="flex flex-col-reverse md:flex-row gap-10 items-center w-full"
>
  {/* Text Section */}
  <div
    data-layername="textBody"
    className="flex z-0 flex-col flex-1 shrink py-16 my-auto basis-0 min-w-[240px] w-full max-md:max-w-full"
  >
    {/* Header Text */}
    <div data-layername="headerText" className="flex flex-col w-full max-md:max-w-full">
      <h1
        data-layername="displayText"
        className="text-4xl sm:text-5xl font-bold text-yellow-600 max-md:max-w-full max-md:text-3xl max-sm:font-semibold"
        style={{ color: "#005E1E" }}
      >
        Get the money you need to fund all your{" "}
        <span className="text-yellow-600" style={{ color: "#B39200" }}>
          financial plans!
        </span>
      </h1>
      <p
        data-layername="supportingText"
        className="mt-6 text-xl sm:text-2xl text-black max-md:max-w-full"
        style={{
          fontFamily: "Roboto, sans-serif",
          fontSize: "24px",
          fontWeight: 400,
          lineHeight: "28.13px",
          width: "450px",
          textAlign: "left",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
        }}
      >
        Make payments, track transactions, and manage your service—all in one place.
      </p>
    </div>

    {/* Call to Action Buttons */}
    <div
      data-layername="cta"
      className="flex gap-2 items-center mt-8 w-full text-sm font-medium text-center text-white max-md:max-w-full"
    >
      <Button
        asChild
        className="w-[180px] h-[40px] font-medium rounded-full text-white bg-green 
                   hover:bg-[#00782A] active:bg-green-800 transition-all duration-300 ease-in-out"
      >
        <Link href="/client">Pay Now</Link>
      </Button>

      <Button
        asChild
        className="w-[180px] h-[40px] font-medium bg-transparent rounded-full text-black border border-gray-500 
                   hover:bg-gray-300 active:bg-gray-300 transition-all duration-300 ease-in-out"
      >
        <Link href="/client/history">History</Link>
      </Button>
    </div>
  </div>

  {/* RandomImage Section - Moves below text only between 645px and 1092px */}
  <div className="md:hidden lg:flex lg:flex-1">
    <RandomImage />
  </div>
</div>

    </section>
  );
}

export default HeroSection;
