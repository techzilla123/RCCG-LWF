"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Racing_Sans_One } from "next/font/google";

const racingSansOne = Racing_Sans_One({
  weight: "400",
  subsets: ["latin"],
});

export const Logo: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <section
      onClick={handleClick}
      className="absolute left-4 md:left-8 h-[50px] md:h-[67px] top-[38px] md:top-[34px] w-[200px] md:w-[305px] z-[15] cursor-pointer hover:opacity-85 transition-opacity duration-200"
    >
      <div className="absolute left-0 top-2 md:top-2.5 h-[35px] md:h-[45px] w-full">
        <h2
          className={`absolute top-0 left-0 h-5 md:h-6 text-indigo-700 w-[50px] md:w-[73px] ${racingSansOne.className} text-base md:text-xl`}
        >
          RCCG
        </h2>
        <h3
          className={`absolute h-6 md:h-8 left-[80px] md:left-[126px] text-slate-700 top-[10px] md:top-[13px] w-[120px] md:w-[179px] ${racingSansOne.className} text-sm md:text-lg`}
        >
          Living Word Forney
        </h3>
      </div>
      <img
        src="/LWF 2 Logo.png"
        alt="RCCG Living Word Forney Logo"
        className="absolute top-0 h-[50px] md:h-[67px] left-[35px] md:left-[52px] w-[54px] md:w-[72px]"
      />
    </section>
  );
};
