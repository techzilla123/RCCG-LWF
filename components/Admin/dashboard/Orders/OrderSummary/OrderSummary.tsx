import React, { useEffect, useState } from "react";

interface OrderSummaryProps {
  id: number;
  orderId: string;
}

interface CustomerDetails {
  customerId: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  location: string | null;
  status: string;
  userType: string;
  registrationDate: string;
}

interface Order {
  quantity: number;
  amount: number;
  orderDate: string | null;
  deliveryDate: string | null;
  orderId: string;
  delivery_type: string;
  deliveryAddress: string;
  paymentStatus: string;
  customerDetails?: CustomerDetails; // ✅ Added customer details
}

const parseDeliveryAddress = (fullAddress: string) => {
  if (!fullAddress) return {};

  const addressTimeMatch = fullAddress.match(
    /Pickup at:\s*(.*?)\s*on\s*([\d]{4}-[\d]{2}-[\d]{2}\s+at\s+\d{2}:\d{2})/i
  );
  const phoneMatch = fullAddress.match(/Phone:\s*([^-]*)/i);
  const returnMatch = fullAddress.match(/Return:\s*([\d]{4}-[\d]{2}-[\d]{2}\s+at\s+\d{2}:\d{2})/i);
  const returnInstructionsMatch = fullAddress.match(/Return Instructions:\s*(.*)$/i);
  const instructionsMatch = fullAddress.match(/Instructions:\s*(.*)$/i);

  return {
    address: addressTimeMatch ? addressTimeMatch[1].trim() : null,
    time: addressTimeMatch ? addressTimeMatch[2].trim() : null,
    phone: phoneMatch ? phoneMatch[1].trim() : null,
    instructions: instructionsMatch ? instructionsMatch[1].trim() : null,
    returnDate: returnMatch ? returnMatch[1].trim() : null,
    returnInstructions: returnInstructionsMatch ? returnInstructionsMatch[1].trim() : null,
  };
};

export const OrderSummary: React.FC<OrderSummaryProps> = ({ id, orderId }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCustomer, setShowCustomer] = useState(false); // ✅ toggle state

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
      {/* Order Info */}
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

      {/* ✅ Delivery Info */}
      {(details.address || details.time) && (
  <p className="text-base text-black">
    <span className="text-neutral-500">
      {details.address?.includes("1919 Faithon P Lucas Sr. Blvd, #135, Mesquite TX 75181")
        ? "Store Pickup: "
        : "Delivery Address: "}
    </span>
    {details.address}
    {details.time && ` on ${details.time}`}
  </p>
)}


      {details.phone && (
        <div>
          <span className="text-base hidden text-neutral-500">Phone:</span>
          <div className="text-base hidden text-black">{details.phone}</div>
        </div>
      )}

      {details.instructions && (
        <div>
          <span className="text-base text-neutral-500">Instructions:</span>
          <div className="text-base text-black">{details.instructions}</div>
        </div>
      )}

      {details.returnDate && (
        <div>
          <span className="text-base text-neutral-500">Return Date:</span>
          <div className="text-base text-black">{details.returnDate}</div>
        </div>
      )}

      {details.returnInstructions && (
        <div>
          <span className="text-base text-neutral-500">Return Instructions:</span>
          <div className="text-base text-black">{details.returnInstructions}</div>
        </div>
      )}

      {/* ✅ Customer Details Toggle */}
      <button
        onClick={() => setShowCustomer((prev) => !prev)}
        className="px-4 py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        {showCustomer ? "Hide Customer Details" : "Show Customer Details"}
      </button>

      {showCustomer && order.customerDetails && (
        <div className="mt-4 p-4 border rounded-lg bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
          <p><strong>Name:</strong> {order.customerDetails.firstname} {order.customerDetails.lastname}</p>
          <p><strong>Email:</strong> {order.customerDetails.email}</p>
          <p><strong>Phone:</strong> {order.customerDetails.phoneNumber}</p>
          <p><strong>Status:</strong> {order.customerDetails.status}</p>
          <p><strong>User Type:</strong> {order.customerDetails.userType}</p>
          <p><strong>Registered:</strong> {formatDateTime(order.customerDetails.registrationDate)}</p>
        </div>
      )}
    </section>
  );
};
