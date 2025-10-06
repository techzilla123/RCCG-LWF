"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export const ReadStoryButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/about");
  };

  return (
    <div className="flex flex-col items-center pt-2.5 mt-1 w-full text-sm font-medium tracking-normal leading-none text-white">
      <div className="flex justify-center items-center min-h-12">
        <button
          onClick={handleClick}
          className="flex overflow-hidden flex-col justify-center items-center bg-slate-700 rounded-[100px] hover:bg-slate-600 transition-colors"
        >
          <div className="flex gap-2 justify-center items-center px-4 py-2.5">
            <img
              src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/bbe7960a1af99f31f682203bffb77f66a12c8447?placeholderIfAbsent=true"
              className="object-contain shrink-0 w-5 aspect-square"
              alt="Arrow icon"
            />
            <span className="text-sm tracking-normal leading-5">Read Our Story</span>
          </div>
        </button>
      </div>
    </div>
  );
};
