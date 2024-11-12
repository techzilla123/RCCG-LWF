import React from 'react';
import OverviewCard from './OverviewCard';

const overviewData = [
  { title: 'Total Transactions', amount: '200k', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/02a1ca2f7df34bd9e6e4cf5c4f68134f1fb987b88f8be659e5177d2a89817907?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a', bgColor: 'bg-violet-50', active: false },
  { title: 'Successful', amount: '180k', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/143935c272f2d91f7b632ce90f33b435d89a30d2678baaeed7a5757c6ef78cec?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a', bgColor: 'bg-teal-50', active: true },
  { title: 'Pending', amount: '15k', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c0f3c7ffa83000238c8ed8bd150c21008078e6de13fbf0b934412d8cb5f80d3e?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a', bgColor: 'bg-yellow-50', active: false },
  { title: 'Unsuccessful', amount: '5k', icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/88a1ee802318177e0c4b16e4ef5101e3bede31d5e45f693be92dc42de50a1f13?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a', bgColor: 'bg-red-50', active: true },
];

function TransactionOverview() {
  return (
    <div className="flex flex-wrap gap-4 items-start w-full max-md:max-w-full">
      {overviewData.map((data, index) => (
        <OverviewCard key={index} {...data} />
      ))}
    </div>
  );
}

export default TransactionOverview;