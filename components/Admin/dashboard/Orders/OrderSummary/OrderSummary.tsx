import React, { useEffect, useState } from "react";

interface OrderSummaryProps {
  id: number;
  orderId: string;
}

interface Order {
  quantity: number;
  amount: number;
  orderDate: string | null;
  deliveryDate: string | null;
  orderId: string;
   delivery_type: string;
  deliveryAddress: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ id, orderId }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token || "",
      };

      try {
        const response = await fetch(
          `${baseUrl}admin/fetch-order/${id}/${orderId}`,
          { headers }
        );

        const json = await response.json();
        if (json.statusCode === 200) {
          setOrder(json.data);
        } else {
          console.error("API error:", json.message);
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, orderId]);

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  if (loading) return <div>Loading order summary...</div>;
  if (!order) return <div>Unable to load order summary.</div>;

  return (
    <section className="flex flex-col gap-4 p-6 w-full rounded-lg bg-stone-50">
      <div className="flex justify-between w-full">
        <span className="text-base text-neutral-500">Items:</span>
        <span className="text-base text-black">{order.quantity}</span>
      </div>
      <div className="flex justify-between w-full">
        <span className="text-base text-neutral-500">Total Amount:</span>
        <span className="text-base text-black">${order.amount}</span>
      </div>
      <hr className="w-full h-px bg-gray-200 border-0" />
      <div className="flex justify-between w-full">
        <span className="text-base text-neutral-500">Transaction date:</span>
        <span className="text-base text-black">
          {formatDateTime(order.orderDate)}
        </span>
      </div>
      <div className="flex justify-between w-full">
        <span className="text-base text-neutral-500">Delivered:</span>
        <span className="text-base text-black">
          {formatDateTime(order.deliveryDate)}
        </span>
      </div>
      <div className="flex justify-between w-full">
        <span className="text-base text-neutral-500">Order ID:</span>
        <div className="flex gap-2 items-center">
          <span className="text-base text-black">{order.orderId}</span>
          <button aria-label="Copy order ID">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.33366 7.52484V9.97484C9.33366 12.0165 8.51699 12.8332 6.47533 12.8332H4.02533C1.98366 12.8332 1.16699 12.0165 1.16699 9.97484V7.52484C1.16699 5.48317 1.98366 4.6665 4.02533 4.6665H6.47533C8.51699 4.6665 9.33366 5.48317 9.33366 7.52484Z"
                stroke="#007AFF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.8337 4.02484V6.47484C12.8337 8.5165 12.017 9.33317 9.97533 9.33317H9.33366V7.52484C9.33366 5.48317 8.51699 4.6665 6.47533 4.6665H4.66699V4.02484C4.66699 1.98317 5.48366 1.1665 7.52533 1.1665H9.97533C12.017 1.1665 12.8337 1.98317 12.8337 4.02484Z"
                stroke="#007AFF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

        </div>
        
      </div>
      <div className="flex justify-between w-full">
  <span className="text-base text-neutral-500">Delivery Type:</span>
  <span className="text-base text-black capitalize">{order.delivery_type}</span>
</div>
<div className="flex justify-between w-full">
  <span className="text-base text-neutral-500">Delivery Address:</span>
  <span className="text-base text-black">{order.deliveryAddress}</span>
</div>

    </section>
  );
};
