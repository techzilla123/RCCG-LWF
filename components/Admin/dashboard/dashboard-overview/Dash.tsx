"use client";
import React from "react";
import { SideNavigation } from "@/components/Admin/dashboard/dashboard-overview/SideNavigation";
import TopNavigation from "@/components/Admin/dashboard/dashboard-overview/TopNavigation";
import { DashboardContent } from "@/components/Admin/dashboard/dashboard-overview/DashboardContent";
// import Footer from "@/components/auth/Footer";

export default function Main() {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5] gap-6">
      <SideNavigation />
      <main className="flex-1 shrink self-start  basis-8 min-w-60 max-md:max-w-full flex flex-col">
        <TopNavigation />
        <DashboardContent />
        <div className="flex-grow" /> {/* This ensures space between content and footer */}
        {/* <Footer /> Footer is full width here */}
      </main>
    </div>
  );
}
