"use client";

import * as React from "react";

export const ProductHeader: React.FC = () => {
  return (
    <header className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
      <h2 className="self-stretch my-auto text-2xl text-black">New Arrivals</h2>
    </header>
  );
};
