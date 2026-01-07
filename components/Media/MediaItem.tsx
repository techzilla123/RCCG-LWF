"use client";
import * as React from "react";

interface MediaItemProps {
  icon?: string;
  title: string;
  url?: string; // optional URL to make media clickable
}

export function MediaItem({ icon, title, url }: MediaItemProps) {
  const content = (
    <div className="flex gap-4 justify-center items-start w-full max-w-[550px] cursor-pointer hover:opacity-80 transition">
      <div className="flex flex-col justify-center w-8">
        <div className="w-full">
          <div className="flex items-start w-full">
            {icon ? (
              <img
                src={icon}
                alt={title}
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

  // Wrap in <a> if URL is provided
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}
