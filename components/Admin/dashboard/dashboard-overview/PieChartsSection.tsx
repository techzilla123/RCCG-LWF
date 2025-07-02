"use client";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";

// Define a type for the data entries
interface DataEntry {
  name: string;
  value: number;
  color: string;
}

const customerData: DataEntry[] = [
  { name: "Verified", value: 400, color: "#2563EB" },
  { name: "Active", value: 300, color: "#93C5FD" },
  { name: "Visitors", value: 300, color: "#F0F9FF" },
];

const productData: DataEntry[] = [
  { name: "Balloons (40)", value: 40, color: "#2563EB" },
  { name: "Birthday (20)", value: 20, color: "#DBEAFE" },
  { name: "Parties (32)", value: 32, color: "#93C5FD" },
  { name: "Holidays (14)", value: 14, color: "#000000" },
  { name: "Decor (9)", value: 9, color: "#E5E7EB" },
];

const renderPie = (data: DataEntry[], total: number) => (
  <div className="relative w-[200px] h-[200px]">
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={100}
        dataKey="value"
        startAngle={90}
        endAngle={-270}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
    {/* Total in center */}
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <p className="text-xs text-neutral-500">Total</p>
      <p className="text-3xl font-semibold text-black">{total}</p>
    </div>
  </div>
);

export const PieChartsSection = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set the client-side flag after component mount
  }, []);

  if (!isClient) {
    return null; // Prevent rendering on the server
  }

  return (
    <div className="flex flex-wrap gap-4 items-start w-full">
      {/* Customers Card */}
      <section className="flex pb-[29px] flex-col p-4 bg-white rounded-xl border shadow-sm min-w-[260px] flex-1">
        <header className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-black">Customers</h3>
          <button className="p-1 rounded hover:bg-gray-100">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/65a7ad88921bf1baa82e03375b8738d97fbf2a72?placeholderIfAbsent=true"
              alt=""
              className="w-4 h-4"
            />
          </button>
        </header>

        <div className="flex items-center justify-between mt-4">
          {renderPie(customerData, 1000)}
          <div className="flex flex-col gap-1">
            {customerData.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-neutral-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Card */}
      <section className="flex flex-col p-4 bg-white rounded-xl border shadow-sm min-w-[260px] flex-1">
        <header className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-black">Products</h3>
          <button className="p-1 rounded hover:bg-gray-100">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/65a7ad88921bf1baa82e03375b8738d97fbf2a72?placeholderIfAbsent=true"
              alt=""
              className="w-4 h-4"
            />
          </button>
        </header>

        <div className="flex items-center justify-between mt-4">
          {renderPie(productData, 240)}
          <div className="flex flex-col gap-1">
            {productData.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-neutral-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
