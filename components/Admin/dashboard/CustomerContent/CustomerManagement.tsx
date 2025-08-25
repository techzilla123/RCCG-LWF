"use client";
import { useState, useEffect } from "react";
import { CustomerManagementHeader } from "./CustomerManagementHeader/CustomerManagementHeader";
import { FilterBar } from "./CustomerManagementHeader/FilterBar";
import { StatisticsGrid } from "./CustomerManagementHeader/StatisticsGrid";
import Table from "./Table";
import { Pagination } from "./CustomerManagementHeader/Pagination";

export const CustomerManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const usersPerPage = 10;

  // Fetch users here
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/customer-list`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
              ...(token && { Authorization: token }),
            },
          }
        );
        const result = await response.json();
        if (result.statusCode === 200) {
          setUsers(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <main className="flex flex-col p-6 mx-auto w-full mt-4 bg-white">
      <CustomerManagementHeader />
      <FilterBar />
      <StatisticsGrid />

      {/* Table gets users + pagination props */}
      <Table
        users={users}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </main>
  );
};

export default CustomerManagement;
