"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/Admin/dashboard/users/Sidebar';
import TopNav from '@/components/Admin/dashboard/users/TopNav';
import Overview from '@/components/Admin/dashboard/users/Overview';
import UserTable from '@/components/Admin/dashboard/users/UserTable';

function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="flex flex-wrap justify-center bg-neutral-100 min-h-[832px]">
      <Sidebar />
      <main className="flex flex-col flex-1 shrink py-4 pr-4 pl-2 shadow-sm basis-0 min-w-[240px] max-md:max-w-full">
        <TopNav />
        <div className="flex flex-col flex-1 p-4 w-full max-md:max-w-full bg-white">
          <header
            className="flex flex-wrap gap-4 px-4 pt-6 pb-0 w-full bg-white max-md:max-w-full"
            style={{ marginBottom: '20px' }}
          >
            <h1 className="flex flex-col flex-1 shrink justify-center items-start text-3xl text-black whitespace-nowrap basis-0 min-w-[240px] max-md:max-w-full">
              Users
            </h1>
            <div className="flex flex-wrap gap-2 items-center my-auto min-w-[240px] max-md:max-w-full">
              <div className="flex items-center self-stretch my-auto min-w-[240px]">
                <div className="flex flex-col self-stretch my-auto h-10 rounded-lg shadow-sm bg-black bg-opacity-0 w-[105px]" />
                <div className="flex overflow-hidden self-stretch h-10 bg-white border border-solid border-neutral-500 rounded-[100px] w-[210px]">
                  <div className="flex flex-1 shrink gap-1 items-center px-3 basis-0 size-full">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0ef8ace7bbc668bb00179d7b1dfdaada068fd86e034114713f279c2eba8a97e?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
                      alt=""
                      className="object-contain w-3 h-3"
                    />
                    <div className="flex flex-1 shrink px-px basis-0">
                      <label htmlFor="searchInput" className="sr-only">
                        Search
                      </label>
                      <input
                        id="searchInput"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="text-xs h-full w-full bg-transparent border-none focus:outline-none placeholder:text-sm placeholder:text-neutral-500"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </div>
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
          <Overview />
          <UserTable searchQuery={searchQuery} />
        </div>
      </main>
    </div>
  );
}

export default UserManagement;
