import React from 'react';

function OverviewCard({ title, icon, figure, subTitle, percentage, trend, isLight }) {
  return (
    <div data-layername="overviewCardLight" className={`flex flex-col flex-1 shrink px-6 py-4 rounded-lg border border-solid basis-0 ${isLight ? 'bg-neutral-100' : 'bg-white'} border-zinc-300 min-w-[200px] max-md:px-5`}>
      <div data-layername="title" className="flex gap-1 justify-center items-center w-full">
        <div data-layername="icon" className={`flex gap-2.5 justify-center items-center self-stretch my-auto w-6 h-6 ${isLight ? 'bg-white' : 'bg-gray-200'} min-h-[24px] rounded-[100px]`}>
          <div data-layername="aIconSizeable" className="flex gap-2.5 items-center self-stretch my-auto w-3">
            <img loading="lazy" src={icon} className="object-contain self-stretch my-auto w-3 aspect-square" alt="" />
          </div>
        </div>
        <div data-layername="titleText" className="flex-1 shrink self-stretch my-auto text-xs basis-0 text-neutral-500">{title}</div>
      </div>
      <div data-layername="figure" className="flex flex-wrap gap-2 justify-between items-center  w-full rounded-lg" >
        <div data-layername="figureAmount" className="self-stretch my-auto text-3xl font-medium text-black head-h-lg32"   style={{
           fontSize: "32px",
            fontWeight: 100,
            lineHeight: "38.73px",
            textAlign: "left",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none"
        }}>{figure}</div>
        <div data-layername="level" className="flex flex-col self-stretch my-auto min-h-[34px]">
          <div data-layername="stockLevel" className="text-xs text-neutral-500">{subTitle}</div>
          <div data-layername="iconText" className="flex flex-wrap flex-1 gap-1 items-center h-full rounded-lg">
            <div data-layername="text" className="self-stretch my-auto text-base text-black whitespace-nowrap rounded-lg w-[57px]">{percentage}</div>
            {trend && (
  <div data-layername="iconSet" className="flex justify-center items-center self-stretch my-auto w-4 rounded-lg">
    <img 
      loading="lazy" 
      src={trend === 'up' 
        ? "https://cdn.builder.io/api/v1/image/assets/TEMP/9cdbfeae0272e08eff375d7de98dcad60f9a6a348ecb110539ee05a85d7e7f43?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" 
        : "https://cdn.builder.io/api/v1/image/assets/TEMP/646108d3e6be7d9848c6c29e58925e104b15cb4c50bf7e29b61f45561140e9c9?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
      } 
      className="object-contain self-stretch my-auto w-4 aspect-square" 
      alt={trend === 'up' ? "Trend up" : "Trend down"} 
    />
  </div>
)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewCard;