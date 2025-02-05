import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function UsersChart() {
  const [chartWidth, setChartWidth] = useState(500);

  useEffect(() => {
    // Dynamically adjust chart width based on screen size
    const handleResize = () => {
      setChartWidth(window.innerWidth < 640 ? window.innerWidth - 32 : 500);
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-300 flex overflow-hidden flex-col flex-1 shrink justify-center p-4 bg-white rounded-lg border border-solid basis-0 border-zinc-300 min-w-[240px] max-md:max-w-full">
      {/* Header and Legend */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        {/* Title */}
        <div>
          <div className="text-lg font-semibold text-black">Users</div>
          <div className="text-sm text-gray-500">Over the past week</div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Peak", color: "bg-blue-900", value: "902,020" },
            { label: "Average", color: "bg-gray-600", value: "760,200" },
            { label: "Active", color: "bg-green-500", value: "800,000" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <span className={`w-2 h-2 ${item.color} rounded-full`}></span>
                <span className="text-xs text-gray-500">{item.label}</span>
              </div>
              <div className="text-xs font-semibold text-black">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart (Responsive Width) */}
      <div className="w-full flex justify-center">
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }]}
          series={[
            {
              data: [800, 900, 600, 750, 600, 850, 800],
              label: 'Active Users',
              color: '#10b981',
            },
          ]}
          width={chartWidth}
          height={300}
        />
      </div>
    </div>
  );
}
