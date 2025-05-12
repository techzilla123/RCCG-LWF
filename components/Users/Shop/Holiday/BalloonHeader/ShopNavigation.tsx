"use client";

import * as React from "react";

export const ShopNavigation: React.FC = () => {
  const tabs = [
    "Graduations",
    "Tables",
    "Linens",
  ];

  const [activeTab, setActiveTab] = React.useState(tabs[0]);
  const [isDropdownVisible, setDropdownVisible] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setDropdownVisible(false);
  };

  return (
    <nav
      className="flex flex-col md:flex-row md:justify-center items-center gap-6 mt-6 -mb-10 z-10 w-full overflow-x-auto whitespace-nowrap"
      role="tablist"
      aria-label="Shop categories"
    >
      {/* Desktop view */}
      <div className="hidden md:flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            role="tab"
            className={`pb-1 text-sm md:text-base font-normal whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab
                ? "text-black border-black"
                : "text-[rgb(60,60,60)] border-[rgba(113,113,113,0)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Mobile view */}
      <div className="flex flex-col items-center md:hidden relative z-50 overflow-visible w-full">
  <button
    onClick={toggleDropdown}
    className={`pb-1 text-sm font-normal whitespace-nowrap transition-colors border-b-2 mb-2 ${
      activeTab
        ? "text-black border-black"
        : "text-[rgb(60,60,60)] border-[rgba(113,113,113,0)]"
    }`}
  >
    {activeTab} &#8230;
  </button>

  {isDropdownVisible && (
    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white shadow-md rounded-md w-56 z-50 border border-gray-200 max-h-60 overflow-y-auto">
      {tabs
        .filter((tab) => tab !== activeTab)
        .map((tab) => (
          <button
            key={tab}
            onClick={() => {
              handleTabClick(tab);
              toggleDropdown(); // hide dropdown after selecting
            }}
            className={`block text-sm font-normal whitespace-nowrap w-full text-left p-2 hover:bg-gray-100 ${
              tab === activeTab ? "bg-gray-200" : ""
            }`}
          >
            {tab}
          </button>
        ))}
    </div>
  )}
</div>
    </nav>
  );
};