import React from 'react';
import OverviewCard from './OverviewCard';

const overviewData = [
  { title: 'Total Users', amount: '200k', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f496623981331c884e6041f6250e946c7763806e650c989bad7a1c3fcba8f7da?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a', bgColor: 'bg-white' },
  { title: 'Active Users', amount: '180k', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8471afbf4de2d46979de3503fcf58e812d5c453132243a4e564cbe92e516177d?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a', bgColor: 'bg-neutral-100' },
  { title: 'New Users', amount: '5k', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6425e0b5b6bbc62c5dcdd7acc88245d691e676bec851c96c1153a2d330148d2e?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a', bgColor: 'bg-white' },
];

function Overview() {
  return (
    <section className="flex flex-wrap gap-4 items-start w-full max-md:max-w-full ">
      {overviewData.map((data, index) => (
        <OverviewCard key={index} {...data} />
      ))}
    </section>
  );
}

export default Overview;