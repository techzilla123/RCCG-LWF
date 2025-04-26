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
    { label: "Shop", isActive: true, onClick: () => router.push("/shop") }, // Added onClick for Home
    { label: "Decorations", isActive: false },
  ];

  return (
    <header className="flex overflow-hidden relative flex-col justify-center items-start px-6 py-10 bg-[#FFF4FD] max-md:px-5 max-md:max-w-full">
      <img
        src="/bg-right(6).svg"
        alt=""
        role="presentation"
        className="object-contain absolute bottom-0 z-0 max-w-full  aspect-[1.99] h-[169.43px] -right-[10px] w-[224.2px]"
        style={{ marginBottom: "-23px" }}
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
          Decorations
        </h1>
        <h3 className="text-xl italic tracking-normal leading-8 text-black -mt-2 ">
        Remake what you see like you want it to be seen!
    </h3>
        <ShopNavigation />
      </div>
      <img
        src="/bg-right(5).svg"
        alt=""
        role="presentation"
        className="object-contain absolute top-0 -left-5 z-0 max-w-full aspect-[1.98] h-[161px] w-[197.87px]"
        style={{ marginTop: "-27px" }}
      />
    </header>
  );
}
