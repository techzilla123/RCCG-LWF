"use client";

import React, { useState, useEffect } from "react";
import Content from "./CustomerOd/Content";
import { Header } from "./CustomerOd/Header";
import Table from "./Table";
import { Pagination } from "./CustomerOd/Pagination";

export const CustomerManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const itemsPerPage = 5;

  // 🔹 fetch total orders once from API
  useEffect(() => {
    const fetchTotalOrders = async () => {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/fetch-customer/01jypjjn1zj692xg9f433hw94q`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
        }
      );
      const data = await res.json();
      if (data.statusCode === 200) {
        setTotalOrders(data.data.orderList.length);
      }
    };
    fetchTotalOrders();
  }, []);

  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  return (
    <main className="flex flex-col p-6 mx-auto w-full mt-4 bg-white">
      <Content />
      <Header />
      <Table currentPage={currentPage} itemsPerPage={itemsPerPage} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </main>
  );
};

export default CustomerManagement;
