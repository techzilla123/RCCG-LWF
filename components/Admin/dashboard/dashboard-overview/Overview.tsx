"use client";

import React from "react";
import { MetricCard } from "./Overview/MetricCard";

const metrics = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/541c64119fd79525a390dc4b05eb17bcb05430c9?placeholderIfAbsent=true",
    title: "Customers",
    figure: "350,000",
    growthRate: "17.54%",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/7ca6a3ab756358ff00aa888ac2327f2a1f0e8f69?placeholderIfAbsent=true",
    title: "Revenue",
    figure: "$500,000",
    growthRate: "5.40%",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/0a57ee82fbca8fcad62a7308b4764e86f43e025a?placeholderIfAbsent=true",
    title: "Profit",
    figure: "60.54%",
    growthRate: "10.20%",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/11404fd39753ada8f89bd4f09748c39b7b81bd97?placeholderIfAbsent=true",
    title: "Orders",
    figure: "2,040",
    growthRate: "1.22%",
  },
];

export default function Overview() {
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
