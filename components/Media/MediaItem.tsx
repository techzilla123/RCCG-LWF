"use client";
import * as React from "react";

interface MediaItemProps {
  icon?: string;
  title: string;
}

export function MediaItem({ icon, title }: MediaItemProps) {
  return (
    <div className="flex gap-4 justify-center items-start w-full max-w-[550px]">
      <div className="flex flex-col justify-center w-8">
        <div className="w-full">
          <div className="flex items-start w-full">
            {icon ? (
              <img
                src={icon}
                alt=""
                className="object-contain w-8 aspect-square"
              />
            ) : (
              <div className="w-8 h-8" />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start pb-2.5 text-xl font-medium leading-relaxed text-white whitespace-nowrap min-w-60 w-[247px]">
        <div className="flex items-start">
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
}
