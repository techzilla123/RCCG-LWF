import React from "react";

export const OrdersChart = () => {
  return (
    <section className="overflow-hidden py-4 pr-6 pl-4 mt-6 w-full bg-white rounded-lg">
      <header className="flex flex-wrap gap-2 items-center w-full">
        <h3 className="flex-1 text-base font-semibold leading-5 text-black">
          Orders
        </h3>
        <div className="flex gap-2">
          <button className="p-4 w-6 h-6 rounded hover:bg-gray-100">
            <img src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/65a7ad88921bf1baa82e03375b8738d97fbf2a72?placeholderIfAbsent=true" alt="" className="w-4 h-4" />
          </button>
          <button className="p-4 w-6 h-6 rounded hover:bg-gray-100">
            <img src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/82c8f9d069e7aa215abfaeb6a6822903eb0491ec?placeholderIfAbsent=true" alt="" className="w-4 h-4" />
          </button>
        </div>
      </header>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/5922c2f388482a47a5fb054a0381ec846c62ffd8?placeholderIfAbsent=true"
        alt="Orders Chart"
        className="object-contain mt-4 w-full aspect-[2.82]"
      />
    </section>
  );
};
