"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnnouncementBar } from "./AnnouncementBar";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { LiveSection } from "./LiveSection";

export const ChurchHeader: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <header className="relative w-full bg-white h-[90px] md:h-[101px]">
      <AnnouncementBar />

      <div className="absolute left-0 w-full h-[43px] top-[33px] z-[5]">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/d6f10c255fb741589277e72738b85c3ad408fe64?width=2894"
          alt=""
          className="w-full rounded-3xl border-white border-solid backdrop-blur-[2.5px] border-[1.5px] h-[43px]"
        />
      </div>

      {/* Clickable Logo */}
      <div onClick={handleLogoClick} className="cursor-pointer hover:opacity-85 transition-opacity duration-200">
        <Logo />
      </div>

      <Navigation />
      <LiveSection />
    </header>
  );
};

export default ChurchHeader;
