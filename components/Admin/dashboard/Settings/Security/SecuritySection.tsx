"use client";
import React from "react";

interface SecuritySectionProps {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({
  title,
  description,
  children,
  className = "",
}) => {
  return (
    <section className={`flex flex-col w-full ${className} max-md:max-w-full`}>
      <header className="flex flex-col pb-4 w-full border-b border-[#D5D5D5] min-w-[320px] max-md:min-w-0">
      <h3 className="text-xl font-bold mb-2" style={{color: "#000000"}}>
          {title}
        </h3>
        <p className="mt-1 text-base font-inter tracking-normal text-neutral-500 max-md:max-w-full">
          {description}
        </p>
      </header>
      <div className="mt-6 w-full">{children}</div>
    </section>
  );
};
