import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
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
      
      {/* Text Body */}
      <div
        data-layername="textBody"
        className="flex z-0 flex-col flex-1 shrink py-16 my-auto basis-0 min-w-[240px] w-full max-md:max-w-full"
      >
        {/* Header Text */}
        <div data-layername="headerText" className="flex flex-col w-full max-md:max-w-full">
          <h1
            data-layername="displayText"
            className="text-4xl sm:text-5xl font-bold text-yellow-600 max-md:max-w-full max-md:text-3xl max-sm:font-semibold"
          >
            Get the money you need to fund all your{" "}
            <span className="text-yellow-600">financial plans!</span>
          </h1>
          <p
            data-layername="supportingText"
            className="mt-6 text-xl sm:text-2xl text-black max-md:max-w-full"
          >
            Make payments, track transactions, and manage your service—all in one place.
          </p>
        </div>

        {/* Call to Action Button */}
        <div
          data-layername="cta"
          className="flex gap-2 items-center mt-8 w-full text-sm font-medium text-center text-white max-md:max-w-full"
        >
          <Button
            asChild
            className="bg-green text-white w-[180px] h-[40px] font-[500] hover:bg-green rounded-[1000px]"
          >
            <Link href="/client">Pay Now</Link>
          </Button>
          <Button
            asChild
            className=" text-white w-[180px] h-[40px] font-[500] hover:bg-green rounded-[1000px]"
            style={{ color: "#000000", border: "1px solid #717171", padding: "8px 16px", textDecoration: "none",  backgroundColor: "transparent" }}
          >
            <Link href="/client/history">History</Link>
          </Button>
        </div>
        
      </div>

      {/* Image Section (hidden on small screens) */}
      <div
        data-layername="image"
        className="flex z-0 flex-1 shrink bg-gray-200 basis-0 h-[482px] min-w-[240px] rounded-[40px] w-[500px] max-sm:hidden"
        aria-hidden="true"
      />
    </section>
  );
}

export default HeroSection;
