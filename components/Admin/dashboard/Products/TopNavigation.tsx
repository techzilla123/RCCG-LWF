"use client";
import * as React from "react";
import { GlobalActions } from "./TopNavigation/GlobalActions";

const TopNavigation: React.FC = () => {
  const [userName, setUserName] = React.useState("");

  React.useEffect(() => {
    const storedName = localStorage.getItem("userFullName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <nav className="w-full flex justify-between items-center px-6 py-2.5 bg-white border-b border-gray-100">
      <p className="text-base text-black">Welcome back, {userName}!</p>
      <GlobalActions />
    </nav>
  );
};

export default TopNavigation;
