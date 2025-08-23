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
  paymentStatus: string; // ✅ Added paymentStatus
}

const parseDeliveryAddress = (fullAddress: string) => {
  if (!fullAddress) return {};

  // Match "Pickup at: {address} on {date and time}"
  const addressTimeMatch = fullAddress.match(
    /Pickup at:\s*(.*?)\s*on\s*([\d]{4}-[\d]{2}-[\d]{2}\s+at\s+\d{2}:\d{2})/i
  );

  const phoneMatch = fullAddress.match(/Phone:\s*([^-]*)/i);
  const instructionsMatch = fullAddress.match(/Instructions:\s*(.*)$/i);

  return {
    address: addressTimeMatch ? addressTimeMatch[1].trim() : null,
    time: addressTimeMatch ? addressTimeMatch[2].trim() : null,
    phone: phoneMatch ? phoneMatch[1].trim() : null,
    instructions: instructionsMatch ? instructionsMatch[1].trim() : null,
  };
};

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

  const details = parseDeliveryAddress(order.deliveryAddress);

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
        </div>
      </div>
      <div className="flex justify-between w-full">
        <span className="text-base text-neutral-500">Delivery Type:</span>
        <span className="text-base text-black capitalize">
          {order.delivery_type}
        </span>
      </div>

      {/* ✅ Payment Status */}
      <div className="flex justify-between w-full">
        <span className="text-base text-neutral-500">Payment Status:</span>
        <span
          className={`text-base font-medium ${
            order.paymentStatus.toLowerCase() === "paid"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {order.paymentStatus}
        </span>
      </div>

      {/* Parsed Delivery Info */}
      {(details.address || details.time) && (
        <p className="text-base text-black">
          <span className="text-neutral-500">Delivery Address: </span>
          {details.address}
          {details.time && ` on ${details.time}`}
        </p>
      )}

      {details.phone && (
        <div>
          <span className="text-base text-neutral-500">Phone:</span>
          <div className="text-base text-black">{details.phone}</div>
        </div>
      )}
      {details.instructions && (
        <div>
          <span className="text-base text-neutral-500">Instructions:</span>
          <div className="text-base text-black">{details.instructions}</div>
        </div>
      )}
    </section>
  );
};
