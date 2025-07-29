"use client";
import * as React from "react";

interface ActionButtonProps {
  label: string;
  iconSrc: string;
  onClick?: () => void; // <-- add this line
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  iconSrc,
  onClick, // <-- receive the prop
}) => {
  return (
    <button
      onClick={onClick} // <-- add this
      className="flex gap-2 justify-center items-center self-start mt-2.5 bg-white rounded-[50px] py-2.5 px-6"
    >
      <span className="self-stretch my-auto text-base font-medium tracking-normal leading-6 text-center text-black">
        {label}
      </span>
      <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-4">
        <img
          src={iconSrc}
          alt=""
          className="object-contain self-stretch my-auto w-4 aspect-square"
        />
      </div>
    </button>
  );
};
