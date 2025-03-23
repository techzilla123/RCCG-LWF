"use client";
import { Roboto } from 'next/font/google';
import Sidebar from '@/components/Admin/dashboard/dashboard-overview/Sidebar';
import TopNav from '@/components/Admin/dashboard/dashboard-overview/TopNav';
import Overview from '@/components/Admin/dashboard/dashboard-overview/Overview';
// import ChartGroup from '@/components/Admin/dashboard/dashboard-overview/ChartGroup';
import TopPayments from '@/components/Admin/dashboard/dashboard-overview/TopPayments';
// import UsersChart from '@/components/Admin/dashboard/dashboard-overview/UsersChart';
import dynamic from "next/dynamic";
const TransactionsChart = dynamic(
  () => import("@/components/Admin/dashboard/dashboard-overview/TransactionsChart"),
  { ssr: false, loading: () => <ChartSkeleton /> } // Display skeleton while loading
);
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });

const ChartSkeleton = () => (
  <div
    data-layername="chartGroup"
    className="flex overflow-hidden flex-col flex-1 shrink justify-center p-4 bg-white rounded-lg border border-solid basis-0 border-zinc-300 min-w-[240px] max-md:max-w-full"
  >
    {/* Header */}
    <div
      data-layername="heading"
      className="flex justify-between items-center w-full max-md:max-w-full mb-4"
    >
      <div data-layername="title" className="flex flex-col justify-center">
        <div className="text-sm font-semibold text-black">Transactions</div>
      </div>
    </div>

    {/* Placeholder Chart */}
    <div
      data-layername="chart"
      className="flex flex-1 justify-center items-center mt-1 rounded-lg p-4"
    >
      <div className="w-[250px] h-[250px] rounded-full bg-gray-200 animate-pulse"></div>

      {/* Legend */}
      <div data-layername="legend" className="flex flex-col ml-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-neutral-500">Pending (--%)</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
          <span className="text-sm text-neutral-500">Failed (--%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          <span className="text-sm text-neutral-500">Success (--%)</span>
        </div>
      </div>
    </div>
  </div>
);
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
