import React from "react";

export const RecentOrders = () => {
  const orders = [
    {
      id: "ORD-9284FHT7",
      customer: "Cynthia Morgan",
      amount: "$600",
    },
    {
      id: "HBD-58YVJ2K9",
      customer: "Mateo Silva",
      amount: "$900",
    },
    {
      id: "PAS-9K3VJ2K0",
      customer: "John Carlson",
      amount: "$1,930",
    },
    {
      id: "DEC-8492DK201",
      customer: "Fatoumata Diallo",
      amount: "$2,400",
    },
    {
      id: "HOO-0KMSL9E0D",
      customer: "Hiroshi Tana@email.com",
      amount: "$720",
    },
  ];

  return (
    <section className="flex flex-col p-4 mt-6 w-full bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <header className="flex gap-2 items-center pb-4">
        <h3 className="flex-1 text-base font-semibold leading-5 text-black">
          Recent Orders
        </h3>
      </header>

      <div className="flex items-center pb-2">
        <div className="flex-1">
          <div className="p-2 text-sm text-black rounded-lg bg-stone-50">
            Order ID
          </div>
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex p-2 mt-2 h-14 border-b border-[#EAEAEA]"
            >
              <div className="flex flex-col justify-center">
                <a href="#" className="text-blue-600 underline">
                  {order.id}
                </a>
                <p className="text-neutral-500">{order.customer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[100px]">
          <div className="relative p-2 bg-stone-50">
            <span className="text-sm leading-6 text-black">Amount</span>
          </div>
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex p-2 mt-2 h-14 text-right border-b border-[#EAEAEA]"
            >
              <p className="text-base text-black">{order.amount}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="self-center pt-4 pb-1 text-sm font-medium text-black hover:text-blue-700">
        See more
      </button>
    </section>
  );
};
