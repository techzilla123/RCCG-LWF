import * as React from "react";

interface ActionButtonsProps {
  primaryText: string;
  secondaryText: string;
}

export function ActionButtons({ primaryText, secondaryText }: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
      <button className="px-6 py-3 text-white font-semibold rounded-lg bg-violet-600 hover:bg-violet-700 transition-colors shadow-md w-full sm:w-auto">
        {primaryText}
      </button>
      <button className="px-6 py-3 text-violet-600 font-semibold rounded-lg border border-violet-600 hover:bg-violet-100 transition-colors w-full sm:w-auto">
        {secondaryText}
      </button>
    </div>
  );
}
