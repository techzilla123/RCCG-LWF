"use client";
import React, { useState } from "react";
import SideBar from "@/components/Admin/dashboard/payments/Sidebar";
import TopNav from "@/components/Admin/dashboard/payments/TopNav";
import PaymentTable from "@/components/Admin/dashboard/payments/PaymentTable";

function AdminPayments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentName, setPaymentName] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [error, setError] = useState(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get the authorization token from localStorage
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      setError("Authorization token is missing.");
      return;
    }

    const payload = {
      paymentName,
      paymentAmount: parseFloat(paymentAmount), // Ensure the amount is in numeric format
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/config/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Authorization header
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle success, like closing the modal and resetting the form
        setIsModalOpen(false);
        setPaymentName("");
        setPaymentAmount("");
        setError(null); // Reset error if success
        alert("Payment created successfully!");
      } else {
        // Handle error from API
        setError(data.message || "An error occurred while creating the payment.");
      }
    } catch (error) {
      setError("An error occurred while sending the request.");
    }
  };

  return (
    <div className="flex flex-wrap justify-center bg-neutral-100 min-h-[832px]">
      <SideBar />
      <main className="flex flex-col flex-1 shrink py-4 pr-4 pl-2 shadow-sm basis-0 min-w-[240px] max-md:max-w-full">
        <TopNav />
        <div className="flex flex-col flex-1 w-full bg-white rounded-none max-md:max-w-full">
          <header className="flex flex-wrap gap-4 px-4 pt-6 pb-0 w-full bg-white max-md:max-w-full">
            <h1 className="flex flex-col flex-1 shrink justify-center items-start text-3xl text-black whitespace-nowrap basis-0 min-w-[240px] max-md:max-w-full">
              Payments
            </h1>
            <div className="flex flex-wrap gap-2 items-center my-auto min-w-[240px] max-md:max-w-full">
              <div className="flex items-center self-stretch my-auto min-w-[240px] gap-2">
                <select className="flex items-center justify-center self-stretch h-10 px-2 rounded-lg shadow-sm bg-black bg-opacity-0 w-[105px] text-sm text-neutral-500">
                  <option>All Type</option>
                </select>
                <select className="flex items-center justify-center self-stretch h-10 px-2 rounded-lg shadow-sm bg-black bg-opacity-0 w-[105px] text-sm text-neutral-500">
                  <option>All Status</option>
                </select>
                <div className="flex overflow-hidden self-stretch px-0 py-2 my-auto h-8 bg-white border border-solid border-neutral-500 min-h-[32px] rounded-[100px] w-[210px]">
                  <button aria-label="Search" className="flex items-center px-3">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0ef8ace7bbc668bb00179d7b1dfdaada068fd86e034114713f279c2eba8a97e?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
                      alt="Search Icon"
                      className="w-3 h-3"
                    />
                  </button>
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <input
                    id="search"
                    type="text"
                    className="flex-1 px-3 py-1 text-xs text-black bg-transparent border-none focus:outline-none"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <button
                onClick={toggleModal}
                className="flex items-center justify-center gap-2 p-2 my-auto h-8 bg-green-600 border border-solid border-transparent rounded-[1000px]"
                style={{ background: "#08AA3B" }}
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/110d6f58f3b691e204fa786b7d120023021943ad877f727a6d0da43b09531c55?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
                  alt="Add Payment Icon"
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-center text-white">
                  Add Payment
                </span>
              </button>
            </div>
          </header>
          <PaymentTable searchQuery={searchQuery} />
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] relative">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={toggleModal}
              aria-label="Close"
            >
              &times;
            </button>

            {/* Modal Header */}
            <h2 className="text-xl font-bold mb-2">Add Payment</h2>
            <p className="text-sm text-gray-500 mb-4">
              Add detail for a new service you want to collect payments for.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Payment Name Input */}
              <div className="mb-4">
                <label
                  htmlFor="payment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Payment
                </label>
                <input
                  id="payment"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Input payment"
                  value={paymentName}
                  onChange={(e) => setPaymentName(e.target.value)}
                />
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount
                </label>
                <input
                  id="amount"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Input amount"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>

              {/* Add New Account */}
              <div className="mb-6">
                <button
                  type="button"
                  className="text-sm text-green-600 hover:underline"
                >
                  Add new account
                </button>
              </div>

              {/* Action Buttons */}
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
               style={{backgroundColor:'green'}} >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPayments;
