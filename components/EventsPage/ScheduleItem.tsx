"use client";
import * as React from "react";

interface ScheduleItemProps {
  title: string;
  time: string;
  date: string;
  description: string;
  imageUrl: string;
  backgroundColor: string;
}

export const ScheduleItem: React.FC<ScheduleItemProps> = ({
  title,
  time,
  date,
  description,
  imageUrl,
  backgroundColor,
}) => {
  return (
    <article
      className={`flex flex-col md:flex-row gap-5 items-start p-4 w-full ${backgroundColor} rounded-2xl max-sm:p-3`}
    >
      {/* Image Section */}
      <div className="flex-shrink-0 w-full md:w-[180px] h-[135px] md:h-[135px] rounded-xl overflow-hidden relative max-sm:h-[180px]">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-2">
          <h3 className="text-2xl md:text-2xl max-md:text-xl max-sm:text-lg font-semibold text-stone-950">
            {title}
          </h3>
          <time className="text-base md:text-lg max-sm:text-sm text-stone-950">
            {time}
          </time>
        </div>
        <time className="text-sm md:text-base text-stone-950">{date}</time>
        <p className="text-base max-sm:text-sm text-neutral-700">{description}</p>
      </div>
    </article>
  );
};
