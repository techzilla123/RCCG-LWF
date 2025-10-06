"use client";
import * as React from "react";
import ContactSection1 from "./ContactSection1";

function Header() {
  return (
    <header className="overflow-hidden relative w-full h-[483px] max-md:h-[400px] max-sm:h-80">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/6b0a1e381cbd626351dad5ca0e065348e4a16af3?width=3000"
        alt=""
        className="object-cover absolute top-0 left-0 size-full"
      />
      <ContactSection1 />
    </header>
  );
}

export default Header;
