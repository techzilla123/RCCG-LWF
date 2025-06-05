import React from 'react';
import { BorderElement } from './BorderElement';
import { TableHeaderProps } from './types';

export const TableHeader: React.FC<TableHeaderProps> = ({ title, sortIcon, className = '' }) => {
  return (
    <div
      className={`flex relative gap-4 justify-between items-center py-4 pr-2 pl-4 w-full h-14 border-0 border-solid bg-stone-50 border-[color:var(--colour-stroke-default,#D5D5D5)] min-h-14 ${className}`}
    >
      <BorderElement />
      <div className="text-sm text-black leading-[24px)]">
        {title}
      </div>
      {sortIcon && (
        <img
          src={sortIcon}
          className="object-contain z-0 shrink-0 self-stretch my-auto aspect-[0.79] w-[19px]"
          alt={`Sort ${title}`}
        />
      )}
    </div>
  );
};
