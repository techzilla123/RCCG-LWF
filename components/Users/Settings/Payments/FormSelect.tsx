"use client";
import * as React from "react";

interface FormSelectProps {
  label: string;
  optional?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function FormSelect({ label, optional, placeholder, value }: FormSelectProps) {
  return (
    <div className="flex flex-col w-full max-w-sm">
      <label className="text-base font-medium text-black mb-1">
        {label} {optional && <span className="text-neutral-400">(optional)</span>}
      </label>
      <div className="relative">
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue=""
        >
          <option value="" disabled hidden>
            {placeholder || "Choose option"}
          </option>
          <option value="USA">USA</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
        </select>
      </div>
    </div>
  );
}
