import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fbfd1da09655196d9881ba5ab41c970b85f1b8e0?placeholderIfAbsent=true" alt="logo" className={`h-[61px] w-[81px] ${className}`} />
  );
};
