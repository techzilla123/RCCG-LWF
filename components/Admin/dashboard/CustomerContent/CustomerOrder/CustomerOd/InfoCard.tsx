import * as React from "react";
import { InfoRow } from "./InfoRow";

interface InfoRowData {
  label: string;
  value: string;
}

interface InfoCardProps {
  title: string;
  rows: InfoRowData[];
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, rows }) => {
  return (
    <section className="flex-1 shrink p-6 text-base tracking-normal rounded-2xl border border-solid basis-0 border-[color:var(--colour-stroke-disabled,#EAEAEA)] min-w-60 max-md:px-5">
      <h3 className="text-base font-bold text-black leading-[20px)]">
        {title}
      </h3>
      {rows.map((row, index) => (
        <InfoRow key={index} label={row.label} value={row.value} />
      ))}
    </section>
  );
};
