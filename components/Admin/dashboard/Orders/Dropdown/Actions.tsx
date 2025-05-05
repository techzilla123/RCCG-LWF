import React, { useState, useEffect } from "react";
import OrderDetails from "../OrderSummary/OrderDetails";

const Actions = ({ direction = "down" }: { direction?: "up" | "down" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // ✅ Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <>
    {/* Only show dropdown when modal is NOT open */}
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
  
    {/* Modal with scroll support */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-4">
          <OrderDetails onClose={handleCloseModal} />
        </div>
      </div>
    )}
  </>
  
  );
};

export default Actions;
