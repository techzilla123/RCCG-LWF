"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import Actionsp from "../Dropdown/Actionsp";

type Order = {
  orderId: string;
  // Add more fields as needed
};

type CustomerData = {
  customerId: string;
  firstname: string;
  lastname: string;
  email: string;
  location: string | null;
  status: "Active" | "Inactive" | "Pending" | string;
  userType: string;
  registrationDate: string;
  shippingAddress: string | null;
  orderList: Order[];
  profileImage?: string | null;
};

export const ProfileCard: React.FC = () => {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");

  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">("down");

  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleDropdown = (index: number) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null);
      return;
    }

    const rect = dropdownRefs.current[index]?.getBoundingClientRect();
    const spaceBelow = window.innerHeight - (rect?.bottom || 0);
    setDropdownDirection(spaceBelow < 100 ? "up" : "down");
    setOpenDropdownIndex(index);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        openDropdownIndex !== null &&
        dropdownRefs.current[openDropdownIndex] &&
        !dropdownRefs.current[openDropdownIndex]?.contains(e.target as Node)
      ) {
        setOpenDropdownIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownIndex]);

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
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const index = 0;

  if (loading) return <div className="p-6">Loading customer data...</div>;
  if (!customer) return <div className="p-6 text-red-500">Customer not found.</div>;

  const fullName = `${customer.firstname} ${customer.lastname}`;
  const joinDate = new Date(customer.registrationDate).toLocaleDateString();
  const isVerified = customer.status.toLowerCase() === "active";

  return (
    <article
      className="relative flex items-center gap-4 p-6 min-h-[180px] rounded-2xl border border-gray-200 bg-white min-w-60 max-md:px-4"
      ref={(el) => {
        dropdownRefs.current[index] = el as HTMLDivElement | null;
      }}
    >
      <div className="relative flex flex-col items-center">
        {customer.profileImage ? (
          <img
            src={customer.profileImage}
            alt={fullName}
            className="w-[120px] aspect-[0.88] object-cover rounded-full"
          />
        ) : (
          <div className="w-[120px] h-[120px] rounded-full bg-gray-200 flex items-center justify-center text-4xl font-semibold text-gray-600">
            {customer.firstname[0].toUpperCase()}
          </div>
        )}
        <span
          className={`mt-2 px-3 py-1 rounded-full text-xs flex items-center gap-1 ${
            isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isVerified ? "bg-green" : "bg-yellow-500"
            }`}
          ></span>
          {isVerified ? "Verified" : "Unverified"}
        </span>
      </div>

      <div className="flex flex-col justify-center flex-1 text-sm text-black">
        <h3 className="text-xl font-bold leading-6 mb-2">{fullName}</h3>
        <p className="text-sm text-gray-800">{customer.email}</p>
        <p className="mt-2 text-base text-gray-500 mb-2">
          Joined: <span className="text-black">{joinDate}</span>
        </p>
        <p className="text-sm text-gray-500">
          {customer.location ? customer.location : "Location not set"}
        </p>
      </div>

      <button
        aria-label="More options"
        className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100"
        onClick={() => toggleDropdown(index)}
      >
        <MoreHorizontal className="w-5 h-5 text-gray-500" />
      </button>

      {openDropdownIndex === index && (
        <div className="absolute -mt-[140px] right-0 z-50">
          <Actionsp direction={dropdownDirection} />
        </div>
      )}
    </article>
  );
};
