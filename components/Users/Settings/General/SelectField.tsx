"use client";
import * as React from "react";

interface SelectFieldProps {
  label: string;
  value: string;
  icon?: string;
  suffixIcon?: string;
  placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  icon,
  suffixIcon,
  placeholder,
}) => {
  const hasIcon = Boolean(icon);
  const isPlaceholder = !value; // detect if it's just placeholder

  return (
    <div className="flex flex-col max-w-full min-w-80 w-[400px]">
      <label className="gap-1 self-start text-base tracking-normal leading-6 text-black">
        {label}
      </label>
      <div className="mt-2 w-full">
        <div className="w-full h-10 bg-white rounded-lg shadow-sm min-h-10">
          <div className="flex-1 w-full">
            <div
              className={`flex overflow-hidden flex-1 gap-2 items-center ${
                hasIcon ? "px-2" : "px-4"
              } size-full`}
            >
              {icon && (
                <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-4">
                  <img
                    src={icon}
                    className="object-contain self-stretch my-auto w-4 aspect-square rounded-[1000px]"
                    alt=""
                  />
                </div>
              )}
              <div
                className={`flex-1 shrink self-stretch my-auto text-base tracking-normal leading-6 basis-0 ${
                  isPlaceholder ? "text-neutral-500 text-left mt-2" : "text-black mt-2 "
                }`}
              >
                {isPlaceholder ? placeholder : value}
              </div>
              {suffixIcon ? (
                <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-4">
                  <img
                    src={suffixIcon}
                    className="object-contain self-stretch my-auto w-4 aspect-square"
                    alt=""
                  />
                </div>
              ) : (
                <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-4">
                  <div className="flex self-stretch my-auto w-4 min-h-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
