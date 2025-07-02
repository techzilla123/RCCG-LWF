import * as React from "react";

export const ScrollBar: React.FC = () => {
  return (
    <div className="flex overflow-hidden absolute bottom-2 right-3 top-4 z-0 flex-col pb-60 w-1.5 bg-gray-200 rounded-[50px] max-md:pb-24">
      <div className="flex shrink-0 bg-neutral-500 h-[163px] rounded-[50px]" />
    </div>
  );
};
