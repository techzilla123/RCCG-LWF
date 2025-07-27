"use client";

import React, { useEffect, useState } from "react";
import { StatisticsCard } from "./StatisticsCard";
import { PieChartsSection } from "./PieChartsSection";
import { CashflowChart } from "./CashflowChart";
import { OrdersChart } from "./OrdersChart";
import { TopProducts } from "./TopProducts";
import { RecentOrders } from "./RecentOrders";

type Contact = {
  id: number;
  email: string;
  phone: string;
  name: string;
  address: string;
  message: string;
  createdAt: string;
};

type Newsletter = {
  id: number;
  email: string;
  createdAt: string;
};



export const DashboardContent = () => {
  const [statistics, setStatistics] = useState([
    {
      id: "customers",
      icon:
        "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/e04b8b6a7f9829c4388bd4acc12c0063434c3306?placeholderIfAbsent=true",
      title: "Customers",
      value: "Loading...",
      growth: {
        value: "17.54%",
        trend:
          "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/f842f35b5a0800c849fcc79d2bb38ba019a8f696?placeholderIfAbsent=true",
      },
    },
    {
      id: "revenue",
      icon:
        "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/7ca6a3ab756358ff00aa888ac2327f2a1f0e8f69?placeholderIfAbsent=true",
      title: "Revenue",
      value: "$500,000",
      growth: {
        value: "5.40%",
        trend:
          "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/f842f35b5a0800c849fcc79d2bb38ba019a8f696?placeholderIfAbsent=true",
      },
    },
    {
      id: "profit",
      icon:
        "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/0a57ee82fbca8fcad62a7308b4764e86f43e025a?placeholderIfAbsent=true",
      title: "Profit",
      value: "60.54%",
      growth: {
        value: "10.20%",
        trend:
          "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/f842f35b5a0800c849fcc79d2bb38ba019a8f696?placeholderIfAbsent=true",
      },
    },
    {
      id: "orders",
      icon:
        "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/d0df740ccdafbfc12cb23e7d96b623820d92b068?placeholderIfAbsent=true",
      title: "Orders",
      value: "Loading...",
      growth: {
        value: "17.54%",
        trend:
          "https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/f842f35b5a0800c849fcc79d2bb38ba019a8f696?placeholderIfAbsent=true",
      },
    },
  ]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalType, setModalType] = useState<"contact" | "newsletter" | null>(null);
 const [modalData, setModalData] = useState<(Contact | Newsletter)[]>([]);


  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("accessToken");
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token || "",
      };

      try {
        const [customerRes, orderRes] = await Promise.all([
          fetch(`${baseUrl}admin/customer-analytics`, { headers }),
          fetch(`${baseUrl}admin/order-analytics`, { headers }),
        ]);

        const customerData = await customerRes.json();
        const orderData = await orderRes.json();

        const noOfCustomer = customerData.data?.noOfCustomer ?? 0;
        const totalOrder = orderData.data?.totalOrder ?? 0;

        setStatistics((prev) =>
          prev.map((stat) => {
            if (stat.id === "customers") {
              return {
                ...stat,
                value: noOfCustomer.toLocaleString(),
              };
            }
            if (stat.id === "orders") {
              return {
                ...stat,
                value: totalOrder.toLocaleString(),
              };
            }
            return stat;
          })
        );
      } catch (err) {
        console.error("Failed to fetch dashboard statistics:", err);
      }
    };

    fetchStats();
  }, []);

  const handleModal = async (type: "contact" | "newsletter") => {
    setModalType(type);
    const token = localStorage.getItem("accessToken");
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const headers = {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
      Authorization: token || "",
    };

    try {
      const res = await fetch(`${baseUrl}admin/${type === "contact" ? "contact-us-list" : "news-letter-list"}`, { headers });
      const json = await res.json();
      setModalData(json.data || []);
    } catch (err) {
      console.error(`Failed to fetch ${type} data:`, err);
    }
  };

  return (
    <section className="relative pr-8 pb-8 pl-6 mt-4 pt-4 min-h-screen w-full bg-white max-md:px-5 max-md:max-w-full">
      <header className="pb-6 w-full border-b border-[#EAEAEA] flex justify-between items-center">
        <h3 className="text-3xl font-semibold leading-10 text-black">Dashboard</h3>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-4 py-2 bg-black text-white font-medium rounded-lg shadow hover:bg-gray-800 transition-all duration-200"
          >
            News & Updates
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg animate-fadeIn">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  handleModal("contact");
                  setDropdownOpen(false);
                }}
              >
                Contact Us
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  handleModal("newsletter");
                  setDropdownOpen(false);
                }}
              >
                Newsletter
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-wrap gap-6 items-start mt-6 w-full">
        {statistics.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </div>

      <div className="flex flex-wrap gap-6 items-start mt-6 w-full">
        <div className="flex-1 shrink basis-0 min-w-60">
          <PieChartsSection />
          <CashflowChart />
          <OrdersChart />
        </div>

        <aside className="flex-1 shrink basis-0 min-w-[360px] max-w-[420px] w-full custom-max-width-1600">
          <TopProducts />
          <RecentOrders />
        </aside>
      </div>

      {modalType && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setModalType(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                {modalType === "contact" ? "Contact Us Submissions" : "Newsletter Subscribers"}
              </h2>
              <button onClick={() => setModalType(null)} className="text-xl font-bold">
                ×
              </button>
            </div>
            {modalType === "contact" ? (
  <ul className="space-y-4">
    {(modalData as Contact[]).map((item) => (
      <li key={item.id} className="p-4 bg-gray-50 rounded-xl shadow-sm">
        <p><strong>Name:</strong> {item.name}</p>
        <p><strong>Email:</strong> {item.email}</p>
        <p><strong>Phone:</strong> {item.phone}</p>
        <p><strong>Address:</strong> {item.address}</p>
        <p><strong>Message:</strong> {item.message}</p>
        <p className="text-sm text-gray-500"><strong>Date:</strong> {item.createdAt}</p>
      </li>
    ))}
  </ul>
) : (
  <ul className="space-y-4">
    {(modalData as Newsletter[]).map((item) => (
      <li key={item.id} className="p-4 bg-gray-50 rounded-xl shadow-sm flex justify-between">
        <span>{item.email}</span>
        <span className="text-sm text-gray-500">{item.createdAt}</span>
      </li>
    ))}
  </ul>
)}

          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @media (min-width: 1600px) {
          .custom-max-width-1600 {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};
