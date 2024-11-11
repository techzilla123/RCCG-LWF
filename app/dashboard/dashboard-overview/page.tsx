// Add this line at the top
"use client";

import Sidebar from '@/components/Admin/dashboard/dashboard-overview/Sidebar';
import TopNav from '@/components/Admin/dashboard/dashboard-overview/TopNav';
import Overview from '@/components/Admin/dashboard/dashboard-overview/Overview';
import ChartGroup from '@/components/Admin/dashboard/dashboard-overview/ChartGroup';
import TopPayments from '@/components/Admin/dashboard/dashboard-overview/TopPayments';
import UsersChart from '@/components/Admin/dashboard/dashboard-overview/UsersChart';
import TransactionsChart from '@/components/Admin/dashboard/dashboard-overview/TransactionsChart';

function AdminDashboard() {

  return (
    <div data-layername="adminDashboard" className="flex min-h-screen bg-neutral-100">
      {/* Sidebar - Fixed position */}
      <div className="fixed top-0 left-0 bottom-0 z-10 shadow-lg">
        <Sidebar />
      </div>

      {/* Main content - Adjusted margin to avoid overlap with sidebar */}
      <div data-layername="body" className="flex flex-col flex-1 py-4 pr-4 pl-2 ml-[216px] max-w-full">
        <TopNav />
       
          <div data-layername="line" className="flex-1 shrink self-stretch my-auto w-full h-px border border-solid basis-0 bg-zinc-300 border-zinc-300 min-h-[1px] min-w-[240px] max-md:max-w-full" />
        
        <main data-layername="main" className="flex flex-col w-full bg-white rounded-none max-md:max-w-full">
        
            <header data-layername="header" className="flex flex-wrap gap-4 px-4 pt-6 pb-0 w-full bg-white max-md:max-w-full">
              <h1 data-layername="title" className="flex flex-col flex-1 shrink justify-center items-start text-3xl text-black basis-0 min-w-[240px] max-md:max-w-full">
                <div data-layername="titleText" className="gap-1 self-stretch">Dashboard Overview</div>
              </h1>
              <div data-layername="actions" className="flex gap-2 items-center my-auto">
              <button
  data-layername="secCta"
  className="flex gap-2 justify-center items-center self-stretch px-4 py-3 my-auto border border-solid bg-black bg-opacity-0 border-black border-opacity-0 rounded-[1000px]"
>
  <span data-layername="text" className="self-stretch my-auto text-sm font-medium text-center text-neutral-500">
    Export
  </span>
  {/* Add some margin to the right of the image */}
  <img src='/A-icon-sizeable.png' className="w-4 h-4 ml-2" alt="Export icon" />
</button>
              </div>
            </header>
          
          <section data-layername="content" className="flex flex-col p-4 w-full max-md:max-w-full">
            <Overview />
            <div data-layername="secondRow" className="flex flex-wrap gap-4 mt-4 w-full max-md:max-w-full">
              <UsersChart />
              <TransactionsChart />
            </div>
            <div data-layername="firstRow" className="flex flex-wrap gap-4 mt-4 w-full max-md:max-w-full">
              <ChartGroup title="Revenue" subtitle="Over the past week" />
              <TopPayments />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
