"use client";

import React, { useEffect, useState } from "react";
import { StatCard } from "./StatCard";

interface StatsApiResponse {
  totalProducts: string;
  totalActive: string;
  totalPrice: string;
  rentals: string; // replacing totalOutOfStock with rentals
}

interface ProductCategory {
  noOfProducts?: number;
}


export default function StatisticsGrid() {
  const [stats, setStats] = useState<StatsApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      try {
        // Fetch analytics stats
        const analyticsRes = await fetch(`${baseUrl}admin/products/analytics`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            Authorization: token || "",
          },
        });

        const analyticsData = await analyticsRes.json();

        // Fetch rental stats
        const rentalRes = await fetch(
          `${baseUrl}admin/products/list-product-category/c7d6c7e5-aafe-439d-a714-63dd3910d3f9`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
              Authorization: token || "",
            },
          }
        );

        const rentalData = await rentalRes.json();

        if (analyticsRes.ok && rentalRes.ok && analyticsData?.data?.data && rentalData?.data) {
          const rentalsCount = rentalData.data.reduce(
           (total: number, cat: ProductCategory) => total + (cat.noOfProducts ?? 0),
            0
          );

      const totalProducts = parseInt(analyticsData.data.data.totalProducts, 10);
const totalActive = parseInt(analyticsData.data.data.totalActive, 10);
const totalOnRental = rentalsCount;

const onSale = totalActive - totalOnRental;

const mergedStats: StatsApiResponse = {
  totalProducts: totalProducts.toString(),
  totalActive: onSale.toString(), // updated: active - rentals
  totalPrice: analyticsData.data.data.totalPrice,
  rentals: totalOnRental.toString(),
};
  

          setStats(mergedStats);
        } else {
          console.error("Failed to load statistics:", analyticsData, rentalData);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const iconMap = {
    totalProducts: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/bdf0deebf19631f3b5ade00e2c10d69253dc1eb0?placeholderIfAbsent=true",
    totalActive: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/7c4e5e4d88da7d44004d32cee4b76237c55e44bf?placeholderIfAbsent=true",
    rentals: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/db48820fcaea9984803fa99f9c87fe9930bc3751?placeholderIfAbsent=true",
    totalPrice: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/9c6b670d9a53565e35d6a1891cb73bcab9d96bd6?placeholderIfAbsent=true",
  };

  const statTitles = {
    totalProducts: "Total Products",
    totalActive: "On Sale",
    rentals: "On Rental",
    totalPrice: "Total Price",
  };

  if (loading) return <div>Loading statistics...</div>;
  if (!stats) return <div>Failed to load statistics.</div>;

  return (
    <section className="flex flex-wrap gap-10 items-start">
   {(["totalProducts", "totalActive", "rentals", "totalPrice"] as (keyof StatsApiResponse)[]).map((key) => (
  <StatCard
    key={key}
    iconSrc={iconMap[key]}
    amount={key === "totalPrice" ? `$${stats[key]}` : stats[key]}
    title={statTitles[key]}
  />
))}

    </section>
  );
}
