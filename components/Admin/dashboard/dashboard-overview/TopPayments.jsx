import React, { useState, useEffect } from "react";

function TopPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;
  
      try {
        // ✅ Fetch from dashboardMeta instead of transactionCount
        const dashboardMeta = JSON.parse(localStorage.getItem("dashboardMeta") || "{}");
        const transactionCount = parseInt(dashboardMeta.totalTransactions || "0");
        if (transactionCount <= 0) return;
  
        const itemsPerPage = 5;
        let page = Math.floor(transactionCount / 1000) + 1;
        page = page > 1 ? page : 1;
  
        const offset = (page - 1) * itemsPerPage;
  
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard/payments?page=${page}&limit=${itemsPerPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch payments");
        }
  
        const data = await response.json();
        let currentPayments = data.payments || [];
  
        // If current page has fewer than 5, fetch the remainder from the previous page
        if (currentPayments.length < itemsPerPage) {
          const missingItems = itemsPerPage - currentPayments.length;
          const prevPage = page - 1;
  
          if (prevPage > 0) {
            const prevResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard/payments?page=${prevPage}&limit=${missingItems}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
  
            if (!prevResponse.ok) {
              throw new Error("Failed to fetch previous page payments");
            }
  
            const prevData = await prevResponse.json();
            const prevPayments = prevData.payments || [];
  
            // Merge both to complete 5 items
            currentPayments = [...prevPayments.slice(-missingItems), ...currentPayments];
          }
        }
  
        const latestPayments = currentPayments
          .sort((a, b) => new Date(b.created_date_time) - new Date(a.created_date_time))
          .slice(0, itemsPerPage)
          .map((payment) => ({
            type: payment.payment_type.replace(/_/g, " "),
            name: payment.name,
            amount: `₦${(payment.transaction_amount / 100).toLocaleString()}`,
          }));
  
        setPayments(latestPayments);
        localStorage.setItem("transactions", JSON.stringify(latestPayments));
  
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
  
    fetchPayments();
    const interval = setInterval(fetchPayments, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div data-layername="chartGroup" className="flex overflow-hidden flex-col flex-1 shrink self-start px-6 py-7 bg-white rounded-lg border border-solid basis-0 border-zinc-300 min-w-[240px] max-md:px-5 max-md:max-w-full">
      <div data-layername="heading" className="flex gap-2 items-center w-full max-md:max-w-full">
        <div data-layername="title" className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-0 min-w-[240px]">
          <div data-layername="figureAmount" className="text-sm font-semibold text-black">Top Payments</div>
          <div data-layername="figureAmount" className="mt-1 text-xs text-neutral-700">Latest transactions</div>
        </div>
      </div>
      <div data-layername="chart" className="flex gap-2.5 justify-center items-start w-full rounded-lg border border-solid bg-black bg-opacity-0 border-black border-opacity-0 h-[289px] max-md:max-w-full">
        <div data-layername="list" className="flex flex-col flex-1 shrink py-2 w-full basis-0 min-w-[240px] max-md:max-w-full">
          {payments.length > 0 ? (
            payments.map((payment, index) => (
              <div key={index} data-layername="rowText" className="flex overflow-hidden gap-4 items-center px-0 py-2 w-full bg-white border-b border-solid border-b-zinc-300 min-h-[60px] max-md:max-w-full">
                <div data-layername="description" className="flex flex-1 shrink gap-2 items-center self-stretch my-auto basis-0 min-w-[240px]">
                  <div data-layername="icon" className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-9 h-9 bg-neutral-100 rounded-[100px]">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/29527e7362feee70dabab28e5354772f4c258f1e19d39b065b4c1e9b940a25c8?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" className="object-contain self-stretch my-auto w-5 aspect-square" alt="" />
                  </div>
                  <div data-layername="text" className="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-4 min-w-[240px]">
                    <div data-layername="bedcPayment" className="text-base text-black">{payment.type}</div>
                    <div data-layername="bedcPayment" className="mt-1 text-xs text-neutral-500">{payment.name}</div> 
                  </div>
                </div>
                <div className="flex flex-col self-stretch my-auto text-base text-black whitespace-nowrap w-[80px]">
                  <div data-layername="iconText" className="flex flex-wrap items-center w-full rounded-lg min-h-[24px]">
                    <div data-layername="text" className="flex-1 shrink self-stretch my-auto w-full rounded-lg">
                      {payment.amount}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-neutral-500">No recent payments</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopPayments;
