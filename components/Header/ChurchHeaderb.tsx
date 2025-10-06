import * as React from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { LiveSection } from "./LiveSection";

export const ChurchHeaderb: React.FC = () => {
  return (
    <header
  className="relative w-full h-[61px] bg-cover bg-center"
  
>
      <AnnouncementBar />

      <div className="absolute left-0 w-full h-[43px] top-[33px] z-[5]">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/d6f10c255fb741589277e72738b85c3ad408fe64?width=2894"
          alt=""
          className="w-full rounded-3xl border-white border-solid backdrop-blur-[2.5px] border-[1.5px] h-[61px]"
        />
      </div>

      <Logo />
      <Navigation />
      <LiveSection />
    </header>
  );
};

export default ChurchHeaderb;
