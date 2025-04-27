"use client";
import * as React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  onClick,
}) => {
  const baseStyles =
    "flex items-center justify-center gap-2 self-stretch p-4 h-10 font-medium text-base tracking-normal leading-6 text-center min-h-10 rounded-[50px]";
  const variantStyles =
    variant === "primary"
      ? "text-white bg-blue-600"
      : "text-black bg-black bg-opacity-0";

  return (
    <button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
      {children}
    </button>
  );
};
