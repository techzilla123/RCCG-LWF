"use client";
import * as React from "react";
import { GlobalActions } from "./TopNavigation/GlobalActions";

const TopNavigation: React.FC = () => {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-2.5 bg-white border-b border-gray-100">
      <p className="text-base text-black">Welcome back, John Doe!</p>
      <GlobalActions />
    </nav>
  );
};

export default TopNavigation;
