'use client';

import React, { useState, useEffect } from "react";
import SideBar from "@/components/Admin/dashboard/transactions/Sidebar";
import TopNav from "@/components/Admin/dashboard/transactions/TopNav";
import TransactionOverview from "@/components/Admin/dashboard/transactions/TransactionOverview";
import TransactionTable from "@/components/Admin/dashboard/transactions/TransactionTable";

function TransactionPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<{
    paymentType: string;
    startDate: string;
    endDate: string;
    transactionId: string;
    status: string;
  }>({
    paymentType: "",
    startDate: "",
    endDate: "",
    transactionId: "",
    status: "",
  });

  const [paymentTypes, setPaymentTypes] = useState<{ name: string; status: string }[]>([]);
  const [isPaymentTypesLoading, setIsPaymentTypesLoading] = useState<boolean>(true);

  // Fetch payment types on component mount
  useEffect(() => {
    const fetchPaymentTypes = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payment/config`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          const paymentList = data.paymentConfigurations.map((item: { paymentName: string; status: string }) => ({
            name: item.paymentName,
            status: item.status,
          }));
  
          setPaymentTypes(paymentList);
        } else {
          console.error("Failed to fetch payment types");
        }
      } catch (error) {
        console.error("Error fetching payment types:", error);
      } finally {
        setIsPaymentTypesLoading(false);
      }
    };
  
    fetchPaymentTypes();
  }, []);

  
  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;
    
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/dashboard/payments`;
      if (filters.status) {
        url += `?status=${encodeURIComponent(filters.status)}`;
      }
    
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to fetch transactions: ${response.status} - ${errorText}`);
          return;
        }
    
        const data = await response.json();
        console.log("Fetched transactions:", data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    
    if (filters.status || filters.paymentType || filters.startDate || filters.endDate || filters.transactionId) {
      fetchTransactions();
    }
  }, [filters]);
  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilter = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: "" }));
  };

  return (
    <div className="flex flex-wrap justify-center bg-neutral-100 min-h-[832px]">
      <SideBar />
      <div className="flex flex-col flex-1 shrink py-4 pr-4 pl-2 shadow-sm basis-0 min-w-[240px] max-md:max-w-full">
        <TopNav />
        <main className="flex flex-col flex-1 w-full bg-white rounded-none max-md:max-w-full">
          <header className="flex flex-wrap gap-4 px-4 pt-6 pb-0 w-full bg-white max-md:max-w-full">
            <h1 className="flex flex-col flex-1 shrink justify-center items-start text-3xl text-black whitespace-nowrap basis-0 min-w-[240px] max-md:max-w-full">
              Transactions
            </h1>
            <div className="flex flex-wrap gap-2 items-center my-auto min-w-[240px] max-md:max-w-full">
              {/* Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center justify-center self-stretch h-10 px-4 rounded-lg shadow-sm bg-gray-200 text-sm text-neutral-700"
              >
                Filter
              </button>

              {/* Status Dropdown */}
              <select name="status" value={filters.status} onChange={handleFilterChange} className="flex items-center bg-white border border-gray-300  justify-center self-stretch h-10 px-2 rounded-lg shadow-sm bg-opacity-0 w-[105px] text-sm focus:outline-none focus:ring-2 text-neutral-500">
                <option value="">All Status</option>
                <option value="SUCCESS">Successful</option>
                <option value="FAILED">Failed</option>
                <option value="PENDING">Pending</option>
                <option value="REVERSED">Reversed</option>
              </select>

              {/* Search Bar */}
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
                  onChange={handleSearch}
                />
              </div>
              <button className="flex justify-center items-center h-8 border border-solid bg-black bg-opacity-0 border-black border-opacity-0 rounded-[1000px] px-4">
                <span className="text-sm font-medium text-center text-neutral-500">
                  Export
                </span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/64c23064efd23ac6787f4de13b1fffee54e93754ad981a3b7315f4f6c8d6e051?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
                  alt=""
                  className="w-4 h-4 ml-2"
                />
              </button>
            </div>
          </header>

          {/* Selected Filters Display */}
          <div className="flex flex-wrap gap-2 p-4">
            {Object.entries(filters)
              .filter(([, value]) => value) // Only display selected filters
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center bg-gray-200 text-sm px-3 py-1 rounded-lg"
                >
                  {key.replace(/([A-Z])/g, " $1").trim()}: {value}
                  <button
                    onClick={() => clearFilter(key)}
                    className="ml-2 text-red-500 text-xs"
                    
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>

          {isFilterOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg w-[600px] shadow-2xl z-50 relative">
                <h2 className="text-lg font-semibold mb-4">Filter Transactions</h2>
                <div className="flex">
                  {/* Left Section - Payment Types */}
                  <div className="w-1/3 border-r pr-4">
                    <h3 className="font-medium mb-2">Payment Type</h3>
                    {isPaymentTypesLoading ? (
                      <p>Loading payment types...</p>
                    ) : (
                      paymentTypes.map(({ name, status }) => (
                        <div key={name} className="flex items-center mb-2">
                          <input
                            type="radio"
                            name="paymentType"
                            value={name}
                            checked={filters.paymentType === name}
                            onChange={handleFilterChange}
                            className="mr-2"
                          />
                          {name}
                          {status === "DISABLED" && <span className="text-red-500 ml-2" title="Payment is currently disabled">●</span>}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Right Section - Filters */}
                  <div className="w-2/3 pl-4">
                    <label className="block text-sm font-medium mb-1">Start Date & Time</label>
                    <input
                      type="datetime-local"
                      name="startDate"
                      value={filters.startDate}
                      onChange={handleFilterChange}
                      className="w-full border px-2 py-1 mb-3 rounded"
                    />

                    <label className="block text-sm font-medium mb-1">End Date & Time</label>
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={filters.endDate}
                      onChange={handleFilterChange}
                      className="w-full border px-2 py-1 mb-3 rounded"
                    />

                    <label className="block text-sm font-medium mb-1">Transaction ID</label>
                    <input
                      type="text"
                      name="transactionId"
                      value={filters.transactionId}
                      onChange={handleFilterChange}
                      className="w-full border px-2 py-1 rounded"
                      placeholder="Enter Transaction ID"
                    />
                  </div>
                </div>

                {/* Modal Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    style={{ background: '#08AA3B' }}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          <section className="flex flex-col flex-1 p-4 w-full max-md:max-w-full">
            <TransactionOverview />
            <TransactionTable searchQuery={searchQuery} filters={filters} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default TransactionPage;
