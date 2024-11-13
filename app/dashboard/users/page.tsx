import React from 'react';
import Sidebar from '@/components/Admin/dashboard/users/Sidebar';
import TopNav from '@/components/Admin/dashboard/users/TopNav';
import Overview from '@/components/Admin/dashboard/users/Overview';
import UserTable from '@/components/Admin/dashboard/users/UserTable';

function UserManagement() {
  return (
    <div className="flex flex-wrap justify-center bg-neutral-100 min-h-[832px] ">
      <Sidebar />
      <main className="flex flex-col flex-1 shrink py-4 pr-4 pl-2 shadow-sm basis-0 min-w-[240px] max-md:max-w-full ">
        <TopNav />
        <div className="flex flex-col flex-1 p-4 w-full max-md:max-w-full bg-white">
          <Overview />
          <UserTable />
        </div>
      </main>
    </div>
  );
}

export default UserManagement;