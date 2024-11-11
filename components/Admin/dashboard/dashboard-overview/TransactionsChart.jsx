import React from 'react';

function TransactionsChart() {
  return (
    <div data-layername="chartGroup" className="flex overflow-hidden flex-col flex-1 shrink justify-center p-4 bg-white rounded-lg border border-solid basis-0 border-zinc-300 min-w-[240px] max-md:max-w-full">
      
      {/* Header and Metrics */}
      <div data-layername="heading" className="flex justify-between items-center w-full max-md:max-w-full mb-4">
        {/* Title */}
        <div data-layername="title" className="flex flex-col justify-center">
          <div data-layername="figureAmount" className="text-sm font-semibold text-black">Transactions</div>
          <div data-layername="figureAmount" className="mt-1 text-xs text-neutral-700">Over the past week</div>
        </div>

        {/* Metrics */}
        <div data-layername="metrics" className="flex gap-4">
          <div data-layername="peakMetric" className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-xs text-neutral-500">Peak</span>
            </div>
            <div className="text-xs font-semibold text-black">902,020</div>
          </div>
          <div data-layername="averageMetric" className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-neutral-600 rounded-full"></div>
              <span className="text-xs text-neutral-500">Average</span>
            </div>
            <div className="text-xs font-semibold text-black">760,200</div>
          </div>
          <div data-layername="targetMetric" className="flex flex-col items-center"
          >
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-600 rounded-full"
              style={{background:"#08AA3B"}}></div>
              <span className="text-xs text-neutral-500">Target</span>
            </div>
            <div className="text-xs font-semibold text-black">800,000</div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div data-layername="chart" className="flex flex-1 justify-center items-center mt-4 rounded-lg  p-4">
        {/* Placeholder image representing chart content */}
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4433f420f2bc18c7166293b3f3874c2be0196fc5333aa0b9a6d800b55433bc5a?apiKey=73dffa2d4bac468cb175120cf834230a&" 
          className="object-contain w-[200px]" 
          alt="Transactions Chart" 
        />
        {/* Legend */}
        <div data-layername="legend" className="flex flex-col ml-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-neutral-500">Pending (15%)</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <span className="text-sm text-neutral-500">Failed (5%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"
            style={{background:"#08AA3B"}}></div>
            <span className="text-sm text-neutral-500">Success (70%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsChart;
