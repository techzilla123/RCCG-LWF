"use client";

import * as React from "react";
import { StatCard } from "./StatCard";

const statsData = [
  {
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/bdf0deebf19631f3b5ade00e2c10d69253dc1eb0?placeholderIfAbsent=true",
    amount: "240",
    title: "Total Products"
  },
  {
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/7c4e5e4d88da7d44004d32cee4b76237c55e44bf?placeholderIfAbsent=true",
    amount: "180",
    title: "On Sale"
  },
  {
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/db48820fcaea9984803fa99f9c87fe9930bc3751?placeholderIfAbsent=true",
    amount: "60",
    title: "Rentals"
  },
  {
    iconSrc: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/9c6b670d9a53565e35d6a1891cb73bcab9d96bd6?placeholderIfAbsent=true",
    amount: "$503,000",
    title: "Total Sales"
  }
];

export default function StatisticsGrid() {
  return (
    <section className="flex flex-wrap gap-10  items-start">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          iconSrc={stat.iconSrc}
          amount={stat.amount}
          title={stat.title}
        />
      ))}
    </section>
  );
}