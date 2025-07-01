"use client";

import { useEffect, useState } from "react";
import { CustomerManagementHeader } from "./CustomerManagementHeader/CustomerManagementHeader";
import { FilterBar } from "./CustomerManagementHeader/FilterBar";
import { StatisticsDashboard } from "./CustomerManagementHeader/StatisticsDashboard";
import Table from "./Table";
import { Pagination } from "./CustomerManagementHeader/Pagination";

type Order = {
  id: number;
  orderId: string;
  orderDate: string;
  deliveryDate: string | null;
  amount: string;
  noOfItem: number;
  orderStatus: string;
  customerName: string;
};

export const CustomerManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    next_page_url: null,
    prev_page_url: null,
  });

  const fetchOrders = async (page = 1) => {
    const token = localStorage.getItem("accessToken");
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
      Authorization: token || "",
    };

    try {
      const res = await fetch(`${baseUrl}admin/order-list?page=${page}`, { headers });
      const json = await res.json();
      if (json.statusCode === 200 && Array.isArray(json.data.orders)) {
        setOrders(json.data.orders);
        setPagination(json.data.pagination);
      } else {
        console.error("Unexpected data format", json);
      }
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  useEffect(() => {
    fetchOrders(); // fetch page 1 by default
  }, []);

  return (
    <main className="flex flex-col p-6 mx-auto max-w-none w-full mt-4 bg-white max-md:max-w-full max-sm:max-w-screen-sm">
      <CustomerManagementHeader />
      <FilterBar />
      <StatisticsDashboard />
      <Table orders={orders} />
      <Pagination
        currentPage={pagination.current_page}
        totalPages={pagination.total_pages}
        onPageChange={(page) => fetchOrders(page)}
      />
    </main>
  );
};

export default CustomerManagement;
