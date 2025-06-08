"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProfileCard } from "./ProfileCard";
import { InfoCard } from "./InfoCard";

type CustomerData = {
  customerId: string;
  firstname: string;
  lastname: string;
  email: string;
  location: string | null;
  status: string;
  userType: string;
  registrationDate: string;
  shippingAddress: {
    country?: string;
    state?: string;
    city?: string;
    postalCode?: string;
  } | null;
  phone?: string;
  gender?: string;
  birthday?: string;
};

const Content: React.FC = () => {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");

  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [loading, setLoading] = useState(true);

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
        console.error("Error fetching customer:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const personalInfo = [
    { label: "Phone", value: customer?.phone || "N/A" },
    { label: "Gender", value: customer?.gender || "N/A" },
    { label: "Birthday", value: customer?.birthday || "N/A" },
    { label: "Address", value: customer?.location || "---" },
  ];

  const shipping = customer?.shippingAddress || {};
  const shippingInfo = [
    { label: "Country", value: shipping.country || "N/A" },
    { label: "State/province", value: shipping.state || "N/A" },
    { label: "City", value: shipping.city || "N/A" },
    { label: "Postal code", value: shipping.postalCode || "N/A" },
  ];

  if (loading) {
    return <div className="p-6">Loading customer info...</div>;
  }

  if (!customer) {
    return <div className="p-6 text-red-500">Customer not found.</div>;
  }

  return (
    <main className="self-stretch pt-6 pr-8 pb-4 pl-6 bg-white max-md:px-5">
      <div className="flex flex-wrap gap-6 w-full max-md:max-w-full">
        <ProfileCard />
        <InfoCard title="Personal info" rows={personalInfo} />
        <InfoCard title="Shipping info" rows={shippingInfo} />
      </div>
    </main>
  );
};

export default Content;
