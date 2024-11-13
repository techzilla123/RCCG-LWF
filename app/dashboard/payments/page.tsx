"use client";
import React, { useState } from 'react';
import SideBar from '@/components/Admin/dashboard/payments/Sidebar';
import TopNav from '@/components/Admin/dashboard/payments/TopNav';
import PaymentTable from '@/components/Admin/dashboard/payments/PaymentTable';

function AdminPayments() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
                <select
                  className="flex items-center justify-center self-stretch h-10 px-2 rounded-lg shadow-sm bg-black bg-opacity-0 w-[105px] text-sm text-neutral-500"
                >
                  <option>All Type</option>
                </select>
                <select
                  className="flex items-center justify-center self-stretch h-10 px-2 rounded-lg shadow-sm bg-black bg-opacity-0 w-[105px] text-sm text-neutral-500"
                >
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
    </div>
  );
}

export default AdminPayments;
