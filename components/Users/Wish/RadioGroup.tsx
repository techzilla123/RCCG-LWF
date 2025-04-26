"use client";
import * as React from "react";

interface RadioOption {
  label: string;
  selected?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  onChange?: (selectedIndex: number) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  onChange,
}) => {
  return (
    <div className="px-2 pb-2 w-full bg-white min-w-40">
      {options.map((option, index) => (
        <div
          key={index}
          className="flex overflow-hidden gap-2 items-center px-2 w-full rounded-lg shadow-sm bg-black bg-opacity-0 min-h-10"
          style={{ marginTop: index > 0 ? "0.5rem" : undefined }}
        >
          {option.selected ? (
            <div className="flex flex-col justify-center self-stretch p-1 my-auto w-4 border border-blue-300 border-solid stroke-[1px] stroke-blue-300">
              <div className="flex shrink-0 w-2.5 h-2.5 bg-blue-600 rounded-full fill-blue-600" />
            </div>
          ) : (
            <div className="flex shrink-0 self-stretch my-auto w-4 h-4 border border-solid border-neutral-500 stroke-[1px] stroke-neutral-500" />
          )}
          <span className="flex-1 shrink self-stretch my-auto text-sm tracking-normal leading-6 text-black basis-0">
            {option.label}
          </span>
        </div>
      ))}
    </div>
  );
};
