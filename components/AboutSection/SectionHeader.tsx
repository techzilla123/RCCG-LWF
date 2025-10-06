import * as React from "react";

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <section className="flex justify-center items-center px-0 py-8 w-full bg-neutral-100 max-sm:px-0 max-sm:py-6">
      <div className="flex justify-center items-start px-4 py-0 w-full max-w-[1232px] max-sm:px-4 max-sm:py-0">
        <div className="flex flex-col items-start pt-8 w-full max-w-[800px] max-sm:pt-4">
          <header className="flex flex-col items-center w-full max-w-[800px]">
            <h1 className="w-full text-4xl font-black leading-10 text-center text-black max-md:text-3xl max-md:leading-10 max-sm:text-3xl max-sm:leading-9">
              {title}
            </h1>
          </header>
        </div>
      </div>
    </section>
  );
};
