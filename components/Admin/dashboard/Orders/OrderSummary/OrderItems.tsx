import React, { useEffect, useState } from 'react';
import { ItemCard } from './ItemCard';

interface OrderItemsProps {
  id: number;
  orderId: string;
}

export const OrderItems: React.FC<OrderItemsProps> = ({ id, orderId }) => {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const headers = {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          Authorization: token || "",
        };

        const res = await fetch(`${baseUrl}admin/fetch-order/${id}/${orderId}`, { headers });
        const json = await res.json();

        if (json.statusCode === 200) {
          const order = json.data;
          const product = order.productDetails;

          setItem({
            image: product.imageOne,
            title: `${product.productName} (${order.color}, ${order.size})`,
            quantity: order.quantity
          });
        } else {
          console.error("API error:", json.message);
        }
      } catch (err) {
        console.error("Failed to fetch order item:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, orderId]);

  if (loading) return <div>Loading item...</div>;
  if (!item) return <div>Item not found.</div>;

  return (
    <section className="flex flex-col w-full">
      <h2 className="pb-3 w-full text-xl font-bold text-black border-b border-solid border-b-neutral-300 max-md:text-lg max-sm:text-base">
        Items
      </h2>
      <ItemCard
        image={item.image}
        title={item.title}
        quantity={item.quantity}
      />
    </section>
  );
};
