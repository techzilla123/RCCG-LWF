import * as React from "react";

interface GiveNowButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

function GiveNowButton({ onClick, children }: GiveNowButtonProps) {
  return (
    <div className="flex flex-col items-start mt-5 w-full text-sm font-semibold text-center capitalize text-slate-900">
      <button
        onClick={onClick}
        className="px-6 py-3 bg-white rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
      >
        {children}
      </button>
    </div>
  );
}

export default GiveNowButton;
