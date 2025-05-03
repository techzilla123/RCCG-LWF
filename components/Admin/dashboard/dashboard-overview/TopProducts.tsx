import React from "react";

export const TopProducts = () => {
  const products = [
    {
      name: "Colourful Kids Birthday Latex...",
      shop: "Balloon shop",
      sales: "$10,800",
    },
    {
      name: "Transparent Bubble Balloon...",
      shop: "Balloon shop",
      sales: "$8,950",
    },
    {
      name: "Elegant Golden Age Birthday...",
      shop: "Birthday shop",
      sales: "$5,680",
    },
    {
      name: "All-In-One Happy Birthday...",
      shop: "Birthday shop",
      sales: "$5,140",
    },
    {
      name: "Deluxe Dessert Station Setup...",
      shop: "Holidays & occasion",
      sales: "$4,900",
    },
  ];

  return (
    <section className="flex flex-col p-4 w-full bg-white rounded-xl border border-gray-200 shadow-sm ">
      <header className="flex gap-2 items-center pb-4">
        <h3 className="flex-1 text-base font-semibold leading-5 text-black">
          Top Products
        </h3>
        <button className="flex items-center gap-2 h-8 px-2 rounded-lg hover:bg-gray-100">
          <span className="text-sm leading-6 text-black">On sales</span>
          <img src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/82c8f9d069e7aa215abfaeb6a6822903eb0491ec?placeholderIfAbsent=true" alt="" className="w-4 h-4" />
        </button>
      </header>

      <div className="flex items-center pb-2">
        <div className="flex-1">
          <div className="py-2 px-4 text-sm text-black bg-stone-50">
            Products
          </div>
          {products.map((product, index) => (
            <div
              key={index}
              className="flex p-2 mt-2 h-14 border-b border-[#EAEAEA]"
            >
              <div className="flex flex-col justify-center">
                <p className="text-base text-black">{product.name}</p>
                <p className="text-sm text-neutral-500">{product.shop}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[100px]">
          <div className="relative p-2 bg-stone-50">
            <span className="text-sm leading-6 text-black">Total sales</span>
          </div>
          {products.map((product, index) => (
            <div
              key={index}
              className="flex p-2 mt-2 h-14 text-right border-b border-[#EAEAEA]"
            >
              <p className="text-base text-black">{product.sales}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="self-center pt-4 pb-1 text-sm font-medium  text-black hover:text-gray-700">
        See more
      </button>
    </section>
  );
};
