'use client';

import React, { useEffect, useState } from 'react';
import { OrderHeader } from './OrderHeader';
import { OrderStatus } from './OrderStatus';
import { OrderItems } from './OrderItems';
import { OrderSummary } from './OrderSummary';

type Props = {
  onClose: () => void;
  order: {
    id: number;
    orderId: string;
  };
};

const OrderDetails: React.FC<Props> = ({ onClose, order }) => {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const headers = {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          Authorization: token || "",
        };

        const res = await fetch(`${baseUrl}admin/fetch-order/${order.id}/${order.orderId}`, { headers });
        const json = await res.json();

        if (json.statusCode === 200) {
          setStatus(json.data.status); // e.g., "pending" or "success"
        } else {
          console.error("API error:", json.message);
        }
      } catch (err) {
        console.error("Error fetching order status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatus();
  }, [order.id, order.orderId]);

  const getStatusLabel = (status: string | null) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <article className="flex flex-col items-center p-10 bg-white rounded-2xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] w-[575px] max-md:p-5 max-md:w-full max-sm:p-4 relative">
      <OrderHeader orderId={order.orderId} />
      <OrderStatus status={status} />
      <h2 className="text-xl text-black max-md:text-lg max-sm:text-base">
        {loading ? 'Loading...' : getStatusLabel(status)}
      </h2>

      <OrderItems id={order.id} orderId={order.orderId} />
      <OrderSummary id={order.id} orderId={order.orderId} />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 flex justify-center items-center w-10 h-10 max-sm:top-2 max-sm:right-2 max-sm:w-8 max-sm:h-8"
        aria-label="Close"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13.333 26.6668L26.6663 13.3335" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.3337 13.3335L26.667 26.6668" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </article>
  );
};

export default OrderDetails;
