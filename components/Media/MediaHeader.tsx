"use client";
import * as React from "react";

export function MediaHeader() {
  return (
    <header className="relative pt-7 pb-6 max-w-full w-[1080px]">
      <div className="flex flex-col w-full min-h-px max-md:max-w-full">
        <h2 className="pb-2.5 w-full text-4xl font-light leading-snug text-center text-white uppercase max-md:max-w-full">
          <div className="max-md:max-w-full">
            WATCH | LISTEN | READ
          </div>
        </h2>
        <div className="self-center pb-5 mt-1 max-w-full w-[200px]">
          <div className="flex shrink-0 border-t-2 border-solid border-t-red-500 h-[3px]" />
        </div>
      </div>
    </header>
  );
}
