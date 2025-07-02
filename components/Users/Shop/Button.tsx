import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "gap-2 self-stretch p-4 w-full h-10 text-base font-medium tracking-normal leading-6 min-h-10 rounded-[50px]";
  const variantStyles = {
    primary: "text-white bg-blue-600",
    secondary: "text-black bg-black bg-opacity-0",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
