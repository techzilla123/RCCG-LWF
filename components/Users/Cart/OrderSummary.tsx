import React, { useState, useEffect } from "react";
import { SummaryItemType } from "./types";
import CartDelivery from "./CartDelivery";

interface OrderSummaryProps {
  items: SummaryItemType[];
  totalItems: number;
  total: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  totalItems,
  total,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Separate Subtotal and Taxes from other items
  const taxes = items.find((item) => item.label.toLowerCase() === "taxes");
  const otherItems = items.filter(
    (item) =>
      item.label.toLowerCase() !== "subtotal" &&
      item.label.toLowerCase() !== "taxes"
  );

  // Open modal and prevent body scroll
  const handleCheckout = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable body scroll
  };

  // Close modal and enable body scroll
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Enable body scroll
  };

  useEffect(() => {
    // Cleanup when the component is unmounted
    return () => {
      document.body.style.overflow = "auto"; // Ensure scroll is enabled after modal is closed
    };
  }, []);

  return (
    <aside className="p-6 bg-white rounded-2xl min-w-60 w-[364px] max-md:px-5 border border-solid border-[#EAEAEA]">
      <h2 className="pb-4 w-full text-xl font-semibold tracking-normal leading-6 text-black border-b border-solid border-b-[color:var(--colour-stroke-default,#D5D5D5)]">
        Order summary
      </h2>

      <div className="flex-1 mt-6 w-full">
        {/* Other summary items */}
        {otherItems.map((item, index) => (
          <div
            key={index}
            className="flex gap-10 justify-between items-center w-full text-base tracking-normal mt-3"
          >
            <span className="self-stretch my-auto leading-6 text-neutral-500">
              {item.label}
            </span>
            <span
              className={`self-stretch my-auto  ${
                item.bold ? "font-semibold" : ""
              } leading-5 text-black`}
            >
              {item.amount}
            </span>
          </div>
        ))}

        {/* Taxes */}
        {taxes && (
          <div className="flex gap-10 justify-between items-center mt-2 w-full">
            <span className="text-base tracking-normal leading-6 text-neutral-500">
              Taxes
            </span>
            <span className="text-base font-semibold tracking-normal leading-5 text-black">
              {taxes.amount}
            </span>
          </div>
        )}

        {/* Shipping (unchanged) */}
        <div className="flex gap-10 justify-between items-center mt-4 w-full">
          <label className="flex gap-2 items-center self-stretch my-auto">
            <input type="checkbox" className="w-4 h-4 rounded" />
            <span className="text-base tracking-normal leading-6 whitespace-nowrap text-neutral-500">
              Shipping
            </span>
          </label>
          <span className="self-stretch my-auto text-base font-semibold tracking-normal leading-5 text-black">
            ---
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex gap-10 justify-between items-center pt-6 mt-6 w-full text-base tracking-normal border-t border-solid border-t-[color:var(--colour-stroke-default,#D5D5D5)]">
        <span className="self-stretch my-auto leading-6 text-neutral-500">
          TOTAL ({totalItems} items)
        </span>
        <span className="self-stretch my-auto font-semibold leading-5 text-black">
          {total}
        </span>
      </div>

      {/* Checkout Button */}
      <div className="flex gap-2 items-center mt-6 w-full">
        <button
          className="flex gap-2 justify-center items-center self-stretch my-auto w-full h-14 bg-blue-600 basis-[0%] flex-1 min-h-14 min-w-60 rounded-[50px] shrink-1"
          onClick={handleCheckout}
        >
          <span className="self-stretch my-auto text-base font-medium tracking-normal leading-6 text-center text-white">
            Proceed to checkout
          </span>
          <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-5">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/0ce34641f59b37d52efa24ad3ed287cc1edba4f6?placeholderIfAbsent=true"
              alt="Checkout arrow"
              className="object-contain self-stretch my-auto w-5 aspect-square"
            />
          </div>
        </button>
      </div>

      {/* Modal Popup for Cart Delivery */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black text-2xl font-bold"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                zIndex: 1000,
              }}
            >
              &times; {/* This is the "X" character */}
            </button>
            <CartDelivery />
          </div>
        </div>
      )}
    </aside>
  );
};
