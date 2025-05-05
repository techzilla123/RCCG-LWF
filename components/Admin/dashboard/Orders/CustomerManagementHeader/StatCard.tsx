"use client";

import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => {
  return (
    <article className="flex gap-4 justify-center items-center p-6 rounded-lg border border-solid bg-stone-50 border-neutral-300 flex-[1_0_0] min-w-[200px] max-md:p-5 max-sm:p-4 max-sm:min-w-full">
      <div className="flex gap-2.5 justify-center items-center w-14 h-14 bg-white rounded-[100px]">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold leading-7 text-black">{value}</h3>
        <p className="text-base leading-6 text-neutral-500">{label}</p>
      </div>
    </article>
  );
};