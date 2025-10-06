import React from 'react';

interface ConnectItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  hasBorder?: boolean;
}

export const ConnectItem: React.FC<ConnectItemProps> = ({
  icon,
  title,
  description,
  linkText,
  hasBorder = false
}) => {
  return (
    <section className={`flex relative flex-col items-start self-stretch ${hasBorder ? 'pb-3 border-b border-solid border-b-zinc-400' : ''}`}>
      <div className="relative self-stretch h-[135px] max-w-[550px] max-md:relative max-md:h-auto">
        <div className="flex absolute top-0 left-0 flex-col justify-center items-start w-8 h-[31px] max-md:relative max-md:mb-2.5">
          {icon}
        </div>
        <header className="flex absolute -top-0.5 flex-col items-start pb-2 h-8 left-[47px] w-[433px] max-md:relative max-md:top-0 max-md:left-0 max-md:mt-10 max-md:w-full">
          <h3 className="relative px-0 py-0.5 text-xl font-medium leading-5 text-zinc-800 max-sm:text-lg max-sm:leading-6">
            {title}
          </h3>
        </header>
        <div className="flex absolute flex-col gap-0 items-start h-[105px] left-[47px] top-[29px] w-[433px] max-md:relative max-md:top-0 max-md:left-0 max-md:w-full max-md:h-auto">
          <div className="flex relative flex-col items-start self-stretch pb-4">
            <p className="relative self-stretch text-base font-light leading-6 text-zinc-800 max-sm:text-sm max-sm:leading-5">
              {description}
            </p>
          </div>
          <div className="flex relative flex-col items-end self-stretch">
            <button className="relative text-base font-bold leading-6 text-right cursor-pointer text-slate-700 max-sm:text-sm hover:text-slate-600 transition-colors">
              {linkText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
