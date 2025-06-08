"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { GlobalActions } from "./TopNavigation/GlobalActions";
import { Divider } from "./TopNavigation/Divider";

type CustomerData = {
  firstname: string;
  lastname: string;
};

const TopNavigation: React.FC = () => {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");

  const [customer, setCustomer] = useState<CustomerData | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!customerId) return;

      try {
        const token = localStorage.getItem("accessToken") || "";
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/fetch-customer/${customerId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
              ...(token && { Authorization: token }),
            },
          }
        );

        const result = await response.json();
        if (result.statusCode === 200) {
          setCustomer({
            firstname: result.data.firstname,
            lastname: result.data.lastname,
          });
        }
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchCustomer();
  }, [customerId]);

  return (
    <nav className="w-full flex justify-between items-center px-6 py-2.5 bg-white border-b border-gray-100">
      <div className="text-base text-black flex items-center gap-2">
        <Divider />
        <span
          className="font-semibold cursor-pointer hover:underline"
          onClick={() => (window.location.href = "/admin-customer")}
        >
          Customers
        </span>
        /
        <span className="font-medium text-gray-700">
          {customer ? `${customer.firstname} ${customer.lastname}` : "Loading..."}
        </span>
      </div>

      <GlobalActions />
    </nav>
  );
};

export default TopNavigation;
