import React from "react";

interface SectionHeaderProps {
  title: string;
  accent?: string; // <-- allow optional accent prop
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  accent = "from-gray-700 to-gray-600", // fallback gradient
}) => {
  return (
    <header
      className={`flex flex-col justify-center px-4 py-10 text-center text-white 
      bg-gradient-to-r ${accent} rounded-t-2xl shadow-md`}
    >
      <h2 className="text-3xl md:text-4xl font-bold tracking-wide uppercase drop-shadow-sm">
        {title}
      </h2>
    </header>
  );
};
