import React, { useState, useEffect } from "react";
import OrderDetails from "../OrderSummary/OrderDetails";

const Actions = ({
  direction = "down",
  order,
}: {
  direction?: "up" | "down";
  order: {
    id: number;
    orderId: string;
    // add other properties here if needed
  };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <>
      {!isModalOpen && (
        <div
          className={`w-32 bg-white shadow-lg border rounded-xl py-2 text-sm text-black ${
            direction === "up" ? "bottom-full mb-2" : "top-full mt-2"
          } absolute right-0 z-50`}
        >
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={handleViewClick}
          >
            View
          </div>
          <div className="px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer">
            Delete
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <OrderDetails order={order} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Actions;

