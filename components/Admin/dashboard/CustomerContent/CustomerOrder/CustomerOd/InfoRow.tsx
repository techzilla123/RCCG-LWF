import * as React from "react";

interface InfoRowProps {
  label: string;
  value: string;
}

export const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <div className="flex gap-10 justify-between items-center mt-2 w-full whitespace-nowrap min-h-6">
      <div className="text-base leading-[24px)] text-neutral-500">{label}</div>
      <div className="text-base text-black leading-[24px)]">{value}</div>
    </div>
  );
};
