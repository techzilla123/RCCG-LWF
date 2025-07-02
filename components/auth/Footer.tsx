"use client";
import * as React from "react";
import { FooterLegalLinks } from "./Footer/FooterLegalLinks";

export default function Footer() {
  return (
    <footer className="flex gap-6 justify-center items-center px-32 py-2 h-10 bg-sky-800 max-md:px-16 max-md:py-2 max-sm:flex-col max-sm:gap-3 max-sm:px-5 max-sm:py-2 w-full">
      <div className="flex gap-6 items-center text-sm leading-6 text-white">
        <div>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9945c24e741818d7446e346124e9a018ae3c839f?placeholderIfAbsent=true" className="h-[25px] w-[33px]" alt="logo" />
        </div>
        <span>
          Copyright © 2025 Party Place & Rentals. All Rights Reserved.
        </span>
      </div>
      <FooterLegalLinks />
    </footer>
  );
}
