"use client";

import React from "react";
import { MetricCardProps } from "./types";

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  figure,
  growthRate,
}) => {
  return (
    <article className="flex flex-col flex-1 shrink justify-center pt-6 pb-24 rounded-lg border border-solid basis-0 bg-stone-50 border-neutral-300 min-w-40 pl-[var(--properties-padding-padding-lg,] pr-[var(--properties-padding-padding-lg,] max-md:px-5">
      <header className="flex gap-1 justify-center items-center w-full">
        <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-6 h-6 bg-white min-h-6 rounded-[100px]">
          <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-4">
            <img
              src={icon}
              alt=""
              className="object-contain self-stretch my-auto w-4 aspect-square"
            />
          </div>
        </div>
        <h2 className="flex-1 shrink self-stretch my-auto text-base tracking-normal leading-6 basis-0 text-neutral-500">
          {title}
        </h2>
      </header>

      <div className="flex flex-wrap gap-2 content-center items-center mt-4 w-full rounded-lg">
        <p className="self-stretch my-auto text-2xl font-semibold tracking-normal leading-7 text-black">
          {figure}
        </p>
        <div className="self-stretch my-auto min-h-[34px]">
          <p className="text-xs font-medium tracking-normal leading-3 text-neutral-500">
            Growth rate
          </p>
          <div className="flex flex-1 items-center h-full rounded-lg">
            <p className="self-stretch my-auto text-sm tracking-normal leading-6 text-black">
              {growthRate}
            </p>
            <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/f842f35b5a0800c849fcc79d2bb38ba019a8f696?placeholderIfAbsent=true"
                alt="Trend indicator"
                className="object-contain self-stretch my-auto w-3 aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
