"use client";

import * as React from "react";

interface IconWrapperProps {
  src: string;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({ src }) => {
  return (
    <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-14 h-14 bg-white min-h-14 rounded-[100px]">
      <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-7">
        <img
          src={src}
          alt=""
          className="object-contain self-stretch my-auto w-7 aspect-square"
        />
      </div>
    </div>
  );
};