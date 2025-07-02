"use client";
import * as React from "react";

interface CheckboxOption {
  label: string;
  selected?: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
 
}) => {
  return (
    <div className="px-2 pb-2 w-full bg-white min-w-40">
      {options.map((option, index) => (
        <div
          key={index}
          className="flex overflow-hidden gap-2 items-center px-2 w-full rounded-lg shadow-sm bg-black bg-opacity-0 min-h-10"
          style={{ marginTop: index > 0 ? "0.25rem" : undefined }}
        >
          <div
            className={`flex gap-2.5 justify-center items-center self-stretch my-auto w-4 h-4 rounded min-h-4 ${
              option.selected ? "bg-blue-600" : ""
            }`}
          >
            {option.selected && (
              <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-3">
                <div className="flex self-stretch my-auto w-3 min-h-3" />
              </div>
            )}
          </div>
          <span className="flex-1 shrink self-stretch my-auto text-sm tracking-normal leading-6 text-black basis-0">
            {option.label}
          </span>
        </div>
      ))}
    </div>
  );
};
