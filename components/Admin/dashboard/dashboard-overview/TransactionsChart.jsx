import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

function TransactionsChart() {
  const [data, setData] = useState(null);
  const [totalFormatted, setTotalFormatted] = useState("₦200k"); // Default value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token is missing.");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard/metrics`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const fetchedData = response.data;
        setData(fetchedData);

        // Format total payment amount
        let paymentAmount = parseFloat(fetchedData.paymentAmount);
        let paymentFormatted;
        if (paymentAmount >= 1000000) {
          paymentFormatted = `₦${(paymentAmount / 1000000).toFixed(1)}M`; // For millions
        } else if (paymentAmount >= 1000) {
          paymentFormatted = `₦${(paymentAmount / 1000).toFixed(1)}K`; // For thousands
        } else {
          paymentFormatted = `₦${paymentAmount.toLocaleString()}`; // For hundreds
        }

        setTotalFormatted(paymentFormatted);
      } catch (err) {
        console.error("Error fetching transaction metrics:", err);
      }
    };

    fetchData();
  }, []);

  // Use default values while loading
  const pendingRate = data?.pendingRate || 15;
  const failureRate = data?.failureRate || 5;
  const successRate = data?.successRate || 70;

  const chartOptions = {
    series: [successRate, pendingRate, failureRate],
    options: {
      chart: {
        type: "radialBar",
        height: 250,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "30%",
          },
          track: {
            background: "#F3F3F3",
            strokeWidth: "100%",
          },
          dataLabels: {
            name: { show: false },
            value: { show: false },
            total: {
              show: true,
              label: "Total",
              formatter: () => totalFormatted, // Display the formatted total
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
      data-layername="chartGroup"
      className="flex overflow-hidden flex-col flex-1 shrink justify-center p-4 bg-white rounded-lg border border-solid basis-0 border-zinc-300 min-w-[240px] max-md:max-w-full"
    >
      {/* Header */}
      <div
        data-layername="heading"
        className="flex justify-between items-center w-full max-md:max-w-full mb-4"
      >
        <div data-layername="title" className="flex flex-col justify-center">
          <div className="text-sm font-semibold text-black">Transactions</div>
        </div>
      </div>

      {/* Chart */}
      <div
        data-layername="chart"
        className="flex flex-1 justify-center items-center mt-1 rounded-lg p-4"
      >
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="radialBar"
          height={250}
        />

        {/* Legend */}
        <div data-layername="legend" className="flex flex-col ">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-neutral-500">
              Pending ({pendingRate}%)
            </span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <span className="text-sm text-neutral-500">
              Failed ({failureRate}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full" style={{ backgroundColor: "#08AA3B" }}></div>
            <span className="text-sm text-neutral-500">
              Success ({successRate}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionsChart;