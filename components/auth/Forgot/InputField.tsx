"use client";
import React, { useState } from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeAction: (value: string) => void;
  type?: "text" | "password";
  readOnly?: boolean;
  showPasswordToggle?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeAction,
  type = "text",
  readOnly = false,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType =
    type === "password" && showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="flex flex-col mb-4 max-sm:mb-3">
      <label className="mb-2 text-base text-black max-sm:text-sm">
        {label}
      </label>
      <div className="flex items-center px-4 py-2 h-10 bg-white rounded-lg border border-solid border-neutral-300 max-sm:h-9">
        {showPasswordToggle && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: "24px",
                height: "24px",
                stroke: "#717171",
                marginRight: "8px",
              }}
            >
              <path
                d="M12 5.61328C4.5 5.61328 1.5 12.3633 1.5 12.3633C1.5 12.3633 4.5 19.1133 12 19.1133C19.5 19.1133 22.5 12.3633 22.5 12.3633C22.5 12.3633 19.5 5.61328 12 5.61328Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16.1133C14.0711 16.1133 15.75 14.4343 15.75 12.3633C15.75 10.2922 14.0711 8.61328 12 8.61328C9.92893 8.61328 8.25 10.2922 8.25 12.3633C8.25 14.4343 9.92893 16.1133 12 16.1133Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
        <input
          type={inputType}
          placeholder={label}
          value={value}
          onChange={(e) => onChangeAction(e.target.value)}
          readOnly={readOnly}
          className="flex-1 text-base text-black max-sm:text-sm outline-none bg-transparent placeholder:text-neutral-500"
        />
      </div>
    </div>
  );
};
