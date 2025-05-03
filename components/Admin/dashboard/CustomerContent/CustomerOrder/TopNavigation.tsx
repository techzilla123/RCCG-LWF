"use client";
import * as React from "react";
import { GlobalActions } from "./TopNavigation/GlobalActions";
import { Divider } from "./TopNavigation/Divider";

const TopNavigation: React.FC = () => {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-2.5 bg-white border-b border-gray-100">
      <div className="text-base text-black flex items-center gap-2">
  <Divider />
  <span 
    className="font-semibold cursor-pointer hover:underline"
    onClick={() => window.location.href = '/admin-customer'}
  >
    Customers
  </span>
  / Cynthia Morgan
</div>


      <GlobalActions />
    </nav>
  );
};

export default TopNavigation;
