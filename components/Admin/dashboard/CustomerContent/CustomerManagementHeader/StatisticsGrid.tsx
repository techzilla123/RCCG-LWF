import { useEffect, useState } from "react";
import { StatCard } from "./StatCard";
import {
  UsersIcon,
  VerifiedIcon,
  ActiveIcon,
  VisitorsIcon,
} from "./Icons";

export const StatisticsGrid = () => {
  const [stats, setStats] = useState({
    noOfCustomer: 0,
    noOfActiveCustomer: 0,
    noOfVerifiedCustomer: 0,
    noOfGuestCustomer: 0,
  });

  // ✅ Formatter for compact numbers like 1K, 1M, etc.
  const formatNumber = (number: number) => {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      compactDisplay: "short",
    }).format(number);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/customer-analytics`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
              ...(token && { Authorization: token }),
            },
          }
        );

        const result = await response.json();

        if (response.ok && result.statusCode === 200) {
          setStats(result.data);
        } else {
          console.error("Failed to fetch stats:", result.message);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="flex gap-6 mt-6 max-md:flex-col max-sm:flex-col">
      <StatCard icon={<UsersIcon />} value={formatNumber(stats.noOfCustomer)} label="Total Users" />
      <StatCard icon={<VerifiedIcon />} value={formatNumber(stats.noOfVerifiedCustomer)} label="Verified" />
      <StatCard icon={<ActiveIcon />} value={formatNumber(stats.noOfActiveCustomer)} label="Active" />
      <StatCard icon={<VisitorsIcon />} value={formatNumber(stats.noOfGuestCustomer)} label="Visitors" />
    </section>
  );
};
