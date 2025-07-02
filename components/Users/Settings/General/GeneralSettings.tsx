"use client";
import * as React from "react";
import { SelectField } from "./SelectField";

export const GeneralSettings: React.FC = () => {
  return (
    <section className="flex flex-col justify-center w-full px-4 sm:px-6 md:px-8">
      <header className="pb-4 w-full text-xl font-semibold tracking-normal leading-6 text-black whitespace-nowrap border-b border-solid border-b-[color:var(--colour-stroke-default,#D5D5D5)]">
        <h3 className="text-xl font-bold text-black">General</h3>
      </header>
      
      <div className="py-4 w-full">
        <h3 className="text-base tracking-normal leading-6 text-black">Language</h3>
        <div className="mt-2.5 w-full sm:w-[250px] md:w-[300px] lg:w-[350px] rounded-lg">
          <div className="flex overflow-hidden flex-1 gap-2 items-center px-2 rounded-lg bg-stone-50 min-w-14">
            <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/9502c3196834acb3ef97bd6698d95c16e0359b71?placeholderIfAbsent=true"
                className="object-contain w-4 aspect-square rounded-full"
                alt="Language flag"
              />
            </div>
            <span className="flex-1 shrink text-sm tracking-normal leading-6 text-black">
              English (US)
            </span>
            <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/82c8f9d069e7aa215abfaeb6a6822903eb0491ec?placeholderIfAbsent=true"
                className="object-contain w-4 aspect-square"
                alt="Dropdown arrow"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 w-full">
        <SelectField
          label="Time zone"
          value="UTC-8 Pacific Standard Time"
          placeholder="Select timezone"
        />
      </div>

      <div className="py-4 w-full">
        <SelectField
          label="Currency"
          value="US Dollar"
          placeholder="Select currency"
        />
      </div>
    </section>
  );
};
