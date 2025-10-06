import * as React from "react";

interface LearnMoreSectionProps {
  alignment?: "left" | "right";
  topPadding?: string;
  className?: string;
  onClick?: () => void;
}

function LearnMoreSection({
  alignment = "left",
  topPadding = "pt-24",
  className = "",
  onClick,
}: LearnMoreSectionProps) {
  const commonClasses =
    "text-lg font-semibold text-white min-h-px transition-transform duration-200 hover:scale-105 cursor-pointer";

  if (alignment === "right") {
    return (
      <div
        onClick={onClick}
        className={`w-6/12 max-md:ml-0 max-md:w-full ${className}`}
      >
        <div
          className={`flex flex-col items-start ${topPadding} ${commonClasses} text-right`}
        >
          <div className="flex flex-col items-end max-w-full w-[250px]">
            <p className="text-lg font-semibold leading-7">LEARN MORE</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`ml-5 w-6/12 max-md:ml-0 max-md:w-full ${className}`}
    >
      <div
        className={`${topPadding} pl-5 ${commonClasses}`}
      >
        <div className="w-full">
          <p className="text-lg font-semibold leading-7">LEARN MORE</p>
        </div>
      </div>
    </div>
  );
}

export default LearnMoreSection;
