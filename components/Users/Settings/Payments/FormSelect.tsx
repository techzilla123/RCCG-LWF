"use client";
import * as React from "react";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  label: string;
  optional?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: Option[];
}

export function FormSelect({
  label,
  optional,
  placeholder,
  value,
  onChange,
  options = [],
}: FormSelectProps) {
  return (
    <div className="flex flex-col w-full max-w-sm">
      <label className="text-base font-medium text-black mb-1">
        {label}{" "}
        {optional && <span className="text-neutral-400">(optional)</span>}
      </label>
      <div className="relative">
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value || ""}
          onChange={onChange}
        >
          <option value="" disabled hidden>
            {placeholder || "Choose option"}
          </option>
          {options.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
