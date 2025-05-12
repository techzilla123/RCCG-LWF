"use client";

import React from "react";
import CountUp from "react-countup";

interface StatItemProps {
  number: number;
  label: string;
  hasBorder?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ number, label, hasBorder }) => (
  <div
    className={`flex flex-col ${hasBorder ? "pr-6 border-r border-gray-300" : "pl-6"}`}
  >
     <strong className="text-3xl max-[384px]:text-2xl font-semibold text-black">
      <CountUp end={number} duration={20.5} separator="," />+
    </strong>
    <span className="text-sm max-[384px]:text-xs text-black-500">{label}</span>
  </div>
);

export const HeroStats = () => {
  return (
    <div className="flex gap-6 mt-6 flex-wrap">
      <StatItem number={30000} label="Happy Customers" hasBorder />
      <StatItem number={10000} label="High Quality Products" />
    </div>
  );
};
