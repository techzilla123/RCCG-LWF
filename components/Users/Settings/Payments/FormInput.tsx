"use client";
import * as React from "react";

interface FormInputProps {
  label: string;
  optional?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function FormInput({ label, optional, placeholder, value, onChange }: FormInputProps) {
  return (
    <div className="flex flex-col w-full max-w-sm">
      <label className="text-base font-medium text-black mb-1">
        {label} {optional && <span className="text-neutral-400">(optional)</span>}
      </label>
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
