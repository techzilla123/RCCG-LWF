"use client";

import React, { useEffect, useState } from "react";
import { StatCard } from "./StatCard";
import { ReceiptIcon } from "./ReceiptIcon";
import { CheckCircleIcon } from "./CheckCircleIcon";
import { InfoIcon } from "./InfoIcon";
import { ReceiptXIcon } from "./ReceiptXIcon";
import { CardsThreeIcon } from "./CardsThreeIcon";

interface OrderAnalytics {
  totalOrder: number;
  pendingOrder: number;
  ordersCompleted: number;
  ordersCanceled: number;
  totalAmount: number;
}

export const StatisticsDashboard: React.FC = () => {
  const [stats, setStats] = useState<OrderAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      try {
        const response = await fetch(`${baseUrl}admin/order-analytics`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            Authorization: token || "",
          },
        });

        const result = await response.json();

        if (response.ok && result?.data) {
          setStats(result.data);
        } else {
          console.error("Failed to load order analytics:", result);
        }
      } catch (error) {
        console.error("Error fetching order analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (!stats) {
    return <div>Failed to load dashboard statistics.</div>;
  }

  return (
    <section className="flex flex-wrap gap-6 items-start mt-8 max-md:gap-4 max-sm:flex-col max-sm:items-center">
      <StatCard icon={<ReceiptIcon />} value={stats.totalOrder.toString()} label="Total Orders" />
      <StatCard icon={<CheckCircleIcon />} value={stats.ordersCompleted.toString()} label="Successful" />
      <StatCard icon={<InfoIcon />} value={stats.pendingOrder.toString()} label="Pending" />
      <StatCard icon={<ReceiptXIcon />} value={stats.ordersCanceled.toString()} label="Unsuccessful" />
      <StatCard icon={<CardsThreeIcon />} value={`$${stats.totalAmount.toLocaleString()}`} label="Total Amount" />
    </section>
  );
};

export default StatisticsDashboard;
