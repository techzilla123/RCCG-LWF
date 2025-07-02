"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "disabled";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";  // optional
  disabled?: boolean;                    // optional
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",     // default to 'button' if not provided
  disabled = false,    // default to false if not provided
}) => {
  const baseStyles =
    "inline-flex items-start justify-start gap-2 px-4 py-2 text-base font-medium tracking-normal leading-6 min-h-10 rounded-full";

  const variantStyles = {
    primary: "text-white bg-blue-600 hover:bg-blue-700",
    secondary: "text-black bg-transparent",
    danger: "text-rose-600 bg-transparent",
    disabled: "text-stone-300 bg-gray-200 cursor-not-allowed",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <span className="flex items-center gap-2">{children}</span>
    </button>
  );
};
