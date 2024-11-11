import React from 'react';
import OverviewCard from './OverviewCard';

function Overview() {
  const overviewData = [
    { title: "Total Transactions", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3dcae055377a3673299445063dc0ec12ee87cb63d0108e9e2ec60efc052dbe0d?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a", figure: "200k", subTitle: "Success Rate", percentage: "60.50%", trend: "up" },
    { title: "Total Users", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b47b272adafd451fd4dc159b4638a930ef09be26ade5e7422edd125a122da848?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a", figure: "1.56m", subTitle: "Active", percentage: "17.54%", trend: "down", isLight: true },
    { title: "Total Payments", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e446998ae8969f443cea6f65cc4e29c000ad8192fc544781cb59af3d5b390c68?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a", figure: "20", subTitle: "Demand Rate", percentage: "40.31%", trend: "up" },
    { title: "Cashflow", icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a3a48832b72d51ee4c914bfc147a9fed9e92fe799de981b463f8ef0313f32882?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a", figure: "₦40m", subTitle: "Profit", percentage: "20.00%", trend: "up", isLight: true }
  ];

  return (
    <div data-layername="overview" className="flex flex-wrap gap-4 items-start w-full max-md:max-w-full">
      {overviewData.map((card, index) => (
        <OverviewCard key={index} {...card} />
      ))}
    </div>
  );
}

export default Overview;