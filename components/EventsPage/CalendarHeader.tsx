"use client";
import * as React from "react";
import { CalendarIcon } from "./CalendarIcon";

export const CalendarHeader: React.FC = () => {
  return (
    <header className="box-border flex justify-between items-center px-6 py-8 w-full rounded-2xl bg-stone-950 max-md:flex-col max-md:gap-4 max-md:text-center max-sm:px-4 max-sm:py-6">
      <div className="flex gap-8 items-center max-md:flex-col max-md:gap-4">
        <div className="flex gap-2 items-center">
          <CalendarIcon />
          <h2 className="text-2xl tracking-tight leading-7 text-center text-white max-sm:text-lg">
            Calendar
          </h2>
        </div>
        <p className="text-2xl tracking-tight leading-7 text-center text-white max-sm:text-lg">
          January - December 2025
        </p>
      </div>
      <p className="text-2xl tracking-tight leading-7 text-center text-white max-sm:text-lg">
        Praise, Worship & Events
      </p>
    </header>
  );
};
