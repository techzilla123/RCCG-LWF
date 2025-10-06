import * as React from "react";
import { Montserrat } from "next/font/google";

// Load Montserrat with weight 800 only
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

export const EventsHeader: React.FC = () => {
  return (
    <header className="max-w-[1300px] text-slate-900 max-md:max-w-full">
      <h2
        className={`${montserrat.className} text-[17px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-none font-normal whitespace-nowrap`}
      >
        Happening at RCCG Living Word Forney !!!
      </h2>
    </header>
  );
};
