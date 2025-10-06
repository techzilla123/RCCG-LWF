import * as React from "react";

interface HorizontalBorderProps {
  topPadding?: string;
  className?: string;
}

function HorizontalBorder({
  topPadding = "pt-24",
  className = ""
}: HorizontalBorderProps) {
  return (
    <div className={`w-6/12 max-md:ml-0 max-md:w-full ${className}`}>
      <div className={`grow ${topPadding} pb-5 min-h-px`}>
        <div className="flex w-full border-t-2 border-solid border-t-white min-h-[3px]" />
      </div>
    </div>
  );
}

export default HorizontalBorder;
