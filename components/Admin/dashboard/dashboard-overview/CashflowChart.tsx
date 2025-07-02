"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Download } from "lucide-react";

const cashflowData = [
  { month: "Jan", sales: 600, revenue: 800 },
  { month: "Feb", sales: 700, revenue: 1000 },
  { month: "Mar", sales: 400, revenue: 600 },
  { month: "Apr", sales: 500, revenue: 700 },
  { month: "May", sales: 450, revenue: 650 },
  { month: "Jun", sales: 470, revenue: 680 },
  { month: "Jul", sales: 600, revenue: 850 },
  { month: "Aug", sales: 500, revenue: 800 },
  { month: "Sep", sales: 520, revenue: 830 },
  { month: "Oct", sales: 530, revenue: 850 },
  { month: "Nov", sales: 540, revenue: 860 },
  { month: "Dec", sales: 560, revenue: 870 },
];

export const CashflowChart = () => {
  return (
    <section className="overflow-hidden py-4 pr-6 pl-4 mt-6 w-full border bg-white rounded-lg">
      <header className="flex flex-wrap gap-2 items-center w-full">
        <h3 className="flex-1 text-base font-semibold leading-5 text-black">
          Cashflow
        </h3>

        <div className="flex gap-4 items-center text-xs leading-4">
          <div className="w-14">
            <p className="text-neutral-500">Peak sales</p>
            <p className="mt-1 font-bold text-black">$100,000</p>
          </div>
          <div className="w-[52px]">
            <p className="text-neutral-500">Ave. sales</p>
            <p className="mt-1 font-bold text-black text-[11px] leading-4">
              $60,000
            </p>
          </div>
        </div>

        <button className=" rounded hover:bg-gray-100">
          <Download className="w-4 h-4 text-gray-500" />
        </button>
      </header>

      {/* Legends */}
      <div className="mt-4 flex gap-3.5 justify-end text-sm leading-none text-neutral-500">
        <div className="flex gap-2 items-center">
          <span className="w-2 h-2 bg-blue-600 rounded-full" />
          <span>Sales</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="w-2 h-2 bg-blue-300 rounded-full" />
          <span>Revenue</span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[260px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={cashflowData}
            margin={{ top: 10, right: 10, left: -10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6B7280" }}
              tickFormatter={(value) => `${value}`}
              axisLine={false}
              tickLine={false}
              domain={[0, 1000]}
            />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Bar
              dataKey="sales"
              fill="#2563eb"
              barSize={16}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="revenue"
              fill="#93c5fd"
              barSize={16}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-xs font-medium text-center text-neutral-500">
        Month
      </p>
    </section>
  );
};
