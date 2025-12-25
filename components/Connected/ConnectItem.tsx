import React from 'react';

interface ConnectItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  hasBorder?: boolean;
  onClick?: () => void;
}

export const ConnectItem: React.FC<ConnectItemProps> = ({
  icon,
  title,
  description,
  linkText,
  hasBorder = false,
  onClick
}) => {
  return (
    <section
      onClick={onClick}
      className={`cursor-pointer transition-opacity hover:opacity-90
      ${hasBorder ? 'border-b border-zinc-400 pb-6' : ''}`}
    >
      {/* DESKTOP */}
      <div className="hidden md:block relative h-[135px] max-w-[550px]">
        <div className="absolute top-0 left-0">{icon}</div>

        <h3 className="absolute left-[47px] top-0 text-xl font-medium text-zinc-800">
          {title}
        </h3>

        <div className="absolute left-[47px] top-[29px] w-[433px]">
          <p className="text-base font-light leading-6 text-zinc-800">
            {description}
          </p>

          <div className="flex justify-end mt-2">
            <span className="font-bold text-slate-700">{linkText}</span>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex flex-col gap-3 md:hidden">
        <div>{icon}</div>

        <h3 className="text-lg font-medium text-zinc-800">
          {title}
        </h3>

        <p className="text-sm font-light leading-5 text-zinc-800">
          {description}
        </p>

        <span className="font-bold text-slate-700">
          {linkText}
        </span>
      </div>
    </section>
  );
};
