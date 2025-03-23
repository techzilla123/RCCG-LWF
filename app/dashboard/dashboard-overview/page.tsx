"use client";
import { Roboto } from 'next/font/google';
import Sidebar from '@/components/Admin/dashboard/dashboard-overview/Sidebar';
import TopNav from '@/components/Admin/dashboard/dashboard-overview/TopNav';
import Overview from '@/components/Admin/dashboard/dashboard-overview/Overview';
// import ChartGroup from '@/components/Admin/dashboard/dashboard-overview/ChartGroup';
import TopPayments from '@/components/Admin/dashboard/dashboard-overview/TopPayments';
// import UsersChart from '@/components/Admin/dashboard/dashboard-overview/UsersChart';
// import TransactionsChart from '@/components/Admin/dashboard/dashboard-overview/TransactionsChart';
import dynamic from "next/dynamic";

const TransactionsChart = dynamic(() => import("@/components/Admin/dashboard/dashboard-overview/TransactionsChart"), {
  ssr: false,
});
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });

function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") { // Ensure it's running on the client
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      if (!token) {
        router.replace("/auth/login");
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    }
  }, [router]);

  if (loading) return null; // Prevent rendering until authentication check is done
  if (!isAuthenticated) return null; // Hide UI if not authenticated

  return (
    <div data-layername="adminDashboard" className="flex min-h-screen bg-neutral-100">
      {/* Sidebar - Fixed position */}
      <div className="fixed top-0 left-0 bottom-0 z-10 shadow-lg">
        <Sidebar />
      </div>

      {/* Main content - Adjusted margin to avoid overlap with sidebar */}
      <div data-layername="body" className="flex flex-col flex-1 py-4 pr-4 pl-2 ml-[216px] max-w-full">
        <TopNav />

        <div data-layername="line" className="flex shrink self-stretch w-full border bg-zinc-300 border-zinc-300 min-w-[240px]" />

        <main data-layername="main" className="flex flex-col w-full bg-white rounded-none max-md:max-w-full">
          <header data-layername="header" className="flex flex-wrap gap-4 px-4 pt-6 pb-0 w-full bg-white max-md:max-w-full">
            <h1 data-layername="title" className="flex flex-col flex-1 shrink justify-center items-start text-3xl text-black basis-0 min-w-[240px] max-md:max-w-full">
              <div data-layername="titleText" className={roboto.className}>Dashboard Overview</div>
            </h1>
            <div data-layername="actions" className="flex gap-2 items-center my-auto">
              <button data-layername="secCta" className="flex gap-2 justify-center items-center self-stretch px-4 py-3 my-auto border border-solid bg-black bg-opacity-0 border-black border-opacity-0 rounded-[1000px]">
                <span data-layername="text" className="self-stretch my-auto text-sm font-medium text-center text-neutral-500">
                  Export
                </span>
                {/* Add some margin to the right of the image */}
                <img src='/A-icon-sizeable.png' className="w-4 h-4 ml-2" alt="Export icon" />
              </button>
            </div>
          </header>

          <section data-layername="content" className="flex flex-col p-4 w-full max-md:max-w-full" style={{ height: "100vh" }}>
            <Overview />
            <div data-layername="secondRow" className="flex flex-wrap gap-4 mt-4 w-full max-md:max-w-full">
              <TopPayments />
              <TransactionsChart />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
