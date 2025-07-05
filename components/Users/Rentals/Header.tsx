"use client";

import * as React from "react";
import { Breadcrumbs } from "./BalloonHeader/Breadcrumbs";
import { ShopNavigation } from "./BalloonHeader/ShopNavigation";
import { Coiny } from "next/font/google";
import { useRouter } from "next/navigation"; // Import useRouter

const coiny = Coiny({
  weight: "400",
  subsets: ["latin"],
});

export default function WishHeader() {
  const router = useRouter(); // Initialize router

  const breadcrumbItems = [
    { label: "Home", isActive: true, onClick: () => router.push("/") }, // Added onClick for Home
    { label: "Rentals", isActive: false },
  ];

  return (
    <header className="flex overflow-hidden relative flex-col justify-center items-start px-6 py-10 bg-[#FFF6E5] max-md:px-5 max-md:max-w-full">
      <img
        src="/bg-right(4).png"
        alt=""
        role="presentation"
        className="object-contain absolute bottom-0 z-0 max-w-full  aspect-[1.99] h-[169.43px] -right-[10px] w-[224.2px]"
        style={{ marginBottom: "0px" }}
      />
      <div className="flex z-0 flex-col justify-center items-center self-center">
        <Breadcrumbs items={breadcrumbItems} />
        <h1
          className={`${coiny.className} text-[48px] whitespace-nowrap z-10 max-md:text-4xl`}
          style={{
            color: "black",
            textShadow: `
              2px 2px 0 white,
              -2px -2px 0 white,
              2px -2px 0 white,
              -2px 2px 0 white,
              3px 3px 0 black
            `,
          }}
        >
          Rentals
        </h1>
        <h3 className="text-xl italic tracking-normal leading-8 text-black -mt-2 text-center max-w-md mx-auto px-2 max-md:text-base max-md:leading-6 max-md:mt-4">
  Everything you need to rent, celebrate, and create unforgettable moments.
</h3>

        <ShopNavigation />
      </div>
      <img
        src="/bg-right(3).svg"
        alt=""
        role="presentation"
        className="object-contain absolute top-0 -left-5 z-0 max-w-full aspect-[1.98] h-[161px] w-[197.87px]"
        style={{ marginTop: "-15px" }}
      />
    </header>
  );
}
