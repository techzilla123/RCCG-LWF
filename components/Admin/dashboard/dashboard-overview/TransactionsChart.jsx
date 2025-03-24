import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

// ✅ Dynamically import ApexCharts (Runs only in browser)
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Prevents "window is not defined" error
});

function TransactionsChart() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard/metrics`
        );
        setData(response.data);
      } catch (err) {
        console.error("Error fetching transaction metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Default values while loading
  const pendingRate = data?.pendingRate ?? 15;
  const failureRate = data?.failureRate ?? 5;
  const successRate = data?.successRate ?? 70;
  const paymentAmount = data?.paymentAmount ?? "200K";

  const chartOptions = {
    series: [successRate, pendingRate, failureRate],
    options: {
      chart: { type: "radialBar", height: 250 },
      plotOptions: {
        radialBar: {
          hollow: { size: "30%" },
          track: { background: "#F3F3F3", strokeWidth: "100%" },
          dataLabels: {
            name: { show: false },
            value: { show: false },
            total: {
              show: true,
              label: "Total",
              formatter: () => `₦${paymentAmount}`,
              style: { fontSize: "16px", fontWeight: "bold", color: "#555" },
            },
          },
        },
      },
      labels: ["Success", "Pending", "Failed"],
      colors: ["#08AA3B", "#F4C02A", "#E63946"], // Green, Yellow, Red
    },
  };

  return (
    <div
      className="flex overflow-hidden flex-col flex-1 shrink justify-center p-4 bg-white rounded-lg border border-solid basis-0 border-zinc-300 min-w-[240px] max-md:max-w-full"
    >
      {/* Header */}
      <div className="flex justify-between items-center w-full max-md:max-w-full mb-4">
        <div className="flex flex-col justify-center">
          <div className="text-sm font-semibold text-black">Transactions</div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex flex-1 justify-center items-center mt-1 rounded-lg p-4">
        {loading ? (
          <PlaceholderChart />
        ) : (
          <ReactApexChart
            options={chartOptions.options}
            series={chartOptions.series}
            type="radialBar"
            height={250}
          />
        )}

        {/* Legend */}
        <div className="flex flex-col ml-4">
          <LegendItem color="#F4C02A" label="Pending" value={pendingRate} />
          <LegendItem color="#E63946" label="Failed" value={failureRate} />
          <LegendItem color="#08AA3B" label="Success" value={successRate} />
        </div>
      </div>
    </div>
  );
}

// 📌 Placeholder Chart: Shows fallback values immediately, NO API needed!
const PlaceholderChart = () => {
  const defaultSeries = [70, 15, 5]; // Default success, pending, failure rates
  const defaultAmount = "200K"; // Default total amount

  const placeholderOptions = {
    series: defaultSeries,
    options: {
      chart: { type: "radialBar", height: 250 },
      plotOptions: {
        radialBar: {
          hollow: { size: "30%" },
          track: { background: "#E5E7EB", strokeWidth: "100%" },
          dataLabels: {
            name: { show: false },
            value: { show: false },
            total: {
              show: true,
              label: "Total",
              formatter: () => `₦${defaultAmount}`,
              style: { fontSize: "16px", fontWeight: "bold", color: "#9CA3AF" },
            },
          },
        },
      },
      labels: ["Success", "Pending", "Failed"],
      colors: ["#D1D5DB", "#E5E7EB", "#9CA3AF"], // Subtle gray shades for loading effect
    },
  };

  return (
    <ReactApexChart
      options={placeholderOptions.options}
      series={placeholderOptions.series}
      type="radialBar"
      height={250}
    />
  );
};

// Legend Item Component
const LegendItem = ({ color, label, value }) => (
  <div className="flex items-center gap-2 mb-1">
    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
    <span className="text-sm text-neutral-500">
      {label} ({value}%)
    </span>
  </div>
);

export default TransactionsChart;
