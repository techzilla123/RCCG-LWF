import React from 'react';

function OverviewCard({ title, amount, icon, bgColor, active }) {
  return (
    <div className={`flex flex-1 shrink gap-4 items-center p-6 rounded-lg border border-solid basis-0 border-zinc-300 min-w-[200px] max-md:px-5 ${active ? 'bg-neutral-100' : 'bg-white'}`}>
      <div className={`flex gap-2.5 justify-center items-center self-stretch my-auto w-14 h-14 ${bgColor} min-h-[56px] rounded-[100px]`}>
        <img src={icon} alt="" className="object-contain self-stretch my-auto w-7 aspect-square" />
      </div>
      <div className="flex flex-col justify-center self-stretch my-auto w-28 h-[54px]">
        <div className="text-3xl font-medium text-black">{amount}</div>
        <div className="mt-2 text-xs text-neutral-500">{title}</div>
      </div>
    </div>
  );
}

export default OverviewCard;