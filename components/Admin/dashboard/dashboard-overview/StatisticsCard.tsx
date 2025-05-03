import React from "react";

interface StatisticsCardProps {
  icon: string;
  title: string;
  value: string;
  growth: {
    value: string;
    trend: string;
  };
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  icon,
  title,
  value,
  growth,
}) => {
  return (
    <article className="flex flex-col flex-1 shrink justify-center pt-6 pb-6 shadow-sm border rounded-lg basis-0 bg-stone-50 min-w-40">
      <div className="flex gap-1 justify-center items-center w-full px-4">
        <div className="flex justify-center items-center w-6 h-6 bg-white rounded-full">
          <img src={icon} alt="" className="w-4 h-4" />
        </div>
        <h3 className="flex-1 text-base leading-6 text-neutral-500">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-2 content-center items-center mt-4 w-full px-4">
        <p className="text-2xl font-semibold leading-7 text-black">{value}</p>
        <div className="min-h-[34px] ml-2">
          <p className="text-xs font-medium leading-3 text-neutral-500">
            Growth rate
          </p>
          <div className="flex items-center">
            <span className="text-sm leading-6 text-black">{growth.value}</span>
            <img src={growth.trend} alt="" className="w-3 h-3 ml-1" />
          </div>
        </div>
      </div>
    </article>
  );
};
