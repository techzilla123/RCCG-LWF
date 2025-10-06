// Button.tsx
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "outline",
  className = "",
  onClick,
}) => {
  const baseClasses =
    "flex gap-2 justify-center items-center px-6 py-3 rounded-full font-semibold transition";

  const variantClasses = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-100 text-black hover:bg-gray-200",
    outline:
      "border border-black text-black hover:bg-black hover:text-white transition-colors",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
