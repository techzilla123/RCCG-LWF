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
  };
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [statusForm, setStatusForm] = useState({
    status: "APPROVED",
    description: "",
    delivery_date: "",
    delivery_time: "",
  });

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = localStorage.getItem("accessToken");

  const handleViewClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleChangeStatusClick = () => setIsStatusModalOpen(true);
  const handleDeleteClick = () => setIsDeleteModalOpen(true);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setStatusForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitStatusChange = async () => {
    const payload = {
      product_order_id: String(order.id),
      order_id: String(order.orderId),
      status: statusForm.status,
      description: statusForm.description,
      delivery_date: statusForm.delivery_date,
    };

    try {
      const response = await fetch(`${baseUrl}admin/change-order-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          Authorization: token || "",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Order status updated successfully!");
        setIsStatusModalOpen(false);
        window.location.reload();
      } else {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        alert("Failed to update order status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred.");
    }
  };

  // 🔴 DELETE HANDLERS
  const handleDeleteSubOrder = async () => {
    try {
      const response = await fetch(
        `${baseUrl}admin/delete-sub-order/${order.id}/${order.orderId}`,
        {
          method: "DELETE",
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            Authorization: token || "",
          },
        }
      );
      if (response.ok) {
        alert("Sub-order deleted successfully!");
        setIsDeleteModalOpen(false);
        window.location.reload();
      } else {
        alert("Failed to delete sub-order.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const response = await fetch(
        `${baseUrl}admin/delete-order/${order.orderId}`,
        {
          method: "DELETE",
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            Authorization: token || "",
          },
        }
      );
      if (response.ok) {
        alert("Order deleted successfully!");
        setIsDeleteModalOpen(false);
        window.location.reload();
      } else {
        alert("Failed to delete order.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    }
  };

  useEffect(() => {
    document.body.style.overflow =
      isModalOpen || isStatusModalOpen || isDeleteModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, isStatusModalOpen, isDeleteModalOpen]);

  return (
    <>
      {!isModalOpen && !isStatusModalOpen && !isDeleteModalOpen && (
        <div
          className={`w-32 bg-white shadow-lg border rounded-xl py-2 text-sm text-black ${
            direction === "up" ? "bottom-full mb-2" : "top-full mt-2"
          } absolute right-0 z-50`}
        >
          <div
            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            onClick={handleViewClick}
          >
            View
          </div>
          <div
            className="px-2 py-1 text-sm hover:bg-blue-100 text-blue-600 cursor-pointer"
            onClick={handleChangeStatusClick}
          >
            Change Status
          </div>
          <div
            className="px-4 py-2 text-sm text-red-500 hover:bg-red-100 cursor-pointer"
            onClick={handleDeleteClick}
          >
            Delete
          </div>
        </div>
      )}

      {/* View Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <OrderDetails order={order} onClose={handleCloseModal} />
          </div>
        </div>
      )}

      {/* Change Status Modal */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Change Order Status</h3>

              <label className="block mb-2 text-sm font-medium">Status</label>
              <select
                name="status"
                value={statusForm.status}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mb-4"
              >
                <option value="APPROVED">APPROVED</option>
                <option value="IN-PROGRESS">IN-PROGRESS</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="PICKED UP">PICKED UP</option>
                <option value="RETURNED">RETURNED</option>
              </select>

              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={statusForm.description}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-2 text-sm font-medium">Delivery Date</label>
              <input
                type="date"
                name="delivery_date"
                value={statusForm.delivery_date}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mb-4"
              />

              <label className="block mb-2 text-sm font-medium">Delivery Time</label>
              <input
                type="time"
                name="delivery_time"
                value={statusForm.delivery_time}
                onChange={handleInputChange}
                className="w-full border p-2 rounded mb-4"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsStatusModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitStatusChange}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

     {/* 🔴 Delete Modal */}
{isDeleteModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm relative">
        {/* Close (X) button */}
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        <h3 className="text-lg font-semibold mb-4 text-red-600">
          Delete Order
        </h3>
        <p className="text-sm mb-4">
          Do you want to delete the entire order or just this sub-order?
        </p>
        <div className="flex justify-between">
          <button
            onClick={handleDeleteSubOrder}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Delete Sub-order
          </button>
          <button
            onClick={handleDeleteOrder}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete Order
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default Actions;
