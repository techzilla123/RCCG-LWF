"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Eye icons

interface InputProps {
  label: string;
  type?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  className = "",
  value,
  onChange,
  placeholder = "",
}) => {
  const inputId = label.toLowerCase().replace(/\s+/g, "-");
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className={`flex flex-col w-full max-w-[480px] min-w-[320px] ${className}`}>
      <label htmlFor={inputId} className="text-base font-medium text-black mb-2">
        {label}
      </label>
      <div className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg relative">
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="flex items-center justify-center mr-3 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-gray-400" />
            ) : (
              <Eye className="w-5 h-5 text-gray-400" />
            )}
          </button>
        )}
        <input
          id={inputId}
          type={isPassword && !showPassword ? "password" : "text"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>
  );
};
