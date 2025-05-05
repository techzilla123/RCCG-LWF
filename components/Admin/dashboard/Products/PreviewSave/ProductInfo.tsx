"use client";
import * as React from "react";

export const ProductInfo = () => {
  return (
    <section className="mt-6 w-full rounded-lg">
      <div className="flex flex-col justify-center w-full">
        <span className="gap-1 self-start px-1.5 py-px text-xs tracking-normal leading-loose text-black bg-green-100 rounded">
          25 In-stock
        </span>

        <h1 className="mt-3 text-2xl text-black">
          All-In-One Happy Birthday Bash Décor Kit
        </h1>

        <div className="flex flex-wrap gap-2 items-start mt-3 w-full text-sm tracking-normal leading-6 text-black">
          {["Balloons", "Birthday", "Weddings"].map((tag, index) => (
            <span key={index} className="text-sm text-black leading-[24px]">
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-2 mt-3 w-full">
          <div className="flex flex-wrap gap-1 items-center w-full">
            <span className="text-xl font-semibold text-black leading-[24px]">
              $400
            </span>
            <span className="text-sm leading-[24px] min-w-10 text-neutral-500 line-through">
              $100
            </span>
            <span className="gap-1 self-stretch px-1.5 my-auto text-xs tracking-normal leading-loose text-amber-500 bg-yellow-50 rounded">
              25% off
            </span>
          </div>

          <p className="mt-1.5 text-sm font-medium tracking-normal leading-6">
            <span className="text-neutral-500">Ends in:</span>{" "}
            <span className="text-rose-600">4d 04h 25m 40s</span>
          </p>
        </div>
      </div>
    </section>
  );
};