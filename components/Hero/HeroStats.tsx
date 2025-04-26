import React from "react";

interface StatItemProps {
  number: string;
  label: string;
  hasBorder?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ number, label, hasBorder }) => (
  <div
    className={`flex flex-col ${hasBorder ? "pr-6 border-r border-gray-400" : "pl-6"}`}
  >
    <strong className="text-3xl font-semibold text-black">{number}</strong>
    <span className="text-sm text-neutral-500">{label}</span>
  </div>
);

export const HeroStats = () => {
  return (
    <div className="flex gap-6 mt-6">
      <StatItem number="30,000+" label="Happy Customers" hasBorder />
      <StatItem number="2,000" label="High Quality Products" />
    </div>
  );
};
