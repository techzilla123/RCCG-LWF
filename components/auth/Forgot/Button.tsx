import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;  // added
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  isLoading = false,  // default
}) => {
  const baseStyles =
    "p-4 h-14 text-base font-medium leading-6 cursor-pointer rounded-[50px] max-sm:h-12 max-sm:text-sm";
  const variantStyles = {
    primary: "text-white bg-blue-600",
    secondary: "text-black underline bg-transparent",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={isLoading}  // optional: disable while loading
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};
