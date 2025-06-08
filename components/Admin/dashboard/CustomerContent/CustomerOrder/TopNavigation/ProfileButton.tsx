"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type CustomerData = {
  firstname: string;
  profileImage?: string | null; // optional if your API adds this later
};

export const ProfileButton: React.FC = () => {
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
          setCustomer(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch customer:", error);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const renderProfile = () => {
    if (customer?.profileImage) {
      return (
        <img
          src={customer.profileImage}
          alt="Profile"
          className="w-7 h-7 rounded-full object-cover"
        />
      );
    }

    if (customer?.firstname) {
      return (
        <div className="w-7 h-7 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center font-medium">
          {customer.firstname.charAt(0).toUpperCase()}
        </div>
      );
    }

    return (
      <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse"></div>
    );
  };

  return (
    <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
      {renderProfile()}
      <img
        src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/82c8f9d069e7aa215abfaeb6a6822903eb0491ec?placeholderIfAbsent=true"
        alt="Dropdown arrow"
        className="w-4 h-4 object-contain"
      />
    </button>
  );
};
  