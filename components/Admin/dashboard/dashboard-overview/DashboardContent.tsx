import React from "react";
import { StatisticsCard } from "./StatisticsCard";
import { PieChartsSection } from "./PieChartsSection";
import { CashflowChart } from "./CashflowChart";
import { OrdersChart } from "./OrdersChart";
import { TopProducts } from "./TopProducts";
import { RecentOrders } from "./RecentOrders";

export const DashboardContent = () => {
  const statistics = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/e04b8b6a7f9829c4388bd4acc12c0063434c3306?placeholderIfAbsent=true",
      title: "Customers",
      value: "350,000",
      growth: { value: "17.54%", trend: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/f842f35b5a0800c849fcc79d2bb38ba019a8f696?placeholderIfAbsent=true" },
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/7ca6a3ab756358ff00aa888ac2327f2a1f0e8f69?placeholderIfAbsent=true",
      title: "Revenue",
      value: "$500,000",
      growth: { value: "5.40%", trend: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/f842f35b5a0800c849fcc79d2bb38ba019a8f696?placeholderIfAbsent=true" },
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/0a57ee82fbca8fcad62a7308b4764e86f43e025a?placeholderIfAbsent=true",
      title: "Profit",
      value: "60.54%",
      growth: { value: "10.20%", trend: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/f842f35b5a0800c849fcc79d2bb38ba019a8f696?placeholderIfAbsent=true" },
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/d0df740ccdafbfc12cb23e7d96b623820d92b068?placeholderIfAbsent=true",
      title: "Orders",
      value: "2,040",
      growth: { value: "1.22%", trend: "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/f842f35b5a0800c849fcc79d2bb38ba019a8f696?placeholderIfAbsent=true" },
    },
  ];

  return (
    <section className="pr-8 pb-8 pl-6 mt-6 min-h-screen w-full bg-white max-md:px-5 max-md:max-w-full">
      <header className="pb-6 w-full border-b border-[#EAEAEA]">
        <div className="flex flex-col justify-center pt-6 w-full bg-white">
          <h3 className="text-3xl font-semibold leading-10 text-black">
            Dashboard
          </h3>
        </div>
      </header>

      <div className="flex flex-wrap gap-6 items-start mt-6 w-full">
        {statistics.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </div>

      {/* Section with custom 1600px media query */}
<div className="flex flex-wrap gap-6 items-start mt-6 w-full">
  <div className="flex-1 shrink basis-0 min-w-60">
    <PieChartsSection />
    <CashflowChart />
    <OrdersChart />
  </div>

  {/* Adjusted aside with max-width adjustment for screens < 1600px */}
  <aside className="flex-1 shrink basis-0 min-w-[360px] max-w-[420px] w-full custom-max-width-1600">
    <TopProducts />
    <RecentOrders />
  </aside>
</div>

{/* Custom media query for screens greater than 1600px */}
<style>
  {`
    @media (min-width: 1600px) {
      .custom-max-width-1600 {
        max-width: 100% !important;
      }
    }
  `}
</style>

    </section>
  );
};
