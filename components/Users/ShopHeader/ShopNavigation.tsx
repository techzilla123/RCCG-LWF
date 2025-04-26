"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { HeaderTab } from "./HeaderTab";

interface ShopNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ShopNavigation: React.FC<ShopNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const router = useRouter();

  const tabs = [
    { label: "Balloons shop", path: "/shop/balloon" },
    { label: "Birthday shop", path: "/shop/birthday" },
    { label: "Party supplies", path: "/shop/party-supplies" },
    { label: "Holidays & occasions", path: "/shop/holiday" },
    { label: "Decorations", path: "/shop/decorations" },
  ];

  return (
    <nav
      className="flex justify-center max-md:justify-start items-center gap-3 mt-6 z-10 w-full text-black/10 font-light overflow-x-auto whitespace-nowrap"
      role="tablist"
      aria-label="Shop categories"
    >
      {tabs.map((tab) => (
        <HeaderTab
          key={tab.label}
          text={tab.label}
          active={activeTab === tab.label}
          onClick={() => {
            setActiveTab(tab.label);
            router.push(tab.path);
          }}
        />
      ))}
    </nav>
  );
};
