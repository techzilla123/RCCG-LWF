import * as React from "react";

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`relative flex justify-center items-center gap-2 py-4 px-6 rounded-full transition-all duration-300 ease-in-out ${
        isActive ? "text-black font-semibold" : "text-neutral-500"
      }`}
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      aria-controls={`${label.toLowerCase()}-panel`}
    >
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
          isActive ? "bg-black" : "bg-transparent"
        }`}
      />
      <span>{label}</span>
    </button>
  );
};
