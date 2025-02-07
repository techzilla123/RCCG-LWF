import React, { useEffect, useState } from "react";
import axios from "axios";
import OverviewCard from "./OverviewCard";

function Overview() {
  const [overviewData, setOverviewData] = useState([]); // Initialize state without localStorage
  const [error, setError] = useState(null);

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
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        // Convert payment amount to appropriate string with K or M
        let paymentAmount = parseFloat(data.paymentAmount);
        let paymentFormatted;
        if (paymentAmount >= 1000000) {
          paymentFormatted = `₦${(paymentAmount / 1000000).toFixed(1)}M`;  // For amounts in millions
        } else if (paymentAmount >= 1000) {
          paymentFormatted = `₦${(paymentAmount / 1000).toFixed(1)}K`;  // For amounts in thousands
        } else {
          paymentFormatted = `₦${paymentAmount.toLocaleString()}`;  // For amounts in the hundreds
        }

        const mappedData = [
          {
            title: "Total Transactions",
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3dcae055377a3673299445063dc0ec12ee87cb63d0108e9e2ec60efc052dbe0d?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a",
            figure: data.transactionCount,
            subTitle: "Success Rate",
            percentage: `${data.successRate}%`,
            trend: parseFloat(data.successRate) > 50 ? "up" : "down",
          },
          {
            title: "Total Successful Payments",
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b47b272adafd451fd4dc159b4638a930ef09be26ade5e7422edd125a122da848?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a",
            figure: data.totalSuccessfulPayment,
            subTitle: "Pending Rate",
            percentage: `${data.pendingRate}%`,
            trend: data.pendingRate === "0.00" ? "up" : "down",
            isLight: true,
          },
          {
            title: "Total Failed Payments",
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e446998ae8969f443cea6f65cc4e29c000ad8192fc544781cb59af3d5b390c68?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a",
            figure: data.totalFailedPayment,
            subTitle: "Failure Rate",
            percentage: `${data.failureRate}%`,
            trend: parseFloat(data.failureRate) < 50 ? "up" : "down",
          },
          {
            title: "Cashflow",
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a3a48832b72d51ee4c914bfc147a9fed9e92fe799de981b463f8ef0313f32882?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a",
            figure: paymentFormatted,
            // Cashflow does not have a trend, so we omit it completely here
            isLight: true,
          },
        ];

        // Update the state with the new data from the API
        setOverviewData(mappedData);

        // Update localStorage with the fresh data
        localStorage.setItem("overviewData", JSON.stringify(mappedData));

      } catch (error) {
        console.error("Error fetching metrics data:", error);
        setError(error.message || "Failed to fetch data.");

        // If the API request fails, fall back to the cached data
        const cachedData = localStorage.getItem("overviewData");
        if (cachedData) {
          setOverviewData(JSON.parse(cachedData));
        }
      }
    };

    // Check if there is any data in localStorage
    const cachedData = localStorage.getItem("overviewData");
    if (cachedData) {
      setOverviewData(JSON.parse(cachedData));
    }

    // Fetch fresh data from the API
    fetchData();
  }, []);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div
      data-layername="overview"
      className="flex flex-wrap gap-4 items-start w-full max-md:max-w-full"
    >
      {overviewData.map((card, index) => (
        <OverviewCard key={index} {...card} />
      ))}
    </div>
  );
}

export default Overview;
