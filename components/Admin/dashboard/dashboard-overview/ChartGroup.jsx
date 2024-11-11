import React from 'react';

function ChartGroup({ title, subtitle }) {
  return (
    <div data-layername="chartGroup" className="flex overflow-hidden flex-col flex-1 shrink p-4 bg-white rounded-lg border border-solid basis-4 border-zinc-300 min-w-[240px] max-md:max-w-full">
      
      {/* Header and Metrics */}
      <div data-layername="heading" className="flex items-center w-full max-md:max-w-full mb-4">
        
        {/* Title Section */}
        <div data-layername="title" className="flex flex-col justify-center">
          <div data-layername="figureAmount" className="text-sm font-semibold text-black">{title}</div>
          <div data-layername="figureAmount" className="mt-1 text-xs text-neutral-700">{subtitle}</div>
        </div>
        
        {/* Metrics Section */}
        <div data-layername="metrics" className="flex flex-1 gap-4 items-center justify-end ml-4">
          {/* Peak Metric */}
          <div data-layername="peakMetric" className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-xs text-neutral-500">Peak</span>
            </div>
            <div className="text-xs font-semibold text-black">
              <span>₦</span>900,020
            </div>
          </div>

          {/* Average Metric */}
          <div data-layername="averageMetric" className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-neutral-600 rounded-full"></div>
              <span className="text-xs text-neutral-500">Average</span>
            </div>
            <div className="text-xs font-semibold text-black">
              <span>₦</span>80,200
            </div>
          </div>

          {/* Profit Metric with Green Dot */}
          <div data-layername="profitMetric" className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-600 rounded-full"
              style={{background:"#08AA3B"}}></div> {/* Green dot for Profit */}
              <span className="text-xs text-neutral-500">Profit</span>
            </div>
            <div className="text-xs font-semibold text-black whitespace-nowrap">
              ₦100,000
            </div>
          </div>
        </div>

        {/* More Options Button, pushed to the far right */}
        <div data-layername="more" className="flex justify-center items-center w-8 h-8 ml-auto border border-solid bg-black bg-opacity-0 border-black border-opacity-0 min-h-[32px] rounded-full">
          <div data-layername="aIconSizeable" className="flex items-center">
            <div data-layername="moreMenu" className="py-1.5 min-h-[13px]" />
          </div>
        </div>
      </div>
      
      {/* Chart Section */}
      <div data-layername="chart" className="flex flex-col flex-1 justify-center mt-4 w-full rounded-lg border border-solid border-black border-opacity-0 max-md:max-w-full">
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8225bddabf2a6d4fa88fe4df9461b57f60c088037744a69042ef8465645a1e08?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" 
          className="object-contain w-full aspect-[1.93] max-md:max-w-full" 
          alt="Revenue Chart" 
        />
      </div>
    </div>
  );
}

export default ChartGroup;
