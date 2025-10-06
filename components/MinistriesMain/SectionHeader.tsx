import React from 'react';

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <header className="flex flex-col justify-center px-4 py-7 text-xl font-extrabold leading-tight text-center uppercase whitespace-nowrap bg-rose-100 min-h-[81px] text-stone-400 max-md:max-w-full">
      <div className="pb-px w-full max-md:max-w-full">
        <h2 className="text-xl font-extrabold leading-6 max-md:max-w-full">
          {title}
        </h2>
      </div>
    </header>
  );
};
