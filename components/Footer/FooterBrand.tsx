import React from "react";
import Link from "next/link"; // If using Next.js for routing

export const FooterBrand = () => {
  return (
    <section className="flex flex-col text-left min-w-[220px] max-w-[280px] flex-1">
      <div className="w-[120px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/350f46024339da10e5db6603e7575c371940cb95?placeholderIfAbsent=true"
          alt="Party Place & Rentals Logo"
          className="object-contain w-full aspect-[4/3] h-[90px]"
        />
      </div>
      <p className="mt-6 text-sm leading-6 text-white">
        Your one-stop shop for everything party, from balloons and décor to rentals and themed supplies...
        <Link href="/about" className="underline hover:text-blue-300">more</Link>
      </p>
      <p className="mt-6 text-xs leading-5 text-stone-300">
        Copyright © 2025 Party Place & Rentals. All Rights Reserved.
      </p>
    </section>
  );
};
