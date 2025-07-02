import React, { useState, useEffect } from 'react';
import OverviewCard from './OverviewCard';

function TransactionOverview() {
  const [overviewDatas, setOverviewDatas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverviewDatas = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Authorization token is missing");
        return;
      }

      try {
        const cachedData = localStorage.getItem("overviewDatas");

        // If cached data exists, use it directly
        if (cachedData) {
          setOverviewDatas(JSON.parse(cachedDatas));
          return;
        }

        // If no cached data, fetch from API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard/metrics`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch overview data");
        }

        const data = await response.json();

        localStorage.setItem("transactionCount", data.transactionCount);
        
        const updatedOverviewDatas = [
          {
            title: 'Total Transactions',
            amount: data.transactionCount,
            icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/02a1ca2f7df34bd9e6e4cf5c4f68134f1fb987b88f8be659e5177d2a89817907?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a',
            bgColor: 'bg-violet-50',
            active: false,
          },
          {
            title: 'Successful',
            amount: data.totalSuccessfulPayment,
            icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/143935c272f2d91f7b632ce90f33b435d89a30d2678baaeed7a5757c6ef78cec?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a',
            bgColor: 'bg-teal-50',
            active: true,
          },
          {
            title: 'Pending',
            amount: data.totalPendingPayment,
            icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c0f3c7ffa83000238c8ed8bd150c21008078e6de13fbf0b934412d8cb5f80d3e?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a',
            bgColor: 'bg-yellow-50',
            active: false,
          },
          {
            title: 'Unsuccessful',
            amount: data.totalFailedPayment,
            icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/88a1ee802318177e0c4b16e4ef5101e3bede31d5e45f693be92dc42de50a1f13?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a',
            bgColor: 'bg-red-50',
            active: true,
          },
        ];

        // Save the fetched data in localStorage for future use
        localStorage.setItem("overviewData", JSON.stringify(updatedOverviewDatas));

        setOverviewDatas(updatedOverviewDatas);

      } catch (err) {
        setError(err.message);
      }
    };

    fetchOverviewDatas();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-wrap gap-4 items-start w-full max-md:max-w-full">
      {overviewDatas.map((data, index) => (
        <OverviewCard key={index} {...data} />
      ))}
    </div>
  );
}

export default TransactionOverview;
