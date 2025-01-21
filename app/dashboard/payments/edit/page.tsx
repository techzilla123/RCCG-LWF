"use client";

import React, { useState, useEffect } from "react";
import SideBar from "@/components/Admin/dashboard/payments/Sidebar";
import TopNav from "@/components/Admin/dashboard/payments/edit/TopNav";
import PaymentTable from "@/components/Admin/dashboard/payments/edit/PaymentTable";

function AdminPayments() {
  const [paymentName, setPaymentName] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("ENABLED");  // Default to 'ENABLED'

  // Initialize state from URL query parameters once
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("paymentName");
    const amount = params.get("paymentAmount");
    const statusFromQuery = params.get("status"); // Read status from URL

    if (name) setPaymentName(name);
    if (amount) setPaymentAmount(amount);
    if (statusFromQuery) setStatus(statusFromQuery); // Set status from URL if present
  }, []);

  // Update URL query parameters when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (paymentName) params.set("paymentName", paymentName);
    if (paymentAmount) params.set("paymentAmount", paymentAmount);
    params.set("status", status); // Always include status in the URL

    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [paymentName, paymentAmount, status]); // Dependencies on state variables

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleStatus = () => {
    const newStatus = status === "ENABLED" ? "DISABLED" : "ENABLED";
    setStatus(newStatus); // Update the state
  };

  const saveChanges = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.log("No authorization token found.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/config/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          paymentName,
          paymentAmount: parseFloat(paymentAmount),
          status,
        }),
      });

      if (!response.ok) throw new Error("Failed to update payment config.");

      const data = await response.json();
      console.log("Payment config updated successfully", data);
      alert("Payment config updated successfully!");
    } catch (error) {
      console.log("Error updating payment config:", error);
      alert("Error updating payment config. Please try again.");
    }
  };

  return (
    <div className="flex flex-wrap justify-center bg-neutral-100 min-h-[832px]">
      <SideBar />
      <main className="flex flex-col flex-1 shrink py-4 pr-4 pl-2 shadow-sm basis-0 min-w-[240px] max-md:max-w-full">
        <TopNav />
        <div className="flex flex-col w-full bg-white rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-black">
              {paymentName || "BEDC Payments"}
            </h1>
            <div className="flex items-center gap-4">
              <button
                style={{ background: "#08AA3B", height: "35px" }}
                className="flex gap-2 items-center px-4 py-2 text-white rounded-full font-medium h-8"
                onClick={saveChanges}
              >
                Save Changes
              </button>
              <button
                onClick={toggleStatus}
                className={`px-4 py-2 rounded-md flex items-center gap-2 ${
                  status === "ENABLED"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <img
                  src="/Vector.svg"
                  alt="Status Icon"
                  style={{ padding: 0 }}
                />
                <span>{status === "ENABLED" ? "Disable" : "Enable"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="paymentName" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="paymentName"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder={paymentName || "BEDC Payment"}
                value={paymentName}
                readOnly // This ensures the field is not editable
              />
            </div>
            <div>
              <label htmlFor="paymentAmount" className="block text-sm font-medium text-gray-700">
                Amount 
              </label>
              <input
                id="paymentAmount"
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder={paymentAmount || "N30,000"}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">
                Transactions <span className="text-gray-500">(200)</span>
              </h2>
              <div className="flex items-center gap-2">
                <select className="h-10 px-3 border border-gray-300 rounded-md">
                  <option>All Status</option>
                  <option>Successful</option>
                  <option>Pending</option>
                  <option>Failed</option>
                  <option>Reversed</option>
                </select>
                <input
                  type="text"
                  className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <PaymentTable searchQuery={searchQuery} />
        </div>
      </main>
    </div>
  );
}

export default AdminPayments;
