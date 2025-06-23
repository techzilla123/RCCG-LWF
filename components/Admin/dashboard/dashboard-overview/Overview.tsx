"use client";

import React, { useEffect, useState } from "react";
import { MetricCard } from "./Overview/MetricCard";

export default function Overview() {
  const [metrics, setMetrics] = useState([
    {
      id: "customers",
      icon:
        "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/541c64119fd79525a390dc4b05eb17bcb05430c9?placeholderIfAbsent=true",
      title: "Customers",
      figure: "Loading...",
      growthRate: "N/A",
    },
    {
      id: "revenue",
      icon:
        "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/7ca6a3ab756358ff00aa888ac2327f2a1f0e8f69?placeholderIfAbsent=true",
      title: "Revenue",
      figure: "$500,000",
      growthRate: "5.40%",
    },
    {
      id: "profit",
      icon:
        "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/0a57ee82fbca8fcad62a7308b4764e86f43e025a?placeholderIfAbsent=true",
      title: "Profit",
      figure: "60.54%",
      growthRate: "10.20%",
    },
    {
      id: "orders",
      icon:
        "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/11404fd39753ada8f89bd4f09748c39b7b81bd97?placeholderIfAbsent=true",
      title: "Orders",
      figure: "Loading...",
      growthRate: "N/A",
    },
  ]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token || "",
      };

      try {
        // Customers
        const customerRes = await fetch(`${baseUrl}admin/customer-analytics`, {
          method: "GET",
          headers,
        });
        const customerJson = await customerRes.json();
        const noOfCustomer = customerJson.data?.noOfCustomer ?? 0;

        // Orders
        const orderRes = await fetch(`${baseUrl}admin/order-analytics`, {
          method: "GET",
          headers,
        });
        const orderJson = await orderRes.json();
        const totalOrder = orderJson.data?.totalOrder ?? 0;

        // Update state
        setMetrics((prev) =>
          prev.map((metric) => {
            if (metric.id === "customers") {
              return {
                ...metric,
                figure: noOfCustomer.toLocaleString(),
              };
            }
            if (metric.id === "orders") {
              return {
                ...metric,
                figure: totalOrder.toLocaleString(),
              };
            }
            return metric;
          })
        );
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <section className="flex flex-wrap gap-6 items-start">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          icon={metric.icon}
          title={metric.title}
          figure={metric.figure}
          growthRate={metric.growthRate}
        />
      ))}
    </section>
  );
}
