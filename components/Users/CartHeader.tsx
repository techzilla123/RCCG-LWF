"use client";

import * as React from "react";
import { Breadcrumbs } from "./Cart/Breadcrumbs";
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
    { label: "Cart", isActive: false },
  ];

  return (
    <header className="flex overflow-hidden relative flex-col justify-center items-start px-6 py-10 bg-stone-50 max-md:px-5 max-md:max-w-full">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/bc8eb3e895379dab5de94acda656320ec8e34b21?placeholderIfAbsent=true"
        alt=""
        role="presentation"
        className="object-contain absolute bottom-0 z-0 max-w-full  aspect-[1.99] h-[210px] -right-[10px] w-[251px]"
        style={{ marginBottom: "-53px" }}
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
          Shopping Cart
        </h1>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/ee7a10fb933b9ecd800e8d569536259068a013c7?placeholderIfAbsent=true"
        alt=""
        role="presentation"
        className="object-contain absolute top-0 -left-6 z-0 max-w-full aspect-[1.98] h-[161px] w-[212px]"
        style={{ marginTop: "-30px" }}
      />
    </header>
  );
}
