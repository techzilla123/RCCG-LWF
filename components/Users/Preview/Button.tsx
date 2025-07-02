"use client";
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  icon,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "flex gap-2 justify-center items-center h-14 min-h-14 rounded-[50px]";
  const variantStyles = {
    primary: "bg-blue-600 text-white",
    secondary: "bg-black bg-opacity-0 text-black",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          className="object-contain self-stretch my-auto w-5 aspect-square"
        />
      )}
      <span className="self-stretch my-auto text-base font-medium tracking-normal leading-6 text-center">
        {children}
      </span>
    </button>
  );
};
