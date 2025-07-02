import React from "react";

export const SuccessIcon: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <img
        src="/check.svg"
        alt="Success checkmark"
        className="object-contain w-[200px] h-[200px] aspect-square"
      />
    </div>
  );
};
