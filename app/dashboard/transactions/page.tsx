"use client"
import React, { useState } from 'react';
import SideBar from '@/components/Admin/dashboard/transactions/Sidebar';
import TopNav from '@/components/Admin/dashboard/transactions/TopNav';
import TransactionOverview from '@/components/Admin/dashboard/transactions/TransactionOverview';
import TransactionTable from '@/components/Admin/dashboard/transactions/TransactionTable';

function TransactionPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle the search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-wrap justify-center bg-neutral-100 min-h-[832px]">
      <SideBar />
      <div className="flex flex-col flex-1 shrink py-4 pr-4 pl-2 shadow-sm basis-0 min-w-[240px] max-md:max-w-full">
        <TopNav  />
        
        <main className="flex flex-col flex-1 w-full bg-white rounded-none max-md:max-w-full">
          <header className="flex flex-wrap gap-4 px-4 pt-6 pb-0 w-full bg-white max-md:max-w-full">
            <h1 className="flex flex-col flex-1 shrink justify-center items-start text-3xl text-black whitespace-nowrap basis-0 min-w-[240px] max-md:max-w-full">
              Transactions
            </h1>
            <div className="flex flex-wrap gap-2 items-center my-auto min-w-[240px] max-md:max-w-full">
              <div className="flex items-center self-stretch my-auto min-w-[240px]">
                <div className="flex flex-col self-stretch my-auto h-10 rounded-lg shadow-sm bg-black bg-opacity-0 w-[105px]" />
                <div className="flex overflow-hidden self-stretch px-0 py-2 my-auto h-8 bg-white border border-solid border-neutral-500 min-h-[32px] rounded-[100px] w-[210px]">
                  <div className="flex flex-1 shrink gap-1 items-center px-3 py-1 basis-0 size-full">
                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0ef8ace7bbc668bb00179d7b1dfdaada068fd86e034114713f279c2eba8a97e?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" alt="" className="object-contain self-stretch my-auto w-3 aspect-square" />
                    <div className="flex flex-1 shrink gap-0.5 self-stretch px-px my-auto basis-0">
                    <label htmlFor="searchInput" className=" sr-only ">Search</label>
                      <input
                        id="searchInput"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="my-auto text-xs w-[139px] bg-transparent border-none focus:outline-none"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button className="flex overflow-hidden gap-2 justify-center items-center self-stretch p-2 my-auto h-8 border border-solid bg-black bg-opacity-0 border-black border-opacity-0 min-h-[32px] rounded-[1000px]">
                <span className="self-stretch my-auto text-sm font-medium text-center text-neutral-500">Export</span>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/64c23064efd23ac6787f4de13b1fffee54e93754ad981a3b7315f4f6c8d6e051?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" alt="" className="object-contain self-stretch my-auto w-4 aspect-square" />
              </button>
            </div>
          </header>
          <section className="flex flex-col flex-1 p-4 w-full max-md:max-w-full">
            <TransactionOverview />
            <TransactionTable searchQuery={searchQuery} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default TransactionPage;
