"use client";

import * as React from "react";
import { IconWrapper } from "./IconWrapper";

interface StatCardProps {
  iconSrc: string;
  amount: string;
  title: string;
}

export const StatCard: React.FC<StatCardProps> = ({ iconSrc, amount, title }) => {
  return (
    <article className="flex flex-1 shrink gap-4 items-center pt-6 pb-6 mt-5 rounded-lg border border-solid basis-0 bg-stone-50 border-[color:var(--colour-stroke-default,#D5D5D5)] min-w-[200px] px-6 max-md:px-5">
      <IconWrapper src={iconSrc} />
      <div className="flex flex-col justify-center self-stretch my-auto h-[54px]">
        <h3 className="text-2xl font-bold text-black leading-[28px]">
          {amount}
        </h3>
        <p className="text-base leading-[24px] text-neutral-500">
          {title}
        </p>
      </div>
    </article>
  );
};
